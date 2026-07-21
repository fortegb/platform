## 1. Phase 0 — grounding (no edits)

- [x] 1.1 Re-read D-061 and the current `journey-post-visit-reengagement/spec.md` so the mock's state names match the capability (`cancelled`, `completed`, `declined`, `access_provisioned`, `em-analise`).
- [x] 1.2 Re-read `pages/visita/[token].vue` (#198) for the inherited patterns: `HouseVisitHeader`, the status-tone map, `useWhatsApp`, the "Link inválido" surface, button hierarchy.
- [x] 1.3 Confirm no `pages/visita/gerenciar/` exists yet (greenfield) and that `[token].vue:111` links here.

## 2. Route

- [x] 2.1 Create `pages/visita/gerenciar/[token].vue`, variant driven by `?estado=` (simulated, mirroring #198's `ponytail:` note that the real screen derives the variant from `visit.status` server-side, never the URL).
- [x] 2.2 Reuse `HouseVisitHeader`, `WhatsAppIcon`, `useWhatsApp`, and the visit-details `<dl>` pattern from `pages/visita/[token].vue` — do not re-invent them (scope rule 2 keeps the screen separate, but shared components are still shared).

## 3. Cancel (D2)

- [x] 3.1 Cancel opens a confirmation step (in-page state), not a one-click action.
- [x] 3.2 State-aware warning: when the variant is provisioned (`access_provisioned`), the confirmation states the code will be deactivated immediately; otherwise a plain are-you-sure.
- [x] 3.3 Confirmed cancel lands on the `cancelled` (success) state, which offers Rebook.

## 4. Reschedule (D1 — amends D-061)

- [x] 4.1 "Remarcar" routes to `/visita/agendar/[houseId]` pre-filled with the visitor's known details (in the mock, pass via query/params — real pre-fill is Execução).
- [x] 4.2 The original visit stays active; it is cancelled only on confirmation of the new slot (design/mock: no transaction here, but the copy and flow must not imply the current visit is already gone when Remarcar is clicked).
- [x] 4.3 `ponytail:` note pointing at the D-061 amendment and the single-commit expectation for Execução (old-visit cancel + `revoke()` fire at new-slot confirmation).

## 5. Condominium notice (D3)

- [x] 5.1 Inline box beside the address on every actionable variant: icon + "Esta casa fica em condomínio. Ao chegar, identifique-se na portaria."
- [x] 5.2 `ponytail:` note: universal because every house is in a condomínio today; a non-condomínio house is a future development that reintroduces a per-house conditional.

## 6. Branch inventory (the contract)

Every branch gets a designed state. Checked here, not assumed.

- [x] 6.1 Manageable — before access provisioned → details + Cancel + Reschedule + notice
- [x] 6.2 Manageable — access provisioned (code live) → details + Cancel (code-deactivation warning) + Reschedule + notice
- [x] 6.3 Manageable — verification pending review (`em-analise`) → details + Cancel + Reschedule + notice
- [x] 6.4 Cancel confirmation — provisioned variant (warns) and pre-provisioned variant (plain)
- [x] 6.5 Cancelled — success / already cancelled → read-only + Rebook
- [x] 6.6 Completed — visit already happened → read-only + Rebook
- [x] 6.7 Declined — verification failed → read-only + Contact staff, visually distinct from cancelled
- [x] 6.8 Scheduled time passed without completing → read-only, no actions, Rebook
- [x] 6.9 Invalid / unknown token → generic "Link inválido" + WhatsApp, reveals nothing

## 7. Design-system alignment

- [x] 7.1 Button hierarchy per `AGENTS.md` §9 (WhatsApp green for contact, secondary blue for primary action, outline navy for secondary); no raw `btn btn-primary`.
- [x] 7.2 Card/surface, spacing, and typography from the 81.25% global scale — no arbitrary color utilities, no off-scale type.
- [x] 7.3 Mobile pass: primary actions full-width on mobile, compact auto-width on `sm+` (parity with #198/#199); verify at 375px, no overflow.

## 8. Copy (pt-BR)

- [x] 8.1 Eyebrow/title/message per variant (reuse the tone-map shape from #198).
- [x] 8.2 Cancel confirmation copy — both variants.
- [x] 8.3 Reschedule warning copy (does not imply the current visit is already cancelled).
- [x] 8.4 Condominium notice copy.
- [x] 8.5 Strict pt-BR, no pt-PT forms (AGENTS.md primary rule).

## 9. Tokenization (Pass 5)

- [x] 9.1 Audit `pages/visita/gerenciar/[token].vue` for hex, arbitrary color utilities, and raw Tailwind palette colors — `set -f`, quoted bracket paths, per-file existence check, **no** `2>/dev/null`.
- [x] 9.2 Append findings to `openspec/specs/design-tokens/tokenization-report.md` as Pass 5.

## 10. Docs

- [x] 10.1 `screen-map.md`: mark `/visita/gerenciar/[token]` designed (state was `novo`).
- [x] 10.2 `decisions.md`: register the D-061 amendment (reschedule ordering) with two-way cross-references, following the #187→D-053 / #189→`crm-source-of-truth` / #196→D-062 pattern.
- [x] 10.3 If a missing screen surfaces during the walkthrough, follow the `design-system-fluxo.md` playbook (finish this leaf, separate issue, `screen-map.md`, register any reopened decision).

## 11. Verification

- [x] 11.1 `npm run build` clean.
- [x] 11.2 Every `?estado=` variant renders and is reachable in the preview; screenshot the key states.
- [x] 11.3 `openspec validate design-gerenciar-visita --strict` passes.
