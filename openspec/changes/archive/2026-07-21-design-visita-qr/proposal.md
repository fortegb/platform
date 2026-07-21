## Why

This is leaf [#199](https://github.com/fortegb/platform/issues/199) — Design e tokenização: Visita QR — the third of the 11 journey-level design leaves in Passo 6 (Design system), corresponding to journey [#187](https://github.com/fortegb/platform/issues/187)/D-059. Route in scope: `/visita/qr/[code]`, marked `simulado — validado #187` in `screen-map.md` — the page already exists, so this is a review-and-align pass like [#198](https://github.com/fortegb/platform/issues/198)'s `/visita/agendar/[houseId]` was, not a build from scratch. It inherits the token foundation established by [#197](https://github.com/fortegb/platform/issues/197) and the screen patterns designed in #198 (house-context header, step indicator, verification handoff, token-derived result), so there is no setup step.

A Phase 0 read of `pages/visita/qr/[code].vue` (110 lines) found the same pre-architecture stub shape #198 started from: two linear steps (`IdentityVerification` → "Acesso Liberado!" with a password) plus a single invalid-code fallback, with one generic `alert alert-error` standing in for every failure. D-059 — the accepted canon for this journey — defines a materially different set of outcomes than the stub renders, and none of the three states D-059 makes unique to the instant flow exist on the screen at all. That is a design gap, not just a backend gap: even once Execução ([#81](https://github.com/fortegb/platform/issues/81), [#80](https://github.com/fortegb/platform/issues/80), [#77](https://github.com/fortegb/platform/issues/77)/[#135](https://github.com/fortegb/platform/issues/135), [#75](https://github.com/fortegb/platform/issues/75)) rewrites the endpoint, there is no screen for these results to land on.

## Scope rules (Passo 6, agreed 2026-07-20)

The three scope rules recorded in `design-system-fluxo.md` during #198 apply here unchanged:

1. **Every screen is designed in Passo 6.** A state that only exists as a later outcome still gets designed now.
2. **Screens are not shared across journeys.** The QR result is **this journey's own** surface under `/visita/qr/[code]/*` — it does **not** reuse `/visita/[token]` (the scheduled-visit result from #198), even though both show a visit.
3. **Every branch is designed, happy and sad.** The leaf enumerates the full branch set — the inventory lives in `tasks.md §7` so coverage can be checked rather than assumed.

D-059 §DoD assigns the **real implementation** — endpoint rewrite, `client-match`, phone-OTP dispatch, Tuya adapter wiring, `staff-review` enqueueing, QStash delivery — to Execução. This leaf does **not** do that work and does not touch `server/api/visits/instant.post.ts` or `server/api/visits/qr/[code].get.ts`. It designs and builds the screens; what drives them stays simulated until Execução.

## What makes the QR flow different from #198

D-059's whole premise is **no time slack** — the visitor is physically at the door, so every outcome resolves in-session rather than arriving later by WhatsApp. Three consequences distinguish this leaf from #198's scheduled flow:

- **Immediate decline, not async acknowledgement.** A failed or low-confidence `client-match` refuses **right there** with a WhatsApp escape hatch to contact staff — it is **not** #198's non-blocking "confirmaremos por WhatsApp antes da visita" pending-review state. The instant flow has no such acknowledgement state; the equivalent branch is a hard decline the visitor can act on.
- **Phone possession gates reuse.** A returning `Cliente` inside the 12-month `identity_verified_at` window cannot skip straight to access as they can when scheduling (#198). They must confirm a short-lived WhatsApp one-time code (`method: phone-otp`) first — a screen state #198 does not have. An incorrect/expired code reuses the same immediate-decline path.
- **Reuse has a ceiling.** Past 24 months from `last_client_match_at`, the OTP shortcut is no longer offered and the visitor runs full `client-match` — a routing branch the design must account for so the OTP path is not shown when it does not apply.

## Route shape

The stub is one route switching on a `step` ref — nothing is linkable and a refresh loses everything (identical to #198's original defect). Keep the journey inside its own `/visita/qr/[code]` namespace (satisfying scope rule 2 without borrowing `/visita/[token]`) and split by surface, mirroring #198:

| Route | Purpose |
|---|---|
| `/visita/qr/[code]` | Entry — house context + identify (WhatsApp number, CPF) so the server can decide OTP-reuse vs. full verification |
| `/visita/qr/[code]/verificacao` | Identity handoff — full verification (selfie + document) for new visitors, or WhatsApp OTP entry for reuse-eligible clients |
| `/visita/qr/[code]/resultado` | Outcome — variant derived from the visit's stored status, never from the URL |

The `[code]` stays in every path so a refresh re-resolves the same house and visit from the server. The result variant is derived from `visit.status` (granted / declined / provisioning-failed), never encoded in the URL — the #198 lesson that an outcome in the URL can contradict the server's actual state applies identically here.

> The exact route split is the proposed direction, not a settled count. As in #198 (proposed 3 routes / 6 states → walkthrough landed 3 routes / 19 states), the design walkthrough during apply may refine which states are their own route vs. an in-page state. The **branch inventory** (`tasks.md §7`) is the contract; the route count may move within the `/visita/qr/[code]` namespace.

## What Changes

**Screen states — the substantive gap.** The stub covers 2 of the states D-059 defines and none of the three it makes unique to the instant flow. The full inventory (happy and sad) is designed here:

| State | Route | Exists today | D-059 basis |
|---|---|---|---|
| Resolving QR code | `/visita/qr/[code]` | ✅ (spinner) | — |
| Invalid / expired QR code | `/visita/qr/[code]` | ✅ | Code not associated with a house |
| **House not eligible for self-guided visit** | `/visita/qr/[code]` | ❌ | Placa can outlive the `disponivel` status; visit matrix (self-guided only on `disponivel`) — parallel to #198 |
| Identify (WhatsApp number + CPF) with house context | `/visita/qr/[code]` | ❌ | Server needs identity to branch OTP-reuse vs. full verification; house context never shown today |
| Full identity verification (selfie + document) | `…/verificacao` | ✅ | New visitor / not reuse-eligible |
| **WhatsApp OTP entry** (returning `Cliente`, within reuse window, under ceiling) | `…/verificacao` | ❌ | `identity_verified_at` alone is not sufficient in this flow — phone possession required |
| Access granted + access password | `…/resultado` | ✅ | Password shown only once `visit.status` is `access_provisioned` |
| **Immediate decline** (verification/OTP fail or low confidence) with WhatsApp escape hatch | `…/resultado` | ❌ | Refuses in-session, no synchronous wait; **not** an async pending-review state |
| **Access provisioning failed** (Tuya fallback) | `…/resultado` | ❌ | Never a silent success; staff-alerted, no password, visually distinct from granted |

- **House context**: the screen shows only a bare `house.title` and never the address, photo, or status despite `[code]` resolving to a specific house. Add the shared house header (`HouseVisitHeader.vue`, from #198), linked back to `/portfolio/[slug]`.
- **Design-system alignment**: the page uses raw DaisyUI defaults (`card shadow-xl p-6`, `text-3xl font-bold` off the type scale, `btn btn-primary`, `alert alert-error`, `text-primary-500` password) rather than the conventions #197/#198 settled — button hierarchy per `AGENTS.md` §9, card/surface treatment matching `/visita/[token]`, typography from the 81.25% global scale.
- **Step affordance**: no progress indicator and no way back. Reuse `VisitStepIndicator.vue` (#198) across the entry and verification routes, adapted to the QR flow's step set.
- **Copy**: the granted-state copy today says the password arrives by WhatsApp *and* shows it inline, which contradicts D-059's message set (access-granted message queued async; password shown in-session once provisioned). Align the copy to the actual state.
- **Tokenization**: audit the route's file tree for hex, arbitrary color utilities, and raw Tailwind palette colors — same method as #197/#198, with `set -f` + quoted paths + per-file existence check and **no** `2>/dev/null` (the two traps recorded from those sessions: bracket route paths are shell glob classes, and suppressed errors read as "clean"). Record findings in the living `tokenization-report.md`.

**Housekeeping found in Phase 0** (flagged, not absorbed): `openspec/specs/journey-instant-visit/spec.md` still carries `Purpose: TBD - created by archiving change jornada-visita-instantanea-qr` from #187's archive. It is written here, since this change extends the capability and the fit check requires a real Purpose (same rule #198 applied to `design-tokens`). `ui-visual-accessibility` retains its own TBD — noted, not edited.

## Capabilities

### Modified Capabilities
- `journey-instant-visit`: extended with the **screen-surface** requirements for the states D-059 decided behaviorally but never specified a UI for — the OTP entry state, the immediate-decline-with-escape-hatch state (and its distinction from an async pending state), the provisioning-failure state, house context on the QR route, an addressable result whose variant derives from stored status, and the journeys-do-not-share-screens boundary against `/visita/[token]`. Its `Purpose` is also written — left `TBD` by #187's archive. Checked against scope: this capability owns the instant/QR journey end to end, so its screens belong here rather than in a new capability.

### New Capabilities
(none — the delta fits the existing capability's Purpose)

`design-tokens` is **not** modified: the generalizable Passo 6 design requirements (route-scoped screens show their subject, every decided outcome has a screen state, every screen designed, every branch designed) were already added by #198 and cover this leaf. The tokenization pass appends to the living `tokenization-report.md`, which is a doc, not a spec requirement.

## Impact

| File | Mode | Change |
|---|---|---|
| `pages/visita/qr/[code].vue` | Review + align + narrow | Design pass; becomes entry (house context + identify); no longer holds the verification/result steps |
| `pages/visita/qr/[code]/verificacao.vue` | New route | Identity verification (new) / WhatsApp OTP entry (reuse) handoff |
| `pages/visita/qr/[code]/resultado.vue` | New route | Result — granted / declined / provisioning-failed, variant from stored status |
| `components/HouseVisitHeader.vue` | Reuse | House context header from #198 |
| `components/VisitStepIndicator.vue` | Reuse | Step indicator from #198, adapted to the QR step set |
| `components/IdentityVerification.vue` | Reuse | Consumed by the verification route |
| `composables/useHouseStatus.ts` | Reuse | Visit-eligibility matrix (self-guided only on `disponivel`) |
| `docs/planning/screen-map.md` | Status + structure | Route split recorded (one row becomes three); marked designed for #199 |
| `openspec/specs/design-tokens/tokenization-report.md` | Living doc | Append this route's audit pass |
| `docs/planning/design-tokens.md` | Inventory | Add any new token this leaf needs (only if no existing token fits semantically) |

No backend, API, or data model impact. `server/api/visits/instant.post.ts` and `server/api/visits/qr/[code].get.ts` are deliberately untouched — the new routes read simulated state until Execução.

**Note for `screen-map.md`:** the map currently lists this journey as a single `simulado` row. The split changes the map's structure, not just a status field.
