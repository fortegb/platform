# Foco atual

> Narrativa editável na sessão com IA; incorporada na seção **Trabalhando no momento** do relatório de progresso.

**Atualizado:** 2026-07-10

---

## Trabalhando no momento

- **Roteiro:** passo atual = **4 Arquitetura**. Ver [Roteiro do Projeto](./mapa-roteiro.html).
- **Epic [#146](https://github.com/fortegb/platform/issues/146):** #166 fechado (D-045); skills ai-skills **v0.6.0**; **próximo = [#167](https://github.com/fortegb/platform/issues/167)** (pipeline deploy branch→Vercel).
- **Ambientes:** [página Ambientes](./ambientes.html) · credenciais: [`SETUP-CREDENTIALS.md`](../SETUP-CREDENTIALS.md) · lifecycle: [`.rbo/lifecycle.yml`](../../.rbo/lifecycle.yml).

## Concluído recentemente

- **Lifecycle stage/close** ([#166](https://github.com/fortegb/platform/issues/166)) — D-045 + `.rbo/lifecycle.yml`; companion [ai-skills#5](https://github.com/rbonon/ai-skills/issues/5) / [v0.6.0](https://github.com/rbonon/ai-skills/releases/tag/v0.6.0).
- **`.env.example` / SETUP** ([#165](https://github.com/fortegb/platform/issues/165)) — D-044.
- **Secrets / acesso** ([#164](https://github.com/fortegb/platform/issues/164)) — D-043.

## Próximo passo

1. **Arquitetura** ([#146](https://github.com/fortegb/platform/issues/146)) — [#167](https://github.com/fortegb/platform/issues/167) CI/CD pipeline deploy (branch→Vercel). Nota: `rbo-stage-change` **falha** até existir `origin/staging` (criar no leaf certo / grilling #167).
2. **Depois (passo 8):** build v1 — Identidade ([#48](https://github.com/fortegb/platform/issues/48)), Site público ([#56](https://github.com/fortegb/platform/issues/56)).
3. **Brand assets** ([#2](https://github.com/fortegb/platform/issues/2)) em paralelo.

## Notas para sócios

- Tech copia `.env.example` → `.env` e preenche chaves **fora** do GitHub.
- Sócios não precisam de ficheiros de credenciais — só Preview com senha.
