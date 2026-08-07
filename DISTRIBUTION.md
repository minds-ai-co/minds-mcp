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

## Parity and registry propagation

UI, API, and MCP parity work does not by itself require a new registry
submission. Registry action depends on which part of the public MCP contract
changes.

| Change | Registry action |
| --- | --- |
| Shared-service refactor with no public contract change | No registry action. Validate the existing endpoint and keep the current submissions. |
| Behavior change behind an existing tool with compatible inputs and outputs | Update `reference/` and the hosted documentation when the change reaches production. Add a note to an existing review only if the behavior is material to the reviewer. |
| Tool description, annotations, input schema, output schema, resource, or widget change | Update `reference/`, validate the live discovery response, and amend every open review in place where the submitted metadata or screenshots are now stale. Do not submit a duplicate. |
| Tool added to or removed from ordinary `tools/list` discovery | Update the documented advertised-tool inventory, client manifests or dashboards that enumerate tools, and every open reviewer record. Re-test discovery in each supported client. |
| Canonical tool callable only by an explicit known name | Document it as explicit rather than advertised. It does not change registry discovery until it is added to `tools/list`. |
| Server name, endpoint, transport, authentication, website, repository, icon, or official package metadata change | Publish a new version of the Official MCP Registry metadata, then verify downstream sync and update existing platform submissions in place. |
| Material change to an immutable GitHub Release or Zenodo snapshot | Publish a new version. Never rewrite an archived snapshot. |

Production is the release boundary. Do not publish staging-only tool claims to
registry pages. After a production promotion, compare the live `initialize`,
`tools/list`, resources, OAuth metadata, server card, and Official MCP Registry
record with the maintained reference before updating any downstream surface.

The company registry chronicle is the submission ledger. Record the impact of
each public-contract change there, including which existing submissions need an
in-place amendment, which listings can sync automatically, and which surfaces
require no action.

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
6. Classify the release against the parity and registry propagation table.
7. Record each submission, review URL, and final listing URL in the company
   registry chronicle.
