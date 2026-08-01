# Developer portal distribution

This repository is the shared public package for Minds MCP discovery. Platform
manifests may describe how a client connects, but they must not become separate
product manuals.

## Canonical sources

- Maintained integration content: `reference/`
- Hosted setup guide: https://getminds.ai/mcp/setup
- Remote MCP endpoint: `https://getminds.ai/mcp`
- Official MCP Registry name: `ai.getminds/minds`

Update product behavior, setup instructions, tool descriptions, research scope,
and examples in `reference/` first. Keep portal descriptions concise and link
back to the hosted setup guide.

## Distribution surfaces

| Surface | Repository artifact | Distribution mechanism |
| --- | --- | --- |
| Google Antigravity Plugins | `plugin.json`, `mcp_config.json` | Install the public GitHub repository with `agy plugins install`; OAuth is discovered from the endpoint |
| Gemini CLI Extensions (enterprise/API-key legacy) | `gemini-extension.json`, `GEMINI.md` | Retained for supported Google Cloud enterprise and API-key users |
| ChatGPT and Codex Plugins | `.codex-plugin/plugin.json`, `.mcp.json` | OpenAI plugin submission portal using the hosted MCP endpoint |
| GitHub MCP Registry and VS Code | Official MCP Registry package plus this repository | GitHub curation request after official registry publication |
| Docker MCP Catalog | Separate contribution under `docker/mcp-registry` | Docker registry pull request |
| Anthropic Connectors Directory | Hosted MCP endpoint and maintained documentation | Anthropic connector submission portal |

## Release checklist

1. Update `reference/` before changing repeated product claims elsewhere.
2. Keep versions aligned with the latest `ai.getminds/minds` Registry release.
3. Validate every JSON manifest.
4. Test an MCP initialize request with both `application/json` and
   `text/event-stream` accepted.
5. Confirm the setup, privacy, terms, icon, OAuth metadata, and server-card URLs
   remain publicly reachable.
6. Record each submission, review URL, and final listing URL in the company
   registry chronicle.
