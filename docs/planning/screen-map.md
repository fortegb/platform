# Mapa de telas MVP — Plataforma ForteGB

> **Estado:** ✅ **Passo 5 (Jornadas/telas) concluído** — todas as 11 leaves do epic [#176](https://github.com/fortegb/platform/issues/176) re-validadas (#185–#195, D-057..D-067). Rotas/estados abaixo já refletem a re-validação; cada seção tem seu próprio marcador e link para o detalhe em `templates/`. Ver [`roteiro.md`](./roteiro.md).  
> **Jornadas:** [`architecture.md`](./architecture.md) §3 · [`jornadas-plataforma.md`](./jornadas-plataforma.md)  
> **Legenda:** `simulado` = UI existe, sem back-end · `novo` = tela/rota por construir · **Fase** = fase no plano

---

## Visitante / cliente (público + visita)

> Home, Portfólio, Blog e Contato (descoberta) ✅ **re-validadas** —
> [#185](https://github.com/fortegb/platform/issues/185), D-057. Agendar
> visita ✅ **re-validada** — [#186](https://github.com/fortegb/platform/issues/186),
> D-058. Visita QR ✅ **re-validada** —
> [#187](https://github.com/fortegb/platform/issues/187), D-059 (reabre
> D-053 para o mecanismo de renovação limitada) e **desenhada** —
> [#199](https://github.com/fortegb/platform/issues/199): rota única virou
> três (identificação / verificação / resultado), com a porta-OTP de reuso, a
> recusa imediata com saída via WhatsApp e a falha de acesso visível.
> Gerenciar visita
> (cancelar/remarcar) ✅ **nova, validada** —
> [#188](https://github.com/fortegb/platform/issues/188), D-061. Fronteira
> compartilhada: staff-review = #192 (fechada); condomínio/portaria = #140
> (já deferido a Execução). Sobre segue rascunho (fora do escopo de #185).
> Demais linhas seguem `RASCUNHO` até suas leaves de Passo 5 fecharem.

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Home (variantes hero — Q-010) | `/`, `/hero`, `/slate`, `/gradient` | simulado — validado #185 | 1 | [#56](https://github.com/fortegb/platform/issues/56) Site público UI |
| Portfólio lista | `/portfolio` | simulado — validado #185 | 1 | #56 |
| Portfólio detalhe | `/portfolio/[slug]` | simulado — validado #185 | 1 | #56 |
| Blog lista / post | `/blog`, `/blog/[slug]` | simulado — validado #185 | 1 | #56 |
| Sobre | `/sobre` | simulado | 1 | #56 |
| Contato | `/contato` | simulado — validado #185 | 1 | #56 |
| Privacidade, Termos | `/privacidade`, `/termos` | simulado | 1 | #56 |
| Agendar visita — formulário | `/visita/agendar/[houseId]` | simulado — validado #186, desenhado #198, estado remarcação #200 | 2 | [#81](https://github.com/fortegb/platform/issues/81) Visitas |
| Agendar visita — verificação (handoff) | `/visita/agendar/[houseId]/verificacao` | simulado — desenhado #198 | 2 | #81 |
| Resultado da visita (7 variantes) | `/visita/[token]` | simulado — desenhado #198 | 2 | #81 |
| Visita QR — identificação | `/visita/qr/[code]` | simulado — validado #187, desenhado #199 | 2 | #81 |
| Visita QR — verificação (identidade ou OTP) | `/visita/qr/[code]/verificacao` | simulado — desenhado #199 | 2 | #81 |
| Visita QR — resultado (liberado / recusado / falha) | `/visita/qr/[code]/resultado` | simulado — desenhado #199 | 2 | #81 |
| Gerenciar visita (cancelar/remarcar, sem login) | `/visita/gerenciar/[token]` | novo — validado #188, desenhado #200 | 2 | #81 |
| Aviso condomínio/portaria (Q-017) | TBD inline ou modal no fluxo visita | novo | 2 | [#140](https://github.com/fortegb/platform/issues/140) |

**Fora MVP v1:** portal cliente logado (jornadas §8).

---

## Corretor

> Onboarding (conta) e Contrato por casa ✅ **re-validados** —
> [#189](https://github.com/fortegb/platform/issues/189), D-062 (CPF do
> próprio corretor agora obrigatório — [#196](https://github.com/fortegb/platform/issues/196),
> D-068, fechada). Registrar cliente ✅ **re-validado** —
> [#190](https://github.com/fortegb/platform/issues/190), D-063. Painel/
> pipeline ✅ **re-validado** — [#191](https://github.com/fortegb/platform/issues/191),
> D-064 (`registro.status` definido pela primeira vez). Gov.br permanece
> manual (não automatizado, decisão de MVP já fechada).

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Login | `/login` | simulado — desenhado #201 (align) | 1 | [#48](https://github.com/fortegb/platform/issues/48) Identidade |
| Painel | `/corretor/dashboard` | simulado — validado #191 | 2 | [#86](https://github.com/fortegb/platform/issues/86) Portal corretor |
| Casas / reclamar | `/corretor/casas` | simulado | 2 | #86 |
| Clientes lista / novo | `/corretor/clientes` (validado #191), `/corretor/clientes/novo` (validado #190) | simulado — validado #190, #191 | 2 | #86 |
| Onboarding (termos, perfil, CRECI) | `/corretor/onboarding/*` | novo — validado #189, desenhado #201 | 2 | #86 |
| Contrato por casa (minuta + upload manual) | `/corretor/casas/[id]/contrato` | novo — validado #189, desenhado #201 | 2 | #86 |
| Bot WhatsApp (registro cliente) | externo WhatsApp | novo | 2 | [#142](https://github.com/fortegb/platform/issues/142) |

---

## Staff (operacional)

> Fila de exceção de verificação ✅ **re-validada** —
> [#192](https://github.com/fortegb/platform/issues/192), D-060. Aprovar
> corretor / casa associada ✅ **re-validadas** —
> [#189](https://github.com/fortegb/platform/issues/189), D-062
> (`/staff/casas-pendentes` unificada em `/staff/corretores` — uma página,
> duas filas). Operação diária ✅ **re-validada** —
> [#193](https://github.com/fortegb/platform/issues/193), D-065
> (staff-wide, entrada manual nível Contato, resumo de pendências linkando
> #189/#192). Gestão de acesso Tuya ✅ **re-confirmada, sem UI** —
> [#194](https://github.com/fortegb/platform/issues/194), D-066 (Supabase
> Studio, veredito de D-052/D-056 inalterado).

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Área staff (estrutura pós-login, resumo de pendências) | `/staff` ou redirect de `/login` | novo — validado #193 | 1 estrutura / 2 funcionalidades | #48 / epic staff TBD |
| Aprovar corretor + casa associada (fila unificada) | `/staff/corretores` | novo — validado #189 | 2 | #86 |
| Fila exceção identidade (visita) | `/staff/visitas/excecoes` | novo — validado #192 | 2 | [#80](https://github.com/fortegb/platform/issues/80) |
| Visitas do dia (staff-wide) | `/staff/visitas` | novo — validado #193 | 2 | #81 |
| Cliente manual (nível Contato, WhatsApp telefônico) | `/staff/clientes/novo` | novo — validado #193 | 2 | Integrações / CRM |
| Gestão de código de emergência Tuya | Supabase Studio (sem rota na plataforma) | re-confirmado #194 — sem UI custom | — | [#77](https://github.com/fortegb/platform/issues/77) |

---

## Admin (sócios)

> ✅ **Re-validada** — [#195](https://github.com/fortegb/platform/issues/195),
> D-067. Rotas `/admin/*` corrigidas para `/staff/*` (D-056, sem árvore
> separada); chaves API vira somente-leitura (D-043, edição real no Vercel
> só por ForteGB tech); ocultar-casa removida (Sanity Studio nativo, sem
> rota na plataforma).

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Convidar usuário / atribuir papel (staff, admin) | `/staff/usuarios` | novo — validado #195 | 2+ | [#119](https://github.com/fortegb/platform/issues/119) |
| Status de chaves API (somente leitura — Tuya, HubSpot, WhatsApp) | `/staff/integracoes` | novo — validado #195 | 2 | [#72](https://github.com/fortegb/platform/issues/72) |
| Modo manutenção (flag viva, sem deploy) | `/staff/config` | novo — validado #195 | 2+ | #119 |
| Registro de Cliente / histórico (auditoria, exceções) | `/staff/registros` | novo | 2 | [#86](https://github.com/fortegb/platform/issues/86) |

**Nota:** limites admin vs staff → [`architecture.md`](./architecture.md) §2.

---

## Lacunas de jornada — resolução

| Lacuna (§3.1) | Decisão |
|---------------|---------|
| Jornadas staff | Passos acima; detalhe passo-a-passo → jornadas §5.1 (completar em grilling) |
| UI admin vs staff | Rotas separadas `/staff/*` vs `/admin/*` |
| Condomínio / portaria | [#140](https://github.com/fortegb/platform/issues/140); tela TBD no fluxo visita |
| Aprovação manual ID | `/staff/visitas/excecoes` · [#80](https://github.com/fortegb/platform/issues/80) |
| Follow-up pós-visita | ✅ Regra de consentimento validada — [#188](https://github.com/fortegb/platform/issues/188), D-061 (mesmo dia/+24h transacional, +3 dias marketing/opt-in); conteúdo/cadência real → [#141](https://github.com/fortegb/platform/issues/141) (Execução, sem tela MVP) |
| Bot WhatsApp corretor | [#142](https://github.com/fortegb/platform/issues/142) · canal externo |
| Portal cliente logado | Fora MVP v1 |
| Integrações | Back-end; sem tela de usuário (jornadas §7) |

---

## Definição → construção

1. **#32 concluído** — este doc + jornadas alinhados sob Architecture #1.  
2. **Architecture concluído (#38)** → construção Fase 1 (#48 identidade, #56 site público).  
3. Staff/admin — **estruturas** mínimas na Fase 1 Identidade; **funcionalidades** na Fase 2+ conforme epics acima.
