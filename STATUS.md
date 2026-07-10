# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-036); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 → D-028
✅ A1–A4 ambientes → D-025..D-027, D-029
✅ B1–B4 Dados → D-030..D-033
✅ C1–C3 CMS → D-034..D-036 (Sanity + datasets + content model)
→ EM CURSO passo 4: Epic **#146** — restantes (#158–172)
→ PRÓXIMO: #158 — Integrações: modelo 3-tiers
⚠️ Lacuna: rbo-close-change ainda merge→main até #166
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] C1/#155 Sanity vendor closed
- [x] C2/#156 datasets closed
- [x] C3/#157 content model → PAC

## Próxima sessão

- [ ] **#158 — Integrações: modelo 3-tiers**
- [ ] #166 quando priorizar
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + Supabase + Sanity |
| [templates/cms-content-model.md](./docs/planning/templates/cms-content-model.md) | Types + house split (D-036) |
| [templates/cms-vendor.md](./docs/planning/templates/cms-vendor.md) | Vendor + datasets |
| [templates/environments.md](./docs/planning/templates/environments.md) | Contrato técnico |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
