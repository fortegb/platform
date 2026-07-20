# Roteiro do projeto — a espinha (ForteGB Platform)

> **O que é:** a estrutura **controladora** do trabalho — não um documento decorativo. Define **a ordem** (do contexto à entrega) e **os portões** (quando é legítimo construir).
> **Como é representada:** no **board** (campo `Etapa` + `Milestone` + tipo nativo), não em prosa nem em memória. Este doc define a semântica e os gates; o **estado** vive no board.
> **Decisões:** [D-023](./decisions.md) (roteiro + gates) · [D-024](./decisions.md) (modelo de board).

---

## Por que existe

O projeto começou pela **execução** (scaffold gerado, mocks, epics de build) e vinha preenchendo a **definição** por cima — origem do retrabalho e das premissas erradas ("começamos com o pé errado"). Faltava uma espinha explícita que **ordenasse** o trabalho e **gateasse** o build. O antigo campo `Phase` (0–4) misturava estágio de ciclo de vida com pacote de entrega. Este roteiro corrige isso.

Princípio herdado (D-011, cumprido): decisões técnicas ficam **abertas até o grilling** do passo — não se antecipa (anti-BDUF). Mas a arquitetura da **solução completa** é definida à frente (D-022); adota-se por partes.

---

## Os 9 passos, em 3 estágios

| Estágio | # | Passo | Propósito | Fecha via | Artefato canônico |
|---------|---|-------|-----------|-----------|-------------------|
| **Definição** | 1 | Contexto | Quem somos, stakeholders, o que temos e queremos | grilling | `company-structure.md`, `platform-vision.md` |
| | 2 | Funcionalidades | O que a plataforma oferece para habilitar os objetivos | grilling | `deliverables.md`, `jornadas-plataforma.md` |
| | 3 | Componentes | Peças de alto nível (site, CRM, WhatsApp, fechaduras…) | grilling | `modules.md` |
| | 4 | Arquitetura | Que componentes, front/back, serverless/persistente, infra, ambientes, integrações — dentro das restrições | grilling | `architecture.md` + `decisions.md` + templates de config (**#146**) |
| | 5 | Jornadas/telas | Fluxos e telas finais por usuário | grilling | `jornadas-plataforma.md`, `screen-map.md` (**re-validar pós-4**) |
| | 6 | Design system | Linguagem visual, comportamento e tokens | grilling | design system + `AGENTS.md` §9 (convenções UI) |
| | 7 | Versionamento | Fatiar o definido em v1/v2/v3 (atribuir epics a Milestones) | planejamento | Milestones no board |
| **Execução** | 8 | Execução | Construir até entregar (por versão) | change mgmt | código + deploy |
| **Evolução** | 9 | Manutenção | Manter e desenvolver o novo | change mgmt | — |

> **Estágio = derivado do passo** (1–7 ⇒ Definição · 8 ⇒ Execução · 9 ⇒ Evolução). Não há campo de estágio separado no board.

**É uma cascata, não um waterfall.** Um passo posterior pode reabrir um anterior (ex.: uma restrição de arquitetura reformula uma funcionalidade). Qualquer reabertura é **registrada em `decisions.md`** — nunca silenciosa.

---

## Os portões (gates)

- **G1 — sequência da Definição:** o passo N não abre até N−1 fechar (grilling resolveu suas open-questions **e** produziu o artefato). **Paralelos declarados são exceção** — ex.: Contexto (1–2) ∥ Arquitetura (#146); Brand assets ∥ Design (6).
- **G2 — portão do build:** nenhum item de **Execução (passo 8)** entra em *In Progress* antes de **toda a Definição (passos 1–7) fechada**. Passos 1–4 já concluídos; o **gate ativo é 5–6**; o passo 7 (quebra em versões) é o corte final que gera o backlog de build. Sinal visível: **Milestone `v0 — Definição` a 100%**.
- **G3 — portão de versão:** a versão N+1 não começa até a versão N passar seu **readiness gate** (UAT/perf/LGPD antes de promover a prod).

**Enforcement (honesto):** o board do GitHub **não bloqueia** transições de Status. Os gates controlam **estado visível** (campo `Etapa` + barra do Milestone `v0`) e o ponto de entrada `rbo-create-change` (checa o gate antes de ramificar); `STATUS.md` deriva o "próximo passo". Um **hard-gate por GitHub Action** fica **diferido** — só se houver evidência de pulo de gate (dev solo: o único ator é o Ricardo, e o v0 torna um pulo impossível de não ver).

---

## Modelo de board (representa o roteiro)

Ver [D-024](./decisions.md). Resumo:

- **`Etapa`** — campo single-select, **9 opções** (`1 Contexto` … `9 Evolução`). Supersede `Phase` (0–4). Todo item carrega uma.
- **`Milestone`** (nativo) — **`v0 Definição`** (agrupa todos os itens de Etapa 1–7; 100% = luz verde do G2) — **regra de higiene:** item marcado Etapa 8 **não** pertence a `v0`. Auditado em 2026-07-19: 8 itens violavam isso (#29/#30/#31/#140/#41 já eram Etapa 8; #39/#69/#71 eram colateral de marca/marketing movidos para Etapa 8 na mesma passada) e faziam o portão do build depender de arquivo de logo vetorial e de trabalho de designer. Removidos de `v0`: 24 → 16 itens abertos → **`v1`** → **`v2`** → **`v3`** (v1–v3 subdividem a Etapa 8).
- **Tipo** (nativo do GitHub) — **Feature / Bug / Task / Epic**. Substitui a dependência do prefixo `Epic:` no título. (`chore` continua só nas mensagens de commit — camada diferente; mapeia a **Task** no board.)

**Atribuição de versão = passo 7.** Um epic de Execução **sem Milestone** é a fila rastreada; o **Definition-of-Done do passo 7** é "todo epic de Execução tem um Milestone" — assim nada (ex.: SEO/analytics, LGPD hardening, mobile) é esquecido.

> **Sem sprints.** Releases são **scope-boxed** (Milestones), não iterações time-boxed — inadequadas a dev solo em rajadas. A promoção de código (local→staging→prod) é assunto de **pipeline** (#146), não de cadência.

---

## Como grilling e change management dirigem cada passo

- **Passos 1–6 fecham via grilling** (`rbo-grilling`): interrogar o plano, resolver open-questions, produzir o artefato canônico + decisões (D-0XX).
- **Todo passo corre sob change management** (`rbo-*` + OpenSpec): issue → branch `feat/<change-name>` → explore → propose → apply → validação → archive → merge → close. OpenSpec é **1:1 com sub-issues folha**, não com epics.
- **`STATUS.md`** aponta o passo atual; a fonte de verdade é o board (`Etapa` + `Depends on:`).

---

## Estado atual e o que falta implementar

- **Passo 4 (Arquitetura) fechado** — Epic **#146** (infra/ambientes, 26 folhas) e Epic **#179** (arquitetura de domínio: visitas, mensageria, RBAC, admin, 5 folhas) ambos **fechados**. **Passo atual: 5 (Jornadas)**. #29/#30/#31/#140 (grilling `deferred` v2/v3 — visitas condomínio, media kit, mobile) re-tagged `Etapa = 8 Execução` (já estavam re-parented sob #81/#98/#130); reabrem "no grilling da fase" (D-018), não são passo 4. Passos 1–2 rodaram **em paralelo** (validação de contexto/funcionalidades).
- **Este roteiro é definição; não migra o board.** A criação efetiva de `Etapa`/Milestones/tipos e o retag dos itens são changes separados:
  - **Migração A** (próxima): renomear `Phase → Etapa` (9 opções) + retag · criar `v0 Definição` · backfill de tipos nativos · criar os 2 epics novos (contexto+funcionalidades, jornadas re-validação) · **+ overhaul do relatório** (`mapa-roteiro.html` horizontal por passo + `progresso-socios.html`).
  - **Migração B** (perto do passo 7): Milestones `v1/v2/v3` + atribuir epics de Execução.
