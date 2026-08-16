import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function isAscii(value) {
  return !/[^\x00-\x7F]/.test(value);
}

const manifestRaw = await readFile(path.join(root, "manifest.template.json"), "utf8");
const manifest = JSON.parse(manifestRaw);
const toolRaw = await readFile(path.join(root, "mcptools.json"), "utf8");
const toolFile = JSON.parse(toolRaw);
const intro = await readFile(path.join(root, "intro.md"), "utf8");

if (!isAscii(manifestRaw)) fail("manifest.template.json must be ASCII-safe");
if (!isAscii(toolRaw)) fail("mcptools.json must be ASCII-safe");
if (!isAscii(intro)) fail("intro.md must be ASCII-safe");
if (manifest.manifestVersion !== "devPreview") fail("manifestVersion must be devPreview");
if (manifest.id !== "__MICROSOFT_MCP_APP_ID__") fail("manifest app ID placeholder changed unexpectedly");
if (manifest.agentConnectors?.length !== 1) fail("manifest must contain exactly one agent connector");

const remote = manifest.agentConnectors?.[0]?.toolSource?.remoteMcpServer;
if (remote?.mcpServerUrl !== "https://getminds.ai/mcp") fail("manifest must target the canonical production MCP endpoint");
if (remote?.mcpToolDescription?.file !== "mcptools.json") fail("manifest must reference mcptools.json");
if (remote?.authorization?.type !== "AzureKeyVault") fail("manifest authorization must use AzureKeyVault");
if (remote?.authorization?.referenceId !== "__MICROSOFT_KEY_VAULT_URI__") fail("Key Vault placeholder changed unexpectedly");

const tools = toolFile.tools;
if (!Array.isArray(tools) || tools.length !== 18) fail(`expected 18 tools, found ${tools?.length ?? 0}`);
const names = new Set();
const directivePattern = /\b(you must|must first|always call|never call|before calling|after calling|use the .* tool|call the .* tool)\b/i;
for (const tool of tools || []) {
  if (!tool.name) fail("every tool needs a name");
  if (names.has(tool.name)) fail(`duplicate tool name: ${tool.name}`);
  names.add(tool.name);
  if (!tool.title || tool.title !== tool.annotations?.title) fail(`title mismatch: ${tool.name}`);
  if (directivePattern.test(tool.description || "")) fail(`directive language in description: ${tool.name}`);
  if (tool.inputSchema?.type !== "object") fail(`input schema must be an object: ${tool.name}`);
}

function pngDimensions(buffer) {
  if (buffer.toString("ascii", 1, 4) !== "PNG") throw new Error("not a PNG file");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

for (const [file, expected] of [["Color.png", 192], ["Outline.png", 32]]) {
  try {
    const dimensions = pngDimensions(await readFile(path.join(root, file)));
    if (dimensions.width !== expected || dimensions.height !== expected) {
      fail(`${file} must be ${expected}x${expected}, found ${dimensions.width}x${dimensions.height}`);
    }
  } catch (error) {
    fail(`${file}: ${error.message}`);
  }
}

if (failures.length) {
  console.error(failures.map((message) => `- ${message}`).join("\n"));
  process.exit(1);
}
console.log(`Microsoft MCP package source is valid with ${tools.length} tools.`);
