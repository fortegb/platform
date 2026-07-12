## Why

The corretor client-registration journey (draft §4.3) predates D-020
(`crm-source-of-truth`) and #189's `corretor_casa` approval gate. The
existing stub (`pages/corretor/leads/novo.vue`,
`server/api/corretor/leads.post.ts`) doesn't just lag the architecture —
it has a real correctness bug: the "first-registration-wins" commission
protection this journey exists to provide doesn't actually work, because
the endpoint checks for a duplicate and inserts as two separate steps
(check-then-act), not a single transactional guarantee.

## What Changes

- **Corrected data model:** registration writes to the `cliente`/`registro`
  model (D-020), not a standalone `leads` table — CPF-keyed dedup,
  `registro` per cliente×casa, append-only `historico`, `fonte` stamped
  (`portal-corretor`).
- **CPF is required for broker-initiated registration**, promoting the
  client straight to `Cliente` tier — not the `Contato`-tier, phone-only
  capture #185 uses for casual site visitors. A broker's registration
  exists specifically to establish a qualified, identified, dedupable
  lead; CPF is D-020's stated dedup authority, and commission protection
  depends on it.
- **Fixes the race condition:** the first-wins guarantee is enforced by a
  database-level transactional uniqueness constraint (per D-020's already-
  specified mechanism), not an application-level check-then-insert. The
  second concurrent submission is rejected by the constraint itself, not
  by a racy prior SELECT.
- **Consumes #189's `corretor_casa` gate:** registration is only permitted
  when the corretor has an `approved` `corretor_casa` for the target
  house — the constraint #189 added to `crm-source-of-truth` exists
  specifically so this endpoint enforces it.
- **Auth check corrected:** consumes `role = corretor` + `status =
  approved` (the model #189 established), not the pre-D-055 `realtors`
  table check this stub still uses.
- **Re-registration by the same corretor is idempotent, not an error:**
  resubmitting shows the existing registration's status rather than
  blocking with an error page — a small UX correction, not architecture.
- **Explicitly out of scope:** direct/site-originated leads (#185's
  Contato-tier capture, already closed); commission reassignment
  ("reatribuição só com aprovação staff/admin" per the draft) — a staff/
  admin action with no owning leaf yet, not built here.

## Capabilities

### New Capabilities
- `journey-corretor-client-registration`: defines the broker-initiated
  client registration journey — CPF-required intake, the transactional
  dedup guarantee, `corretor_casa` gating, and `fonte` capture — consuming
  `crm-source-of-truth` and `journey-corretor-onboarding`'s `corretor_casa`
  model without modifying either.

### Modified Capabilities
(none — this leaf is purely a consumer of already-correct architecture,
fixing a stub implementation that never caught up to it)

## Impact

- Frontend: `pages/corretor/leads/novo.vue` gains a required CPF field;
  success/duplicate states reflect the corrected model.
- Backend: `server/api/corretor/leads.post.ts` rewritten against
  `cliente`/`registro`, with a DB-level unique constraint replacing the
  check-then-insert pattern; auth check updated to the role/status model.
- Depends on D-020 (`crm-source-of-truth`) and #189's `corretor_casa`
  constraint already existing — implementation is Execução (#86, #90).
