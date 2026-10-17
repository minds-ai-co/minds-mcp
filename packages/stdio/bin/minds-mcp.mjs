#!/usr/bin/env node
// Minds MCP over stdio. Forwards every JSON-RPC message between this process's
// stdin/stdout and the hosted Minds MCP server, so stdio clients get exactly the
// hosted tools, schemas and behavior. Authenticates with a Minds API key.
import { readFileSync } from 'node:fs'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const url = process.env.MINDS_MCP_URL || 'https://getminds.ai/mcp'
const apiKey = (process.env.MINDS_API_KEY || '').trim()

if (!apiKey) {
  process.stderr.write('minds-mcp: set MINDS_API_KEY to a Minds API key (Settings > API keys at https://getminds.ai).\n')
  process.exit(1)
}

const remote = new StreamableHTTPClientTransport(new URL(url), {
  requestInit: { headers: { Authorization: `Bearer ${apiKey}`, 'User-Agent': `minds-mcp-stdio/${version}` } },
})
const local = new StdioServerTransport()
const initializeIds = new Set()
const log = message => process.stderr.write(`minds-mcp: ${message}\n`)

local.onmessage = message => {
  if (message.method === 'initialize' && message.id !== undefined) initializeIds.add(message.id)
  remote.send(message).catch(error => {
    log(`request failed: ${error.message}`)
    if (message.id === undefined) return
    const status = error.code === 401 || /401/.test(error.message) ? ' Check MINDS_API_KEY.' : ''
    void local.send({ jsonrpc: '2.0', id: message.id, error: { code: -32603, message: `Minds MCP request failed: ${error.message}.${status}` } })
  })
}

remote.onmessage = message => {
  // Later requests must carry the negotiated MCP-Protocol-Version header.
  if (message.id !== undefined && initializeIds.delete(message.id) && message.result?.protocolVersion) {
    remote.setProtocolVersion(message.result.protocolVersion)
  }
  void local.send(message)
}

remote.onerror = error => log(`remote error: ${error.message}`)
local.onerror = error => log(`stdio error: ${error.message}`)
local.onclose = () => { void remote.close().finally(() => process.exit(0)) }

await remote.start()
await local.start()
