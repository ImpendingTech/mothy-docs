---
title: "Proposals and Approvals"
description: "The review queue that turns a model-drafted change into a real one. Covers the diff review at /proposals, the deterministic content scan, the approve and reject flow, exactly-once approval, and the audit events."
---

The proposals queue is the single mechanism by which anything self-modifying
becomes real. It serves skills and automations, and anything staged later. The
rule is constant: the model drafts, a human commits.

## What a proposal is

When Mothy drafts a change, it stages a proposal rather than applying it. A
proposal records the kind (create, update, or delete for a skill or an
automation), the target, the proposed content, a content hash, the proposer, and
a status of pending, approved, or rejected. Nothing about the live skill or
automation changes until a person decides.

## Reviewing at /proposals

Operators review pending proposals in the web UI at `/proposals`, behind the
existing authentication and CSRF protection. Each proposal shows a line diff (old
against new for an update) and the findings of a content scan. You can list
pending proposals from the command line with `npm run proposals:pending`.

## The content scan

Before a proposal can be approved, a deterministic scan runs on the proposed
content:

- Invisible or bidirectional Unicode control characters block approval outright.
- Credential-shaped strings and exfiltration or policy-override phrasing are
  flagged and must be explicitly acknowledged by the approver before approval.

The scan is plain code, not a model, so its decisions are repeatable.

## Approve or reject

Approval applies the change and writes an immutable revision, recording the
content sha256 on the audit chain, all in one transaction. The approval claims
the proposal with a status-guarded update inside that same transaction, so
concurrent approvals apply exactly once and a failed apply rolls the claim back.
Rejection discards the proposal. A cross-user attempt to decide a proposal is
refused and audited.

## Audit events

`proposal.create`, `proposal.approve`, `proposal.reject`, and
`proposal.decide_denied` for a cross-user attempt. Each carries the proposal
content hash, so the review trail is bound to the immutable chain.

## Related

- [Skills](./skills.md)
- [Automations](./automations.md)
- [Audit and compliance](./audit-and-compliance.md)
