# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-042); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 → D-028
✅ A1–A4 ambientes → D-025..D-027, D-029
✅ B1–B4 Dados → D-030..D-033
✅ C1–C3 CMS → D-034..D-036
✅ D1–D4 Integrações → D-037..D-040
✅ E1–E2 Config → D-041..D-042 (nomes + scoping)
→ EM CURSO passo 4: Epic **#146** — restantes (#164–172)
→ PRÓXIMO: #164 — Config: gestão de secrets + política de acesso
⚠️ Lacuna: rbo-close-change ainda merge→main até #166
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] #158–#162 integrações + env names → PAC
- [x] #163 scoping env → PAC

## Próxima sessão

- [ ] **#164 — Config: gestão de secrets + política de acesso**
- [ ] #166 quando priorizar
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + integrações |
| [templates/env-scoping.md](./docs/planning/templates/env-scoping.md) | Production / Preview / local (D-042) |
| [templates/env-vars.md](./docs/planning/templates/env-vars.md) | Convenção + inventário (D-041) |
| [templates/integrations-webhooks.md](./docs/planning/templates/integrations-webhooks.md) | Callbacks (D-040) |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
