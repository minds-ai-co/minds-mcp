# Minds MCP Server

[![smithery badge](https://smithery.ai/badge/alexander-a4p3/minds)](https://smithery.ai/servers/alexander-a4p3/minds)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21711429.svg)](https://doi.org/10.5281/zenodo.21711429)

Run AI market research from your assistant: build synthetic Audiences and run
Studies for concept testing, message testing, and segment comparison.

**Endpoint:** `https://getminds.ai/mcp` (streamable HTTP)
**Docs:** https://getminds.ai/mcp/setup
**Quick-start guide:** https://minds-ai-co.github.io/minds-mcp/
**Technical reference:** https://minds-mcp.readthedocs.io/en/latest/
**GitBook:** https://minds-1.gitbook.io/minds-mcp/
**Client compatibility:** https://minds-mcp-compatibility.pages.dev/
**Setup generator:** https://minds-mcp-setup-generator.netlify.app/
**Public API explorer:** https://minds-api-explorer.vercel.app/?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-repository-api-explorer
**API + MCP integration lab:** https://minds-api-mcp-integration-lab-bba685.gitlab.io/?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-repository-integration-lab
**Archived release:** https://doi.org/10.5281/zenodo.21711429
**Auth:** OAuth 2.1 with PKCE (dynamic client registration or Client ID Metadata Documents), or a Minds API key (`Authorization: Bearer minds_…`)

> This repository is documentation for a hosted MCP server. There is no code to
> install or run. The server is operated by [Minds](https://getminds.ai) and the
> implementation lives in our application, not here.

## Documentation maintenance

`reference/` is the single source for maintained integration content. Read the
Docs and GitBook publish the same Markdown through repository sync. GitHub Pages,
Cloudflare Pages, and the Netlify setup generator are intentionally thin,
platform-specific surfaces; Zenodo preserves versioned release snapshots. See
[DOCUMENTATION.md](DOCUMENTATION.md) for the publishing contract.

## What it does

[Minds](https://getminds.ai) is a synthetic market research platform. This MCP
server lets ChatGPT, Claude, Cursor, and any other MCP client run customer
research end to end without leaving the assistant.

Describe an audience in a brief ("German Gen Z grocery shoppers", "enterprise IT
buyers in fintech") and the server runs deep web research to ground that audience
in government statistics, peer-reviewed studies, and industry reports rather than
in generic model priors. Then ask the Audience a question, run a structured
Study, and export the results.

Typical jobs:

- Concept testing and message testing before creative production
- Ad pretesting, landing page audits, and packaging tests with per-segment reactions
- Buyer persona validation and objection discovery for B2B go to market
- Segment comparison and positioning checks across markets
- Screening research hypotheses before commissioning fieldwork with real respondents

Studies run durably server side, so a long study survives the chat session that
started it. Results export to PDF, DOCX, PPTX, Markdown, CSV, XLS, and SPSS SAV.

**Scope.** Minds does not replace representative human fieldwork. It replaces the
slow first pass: sharpening the question, surfacing objections, and deciding which
assumptions deserve real-respondent validation.

## Setup

### ChatGPT

Enable developer mode under **Settings → Security and login**, then open
**Plugins** and select the plus button. Add `https://getminds.ai/mcp` as a public
HTTPS connection, choose OAuth, and sign in to Minds. Availability depends on
your account and workspace policy.

Study results can render as interactive widgets inline. See the
[official OpenAI connection guide](https://developers.openai.com/plugins/deploy/connect-chatgpt)
and the [Minds setup guide](https://getminds.ai/guide/integration-chatgpt).

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
The repository also contains a Marketplace-ready Cursor plugin manifest at
`.cursor-plugin/plugin.json`; its MCP configuration is intentionally kept in
`cursor.mcp.json` so the shared Agent Plugins configuration can retain the
portable `streamable-http` transport name.

### Google Antigravity

```bash
agy plugins install https://github.com/minds-ai-co/minds-mcp
```

The root `plugin.json` and `mcp_config.json` make this repository an Antigravity
plugin. Antigravity discovers OAuth from the hosted endpoint; authenticate under
Settings, then Customizations. To add only the server, run
`agy mcp add --type http minds https://getminds.ai/mcp` or put
`{"mcpServers": {"minds": {"serverUrl": "https://getminds.ai/mcp"}}}` in
`~/.gemini/config/mcp_config.json`. Full guide:
https://getminds.ai/guide/integration-antigravity

Gemini CLI remains supported for Google Cloud enterprise and API-key users. Its
legacy extension manifest stays available as `gemini-extension.json`.

### ChatGPT and Codex Plugins

The repository includes the shared plugin package at
`.codex-plugin/plugin.json` and its remote server configuration in `.mcp.json`.
The public directory listing uses the same hosted endpoint and maintained
reference content.

### VS Code (Copilot), Windsurf, Langdock, Open WebUI

Add `https://getminds.ai/mcp` as a remote MCP server. Full per-client instructions,
including API key setup, are at https://getminds.ai/mcp/setup.

### API keys

Generate one in the Minds app under **Settings → API Keys**. Keys start with
`minds_` and are passed as `Authorization: Bearer minds_...`.

## Tools

<!-- tools:start -->
<!-- Generated by scripts/sync-mcp-surface.mjs from the production MCP surface. Do not edit by hand. -->

The server advertises 45 tools. Clients read the current schemas at runtime;
the full list with access levels is in [reference/tools.md](reference/tools.md).

| Tool | What it does |
| --- | --- |
| `list_audiences` | Lists the authenticated user's Audiences, most recently updated first, one page at a time (limit, default 20, and offset; nextOffset continues), with Mind counts, sharing state, and links. |
| `import_audience_sources` | Imports supplied UTF-8 text, Markdown, CSV and JSON research files into account-owned storage. |
| `create_audience_from_brief` | Researches a free-text population brief and builds a new Audience of Minds with explicit profiles and exact segment allocation. |
| `get_audience_creation_progress` | Reads progress and never starts or retries anything: an Audience creation by operationId, with its members’ training; or an existing Audience by audienceId, with its member training and background research, or with recalibrationId one recalibration’s status, retained result or terminal error. |
| `render_audience_review` | Shows source research, distributions, proposed Minds, the draft and training for one or more Audience operations, display only: the user confirms or asks for changes in chat. |
| `get_audience_limits` | Returns the authenticated account's current plan (`planName`, as the app names it), its Audience size allowance (per-Audience cap including any team or contract allowance, `customSizeMax`, per-mode ceilings) and the synthetic responses left, read live; it supersedes limits stated elsewhere. |
| `ask_audience` | Asks exactly one standalone question of one existing Audience. |
| `export_audience` | Exports an Audience brief, or with kind "validation_report" the report of its validations (overall score calculation, every KPI, per-question answer shares, provenance), through the same renderer used by the web app. |
| `duplicate_audience` | Permanently copy an Audience with independent copies of its Minds and all they know. |
| `recalibrate_audience` | Changes an existing Audience in place: it keeps its id, its Minds keep theirs (except copies below), and no Mind is deleted. |
| `manage_audience_support` | Manage owner-issued, expiring staff access to one Audience’s composition and receipts. |
| `list_studies` | Lists the authenticated user's Studies, most recently updated first, one page at a time: limit (default 20) and offset, with nextOffset to continue. |
| `create_study` | Creates a Study workspace from existing Audiences or inline Audience configurations. |
| `ask_study` | Submits exactly one respondent-visible question: one standalone question, or one adaptive follow-up whose wording could not be known before earlier results. |
| `get_study_status` | Returns Study progress, per-Audience results, original Mind responses, links and export status. |
| `render_study_results` | Shows the results of finished questions (summary, key findings, Audience breakdowns, Mind responses): one question, or a run's finished questions while the rest still run. |
| `export_study` | Starts an asynchronous export of Study results and returns an export job ID. |
| `duplicate_study` | Permanently copy a Study with its questions and results over the same Audiences. |
| `export_heatmap` | Exports a completed website heatmap from a Study result, identified by the message ID reported with the completed result. |
| `get_study_heatmap` | Reads saved heatmaps of an assigned question asset. |
| `start_study_heatmap` | Starts attention analysis of an assigned image, video or website. |
| `export_mind` | Generates a branded profile for one existing Mind, identified by exact ID or name (partial names and typos resolve to the closest). |
| `get_shared_mind_knowledge` | Read shared Mind sources and assessments. |
| `create_study_plan` | Creates a non-executing draft in an existing Study with its Audiences already attached. |
| `revise_study_plan` | Revises one saved draft at its current draft.id and draft.revision without starting research. |
| `get_study_plan` | Reads the latest saved revision and full review of one draft. |
| `attach_study_audiences` | Adds existing accessible Audiences without removing others, planning or starting research. |
| `render_study_plan` | Shows a saved Study draft at its current revision for interactive review and confirmation. |
| `start_study_run` | Runs one reviewed draft revision after explicit confirmation in a later user turn; skipping review is not confirmation. |
| `resume_study_run` | Resumes an existing plan-limited Study run in place after explicit user approval and the required paid-plan entitlement. |
| `cancel_study_question` | Stops one standalone Study question by runId, or studyId and questionId: queued or preparing stops at once, being answered stops at its next step. |
| `update_item` | Renames a Study or Audience or moves it into a folder. |
| `set_sharing` | Turns a Study's or Audience's public link or team sharing on or off. |
| `list_research_methods` | Reads the fixed Minds research-method catalog in one operation, including availability, complexity and fallback method. |
| `list_study_drafts` | Lists a page of unfinished Study draft summaries, newest first, or returns the complete saved planning state for one exact draft ID. |
| `list_study_templates` | Lists your own and team-shared Study templates, most used first, as a page of summaries (templateId, name, revision, method, question count), or returns one exact templateId with its revision, research method, questions, response settings and question attachments. |
| `save_study_draft` | Creates or checkpoints an unfinished Quick or Custom Study draft without starting research. |
| `save_study_template` | Creates a private Custom template with its questions, response settings, attachments and method. |
| `update_study_template` | Updates one owned Custom template at update.expectedRevision. |
| `use_study_template` | Creates an independent editable Study draft from a readable template at use.expectedRevision. |
| `delete_study_template` | Only for saved Study templates; it cannot delete Studies, Audiences, Minds or answers. |
| `read_study_summary` | Reads saved whole-Study Markdown, evidence blocks and metadata. |
| `refresh_study_summary` | Generates and saves a whole-Study summary after explicit approval. |
| `plan_study_questions` | Deprecated alias of create_study_plan and revise_study_plan; identical behaviour. |
| `run_study_questions` | Deprecated alias of start_study_run; identical behaviour. |

Server card: `https://getminds.ai/.well-known/mcp/server-card.json` (`minds-ai`).
<!-- tools:end -->

Call `list_research_methods` for current executable status, requirements, and
fallbacks before choosing a research method.

## Discovery

- Server card: `https://getminds.ai/.well-known/mcp/server-card.json`
- OAuth protected resource metadata: `https://getminds.ai/.well-known/oauth-protected-resource/mcp`
- Registry name: `ai.getminds/minds`

## Links

- Product: https://getminds.ai
- MCP setup guide: https://getminds.ai/mcp/setup
- API docs: https://getminds.ai/api
- Versioned integration reference: https://doi.org/10.5281/zenodo.21711429
- Documentation publishing model: DOCUMENTATION.md
- GitBook reference: https://minds-1.gitbook.io/minds-mcp/
- Client compatibility: https://minds-mcp-compatibility.pages.dev/
- MCP setup generator: https://minds-mcp-setup-generator.netlify.app/
- Public API explorer: https://minds-api-explorer.vercel.app/?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-repository-links-api-explorer
- API + MCP integration lab: https://minds-api-mcp-integration-lab-bba685.gitlab.io/?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-repository-links-integration-lab
- Support: https://getminds.ai
- Developer portal distribution model: DISTRIBUTION.md
- Google Antigravity plugin manifest: plugin.json
- Google Antigravity MCP configuration: mcp_config.json
