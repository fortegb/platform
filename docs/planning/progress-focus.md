# Foco atual

> Narrativa editável na sessão com IA; incorporada na seção **Trabalhando no momento** do relatório de progresso.

**Atualizado:** 2026-07-12

---

## Trabalhando no momento

- **Roteiro:** passo 4 (Arquitetura) — **epics principais fechados** (#146, #179); restam só itens `deferred` v2/v3 (#29–31/#140) sob `Etapa 4`. **Próximo: passo 5 Jornadas.** Ver [Roteiro do Projeto](./mapa-roteiro.html).
- **Epic [#146](https://github.com/fortegb/platform/issues/146) — fechado.** Todos os 26 sub-issues concluídos (infra/ambientes).
- **Epic [#179](https://github.com/fortegb/platform/issues/179) — fechado.** Todas as 5 leaves concluídas (arquitetura de domínio: visitas, Tuya, mensageria, RBAC, admin).
- **Ambientes:** [página Ambientes](./ambientes.html) · credenciais: [`SETUP-CREDENTIALS.md`](../SETUP-CREDENTIALS.md) · lifecycle: [`.rbo/lifecycle.yml`](../../.rbo/lifecycle.yml).

## Concluído recentemente

- **Epic #179 completo** — [#181](https://github.com/fortegb/platform/issues/181) Tuya (D-052), [#180](https://github.com/fortegb/platform/issues/180) visitas/identidade (D-053), [#182](https://github.com/fortegb/platform/issues/182) mensageria (D-054), [#183](https://github.com/fortegb/platform/issues/183) RBAC (D-055), [#184](https://github.com/fortegb/platform/issues/184) admin (D-056).
- **Epic #146 completo** — CI/CD (#166–#169), Dev local (#170–#172), board hygiene, remoção de GitHub Action redundante (#178).
- **CI/CD lifecycle** ([#166](https://github.com/fortegb/platform/issues/166)–[#169](https://github.com/fortegb/platform/issues/169)) — D-045..D-048; companion [ai-skills v0.7.0](https://github.com/rbonon/ai-skills/releases/tag/v0.7.0) (hotfix exception, migration trigger).
- **Dev local** ([#170](https://github.com/fortegb/platform/issues/170)–[#172](https://github.com/fortegb/platform/issues/172)) — D-049..D-051 (toolchain, bootstrap runbook, mock strategy).

## Próximo passo

1. **Passo 5 — Jornadas, telas e fluxos** ([#176](https://github.com/fortegb/platform/issues/176)) — re-validar jornadas/telas sobre a arquitetura de domínio já decidida (#179).
2. **Brand assets** ([#2](https://github.com/fortegb/platform/issues/2)) em paralelo.
3. Itens `deferred` v2/v3 ([#29](https://github.com/fortegb/platform/issues/29)–[#31](https://github.com/fortegb/platform/issues/31)/[#140](https://github.com/fortegb/platform/issues/140)) reabrem no grilling da fase.

## Notas para sócios

- Tech copia `.env.example` → `.env` e preenche chaves **fora** do GitHub.
- Sócios não precisam de ficheiros de credenciais — só Preview com senha.
