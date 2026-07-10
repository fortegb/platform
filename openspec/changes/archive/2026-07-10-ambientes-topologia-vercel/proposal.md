## Why

A1/A2 defined environments and git mapping; they did not lock **how Vercel hosts** them. Without a topology decision, env-var scopes, Preview vs Production, and staging access protection stay ambiguous. Issue #149 (A3) writes that contract so domains (#150) and later provisioning share one picture.

## What Changes

Document (definition only — no Vercel project created in this change):

1. **One** Vercel project for the Nuxt app.
2. **Production** deployment = branch `main` only (`prod`).
3. **Preview** deployments = `staging` + `feat/*` / `fix/*` (logical staging; coexist with Production; serverless cold start OK).
4. **Host-level protection** on Previews: shared password (sócios need **no** Vercel account); one unlock per browser, then whole deployment; stacks with app auth (does not replace it).
5. **Env scopes:** Production → `APP_ENV=prod` + prod backends; Preview → `APP_ENV=staging` + staging-class backends (shared across all Previews).
6. Update template + Ambientes page; D-027; STATUS next → #150.

**Out of scope:** custom domains (#150), provisioning the Vercel project, close-skill (#166), webhook bypass details (integrations leaf).

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: add Vercel topology (one project, Production vs Preview, password protection intent, env scopes).

## Impact

- **Docs:** `decisions.md` D-027, template, `ambientes.html`, `architecture.md`, `STATUS.md`, `DECISIONS.md`, `CHANGELOG.md`.
- **No** cloud clicks in this change; setup follows the written contract later.
