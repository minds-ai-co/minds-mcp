# @getminds/mcp

Minds MCP over **stdio**, for MCP clients that cannot connect to a remote
server. It is a transparent bridge: every JSON-RPC message is forwarded to the
hosted Minds MCP server at `https://getminds.ai/mcp`, so you get exactly the
hosted tools, schemas and behavior.

Most clients should connect to `https://getminds.ai/mcp` directly and sign in
with OAuth (Claude, ChatGPT, Cursor, VS Code, Codex, Gemini CLI). Use this
package when your client only supports stdio servers.

## Setup

1. Create an API key in Minds: **Settings → API keys** (it starts with `minds_`).
2. Add the server to your client:

```json
{
  "mcpServers": {
    "minds": {
      "command": "npx",
      "args": ["-y", "@getminds/mcp"],
      "env": { "MINDS_API_KEY": "minds_your_api_key" }
    }
  }
}
```

| Variable | Required | Default |
|---|---|---|
| `MINDS_API_KEY` | yes | — |
| `MINDS_MCP_URL` | no | `https://getminds.ai/mcp` |

An API key acts with its owner's full access and does not expire. Keep it out
of shared config, and revoke it in **Settings → API keys** if it leaks.

## Development

```sh
npm install
npm test   # end-to-end: an SDK client over stdio -> bridge -> a local Streamable HTTP server
```
