import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const outputDir = path.join(root, "dist", "package");
const archive = path.join(root, "dist", "minds-mcp-microsoft-package.zip");
const appId = process.env.MICROSOFT_MCP_APP_ID;
const keyVaultUri = process.env.MICROSOFT_KEY_VAULT_URI;

if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(appId || "")) {
  throw new Error("MICROSOFT_MCP_APP_ID must be a UUID");
}
if (!/^https:\/\/[a-z0-9-]+\.vault\.azure\.net\/$/i.test(keyVaultUri || "")) {
  throw new Error("MICROSOFT_KEY_VAULT_URI must look like https://name.vault.azure.net/");
}

const validation = spawnSync(process.execPath, [path.join(scriptDir, "validate.mjs")], {
  stdio: "inherit",
});
if (validation.status !== 0) process.exit(validation.status || 1);

const template = await readFile(path.join(root, "manifest.template.json"), "utf8");
const manifest = template
  .replace("__MICROSOFT_MCP_APP_ID__", appId)
  .replace("__MICROSOFT_KEY_VAULT_URI__", keyVaultUri);
if (manifest.includes("__MICROSOFT_")) throw new Error("manifest still contains placeholders");

await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "manifest.json"), manifest, "utf8");
for (const file of ["mcptools.json", "intro.md", "Color.png", "Outline.png"]) {
  await copyFile(path.join(root, file), path.join(outputDir, file));
}

await mkdir(path.dirname(archive), { recursive: true });
const zipped = spawnSync("zip", ["-FS", "-r", archive, "."], {
  cwd: outputDir,
  stdio: "inherit",
});
if (zipped.status !== 0) process.exit(zipped.status || 1);
console.log(`Built ${archive}`);
