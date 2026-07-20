## 1. Phase 0 — audit (no edits)

- [x] 1.1 Tokenization audit of the route's file tree: grep for hex literals, arbitrary color utilities, and raw Tailwind palette colors. Run **without** `2>/dev/null` — a suppressed error reads as "clean".
- [x] 1.2 Record the audit in `openspec/specs/design-tokens/tokenization-report.md`.
- [x] 1.3 Confirm no new token is needed; if one is, name it by semantic role and add to `tailwind.config.js` + `docs/planning/design-tokens.md`.

## 2. Capability purpose

- [x] 2.1 `openspec/specs/design-tokens/spec.md` — replace the `TBD` Purpose left by #197's archive.

## 3. House status and visit matrix

- [x] 3.1 Add status `na-planta` (label "Na planta") to the type in `components/HouseCard.vue`, the badge map, the label map, and `composables/useHouseSort.ts`.
- [x] 3.2 Document `na-planta` in `docs/planning/templates/cms-content-model.md` (same gap pattern as `featured`).
- [x] 3.3 Apply the visit matrix — self-guided only on `disponivel`; guided (future, [#213](https://github.com/fortegb/platform/issues/213)) on `disponivel` + `em-construcao`; no visit on `na-planta`, `reservado`, `vendido`.
- [x] 3.4 `components/HouseCard.vue` — narrow the "Agendar Visita" CTA from "everything except `vendido`" to `disponivel` only. Shared with `/portfolio`, so verify there too.

## 4. Route split

- [x] 4.1 Narrow `pages/visita/agendar/[houseId].vue` to the form step.
- [x] 4.2 Create `pages/visita/agendar/[houseId]/verificacao.vue` — handoff screen before redirect (not the capture itself; that is the vendor's, D-070).
- [x] 4.3 Create `pages/visita/[token].vue` — result screen, variant from stored status. This journey's own screen, **not** shared with `/visita/gerenciar/[token]` ([#200](https://github.com/fortegb/platform/issues/200)).
- [x] 4.4 Persist form values in `sessionStorage` so refresh and back survive; redirect to the form only when nothing is stored.
- [x] 4.5 Step indicator across the two pre-submission routes; back path preserving values.

## 5. Form screen (states 1–6)

- [x] 5.1 House context header — name, address, thumbnail — linked to `/portfolio/[slug]`.
- [x] 5.2 Design-system alignment: typography, button hierarchy per `AGENTS.md` §9, surfaces matching `/portfolio/[slug]`, field styling, mobile layout.
- [x] 5.3 Add the **CPF field**, required, with check-digit validation and masking. Canon basis D-020: a visit is where a Contato becomes a Cliente.
- [x] 5.4 Phone validation — Brazilian mobile, formatted as typed. It is the identity key for the 12-month match and the WhatsApp destination.
- [x] 5.5 Inline field-level validation; remove the page-level alert box.
- [x] 5.6 **State 2** — unknown `houseId`: message screen with a link to the portfolio, no form. Not a silent redirect.
- [x] 5.7 **State 3** — house not visitable: explain per status; for `em-construcao`, a WhatsApp CTA rather than a dead end (guided visits do not exist yet).
- [x] 5.8 **State 5** — slot taken between load and submit: conflict state. Which slots are unavailable is [#214](https://github.com/fortegb/platform/issues/214)'s rule, not this leaf's.
- [x] 5.9 **State 6** — submission failed: stay on the form, values preserved, explicit retry; after a second failure offer WhatsApp.

## 6. Verification handoff (states 7–12)

- [x] 6.1 **State 7** — handoff screen: what is about to happen, why, and the privacy policy link. One tap, then redirect. (Immediate redirect only once own branding is live — D-070.)
- [x] 6.2 **State 8** — direct entry with no stored form data: redirect to the form.
- [x] 6.3 **State 12** — abandoned: no screen in this leaf. The nudge is a WhatsApp message and the release is a timer; the rule lives on [#214](https://github.com/fortegb/platform/issues/214), which owns slot occupancy.
- [x] 6.4 States 9 (camera denied), 10 (document rejected) and 11 (rejected/inconclusive) need **no screens here** — capture, retries and quality messaging belong to the vendor; a failed outcome lands on the result screen as state 15.

## 7. Result screen (states 13–19)

- [x] 7.1 **State 13** — confirmed with access code. Address tappable to maps, code legible outdoors, validity window stated ("válido das 15:00 às 17:00"), link to cancel/reschedule ([#200](https://github.com/fortegb/platform/issues/200)), and a way to reach staff. Same code as the WhatsApp message; WhatsApp is the delivery, this is the immediate confirmation.
- [x] 7.2 Lock instructions — primarily in the WhatsApp message, same text mirrored here.
- [x] 7.2.1 Placeholder lock mechanics recorded on [#77](https://github.com/fortegb/platform/issues/77) for verification against the installed hardware before launch — not this leaf's work.
- [x] 7.3 **State 14** — verification skipped: state 13 plus a line saying the previous verification is still valid and roughly until when; flag an expiry that is close.
- [x] 7.4 **State 15** — pending staff review: booking received, **confirmation within 24 hours** by WhatsApp, no code, WhatsApp button. Not styled as an error.
- [x] 7.5 **State 16** — provisioning failed: booked, access pending, staff alerted, details by WhatsApp, **no code**. Never show a code that was not written to the lock.
- [x] 7.6 **State 17** — unknown or expired token: one message for both cases, deliberately indistinguishable. Portfolio and WhatsApp offered.
- [x] 7.7 **State 18** — cancelled: reads as confirmation the cancellation worked, not an error. No code. Clear path to rebook.
- [x] 7.8 **State 19** — visit date passed: shown as past, no code, WhatsApp and a link back to the house (post-visit follow-up is D-061's).
- [x] 7.9 Make every variant reachable for design review while status is simulated (dev-only flag; `ponytail:` comment naming Execução [#81](https://github.com/fortegb/platform/issues/81)).

## 8. Copy (pt-BR)

- [x] 8.1 All copy in pt-BR, never pt-PT. Transparência and Segurança carry states 15 and 16 especially.
- [x] 8.2 Review existing copy to the same standard.

## 9. Verification

- [x] 9.1 `npm run build` clean.
- [x] 9.2 Re-run the tokenization grep — zero hex, zero arbitrary color utilities, zero raw palette colors.
- [x] 9.3 Walk all 19 states in the browser; expect several design-check-adjust cycles, with the user doing visual verification in their own browser.
- [x] 9.4 `docs/planning/screen-map.md` — one scheduling row becomes three routes, marked validated for [#198](https://github.com/fortegb/platform/issues/198).
- [x] 9.5 `docs/planning/design-system-fluxo.md` — record the three Passo 6 scope rules (2026-07-20): every screen designed in Passo 6; screens not shared across journeys; every branch designed, happy and sad.
- [x] 9.6 `npx openspec validate --strict` passes.
