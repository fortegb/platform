# CHANGELOG — ForteGB

> Histórico do que foi feito.
> **Estágio preliminar:** ainda **sem números de versão** — entradas registradas por **data** sob "Não versionado". A numeração semântica (ex.: `v1.0.0`) virá no futuro.

---

## Não versionado

### 2026-07-01 — Sessão handoff (máquina principal)

- Push sync `0a6af59` para `origin/main`; working tree limpa.
- `STATUS.md` actualizado para próxima sessão (Mac Mini ou Architecture).
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
- **D-011:** decisões arquitecturais abertas até epic Architecture + `rbo-grilling`.
- Gaps de produto mapeados: corretor termos (Q-016), condomínio/portaria (Q-017), CRM multi-canal (Q-018), mobile (Q-019).
- **`STATUS.md`** — próximo passo: GitHub org migration Fase A.

**Reestruturação de epics (D-010)**
- Phase 1: Platform environments, Identity/roles/journeys, Public site UI finalization, Brand & design system.
- Phase 2: Integrations MVP, Release readiness; CRM/tours reordenados.
- Phase 3: Physical-digital bridge, Content operations.
- Removido epic Phase 0 Home 2 vencedores (absorvido em Public site UI P1).
- Criada pasta **`docs/planning/`** com visão, módulos, fases, perguntas abertas, decisões (D-001–D-008), workflow e runbook de migração GitHub org.
- **`STATUS.md`** reestruturado como bússola de sessão (epics, próximo passo, links planning).
- **`AGENTS.md`** secção 9 actualizada (planning canon, ROADMAP, Phase 0).

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
