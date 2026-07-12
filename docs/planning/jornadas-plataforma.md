# Jornadas e funcionalidades — plataforma ForteGB (estado-alvo)

> **Para quem:** sócios, staff e corretores — visão do produto **quando estiver concluído**.  
> **Não é** cronograma de execução (ver [`phases.md`](./phases.md) e [`progresso-socios.html`](./progresso-socios.html)).  
> **Atualizado:** 2026-07-12 · **Estado:** ⚠️ **RASCUNHO — re-validar no passo 5** (Jornadas/telas), agora que o passo 4 (Arquitetura) fechou. Infra/ambientes ([#146](https://github.com/fortegb/platform/issues/146)) e arquitetura de domínio ([#179](https://github.com/fortegb/platform/issues/179): visitas, mensageria, RBAC, admin) ambas concluídas — fluxos e telas aqui serão re-validados no passo 5. Ver [`roteiro.md`](./roteiro.md).

---

## 1. O que a plataforma será

A ForteGB opera como **construtora-vendedora de casas** em Campinas-SP. A plataforma digital não substitui a confiança e proximidade da família — **amplifica** transparência, captura de clientes e operação de visitas sem escritório físico.

**Quando concluída, a plataforma entrega:**

| Pilar | O que o usuário vê |
|-------|------------------------|
| **Site público** | Marca ForteGB, portfólio de casas, blog, contato (WhatsApp + formulário) |
| **Visitas autoguiadas** | Agendar ou entrar na hora (QR na placa), verificar identidade, receber senha, visitar sozinho |
| **CRM e corretores** | Corretores registram clientes; comissão protegida; clientes de todos os canais no HubSpot |
| **Staff operacional** | Aprovar corretores, visitas, exceções; acompanhar clientes e visitas |
| **Media kit** | Por casa: placa com QR, posters internos, narrativa de obra, kit para corretor |
| **Mobile** | Tudo utilizável no celular (responsive; app nativo só se decidirmos depois) |

Stack e integrações (Tuya, HubSpot, WhatsApp, etc.) estão em [`platform-vision.md`](./platform-vision.md) — **confirmadas** (D-015..D-022); a arquitetura de infra/ambientes/integrações foi definida no Epic [#146](https://github.com/fortegb/platform/issues/146) (fechado). Mecanismo/viabilidade de visitas, mensageria, RBAC e admin definidos no Epic [#179](https://github.com/fortegb/platform/issues/179) (fechado, D-052..D-056).

---

## 2. Quem usa a plataforma

| Papel | Quem | O que faz na plataforma |
|-------|------|-------------------------|
| **Visitante** | Qualquer pessoa | Navega site, lê blog, vê portfólio, inicia contato ou visita |
| **Cliente / comprador** | Interessado num imóvel | Agenda ou faz visita instantânea; envia documentos; recebe senha |
| **Corretor** | Parceiro comercial (ex. Juliana) | Registra-se, assina contratos por casa, registra clientes, acompanha comissão |
| **Staff** | Cláudia, Gisele (+ sócios em operação) | Aprova corretores e exceções; gerencia visitas e clientes do dia-a-dia |
| **Admin** | Ricardo, Adilson, Felipe | Configuração, convites, flags sensíveis, visão global |
| **Digital** | Ricardo, Felipe | Construção e evolução da plataforma (não é “usuário de negócio”) |

Detalhe de governança: [`company-structure.md`](./company-structure.md).

---

## 3. Jornadas — visitante e cliente

### 3.1 Descobrir a ForteGB (site público)

> ✅ **Re-validada no passo 5** ([#185](https://github.com/fortegb/platform/issues/185), D-057) — sem conflito com RBAC (D-055) nem mensageria (D-054); um gap real corrigido (ver contrato de captura abaixo). Detalhe: [`templates/jornada-descoberta-site.md`](./templates/jornada-descoberta-site.md).

```
Google / redes / indicação
    → Home (marca + CTA WhatsApp)
    → Portfólio (casas disponíveis)
    → Detalhe da casa (fotos, planta, bairro, status obra)
    → Blog (conteúdo educativo)
    → Contato (WhatsApp ou formulário → cliente no CRM)
```

**Funcionalidades envolvidas:** site institucional, CMS de conteúdo, CTAs WhatsApp, formulário → HubSpot.

**Contrato de captura de lead (D-057):** tanto o clique em qualquer CTA WhatsApp da jornada quanto o envio do formulário de contato criam/atualizam um `cliente` nível Contato (`fonte: cta-whatsapp` / `fonte: form-site`), reaproveitando `POST /api/contact`. O clique WhatsApp é fire-and-forget — nunca bloqueia a abertura do `wa.me`. Os links `wa.me` são navegação iniciada pelo visitante, não um envio da plataforma — não passam pela fila de mensageria (D-054).

**Estado atual:** UI e mocks prontos; conteúdo real e integrações (persistência do endpoint, beacon no frontend) pendentes → Execução (#56, #78, #73).

---

### 3.2 Visita autoguiada — agendada

> ✅ **Re-validada no passo 5** ([#186](https://github.com/fortegb/platform/issues/186), D-058) — corrigida contra D-052 (Tuya) e D-053 (identidade/dados); o stub pré-arquitetura tinha lacunas estruturais (fallback silencioso, sem reuso de 12 meses, sem fila de exceção), não só conteúdo pendente. Detalhe: [`templates/jornada-visita-agendada.md`](./templates/jornada-visita-agendada.md).

Para quem planeja ir à casa num horário combinado.

| Passo | O que acontece | Canal |
|-------|----------------|-------|
| 1 | Cliente escolhe casa no portfólio e clica **Agendar visita** | Web |
| 2 | Preenche nome, celular (WhatsApp), data/hora preferida (≥1 dia de antecedência) | Web |
| 3 | **Se `Cliente.identity_verified_at` está dentro de 12 meses, pula direto para o passo 6** (reuso D-053) | Plataforma |
| 4 | Senão: tira selfie e envia foto do documento (RG ou CNH); `client-match` compara rosto ↔ documento | Web (câmera) |
| 5 | Se `client-match` falhar/confiança baixa: `verification_attempt` pendente entra na fila `staff-review` **sem bloquear** o agendamento — cliente vê "confirmaremos por WhatsApp antes da visita" (assíncrono, não uma espera síncrona) | Staff (fila #192) |
| 6 | Só após `visit.status = verified` (servidor, nunca um flag do cliente): uma única chamada a `provisionAccess(visit)` (adapter D-052) gera e programa a senha na fechadura — nunca duas ações independentes | Backend |
| 7 | Se `provisionAccess` falhar: fallback D-052 (código de emergência estático + alerta WhatsApp imediato a staff) — nunca um "sucesso" com senha não gravada | Backend / Staff |
| 8 | Cliente recebe WhatsApp (via QStash, D-054): data, endereço, senha, validade | WhatsApp |
| 9 | Cliente registrado no HubSpot; lembrete antes da visita | CRM |
| 10 | Após visita: senha expira; follow-up automático ou manual | CRM / WhatsApp |

**Resultado:** cliente visita sem corretor presente; ForteGB tem cliente identificado e audit trail (LGPD). Selfie apaga na aprovação; documento retido só durante a janela de 12 meses ativa (D-053, reconsiderado e mantido nesta leaf).

**Fronteira:** tela de staff-review (#192) e fluxo instantâneo/QR (#187) são leaves separadas — esta jornada só especifica a entrada/saída da fila compartilhada.

---

### 3.3 Visita instantânea — QR na placa

Para quem está **em frente à casa** e quer entrar na hora.

| Passo | O que acontece |
|-------|----------------|
| 1 | Cliente lê QR na placa “À venda” |
| 2 | Abre micro-página da casa (mobile) |
| 3 | Mesmo fluxo de identidade (selfie + documento) |
| 4 | Se aprovado: senha gerada **na hora** (validade curta, ex. 1–2 h) |
| 5 | Senha por WhatsApp (preferencial) ou SMS |
| 6 | Cliente criado no CRM com origem “QR placa” |

**Dependências:** media kit físico (placa + QR), Tuya, verificação de identidade, WhatsApp.

**Questões em aberto:** acesso condomínio/portaria (Q-017) — pode exigir fluxo extra ou aviso no site.

---

## 4. Jornadas — corretor

### 4.1 Onboarding (primeira vez)

```
Registro no site (Google / Facebook / e-mail)
    → Aceitar termos gerais ForteGB
    → Preencher perfil (CRECI se tiver; dados contato)
    → Staff notificado em cada passo
    → Staff aprova conta
    → Acesso ao portal corretor
```

**Funcionalidades:** autenticação, termos legais, notificações staff, portal `/corretor`.

---

### 4.2 Associar-se a uma casa (contrato por imóvel)

Cada casa exige **aceitação de termos específicos** antes de registrar clientes nessa casa.

| Passo | O que acontece |
|-------|----------------|
| 1 | Corretor vê casas disponíveis para parceria no portal |
| 2 | **Reclama** uma casa → abre contrato daquela casa |
| 3 | Assina eletronicamente (Gov.br ou fluxo equivalente — Q-016) |
| 4 | Staff aprova |
| 5 | Corretor pode registrar clientes **só nessa casa** |

Casas adicionais: repetir “reclamar → contrato → aprovação”.

Modelo legal: [`corretor-contract-template.md`](./corretor-contract-template.md).

---

### 4.3 Registrar cliente (proteção de comissão)

| Passo | O que acontece |
|-------|----------------|
| 1 | Corretor registra nome + CPF + telefone + casa associada |
| 2 | Timestamp guardado — **primeiro registro ganha** naquela casa |
| 3 | Dados sincronizados com HubSpot |
| 4 | Se cliente comprar, comissão atribuída ao corretor registrado |
| 5 | Reatribuição só com aprovação staff/admin |

Também via **bot WhatsApp** (mesma lógica) — detalhe na Architecture epic.

---

### 4.4 Acompanhar pipeline

No portal corretor:

- Casas com contrato ativo  
- Clientes registrados e estado (novo → visita → negociação → fechado)  
- Histórico e notas  

**Integração:** pipeline HubSpot espelhado ou consultado via API.

---

## 5. Jornadas — staff e admin

### 5.1 Staff (operacional)

| Tarefa | Quando |
|--------|--------|
| Aprovar / rejeitar corretor (onboarding ou nova casa) | Notificação em cada passo |
| Aprovar visita quando identidade falhou | Fila de exceções |
| Consultar visitas do dia | Calendário integrado |
| Ver clientes recentes | Dashboard operacional |
| Registrar cliente manual (WhatsApp telefônico) | Entrada manual → HubSpot |

**Fora do MVP plataforma:** despesas por obra (continua em `app-despesas`).

---

### 5.2 Admin (sócios)

| Tarefa | Restrito a admin |
|--------|------------------|
| Convidar usuários (staff, corretores) | Sim |
| Configurar chaves API (Tuya, HubSpot, WhatsApp) | Sim |
| Flags sensíveis (ex. ocultar casa, modo manutenção) | Sim |
| Relatórios agregados (conversão, corretores, visitas) | Sim |
| Exceções de comissão / void de registro | Staff + audit |

---

## 6. Jornadas — marketing e obra

### 6.1 Media kit por casa

Quando uma casa entra em **venda** ou **obra visível**:

| Entregável | Uso |
|------------|-----|
| Página web da casa | Site + compartilha |
| Placa “À venda” + QR | Rua → visita instantânea |
| Posters internos (por cômodo) | Durante visita autoguiada |
| Timeline de obra | Web + redes + poster |
| Kit corretor (fotos + textos) | Download / HubSpot |

**Estado atual:** módulo reconhecido; templates e automação por definir (Q-011, Q-012).

---

### 6.2 Conteúdo social

| Atividade | Plataforma |
|------------|------------|
| Ideias e templates de posts | Repositório `content/social-media/` |
| Calendário editorial | Manual → futuro motor na plataforma |
| Publicação | Manual (Instagram/Facebook) — automação Phase 4+ |

Objetivo: acelerar vendas enquanto a casa está em construção.

---

## 7. Mapa de funcionalidades (módulos)

Resumo por área — detalhe técnico em [`modules.md`](./modules.md).

| Módulo | Funcionalidades principais | Fase alvo |
|--------|---------------------------|-----------|
| **Site** | Home, portfólio, blog, sobre, contato, legal | Phase 1 |
| **Auth** | Login, roles, middleware por perfil | Phase 1 |
| **Visitas** | Agendamento, QR, identidade, senha, calendário | Phase 2 |
| **Integrações** | Tuya, HubSpot, WhatsApp, Google Calendar | Phase 2 |
| **CRM / Corretor** | Portal, clientes, comissão, contratos | Phase 2 |
| **Media kit** | Placa, posters, kit PDF, timeline obra | Phase 3 |
| **Social** | Motor de conteúdo (além dos arquivos estáticos) | Phase 3–4 |
| **Admin** | Portais staff/admin completos | Phase 3 |
| **Mobile** | PWA ou app nativo (se decidido) | Phase 4 |

---

## 8. MVP v1 vs depois

| Incluído no MVP v1 (proposta) | Provavelmente depois |
|-------------------------------|----------------------|
| Site público com portfólio real | App nativo |
| Login corretor + staff + admin | Automação completa redes sociais |
| Visita agendada + QR básico | Acesso condomínio automatizado |
| Identidade frontend + aprovação manual fallback | Match facial avançado / terceiros |
| HubSpot clientes principais | BI avançado |
| Portal corretor (clientes + casas) | Portal cliente logado |
| Placa QR (design + landing) | Geração PDF totalmente automática |
| WhatsApp confirmações | SMS como canal principal |

**Fronteira exacta:** fechar no epic Architecture ([`open-questions.md`](./open-questions.md) Q-003, Q-006, Q-018).

---

## 9. O que já existe vs o que falta

| Área | Hoje (mock / stub) | Falta para estado-alvo |
|------|-------------------|------------------------|
| Site UI | Páginas V1–V4, portfólio mock | Conteúdo real, CMS, deploy produção |
| Login | UI identifier-first | Back-end auth, roles |
| Visitas | Formulários + API parcial | Tuya, identidade real, WhatsApp |
| Corretor | Dashboard UI | HubSpot, Gov.br, contratos |
| CRM | Stubs | Pipeline, sync, regras comissão |
| Media kit | — | Design + templates + QR |
| Board / planning | Epics, docs, portal sócios | Passo 4 fechado (#146, #179) → passo 5 em curso; G2 antes do build (passos 5–7) |

Mocks online: [portal sócios](../index.html) → **Explorar o site**.

---

## 10. Documentos relacionados

| Documento | Conteúdo |
|-----------|----------|
| [`deliverables.md`](./deliverables.md) | Mapa negócio ↔ epics |
| [`modules.md`](./modules.md) | Módulos técnicos |
| [`phases.md`](./phases.md) | Sequência Phase 0–4 |
| [`architecture.md`](./architecture.md) | ADR e fluxos (produto/stack Done; infra #146 fechada; domínio #179 fechada) |
| [`apresentacao-socios.html`](./apresentacao-socios.html) | Modelo de negócio e governança |
| [`progresso-socios.html`](./progresso-socios.html) | Progresso atual (issues) |
| [`mapa-roteiro.html`](./mapa-roteiro.html) | Visão por fases e módulos |

---

*Este documento é rascunho do **passo 5** — re-validar jornadas/telas agora que o passo 4 fechou (#146 e #179 ambos fechados), com sócios e corretores. Produto/stack Architecture (#1→#38) já fechou; não bloqueia este rascunho.*
