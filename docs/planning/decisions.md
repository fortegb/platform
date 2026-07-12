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
  - Conteúdo (listings, blog, timeline de obra, media) → **CMS** (**Sanity** — D-034).
  - Estado operacional + PII sensível (status, leads, visitas, verificação, contratos Gov.br, RG/CNH) → **Supabase** (Postgres + bucket **privado** com RLS + retenção LGPD).
  - **Vídeo** → embed YouTube/Vimeo (URL como campo); não passar pelo backend.
  - **Social** → fora da plataforma.
  - **Join** conteúdo ↔ operacional por **ID de casa** compartilhado, merge no Nuxt.
- **Alternativas rejeitadas:** Supabase-only (UX de autoria fraca); admin self-hosted sobre Postgres/Directus (viola zero-ops); largar CMS por completo.
- **Consequências:** vendor CMS fechado em **D-034 (Sanity)**; Contentful removido do stack instalado. Pré-resolve armazenamento de Q-005/Q-016 (bucket privado RLS).

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
- **Riscos:** modo senha pode exigir plano Pro — confirmar no provisionamento; webhooks em Preview = bypass (D-040 / #161).
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

---

### D-033 — Seed / dados de teste + LGPD (não-prod) (2026-07-10) — **#154 / B4**

- **Contexto:** D-025/D-030 proíbem PII de prod fora de prod; faltava o contrato do pacote de seed (conteúdo, docs dummy, logins, recreação).
- **Decisão:**
  - **Pacote base único** para local + staging; prod não recebe este seed por padrão.
  - **Supabase operacional:** corretores, leads, visitas, `house_id`s estáveis; conteúdo CMS → #156/#157.
  - **Identidade sintética:** lookalike realista pt-BR; **nunca** clientes reais; **nunca** dump de prod por padrão.
  - **Documentos:** fixtures dummy de RG/CNH no repo; upload só local/staging — **nunca** bucket prod.
  - **Auth de teste:** contas conhecidas (corretor + staff) com passwords documentadas (só não-prod).
  - **Recriável:** wipe + reseed por comando curto (ex. `db reset`).
  - **Artefacto:** `docs/planning/templates/seed-lgpd.md`. Implementação dos ficheiros → após #171/#43.
  - **Fora:** hardening LGPD completo → #126.
- **Rationale:** UAT e ID-verification precisam de dados e docs de teste realistas sem contaminar prod nem violar LGPD.
- **Consequências:** template + Ambientes; sem `seed.sql`/PNGs neste change.

---

### D-034 — Vendor CMS: Sanity (2026-07-10) — **#155 / C1**

- **Contexto:** D-016 deixou Contentful vs Sanity em aberto; Contentful estava em `package.json`. Free-first (D-015) e mapa staging/prod (#156) favorecem Sanity.
- **Decisão:**
  - **Vendor = Sanity** (não Contentful).
  - **Rationale:** free tier mais durável; 2 datasets no free (staging+prod); schema-as-code; evita cliff de preço do Contentful; escala ForteGB (poucas casas/ano).
  - **Limpeza:** docs vivos apontam Sanity; remover dependência `contentful`; composable `useCms` (mocks até provisionar); retitular #45/#63.
  - **Ainda depois:** modelo de conteúdo (#157), Studio/API live. Datasets → **D-035**.
- **Consequências:** D-016 taxonomia mantém-se; só o vendor fecha. Service boundary permanece (troca futura possível, mas Contentful deixa de ser o cliente instalado).

---

### D-035 — Datasets Sanity por ambiente (2026-07-10) — **#156 / C2**

- **Contexto:** D-034 escolheu Sanity (2 datasets no free); faltava o mapa para `local` / `staging` / `prod` / Previews, alinhado a D-027/D-030.
- **Decisão:**
  - **1 projeto Sanity**, datasets **`staging`** e **`production`**.
  - **Mapa:** local + staging + todos os Previews Vercel → dataset `staging`; prod (`main`) → `production`.
  - **Promoção de conteúdo:** editar/validar em `staging`; copiar para `production` com passo **explícito** (CLI/export) — **não** no deploy Vercel.
  - **Scopes:** Vercel Preview → dataset staging; Production → production; local → staging (ou mocks se sem credenciais).
  - Nomes exactos das env vars → #162+. Modelo de conteúdo → #157.
- **Rationale:** espelha Supabase (Previews partilham staging); cabe no free; evita publicar conteúdo de teste em prod por acidente de deploy.
- **Consequências:** template + Ambientes; **este change não cria** o projeto Sanity.

### D-036 — CMS content model (Sanity document types + house split) (2026-07-10) — **#157 / C3**
- **Status:** accepted
- **Contexto:** #157 after D-034/D-035. Need a shared contract for Studio (#45) and portfolio (#63) without implementing schemas yet.
- **Decisão:**
  - **Types:** `house`, `blogPost`, `constructionTimeline`, `mediaKit`.
  - **Depth:** v1 full marketing fields on `house` + `blogPost`; timeline/mediaKit **stub** (house-linked) for later versions (D-018).
  - **House split:** Sanity = marketing (slug, copy, gallery, specs, display price, video URLs) + `houseId` UUID; Supabase = ops (`id` = same UUID, **status**, Tuya device, QR). Nuxt merges by `houseId`. Status is never CMS source of truth.
  - **Video:** external YouTube/Vimeo URL fields only.
  - **Locale:** pt-BR only until a later i18n decision.
  - **DoD this leaf:** docs only — D-036 + `templates/cms-content-model.md`. Schema TS → #45.
- **Rationale:** keeps CMS free of PII/ops; aligns with D-016 dual-store; stubs avoid over-modeling v3 modules in Architecture.
- **Consequences:** template + Ambientes; Studio implements schemas from this inventory.

### D-037 — Integrações: modelo 3-tiers (posturas) (2026-07-10) — **#158**
- **Status:** accepted
- **Contexto:** D-022/D-025 nomearam mock / safe-target / prod-live; faltava o contrato de posturas, defaults, overrides e seleção de adaptadores. Mapa por vendor → #159; alvos → #160.
- **Decisão:**
  - **Posturas (não ambientes):** `mock` (stub in-process), `safe-target` (API real → sandbox/teste), `prod-live` (API real → produção).
  - **Defaults:** `local` → mock; `staging` + Previews → safe-target; `prod` → prod-live.
  - **Overrides:** só em local/staging, só entre `{mock, safe-target}`; `prod` sempre prod-live; nunca prod-live fora de prod; nunca inferir de credenciais.
  - **Seleção:** `effective = override[integration] ?? default(APP_ENV)`; seam de adaptadores (D-017); nomes de env → #162.
  - **DoD:** docs only — D-037 + `templates/integrations-tiers.md`.
- **Rationale:** separa segurança de comportamento da topologia de ambientes; permite local→sandbox sem abrir produção.
- **Consequências:** template + Ambientes; #159–#160/#172 preenchem mapa/alvos/mocks sem reabrir regras.

### D-038 — Integrações: mapa por vendor (classe de alvo + fase) (2026-07-10) — **#159**
- **Status:** accepted
- **Contexto:** D-037 fechou posturas; faltava inventário, classe de safe-target e fase MVP por vendor. Alvos concretos → #160.
- **Decisão:**
  - **Inventário:** HubSpot, Tuya, WhatsApp, Telegram, Google Calendar, QStash; Gov.br linha deferred/manual. **Não** remapear Supabase/Sanity.
  - **Safe-target (classe):** HubSpot = portal teste; Tuya = dispositivo teste; WA = número sandbox; Telegram = bot dev; Calendar = calendário teste; QStash = credenciais dev/teste.
  - **Fases (D-018):** HubSpot + WA + QStash = v1; Telegram = seam v1 / bots depois; Tuya + Calendar = v2; Gov.br = manual v1.
  - **DoD:** docs only — D-038 + `templates/integrations-map.md`.
- **Rationale:** #160 provisiona sem reabrir inventário; v2 classes documentadas cedo.
- **Consequências:** template + Ambientes; IDs/contas → #160.

### D-039 — Integrações: alvos de teste seguros (contrato + slots) (2026-07-10) — **#160**
- **Status:** accepted
- **Contexto:** D-038 definiu classes; faltava o contrato concreto (must/must-not, slots, onde vivem secrets) sem inventar IDs.
- **Decisão:**
  - **Spec agora, provisionar depois:** slots TBD; sem IDs inventados; sem criar contas neste leaf.
  - **Must/must-not** por vendor (ex. Tuya ≠ fechadura de casa à venda; HubSpot ≠ portal de vendas ao vivo).
  - **Secrets:** Vercel (Preview=staging-class; Production=prod) + `.env` local; nunca git/HTML. Labels não-secretos podem ir no template. Owner = ForteGB tech.
  - **DoD:** docs only — D-039 + `templates/integrations-safe-targets.md`. Env names → #162; runbook → #164/#165.
- **Rationale:** mesmo padrão Ambientes (contrato antes do setup); evita secrets no repo.
- **Consequências:** template + Ambientes; preencher slots no setup.

### D-040 — Integrações: callbacks/webhooks por ambiente (2026-07-10) — **#161**
- **Status:** accepted
- **Contexto:** D-027/D-029 deram hosts e senha em Preview; D-037..D-039 fecharam posturas/mapa/alvos. Faltava **onde** registrar URLs de callback sem usar Preview efêmero.
- **Decisão:**
  - **Bases canônicas:** `prod` → `https://fortegb.com`; staging estável → `https://staging.fortegb.com`; local → mock default, túnel opcional (#170).
  - **Preview `feat/*`/`fix/*`:** **bypass** — nunca registrar `*.vercel.app`; senha Vercel permanece (D-027).
  - **Sink único de teste:** sandboxes apontam só a `staging.fortegb.com`.
  - **Path:** `/api/webhooks/<vendor>`; verificação de assinatura obrigatória em inbound real; secrets como D-039.
  - **DoD:** docs only — D-040 + `templates/integrations-webhooks.md`. Env names → #162; túnel → #170; mocks → #172; handlers → build.
- **Rationale:** Preview não é host estável nem atravessável por vendor atrás da senha; free-first aceita um sink de staging.
- **Consequências:** template + Ambientes; UAT de inbound no staging estável.

### D-041 — Config: inventário + convenção de nomes de env vars (2026-07-10) — **#162**
- **Status:** accepted
- **Contexto:** D-025 fixou `APP_ENV`; D-027/D-030/D-035/D-037–D-040 diferiram nomes exactos. `nuxt.config.ts` já tem um subconjunto.
- **Decisão:**
  - **Convenção:** `SCREAMING_SNAKE`; cliente só `NUXT_PUBLIC_*`; secrets sem esse prefixo; prefixos por vendor; overrides `INTEGRATION_TIER_<VENDOR>` (D-037).
  - **Inventário:** tabela canónica (runtime, Supabase, Sanity, HubSpot, WA, Telegram, QStash, Tuya, Calendar, webhook secrets, overrides) com fase v1/v2.
  - **DoD:** docs only — D-041 + `templates/env-vars.md`. Scoping → #163; política → #164; `.env.example` → #165. Sem valores no git.
- **Rationale:** um contrato de nomes evita drift no setup Vercel e no `.env.example`.
- **Consequências:** template + Ambientes; código alinha no build.

### D-042 — Config: modelo de scoping (Vercel Production/Preview + .env local) (2026-07-10) — **#163**
- **Status:** accepted
- **Contexto:** D-027/D-030/D-041 fixaram topologia e nomes; faltava o contrato de **onde** cada valor vive.
- **Decisão:**
  - **Três superfícies:** Vercel Production (`APP_ENV=prod` + backends prod); Vercel Preview (`APP_ENV=staging` + staging-class, partilhado por `staging` e `feat/*`); local `.env`/`.env.local` (`APP_ENV=local`, mock/local por default).
  - **Mesmos nomes** (D-041); valores por superfície. Development Vercel **não** obrigatório.
  - **Must-not:** prod secrets em Preview ou local por default; nomes distintos por scope.
  - **DoD:** docs only — D-042 + `templates/env-scoping.md`. Acesso → #164; `.env.example` → #165.
- **Rationale:** um Preview set evita proliferar secrets; alinha Supabase/Sanity já partilhados.
- **Consequências:** template + Ambientes; provisionar valores no setup.

### D-043 — Config: gestão de secrets + política de acesso (2026-07-10) — **#164**
- **Status:** accepted
- **Contexto:** D-039/D-041/D-042 fixaram placement e nomes; faltava **quem** acessa e **quando** rotacionar.
- **Decisão:**
  - **Owner:** ForteGB tech — único com escrita em env Production/Preview e API keys.
  - **Sócios:** sem acesso a secrets; Preview via senha (D-027).
  - **Must-not:** git, HTML público, issues/PRs/OpenSpec, chat com sócios, sync de `.env` em cloud pessoal.
  - **Rotação:** em vazamento / device loss / vendor compromise; calendário periódico opcional.
  - **Vault pago:** não obrigatório no v1.
  - **DoD:** docs only — D-043 + `templates/secrets-access.md`. SETUP-CREDENTIALS / `.env.example` → #165.
- **Rationale:** least privilege numa operação familiar solo-tech; evita vazamento por “partilhar para ajudar”.
- **Consequências:** template + Ambientes; #165 referencia esta política sem colar valores.

### D-044 — Config: .env.example + estrutura SETUP-CREDENTIALS (2026-07-10) — **#165**
- **Status:** accepted
- **Contexto:** D-041..D-043 fecharam nomes, superfícies e acesso; faltavam os artefactos copiáveis e o runbook sem secrets.
- **Decisão:**
  - **`.env.example`** na raiz: todos os nomes D-041; valores vazios / `APP_ENV=local`; comentários de fase; commitável.
  - **`docs/SETUP-CREDENTIALS.md`:** runbook por vendor (como obter + onde colar local/Preview/Production); sem valores secretos; sem Contentful; aponta D-042/D-043.
  - **Gitignore:** `.env`, `.env.local`, `.env.*.local`.
  - **Nota de rotação:** privada (fora deste ficheiro / fora do HTML público).
  - **DoD:** D-044 + `.env.example` + SETUP reescrito + `templates/env-example.md`. Preencher valores reais → #47 / setup.
- **Rationale:** um template commitável evita drift; SETUP antigo misturava exemplos tipo JWT e stack obsoleto.
- **Consequências:** Ambientes aponta aos artefactos; área E de config (#162–#165) fechada na definição.

### D-045 — CI/CD: stage vs close + lifecycle opt-in (2026-07-10) — **#166**
- **Status:** accepted
- **Contexto:** D-026 mapeou branches e propôs close→`staging`; grilling de #166 mostrou que arquivar/fechar a issue no land é cedo demais (UAT em staging pode falhar). Skills globais não podem hardcodar ForteGB.
- **Decisão:**
  - **Dois passos humanos:** (1) **`rbo-stage-change`** — `feat/*` → `integrationBranch` (`staging`); OpenSpec **ativo**; issue **aberta**; Status permanece In Progress; **sem** `pages:sync`. (2) **`rbo-close-change`** — archive + `staging`→`main` + `Closes`/Done + `pages:sync` (quando o repo suporta).
  - **Opt-in:** `.rbo/lifecycle.yml` com `integrationBranch: staging`. **Ausente** → close inalterado (`feat/*`→`main`).
  - **Fail-closed:** stage falha se `origin/<integrationBranch>` não existir (sem auto-criar). Close com config presente **não** faz fallback `feat/*`→`main` se o change não estiver em staging.
  - **D-026:** mantém o mapa de branches; **supersede** só a semântica “close aterra em staging”.
  - **Fora deste leaf:** criar remote `staging` (#167); Status de board `Staging`; hotfix/promote ceremony (#169).
  - **DoD plataforma:** D-045 + `.rbo/lifecycle.yml` + templates/Ambientes/spec. **Skills** → issue companheira em `ai-skills` (ciclo completo).
- **Rationale:** “close” continua a significar “pronto de verdade”; staging é integração, não produção; outros produtos sem o ficheiro ficam intactos.
- **Consequências:** canon + ficheiro opt-in neste repo; implementação dos skills noutro ciclo em `ai-skills`.

### D-046 — CI/CD: pipeline de deploy branch→Vercel (2026-07-11) — **#167**
- **Status:** accepted
- **Contexto:** D-027 fixou a topologia Vercel (Production/Preview); faltava decidir gatilho de deploy, gate de merge, rollback, notificações, e o timing de criação do `origin/staging` (D-045 já o exige mas não existe).
- **Decisão:**
  - **Gatilho:** integração git nativa da Vercel **é** o pipeline; sem GitHub Actions custom agora. Hooks de build custom podem ser adicionados depois, se surgir necessidade concreta.
  - **Gate de merge:** `main` exige deploy Vercel com sucesso antes do merge. `staging` **não** — seu papel é integração/validação (D-045), não gatekeeping.
  - **Rollback:** rollback nativo do dashboard Vercel; sem procedimento custom.
  - **Notificações:** e-mails default da Vercel bastam; sem integração custom (Telegram/Slack).
  - **`origin/staging`:** decisão travada agora (long-lived, a partir de `main`, per `environments.md`); criação real **adiada para o bootstrap de Execução** (#42/#46), não neste leaf de Definição.
  - **Gap temporário:** leaves de Definição que fecharem antes do bootstrap de `staging` fazem merge `feat/*`→`main` direto — mesmo padrão usado para fechar o próprio #166.
  - **DoD:** D-046 + `templates/cicd-deploy-pipeline.md` + pointers em `environments.md`.
- **Rationale:** decisão sem provisionamento — G2 continua a gatear Execução; branch protection só em `main` porque `staging` existe para acomodar falhas, não bloqueá-las.
- **Consequências:** canon fechado; toggle de branch protection + criação de `origin/staging` ficam para #42/#46 (Execução).

### D-047 — CI/CD: automação de migrações (aplicar on merge) (2026-07-11) — **#168**
- **Status:** accepted
- **Contexto:** D-031 fixou o mecanismo de migrações (CLI, ordem staging→prod); faltava decidir se o apply é automático (CI) ou manual, e como evitar esquecimento.
- **Decisão:**
  - **Manual, não automatizado.** Automatizar exigiria workflow CI novo, superfície de secrets própria (fora dos scopes Vercel de D-042/D-043) e gate de aprovação para preservar a ordem staging→smoke→prod de D-031 — custo real sem necessidade identificada agora. Não é porta fechada: revisitar se esquecimento virar problema recorrente real.
  - **Gatilhos:** após `rbo-stage-change` pousar em `staging` → aplicar migração no projeto staging. Após `rbo-close-change` fechar para `main` (pós-smoke) → aplicar no projeto prod.
  - **Rastreabilidade:** nome do arquivo de migração referenciado na mensagem de commit do stage/close — sem ferramenta nova.
  - **Sem detector automático de migração pendente.** Esquecimento gera erro de aplicação visível e imediato (código espera schema que não existe) — mesmo raciocínio de risco aceitável/auto-corretivo já usado em D-046 (rollback, notificações).
  - **DoD:** D-047 + pointer em `environments.md` perto de D-031/D-032. Skills (`rbo-stage-change`/`rbo-close-change`) → ciclo companheiro em `ai-skills`, fora deste leaf.
- **Rationale:** proporcional à escala solo/família; evita nova superfície de CI/secrets sem necessidade demonstrada; mesma lógica de "porta não fechada" de D-046.
- **Consequências:** canon fechado; implementação dos passos de gatilho nas skills → `ai-skills` (ciclo separado).

### D-048 — CI/CD: processo de promoção/release (staging→main) (2026-07-11) — **#169**
- **Status:** accepted
- **Contexto:** D-025 nomeou "hotfix" como exceção sancionada mas adiou o procedimento; D-026 separou close de promote mas não definiu o que acontece com múltiplas changes staged simultaneamente. Ambos fecham aqui.
- **Decisão:**
  - **Promoção uma change de cada vez.** Fechar uma change staged promove tudo que está em `staging` para `main` (propriedade do merge de `rbo-close-change`) — decisão explícita, não efeito colateral acidental. Na prática: não fechar uma change staged enquanto outra ainda está em validação na mesma branch.
  - **Hotfix:** branch `hotfix/<nome>` a partir de `main`; `rbo-close-change` (v0.5, `ai-skills`) reconhece o prefixo e faz bypass do requisito de staging, merge direto para `main` — mesmo caminho que repos sem CI/CD já usam. Continua com tracking normal de issue + OpenSpec; só o passo de staging é pulado.
  - **Sync obrigatório pós-hotfix:** merge `main`→`staging` imediatamente após o hotfix aterrar em `main` — não opcional, não depende de memória.
  - **Registro:** trilha normal de issue/OpenSpec/commit basta. `decisions.md` regista o procedimento (este leaf), não cada uso individual.
  - **DoD:** D-048 + pointer em `environments.md` perto de D-045/D-046/D-047. Suporte de skills já implementado em `ai-skills` v0.7.0 (`uniform-hotfix-exception`, ai-skills#10) — ciclo separado, não este leaf.
- **Rationale:** promoção seletiva exigiria tooling nova sem necessidade demonstrada; sync pós-hotfix é barato agora e caro de descobrir em falta depois; registro por uso seria cerimônia desproporcional a um mecanismo de exceção.
- **Consequências:** canon fechado; implementação de skills já entregue em ciclo separado (`ai-skills`).

### D-049 — Dev local: toolchain (2026-07-11) — **#170**
- **Status:** accepted
- **Contexto:** D-032 escopou #170 explicitamente como inventário de toolchain, distinto do bootstrap amplo (#171) e do seed (#154).
- **Decisão:**
  - **Lista:** exatamente quatro ferramentas — Node.js, Docker/OrbStack (D-032), Supabase CLI (D-031), ngrok.
  - **Node:** pin duplo — `.nvmrc` (uso diário via `nvm use`) + `engines` em `package.json` (rede de segurança grátis no `npm install` se `nvm use` for esquecido). Nenhum substitui o outro.
  - **Sem pin de versão** para Docker/OrbStack, Supabase CLI, ngrok — ferramentas CLI invocadas por humano, com auto-atualização própria; um pin aqui seria referência que fica desatualizada, sem mecanismo grátis (como `engines`) para detectar drift.
  - **ngrok confirmado opcional, só para túnel** — já decidido em D-040 ("local → mock default, túnel opcional"); este leaf só documenta como parte da lista, não redecide.
  - **DoD:** D-049 + `templates/dev-local-toolchain.md` + pointer em `environments.md` perto de D-030–D-032.
- **Rationale:** Node é a única ferramenta onde drift de versão causa bugs reais e sutis; as outras três já têm rede de segurança própria (auto-update).
- **Consequências:** canon fechado; instalação/bootstrap real → #171.

### D-050 — Dev local: runbook de bootstrap (2026-07-11) — **#171**
- **Status:** accepted
- **Contexto:** D-032/D-049 apontaram o runbook de bootstrap real para este leaf sem escrevê-lo — junta peças já decididas (toolchain, Supabase local, env vars) num checklist único e ordenado.
- **Decisão:**
  - **Escopo:** só local — clone → toolchain (D-049/#170) → Supabase local (D-032) → env vars (D-044) → `npm run dev` funcionando. Staging/prod **fora** — já são de #42/#43/#46 (Execução); incluir aqui duplicaria trabalho e confundiria a separação Definição/Execução que o G2 existe para impor.
  - **Localização:** `docs/planning/templates/dev-local-bootstrap.md`, consistente com os outros templates desta sessão.
  - **Docs only:** este leaf não corre `supabase init` nem qualquer comando de bootstrap — mesmo precedente de D-032 para o runbook local Supabase.
  - **DoD:** D-050 + `templates/dev-local-bootstrap.md` + pointer em `environments.md`.
- **Rationale:** as peças já existem como decisões; falta só ordenar e consolidar num documento que um novo developer segue do início ao fim sem precisar de mais nada.
- **Consequências:** canon fechado; runbook de staging/prod é trabalho separado, na fase certa (Execução).

### D-051 — Dev local: estratégia de mock de integrações (2026-07-11) — **#172**
- **Status:** accepted
- **Contexto:** D-037 fixou as regras de postura (mock/safe-target/prod-live) mas adiou a estratégia de mock em si para este leaf, ao lado de #159 (mapa por vendor) e #160 (safe-targets), ambos já fechados.
- **Decisão:**
  - **Fidelidade:** happy-path por padrão + override booleano único por vendor. Nem trivial-só (código de erro nunca seria exercitado localmente) nem parametrização elaborada de tipos de falha (over-engineering para a escala solo/família — nuance de tipo de falha valida-se no tier safe-target, contra API sandbox real).
  - **Mecanismo:** env var por vendor, convenção de nomes de D-041 — `MOCK_<VENDOR>_FORCE_ERROR=true` em `.env.local`. Sem ficheiro de config novo nem parâmetro de código.
  - **Localização:** mock dentro do próprio módulo adapter de cada vendor (padrão D-017, um adapter por terceiro) — sem diretório central separado.
  - **DoD:** D-051 + pointer em `environments.md` / docs de integrações perto de D-037–D-040. Sem código de mock — implementação real → build (passo 8).
- **Rationale:** proporcional à escala solo/família; falha genérica única já é suficiente para exercitar tratamento de erro localmente sem construir simulação elaborada.
- **Consequências:** canon fechado; implementação real dos mocks → Execução (build).

### D-052 — Tuya: viabilidade da API + modo de falha (2026-07-11) — **#181**
- **Status:** accepted
- **Contexto:** leaf de maior risco de #179 (Arquitetura de domínio), nunca grillado antes. Device físico já comprado e instalado: fechadura Intelar X2 (Tuya, WiFi), numa casa **atualmente à venda**. #181 escopado como mecanismo/viabilidade, não jornada (jornada = #180).
- **Decisão:**
  - **Viabilidade condicional:** app de consumidor Tuya já confirma senhas temporárias com janela de horário — sinal forte de capacidade do dispositivo. Acesso via Tuya Cloud API (o que o backend chamaria) permanece **não verificado** até spike manual — spike é escopo **ativo e de curto prazo** (não um "algum dia se o volume justificar"), mas a execução em si (linkagem à Tuya IoT Platform, teste real) fica com #77/#135 (Execução), fora do que este leaf Definição escreve/decide.
  - **Adapter seam (D-017) esconde o mecanismo:** interface estável `provisionAccess(visit)` / `markUsed(credential)` / `revoke(credential)`. Resto da jornada (identidade, booking, CRM/HubSpot, WhatsApp) chama só essa interface — nunca sabe qual implementação está ativa por baixo.
  - **Dois mecanismos de primeira classe, nenhum deferido:** `local-pool` (pool de códigos pré-provisionados por casa, escritos diretamente na fechadura via app, sem chamada de API em tempo real no caminho crítico) e `tuya-live` (Tuya Cloud API real) são **ambos parte ativa da arquitetura, da jornada e do grilling** — não "local-pool agora, Tuya API talvez um dia". `tuya-live` não é rebaixado a upgrade opcional de baixa prioridade.
  - **Sequenciamento de lançamento (decisão prática, não de arquitetura):** `local-pool` é o **default no lançamento**, porque não depende de confirmação da Cloud API para embarcar. `tuya-live` passa a estar disponível assim que o spike (curto prazo, não bloqueado por volume de visitas) confirmar viabilidade real — a partir daí, qual mecanismo é primário é uma decisão de operação, não uma reabertura de arquitetura.
  - **Fallback / modo de falha** (aplica-se a ambos os mecanismos, inclusive com `tuya-live` ativo): código de emergência estático por casa (local, keypad, sem dependência de nuvem) + reagendamento — nunca deslocamento físico de staff como camada desenhada.
  - **Detecção de falha:** checagem síncrona no momento da emissão (erro/timeout/offline) dispara alerta a staff via WhatsApp imediatamente — nunca espera relato do visitante. Timeout mais curto no fluxo instantâneo (QR) vs. agendado (número exato → tuning de build).
  - **Ciclo de vida do código de emergência:** escopo por casa (não um único código para todo o portfólio); rotação mensal + imediata após cada uso real.
  - **Armazenamento/auditoria:** tabela Supabase restrita (liga-se à epic LGPD #126–129); todo gatilho de fallback gera log (casa, timestamp, staff).
  - **Manutenção v1:** Supabase Studio (sem UI bespoke) — ligado explicitamente à resolução futura de #184 (admin) se a escala justificar mais tarde.
  - **Conflito com D-039 resolvido:** a fechadura instalada é **prod-only** — nunca vira default de safe-target em staging (D-037: staging/Previews → safe-target por padrão). Um segundo device dedicado a teste será comprado (spec TBD — mesmo requisito mínimo: expor o mesmo Standard Instruction Set/DP de senha temporária do X2) antes de qualquer teste automatizado do fluxo de escrita de senha, mesmo padrão "spec agora, provisiona depois" de D-039.
  - **DoD:** docs only — D-052 + `templates/tuya-access-adapter.md`. Resolve Q-006. Spike real + implementação de ambos os mecanismos → #77/#135 (Execução).
- **Rationale:** manter os dois mecanismos como cidadãos de primeira classe evita subinvestir na trilha Tuya API (ela continua no plano ativo, não num "depois" indefinido) e ao mesmo tempo dá um caminho de lançamento (`local-pool`) que não fica bloqueado por uma dependência de rede ainda não confirmada. Sequenciar o default não é o mesmo que descartar ou adiar uma das duas opções.
- **Consequências:** canon fechado; #180 (modelo de dados de visitas) e #182/#183 podem seguir sem esperar confirmação da Cloud API; segundo lock de teste é pré-requisito antes de #77/#135 automatizarem o safe-target; #77/#135 devem escopar o spike/implementação da Tuya API como trabalho de curto prazo, não condicional a crescimento de volume.

### D-053 — Visitas: modelo de dados + verificação de identidade (2026-07-12) — **#180**
- **Status:** accepted
- **Contexto:** segundo leaf de #179 (Arquitetura de domínio), na sequência de #181. Schema legado (`docs/database-schema.sql`) tinha uma tabela `visits` denormalizada (senha, dados de verificação, fotos em base64/URL, tudo numa linha só) que nunca foi atualizada para o modelo de adapter de D-052 nem resolve Q-005. #180 escopado como mecanismo/viabilidade, não jornada (jornada = Passo 5 / #176); tuning de implementação (biblioteca exata, threshold de confiança, UI da fila) → #80 (Execução), mesmo padrão de D-052 apontando para #77/#135.
- **Decisão:**
  - **Mecanismo de verificação (resolve Q-005):** `client-match` (biblioteca frontend compara selfie a documento) é o mecanismo **primário para os dois fluxos** (agendado e instantâneo) — sem split por fluxo. `staff-review` é a **fila de exceção compartilhada** (já nomeada em D-018), acionada tanto automaticamente (confiança baixa) quanto pelo próprio visitante contatando staff via WhatsApp.
  - **Fluxo instantâneo em falha:** sem espera síncrona ao vivo (sem polling/timer no fluxo) — recusa automática imediata, com um link/número de WhatsApp para contato direto com staff como escape hatch. O visitante decide se espera resposta; o sistema não o mantém num estado bloqueante. Mesmo padrão "escape hatch humano barato, sem dependência síncrona desenhada" do fallback de D-052 (só invertido: lá staff contata visitante; aqui visitante contata staff).
  - **Resolução via WhatsApp = staff-review normal:** quando staff verifica manualmente (selfie + RG/CNH recebidos por WhatsApp) e aprova, o sistema registra isso como `verification_attempt` com `method: staff-review, outcome: approved` e **só então** roda o `provisionAccess()` normal do adapter Tuya (D-052) — staff nunca entrega um código ad hoc (nem `local-pool`, nem o código de emergência de D-052) como atalho para contornar verificação. Acesso só sai através de uma visita verificada e registrada, automática ou manualmente.
  - **Reuso em visitas recorrentes:** resultado de verificação vive no `Cliente` (`identity_verified_at`, já existe via D-020/CPF) — não por visita. Janela de validade de **12 meses**; dentro dela, uma nova visita pula a verificação inteiramente; fora dela, roda o fluxo normal (`client-match` → `staff-review` se necessário) e o timestamp é renovado.
  - **Retenção diferenciada por artefato (LGPD, resolve parte de Q-005):**
    - **Selfie:** efêmera — apaga imediatamente na aprovação; retém 30 dias se rejeitada/em exceção (auditoria).
    - **Documento (RG/CNH):** retido **enquanto a verificação estiver ativa** (mesma janela de 12 meses do `Cliente`) — cobre a necessidade de identificar o visitante em caso de danos/incidentes durante qualquer visita coberta por essa verificação; apagado e substituído na renovação/expiração. Retenção deve constar da política de privacidade (`#61`/`#96` — tarefa de copy, não desta leaf).
  - **Modelo de dados — três entidades, substitui a tabela legada:**
    - **`Cliente`** (D-020) ganha `identity_verified_at`.
    - **`verification_attempt`** (nova) — uma por visita, exceto quando reusada via `Cliente`; guarda refs de selfie/documento, confiança, outcome, method.
    - **`visit`** (substitui `visits` legada) — progressão de status `pending_verification` → `verified` → `access_provisioned` → `completed`/`declined`.
  - **Sequenciamento (hard gate):** `provisionAccess` (adapter Tuya, D-052) só é chamado depois de `visit.status = verified` — verificação de identidade nunca roda em paralelo com nem é contornável pelo acesso.
  - **DoD:** docs only — D-053 + pointer em `templates/tuya-access-adapter.md` (ligação ao adapter) ou novo template dedicado. Resolve Q-005. Tuning de implementação (biblioteca, threshold, UI da fila) → #80 (Execução).
- **Rationale:** um mecanismo de verificação único para os dois fluxos evita duplicar modelo/pipeline; a fila de exceção reaproveitada (automática ou via WhatsApp) evita inventar um segundo caminho de aprovação. Reuso por `Cliente` evita re-upload de documentos em toda visita recorrente sem enfraquecer a garantia (janela de validade expira). Retenção diferenciada por artefato equilibra minimização LGPD com a necessidade real de rastreabilidade em caso de danos. O hard gate entre verificação e acesso é o que torna os dois adapters (identidade + Tuya) componíveis sem depender de disciplina manual.
- **Consequências:** canon fechado; Passo 5 (#176) pode desenhar a jornada sobre um modelo já decidido; #80 (Execução) implementa sem reabrir arquitetura; #182/#183 (mensageria/RBAC) podem assumir que `Cliente.identity_verified_at` e o hard gate de `visit.status` já existem.

### D-054 — Mensageria: WhatsApp/Telegram — provider + gatilhos + consentimento (2026-07-12) — **#182**
- **Status:** accepted
- **Contexto:** terceiro leaf de #179 (Arquitetura de domínio). D-017 fixou "Telegram-first (grátis; WhatsApp pago-quando-útil)" de forma genérica, mas D-052/D-053 já assumiram WhatsApp informalmente para alertas de staff e o escape hatch visitante→staff, sem nunca reconciliar isso com D-017. #182 escopado como mecanismo/viabilidade, não jornada; enumeração exata de gatilhos → Passo 5 (#176); escolha de vendor + build → #75 (Execução).
- **Decisão:**
  - **Split por direção, não por custo:** **WhatsApp sempre** para qualquer mensagem externa (visitante, cliente **ou corretor** — qualquer parte fora da ForteGB), sem exceção — forçar Telegram numa parte externa (instalar app, criar conta) não é aceitável. **Telegram** só para notificações **internas** (staff/sistema, sem parte externa envolvida) — não é preferência de custo genérica, é justificado tecnicamente: Bot API do Telegram não exige processo de aprovação de template, é gratuito independente de volume, e o setup é trivial (BotFather, minutos) vs. WhatsApp Business API (verificação de negócio, templates pré-aprovados para mensagens iniciadas pelo negócio fora da janela de 24h). Corrige D-017 para o escopo exato onde "Telegram-first" ainda se aplica.
  - **Consentimento (LGPD):** dois escopos distintos.
    - **Transacional/operacional** (confirmação de visita, entrega de código de acesso, escalonamento a staff, lembretes) — coberto implicitamente pelo campo WhatsApp obrigatório do `Cliente` (D-020) + a ação específica tomada (agendar visita, registrar-se como lead). Sem checkbox de opt-in adicional.
    - **Marketing/promocional** (anúncios de novos imóveis, nutrição) — escopo de consentimento **separado**, opt-in explícito, off por padrão. Nomeado agora para não ser conflado depois (mensageria promocional é v2+ / D-018), sem construir nada agora.
  - **Provider — spec agora, escolhe depois (mesmo padrão do segundo lock de teste em D-052):** não escolhido nesta leaf. Critérios de seleção: suporte a mensagens transacionais via template; preço razoável para o mercado BR; compatível com runtime serverless (sem processo persistente). Candidatos conhecidos (WhatsApp Business API direto vs. wrapper Twilio) e a escolha real ficam com **#75** (Execução).
  - **Mecanismo de envio:** todo envio (WhatsApp ou Telegram) roteado via **QStash** (D-017) — nunca chamada síncrona dentro do handler da requisição que dispara a mensagem. Reaproveita o padrão de retry/delay já decidido, não introduz um novo.
  - **Adapter:** mensageria é mais um vendor atrás do adapter seam já existente (D-017) — mesma forma do Tuya (D-052), não uma decisão nova.
  - **DoD:** docs only — D-054 + `templates/mensageria-provider-gatilhos.md`. Sem Q-XXX prévia a resolver (gap identificado na revisão pós-#146, não estava em `open-questions.md`). Escolha de vendor + implementação → #75 (Execução); enumeração de gatilhos → Passo 5 (#176).
- **Rationale:** o split por direção (externo vs. interno) resolve a tensão real entre D-017 (Telegram-first genérico) e o uso já assumido de WhatsApp em D-052/D-053, com uma razão técnica concreta (fricção de template/custo/setup) em vez de só preferência. Consentimento implícito para transacional evita ceremonia desproporcional à escala; nomear o escopo de marketing agora evita conflação futura sem construir nada prematuro. Adiar a escolha de vendor casa com o padrão já usado em Tuya — verificação real precisa de conta viva, não mais especulação.
- **Consequências:** canon fechado; #75 (Execução) escolhe vendor + implementa sem reabrir a arquitetura; Passo 5 (#176) desenha a jornada de gatilhos sobre esta política já decidida; #183/#184 (RBAC/admin) podem assumir o split WhatsApp-externo/Telegram-interno já resolvido.

### D-055 — RBAC: modelo de papéis e permissões (2026-07-12) — **#183**
- **Status:** accepted
- **Contexto:** quarto leaf de #179 (Arquitetura de domínio). D-018 já tinha nomeado "RBAC cobrindo todos os papéis" como item **lock now** (fundacional, difícil reverter), mas nunca foi formalizado — só existia uma tabela solta em `architecture.md` §2 (Visitante/Cliente/Corretor/Staff/Admin/Digital/Sócio-investidor) com sobreposição real documentada (Ricardo = Admin **e** Digital; os três fundadores = Admin **e** Sócio). #183 escopado como **modelo geral**, não específico a corretor; mecanismo/viabilidade, não jornada. Mecanismo exato de RLS (JWT claims vs. lookup), UI de atribuição de papel e matriz de permissões detalhada → #50 (Execução).
- **Decisão:**
  - **Um `role` por usuário, sem multi-atribuição:** enum único — `cliente | corretor | staff | admin`. Sem tabela `user_roles` many-to-many. Corretor e Cliente são relações mutuamente exclusivas com o negócio (corretor não compra, cliente não vende) — multi-papel não reflete a realidade do domínio.
  - **"Digital" e "Sócio/investidor" não são papéis de RBAC:** são fatos organizacionais (quem constrói a plataforma, quem é fundador/dono), registrados em `company-structure.md`, não campos que o sistema de permissões verifica — não delimitam nenhuma capacidade distinta do sistema por si só.
  - **Hierarquia na avaliação, não empilhamento no armazenamento:** Admin não é "Staff + Admin" armazenado — é um único papel que, na avaliação de uma checagem de permissão, é hierarquicamente superior a Staff (uma checagem "requer nível Staff" passa automaticamente para Admin). "Admin pode fazer o papel de Staff" é uma propriedade de avaliação/perfil, não uma segunda atribuição de papel.
  - **Enforcement em duas camadas:** app-level (middleware/rota — UX, não gatekeeping de segurança real) **e** Supabase RLS (fronteira de segurança real, por linha) — mesmo padrão já usado para o bucket privado de documentos (D-016/D-030). Um bug num route guard não pode ser a única coisa entre um Corretor e os leads de outro Corretor.
  - **`Visitante` não é um valor armazenado:** é o caso default/ausência de sessão para quem não tem conta — não um enum a persistir nem uma entidade individualmente rastreada pelo RBAC. Tracking de tráfego anônimo (Google Ads, GA4) é preocupação separada (`#124`), em eixo ortogonal à autorização.
  - **DoD:** docs only — D-055 + `templates/rbac-modelo-papeis.md`. Sem Q-XXX prévia a resolver (gap identificado na revisão pós-#146). Mecanismo exato de RLS, UI de atribuição, matriz de permissões detalhada → #50 (Execução).
- **Rationale:** um enum único por usuário evita machinery de multi-papel que a realidade do domínio (corretor ≠ cliente ≠ staff) não pede; tratar "Digital"/"Sócio" como fatos organizacionais em vez de papéis de RBAC evita inflar o enum com labels que não gateiam nada. Hierarquia na avaliação (não no armazenamento) resolve a sobreposição documentada (Ricardo = Admin+Digital) sem multi-atribuição. Duas camadas de enforcement — não uma só — porque middleware é conveniência de UX, RLS é a fronteira de segurança real; a mesma lógica já aplicada ao bucket privado de documentos.
- **Consequências:** canon fechado; #50 (Execução) implementa RLS/perfis sem reabrir arquitetura; Passo 5 (#176) desenha telas/fluxos sobre um modelo de papéis já decidido; #184 (admin) pode assumir que Admin ⊇ Staff hierarquicamente ao resolver seu conflito de build-vs-buy.

### D-056 — Admin: resolução do conflito build-vs-buy (2026-07-12) — **#184**
- **Status:** accepted
- **Contexto:** quinto e último leaf de #179 (Arquitetura de domínio). O requirement existente em `platform-architecture` ("Build-vs-buy default") proíbe "back-office admin UIs for owner-only content editing" — mas isso é escopado a **edição de conteúdo** (casas, fotos, blog), já corretamente resolvido por Sanity (D-034). A necessidade declarada ao longo de D-052–D-055 (staff aprovar corretor, staff revisar fila de exceção de verificação de identidade, staff gerenciar códigos de emergência Tuya, atribuição de papel RBAC) é de outra natureza — **UI de fluxo operacional**, categoria que o requirement original nunca endereçou. Não é um conflito real de arquitetura; é um requirement escrito de forma estreita demais que precisa de emenda.
- **Decisão:**
  - **Reframe:** "admin" tem dois significados distintos que a regra original conflava — **edição de conteúdo** (Sanity/Supabase Studio, regra original continua correta) vs. **UI de fluxo operacional** (aprovações, filas de exceção, ações com efeitos colaterais), categoria nova a nomear explicitamente.
  - **Teste de três partes para justificar UI custom** (build só se pelo menos um for verdadeiro):
    1. **Workflow multi-etapa com efeitos colaterais** (a ação faz mais que mudar um valor — ex.: aprovar corretor também notifica e libera acesso ao portal; aprovar exceção de verificação dispara `provisionAccess`).
    2. **Renderização específica de domínio** que um dashboard genérico não faz razoavelmente (ex.: comparar selfie e documento lado a lado para julgamento humano).
    3. **Precisa ser seguro para staff não-técnico** (Cláudia, Gisele) sem tocar tabela diretamente — diferente de Ricardo ocasionalmente editando uma linha no Supabase Studio.
    - Se **nenhum** aplicar, fica no dashboard do vendor (Supabase Studio/Sanity Studio) — mesma regra original, sem mudança.
  - **Reclassificação do já decidido:** aprovação de corretor e fila de exceção de verificação (D-053) batem em (1) e (2) → UI custom justificada. Rotação de código de emergência Tuya (D-052) não bate em nenhum → continua Supabase Studio, decisão original mantida.
  - **Namespace de rota + RBAC:** um único `/staff/*` para toda UI de fluxo operacional, gateado a nível `staff` pelo middleware de D-055 — Admin já passa em qualquer checagem de nível Staff por hierarquia (D-055), sem precisar de árvore `/admin/*` separada. Ações genuinamente Admin-only (config de plataforma, API keys, atribuição de papel) ficam com checagem mais estrita por rota/ação dentro da mesma árvore, não uma segunda árvore de UI.
  - **Emenda, não nova capability:** corrige diretamente o requirement "Build-vs-buy default" existente em `platform-architecture` (delta `MODIFIED Requirements`) — não cria uma capability nova, já que é correção de escopo de uma regra já existente, não um domínio novo.
  - **DoD:** docs only — D-056 + `templates/admin-build-vs-buy.md` + emenda ao requirement em `openspec/specs/platform-architecture/spec.md`. Sem Q-XXX prévia a resolver. Telas concretas → Passo 5 (#176) + issues de build específicas (#50, #75, #80, #86 portal corretor, etc.).
- **Rationale:** tratar isto como emenda de escopo (não como abandono da regra original) preserva a disciplina buy-first para o que ela sempre serviu bem (conteúdo) enquanto reconhece que fluxo operacional é uma necessidade real e distinta que nunca foi decidida conscientemente — apenas assumida implicitamente em D-052/D-053. O teste de três partes evita "tudo é admin, construa tudo" e "nada é admin, não construa nada" — dá um critério reutilizável para decisões futuras sem reabrir esta arquitetura a cada nova tela. Namespace único `/staff/*` evita duplicar árvores de UI quando a hierarquia de D-055 já resolve Admin vs. Staff na avaliação.
- **Consequências:** canon fechado; epic **#179 (Arquitetura de domínio) tem todas as 5 leaves fechadas** — desbloqueia Passo 5 (Jornadas, #176) para desenhar telas sobre um modelo já decidido; `platform-architecture`'s requirement corrigido evita que builds futuros (Execução) reinterpretem "sem admin bespoke" de forma mais ampla do que o pretendido.

### D-057 — Jornada: descoberta e navegação do site (2026-07-12) — **#185**
- **Status:** accepted
- **Contexto:** primeira leaf de Passo 5 (Jornadas, epic #176) a ser grillada. A jornada de descoberta (home → portfólio → detalhe da casa → blog → contato) já existia como rascunho pré-arquitetura em `jornadas-plataforma.md` §3.1, flagged `RASCUNHO — re-validar no passo 5` em `screen-map.md`. Re-validação encontrou uma lacuna real: `crm-source-of-truth` já lista "site-form/WhatsApp-CTA contatos" como fonte de lead v1, mas nenhuma CTA WhatsApp hoje captura nada — são links `wa.me` estáticos, sem round-trip ao backend.
- **Decisão:**
  - **Clique em CTA WhatsApp passa a capturar lead:** todo CTA WhatsApp da jornada (home, portfólio detalhe, contato) dispara uma chamada fire-and-forget imediatamente antes de abrir o `wa.me`, criando/atualizando um `cliente` nível Contato com `fonte: cta-whatsapp` — sem bloquear nem atrasar a navegação ao WhatsApp.
  - **Reaproveita `POST /api/contact`, não um endpoint novo:** o endpoint já existe, já valida entrada, e é o destino natural para "algo entrou no funil de lead" — duplicar a lógica de persistência/sync HubSpot para o caso CTA-WhatsApp não traria benefício. A validação de campos obrigatórios (`name`/`email`/`phone`/`message`) passa a exigir esses campos só no caminho do formulário; o caminho do beacon exige apenas `fonte` + contexto mínimo (página/casa de origem).
  - **Fire-and-forget, não bloqueante:** falha ou timeout do beacon nunca impede a navegação ao WhatsApp nem aparece como erro ao visitante — é um sinal de marketing, não uma transação; perder um beacon ocasional é aceitável frente ao custo de adicionar latência a todo clique de WhatsApp. Sem retry/outbox construído preventivamente — revisitar só se a taxa de perda observada importar na prática.
  - **Links `wa.me` não são "envio" da plataforma:** `messaging-channel-policy`'s regra de roteamento via QStash aplica-se a mensagens que a plataforma origina; um link `wa.me` só abre o WhatsApp do próprio visitante com um rascunho pré-preenchido que ele decide enviar — a plataforma nunca chama a API de um provedor de mensageria aqui. Sem alteração a `messaging-channel-policy`; a distinção fica registrada na nova capability para que #75 não confunda esta CTA com um envio roteado por provedor.
  - **RBAC/sessão:** confirma D-055 — `Visitante` não é armazenado; a jornada inteira funciona sem autenticação, e os únicos rastros deixados são os dois leads (CTA WhatsApp, formulário), nunca uma entidade Visitante.
  - **Fora de escopo desta leaf:** `/sobre` (sem lead capture ou superfície de arquitetura distinta); fluxos de visita/identidade/Tuya (leaves separadas #186/#187).
  - **DoD:** docs only — D-057 + `templates/jornada-descoberta-site.md` + nova capability `journey-site-discovery` (`openspec/specs/`) + `jornadas-plataforma.md` §3.1 e `screen-map.md` atualizados (RASCUNHO removido). Implementação real (beacon no frontend, persistência no endpoint) → Execução (#56, #78, #73).
- **Rationale:** capturar o clique de WhatsApp fecha a lacuna entre o que `crm-source-of-truth` já promete (fonte CTA-WhatsApp) e o que o código faz hoje, em vez de adiar a promessa indefinidamente. Reaproveitar o endpoint existente evita duplicar lógica de persistência/sync só para diferenciar a origem do lead. Fire-and-forget prioriza a experiência do visitante (sem atraso perceptível) sobre garantia de entrega, proporcional ao risco real (lead de marketing, não pagamento). Documentar a não-aplicação de `messaging-channel-policy` a este link evita uma releitura equivocada futura por quem implementa #75.
- **Consequências:** canon fechado; #56/#78/#73 (Execução) implementam beacon + persistência sem reabrir a arquitetura; `jornadas-plataforma.md`/`screen-map.md` saem de rascunho para validado nesta jornada; próximas leaves de Passo 5 (#186–#195) seguem o mesmo padrão de re-validação.

### D-058 — Jornada: visita agendada (2026-07-12) — **#186**

- **Status:** accepted
- **Contexto:** segunda leaf de Passo 5 (Jornadas, epic #176) grillada, na sequência de #185. A jornada de visita agendada (agendamento → verificação de identidade → acesso Tuya → confirmação WhatsApp) é anterior a D-052 (Tuya) e D-053 (visitas/identidade) e nunca foi reconstruída sobre elas. Re-validação encontrou lacunas estruturais, não cosméticas: `server/api/visits/schedule.post.ts` escreve na tabela legada `visits` (substituída por D-053); `programSmartLock()` chama a Tuya diretamente e engole falhas (`catch` + log, resposta ainda "success") em vez de usar o adapter seam de D-052 e o fallback (código de emergência + alerta WhatsApp a staff); o endpoint confia num booleano `verificationData.verified` enviado pelo cliente em vez de derivar o estado do lado do servidor; o WhatsApp de confirmação é enviado de forma síncrona, não via QStash (D-054); a janela de reuso de 12 meses de D-053 (`Cliente.identity_verified_at`) nunca é checada; e não existe caminho algum de `staff-review` no código — uma falha de `client-match` termina em erro simples, sem fila de exceção.
- **Decisão:**
  - **Reuso de 12 meses é um branch real da jornada:** ao entrar no formulário de agendamento, o sistema busca o `Cliente` pelo WhatsApp informado; se `identity_verified_at` está dentro de 12 meses, o passo de verificação (selfie + documento) é **pulado inteiramente**, indo direto para a confirmação de agendamento — implementa literalmente a regra já decidida em D-053, nunca construída.
  - **Provisionamento de acesso é uma única chamada gated, não dois efeitos colaterais independentes:** só depois de `visit.status = verified` (persistido no servidor, nunca um booleano vindo do cliente) o sistema chama `provisionAccess(visit)` do adapter (D-052) uma única vez — a senha mostrada ao visitante e a senha gravada na fechadura nunca podem divergir, porque uma única chamada produz as duas. Se essa chamada falhar, `visit.status` **não** avança para `access_provisioned`; o fallback de D-052 (código de emergência estático + alerta WhatsApp imediato a staff) dispara no lugar — nunca mais um "sucesso" silencioso com senha não gravada.
  - **Exceção de verificação escala de forma assíncrona (resolve a lacuna que D-053 deixou aberta só para o fluxo agendado):** D-053 já especificou "sem espera síncrona" para o fluxo **instantâneo**, mas nunca endereçou o agendado. Decisão desta leaf: uma falha/baixa confiança do `client-match` cria um `verification_attempt` pendente e entra na fila `staff-review` compartilhada **sem bloquear** a resposta do agendamento — o visitante vê "agendamento recebido, confirmaremos por WhatsApp antes da sua visita" em vez de esperar ou ver um erro. Justificativa: visita agendada exige ≥1 dia de antecedência, então há folga real antes da visita, ao contrário do fluxo instantâneo (visitante já está na porta).
  - **Mensageria via QStash, um único ponto de envio:** confirmação com senha e alerta de falha a staff são enfileirados via QStash (D-054), nunca chamados de forma síncrona dentro do handler da requisição de agendamento.
  - **Retenção de selfie (D-053) considerada e mantida como está:** durante a exploração, cogitou-se reter a selfie indefinidamente "para simplificar o fluxo" — mas a captura é idêntica em ambos os casos (o split de retenção é só um delete pós-aprovação, não um branch de fluxo), então a simplificação não existe; a troca real seria reter dado biométrico-adjacente além do necessário, sem ganho. D-053 permanece sem reabertura: selfie efêmera (apaga na aprovação), documento retido só durante a janela de 12 meses ativa.
  - **Fronteira com leaves vizinhas:** a tela de staff-review (selfie vs. documento lado a lado, aprovar/rejeitar) é #192, não esta leaf — aqui só se especifica que uma falha *entra* na fila e que a resolução de staff *libera* o mesmo `provisionAccess` da aprovação automática. O fluxo instantâneo/QR é #187, separado.
  - **DoD:** docs only — D-058 + `templates/jornada-visita-agendada.md` + nova capability OpenSpec `journey-scheduled-visit` + `jornadas-plataforma.md` §3.2 e `screen-map.md` atualizados (RASCUNHO removido, fronteira com #192 anotada). Implementação real (rewrite do endpoint/adapter/UI) → Execução (#81, #80, #77/#135).
- **Rationale:** os stubs pré-arquitetura não são só "incompletos" — o padrão de engolir falha do Tuya e ainda retornar sucesso é um bug real de confiabilidade que este leaf corrige antes que vire comportamento em produção. Fechar a lacuna do reuso de 12 meses evita fazer todo cliente recorrente repetir upload de documento sem necessidade, o que D-053 já havia decidido não ser preciso. Resolver a assincronia da exceção agora (em vez de herdar por acidente o padrão síncrono do fluxo instantâneo) evita construir uma experiência de espera desnecessária onde já existe folga real de tempo. Manter a retenção de selfie como D-053 especificou evita reabrir uma decisão de minimização LGPD por um ganho de simplicidade que, examinado de perto, não existia.
- **Consequências:** canon fechado; #81/#80/#77/#135 (Execução) implementam o rewrite (endpoint, adapter wrapper, UI de estado pendente) sem reabrir arquitetura; #192 (staff-review) e #187 (instantâneo/QR) podem assumir a fronteira já traçada aqui; `jornadas-plataforma.md`/`screen-map.md` saem de rascunho para validado nesta jornada.

### D-059 — Jornada: visita instantânea via QR (2026-07-12) — **#187**

- **Status:** accepted
- **Contexto:** terceira leaf de Passo 5 (Jornadas, epic #176) grillada, na sequência de #186. A jornada instantânea/QR (placa → QR → micro-página → verificação → acesso imediato) sofria das mesmas lacunas estruturais pré-arquitetura que #186 corrigiu para o fluxo agendado (tabela `visits` legada, `programSmartLock()` chamado direto engolindo falha, booleano de verificação confiado do cliente, WhatsApp síncrono, sem reuso de 12 meses, sem escalonamento de falha algum — hoje um 403 sem saída). A discussão desta leaf encontrou uma questão nova, específica deste fluxo: o atalho de reuso de 12 meses (D-053) é seguro para visita agendada porque staff tem uma entrada de calendário e dias de antecedência para notar uma inconsistência; para instantâneo/QR não existe essa janela — o momento em que o reuso é aceito é o mesmo em que a porta destranca, sem revisão humana no meio.
- **Decisão:**
  - **Falha de verificação implementa D-053 literalmente, pela primeira vez:** ao contrário de #186 (assíncrono, "confirmaremos antes da visita"), uma falha/baixa confiança do `client-match` neste fluxo recusa **imediatamente** e mostra um link de WhatsApp para contato direto com staff — sem espera síncrona, o visitante decide se persegue a resolução. Se contatar staff e for aprovado, isso é um `staff-review` normal (mesmo mecanismo já definido em D-053) e libera o mesmo `provisionAccess`, esteja o visitante ainda presente ou não.
  - **Reuso de 12 meses passa a exigir posse do telefone, só neste fluxo:** um `Cliente` dentro da janela de `identity_verified_at` ainda precisa confirmar um código único enviado por WhatsApp antes de `provisionAccess` rodar — `identity_verified_at` sozinho não é suficiente aqui, diferente do fluxo agendado (#186) onde é. Falha/expiração do código reaproveita o mesmo caminho de recusa imediata já decidido acima — sem terceiro estado de falha inventado.
  - **Mecanismo de renovação limitada (reabre D-053):** confirmação bem-sucedida do código estende `identity_verified_at` até o momento da confirmação, mas **nunca além de 24 meses** desde `last_client_match_at` — novo campo no `Cliente`, tocado só por uma aprovação completa de `client-match`. Passado esse teto, o reuso via código deixa de ser oferecido e a visita roda o fluxo completo de `client-match`/`staff-review`, resetando os dois timestamps. É um teto sobre a âncora (`last_client_match_at`), não sobre `identity_verified_at` diretamente — o que garante que uma re-verificação real eventualmente aconteça, por mais que o visitante volte só com o código.
  - **`verification_attempt.method` ganha um terceiro valor:** `phone-otp`, ao lado de `client-match` e `staff-review` já definidos em D-053 — sem entidade nova.
  - **Sem impacto no fluxo agendado (#186):** sua lógica de reuso continua lendo só `identity_verified_at`, incondicional; `last_client_match_at` é aditivo e não altera o comportamento já fechado de #186.
  - **Fora de escopo:** tela de staff-review (#192); acesso condomínio/portaria (Q-017, #140, já deferido a Execução); placa/QR físico (#98/#100) — esta jornada assume o QR já existe.
  - **DoD:** docs only — D-059 + `templates/jornada-visita-instantanea-qr.md` + nova capability OpenSpec `journey-instant-visit` + delta `MODIFIED` em `visit-identity-verification` (reabre D-053, registrado explicitamente) + `jornadas-plataforma.md` §3.3 e `screen-map.md` atualizados. Implementação real → Execução (#81, #80, #77/#135, #75 para entrega do código via WhatsApp).
- **Rationale:** o mesmo padrão de "sucesso" silencioso na falha do Tuya que #186 corrigiu existia aqui também — corrigir antes que vire comportamento em produção. Implementar a regra de "sem espera síncrona" que D-053 já havia decidido, mas nunca foi construída, fecha uma lacuna real, não uma nova decisão. Gatear o reuso instantâneo por posse de telefone reconhece que o risco de reuso mal-aplicado é qualitativamente diferente quando não há folga de tempo nem revisão humana — sem essa gate, qualquer um alegando o número de um `Cliente` já verificado entraria na hora. O teto de 24 meses evita que a mesma pessoa nunca mais refaça `client-match` só porque continua provando posse do telefone repetidamente, preservando o propósito original da janela de frescor de D-053 mesmo com o atalho novo.
- **Consequências:** canon fechado; reabre D-053 formalmente (registrado aqui, não silenciosamente absorvido); #81/#80/#77/#135/#75 (Execução) implementam sem reabrir arquitetura de novo; #186 permanece inalterado; `jornadas-plataforma.md`/`screen-map.md` saem de rascunho para validado nesta jornada.

### D-060 — Jornada: fila de exceção de verificação de identidade (2026-07-12) — **#192**

- **Status:** accepted
- **Contexto:** quarta leaf de Passo 5 (Jornadas, epic #176) grillada, na sequência de #186/#187. Ambas as jornadas de visita já deferiam a resolução de exceções para a fila compartilhada `staff-review` (D-053), e D-056 já nomeia esta tela exata (selfie vs. documento lado a lado) como exemplo canônico de UI custom justificada (critério 2 do teste de três partes) — mas nenhuma UI existia para consumir a fila. Diferente das leaves anteriores, esta é greenfield: nenhuma tela `/staff/*` existe hoje, nem middleware equivalente ao `realtor-auth.ts` do lado corretor.
- **Decisão:**
  - **Fila ordenada por tipo de fluxo, não FIFO estrito:** itens instantâneo/QR aparecem antes de itens agendados, independente da ordem de criação — só o fluxo instantâneo pode ter alguém fisicamente esperando na porta quando a exceção é criada; visita agendada tem dias de folga.
  - **Aprovação reaproveita o `provisionAccess` existente, sem caminho novo:** mesmo adapter (D-052), mesmo padrão de chamada única gated por `visit.status = verified` já estabelecido em #186/#187 — resolução manual e automática convergem no mesmo call site.
  - **Rejeição passa a notificar o visitante (fecha uma lacuna real de D-053, não uma reabertura):** D-053 só detalhou o caminho de aprovação. Deixar um visitante rejeitado sem sinal algum é pior que avisar, e o custo é zero — mesmo mecanismo QStash/WhatsApp já usado em toda a jornada. `visit.status` avança para `declined`; mensagem explicando o resultado é enfileirada.
  - **Novo item pendente dispara alerta a staff via Telegram, não WhatsApp:** resolve uma inconsistência latente entre o texto literal de D-052 ("alerta a staff via WhatsApp", escrito antes de D-054 existir) e a regra geral de D-054 (split por direção — WhatsApp só para parte externa, Telegram para interno). Um aviso "há algo para revisar" não tem parte externa como remetente ou destinatário — cai do lado Telegram por regra já fechada, não uma decisão nova. Alerta é só um link para a fila ("vá olhar"), não uma ação inline de aprovar/rejeitar dentro do chat (isso seria um mecanismo de bot distinto, não decidido, fora de escopo). Uma notificação por item novo, sem batching — proporcional ao volume real de visitas do negócio.
  - **Split WhatsApp/Telegram reconsiderado e mantido:** durante a exploração, questionou-se se vale manter uma ferramenta separada (Telegram) já que WhatsApp é obrigatório para clientes de qualquer forma. Avaliado e mantido: WhatsApp Business API exige template pré-aprovado pela Meta para toda mensagem iniciada pelo negócio fora de uma janela de sessão viva — aprovação **por tipo de mensagem**, não uma vez só. Mensagens internas (staff/sistema) são a categoria com maior chance de crescer com o tempo (esta leaf já adiciona uma; #193 e outras leaves futuras provavelmente adicionam mais) — colapsar tudo para WhatsApp significaria repetir esse processo de aprovação a cada novo tipo de alerta interno. Telegram não tem esse atrito nunca. D-054 permanece sem reabertura.
  - **RBAC:** `/staff/*` namespace, checagem de nível `staff` (admin passa por hierarquia, D-055), enforcement em duas camadas — consumido como já decidido, sem conceito novo. Novo middleware espelha o padrão de `realtor-auth.ts`, mas contra o armazenamento de papel que Execução (#50) ainda vai construir.
  - **Selfie disponível durante o pending:** já garantido pela regra de retenção existente de D-053 (apaga só na aprovação) — sem exceção nova.
  - **DoD:** docs only — D-060 + `templates/jornada-fila-excecao-verificacao.md` + nova capability OpenSpec `journey-staff-verification-review` + `jornadas-plataforma.md` (nova seção de jornada staff) e `screen-map.md` atualizados. Implementação real → Execução (#80, #86, #50).
- **Rationale:** esta leaf é puramente aditiva — consome D-052/D-053/D-054/D-055/D-056 sem alterar nenhum deles, exceto fechar uma lacuna real (notificação de rejeição) que nunca foi política intencional, só um ponto não endereçado. Priorizar por tipo de fluxo reconhece que o risco de espera é qualitativamente diferente entre os dois fluxos, mesma lógica já usada em #187 para justificar tratamento de falha distinto. Reconsiderar o split WhatsApp/Telegram e mantê-lo evita repetir aprovação de template da Meta a cada novo tipo de alerta interno, categoria que só tende a crescer.
- **Consequências:** canon fechado; primeira leaf de Passo 5 a construir uma tela greenfield (sem stub pré-arquitetura para corrigir); #80/#86/#50 (Execução) implementam sem reabrir arquitetura; #193 (operação diária) pode assumir que a fila de exceção já tem sua própria tela, sem precisar reconstruí-la.
