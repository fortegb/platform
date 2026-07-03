# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Decisões técnicas:** abertas até epic Architecture (D-011) + `rbo-grilling`.

---

## Fase actual

**Phase 0 — Fundação** (quase completa) → depois Phase 1 build (bloqueado até Architecture Done)

```
✅ Seed planning
✅ GitHub org migration + repos na org
✅ Repo principal renomeado: sandbox → platform
✅ Dotfiles auth/commit_as (rbonon dev, namespace fortegb)
✅ Bootstrap board + OpenSpec
→ TODO: Architecture & MVP (grilling Q-003…)
→ Phase 1+ (Identity, Public site UI, …)
```

---

## Epics Phase 0

| Epic | Status | Próximo passo |
|------|--------|---------------|
| Seed `docs/planning/` | **Done** | — |
| GitHub org migration | **Done** | — |
| Bootstrap board & OpenSpec | **Done** | — |
| Architecture & MVP definition | **Todo** | `rbo-grilling` — [Q-003](./docs/planning/open-questions.md) |
| Brand assets upload | **Todo** | Paralelo — AGENTS.md §7 |

Phase 1–4 epics: já no board ([#37](https://github.com/fortegb/platform/issues/37)); build bloqueado até Architecture Done. Ver [`deliverables.md`](./docs/planning/deliverables.md).

---

## Org GitHub (estado)

| Repo | Owner |
|------|--------|
| `platform` | org `fortegb` |
| `app-despesas` | org `fortegb` |
| `ai-assets` | org `fortegb` |

**Dev git:** `rbonon` (auth) · **Admin:** `fortegb-admin`

---

## Esta sessão

- [x] Issue [#139](https://github.com/fortegb/platform/issues/139) — epics/issues review; branch `feat/epics-issues-review` (explore)
- [x] Portal polish [#138](https://github.com/fortegb/platform/issues/138) fechado (OpenSpec arquivado)
- [x] **A1:** `phases.md` sincronizado com board (Phase 0 epics Done + checklists)
- [x] **A2:** `STATUS.md` actualizado
- [x] **A3:** `architecture.md` §1/§3/§6 synced from jornadas (light skim; gaps → Topic C)
- [x] **A4:** #37 renomeado → «Criar epics Phase 1–4 no board»
- [x] **A5:** #138 stays under #4; future portal/docs → new Documentation epic (TBD)
- [x] **A6:** `progress-focus.md` — portal #138 em concluídos; foco #139 + Architecture
- [ ] **Topic A→C review** — stale/missing/jornadas→screens ([explore notes](./docs/planning/explore/epics-issues-review.md))
- [ ] Architecture [#1](https://github.com/fortegb/platform/issues/1) — grilling (após review)

---

## Recently done

- **2026-07-03:** Portal sócios (#138) — módulos, UX cards, Pages deploy; progress report regen.
- **2026-07-03:** Board review #139 criado; explore epics-issues-review.
- **2026-07-01:** Handoff Phase 0; org migration + bootstrap Done; planning finalizado.
- **2026-06-28–29:** UI refinement. Ver [`CHANGELOG.md`](./CHANGELOG.md).

---

## Not now

- Phase 1 **code** (até Architecture Done)
- Fechar stack/CMS/KYC/mobile sem grilling

---

## Links

| Doc | Uso |
|-----|-----|
| [planning/README.md](./docs/planning/README.md) | Índice + ordem de arranque |
| [../index.html](./docs/index.html) | Portal sócios (GitHub Pages) |
| [progresso-socios.html](./docs/planning/progresso-socios.html) | Relatório sócios (board + foco) |
| [deliverables.md](./docs/planning/deliverables.md) | Mapa negócio ↔ plano |
| [open-questions.md](./docs/planning/open-questions.md) | Grilling backlog |
| [phases.md](./docs/planning/phases.md) | Epics detalhados |
| [explore/epics-issues-review.md](./docs/planning/explore/epics-issues-review.md) | Notas explore #139 (board hygiene) |
