## Why

This is leaf [#198](https://github.com/fortegb/platform/issues/198) — Design e tokenização: Agendar visita — the second of the 11 journey-level design leaves in Passo 6 (Design system), corresponding to journey [#186](https://github.com/fortegb/platform/issues/186)/D-058. Route in scope: `/visita/agendar/[houseId]`, marked `simulado` in `screen-map.md` — the page already exists, so this is a review-and-align pass like `/portfolio` was, not a build from scratch. It inherits the token foundation established by [#197](https://github.com/fortegb/platform/issues/197), so there is no setup step.

A Phase 0 read of `pages/visita/agendar/[houseId].vue` (178 lines) found the screen is a pre-architecture stub: three linear steps (form → verification → success) with a single error path that dumps the visitor back to step 1. D-058 — the accepted canon for this journey — requires the flow to have **four** distinct outcomes, three of which the screen has no visual state for at all. That is a design gap, not just a backend gap: even once Execução rewrites the endpoint, there is no screen for the result to land on.

## Scope line (read before applying)

D-058 §DoD assigns the **real implementation** — endpoint rewrite, Tuya adapter wiring, `Cliente` lookup, QStash dispatch, `staff-review` enqueueing — to Execução ([#81](https://github.com/fortegb/platform/issues/81), [#80](https://github.com/fortegb/platform/issues/80), [#77](https://github.com/fortegb/platform/issues/77)/[#135](https://github.com/fortegb/platform/issues/135)). This leaf does **not** do that work and does not touch `server/api/visits/schedule.post.ts`.

What this leaf does: make the screen express the journey D-058 already decided — its states, its copy, its visual hierarchy — against the design system, with the mock/simulated data path the route already uses. The states are built and navigable; what drives them stays simulated until Execução.

## What Changes

**Screen states — the substantive gap.** The stub has 3 states; D-058's journey has 6 the visitor can land in. Missing ones get designed here:

| State | Exists today | D-058 basis |
|---|---|---|
| Scheduling form | ✅ | — |
| Identity verification | ✅ | — |
| Confirmed + access password | ✅ | — |
| **Verification skipped** (returning client, `identity_verified_at` < 12 months) | ❌ | 12-month reuse is a real branch, not a silent optimization — the visitor should see *why* they were not asked for a document |
| **Pending staff review** (`client-match` failed/low confidence) | ❌ | Escalates asynchronously and non-blocking: "agendamento recebido, confirmaremos por WhatsApp antes da sua visita" — an acknowledgement state, explicitly **not** an error |
| **Access provisioning failed** (Tuya fallback) | ❌ | Never a silent success. Emergency-code + staff-alerted state, visually distinct from the confirmed state |

- **House context**: the screen never shows *which house* is being visited despite `houseId` being in the route — visitor sees a bare "Agendar Visita" with no address, photo, or name. Add the house header, linked back to `/portfolio/[slug]`.
- **Design-system alignment**: page uses raw DaisyUI defaults (`h1` with no type scale from the token set, `btn-primary w-full`, `card shadow-xl`, `alert alert-error`) rather than the conventions #197 settled — button hierarchy per `AGENTS.md` §9, card/surface treatment matching `/portfolio/[slug]`, typography from the 81.25% global scale.
- **Step affordance**: three steps with no progress indicator and no way back. Add step indication and a back path from verification to the form.
- **Form details**: hardcoded time slots and a `min` of tomorrow are the only scheduling rules present; keep the mock behavior but align field styling, labels, error presentation, and mobile layout to the system.
- **Tokenization**: audit the route's file tree for hex, arbitrary color utilities, and raw Tailwind palette colors, same method as #197's Pass 2 (no `2>/dev/null` — the suppressed-error trap from that session). Record findings in the living `tokenization-report.md`.

**Housekeeping found in Phase 0** (one line, flagged rather than absorbed): `openspec/specs/design-tokens/spec.md` still carries `Purpose: TBD - created by archiving change design-descoberta-site` from #197's archive. `journey-scheduled-visit` and `ui-visual-accessibility` have the same TBD from their own archives. Only `design-tokens` is written here, since this change extends it and the fit check requires a real Purpose; the other two are noted, not edited.

## Capabilities

### Modified Capabilities
- `design-tokens`: extended with the per-screen design requirements this leaf generalizes (house context on a scoped route; every decided journey outcome having a screen state). Purpose also written — it was left `TBD` by #197's archive. Fits the capability's scope: it is the shared design reference the Passo 6 leaves consult.
- `journey-scheduled-visit`: extended with the **screen-surface** requirements for states D-058 decided behaviorally but never specified a UI for. Checked against its Purpose — this capability owns this journey end to end, so its screens belong here rather than in a new capability.

### New Capabilities
(none — no new capability is warranted; both deltas fit an existing Purpose)

## Impact

| File | Mode | Change |
|---|---|---|
| `pages/visita/agendar/[houseId].vue` | Review + align + extend | Design pass; 3 new screen states; house context header |
| `components/IdentityVerification.vue` | Review | Consumed by this route — align to system if the audit finds gaps |
| `openspec/specs/design-tokens/tokenization-report.md` | Living doc | Append this route's audit pass |
| `docs/planning/design-tokens.md` | Inventory | Add any new token this leaf needs (only if no existing token fits semantically) |
| `docs/planning/screen-map.md` | Status | Mark the route validated for #198 |

No backend, API, or data model impact. `server/api/visits/schedule.post.ts` is deliberately untouched.
