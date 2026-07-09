---
title: "Audit and Compliance"
description: "The tamper-evident hash-chained audit log and UK GDPR data-subject operations. Covers the chain structure, verification, the append-only guarantee, the audit event taxonomy, subject-access export, erasure, retention, and the evidence pack."
---

Mothy's compliance position rests on one thing: an action that cannot be recorded
does not happen, and the record cannot be quietly altered.

## The audit chain

The audit log is append-only and hash-chained. Each row hashes the previous row
plus its own contents, so any edit, deletion, or reordering breaks the chain. Each
entry carries an immutable snapshot of the actor (a user id, or local, or system,
or a source address), the action, a summary, detail, a status, a sequence number,
the previous hash, and the row hash. The owner reference on an entry is a nullable
field, deliberately not part of the hash, so it can be nulled on erasure without
breaking the chain.

Append-only is enforced in the database: a trigger blocks updates and deletes on
the audit log, and those rights are revoked from the application role. Writers are
serialised with an advisory lock so the chain never forks.

## Verifying the chain

`npm run audit verify` walks the chain and reports the first break. Content
hashes recorded on the chain bind mutable rows (skills, proposals, automation
revisions, runs) to the immutable log, so a later edit of one of those rows is
detectable even though the row itself is updatable. The backup restore re-verifies
the chain as part of the restore test.

## The audit event taxonomy

Actions across the product write typed events, all hash-chained and
actor-attributed: authentication events (logins, failures, logouts, rate-limit
lockouts); the tool actions of the agent loop; the skills and proposals events
(`proposal.create`, `proposal.approve`, `proposal.reject`,
`proposal.decide_denied`, `skill.apply`, `skill.view`, `skills_list`,
`skill.archive`, `skill.restore`); the automation events (`automation.apply`,
`automation.run_start`, `automation.run_end`, `automation.run_skip`,
`automation.pause`, `automation.resume`, `automation.act_denied`); and the
delegation events (`subagent.spawn`, `subagent.complete`, and per-child tool
calls). Passwords and message contents are never logged.

## UK GDPR data-subject operations

- Subject-access export: `npm run user:export -- <user>` writes a JSON archive of
  everything the user owns, plus the audit entries where they acted, with a
  plain-language summary. The export is itself audited.
- Erasure: `npm run user:erase -- <user> --confirm` hard-deletes the user's
  documents, chunks, memories, and tasks and removes the account, in one
  transaction, retaining the audit trail with the owner nulled. Without
  `--confirm` it previews.
- Retention: `RETENTION_DELETED_DAYS` (default 30) sets the window, and
  `npm run retention:sweep` hard-deletes soft-deleted rows past it. The audit log
  is never swept.

## The evidence pack

Draft compliance artefacts live in the repository's `gdpr/` directory: a DPIA, a
ROPA, a retention policy, a DPA template, subject-access and erasure procedures,
and a breach-notification procedure. These are marked drafts, pending legal
review.

## Related

- [Security and hardening](./security-and-hardening.md)
- [Users and isolation](./users-and-isolation.md)
- [Commands](./commands.md)
