# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-041); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 → D-028
✅ A1–A4 ambientes → D-025..D-027, D-029
✅ B1–B4 Dados → D-030..D-033
✅ C1–C3 CMS → D-034..D-036
✅ D1–D4 Integrações → D-037..D-040
✅ E1 Config nomes → D-041 (#162)
→ EM CURSO passo 4: Epic **#146** — restantes (#163–172)
→ PRÓXIMO: #163 — Config: modelo de scoping (Vercel Production/Preview + .env local)
⚠️ Lacuna: rbo-close-change ainda merge→main até #166
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] #158–#160 integrações (tiers + mapa + alvos) → PAC
- [x] #161 webhooks/callbacks → PAC
- [x] #162 inventário env vars → PAC

## Próxima sessão

- [ ] **#163 — Config: modelo de scoping (Vercel / .env local)**
- [ ] #166 quando priorizar
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + integrações |
| [templates/env-vars.md](./docs/planning/templates/env-vars.md) | Convenção + inventário (D-041) |
| [templates/integrations-webhooks.md](./docs/planning/templates/integrations-webhooks.md) | Callbacks / Preview bypass (D-040) |
| [templates/integrations-safe-targets.md](./docs/planning/templates/integrations-safe-targets.md) | Alvos seguros / slots (D-039) |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
