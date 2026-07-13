# Handoff — fortegb/platform — 2026-07-13

**Updated:** 2026-07-13T17:10:00-03:00
**Status:** active

> Advisory only. Board + STATUS.md win. Catch-up reads this until Status is
> `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use.

## Context

Short session, continuing directly from the prior session's handoff. That
handoff named exactly one open loose end from Passo 5: **#196** (corretor's
own CPF, reopens D-062). Ran it PAC-style through the full lifecycle —
`rbo-create-change` → propose → apply → archive → merge → close, all in one
continuous run per explicit user instruction ("pac"). Docs-only change,
same pattern as the rest of Passo 5: D-068 recorded, `journey-corretor-
onboarding` capability spec MODIFIED (CPF now mandatory alongside
WhatsApp, same registration step, no new approval state, format-only
validation matching D-063's cliente-CPF bar). Real implementation stays
deferred to Execução (#86/#50).

One process note: an `agents.md`/`AGENTS.md` edit was staged with the
uppercase pathspec on the `feat/*` branch and silently didn't make it into
that branch's commit (case-mismatch against the tracked lowercase
`agents.md` on this case-insensitive filesystem). Caught it after the
merge to `main` — the diff was sitting uncommitted on `main` — and
committed it there directly (`2492aba`) before pushing. **Worth knowing
for next session:** when staging this file, `git add agents.md`
(lowercase) is the safe form; `git add AGENTS.md` may silently no-op.

With #196 closed, **Passo 5 (Jornadas) has no open items left at all** —
`mapa-roteiro.html` now reports `current=passo 6` (previously stuck on
passo 5 because #196 was open and tagged `Etapa 5`).

## Control doc paths

- Decisions: `docs/planning/decisions.md` (D-068 this session) + root
  `DECISIONS.md` mirror (English)
- Session compass: `STATUS.md` (refreshed — #196 closed, Passo 5 fully done)
- Context: `agents.md` (§9 "Estágio atual" — #196 closed line added; note
  the lowercase tracked filename, see Context above)
- Planning: `docs/planning/` (`templates/jornada-onboarding-corretor.md`,
  `jornadas-plataforma.md` §4.1, `screen-map.md` Corretor banner — all
  updated to reflect CPF now mandatory)
- Handoff: `docs/planning/handoff.md` (this file)

## Current state

**Done**
- Issue #196 (corretor CPF mandatory) — closed via merge `Closes #196`,
  board `Done`
- D-068 recorded, reopens D-062 (`journey-corretor-onboarding`)
- `journey-corretor-onboarding` main spec synced (MODIFIED requirement +
  new "CPF is mandatory" scenario)
- `ROADMAP.md` regenerated; Platform docs synced (`pages:portal` +
  `progress:report` — same `pages:site` 500 workaround as last session)
- **Passo 5 (Jornadas, epic #176) has zero open items** — confirmed via
  `mapa-roteiro.html` now showing `current=passo 6`

**In progress**
- Nothing mid-flight — the one branch this session (`feat/corretor-cpf-
  obrigatorio`) was merged and deleted

**Blocked / watch**
- `origin/staging` still doesn't exist (deferred to #42/#46 Execução
  bootstrap) — `rbo-close-change` keeps using the default-mode
  `feat/*`→`main` exception (D-046) until then
- `npm run pages:sync`'s `pages:site` step still fails with a 500 locally
  (pre-existing, unrelated) — keep using `pages:portal` + `progress:report`
  directly instead of the full `pages:sync` until someone investigates it
- Case-sensitivity footgun on `agents.md`/`AGENTS.md` staging (see Context)
  — no fix applied, just noting it so it isn't repeated

## Artifacts

- Closed: https://github.com/fortegb/platform/issues/196
- Decision this session: D-068 in `docs/planning/decisions.md`
- Merge commit: `8f3cf62` (`Closes #196`) on `main`

## Next session

**First action:** `rbo-catch-up` (L2), then start **Passo 6 (Design
system)** per `roteiro.md` — nothing else is blocking it now that Passo 5
is fully closed. Likely opens with `rbo-grilling` on epic #67 (Brand &
design system) given the pattern this project uses before any build step.

## Suggested skills

- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-grilling` for Passo 6 (Design system) kickoff — epic #67 and its
  sub-issues (#68 tokens, #69 print templates, #70 usage doc, #71 social
  templates) plus Epic #2 (brand assets: #39 logo, #40 brand guide, #41
  hero images) are the Etapa 6 backlog
