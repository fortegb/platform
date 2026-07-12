# CHANGELOG — ForteGB

> Histórico do que foi feito.
> **Estágio preliminar:** ainda **sem números de versão** — entradas registradas por **data** sob "Não versionado". A numeração semântica (ex.: `v1.0.0`) virá no futuro.

---

## Não versionado

### 2026-07-12 — Arquitetura: mensageria WhatsApp/Telegram — provider + gatilhos + consentimento ([#182](https://github.com/fortegb/platform/issues/182))

- **D-054:** split por direção — WhatsApp sempre para qualquer parte externa (visitante, cliente, corretor); Telegram só para interno (staff/sistema, sem parte externa), justificado tecnicamente (sem aprovação de template, gratuito, setup trivial), não por preferência de custo. Corrige D-017 para o escopo exato onde "Telegram-first" ainda se aplica.
- Consentimento: transacional implícito (campo WhatsApp obrigatório do Cliente + ação tomada); marketing opt-in explícito, nomeado agora, não construído (v2+).
- Provider (WhatsApp Business API vs. Twilio) não escolhido nesta leaf — critérios documentados, escolha real → #75 (Execução), mesmo padrão do segundo lock de teste de Tuya.
- Envio sempre via QStash (D-017), nunca síncrono no handler da requisição. Mensageria é mais um vendor atrás do adapter seam existente.
- Novo `templates/mensageria-provider-gatilhos.md`. Nova capability OpenSpec `messaging-channel-policy`.

### 2026-07-12 — Arquitetura: visitas — modelo de dados + verificação de identidade ([#180](https://github.com/fortegb/platform/issues/180))

- **D-053:** `client-match` (biblioteca frontend, selfie vs. documento) é o mecanismo primário para os dois fluxos (agendado e instantâneo) — sem KYC SaaS, sem split por fluxo. `staff-review` é a fila de exceção compartilhada — automática (confiança baixa) ou pelo visitante via WhatsApp direto a staff; qualquer resolução gera um `verification_attempt` registrado, nunca um atalho de acesso ad hoc.
- Fluxo instantâneo em falha: sem espera síncrona ao vivo, recusa imediata + WhatsApp para staff como escape hatch (espelha o fallback de Tuya, D-052, invertido).
- Reuso via `Cliente.identity_verified_at` (janela de 12 meses); retenção diferenciada por artefato (selfie efêmera, documento retido enquanto a verificação estiver ativa — cobre danos/incidentes).
- Modelo de dados: `Cliente`/`verification_attempt`/`visit` substitui a tabela `visits` legada; hard gate — `provisionAccess` (adapter Tuya) só roda após `visit.status = verified`.
- Resolve `Q-005`. Novo `templates/visitas-identidade-modelo-dados.md`. Nova capability OpenSpec `visit-identity-verification`.

### 2026-07-11 — Arquitetura: Tuya — viabilidade da API + modo de falha ([#181](https://github.com/fortegb/platform/issues/181))

- **D-052:** dois mecanismos de primeira classe por trás de um adapter seam (D-017) — `local-pool` (pool de códigos pré-provisionados por casa, sem chamada Tuya Cloud API em tempo real crítico) é o default no lançamento; `tuya-live` (Tuya Cloud API real) fica disponível assim que um spike de curto prazo confirmar viabilidade, sem depender de crescimento de volume. Ambos ativos na arquitetura/jornada/grilling — nenhum adiado.
- Fallback: código de emergência estático por casa (keypad local) + reagendamento, nunca deslocamento de staff; detecção síncrona no momento da emissão; rotação mensal + imediata após uso; auditoria em tabela Supabase restrita (liga-se à epic LGPD #126–129).
- Resolve `Q-006` (fallback). Resolve conflito real com `D-039`: fechadura instalada (Intelar X2, numa casa à venda) declarada **prod-only**; segundo device de teste é pré-requisito antes de automação de safe-target (#77/#135).
- Novo `templates/tuya-access-adapter.md`. Nova capability OpenSpec `tuya-access`.

### 2026-07-11 — Dev local: estratégia de mock de integrações ([#172](https://github.com/fortegb/platform/issues/172))

- **D-051:** mock com happy-path por padrão + override booleano único por vendor (`MOCK_<VENDOR>_FORCE_ERROR`, convenção D-041); sem tipos de falha parametrizados; mock dentro do módulo adapter do vendor (D-017), sem diretório central. Docs only — código de mock → build.
- **Epic #146 (Arquitetura da solução & ambientes) — todos os 26 sub-issues fechados** com este leaf.

### 2026-07-11 — Dev local: runbook de bootstrap ([#171](https://github.com/fortegb/platform/issues/171))

- **D-050:** novo `templates/dev-local-bootstrap.md` — checklist ordenado clone→dev funcionando (toolchain D-049 → Supabase local D-032 → env vars D-044). Só local; staging/prod ficam para Execução (#42/#43/#46).

### 2026-07-11 — Dev local: toolchain ([#170](https://github.com/fortegb/platform/issues/170))

- **D-049:** inventário de quatro ferramentas (Node, Docker/OrbStack, Supabase CLI, ngrok); Node com pin duplo (`.nvmrc` + `engines`); sem pin nas outras três (auto-atualização própria); ngrok confirmado opcional/só-túnel (D-040).
- Novo `templates/dev-local-toolchain.md` + pointer em `environments.md`.

### 2026-07-11 — CI/CD: processo de promoção/hotfix (staging→main) ([#169](https://github.com/fortegb/platform/issues/169))

- **D-048:** promoção uma change staged de cada vez (explícito, não efeito colateral do merge); hotfix branch `hotfix/<nome>` a partir de `main`, bypass do requisito de staging via `rbo-close-change` v0.5; sync `main`→`staging` obrigatório pós-hotfix; registro via trilha normal de issue/OpenSpec (sem entrada extra por uso).
- Suporte de skills já entregue em ciclo separado: `ai-skills` v0.7.0 (`uniform-hotfix-exception`, ai-skills#10) — `rbo-create-change` 0.3, `rbo-close-change` 0.5.

### 2026-07-11 — CI/CD: automação de migrações (aplicar on merge) ([#168](https://github.com/fortegb/platform/issues/168))

- **D-047:** apply manual (sem CI); gatilhos = após `rbo-stage-change` (staging) e após `rbo-close-change` pós-smoke (prod); rastreabilidade via nome do arquivo na mensagem de commit; sem detector automático de migração pendente (esquecimento é auto-corretivo).
- Pointer em `environments.md` perto de D-031/D-032. Skills → ciclo companheiro em `ai-skills`.

### 2026-07-11 — Board hygiene: re-parenting + Etapa fix (sem issue própria)

- Epic #1 estava `Done` com 4 sub-issues abertas (#29, #30, #31, #140), todas deferidas a v2/v3 por D-018. Re-parented para #81 (Visitas autoguiadas), #98 (Media kit), #130 (Estratégia mobile).
- Epic #175 corrigido de Etapa 1 → 2, para o relatório de progresso mostrar Passo 2 corretamente.

### 2026-07-11 — CI/CD: pipeline de deploy branch→Vercel ([#167](https://github.com/fortegb/platform/issues/167))

- **D-046:** gatilho = integração git nativa da Vercel (sem CI custom agora); gate de merge só em `main` (deploy com sucesso obrigatório); `staging` fica sem gate; rollback = dashboard Vercel; sem notificações custom.
- `origin/staging` decidido agora (long-lived, de `main`), criação real adiada para bootstrap de Execução (#42/#46). Template `cicd-deploy-pipeline.md` + pointer em `environments.md`.

### 2026-07-10 — CI/CD: stage vs close + lifecycle.yml ([#166](https://github.com/fortegb/platform/issues/166))

- **D-045:** `rbo-stage-change` → `staging` (sem archive); `rbo-close-change` → archive + `staging`→`main` quando `.rbo/lifecycle.yml` presente; default sem ficheiro inalterado.
- Ficheiro opt-in `.rbo/lifecycle.yml`; templates/Ambientes/spec atualizados. Skills → ciclo em `ai-skills`; remote `staging` → #167.

### 2026-07-10 — Config: .env.example + SETUP-CREDENTIALS ([#165](https://github.com/fortegb/platform/issues/165))

- **D-044:** `.env.example` canónico; SETUP reescrito sem secrets/Contentful; `.env` gitignored; docs only de estrutura (valores → #47).
- Template `env-example.md` + Ambientes. Área E de config (#162–#165) fechada na definição.

### 2026-07-10 — Config: gestão de secrets + acesso ([#164](https://github.com/fortegb/platform/issues/164))

- **D-043:** owner = ForteGB tech; sócios sem API keys; must-not em git/chat/docs; rotação em vazamento; sem vault pago no v1; docs only.
- Template `secrets-access.md` + Ambientes. `.env.example` → #165.

### 2026-07-10 — Config: scoping Production/Preview/local ([#163](https://github.com/fortegb/platform/issues/163))

- **D-042:** três superfícies de valores; `APP_ENV` + classe de backends por scope; Development Vercel não obrigatório; docs only.
- Template `env-scoping.md` + Ambientes. Acesso → #164; `.env.example` → #165.

### 2026-07-10 — Config: inventário + nomes de env vars ([#162](https://github.com/fortegb/platform/issues/162))

- **D-041:** convenção `SCREAMING_SNAKE` / `NUXT_PUBLIC_*` / prefixos vendor; inventário canónico (v1/v2); overrides `INTEGRATION_TIER_*`; docs only.
- Template `env-vars.md` + Ambientes. Scoping → #163; `.env.example` → #165.

### 2026-07-10 — Integrações: callbacks/webhooks por ambiente ([#161](https://github.com/fortegb/platform/issues/161))

- **D-040:** bases `fortegb.com` / `staging.fortegb.com`; Preview = bypass; local mock/túnel; path `/api/webhooks/<vendor>`; assinatura obrigatória; docs only.
- Template `integrations-webhooks.md` + Ambientes.

### 2026-07-10 — Integrações: alvos de teste seguros ([#160](https://github.com/fortegb/platform/issues/160))

- **D-039:** contrato must/must-not + slots TBD; secrets só Vercel/`.env`; docs only (sem IDs inventados).
- Template `integrations-safe-targets.md` + Ambientes.

### 2026-07-10 — Integrações: mapa por vendor ([#159](https://github.com/fortegb/platform/issues/159))

- **D-038:** inventário HubSpot/Tuya/WA/Telegram/Calendar/QStash; classes de safe-target; fases MVP; docs only (alvos → #160).
- Template `integrations-map.md` + Ambientes.

### 2026-07-10 — Integrações: modelo 3-tiers ([#158](https://github.com/fortegb/platform/issues/158))

- **D-037:** posturas mock / safe-target / prod-live; defaults por `APP_ENV`; overrides seguros; seleção de adaptadores; docs only (mapa → #159).
- Template `integrations-tiers.md` + Ambientes.

### 2026-07-10 — CMS: modelo de conteúdo ([#157](https://github.com/fortegb/platform/issues/157))

- **D-036:** types `house` / `blogPost` / stubs timeline+mediaKit; split marketing (Sanity) vs ops (Supabase) por `houseId`; vídeo URL; pt-BR only; docs only (schemas → #45).
- Template `cms-content-model.md` + Ambientes/architecture.

### 2026-07-10 — CMS: datasets por ambiente ([#156](https://github.com/fortegb/platform/issues/156))

- **D-035:** 1 projeto Sanity; datasets `staging` + `production`; Previews/local → staging; prod → production; promote explícito (não no deploy Vercel).

### 2026-07-10 — CMS: vendor Sanity ([#155](https://github.com/fortegb/platform/issues/155))

- **D-034:** CMS = **Sanity**; Contentful removido do stack (`package.json`, `useContentful` → `useCms` mocks).
- Docs vivos + SETUP/README atualizados; #45/#63 retitulados. Datasets → #156; modelo → #157.

### 2026-07-10 — Dados: seed/test data + LGPD ([#154](https://github.com/fortegb/platform/issues/154))

- **D-033:** pacote sintético partilhado local+staging; lookalike pt-BR; dummy RG/CNH; logins de teste; recreável; sem dump de prod.
- Template `seed-lgpd.md` + Ambientes. Sem `seed.sql` neste change. Hardening → #126; CMS fixtures → #156/#157.

### 2026-07-10 — Dados: runbook Supabase local ([#153](https://github.com/fortegb/platform/issues/153))

- **D-032:** OrbStack preferido no macOS (Docker Desktop OK); checklist local (CLI start/stop/status, Studio/keys, `db reset`, falhas comuns).
- Docs only — sem `supabase init`; scaffold → #171 / #43. Template `supabase-local.md` + Ambientes.

### 2026-07-10 — Dados: migrações Supabase CLI ([#152](https://github.com/fortegb/platform/issues/152))

- **D-031:** `supabase/migrations/` = fonte da verdade; apply via CLI (local Docker; staging→prod); sem migrate no deploy Vercel; forward-only; seed separado (#154).
- `docs/database-schema.sql` legado até portar. Sem init/primeira migração neste change (#153).

### 2026-07-10 — Dados: Supabase por ambiente ([#151](https://github.com/fortegb/platform/issues/151))

- **D-030:** 2 projetos cloud (`fortegb-staging` + `fortegb-prod`) + local Docker; Previews partilham staging; sem PII de prod no não-prod; schema-as-code único; auth redirects e scopes Vercel Production/Preview.
- Free tier: 2 activos; caveat de pause ~7d; caps de storage conhecidos. Sem provisionar projetos neste change.

### 2026-07-10 — Ambientes: domínios por ambiente ([#150](https://github.com/fortegb/platform/issues/150))

- **D-029:** prod=`fortegb.com`+`www`; staging=`staging.fortegb.com`; Previews=`*.vercel.app`; local=`localhost`; `.com.br` 301→`.com` (não host do app).
- Template + página Ambientes. Sem provisionar DNS/Vercel.

### 2026-07-10 — Passos 1–2: validação + higiene docs ([#177](https://github.com/fortegb/platform/issues/177))

- **D-028:** Contexto e Funcionalidades validados por grilling; mapa de oferta aceito; sem novos módulos inventados; jornadas/telas ficam no passo 5 (#176).
- **Higiene:** `platform-vision.md` / `deliverables.md` (checklist Architecture + Q-* alinhados; nota G2); retoques mínimos em `jornadas-plataforma.md` (estado atual, sem reescrever fluxos).
- Fecha a folha de consolidação sob #175. Build ainda gated por G2.

### 2026-07-10 — Ambientes: topologia Vercel ([#149](https://github.com/fortegb/platform/issues/149))

- **Um projeto Vercel:** Production=`main`; Preview=`staging`+feat/fix; senha compartilhada nos Previews (sócios sem conta Vercel); env Production vs Preview (staging-class).
- Canon D-027; template + página Ambientes. Sem provisionar o projeto nem domínios (#150).

### 2026-07-10 — Ambientes: mapeamento branch → ambiente ([#148](https://github.com/fortegb/platform/issues/148))

- **Mapa git → ambiente:** `main`=prod · `staging`=staging · `feat/*`/`fix/*` Preview=staging-class; caminho feat→staging→main; close vs promote separados.
- **Contrato opt-in** para `rbo-close-change` (default merge→`main` se sem config; `integrationBranch` se presente) — **código do skill diferido a #166**.
- Canon D-026; template + página Ambientes atualizados. Sem provisionar branch remota nem Vercel.

### 2026-07-10 — Ambientes: contrato local / staging / prod ([#147](https://github.com/fortegb/platform/issues/147))

- **Spec dos três ambientes lógicos** (grilling A1): propósito, dados, integrações (mock / safe-target / prod-live), promoção staging→prod, hotfix como exceção explícita/registrada, `APP_ENV`, local isolado (Nuxt/Node), staging privado.
- **Canon:** D-025 em `decisions.md`; template `docs/planning/templates/environments.md`; §7.1 em `architecture.md`; entrada em `DECISIONS.md` / `STATUS.md`.
- **Platform docs:** nova página sócios [`ambientes.html`](./docs/planning/ambientes.html) + card no índice + ponteiro em `arquitetura-decisoes.html`.
- **Fora de escopo:** provisionar cloud, mapear branches, Vercel, domínios ou pacote de seed (folhas seguintes).

### 2026-07-05 — Migração A: board para o Roteiro + overhaul das Platform docs ([#174](https://github.com/fortegb/platform/issues/174))

- **Board migrado para o modelo D-024:** novo campo **`Etapa`** (9 passos, ex-`Phase`), **~173 itens re-tagueados** (mapa por epic; folhas herdam o epic; `Phase` deletado). Milestone nativo **`v0 — Definição`** em todos os itens de Etapa 1–7 (barra de prontidão do G2). **Tipos de issue nativos** backfilled (Epic/Feature/Task). 2 epics novos: **Contexto & Funcionalidades** ([#175](https://github.com/fortegb/platform/issues/175), Etapa 1–2) e **Jornadas re-validação** ([#176](https://github.com/fortegb/platform/issues/176), Etapa 5); #42 → `Depends on #146`.
- **Renomeação Método → Roteiro** (o nome "Método" não descrevia uma sequência de passos): `metodo.md → roteiro.md`, D-023/D-024, `agents.md §9`, `STATUS.md`, README, títulos das issues #173/#174. Passo 7 renomeado **Quebra → Versionamento**; passo 8 = **Execução** (ex-"Build"). Board Etapa option 7 renomeado in-place.
- **Platform docs (overhaul):** `mapa-fases.html` → novo **`mapa-roteiro.html`** — track horizontal por passo (9 nós, 3 estágios em bandas), barra `v0` ao vivo, portões **G1/G2/G3** definidos e mostrados, cards v1/v2/v3. Gerador `generate-progress-report.mjs` reescrito para agrupar por **Etapa + Milestone** (novo `etapa-labels.mjs`); `progresso-socios.html` regenerado; `index.html`/`arquitetura-decisoes.html` de-Phased.
- **Fora de escopo:** migração B (Milestones v1/v2/v3 + atribuição de versão no passo 7). Sem código de produto tocado.

### 2026-07-05 — Método do projeto: espinha de governança ([#173](https://github.com/fortegb/platform/issues/173))

- **Novo canon `docs/planning/metodo.md`** — a **espinha controladora**: 9 passos em 3 estágios (Definição 1–7 · Execução 8 · Evolução 9), com propósito/artefato por passo, gates **G1** (sequência), **G2** (build só após Definição 1–7 fechada; ativo 4–6; sinal = Milestone `v0` a 100%), **G3** (versão N+1 após readiness de N). Enforcement soft (doc + `rbo-create-change` + STATUS; sem hard-gate Action).
- **Modelo de board (D-024)** — campo **`Etapa`** (9 opções, supersede `Phase` 0–4) + **`Milestone`** nativo (`v0 Definição` → v1 → v2 → v3) + **tipos de issue nativos** (Feature/Bug/Task/Epic; `chore` só em commits → Task). Atribuição de versão = passo 7 (epic sem Milestone = fila; nada esquecido). **Sem sprints** (releases scope-boxed).
- **D-023** (método como espinha + gates) e **D-024** (modelo de board) em `decisions.md`.
- **Wiring:** ponteiros a `metodo.md` em `README.md` (planning), `agents.md §9` (+ convenção de tipos nativos), `STATUS.md` (passo atual = 4 Arquitetura).
- **Draft-mark:** `jornadas-plataforma.md` e `screen-map.md` → re-validar no passo 5 (após #146).
- **Escopo:** só canon/docs — **board não migrado** (Phase 0–4 em uso até migração A, que também refaz as Platform docs). Sem código de produto tocado.

### 2026-07-05 — Epic Arquitetura da solução & ambientes ([#146](https://github.com/fortegb/platform/issues/146)) + auditoria repo-wide

- **Novo epic "Arquitetura da solução & ambientes (definição completa)" ([#146](https://github.com/fortegb/platform/issues/146))** com 26 issues folha (#147–#172) em 7 áreas: A Ambientes · B Dados · C CMS · D Integrações · E Config/secrets · F CI/CD · G Dev local. Motivo (→ **D-022**): o epic Architecture (#1) cobriu produto/stack, mas **não** infra/ambientes/integrações — a definição completa **precede o build da Fase 1** (#48/#56). Correção do overclaim "Fase 1 desbloqueada" da entrada de 2026-07-04.
- **Modelo de integrações em 3 camadas** (local=mock · staging=API real contra alvos seguros próprios · prod=live) — motivado pelo risco de código com bug destrancar portas reais. **D-017 (serverless) em reavaliação** no #146 (explore §8: staging/prod ≈ empate com persistente).
- **Convenção de ordem de trabalho:** dependências registradas no corpo da issue (`**Depends on:** #X`); próximo = Todo da fase sem dependência aberta.
- **Auditoria de staleness + pt-BR (repo-wide, 7 lotes):** deep-read de todos os docs de planejamento e Platform docs; correção de informação desatualizada (gate do build = #146, home por estilo, D-015..D-022) e varredura pt-PT ampliada (45+ termos, incl. `arquitectura`, gerúndios "está a …", `planeado`, `partilhado`, `aceite`) — inclusive em `decisions.md`/`CHANGELOG.md` (regra: pt-BR vence append-only para correção de língua). Varredura final = 0 ocorrências no escopo docs/ + arquivos de controle.

- **CRM ([#28](https://github.com/fortegb/platform/issues/28), Q-007/Q-018 → D-019/D-020):** **Supabase master + HubSpot sync**; modelo `cliente` (único por CPF) 1─N `registro` (por casa) + `historico`; dois níveis Contato→Cliente; feature **"Registro de Cliente"** (não "Comissões"); rota `/staff/registros`.
- **Home ([#33](https://github.com/fortegb/platform/issues/33), Q-010 → D-021):** variantes renomeadas por **estilo** (`/`, `/classico`, `/slate`, `/azul`; `HeroSplit/Classic/Slate/Azul`) — sem colisão com release v1/v2/v3; escolha do hero diferida ao lançamento.
- **Epic Architecture ([#1](https://github.com/fortegb/platform/issues/1)) fechado** (#34/#35/#36/#38): checkpoint #36 = todas Q-* resolved/deferred; **Fase 0 completa → Fase 1 desbloqueada** (#48, #56). `platform-vision.md` + `agents.md §9` + `STATUS.md` atualizados.
- **pt-BR estrito repo-wide** (correção de português europeu) + **terminologia unificada** `lead/prospecto → cliente` (docs + títulos de issues).
- **Platform docs:** seção "Clientes e corretores" + v1/v2/v3 no Mapa de Fases e Relatório; ponteiro de fase (Fase 0 done → Fase 1). OpenSpec `grill-crm-source-of-truth` arquivado; `#33` (home) foi change **lightweight** (branch merged, sem artefato OpenSpec).
- **Correções pós-auditoria:** linha duplicada em `agents.md` §9 (introduzida nesta sessão) removida; pt-PT `activos → ativos` em `agents.md` (straggler que a varredura excluíra); regra CHANGELOG reforçada no skill `rbo-close-change`.

### 2026-07-03 — Grilling 0: stances fundacionais + Q-004 ([#145](https://github.com/fortegb/platform/issues/145))

- Stances fundacionais resolvidas (D-015..D-018): constraints, build-vs-buy, **Q-004** (CMS + Supabase), system shape (**serverless**), MVP boundary (**v1/v2/v3**; tours → v2).
- Canon: `open-questions.md` (Q-004 resolved), `decisions.md` (D-015..018), `architecture.md` §1/§4/§5/§7, root `DECISIONS.md`, `STATUS.md`, `agents.md` §9.
- Platform docs: nova página **`arquitetura-decisoes.html`** (user-readable) + **`runtime-serverless-vs-persistent.html`** (comparação estilizada) + cards/links no índice.
- Explore capture `runtime-serverless-vs-persistent.md`. OpenSpec `grill-foundational-architecture` arquivado.

### 2026-07-03 — Platform docs: screen map + naming (publish)

- Índice `docs/index.html` — **Documentação da plataforma**, card mapa de telas.
- `screen-map.html` gerado a partir de `screen-map.md`.
- Marcas alinhadas; `mapa-fases` Phase 0 atual; scripts `pages:portal` atualizados.

### 2026-07-03 — Board hygiene + screen map MVP ([#139](https://github.com/fortegb/platform/issues/139), [#32](https://github.com/fortegb/platform/issues/32))

- Topics A + B: `phases.md`, `architecture.md`, `deliverables.md`, `modules.md`, explore notes.
- **`screen-map.md`** — routes por role (mock/new, phase, epic); #32 aceito.
- Platform docs naming; Integrações → module `platform` (#72); workflow close-out.
- OpenSpec `epics-issues-review` arquivado.

- Página `modules.html` gerada a partir de `modules.md`; card no index e links no mapa-fases.
- Jornadas: pilares → módulos; cards de papel → âncoras; hover só em cards clicáveis.
- `portal.css`: lift restrito a `a.card` / `.card-interactive`.
- Mapa-fases: label "Relatório de Progresso"; seção obsoleta removida.
- GitHub Pages: publish legacy `/docs`; GHA auto-deploy desativado.
- OpenSpec `partner-portal-polish` arquivado; spec `partner-portal` criada.

### 2026-07-01 — Sessão handoff (máquina principal)

- Push sync `0a6af59` para `origin/main`; working tree limpa.
- `STATUS.md` atualizado para próxima sessão (Mac Mini ou Architecture).
- `docs/setup-mac-mini.md` — troubleshooting Git LFS lock verify.

### 2026-07-01 — Phase 0 fundação (org + platform)

**GitHub & infra**
- Org **`fortegb`** criada; personal renomeado **`fortegb-admin`**; **`rbonon`** Owner.
- Repos na org: **`platform`**, **`app-despesas`**, **`ai-assets`** (D-014).
- Repo **`sandbox` → `platform`** (D-012).
- Issue types org: Task, Bug, Feature, Epic.
- GitHub Project **`platform`** + campos Phase/Module; issues [#1](https://github.com/fortegb/platform/issues/1) Architecture, [#2](https://github.com/fortegb/platform/issues/2) Brand assets.
- **OpenSpec** inicializado no repo.

**Dotfiles (rbonon/dotfiles 0.8.1)**
- `auth` / `commit_as` para namespace org; dev git = rbonon (D-013).
- Re-clones locais com remote `rbonon@github.com/fortegb/...`.

**Docs**
- `STATUS.md`, `ROADMAP.md`, `modules.md`, runbook migration marcado concluído.

### 2026-07-01 (cont.)

**Planning finalizado — pronto para Phase 0 execução**
- **`docs/planning/`** completo: README, platform-vision, architecture (template), phases, modules, open-questions (Q-001–Q-019), decisions (D-001–D-011), workflow, github-org-migration, **deliverables** (mapa produto ↔ epics).
- **D-011:** decisões arquiteturais abertas até epic Architecture + `rbo-grilling`.
- Gaps de produto mapeados: corretor termos (Q-016), condomínio/portaria (Q-017), CRM multi-canal (Q-018), mobile (Q-019).
- **`STATUS.md`** — próximo passo: GitHub org migration Fase A.

**Reestruturação de epics (D-010)**
- Phase 1: Platform environments, Identity/roles/journeys, Public site UI finalization, Brand & design system.
- Phase 2: Integrations MVP, Release readiness; CRM/tours reordenados.
- Phase 3: Physical-digital bridge, Content operations.
- Removido epic Phase 0 Home 2 vencedores (absorvido em Public site UI P1).
- Criada pasta **`docs/planning/`** com visão, módulos, fases, perguntas abertas, decisões (D-001–D-008), workflow e runbook de migração GitHub org.
- **`STATUS.md`** reestruturado como bússola de sessão (epics, próximo passo, links planning).
- **`AGENTS.md`** seção 9 atualizada (planning canon, ROADMAP, Phase 0).

### 2026-06-28

**Conteúdo (pt-BR)**
- Ajuste do slogan do Hero com quebra de linha após "qualidade".
- Revisão de textos da seção de valores (Transparência, Confiança, Proximidade, Abertura), com quebras de linha.
- Slogan do rodapé reescrito com quebras de linha.

**Home — Hero**
- Redesenho do Hero para layout *split* (texto + imagem lado a lado; empilhado no mobile).
- Redução de altura e da escala de título/subtítulo/botões para visual mais compacto.

**Escala global de UI**
- Base do `html` reduzida para `81.25%` em `assets/css/main.css` (encolhe fontes/espaçamentos proporcionalmente).

**Botões**
- Padronização de tamanho e estilo em `HouseCard`, `HomeContent` e Heros.
- Hierarquia de cores: **verde WhatsApp** (`#3E8E5E`) para WhatsApp, **azul** (`primary-400`) para ação primária, **outline navy** para secundária.
- Correção de conflito do `.btn-primary` (daisyui vs custom) que deixava botões outline ilegíveis.
- "Fale Conosco" com ícone do WhatsApp; botão flutuante alinhado ao mesmo verde.

**Header**
- Remoção do link "Início" (logo já leva à home).
- Reordenação: Portfólio · Blog · Sobre · Contato.
- Botão "Contato" padronizado ao estilo "Ver Portfólio".
- Adicionado **ícone de login** (desktop + item "Entrar" no mobile).

**Footer**
- Fundo alterado para o navy do header (`primary-500`).
- "Links Rápidos" reorganizado (grade → linha única); remoção de "Contato" da lista.
- Coluna "Contato" renomeada para **"Legal"** (Privacidade/Termos); remoção do item WhatsApp.
- Remoção de "Campinas-SP, Brasil".
- Ajuste de alinhamento do logo.

**Login (`/login`)**
- Migração da rota `/corretor/login` → `/login` (referências atualizadas em header, middleware e dashboard).
- Página adaptada para acesso **genérico** com identidade ForteGB (logo + fundo navy).
- Fluxo *identifier-first* em 2 etapas (e-mail → senha **ou** criar senha) — **UI/mock** (`a@b.com` = conta existente; demais = nova).
- Login social: **Google** e **Facebook** (Microsoft removido).
- Melhorias: mostrar/ocultar senha, atributos `autocomplete`, nota de Termos/Privacidade, título dinâmico ("Acesse sua conta" / "Criar sua conta").

**Variantes da Home (avaliação de design)**
- Estrutura com miolo compartilhado (`components/HomeContent.vue`) e Hero por componente.
- Rotas: `/` (split azul original), `/v2` (clássico), `/v3` (slate), `/v4` (azul `primary-400`) — variantes com `noindex`.

**Tema / Configuração**
- Adicionada cor `hero-slate` (`#4a5a72`) ao `tailwind.config.js`.
- Substituição de valores arbitrários de gradiente por cores nomeadas (evita falha de compilação em arquivos novos).

**Documentação**
- Criado `docs/autenticacao-login.md` (comportamento do login + pendências de back-end).
- Criados arquivos de controle: `STATUS.md`, `CHANGELOG.md`; seção "Controle do Projeto" adicionada ao `AGENTS.md`.
- Referência ao doc de login adicionada ao `README.md`.

**Repositório / manutenção**
- `.gitignore`: passou a ignorar `.DS_Store`, `.nuxt`, `.output` e `dist`.
- Removidos do versionamento os arquivos `.DS_Store` e os artefatos de build em `.nuxt/`.
- Branch de trabalho `test/element-sizing` mesclada em `main` e removida.
