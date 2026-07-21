## Context

The corretor onboarding journey is fully specced by D-062 + D-068 (`journey-corretor-onboarding`, 10 requirements), but none describe the screens. This leaf designs the **corretor-side** surfaces: an align pass on the existing `/login` mock plus greenfield `/corretor/onboarding/*` and `/corretor/casas/[id]/contrato`. It stays simulated (`?estado=` driven) — no `server/api/**`, no real auth. The staff review page (`/staff/corretores`, #204) and the house-claim trigger (`/corretor/casas`, #203) are other leaves. Real implementation is Execução (#86/#50).

## Goals / Non-Goals

**Goals:**
- Design every corretor-side branch of onboarding (login → account, profile form, status pending/rejected/approved, contract pending/approved/inaccessible).
- Align `/login` to the #197–#200 design system while keeping it generic and identifier-first.
- Run tokenization Pass 6; write the capability Purpose.

**Non-Goals:**
- No backend: no Supabase auth/signup, no `corretor.status` gating logic, no `corretor_casa` claim transaction, no staff upload, no WhatsApp send — all Execução (#86/#50).
- Not designing `/staff/corretores` (#204) or the claim trigger on `/corretor/casas` (#203).
- No in-app e-signature or signing tracking (D-062 keeps signing off-platform).
- No self-service rejection resubmit (see D2).

## Decisions

### D1 — Profile on a separate onboarding page, login stays generic

**Choice:** `/login` creates only the account (email + password) and stays role-agnostic; the corretor profile (WhatsApp*, CPF*, CRECI optional, terms) is collected on `/corretor/onboarding` immediately after account creation.

**Alternatives considered:**
- *Extend the login card with a profile step* — rejected: `/login` is shared with #48 and other roles; baking CRECI/CPF into it couples a shared screen to one role's needs and bloats the identifier-first flow.
- *Collect nothing until approval* — rejected: D-062 requires the profile at registration, and D-068 makes CPF mandatory at signup precisely so an active corretor is never chased for it later.

**Consequence:** the login→onboarding handoff is a mock navigation here; Execução wires the real post-signup redirect keyed on `role = corretor` + missing profile.

### D2 — Rejection is terminal + WhatsApp, no self-service resubmit

**Choice:** a rejected corretor sees a "não aprovado" status with a WhatsApp contact button and cannot edit-and-resubmit on their own.

**Alternatives considered:**
- *Edit-and-resubmit* — rejected: would need a new `rejected → pending_approval` transition, resubmit-count rules, and a re-review flow, none of which D-062/D-068 decided. That is a new decision, not a screen design. Given the low volume and that approval is already a manual staff act, staff can re-open a case by hand.

**Why no new decision:** this stays inside D-062 (rejection already notifies via WhatsApp; no new status). If resubmit is wanted later it is its own development, following the `design-system-fluxo.md` missing-screen playbook.

### D3 — Contract page states follow the spec directly

The `/corretor/casas/[id]/contrato` states map 1:1 to the already-accepted requirements: **pending** renders the unsigned minuta from the existing template with house-specific terms, states plainly that signing happens off-platform and staff uploads the signed PDF (no in-app signature); **approved** shows the signed contract viewable by the corretor; plus an **inaccessible** sad path (claim not found, or not this corretor's — an access-control state the spec implies but does not draw). The claim *trigger* is #203; this page is where a claim lands.

## Risks / Trade-offs

- **`/login` is shared with #48** → Editing it here could collide with the auth epic. Mitigated by keeping the change to design-system tokens + the post-signup redirect target, not the auth mechanism — #48 owns the real auth, this leaf owns the look and the corretor handoff.
- **Simulated screens drift from the eventual backend** → Same risk #198–#200 carry; mitigated by naming variants after the real `corretor.status` / `corretor_casa.status` values (`pending_approval`, `approved`, `rejected`, `pending`) so the mock's contract matches Execução.
- **Access-control sad path on the contract page** is designed but not enforced (no auth here) → marked `ponytail:`, enforcement is Execução (RLS + middleware, D-055).

## Open Questions

None blocking. If designing the contract or claim surfaces reveals a screen the journey never validated (e.g. a distinct claim-confirmation step), follow the `design-system-fluxo.md` missing-screen playbook: finish this leaf, open a separate issue against the right epic (#67 for design, #86 for Execução gaps), update `screen-map.md`, and register any decision reopened.
