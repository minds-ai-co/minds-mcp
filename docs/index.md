---
title: Minds MCP Server
description: Run synthetic customer research, concept testing, and audience studies from any MCP-compatible AI assistant.
---

# Minds MCP Server

Connect an AI assistant to [Minds](https://getminds.ai/) and run grounded
synthetic customer research without leaving the conversation.

**MCP endpoint:** [`https://getminds.ai/mcp`](https://getminds.ai/mcp)

**Complete setup guide:** [Minds MCP documentation](https://getminds.ai/mcp/setup)

**Registry name:** `ai.getminds/minds`

## What you can do

- Build a research audience from a plain-language population brief.
- Test concepts, messages, advertisements, packaging, and landing pages.
- Compare reactions across customer or buyer segments.
- Run structured, durable studies and monitor their progress.
- Export results to PDF, CSV, XLSX, JSON, and Markdown.

Minds grounds synthetic audiences in external research before a study begins.
It is designed to improve the first research pass: expose objections, sharpen
hypotheses, and identify the questions that deserve validation with human
respondents.

## Connect from Claude Code

```bash
claude mcp add --transport http mindsai https://getminds.ai/mcp \
  --header "Authorization: Bearer minds_YOUR_API_KEY"
```

Create an API key in Minds under **Settings → API Keys**. Keys begin with
`minds_`.

## Connect from ChatGPT, Claude, Cursor, or another MCP client

Add this remote MCP endpoint:

```text
https://getminds.ai/mcp
```

Use OAuth when your client supports it. For clients that accept custom headers,
send an API key as:

```text
Authorization: Bearer minds_YOUR_API_KEY
```

See the [client-by-client instructions](https://getminds.ai/mcp/setup) for
ChatGPT, Claude, Cursor, VS Code, Windsurf, Langdock, and Open WebUI.

## Available research tools

| Tool | Purpose |
| --- | --- |
| `create_group_from_brief` | Build a grounded synthetic audience from a population brief. |
| `ask_group` | Survey or interview a saved audience. |
| `create_panel` | Create a panel or study from a research goal. |
| `ask_panel` | Ask one question across a panel. |
| `plan_panel_study` | Draft a structured multi-question research plan. |
| `run_panel_study` | Execute a confirmed study as a durable server-side run. |
| `get_panel_study` | Check progress and retrieve study artifacts. |
| `export_panel` | Export panel results in common research formats. |

The live server describes its current tools and schemas to each connected MCP
client. Ask your assistant to list the Minds tools after connecting.

## Discovery and source

- [Minds MCP product page](https://getminds.ai/mcp)
- [Minds API documentation](https://getminds.ai/api)
- [Server card](https://getminds.ai/.well-known/mcp/server-card.json)
- [Open-source discovery metadata](https://github.com/minds-ai-co/minds-mcp)

Minds MCP is a hosted service. This repository contains its public discovery
metadata and integration documentation.
