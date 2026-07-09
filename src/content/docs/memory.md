---
title: "Memory"
description: "How Mothy remembers durable facts across sessions: what memory is, how it is scoped per owner, and how it differs from skills and documents."
---

Memory is Mothy's store of durable facts that should persist across
conversations, such as a stable preference or a standing detail about how someone
works. Facts are embedded and recalled by relevance across sessions.

Memory is owner-scoped like every other data type: a memory belongs to the user
who created it, or is shared when it has no owner, and Row-Level Security keeps
one user's memories out of another user's recall. See
[Users and isolation](./users-and-isolation.md).

Memory writes are ordinary, visible tool calls inside a turn, and they are
audited. Memory is not a background profiler: Mothy does not build conclusions
about a user on a cadence in the background. If you want a reusable procedure
rather than a fact, use a [skill](./skills.md);
if you want Mothy to answer from source material, ingest it as a
[document](./documents-and-answers.md).
