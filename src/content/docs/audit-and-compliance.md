---
title: "Audit and compliance"
description: "The tamper-evident audit trail and the UK GDPR operations a data controller needs."
---

Mothy is built so that what it does can be proven and defended. This page is for
administrators and anyone responsible for compliance.

## The audit trail

Every action is written to an append-only, tamper-evident record. Each entry is
chained to the one before, so any change, deletion, or reordering breaks the chain
and is detectable. Each entry records who acted, what they did, and when. Logins,
sign-in failures, and lockouts are recorded too. Passwords and message contents
are never recorded.

## What this gives you

Because approvals, automation runs, and delegated actions all sit on the same
trail, you can show not only what the assistant did, but who approved the
behaviour it followed. The trail can be verified end to end at any time.

## Data-subject requests (UK GDPR)

Mothy supports the operations a data controller needs. A person's data can be
exported as a complete, readable archive, or erased in full while keeping the
audit trail intact. Old, deleted information is cleared automatically after a set
period. Your administrator carries these out, and Impending Tech can assist. A
pack of supporting evidence (a DPIA, a record of processing, retention and breach
procedures, and a data-processing agreement template) is available for your own
legal review.

## Related

- [Security and privacy](/mothy-docs/security-and-hardening/)
- [Users and access](/mothy-docs/users-and-isolation/)
