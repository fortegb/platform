# CHANGELOG — ForteGB

> Histórico do que foi feito.
> **Estágio preliminar:** ainda **sem números de versão** — entradas registradas por **data** sob "Não versionado". A numeração semântica (ex.: `v1.0.0`) virá no futuro.

---

## Não versionado

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
