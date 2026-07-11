# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-048); itens `deferred` reabrem no grilling da fase.

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
✅ #166 CI/CD lifecycle → D-045 + `.rbo/lifecycle.yml` (skills ai-skills v0.6.0)
✅ #167 CI/CD pipeline de deploy branch→Vercel → D-046 (decisão apenas; sem provisionamento)
✅ #168 CI/CD automação de migrações → D-047 (manual, não CI; gatilhos stage/close; rastreabilidade por commit)
✅ #169 CI/CD processo de promoção/hotfix → D-048 (1x1 promotion, hotfix/* bypass, sync obrigatório, registro normal)
→ PRÓXIMO: #170 — Dev local: toolchain (Node, Docker/OrbStack, Supabase CLI, ngrok)
⚠️ `origin/staging` ainda ausente — criação adiada para bootstrap de Execução (#42/#46); `rbo-stage-change` falha de propósito até lá; leaves de Definição fecham `feat/*`→`main` direto nesse meio-tempo (D-046)
✅ mapa-roteiro.html gerado do board (com progress:report)
```

---

## Esta sessão (Cursor — 2026-07-10) — encerrada

- [x] #158–#165 integrações + config → PAC
- [x] ai-skills #5 / v0.6.0 — `rbo-stage-change` + close 0.3
- [x] **#166** — D-045 + lifecycle.yml → closed
- [x] Fix: `.rbo/lifecycle.yml` comments → en-US

## Esta sessão (Claude Code — 2026-07-11)

- [x] **#167** — CI/CD: pipeline de deploy (branch→Vercel) → D-046 (gatilho, gate de merge, rollback, notificações, timing de `origin/staging`)
- [x] Board hygiene: re-parented #29/#140→#81, #30→#98, #31→#130; epic #175 Etapa 1→2 (Passo 2 agora aparece no relatório)
- [x] **#168** — CI/CD: automação de migrações (aplicar on merge) → D-047 (manual, gatilhos stage/close, rastreabilidade por commit, sem detector automático)
- [x] ai-skills #9/v0.6.4 — conditional migration trigger em `rbo-stage-change`/`rbo-close-change`
- [x] ai-skills #10/v0.7.0 — uniform hotfix exception (`rbo-create-change` 0.3, `rbo-close-change` 0.5)
- [x] **#169** — CI/CD: processo de promoção/release (staging→main) → D-048 (1x1 promotion, hotfix/* bypass, sync obrigatório, registro normal)

## Próxima sessão

- [ ] **#170** — Dev local: toolchain (Node, Docker/OrbStack, Supabase CLI, ngrok)
- [ ] #171+ restantes de Etapa 4
- [ ] (paralelo) Brand assets (#2)
- [ ] Run `setup_ai` / `dotfiles_update` if `rbo-stage-change`/`rbo-create-change`/`rbo-close-change` symlinks stale (ai-skills v0.7.0)

---

## Links

| Doc | Uso |
|-----|-----|
| [ambientes.html](./docs/planning/ambientes.html) | Ambientes + integrações |
| [SETUP-CREDENTIALS.md](./docs/SETUP-CREDENTIALS.md) | Runbook credenciais (sem secrets) |
| [.env.example](./.env.example) | Template de env (raiz) |
| [templates/env-example.md](./docs/planning/templates/env-example.md) | Ponteiro D-044 |
| [`.rbo/lifecycle.yml`](./.rbo/lifecycle.yml) | Opt-in stage/close (D-045) |
| [handoff.md](./docs/planning/handoff.md) | Último handoff de sessão (para o próximo agente) |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
| [ai-skills v0.6.0](https://github.com/rbonon/ai-skills/releases/tag/v0.6.0) | stage + close skills |
