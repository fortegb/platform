## 1. Phase 0 — audit (no edits)

- [x] 1.1 Re-read `pages/visita/qr/[code].vue` and confirm the stub state set (done: 2 steps + invalid-code fallback + one generic `alert-error`).
- [x] 1.2 Confirm the reusable #198 pieces resolve: `HouseVisitHeader.vue`, `VisitStepIndicator.vue`, `IdentityVerification.vue`, `useHouseStatus.ts`. Note any gap the QR flow's step set exposes in `VisitStepIndicator` before reusing it.
- [x] 1.3 Re-read D-059 and `journey-instant-visit` spec; confirm the branch inventory in §7 matches the canon (no invented states, none missing).

## 2. Capability purpose

- [x] 2.1 Write a real `Purpose` for `journey-instant-visit` (currently `TBD` from #187's archive), via the spec delta — see `specs/journey-instant-visit/spec.md`.
- [x] 2.2 Leave `ui-visual-accessibility`'s TBD untouched (noted in the proposal, not in scope).

## 3. House status and visit matrix

- [x] 3.1 Reuse `useHouseStatus.allowsSelfGuidedVisit` — the QR entry gates on `disponivel` exactly as `/portfolio` and `/visita/agendar` do.
- [x] 3.2 Design the not-eligible state for a placa that outlived the `disponivel` status (`reservado`/`vendido`/`em-construcao`/`na-planta`): explain and offer a WhatsApp contact + `/portfolio/[slug]` link. No self-guided access.

## 4. Route split

- [x] 4.1 Narrow `pages/visita/qr/[code].vue` to the entry surface (house context + identify form). Move the `[code]/` bracket-route trap into account: a `[code].vue` beside a `[code]/` folder silently becomes a parent layout (the #198 Nuxt trap) — put the entry at `[code]/index.vue` if a `[code]/` folder is introduced.
- [x] 4.2 Add `pages/visita/qr/[code]/verificacao.vue` (verification / OTP handoff).
- [x] 4.3 Add `pages/visita/qr/[code]/resultado.vue` (result, variant from stored status).
- [x] 4.4 Wire navigation between them; a refresh on any surface re-resolves house + visit from `[code]` (simulated).

## 5. Entry screen (identify + house context)

- [x] 5.1 House header via `HouseVisitHeader.vue`, linked to `/portfolio/[slug]`.
- [x] 5.2 Identify form — WhatsApp number + CPF (reuse `maskPhone`/`maskCpf`/`isValidCpf` from `useVisitBooking`; CPF is the dedup authority, D-020). No date/slot — the visitor is at the door.
- [x] 5.3 States: resolving (spinner, aligned), invalid/expired code, not-eligible (§3.2), ready-to-identify.
- [x] 5.4 Step indicator via `VisitStepIndicator.vue`.

## 6. Verification handoff (new visitor + reuse)

- [x] 6.1 New / not-reuse-eligible → `IdentityVerification.vue` (selfie + document).
- [x] 6.2 Reuse-eligible (within 12-month window, under the 24-month `last_client_match_at` ceiling) → WhatsApp OTP entry state (`method: phone-otp`). `identity_verified_at` alone does not grant access here.
- [x] 6.3 Ceiling branch: reuse window valid but past 24 months → do **not** offer OTP; route to full verification (6.1). Design so the OTP surface never appears when it does not apply.
- [x] 6.4 Step indicator continues across this route.

## 7. Result screen — branch inventory (the contract)

Every branch below gets a designed state. A generic error covering several is a gap (scope rule 3). Variant derives from the visit's stored status, never the URL.

- [x] 7.1 **Access granted** — password + validity window, shown only once `visit.status` is `access_provisioned`. Copy: access-granted WhatsApp message is queued async; the password is shown in-session. Fix the stub copy that both promises the password by WhatsApp and shows it inline.
- [x] 7.2 **Immediate decline** — failed / low-confidence `client-match` **or** incorrect/expired OTP. In-session refusal with a WhatsApp escape hatch to contact staff. **Not** a pending/loading state and **not** #198's async acknowledgement. Both failure sources land on this one path (D-059).
- [x] 7.3 **Provisioning failed** — Tuya write failed; staff-alerted, no password, visually distinct from granted. Never shows a credential that was not programmed.
- [x] 7.4 Confirm there is **no** async "pending staff review" acknowledgement state in this journey (that is #198's scheduled flow) — its absence is deliberate, per D-059.

## 8. Design-system alignment

- [x] 8.1 Button hierarchy per `AGENTS.md` §9 (WhatsApp green for WhatsApp actions; blue primary; outline navy secondary). Replace raw `btn btn-primary`.
- [x] 8.2 Card/surface treatment matching `/visita/[token]`; typography from the 81.25% scale (drop off-scale `text-3xl`/`text-2xl`).
- [x] 8.3 Replace generic `alert alert-error` with the decline state's designed treatment.
- [x] 8.4 Mobile-first layout — this flow is scanned on a phone at the door, so verify mobile first.

## 9. Copy (pt-BR)

- [x] 9.1 All visitor-facing copy in pt-BR, brand voice (confiança, transparência, proximidade). No pt-PT.
- [x] 9.2 Decline copy states the concrete next step (WhatsApp staff), not a bare error.

## 10. Tokenization

- [x] 10.1 Audit the route file tree for hex, arbitrary utilities (`[#xxxxxx]`), and raw Tailwind palette colors. Use `set -f` + quoted paths + per-file existence check; run **without** `2>/dev/null` (bracket paths are glob classes; suppressed errors read as "clean").
- [x] 10.2 Append findings and resolutions to `openspec/specs/design-tokens/tokenization-report.md` (Pass 4).
- [x] 10.3 Add any genuinely new token to `tailwind.config.js` + `docs/planning/design-tokens.md` (named, never arbitrary in new files). Prefer an existing token if one fits semantically.

## 11. Docs

- [x] 11.1 `screen-map.md`: split the single QR row into entry / verificação / resultado; mark designed for #199.
- [x] 11.2 Note in `screen-map.md` §visita header that #199 designed the QR flow (parallel to the #198 note).

## 12. Playbook — missing screen discovered during design

If designing pixels over D-059 surfaces a screen the journey never described (as #190 → #196 did in Passo 5): finish this leaf, open a new issue via `rbo-create-issue` pinned to the right epic (#67 if design-system, #81/#80 if Execução gap), update `screen-map.md`, register any reopened decision, and decide urgent-vs-backlog. Do not block this leaf.

## 13. Verification

- [x] 13.1 `npm run build` clean.
- [x] 13.2 Every branch in §7 renders as its own state (simulated); no generic error stands in for two branches.
- [x] 13.3 `openspec validate design-visita-qr` passes.
- [ ] 13.4 Human visual review, one surface at a time (`rbo-ui-validate`).
