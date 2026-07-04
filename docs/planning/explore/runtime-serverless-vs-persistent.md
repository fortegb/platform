# Runtime & system shape — Serverless vs Persistente (avaliação)

> **Estado:** captura de explore (2026-07-03) — sessão *Grilling 0: Foundational architecture stances* ([#145](https://github.com/fortegb/platform/issues/145)).
> **Decisão:** **Serverless** (ver §4). Este doc registra **ambas** as opções avaliadas.
> **Feeds:** [`architecture.md`](../architecture.md) §4 (System context) + [`decisions.md`](../decisions.md) (D-xxx no apply/close).
> **Relacionado:** Q-004 (CMS vs DB) — **resolvido** na mesma sessão (ver §6).

---

## 1. Contexto & critérios

A plataforma **não é** um site de conteúdo com poucas integrações — é um sistema **integration-heavy e event-driven**, com um **segundo cliente (mobile) provável**. Cargas que pesam na escolha:

- **Bots** WhatsApp *e* Telegram (clientes e corretores) — bidireccionais, conversacionais, stateful.
- **Notificações** de saída (WhatsApp/Telegram/SMS) — confirmações, lembretes, **pedidos de aprovação a staff**.
- **Automação residencial** além de fechaduras — Tuya: câmaras, interruptores; controle **+ eventos de entrada**.
- **CRM HubSpot** — sync bidireccional contínuo.
- **Trabalho agendado/assíncrono** — expiração de senha, lembretes, follow-ups, retries em APIs de terceiros instáveis.
- **App mobile futura provável** — sobretudo **staff a aprovar pedidos com push** (aprovação corretor/casa, fila de exceção de identidade).

**Critérios de decisão (prioridade do Ricardo):**
1. **Free-first** — só gastar quando provar utilidade (iniciativa nascente, pessoas físicas, pré-receita).
2. **Zero-ops** — dev solo (Ricardo); tempo é o recurso escasso, não dinheiro.
3. **Simplicidade / Vercel** — preferência explícita pela simplicidade e DX da Vercel; async espalhado é aceitável desde que funcione.
4. **Escala baixa** — low-hundreds de usuários em picos; 1–2 casas/ano.
5. **Foco no único** — construir só os fluxos únicos (visitas/identidade, corretor); comprar/gerido o resto.

---

## 2. Caso A — Serverless (ESCOLHIDO)

**Forma:** app **Nuxt/Nitro** em modo serverless; rotas de servidor = funções; **API-first** (web = 1.º cliente; PWA/native/bots reutilizam os mesmos endpoints). Sem processo always-on.

| Camada | Vendor / lib | Free-first |
|--------|--------------|------------|
| Host | **Vercel** (Hobby grátis → Pro ~$20/mo quando útil), preset Nitro `vercel` | ✅ (ver §5) |
| Async / scheduler / retries | **Upstash QStash** (grátis ~500 msg/dia) — jobs com atraso, retries, cron | ✅ |
| Real-time (aprovações) | **Supabase Realtime** (grátis) ou web-push via **FCM** (grátis) | ✅ |
| Dados / auth / storage | **Supabase** (Postgres, Auth, Storage) | ✅ |
| Conteúdo (CMS) | Contentful/Sanity (TBD longevidade free — §6) | ✅ |
| Bots | **Telegram** webhook → função (grátis); **WhatsApp Cloud API** depois (pago) | ⚠️ WA pago |
| Integrações | Tuya / HubSpot / Google como funções (stateless, reconectam por invocação) | ✅ |
| Cache / rate-limit (opcional) | Upstash Redis (grátis) | ✅ |
| Deploy/CI | Integração Git da Vercel | ✅ |

**Como cada carga difícil é resolvida:**

| Carga | Resolução serverless |
|-------|----------------------|
| Bots + estado conversacional | Webhook → função; estado no Postgres, não em memória |
| Webhooks (dispositivos, HubSpot, bots) | Endpoints de função stateless |
| Notificações event-triggered | Disparar/enfileirar a partir do handler |
| Trabalho **com atraso** (lembrete, expiração, follow-up) | **QStash** ("chama este endpoint daqui a 1h", com retry) — Vercel Cron sozinho é grosseiro/diário |
| **Retries** em Tuya/HubSpot/WA | QStash com retry + dead-letter |
| Controle de dispositivos (fechadura, interruptor) | Chamada de saída a partir da função |
| **Streaming de câmara ao vivo** | **Não passar pelo backend** — vídeo ao vivo fica na app/cloud do fornecedor (Tuya/RTSP); embed/link |
| PWA/native futura + push | Rotas API-first servem todos os clientes; push via FCM/web-push |
| Retenção LGPD | Varredura agendada (QStash/cron) |

**Prós:** free + zero-ops (nada always-on); scale-to-zero; DX Vercel; sem servidor para operar.
**Contras:** lógica assíncrona **espalhada** por funções + scheduler externo; cold starts; sem conexões persistentes/pools quentes; tarefas longas/streaming inadequadas (mitigado: offload de vídeo ao fornecedor).

---

## 3. Caso B — Persistente (alternativa avaliada)

**Forma:** **um processo Node always-on** = Nuxt/Nitro em modo `node-server`. Como nunca dorme, o mesmo processo faz tudo: HTTP (SSR + API + webhooks), **scheduler in-process**, **websockets/SSE** para real-time, e **pools de conexão quentes** a Tuya/HubSpot.

| Camada | Vendor / lib | Free-first |
|--------|--------------|------------|
| Host (always-on) | **Fly.io** (~$3–5/mo, websockets, não dorme) · **Oracle Cloud Always Free** (VM ARM $0 mas **auto-operada**) · Railway (~$5, melhor DX) · Render pago $7 (tier grátis **dorme** → rejeitado) | ⚠️ verificar termos |
| Jobs / scheduler | **pg-boss** sobre o Postgres do Supabase, in-process (substitui QStash) · alt. BullMQ + Upstash Redis | ✅ |
| Real-time (aprovações) | websockets nativos (`crossws`/Socket.IO) **ou** Supabase Realtime | ✅ |
| Dados / auth / storage | **Supabase** (igual ao Caso A) | ✅ |
| Conteúdo (CMS) | Contentful/Sanity (igual) | ✅ |
| Bots | **Telegram** (`grammY`) grátis; WhatsApp Cloud API depois (pago) — webhook ou long-poll | ⚠️ WA pago |
| Integrações | Tuya connector, `@hubspot/api-client`, `googleapis` — com **pools/token caches quentes** | ✅ |
| Push (PWA futura) | `web-push` (VAPID) in-process, ou Supabase Realtime; FCM opcional | ✅ |
| TLS / proxy | automático (Fly/Railway) ou Caddy self-hosted (Oracle) | — |
| Deploy/CI | GitHub Actions → Docker → `fly deploy` | ✅ |
| Monitoring | Sentry (grátis), UptimeRobot/BetterStack (grátis) | ✅ |

**Prós:** async/bots/eventos/real-time **naturais** num só processo; **menos SaaS** (pg-boss no Postgres substitui QStash; websockets substituem FCM); sem cold starts; pools quentes; tarefas longas/streaming possíveis; **modelo familiar** (servidor a correr — instinto C/LAMP).
**Contras:** **grátis + always-on + zero-ops não coexistem** — Render grátis dorme (mata o scheduler), Oracle Always Free é IaaS crua (operas OS/TLS/deploy), Fly/Railway são PaaS suaves mas ~$5/mo (quebra free-first); não faz scale-to-zero; mais superfície de DevOps para dev solo.

---

## 4. Decisão

**Escolhido: Caso A — Serverless (Vercel Hobby → Pro quando útil).**

**Porquê:** as prioridades declaradas — **free-first + zero-ops + simplicidade Vercel** — apontam diretamente para serverless. Nenhum host persistente oferece *simultaneamente* «não-dorme» e «zero-ops» de graça: ou dorme (Render), ou operas a VM (Oracle), ou pagas (Fly/Railway). O que se **abdica** ao escolher serverless é a coerência arquitectural do async/real-time (fica espalhado por funções + QStash) — aceitável, dado que o Ricardo declarou não se importar com async espalhado «desde que funcione», e a §2 mostra que funciona.

**O Caso B seria a escolha** se as prioridades fossem coerência arquitectural + real-time + modelo de servidor familiar acima de free-first/zero-ops.

**Condições da escolha serverless (olhos abertos):**
1. **Adicionar QStash** (scheduler+queue gerido) — é o que torna o async espalhado *fiável* (jobs com atraso + retries). Vercel Cron sozinho é grosseiro/diário.
2. **Não fazer proxy de vídeo ao vivo** pelo backend — offload para o fornecedor.
3. **Vercel Hobby agora → Pro (~$20/mo) quando provar utilidade** (o tier grátis é «não-comercial», mas para iniciativa nascente/pré-receita/baixo tráfego é zona cinzenta, softly enforced; a nível de **uso** não há gatilho a esta escala — 1–2 casas/ano não chega perto de nenhuma quota).

---

## 5. Free-tier — realidade por componente

| Componente | Free comercial? | Nota |
|------------|-----------------|------|
| Vercel Hobby | ⚠️ zona cinzenta | «não-comercial» na letra; a esta escala sem gatilho de uso; Pro quando útil |
| Supabase | ✅ | 500MB DB, 1GB storage, 50k auth; **fotos** = 1.º a crescer (offload p/ Cloudflare R2); projeto grátis **pausa após 7d inativo** (site vivo evita) |
| CMS (Contentful/Sanity) | ✅ verificar | Sanity com free-tier mais generoso/durável — reconsiderar vendor (reversível via camada de serviço) |
| Upstash QStash | ✅ | ~500 msg/dia — muito acima do volume inicial |
| HubSpot | ✅ | CRM grátis real; pago só p/ automação avançada |
| Telegram bot | ✅ | Sem custo por mensagem, sempre |
| **WhatsApp** | ⚠️ pago | Meta cobra por template no Brasil; canal pago-quando-útil |
| **Tuya** | ⚠️ verificar | Trial grátis; quotas/custo de produção a confirmar; baixo volume = pequeno |
| Google Calendar / YouTube / FCM | ✅ | Grátis |
| Match de identidade (face-api.js client-side) | ✅ | Lib client-side = sem SaaS (se Q-005 ficar client-side/manual) |

**Bends reais do free-first:** WhatsApp (por mensagem) e Tuya (quotas) — ambos únicos, baixo volume, pequenos no início.

---

## 6. Ligações

- **Q-004 (CMS vs DB) — resolvido** nesta sessão: conteúdo (casas, timeline, blog, media) → **CMS (Contentful/Sanity)**; estado operacional + PII sensível (status, leads, visitas, verificação, contratos, RG/CNH) → **Supabase** (Postgres + bucket privado com RLS); **vídeo** → embed YouTube/Vimeo; **join** por ID de casa partilhado, merge no Nuxt; **social** → fora da plataforma. Detalhe → `decisions.md` (D-xxx no apply).
- **System shape** — este doc; feeds `architecture.md` §4 (substituir «Data TBD» + diagrama por stack confirmada).
- **Portabilidade** — manter app **Nitro-portável** (mudança de preset) como seguro barato: se a Vercel incomodar antes de tempo, migrar p/ Netlify/Cloudflare (serverless) ou Fly (persistente) sem reescrita.
- **Gatilhos de reavaliação** → persistente: se real-time/websockets ou streaming se tornarem centrais, ou se o custo de gerenciar QStash+funções superar o de um processo; → Vercel Pro: feature Pro-only ou receita clara.

---

## 7. Pendências

- [ ] Verificar quotas/custo de **Tuya** em produção.
- [ ] Confirmar **WhatsApp Cloud API** (preços por template BR) vs Telegram-first.
- [ ] Escolher vendor de **CMS** por longevidade de free-tier (Contentful já em `package.json` vs Sanity).
- [ ] No apply de #145: atualizar `architecture.md` §4 + entrada em `decisions.md`.
