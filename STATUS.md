# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-024); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–3 (Contexto · Funcionalidades · Componentes) — produto/stack, D-015..D-021
✅ Grillings: #145 (fundacional), #28 (CRM), #33 (home), roteiro (#173) → D-015..D-024
→ EM CURSO passo 4: Epic **#146** — Arquitetura da solução & ambientes (26 folhas #147-172)
→ ∥ paralelo: passos 1–2 (validação de contexto/funcionalidades)
→ DEPOIS: passo 5 (jornadas re-validação) · passo 6 (design) → G2 abre (v0 a 100%) → build
→ PRÓXIMO: começar #146 em A1 (#147) via rbo-create-change
⚠️ Migração do board (Etapa/Milestones/tipos, D-024) pendente — próxima após #173
```

---

## Epics Phase 0

| Epic | Status | Próximo passo |
|------|--------|---------------|
| Seed `docs/planning/` | **Done** | — |
| GitHub org migration | **Done** | — |
| Bootstrap board & OpenSpec | **Done** | — |
| Architecture & MVP definition | **Done** | Fechado (#38) — D-015..D-021; todas Q-* resolved/deferred |
| Brand assets upload | **Todo** | Paralelo — AGENTS.md §7 |

Phase 1–4 epics: já no board ([#37](https://github.com/fortegb/platform/issues/37)); **build gated por #146** (definição de arquitetura da solução & ambientes). Ver [`deliverables.md`](./docs/planning/deliverables.md).

---

## Org GitHub (estado)

| Repo | Owner |
|------|--------|
| `platform` | org `fortegb` |
| `app-despesas` | org `fortegb` |
| `ai-assets` | org `fortegb` |

**Dev git:** `rbonon` (auth) · **Admin:** `fortegb-admin`

---

## Esta sessão (Claude — 2026-07-03/04)

- [x] Grilling #145 (fundacional), #28 (CRM Q-007/Q-018), #33 (home Q-010) — todos fechados
- [x] Decisões D-015..D-021; pt-BR estrito repo-wide; terminologia **lead/prospecto → cliente concluída** (planning + README + SETUP)
- [x] Checkpoint #36 → Epic Architecture #1 fechado; **depois**: reconhecido que infra/ambientes/integrações não estavam definidos → criado Epic **#146** (26 folhas)
- [x] Convenção de dependências (`Depends on: #X`); reavaliação D-017 registrada (explore §8)

## Próxima sessão (aguardando comando)

- [ ] **#146 — Arquitetura da solução & ambientes** (começar A1/#147); **precede** o build
- [ ] Build da Fase 1 (Identity #48, Public site #56) **só após #146**
- [ ] (paralelo) Brand assets upload (#2)

---

## Recently done

- **2026-07-03:** Grilling 0 (#145) — stances fundacionais + Q-004 resolvido; change `grill-foundational-architecture` aplicado (docs canon + Platform docs).
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
| [../index.html](./docs/index.html) | Documentação da plataforma (GitHub Pages) |
| [progresso-socios.html](./docs/planning/progresso-socios.html) | Relatório sócios (board + foco) |
| [deliverables.md](./docs/planning/deliverables.md) | Mapa negócio ↔ plano |
| [open-questions.md](./docs/planning/open-questions.md) | Grilling backlog |
| [phases.md](./docs/planning/phases.md) | Epics detalhados |
| [explore/epics-issues-review.md](./docs/planning/explore/epics-issues-review.md) | Notas explore #139 (board hygiene) |
