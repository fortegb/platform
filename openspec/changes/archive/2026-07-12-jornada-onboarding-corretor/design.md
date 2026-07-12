## Context

`pages/login.vue` already has a working identifier-first auth UI (email/
social, mocked), but its signup path is an unfinished stub and its login
path checks a `realtors` table that predates D-055's unified `role` enum.
No code exists for terms acceptance, profile collection, staff approval,
or anything from draft §4.2 (per-house association) — the latter also had
no owning Passo 5 leaf until this session's exploration folded it in.

## Goals / Non-Goals

**Goals:**
- Specify account-level onboarding against D-055's role model, including
  the approval-pending state role alone can't represent.
- Fill the per-house association gap (§4.2) with a design consistent with
  the already-decided "Gov.br manual-first" stance — reference visibility
  and staff-controlled document upload, no e-signature integration.
- Resolve where broker attribution's dependency on house-level approval
  gets enforced (a real, previously-unaddressed gap in `crm-source-of-truth`).

**Non-Goals:**
- Gov.br automation — already decided as out of scope for v1, not
  reopened here.
- Corretor dashboard/pipeline content (#191) or client registration
  mechanics (#190) — this leaf only gates whether a corretor *can* act,
  not what the pipeline looks like once they can.
- Push notifications for this leaf's queues — considered and dropped (see
  Decisions).

## Decisions

**`corretor.status` is additive to the corretor's profile, not a
modification to `rbac-role-model`.** D-055's `role` enum and its hierarchy
rules are untouched — `role = corretor` still means exactly what D-055
says. The approval-pending state lives on a separate field on the
corretor's own record, the same shape as `Cliente`'s Contato→Cliente
promotion and `visit`'s status progression — an established pattern, not
a new one. Middleware gates on this field, not on row existence in a
`realtors` table (the pre-D-055 stub's approach).

**No push notification for either queue in this leaf.** Initially modeled
on #192's Telegram alert, but explicitly reconsidered and dropped:
#192's urgency came from a visitor potentially waiting physically for
resolution. Nothing in corretor onboarding or house-claims has that
time pressure — staff checks `/staff/corretores` as part of normal
operation. This isn't a lesser version of #192's pattern; it's a
correctly-scoped absence of it, decided by re-examining what actually
justified the pattern there.

**Per-house signing stays fully outside the platform; only the *result*
(a signed PDF) and a *pre-signing reference* (the minuta) are in-app.**
The minuta (unsigned contract, house-specific terms rendered from the
existing `corretor-contract-template.md`) appears immediately on both the
corretor's claim page and staff's review item — so both sides know what
they're agreeing to before any signing happens. The actual signing
exchange (however staff and the corretor coordinate it) is explicitly not
modeled or tracked by the platform, consistent with the existing
"Gov.br manual-first" MVP-boundary decision — this leaf doesn't reopen
that, it just defines the journey around it.

**Staff uploads the signed PDF, not the corretor — and upload is the
approval act.** Considered corretor self-upload first (simpler data flow)
but rejected as less safe: staff should control what becomes the official
record rather than trusting a corretor-supplied file unverified. Once
staff has physically reviewed the signed document and uploads it, that
upload transitions `corretor_casa.status` to `approved` directly — no
separate confirmation click. This collapses what could have been two
staff actions (upload, then approve) into one, since if staff is uploading
the final signed document at all, they've already made the approval
decision. Rejection remains a distinct, upload-free action for cases where
no document is ever produced (corretor backs out, staff declines).

**Storage reuses the existing private bucket (D-016/D-030), not new
infrastructure.** The identity-verification flow already established a
private, RLS-protected document bucket for sensitive files (RG/CNH,
D-053). A signed corretor contract is the same shape of problem — a
sensitive document tied to one person, needing controlled read access
(corretor + staff, not public) — so it reuses that bucket rather than
standing up separate storage.

**Broker attribution requires an approved `corretor_casa` — modifies
`crm-source-of-truth`.** The existing "Per-house registration and audit"
requirement lets any `registro` carry a `corretor_id` with no stated
precondition. This leaf adds one: a `registro.corretor_id` is only valid
if an `approved` `corretor_casa` exists for that corretor×casa pair.
Without this, the entire onboarding/approval mechanism this leaf builds
would be cosmetic — a corretor could register clients for houses they
were never approved for, regardless of what `/staff/corretores` shows.
This is logged as a reopening of `crm-source-of-truth` (same treatment
#187 gave `visit-identity-verification`), not folded in silently, because
it changes an existing requirement's behavior rather than only adding new,
independent ground.

## Risks / Trade-offs

- **[Risk]** No push notification means a pending application or house
  claim could sit unreviewed if staff doesn't think to check the page.
  → **Mitigation:** accepted for the reasons in the notification decision
  above; if this becomes a real operational gap, it's addressed by #193
  (staff daily-ops cadence) or a future decision to add notification, not
  something to build speculatively here.
- **[Risk]** Staff-only upload adds a small amount of friction (staff must
  handle the file, not the corretor) compared to self-upload.
  → **Mitigation:** accepted deliberately — the safety benefit (staff
  controls the official record) outweighs the minor convenience loss, and
  volume is low enough that this isn't a meaningful bottleneck.
- **[Risk]** Reopening `crm-source-of-truth` for the attribution
  constraint touches a foundational, oft-referenced capability.
  → **Mitigation:** the change is additive and narrow (one precondition on
  one field), doesn't alter the two-tier Contato/Cliente model, dedup
  rules, or any other existing requirement in that capability.

## Open Questions

None — all questions raised during exploration (notification urgency,
who uploads the contract, minuta visibility, upload-as-approval) were
resolved in this leaf's discussion.
