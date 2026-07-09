---
title: "Data Model"
description: "The Mothy database tables (Postgres with pgvector, Drizzle): users, documents and chunks, memories and tasks, the audit log, connector tokens, staged actions, and the skills, proposals, and automations tables."
---

Mothy stores everything in Postgres with the pgvector extension, defined with
Drizzle. The tables below are the whole model.

## Core

- `users` - accounts, with a scrypt password hash and a soft-delete via
  `deleted_at`.
- `documents`, `chunks` - ingested content; `chunks` hold the pgvector embedding.
- `memories`, `tasks` - durable facts and to-dos.

Each of these carries `owner_user_id`: a user id for private data, or NULL for
shared. Ownership is set on every write path and enforced by Row-Level Security.

## Audit

- `audit_log` - append-only and hash-chained. Columns include `actor` (an
  immutable snapshot of who acted), `action`, `summary`, `detail`, `status`,
  `seq`, `prev_hash`, and `row_hash`. Its `owner_user_id` is a nullable foreign
  key, deliberately not part of the hash, set NULL when an account is erased.

## Connectors and actions

- `m365_tokens` - per-user Microsoft 365 tokens, AES-256-GCM encrypted, one row
  per user, cascade-deleted on erasure.
- `staged_actions` - write actions awaiting user confirmation (owner, kind,
  status, payload, expiry).

## Skills and proposals

- `skills` - approved procedures (SKILL.md content), with status active, stale, or
  archived, and usage counters. Mutated only by an approved proposal, the curator,
  or a restore; never by the model directly.
- `skill_revisions` - immutable history: the full content and its sha256 per
  applied change. The same hash sits on the audit chain, so editing a revision
  after the fact is detectable.
- `proposals` - drafted changes awaiting a human decision (kind, target, payload,
  content hash, proposer, status). Kinds cover skills (create, patch, delete) and
  automations (create, update, delete).

## Automations

- `automations` - approved scheduled jobs (prompt, schedule, attached skill names,
  enabled flag, state, next and last run).
- `automation_revisions` - immutable definition snapshots, including the pinned
  model, with a sha256 and revision number.
- `automation_runs` - one row per execution: trigger, status, output and its hash,
  and any error.

## Related

- [Audit and compliance](/mothy-docs/audit-and-compliance/)
- [Users and isolation](/mothy-docs/users-and-isolation/)
