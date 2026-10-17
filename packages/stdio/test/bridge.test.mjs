import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { z } from 'zod'

const bridge = fileURLToPath(new URL('../bin/minds-mcp.mjs', import.meta.url))

// A stateless Streamable HTTP MCP server that, like getminds.ai/mcp, requires a bearer token.
async function startServer() {
  const seen = []
  const http = createServer(async (req, res) => {
    seen.push({ auth: req.headers.authorization, version: req.headers['mcp-protocol-version'], agent: req.headers['user-agent'] })
    if (req.headers.authorization !== 'Bearer minds_test_key') { res.writeHead(401).end(); return }
    const server = new McpServer({ name: 'fake-minds', version: '1.0.0' })
    server.registerTool('echo', { description: 'Echo', inputSchema: { text: z.string() } }, async ({ text }) => ({ content: [{ type: 'text', text: `echo: ${text}` }] }))
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })
    res.on('close', () => { void transport.close(); void server.close() })
    await server.connect(transport)
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    await transport.handleRequest(req, res, chunks.length ? JSON.parse(Buffer.concat(chunks)) : undefined)
  })
  await new Promise(resolve => http.listen(0, '127.0.0.1', resolve))
  return { http, seen, url: `http://127.0.0.1:${http.address().port}/mcp` }
}

async function connect(url, key) {
  const client = new Client({ name: 'bridge-test', version: '1.0.0' })
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [bridge], env: { ...process.env, MINDS_MCP_URL: url, MINDS_API_KEY: key }, stderr: 'pipe' }))
  return client
}

test('forwards initialize, tools/list and tools/call with the API key and protocol version', async () => {
  const { http, seen, url } = await startServer()
  const client = await connect(url, 'minds_test_key')
  try {
    const { tools } = await client.listTools()
    assert.deepEqual(tools.map(tool => tool.name), ['echo'])
    const result = await client.callTool({ name: 'echo', arguments: { text: 'hi' } })
    assert.equal(result.content[0].text, 'echo: hi')
    assert.ok(seen.every(request => request.auth === 'Bearer minds_test_key'))
    assert.match(seen[0].agent, /^minds-mcp-stdio\//)
    // Every request after initialize carries the negotiated version.
    assert.ok(seen.slice(1).every(request => typeof request.version === 'string' && request.version.length > 0))
  } finally {
    await client.close()
    http.close()
  }
})

test('turns a rejected key into a JSON-RPC error instead of hanging', async () => {
  const { http, url } = await startServer()
  try {
    await assert.rejects(connect(url, 'minds_wrong_key'), /Minds MCP request failed|401/)
  } finally {
    http.close()
  }
})

test('exits with guidance when no key is set', async () => {
  const { spawnSync } = await import('node:child_process')
  const run = spawnSync(process.execPath, [bridge], { env: { ...process.env, MINDS_API_KEY: '' }, encoding: 'utf8' })
  assert.equal(run.status, 1)
  assert.match(run.stderr, /MINDS_API_KEY/)
})
