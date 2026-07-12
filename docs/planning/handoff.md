# Handoff — fortegb/platform — 2026-07-11

**Updated:** 2026-07-12T02:07:23Z
**Status:** active

> Advisory only. Board + STATUS.md win. Catch-up reads this until Status is
> `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use.

## Context

Long session (Claude Code). Closed out CI/CD + dev-local leaves #167–#172,
closing Epic #146 (Arquitetura da solução & ambientes — infra/ambientes,
26/26 sub-issues). Along the way: fixed a real board-hygiene issue (Epic #1
showing Done with open v2/v3-deferred children — re-parented), removed a
redundant GitHub Action causing repeated build-info.json merge conflicts
(#178), and shipped a companion `ai-skills` cycle (v0.7.0 — conditional
migration trigger + uniform hotfix exception in `rbo-create-change`/
`rbo-close-change`).

A structured post-#146 review then found real gaps: several v1-scope
product-architecture topics (self-guided visits, Tuya, WhatsApp/Telegram
messaging, RBAC, admin) were never grilled as their own issues — they only
existed as line-items inside `platform-architecture`'s generic integration
inventory. Opened a new Epic **#179** (Arquitetura de domínio) with 5 leaves
to close that gap before Passo 5 (Jornadas, #176) can design flows on top of
them.

Also did a full sweep of `docs/planning/` for stale `#146` references (13
files were still saying "em curso" after it closed) — this is now a
documented habit in `agents.md`'s Platform docs section: "update platform
docs" means grep + fix hand-maintained prose, not just running the
generator.

## Control doc paths

- Decisions: `docs/planning/decisions.md` (D-015–D-051) + root `DECISIONS.md`
  mirror (now pointer-format per entry, plus an append-only index at the top)
- Session compass: `STATUS.md`
- Context: `agents.md` (note: wrapped in a stray leading/trailing ` ```markdown `
  code fence, pre-existing, not fixed this session — cosmetic, out of scope)
- Planning: `docs/planning/`
- Handoff: `docs/planning/handoff.md` (this file)

## Current state

**Done**
- Epic #146 (infra/ambientes) — closed, 26/26 sub-issues
- #167–#172 (CI/CD pipeline, migrations, promotion/hotfix, dev toolchain,
  bootstrap runbook, mock strategy) → D-046–D-051
- #178 (removed redundant `portal-build-info.yml` Action)
- Board hygiene: re-parented #29/#140→#81, #30→#98, #31→#130; epic #175
  Etapa 1→2
- `ai-skills` v0.7.0: `rbo-create-change` 0.3, `rbo-close-change` 0.5
  (conditional migration trigger, uniform hotfix exception)
- Full `docs/planning/` sweep for stale `#146` references (13 files)

**In progress**
- Epic **#179** (Arquitetura de domínio) — 5 leaves created, none started:
  #181 Tuya (highest risk, grill first), #180 visitas, #182 mensageria,
  #183 RBAC, #184 admin

**Blocked / watch**
- `origin/staging` still doesn't exist — deferred to Execução bootstrap
  (#42/#46); Definição leaves keep closing `feat/*`→`main` directly until
  then (documented, not a bug)
- `#184` (admin) has a real conflict to resolve: existing
  `platform-architecture` requirement says "no bespoke back-office admin
  UI," but the platform is expected to have admin pages controlling
  customer/corretor flows — needs explicit reconciliation during grilling,
  not silent override

## Artifacts

- Epic: https://github.com/fortegb/platform/issues/179
- Leaves: #180, #181, #182, #183, #184
- `ai-skills` release: https://github.com/rbonon/ai-skills/releases/tag/v0.7.0
- Decisions this session: D-046–D-051 in `docs/planning/decisions.md`

## Next session

**First action:** `rbo-catch-up` (L2) on `fortegb/platform`, then
`rbo-grilling` on **#181 (Tuya)** — highest-risk leaf, grill first. Core
question: does Tuya's API actually support time-limited remote passwords,
and what's the failure mode if it's unreachable when someone's at the door.

## Suggested skills

- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-grilling` on #181, then #180/#182/#183/#184 in any order
- `rbo-create-change` → propose/apply for each, same pattern as tonight
- `rbo-close-change` (default mode — `origin/staging` still absent)
