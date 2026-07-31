# Documentation publishing model

The Markdown files in `reference/` are the canonical source for maintained Minds
MCP integration documentation.

## Maintained documentation

- Read the Docs builds `reference/` with MkDocs.
- GitBook synchronizes `reference/` from this repository with Git Sync.
- Future documentation hosts must import or build from `reference/`; do not create
  a second manually maintained copy.

Navigation files and platform configuration may differ, but product behavior,
setup guidance, tool descriptions, research scope, and examples must be edited in
`reference/` first.

## Platform landing pages

`docs/` and `cloudflare-pages/` are intentionally platform-specific landing and
compatibility surfaces. Their visual design may differ. Keep their technical
content compact, link into the maintained setup/reference material, and avoid
turning either surface into an independent manual.

## Versioned archives

GitHub Releases and Zenodo preserve versioned snapshots. They do not track every
documentation commit. When an archived file changes materially, publish a new
release and Zenodo version instead of replacing the historical snapshot.

## Link rules

- Use `https://getminds.ai/mcp` only when identifying the Streamable HTTP
  transport endpoint.
- Send normal browser visits to `https://getminds.ai/mcp/setup`.
- Use the shared content campaign:
  `utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference`.
- Use content-based `utm_content` values rather than host-specific values so the
  same Markdown remains valid on every documentation host.
