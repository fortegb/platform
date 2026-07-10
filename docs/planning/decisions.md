# Decisões (ADR-lite)

> Decisões fechadas. Cada entrada fecha uma pergunta em [`open-questions.md`](./open-questions.md).

---

### D-001 — Fluxo formal de mudanças (2026-07-01)

- **Contexto:** Plataforma grande; necessidade de rastreio e specs por entrega.
- **Decisão:** Adotar **issue → change (OpenSpec) → close** via skills `rbo-*`.
- **Consequências:** Board = backlog; OpenSpec só em sub-issues folha; branch `feat/<change-name>`.

---

### D-002 — Papéis de STATUS, CHANGELOG e ROADMAP (2026-07-01)

- **Contexto:** Sobreposição possível entre arquivos de controle.
- **Decisão:**
  - **`STATUS.md`** = bússola de sessão (epics ativos + próximo passo) — **mantido**.
  - **`ROADMAP.md`** = espelho gerado do board — **não editar à mão**.
  - **`CHANGELOG.md`** = registro no close-out de changes — **não duplicar cada issue**.
  - **`docs/planning/`** = canon de design — **separado do board**.
- **Consequências:** Atualizar `STATUS.md` ao mudar foco; grilling escreve em `planning/`.

---

### D-003 — GitHub Organization — Opção A (2026-07-01)

- **Contexto:** Conta `fortegb` é **User**; issue types e board de equipe favorecem org.
- **Decisão:**
  1. Renomear personal **`fortegb` → `fortegb-admin`** (email `contato@fortegb.com` mantém-se).
  2. Criar **Organization `fortegb`**.
  3. Mover repos (ex.: `sandbox`) para a org.
  4. Owners: conta business (`fortegb-admin`) + `rbonon` (co-owner).
- **Consequências:** URL final `github.com/fortegb/sandbox`; ver [github-org-migration.md](./github-org-migration.md).
- **Fecha:** Q-001 (parcialmente).

---

### D-004 — Epics vs OpenSpec (2026-07-01)

- **Contexto:** Hierarquia de trabalho vs specs implementáveis.
- **Decisão:**
  - **Epic** = issue pai + sub-issues — **sem** OpenSpec, **sem** branch.
  - **Sub-issue folha** = **1:1** com OpenSpec change.
  - **Phase** e **Module** = campos do board — **não** substituem epics.
- **Consequências:** `rbo-create-change` só em folhas; epic fecha quando filhos Done.

---

### D-005 — Home: dois vencedores (2026-07-01)

- **Contexto:** Quatro variantes em avaliação (`/`, `/v2`, `/v3`, `/v4`).
- **Decisão:** Manter **dois** layouts finais:
  - Com imagem no hero (split)
  - Sem imagem no hero
  - Restante styling compartilhado entre ambos
- **Consequências:** Consolidação em change dedicada — **não executar** até autorizado; variantes `/v2`–`/v4` removidas depois da escolha.
- **Fecha:** Q-010 (parcial — quais variantes exatas ainda em aberto).

---

### D-006 — Media kit como módulo de plataforma (2026-07-01)

- **Contexto:** Placas, posters internos, narrativa de obra, kit por imóvel.
- **Decisão:** Tratar como **módulo `media-kit`** com epic próprio — não sub-tarefa do portfólio.
- **Consequências:** Modelo de dados e admin workflow a definir na grilling; ver [`modules.md`](./modules.md#6-media-kit-e-marketing-físico-media-kit).

---

### D-007 — Preparar GitHub faz parte do epic org (2026-07-01)

- **Contexto:** “Quando GitHub estiver pronto” vs trabalho de preparação.
- **Decisão:** Todo o trabalho de **estado atual → org desejada** (GitHub + dotfiles + remotes + Vercel + verificação) vive **dentro do epic** *GitHub org migration* — documentado em [github-org-migration.md](./github-org-migration.md).
- **Consequências:** Não bloquear documentação de planning; execução segue runbook.

---

### D-009 — Epic Architecture após preparação GitHub (2026-07-01)

- **Contexto:** Refinamento arquitetural estava implícito em “grilling”; usuário quer epic explícito e sequenciado.
- **Decisão:**
  - Epic **`Architecture & MVP definition`** em Phase 0.
  - **Ordem:** org migration → bootstrap board & OpenSpec → **Architecture epic** → Phase 1 epics.
  - Deliverables: `architecture.md`, MVP boundary, grilling completo, Phase 1 no board.
  - **`rbo-grilling`** queima `open-questions.md` dentro deste epic.
- **Consequências:** Não iniciar Phase 1 implementation até Architecture epic Done; home 2 vencedores deferred até lá (ou decisão explícita).
- **Fecha:** Q-001 (parcial — sequência confirmada)

---

### D-008 — Dotfiles: namespace `fortegb` vs login `fortegb-admin` (2026-07-01)

- **Contexto:** `repo_clone fortegb/repo` usa `fortegb` como owner na URL (org) e pasta local.
- **Decisão (interina):** Manter chave de conta **`fortegb`** no `dotfiles.conf` como **namespace da org**; PAT/Keychain atualizados para token emitido por **`fortegb-admin`** após rename. Documentar em dotfiles `DECISIONS.md` na execução.
- **Consequências:** Remote pode ser `https://fortegb-admin@github.com/fortegb/sandbox.git`; pasta local `~/Documents/GitHub/fortegb/` **mantém-se**.
- **Fecha:** Q-002 (abordagem; execução pendente)

---

### D-010 — Reestruturação de epics (define vs build) (2026-07-01)

- **Contexto:** Roles/journeys e UI site público estavam enterrados em auth/portfólio/home; integrações espalhadas.
- **Decisão:**
  - **Architecture epic** = só *define* (roles, journey map, MVP, Q-010 home choice).
  - **Phase 1 epics dedicados:** Platform environments · Identity, roles & journey routing · Public site UI finalization · Brand & design system.
  - **Phase 2:** Integrations MVP (hub) · Visitas · Portal corretor · Release readiness.
  - **Phase 3:** + Physical-digital bridge · Content operations.
  - Remover epic Phase 0 **Home 2 vencedores** — folded into Public site UI finalization (P1).
- **Consequências:** Ver mapa define vs build em [`phases.md`](./phases.md).

---

### D-011 — Decisões arquiteturais abertas até grilling (2026-07-01)

- **Contexto:** Stack e soluções técnicas não devem estar fechadas na preparação.
- **Decisão:**
  - `platform-vision.md` e `architecture.md` usam linguagem **proposta / TBD**.
  - Escolhas (CMS, KYC, Tuya fallback, mobile, condomínio, HubSpot model) resolvem-se em **`rbo-grilling`** no epic Architecture.
  - Cada resolução → `decisions.md` + atualização de `architecture.md`.
- **Consequências:** Phase 1 build só após Architecture Done; ver [`deliverables.md`](./deliverables.md).

---

### D-012 — Repo principal: `platform` (2026-07-01)

- **Contexto:** Após migração para org, `sandbox` era nome temporário de desenvolvimento.
- **Decisão:** Renomear **`fortegb/sandbox` → `fortegb/platform`** — website + backend + arquitetura num único repo.
- **Consequências:** Local `~/Documents/GitHub/fortegb/platform/`; GitHub Project **`platform`**; OpenSpec neste repo.

---

### D-013 — Git dev: dotfiles org namespace + `auth rbonon` (2026-07-01)

- **Contexto:** Org slug `fortegb` ≠ login de desenvolvimento `rbonon`.
- **Decisão:** Dotfiles `account fortegb` + `auth rbonon` + `commit_as rbonon`; PAT admin em `fortegb-admin` (sem bulk clone).
- **Consequências:** Remote `https://rbonon@github.com/fortegb/<repo>.git`; commits como rbonon; dotfiles ≥ 0.8.0.

---

### D-014 — Repos org: nomes finais (2026-07-01)

- **Decisão:** Repos compartilhados na org `fortegb`:
  - `platform` (app principal; ex-`sandbox`)
  - `app-despesas` (ex-`fortegb-despesas`)
  - `ai-assets` (ex-`Resources_IA`)
- **Consequências:** `repo_clone fortegb/<nome>`; hífens OK no GitHub; Mac Mini — [setup-mac-mini.md](../setup-mac-mini.md).

---

### D-015 — Restrições fundacionais + build-vs-buy (2026-07-03)

- **Contexto:** Grilling 0 ([#145](https://github.com/fortegb/platform/issues/145)) — fixar postura antes de perguntas pontuais.
- **Decisão:**
  - **Restrições:** dev solo (Ricardo); horizonte de meses sem prazo rígido (uma casa flagship como motivação suave); **free-first** (iniciativa nascente, pessoas físicas, pré-receita — só gastar quando provar utilidade); **zero-ops**; escala low-hundreds.
  - **Build vs buy:** usar **SaaS/gerido por defeito** onde encaixa; **sem self-hosting**; **sem admin de back-office** construído para o dono (usar dashboards do fornecedor, ex. Supabase Studio); construir custom **só** nos fluxos únicos (visitas/identidade, corretor).
- **Consequências:** cada escolha de stack passa neste crivo; tempo do dev é o recurso escasso, não dinheiro.

---

### D-016 — Colocação de conteúdo: CMS + Supabase (2026-07-03) — **fecha Q-004**

- **Contexto:** "CMS vs DB" é falso binário; a casa tem dados operacionais/relacionais **e** conteúdo/media.
- **Decisão:** Taxonomia por tipo de conteúdo:
  - Conteúdo (listings, blog, timeline de obra, media) → **CMS** (Contentful/Sanity).
  - Estado operacional + PII sensível (status, leads, visitas, verificação, contratos Gov.br, RG/CNH) → **Supabase** (Postgres + bucket **privado** com RLS + retenção LGPD).
  - **Vídeo** → embed YouTube/Vimeo (URL como campo); não passar pelo backend.
  - **Social** → fora da plataforma.
  - **Join** conteúdo ↔ operacional por **ID de casa** compartilhado, merge no Nuxt.
- **Alternativas rejeitadas:** Supabase-only (UX de autoria fraca); admin self-hosted sobre Postgres/Directus (viola zero-ops); largar Contentful por completo (revertido — um CMS compensa na autoria).
- **Consequências:** vendor CMS (Contentful já em `package.json` vs free-tier mais generoso do Sanity) reversível via camada de serviço; decidido no build. Pré-resolve armazenamento de Q-005/Q-016 (bucket privado RLS).

---

### D-017 — Forma do sistema: serverless (2026-07-03)

- **Contexto:** Plataforma integration-heavy e event-driven (bots WA/Telegram, HubSpot, Tuya, trabalho agendado) + cliente mobile futuro provável. Prioridades: free-first + zero-ops + simplicidade Vercel.
- **Decisão:** **Serverless** — Nuxt/Nitro na **Vercel** (Hobby grátis → Pro ~$20/mo quando útil), **API-first** (web = 1.º cliente; PWA/native/bots reutilizam), **Upstash QStash** para jobs com atraso + retries, **camada de adaptadores** de integração (um módulo por terceiro), **Telegram-first** (grátis; WhatsApp pago-quando-útil), vídeo ao vivo offloaded ao fornecedor, app **Nitro-portável** como seguro.
- **Alternativa avaliada:** processo Node persistente (Fly.io/Oracle/Railway) + pg-boss in-process + websockets — mais coerente para eventos/real-time e mais familiar (C/LAMP), mas **grátis + always-on + zero-ops não coexistem**. Comparação completa → [`explore/runtime-serverless-vs-persistent.md`](./explore/runtime-serverless-vs-persistent.md).
- **Consequências:** async fica espalhado por funções + QStash (aceito: "não me importo desde que funcione"); a 1–2 casas/ano o uso não dispara upgrade; Pro é escolha discricionária posterior.

---

### D-018 — Fronteira de MVP: v1/v2/v3 (2026-07-03)

- **Contexto:** Escopo total = muitos meses para dev solo; precisa de fatias verticais.
- **Decisão:**
  - **v1:** site público + portfólio real + CTA visita WhatsApp · **auth + papéis** · corretor onboarding (registro → staff aprova) · **registro de lead + timestamp de comissão (primeiro ganha) + sync HubSpot** · contrato/Gov.br **manual-first** · staff aprovações + leads · admin config mínimo.
  - **v2:** **visitas autoguiadas (agendada + QR)** + identidade + Tuya + calendário + fila de exceção · **Gov.br automatizado** · bots WhatsApp/Telegram de lead.
  - **v3 / Fase 3:** media kit, timeline de obra, motor social, portal cliente, BI.
  - **Lock now (fundacional, difícil reverter):** modelo de dados core + IDs estáveis (house, user, lead, corretor; visit/contract como refs forward-looking); RBAC cobrindo todos os papéis; taxonomia de armazenamento (D-016); camada de adaptadores; API-first; escolha de queue (QStash).
- **Rationale:** corretor **antes** de tours — sem dependências de hardware/externas, protege comissão desde o 1.º par de corretores, alinhado a venda humana; tours = maior/mais arriscado build único → v2; Gov.br = integração mais arriscada do fluxo corretor → manual-first. BDUF rejeitado (viola D-011); deferimento cego rejeitado (fecharia v2/v3) — daí o guardrail "lock now".
- **Consequências:** v2/v3 arquitetados just-in-time no grilling da fase; Q-005/006/017, Q-009/011–013, Q-008/019 diferidos para a sua fase.

---

### D-019 — CRM source of truth: Supabase master + HubSpot sync (2026-07-04) — **fecha Q-007**

- **Contexto:** Fluxo corretor/cliente do v1 (D-018) precisa da stance de CRM. Proteção de comissão (first-wins, dedup CPF) já fechada (company-structure.md, gaps 1–8).
- **Decisão:** **Supabase é a fonte-da-verdade** do Cliente + atribuição de comissão; **HubSpot é downstream sincronizado** (pipeline/relatórios). Cliente→Contact, Registro→Deal. Corretor registra **uma vez** (portal/bot → Supabase); sync empurra p/ HubSpot. Status autorado no Supabase (staff), sincronizado p/ fora.
- **Rationale:** garantia "dois corretores → um ganha por timestamp, dedup CPF" exige escrita **transacional** com constraint de unicidade num DB que controlamos, não na API eventual do HubSpot; CPF é PII/LGPD; gatilho de venda lê `Casa.status=vendida` (já Supabase, D-016). HubSpot nunca decide comissão.
- **Rejeitado:** HubSpot master (enforcement frágil, CPF em SaaS US); claim fino no Supabase + HubSpot dono do link pessoa↔casa (separa a atribuição do Deal via join CPF+casa — frágil no campo mais crítico).

---

### D-020 — Modelo Cliente/Registro + níveis Contato→Cliente + fontes (2026-07-04) — **fecha Q-018**

- **Contexto:** Linguagem e modelo de dados do CRM para o v1.
- **Decisão:**
  - **Linguagem:** a pessoa é **Cliente** em todo lugar; ciclo de vida é **status** (interessado → em negociação → comprador). "Comprador" é valor de status, não entidade nova. Feature = **"Registro de Cliente"**, nunca "Comissões" (comissão é consequência).
  - **Modelo:** **uma tabela `cliente`** (`cpf UNIQUE` nullable, `nome`, `whatsapp NOT NULL`, `email` nullable, `fonte`, `criado_em`) — linha sem CPF = nível **Contato**; preencher CPF **promove** a Cliente (UPDATE, sem migração). `cliente` **1─N** `registro` (cliente × casa: `status`, `corretor_id` null=direto, `registrado_em`) + `historico` append-only (auditoria). HubSpot: cliente→Contact, registro→Deal.
  - **Dois níveis + reconciliação:** promoção self-service (cliente registra visita + dá CPF); CPF = autoridade de dedup; WhatsApp-match promove Contato; senão novo + merge manual staff. **WhatsApp obrigatório e atualizável** (mudança auditada); email futuro; CPF obrigatório para *ser* Cliente (padrão BR + liga à autorização por documento nas visitas, v2).
  - **Fontes (Q-018):** v1 = portal corretor, entrada manual staff, contatos form-site/CTA-WhatsApp; v2 = QR, bots, tours. `fonte` → propriedade HubSpot.
  - **Escopo/nome:** proteção de comissão + **auditoria** no v1 (status staff-driven, histórico visível na UI); **financeiro/pagamento fora do v1** (architecture.md §2). Rota `/admin/comissoes` → `/staff/registros`.
- **Rationale:** `registro` por casa é a forma mínima que expressa "mesma pessoa, casas diferentes, corretores diferentes" (gap-2) e remove anomalias de tabela plana; `UNIQUE(cpf)` deixa o DB (não o código) garantir o dedup.
- **Diferido:** lógica de transição de status (staff dispara; `registro.status=comprador` ↔ `casa.status=vendida` ↔ outros registros → encerrado) → grilling de fluxos; detalhes de propriedades HubSpot → build; varredura de terminologia (lead/prospecto → cliente) em docs antigos → follow-up.

---

### D-021 — Home: variantes por estilo + escolha do hero diferida (2026-07-04) — **fecha Q-010 (diferido)**

- **Contexto:** 4 variantes de home em mock; pergunta Q-010 (com/sem hero, qual vence). Constatação: as variantes **diferem só no hero** — o miolo é o `HomeContent` compartilhado.
- **Decisão:**
  - **Renomear variantes por estilo** (não por número, para não colidir com o release v1/v2/v3): rotas `/` (default, `HeroSplit`), `/classico` (`HeroClassic`), `/slate` (`HeroSlate`, ex-`HeroV3`), `/azul` (`HeroAzul`, ex-`HeroV4`). Rotas de variante seguem `noindex`.
  - **Escolha do hero diferida ao lançamento** — sem roadblock: o hero é componente trocável; todo o resto do site é construído independentemente. Default de produção = `/` (HeroSplit). A escolha final vive sob **Public site UI (#56)**.
- **Consequências:** Q-010 sai como **bloqueador** do epic Architecture (#38); a decisão visual fica para quando houver os assets de marca. Sem "2 vencedores com/sem hero" — todas as variantes têm hero; a distinção é de estilo.

---

### D-022 — Definição de arquitetura estendida ao full-solution (infra/ambientes) via epic #146 (2026-07-04)

- **Contexto:** O epic Architecture (#1) foi fechado cobrindo **produto/stack** (D-015..D-021), mas **não** definiu em profundidade a arquitetura de **infra, ambientes (local/staging/prod) e integrações**. Ao explorar ambientes (#144), ficou claro que decidir isto só no v1 arriscava armadilhas para v2, e que a complexidade (multi-ambiente × múltiplas integrações) precisa de desenho deliberado.
- **Decisão:** Definir a arquitetura da **solução completa** à frente, num epic dedicado **#146 — Arquitetura da solução & ambientes (definição completa)** — 26 folhas (A Ambientes · B Dados · C CMS · D Integrações · E Config/secrets · F CI-CD · G Dev local). Output = docs + decisões + **templates de config**. **Adoção incremental** pelos epics de build; **#146 precede/gate o build da Fase 1** (#48/#56).
- **Princípios já firmados (a formalizar nas folhas):** config env-var-scoped por ambiente; isolamento total por ambiente (Supabase project por env; CMS datasets); **integrações em 3 tiers** (mock local / staging safe-target / prod-live — nunca abrir porta real em teste); migrações como schema-as-code; secrets em scopes Vercel; dev local com Supabase (Docker/OrbStack).
- **Reavaliação aberta:** **D-017 (serverless vs persistente)** revisita-se dentro de #146 (áreas D/F) — ver [`explore/runtime-serverless-vs-persistent.md`](./explore/runtime-serverless-vs-persistent.md) §8.
- **Consequências:** corrige a mensagem prematura de "Fase 1 build desbloqueada"; #144 superseded por #146; ordem de trabalho = #146 antes do build.

---

### D-023 — Roteiro do projeto como espinha de governança (2026-07-05)

- **Contexto:** o projeto começou pela execução (scaffold, mocks, epics de build) e vinha preenchendo a definição por cima — origem do retrabalho. Faltava uma espinha explícita que ordenasse o trabalho e gateasse o build; o campo `Phase` (0–4) misturava estágio de ciclo de vida com pacote de entrega.
- **Decisão:** adotar o **Roteiro** ([`roteiro.md`](./roteiro.md)) — **9 passos em 3 estágios** — como estrutura **controladora**, não descritiva:
  - **Definição** (1 Contexto · 2 Funcionalidades · 3 Componentes · 4 Arquitetura · 5 Jornadas/telas · 6 Design system · 7 Versionamento) · **Execução** (8 Build) · **Evolução** (9 Manutenção).
  - Passos 1–6 fecham via **grilling**; tudo corre sob **change management** (`rbo-*` + OpenSpec).
- **Gates:** **G1** (sequência da Definição; paralelos declarados são exceção) · **G2** (build só após toda a Definição/passos 1–7 fechada; gate ativo = 4–6; sinal = Milestone `v0` a 100%) · **G3** (versão N+1 após readiness de N).
- **Enforcement:** doc + `rbo-create-change` (checa o gate antes de ramificar) + `STATUS.md` (próximo passo derivado). **Sem hard-gate por GitHub Action** por ora (dev solo; adiciona-se se houver pulo de gate). O board não bloqueia cliques — os gates controlam **estado visível**, não a transição.
- **Rationale:** corrige a inversão de origem; o build passa a ser **dirigido pela definição**, não front-loaded (alinha a D-011, anti-BDUF). Cadência por **releases scope-boxed (Milestones)**, **não sprints** time-boxed — inadequadas a dev solo em rajadas; promoção de código é assunto de pipeline (#146).
- **Consequências:** passos 5 e 6 **re-validam após o passo 4** (#146) — `jornadas-plataforma.md` e `screen-map.md` marcados rascunho. Build da Fase 1 gated por passos 4–6. O modelo de board que representa isto = **D-024**.

---

### D-024 — Modelo de board: Etapa + Milestones + tipos nativos (supersede Phase 0–4) (2026-07-05)

- **Contexto:** o roteiro (D-023) precisa ser **estrutural no board**, não em prosa/memória (fragilidade sinalizada: rastrear passo à mão é perigoso). O org já tem **tipos de issue nativos** (Task/Bug/Feature/Epic) e o campo **Milestone** nativo, ambos sem uso.
- **Decisão:**
  - **`Etapa`** — campo single-select com **9 opções** (`1 Contexto` … `9 Evolução`), **supersede `Phase`** (0–4). Todo item carrega uma. Os 3 estágios são **derivados** do passo, não um campo à parte.
  - **`Milestone`** (nativo) — **`v0 Definição`** (agrupa Etapa 1–7; 100% = luz verde do G2) → **`v1`** → **`v2`** → **`v3`** (v1–v3 subdividem a Etapa 8).
  - **Tipo** (nativo) — **Feature / Bug / Task / Epic** (opção A). Substitui a dependência do prefixo `Epic:`. `chore` fica só em commits (mapeia a Task).
  - **Atribuição de versão = passo 7:** epic de Execução **sem Milestone** = fila; DoD do passo 7 = "todo epic de Execução tem Milestone" (nada esquecido — ex.: #122 SEO, #126 LGPD, #130 mobile ficam para o passo 7).
- **Rationale:** um campo estrutural queryable torna o relatório verídico e remove o eixo duplicado (Phase 1–3 ≈ v1/v2/v3). Entidades nativas do GitHub em vez de stand-ins custom. `v0` é levemente derivável de Etapa 1–7 mas ganha lugar pela **barra de progresso nativa** + evento "milestone fechado".
- **Rejeitado:** campo de 3 macro-estágios + passo no corpo da issue (perde a granularidade por passo, que é onde se passa a maior parte do tempo, e volta a ser dirigido à mão); renomear org Task→Chore (config extra por ganho cosmético).
- **Consequências:** **este change não migra o board** — só define o modelo. A criação de campos/Milestones/tipos e o retag de ~171 itens são **migração A** (Etapa + tipos + `v0` + 2 epics novos + overhaul do relatório) e **migração B** (Milestones v1/v2/v3 + retag Execução, perto do passo 7). O `Phase` fica intocado até a migração A (board nunca meio-definido).

---

### D-025 — Três ambientes lógicos: local / staging / prod (2026-07-10) — **#147 / A1**

- **Contexto:** D-022 abriu o epic #146 e nomeou os tiers, mas não fechou propósito nem regras de cada um. Grilling A1 (2026-07-10) formalizou o contrato antes das folhas de branches, Vercel, domínios, dados e integrações.
- **Decisão:**
  - Exatamente **três ambientes lógicos:** `local`, `staging`, `prod`. Preview/ephemeral é **mecanismo de entrega**, não um quarto nome (mapeamento → #148/#149).
  - **`local`:** máquina do desenvolvedor; isolado por padrão (Nuxt/Node `npm run dev` + DB/mocks locais — não “rodar Vercel”); dados descartáveis/seed; integrações **mock**; nunca fechadura real nem WhatsApp pago a cliente real; apontar para staging só como override consciente; nunca para prod.
  - **`staging`:** pré-produção **privada** (dev + UAT opcional de sócio — não beta público); dados não-prod (seed/anonimizados; **sem cópia de PII de prod por padrão** — conteúdo do seed → #154); integrações só **safe-target**.
  - **`prod`:** sistema ao vivo; PII real sob LGPD; integrações **prod-live**.
  - **Promoção:** caminho normal exige validação em staging (ou backends classe-staging) antes de prod — **sem** local→prod como padrão. **Hotfix** existe como exceção **explícita, excepcional e registrada**; procedimento completo → folha de promoção/release (#169).
  - Identidade de runtime: variável **`APP_ENV`** ∈ `{local, staging, prod}`; `NODE_ENV` sozinho **não** distingue staging de prod.
- **Rationale:** três é o mínimo que separa trabalho descartável, validação partilhada e clientes reais sem multiplicar contas/secrets num setup free-first solo. Posturas mock / safe-target / prod-live (já em D-022) ficam como contrato de A1; alvos concretos por vendor → #158–#160.
- **Consequências:** template em [`templates/environments.md`](./templates/environments.md); página sócios [`ambientes.html`](./ambientes.html); desbloqueia A2–A4 (#148–#150) com vocabulário comum. **Este change não provisiona** cloud, branches nem domínios.

---

### D-026 — Mapeamento branch → ambiente + contrato de config de lifecycle (2026-07-10) — **#148 / A2**

- **Contexto:** D-025 definiu os três ambientes lógicos; faltava como as **linhas git** se ligam a eles, e como close/promote se separam sem tornar o skill global `rbo-close-change` específico da ForteGB.
- **Decisão (mapa):**
  | Linha git | Ambiente lógico | Notas |
  |-----------|-----------------|-------|
  | laptop (sem deploy) | `local` | `npm run dev` |
  | `feat/*`, `fix/*` | `staging` (via Preview) | backends classe-staging; URL temporária |
  | `staging` (longa duração) | `staging` | pré-prod compartilhada / UAT sócio |
  | `main` | `prod` | produção |
- **Caminho normal:** `feat/*` ou `fix/*` → merge em `staging` → promover `staging` → `main` (passo separado). Hotfix para `main` = exceção (procedimento → #169).
- **Close vs promote:** close de change **deve** aterrar na **integration branch** (ForteGB: `staging`). Promover para prod **não** é automático na Vercel.
- **Contrato de config (opt-in, para #166 — não implementado aqui):**
  - **Default (sem arquivo de config):** close continua a fazer merge para `main` (comportamento atual; outros produtos intactos).
  - **Opt-in:** arquivo pequeno e explícito (ex. `.rbo/lifecycle.yml`) com `integrationBranch: staging` → close faz merge para essa branch.
  - O skill **não** interpreta markdown de ambientes; só config explícita.
- **Lacuna temporária:** até #166, a documentação diz close→staging mas o skill ainda faz merge→`main`. Registrado em `STATUS.md`.
- **Rationale:** mapa humano + contrato agnóstico (default seguro) evita hardcode `staging` no skill global.
- **Consequências:** template e página Ambientes atualizados; DoD de #166 = ler config + ForteGB adiciona o arquivo. **Sem** alteração de código em `ai-skills` neste change; **sem** criar branch remota `staging`.

---

### D-027 — Topologia Vercel: um projeto, Production vs Preview, proteção por senha (2026-07-10) — **#149 / A3**

- **Contexto:** D-025/D-026 definiram ambientes e branches; faltava como a **Vercel** hospeda isso sem confundir Preview com “desligar produção”.
- **Decisão:**
  - **Um** projeto Vercel para o app Nuxt.
  - **Production** = só branch `main` (`prod`).
  - **Preview** = `staging` + `feat/*` / `fix/*` (staging lógico). Production e Previews **coexistem**; cold start serverless ≠ precisar desligar prod.
  - **Proteção de Preview:** senha compartilhada na camada da Vercel; sócios **não** precisam de conta Vercel; um desbloqueio por browser (cookie) libera o deployment inteiro; auth da app (Supabase) continua por baixo, separada.
  - **Env vars:** scope Production → `APP_ENV=prod` + backends prod; scope Preview → `APP_ENV=staging` + backends classe-staging (compartilhado por todos os Previews).
- **Rationale:** free-first / zero-ops; alinha ao mapa D-026; senha evita beta público sem forçar sócios no time Vercel.
- **Riscos:** modo senha pode exigir plano Pro — confirmar no provisionamento; webhooks em Preview podem precisar bypass (#161).
- **Consequências:** template + página Ambientes; **este change não cria** o projeto Vercel nem domínios (#150).

---

### D-028 — Passos 1–2 (Contexto & Funcionalidades) validados (2026-07-10) — **#177**

- **Contexto:** Epic #175 pedia consolidação/validação dos passos 1–2; conteúdo histórico já existia; grilling confirmou que não faltava escopo de produto — faltava decisão explícita + higiene de estado obsoleto.
- **Decisão:**
  - **Passo 1 (Contexto)** aceito: `company-structure.md` + `platform-vision.md`.
  - **Passo 2 (Funcionalidades)** aceito: mapa de oferta em `deliverables.md` + lista em `modules.md`; **sem** novos módulos/itens inventados só para fechar o epic.
  - **Jornadas/telas** (fluxos e screen map) permanecem no **passo 5** (`jornadas-plataforma.md`, `screen-map.md`, epic #176) — rascunho mock-first; re-validar após o passo 4.
  - Higiene: docs de planning não devem contradizer fatos conhecidos (org/board feitos; Architecture produto/stack #1→#38 Done; Q-* resolved/deferred; próximo de definição = passo 4 / #146).
- **Rationale:** DoD de 1–2 = grilling + artefato canônico, não reescrever jornadas; inventar folhas vazias seria progresso falso.
- **Consequências:** fecha #177; habilita fechar #175; passo 5 continua dono das jornadas; build ainda gated por G2 (passos 4–7).

---

### D-029 — Domínios por ambiente (2026-07-10) — **#150 / A4**

- **Contexto:** D-025..D-027 fecharam tiers, branches e Vercel; faltavam **hostnames** para prod, staging estável, Previews e o TLD `.com.br`.
- **Decisão:**
  | Uso | Hostnames |
  |-----|-----------|
  | `local` | `localhost` (sem DNS custom) |
  | `staging` (branch `staging`) | `staging.fortegb.com` (Preview + senha D-027) |
  | Preview `feat/*` / `fix/*` | só `*.vercel.app` (sem subdomínio custom por PR) |
  | `prod` (`main`) | `fortegb.com` **e** `www.fortegb.com` no mesmo Deployment Production |
  | `.com.br` | `fortegb.com.br` + `www.fortegb.com.br` → **301** para `https://fortegb.com` (registrar/CDN); **não** hosts do app; **sem** `staging.fortegb.com.br` |
  | Platform docs | GitHub Pages (inalterado) |
- **Rationale:** um bookmark de staging para sócios; Previews efêmeros; `.com` canônico; `.com.br` só redireciona (DNS sozinho não redireciona HTTP).
- **Consequências:** template + página Ambientes; **este change não provisiona** DNS nem domínios na Vercel. Direção exacta apex↔www no setup. Próximo na área A/dados: #151.

---

### D-030 — Projetos Supabase por ambiente (2026-07-10) — **#151 / B1**

- **Contexto:** D-022 pediu isolamento por projeto Supabase; free tier limita a **2 projetos ativos**; Previews já partilham backends classe-staging (D-027).
- **Decisão:**
  | Alvo | Supabase |
  |------|----------|
  | `local` | Docker / OrbStack (CLI) — **não** 3.º projeto cloud |
  | `staging` + todos os Previews Vercel | projeto cloud **`fortegb-staging`** (partilhado) |
  | `prod` | projeto cloud **`fortegb-prod`** |
  - **PII:** sem cópia de PII de prod para staging/local por padrão (só seed/fictício).
  - **Schema:** um schema-as-code (migrações) nos três alvos; dados/secrets diferem. Ferramenta de migração pode ficar para folha posterior.
  - **Auth redirects:** prod → `fortegb.com`/`www`; staging → `staging.fortegb.com` + padrão Preview `*.vercel.app`; local → `http://localhost:3000`.
  - **Secrets:** scope Vercel Production → chaves prod; Preview → chaves staging; local → `.env`/CLI. Nomes exactos das vars → inventário (#162+).
  - **Free tier:** 2 projetos activos cabem; pause ~7d sem actividade na BD é caveat aceite (staging); caps 500 MB DB / 1 GB storage por projeto.
- **Rationale:** free-first; Previews não precisam de 3.º projeto; local no Docker não gasta slot cloud.
- **Consequências:** template + página Ambientes; **este change não cria** projetos Supabase nem liga secrets na Vercel. Seed → #154.

---

### D-031 — Estratégia de migrações Supabase CLI (2026-07-10) — **#152 / B2**

- **Contexto:** D-030 exige schema-as-code nos três alvos; faltava a ferramenta e o fluxo de apply.
- **Decisão:**
  - **Fonte da verdade:** `supabase/migrations/*.sql` via **Supabase CLI**.
  - **Legado:** `docs/database-schema.sql` = referência até portar; não manter duas fontes vivas.
  - **Apply:** local → CLI no Docker; staging/prod → `supabase db push` (ou equivalente) por projeto ligado — **não** no deploy Vercel.
  - **Ordem cloud:** staging primeiro, depois prod após smoke.
  - **Higiene:** só forward (não editar migração já aplicada); seed ≠ schema (#154); RLS nas migrações com o schema.
  - **Wrappers:** npm scripts finos opcionais depois; sem motor custom.
- **Rationale:** alinhado ao stack Supabase/local Docker; evita surpresa de schema em Preview/Production builds.
- **Consequências:** template + Ambientes; **este change não** corre `supabase init` nem escreve a 1.ª migração — runbook local → #153 (D-032); init concreto → #171 / #43.

---

### D-032 — Runbook Supabase local (2026-07-10) — **#153 / B3**

- **Contexto:** D-030/D-031 exigem stack local via Docker + CLI; faltava o passo a passo escrito. Board já tem toolchain (#170) e bootstrap (#171).
- **Decisão:**
  - **Motor:** OrbStack **preferido** no macOS; Docker Desktop (ou engine compatível) **aceitável**.
  - **DoD do runbook:** instalar motor + CLI; `start` / `stop` / `status`; Studio + chaves → `.env`; `db reset`; falhas comuns (engine parado, portas ocupadas).
  - **Docs only neste leaf:** **não** corre `supabase init` nem cria `supabase/` aqui.
  - **Init / scaffold:** #171 (bootstrap) e/ou #43 (schema em build). O runbook descreve o comando como pré-requisito futuro.
  - **Limites:** #170 = inventário de toolchain; #171 = bootstrap amplo; #154 = seed; cloud `link`/`db push` = D-031 (fora do DoD local).
  - **Artefacto:** `docs/planning/templates/supabase-local.md` + ponteiro em Ambientes.
- **Rationale:** fecha a lacuna operacional sem misturar scaffold de código na Definição; evita duplicar #170/#171.
- **Consequências:** template + Ambientes; supersede o apontar “init → #153” de D-031 — init fica em #171/#43.
