# Perguntas abertas

> Backlog para **`rbo-grilling`** durante o epic **Architecture & MVP definition**.  
> **Uma pergunta de cada vez.** As decisões de produto/stack já estão **fechadas** (D-015..D-022, ver checkpoint abaixo); infra/ambientes fechada ([#146](https://github.com/fortegb/platform/issues/146)). O que resta é `deferred` (v2/v3) ou arquitetura de domínio ([#179](https://github.com/fortegb/platform/issues/179): visitas, mensageria, RBAC, admin).

> ✅ **Checkpoint #36 (2026-07-04): todas as Q-* estão `resolved` ou `deferred` — 0 abertas.** Epic Architecture pronto para fechar (#38) → desbloqueia Fase 1. Deferidos (tours v2, media kit v3, mobile) reabrem no grilling da sua fase.

**Legenda:** `open` | `resolved` | `deferred`

**Ordem sugerida (Q-014):** Q-003 → Q-016 → Q-004 → Q-007 → Q-018 → Q-005 → Q-006 → Q-017 → Q-013 → Q-009–Q-012 → Q-010 → Q-008/Q-019

---

## Infraestrutura

### Q-001 — Timing exacto da migração org
- **Status:** resolved → D-003, D-007, D-009

### Q-002 — Dotfiles: auth account vs org namespace
- **Status:** resolved → D-008

---

## Produto, roles & MVP

### Q-003 — Quem são os user types no day one?
- **Module:** auth, admin
- **Status:** **resolved** → papéis admin/staff/corretor/cliente (`company-structure.md` §6, `architecture.md` §2); RBAC no Identity epic (#48)
- **Question:** Público, corretor, cliente, staff ForteGB, proprietário — quem no MVP?
- **Resolved (2026-07-02):** Roles admin/staff/corretor/cliente; matriz telas em `company-structure.md` §6. Perm detail = admin vs staff only.
- **Blocks:** Identity epic (RBAC implementation)

### Q-016 — Corretor: assinatura de termos/contrato
- **Module:** crm, auth
- **Status:** **resolved** → contrato via Gov.br (MVP); build no onboarding corretor (#88)
- **Question:** Corretor deve assinar contrato/termos com ForteGB antes do portal? Formato (checkbox auditável, PDF, e-sign)?
- **Resolved (2026-07-02):** Contrato parceria via **assinatura Gov.br** (MVP); e-sign SaaS = longo prazo. PDF termo por registro de cliente (bot). Revisão Juliana Mestrinier.
- **Onboarding:** conta self-service + **contrato por casa** (reclamar → Gov.br → staff); staff notificado em **todos** os passos; **qualquer staff** aprova; casas extra = novo contrato reutilizando dados.
- **Review process:** Ricardo → Juliana redlines v0.1 → trio approve → Juliana pilot corretor.
- **Blocks:** P2 Portal corretor (integração Gov.br)

---

## Dados & conteúdo

### Q-004 — CMS vs DB para casas
- **Module:** site, media-kit
- **Status:** **resolved** → D-016 · [`architecture.md`](./architecture.md) §5 · Grilling 0 ([#145](https://github.com/fortegb/platform/issues/145))
- **Question:** Contentful vs Supabase vs híbrido para listings, blog, timeline obra, media kit?
- **Resolved (2026-07-03):** Taxonomia por tipo de conteúdo — conteúdo (listings, blog, timeline, media) → **CMS**; estado operacional + PII sensível → **Supabase**; vídeo → embed; join por ID de casa; social fora. **Vendor CMS = Sanity (D-034 / 2026-07-10).** Detalhe → [`decisions.md`](./decisions.md).

---

## Visitas & acesso

### Q-005 — Verificação de identidade
- **Module:** tours
- **Status:** **deferred** → v2 (tours) — grilling da fase (D-018)
- **Question:** Face match client-side vs KYC SaaS vs aprovação manual staff?
- **Related:** Falha na verificação — fila manual?

### Q-006 — MVP visitas: agendada, instantânea, fallback
- **Module:** tours
- **Status:** **deferred** → v2 (tours) — grilling da fase (D-018)
- **Question:** Ambos no MVP? Ordem? Fallback se Tuya falhar (senha manual, staff)?

### Q-017 — Acesso condomínio / portaria
- **Module:** tours
- **Status:** **deferred** → v2 (tours/condomínio) — grilling da fase (D-018)
- **Question:** Só fechadura Tuya na casa, ou integração portaria/condomínio / “AI authorization at gate”? MVP scope?
- **Note:** Distinto de smart lock; pode ser out-of-scope v1.

---

## CRM

### Q-007 — HubSpot como source of truth?
- **Module:** crm
- **Status:** **resolved** → D-019 · [`architecture.md`](./architecture.md) §5 · Grilling #28
- **Question:** CRM master vs DB local + sync?
- **Resolved (2026-07-04):** **Supabase é master** do Cliente + atribuição de comissão; **HubSpot é downstream sincronizado** (Cliente→Contact, Registro→Deal). first-wins/dedup CPF, auditoria e gatilho de venda (`Casa.status=vendida`, D-016) avaliados no Supabase; HubSpot nunca decide comissão.

### Q-018 — Capturar toda atenção / clientes (multi-canal)
- **Module:** crm
- **Status:** **resolved** → D-020 · Grilling #28
- **Question:** Lista fechada de fontes day-one: form site, visita agendada, QR instantâneo, WhatsApp, corretor, walk-in, social? Propriedades HubSpot?
- **Context:** “Capture every attention on our houses from website, mobile, other channels.”
- **Resolved (2026-07-04):** **v1** = portal corretor, entrada manual staff, contatos de form-site/CTA-WhatsApp; **v2** = QR, bots, tours. Cada entrada carimba `fonte` → propriedade de origem no HubSpot. Modelo Cliente (único por CPF) + dois níveis Contato→Cliente + Registro por casa.

---

## Mobile

### Q-008 — PWA ou app nativo (longo prazo)
- **Module:** mobile
- **Status:** **deferred** → Fase 4 (mobile nativo/PWA) (D-018)
- **Question:** App nativo necessário ou web responsive + QR suficiente?

### Q-019 — Mobile v1 (MVP)
- **Module:** mobile, site
- **Status:** **resolved** → responsive web no v1 (D-018); reavaliar PWA/native Fase 4
- **Question:** MVP = responsive web only (corretor + cliente no browser) — confirmar?
- **Recommendation:** Sim para v1; reavaliar PWA/native Phase 4.

---

## Media kit & site UI

### Q-009 — Quem mantém timeline de construção?
- **Module:** media-kit, admin
- **Status:** **deferred** → v3 (media kit) — grilling da fase (D-018)

### Q-010 — Quais variantes home = com/sem hero?
- **Module:** site
- **Status:** **deferred** → D-021 · escolha do hero no lançamento (#56)
- **Blocks:** ~~P1 Public site UI~~ (não bloqueia — hero é componente trocável; default `/` = HeroSplit)
- **Deferred (2026-07-04):** variantes diferem só no hero; renomeadas por estilo (`/`, `/classico`, `/slate`, `/azul`). Escolha final ao lançamento.

### Q-011 — Media kit MVP: manual vs gerado?
- **Module:** media-kit
- **Status:** **deferred** → v3 (media kit) — grilling da fase (D-018)

### Q-012 — Placa à venda: regras Campinas?
- **Module:** media-kit
- **Status:** **deferred** → v3 (media kit) — grilling da fase (D-018)

### Q-013 — QR da placa → destino
- **Module:** media-kit, tours
- **Status:** **deferred** → v3 (media kit) — grilling da fase (D-018)
- **Recommendation:** Micro-página do imóvel + CTA visita instantânea

---

## Processo

### Q-014 — Ordem das sessões grilling
- **Module:** platform
- **Status:** **resolved** → ordem de grilling seguida; processo concluído
- **Recommendation:** Ver ordem no topo deste arquivo

### Q-015 — CHANGELOG para docs-only
- **Status:** deferred → D-002 area
