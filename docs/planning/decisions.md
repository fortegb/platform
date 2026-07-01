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
