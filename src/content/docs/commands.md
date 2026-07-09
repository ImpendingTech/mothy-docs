---
title: "Commands"
description: "The Mothy command-line reference, grouped by area: run and ask, ingest and search, users and data-subject operations, skills, automations, delegation, connectors, database setup, and quality checks."
---

The command-line reference, grouped by area. Admin and command-line scripts print
plainly for the operator; library and server code use the structured logger.

## Run and ask

- `npm run web` - start the server (chat at `localhost:3000`).
- `npm run agent -- "..."` - ask a question from the command line.

## Ingest and search

- `npm run ingest [-- --owner <user> | --shared]` - ingest `./data`.
- `npm run search` - query the corpus directly.
- `npm run tasks` - list tasks Mothy has created.

## Users and data-subject operations

- `npm run user:add`, `npm run user:list` - manage accounts.
- `npm run user:export -- <user>` - subject-access export.
- `npm run user:erase -- <user> --confirm` - erase a user (previews without
  `--confirm`).
- `npm run retention:sweep [-- --confirm]` - hard-delete soft-deleted rows past the
  retention window.

## Skills and proposals

- `npm run skills:list`, `npm run skills:restore -- <name>`.
- `npm run proposals:pending`.
- `npm run test:skills` - database-backed audit integration test.

## Automations

- `npm run automations:list`, `npm run automations:runs [name]`.
- `npm run test:automations` - database-backed audit integration test.

## Delegation

- `npm run test:delegation` - database-backed test (the parent-loop section needs
  Ollama with the embedding model).

## Connectors and actions

- `npm run m365:connect -- <user>` - connect a user's Microsoft 365 account.
- `npm run action:list -- <user>`, `npm run action:confirm -- <id> --confirm`,
  `npm run action:reject -- <id> --confirm` - manage staged write actions.

## Audit

- `npm run audit [verify]` - inspect or verify the audit chain.

## Database setup

- `npm run db:push`, then `npm run db:harden` (re-applies Row-Level Security and
  the audit trigger, which `db:push` drops).
- `npm run db:index`, `npm run db:assign-owner`.
- `npm run test:isolation` - prove Row-Level Security isolation.

## Quality

- `npm run check` - typecheck. `npm test` - unit tests.
- `npm run lint`, `npm run format:check`.
- `npm run eval`, `npm run eval:fostering` - scored answer-quality checks.

## Related

- [Configuration](./configuration.md)
- [Getting started](./getting-started.md)
