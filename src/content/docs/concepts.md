---
title: "Core Concepts"
description: "The ideas the rest of the Mothy docs build on: grounded answers, the agent loop and tools, the tamper-evident audit chain, ownership and isolation, the propose-then-approve rule, and the privacy boundary."
---

Six ideas run through the whole product. Understanding them makes the rest of the
documentation straightforward.

## Grounded answers

Mothy answers from your documents, not from the model's memory. It retrieves the
passages most relevant to a question and is instructed to answer only from them,
to quote figures exactly, to give both the components and the total for a
structured answer, and to say plainly when something is not in the documents. It
does not invent figures. See
[Documents and answers](./documents-and-answers.md).

## The agent loop and tools

Mothy runs a tool-calling loop: it retrieves context, calls the local model with
a set of tools, feeds the results back, and repeats until it can answer. Tools
are added beside each other, never by rearchitecting the loop. The current tools
are `search_documents`, `save_note`, `create_task`, the read-only
`get_calendar_today`, and the agentic tools `skills_list`, `skill_view`,
`skill_propose`, `automation_propose`, and `delegate_task`. The model decides
which to call; it never holds authority to change anything on its own.

## The audit chain

Every action Mothy takes is written to an append-only, hash-chained audit log.
Each row hashes the previous row plus its own contents, so any edit, deletion, or
reordering breaks the chain and is detectable. A database trigger blocks updates
and deletes, and those rights are revoked from the application role. This is the
foundation of the compliance story: not just what the assistant did, but a record
that cannot be quietly altered. See
[Audit and compliance](./audit-and-compliance.md).

## Ownership and isolation

Every piece of user data carries an owner. One rule sets `owner_user_id` on every
write path; a row with no owner is shared by intent. Separation is enforced by
the database, not just the application: Postgres Row-Level Security runs each
signed-in user's requests under a dedicated non-superuser role, so a missed
application filter cannot leak data across users. See
[Users and isolation](./users-and-isolation.md).

## Propose, then approve

Anything self-modifying follows one rule: the model can propose, only a human
commit makes it real. When Mothy drafts a new skill or a new automation, it does
not write it. It stages a proposal that a person reviews as a diff, with the
findings of a deterministic content scan, and approves or rejects. Approval,
rejection, and the applied change are all on the audit chain. See
[Proposals and approvals](./proposals-and-approvals.md).

## The privacy boundary

Nothing leaves the box. All inference is local through Ollama, and the only
network traffic in the core product is localhost to your own Ollama and Postgres.
Any external capability, such as the Microsoft 365 connector, ships disabled and
is enabled per customer by explicit configuration; turning such a flag on is
itself an audited event. A continuous-integration guard fails the build if any
module outside the allowlisted local clients acquires an outbound network call.
