# Connect an MCP client

Use the remote endpoint:

```text
https://getminds.ai/mcp
```

OAuth is the preferred authentication method when the client supports it. For
clients that accept custom headers, create a Minds API key under **Settings → API
Keys** and pass it as a bearer token.

> **Security note:** Treat a Minds API key like a password. Do not commit it to
> a repository, paste it into public logs, or put it in documentation.

## ChatGPT

1. Open **Settings**.
2. Open **Connected Apps**.
3. Add `https://getminds.ai/mcp`.
4. Complete OAuth authorization.

Panel results can render as interactive widgets inside ChatGPT.

## Claude and Claude Desktop

1. Open **Customize → Connectors**.
2. Add `https://getminds.ai/mcp` as a remote connector.
3. Complete OAuth authorization.

For Claude Code with an API key:

```bash
claude mcp add --transport http mindsai https://getminds.ai/mcp \
  --header "Authorization: Bearer minds_YOUR_API_KEY"
```

## Cursor

1. Open **Settings → MCP**.
2. Add `https://getminds.ai/mcp`.
3. Complete OAuth authorization when prompted.

## VS Code, Windsurf, Langdock, and Open WebUI

Add `https://getminds.ai/mcp` as a remote MCP server. The exact configuration
surface differs by client; use OAuth where available and a bearer API key only
when the client supports secure custom headers.

[Open the maintained setup guide](https://getminds.ai/mcp/setup?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-docs-connect)

## Confirm the connection

Ask the client to list the Minds tools. A successful connection should expose
audience, panel, study, export, and research-method operations. Tool schemas are
described by the server at runtime; do not hard-code parameters from an old chat
session.
