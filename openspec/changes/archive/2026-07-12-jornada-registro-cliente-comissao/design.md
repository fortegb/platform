## Context

`server/api/corretor/leads.post.ts` predates D-020 and #189. It writes to
a standalone `leads` table keyed on `phone`, checks for duplicates via a
`SELECT` immediately before an `INSERT` (not atomic), and authenticates
against the pre-D-055 `realtors` table. None of this reflects the
already-decided `cliente`/`registro` model, the `corretor_casa` approval
gate #189 just added, or D-020's stated CPF-as-dedup-authority design.

## Goals / Non-Goals

**Goals:**
- Specify broker-initiated registration against the actual `crm-source-of-
  truth` model, replacing the stub's ad hoc `leads` table.
- Fix the race condition — first-wins must be an actual guarantee, not
  a best-effort check.
- Wire in the `corretor_casa` gate #189 established, so approval actually
  controls who can register clients for which house.

**Non-Goals:**
- Redesigning the `cliente`/`registro` data model — already decided
  (D-020), only consumed here.
- Commission reassignment workflow — a staff/admin action, no owning leaf.
- The corretor pipeline/dashboard view of registered clients — #191.
- HubSpot sync implementation details — Execução, same deferred stub
  pattern used throughout this epic.

## Decisions

**CPF required, promoting straight to `Cliente` tier.** D-020's two-tier
model allows a CPF-less `Contato`, but that tier exists for low-commitment
capture (a site visitor clicking a WhatsApp CTA, #185) — not for a
broker's deliberate act of registering a specific, identified lead against
a specific house for commission purposes. CPF is D-020's stated dedup
authority ("CPF = autoridade de dedup"); accepting phone-only registration
here would let the exact guarantee this journey exists to provide
(first-registration-wins) rest on a weaker key than the architecture
already chose for this purpose.

**Uniqueness is enforced by the database, not the application.** The
stub's `SELECT` then `INSERT` is a textbook race: two brokers submitting
within the same window could both pass the check. The fix is a unique
constraint on `registro(cliente_id, casa_id)` (with `cliente_id` resolved
by CPF first) — the second concurrent insert fails at the database level,
and the application translates that failure into "already registered by
[you/another broker]," rather than trying to prevent the race with
application logic. This is what D-020's "transactional uniqueness
guarantee" already specifies; this leaf just makes sure the endpoint
actually implements it instead of approximating it.

**Registration requires an `approved` `corretor_casa`.** #189 added this
constraint to `crm-source-of-truth` specifically so it would have a real
enforcement point — this endpoint is that point. A corretor without
approval for the target house cannot register a client for it, full stop;
there's no partial or provisional registration state.

**Auth consumes the role/status model, not the `realtors` table.** Same
correction #189 already made for login — this endpoint checks `role =
corretor` and `status = approved`, not row existence in the pre-D-055
`realtors` table. Two different auth checks for the same fact would be a
real inconsistency risk.

**Re-registration by the same corretor is idempotent.** The stub currently
errors ("já foi registrado por você"). Corrected: resubmitting the same
corretor×cliente×casa combination just shows the existing registration's
current status — friendlier, and avoids treating a harmless double-click
as a failure state.

**Fonte is stamped `portal-corretor`.** D-020's "Lead source capture"
requirement already names "broker portal" as a v1 source; this leaf just
assigns the concrete kebab-case value consistent with `cta-whatsapp` and
`form-site` from #185.

## Risks / Trade-offs

- **[Risk]** Requiring CPF upfront adds friction if a corretor only has a
  name and phone number in the moment (e.g., a quick conversation at an
  open house).
  → **Mitigation:** accepted — the alternative (phone-only broker
  registration) directly weakens the commission-protection guarantee this
  journey exists for; a broker capturing a serious lead can reasonably be
  expected to get a CPF as part of that conversation.
- **[Risk]** A DB-level unique constraint means the app must handle a
  constraint-violation error path gracefully (not a generic 500).
  → **Mitigation:** explicitly specified as a requirement below — the
  violation must translate to a clear "already registered" outcome, not
  an unhandled error.

## Open Questions

None — CPF-required vs. phone-only was the one open question, confirmed
during exploration.
