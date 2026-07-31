# Practical MCP cookbook

These recipes describe complete research jobs rather than isolated tool calls.
Let the connected client inspect the live tool schemas before constructing
arguments, and confirm a proposed study plan before execution.

## Test positioning across two buyer segments

Use this when a positioning decision depends on different buyer roles.

1. Use `list_groups` to check whether the audiences already exist.
2. If needed, use `create_group_from_brief` with a specific population
   description for each segment.
3. Create one panel that contains both groups.
4. Ask the same focused positioning question across the panel.
5. Use `get_panel_summary` to inspect agreement, disagreement, and segment
   differences.
6. Export the result for the decision record.

Example population briefs:

> Procurement leaders at European manufacturers who buy industrial software.

> Operations leaders at the same companies who use the software day to day.

Keep the question neutral. Ask what is clear, credible, relevant, and missing
before asking respondents to choose a winner.

## Screen a concept before fieldwork

Use a synthetic panel to identify what representative human research should test,
not to claim population-level preference.

1. Create or reuse the intended audience.
2. Create a panel around the decision the concept must inform.
3. Ask one diagnostic question first: what does the concept appear to promise?
4. Follow with questions about relevance, credibility, objections, and missing
   information.
5. Inspect minority views as well as the majority pattern.
6. Convert unresolved assumptions into a human-research brief.

For multiple questions, use `plan_panel_study`, inspect the plan, then run the
confirmed version with `run_panel_study`.

## Run a durable message study

Use this sequence when the study must survive the initiating chat session.

1. Call `plan_panel_study` with the decision, audience, messages, and required
   comparison.
2. Review the proposed order and remove leading or redundant questions.
3. Confirm the plan.
4. Call `run_panel_study`.
5. Poll `get_panel_study` until the run completes.
6. Use `get_panel_summary` for the whole-study view.
7. Export the result in the format required by the next consumer.

Durable execution means the server-side run continues independently of the chat
session. Preserve the audience definition, approved plan, and export together.

## Check method availability before planning

Do not assume that a named research method is executable.

1. Call `list_research_methods`.
2. Check the current execution status.
3. Select only an available method.
4. Use a structured study plan when the method requires multiple tasks.

MaxDiff currently executes through a deterministic adapter. Conjoint is planned
but cannot currently execute. The live server response remains authoritative.

## Finish with the right validation

Before using a result in a consequential decision:

- inspect segment differences and uncertainty;
- separate evidence-backed findings from plausible hypotheses;
- identify claims that require representative human validation;
- retain the audience definition and study plan;
- export the result into the decision workflow.

[Connect Minds and start a study](https://getminds.ai/mcp/setup?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-docs-cookbook)
