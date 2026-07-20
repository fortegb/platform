## Why

This is leaf [#198](https://github.com/fortegb/platform/issues/198) — Design e tokenização: Agendar visita — the second of the 11 journey-level design leaves in Passo 6 (Design system), corresponding to journey [#186](https://github.com/fortegb/platform/issues/186)/D-058. Route in scope: `/visita/agendar/[houseId]`, marked `simulado` in `screen-map.md` — the page already exists, so this is a review-and-align pass like `/portfolio` was, not a build from scratch. It inherits the token foundation established by [#197](https://github.com/fortegb/platform/issues/197), so there is no setup step.

A Phase 0 read of `pages/visita/agendar/[houseId].vue` (178 lines) found the screen is a pre-architecture stub: three linear steps (form → verification → success) with a single error path that dumps the visitor back to step 1. D-058 — the accepted canon for this journey — requires the flow to have **four** distinct outcomes, three of which the screen has no visual state for at all. That is a design gap, not just a backend gap: even once Execução rewrites the endpoint, there is no screen for the result to land on.

## Scope rules (agreed 2026-07-20, apply to all of Passo 6)

1. **Every screen is designed in Passo 6.** Nothing reaches Execução without a design pass. A screen that only exists as a later outcome still gets designed now — otherwise it would be the one screen in its journey built after the design system closed, which is exactly how visual drift enters.
2. **Screens are not shared across journeys.** Two journeys that appear to need "the same" screen get their own. The reuse saves nothing real and costs boundary negotiation every time it comes up.
3. **Every branch is designed, happy and sad.** A leaf enumerates its journey's full branch set — success, failure, empty, expired, abandoned — and designs a state for each. A generic error standing in for several branches is a gap, because the branches call for different recovery actions. The branch inventory goes in the artifacts so coverage can be checked rather than assumed (see `tasks.md` §7).

D-058 §DoD assigns the **real implementation** — endpoint rewrite, Tuya adapter wiring, `Cliente` lookup, QStash dispatch, `staff-review` enqueueing — to Execução ([#81](https://github.com/fortegb/platform/issues/81), [#80](https://github.com/fortegb/platform/issues/80), [#77](https://github.com/fortegb/platform/issues/77)/[#135](https://github.com/fortegb/platform/issues/135)). This leaf does **not** do that work and does not touch `server/api/visits/schedule.post.ts`. It designs and builds the screens; what drives them stays simulated until Execução.

## Route shape

The stub is one route switching on a `step` ref — nothing is linkable and a refresh loses everything. D-058 sends the confirmation by WhatsApp, which needs a URL to point at. Split into three routes:

| Route | Purpose |
|---|---|
| `/visita/agendar/[houseId]` | Scheduling form |
| `/visita/agendar/[houseId]/verificacao` | Identity verification (selfie + document) |
| `/visita/[token]` | Result — what happened to this booking |

The result route is token-keyed with its variant derived from `visit.status`, not three separate routes: the three outcomes are one screen showing one visit, and putting the outcome in the URL would let it contradict the server's actual status. Per scope rule 2 it is **this journey's own screen**, distinct from [#200 — Design e tokenização: Gerenciar visita](https://github.com/fortegb/platform/issues/200)'s `/visita/gerenciar/[token]`, which is the post-booking cancel/reschedule surface from journey [#188](https://github.com/fortegb/platform/issues/188)/D-061.

## What Changes

**Screen states — the substantive gap.** The stub covers 3 of the 6 states D-058 defines. All six are designed here:

| State | Route | Exists today | D-058 basis |
|---|---|---|---|
| Scheduling form | `/visita/agendar/[houseId]` | ✅ | — |
| Identity verification | `…/verificacao` | ✅ | — |
| Confirmed + access password | `/visita/[token]` | ✅ | Password shown only once access is actually provisioned |
| **Verification skipped** (returning client, `identity_verified_at` < 12 months) | `/visita/[token]` | ❌ | Not an outcome but the absence of a step — form goes straight to result; the result states the prior verification is still valid rather than silently skipping |
| **Pending staff review** (`client-match` failed/low confidence) | `/visita/[token]` | ❌ | Escalates asynchronously and non-blocking: "agendamento recebido, confirmaremos por WhatsApp antes da sua visita" — an acknowledgement state, explicitly **not** an error |
| **Access provisioning failed** (Tuya fallback) | `/visita/[token]` | ❌ | Never a silent success. Staff-alerted state with no password, visually distinct from the confirmed state |

- **House context**: the screen never shows *which house* is being visited despite `houseId` being in the route — visitor sees a bare "Agendar Visita" with no address, photo, or name. Add the house header, linked back to `/portfolio/[slug]`.
- **Design-system alignment**: page uses raw DaisyUI defaults (`h1` with no type scale from the token set, `btn-primary w-full`, `card shadow-xl`, `alert alert-error`) rather than the conventions #197 settled — button hierarchy per `AGENTS.md` §9, card/surface treatment matching `/portfolio/[slug]`, typography from the 81.25% global scale.
- **Step affordance**: no progress indicator and no way back. Add step indication across the two pre-submission routes and a back path from verification to the form with entered values preserved.
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
| `pages/visita/agendar/[houseId].vue` | Review + align + narrow | Design pass; becomes the form step only; house context header |
| `pages/visita/agendar/[houseId]/verificacao.vue` | New route | Identity-verification step extracted from the `step === 2` branch |
| `pages/visita/[token].vue` | New route | Result screen — three variants derived from `visit.status` |
| `components/IdentityVerification.vue` | Review | Consumed by the verification route — align to system if the audit finds gaps |
| `docs/planning/screen-map.md` | Status + structure | Route split recorded (one row becomes three); marked validated for #198 |
| `docs/planning/design-system-fluxo.md` | Runbook | Record the two Passo 6 scope rules agreed 2026-07-20 |
| `openspec/specs/design-tokens/tokenization-report.md` | Living doc | Append this route's audit pass |
| `docs/planning/design-tokens.md` | Inventory | Add any new token this leaf needs (only if no existing token fits semantically) |

No backend, API, or data model impact. `server/api/visits/schedule.post.ts` is deliberately untouched — the new routes read simulated state until Execução.

**Note for `screen-map.md`:** the map currently lists this journey as a single `simulado` row. The split to three routes changes the map's structure, not just a status field.
