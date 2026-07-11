```markdown
# agents.md — ForteGB (Project Context + Agent Instructions)

> **Primary rule:** I (the user) will interact with AI in **English**, but **ALL deliverables** (website copy, UI text, blog posts, social posts, emails, pages, docs, Platform docs, issue titles, etc.) **MUST be in Brazilian Portuguese (pt-BR)**. This is mandatory.
>
> **pt-BR is strict — never European Portuguese (pt-PT).** Do not generate pt-PT vocabulary or spelling. Examples (pt-PT → **pt-BR**): ecrã → **tela** · telemóvel → **celular** · utilizador → **usuário** · ficheiro → **arquivo** · registo/registar → **registro/registrar** · contacto → **contato** · gerir → **gerenciar** · equipa → **equipe** · actual/actualizar → **atual/atualizar** · activo → **ativo** · directo → **direto** · projecto → **projeto** · secção → **seção** · excepção → **exceção** · controlo → **controle** · planeamento → **planejamento** · aceder → **acessar** · "está a fazer" → **"está fazendo"**. (Keep genuine pt-BR forms like **fricção/detecção** that legitimately retain `cç`.)

---

## 1) About Me (User)
- Old-school developer with engineering background (**MSc in Engineering**).
- Experience: **ANSI C on Linux (1990s–2000s)** and **LAMP stack** for web apps.
- Current role: **Vice-President of Technology** at an **IT Distribution Company** in **São Paulo, Brazil**.
- Working mode:
  - Communication with AI: **English**
  - Outputs/deliverables: **pt-BR**

---

## 2) About the Company (ForteGB)
- Company: **ForteGB**
- Website/domain: **fortegb.com**
- Ownership: family business, run in partnership with **brother-in-law** and **nephew**.
- Business model:
  - Buy land → build houses → sell for profit
  - Part-time operation (owners have day jobs)

### 2.1 Brand positioning
We want to build on the strengths of being a family-owned company:
- **Transparency**
- **Trust**
- **Closeness**
- **Openness**

Customer feedback indicates they chose us due to:
- Trust during negotiation
- Transparency and openness in presenting the product (houses) and in the deal process
- Slogan in Portuguese: **Construindo sonhos e realizando vidas através de projetos imobiliários de qualidade. Sua nova casa está aqui.**

### 2.2 Location context (important)
- Based in **Campinas-SP, Brazil** (largest non-capital city in the country).
- Region known for strong economy/industry, universities, and tech talent.
- **Instruction:** keep this location in context for research and deliverables (e.g., stock images, references, tone, examples, local assumptions).

### 2.3 Branding assets
- ForteGB already has:
  - Logos
  - Accent color
  - Branding material
- **After processing this file:** ask the user to **upload brand assets** so they can be used consistently.

### 2.4 Proposed slogan (draft)
> “Construindo sonhos e realizando vidas através de projetos imobiliários de qualidade. Sua nova casa está aqui.”

---

## 3) Technology Needs

### 3.1 Company Website

#### 3.1.1 Main Website (fortegb.com)
Goal: modern, clean institutional site consistent with the brand and positioning.

Required pages/sections:
- **Home**
  - Hero image (user can provide)
  - CTA emphasizing **WhatsApp** contact
- **Portfólio**
  - Houses with pictures, plans, and descriptive info
- **Sobre**
  - Company story, trust/transparency, family business values
- **Blog**
  - Relevant content for prospective customers (AI-assisted content)
- **Contato**
  - Emphasize **WhatsApp + email** (small company, no office)

Content production:
- AI should help generate:
  - Page copy
  - Blog posts (quantity to be defined; user wants help creating many posts)

#### 3.1.2 Self-Guided Tour (Booking + Smart Lock)
From each house listing (portfolio), allow a visitor to book a self-guided tour.

**High-level flow (scheduled booking):**
1. User clicks to book a visit
2. Form collects:
   - Name
   - Mobile number (for WhatsApp)
   - Preferred date/time (calendar selection)
3. Identity verification:
   - Take photo/selfie
   - Upload document (RG or CNH)
   - Use frontend library to compare person photo with document photo
   - Store verification result securely
4. If approved:
   - Create visit entry on a calendar system
   - Generate a unique, time-limited password
   - Use **Tuya API** to write password to the house Smart Lock
   - Send confirmation via WhatsApp (date, time, address, password)
   - Password expires after visit window (e.g., 2-4 hours)

**On-site "instant visit" flow:**
- Customer at the house scans a **QR code** on the sale plaque
- QR opens a website page (house-specific landing page)
- Same verification process (photo + document)
- If approved:
  - Generate password immediately
  - Deliver password via **WhatsApp message** (preferred) or SMS
  - Customer enters immediately
  - Password valid for limited time (e.g., 1-2 hours)

**Technical requirements:**
- Identity verification: use a frontend library to compare a person photo taken and an uploaded document 
- Calendar system: integrate with Google Calendar API or similar
- Password management: secure generation, time-based expiration, audit log
- WhatsApp integration: WhatsApp Business API or Twilio WhatsApp API
- Security: LGPD compliance, data encryption, secure storage of documents
- Smart Lock: Tuya API integration for password management

**Additional considerations:**
- Handle failed verifications gracefully
- Allow manual approval workflow for edge cases
- Track visit history and analytics
- Send reminders before scheduled visits
- Post-visit follow-up automation

> Implementation details will be refined during development phase.

#### 3.1.3 CRM Lead Registration (HubSpot)
Goal: track leads and associate realtor-owned leads to prevent disputes and ensure commissions.

**Requirements:**
- Use a SaaS CRM (likely **HubSpot**)
- Website has a **logged area** for realtors to register leads tied to a house
- If a registered lead buys, realtor gets commission
- Also register leads that come directly to ForteGB
- Data should sync back to HubSpot via API
- Reports/visibility for each realtor and for ForteGB

**Workflow details:**
1. **Realtor registration:**
   - Realtors get login credentials
   - Access to portal showing available houses
   - Can register new leads with:
     - Lead name, contact info (phone, email)
     - Associated house/property
     - Visit date (if applicable)
     - Notes/observations
     - Timestamp for commission tracking

2. **Direct leads:**
   - Website contact forms → HubSpot
   - WhatsApp inquiries → manual or automated entry
   - Self-guided tour bookings → automatic lead creation

3. **Commission protection:**
   - First-registered realtor gets credit (timestamp-based)
   - Lead cannot be reassigned without approval
   - Clear audit trail in HubSpot

4. **HubSpot configuration needs:**
   - Custom properties: house/property ID, realtor ID, visit date
   - Pipeline stages: New Lead → Visit Scheduled → Visit Completed → Negotiating → Closed Won/Lost
   - Automation: notifications to realtors, follow-up reminders
   - Reports: lead source, conversion rates, realtor performance

**Instruction:**
- AI should help:
  - Define the complete workflow and data model
  - Configure HubSpot pipeline/fields/automation/workflows
  - Plan the integration points from the website (API endpoints)
  - Design the realtor portal UI/UX
  - Set up data sync and error handling

---

### 3.2 Social Media (Content Engine)
Need help generating:
- A large set of post ideas (e.g., **100 posts**)
- The actual posts for:
  - Instagram
  - Facebook
  - Optional: TikTok

Content mix:
- House ads (during construction and sales phase)
- Short stories / educational posts about building or buying a house
- Target: prospective home buyers in the Campinas-SP context

Primary goal:
- Accelerate sales while houses are being built
- Drive traffic to the website and convert leads

---

## 4) How to Work With AI + Project Plan
Expectation:
- AI should parse this file and produce a **phased project plan** to execute:
  - Website creation
  - Tour functionality
  - CRM integration
  - Social content engine

**Decision to make:**
- What should be done inside Cursor/AI vs other tools (e.g., Manus, Lovable, etc.)
- User notes: Manus produced more professional design results than ChatGPT/Gemini in prior experience.
- AI should propose a workflow:
  - Where to design (tool choice)
  - Where to implement (code, content, integrations)
  - How to iterate efficiently with minimal back-and-forth

**Recommended workflow approach:**
1. **Design phase:** Use Manus/Lovable for initial UI/UX design and visual mockups
2. **Implementation phase:** Use Cursor (this tool) for actual code development
3. **Content generation:** Use AI (Cursor) for copywriting, blog posts, social media content
4. **Integration setup:** Use Cursor for API integrations, HubSpot configuration guidance
5. **Iteration:** Design refinements in design tool, code changes in Cursor

**Project phases (to be detailed):**
- Phase 1: Foundation (setup, basic website structure)
- Phase 2: Core features (portfolio, blog, contact)
- Phase 3: Advanced features (self-guided tour, CRM integration)
- Phase 4: Content & marketing (blog posts, social media content)
- Phase 5: Testing, optimization, and launch

---

## 5) Proposed Technology Stack (from prior work)
Suggested stack:

| Layer                  | Tool                                       | Purpose                                                           |
| ---------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| Frontend + Backend     | Nuxt 3 (Vue 3)                              | Unified framework for pages, components, backend API routes       |
| Styling                | Tailwind CSS + DaisyUI                      | Fast, modern, responsive UI                                       |
| CMS                    | Sanity (headless CMS)                       | Manage listings, blog, marketing content via API                  |
| Database               | PostgreSQL (recommended) / MySQL            | Internal business data (tours, leads, users, audit logs)          |
| Hosting                | Vercel                                      | Auto-deploy from GitHub; supports static + SSR                    |
| Editor / IDE           | Cursor                                      | AI-assisted coding + manual development                           |
| Version Control        | GitHub                                      | Repo, branching, collaboration, CI/CD                             |

**Additional systems:**
- CRM: **HubSpot** (HubSpot API for integration)
- Smart locks: **Tuya** + **Tuya API**
- Identity verification: **Frontend library** (e.g., face-api.js, TensorFlow.js, or similar) for photo-to-document comparison
- Calendar: **Google Calendar API** or similar
- WhatsApp: **WhatsApp Business API** or **Twilio WhatsApp API**
- File storage: **Cloud storage** (AWS S3, Google Cloud Storage, or Vercel Blob) for document uploads

**Stack evaluation notes:**
- ✅ Nuxt 3: Excellent choice for full-stack Vue app with SSR/SSG
- ✅ Tailwind + DaisyUI: Modern, fast development
- ✅ Sanity: Chosen CMS (D-034) — free-tier fit; Contentful not used
- ✅ PostgreSQL: Recommended over MySQL for better JSON support and features
- ✅ Vercel: Perfect fit for Nuxt deployment
- ⚠️ Consider: Database hosting (Vercel Postgres, Supabase, or separate service)
- ⚠️ Consider: Authentication solution (Auth.js/NextAuth.js equivalent for Nuxt, or Supabase Auth)

**Instruction:**
- AI should evaluate if these are good options for the needs and recommend changes if necessary.
- Consider security, scalability, and Brazilian data residency requirements (LGPD).

---

## 6) Agent Operating Rules (How to Respond)
- Deliverables must be in **pt-BR** unless the user explicitly asks otherwise.
- Do not invent missing facts (prices, legal rules, specs, schedules, etc.). If uncertain, state assumptions clearly.
- Keep outputs clean and structured; avoid unnecessary verbosity.
- Keep ForteGB brand attributes present in copy:
  - trust, transparency, family business, closeness
- Keep Campinas-SP context in mind for:
  - tone, imagery, examples, and localized assumptions

## 6.1) Security & Compliance (LGPD)
**Important considerations:**
- All personal data collection must comply with **LGPD** (Lei Geral de Proteção de Dados)
- Identity documents must be stored securely and encrypted
- Implement data retention policies (delete documents after verification)
- Privacy policy and terms of service required
- User consent for data processing
- Secure API endpoints with authentication
- Regular security audits recommended

**Data handling:**
- Documents: encrypt at rest and in transit, delete after verification period
- Lead data: store in HubSpot (LGPD-compliant), allow user data deletion requests
- Visit logs: anonymize after retention period

---

## 7) Required Inputs (Request to User)
After reading/processing this file, ask the user to upload:
1. ForteGB **logo files** (SVG/PNG/PDF if available)
2. **Brand guide** (colors, typography, spacing, usage rules)
3. Any existing **hero image** candidate(s)
4. Current portfolio list (houses, status, basic details) if available
5. **API credentials/setup info:**
   - Tuya developer account details
   - HubSpot account and API keys
   - WhatsApp Business API setup (if available)
   - Preferred frontend identity verification library (if any specific preference)

## 7.1) Testing & Quality Assurance
**Testing requirements:**
- Responsive design testing (mobile, tablet, desktop)
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Form validation and error handling
- API integration testing (Tuya, HubSpot, WhatsApp)
- Identity verification flow testing
- Security testing (authentication, data encryption)
- Performance testing (page load times, API response times)
- User acceptance testing (UAT) with real users

**Quality standards:**
- Clean, maintainable code
- Proper error handling and logging
- Accessibility (WCAG guidelines)
- SEO optimization
- Mobile-first responsive design

---

## 8) Next Steps
After processing this file, the AI should:

1. **Generate a detailed phased project plan:**
   - Phase breakdown with timelines and dependencies
   - Tooling workflow (Cursor vs Manus/Lovable/etc.)
   - Resource requirements and assumptions

2. **Propose website information architecture:**
   - Site map and page structure
   - Content plan for each page (pt-BR)
   - Component library and design system approach

3. **Create integration plan:**
   - HubSpot API integration architecture
   - Tuya API integration for smart locks
   - Calendar system integration
   - Frontend identity verification library integration
   - WhatsApp API integration

4. **Develop content pipeline:**
   - 100-post social media content plan (ideas + templates)
   - Blog post topics and content strategy
   - Content calendar and publishing schedule

5. **Request missing information:**
   - Brand assets (logos, colors, typography)
   - Hero images
   - Portfolio data (houses, photos, plans)
   - API credentials setup guidance (Tuya, HubSpot, etc.)

```

---

## 9) Controle do Projeto (para Agentes de IA)

> **A espinha do projeto é o [Roteiro](./docs/planning/roteiro.md)** — 9 passos em 3 estágios (Definição 1–7 · Execução 8 · Evolução 9), com gates G1/G2/G3. É **controlador**, não decorativo, e é representado no board (campo `Etapa` + `Milestone` + tipo nativo), não em prosa. **Passo atual: 4 Arquitetura** (#146). Ver `roteiro.md` antes de escolher trabalho.

Este projeto mantém arquivos de controle na raiz. Agentes de IA devem **lê-los no início** e **mantê-los atualizados** ao final de mudanças relevantes:

| Arquivo | Finalidade | Quando atualizar |
| --- | --- | --- |
| `docs/planning/roteiro.md` | **Roteiro — a espinha** (passos, gates, modelo de board) | Ao mudar passos, gates ou modelo de board |
| `AGENTS.md` (este arquivo) | Contexto do projeto, regras e convenções para IA | Ao mudar regras, stack, convenções ou diretrizes duradouras |
| `STATUS.md` | **Bússola de sessão:** epics ativos, próximo passo, foco Phase 0+ | Ao mudar foco ou concluir passo de epic |
| `CHANGELOG.md` | Histórico do que foi feito (close-out de changes) | Ao concluir mudanças concretas (UI, código, docs) |
| `docs/planning/` | Canon de design: visão, módulos, fases, perguntas, decisões, runbooks | Grilling, decisões de arquitetura, novos módulos (ex.: media kit) |
| `ROADMAP.md` | Espelho gerado do GitHub Project | Gerado por `rbo-create-issue` / `rbo-close-change` — **não editar à mão** |

### Ordem de trabalho (Etapa + dependências)
- **Ordem = passo do Roteiro (campo `Etapa`) + dependências**, **não** o número da issue (número = ordem de criação).
- **`Etapa`** (campo de board, 9 opções, supersede `Phase`) situa cada item no passo 1–9; **`Milestone`** (`v0 Definição` → v1 → v2 → v3) é o pacote de entrega; **tipo nativo** (Feature/Bug/Task/Epic) classifica.
- Dependências registradas no **corpo da issue** com linha `**Depends on:** #X` (o "blocked by" nativo do GitHub não é scriptável via `gh`). **"Próximo" = item do passo atual sem `Depends on:` por fechar.**
- Gates (`roteiro.md`): **G2** = build (Etapa 8) só após toda a Definição (1–7) fechada — `v0` a 100%. `STATUS.md` "próximo passo" = ponteiro legível; fonte de verdade = board (`Etapa` + `Depends on:`).

### Estágio atual
- **Passo 4 (Arquitetura) — em curso.** A1–A4 + B1–B4 + C1–C3 + D1–D4 + E1–E4 feitos (D-025..D-044); **#166** D-045 + `.rbo/lifecycle.yml` (stage vs close). Faltam skills em `ai-skills` + #167–172, depois 5 e 6. **G2** gated até 4–6. Ver **`roteiro.md`** + **`STATUS.md`**.
- **Passos 1–2 validados (D-028 / #177):** contexto + mapa de funcionalidades aceitos; jornadas/telas no passo 5 (#176).
- **Grillings concluídos:** #145 (fundacional), #28 (CRM), #33 (home), roteiro (#173), passos 1–2 (#177), A–E config + lifecycle contract → **D-015..D-045**. Stack confirmada: serverless Vercel, **Sanity** + **Supabase master** + HubSpot sync, Telegram-first. MVP em **v1/v2/v3** (D-018).
- **Decisões técnicas:** fechadas em `decisions.md` (D-015..D-045); o que resta é `deferred` (tours v2, media v3, mobile) — reabre no grilling da fase.
- **Board no modelo Roteiro (migração A feita, #174):** campo **`Etapa`** (9 passos, ex-`Phase`) + Milestone **`v0 — Definição`** + tipos nativos, aplicado a todos os itens. **Migração B** (Milestones v1/v2/v3) diferida ao passo 7. Platform docs (`mapa-roteiro.html` + relatório por Etapa) publicadas no GitHub Pages.
- **Fluxo formal:** issue → OpenSpec change → close (`rbo-*` skills). OpenSpec **1:1** com sub-issues folha, não com epics.
- **Ainda sem números de versão** — entradas no `CHANGELOG.md` por **data**, seção "Não versionado".

### Convenções já estabelecidas (resumo)
- **Idioma:** comunicação com IA em inglês; **entregáveis em pt-BR**.
- **Board (roteiro, D-024):** campo **`Etapa`** (9 passos, supersede `Phase`) + **`Milestone`** nativo (`v0 Definição` → v1 → v2 → v3) + **tipo de issue nativo** — **Feature / Bug / Task / Epic** (usar o tipo nativo do GitHub, não o prefixo `Epic:`; `chore` fica só em commits e mapeia a **Task**). *(Modelo definido; migração do board pendente.)*
- **Escala de UI:** base global reduzida para `81.25%` (`assets/css/main.css`) — tende a um visual compacto.
- **Sistema de botões:**
  - **Verde WhatsApp** `#3E8E5E` (hover `#34784F`) = ações de WhatsApp.
  - **Azul secundário** (`primary-400` / `#1a74a1`) = ação primária (ex.: "Agendar Visita").
  - **Outline navy** = ação secundária (ex.: "Ver Detalhes", "Ver Todos").
  - Botões compactos e de tamanho consistente (`px-* py-*` padronizados, borda 1px com `border`/`border-transparent` para igualar caixas).
- **Cores de marca:** `primary-500` `#203045` (navy) é o fundo de header e footer; `hero-slate` `#4a5a72` adicionado ao tema.
- **Home com variantes de hero (em avaliação):** `/` (`HeroSplit`, split azul original, default), `/classico` (`HeroClassic`), `/slate` (`HeroSlate`), `/azul` (`HeroAzul`, `primary-400`). Rotas por **estilo**, não por número (evita colisão com release v1/v2/v3). Miolo compartilhado em `components/HomeContent.vue`; cada Hero é um componente próprio. As rotas de variante usam `noindex`. Escolha do hero diferida ao lançamento (Q-010 → D-021).
- **Login:** fluxo *identifier-first* (UI/mock) em `pages/login.vue`. Comportamento e pendências de back-end em **`docs/autenticacao-login.md`**.

### Platform docs (GitHub Pages)

> **Nome acordado (2026-07-03):** **Platform docs** (EN, issues/chat) · **Documentação da plataforma** (pt-BR, copy sócios).  
> **Não confundir com:** the **product** (app Nuxt, `/corretor`, visitas) nem **logged-in portals** (corretor, staff, admin).

| Termo | Significado |
|-------|-------------|
| **Platform docs** | Site estático em **`docs/`** → [fortegb.github.io/platform](https://fortegb.github.io/platform/) |
| **Product / app** | Código Nuxt em `pages/`, API, deploy Vercel — site público + áreas logadas |
| **Repo `platform`** | Repositório GitHub (contém ambos) |

- Conteúdo: índice, planning HTML, mocks estáticos, relatório de progresso.
- Footer **Atualizado … · hash · Board GitHub** via **`docs/assets/build-info.json`** + **`docs/assets/portal-build.js`**.
- **Três camadas (automático):**
  1. **Git hook** — após commits em `docs/`, commit separado `chore: refresh portal build-info` (hash aponta para o commit anterior com as alterações).
  2. **`npm install`** — `prepare` corre `hooks:install` (skip em CI).
  3. **GitHub Action** — backup em push a `main` se o hook não correr.
- Regeneração: **`node scripts/generate-progress-report.mjs`** (progresso **+** `mapa-roteiro.html` live do board), **`node scripts/generate-portal-assets.mjs`**, ou **`npm run pages:sync`** (completo).
- **Close-out:** `rbo-close-change` corre **`npm run pages:sync`** depois do board `Done`, para o relatório sócios refletir a issue fechada (commit + push em `main`).
- Agentes: commit/push normal em mudanças em Platform docs — **não** correr `pages:build-info` à mão.

> Importante: evitar valores de cor **arbitrários** (`to-[#xxxxxx]`) em arquivos novos — preferir cores **nomeadas** no `tailwind.config.js`, pois arbitrários em arquivos recém-criados podem não ser compilados sem rebuild.
