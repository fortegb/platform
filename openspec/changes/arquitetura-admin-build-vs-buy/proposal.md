## Why

#184 is the fifth and final leaf of Epic #179 (Arquitetura de domínio). The existing `platform-architecture` requirement ("Build-vs-buy default") prohibits back-office admin UIs for owner-only content editing, but the declared need surfacing across `D-052`–`D-055` (corretor-approval workflow, identity-verification exception queue, RBAC role assignment) is operational workflow UI — a category the requirement's narrow content-editing scope never addressed. Resolving this before Passo 5 (#176) designs actual screens prevents both over-reading the rule (refusing all custom UI) and under-reading it (building bespoke UI for things a vendor dashboard already handles).

## What Changes

Document (definition only — no screens built, no route implementation):

1. Reframe: "admin" conflates two categories — content editing (stays vendor-only, unchanged) and operational workflow UI (new, named category).
2. A reusable three-part test for when custom UI is justified: multi-step workflow with side effects; domain-specific rendering a vendor dashboard can't do; needs to be safe for non-technical staff.
3. Reclassify existing decisions under the test: corretor-onboarding approval and the verification exception queue (`D-053`) qualify for custom UI; Tuya emergency-code rotation (`D-052`) does not, stays on Supabase Studio.
4. All operational workflow UI lives under a single `/staff/*` route namespace, gated via `D-055`'s RBAC hierarchy — no separate `/admin/*` tree.
5. `D-056` + `templates/admin-build-vs-buy.md` + an amendment to the existing `platform-architecture` "Build-vs-buy default" requirement.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: amends the "Build-vs-buy default" requirement to explicitly scope the no-bespoke-admin-UI rule to content editing, and name operational workflow UI as a distinct, legitimate category gated by a three-part test.

## Impact

- Docs only. Concrete screens → Passo 5 (#176) + specific build issues (`#50`, `#75`, `#80`, `#86`). Closes out Epic #179 — all 5 domain-architecture leaves done.
