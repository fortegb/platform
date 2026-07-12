## Context

D-030–D-032 already fixed Supabase/Docker choices for local dev. This leaf
only closes the remaining toolchain-inventory question D-032 explicitly
deferred here: which tools, and how (if at all) their versions are pinned.

## Goals / Non-Goals

**Goals:**
- One documented toolchain list: Node, Docker/OrbStack, Supabase CLI, ngrok.
- Decide Node pinning mechanism (the one tool where version drift causes
  real bugs).

**Non-Goals:**
- Installing or bootstrapping anything — that's #171.
- Redeciding Docker/OrbStack (D-032) or Supabase CLI (D-031).
- Pinning versions for tools without a free automated check to hook into.

## Decisions

- **Node: `.nvmrc` + `engines`, both.** Redundant by design — `.nvmrc`
  serves the common case (a dev who runs `nvm use`), `engines` catches the
  case where that step was skipped, for free (npm already checks it).
- **No pinning for Docker/OrbStack, Supabase CLI, ngrok.** These tools are
  invoked directly by a human and self-update; a version pin here would be
  a reference that goes stale with no mechanism (unlike `engines`) to catch
  drift automatically. "Latest stable" is already the sane default.
- **ngrok stays optional per D-040**, not elevated to a baseline
  requirement — local dev defaults to mock, so most sessions never need a
  tunnel at all.

## Risks / Trade-offs

- **[Risk]** No enforcement mechanism for Docker/OrbStack/Supabase
  CLI/ngrok versions means a very old install could behave unexpectedly.
  → **Mitigation**: accepted — these tools' own auto-update prompts are
  the existing safety net; adding a second one (a doc reference) would be
  redundant, not additive.
