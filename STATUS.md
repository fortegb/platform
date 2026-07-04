# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Decisões técnicas:** abertas até epic Architecture (D-011) + `rbo-grilling`.

---

## Fase atual

**Fase 0 — Fundação** (quase completa) → Fase 1 build bloqueada até Architecture Done (#38)

```
✅ Seed planning · org migration · bootstrap board · OpenSpec
✅ Board hygiene #139 + screen map #32 + Platform docs publicados
✅ Grilling 0 #145 — stances fundacionais + Q-004 resolvido (D-015..D-018)
→ EM CURSO: change grill-foundational-architecture (aplicado, aguarda touches → close-out)
→ TODO: grilling restante (Q-005/006 tours, media kit…) → #38
→ Fase 1 build (Identity, Public site, …) após #38
```

---

## Epics Phase 0

| Epic | Status | Próximo passo |
|------|--------|---------------|
| Seed `docs/planning/` | **Done** | — |
| GitHub org migration | **Done** | — |
| Bootstrap board & OpenSpec | **Done** | — |
| Architecture & MVP definition | **In Progress** | Grilling 0 (#145) feito; próximo grilling tours/media kit → #38 |
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

## Esta sessão (Claude — 2026-07-03)

- [x] Grilling 0 (#145) — stances fundacionais: constraints, build-vs-buy, Q-004, system shape, MVP boundary
- [x] Q-004 **resolvido** (D-016); serverless escolhido (D-017); v1/v2/v3 boundary (D-018)
- [x] OpenSpec change `grill-foundational-architecture` — propose + apply (docs); **não** arquivado (touches pendentes)
- [x] Platform docs — nova página `arquitetura-decisoes.html` + card no índice

## Próxima sessão

- [ ] Touches do Ricardo → `rbo-close-change` #145 (archive → merge → close; subsumir #28)
- [ ] `rbo-grilling` tours (Q-005/Q-006) — próximo na ordem
- [ ] Avançar fecho Architecture → #38

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
