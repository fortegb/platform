## Context

Grilling #153 (2026-07-10) locked: OrbStack preferred on macOS (Docker Desktop OK); runbook DoD = install + start/stop/status + Studio/keys + db reset + common failures; **docs-only** — no `supabase init` in this change. Board already has **#170** (toolchain) and **#171** (bootstrap runbook); scaffold/`supabase/` belongs there or in build **#43**, not under #153.

## Goals / Non-Goals

**Goals:** D-032 + technical runbook template + sócios-facing pointer on Ambientes; clear split vs #170/#171/#43/#154.

**Non-Goals:** Creating `supabase/`; first migration; cloud link; seed contents; installing tools on the author’s machine as part of the change.

## Decisions (grilled)

1. **Engine** — OrbStack preferred on macOS; Docker Desktop fine; any Docker-compatible engine works with Supabase CLI.
2. **DoD** — written checklist covering install, lifecycle, Studio/keys→`.env`, `db reset`, common failures; not cloud push.
3. **Docs-only** — no repo scaffold in #153; init command documented as “when #171/#43 (or explicit setup) creates `supabase/`”.
4. **Sibling leaves** — #170 = what to install; #171 = broader bootstrap; #153 = Supabase-local day-to-day; #154 = seed; #43 = project + schema in build.

## Risks / Trade-offs

- **[Risk] Runbook references `supabase/` before it exists** → Mitigation: state prerequisite explicitly; point to #171/#43.
- **[Trade-off] Overlap with #170/#171** → Mitigation: #153 stays Supabase-CLI-centric; toolchain/bootstrap own the rest.
- **[Risk] D-031 said “init → #153”** → Mitigation: D-032 supersedes that pointer; init deferred to bootstrap/build.

## Open Questions

None blocking. Exact `.env` var names → config inventory (#162+); seed after reset → #154.
