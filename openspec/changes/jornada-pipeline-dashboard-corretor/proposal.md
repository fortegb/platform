## Why

The corretor dashboard/pipeline (draft §4.4) predates D-020 and #189/#190.
The existing stub queries a standalone `leads`/`realtors` schema and
carries a 7-stage pipeline enum (`new → contacted → visit_scheduled →
visit_completed → negotiating → closed_won → closed_lost`) that was never
formally decided — D-020 only names `registro.status` generically.
Re-validating it surfaces a real design gap: two of those stages
(`visit_scheduled`, `visit_completed`) duplicate state that already lives
authoritatively on the `visit` entity (D-053), risking exactly the kind of
drift #188 and #190 both had to fix elsewhere this session.

## What Changes

- **Corrected data source:** dashboard and pipeline list query
  `registro`/`cliente` (D-020) filtered by `registro.corretor_id` =
  the authenticated corretor, using the role/status auth model (#189)
  instead of the `leads`/`realtors` stub tables.
- **`registro.status` defined as a smaller, deal-focused enum:**
  `registrado → negociando → fechado_ganho | fechado_perdido` — not the
  stub's 7-stage list. Visit-related progress (scheduled, completed) is
  read by joining the linked `visit` record(s), never duplicated as a
  separate status on `registro` — a single source of truth for visit
  state, consistent with D-053 already owning it.
- **`contacted` becomes a `historico` entry, not a pipeline stage** — a
  touchpoint note, not formal deal progression, consistent with D-020's
  existing append-only `historico` for commission-relevant events.
- **HubSpot may show a richer pipeline visually** (the original stage list
  or similar) without the platform needing to store that granularity
  internally — `crm-source-of-truth` already establishes Supabase as
  authoritative for commission-relevant status and HubSpot as a
  downstream mirror; this leaf doesn't change that relationship, just
  avoids over-modeling the Supabase side to match a marketing tool's
  display needs.
- **Access is scoped per-corretor:** each corretor sees only their own
  `registro` records (RLS + app-level filter, D-055's two-layer model),
  correcting the stub's `realtor_id` filtering to the actual attribution
  field.

## Capabilities

### New Capabilities
- `journey-corretor-pipeline`: defines the corretor's dashboard and
  pipeline list — the `registro.status` enum, visit-progress derivation
  via join (not duplication), `historico`-based touchpoint notes, and
  per-corretor access scoping — consuming `crm-source-of-truth` and
  `visit-identity-verification` without modifying either.

### Modified Capabilities
(none — `registro.status` was never enumerated by any closed decision, so
defining it here is filling in previously-open detail, not changing an
existing requirement's behavior; the "carrying status" language in
`crm-source-of-truth`'s existing requirement is unaffected)

## Impact

- Frontend: `pages/corretor/dashboard.vue` and `pages/corretor/leads/
  index.vue` rewritten against the corrected model and enum; visit-status
  display reads from joined `visit` records.
- Backend: `server/api/corretor/dashboard.get.ts` and `leads.get.ts`
  rewritten to query `registro`/`cliente` scoped by `corretor_id`, with
  corrected auth.
- Depends on D-020, D-053, and #189's role/status model already existing
  — implementation is Execução (#86, #90).
- **Explicitly out of scope:** HubSpot's own pipeline stage configuration
  (a vendor-side display concern, not this leaf's data model); staff-side
  views of corretor pipelines (#193 territory, if any).
