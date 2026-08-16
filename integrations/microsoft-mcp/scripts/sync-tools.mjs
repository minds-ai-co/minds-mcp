import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const source = process.env.MCP_SCHEMA_SOURCE || "https://getminds.ai/mcp";
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(scriptDir, "../mcptools.json");
const headers = {
  Accept: "application/json, text/event-stream",
  "Content-Type": "application/json",
};

function decodePayload(raw) {
  const dataLine = raw
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:"));
  return JSON.parse(dataLine ? dataLine.slice(5).trim() : raw);
}

async function post(body, sessionId) {
  const response = await fetch(source, {
    method: "POST",
    headers: sessionId
      ? { ...headers, "Mcp-Session-Id": sessionId }
      : headers,
    body: JSON.stringify(body),
  });
  const raw = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status} ${raw}`);
  }
  return { response, payload: raw ? decodePayload(raw) : null };
}

const initialized = await post({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "minds-microsoft-package", version: "1.0.0" },
  },
});

const sessionId = initialized.response.headers.get("mcp-session-id");
if (!sessionId) {
  throw new Error("MCP initialize response did not include Mcp-Session-Id");
}

await post({ jsonrpc: "2.0", method: "notifications/initialized" }, sessionId);
const listed = await post(
  { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
  sessionId,
);

const tools = listed.payload?.result?.tools;
if (!Array.isArray(tools) || tools.length === 0) {
  throw new Error("MCP tools/list returned no tools");
}

const json = JSON.stringify({ tools }, null, 2).replace(
  /[^\x00-\x7F]/g,
  (character) =>
    `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`,
);
await writeFile(outputPath, `${json}\n`, "utf8");
console.log(`Wrote ${tools.length} tools from ${source} to ${outputPath}`);
