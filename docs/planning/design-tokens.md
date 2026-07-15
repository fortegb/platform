# Design tokens — fundação web (#197)

> Referência de tokens para as leaves de design do Passo 6 (#197–#207). Derivado da implementação existente de Home + dependências ([`design-descoberta-site`](../../openspec/changes/archive/) — ver arquivo do change para o audit completo), não redesenhado. Convenções de botão/cor já registradas em `AGENTS.md` §9 — este arquivo é o inventário técnico, não a duplica.

## Cores

| Token | Valor | Definido em | Utility | Papel |
|---|---|---|---|---|
| `primary-50`…`primary-900` | `#e6f0f5` … `#060901` | `tailwind.config.js` | `bg-primary-*`, `text-primary-*`, `border-primary-*` | Escala navy da marca |
| `hero-slate` | `#4a5a72` | `tailwind.config.js` | `to-hero-slate` | Fim do gradiente do Hero (variante slate) |
| `whatsapp` | `#3E8E5E` | `tailwind.config.js` | `bg-whatsapp` | Fundo do CTA WhatsApp |
| `whatsapp-hover` | `#34784F` | `tailwind.config.js` | `hover:bg-whatsapp-hover` | Hover do CTA WhatsApp |
| DaisyUI `primary` | `#203045` (= `primary-500`) | `tailwind.config.js` (`daisyui.themes.fortegb`) | `.btn-primary`, `text-primary` (gerado) | Alias semântico primário |
| DaisyUI `secondary` | `#1a74a1` (= `primary-400`) | idem | `bg-secondary` | Ação secundária |
| DaisyUI `accent`, `neutral`, `base-100/200/300`, `base-content`, `info`/`success`/`warning`/`error` | conforme tema | idem | diversos | Superfícies, badges de status |

## Tipografia

| Token | Valor | Definido em |
|---|---|---|
| Fonte | Montserrat | `tailwind.config.js` (`fontFamily.sans`) + `main.css` (`@import`) |
| Escala global | `font-size: 81.25%` no `html` | `main.css` — reduz fontes/espaçamentos/componentes proporcionalmente (rem) |

## Botões

Ver `AGENTS.md` §9 para a convenção de cores por tipo de ação (WhatsApp verde / azul secundário / outline navy). Nota técnica: `.btn-primary`/`.btn-secondary` como classes custom em `main.css` foram removidas (redundantes com a geração nativa do DaisyUI a partir do tema `fortegb`/`.btn.btn-primary`, e `.btn-secondary` não tinha nenhum uso no repo). Usar as classes DaisyUI nativas (`.btn`, `.btn-primary`, `.btn-outline`) ou os utilitários Tailwind diretos conforme já usado em `AppHeader`/`HomeContent`/`HouseCard`.

## Componentes já tokenizados (sem alterações necessárias)

| Componente | Tokens usados |
|---|---|
| `layouts/default.vue` | Composição apenas — sem cor própria |
| `AppHeader.vue` | `primary-500`, `primary-100`, branco |
| `AppFooter.vue` | `primary-500`, branco, `border-white/20` — bug de hover tratado separadamente em [#212](https://github.com/fortegb/platform/issues/212) |
| `HouseCard.vue` | `primary-500`, `secondary`, `base-100`, `base-content`, badges DaisyUI (`badge-success/error/warning/info`) |
| `CookieConsent.vue` | `.btn.btn-primary`, `.btn-outline` (DaisyUI nativo), `base-100`, `base-300` |

## Dark mode

Não existe — sem requisito de dark mode no projeto hoje. A camada CSS-var + `.dark{}` que ferramentas de tokenização assumem por padrão não se aplica aqui; os tokens vivem diretamente em `tailwind.config.js`.
