# Fases e epics

> Sequenciamento de alto nível. Cada epic vira issue pai no board (campo **Phase**).  
> Sub-tarefas abaixo viram **sub-issues** quando o board existir.  
> **Estado vivo:** [GitHub Project `platform`](https://github.com/orgs/fortegb/projects/1) · [`ROADMAP.md`](../../ROADMAP.md).

**Convenção:** *Define* (Architecture) vs *Build* (Phase 1+). Epics grandes com entrega visível têm epic dedicado — não ficam enterrados em “auth” ou “portfólio”.

---

## Phase 0 — Fundação (planning + infra)

**Objetivo:** org GitHub, workflow formal, **arquitetura validada**, MVP definido.

**Ordem Phase 0 (dependências):**

```
Seed docs/planning (✅)
    → GitHub org migration (✅)
    → Bootstrap board & OpenSpec (✅)
    → Architecture & MVP definition   ← define roles, journeys, MVP, home choice (Q-010)
    → (paralelo possível) Brand assets upload
```

| # | Epic | Board | Module | Estado | Bloqueado por |
|---|------|-------|--------|--------|---------------|
| 1 | **Seed docs/planning** | [#4](https://github.com/fortegb/platform/issues/4) | platform | ✅ Done (2026-07-01) | — |
| 2 | **GitHub org migration** | [#8](https://github.com/fortegb/platform/issues/8) | platform | ✅ Done (2026-07-01) | — |
| 3 | **Bootstrap board & OpenSpec** | [#20](https://github.com/fortegb/platform/issues/20) | platform | ✅ Done (2026-07-01) | — |
| 4 | **Architecture & MVP definition** (produto/stack) | [#1](https://github.com/fortegb/platform/issues/1) | platform | ✅ Done | — |
| 4b | **Arquitetura da solução & ambientes** (infra/env/integrações) | [#146](https://github.com/fortegb/platform/issues/146) | platform | ✅ Done | — |
| 4c | **Arquitetura de domínio** (visitas, mensageria, RBAC, admin) | [#179](https://github.com/fortegb/platform/issues/179) | platform | ✅ Done | — |
| 5 | ~~**Brand assets**~~ | [#2](https://github.com/fortegb/platform/issues/2) | branding | **Done** | epic fechado 2026-07-19, escopo dissolvido |

| Epic | Doc / runbook |
|------|---------------|
| GitHub org migration | [github-org-migration.md](./github-org-migration.md) |
| Bootstrap board & OpenSpec | [workflow.md](./workflow.md) |
| Architecture & MVP definition | [architecture.md](./architecture.md) · [open-questions.md](./open-questions.md) |
| Brand assets upload | AGENTS.md §7 |
| Brand & design system | [design-system-fluxo.md](./design-system-fluxo.md) |

### Epic: GitHub org migration ([#8](https://github.com/fortegb/platform/issues/8)) — sub-tarefas

1. [x] Gerar PAT em `fortegb-admin` (pós-rename): scopes `repo`, `project`, `read:org` ([#9](https://github.com/fortegb/platform/issues/9))
2. [x] Renomear personal `fortegb` → `fortegb-admin` ([#10](https://github.com/fortegb/platform/issues/10))
3. [x] Criar Organization **`fortegb`** ([#11](https://github.com/fortegb/platform/issues/11))
4. [x] Adicionar `rbonon` como **Organization owner** ([#12](https://github.com/fortegb/platform/issues/12))
5. [x] **Move work** → transferir `sandbox` para org ([#13](https://github.com/fortegb/platform/issues/13))
6. [x] Atualizar `dotfiles.conf` + `setup_pats` + Keychain (ver runbook) ([#14](https://github.com/fortegb/platform/issues/14))
7. [x] Atualizar remotes locais (`platform`, `app-despesas`, `ai-assets`) ([#15](https://github.com/fortegb/platform/issues/15))
8. [x] Reconectar **Vercel** ao repo na org ([#16](https://github.com/fortegb/platform/issues/16))
9. [x] Habilitar **Issue types** (Epic, Feature, Task) em Settings → Planning ([#17](https://github.com/fortegb/platform/issues/17))
10. [x] Smoke test: clone, push, `gh repo view`, `gh auth status` ([#18](https://github.com/fortegb/platform/issues/18))
11. [x] Registrar execução em `decisions.md` / dotfiles `DECISIONS.md` se aplicável ([#19](https://github.com/fortegb/platform/issues/19))

### Epic: Bootstrap board & OpenSpec ([#20](https://github.com/fortegb/platform/issues/20)) — sub-tarefas

1. [x] Inicializar OpenSpec no repo (`openspec/` + CLI) ([#21](https://github.com/fortegb/platform/issues/21))
2. [x] Criar Project **`platform`** na org ([#22](https://github.com/fortegb/platform/issues/22))
3. [x] Campos custom: **Phase**, **Module** ([#23](https://github.com/fortegb/platform/issues/23))
4. [x] Registrar epics Phase 0 restantes como issues pai ([#24](https://github.com/fortegb/platform/issues/24))
5. [x] Gerar `ROADMAP.md` pela primeira vez ([#25](https://github.com/fortegb/platform/issues/25))
6. [x] Atualizar `STATUS.md` com números de issues ([#26](https://github.com/fortegb/platform/issues/26))

### Epic: Architecture & MVP definition ([#1](https://github.com/fortegb/platform/issues/1)) — ✅ Done (produto/stack)

> Produto/stack definidos via **`rbo-grilling`**. Deliverables: [`architecture.md`](./architecture.md) + [`decisions.md`](./decisions.md) **D-015..D-021**.

1. [x] Grilling fundacional — constraints, build-vs-buy, **Q-004** (CMS + Supabase), system shape (serverless), MVP v1/v2/v3 → D-015..D-018
2. [x] Grilling CRM — **Q-007** (Supabase master + HubSpot sync) + **Q-018** (fontes de cliente) → D-019/D-020
3. [x] Grilling home — **Q-010** → D-021 (variantes por estilo; escolha do hero **diferida ao lançamento**)
4. [x] Journey map + screen map MVP → `architecture.md` §3 + [`screen-map.md`](./screen-map.md) ([#32](https://github.com/fortegb/platform/issues/32))
5. [x] `architecture.md` completo · MVP v1/v2/v3 (D-018) em `platform-vision.md`
6. [x] Checkpoint: todas Q-* **resolved** ou **deferred** (tours/media/mobile diferidos para a sua fase)
7. [x] Epics Phase 1–4 criados no board ([#37](https://github.com/fortegb/platform/issues/37))

> **#1 cobriu produto/stack.** A arquitetura de **infra/ambientes/integrações** foi definida no Epic **Arquitetura da solução & ambientes** ([#146](https://github.com/fortegb/platform/issues/146), D-022, **fechado**). Revisão pós-#146 encontrou lacunas de arquitetura de domínio — Epic **Arquitetura de domínio** ([#179](https://github.com/fortegb/platform/issues/179): visitas, mensageria, RBAC, admin, D-052..D-056), **também fechado**. Passo 4 completo; build da Fase 1 ainda aguarda G2 (passos 5–7).

### ~~Epic: Brand assets~~ ([#2](https://github.com/fortegb/platform/issues/2)) — **fechado 2026-07-19**

O epic nasceu da premissa de `AGENTS.md` §7 ("peça os assets de marca antes de construir").
A premissa não se sustentou: o site foi construído, #197 extraiu os tokens dele, e o design
system passou a **produzir** a documentação de marca (#70) em vez de consumi-la. O escopo
se dissolveu — nenhum item ficou por fazer:

1. [x] Favicon — **feito** (`ff0492f`), derivado do mark do logo do header sobre navy `#203045`. O `favicon.ico` anterior tinha 14 bytes de texto ASCII, então toda aba mostrava o ícone padrão do navegador.
2. [x] ~~Brand guide~~ ([#40](https://github.com/fortegb/platform/issues/40)) — **fechada**, superseded por #70.
3. [x] ~~Hero / imagens candidatas~~ ([#41](https://github.com/fortegb/platform/issues/41)) — **movida para Etapa 8**, decisão de lançamento.
4. [x] Logo em SVG ([#39](https://github.com/fortegb/platform/issues/39)) — **reparentado sob #67**, ao lado de #69 (templates de impressão), único consumidor real do vetor. Segue aberto lá, não aqui.

---

## Phase 1 — Core platform (build)

**Objetivo:** ambientes estáveis, identidade & routing, site público finalizado, design system.

Epics **já criados no board**. **Build gated por G2** (passos 1–7 da Definição) — [#146](https://github.com/fortegb/platform/issues/146) e [#179](https://github.com/fortegb/platform/issues/179) (Arquitetura de domínio) ambos fechados; gate ativo agora = passos 5–6.

| Epic | Module | Depende de |
|------|--------|------------|
| **Platform environments** | platform | #146 (fechado) |
| **Identity, roles & journey routing** | auth | #146, #179 (RBAC, fechado), Platform environments |
| **Public site UI finalization** | site | #146, Brand assets (ideal) |
| **Brand & design system** | branding | Brand assets |

> **Removido como epics separados:** “Autenticação e papéis”, “Consolidação home”, “Portfólio + blog” — absorvidos abaixo.

### Epic: Platform environments — sub-tarefas

1. [ ] Supabase project + aplicar `docs/database-schema.sql`
2. [ ] Env vars (local, Vercel staging/prod)
3. [ ] Sanity configurado (CMS — D-034)
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
7. [ ] Testes manuais: jornada login → destino correto por role

### Epic: Public site UI finalization — sub-tarefas

> Home: variantes por **estilo** (`/`, `/hero`, `/slate`, `/gradient`); **escolha do hero diferida ao lançamento** (Q-010 → D-021). Site institucional “pronto para uso”.

1. [ ] Escolher o hero de produção (Q-010 diferido, D-021) e remover variantes não escolhidas
2. [ ] Portfólio lista + detalhe (layout final; **filtros/busca** se MVP)
3. [ ] Sobre, Blog, Contato — polish + copy
4. [ ] Blocos **blog / redes sociais** (homepage, portfólio, footer) para tráfego
5. [ ] Privacidade, Termos, cookies
6. [ ] Header, footer, botões — alinhar design system
7. [ ] Wire portfólio/blog a Sanity (CMS) + status operacional no Supabase
8. [ ] **Mobile-first responsive** (Q-019)
9. [ ] Pass básico a11y/SEO meta
10. [ ] Remover dependência de `data/mock.ts` onde dados reais existirem

### Epic: Brand & design system — sub-tarefas

> Fluxo completo, granularidade das leaves e tabela de issues → [design-system-fluxo.md](./design-system-fluxo.md).

1. [ ] Fundação de tokens web derivada do Home existente ([#68](https://github.com/fortegb/platform/issues/68))
2. [ ] Leaves de design por jornada — Visitante/cliente ([#197](https://github.com/fortegb/platform/issues/197)–[#200](https://github.com/fortegb/platform/issues/200)), Corretor ([#201](https://github.com/fortegb/platform/issues/201)–[#203](https://github.com/fortegb/platform/issues/203)), Staff ([#204](https://github.com/fortegb/platform/issues/204)–[#206](https://github.com/fortegb/platform/issues/206)), Admin ([#207](https://github.com/fortegb/platform/issues/207))
3. [ ] Varreduras de tokenização por seção de persona ([#208](https://github.com/fortegb/platform/issues/208)–[#211](https://github.com/fortegb/platform/issues/211))
4. [ ] Master templates print (placa, poster) — rascunho Figma ou equivalente ([#69](https://github.com/fortegb/platform/issues/69))
5. [ ] Gerar design system: docs, componentes, style guide + guia de voz e tom ([#70](https://github.com/fortegb/platform/issues/70))
6. [ ] Social templates alinhados (ligação Phase 3) ([#71](https://github.com/fortegb/platform/issues/71))

---

## Phase 2 — Business flows (build)

| Epic | Module | Notas |
|------|--------|-------|
| **Integrations MVP** | platform | Hub central antes de features |
| **Visitas autoguiadas MVP** | tours | Consome integrations |
| **Portal corretor + CRM** | crm | Consome integrations; features corretor |
| **Release readiness** | platform | UAT, cross-browser, checklist pré-lançamento |

### Epic: Integrations MVP — sub-tarefas

1. [ ] HubSpot service real (contacts, deals mínimo)
2. [ ] **Cliente capture matrix** (form, visitas, WhatsApp, corretor — Q-018)
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
4. [ ] Cliente creation automática

### Epic: Portal corretor + CRM — sub-tarefas

1. [ ] Dashboard, clientes, casas — dados reais
2. [ ] **Corretor onboarding: termos/contrato** (Q-016)
3. [ ] Registro cliente + proteção comissão
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
| User journeys (entry) | Journey map §3 | **Identity…** (P1) |
| Screen map | [`screen-map.md`](./screen-map.md) ([#32](https://github.com/fortegb/platform/issues/32)) | **Identity…** (P1) shells; features P2+ |
| Journey features corretor | §5 | **Portal corretor** (P2) |
| Journey visitante | §5 | **Visitas MVP** (P2) |
| Home (hero — escolha diferida) | Q-010 → D-021 | **Public site UI finalization** (P1) |
| Site público completo | MVP scope | **Public site UI finalization** (P1) |
| Integrações | §3–4 | **Integrations MVP** (P2) |
| Media kit / placa / QR | Q-009–Q-013 | **Media kit** + **Physical-digital** (P3) |
| Environments | §6 NFR | **Platform environments** (P1) |

---

## O que NÃO fazer ainda

- Phase 1 build antes de G2 abrir (#146 e #179 fechados; ainda faltam passos 5–7 da Definição)
- OpenSpec em epics (só em sub-issues folha)
- Remover variantes home antes da escolha do hero (Q-010 diferido ao lançamento, D-021)
- Integrações production antes de **Integrations MVP** scoped
