---
title: "How Mothy works"
description: "The ideas behind Mothy: grounded answers, the assistant and its tools, the tamper-evident audit trail, data separation, the approve-before-it-is-real rule, and the privacy boundary."
---

A few ideas run through everything Mothy does. Understanding them makes the rest
of the documentation straightforward.

## Grounded answers

Mothy answers from your organisation's documents, not from a general model's
memory. It finds the passages most relevant to your question and answers only
from them. It quotes figures exactly and says plainly when something is not in the
documents. It does not invent figures.

## The assistant and its tools

Mothy is more than a chat box. It can search your documents, save notes, create
tasks, check your calendar, follow approved procedures
([skills](/mothy-docs/skills/)), run scheduled jobs
([automations](/mothy-docs/automations/)), and split a large task across helpers
([delegation](/mothy-docs/delegation/)). It chooses which of these to use for a
request, but it never has the authority to change anything on its own.

## The audit trail

Everything Mothy does is written to a tamper-evident record. Each entry is chained
to the one before it, so nothing can be quietly altered, deleted, or reordered
without it showing. This is what lets your organisation prove, later, exactly what
the assistant did and who approved the behaviour it followed. See
[Audit and compliance](/mothy-docs/audit-and-compliance/).

## Your data stays separate

Every piece of information in Mothy has an owner. Your private documents and notes
are yours; shared material is available to everyone in your organisation. The
separation is enforced by the system itself, so one person cannot see another
person's private data. See [Users and access](/mothy-docs/users-and-isolation/).

## Approve before it is real

Anything that would change how Mothy behaves follows one rule: Mothy can propose,
but only a person makes it real. When Mothy drafts a new skill or automation, it
does not apply it. It stages a proposal that an administrator reviews and approves
or rejects, and that decision is recorded. See
[Proposals and approvals](/mothy-docs/proposals-and-approvals/).

## Nothing leaves the box

Mothy runs entirely on your dedicated Chrysalis appliance. It does not send your
data anywhere. The only exception is a connector to your own Microsoft 365 tenant,
which is off unless your organisation turns it on, and even then it reaches only
your own tenant. See [Security and privacy](/mothy-docs/security-and-hardening/).
