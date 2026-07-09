---
title: "Configuration"
description: "The Mothy configuration reference: every environment variable, grouped by area, with defaults. Configuration is read and validated in one place and invalid config fails fast."
---

Mothy reads and validates every environment variable in one place; nothing reads
the environment ad hoc, and invalid configuration fails fast. The keys below are
grouped by area, with defaults where they apply.

## Database

- `DATABASE_URL` - the superuser connection, used by the admin command-line tools.
- `DB_PORT`, `POSTGRES_PASSWORD` - local database port and password.
- `APP_DATABASE_URL` - the connection for the enforced `mothy_app` role used on
  the live request path.
- `APP_DB_PASSWORD` - the `mothy_app` role password.

## Models

- `OLLAMA_URL` - the local Ollama endpoint.
- `EMBED_MODEL`, `EMBED_DIM` - the embedding model and its dimension.
- `CHAT_MODEL`, `CHAT_TEMPERATURE` - the chat model and sampling temperature.
- `EMBED_TIMEOUT_MS`, `CHAT_TIMEOUT_MS` - request timeouts.

## Web and authentication

- `WEB_PORT`, `WEB_HOST` - the listen port and host. A non-loopback host requires
  authentication or Mothy refuses to start.
- `COOKIE_SECURE` - set the Secure cookie and HSTS behind a TLS-terminating proxy.
- `AUTH_PASSWORD`, `AUTH_SECRET` - single-password mode credentials and signing
  secret.
- `MULTI_USER` - switch on per-user accounts.

## Retention

- `RETENTION_DELETED_DAYS` - retention window for soft-deleted rows (default 30).

## Skills lifecycle

- `SKILL_STALE_DAYS` - unused days before a skill is marked stale (default 30).
- `SKILL_ARCHIVE_DAYS` - unused days before a skill is archived (default 90; must
  exceed the stale window).
- `SKILL_CURATOR_INTERVAL_HOURS` - the curator cadence (default 24).

## Automations and delegation

- `SCHEDULER_TICK_SECONDS` - the scheduler tick interval (default 60).
- `DELEGATION_IN_AUTOMATIONS` - allow delegation inside automation runs (default
  off).
- `DELEGATION_CONCURRENCY` - concurrent child sessions (default 2, maximum 4).
- `DELEGATION_CHILD_ITERATIONS` - tool-loop steps per child (default 20).

## Logging

- `LOG_LEVEL` - the log level (default info).

## Calendar and Microsoft 365

- `CALENDAR_ENABLED` - the macOS calendar helper (macOS only; forced off
  elsewhere).
- `M365_ENABLED` - the Microsoft 365 connector (off by default).
- `M365_TENANT_ID`, `M365_CLIENT_ID` - required when the connector is enabled.

## Related

- [Commands](/mothy-docs/commands/)
- [Getting started](/mothy-docs/getting-started/)
- [Data model](/mothy-docs/data-model/)
