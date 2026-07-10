# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Handoff da última sessão:** [`docs/planning/handoff.md`](./docs/planning/handoff.md) (2026-07-06 — snapshot; este STATUS é a fonte viva).  
> **Decisões técnicas:** fechadas (D-015..D-025); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–3 (Contexto · Funcionalidades · Componentes) — produto/stack, D-015..D-021
✅ Grillings: #145 (fundacional), #28 (CRM), #33 (home), roteiro (#173) → D-015..D-024
✅ A1/#147 Ambientes tiers (local/staging/prod) — grilled + spec aplicada → D-025 · página Ambientes
→ EM CURSO passo 4: Epic **#146** — restantes folhas (#148–172)
→ ∥ paralelo: passos 1–2 (validação de contexto/funcionalidades)
→ DEPOIS: passo 5 (jornadas re-validação) · passo 6 (design) → G2 abre (v0 a 100%) → build
→ PRÓXIMO: A2/#148 — mapeamento branch → ambiente (via rbo-create-change + grilling)
✅ Board no modelo Roteiro (Etapa 9 passos + Milestone v0 + tipos nativos) — migração A feita (#174)
⚠️ Migração B (Milestones v1/v2/v3) diferida ao passo 7 (Versionamento)
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

## Esta sessão (Cursor — 2026-07-10)

- [x] Catch-up L2 → próximo = #147
- [x] `rbo-create-change` → `ambientes-tiers-local-staging-prod`
- [x] Grilling A1 (tiers, promoção, dados, integrações, APP_ENV, local isolado, staging privado, hotfix, deliverable = spec + Platform docs)
- [x] Apply: D-025, template, `ambientes.html`, index card, architecture/STATUS

## Próxima sessão (aguardando comando)

- [ ] **#148 — Ambientes: mapeamento branch → ambiente** (começar via rbo-create-change + grilling)
- [ ] Build da Fase 1 (Identity #48, Public site #56) **só após #146** (e passos 5–6)
- [ ] (paralelo) Brand assets upload (#2)

---

## Recently done

- **2026-07-10:** A1/#147 — três ambientes (D-025) + página Ambientes na Documentação da plataforma.
- **2026-07-05/06:** Roteiro (#173) + Migração A (#174) — board no modelo Etapa; Platform docs `mapa-roteiro.html`.
- **2026-07-03/04:** Grillings #145/#28/#33 → D-015..D-021; #146 criado.

---

## Not now

- Phase 1 **code** (até Architecture Done / G2)
- Fechar stack/CMS/KYC/mobile sem grilling

---

## Links

| Doc | Uso |
|-----|-----|
| [planning/README.md](./docs/planning/README.md) | Índice + ordem de arranque |
| [../index.html](./docs/index.html) | Documentação da plataforma (GitHub Pages) |
| [ambientes.html](./docs/planning/ambientes.html) | Três ambientes (sócios) |
| [progresso-socios.html](./docs/planning/progresso-socios.html) | Relatório sócios (board + foco) |
| [deliverables.md](./docs/planning/deliverables.md) | Mapa negócio ↔ plano |
| [open-questions.md](./docs/planning/open-questions.md) | Grilling backlog |
| [phases.md](./docs/planning/phases.md) | Epics detalhados |
| [explore/epics-issues-review.md](./docs/planning/explore/epics-issues-review.md) | Notas explore #139 (board hygiene) |
