# Minds Synthetic Market Research

Minds provides grounded synthetic audiences for early, directional market and
user research. Makers can create or reuse an audience, ask a focused question,
prepare a reviewable multi-question study, explicitly confirm it, monitor its
durable execution, and export the evidence.

## Common use cases

- Test a product concept or positioning statement before production.
- Compare reactions across customer segments or markets.
- Identify objections and minority views in an audience.
- Review a landing page, campaign message, packaging concept, or research brief.
- Prepare structured studies and export evidence for a decision team.

## How the workflow works

1. List an existing Group or create a grounded Group from an audience brief.
2. Create a Panel around the decision or research objective.
3. Ask one focused question, or prepare a structured study draft.
4. Review the exact study plan before confirming execution.
5. Monitor the durable run until it completes.
6. Inspect disagreement and export the evidence.

Minds separates study planning from execution. `plan_panel_study` does not start
research. `run_panel_study` requires explicit confirmation of the exact stored
draft revision.

## Authentication and setup

Minds uses OAuth 2.1 with PKCE for interactive clients. The Microsoft certified
connector receives its OAuth configuration through Azure Key Vault. Reviewers
can find the public setup guide at https://getminds.ai/mcp/setup and contact
developers@getminds.ai for technical support.

## Data handling

Minds processes the audience briefs, research stimuli, questions, source files,
and account data needed to perform the requested workflow. Groups and Panels are
private by default. A public sharing link is created only when a user explicitly
enables link sharing. Public privacy and terms information is available at:

- https://getminds.ai/legal/dataprivacy
- https://getminds.ai/legal/terms

## Known issues and limitations

- Minds is intended for early, directional research. It does not replace
  representative human fieldwork for high-stakes decisions.
- Long-running studies are asynchronous. Use the status tools until the durable
  run completes.
- Conjoint is planned and cannot execute yet. Query the research-method catalog
  for current availability.
- Advanced methods can require explicit opt-in and plan eligibility.
- Usage and audience-size limits depend on the connected Minds plan.
- A user must review the exact structured study draft before execution.

## Support

- Product: https://getminds.ai/
- MCP setup: https://getminds.ai/mcp/setup
- API overview: https://getminds.ai/api/overview
- Technical contact: developers@getminds.ai
