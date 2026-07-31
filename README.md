# Minds MCP Server

[![smithery badge](https://smithery.ai/badge/alexander-a4p3/minds)](https://smithery.ai/servers/alexander-a4p3/minds)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21711429.svg)](https://doi.org/10.5281/zenodo.21711429)

Run AI market research from your assistant: synthetic customer panels for concept
testing, message testing, and segment comparison.

**Endpoint:** `https://getminds.ai/mcp` (streamable HTTP)
**Docs:** https://getminds.ai/mcp/setup
**Quick-start guide:** https://minds-ai-co.github.io/minds-mcp/
**Technical reference:** https://minds-mcp.readthedocs.io/en/latest/
**GitBook:** https://minds-1.gitbook.io/minds-mcp/
**Client compatibility:** https://minds-mcp-compatibility.pages.dev/
**Archived release:** https://doi.org/10.5281/zenodo.21711429
**Auth:** OAuth 2.1 with PKCE, or a Minds API key

> This repository is documentation for a hosted MCP server. There is no code to
> install or run. The server is operated by [Minds](https://getminds.ai) and the
> implementation lives in our application, not here.

## Documentation maintenance

`reference/` is the single source for maintained integration content. Read the
Docs and GitBook publish the same Markdown through repository sync. GitHub Pages
and Cloudflare Pages are intentionally thin, platform-specific landing surfaces;
Zenodo preserves versioned release snapshots. See [DOCUMENTATION.md](DOCUMENTATION.md)
for the publishing contract.

## What it does

[Minds](https://getminds.ai) is a synthetic market research platform. This MCP
server lets ChatGPT, Claude, Cursor, and any other MCP client run customer
research end to end without leaving the assistant.

Describe an audience in a brief ("German Gen Z grocery shoppers", "enterprise IT
buyers in fintech") and the server runs deep web research to ground that audience
in government statistics, peer-reviewed studies, and industry reports rather than
in generic model priors. Then ask the panel a question, run a structured study,
and export the results.

Typical jobs:

- Concept testing and message testing before creative production
- Ad pretesting, landing page audits, and packaging tests with per-segment reactions
- Buyer persona validation and objection discovery for B2B go to market
- Segment comparison and positioning checks across markets
- Screening research hypotheses before commissioning fieldwork with real respondents

Studies run durably server side, so a long study survives the chat session that
started it. Results export to PDF, CSV, XLSX, JSON, and Markdown.

**Scope.** Minds does not replace representative human fieldwork. It replaces the
slow first pass: sharpening the question, surfacing objections, and deciding which
assumptions deserve real-respondent validation.

## Setup

### ChatGPT

Settings, then Connected Apps, then add `https://getminds.ai/mcp` and authorize via
OAuth. Panel results render as interactive widgets inline.

### Claude Desktop and claude.ai

Customize, then Connectors, then add `https://getminds.ai/mcp` as a remote
connector and authorize via OAuth.

### Claude Code

```bash
claude mcp add --transport http mindsai https://getminds.ai/mcp \
  --header "Authorization: Bearer minds_YOUR_API_KEY"
```

### Cursor

Settings, then MCP, then add `https://getminds.ai/mcp` and authorize via OAuth.

### VS Code (Copilot), Windsurf, Langdock, Open WebUI

Add `https://getminds.ai/mcp` as a remote MCP server. Full per-client instructions,
including API key setup, are at https://getminds.ai/mcp/setup.

### API keys

Generate one in the Minds app under Settings, then API Keys. Keys start with
`minds_` and are passed as `Authorization: Bearer minds_...`.

## Tools

| Tool | What it does |
|------|--------------|
| `list_groups` | List your saved Audiences, segments, and persona collections. |
| `create_group_from_brief` | Build a grounded synthetic Audience from a population brief via deep web research. |
| `ask_group` | Ask, survey, or poll a single Audience and get per-respondent answers. |
| `list_panels` | List your panels, studies, surveys, and focus groups. |
| `create_panel` | Create a panel or study from a research goal. |
| `ask_panel` | Ask one straightforward question across a whole panel. |
| `get_panel_status` | Check panel composition and live progress on in-flight questions. |
| `export_panel` | Export panel results as PDF, CSV, XLSX, or JSON. |
| `plan_panel_study` | Draft a structured research plan for multi-question studies, asset audits, and MaxDiff. |
| `run_panel_study` | Execute a confirmed study plan as a durable server-side run. |
| `get_panel_study` | Check durable progress, artifacts, and method calculations for a running study. |
| `list_research_methods` | List supported research methods and which of them can actually execute. |
| `get_panel_summary` | Return a whole-study summary with semantic blocks and heatmaps. |

Research methods: MaxDiff runs through a deterministic adapter. Conjoint is
planned and cannot execute yet. Call `list_research_methods` for the current
state rather than assuming.

## Discovery

- Server card: `https://getminds.ai/.well-known/mcp/server-card.json`
- OAuth protected resource metadata: `https://getminds.ai/.well-known/oauth-protected-resource`
- Registry name: `ai.getminds/minds`

## Links

- Product: https://getminds.ai
- MCP setup guide: https://getminds.ai/mcp/setup
- API docs: https://getminds.ai/api
- Versioned integration reference: https://doi.org/10.5281/zenodo.21711429
- Documentation publishing model: DOCUMENTATION.md
- GitBook reference: https://minds-1.gitbook.io/minds-mcp/
- Client compatibility: https://minds-mcp-compatibility.pages.dev/
- Support: https://getminds.ai
