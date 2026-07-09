---
title: "Automations"
description: "Approved, versioned scheduled jobs that run a prompt with attached skills in a fresh audited session. Covers schedules, creating via the UI or a proposal, the scheduler, restricted sessions, model-drift skip, pause and resume, run history, and commands."
---

An automation is an approved, versioned job: a prompt, with attached skills, run
in a fresh audited session on a schedule. Typical uses are a morning summary of
new documents, a weekly task digest, or a calendar-aware briefing.

## Schedules

An automation runs on one of three schedule kinds: a five-field cron expression,
a plain interval in seconds, or a one-shot datetime. Schedules are validated when
the automation is proposed or created, and anything that would fire more often
than every five minutes is rejected, because each run drives minutes of local
inference.

## Creating and editing

There are two paths, and both end in a versioned, audited definition:

- Mothy can draft an automation with `automation_propose`. Like a skill draft, it
  enters the [proposals queue](/mothy-docs/proposals-and-approvals/)
  and only becomes runnable when a person approves it at `/proposals`.
- An operator can create or edit an automation directly at `/automations`. A human
  act needs no queue, but it is still validated, versioned, and audited.

Every mutation writes a new revision that snapshots the whole definition,
including the pinned model, with a sha256 on the audit chain. There is no
unversioned edit. Deleting disables; nothing is deleted. Pause and resume are
immediate and audited.

## The scheduler

A deterministic tick, set by `SCHEDULER_TICK_SECONDS` (default 60), runs due jobs
strictly one at a time. Each run is bracketed on the audit chain with
`automation.run_start` (trigger and revision hash) and `automation.run_end`
(status and output hash). Overlapping ticks cannot double-run a job: the
scheduler re-reads the automation when the queue reaches it and refuses if it is
no longer due or enabled, and it skips firing while a previous tick is still in
flight.

## Model-drift skip

Each revision records the model it was approved against. If the configured model
at run time is not that model, the run is skipped, audited as
`automation.run_skip`, and flagged in the panel. An automation is never silently
run on a model other than the one it was approved for.

## Restricted sessions

An automation run uses a read-only toolset: search, skills list and view, and
calendar and email reads. It has no propose, stage, or write tools, so a run can
never mutate anything, and the dispatch loop fails closed and logs if a model
names an excluded tool. Attached skills are injected as subordinate reference
procedures, each load audited with the run id. Delegation is not available inside
an automation unless `DELEGATION_IN_AUTOMATIONS` is set.

## Run history

Every execution is stored with its trigger, status, output and output hash, and
any error, and is visible in the `/automations` panel. Failures surface; nothing
fails silently.

## Commands

- `npm run automations:list` lists definitions.
- `npm run automations:runs [name]` shows run history.
- `npm run test:automations` runs the database-backed audit integration test.

The live-model run is a documented manual check: create an automation in the
panel and press Run now.

## Related

- [Proposals and approvals](/mothy-docs/proposals-and-approvals/)
- [Skills](/mothy-docs/skills/)
- [Configuration](/mothy-docs/configuration/)
