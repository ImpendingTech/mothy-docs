---
title: "Connectors and Actions"
description: "Calendar reads and the optional Microsoft 365 connector, and how Mothy takes write actions only through staged, confirmation-gated drafts. Covers per-user consent, encrypted tokens, staged send and create, and expiry."
---

Mothy can read a calendar and, when the optional Microsoft 365 connector is
enabled, read a signed-in user's tenant calendar and email and draft messages and
events. Every write is confirmation-gated: the model never executes a write, it
stages a draft a person confirms.

## Calendar

On a macOS development box, a read-only EventKit helper reads events, including
date ranges, directly without launching Calendar.app, exposed as the
`get_calendar_today` tool and gated by `CALENDAR_ENABLED` (forced off on
non-macOS hosts). On the appliance, calendar reads come from the Microsoft 365
connector.

## The Microsoft 365 connector

The connector is optional and off by default (`M365_ENABLED`), requiring
`M365_TENANT_ID` and `M365_CLIENT_ID` when enabled. A signed-in user connects
their own account once with per-user device-code consent (`npm run m365:connect --
<user>`). After that, Mothy can answer about that user's tenant calendar and
email. Tokens are stored per user, encrypted at rest with AES-256-GCM, one row
per user, and cascade-deleted when the account is erased. Every connector call is
audited with ranges or counts, never contents.

## Confirmation-gated writes

Writes are never executed by the model. Asking Mothy to send an email or create a
calendar event stages a draft through `send_email` or `create_calendar_event`. The
drafting user then confirms it through an owner-only, CSRF-protected endpoint, and
drafts expire after 30 minutes. This keeps a human decision in front of every
outbound action.

From the command line, staged actions are managed with `npm run action:list --
<user>`, `npm run action:confirm -- <id> --confirm`, and `npm run action:reject --
<id> --confirm`.

## The privacy position

The connector is the one door through which Mothy reaches outside the box, it
ships closed, and turning it on is an explicit, audited configuration choice.
Enabling it calls only the customer's own Microsoft 365 tenant. See
[Security and hardening](./security-and-hardening.md).

## Related

- [Configuration](./configuration.md)
- [Commands](./commands.md)
- [Audit and compliance](./audit-and-compliance.md)
