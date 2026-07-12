# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-056); itens `deferred` reabrem no grilling da fase.

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
✅ #170 Dev local: toolchain → D-049 (4 ferramentas; Node pin duplo; sem pin nas outras; ngrok opcional)
✅ #171 Dev local: runbook de bootstrap → D-050 (checklist ordenado, só local, staging/prod fora)
✅ #172 Dev local: estratégia de mock de integrações → D-051 (happy-path + override booleano por vendor, sem tipos parametrizados)
🎉 **#146 (Epic: Arquitetura da solução & ambientes) — fechado.** Todos os 26 sub-issues concluídos.
🔍 **Revisão pós-#146 encontrou 5 lacunas de arquitetura de domínio** nunca grilled — novo epic **#179** (Arquitetura de domínio — visitas, mensageria, RBAC, admin), separado de #146 (que cobriu só infra/ambientes).
✅ **#181 Tuya: viabilidade da API + modo de falha** → D-052 (leaf de maior risco de #179, fechado primeiro). `local-pool` e `tuya-live` são dois mecanismos co-iguais por trás de um adapter seam (D-017) — nenhum adiado; `local-pool` é só o default no lançamento (não espera confirmação da Cloud API); spike da Tuya Cloud API é escopo ativo de curto prazo em #77/#135, não condicional a volume. Resolve Q-006 (fallback) e um conflito real com D-039 (fechadura instalada, numa casa à venda, agora prod-only).
✅ **#180 Visitas: modelo de dados + verificação de identidade** → D-053. `client-match` primário para os dois fluxos (sem split, sem KYC SaaS); `staff-review` fila de exceção compartilhada (automática ou WhatsApp), sempre registrada, nunca atalho de acesso. Reuso via `Cliente.identity_verified_at` (12 meses); retenção diferenciada por artefato. Modelo `Cliente`/`verification_attempt`/`visit` substitui a tabela legada; hard gate antes de `provisionAccess`. Resolve Q-005.
✅ **#182 Mensageria: WhatsApp/Telegram — provider + gatilhos + consentimento** → D-054. Split por direção — WhatsApp sempre para parte externa (visitante/cliente/corretor), Telegram só interno (justificado tecnicamente, não por custo); corrige D-017. Consentimento: transacional implícito, marketing opt-in explícito (nomeado, não construído). Provider deferido a #75 (mesmo padrão do 2º lock de Tuya); envio sempre via QStash.
✅ **#183 RBAC: modelo de papéis e permissões** → D-055. Enum único (`cliente`/`corretor`/`staff`/`admin`), sem multi-atribuição; Digital/Sócio são fatos organizacionais, não papéis. Admin ⊇ Staff na avaliação, não no armazenamento. Enforcement em duas camadas (app + RLS). `Visitante` não armazenado.
✅ **#184 Admin: resolução do conflito build-vs-buy** → D-056 (última leaf de #179). Reframe: "sem admin bespoke" fica escrito só para edição de conteúdo (mantido); UI de fluxo operacional é categoria nova com teste de três partes. `/staff/*` único, gateado via hierarquia de D-055. Emenda direta ao requirement em `platform-architecture`.
🎉 **Epic #179 (Arquitetura de domínio) — fechado.** Todas as 5 leaves concluídas (#180–#184).
→ PRÓXIMO: Passo 5 (Jornadas, epic #176) ou #29–31/#140 (v2/v3 deferred, já em #81/#98/#130).
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
- [x] #178 — remove GitHub Action redundante de portal build-info (race com pushes)
- [x] **#170** — Dev local: toolchain → D-049 (4 ferramentas; Node pin duplo; sem pin nas outras; ngrok opcional)
- [x] **#171** — Dev local: runbook de bootstrap → D-050 (checklist ordenado, só local, staging/prod fora)
- [x] **#172** — Dev local: estratégia de mock de integrações → D-051 (happy-path + override booleano por vendor)
- [x] Epic **#146** — todos os 26 sub-issues fechados (última: #172)
- [x] **#181** — Tuya: viabilidade da API + modo de falha → D-052 (leaf de maior risco de #179; `local-pool` + `tuya-live` co-iguais via adapter seam; resolve Q-006 e conflito com D-039)
- [x] **#180** — Visitas: modelo de dados + verificação de identidade → D-053 (`client-match` primário nos dois fluxos; `staff-review` fila de exceção; reuso via Cliente 12 meses; retenção diferenciada; hard gate ao adapter Tuya; resolve Q-005)
- [x] **#182** — Mensageria: WhatsApp/Telegram — provider + gatilhos + consentimento → D-054 (split por direção; corrige D-017; consentimento transacional/marketing; provider deferido a #75; envio via QStash)
- [x] **#183** — RBAC: modelo de papéis e permissões → D-055 (enum único, sem multi-papel; Admin ⊇ Staff na avaliação; enforcement em duas camadas; Visitante não armazenado)
- [x] **#184** — Admin: resolução do conflito build-vs-buy → D-056 (reframe conteúdo vs. workflow operacional; teste de três partes; `/staff/*` único; emenda a `platform-architecture`)
- [x] Epic **#179** — fechado (board Done), todas as 5 leaves concluídas

## Próxima sessão

- [ ] Avaliar próximo passo: Passo 5 (Jornadas, epic #176) vs. #29–31/#140 (v2/v3 deferred, já em #81/#98/#130)
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
