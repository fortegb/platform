## Why

The corretor onboarding journey (draft §4.1) and per-house association
journey (draft §4.2) both predate D-055 (RBAC) and D-056 (build-vs-buy for
operational UI), and per-house association ("associar-se a uma casa") had
no owning Passo 5 leaf at all. Existing code (`pages/login.vue`,
`middleware/realtor-auth.ts`) checks membership in a `realtors` table, not
the unified `role` enum D-055 later decided, and the signup handler is an
unfinished stub. This leaf re-validates account-level onboarding and folds
in per-house association, closing the ownership gap.

## What Changes

- **New:** account-level onboarding consumes D-055's `role` enum
  (`role = corretor`) rather than a separate `realtors` table check. A new
  `corretor.status` field (`pending_approval | approved | rejected`) — the
  same two-state pattern already used for `Cliente` and `visit` — gates
  functional portal access; role alone can't represent "signed up,
  awaiting review."
- **New:** `/staff/corretores` (already reserved in `screen-map.md`) is the
  single management surface for **both** pending account applications and
  pending house-claim requests — justified as custom UI by D-056's test
  (side-effecting approval + must be safe for non-technical staff), same
  reasoning already applied to #192's queue.
- **New:** no push notification (Telegram) for this leaf — reconsidered
  during exploration and dropped. Unlike #192's queue (a visitor may be
  physically waiting), nothing here is time-sensitive; staff finds pending
  work by checking the management page, not by being pinged.
- **New:** rejection (account or house-claim) notifies the corretor via
  WhatsApp — D-054 already names corretor explicitly as an external party
  covered by its "always WhatsApp" rule; same reject-notifies pattern
  established in #192/#188.
- **New:** per-house association (`corretor_casa`), filling the gap left
  by draft §4.2 having no owning leaf. Claiming a house shows the contract
  draft (minuta — unsigned, house-specific terms from the existing
  `corretor-contract-template.md`) immediately to both corretor and staff,
  for reference. **Signing happens entirely outside the platform** —
  consistent with the already-decided "Gov.br manual-first" MVP-boundary
  stance, so this leaf builds no e-signature integration. **Staff, not the
  corretor, uploads the final signed PDF** once they have it in hand
  (safer — staff controls the official record) — reusing the private
  document-storage pattern already built for identity documents
  (D-016/D-030), not new storage infrastructure. **Uploading the signed
  contract is the approval act itself** — one action, not upload-then-
  separately-approve. Rejection remains available without any upload.
- **Modifies `crm-source-of-truth`:** broker attribution on a `registro`
  now requires an **approved** `corretor_casa` for that specific
  cliente×casa pairing — the existing "Per-house registration and audit"
  requirement never gated attribution on house-level approval at all. This
  is a small, additive constraint, not a rewrite, but it changes an
  existing requirement's behavior, so it's logged as a reopening (same
  treatment #187 gave D-053) rather than folded in silently.

## Capabilities

### New Capabilities
- `journey-corretor-onboarding`: defines both the account-level onboarding
  flow (registration → terms → profile → staff approval → active portal)
  and the per-house association flow (claim → minuta reference → external
  signing → staff-uploaded signed contract → approval), consuming
  `rbac-role-model` and `messaging-channel-policy` without modifying
  either.

### Modified Capabilities
- `crm-source-of-truth`: "Per-house registration and audit" requirement
  gains a constraint that broker attribution requires an approved
  `corretor_casa` association — reopens this requirement, logged
  explicitly.

## Impact

- Frontend: rewritten signup step on `pages/login.vue` (or a dedicated
  onboarding flow) collecting terms acceptance + profile (CRECI optional,
  WhatsApp mandatory per D-054); new `/corretor/casas/[id]/contrato` claim
  page showing the minuta and, once uploaded, the signed PDF; new
  `/staff/corretores` management page (account applications + house
  claims, unified).
- Backend: `corretor.status` field and transitions; new `corretor_casa`
  entity; staff upload endpoint reusing the existing private bucket;
  `middleware/realtor-auth.ts` rewritten to gate on `status = approved`
  against the `role`/status model instead of `realtors` row existence.
- Depends on D-055 (role model), D-054 (WhatsApp for corretor
  notifications), D-016/D-030 (private bucket) already existing —
  implementation is Execução (#86, #50).
- **Explicitly out of scope:** Gov.br automation (deferred per the
  existing MVP-boundary decision, not reopened here); corretor pipeline/
  dashboard content (#191); client registration itself (#190).
