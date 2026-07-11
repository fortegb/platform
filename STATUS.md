# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-044); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 → D-028
✅ A1–A4 ambientes → D-025..D-027, D-029
✅ B1–B4 Dados → D-030..D-033
✅ C1–C3 CMS → D-034..D-036
✅ D1–D4 Integrações → D-037..D-040
✅ E1–E4 Config → D-041..D-044 (nomes + scoping + acesso + .env.example)
→ EM CURSO passo 4: Epic **#146** — restantes (#166–172)
→ PRÓXIMO: #166 — CI/CD: lifecycle feat→staging→main (+ atualizar rbo-close-change)
⚠️ Lacuna: rbo-close-change ainda merge→main até #166
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] #158–#164 integrações + config env → PAC
- [x] #165 .env.example / SETUP → PAC

## Próxima sessão

- [ ] **#166 — CI/CD: lifecycle feat→staging→main (+ rbo-close-change)**
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + integrações |
| [SETUP-CREDENTIALS.md](./docs/SETUP-CREDENTIALS.md) | Runbook credenciais (sem secrets) |
| [.env.example](./.env.example) | Template de env (raiz) |
| [templates/env-example.md](./docs/planning/templates/env-example.md) | Ponteiro D-044 |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
