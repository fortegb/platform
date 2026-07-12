## Context

Epic #179 (Arquitetura de domínio) leaf #184, fifth and final, grilled after #181 (Tuya), #180 (visits/identity), #182 (messaging), #183 (RBAC). The existing `platform-architecture` requirement was written narrowly around content editing during Grilling 0 (`D-015`/`#145`), before any of the operational-workflow needs in `D-052`–`D-055` had surfaced.

## Goals / Non-Goals

**Goals:** `D-056` + `templates/admin-build-vs-buy.md`; amend `platform-architecture`'s existing requirement so it correctly distinguishes content editing from operational workflow UI; close out Epic #179.

**Non-Goals:** Building any actual `/staff/*` screen; the exact route implementation or component structure (Passo 5 / specific build issues); re-deciding RBAC (`D-055`, only referenced via the hierarchy it already established).

## Decisions

1. Reframe "admin" into two categories: content editing (vendor-only, unchanged) vs. operational workflow UI (new, named).
2. Three-part test: multi-step workflow with side effects; domain-specific rendering; safety for non-technical staff.
3. Reclassify existing decisions: corretor approval + verification exception queue → custom UI; Tuya emergency-code rotation → stays vendor dashboard.
4. Single `/staff/*` namespace, RBAC-gated via `D-055`'s hierarchy, no separate `/admin/*` tree.
5. Amend the existing `platform-architecture` requirement directly (MODIFIED delta), not a new capability.

**Alternative considered and rejected:** treating this as a genuine build-vs-buy tradeoff decision (i.e. actually weighing whether to build bespoke admin UI at all, as if starting fresh). Rejected once the reframe made clear there was no real tradeoff to weigh — the two categories being conflated have different, already-obvious right answers (content → vendor, workflow-with-side-effects → custom) once separated. Treating it as "decide build vs. buy" would have re-litigated `D-034`'s already-settled CMS choice for no reason.

## Risks

- **[Risk] The three-part test gets applied too liberally**, justifying custom UI for things that are really just content edits with extra steps. → Mitigation: the test requires genuine side effects, genuine domain-specific rendering, or a genuine non-technical-safety need — not "it would be nicer" — and the reclassification of existing decisions (Tuya emergency code staying on Supabase Studio) sets the precedent for staying disciplined.
- **[Risk] `/staff/*` namespace grows into an unmanaged sprawl of screens over time.** → Mitigation: each screen still has to pass the three-part test before being built at all — this decision constrains scope, it doesn't open a blank check for admin UI.
- **[Risk] The amended `platform-architecture` requirement is read as "build whatever admin UI you want."** → Mitigation: the requirement text keeps the original content-editing prohibition intact and only adds the workflow-UI carve-out with its explicit test, not a blanket exception.
