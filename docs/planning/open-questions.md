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
- **Status:** open
- **Question:** Público, corretor, cliente, staff ForteGB, proprietário — quem no MVP?
- **Context:** Staff admin “not fully designed yet” — listar tarefas mínimas staff.
- **Blocks:** Identity epic, admin Phase 3 scope

### Q-016 — Corretor: assinatura de termos/contrato
- **Module:** crm, auth
- **Status:** open
- **Question:** Corretor deve assinar contrato/termos com ForteGB antes do portal? Formato (checkbox auditável, PDF, e-sign)?
- **Blocks:** P2 Portal corretor onboarding

---

## Dados & conteúdo

### Q-004 — CMS vs DB para casas
- **Module:** site, media-kit
- **Status:** open
- **Question:** Contentful vs Supabase vs híbrido para listings, blog, timeline obra, media kit?

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
