# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-029); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 validados → D-028 (#177; epic #175)
✅ A1/#147 Ambientes tiers → D-025
✅ A2/#148 Branch → ambiente → D-026 (skill config → #166)
✅ A3/#149 Topologia Vercel → D-027
✅ A4/#150 Domínios → D-029 (fortegb.com / staging / .com.br→.com)
→ EM CURSO passo 4: Epic **#146** — restantes (#151–172)
→ PRÓXIMO: #151 — projetos Supabase por ambiente
⚠️ Lacuna: rbo-close-change ainda merge→main até #166
✅ Board no modelo Roteiro — migração A (#174)
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] Passos 1–2 closed; mapa live
- [x] A4/#150 domains grilled → propose/apply/close

## Próxima sessão

- [ ] **#151 — Supabase por ambiente** (rbo-create-change + grilling)
- [ ] #166 quando priorizar (lifecycle config no skill)
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + branches + Vercel + domínios (sócios) |
| [templates/environments.md](./docs/planning/templates/environments.md) | Contrato técnico |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
| [mapa-roteiro.html](./docs/planning/mapa-roteiro.html) | Mapa live do board |
