# Connect an MCP client

Use the remote endpoint:

```text
https://getminds.ai/mcp
```

OAuth 2.1 is the preferred authentication method when the client supports it;
Minds supports dynamic client registration and Client ID Metadata Documents. For
clients that accept custom headers, create a Minds API key under **Settings → API
Keys** and pass it as a bearer token.

> **Security note:** Treat a Minds API key like a password. Do not commit it to
> a repository, paste it into public logs, or put it in documentation.

## ChatGPT

1. Open **Settings → Security and login** and enable **Developer mode**.
2. Open **Plugins** and select the plus button.
3. Name the connection Minds and enter `https://getminds.ai/mcp` as the public
   HTTPS server URL.
4. Choose OAuth, create the connection, and sign in to Minds.

Developer mode availability depends on your account and workspace policy.
Study results can render as interactive widgets inside ChatGPT. Consult the
[official OpenAI connection guide](https://developers.openai.com/plugins/deploy/connect-chatgpt)
and the [Minds ChatGPT guide](https://getminds.ai/guide/integration-chatgpt) for
current client setup details.

After server tools or metadata change, refresh the connection from its detail
page in ChatGPT Plugins so the client reads the latest definitions.

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

## Google Antigravity

Install the public plugin from GitHub:

```bash
agy plugins install https://github.com/minds-ai-co/minds-mcp
```

Or add only the server from the Antigravity CLI:

```bash
agy mcp add --type http minds https://getminds.ai/mcp
```

Antigravity registers itself through OAuth dynamic client registration. Open
**Settings → Customizations** (Cmd+, or Ctrl+,), click **Authenticate** next to
`minds`, sign in to Minds in the browser, copy the authorization code shown, then
paste it back and click **Submit**. Confirm that `minds` appears under `/mcp`.

For a manual connection, add the following to `~/.gemini/config/mcp_config.json`
or the current workspace's `.agents/mcp_config.json`:

```json
{
  "mcpServers": {
    "minds": {
      "serverUrl": "https://getminds.ai/mcp"
    }
  }
}
```

To use a Minds API key instead of OAuth, add a header to the same entry:
`"headers": { "Authorization": "Bearer minds_YOUR_API_KEY" }`.

Step-by-step guide: <https://getminds.ai/guide/integration-antigravity>

Gemini CLI remains supported for Google Cloud enterprise and API-key users. Its
legacy extension is still available from the same repository.

## ChatGPT and Codex Plugins

Minds is packaged as a shared ChatGPT and Codex plugin in this repository. Until
the public directory review is complete, add `https://getminds.ai/mcp` as an MCP
app (see ChatGPT above) and complete OAuth authorization.

## VS Code, Windsurf, Langdock, and Open WebUI

Add `https://getminds.ai/mcp` as a remote MCP server. The exact configuration
surface differs by client; use OAuth where available and a bearer API key only
when the client supports secure custom headers.

[Open the maintained setup guide](https://getminds.ai/mcp/setup?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-docs-connect)

## Confirm the connection

Ask the client to list the Minds tools. A successful connection should expose
Audience, Study, Mind, export, and research-method operations. Tool schemas are
described by the server at runtime; do not hard-code parameters from an old chat
session.
