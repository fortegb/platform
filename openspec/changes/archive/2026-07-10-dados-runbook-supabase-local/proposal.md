## Why

D-030/D-031 require local Supabase via Docker + CLI migrations, but there is no written runbook for day-to-day local use. Without it, setup stays tribal and #153 cannot close. This change records the **local Supabase runbook as documentation only** after grilling.

## What Changes

Document (definition only — **no** `supabase init`, no scaffold, no cloud):

1. **Engine:** recommend **OrbStack** on macOS; **Docker Desktop** acceptable alternative.
2. **Runbook checklist:** install engine + Supabase CLI; start/stop/status; Studio + keys → `.env`; `db reset`; common failures (engine down, ports busy).
3. **Init deferred:** `supabase init` / `supabase/` folder creation → **#171** (bootstrap) / **#43** (schema build) — not this leaf. Runbook still describes the command for when those land.
4. **Boundaries:** toolchain inventory → **#170**; full app bootstrap → **#171**; seed pack → **#154**; cloud link/`db push` → D-031 (not required in this runbook).
5. **D-032** + `templates/supabase-local.md` + Ambientes pointer + STATUS/CHANGELOG.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: add local Supabase runbook contract (engine preference, CLI lifecycle, docs-only DoD, deferral of init).

## Impact

- **Docs:** `decisions.md` D-032, `templates/supabase-local.md`, `templates/environments.md` pointer, `ambientes.html`, `STATUS.md`, `DECISIONS.md`, `CHANGELOG.md`, `progress-focus.md`.
- **No** product runtime code, **no** `supabase/` directory created in this change.
