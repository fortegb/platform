## Context

This is a docs/governance change — no product code. It formalizes a method that was arrived at through an extended grilling in-session. The current board uses a `Phase` (0–4) single-select field that mixes lifecycle stage with deliverable bundle, and a parallel v1/v2/v3 "versions" concept (D-018) that duplicates Phases 1–3. Método steps live only implicitly across scattered docs. The org already has native issue types (Task/Bug/Feature/Epic) and a native Milestone field, both currently unused. Stakeholder: Ricardo (solo dev). Constraint: keep the board low-ceremony (solo dev, bursty cadence, 1–2 houses/year).

## Goals / Non-Goals

**Goals:**
- One controlling spine (9 steps / 3 stages) that both orders work and gates the build, tracked structurally on the board — not in prose or memory.
- Collapse the redundant Phase-vs-version axes into: Etapa (spine) + Milestone (deliverable).
- Adopt native GitHub entities (issue types, milestones) instead of custom stand-ins.
- Record the reasoning as D-023/D-024 so the model is auditable and re-openable.

**Non-Goals:**
- Performing the board migration (creating fields/milestones/types, retagging ~171 items, adding 2 new epics) — separate change.
- The progress-report overhaul (`mapa-metodo.html`, `progresso-socios.html`) — separate change, after migration.
- Mechanical hard-gate enforcement (GitHub Action) — deferred until gate-jumping is observed.
- Any product/app behavior change.

## Decisions

- **Método is the axis, not a doc.** The spine is represented by a board field (Etapa), so state is queryable and report-truthful. Alternative rejected: keep método as a guideline doc + `Passo:` line in issue bodies — the user flagged this as dangerous (human-driven, fragile, unqueryable).
- **Etapa = single-select field with 9 options**, superseding Phase. Alternative rejected: a 3-macro-stage field (Definição/Execução/Evolução) + passo in body — loses the per-step granularity that matters most during the long Definição phase. The 3 stages are *derived* from the passo (1–7/8/9), not stored.
- **Milestones v0→v1→v2→v3.** v0 groups all Definição issues; its native progress bar is the "prontidão para build" gauge and the visible G2 signal. v1–v3 subdivide Execução (step 8). Alternative rejected: not milestoning Definição — loses the single build-readiness signal the user asked for. v0 is mildly derivable from Etapa 1–7 but earns its place via the native progress bar + "closed" event.
- **Native issue types (option A): Feature/Bug/Task/Epic as-is.** "Chore" (Conventional-Commits vocabulary) maps to native **Task**; commit messages keep `chore:` — different layer. Alternative rejected (option B): rename org Task→Chore to match commit vocabulary — extra org-admin config for a cosmetic gain.
- **No sprints.** Releases are scope-boxed milestones, not time-boxed iterations; environment promotion (local→staging→prod) is a pipeline concern owned by #146, not a cadence.
- **Gate enforcement is soft.** GitHub Projects cannot block a Status transition, so gates control visible state + the `rbo-create-change` entry point, not clicks. The optional Action is future work.

## Risks / Trade-offs

- **Soft gates can be bypassed knowingly** → for a solo dev the only actor is the user; the v0 milestone + Etapa make a jump unmissable, and the Action remains a future fix.
- **9-option Etapa field is more to maintain than 5 Phases** → offset by removing the duplicate version axis and by the field being the single source of truth for the report.
- **This change defines a board model it does not implement** → the migration is a distinct, sequenced change (A: Etapa+types+report-enabling; B: Milestones+Execução retag) to avoid a half-migrated board; until then the doc is authoritative and the old Phase field remains in place.
- **Draft-marking jornadas/screen-map without re-doing them** → acceptable; they stay usable as drafts, and step-5 re-validation is itself a tracked step gated on #146.

## Migration Plan

Not executed here. This change lands docs + decisions only. The board migration and report overhaul are separate changes, sequenced after: (7) this doc change → (8) migration A + report → (9) migration B. The old `Phase` field stays untouched until migration A, so the board is never in a half-defined state.

## Open Questions

- None blocking. Version placement of #122 (SEO/analytics), #126 (LGPD hardening), #130 (mobile) is intentionally deferred to step 7 and tracked by the "no-Milestone = queue" rule.
