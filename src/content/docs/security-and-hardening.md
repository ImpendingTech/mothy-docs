---
title: "Security and privacy"
description: "Why Mothy is private by design and secure by default, and what Impending Tech manages for you."
---

Mothy is private by design and secure by default. This page is for administrators
and anyone assessing Mothy for their organisation.

## Nothing leaves the box

Mothy runs entirely on your dedicated Chrysalis appliance. It makes no outbound
connections in normal use. The single exception is the optional Microsoft 365
connector, which is off until your organisation turns it on and, when on, reaches
only your own tenant. Turning it on is itself a recorded decision.

## Access and protection

Access requires signing in. Passwords are stored using strong, modern hashing,
sessions are protected, and repeated failed sign-ins are rate limited and
recorded. Traffic to the appliance is encrypted. Sensitive stored items, such as a
connected mail account's tokens, are encrypted at rest.

## Managed for you

Impending Tech hosts and maintains the appliance: updates, backups with tested
restores, monitoring, and the security of the underlying box. Your organisation
gets the benefits of a private system without having to run the infrastructure.

## Related

- [Audit and compliance](/mothy-docs/audit-and-compliance/)
- [How Mothy works](/mothy-docs/concepts/)
