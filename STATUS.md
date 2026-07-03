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

Phase 1–4 epics: ver [`deliverables.md`](./docs/planning/deliverables.md) · registar no board ao fechar Architecture.

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

- [x] Org migration, dotfiles 0.8.x, re-clones, rename `platform`
- [x] Handoff docs commitados e push `origin/main` (0a6af59)
- [x] `rbo-handoff` — sessão encerrada na máquina principal
- [ ] **Próxima sessão:** Mac Mini — [setup-mac-mini.md](./docs/setup-mac-mini.md) **ou** `rbo-catch-up` + Architecture ([#1](https://github.com/fortegb/platform/issues/1))

---

## Recently done

- **2026-07-01:** Handoff Phase 0; push sync; repos org renomeados (`app-despesas`, `ai-assets`).
- **2026-07-01:** Org `fortegb`, repos transferidos, `platform`, dotfiles `auth`/`commit_as`, Project + OpenSpec.
- **2026-07-01:** Planning finalizado — deliverables, Q-016–Q-019, D-011.
- **2026-06-28–29:** UI refinement. Ver `CHANGELOG.md`.

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
| [setup-mac-mini.md](./docs/setup-mac-mini.md) | Checklist Mac Mini pós-migração |
