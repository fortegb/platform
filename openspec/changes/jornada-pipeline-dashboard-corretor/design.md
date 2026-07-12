## Context

`pages/corretor/dashboard.vue`, `pages/corretor/leads/index.vue`, and
their backing endpoints predate D-020. They query a standalone
`leads`/`realtors` schema and carry a 7-stage pipeline enum that was never
part of any closed decision — it traces to the original pre-architecture
CRM notes, not D-020's actual `registro` model, which only names `status`
generically.

## Goals / Non-Goals

**Goals:**
- Correct the dashboard/pipeline to query the actual `registro`/`cliente`
  model, scoped per-corretor.
- Define `registro.status`'s concrete enum for the first time, avoiding
  the visit-state duplication the stub's enum introduced.

**Non-Goals:**
- HubSpot's own pipeline configuration — a vendor-side display concern.
- Redesigning `visit.status` or `crm-source-of-truth`'s core model —
  already decided, only consumed here.
- Staff-side pipeline visibility — separate concern if #193 needs it.

## Decisions

**`registro.status` is deal-focused, not visit-focused.** The stub's
enum conflated two different lifecycles: the visit itself (already fully
owned by D-053's `visit.status` progression) and the commercial
deal/negotiation (what `registro` actually exists to track for commission
purposes). Collapsing them into one field means every visit-state change
(reschedule, cancel, multiple visits) would need to be manually mirrored
onto `registro.status` — the same dual-bookkeeping risk #188 avoided by
keeping `cancelled` on `visit`, and #190 avoided by not tracking a second
copy of dedup state. The corrected enum — `registrado → negociando →
fechado_ganho | fechado_perdido` — tracks only what `registro` is
actually for. Whether a client has visited is answered by looking at
their `visit` record(s) directly (joined by `cliente_id`/`casa_id`), not
by a status value that could silently go stale.

**`contacted` moves to `historico`, not a status value.** A "corretor
reached out" touchpoint isn't a deal-stage transition — it's an event
worth logging, which is exactly what D-020's append-only `historico`
already exists for. Treating it as a formal pipeline stage would also
create ambiguity: is a client "contacted" once, or does every follow-up
call reset the stage? A `historico` entry sidesteps that question
entirely — each contact is its own logged event, no state machine needed.

**HubSpot can be richer than Supabase without contradiction.** D-020
already established Supabase as the commission-authoritative source and
HubSpot as a downstream mirror. Nothing here prevents HubSpot's own
pipeline view from showing more stages (visit scheduled, contacted, etc.)
for the corretor's day-to-day sales workflow — that's a vendor-side
display choice, decoupled from what Supabase needs to store as ground
truth. This leaf doesn't touch HubSpot's configuration.

**Per-corretor scoping corrects the stub's attribution field.** The stub
filtered by `realtor_id` against the old `realtors`/`leads` schema; the
correction filters by `registro.corretor_id` against the real model, with
RLS as the actual security boundary (D-055's two-layer model) — the
dashboard query itself is a convenience, not the enforcement point.

## Risks / Trade-offs

- **[Risk]** Deriving visit status via a join is a small query-complexity
  increase versus reading a single denormalized field.
  → **Mitigation:** accepted — the alternative (a duplicated, driftable
  field) is a correctness risk this session has repeatedly had to fix
  elsewhere; a join is the right cost for a single source of truth.
- **[Risk]** A corretor accustomed to the fuller 7-stage list (if any
  mockups/demos used it) might find the simplified enum less descriptive
  at a glance.
  → **Mitigation:** the dashboard UI can still *display* visit-derived
  context (e.g. "visita agendada para 15/07") alongside the simpler
  `registro.status` badge — the simplification is in the stored model,
  not necessarily the UI's descriptive richness.

## Open Questions

None — the enum-simplification question was confirmed during exploration.
