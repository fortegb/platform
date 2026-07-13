## Why

The staff daily-operations screen (draft §5.1: today's visits, recent
clients, manual lead entry) is fully greenfield — no code exists yet,
same as #192 was before this session. This leaf defines it by consuming
the models and RBAC already decided (D-020, D-053, D-055, #189/#191),
closing the last un-scoped item in the original staff task list.

## What Changes

- **New:** a `/staff/*` screen showing today's `visit` records across all
  houses and corretores (staff has business-wide visibility, unlike the
  corretor's own `corretor_id`-scoped pipeline view, #191), and recently
  registered `cliente`/`registro` records from all sources (direct #185,
  broker #190).
- **New:** manual lead entry for a walk-in or phone-call contact — creates
  a **Contato-tier** record (WhatsApp only, CPF optional), not the
  Cliente-tier #190 requires for broker registration — there's no
  commission-attribution stake in a direct staff entry, so the strong
  CPF-dedup argument that applies to broker registration doesn't apply
  here. Tagged `fonte: staff-manual`, consistent with the existing
  kebab-case source values (`cta-whatsapp`, `form-site`,
  `portal-corretor`). Dedup follows D-020's existing WhatsApp-match
  reconciliation (already decided, not new) — entering a number that
  matches an existing Contato/Cliente reuses that record.
- **New:** a "pending work" summary linking to the two queues that
  already exist — #189's corretor/house-claim approvals and #192's
  verification exceptions — surfacing counts, not rebuilding either
  screen, so staff has one starting point instead of three separate URLs
  to remember.
- RBAC consumes the already-decided model: `role IN (staff, admin)`,
  two-layer enforcement (D-055) — no new role or permission concept.

## Capabilities

### New Capabilities
- `journey-staff-daily-operations`: defines the staff daily-ops screen —
  today's visits (business-wide), recent clients, Contato-tier manual
  lead entry, and the pending-work summary — consuming
  `visit-identity-verification`, `crm-source-of-truth`, and
  `rbac-role-model` without modifying any of them.

### Modified Capabilities
(none — `fonte: staff-manual` is a concrete value for a source already
named generically in `crm-source-of-truth`'s existing "Lead source
capture" requirement, same pattern as #190's `portal-corretor`)

## Impact

- Frontend: new `/staff` (or `/staff/dashboard`) landing page, `/staff/
  visitas` (today's visits), `/staff/clientes/novo` (manual entry) — all
  already reserved routes in `screen-map.md`.
- Backend: endpoints reading `visit` and `cliente`/`registro` broadly
  (not corretor-scoped), a manual-entry endpoint reusing D-020's
  reconciliation logic.
- Depends on D-020, D-053, D-055, and #189/#191/#192's already-built
  pieces — implementation is Execução (#86, #90, #81).
