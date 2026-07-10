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
| | Datasets por ambiente (#156) |
| | Modelo casa/blog/timeline/media (#157) |

## App boundary

- Composable: `composables/useCms.ts` (não `useContentful`).
- Env vars Sanity → inventário (#162+) / setup quando provisionar.
