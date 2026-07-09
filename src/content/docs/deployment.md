---
title: "Deployment"
description: "How Mothy is deployed: the development install, the pinned appliance build with its boot check, hosting with TLS and encrypted backups, install-script single-sourcing, and updates."
---

Mothy has two distinct build paths: a development install for working on a laptop,
and a pinned appliance build for the shipped product.

## Development install

`install.sh` on macOS and `install-linux.sh` on Linux install live and unpinned.
They are for development, not the appliance. `update.sh` is the git-based refresh,
and on macOS `Mothy.app` is a double-click wrapper. See
[Getting started](./getting-started.md).

## The appliance build

The shipped appliance is built from pinned inputs by
`appliance/build-appliance.sh`: a pinned Node and Ollama, a digest-pinned
Postgres, and checksummed models, with `versions.env` recording the pins and the
build recording lock files. `appliance/boot-check.sh` refuses to start a drifted
build, so what runs is exactly what was built. See `appliance/README.md` in the
repository.

## Hosting

Stage 1 hosting puts TLS at a reverse proxy (Caddy), runs Mothy as a systemd
service, and adds nightly encrypted backups and a retention timer. The backup
restore is tested and re-verifies the audit chain as part of the restore. Health
checks and alerting round it out. See `deploy/README.md` in the repository.

## Install-script single-sourcing

This repository is canonical for the install and launch scripts.
`scripts/sync-installer.sh` pushes the blessed set into a `mothy-installer`
checkout and refreshes a `CHECKSUMS` file; continuous integration fails on drift,
and `mothy-installer` is never hand-edited.

## A note on database hardening

`drizzle-kit push` (via `npm run db:push`) drops Row-Level Security and the audit
trigger. Always follow it with `npm run db:harden`, which re-applies both. A
startup probe also refuses to serve if the enforced `mothy_app` role is not
reachable.

## Related

- [Security and hardening](./security-and-hardening.md)
- [Configuration](./configuration.md)
- [Audit and compliance](./audit-and-compliance.md)
