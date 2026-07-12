## Why

D-032 explicitly scoped #170 as the toolchain inventory (distinct from #171's
broader bootstrap and #154's seed data): a narrow list of required local dev
tools and how the one tool with subtle version-mismatch risk (Node) gets
pinned.

## What Changes

- **Node version pinning:** `.nvmrc` + `engines` in `package.json` — both,
  not one. `.nvmrc` is what a solo dev uses day-to-day (`nvm use`);
  `engines` catches a mismatch during `npm install` even if `nvm use` was
  skipped.
- **No version pinning for Docker/OrbStack, Supabase CLI, or ngrok** — these
  are human-invoked CLI tools with their own update mechanisms; pinning
  would add a maintenance burden (a reference that goes stale) with no
  equivalent free check to hook it into, unlike `engines`.
- **ngrok confirmed optional, tunnel-only** — already decided by D-040
  ("local → mock default, túnel opcional"); this leaf just documents it as
  part of the toolchain list, not a new decision.
- Docker/OrbStack choice (D-032) and Supabase CLI (D-031) are referenced,
  not redecided.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: adds the toolchain inventory as a direct extension
  of its existing local-dev/Supabase-runbook content (D-030–D-032).

## Impact

- Docs only — `docs/planning/decisions.md` (new D-entry) + a new
  `templates/dev-local-toolchain.md` reference, pointed at from
  `environments.md`.
- No actual tool installation or bootstrap scripting — that's #171.
