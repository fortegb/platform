## Why

This is leaf [#201](https://github.com/fortegb/platform/issues/201) — Design e tokenização: Onboarding do corretor — the fifth of the 11 journey-level design leaves in Passo 6, and the **first of the Corretor persona section** (the design work shifts from visitor/client screens to the logged-in realtor portal). It corresponds to journey [#189](https://github.com/fortegb/platform/issues/189)/D-062 (corretor onboarding), reopened by [#196](https://github.com/fortegb/platform/issues/196)/D-068 (corretor CPF made mandatory). Routes in scope: `/login` (shared with the auth epic #48), `/corretor/onboarding/*`, `/corretor/casas/[id]/contrato`.

D-062 + D-068 are a thoroughly-specced journey — `journey-corretor-onboarding` already carries 10 behavioural requirements (profile fields, `pending_approval`/`approved`/`rejected` model, approval gating, staff review, no push, WhatsApp on reject, minuta-before-signing, off-platform signing, staff-upload-as-approval, signed-contract visibility). What none of them do is describe the **corretor-side screens**. That is this leaf's job under scope rule 3.

`/login` already exists as an identifier-first mock (`pages/login.vue`), and `pages/corretor/*` has dashboard/casas/leads — but `/corretor/onboarding/*` and `/corretor/casas/[id]/contrato` do **not** exist. So this leaf is a design-system **align** pass on `/login` plus **greenfield** onboarding and contract screens.

## Scope rules (Passo 6, agreed 2026-07-20)

The three scope rules in `design-system-fluxo.md` apply unchanged:

1. **Every screen is designed in Passo 6** — including `/login`, which is `simulado` and still on raw DaisyUI defaults.
2. **Screens are not shared across journeys.** This leaf designs the **corretor's own** side of onboarding. The **staff** review page (`/staff/corretores`) is a separate leaf, [#204](https://github.com/fortegb/platform/issues/204) (D-062, staff side). The **house-claim trigger** button lives on `/corretor/casas`, which belongs to [#203](https://github.com/fortegb/platform/issues/203) — this leaf designs the contract page the claim lands on, not the trigger.
3. **Every branch is designed, happy and sad.** The full inventory lives in `tasks.md §6`.

D-062/D-068 §DoD assign the **real implementation** — Supabase auth + signup, the `corretor.status` gating, the `corretor_casa` claim transaction, the staff contract upload, the WhatsApp rejection message — to Execução ([#86](https://github.com/fortegb/platform/issues/86), [#50](https://github.com/fortegb/platform/issues/50)). This leaf does **not** do that work and does not add any `server/api/**` route. The screens stay simulated (variant via `?estado=`, mirroring #198–#200) until Execução.

## Walkthrough decisions

Two structural forks were settled with the user before design:

- **The corretor profile is collected on a separate onboarding page, not inside the login card.** `/login` creates only the account (email + password) and stays generic — it is shared with #48 and other roles have no CRECI/CPF fields. Immediately after account creation, the corretor is routed to `/corretor/onboarding` to submit their profile (WhatsApp mandatory, CPF mandatory, CRECI optional, terms) and become `pending_approval`. This matches the `/corretor/onboarding/*` route the issue names and keeps role-specific fields out of the shared login screen.
- **Rejection is terminal, with a WhatsApp contact — no self-service resubmit.** A rejected corretor logs in, sees a "não aprovado" status with a WhatsApp button to reach the ForteGB team, and cannot edit-and-resubmit on their own. This stays entirely within D-062 (rejection already notifies via WhatsApp; approval is a manual staff act) and introduces **no** new `corretor.status` transition. A self-service resubmit would be a new decision, deliberately not taken here; if wanted later, it is its own development.

## What Changes

**Screens — the corretor-side inventory** (happy and sad):

| Screen | Route | Exists today | Basis |
|---|---|---|---|
| Login — identify (social + email) | `/login` | ✅ (raw DaisyUI) | Identifier-first; design-system align |
| Login — password (existing account) | `/login` | ✅ | align |
| Login — create account (new) | `/login` | ✅ (stub signup) | align; routes to onboarding after account creation |
| **Onboarding — profile form** | `/corretor/onboarding` | ❌ | WhatsApp* + CPF* + CRECI(opt) + terms → `pending_approval` |
| **Profile validation** (CPF/WhatsApp missing, terms unchecked) | `/corretor/onboarding` | ❌ | D-068 CPF mandatory; D-062 WhatsApp mandatory |
| **Status — pending (em análise)** | `/corretor/onboarding/status` | ❌ | Gating: pending sees status, not dashboard |
| **Status — rejected (terminal + WhatsApp)** | `/corretor/onboarding/status` | ❌ | Rejection notifies WhatsApp; no resubmit |
| **Status — approved → dashboard** | `/corretor/onboarding/status` | ❌ | Approved reaches the normal dashboard |
| **Contract — pending (minuta visible)** | `/corretor/casas/[id]/contrato` | ❌ | Unsigned draft on claim; signing off-platform; staff uploads signed |
| **Contract — approved (signed, viewable)** | `/corretor/casas/[id]/contrato` | ❌ | Signed contract viewable by both parties |
| **Contract — not found / not the corretor's** | `/corretor/casas/[id]/contrato` | ❌ | Access-control sad path |

- **`/login` align**: raw `card shadow-xl`, `btn btn-primary`, `alert alert-error`, `input input-bordered` → the button hierarchy (`AGENTS.md` §9), surface/typography, and error treatment settled in #197–#200. Keep the 3-step identifier-first flow; keep it generic (no corretor fields). After account creation, route to `/corretor/onboarding`.
- **Onboarding profile**: single-step form — nome, WhatsApp (mandatory, masked), CPF (mandatory, masked + check-digit like #198/#190), CRECI (optional), terms acceptance — submits to `pending_approval`. Reuse the masks/CPF validation from `useVisitBooking`.
- **Status page**: the gate D-062 describes — a pending or rejected corretor sees this instead of the dashboard; approved passes through. Rejected shows a WhatsApp contact, terminal.
- **Contract page**: pending shows the unsigned minuta (rendered from the existing contract template with house-specific terms) with a clear note that signing happens off-platform and staff uploads the signed PDF; approved shows the signed contract viewable. The claim itself is triggered from #203.
- **Tokenization** (Pass 6): audit the new/edited files — `set -f`, quoted bracket paths, per-file existence check, **no** `2>/dev/null`. Record in `tokenization-report.md`.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `journey-corretor-onboarding`: append the corretor-side **screen-state** requirements (login handoff to onboarding, the profile form's mandatory-field states, the status page's pending/rejected/approved variants, the contract page's pending/approved/inaccessible states), and write the capability's `Purpose` (currently the `TBD` placeholder left by the archive of `jornada-onboarding-corretor`).

## Impact

- **New pages**: `pages/corretor/onboarding/index.vue`, `pages/corretor/onboarding/status.vue`, `pages/corretor/casas/[id]/contrato.vue` (all simulated, `?estado=` driven).
- **Edited page**: `pages/login.vue` — design-system align + route to `/corretor/onboarding` after account creation (mock).
- **Reused**: `useVisitBooking` masks + CPF check, `WhatsAppIcon`/`useWhatsApp`, the status-tone pattern.
- **No backend**: no `server/api/**` changes; real auth/gating/claim/upload/WhatsApp stay Execução (#86/#50).
- **Docs**: `screen-map.md` (routes designed), `tokenization-report.md` (Pass 6). No new D-number — the two walkthrough decisions stay within D-062/D-068.
- **Spec**: `journey-corretor-onboarding` delta (added screen-state requirements + Purpose).
