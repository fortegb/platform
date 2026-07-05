## Context

D-024 defined the board model; this change applies it. The board today has a `Phase` single-select (options 0–4, all ~171 items tagged), the org's native issue types (Task/Bug/Feature/Epic) and native Milestone field (both unused), and no Etapa/v0. The Platform docs progress report (`generate-progress-report.mjs` + `phase-labels.mjs`) groups by Phase. Explore established: (a) editing a single-select's options in place is awkward/destructive → create a fresh field; (b) the Phase→Etapa map is per-epic, not a formula (#146 = Phase 1 but Etapa 4); (c) migração A does only the `v0` milestone (v1/v2/v3 → migração B).

## Goals / Non-Goals

**Goals:**
- Board reflects the método: `Etapa` (9) live on every item, `Phase` gone, `v0 Definição` milestone, native types, 2 new Definição epics.
- Platform docs stop showing Phase 0–4: report grouped by Etapa/Milestone, new `mapa-metodo.html`.
- Non-destructive sequencing (create+tag before delete) so the board is never fieldless.

**Non-Goals:**
- Milestones v1/v2/v3 and Execução version assignment (migração B, at passo 7).
- Any change to método semantics or gates (that is `metodo.md`/D-023, done).
- Product code.

## Decisions

- **Create fresh `Etapa`, delete `Phase` last.** Avoids in-place option editing (awkward API, destructive) and keeps Phase readable during retag for cross-checking. Alternative rejected: mutate Phase options in place.
- **Per-epic retag map, leaves inherit epic.** Query each epic's sub-issues and set leaf Etapa = epic Etapa. Map: #1,#146→4 · #67,#2→6 · Execução epics→8 · historical Done (#4/#8/#20/#143)→1 (bulk) · new epics→1–2 and 5. Alternative rejected: mechanical Phase→Etapa (wrong — #146 proves it).
- **Only `v0` milestone now.** v0 groups Etapa 1–7; its native progress bar is the build-readiness gauge. Execução items stay milestone-less until B. Rejected: create v1/v2/v3 now — that is passo 7's job.
- **Type backfill scripted per item.** `gh issue edit <n> --type <T>`; epics→Epic, leaves default Feature unless clearly Bug/Task. Chores/infra/docs → Task.
- **Report generator switches to Etapa+Milestone.** New `etapa-labels.mjs` (heading/pill per passo + stage grouping); `mapa-metodo.html` reuses the `.phase-track` CSS with 7 passo-nodes + v0 bar + v1/v2/v3 cards.

## Risks / Trade-offs

- **~171 item edits via API (retag + types) are slow and rate-limitable** → batch, idempotent scripts keyed by issue number; verify counts before deleting Phase.
- **Deleting Phase breaks anything reading it** → only the report generator reads it; it is updated in the same change and verified before Phase deletion.
- **Retag judgment for historical Done epics** → user chose bulk Etapa 1 (low value, closed items); acceptable imprecision.
- **`v0` slightly derivable from Etapa 1–7** → kept for the native progress bar (accepted in D-024).
- **Report truthfulness during transition** → generator + docs are regenerated after the board is fully retagged, not before.

## Migration Plan

Order within this change: (1) create `Etapa` + options · (2) build epic→Etapa map, tag epics, tag leaves by inheritance · (3) create `v0` milestone, assign Etapa 1–7 items · (4) backfill native types · (5) create 2 new epics (tag + milestone) · (6) verify every item has Etapa · (7) **delete `Phase`** · (8) update generator + `etapa-labels.mjs`, build `mapa-metodo.html`, regen `progresso-socios.html`, de-Phase `index`/`arquitetura-decisoes`, update README/STATUS pointers. Rollback: recreate `Phase` from retained map if needed (map is in tasks/commit).

## Open Questions

- None blocking. Leaf type granularity (Feature vs Task) is best-effort; can be refined later without a migration.
