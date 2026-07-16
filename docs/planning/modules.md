# Módulos da plataforma

> Mapa funcional para epics no board (campos **Fase** e **Module**) e para grilling.

---

## 1. Infraestrutura e workflow (`platform`)

| Item | Descrição | Estado |
|------|-----------|--------|
| Organização GitHub | Opção A: org `fortegb`, personal `fortegb-admin` | **Concluído** |
| Board GitHub Project | Título `platform`, campos Fase + Module | Existe |
| OpenSpec no repo | CLI + `openspec/changes/` | Inicializado |
| Documentação da plataforma (GitHub Pages) | `docs/` — índice, módulos, progresso, jornadas | **Publicado** |
| Dotfiles | `auth`/`commit_as` — namespace `fortegb`, dev `rbonon` | Concluído (dotfiles 0.8.1) |
| Deploy / Vercel | Reconectar após transferência | Planejado |
| **Integrações MVP** | HubSpot, Tuya, WhatsApp, Calendar — epic [#72](https://github.com/fortegb/platform/issues/72), Fase 2 | Planejado |

**Epics:** *Migração org GitHub* + *Bootstrap board & workflow* + *Integrações MVP* (Fase 2, module `platform`)

> **Integrações** não são módulo board separado — transversal; Visitas (#81) e CRM (#86) consomem o hub.

---

## 2. Site institucional (`site`)

| Item | Descrição | Estado |
|------|-----------|--------|
| Home | Variantes de hero: `/` (default), `/hero`, `/slate`, `/gradient` — miolo compartilhado; escolha do hero no lançamento (Q-010 diferido) | UI |
| Portfólio | Lista + detalhe | UI + simulado |
| Sobre, Blog, Contato | Páginas + formulário | UI; API contato stub |
| Legal / LGPD | Privacidade, termos, cookies | Páginas existem |
| CTAs WhatsApp | Botão flutuante + links | Implementado (UI) |

**Epic (futuro):** *Site público* → Fase 1 **Finalização UI site público** (inclui 2 homes)

---

## 3. Autenticação e perfis (`auth`)

| Item | Descrição | Estado |
|------|-----------|--------|
| Login identifier-first | `/login` | UI/simulado |
| check-email, signup, reset | Back-end | Não |
| Provedores sociais | Google, Facebook | Só UI |
| Papéis | admin, proprietário, cliente, corretor | Não |
| Middleware por perfil | Generalizar `realtor-auth` | Parcial |

**Epic (futuro):** Fase 1 **Identidade, papéis e routing de jornada** + portais Fase 2/3  
**Spec:** [`docs/autenticacao-login.md`](../autenticacao-login.md)

---

## 4. Visitas autoguiadas (`tours`)

| Item | Descrição | Estado |
|------|-----------|--------|
| Agendamento | `/visita/agendar/[houseId]` | UI + API parcial |
| Visita instantânea QR | `/visita/qr/[code]` | UI + API parcial |
| Verificação de identidade | Selfie + documento | Componente; match real pendente |
| Senha temporária + Tuya | Fechadura inteligente | Gerador simulado; Tuya stub |
| WhatsApp + Calendar + HubSpot | Confirmações e cliente | Stubs |

**Epic (futuro):** *Visitas autoguiadas (MVP)*

---

## 5. CRM e corretores (`crm`)

| Item | Descrição | Estado |
|------|-----------|--------|
| Portal corretor | Painel, clientes, casas | UI + API parcial |
| Proteção de comissão | Primeiro registro ganha | Lógica BD; HubSpot pendente |
| Sync HubSpot | Contatos, deals, pipeline | Stub |
| Clientes diretos ForteGB | Formulário, WhatsApp | Parcial |

**Epic (futuro):** *Portal corretores e HubSpot*

---

## 6. Media kit e marketing físico (`media-kit`)

> **Escopo reconhecido em 2026-07-01** — ainda não modelado no código.

| Item | Descrição | Canais |
|------|-----------|--------|
| Entrada portfólio | Descrição, galeria, specs | Web |
| Placa “À venda” | Design + QR → micro-página / visita | Físico (rua) |
| Posters internos | Imprimíveis por cômodo / tema | Dentro do imóvel |
| Narrativa de obra | Timeline, fotos de progresso | Web + poster + social |
| Kit para corretor | Fotos + copy exportável | Download / HubSpot |
| Pipeline print/PDF | Manual (Figma) vs gerado pela plataforma | A definir na grilling |

**Epic (futuro):** *Media kit por casa e materiais físicos*

Conteúdo relacionado no repo: [`content/social-media/`](../../content/social-media/) (ideias/templates — sem automação).

---

## 7. Branding e design system (`branding`)

| Item | Descrição | Estado |
|------|-----------|--------|
| Tokens web | Cores, botões — ver `AGENTS.md` | Em uso |
| Assets oficiais | Logo, guia — upload pendente | Não no repo |
| Templates impressos | Placa, posters, social | Não |
| Design system unificado | Web + impresso | A fazer |

**Epic (futuro):** *Marca e design system*

---

## 8. Conteúdo e social (`social`)

| Item | Descrição | Estado |
|------|-----------|--------|
| 100 ideias de posts | `content/social-media/ideas.md` | Arquivo estático |
| Templates IG/FB/TikTok | `templates.md` | Arquivo estático |
| Calendário editorial | `calendar.md` | Arquivo estático |
| Publicação / automação | — | Não |

**Epic (futuro):** *Motor de conteúdo social*

---

## 9. Admin e proprietários (`admin`)

Áreas logadas além do corretor — **escopo não definido**.

**Epic (futuro):** *Portais admin / proprietário / cliente* — após grilling de papéis.

---

## 10. Mobile (`mobile`)

PWA vs app nativo — **decisão aberta**. Posters com QR podem justificar experiência mobile rica.

**Epic (futuro):** *Estratégia mobile* — após MVP web definido.

---

## Diagrama de dependências (alto nível)

```
platform (org, board, OpenSpec)
    ↓
planning (grilling, docs) ──→ branding (paralelo possível)
    ↓
site + auth + dados reais (Supabase/Contentful)
    ↓
crm + tours
    ↓
media-kit + social + admin + mobile
```
