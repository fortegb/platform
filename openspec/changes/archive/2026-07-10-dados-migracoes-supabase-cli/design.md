## Context

Grilling #152 locked CLI migrations, apply path (local Docker / remote push), staging-before-prod, forward-only hygiene, seed separate.

## Goals / Non-Goals

**Goals:** D-031 + template + sócios-facing note; close the “which tool” gap from D-030.

**Non-Goals:** Implementing migrations; CI; npm script wrappers (optional later); full local runbook (#153).

## Decisions

1. **CLI only** — no Flyway/Liquibase/custom runner.
2. **No migrate-on-deploy** — Vercel builds must not apply schema.
3. **Layout contract** — `supabase/migrations/` is required; init can happen in setup/#153.

## Risks / Trade-offs

- **[Risk] Two sources until SQL is ported** → Mitigation: mark `database-schema.sql` legacy in docs.
- **[Risk] Manual prod push** → Mitigation: documented order; CI later if needed.
