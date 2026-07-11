## Why

Architecture leaves through D-040 deferred **exact env var names** to #162. Without a naming convention and inventory, build and Vercel setup will invent inconsistent keys (`SUPABASE_URL` vs `NUXT_PUBLIC_SUPABASE_URL`, missing Sanity/QStash/Telegram, no override names for D-037).

## What Changes

Document (definition only — no `.env.example` yet, no Vercel UI provisioning):

1. Naming convention (SCREAMING_SNAKE, `NUXT_PUBLIC_*` for client, vendor prefixes, posture overrides).
2. Inventory table: name → purpose → public/secret → when required (v1/v2/local).
3. Align with current `nuxt.config.ts` where sensible; note intentional renames/additions.
4. D-041 + `templates/env-vars.md` + pointers; scoping detail → #163; secrets policy → #164; `.env.example` → #165.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: env var naming convention and inventory contract.

## Impact

- Docs only. Does not commit secrets or create `.env.example`. Scoping/access/example files remain #163–#165.
