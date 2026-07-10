## Context

Epic #175 held passos 1–2 consolidation without leaves. Grilling (2026-07-10) locked:

- Company structure: Good  
- Platform vision: OK (hygiene on apply)  
- Funcionalidades: accept deliverables + modules; journeys → passo 5  
- No new offer items  
- Close path: D-028 + one hygiene leaf (#177)

Canonical artifacts already exist (`company-structure.md`, `platform-vision.md`, `deliverables.md`, `modules.md`). `jornadas-plataforma.md` is dual-listed (capability sketch vs flow draft); deep re-validation is #176 / passo 5.

## Goals / Non-Goals

**Goals:**
- Record D-028 so passos 1–2 are explicitly closed by grilling.
- Align stale planning wording with current board/org/Architecture state.
- Update STATUS/CHANGELOG so the parallel track is visible.

**Non-Goals:**
- Rewriting journeys or screen maps.
- Adding objective→functionality tables beyond what deliverables already provide.
- Closing epic #175 in this change (parent closes when #177 closes; may be same close-out or follow-up).
- Architecture / environments work.

## Decisions

1. **DoD = grilling + decision, not new product docs** — content was already sufficient; inventing leaves would fake progress.
2. **Journeys stay in passo 5** — `jornadas-plataforma.md` keeps its draft banner; no “close passo 2 by finishing journeys.”
3. **Hygiene is surgical** — only lines that contradict known facts (org done, Architecture #1/#38 Done, Q-* resolved/deferred, next work = #146 / roteiro passo 4).
4. **Etapa on #177 = 2 Funcionalidades** — capability close; epic #175 remains tagged 1 Contexto on the board (single-select limit).

## Risks / Trade-offs

- **[Risk] Over-editing Phase-era docs** → Mitigation: touch only false “current state”; leave historical Phase language in `phases.md` where it is archival.
- **[Risk] Epic #175 still open after #177** → Mitigation: close parent when leaf Done (close-change or manual); note in STATUS.
- **[Trade-off] No objective→functionality table** → Accepted in grilling; reopen via decision if needed later.
