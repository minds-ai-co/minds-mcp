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
3. confirm or revise the complete question block;
4. call `run_study_questions` with `draft.id`, `draft.revision`, and
   `confirmed: true` only after the user confirms that exact revision;
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

Use `export_study` for executive briefs or full reports in PDF, DOCX, PPTX, or
Markdown, and raw data in CSV, XLS, or SPSS SAV. Exports are asynchronous: preserve
the returned job ID and use `get_study_status` with `export.jobId` and
`export.format` to follow the job. Choose a report for decision-makers and raw
data for further analysis.

## Files and question stimuli

When the chat host supports file handoff, tools with a top-level
`conversationFiles` input accept uploaded or generated images and documents from
that conversation. The host supplies each file's download URL and ID; Minds
copies the file into its own storage before using it. Local filesystem paths
cannot be read by the remote server. Other clients can supply a public HTTP(S)
URL or an existing Minds upload using the tool's attachment schema.

For a planned block, inspect `stimulus.attachments` and
`stimulus.questionAttachments` in the live `plan_study_questions` schema. Assign
stimuli to the questions that should see them; assign an empty attachment list
to screening and pre-exposure questions. Review the assignment with the draft.

## Limits and continuing a stopped run

Use `get_audience_limits` before creating an Audience. A plan-limited response can
include the skipped questions and an upgrade link. Preserve the original run
ID. If the run is resumable and the account is eligible, get confirmation to
continue and call `run_study_questions` with `resume.runId` and `confirmed: true`.
This continues the original run without asking already-answered questions again.
Use `get_study_status` to follow the returned run.

## Saved drafts, templates and copies

`list_study_drafts` and `save_study_draft` let you checkpoint unfinished planning
without starting research. Revisions require the saved draft's current revision;
reuse the creation retry key after an uncertain result.

`list_study_templates` finds reusable templates. `manage_study_template` can
save, update, or use one; updates and use require its current revision. Using a
template creates an editable draft to finish in the Minds app and does not start
research. Updates can overwrite stored configuration and require confirmation.
`delete_study_template` is a separate destructive operation.

`duplicate_audience` copies the Audience and its Minds independently.
`duplicate_study` copies the Study and its finished results over the same
Audiences. Preserve the returned retry key when retrying either operation.

[Open Minds MCP documentation](https://getminds.ai/mcp/setup?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=mcp-docs-workflow)
