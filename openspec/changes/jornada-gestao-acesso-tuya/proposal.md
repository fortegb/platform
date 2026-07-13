## Why

The issue's own body already states the expected answer: Tuya emergency-
code management stays on Supabase Studio per D-052/D-056, no custom UI
unless scale changes that call. This leaf re-validates that the decision
still holds — it doesn't build anything new.

## What Changes

- **Nothing built.** Re-checked D-056's three-part test against Tuya
  emergency-code rotation and device-status review: (1) not a multi-step
  workflow with side effects — rotating a code is a single field update,
  unlike corretor approval (unlocks portal access) or verification review
  (triggers `provisionAccess`); (2) no domain-specific rendering a generic
  dashboard can't already do; (3) D-056 already weighed and rejected the
  "must be safe for non-technical staff" criterion for this specific case
  — nothing about business scale has changed since that call.
- **"Device status" clarified, not expanded.** The issue's mention of
  "status do dispositivo" is what Supabase Studio already shows on the
  emergency-code record (last rotated, in use) — not a live device-
  monitoring dashboard. D-052 already decided failure handling is
  reactive (WhatsApp alert at the moment of provisioning failure), not a
  proactive status screen; this leaf doesn't introduce one.
- **Conclusion:** decision re-confirmed as-is. No new capability, no
  modified capability, no code impact.

## Capabilities

### New Capabilities
- `journey-tuya-access-management`: formalizes the already-decided
  conclusion (D-052/D-056) into an actual spec requirement for the first
  time — Tuya emergency-code rotation and device-status review happen
  via Supabase Studio, not custom UI. No new decision content; this is
  the first time the conclusion is written as a testable requirement
  rather than only decision prose.

### Modified Capabilities
(none — D-052 and D-056 already cover this fully; nothing here changes
their requirements)

## Impact

- None. This leaf is a documentation-only confirmation that the existing
  D-052/D-056 decision still applies; it closes the last un-scoped
  question in the original staff task list without building anything.
