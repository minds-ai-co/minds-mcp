# Tool reference

The remote server is the source of truth for current schemas. This page describes
the role of each core operation; always let the connected client inspect the live
tool definition before constructing a call.

The server registers 33 canonical tools. The first 15 tools below are advertised
through ordinary `tools/list` discovery. The remaining 18 are explicit tools:
they are callable by integrations that configure a known canonical tool name,
but they are not part of the curated discovery response. Internal UI, API, and
MCP parity work does not change registry discovery unless the production
`tools/list` response changes.

## Audiences

| Tool | Purpose |
| --- | --- |
| `list_groups` | List saved audiences, segments, and persona collections. |
| `create_group_from_brief` | Build an evidence-grounded synthetic audience from a population brief. |
| `ask_group` | Ask, survey, or poll a single audience and receive per-respondent answers. |

## Panels and questions

| Tool | Purpose |
| --- | --- |
| `list_panels` | List panels, studies, surveys, and focus groups. |
| `create_panel` | Create a panel or study around a research goal. |
| `ask_panel` | Ask one focused question across a panel. |
| `get_panel_status` | Check panel composition and progress on in-flight questions. |
| `get_panel_summary` | Return a whole-study summary with semantic blocks and heatmaps. |

## Structured studies

| Tool | Purpose |
| --- | --- |
| `plan_panel_study` | Draft a structured plan for multi-question studies, asset audits, or MaxDiff. |
| `run_panel_study` | Execute a confirmed plan as a durable server-side run. |
| `get_panel_study` | Check durable progress, outputs, and method calculations. |
| `list_research_methods` | List supported methods and their current execution status. |

## Study drafts

| Tool | Purpose |
| --- | --- |
| `list_study_drafts` | List reusable draft study plans saved in the connected Minds workspace. |
| `save_study_draft` | Save a study plan as a reusable draft before execution. |

## Export

| Tool | Purpose |
| --- | --- |
| `export_panel` | Export panel results as PDF, CSV, XLSX, or JSON. |

## Explicit tools

These 18 tools are registered and callable by canonical name, but are not
advertised through ordinary `tools/list` discovery. Registry listings must not
describe them as automatically discovered.

### Minds, knowledge, and Groups

| Tool | Purpose |
| --- | --- |
| `list_minds` | List Minds owned by the authenticated user. |
| `create_mind` | Create a synthetic expert, consumer persona, or digital twin. |
| `chat_with_mind` | Send a message to a Mind and continue a conversation. |
| `get_mind_status` | Check Mind training progress. |
| `export_mind` | Export a Mind profile as Markdown, PDF, DOCX, or PPTX. |
| `create_group` | Create a named Group from existing Mind IDs. |
| `preview_group_dataset_segmentation` | Review a respondent dataset before representative cohort creation. |
| `get_group` | Read a Group's members, grounding, sources, sharing state, and Formations. |
| `recalibrate_group` | Refresh a Group's grounding from authoritative web research. |
| `list_formations` | List persisted Formations for a Group. |

### Panel analytics

| Tool | Purpose |
| --- | --- |
| `get_panel_analytics` | Compute scale, categorical, and qualitative analytics across a Panel's question history. |

### Lifecycle operations

| Tool | Purpose |
| --- | --- |
| `manage_mind` | Read, update, delete, retrain, export, or inspect a Mind. |
| `manage_mind_knowledge` | List, add, update, delete, enrich, or inspect Mind knowledge. |
| `manage_group` | Read, update, delete, follow, or change Group membership. |
| `manage_formation` | List, preview, create, delete, or recompute Group Formations. |
| `manage_panel` | Read or delete a Panel. |
| `manage_chat` | Create a chat, send a message, or delete chat history. |
| `manage_study_draft` | Delete or consume a confirmed, revision-matched Study draft. |

Destructive actions require explicit confirmation. MCP cannot create, rotate,
or revoke the credential authenticating its own session. Manage API keys in
[Minds account settings](https://getminds.ai/settings/api-keys).

## Discovery metadata

| Resource | URL |
| --- | --- |
| Server card | `https://getminds.ai/.well-known/mcp/server-card.json` |
| OAuth protected-resource metadata | `https://getminds.ai/.well-known/oauth-protected-resource` |
| MCP endpoint | `https://getminds.ai/mcp` |

[Review the live API documentation](https://getminds.ai/api?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-docs-tools)
