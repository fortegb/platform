## Context

Grilling #156 locked 2 datasets mirroring Supabase/Vercel staging-class sharing; explicit content promote; env scopes for dataset selection.

## Goals / Non-Goals

**Goals:** D-035 + template section + Ambientes note.

**Non-Goals:** Creating Sanity project; Studio; schemas (#157); exact env var inventory (#162).

## Decisions

1. Datasets named `staging` and `production` in one project.
2. Previews share staging dataset (like Supabase).
3. Promote ≠ deploy.

## Risks

- **[Risk] Accidental prod edits in Studio** → Mitigation: default Studio to staging; document production as promote-only.
- **[Risk] Local writes to shared staging** → Mitigation: prefer read-only token locally; mocks when unset.
