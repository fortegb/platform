# Foco atual

> Narrativa editável na sessão com IA; incorporada na seção **Trabalhando no momento** do relatório de progresso.

**Atualizado:** 2026-07-10

---

## Trabalhando no momento

- **Roteiro:** passo atual = **4 Arquitetura**. Ver [Roteiro do Projeto](./mapa-roteiro.html).
- **Epic [#146](https://github.com/fortegb/platform/issues/146):** política de secrets feita (D-043); próximo = `.env.example` / SETUP-CREDENTIALS ([#165](https://github.com/fortegb/platform/issues/165)).
- **Ambientes:** [página Ambientes](./ambientes.html) — nomes, onde vivem valores, quem acessa chaves.

## Concluído recentemente

- **Secrets / acesso** ([#164](https://github.com/fortegb/platform/issues/164)) — D-043.
- **Scoping env** ([#163](https://github.com/fortegb/platform/issues/163)) — D-042.
- **Inventário env vars** ([#162](https://github.com/fortegb/platform/issues/162)) — D-041.

## Próximo passo

1. **Arquitetura** ([#146](https://github.com/fortegb/platform/issues/146)) — `.env.example` + SETUP-CREDENTIALS ([#165](https://github.com/fortegb/platform/issues/165)).
2. **Depois (passo 8):** build v1 — Identidade ([#48](https://github.com/fortegb/platform/issues/48)), Site público ([#56](https://github.com/fortegb/platform/issues/56)).
3. **Brand assets** ([#2](https://github.com/fortegb/platform/issues/2)) em paralelo.

## Notas para sócios

- Só a pessoa de **tech** mexe em chaves e variáveis secretas da Vercel.
- Sócios validam o site de teste com **senha** do Preview — sem precisar de API keys.
- Spec: [`ambientes.html`](./ambientes.html) · acesso: [`templates/secrets-access.md`](./templates/secrets-access.md).
