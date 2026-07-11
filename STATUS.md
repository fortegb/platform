# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-045); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 → D-028
✅ A1–A4 ambientes → D-025..D-027, D-029
✅ B1–B4 Dados → D-030..D-033
✅ C1–C3 CMS → D-034..D-036
✅ D1–D4 Integrações → D-037..D-040
✅ E1–E4 Config → D-041..D-044
→ EM CURSO: #166 CI/CD lifecycle (D-045 + `.rbo/lifecycle.yml`) — skills shipped (ai-skills#5 / v0.6.0)
⚠️ Remote `staging` ainda em falta → #167; até lá close deste leaf = feat→main (não stage)
→ PRÓXIMO após fecho #166: #167+
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] #158–#165 integrações + config → PAC
- [x] ai-skills #5 / v0.6.0 — `rbo-stage-change` + close 0.3
- [ ] **#166** — D-045 + lifecycle.yml aplicados; aguarda validação / close

## Próxima sessão

- [ ] Fechar #166 (plataforma) com close default feat→main
- [ ] #167 — branch remota `staging`
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + integrações |
| [SETUP-CREDENTIALS.md](./docs/SETUP-CREDENTIALS.md) | Runbook credenciais (sem secrets) |
| [.env.example](./.env.example) | Template de env (raiz) |
| [templates/env-example.md](./docs/planning/templates/env-example.md) | Ponteiro D-044 |
| [`.rbo/lifecycle.yml`](./.rbo/lifecycle.yml) | Opt-in stage/close (D-045) |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
