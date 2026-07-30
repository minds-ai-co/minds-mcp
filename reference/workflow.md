# Run a durable study

A structured study separates research design from execution. This is useful when
the work has multiple questions, assets, segments, or a method such as MaxDiff.

## 1. Define the population

Start with a specific audience brief:

> Build an audience of procurement leaders at European manufacturers with
> responsibility for industrial software purchases.

Use `create_group_from_brief` when you need a new grounded audience. Use
`list_groups` when the audience may already exist.

## 2. Create the panel

Use `create_panel` to create the study container around the decision or research
goal. Keep the objective concrete: what decision will the results inform?

## 3. Choose the execution path

For one straightforward question, use `ask_panel`.

For a multi-question study:

1. call `plan_panel_study`;
2. inspect the proposed plan;
3. confirm or revise it;
4. call `run_panel_study`;
5. poll `get_panel_study` until the durable run completes.

The server-side run continues independently of the chat session.

## 4. Inspect disagreement

Do not reduce the panel to one average answer. Look for:

- segment differences;
- recurring objections;
- minority views with strong reasoning;
- uncertainty or evidence gaps;
- reactions that change by market or buyer role.

Use `get_panel_summary` for the whole-study view and semantic artifacts.

## 5. Export the result

Use `export_panel` to produce PDF, CSV, XLSX, or JSON output. Choose a format
based on the next consumer: PDF for a decision brief, spreadsheets for analysis,
and JSON for another system.

[Open Minds MCP documentation](https://getminds.ai/mcp?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=rtd-workflow){ .minds-cta }
