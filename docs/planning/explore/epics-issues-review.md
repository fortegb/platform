# Explore — Epics and issues review (#139)

> **Status:** explore gate (no OpenSpec change yet)  
> **Branch:** `feat/epics-issues-review` (local)  
> **Parent epic:** [#20 Bootstrap board & OpenSpec](https://github.com/fortegb/platform/issues/20)  
> **Recurrence:** this pass establishes a checklist; future passes reuse the same change name pattern or spawn `#NNN` chores.

---

## Problem framing

The board (`fortegb/platform` #1) is the execution source of truth; planning canon lives in `docs/planning/`. Drift is expected as the project evolves — this change is **hygiene**, not new product scope.

```
┌─────────────────────┐     compare      ┌─────────────────────┐
│  Planning canon     │ ◄──────────────► │  GitHub Project     │
│  phases.md          │                  │  137 items          │
│  deliverables.md    │                  │  19 open epics      │
│  modules.md         │                  │  Phase + Module     │
└─────────────────────┘                  └─────────────────────┘
           │                                         │
           └──────────────► gaps / fixes ◄───────────┘
```

---

## Board snapshot (2026-07-03)

| Metric | Value |
|--------|-------|
| Total items | 137 |
| Done | 25 |
| Todo | 112 |
| In Progress | 1 (#139) |
| Open epics | 19 (Phases 0–4) |

**Phase 0 open epics:** #1 Architecture, #2 Brand assets  
**Phase 1–4 epics:** all Todo (expected — blocked on Architecture)

---

## Findings already visible (candidates for review)

### 1. `phases.md` stale vs board reality — **fixed 2026-07-03**

~~The Phase 0 table still lists…~~ Table, dependency diagram, and org/bootstrap checklists synced to board (#8, #20 Done; issue links added).

### 2. Architecture epic (#1) vs Phase 1+ epics

Sub-issue **#37** “Criar epics Phase 1–3 no board” is **Done**, and Phase 1–3 epics exist on the board. **Phase 4 epics** (#126, #130, #134) also exist — confirm whether #37 scope should have been “Phase 1–4” or if Phase 4 was added later without a tracking issue.

### 3. Portal work under Seed epic (#4)

**#138** (portal polish) is a sub-issue of **#4 Seed docs/planning**. Reasonable for Phase 0, but review whether future portal chores stay under #4 or get a dedicated “Partner portal” epic.

### 4. Canon ↔ module ↔ board field alignment

- `modules.md` defines 10 modules; board **Module** field has matching options.
- `mapa-fases.html` “Integrações” links to `#tours` — not a board module; decide if integrations deserve explicit module or stay under tours.

### 5. Deliverables gaps (from `deliverables.md`)

Items marked “TBD” or deferred to Architecture may still lack board issues:

- Condomínio / portaria (Q-017)
- Post-visit follow-up automation
- Manual ID approval workflow
- Some social / multi-channel CRM sources (Phase 3+)

**Action candidate:** during review, either create issues, explicitly defer in `open-questions.md`, or mark “won’t do MVP”.

### 6. Recurring process (for propose phase)

Suggested validation checklist (repeat each review):

1. **Epic coverage** — every epic in `phases.md` has a board issue with correct Phase/Module  
2. **Sub-issue linkage** — leaf tasks parented to correct epic  
3. **Status honesty** — Done items match merged work / closed issues  
4. **Orphans** — board items with no parent when they should have one  
5. **Duplicates** — same scope filed twice under different epics  
6. **Canon sync** — `phases.md`, `STATUS.md`, `progress-focus.md` reflect board  
7. **Portal** — regen `progresso-socios.html` after board changes  
8. **New scope** — `deliverables.md` / grilling outcomes → new issues

---

## Open questions (for you in explore / propose)

1. **Scope of this pass:** Phase 0 only, or full board Phases 0–4?  
2. **Outputs:** board edits only, or also update `phases.md` / `deliverables.md`?  
3. **New epics:** create now for known gaps (e.g. partner portal maintenance, board hygiene recurrence)?  
4. **Issue type field:** board has no **Type** column in `gh project field-list` — rely on titles/issue types org setting?  
5. **When to re-run:** milestone-based (post-Architecture) vs periodic?

---

## Recommended next step

When ready: say **“propose”** → `openspec new change epics-issues-review` with:

- **proposal.md** — recurring hygiene process + scope of this pass  
- **tasks.md** — checklist grouped by validation area above  
- Link issue body: `OpenSpec: openspec/changes/epics-issues-review/`

Then apply = execute the review (mostly board + docs, minimal code).
