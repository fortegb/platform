## Context

All the individual pieces this runbook needs already exist as decisions
(D-032 Supabase local, D-044 env vars, D-049 toolchain). This leaf's only
job is ordering and consolidating them into one document a new developer
follows start to finish.

## Goals / Non-Goals

**Goals:**
- One ordered, complete local-dev onboarding runbook.

**Non-Goals:**
- Staging/prod bootstrap — owned by #42/#43/#46 (Execução), explicitly out
  of scope here (see Decisions).
- Actual execution of any bootstrap step — this leaf writes the runbook,
  doesn't run it.

## Decisions

- **Local only, not staging/prod.** Matches the issue's own title ("Dev
  local"), and folding staging/prod in would duplicate #42/#43/#46 while
  blurring the Definição/Execução split (provisioning is Execução's job,
  not this leaf's).
- **Location: `docs/planning/templates/dev-local-bootstrap.md`**, consistent
  with every other template this session, rather than a root-level file —
  keeps all planning-canon docs in one place.

## Risks / Trade-offs

- **[Risk]** None material — pure documentation consolidation of
  already-decided pieces.
