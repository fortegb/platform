# Foco atual

> Narrativa editável na sessão com IA; incorporada na seção **Trabalhando no momento** do relatório de progresso.

**Atualizado:** 2026-07-11

---

## Trabalhando no momento

- **Roteiro:** passo atual = **4 Arquitetura**. Ver [Roteiro do Projeto](./mapa-roteiro.html).
- **Epic [#146](https://github.com/fortegb/platform/issues/146) — fechado.** Todos os 26 sub-issues concluídos (infra/ambientes).
- **Novo Epic [#179](https://github.com/fortegb/platform/issues/179):** arquitetura de domínio (visitas, mensageria, RBAC, admin) — lacunas encontradas em revisão pós-#146. **Próximo = [#181](https://github.com/fortegb/platform/issues/181)** (Tuya — viabilidade + modo de falha, maior risco).
- **Ambientes:** [página Ambientes](./ambientes.html) · credenciais: [`SETUP-CREDENTIALS.md`](../SETUP-CREDENTIALS.md) · lifecycle: [`.rbo/lifecycle.yml`](../../.rbo/lifecycle.yml).

## Concluído recentemente

- **Epic #146 completo** — CI/CD (#166–#169), Dev local (#170–#172), board hygiene, remoção de GitHub Action redundante (#178).
- **CI/CD lifecycle** ([#166](https://github.com/fortegb/platform/issues/166)–[#169](https://github.com/fortegb/platform/issues/169)) — D-045..D-048; companion [ai-skills v0.7.0](https://github.com/rbonon/ai-skills/releases/tag/v0.7.0) (hotfix exception, migration trigger).
- **Dev local** ([#170](https://github.com/fortegb/platform/issues/170)–[#172](https://github.com/fortegb/platform/issues/172)) — D-049..D-051 (toolchain, bootstrap runbook, mock strategy).

## Próximo passo

1. **Arquitetura de domínio** ([#179](https://github.com/fortegb/platform/issues/179)) — [#181](https://github.com/fortegb/platform/issues/181) Tuya (viabilidade da API + modo de falha, grillar primeiro). Depois: [#180](https://github.com/fortegb/platform/issues/180) visitas, [#182](https://github.com/fortegb/platform/issues/182) mensageria, [#183](https://github.com/fortegb/platform/issues/183) RBAC, [#184](https://github.com/fortegb/platform/issues/184) admin.
2. Todos alimentam **Passo 5** (Jornadas, [#176](https://github.com/fortegb/platform/issues/176)) antes de detalhar fluxos.
3. **Brand assets** ([#2](https://github.com/fortegb/platform/issues/2)) em paralelo.

## Notas para sócios

- Tech copia `.env.example` → `.env` e preenche chaves **fora** do GitHub.
- Sócios não precisam de ficheiros de credenciais — só Preview com senha.
