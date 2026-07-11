## Why

D-041 locked **names**; D-027/D-030 already said Production vs Preview vs local hold different **values**. Issue #163 locks the scoping model so setup does not put prod secrets in Preview or invent a third Vercel environment without need.

## What Changes

Document (definition only — no Vercel UI edits, no `.env` committed):

1. Three value surfaces: Vercel **Production**, Vercel **Preview**, local gitignored `.env` (and optional `.env.local`).
2. Mapping: Production → `APP_ENV=prod` + prod backends; Preview → `APP_ENV=staging` + staging-class (shared by `staging` + `feat/*`); local → `APP_ENV=local` + mocks/local backends by default.
3. Same names (D-041), different values per surface; no duplicate name aliases per scope.
4. D-042 + `templates/env-scoping.md` + pointers. Access policy → #164; `.env.example` → #165.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: env value scoping across Vercel Production/Preview and local `.env`.

## Impact

- Docs only. Does not provision Vercel env UI or create `.env.example`.
