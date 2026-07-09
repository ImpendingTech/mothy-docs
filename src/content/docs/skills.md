---
title: "Skills"
description: "Stored, human-approved procedures Mothy can consult and draft. Covers the SKILL.md format, the three skill tools, proposing changes, progressive disclosure, the lifecycle curator, and the commands and config keys."
---

A skill is a stored, human-approved procedure that Mothy can consult for
recurring work: a report format, a triage rule, a team convention. Skills let you
teach Mothy how you want something done without changing code, and the hard rule
is that Mothy can draft a skill but only a human approval makes it real.

## The SKILL.md format

Skills use the agentskills.io SKILL.md format: YAML frontmatter with `name` and
`description` plus an optional `category`, followed by a markdown body. The body
is the procedure itself, in plain language.

## How Mothy uses skills

Skills load by progressive disclosure, so the prompt cost stays flat as the
library grows:

- `skills_list` gives the compact index of active skills (name, description,
  category). This index is also injected into the system prompt; full content is
  never in the prompt by default.
- `skill_view` reads the full content of one skill when it is relevant. It bumps
  the usage counter and is audited with the ask correlation id. Skill content is
  framed in the prompt as guidance subordinate to system policy, so a skill
  cannot claim to override base rules.

## Drafting and changing skills

Mothy can propose a create, update, or archive with `skill_propose`. This never
writes to the skills store. It stages a proposal that a person reviews and
approves. The full review flow, the content scan, and the approval guarantees are
in [Proposals and approvals](./proposals-and-approvals.md).
Every applied change writes an immutable revision whose sha256 is recorded on the
audit chain, so a later edit of a revision row is detectable against the chain.

You can also add skills as an operator by approving a proposal; there is no
registry fetching and no installing from a URL.

## Lifecycle

A deterministic in-server curator pass, with no model involvement, keeps the
library tidy. It marks a skill stale after `SKILL_STALE_DAYS` unused (default 30)
and archives it after `SKILL_ARCHIVE_DAYS` (default 90). Archived skills are
recoverable with `npm run skills:restore`; nothing is ever deleted. Each pass
writes one audit entry naming every skill it marked stale or archived. The cadence
is `SKILL_CURATOR_INTERVAL_HOURS` (default 24).

## Commands

- `npm run skills:list` lists skills.
- `npm run skills:restore -- <name>` restores an archived skill.
- `npm run proposals:pending` lists proposals awaiting a decision.
- `npm run test:skills` runs the database-backed audit integration test.

## Audit events

`skills_list`, `skill.view`, `skill.apply`, `skill.archive` (one per curator pass
with the transitions), and `skill.restore`, plus the `proposal.*` events for the
review flow. All are hash-chained and carry the relevant content hash.

## Related

- [Proposals and approvals](./proposals-and-approvals.md)
- [Automations](./automations.md)
- [Configuration](./configuration.md)
