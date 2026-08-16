# Microsoft MCP certification package

This directory contains the source for the Minds submission to Microsoft MCP
server certification. The package targets the hosted Streamable HTTP endpoint at
`https://getminds.ai/mcp` and the complete advertised tool surface.

The committed files contain no OAuth client secret, API key, reviewer
credential, or Azure Key Vault secret. Microsoft retrieves the OAuth
configuration from the Minds-owned Azure Key Vault named in the generated
manifest.

## Package contents

- `manifest.template.json`: public package metadata with placeholders for the
  Partner Center app ID and Azure Key Vault URI.
- `mcptools.json`: ASCII-safe snapshot of the advertised MCP tools and schemas.
- `intro.md`: reviewer and administrator documentation.
- `Color.png` and `Outline.png`: Microsoft 365 package icons.
- `scripts/sync-tools.mjs`: refreshes the tool snapshot from a deployed Minds
  MCP endpoint.
- `scripts/validate.mjs`: validates package structure, metadata, tool titles,
  descriptions, and image dimensions.
- `scripts/build-package.mjs`: produces a submission-ready ZIP without placing
  secrets in the repository.

## Refresh and validate

Refresh from production only after the intended MCP build is live:

```bash
MCP_SCHEMA_SOURCE=https://getminds.ai/mcp \
  node integrations/microsoft-mcp/scripts/sync-tools.mjs

node integrations/microsoft-mcp/scripts/validate.mjs
```

For pre-release validation, set `MCP_SCHEMA_SOURCE` to the staging endpoint and
record that the resulting package must not be submitted until production has
the same tool metadata.

## Build the private submission ZIP

```bash
MICROSOFT_MCP_APP_ID="00000000-0000-0000-0000-000000000000" \
MICROSOFT_KEY_VAULT_URI="https://example.vault.azure.net/" \
  node integrations/microsoft-mcp/scripts/build-package.mjs
```

The generated ZIP is written under `integrations/microsoft-mcp/dist/`, which is
ignored by Git. Upload that ZIP to the existing Minds offer in Partner Center.

## Submission guardrails

- Complete Microsoft Partner Center business verification first.
- Enroll the verified publisher in the Microsoft 365 and Copilot program.
- Use the `Apps and Agents for M365 and Copilot` offer type.
- Store `ClientId`, `ClientSecret`, `AuthorizationUrl`, `TokenUrl`, `RefreshUrl`,
  and `Scopes` in Azure Key Vault with the exact required casing.
- Grant Microsoft's certification service principal only the Key Vault Secrets
  User access needed for review.
- Run the wire-level audit against production immediately before submission.
- Do not submit a staging-only schema or commit any OAuth secret.

Canonical setup documentation remains in `reference/`. This directory is only
the Microsoft package adapter and must not become a separate documentation
source of truth.
