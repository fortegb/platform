## Context

D-027 fixed Vercel topology; D-045 fixed the stage-vs-close split and the
opt-in `.rbo/lifecycle.yml` contract. `.rbo/lifecycle.yml` is already present
in this repo (from #166) but dormant — `origin/staging` doesn't exist yet, so
`rbo-stage-change` correctly fails closed. This leaf doesn't change that; it
only adds the remaining deploy-pipeline decisions still open after D-027.

## Goals / Non-Goals

**Goals:**
- Decide deploy trigger, merge gating, rollback, and notification policy for
  the branch→Vercel pipeline.
- Explicitly timestamp `origin/staging`'s creation to Execução bootstrap, so
  it isn't silently expected to exist during Definição.

**Non-Goals:**
- Provisioning anything (branch creation, GitHub branch protection toggle,
  Vercel dashboard config) — all execution-time setup, out of scope here.
- Revisiting Vercel topology itself (D-027) or branch→environment mapping
  (D-026) — both already closed.

## Decisions

- **No custom CI now.** Vercel's native git integration already implements
  the trigger; introducing a custom pipeline here would be scope creep with
  no identified gap to justify it. Revisit only if a concrete need appears
  (e.g. a pre-deploy check Vercel can't express natively).
- **`main`-only branch protection.** `staging`'s purpose is integration and
  validation (D-045); gating merges into it would fight that purpose. `main`
  represents the live product, so that's where the safety net belongs.
- **Vercel's built-in rollback, not a custom procedure.** Matches the
  zero-ops/free-first posture already established (D-018) and the size of
  the team operating this (solo/family, not requiring a formal incident
  process).
- **`origin/staging` creation deferred to Execução (#42/#46).** Creating the
  branch is a real (if cheap) infrastructure action; this repo has
  consistently deferred that class of action to Etapa 8 elsewhere (Supabase
  projects, Sanity provisioning). This leaf's job is the decision, not the
  branch itself.

## Risks / Trade-offs

- **[Risk]** `.rbo/lifecycle.yml` staying dormant means every Definição-leaf
  close between now and Execução bootstrap merges `feat/*`→`main` directly,
  bypassing the stage step the config nominally requires. → **Mitigation**:
  same pattern already used to close #166 itself; no new risk introduced,
  and nothing is actually staged/lost by skipping a step that has nothing to
  stage yet.
