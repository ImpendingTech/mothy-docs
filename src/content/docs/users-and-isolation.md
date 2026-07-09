---
title: "Users and Isolation"
description: "Accounts, single-password and multi-user modes, the ownership rule, and database-enforced isolation with Row-Level Security under the mothy_app role. For operators and developers."
---

Mothy can run as a single trust domain or as separate accounts, and in both it
keeps each user's private data separate at the database level.

## Modes

- Single-password mode suits one trust domain: set `AUTH_PASSWORD` and
  `AUTH_SECRET`.
- Multi-user mode gives per-user accounts: set `MULTI_USER` and add users with
  `npm run user:add` (list them with `npm run user:list`). Accounts use scrypt
  password hashing.

## The ownership rule

Every row of user data (documents, chunks, memories, tasks, and the agentic
tables) carries an `owner_user_id`. One rule, `resolveOwnerUserId`, sets it on
every write path. A row with an owner is private to that user; a row with no owner
is shared by intent, readable by everyone. Ingest states ownership explicitly with
`--owner <user>` or `--shared`.

## Database-enforced isolation

Isolation does not rely on the application remembering to filter. Postgres
Row-Level Security enforces it. Each signed-in user's requests run under a
dedicated non-superuser role, `mothy_app`, inside a transaction that sets the user
context, so a missed application filter cannot leak data across users. A startup
probe refuses to serve if that enforced role is not reachable, and the database
superuser is used only for the administrative command-line tools.

This is proven, not asserted: `npm run test:isolation` shows each user sees only
their own data plus the shared corpus, across every data type, including skills
and proposals.

## Related

- [Core concepts](/mothy-docs/concepts/)
- [Audit and compliance](/mothy-docs/audit-and-compliance/)
- [Commands](/mothy-docs/commands/)
