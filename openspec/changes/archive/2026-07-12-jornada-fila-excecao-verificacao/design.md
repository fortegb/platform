## Context

D-053 fully specifies the `staff-review` mechanism (automatic queueing on
low `client-match` confidence, the `verification_attempt` record, the hard
gate before `provisionAccess`) and both visit journeys (#186, #187) already
consume it — but no UI exists to actually resolve a queued exception. This
leaf is purely additive: it builds the missing consumer, it doesn't touch
the producer side (the two visit journeys) or the underlying data model.

## Goals / Non-Goals

**Goals:**
- Specify the staff-facing queue and review screen's contract: what staff
  sees, what actions are available, and what each action does to the
  underlying `verification_attempt`/`visit` records.
- Resolve the one gap D-053 left open: what happens to the visitor on a
  reject (previously unspecified).
- Decide queue ordering given the two flows have different urgency
  profiles.

**Non-Goals:**
- Redesigning the verification mechanism, the data model, or the
  `provisionAccess` adapter — all already decided (D-052/D-053).
- The staff daily-ops overview (#193) or Tuya emergency-code management
  (#194) — separate screens, separate leaves.
- Choosing the exact RLS policy syntax or the profiles/roles table schema
  — RBAC's mechanism (D-055) is already decided; the concrete Supabase
  schema is Execução (#50), same deferral pattern as every prior leaf.

## Decisions

**Queue is flow-type-aware, not strict FIFO.** Instant/QR pending items are
shown ahead of scheduled ones regardless of creation order, because only
the instant flow can have a person physically waiting at the property when
an exception is created — a scheduled visit's exception has days of slack
before it matters. This is a display/ordering decision only; both flow
types still share the same underlying queue and the same
`verification_attempt` shape (D-053, unmodified).

**Reject notifies the visitor; D-053's silence on this wasn't intentional
policy, just an unaddressed gap.** D-053 only specified the approve path in
detail. Leaving a declined visitor with zero signal — no message, no
visible status change — is a worse outcome than sending one, and doing so
costs nothing new: it's the same QStash-routed WhatsApp mechanism (D-054)
every other message in this project already uses. On reject: `visit.status`
moves to `declined`, and a message is queued explaining the outcome (and,
implicitly, that the visitor can retry — booking a new visit re-enters
normal verification, nothing about a rejection is treated as a permanent
block).

**Approval reuses the existing `provisionAccess` path exactly.** No new
access-granting code — the same adapter call (D-052) and the same
single-call, gated-on-`verified`-status pattern #186/#187 already
established runs regardless of whether `verified` was reached
automatically or via staff approval. This is already implied by D-053's
"only after that record exists does the system call the access-provisioning
adapter" — this leaf doesn't add anything new here, just confirms the
staff-approval path is the same call site, not a duplicate one.

**Selfie availability during the pending window is already guaranteed by
D-053's existing retention rule** — the selfie is only deleted "immediately
upon approval," so a still-pending attempt necessarily still has its selfie
available for staff to review. No new retention exception needed for this
screen to function.

**RBAC: new `/staff/*` middleware, mirroring the existing `corretor`
pattern.** `middleware/realtor-auth.ts` checks a `realtors` table row for
the corretor case; this leaf's `/staff/*` middleware follows the same
shape (auth check + role lookup) but against whatever `staff`/`admin` role
storage Execução builds per D-055 — not a new RBAC concept, just the first
consumer of the `staff` role check where the mechanism was previously only
decided abstractly.

**New pending item triggers a Telegram alert, resolving a latent
inconsistency rather than creating a new rule.** D-052's text says "alerta
a staff via WhatsApp" for the Tuya-provisioning-failure case, written
before D-054 existed. D-054 later established a clean direction-based
split — WhatsApp for any message involving an external party, Telegram for
purely internal staff/system notifications — and explicitly named
reconciling D-052/D-053's informal WhatsApp usage as its purpose. A "new
exception needs review" ping has no external party as sender or recipient,
so it falls on Telegram under D-054's already-settled rule; this leaf just
applies that rule to its first concrete case; it doesn't reopen D-054 or
change its requirements. The alert is a "go look" ping (message + link into
the queue), not an inline approve/reject action inside the chat — building
a reply-to-approve bot flow is a materially different, currently-undecided
mechanism and out of scope here. One notification per new pending item, no
batching — proportional to a visit volume measured in a handful a year, not
built for scale this business doesn't have.

## Risks / Trade-offs

- **[Risk]** Flow-type prioritization means a scheduled-visit exception
  could sit unreviewed longer if instant items keep arriving, even though
  the scheduled visit's date eventually arrives too.
  → **Mitigation:** accepted — scheduled visits still have the multi-day
  slack the async design (#186) was built around; if this becomes a real
  problem, it's an operational-cadence question for #193 (staff daily ops),
  not a reason to change this queue's ordering.
- **[Risk]** No SLA or reminder mechanism if a queue item sits unresolved
  entirely.
  → **Mitigation:** out of scope for this leaf, same reasoning already
  applied in #186's design — a review-SLA is a #193 (daily-ops) concern if
  it becomes a real operational gap, not something to invent speculatively
  here.

## Open Questions

None — the two decisions this leaf needed to make (reject notification,
queue ordering) were confirmed during exploration.
