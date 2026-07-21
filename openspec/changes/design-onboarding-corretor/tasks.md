## 1. Phase 0 — grounding (no edits)

- [x] 1.1 Re-read D-062 + D-068 and the current `journey-corretor-onboarding/spec.md` so mock state names match (`pending_approval`, `approved`, `rejected`, `corretor_casa.status = pending/approved`).
- [x] 1.2 Re-read `pages/login.vue` (identifier-first, 3 steps) and the corretor pages (`dashboard`, `casas`) for layout/patterns; re-read `useVisitBooking` for the CPF/phone masks.
- [x] 1.3 Confirm `/corretor/onboarding/*` and `/corretor/casas/[id]/contrato` do not exist (greenfield); `/login` exists.

## 2. Login — design-system align (`/login`)

- [x] 2.1 Replace raw DaisyUI defaults (`card shadow-xl`, `btn btn-primary`, `alert alert-error`, `input input-bordered`) with the #197–#200 vocabulary — button hierarchy (`AGENTS.md` §9), surface/typography from the 81.25% scale, error treatment.
- [x] 2.2 Keep the identifier-first 3-step flow (email → password | create) and keep it generic — no CPF/CRECI/WhatsApp fields on login.
- [x] 2.3 After account creation (`create` step), route to `/corretor/onboarding` (mock nav). `ponytail:` note that Execução keys the redirect on `role = corretor` + missing profile.

## 3. Onboarding profile (`/corretor/onboarding`)

- [x] 3.1 Single-step form: nome, WhatsApp (mandatory, masked), CPF (mandatory, masked + check-digit via `useVisitBooking`), CRECI (optional), terms acceptance.
- [x] 3.2 Validation states: WhatsApp/CPF missing or terms unchecked → visible error, blocks submit; CRECI blank allowed.
- [x] 3.3 Successful submit → `/corretor/onboarding/status?estado=pending` (simulated `pending_approval`).

## 4. Status (`/corretor/onboarding/status`)

- [x] 4.1 Variant via `?estado=` (`pending` / `rejected` / `approved`), `ponytail:` that the real screen derives it from `corretor.status` server-side.
- [x] 4.2 Pending — "em análise" state; not the dashboard.
- [x] 4.3 Rejected — terminal "não aprovado" + WhatsApp contact button; no resubmit action (D2).
- [x] 4.4 Approved — brief confirmation that routes to `/corretor/dashboard`.

## 5. Contract (`/corretor/casas/[id]/contrato`)

- [x] 5.1 Variant via `?estado=` (`pending` / `approved` / `inacessivel`), `ponytail:` derived from `corretor_casa.status` + ownership server-side.
- [x] 5.2 Pending — unsigned minuta from the contract template with house-specific terms; clear note that signing is off-platform and staff uploads the signed PDF (no in-app signature).
- [x] 5.3 Approved — signed contract viewable (view/download the stored PDF).
- [x] 5.4 Inaccessible — generic not-available state; reveals nothing about another corretor's claim. `ponytail:` real enforcement is RLS + middleware (D-055), Execução.
- [x] 5.5 Note in-page/comment that the claim trigger lives on `/corretor/casas` (#203), not here.

## 6. Branch inventory (the contract)

Every branch gets a designed state. Checked here, not assumed.

- [x] 6.1 Login — identify / password / create (aligned)
- [x] 6.2 Onboarding — profile form (valid)
- [x] 6.3 Onboarding — validation (CPF missing / WhatsApp missing / terms unchecked)
- [x] 6.4 Status — pending (em análise)
- [x] 6.5 Status — rejected (terminal + WhatsApp)
- [x] 6.6 Status — approved → dashboard
- [x] 6.7 Contract — pending (minuta + off-platform note)
- [x] 6.8 Contract — approved (signed, viewable)
- [x] 6.9 Contract — inaccessible (not found / not theirs)

## 7. Design-system alignment

- [x] 7.1 Button hierarchy per `AGENTS.md` §9; no raw `btn btn-primary`.
- [x] 7.2 Card/surface, spacing, typography from the 81.25% scale — no arbitrary color utilities, no off-scale type.
- [x] 7.3 Mobile pass: forms and CTAs at 375px, no overflow; primary actions full-width on mobile per #198–#200 parity.

## 8. Copy (pt-BR)

- [x] 8.1 Onboarding form labels + validation messages.
- [x] 8.2 Status copy — pending / rejected / approved.
- [x] 8.3 Contract copy — minuta note (off-platform signing, staff uploads), approved, inaccessible.
- [x] 8.4 Strict pt-BR, no pt-PT forms (AGENTS.md primary rule).

## 9. Tokenization (Pass 6)

- [x] 9.1 Audit the new/edited files (`login.vue`, `corretor/onboarding/index.vue`, `corretor/onboarding/status.vue`, `corretor/casas/[id]/contrato.vue`) — `set -f`, quoted bracket paths, per-file existence check, **no** `2>/dev/null`.
- [x] 9.2 Append findings to `openspec/specs/design-tokens/tokenization-report.md` as Pass 6.

## 10. Docs

- [x] 10.1 `screen-map.md`: mark `/login`, `/corretor/onboarding/*`, `/corretor/casas/[id]/contrato` designed (#201).
- [x] 10.2 No new D-number — the two walkthrough decisions stay within D-062/D-068. If a missing screen surfaces, follow the `design-system-fluxo.md` playbook (finish this leaf, separate issue, `screen-map.md`, register any reopened decision).

## 11. Verification

- [x] 11.1 `npm run build` clean.
- [x] 11.2 Every `?estado=` variant renders and is reachable; provide the user all state URLs on their own `localhost:3000`.
- [x] 11.3 `openspec validate design-onboarding-corretor --strict` passes.
