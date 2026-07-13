## Context

The admin task list (draft §5.2) and its routes (`screen-map.md`'s
`/admin/*` entries) were written before D-055 (RBAC), D-056 (namespace +
build-vs-buy), and D-043 (secrets policy) closed. No code exists for any
of these screens — greenfield, like #192/#193 before this session — but
unlike those, the *draft itself* contradicts closed decisions rather than
just lagging behind them, so this leaf corrects the draft, not code.

## Goals / Non-Goals

**Goals:**
- Correct the `/admin/*` routes to `/staff/*`, per D-056.
- Resolve the API-keys screen against D-043's ownership restriction.
- Decide platform flags' storage/mechanism (hide-house, maintenance mode)
  using the same "don't build what a vendor already does" test applied
  elsewhere this session, while recognizing when that pattern shouldn't
  apply.
- Specify role assignment/invite as genuine new functionality.

**Non-Goals:**
- Aggregate reports or commission-void/reassignment screens — not in this
  issue's scope, remain unowned gaps.
- Choosing the exact invite-email provider or template — Execução detail.
- Redesigning D-055/D-056/D-043 — all consumed as-is.

## Decisions

**No `/admin/*` tree — everything admin-only lives under `/staff/*`.**
D-056 was explicit: "Namespace único `/staff/*` para toda UI de fluxo
operacional... ações genuinamente Admin-only... ficam com checagem mais
estrita por rota/ação dentro da mesma árvore, não uma segunda árvore de
UI." The draft and `screen-map.md` never caught up to that — this leaf
corrects them, the same category of correction #189/#191 made to other
pre-decision drafts.

**API keys screen is read-only reference, gated by D-043's ownership
rule, not the general `admin` RBAC role.** D-043 already decided: "Owner:
ForteGB tech — único com escrita em env Production/Preview e API keys"
and "Sócios: sem acesso a secrets." Since "Digital"/tech is an
organizational fact distinct from the `admin` RBAC role (D-055 already
makes this distinction explicit), an admin-role sócio who isn't tech
isn't supposed to have secrets write access — a screen that let any
admin edit API keys would contradict D-043 outright. The corrected
screen shows configuration *status* (which integrations are connected)
without exposing or accepting key values; actual edits happen in
Vercel's env var UI, restricted to tech as D-043 already specifies.

**Hide-house needs no ForteGB screen — Sanity Studio already does this.**
Houses are Sanity-managed content (D-015). Sanity's native draft/
unpublish workflow already lets an editor pull a listing from the live
site. Building a parallel "hide" flag and toggle in the platform's own
admin UI would duplicate what the CMS vendor already provides for free —
the same mistake avoided for Tuya (#194) and now API keys, applied
consistently to a third case.

**Maintenance mode is a live Supabase flag, deliberately breaking the
vendor-native pattern above.** The three prior decisions in this leaf all
concluded "don't build it, the vendor already does" — but maintenance
mode is different on two counts: it isn't a secret (no D-043 security
rationale applies), and its entire purpose is fast emergency response. A
Vercel env var would require a redeploy and, per D-043, could only be
changed by "ForteGB tech" — meaning an admin sócio noticing a real
problem couldn't act without reaching Ricardo or Felipe first, defeating
the point of an emergency toggle. A live, DB-stored flag any admin can
flip instantly is the correct exception to the pattern, not an
inconsistency in it — the pattern was never "avoid all in-app storage,"
it was "avoid rebuilding what a vendor already solves," and no vendor
solves "let any admin instantly take the site down."

**Role assignment is invite-based, not open self-registration.** Unlike
corretor onboarding (#189, public signup + staff approval), staff and
admin are known individuals an existing admin explicitly invites by
email with a pre-assigned role; the invited person completes their own
signup via that invite, arriving with the role already set — no
approval-queue step needed, since the admin's invite action is itself
the approval. This is additive to `rbac-role-model`, not a modification —
that capability's scope is the role enum/hierarchy/enforcement model,
which this leaf consumes unchanged; the invite mechanism was never part
of its stated Purpose.

## Risks / Trade-offs

- **[Risk]** A live maintenance-mode flag, checked on every public
  request, adds a small read on the hot path compared to a build-time
  env var.
  → **Mitigation:** accepted — the cost is negligible (a single cached
  boolean lookup) against the real benefit of instant, tech-independent
  emergency response.
- **[Risk]** Deferring hide-house to Sanity means ForteGB staff need
  Sanity Studio access/training for that specific action, rather than
  everything living in one admin surface.
  → **Mitigation:** accepted — consistent with the project's existing
  buy-first philosophy (D-015); Sanity access for content editors was
  already assumed by the CMS decision, not new overhead introduced here.

## Open Questions

None — the maintenance-mode mechanism was the one open question,
confirmed during exploration.
