## Why

This is leaf [#200](https://github.com/fortegb/platform/issues/200) — Design e tokenização: Gerenciar visita — the fourth of the 11 journey-level design leaves in Passo 6 (Design system), corresponding to journey [#188](https://github.com/fortegb/platform/issues/188)/D-061 (post-visit and re-engagement). Route in scope: `/visita/gerenciar/[token]`, marked `novo — validado #188` in `screen-map.md`. Unlike #198/#199 (review-and-align passes over pre-architecture stubs), this leaf is **greenfield**: the route does not exist. The scheduled-visit result page from #198 (`pages/visita/[token].vue:111`) already links to `/visita/gerenciar/${token}` with a "Cancelar ou remarcar" button — that link currently points at nothing. This leaf builds the screen it points to.

D-061 is the accepted canon for this journey. It settles the mechanism — self-service page with no login, valid until the visit reaches a terminal state or its scheduled time passes; **Cancel** sets `visit.status = cancelled` and calls the Tuya adapter's `revoke(credential)` when a code was already provisioned; **Reschedule** cancels and rebooks through the standard flow rather than editing in place; staff is alerted by Telegram. The capability `journey-post-visit-reengagement` already carries those behavioral requirements. What D-061 does **not** do is enumerate the screen's rendered states — that is this leaf's job under scope rule 3.

## Scope rules (Passo 6, agreed 2026-07-20)

The three scope rules recorded in `design-system-fluxo.md` during #198 apply here unchanged:

1. **Every screen is designed in Passo 6.** A state that only exists as a later outcome still gets designed now.
2. **Screens are not shared across journeys.** `/visita/gerenciar/[token]` is **this journey's own** surface — it does **not** reuse `/visita/[token]` (the scheduled-visit result from #198), even though both are token-keyed and show the same visit. This is the explicit worked example in `design-system-fluxo.md` scope rule 2.
3. **Every branch is designed, happy and sad.** The leaf enumerates the full branch set — the inventory lives in `tasks.md §6` so coverage can be checked rather than assumed.

D-061 §DoD assigns the **real implementation** — the no-auth token lookup, `revoke()` wiring, the cancel/rebook transaction, the Telegram alert, the follow-up consent gating — to Execução ([#141](https://github.com/fortegb/platform/issues/141), [#81](https://github.com/fortegb/platform/issues/81)). This leaf does **not** do that work. It designs and builds the screen; what drives it stays simulated (variant from `?estado=`, mirroring #198) until Execução.

## What makes the manage-visit screen distinct

The management page is the **only** self-service surface in the platform reachable without a login that can take a **destructive, irreversible** action — cancelling a visit deactivates a live door code and frees a scheduled slot. Two consequences shape the design and both were settled in the design walkthrough:

- **Reschedule cancels only on confirmation of the new slot, not before.** D-061's text reads "Remarcar cancela a visita atual e entra no formulário de agendamento" — a literal cancel-then-rebook ordering. Taken literally, a visitor who clicks Remarcar and then abandons the booking form has silently lost their visit with nothing scheduled in its place. The design **amends** that ordering: the original visit stays active until the new slot is confirmed, then it is cancelled. This honours D-061's intent (reschedule, don't lose) while diverging from its literal sequence, so it is registered as an amendment to D-061 (same treatment as #187→D-053, #189→`crm-source-of-truth`, #196→D-062). See `design.md`.
- **Cancel always passes through a confirmation, and the confirmation is state-aware.** A one-click cancel on a no-auth page is too easy to trigger by accident for an action that revokes a real door code. Cancel opens a confirmation step; when the visit has already reached `access_provisioned`, that step states explicitly that the access code will be deactivated immediately — because that is the branch where `revoke()` fires and the effect is irreversible.

## Condominium / portaria notice

The issue scopes an "aviso condomínio/portaria (inline ou modal no fluxo)" to this leaf. Access **strategy** for gated communities is deferred to Execução (#140, Q-017), so the notice content is necessarily generic ("ao chegar, identifique-se na portaria") and promises no mechanism. Decision from the walkthrough: **today every ForteGB house is inside a condomínio**, so the notice is **universal and inline** — a fixed box beside the address, shown on every actionable variant, no per-house conditional and no click to reveal (access-critical information must not hide behind a modal). A `ponytail:` comment marks that a non-condomínio house is a future development that would reintroduce the conditional — not built now (YAGNI).

## Route shape

A single route, `/visita/gerenciar/[token]`, that derives its variant from the visit's stored status — never from the URL (the #198 lesson: an outcome encoded in the URL can contradict the server's actual state). Cancel and its confirmation are in-page states of the same route; Reschedule navigates into the existing booking flow (`/visita/agendar/[houseId]`) pre-filled. `[token]` stays in the path so a refresh re-resolves the same visit.

> The single-route shape is the proposed direction. As in #198 (proposed 3 states → walkthrough landed 19), the design walkthrough during apply may split a state into its own sub-route. The **branch inventory** (`tasks.md §6`) is the contract; the route shape may move within the `/visita/gerenciar/[token]` namespace.

## What Changes

**Screen states — the whole screen is new.** The full inventory (happy and sad) designed here:

| State | Actionable? | Basis |
|---|---|---|
| Manageable — before access provisioned | Cancel · Reschedule | Cancel sets `cancelled`, no `revoke` (no credential yet) |
| Manageable — access provisioned (code live) | Cancel (warns code deactivation) · Reschedule | Cancel sets `cancelled` **and** calls `revoke(credential)` |
| Manageable — verification pending staff review (`em-analise`) | Cancel · Reschedule | Visit not terminal; both actions apply normally |
| Cancel confirmation step | — | Are-you-sure; state-aware code-deactivation warning |
| Cancelled (success / already cancelled) | Rebook | Terminal; `revoke` already done if it applied |
| Completed (visit already happened) | Rebook | Terminal, read-only |
| Declined (verification failed) | Contact staff | Terminal, read-only — a security signal, kept distinct from `cancelled` (D-061) |
| Scheduled time passed without completing | Rebook | No longer manageable; link no longer offers actions (D-061) |
| Invalid / unknown token | Contact staff | Same "Link inválido" surface as #198 — does not reveal which links were real |

- **Reschedule flow**: "Remarcar" routes to `/visita/agendar/[house]` pre-filled with the visitor's known details; the original visit is cancelled only when the new booking is confirmed (the D-061 amendment above).
- **Condominium notice**: universal inline box beside the address on every actionable variant (above).
- **Design-system alignment**: house-context header (`HouseVisitHeader.vue`, #198), the status-tone map pattern from `pages/visita/[token].vue`, button hierarchy per `AGENTS.md` §9, card/surface and typography from the 81.25% global scale — no raw DaisyUI defaults.
- **Copy** (pt-BR): cancel confirmation, each terminal state, the condominium notice, and the reschedule warning.
- **Tokenization** (Pass 5): audit the route file tree for hex, arbitrary color utilities, and raw Tailwind palette colors — `set -f` + quoted paths + per-file existence check, **no** `2>/dev/null` (the two traps from #198/#199: bracket route paths are shell glob classes, and suppressed errors read as "clean"). Record in the living `tokenization-report.md`.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `journey-post-visit-reengagement`: append the manage-visit **screen-state** requirements (the designed branches, the state-aware cancel confirmation, the reschedule-ordering amendment, the universal condominium notice), and write the capability's `Purpose` (currently the `TBD` placeholder left by the archive of `jornada-pos-visita-reengajamento`).

## Impact

- **New page**: `pages/visita/gerenciar/[token].vue` (simulated, `?estado=` driven).
- **Reused components**: `HouseVisitHeader.vue`, `WhatsAppIcon.vue`, `useWhatsApp()`, the status-tone pattern from `pages/visita/[token].vue`.
- **No backend**: does not add or touch any `server/api/**` route; `revoke()`, the cancel/rebook transaction, the Telegram alert, and follow-up consent stay in Execução (#141/#81).
- **Docs**: `screen-map.md` (state confirmed `novo`→designed), `tokenization-report.md` (Pass 5), `decisions.md` (D-061 amendment).
- **Spec**: `journey-post-visit-reengagement` delta (added screen-state requirements + Purpose).
