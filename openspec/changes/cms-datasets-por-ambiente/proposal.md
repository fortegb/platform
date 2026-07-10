## Why

D-034 chose Sanity; free tier allows 2 datasets. Without an explicit map to `local` / `staging` / `prod` / Previews, content isolation would drift from Supabase/Vercel rules (D-027/D-030). Issue #156 locks that map after grilling.

## What Changes

Document (definition only — no Sanity project created):

1. One Sanity project; datasets **`staging`** + **`production`**.
2. Map: local + staging + Previews → `staging`; prod → `production`.
3. Promote content staging → production explicitly (CLI/copy); not on Vercel deploy.
4. Vercel Preview scope → staging dataset; Production → production; local → staging (or mocks).
5. D-035 + template + Ambientes; var names → #162+; content model → #157.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: add Sanity dataset map and content promotion rules.

## Impact

- Docs only. No Sanity cloud provisioning in this change.
