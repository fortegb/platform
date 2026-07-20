# STATUS — ForteGB

> **Bússola de sessão** — após `rbo-catch-up`.  
> **Repo:** `fortegb/platform` · **Board:** GitHub Project `platform`  
> **Espinha:** [`roteiro.md`](./docs/planning/roteiro.md) — 9 passos, gates G1/G2/G3.  
> **Decisões técnicas:** fechadas (D-015..D-067); itens `deferred` reabrem no grilling da fase.

---

## Passo atual (Roteiro)

**Passo 6 — Design system. Passo 5 (Jornadas) fechado. Build (passo 8) GATED por G2 até a Definição (passos 1–7) fechar — falta 6 (Design system) + 7 (Versionamento).**

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
🧹 **Board hygiene:** #29/#30/#31/#140 (grilling `deferred` v2/v3 — visitas condomínio, media kit, mobile) re-tagged `Etapa 4 → 8 Execução` (já estavam re-parented sob #81/#98/#130) — `mapa-roteiro.html` agora computa **passo 5** como current corretamente.
✅ **Passo 5 (Jornadas, epic #176) — 11 leaves criadas** (#185–#195), uma por jornada (não por role): descoberta do site, visita agendada, visita instantânea QR, pós-visita, onboarding corretor, registro de cliente/comissão, pipeline corretor, fila de exceção de verificação, operação diária staff, gestão de acesso Tuya, config de plataforma/papéis.
✅ **#185 Descoberta e navegação do site** → D-057. Sem conflito com RBAC/mensageria; gap real corrigido — clique em CTA WhatsApp passa a capturar lead (fire-and-forget, `fonte: cta-whatsapp`), reaproveitando `POST /api/contact`.
✅ **#186 Visita agendada** → D-058. Stub pré-arquitetura tinha lacunas estruturais (fallback silencioso, sem reuso 12 meses, sem fila de exceção) — corrigidas. Exceção escala assincronamente (folga de tempo, diferente do instantâneo).
✅ **#187 Visita instantânea via QR** → D-059. Mesmas correções de #186; regra "sem espera síncrona" de D-053 implementada pela 1ª vez. **Reabre D-053** — mecanismo de renovação limitada (código WhatsApp estende `identity_verified_at`, teto de 24 meses de `last_client_match_at`).
✅ **#188 Pós-visita e reengajamento** → D-061. Greenfield. Cancelamento/reagendamento self-service via magic link; novo status `cancelled`; `revoke()` do adapter Tuya ganha primeiro caller real; follow-up classificado por timing (resolve #141).
✅ **#189 Onboarding do corretor** → D-062. Corrigido contra D-055 (`role`/`status`, não `realtors`); associação por casa incorporada (rascunho §4.2, sem leaf própria antes); staff faz upload do contrato assinado (upload = aprovação). **Reabre `crm-source-of-truth`** — `registro.corretor_id` exige `corretor_casa` aprovado.
✅ **#190 Registro de cliente e proteção de comissão** → D-063. Corrige bug real de condição de corrida (check-then-insert) com constraint de unicidade no banco; CPF obrigatório (nível Cliente, não Contato). Lacuna encontrada: CPF do próprio corretor nunca exigido → issue separada **#196** (D-068, fechada).
✅ **#191 Pipeline e dashboard do corretor** → D-064. `registro.status` definido pela 1ª vez (enum focado em negócio, não duplica `visit.status`).
✅ **#192 Fila de exceção de verificação** → D-060. Primeira leaf greenfield sem stub para corrigir. Rejeição notifica visitante (gap de D-053 fechado); alerta Telegram a staff.
✅ **#193 Operação diária do staff** → D-065. Staff-wide (não escopado por corretor); entrada manual nível Contato; resumo de pendências linkando #189/#192.
✅ **#194 Gestão de acesso Tuya** → D-066. Re-confirmação pura de D-052/D-056 (Supabase Studio, sem UI) — nada mudou na escala.
✅ **#195 Configuração de plataforma e papéis** → D-067. Duas contradições reais corrigidas: rotas `/admin/*` → `/staff/*` (D-056); chaves API vira somente-leitura (D-043, edição só por ForteGB tech). Modo manutenção = flag viva no Supabase (exceção deliberada ao padrão vendor-native). Ocultar-casa → Sanity Studio nativo.
🎉 **Epic #176 (Jornadas, telas e fluxos) — fechado.** Todas as 11 leaves concluídas (#185–#195). **Passo 5 concluído.**
✅ **#196 CPF do corretor obrigatório no onboarding** → D-068 (reabre D-062). Último item aberto de Passo 5 fechado.
✅ **Passo 6 (Design system) — estrutura de issues definida.** Epic #67: #68 reescopado (deriva de Home existente, não bloqueia em brand guide) e #70 reescopado (roda uma única vez ao final + guia de voz e tom). 11 leaves de design por jornada (#197–207, mesma granularidade das jornadas de Passo 5) + 4 varreduras de tokenização por seção de persona (#208–211). Runbook: [`design-system-fluxo.md`](./docs/planning/design-system-fluxo.md). Nenhum D-number novo — puramente estrutural/processo, sem decisão de arquitetura.
🎉 **#197 (Descoberta do site) — FECHADA** (arquivada, merge em `main`). Primeira das 11 leaves de design do Passo 6. #68 fechado como *not planned*, absorvido em #197 (redundante — #197 já toca os mesmos arquivos e roda primeiro na sequência). Fundação de tokens aplicada (`whatsapp` token, CSS morta removida, `Hero.vue` consolidado). Bug separado corrigido: **#212** (footer hover invisível) — fechado. `/portfolio` e `/portfolio/[slug]` com passe extenso de UX/design (ver `openspec/changes/design-descoberta-site/tasks.md` seções 6–7: sort por status, galeria categorizada de 30 fotos/casa, lightbox, aba de vídeo com nav, hierarquia de botões). Home (4 valores de marca reescritos: Transparência/Segurança/Parceria/Solidez), Sobre (história/missão/visão reescritos, valores duplicados removidos), Contato (redesign mais leve, bugs de cor/telefone corrigidos), Legal (privacidade/termos restilizados), Blog (redesign do card + plugin `@tailwindcss/typography` instalado de verdade — fecha o bug recorrente de `.prose` no-op; depois os itens de modernização — fotos reais distintas, post em destaque com altura fixa `h-96` no card, tagline de intro, abas de categoria; micro-CTA de WhatsApp na listagem foi implementado e depois removido a pedido do usuário — botão flutuante já basta — tasks.md 14.4) também concluídos nesta leaf (tasks.md seções 9–14). Branch `feat/design-descoberta-site`. `npm run build` limpo após 14.4.
→ PRÓXIMO: **#198** (próxima leaf de design do Passo 6) — ver `design-system-fluxo.md` para a sequência das 11 leaves (#197–#207) + 4 varreduras de tokenização (#208–#211). #197 entrega a fundação de tokens que as demais herdam. G2 (gate do build) ainda fecha só depois do Passo 7 (Versionamento).
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

## Esta sessão (Claude Code — 2026-07-12/13)

- [x] **#185** — Descoberta e navegação do site → D-057 (lead capture em CTA WhatsApp)
- [x] **#186** — Visita agendada → D-058 (correções estruturais vs. stub pré-arquitetura)
- [x] **#187** — Visita instantânea via QR → D-059 (reabre D-053 — renovação limitada por telefone)
- [x] **#188** — Pós-visita e reengajamento → D-061 (greenfield — magic link, `cancelled`, `revoke()`)
- [x] **#189** — Onboarding do corretor → D-062 (reabre `crm-source-of-truth` — amarra `corretor_casa`)
- [x] **#190** — Registro de cliente e proteção de comissão → D-063 (bug de corrida corrigido, CPF obrigatório)
- [x] **#191** — Pipeline e dashboard do corretor → D-064 (`registro.status` definido)
- [x] **#192** — Fila de exceção de verificação → D-060 (primeira leaf greenfield)
- [x] **#193** — Operação diária do staff → D-065 (staff-wide, puramente consumidora)
- [x] **#194** — Gestão de acesso Tuya → D-066 (re-confirmação pura, sem build)
- [x] **#195** — Configuração de plataforma e papéis → D-067 (rotas `/admin/*` → `/staff/*`; chaves API somente-leitura)
- [x] Epic **#176** — fechado (board Done), todas as 11 leaves concluídas. **Passo 5 concluído.**
- [x] Issue separada **#196** (CPF do próprio corretor, reabre D-062) aberta durante a exploração de #190 → **#196** — CPF obrigatório no onboarding → D-068 (reabre D-062, mesmo tratamento de #187/#189). Último item aberto de Passo 5 fechado.

## Esta sessão (Claude Code — 2026-07-14)

- [x] Consolidação do Hero identificada (não implementada) — `HeroSplit`/`HeroSlate`/`HeroAzul` viram 1 componente + prop de variante; `HeroClassic` fica separado. D-021 (escolha de produção) segue diferida. Escopo de #68.
- [x] #68 reescopado — "Fundação de tokens web (derivada do Home existente)", não bloqueia mais em #40
- [x] #70 reescopado — "Gerar design system (docs, componentes, style guide)" + guia de voz e tom (WhatsApp/Telegram)
- [x] 11 leaves de design criadas (#197–207) — journey-level, sub-issues de #67. Gap sinalizado: `/staff/registros` sem jornada de Passo 5 que a valide (nota em #207)
- [x] 4 varreduras de tokenização criadas (#208–211), uma por seção de persona
- [x] Runbook `docs/planning/design-system-fluxo.md` criado; `phases.md` atualizado (tabela Epic\|Doc/runbook + checklist Epic #67)
- [x] `ROADMAP.md` regenerado; Platform docs sincronizados (`pages:portal` + `progress:report` + `pages:build-info`)
- [x] Fix ambiente: erro de push "LFS lock verify" — causa real é o repo não ter conteúdo LFS de fato (endpoint `/locks/verify` retorna 403 mesmo com credencial válida); fix correto = `git config lfs...locksverify false` por repo, não credencial. Keychain tinha entrada obsoleta da conta `fortegb` (pré-migração de org) — removida por higiene, mas não era a causa.

## Esta sessão (Claude Code — 2026-07-15/16)

- [x] Catch-up (L2), handoff de 2026-07-14 consumido
- [x] #68 fechado (*not planned*) → merged into #197; branch/change renomeados para `feat/design-descoberta-site` / `design-descoberta-site`
- [x] Fundação de tokens aplicada — `whatsapp`/`whatsapp-hover` no `tailwind.config.js`, `.btn-secondary`/`.btn-primary` mortos removidos de `main.css`, `HeroSplit`/`HeroSlate`/`HeroAzul` → `Hero.vue` (prop `variant`), `docs/planning/design-tokens.md` escrito
- [x] Gap de issue-body shift encontrado e corrigido em #197–#208 (corpos rotacionados uma posição, título de cada issue não batia com o corpo)
- [x] **#212** (footer `hover:text-primary` invisível sobre `bg-primary-500`) — issue própria, branch própria, fechada
- [x] `/portfolio`: sort por status (disponível > em construção > resto), filtro de busca oculto (poucas casas), preço/CTA ocultos quando vendido, foto linkada ao detalhe, `featured` explícito para a home, inventário mock corrigido (3 vendido/2 em-construção/1 disponível)
- [x] `/portfolio/[slug]`: galeria categorizada (30 fotos/casa × 5 categorias, sem exigência de match de conteúdo por pedido explícito), lightbox (click, prev/next, teclado, Esc), aba "Vídeo" com nav prev/next (1–3 vídeos reais testados), `features` (checklist) e `gallery[].category` documentados no content model CMS (D-036)
- [x] Hierarquia visual: badges viraram texto+ícone, abas de categoria viraram underline (não mais pills com borda), "Ver Detalhes" virou link de texto (só "Agendar Visita" fica botão)
- [x] `docs(cms)`: `features` + `gallery[].category` adicionados ao `cms-content-model.md` (gap igual ao achado com `featured`)
- [x] `openspec/changes/design-descoberta-site/tasks.md` atualizado (seções 6–7) refletindo todo o trabalho de `/portfolio`

## Esta sessão (Claude Code — 2026-07-17)

- [x] Floor plans: mocks → imagem real fornecida pelo usuário ("Projeto.png") → `FloorplanViewer.vue` com zoom (10% steps, 50–400%, drag-to-pan, atalhos de teclado)
- [x] Descrição/features da Vila Verde expandidas a partir de fatos ditados; fix de renderização de parágrafo (string única → array) em todas as casas mock
- [x] Modelo de conteúdo CMS: galeria agrupada por categoria, novo tipo `galleryCategory`, `fullDescription` como array de parágrafos, 3 campos de "nome" separados (Sanity `title` vs. Supabase `houseNumber`/`lotCode`) — `docs/planning/templates/cms-content-model.md`
- [x] Home: 4 valores de marca reescritos (Transparência/Segurança/Parceria/Solidez, era Transparency/Trust/Closeness/Openness) — várias rodadas de crítica; `AGENTS.md` §2.1 atualizado como fonte canônica; botões CTA padronizados; logo recortada; número de WhatsApp corrigido em todo o site
- [x] Footer: "Links Rápidos" virou lista vertical (igual "Legal")
- [x] Sobre: "Nossa História/Missão/Visão" reescritos a partir de fatos reais ditados pelo usuário; bloco "Nossos Valores" (duplicado do Home) removido
- [x] Contato: redesign mais leve (crítica "muito chrome"), cor do botão WhatsApp e formatação de telefone corrigidas
- [x] Privacidade/Termos: restilizados para bater com Sobre; telefone/endereço obsoletos removidos
- [x] Blog: redesign do card de listagem (mais leve, mesma crítica do Contato), plugin `@tailwindcss/typography` instalado (fecha o bug recorrente de `.prose` no-op — 4ª ocorrência, 1ª vez com fix real em vez de workaround manual), cor do botão WhatsApp corrigida
- [x] 6 commits + push em `feat/design-descoberta-site` (nada arquivado ainda)
- [ ] 5 melhorias de modernização do Blog acordadas mas não implementadas: fotos mais realistas, post em destaque, tagline de intro, abas de filtro por categoria, micro-CTA de WhatsApp na listagem

## Próxima sessão

- [ ] `/blog`: implementar as 5 melhorias de modernização acordadas (ver seção acima e tasks.md 14.4)
- [ ] Depois: confirmar com o usuário se `/portfolio`, `/sobre`, `/contato`, `/legal`, `/blog` estão todos prontos, ou se falta mais alguma revisão antes de considerar #197 pronto para archive
- [ ] (paralelo) Brand assets #2 — reescopado: só #39 (logo em SVG) segue aberto, depende de asset do usuário. Favicon feito (derivado do logo do header). #40 fechada (superseded por #70), #41 → Etapa 8
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
| [design-system-fluxo.md](./docs/planning/design-system-fluxo.md) | Runbook Passo 6 — fluxo, granularidade de leaves, tabela de issues |
| [design-tokens.md](./docs/planning/design-tokens.md) | Inventário de tokens web (fundação #197) |
| [roteiro.md](./docs/planning/roteiro.md) | Espinha |
| [ai-skills v0.6.0](https://github.com/rbonon/ai-skills/releases/tag/v0.6.0) | stage + close skills |
