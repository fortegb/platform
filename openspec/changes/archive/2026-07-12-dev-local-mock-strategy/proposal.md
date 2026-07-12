## Why

D-037 fixed the `mock`/`safe-target`/`prod-live` posture rules but explicitly
deferred the mock strategy itself to this leaf (alongside #159 per-vendor
map and #160 safe-targets, both already closed). This closes the last piece
of that trio.

## What Changes

- **Mock fidelity: happy-path default, single boolean override per vendor.**
  Not trivial-only (error-handling code would never get exercised locally)
  and not elaborately parameterized failure types (over-engineering for a
  solo/small team — failure-type nuance belongs at the safe-target/staging
  tier, against a real sandbox API).
- **Mechanism: env var per vendor**, following the existing naming
  convention (D-041) — `MOCK_<VENDOR>_FORCE_ERROR=true` in local `.env.local`.
  No new config file or code-parameter mechanism.
- **Location: inside each vendor's existing adapter module** (D-017's
  one-adapter-per-vendor pattern), not a separate centralized mocks
  directory — already implied by that pattern, not a new decision.
- Documentation only — this leaf describes the mechanism for Etapa 8 build
  to implement; no mock code is written here.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: adds the mock-strategy requirements, extending
  its existing integration-posture content (D-037–D-040).

## Impact

- Docs only — `docs/planning/decisions.md` (new D-entry) + pointer in
  `environments.md` and/or the integrations docs.
- No mock implementation code — that's Etapa 8 build work.
