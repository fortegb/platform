# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-034); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 4 — Arquitetura. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar.**

```
✅ Passos 1–2 → D-028
✅ A1–A4 ambientes → D-025..D-027, D-029
✅ B1–B4 Dados Supabase → D-030..D-033
✅ C1/#155 CMS vendor → D-034 (Sanity)
→ EM CURSO passo 4: Epic **#146** — restantes (#156–172)
→ PRÓXIMO: #156 — CMS: environments/datasets por ambiente
⚠️ Lacuna: rbo-close-change ainda merge→main até #166
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10)

- [x] B4/#154 seed/LGPD closed
- [x] C1/#155 Sanity vendor + Contentful cleanup

## Próxima sessão

- [ ] **#156 — CMS datasets por ambiente**
- [ ] #166 quando priorizar (lifecycle config no skill)
- [ ] (paralelo) Brand assets (#2)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + Supabase + seed |
| [templates/cms-vendor.md](./docs/planning/templates/cms-vendor.md) | Vendor CMS = Sanity |
| [templates/seed-lgpd.md](./docs/planning/templates/seed-lgpd.md) | Contrato seed / LGPD não-prod |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
| [mapa-roteiro.html](./docs/planning/mapa-roteiro.html) | Mapa live do board |
