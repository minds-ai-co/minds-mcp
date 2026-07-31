# Tool reference

The remote server is the source of truth for current schemas. This page describes
the role of each core operation; always let the connected client inspect the live
tool definition before constructing a call.

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

## Export

| Tool | Purpose |
| --- | --- |
| `export_panel` | Export panel results as PDF, CSV, XLSX, or JSON. |

## Discovery metadata

| Resource | URL |
| --- | --- |
| Server card | `https://getminds.ai/.well-known/mcp/server-card.json` |
| OAuth protected-resource metadata | `https://getminds.ai/.well-known/oauth-protected-resource` |
| MCP endpoint | `https://getminds.ai/mcp` |

[Review the live API documentation](https://getminds.ai/api?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-docs-tools){ .minds-cta }
