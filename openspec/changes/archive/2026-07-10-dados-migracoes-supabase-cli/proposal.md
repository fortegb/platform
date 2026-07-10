## Why

D-030 requires one schema-as-code across local/staging/prod but left the **tool and apply workflow** open. Without that, `docs/database-schema.sql` and ad-hoc SQL risk diverging. Issue #152 locks Supabase CLI migrations as the strategy after grilling.

## What Changes

Document (definition only — not converting the full schema into migrations in this change):

1. **Tool:** Supabase CLI; files in `supabase/migrations/*.sql` are the schema source of truth.
2. **Legacy:** `docs/database-schema.sql` remains reference until content is moved into migrations (follow-up); do not maintain two live sources.
3. **Apply:** local via CLI against Docker; staging/prod via `supabase db push` (or equivalent) linked to each project — **not** on Vercel deploy.
4. **Order:** staging first, then prod after smoke check.
5. **Hygiene:** forward-only migrations; seed separate (#154); RLS in migrations with schema.
6. **Wrappers:** optional thin npm scripts later; no custom migrator.
7. D-031 + template section + Ambientes note + STATUS/CHANGELOG.

**Out of scope:** `supabase init`, first real migration content, local runbook detail (#153), CI Action (optional later).

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: add Supabase CLI migration strategy and apply rules.

## Impact

- **Docs:** `decisions.md` D-031, template, `ambientes.html`, `STATUS.md`, `DECISIONS.md`, `CHANGELOG.md`, `progress-focus.md`.
- **No** new migration SQL files required in this change (contract only).
