# Run a durable study

A structured Study separates research design from execution. This is useful when
the work has multiple questions, assets, segments, or a method such as MaxDiff.

## 1. Define the population

Start with a specific Audience brief:

> Build an audience of procurement leaders at European manufacturers with
> responsibility for industrial software purchases.

Use `create_audience_from_brief` when you need a new grounded Audience and
`get_audience_creation_progress` to follow it. Use `list_audiences` when the
Audience may already exist.

## 2. Create the Study

Use `create_study` to create the Study around the decision or research goal and
the Audiences it compares. Keep the objective concrete: what decision will the
results inform?

## 3. Choose the execution path

For one straightforward question, use `ask_study` inside the Study, or
`ask_audience` to ask a single Audience without creating a Study first.

For a multi-question Study:

1. call `plan_study_questions`;
2. inspect the proposed draft revision;
3. confirm or revise it;
4. call `run_study_questions` with that exact draft and revision;
5. poll `get_study_status` with the returned `runId` until the durable run
   completes.

The server-side run continues independently of the chat session.

## 4. Inspect disagreement

Do not reduce the Study to one average answer. Look for:

- segment differences;
- recurring objections;
- minority views with strong reasoning;
- uncertainty or evidence gaps;
- reactions that change by market or buyer role.

Use `get_study_summary` for the whole-study view and semantic artifacts.

## 5. Export the result

Use `export_study` to produce PDF, DOCX, PPTX, CSV, XLSX, or JSON output. Choose
a format based on the next consumer: PDF or slides for a decision brief,
spreadsheets for analysis, and JSON for another system.

[Open Minds MCP documentation](https://getminds.ai/mcp/setup?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-docs-workflow)
