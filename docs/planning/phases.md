# Fases e epics

> Sequenciamento de alto nível. Cada epic vira issue pai no board (campo **Phase**).  
> Sub-tarefas abaixo viram **sub-issues** quando o board existir.

**Convenção:** *Define* (Architecture) vs *Build* (Phase 1+). Epics grandes com entrega visível têm epic dedicado — não ficam enterrados em “auth” ou “portfólio”.

---

## Phase 0 — Fundação (planning + infra)

**Objetivo:** org GitHub, workflow formal, **arquitectura validada**, MVP definido.

**Ordem Phase 0 (dependências):**

```
Seed docs/planning (✅)
    → GitHub org migration
    → Bootstrap board & OpenSpec
    → Architecture & MVP definition   ← define roles, journeys, MVP, home choice (Q-010)
    → (paralelo possível) Brand assets upload
```

| # | Epic | Module | Estado | Bloqueado por |
|---|------|--------|--------|---------------|
| 1 | **Seed docs/planning** | platform | ✅ Feito (2026-07-01) | — |
| 2 | **GitHub org migration** | platform | Todo | — |
| 3 | **Bootstrap board & OpenSpec** | platform | Todo | Org migration |
| 4 | **Architecture & MVP definition** | platform | Todo | Bootstrap board |
| 5 | **Brand assets upload** | branding | Todo | — (paralelo após org) |

| Epic | Doc / runbook |
|------|---------------|
| GitHub org migration | [github-org-migration.md](./github-org-migration.md) |
| Bootstrap board & OpenSpec | [workflow.md](./workflow.md) |
| Architecture & MVP definition | [architecture.md](./architecture.md) · [open-questions.md](./open-questions.md) |
| Brand assets upload | AGENTS.md §7 |

### Epic: GitHub org migration — sub-tarefas

1. [ ] Gerar PAT em `fortegb-admin` (pós-rename): scopes `repo`, `project`, `read:org`
2. [ ] Renomear personal `fortegb` → `fortegb-admin`
3. [ ] Criar Organization **`fortegb`**
4. [ ] Adicionar `rbonon` como **Organization owner**
5. [ ] **Move work** → transferir `sandbox` para org
6. [ ] Atualizar `dotfiles.conf` + `setup_pats` + Keychain (ver runbook)
7. [ ] Atualizar remotes locais (`sandbox` e outros)
8. [ ] Reconectar **Vercel** ao repo na org
9. [ ] Habilitar **Issue types** (Epic, Feature, Task) em Settings → Planning
10. [ ] Smoke test: clone, push, `gh repo view`, `gh auth status`
11. [ ] Registar execução em `decisions.md` / dotfiles `DECISIONS.md` se aplicável

### Epic: Bootstrap board & OpenSpec — sub-tarefas

1. [ ] Inicializar OpenSpec no repo (`openspec/` + CLI)
2. [ ] Criar Project **`sandbox`** na org
3. [ ] Campos custom: **Phase**, **Module**
4. [ ] Registar epics Phase 0 restantes como issues pai
5. [ ] Gerar `ROADMAP.md` pela primeira vez
6. [ ] Actualizar `STATUS.md` com números de issues

### Epic: Architecture & MVP definition — sub-tarefas

> **Define only** — grilling + docs. **Implement** roles/UI/integrations in Phase 1+ epics.  
> Uses **`rbo-grilling`**. Deliverable: [`architecture.md`](./architecture.md) completo.

1. [ ] Sessão grilling 1: Q-003 user roles / MVP scope
2. [ ] Sessão grilling 2: Q-004 CMS vs DB (+ Q-007 HubSpot truth)
3. [ ] Sessão grilling 3: Q-005, Q-006 visitas
4. [ ] Sessão grilling 4: Q-009, Q-011, Q-012, Q-013 media kit & placa
5. [ ] Sessão grilling 5: Q-008 mobile (se ainda aberto)
6. [ ] **User journey map** por role MVP → `architecture.md` §2 + §5
7. [ ] Escolha home com/sem hero (Q-010) → `architecture.md` + D-005
8. [ ] Completar `architecture.md` (contexto, dados, fluxos, NFR)
9. [ ] MVP v1 vs later em `platform-vision.md` + `decisions.md`
10. [ ] Checkpoint: Q-* **resolved** ou **deferred**
11. [ ] Criar epics **Phase 1–3** no board (lista §7 de `architecture.md`)
12. [ ] Epic **Done** → Phase 1 desbloqueada

### Epic: Brand assets upload — sub-tarefas

1. [ ] Logo (SVG/PNG/PDF)
2. [ ] Brand guide (cores, tipografia, uso)
3. [ ] Hero / imagens candidatas (opcional)

---

## Phase 1 — Core platform (build)

**Objetivo:** ambientes estáveis, identidade & routing, site público finalizado, design system.

Epics (**criar no board após Architecture**):

| Epic | Module | Depende de |
|------|--------|------------|
| **Platform environments** | platform | Architecture |
| **Identity, roles & journey routing** | auth | Architecture, Platform environments |
| **Public site UI finalization** | site | Architecture, Brand assets (ideal) |
| **Brand & design system** | branding | Brand assets |

> **Removido como epics separados:** “Autenticação e papéis”, “Consolidação home”, “Portfólio + blog” — absorvidos abaixo.

### Epic: Platform environments — sub-tarefas

1. [ ] Supabase project + aplicar `docs/database-schema.sql`
2. [ ] Env vars (local, Vercel staging/prod)
3. [ ] Contentful configurado (se Architecture decidir)
4. [ ] Smoke deploy Vercel pós-org
5. [ ] Documentar credenciais em `docs/SETUP-CREDENTIALS.md` (sem secrets no repo)

### Epic: Identity, roles & journey routing — sub-tarefas

> Implementa o definido em `architecture.md` §2 + §5 (entry points). Portal **features** por role ficam Phase 2/3.

1. [ ] `check-email` + signup + reset (`docs/autenticacao-login.md`)
2. [ ] Modelo de roles / perfis (Supabase)
3. [ ] Post-login redirect por perfil
4. [ ] Generalizar middleware (além de `realtor-auth`)
5. [ ] Shell pages mínimas por role MVP (placeholder OK)
6. [ ] Provedores sociais (se MVP)
7. [ ] Testes manuais: jornada login → destino correcto por role

### Epic: Public site UI finalization — sub-tarefas

> Inclui **2 vencedores home** (D-005, Q-010). Site institucional “pronto para uso”.

1. [ ] Consolidar home **com hero** + **sem hero**; remover variantes não escolhidas
2. [ ] Portfólio lista + detalhe (layout final; **filtros/busca** se MVP)
3. [ ] Sobre, Blog, Contato — polish + copy
4. [ ] Blocos **blog / redes sociais** (homepage, portfólio, footer) para tráfego
5. [ ] Privacidade, Termos, cookies
6. [ ] Header, footer, botões — alinhar design system
7. [ ] Wire portfólio/blog a Contentful ou Supabase (conforme Architecture)
8. [ ] **Mobile-first responsive** (Q-019)
9. [ ] Pass básico a11y/SEO meta
10. [ ] Remover dependência de `data/mock.ts` onde dados reais existirem

### Epic: Brand & design system — sub-tarefas

1. [ ] Tokens web alinhados a brand guide
2. [ ] Master templates print (placa, poster) — rascunho Figma ou equivalente
3. [ ] Documentar uso em `AGENTS.md` ou design doc
4. [ ] Social templates alinhados (ligação Phase 3)

---

## Phase 2 — Business flows (build)

| Epic | Module | Notas |
|------|--------|-------|
| **Integrations MVP** | platform | Hub hub antes de features |
| **Visitas autoguiadas MVP** | tours | Consome integrations |
| **Portal corretor + CRM** | crm | Consome integrations; features corretor |
| **Release readiness** | platform | UAT, cross-browser, checklist pré-lançamento |

### Epic: Integrations MVP — sub-tarefas

1. [ ] HubSpot service real (contacts, deals mínimo)
2. [ ] **Lead capture matrix** (form, visitas, WhatsApp, corretor — Q-018)
3. [ ] WhatsApp confirmações (template messages)
4. [ ] Google Calendar eventos agendados
5. [ ] Tuya write password (MVP path; fallback manual documentado)
6. [ ] Contact form → HubSpot + DB
7. [ ] Env, error handling, logging comum
8. [ ] Identity verification (approach from Q-005; manual queue if Q-005 says so)

### Epic: Visitas autoguiadas MVP — sub-tarefas

1. [ ] Fluxo agendado end-to-end
2. [ ] Fluxo instantâneo QR (se MVP)
3. [ ] Integração com Integrations MVP
4. [ ] Lead creation automática

### Epic: Portal corretor + CRM — sub-tarefas

1. [ ] Dashboard, leads, casas — dados reais
2. [ ] **Corretor onboarding: termos/contrato** (Q-016)
3. [ ] Registo lead + protecção comissão
4. [ ] Sync HubSpot
5. [ ] Jornada corretor completa pós-login

### Epic: Release readiness — sub-tarefas

1. [ ] Checklist UAT fluxos MVP
2. [ ] Cross-browser (Chrome, Safari, Firefox, mobile)
3. [ ] Performance smoke (Lighthouse)
4. [ ] LGPD copy + consent flows verificados
5. [ ] Go/no-go para uso real limitado

---

## Phase 3 — Growth

| Epic | Module |
|------|--------|
| **House media kit & materiais físicos** | media-kit |
| **Physical-digital bridge** (QR placa → micro-página) | media-kit, tours |
| **Content operations** (upload obra, timeline, fotos) | admin, media-kit |
| **Motor de conteúdo social** | social |
| **Portais admin / proprietário / cliente** | admin |
| **SEO, analytics, performance** | site |

### Epic: Physical-digital bridge — sub-tarefas (resumo)

1. [ ] Micro-página por imóvel (QR da placa)
2. [ ] CTA visita instantânea + detalhes
3. [ ] Design placa alinhado brand

### Epic: Content operations — sub-tarefas (resumo)

1. [ ] Workflow upload progresso obra (quem, quando — Q-009)
2. [ ] Admin UI mínima para casas + timeline
3. [ ] Ligação a media kit / portfólio

---

## Phase 4 — Scale

| Epic | Module |
|------|--------|
| LGPD hardening (retenção, auditoria) | platform |
| Estratégia mobile (PWA / nativo) | mobile |
| Integrações production-grade | tours, platform |

---

## Mapa define vs build

| Tópico | Define (Phase 0 Architecture) | Build (Epic) |
|--------|-------------------------------|--------------|
| User roles | Q-003, architecture §2 | **Identity, roles & journey routing** (P1) |
| User journeys (entry) | Journey map §5 | **Identity…** (P1) |
| Journey features corretor | §5 | **Portal corretor** (P2) |
| Journey visitante | §5 | **Visitas MVP** (P2) |
| Home 2 vencedores | Q-010 | **Public site UI finalization** (P1) |
| Site público completo | MVP scope | **Public site UI finalization** (P1) |
| Integrações | §3–4 | **Integrations MVP** (P2) |
| Media kit / placa / QR | Q-009–Q-013 | **Media kit** + **Physical-digital** (P3) |
| Environments | §6 NFR | **Platform environments** (P1) |

---

## O que NÃO fazer ainda

- Phase 1 build antes de Architecture **Done**
- OpenSpec em epics (só em sub-issues folha)
- Remover variantes home sem Q-010 resolvido
- Integrações production antes de **Integrations MVP** scoped
- Duplicar epic “Home 2 vencedores” em Phase 0 — folded into **Public site UI** (P1)
