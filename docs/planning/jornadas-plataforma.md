# Jornadas e funcionalidades — plataforma ForteGB (estado-alvo)

> **Para quem:** sócios, staff e corretores — visão do produto **quando estiver concluído**.  
> **Não é** cronograma de execução (ver [`phases.md`](./phases.md) e [`progresso-socios.html`](./progresso-socios.html)).  
> **Atualizado:** 2026-07-03 · **Estado:** rascunho vivo — detalhes técnicos fecham no epic Architecture.

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

Stack e integrações (Tuya, HubSpot, WhatsApp, etc.) estão em [`platform-vision.md`](./platform-vision.md) — **confirmadas** (D-015..D-022); a arquitetura de infra/ambientes/integrações é definida no Epic [#146](https://github.com/fortegb/platform/issues/146).

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

```
Google / redes / indicação
    → Home (marca + CTA WhatsApp)
    → Portfólio (casas disponíveis)
    → Detalhe da casa (fotos, planta, bairro, status obra)
    → Blog (conteúdo educativo)
    → Contato (WhatsApp ou formulário → cliente no CRM)
```

**Funcionalidades envolvidas:** site institucional, CMS de conteúdo, CTAs WhatsApp, formulário → HubSpot.

**Estado atual:** UI e mocks prontos; conteúdo real e integrações pendentes.

---

### 3.2 Visita autoguiada — agendada

Para quem planeja ir à casa num horário combinado.

| Passo | O que acontece | Canal |
|-------|----------------|-------|
| 1 | Cliente escolhe casa no portfólio e clica **Agendar visita** | Web |
| 2 | Preenche nome, celular (WhatsApp), data/hora preferida | Web |
| 3 | Tira selfie e envia foto do documento (RG ou CNH) | Web (câmera) |
| 4 | Sistema compara rosto ↔ documento; se OK, aprova automaticamente | Plataforma |
| 5 | Se falhar, staff recebe alerta para aprovação manual | Staff |
| 6 | Visita criada no calendário; senha temporária enviada à fechadura (Tuya) | Backend |
| 7 | Cliente recebe WhatsApp: data, endereço, senha, validade (ex. 2–4 h) | WhatsApp |
| 8 | Cliente registrado no HubSpot; lembrete antes da visita | CRM |
| 9 | Após visita: senha expira; follow-up automático ou manual | CRM / WhatsApp |

**Resultado:** cliente visita sem corretor presente; ForteGB tem cliente identificado e audit trail (LGPD).

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
| Board / planning | Epics, docs, portal sócios | Architecture Done → Phase 1 build |

Mocks online: [portal sócios](../index.html) → **Explorar o site**.

---

## 10. Documentos relacionados

| Documento | Conteúdo |
|-----------|----------|
| [`deliverables.md`](./deliverables.md) | Mapa negócio ↔ epics |
| [`modules.md`](./modules.md) | Módulos técnicos |
| [`phases.md`](./phases.md) | Sequência Phase 0–4 |
| [`architecture.md`](./architecture.md) | ADR e fluxos (a completar) |
| [`apresentacao-socios.html`](./apresentacao-socios.html) | Modelo de negócio e governança |
| [`progresso-socios.html`](./progresso-socios.html) | Progresso atual (issues) |
| [`mapa-fases.html`](./mapa-fases.html) | Visão por fases e módulos |

---

*Este documento deve ser atualizado quando o epic Architecture fechar o MVP e quando jornadas mudarem após validação com sócios e corretores.*
