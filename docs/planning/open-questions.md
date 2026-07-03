# Perguntas abertas

> Backlog para **`rbo-grilling`** durante o epic **Architecture & MVP definition**.  
> **Uma pergunta de cada vez.** Escolher a melhor solução no momento — nada de stack/arquitectura está fechado até aqui.

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
- **Status:** **partial** → [`company-structure.md`](./company-structure.md) §8 + [`architecture.md`](./architecture.md) §2
- **Question:** Público, corretor, cliente, staff ForteGB, proprietário — quem no MVP?
- **Resolved (2026-07-02):** Roles admin/staff/corretor/cliente; matriz ecrãs em `company-structure.md` §6. Perm detail = admin vs staff only.
- **Blocks:** Identity epic (RBAC implementation)

### Q-016 — Corretor: assinatura de termos/contrato
- **Module:** crm, auth
- **Status:** **partial** → [`corretor-contract-template.md`](./corretor-contract-template.md) v0.1
- **Question:** Corretor deve assinar contrato/termos com ForteGB antes do portal? Formato (checkbox auditável, PDF, e-sign)?
- **Resolved (2026-07-02):** Contrato parceria via **assinatura Gov.br** (MVP); e-sign SaaS = longo prazo. PDF termo por registo de lead (bot). Revisão Juliana Mestrinier.
- **Onboarding:** conta self-service + **contrato por casa** (reclamar → Gov.br → staff); staff notificado em **todos** os passos; **qualquer staff** aprova; casas extra = novo contrato reutilizando dados.
- **Review process:** Ricardo → Juliana redlines v0.1 → trio approve → Juliana pilot corretor.
- **Blocks:** P2 Portal corretor (integração Gov.br)

---

## Dados & conteúdo

### Q-004 — CMS vs DB para casas
- **Module:** site, media-kit
- **Status:** **resolved** → D-016 · [`architecture.md`](./architecture.md) §5 · Grilling 0 ([#145](https://github.com/fortegb/platform/issues/145))
- **Question:** Contentful vs Supabase vs híbrido para listings, blog, timeline obra, media kit?
- **Resolved (2026-07-03):** Taxonomia por tipo de conteúdo — conteúdo (listings, blog, timeline, media) → **CMS** (Contentful/Sanity); estado operacional + PII sensível (status, leads, visitas, verificação, contratos, RG/CNH) → **Supabase** (Postgres + bucket privado RLS); **vídeo** → embed YouTube/Vimeo; **join** por ID de casa; **social** → fora da plataforma. Vendor CMS (Contentful vs Sanity) reversível via camada de serviço. Detalhe → [`explore/runtime-serverless-vs-persistent.md`](./explore/runtime-serverless-vs-persistent.md) §6.

---

## Visitas & acesso

### Q-005 — Verificação de identidade
- **Module:** tours
- **Status:** open
- **Question:** Face match client-side vs KYC SaaS vs aprovação manual staff?
- **Related:** Falha na verificação — fila manual?

### Q-006 — MVP visitas: agendada, instantânea, fallback
- **Module:** tours
- **Status:** open
- **Question:** Ambos no MVP? Ordem? Fallback se Tuya falhar (senha manual, staff)?

### Q-017 — Acesso condomínio / portaria
- **Module:** tours
- **Status:** open
- **Question:** Só fechadura Tuya na casa, ou integração portaria/condomínio / “AI authorization at gate”? MVP scope?
- **Note:** Distinto de smart lock; pode ser out-of-scope v1.

---

## CRM

### Q-007 — HubSpot como source of truth?
- **Module:** crm
- **Status:** open
- **Question:** CRM master vs DB local + sync?

### Q-018 — Capturar toda atenção / leads (multi-canal)
- **Module:** crm
- **Status:** open
- **Question:** Lista fechada de fontes day-one: form site, visita agendada, QR instantâneo, WhatsApp, corretor, walk-in, social? Propriedades HubSpot?
- **Context:** “Capture every attention on our houses from website, mobile, other channels.”

---

## Mobile

### Q-008 — PWA ou app nativo (longo prazo)
- **Module:** mobile
- **Status:** open
- **Question:** App nativo necessário ou web responsive + QR suficiente?

### Q-019 — Mobile v1 (MVP)
- **Module:** mobile, site
- **Status:** open
- **Question:** MVP = responsive web only (corretor + cliente no browser) — confirmar?
- **Recommendation:** Sim para v1; reavaliar PWA/native Phase 4.

---

## Media kit & site UI

### Q-009 — Quem mantém timeline de construção?
- **Module:** media-kit, admin
- **Status:** open

### Q-010 — Quais variantes home = com/sem hero?
- **Module:** site
- **Status:** open
- **Blocks:** P1 Public site UI

### Q-011 — Media kit MVP: manual vs gerado?
- **Module:** media-kit
- **Status:** open

### Q-012 — Placa à venda: regras Campinas?
- **Module:** media-kit
- **Status:** open

### Q-013 — QR da placa → destino
- **Module:** media-kit, tours
- **Status:** open
- **Recommendation:** Micro-página do imóvel + CTA visita instantânea

---

## Processo

### Q-014 — Ordem das sessões grilling
- **Module:** platform
- **Status:** open
- **Recommendation:** Ver ordem no topo deste ficheiro

### Q-015 — CHANGELOG para docs-only
- **Status:** deferred → D-002 area
