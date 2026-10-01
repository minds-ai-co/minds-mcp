import { isDeepStrictEqual } from "node:util";

function inventory(tools, label) {
  if (!Array.isArray(tools)) throw new Error(`${label} is not a tool list`);
  const entries = new Map();
  for (const tool of tools) {
    if (!tool || typeof tool.name !== "string" || !tool.name || entries.has(tool.name)) {
      throw new Error(`${label} contains a missing or duplicate tool name`);
    }
    entries.set(tool.name, tool);
  }
  return entries;
}

/** Refuse inconsistent deploy snapshots before generating public artifacts. */
export function validateSurface(card, surface) {
  const schemas = inventory(card?.tools, "Server card");
  const advertised = inventory(surface?.tools, "Public surface");
  const hidden = inventory(surface?.hiddenTools, "Hidden tools");
  if (!schemas.size || schemas.size !== advertised.size) {
    throw new Error("Server card and public surface have different tool inventories");
  }
  if (!/^\d+\.\d+\.\d+$/.test(surface?.server?.version)
      || card?.serverInfo?.version !== surface.server.version) {
    throw new Error("Server card and public surface have inconsistent versions");
  }
  if (surface.server.url !== "https://getminds.ai/mcp") {
    throw new Error("Public surface must describe the production MCP endpoint");
  }
  for (const [name, tool] of advertised) {
    const schema = schemas.get(name);
    if (!schema || schema.inputSchema?.type !== "object"
        || schema.title !== tool.title || schema.description !== tool.description
        || !Array.isArray(tool.scopes)) {
      throw new Error(`Server card and public surface disagree on ${name}`);
    }
    for (const [key, value] of Object.entries(tool.annotations ?? {})) {
      if (!isDeepStrictEqual(schema.annotations?.[key], value)) {
        throw new Error(`Server card and public surface disagree on ${name}.${key}`);
      }
    }
    if (hidden.has(name)) throw new Error(`${name} is both advertised and hidden`);
  }
  if (surface.counts?.advertised !== advertised.size
      || surface.counts?.callable !== advertised.size + hidden.size) {
    throw new Error("Public surface tool counts do not match its inventory");
  }
  if (!surface.aliases || typeof surface.aliases !== "object" || Array.isArray(surface.aliases)) {
    throw new Error("Public surface has no alias inventory");
  }
  for (const [alias, target] of Object.entries(surface.aliases)) {
    if (advertised.has(alias) || hidden.has(alias)
        || (!advertised.has(target) && !hidden.has(target))) {
      throw new Error(`Public surface has an invalid alias: ${alias}`);
    }
  }
  return [...advertised.keys()].map(name => schemas.get(name));
}
