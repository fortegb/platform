# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-039); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 → D-028
✅ A1–A4 ambientes → D-025..D-027, D-029
✅ B1–B4 Dados → D-030..D-033
✅ C1–C3 CMS → D-034..D-036
✅ D1–D3 Integrações → D-037..D-039 (posturas + mapa + alvos)
→ EM CURSO passo 4: Epic **#146** — restantes (#161–172)
→ PRÓXIMO: #161 — Integrações: callbacks/webhooks por ambiente
⚠️ Lacuna: rbo-close-change ainda merge→main até #166
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] #158–#160 integrações (tiers + mapa + alvos) → PAC

## Próxima sessão

- [ ] **#161 — Integrações: callbacks/webhooks por ambiente**
- [ ] #166 quando priorizar
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + integrações |
| [templates/integrations-safe-targets.md](./docs/planning/templates/integrations-safe-targets.md) | Alvos seguros / slots (D-039) |
| [templates/integrations-map.md](./docs/planning/templates/integrations-map.md) | Mapa (D-038) |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
