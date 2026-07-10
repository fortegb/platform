# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Handoff da última sessão:** [`docs/planning/handoff.md`](./docs/planning/handoff.md) (2026-07-06 — snapshot; este STATUS é a fonte viva).  
> **Decisões técnicas:** fechadas (D-015..D-026); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–3 (Contexto · Funcionalidades · Componentes) — produto/stack, D-015..D-021
✅ Grillings: #145 (fundacional), #28 (CRM), #33 (home), roteiro (#173) → D-015..D-024
✅ A1/#147 Ambientes tiers → D-025 · página Ambientes
✅ A2/#148 Branch → ambiente → D-026 · mapa + contrato config lifecycle (skill → #166)
→ EM CURSO passo 4: Epic **#146** — restantes folhas (#149–172)
→ ∥ paralelo: passos 1–2 (validação de contexto/funcionalidades)
→ DEPOIS: passo 5 (jornadas re-validação) · passo 6 (design) → G2 abre (v0 a 100%) → build
→ PRÓXIMO: A3/#149 — topologia Vercel (via rbo-create-change + grilling)
⚠️ Lacuna: docs dizem close→staging; rbo-close-change ainda merge→main até #166 (config opt-in)
✅ Board no modelo Roteiro — migração A feita (#174)
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

Phase 1–4 epics: já no board ([#37](https://github.com/fortegb/platform/issues/37)); **build gated por #146**. Ver [`deliverables.md`](./docs/planning/deliverables.md).

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

- [x] A1/#147 ambientes — grill, apply, close; pages:sync wired into rbo-close-change
- [x] A2/#148 branch mapping — grill + propose + apply (D-026)
- [ ] Close #148 (após validação)

## Próxima sessão (aguardando comando)

- [ ] **#149 — Ambientes: topologia Vercel** (rbo-create-change + grilling)
- [ ] **#166** — lifecycle config opt-in no rbo-close-change (quando priorizar)
- [ ] (paralelo) Brand assets (#2)

---

## Recently done

- **2026-07-10:** A2/#148 — branch→ambiente (D-026); A1/#147 — três ambientes (D-025).
- **2026-07-05/06:** Roteiro + Migração A.

---

## Not now

- Phase 1 **code** (até G2)
- Hardcode `staging` no skill global

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Três ambientes + branches (sócios) |
| [templates/environments.md](./docs/planning/templates/environments.md) | Contrato técnico + lifecycle config |
| [progresso-socios.html](./docs/planning/progresso-socios.html) | Relatório sócios |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
