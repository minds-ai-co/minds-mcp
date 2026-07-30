# Minds MCP integration reference

Minds is a remote Model Context Protocol server for evidence-grounded synthetic
market research. It lets an MCP-compatible assistant create audiences, run panel
studies, inspect disagreement, and export structured results without leaving the
assistant.

| Protocol detail | Value |
| --- | --- |
| Remote endpoint | `https://getminds.ai/mcp` |
| Registry name | `ai.getminds/minds` |
| Transport | Streamable HTTP |
| Authentication | OAuth 2.1 with PKCE or Minds API key |
| Study execution | Durable, server-side runs |
| Exports | PDF, CSV, XLSX, JSON, and Markdown |

[Connect Minds to an MCP client](https://getminds.ai/mcp/setup?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=rtd-overview){ .minds-cta }

## What it is for

Use Minds to:

- test concepts, messages, positioning, packaging, or campaign ideas;
- build an audience from a plain-language population brief;
- compare reactions between segments;
- surface objections and disagreement before committing budget;
- screen research hypotheses before representative fieldwork;
- export findings into a research or decision workflow.

Minds grounds a population in external evidence before generating synthetic
respondents. Studies remain available server-side, so a long-running study can
continue after the chat session that started it.

## The operating sequence

1. **Define the audience.** Describe the market, buyer group, or stakeholder set.
2. **Ground the population.** Minds researches statistics and relevant evidence.
3. **Create the panel.** Turn the decision or research goal into a study.
4. **Run the questions.** Ask one question or execute a structured study plan.
5. **Inspect and export.** Compare segments, inspect disagreement, and download results.

## Start here

- [Connect a client](connect.md) for ChatGPT, Claude, Cursor, VS Code, and other clients.
- [Run a study](workflow.md) for a durable end-to-end workflow.
- [Browse the tools](tools.md) exposed by the remote server.
- [Understand the scope](scope.md) before using results in a decision.

The maintained product documentation is available at
[getminds.ai/mcp](https://getminds.ai/mcp?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=rtd-overview-docs).
