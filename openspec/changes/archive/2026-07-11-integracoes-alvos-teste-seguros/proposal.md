## Why

D-038 named safe-target *classes* but not the concrete-target contract (must/must-not, TBD slots, where secrets live). Issue #160 locks that so provisioning can fill slots later without reinventing rules.

## What Changes

Document (definition only — no vendor accounts, no secrets in git):

1. Contract + TBD slots (no invented IDs).
2. Per-vendor must / must-not + slot fields.
3. Secrets in Vercel/local `.env`; non-secret labels may live in template; ownership = ForteGB tech.
4. D-039 + `templates/integrations-safe-targets.md` + pointers.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: concrete safe-target contract and secret placement rules.

## Impact

- Docs only. Fill slots at setup; env names → #162; secrets policy → #164/#165; webhooks → #161.
