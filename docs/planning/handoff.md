# Handoff — fortegb/platform — 2026-07-13

**Updated:** 2026-07-13T16:05:00Z
**Status:** consumed

> Advisory only. Board + STATUS.md win. Catch-up reads this until Status is
> `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use.

## Context

Very long session (Claude Code), continuing directly from the prior
session's handoff. Ran all 11 Passo 5 (Jornadas) leaves of epic #176 in a
single continuous PAC-style run: #185 → #195, each through the full
explore → propose → apply → close cycle, then closed epic #176 itself.
Most leaves corrected pre-architecture stub code against D-052–D-056
(same category of bug: legacy tables, silent failure swallowing,
client-trusted state instead of server-persisted, sync sends instead of
QStash). Two leaves went further and formally **reopened** a closed
decision (logged explicitly, not silently folded in): #187 reopened D-053
(phone-OTP reuse gate + bounded-refresh ceiling for instant/QR visits);
#189 reopened `crm-source-of-truth` (added the `corretor_casa` approval
gate on broker attribution). One leaf (#192) and two more (#193, #195)
were genuinely additive/corrective with no prior code to fix. #194 was a
pure re-confirmation (no build). #195 found and fixed two direct
contradictions with closed decisions (routes vs. D-056, API-keys screen
vs. D-043's secrets-ownership rule) rather than just lagging architecture.

A real gap surfaced mid-session (during #190's exploration): #189/D-062
never required the corretor's own CPF, needed eventually for commission
payout. Per user instruction, spun off as its own issue+leaf rather than
folded into #190 or silently reopening #189 — **#196, still open**,
parented under #176 (which is why the generated `mapa-roteiro.html`
report still shows `current=passo 5`, correctly, since #196 is tagged
`Etapa 5 Jornadas` and not yet Done).

## Control doc paths

- Decisions: `docs/planning/decisions.md` (D-057–D-067 this session) +
  root `DECISIONS.md` mirror (English)
- Session compass: `STATUS.md` (fully refreshed this session)
- Context: `AGENTS.md` (§9 "Estágio atual" refreshed — Passo 5 fechado,
  Passo 6 Design system is current)
- Planning: `docs/planning/` (`jornadas-plataforma.md` and `screen-map.md`
  both fully re-validated section-by-section, plus 11 new
  `templates/jornada-*.md` detail docs)
- Handoff: `docs/planning/handoff.md` (this file)

## Current state

**Done**
- Epic #176 (Jornadas, telas e fluxos) — closed, all 11 leaves (#185–#195)
- 11 new OpenSpec capabilities (`journey-site-discovery`,
  `journey-scheduled-visit`, `journey-instant-visit`,
  `journey-post-visit-reengagement`, `journey-corretor-onboarding`,
  `journey-corretor-client-registration`, `journey-corretor-pipeline`,
  `journey-staff-verification-review`, `journey-staff-daily-operations`,
  `journey-tuya-access-management`, `journey-platform-admin-config`)
- 2 formal reopenings: `visit-identity-verification` (via #187, D-053 →
  phone-otp + 24mo ceiling), `crm-source-of-truth` (via #189, D-062 →
  `corretor_casa` gate)
- `jornadas-plataforma.md` and `screen-map.md` — every section validated,
  top-level banners updated from "RASCUNHO" to "Passo 5 concluído"
- `AGENTS.md` §9 and `STATUS.md` refreshed to reflect Passo 5 closed,
  Passo 6 (Design system) current

**In progress**
- Nothing mid-flight — every branch this session was merged and deleted

**Blocked / watch**
- **#196 open** (corretor's own CPF, reopens D-062) — small, well-scoped,
  not started. Natural next pick, but not required before Passo 6.
- `origin/staging` still doesn't exist (deferred to #42/#46 Execução
  bootstrap) — `rbo-close-change` keeps using the default-mode
  `feat/*`→`main` exception (D-046) until then
- `npm run pages:sync`'s `pages:site` step still fails with a 500 locally
  (pre-existing, unrelated) — worked around every close-out this session
  by running `pages:portal` + `progress:report` directly instead of the
  full `pages:sync`

## Artifacts

- Epic (closed): https://github.com/fortegb/platform/issues/176
- Leaves (all closed): #185, #186, #187, #188, #189, #190, #191, #192,
  #193, #194, #195
- Open follow-up: https://github.com/fortegb/platform/issues/196
- Decisions this session: D-057–D-067 in `docs/planning/decisions.md`

## Next session

**First action:** `rbo-catch-up` (L2), then choose between (a) closing
out #196 (corretor CPF fix — small, self-contained, reopens D-062) or
(b) starting Passo 6 (Design system) per `roteiro.md`. Neither blocks the
other; #196 is a loose end from Passo 5, not a gate on Passo 6.

## Suggested skills

- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-create-change` on #196 if picked first
- `rbo-grilling` likely relevant for Passo 6 (Design system) kickoff
