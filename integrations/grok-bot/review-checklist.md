# Grok Bot review and publication checklist

This package is preparation for an existing Minds MCP workflow. It is not proof
of a Grok Bot installation, public template, marketplace submission or listing.

## Evidence already collected

On 2026-10-18, production MCP discovery through the existing authenticated
`minds-production` integration returned 40 tools. Calls to
`get_audience_limits` and `list_research_methods` returned structured results
without an MCP error. No research was started and no customer resources were
created or changed by these checks.

The following URLs returned HTTP 200:

- `https://getminds.ai/mcp`
- `https://getminds.ai/.well-known/oauth-authorization-server`
- `https://getminds.ai/.well-known/oauth-protected-resource`
- `https://getminds.ai/mcp/setup`
- `https://raw.githubusercontent.com/minds-ai-co/minds-mcp/main/assets/logo.svg`

The logo is a square SVG with a yellow background plate. OAuth discovery lists
the Minds authorization, token and dynamic registration endpoints. These are
transport and read-only tool checks; they do not establish successful Grok Bot
OAuth or completed research. Tool inventories can change; discover them again
in the target client.

## In-app acceptance — not yet executed

Use the official Grok Bot app and an eligible account. Grok Bot's documented
sign-in uses a Cursor account. Do not purchase a subscription or change an
account's privacy setting as part of this checklist without the owner's
decision.

1. Create one Bot with the name, description and instructions in
   `bot-instructions.md`. No routine or automatic research schedule is needed.
2. Add Minds as a remote HTTPS MCP connection using
   `https://getminds.ai/mcp`. Complete the normal OAuth flow. Confirm the
   intended Minds account and dedicated QA workspace before any write.
3. Discover tools and run the current read-only allowance and research-method
   calls. Confirm real structured results, without displaying credentials or
   unrelated account data.
4. In the QA workspace, request a small concept or message test. Review the
   Audience and its allowances. Create the Study and one plan containing all
   known questions. Verify the exact questions, stimuli and saved revision are
   shown. Verify research has not started before a later user confirmation.
5. Confirm that revision in a subsequent user turn. Run it once, inspect its
   status and read the completed results. Confirm the Bot identifies all
   respondents as synthetic and ties claims to stored evidence.
6. Ask for an export. Confirm it is complete and opens correctly. Verify that
   resources and results remain private unless explicitly shared.
7. Disconnect Minds in a disposable test account. Verify the Bot gives setup
   guidance and does not invent results. Reconnect with the provider's normal
   OAuth flow; do not transfer tokens or browser sessions between users.

Record client version, test date, package revision, completed cases and a
sanitized result. Keep private account IDs, research content and credentials
out of the public evidence. Leave any case not exercised marked unexecuted.

## Publish the Bot template — pending acceptance

Use the app's Share menu to create a template. Inspect every shared instruction,
memory, skill, routine and plugin. Remove customer material and account-specific
state before selecting a public link. Keep the setup instructions: xAI's guide
says custom MCP servers and scripts do not automatically carry into templates.

Open the resulting public preview and test import into a second account.
Confirm that the importer connects their own Minds account and receives none
of the creator's login, files or private research. Record the template URL.
Publishing a public template alone does not prove inclusion in the Bot catalog.

## Request marketplace review — pending acceptance

Company Knowledge records an earlier accepted Cursor publisher application
with handle `minds`, pending review. Its current status is unverified. Check that
record and the current publisher portal before submitting. Use an in-place
amendment if this is the same application; do not duplicate the Cursor request.

The xAI plugin submission page offers Grok Bot as a destination and requires an
MCP URL or public repository, a square background-plate logo, description,
testing instructions, publisher contact details, and confirmation of local and
in-app testing. `submission-draft.json` supplies public technical fields; its
testing attestation deliberately remains false until the required checks pass.

Review the live publisher terms and complete the form only when the attestation
is true. Preserve the receipt and distinguish application acceptance, review
approval and a publicly visible listing. No documented automatic path from a
public Bot template to the Bot catalog was established in this investigation.

## Official references

- [Create and manage Bots](https://docs.x.ai/grok-bot/bots)
- [Get started and account requirements](https://docs.x.ai/grok-bot/get-started)
- [Templates and custom MCP setup](https://x.ai/bot/guides/templates-for-grok-bot)
- [Plugin and MCP submission form](https://x.ai/bot/marketplace/submit-a-plugin)
- [Minds connection reference](../../reference/connect.md)
- [Minds research workflow](../../reference/workflow.md)
