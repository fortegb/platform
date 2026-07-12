# Handoff — fortegb/platform — 2026-07-12

**Updated:** 2026-07-12T06:33:16Z
**Status:** active

> Advisory only. Board + STATUS.md win. Catch-up reads this until Status is
> `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use.

## Context

Long session (Claude Code). Grilled and closed all 5 leaves of Epic #179
(Arquitetura de domínio) in one continuous PAC-style run: Tuya (#181, D-052),
visits/identity (#180, D-053), messaging (#182, D-054), RBAC (#183, D-055),
admin build-vs-buy (#184, D-056). Closed the epic itself, then did a full
`docs/planning/` prose sweep (9 files) plus a board-hygiene fix — four
deferred v2/v3 grilling stubs (#29/#30/#31/#140) were still tagged
`Etapa 4` despite being re-parented under Execução epics, which made the
generated report mis-report "current=passo 4"; retagged to `Etapa 8`, report
now correctly shows passo 5. Advised (not created) an 11-item journey list
for Passo 5, then on go-ahead created all 11 as native GitHub sub-issues of
epic #176 (#185–#195). Also corrected a user-taught misunderstanding of
"PAC" mid-session (it means "go from approval gate through close," not "skip
grilling") and saved that + a `rbo-close-change` staging-exception nuance to
memory.

## Control doc paths

- Decisions: `docs/planning/decisions.md` (D-052–D-056 this session) + root
  `DECISIONS.md` mirror (English, same pattern as before)
- Session compass: `STATUS.md`
- Context: `AGENTS.md` (on-disk filename is lowercase `agents.md` — git only
  resolves case correctly via that literal path on `git add`; harmless on
  macOS case-insensitive FS but worth knowing if `git add AGENTS.md` no-ops)
- Planning: `docs/planning/`
- Handoff: `docs/planning/handoff.md` (this file)

## Current state

**Done**
- Epic #179 (Arquitetura de domínio) — closed, all 5 leaves (#180–#184)
- New OpenSpec capabilities: `tuya-access`, `visit-identity-verification`,
  `messaging-channel-policy`, `rbac-role-model`; `platform-architecture`'s
  "Build-vs-buy default" requirement amended (content-editing vs.
  operational-workflow-UI split, three-part justification test)
- Board hygiene: #29/#30/#31/#140 retagged `Etapa 8 Execução`
- Full `docs/planning/` prose sweep for stale `#179` references (9 files)
- Passo 5 (Jornadas): epic #176 now has 11 leaf issues (#185–#195), one per
  journey (not per role) — see list below

**In progress**
- None of the 11 Passo 5 leaves have been grilled/proposed yet — all sit at
  `Status: Todo`, `Etapa: 5 Jornadas`

**Blocked / watch**
- `origin/staging` still doesn't exist (deferred to #42/#46 Execução
  bootstrap) — `rbo-close-change` keeps using the default-mode `feat/*`→`main`
  exception (D-046) until then
- `npm run pages:sync`'s `pages:site` step (full Nuxt prerender) fails with a
  500 on `/` in this local environment — pre-existing, unrelated to any
  change made this session; worked around by running `pages:portal` +
  `progress:report` directly each time. Worth investigating if it matters for
  a real deploy, but Vercel's own build is what actually ships the site.

## Artifacts

- Epic (closed): https://github.com/fortegb/platform/issues/179
- New epic (open): https://github.com/fortegb/platform/issues/176 — 11 leaves:
  #185 (descoberta/site), #186 (visita agendada), #187 (visita instantânea
  QR), #188 (pós-visita), #189 (onboarding corretor), #190 (registro
  cliente/comissão), #191 (pipeline corretor), #192 (fila exceção
  verificação), #193 (operação diária staff), #194 (gestão acesso Tuya),
  #195 (config plataforma/papéis)
- Decisions this session: D-052–D-056 in `docs/planning/decisions.md`

## Next session

**First action:** `rbo-catch-up` (L2) on `fortegb/platform`, then
`rbo-create-change` on whichever Passo 5 leaf the user picks from #185–#195
(no default order suggested yet — unlike #179's leaves, these don't have an
established risk-based sequence). Reasonable starting candidates: #186/#187
(visit journeys, since they exercise the most already-decided architecture:
D-052/D-053) or #185 (site discovery, lowest-risk/fastest if a quick win is
wanted first).

## Suggested skills

- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-create-change` → propose/apply for each Passo 5 leaf, same pattern as
  #179's leaves
- `rbo-close-change` (default mode — `origin/staging` still absent)
