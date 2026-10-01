import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { mkdtemp, mkdir, readFile, writeFile, copyFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { validateSurface } from "../lib/mcp-surface.mjs";

function fixture() {
  const tools = ["ask_study", "list_audiences"].map(name => ({
    name, title: name, description: `Description of ${name}.`,
    inputSchema: { type: "object", properties: { conversationFiles: { type: "array" } } },
    annotations: { readOnlyHint: name === "list_audiences", destructiveHint: false },
  }));
  return {
    card: { serverInfo: { name: "minds-ai", version: "2.0.3" }, tools },
    surface: {
      server: { version: "2.0.3", url: "https://getminds.ai/mcp" },
      tools: [...tools].reverse().map(({ inputSchema, ...tool }) => ({ ...tool, annotations: { ...tool.annotations }, scopes: ["studies:read"] })),
      hiddenTools: [{ name: "get_study_run", description: "Read a durable run." }],
      aliases: { get_panel_study: "get_study_run" },
      counts: { advertised: 2, callable: 3 },
    },
  };
}

test("uses curated production order and preserves full input schemas", () => {
  const { card, surface } = fixture();
  const tools = validateSurface(card, surface);
  assert.deepEqual(tools.map(tool => tool.name), ["list_audiences", "ask_study"]);
  assert.deepEqual(tools[1].inputSchema, card.tools[0].inputSchema);
});

for (const [label, mutate] of [
  ["duplicate names", ({ card }) => { card.tools[1] = card.tools[0]; }],
  ["renamed tools with unchanged counts", ({ surface }) => { surface.tools[0].name = "other_tool"; }],
  ["partial discovery", ({ surface }) => { surface.tools.pop(); }],
  ["version disagreement", ({ surface }) => { surface.server.version = "2.0.4"; }],
  ["annotation disagreement", ({ surface }) => { surface.tools[0].annotations.destructiveHint = true; }],
  ["missing schemas", ({ card }) => { delete card.tools[0].inputSchema; }],
  ["incorrect callable counts", ({ surface }) => { surface.counts.callable = 99; }],
  ["unknown alias targets", ({ surface }) => { surface.aliases.old_tool = "missing_tool"; }],
  ["hidden/advertised overlap", ({ surface }) => { surface.hiddenTools[0].name = "ask_study"; }],
]) {
  test(`refuses ${label}`, () => {
    const data = fixture();
    mutate(data);
    assert.throws(() => validateSurface(data.card, data.surface));
  });
}

async function sandbox(t) {
  const root = await mkdtemp(path.join(tmpdir(), "minds-mcp-sync-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "scripts/lib"), { recursive: true });
  for (const file of ["sync-mcp-surface.mjs", "lib/mcp-surface.mjs", "lib/workflow-reference.mjs"]) {
    await copyFile(new URL(`../${file}`, import.meta.url), path.join(root, "scripts", file));
  }
  const data = fixture();
  let status = 200;
  const server = createServer((request, response) => {
    response.writeHead(request.url === "/surface" ? status : 200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(request.url === "/card" ? data.card : data.surface));
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise(resolve => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const run = async (...args) => {
    const child = spawn(process.execPath, ["scripts/sync-mcp-surface.mjs", ...args], {
      cwd: root,
      env: { ...process.env, MINDS_SERVER_CARD_URL: `${origin}/card`, MINDS_PUBLIC_MCP_URL: `${origin}/surface` },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", chunk => { output += chunk; });
    child.stderr.on("data", chunk => { output += chunk; });
    const [code] = await once(child, "close");
    return { code, output };
  };
  return { root, data, run, unavailable: () => { status = 503; } };
}

test("CLI does not change artifacts during an outage or inconsistent deploy", async t => {
  const { root, data, run, unavailable } = await sandbox(t);
  await writeFile(path.join(root, "README.md"), "Existing documentation\n");
  data.surface.counts.callable = 99;
  assert.notEqual((await run()).code, 0);
  unavailable();
  assert.notEqual((await run()).code, 0);
  assert.equal(await readFile(path.join(root, "README.md"), "utf8"), "Existing documentation\n");
});

test("CLI reports drift without writes, regenerates, and remains idempotent", async t => {
  const { root, run } = await sandbox(t);
  const manifests = ["plugin.json", ".codex-plugin/plugin.json", ".cursor-plugin/plugin.json",
    "gemini-extension.json", "integrations/microsoft-mcp/manifest.template.json"];
  for (const file of [...manifests, "reference/tools.md", "integrations/microsoft-mcp/mcptools.json"]) {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true });
    await writeFile(path.join(root, file), '{"version":"2.0.1"}\n');
  }
  const initial = "# Minds\n<!-- tools:start -->\nOld tools\n<!-- tools:end -->\n";
  await writeFile(path.join(root, "README.md"), initial);
  assert.equal((await run("--check")).code, 1);
  assert.equal(await readFile(path.join(root, "README.md"), "utf8"), initial);
  const generated = await run();
  assert.equal(generated.code, 0, generated.output);
  const reference = await readFile(path.join(root, "reference/tools.md"), "utf8");
  assert.match(reference, /3 canonical callable tools/);
  assert.match(reference, /get_panel_study/);
  const check = await run("--check");
  assert.equal(check.code, 0, check.output);
  assert.match((await run()).output, /Generated files are current/);
  assert.equal(JSON.parse(await readFile(path.join(root, "plugin.json"), "utf8")).version, "2.0.3");
  await writeFile(path.join(root, "reference/cookbook.md"), "Call `create_panel`.\n");
  assert.equal((await run()).code, 1, "stale handwritten workflows block automation too");
});
