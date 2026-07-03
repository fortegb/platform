# Workflow — Planejamento, board e OpenSpec

> Registro das convenções acordadas para o fluxo formal de mudanças.

---

## Três camadas

```
docs/planning/     →  porquê, escopo, perguntas, decisões
GitHub board       →  epics + sub-issues (execução)
STATUS.md          →  bússola de sessão (o que fazer agora)
ROADMAP.md         →  espelho gerado do board
OpenSpec           →  spec + tasks por sub-issue implementável
CHANGELOG.md       →  o que entrou (no close-out da change)
```

---

## Papel de cada artefato

| Artefato | Papel | Fonte da verdade |
|----------|-------|------------------|
| **GitHub Project + issues** | *O quê* fazer — backlog, prioridade, status | Board |
| **`ROADMAP.md`** | Snapshot grepável do board | Board (gerado) |
| **`progresso-socios.html`** | Relatório sócios (feito / planeado / foco) | Board + `progress-focus.md` (gerado) |
| **OpenSpec changes** | *Como* implementar uma unidade de trabalho | Por change |
| **`docs/planning/`** | Visão, módulos, perguntas, decisões | Humano + sessões de design |
| **`STATUS.md`** | Onde estamos + epics ativos + **próximo passo** | Atualizado ao mudar foco |
| **`CHANGELOG.md`** | O que foi entregue (narrativa por data) | Close-out de changes |

**`STATUS.md` não está obsoleto** — complementa o board com contexto narrativo e o passo imediato da sessão.

**`CHANGELOG.md`** não precisa duplicar cada issue; entradas no **archive/merge** da change.

---

## Hierarquia no GitHub

| Nível | Entidade | OpenSpec? | Branch? |
|-------|----------|-----------|---------|
| Fase | Campo **Phase** no board | Não | Não |
| Módulo | Campo **Module** no board | Não | Não |
| **Epic** | Issue pai + sub-issues | **Não** | **Não** |
| **Sub-issue (folha)** | Issue filha implementável | **Sim (1:1)** | `feat/<change-name>` |

- **Sub-issues** = suporte nativo GitHub (GA 2025).
- **Issue Types** (Epic, Feature, Task) = requer **Organization** — ver [github-org-migration.md](./github-org-migration.md).
- Até a org existir: prefixo `Epic:` no título + sub-issues.

---

## Ciclo de vida (resumo)

```
ideia → rbo-create-issue (epic ou sub-issue)
     → grilling → decisions.md / open-questions.md
     → sub-issues no epic
     → rbo-create-change (folha) → propose → apply → validação
     → rbo-close-change → Closes #N → ROADMAP.md → CHANGELOG.md
     → atualizar STATUS.md se o foco mudou
```

---

## Regras práticas

1. **Não criar dezenas de issues** antes da grilling definir MVP.
2. **Epic** fecha quando todas as sub-issues filhas estão Done.
3. **Grilling** resolve `open-questions.md` → move para `decisions.md`.
4. **Docs-only** (ex.: registrar decisão) pode ser sub-issue Chore sem OpenSpec pesado.
5. **Implementação de código** → sempre OpenSpec na folha.

---

## Bússola de sessão (`STATUS.md`)

Formato acordado:

- Fase atual
- Tabela de **epics ativos** (status, próximo passo, bloqueio)
- Checkbox **“esta sessão”** (uma ação concreta)
- Recently done / Not now

Após **`rbo-catch-up`**, ler `STATUS.md` em seguida.

---

## Session open / close

| When | Action |
|------|--------|
| **Open** | `rbo-catch-up` → `STATUS.md` |
| **Close (usual)** | Update `STATUS.md`; if grilling → `open-questions.md` + `decisions.md` |
| **Close (handoff)** | `rbo-handoff` — syncs control docs via **discovery** (`docs/planning/decisions.md`, `AGENTS.md`, …) then writes temp handoff |

Skill **`rbo-handoff`** v0.2 does not assume root `DECISIONS.md` or `CLAUDE.md`; it reads `AGENTS.md` § project control when present.
