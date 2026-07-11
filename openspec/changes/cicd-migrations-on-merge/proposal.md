## Why

D-031 fixed *how* migrations apply (Supabase CLI, staging-first-then-prod
order, not via Vercel deploy) but explicitly deferred *when/who triggers it*
to this leaf (#168). No CI automation exists in this repo yet.

## What Changes

- Migration apply stays **manual** — no GitHub Actions automation. Building
  automatic apply would require a new CI surface (workflow, its own secrets
  store separate from Vercel's env scopes, and an approval gate to preserve
  D-031's staging-then-smoke-then-prod order) — real cost with no identified
  need yet, same reasoning as #167's "no custom CI unless a concrete gap
  appears."
- **Trigger points folded into existing skills** (`ai-skills` companion
  work, not this leaf): after `rbo-stage-change` lands on `staging`, run the
  migration against staging; after `rbo-close-change` merges to `main`
  (post-smoke), run it against prod.
- **Traceability via commit message**, not tooling: reference the migration
  filename in the stage/merge commit message when one was applied. Zero
  infrastructure.
- **No automated pending-migration check.** A missed migration surfaces
  loudly (app breaks against the old schema) — same "acceptable,
  self-correcting risk" reasoning already used for rollback and
  notifications in D-046.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: adds the migration trigger-point and traceability
  requirements, extending its existing D-031/D-032 migration content.

## Impact

- Docs only in this repo — `docs/planning/decisions.md` (new D-entry) +
  pointer in `environments.md`.
- Skill instruction changes (`rbo-stage-change`, `rbo-close-change`) are a
  separate, companion cycle in `ai-skills` — not part of this leaf.
