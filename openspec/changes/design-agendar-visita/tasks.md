## 1. Phase 0 — audit (no edits)

- [ ] 1.1 Tokenization audit of the route's file tree (`pages/visita/agendar/[houseId].vue`, `components/IdentityVerification.vue`, and anything they render): grep for hex literals, arbitrary color utilities (`bg-[#...]`, `text-[#...]`), and raw Tailwind palette colors (`bg-blue-500` etc.). Run **without** `2>/dev/null` — a suppressed error reads as "clean" (method note from #197's Pass 2).
- [ ] 1.2 Record the audit in `openspec/specs/design-tokens/tokenization-report.md` as this leaf's pass.
- [ ] 1.3 Confirm no new token is needed. If one is, name it by semantic role and add to `tailwind.config.js` + `docs/planning/design-tokens.md` — do not approximate with a close existing token.

## 2. Capability purpose

- [ ] 2.1 `openspec/specs/design-tokens/spec.md` — replace the `TBD - created by archiving change design-descoberta-site` Purpose with the written one (see the spec delta). Do not touch `journey-scheduled-visit` or `ui-visual-accessibility` Purposes here — flagged in the proposal, not in scope.

## 3. House context

- [ ] 3.1 Resolve the house from `route.params.houseId` against the existing mock data service and render a header: house name, address, and thumbnail.
- [ ] 3.2 Link the header back to `/portfolio/[slug]` for that house.
- [ ] 3.3 Handle the unknown-`houseId` case with a clear empty state rather than a blank header.

## 4. Design-system alignment (existing states)

- [ ] 4.1 Typography — replace the raw `text-4xl font-bold` heading and ad-hoc sizes with the scale used on `/portfolio/[slug]`, respecting the 81.25% global scale.
- [ ] 4.2 Buttons — apply the `AGENTS.md` §9 hierarchy: primary action in secondary blue, secondary action as navy outline, WhatsApp green reserved for WhatsApp actions. Replace `btn-primary w-full` where full-width is not the right affordance.
- [ ] 4.3 Surfaces — align card/shadow treatment to the portfolio detail page rather than `card shadow-xl` defaults.
- [ ] 4.4 Form fields — align label, input, select, and validation-message styling; keep the existing mock rules (tomorrow minimum, fixed time slots).
- [ ] 4.5 Error presentation — replace `alert alert-error` defaults with the system's treatment.
- [ ] 4.6 Mobile layout — verify the form, verification step, and confirmation read correctly at mobile width.

## 5. Route split

- [ ] 5.1 Narrow `pages/visita/agendar/[houseId].vue` to the form step; on submit, navigate to the verification route carrying the entered values (client-side store or route state — not query params, per the privacy rule against personal data in URLs).
- [ ] 5.2 Create `pages/visita/agendar/[houseId]/verificacao.vue` — the identity-verification step, rendering `IdentityVerification.vue`. Guard against direct entry with no form data (redirect back to the form).
- [ ] 5.3 Create `pages/visita/[token].vue` — the result screen, variant selected from the visit's stored status. Own screen for this journey; **not** shared with `/visita/gerenciar/[token]` ([#200](https://github.com/fortegb/platform/issues/200)).
- [ ] 5.4 Add a step indicator across the two pre-submission routes.
- [ ] 5.5 Back path from verification to the form, preserving entered values.

## 6. Result screen variants (D-058)

- [ ] 6.1 **Confirmed** — date, time, address, and the access password, shown only when the visit reached `access_provisioned`.
- [ ] 6.2 **Pending staff review** — acknowledgement: booking received, confirmation by WhatsApp before the visit date. No password. Not styled as an error.
- [ ] 6.3 **Access provisioning failed** — booked with access pending, staff alerted, access details to follow by WhatsApp. No password.
- [ ] 6.4 **Verification skipped** — copy on the confirmed variant stating the prior identity verification is still valid, for a returning client inside the 12-month window. Not a fourth variant.
- [ ] 6.5 Unknown or expired token — clear empty state, no leaking of whether the token ever existed.
- [ ] 6.6 Make every variant reachable for design review while status is simulated (dev-only mock flag; mark the seam with a `ponytail:` comment naming Execução [#81](https://github.com/fortegb/platform/issues/81) as the upgrade path).

## 7. Copy (pt-BR)

- [ ] 7.1 All new and revised copy in pt-BR, never pt-PT. Tone per the brand pillars — Transparência and Segurança carry these states, especially the pending and failed ones.
- [ ] 7.2 Review existing copy on the screen for the same standard.

## 8. Verification

- [ ] 8.1 `npm run build` clean.
- [ ] 8.2 Re-run the tokenization grep — zero hex, zero arbitrary color utilities, zero raw palette colors across the route's files.
- [ ] 8.3 Walk every state in the browser; expect several design-check-adjust cycles with the user doing the visual verification in their own browser.
- [ ] 8.4 `docs/planning/screen-map.md` — replace the single scheduling row with the three routes, marked validated for [#198](https://github.com/fortegb/platform/issues/198). Structural edit, not just a status field.
- [ ] 8.5 `docs/planning/design-system-fluxo.md` — record the two Passo 6 scope rules agreed 2026-07-20: every screen is designed in Passo 6; screens are not shared across journeys.
- [ ] 8.6 `npx openspec validate --strict` passes.
