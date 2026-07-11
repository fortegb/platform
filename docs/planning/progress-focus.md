# Foco atual

> Narrativa editável na sessão com IA; incorporada na seção **Trabalhando no momento** do relatório de progresso.

**Atualizado:** 2026-07-10

---

## Trabalhando no momento

- **Roteiro:** passo atual = **4 Arquitetura**. Ver [Roteiro do Projeto](./mapa-roteiro.html).
- **Epic [#146](https://github.com/fortegb/platform/issues/146):** nomes + scoping de env feitos (D-041/D-042); próximo = política de secrets ([#164](https://github.com/fortegb/platform/issues/164)).
- **Ambientes:** [página Ambientes](./ambientes.html) — inclui onde vivem os valores de config.

## Concluído recentemente

- **Scoping env** ([#163](https://github.com/fortegb/platform/issues/163)) — D-042.
- **Inventário env vars** ([#162](https://github.com/fortegb/platform/issues/162)) — D-041.
- **Callbacks/webhooks** ([#161](https://github.com/fortegb/platform/issues/161)) — D-040.

## Próximo passo

1. **Arquitetura** ([#146](https://github.com/fortegb/platform/issues/146)) — secrets / acesso ([#164](https://github.com/fortegb/platform/issues/164)).
2. **Depois (passo 8):** build v1 — Identidade ([#48](https://github.com/fortegb/platform/issues/48)), Site público ([#56](https://github.com/fortegb/platform/issues/56)).
3. **Brand assets** ([#2](https://github.com/fortegb/platform/issues/2)) em paralelo.

## Notas para sócios

- Produção e teste usam o **mesmo nome** de variável, com **valores diferentes** (Vercel Production vs Preview).
- No computador: ficheiro `.env` local — nunca credenciais de produção por default.
- Spec: [`ambientes.html`](./ambientes.html) · scoping: [`templates/env-scoping.md`](./templates/env-scoping.md).
