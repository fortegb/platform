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
🎉 **#198 (Agendar visita) — FECHADA.** Segunda leaf de design do Passo 6. Rota única com 3 estados virou **3 rotas com 19 estados** (formulário · handoff de verificação · resultado token-keyed com 7 variantes). Matriz de visita por status da casa (autoguiada só em `disponivel`), novo status `na-planta`, CPF obrigatório (D-020 já exigia), e **D-070** — verificação de identidade passa a usar serviço externo (Didit, plano gratuito) atrás de adapter, com retenção por pegar-e-apagar; emenda D-053. Três regras de escopo do Passo 6 registradas em `design-system-fluxo.md`. 5 issues derivadas: #213–#217.
🎉 **#199 (Visita QR) — FECHADA.** Terceira leaf de design do Passo 6. Mesmo stub pré-arquitetura do #198 virou **3 rotas** no namespace `/visita/qr/[code]` (identificação · verificação identidade-ou-OTP · resultado). Os três estados que D-059 torna únicos ao fluxo instantâneo ("sem folga de tempo"): porta-OTP de reuso (`phone-otp` + teto de 24 meses), recusa imediata com saída via WhatsApp (não o recibo assíncrono de #198), e falha de acesso visível (sem código, equipe avisada). Novo composable `useQrVisit`; `journey-instant-visit` ganha Purpose escrito. CTAs full-width no mobile (fluxo lido na porta, uma mão). Tokenização Pass 4 limpa. Sem D-number novo — herda D-059/D-070. Nenhuma issue derivada.
🎉 **#200 (Gerenciar visita) — FECHADA.** Quarta leaf de design do Passo 6. Rota greenfield `/visita/gerenciar/[token]` — a página que o botão "Cancelar ou remarcar" do #198 apontava no vazio (jornada #188/D-061, self-service sem login). Todos os ramos: 3 acionáveis (agendada · código vivo · em análise) + 4 terminais (cancelada · realizada · recusada · expirada) + link inválido. Cancelar sempre confirma, com aviso ciente do estado (nomeia o código e avisa da desativação no ramo provisionado — o que chama `revoke()`). **D-071** (emenda a D-061): remarcar cancela só na confirmação do novo horário, não ao clicar — abandonar o formulário não deixa o visitante sem visita. Estado de "chegada por remarcação" desenhado no formulário de agendamento (achado na validação): título "Remarcar visita" + aviso de contexto. Aviso de condomínio universal inline. `journey-post-visit-reengagement` ganha Purpose escrito. Tokenização Pass 5 limpa — fecha a cobertura de visitante/cliente (#197–#200), varredura de seção é #208. D-071 registrada nos dois logs.

→ PRÓXIMO: **[#201 — Design e tokenização: Onboarding do corretor](https://github.com/fortegb/platform/issues/201)** — rotas `/login`, `/corretor/onboarding/*`, `/corretor/casas/[id]/contrato`. Base de jornada: [#189](https://github.com/fortegb/platform/issues/189)/D-062 (onboarding do corretor, upload de contrato = aprovação; CPF obrigatório por D-068). Primeira leaf da **seção Corretor** (muda de persona: visitante/cliente → corretor). Ver `design-system-fluxo.md` para a sequência das 11 leaves (#197–#207) + 4 varreduras (#208–#211). **`v0 — Definição` (gate G2): 14 abertos**, só trabalho nosso — nada esperando asset externo. G2 ainda fecha só depois do Passo 7 (Versionamento).
✅ `origin/staging` ainda ausente (criação adiada ao bootstrap de Execução, [#42](https://github.com/fortegb/platform/issues/42)/[#46](https://github.com/fortegb/platform/issues/46)), mas a contradição foi **resolvida em 2026-07-19**: `.rbo/lifecycle.yml` ganhou `integrationBranchPending: true`, sinal explícito que as skills leem — `rbo-stage-change` para com mensagem clara (estado esperado, não erro) e `rbo-close-change` merge `feat/*`→`main` direto, conforme D-046. **Remover o flag quando `origin/staging` existir**, senão o lifecycle de integração vira no-op silencioso
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

## Esta sessão (Claude Code — 2026-07-19)

- [x] Trabalho não commitado de uma sessão anterior recuperado da working tree (a sessão em si tinha sido apagada, mas o git não perde estado): varredura de tokenização Pass 2 + dedupe de WhatsApp
- [x] **Dedupe de WhatsApp terminado** — o passe anterior tinha migrado 5 de 8 arquivos; `contato.vue`, `blog/[slug].vue` e `portfolio/[slug].vue` ainda carregavam o path SVG (~700 chars) e a construção manual da URL `wa.me` duplicados. Agora os 8 CTAs passam por `WhatsAppIcon.vue` + `useWhatsApp()`
- [x] **Tokenização verificada de forma independente** nos 26 arquivos em escopo — zero hex, zero utilitário de cor arbitrário, zero cor crua da paleta Tailwind. Confirma o relatório do Pass 2. (Nota de método: a 1ª varredura tinha `2>/dev/null` e teria reportado "limpo" mesmo sem ler nada — refeita sem supressão de erro)
- [x] Nomes de rota obsoletos corrigidos no `tokenization-report.md` (`/azul`→`/gradient`, `/classico`→`/hero`); larguras de CTA do `portfolio/[slug]` normalizadas de `max-w-[200px]` para `w-44` (px fixo não acompanha a escala global de 81.25%, rem acompanha)
- [x] 🎉 **[#197](https://github.com/fortegb/platform/issues/197) fechada** — archive (`2026-07-19-design-descoberta-site`), nova capability `design-tokens` promovida a `openspec/specs/`, 23/23 specs validam strict, merge em `main`, board Done, ROADMAP + Platform docs sincronizados, branch deletada
- [x] **Epic [#2](https://github.com/fortegb/platform/issues/2) fechado** — escopo dissolvido: [#40](https://github.com/fortegb/platform/issues/40) superseded por [#70](https://github.com/fortegb/platform/issues/70); [#41](https://github.com/fortegb/platform/issues/41) → Etapa 8 sob [#56](https://github.com/fortegb/platform/issues/56); [#39 Logo em SVG](https://github.com/fortegb/platform/issues/39) → Etapa 8 sob [#98](https://github.com/fortegb/platform/issues/98), junto de [#69](https://github.com/fortegb/platform/issues/69), seu único consumidor real
- [x] **Favicon real feito** (`ff0492f`) — derivado do mark do logo do header sobre navy `#203045`. O `favicon.ico` anterior tinha 14 bytes de texto ASCII (placeholder), então toda aba mostrava o ícone padrão. Análise do PNG mostrou que o mark é geometria de cor chapada (~95% dos pixels opacos numa faixa de luminância de 16 níveis) — vetorização automática funciona se o arquivo original tiver se perdido
- [x] 🚨 **Higiene de milestone `v0` — destravou o portão do build.** `v0 — Definição` é o gate G2 e deve conter só Etapa 1–7, mas tinha 8 itens de Etapa 8: [#29](https://github.com/fortegb/platform/issues/29)/[#30](https://github.com/fortegb/platform/issues/30)/[#31](https://github.com/fortegb/platform/issues/31)/[#140](https://github.com/fortegb/platform/issues/140)/[#41](https://github.com/fortegb/platform/issues/41) + [#39](https://github.com/fortegb/platform/issues/39)/[#69](https://github.com/fortegb/platform/issues/69)/[#71](https://github.com/fortegb/platform/issues/71). Na prática **o build inteiro estava refém de um arquivo de logo vetorial**. `v0`: 24 → 16 abertos. Regra registrada em `roteiro.md`
- [x] **2 bugs corrigidos no repo `ai-skills`** (`18c84b3`): (1) `gh project item-list` tem limite default de **30** — `rbo-create-issue` sobrescrevia o `ROADMAP.md` sem `--limit` (211 → 30 linhas, destrutivo e silencioso), `rbo-close-change` usava 200 contra 211, `rbo-create-change` mostrava só 30 issues para o usuário escolher, `rbo-catch-up` orientava a partir de board truncado; (2) `rbo-close-change` interpolava `.title` (snapshot em cache do item) em vez de `.content.title`, então issue renomeada mantinha o nome antigo no ROADMAP para sempre
- [x] **D-069** — mecanismo para a janela pré-`staging` (`integrationBranchPending`). Correção de rumo: eu tinha declarado "sem D-number novo" nesta sessão, mas o flag **emenda a cláusula fail-closed de D-045**, e emenda a decisão fechada se registra (mesmo tratamento de #187→D-053, #189→`crm-source-of-truth`, #196→D-062). O comportamento em si não era novo — D-046 já o acordara como "gap temporário"; faltava só mecanismo. D-045 e D-046 agora referenciam D-069 nos dois sentidos

- [x] `agents.md` → **`AGENTS.md`** (único arquivo minúsculo na raiz; invisível no FS case-insensitive do macOS, apareceu quando `git add AGENTS.md` não casou nada). Ponteiros vivos corrigidos em `project-method/spec.md` e `roteiro.md`; menções no CHANGELOG ficam como registro histórico
- [x] **Regra nova em `AGENTS.md`: "Consultar o canon antes de propor mecanismo"** — ler `decisions.md` e dizer o que encontrou antes de desenhar solução; se já houver decisão, citar e parar. E: correção do usuário não é pedido de trabalho. Escrita a partir da falha desta sessão (D-046 já resolvia o caso do `integrationBranchPending`)
- [x] **Dois logs de decisão sincronizados** — root `DECISIONS.md` estava em D-068; D-069 fora só para `docs/planning/decisions.md`. Ambos terminam em D-069 agora. Investigado: não é split por tamanho — os dois foram criados independentemente em 2026-07-01 (`efc0e74` e `41eb866`); nenhum é auto-carregado, então o custo é dupla-entrada, não contexto. **Decidir qual é canônico ou escrever nos dois** segue em aberto

## Esta sessão (Claude Code — 2026-07-20)

- [x] Catch-up (L2), handoff de 2026-07-19 consumido
- [x] **#198** — 2ª leaf de design do Passo 6. Walkthrough estado a estado com o usuário (19 estados) antes de qualquer código
- [x] **Rota única virou 3 rotas** — `/visita/agendar/[houseId]` (form), `.../verificacao` (handoff), `/visita/[token]` (resultado, 7 variantes). Variante vem do status guardado, nunca da URL
- [x] **Matriz de visita por status** — autoguiada só em `disponivel`; guiada (#213) em `disponivel`+`em-construcao`; sem visita no resto. `composables/useHouseStatus.ts` como fonte única
- [x] **Novo status `na-planta`** + CPF obrigatório no formulário (D-020 já exigia, stub nunca coletava)
- [x] **D-070** — verificação de identidade passa a serviço externo (Didit, plano gratuito, 500/mês) atrás de adapter; retenção por pegar-e-apagar (baixa o arquivo, apaga a sessão); marca própria só no lançamento. **Emenda D-053** ("sem KYC SaaS") — o que mudou foi o ponto de observação: upload de arquivo não prova presença, e o volume real (~5 visitas/mês) derruba o argumento de custo
- [x] **3 regras de escopo do Passo 6** em `design-system-fluxo.md`: toda tela desenhada no Passo 6; telas não compartilhadas entre jornadas; todo ramo desenhado, feliz e triste
- [x] **Bug de roteamento Nuxt** — `[houseId].vue` ao lado de uma pasta `[houseId]/` vira layout pai; a rota de verificação renderizava o formulário silenciosamente
- [x] **Auditoria Pass 3 limpa.** A 1ª execução não leu nada (globs de shell comeram `[houseId]`/`[token]`) — só apareceu porque roda sem `2>/dev/null`
- [x] **Regra nova em `AGENTS.md`: "Como responder ao usuário"** — resposta curta para pergunta simples, uma pergunta por vez, sem jargão nem siglas, issue sempre com título, recomendar em vez de inventariar
- [x] 5 issues derivadas: **#213** (visita guiada), **#214** (janela de acesso e espaçamento), **#215** (staff agenda visita), **#216** (mídia por WhatsApp/LGPD), **#217** (spike do serviço de verificação)

## Próxima sessão

- [ ] **Começar [#199 — Design e tokenização: Visita QR](https://github.com/fortegb/platform/issues/199)** via `rbo-create-change`. 3ª das 11 leaves, sem `Depends on:`. Rota `/visita/qr/[code]`, base de jornada [#187](https://github.com/fortegb/platform/issues/187)/D-059 — que **reabriu D-053** exigindo posse do telefone no reuso de 12 meses só neste fluxo. Herda de #198 o handoff de verificação e a tela de resultado; a diferença real é não haver folga de tempo (o visitante está na porta)
- [ ] Depois: [#199](https://github.com/fortegb/platform/issues/199)–[#207](https://github.com/fortegb/platform/issues/207) (leaves restantes), [#208](https://github.com/fortegb/platform/issues/208)–[#211](https://github.com/fortegb/platform/issues/211) (varreduras de tokenização), [#70](https://github.com/fortegb/platform/issues/70) por último
- [x] ~~Run `setup_ai` / `dotfiles_update`~~ — verificado: `~/.claude/skills/rbo-*` apontam direto para o working dir do `ai-skills`, então as correções de hoje **já estão ativas** nesta máquina. Outras máquinas ainda precisam de `dotfiles_update`

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
