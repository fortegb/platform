# Foco atual

> Narrativa editável na sessão com IA; incorporada na seção **Trabalhando no momento** do relatório de progresso.

**Atualizado:** 2026-07-10

---

## Trabalhando no momento

- **Roteiro:** passo atual = **4 Arquitetura**. Ver [Roteiro do Projeto](./mapa-roteiro.html).
- **Epic [#146](https://github.com/fortegb/platform/issues/146):** A1–A4 + B1–B2 (Supabase + migrações) feitos; próximo = runbook local ([#153](https://github.com/fortegb/platform/issues/153)).
- **Ambientes:** [página Ambientes](./ambientes.html) — tiers, Vercel, domínios, Supabase e **migrações**.

## Concluído recentemente

- **B2 Migrações** ([#152](https://github.com/fortegb/platform/issues/152)) — D-031 (Supabase CLI).
- **B1 Supabase** ([#151](https://github.com/fortegb/platform/issues/151)) — D-030.
- **A4 Domínios** ([#150](https://github.com/fortegb/platform/issues/150)) — D-029.

## Próximo passo

1. **Arquitetura** ([#146](https://github.com/fortegb/platform/issues/146)) — runbook Supabase local ([#153](https://github.com/fortegb/platform/issues/153)).
2. **Depois (passo 8):** build v1 — Identidade ([#48](https://github.com/fortegb/platform/issues/48)), Site público ([#56](https://github.com/fortegb/platform/issues/56)).
3. **Brand assets** ([#2](https://github.com/fortegb/platform/issues/2)) em paralelo.

## Notas para sócios

- Spec de ambientes/dados pronta (ainda não provisionada): [`ambientes.html`](./ambientes.html).
- A estrutura da base de dados versiona-se no código (migrações); o site na Vercel não altera a base sozinho.
- Dois projetos Supabase na nuvem + base local no Docker do desenvolvedor.
