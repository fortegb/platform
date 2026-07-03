# Decisões (ADR-lite)

> Decisões fechadas. Cada entrada fecha uma pergunta em [`open-questions.md`](./open-questions.md).

---

### D-001 — Fluxo formal de mudanças (2026-07-01)

- **Contexto:** Plataforma grande; necessidade de rastreio e specs por entrega.
- **Decisão:** Adotar **issue → change (OpenSpec) → close** via skills `rbo-*`.
- **Consequências:** Board = backlog; OpenSpec só em sub-issues folha; branch `feat/<change-name>`.

---

### D-002 — Papéis de STATUS, CHANGELOG e ROADMAP (2026-07-01)

- **Contexto:** Sobreposição possível entre ficheiros de controle.
- **Decisão:**
  - **`STATUS.md`** = bússola de sessão (epics ativos + próximo passo) — **mantido**.
  - **`ROADMAP.md`** = espelho gerado do board — **não editar à mão**.
  - **`CHANGELOG.md`** = registo no close-out de changes — **não duplicar cada issue**.
  - **`docs/planning/`** = canon de design — **separado do board**.
- **Consequências:** Atualizar `STATUS.md` ao mudar foco; grilling escreve em `planning/`.

---

### D-003 — GitHub Organization — Opção A (2026-07-01)

- **Contexto:** Conta `fortegb` é **User**; issue types e board de equipa favorecem org.
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
  - Restante styling partilhado entre ambos
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
- **Decisão:** Todo o trabalho de **estado actual → org desejada** (GitHub + dotfiles + remotes + Vercel + verificação) vive **dentro do epic** *GitHub org migration* — documentado em [github-org-migration.md](./github-org-migration.md).
- **Consequências:** Não bloquear documentação de planning; execução segue runbook.

---

### D-009 — Epic Architecture após preparação GitHub (2026-07-01)

- **Contexto:** Refinamento arquitectural estava implícito em “grilling”; utilizador quer epic explícito e sequenciado.
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
- **Decisão (interina):** Manter chave de conta **`fortegb`** no `dotfiles.conf` como **namespace da org**; PAT/Keychain actualizados para token emitido por **`fortegb-admin`** após rename. Documentar em dotfiles `DECISIONS.md` na execução.
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

### D-011 — Decisões arquitecturais abertas até grilling (2026-07-01)

- **Contexto:** Stack e soluções técnicas não devem estar fechadas na preparação.
- **Decisão:**
  - `platform-vision.md` e `architecture.md` usam linguagem **proposta / TBD**.
  - Escolhas (CMS, KYC, Tuya fallback, mobile, condomínio, HubSpot model) resolvem-se em **`rbo-grilling`** no epic Architecture.
  - Cada resolução → `decisions.md` + actualização de `architecture.md`.
- **Consequências:** Phase 1 build só após Architecture Done; ver [`deliverables.md`](./deliverables.md).

---

### D-012 — Repo principal: `platform` (2026-07-01)

- **Contexto:** Após migração para org, `sandbox` era nome temporário de desenvolvimento.
- **Decisão:** Renomear **`fortegb/sandbox` → `fortegb/platform`** — website + backend + arquitectura num único repo.
- **Consequências:** Local `~/Documents/GitHub/fortegb/platform/`; GitHub Project **`platform`**; OpenSpec neste repo.

---

### D-013 — Git dev: dotfiles org namespace + `auth rbonon` (2026-07-01)

- **Contexto:** Org slug `fortegb` ≠ login de desenvolvimento `rbonon`.
- **Decisão:** Dotfiles `account fortegb` + `auth rbonon` + `commit_as rbonon`; PAT admin em `fortegb-admin` (sem bulk clone).
- **Consequências:** Remote `https://rbonon@github.com/fortegb/<repo>.git`; commits como rbonon; dotfiles ≥ 0.8.0.

---

### D-014 — Repos org: nomes finais (2026-07-01)

- **Decisão:** Repos partilhados na org `fortegb`:
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
  - **Join** conteúdo ↔ operacional por **ID de casa** partilhado, merge no Nuxt.
- **Alternativas rejeitadas:** Supabase-only (UX de autoria fraca); admin self-hosted sobre Postgres/Directus (viola zero-ops); largar Contentful por completo (revertido — um CMS compensa na autoria).
- **Consequências:** vendor CMS (Contentful já em `package.json` vs free-tier mais generoso do Sanity) reversível via camada de serviço; decidido no build. Pré-resolve armazenamento de Q-005/Q-016 (bucket privado RLS).

---

### D-017 — Forma do sistema: serverless (2026-07-03)

- **Contexto:** Plataforma integration-heavy e event-driven (bots WA/Telegram, HubSpot, Tuya, trabalho agendado) + cliente mobile futuro provável. Prioridades: free-first + zero-ops + simplicidade Vercel.
- **Decisão:** **Serverless** — Nuxt/Nitro na **Vercel** (Hobby grátis → Pro ~$20/mo quando útil), **API-first** (web = 1.º cliente; PWA/native/bots reutilizam), **Upstash QStash** para jobs com atraso + retries, **camada de adaptadores** de integração (um módulo por terceiro), **Telegram-first** (grátis; WhatsApp pago-quando-útil), vídeo ao vivo offloaded ao fornecedor, app **Nitro-portável** como seguro.
- **Alternativa avaliada:** processo Node persistente (Fly.io/Oracle/Railway) + pg-boss in-process + websockets — mais coerente para eventos/real-time e mais familiar (C/LAMP), mas **grátis + always-on + zero-ops não coexistem**. Comparação completa → [`explore/runtime-serverless-vs-persistent.md`](./explore/runtime-serverless-vs-persistent.md).
- **Consequências:** async fica espalhado por funções + QStash (aceite: "não me importo desde que funcione"); a 1–2 casas/ano o uso não dispara upgrade; Pro é escolha discricionária posterior.

---

### D-018 — Fronteira de MVP: v1/v2/v3 (2026-07-03)

- **Contexto:** Escopo total = muitos meses para dev solo; precisa de fatias verticais.
- **Decisão:**
  - **v1:** site público + portfólio real + CTA visita WhatsApp · **auth + papéis** · corretor onboarding (registo → staff aprova) · **registo de lead + timestamp de comissão (primeiro ganha) + sync HubSpot** · contrato/Gov.br **manual-first** · staff aprovações + leads · admin config mínimo.
  - **v2:** **visitas autoguiadas (agendada + QR)** + identidade + Tuya + calendário + fila de excepção · **Gov.br automatizado** · bots WhatsApp/Telegram de lead.
  - **v3 / Fase 3:** media kit, timeline de obra, motor social, portal cliente, BI.
  - **Lock now (fundacional, difícil reverter):** modelo de dados core + IDs estáveis (house, user, lead, corretor; visit/contract como refs forward-looking); RBAC cobrindo todos os papéis; taxonomia de armazenamento (D-016); camada de adaptadores; API-first; escolha de queue (QStash).
- **Rationale:** corretor **antes** de tours — sem dependências de hardware/externas, protege comissão desde o 1.º par de corretores, alinhado a venda humana; tours = maior/mais arriscado build único → v2; Gov.br = integração mais arriscada do fluxo corretor → manual-first. BDUF rejeitado (viola D-011); deferimento cego rejeitado (fecharia v2/v3) — daí o guardrail "lock now".
- **Consequências:** v2/v3 arquitetados just-in-time no grilling da fase; Q-005/006/017, Q-009/011–013, Q-008/019 diferidos para a sua fase.
