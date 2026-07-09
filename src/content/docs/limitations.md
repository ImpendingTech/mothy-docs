---
title: "Limitations"
description: "Mothy's known limitations, stated plainly: PDF table reconstruction, calendar sources, the database hardening step, the sources block, and which paths are covered by manual checks rather than CI."
---

Stated plainly, so nobody is surprised.

- PDF table reconstruction is best-effort. A document with important tables, such
  as a fee schedule, is better ingested as `.docx` or `.md`.
- Calendar reads come from the macOS EventKit helper on a development box or the
  Microsoft 365 connector on the appliance. The connector's live paths need a real
  tenant.
- The ask API does not yet return grounding sources to the web UI. The sources
  block is wired and waiting.
- `drizzle-kit push` drops Row-Level Security and the audit trigger; always follow
  `npm run db:push` with `npm run db:harden`.
- The database, live-model, connector, and appliance-build paths are covered by
  documented manual checks rather than continuous integration, because they need
  Postgres, a running model, a tenant, or the appliance toolchain.
- The `gdpr/` evidence pack is drafts pending legal review.

## Related

- [Feature Inventory](https://github.com/ImpendingTech/mothy)
- [Documentation home](/mothy-docs/)
