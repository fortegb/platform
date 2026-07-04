# Architecture & MVP — ForteGB Platform

> **Status:** rascunho — preenchido no epic **Architecture & MVP definition** (Phase 0).  
> **Princípio (D-011):** decisões técnicas **abertas** até grilling — escolher a melhor solução no momento, não na preparação.

**Pré-requisito:** GitHub org + bootstrap board.  
**Entrada:** [`open-questions.md`](./open-questions.md) · **Saída:** este doc + [`decisions.md`](./decisions.md) + epics no board  
**Mapa negócio:** [`deliverables.md`](./deliverables.md)

**DEFINE only.** Build = [`phases.md`](./phases.md).

---

## 0. Visão confirmada (produto)

1. **Website** — presença corporativa (UI, marca, valores), portfólio, blog, pontes para redes.
2. **Corretor** — self-service onboarding (registo → termos → Gov.br → staff → portal/bot/leads).
3. **Cliente** — ver casas; visita autoguiada (agendada + QR); identidade; senha/fechadura; lead CRM.
4. **Staff ForteGB** — admin (escopo TBD na grilling).
5. **Mobile** — tudo usable no celular (responsive v1; native/PWA TBD).
6. **Backend** — Tuya, HubSpot, WhatsApp, Calendar; CRM multi-canal.
7. **Media kit impresso** por casa.

---

## 1. Scope & MVP boundary

> **Resolvido (2026-07-03, Grilling 0 [#145](https://github.com/fortegb/platform/issues/145)) → D-018.** Fatias verticais; v1 arquitetado em profundidade, v2/v3 just-in-time.

- **v1** — site público + portfólio real + CTA visita **WhatsApp** · **auth + papéis** (fundação) · corretor onboarding (registo → staff aprova) · **registo de lead + timestamp de comissão (primeiro ganha) + sync HubSpot** · contrato/Gov.br **manual-first** · staff aprovações + leads · admin config mínimo.
- **v2** — **visitas autoguiadas (agendada + QR)** + identidade + Tuya + calendário + fila de exceção · **Gov.br automatizado** · bots WhatsApp/Telegram de lead.
- **v3 / Fase 3** — media kit, timeline de obra, motor social, portal cliente logado, BI.

**Corretor antes de tours:** sem dependências de hardware/externas, protege comissão desde cedo, alinhado a venda humana; tours = maior build único → v2.

**Lock now (fundacional, difícil reverter — mesmo com a feature diferida):** modelo de dados core + IDs estáveis (house, user, lead, corretor; visit/contract como refs forward-looking); RBAC cobrindo todos os papéis; taxonomia de armazenamento (§5); camada de adaptadores; API-first; escolha de queue (QStash).

**Diferido para o grilling da fase:** tours (Q-005/006/017), media kit (Q-009/011–013), social, mobile (Q-008/019), design conversacional dos bots. Estado-alvo → jornadas §8.

---

## 2. User roles & portals

> Preenchido a partir de [`company-structure.md`](./company-structure.md) §6, §7 (2026-07-02). Q-003 parcialmente resolvido.

| Role | Quem | Portal / access | MVP? | Notas |
|------|------|-----------------|------|-------|
| **Visitante** | Público | Site, blog, portfólio | Sim | |
| **Cliente** | Comprador | Fluxo visita, contato | Sim | CPF liga a registo corretor se existir |
| **Corretor** | Contratados (ex. Juliana) | Portal corretor + bot WhatsApp | Sim | CRECI preferencial; mesmo fluxo sem CRECI |
| **Staff** | Cláudia, Gisele (+ sócios em operação) | Área logada operacional | Sim | Despesas, leads, visitas, consultas |
| **Admin** | Ricardo, Adilson, Felipe | Staff + config, flags, exceções | Sim | Três sócios = admin |
| **Digital** | Ricardo, Felipe | Construção plataforma | Sim | Arquiteto Digital · Desenvolvedor Digital |
| **Sócio / investidor** | Três fundadores | Admin na plataforma | — | Papel público uniforme na apresentação |

**Auth (MVP):** Google, Facebook, e-mail — staff e corretores em `platform`; SSO partilhado com `app-despesas` (fase posterior).

**MVP (2026-07-03):** **admin** = Ricardo, Adilson, Felipe · **staff** = Cláudia, Gisele (+ sócios).

| Área | Admin only |
|------|------------|
| Hoarding flags | Sim |
| User/role invite | Sim |
| Platform config / API keys | Sim |
| Lead exceptions, corretor onboarding, void registo | Staff |
| Financials cross-house | Fora do MVP plataforma (TBD pós-sucesso) |

---

## 3. User journey map (MVP)

> **Fonte estado-alvo:** [`jornadas-plataforma.md`](./jornadas-plataforma.md) (atualizado 2026-07-03).  
> **Este §3** = resumo para Architecture; detalhe passo-a-passo permanece em jornadas.  
> **Screen map:** [`screen-map.md`](./screen-map.md) ([#32](https://github.com/fortegb/platform/issues/32)).

| Role | Jornada | Trigger | Steps (resumo) | Outcome |
|------|---------|---------|----------------|---------|
| **Visitante** | Descobrir ForteGB | Google / redes / indicação | Home → portfólio → detalhe casa → blog → contato (WhatsApp / form) | Lead ou interesse; confiança na marca |
| **Cliente** | Visita agendada | Clica **Agendar visita** no portfólio | Form (nome, WhatsApp, data/hora) → selfie + documento → match ID → (fallback staff) → calendário + Tuya + WhatsApp confirmação → lead HubSpot → lembrete → expiração senha / follow-up | Visita sem corretor; lead identificado (LGPD) |
| **Cliente** | Visita instantânea (QR) | QR na placa “À venda” | Micro-página mobile → mesmo fluxo identidade → senha imediata (1–2 h) → WhatsApp/SMS → lead origem “QR placa” | Entrada na hora; lead capturado |
| **Corretor** | Onboarding (conta) | Registo no site | OAuth/e-mail → termos gerais → perfil (CRECI opcional) → staff notificado → staff aprova → portal `/corretor` | Conta activa |
| **Corretor** | Associar casa (1.ª ou extra) | Portal: casas disponíveis | **Reclamar** casa → contrato por imóvel → assinatura (Gov.br — Q-016) → staff aprova | Pode registar prospectos **só nessa casa** |
| **Corretor** | Registar prospecto | Portal ou bot WhatsApp | Nome + CPF + tel + casa → timestamp (**primeiro ganha**) → sync HubSpot → pipeline | Comissão protegida |
| **Corretor** | Pipeline | Portal corretor | Casas com contrato; estados novo → visita → negociação → fechado; notas | Acompanhamento comercial |
| **Staff** | Aprovar corretor / casa | Notificação em cada passo onboarding | Qualquer staff aprova ou rejeita | Corretor activo ou casa associada |
| **Staff** | Exceção identidade | Match ID falhou (visita) | Fila de exceções → aprovar / rejeitar manualmente | Visita autorizada ou bloqueada |
| **Staff** | Operação diária | Rotina | Visitas do dia (calendário); leads recentes; lead manual (WhatsApp telefónico) → HubSpot | Operação sem escritório |
| **Admin** | Config / governo | Área admin | Convites; API keys (Tuya, HubSpot, WhatsApp); flags (ocultar casa, manutenção); relatórios agregados; exceções comissão (com audit) | Plataforma configurada |

**Referências jornadas:** §3.1 site · §3.2 agendada · §3.3 QR · §4 corretor · §5 staff/admin · §6–7 media/social.

### 3.1 Journey gaps

Resolvido em [`screen-map.md`](./screen-map.md) (2026-07-03). Detalhe passo-a-passo staff permanece em jornadas §5.1 (grilling).

---

## 4. System context

> **Confirmado (2026-07-03, Grilling 0) → D-017.** Serverless, API-first. *(Q-007 HubSpot source-of-truth ainda aberto.)* Avaliação serverless vs persistente → [`explore/runtime-serverless-vs-persistent.md`](./explore/runtime-serverless-vs-persistent.md).

```mermaid
flowchart TB
  subgraph clients [Clients]
    WEB[Nuxt web — first client]
    PWA[PWA/native — futuro]
    BOT[Bots WA/Telegram]
  end
  subgraph app [App serverless — Vercel Hobby→Pro]
    API[Nuxt/Nitro · rotas API-first]
    ADP[Camada de adaptadores]
    Q[Upstash QStash · jobs+retries]
  end
  subgraph data [Dados & conteúdo]
    SB[(Supabase · Postgres/Auth/Storage+RLS)]
    CMS[CMS · Contentful/Sanity]
    VID[YouTube/Vimeo · vídeo]
  end
  subgraph integrations [Integrações via adaptadores]
    HS[HubSpot]
    TUYA[Tuya]
    WA[WhatsApp/Telegram]
    CAL[Calendar]
    GOV[Gov.br]
  end
  WEB --> API
  PWA --> API
  BOT --> API
  API --> SB
  API --> CMS
  API --> ADP
  API --> Q
  CMS --> VID
  ADP --> HS
  ADP --> TUYA
  ADP --> WA
  ADP --> CAL
  ADP --> GOV
```

---

## 5. Data & content strategy

> **Resolvido Q-004 (2026-07-03) → D-016.** Taxonomia por tipo de conteúdo; join por **ID de casa** partilhado, merge no Nuxt.

| Domínio | Source of truth | Notas |
|---------|-----------------|-------|
| Conteúdo de casa (fotos, plantas, descrição, timeline) | **CMS** (Contentful/Sanity) | autoria com UI; vendor reversível via camada de serviço |
| Blog | **CMS** | autoria unificada |
| Estado operacional da casa (status, links a leads/visitas/verificação) | **Supabase** (Postgres) | queryable; drive de tours/CRM; status ≠ conteúdo |
| Vídeo | **YouTube/Vimeo** (embed) | URL como campo; não passa pelo backend |
| Docs sensíveis (contratos Gov.br, RG/CNH) | **Supabase** bucket privado + RLS | LGPD: encriptação + retenção |
| Leads / CRM | **HubSpot** (+ Supabase) | *Q-007 (source-of-truth) ainda aberto*; Q-018 fontes multi-canal |
| Social | **Fora da plataforma** | drafts IA + scheduler grátis opcional |

---

## 6. Key flows (decisions TBD)

> Ponteiros para jornadas; decisões técnicas fecham na grilling. Detalhe → [`jornadas-plataforma.md`](./jornadas-plataforma.md).

### 6.1 Public site & home *(Q-010)*

- Fluxo visitante: descoberta → portfólio → detalhe → blog → contato ([jornadas §3.1](./jornadas-plataforma.md#31-descobrir-a-fortegb-site-público)).
- **Decisão pendente:** 2 homes vencedores (com/sem hero); variantes `/`–`/v4` em mock.
- Build: Phase 1 **Public site UI finalization**.

### 6.2 Self-guided visits *(Q-005, Q-006, Q-017)*

- **Agendada:** form → identidade → calendário → Tuya → WhatsApp → CRM ([§3.2](./jornadas-plataforma.md#32-visita-autoguiada--agendada)).
- **Instantânea QR:** placa → micro-página → identidade → senha curta ([§3.3](./jornadas-plataforma.md#33-visita-instantânea--qr-na-placa)).
- **Identidade:** selfie + documento; match frontend; fila staff se falhar (Q-005).
- **Tuya:** senha temporária; expiração pós-janela de visita.
- **Condomínio / portaria:** Q-017 — fluxo extra ou aviso; **não detalhado**.

### 6.3 Corretor & CRM *(Q-007, Q-016, Q-018)*

- Onboarding + contrato **por casa** + Gov.br (Q-016) ([§4](./jornadas-plataforma.md#4-jornadas--corretor)).
- Prospectos: primeiro registo ganha; sync HubSpot; bot WhatsApp TBD.
- **Lead sources matrix:** form site, visitas, corretor, WhatsApp (Q-018) — [`deliverables.md`](./deliverables.md) §4.

### 6.4 Media kit & physical *(Q-009, Q-011–Q-013)*

- Por casa: web, placa QR, posters, timeline obra, kit corretor ([§6](./jornadas-plataforma.md#6-jornadas--marketing-e-obra)).
- Phase 3 epics; templates e automação por definir na grilling.

### 6.5 Staff & admin operations

- Staff: aprovações, fila ID, calendário visitas, leads manuais ([§5.1](./jornadas-plataforma.md#51-staff-operacional)).
- Admin: convites, API keys, flags, relatórios ([§5.2](./jornadas-plataforma.md#52-admin-sócios)).
- **Screen map:** [`screen-map.md`](./screen-map.md); staff/admin shells P1, features P2+.

---

## 7. Non-functional

> **Atualizado (2026-07-03) → D-015, D-017.** Free-first + zero-ops.

| Topic | Decision |
|-------|----------|
| Hosting | **Vercel Hobby (grátis) → Pro (~$20/mo) quando útil**; Nitro-portável (Netlify/Cloudflare) como seguro |
| Runtime | **Serverless**, API-first; async/retries via **Upstash QStash** |
| Mobile v1 | Responsive web (Q-019); PWA/native depois reutiliza a API |
| Messaging | **Telegram-first** (grátis); WhatsApp = pago-quando-útil |
| LGPD | Docs sensíveis em **bucket privado Supabase + RLS**; encriptação + retenção |
| Auth | Supabase Auth (Google/Facebook/e-mail); RBAC cobrindo todos os papéis |
| Custo | Free-first; bends conhecidos: WhatsApp (por msg), Tuya (quotas) |

---

## 8. Epic list for board (output)

Ver checklist em [`deliverables.md`](./deliverables.md) §8 e [`phases.md`](./phases.md).

---

## 9. Open items

Todas Q-* em [`open-questions.md`](./open-questions.md) **resolved** ou **deferred** antes de fechar epic.
