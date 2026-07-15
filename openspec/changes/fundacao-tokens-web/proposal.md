## Why

Passo 6 (Design system) needs a single, documented token foundation — colors, typography, spacing, button styles — before any of the 11 journey-level design leaves (#197–#207) start applying it to screens. This is a retrofit tokenization pass (per `rbo-ui-tokenize` scenario A) over the Home page and its shared dependencies: most values are already tokenized via `tailwind.config.js` / DaisyUI, but a Phase 0 health check found gaps (an untokenized brand color, dead/duplicate button CSS) worth fixing before this becomes the reference every later leaf inherits from.

## What Changes

- **Token inventory & health check**: document the existing token set (brand colors, typography, spacing, button styles) already implicit in `tailwind.config.js` / `assets/css/main.css`, derived from the Home page and its dependencies (see Impact for full file list).
- **New token**: WhatsApp action color (`#3E8E5E` / hover `#34784F`) is hardcoded identically in 5 places despite already being a documented brand convention (`AGENTS.md` §9) — wire it into `tailwind.config.js` as a named color so all 5 call sites reference one source. **BREAKING** in the narrow sense that call sites change from arbitrary-value classes (`bg-[#3E8E5E]`) to a named utility (`bg-whatsapp`); no visual change.
- **Remove dead/redundant CSS**: `.btn-secondary` (custom class in `main.css`) has zero usages anywhere in the repo — remove. `.btn-primary` (custom class in `main.css`) duplicates DaisyUI's auto-generated `.btn-primary` under the same name (used on ~15 other pages) — remove the custom override and rely on DaisyUI's native generation; values already match so this is a zero-visual-change cleanup.
- **Hero consolidation**: `HeroSplit`, `HeroSlate`, `HeroAzul` (structurally identical — same grid, same buttons, only the background gradient differs) become a single `Hero` component with a `variant` prop (`split` | `slate` | `azul`). `HeroClassic` stays separate — its layout (full-bleed, centered) is genuinely different. The choice of which hero ships to production stays deferred (D-021/Q-010); this is code cleanup, not that decision.

**Out of scope, spun off separately:** a footer hover bug (`AppFooter.vue`'s `hover:text-primary` is invisible against its own `bg-primary-500` background, since the DaisyUI `primary` alias and the `primary-500` Tailwind value are identical) was found during the audit but is a visual bug fix, not tokenization — filed as [#212](https://github.com/fortegb/platform/issues/212) per the gap playbook in `design-system-fluxo.md`, does not block this leaf.

## Capabilities

### New Capabilities
- `design-tokens`: canonical web design token foundation (brand colors, typography, spacing, button styles) derived from the existing Home implementation, serving as the shared reference for all Passo 6 design leaves.

### Modified Capabilities
(none — no existing capability governs UI/design tokens)

## Impact

Full dependency scope of the Home page (`pages/index.vue` → `layouts/default.vue` → `AppHeader`, `AppFooter`, `WhatsAppButton`, `CookieConsent`; `pages/index.vue` → `HeroSplit`/`HomeContent` → `HouseCard`):

| File | Mode | Change |
|---|---|---|
| `tailwind.config.js` | Token source | Add `whatsapp` / `whatsapp-hover` colors |
| `assets/css/main.css` | Token source | Remove dead `.btn-secondary`, remove redundant `.btn-primary` |
| `components/HeroSplit.vue`, `HeroSlate.vue`, `HeroAzul.vue` | Retrofit + consolidate | Merged into `components/Hero.vue` (`variant` prop), WhatsApp hex → `bg-whatsapp` |
| `components/HomeContent.vue` | Retrofit | WhatsApp hex → `bg-whatsapp` |
| `components/WhatsAppButton.vue` | Retrofit | WhatsApp hex → `bg-whatsapp` |
| `pages/index.vue` | Native-apply | Use consolidated `Hero` with `variant="split"` |
| `pages/slate.vue`, `pages/azul.vue` | Native-apply | Use consolidated `Hero` with `variant="slate"` / `"azul"` |
| `layouts/default.vue`, `AppHeader.vue`, `AppFooter.vue`, `HouseCard.vue`, `CookieConsent.vue` | Already tokenized | No changes — catalogued in token inventory only |
| `components/HeroClassic.vue`, `pages/classico.vue` | Untouched | Not in scope — structurally different layout |

No backend, API, or data model impact.
