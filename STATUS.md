# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-032); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 → D-028
✅ A1–A4 ambientes → D-025..D-027, D-029
✅ B1/#151 Supabase projetos → D-030
✅ B2/#152 Migrações CLI → D-031
✅ B3/#153 Runbook Supabase local → D-032
→ EM CURSO passo 4: Epic **#146** — restantes (#154–172)
→ PRÓXIMO: #154 — seed/test data + LGPD
⚠️ Lacuna: rbo-close-change ainda merge→main até #166
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] B2/#152 migrations closed
- [x] B3/#153 local runbook grilled → propose/apply/close

## Próxima sessão

- [ ] **#154 — Seed / dados de teste + LGPD**
- [ ] #166 quando priorizar (lifecycle config no skill)
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + Supabase + migrações + local |
| [templates/supabase-local.md](./docs/planning/templates/supabase-local.md) | Runbook Supabase local |
| [templates/environments.md](./docs/planning/templates/environments.md) | Contrato técnico |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
| [mapa-roteiro.html](./docs/planning/mapa-roteiro.html) | Mapa live do board |
