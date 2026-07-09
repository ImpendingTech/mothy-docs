---
title: "Getting Started"
description: "Prerequisites, install, configuration, database setup, ingesting your first documents, and asking your first question. For operators and developers setting up a Mothy dev box."
---

This page gets a Mothy development box running and answers your first question.
For the pinned appliance build and hosted deployment, see
[Deployment](./deployment.md).

## Prerequisites

- Node 20 or newer. The code is TypeScript run with `tsx`.
- Docker, for Postgres with the pgvector extension. The repo ships a
  `docker-compose.yml` for the local database.
- Ollama, for local embeddings and chat. Pull an embedding model and a chat
  model before first run.

Everything runs on your machine. The only network traffic is localhost to your
own Ollama and Postgres.

## Install (development)

Clone the repository (github.com/ImpendingTech/mothy) and run the installer for
your platform: `install.sh` on macOS or `install-linux.sh` on Linux. These
install live and unpinned and are for development, not the appliance. On macOS,
`Mothy.app` is a double-click wrapper and `update.sh` is the git-based refresh.

## Configure

Configuration comes only from the environment, validated in one place, and
invalid config fails fast. At minimum set the database URL, the Ollama URL and
models, and authentication. See the full list in
[Configuration](./configuration.md).

Authentication is required before Mothy will bind to anything other than
loopback. For a single trust domain set `AUTH_PASSWORD` and `AUTH_SECRET`. For
separate accounts set `MULTI_USER` and add users with `npm run user:add` (see
[Users and isolation](./users-and-isolation.md)).

## Set up the database

Bring up Postgres with the shipped `docker-compose.yml`, then:

- `npm run db:push` creates the schema.
- `npm run db:harden` re-applies Row-Level Security and the audit trigger.
  Always run this after `db:push`, which drops them.
- `npm run db:index` builds the vector and full-text indexes.

## Ingest documents

Put files (PDF, Word, `.txt`, `.md`) in `./data` and run `npm run ingest`. State
ownership explicitly: `npm run ingest -- --owner <user>` for a private corpus, or
`npm run ingest -- --shared` for the common corpus everyone can read. See
[Documents and answers](./documents-and-answers.md).

## Ask your first question

Start the server with `npm run web` and open the chat at `localhost:3000`. Log in,
then ask a question about your documents. Mothy retrieves the relevant passages
and answers from them, saying plainly when something is not in the documents.

You can also ask from the command line: `npm run agent -- "your question"`.

## Next steps

- Learn the ideas the rest of the docs build on in [Core concepts](./concepts.md).
- Give Mothy reusable procedures with [Skills](./skills.md).
- Schedule recurring work with [Automations](./automations.md).
- Understand the trail everything leaves in [Audit and compliance](./audit-and-compliance.md).
