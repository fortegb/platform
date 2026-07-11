# CMS vendor (D-034 / #155)

> **Vendor escolhido: Sanity.** Contentful não faz parte do stack instalado.

## Porquê Sanity

- Free-first (D-015): free tier mais durável; cliff de preço do Contentful evitado.
- 2 datasets no free → encaixa staging + prod (#156).
- Schema-as-code (Studio) alinhado a migrações no repo.
- Escala ForteGB (poucas casas/ano + blog).

## Limites deste leaf

| Feito | Depois |
|-------|--------|
| Decisão + limpeza Contentful | Provisionar projeto Sanity |
| `useCms` (mocks) | Wire live API |
| | Datasets por ambiente — **D-035 / #156** (mapa fechado) |
| | Modelo casa/blog/timeline/media — **D-036 / #157** (inventário fechado) |

## Datasets (D-035)

| App | Dataset |
|-----|---------|
| local / staging / Previews | `staging` |
| prod | `production` |

Promoção de conteúdo = passo explícito (não deploy Vercel). Detalhe: [`environments.md`](./environments.md).

## Modelo de conteúdo (D-036)

Inventário de types/campos e split house: [`cms-content-model.md`](./cms-content-model.md). Schemas Studio → #45.

## App boundary

- Composable: `composables/useCms.ts` (não `useContentful`).
- Env vars Sanity → [`env-vars.md`](./env-vars.md) (D-041) / setup quando provisionar.
