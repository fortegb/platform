## Context

No code exists for the staff daily-ops screen — same greenfield situation
#192 was in before this session. Draft §5.1 named three sub-elements
(today's visits, recent clients, manual lead entry) without ever
formalizing them against the closed architecture. This leaf is purely a
consumer: nothing here reopens or modifies a prior decision.

## Goals / Non-Goals

**Goals:**
- Define the staff-wide (not per-corretor) visibility scope for today's
  visits and recent clients.
- Specify manual lead entry at the correct tier (Contato, not Cliente)
  and its dedup behavior.
- Give staff one landing point that surfaces pending work from the two
  already-built approval queues, without duplicating them.

**Non-Goals:**
- Rebuilding the corretor/house-claim approval screen (#189) or the
  verification-exception queue (#192) — this leaf only links to them.
- Redesigning the `cliente`/`registro`/`visit` models — already decided,
  only consumed here.
- Any change to CPF requirements — #190's CPF-required rule is specific
  to broker-attributed registration; it doesn't extend here because the
  underlying reason (commission dedup) doesn't apply to a direct entry.

## Decisions

**Staff sees all visits and clients, not scoped to a single corretor.**
#191 scoped the corretor's own pipeline to `registro.corretor_id` because
a corretor should only see their own attributed clients. Staff's role is
operational oversight across the whole business — D-055's RBAC hierarchy
already treats `staff`/`admin` as broader-access roles than `corretor`;
this leaf's query scope is a direct consequence of that, not a new
access decision.

**Manual entry is Contato-tier, matching #185's model, not #190's.** The
CPF requirement in #190 exists specifically to protect commission
attribution when a corretor is involved — a strong dedup key matters
because money is riding on "who registered first." A staff member
entering a walk-in or phone-call contact has no corretor attribution at
stake (`corretor_id` is null, a "direct" registration per D-020's
existing model); requiring CPF upfront here would add friction for no
corresponding protection benefit. WhatsApp-only capture, same tier as
#185's site-visitor case, is proportional.

**Dedup reuses D-020's existing reconciliation, not a new mechanism.**
If staff enters a phone number matching an existing Contato or Cliente,
that existing record is reused (matched by WhatsApp, per D-020's already-
specified promotion/reconciliation rule) rather than a duplicate being
created. This isn't new design — it's the same rule #185 and #190 already
rely on, just exercised from a third entry point.

**Pending-work summary links out, it doesn't re-implement.** The daily-
ops screen shows counts (e.g. "2 corretores aguardando aprovação, 1
exceção de verificação pendente") with links into #189's and #192's
existing screens. This keeps those two capabilities as the single owners
of their own approve/reject logic — this leaf only surfaces that
something is waiting, consistent with not duplicating state or logic
across leaves (the same principle behind deriving visit progress via
join in #191 rather than storing a second copy).

## Risks / Trade-offs

- **[Risk]** Contato-tier manual entry means a staff-entered lead has
  weaker dedup (WhatsApp, not CPF) than a broker-registered one.
  → **Mitigation:** accepted — this mirrors #185's already-accepted trust
  level for the same reason (no commission stake to protect); if the
  contact later becomes a real prospect, normal promotion to Cliente
  (with CPF) happens the same way D-020 already describes.

## Open Questions

None — confirmed during exploration; no design point required a new
judgment call beyond correctly applying decisions already made.
