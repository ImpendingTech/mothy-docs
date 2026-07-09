---
title: "Delegation"
description: "How Mothy splits independent lookups across restricted subagents. Covers structural containment, the fixed child toolset, concurrency and iteration caps, the audit trail, and when delegation applies."
---

Delegation lets Mothy split a large task into independent lookups that run in
parallel child sessions and return only their summaries. It suits work like
checking a question across many documents or cross-referencing several policies at
once.

## How it works

The main interactive loop calls `delegate_task` with up to eight tasks per call,
each a goal and a self-contained context. Children run within the parent turn,
and only their final summaries enter the parent context.

## Structural containment

Containment is built into the shape of a child session, not asked for by prompt:

- A child starts with none of the parent conversation, only the goal and context
  it is given.
- Its toolset is fixed to `search_documents` and `skill_view`. It cannot delegate
  further, so depth is one by construction, and it cannot propose or write memory,
  tasks, notes, or drafts.
- A child acts as the same user as the parent, never elevated, so Row-Level
  Security holds unchanged.

## Caps

Concurrency and per-child work are bounded by configuration:
`DELEGATION_CONCURRENCY` (default 2, maximum 4) child sessions at once, and
`DELEGATION_CHILD_ITERATIONS` (default 20) tool-loop steps each. These keep
delegation within the appliance's concurrent-session budget.

## Audit

The chain alone can reconstruct a delegated task. Each child is bracketed with
`subagent.spawn` (a goal summary, a correlation id, and the parent turn's ask id)
and `subagent.complete` (status and a sha256 of the summary the parent received),
and every child tool call is audited at summary level carrying the correlation
id.

## Where it applies

Delegation is offered in the main interactive loop. It is not available inside an
automation run unless `DELEGATION_IN_AUTOMATIONS` is set.

## Related

- [Core concepts](./concepts.md)
- [Automations](./automations.md)
- [Audit and compliance](./audit-and-compliance.md)
