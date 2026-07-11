## Why

D-022/D-025 named mock / safe-target / prod-live but did not lock the posture model, defaults, overrides, or adapter selection. Issue #158 formalizes that contract so #159–#160/#172 can fill vendor maps without reopening safety rules.

## What Changes

Document (definition only — no adapter TypeScript):

1. Three tiers as **postures** (not environments).
2. Default map: local→mock, staging+Previews→safe-target, prod→prod-live.
3. Override rules: local/staging only within {mock, safe-target}; prod always live; never prod-live outside prod; never infer from credentials.
4. Effective tier = override ?? default(APP_ENV); adapter seam; env names → #162.
5. D-037 + `templates/integrations-tiers.md` + Ambientes/architecture pointers.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: integration tier postures and selection rules.

## Impact

- Docs only. Per-vendor map → #159; concrete targets → #160; webhooks → #161; mocks code → #172.
