## Why

This is leaf [#197](https://github.com/fortegb/platform/issues/197) — Design e tokenização: Descoberta do site — the first of the 11 journey-level design leaves in Passo 6 (Design system), corresponding to journey #185/D-057. It's also where the site's token foundation gets established: Home and the shared layout components (header, footer, WhatsApp button) that every later leaf's screens render inside. This is a retrofit tokenization pass (per `rbo-ui-tokenize` scenario A): most values are already tokenized via `tailwind.config.js` / DaisyUI, but a Phase 0 health check found gaps (an untokenized brand color, dead/duplicate button CSS) worth fixing now, since this becomes the reference every later leaf inherits from.

(This work was originally scoped as a separate issue, #68, but folding it into #197 removes redundant issue/branch overhead — #197 already touches every file in scope here as part of reviewing Home, and running first in the leaf sequence gives #198–#207 the same token foundation regardless of which issue owns the work. #68 was closed as not planned in favor of this.)

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

**#197 scope — complete.** All routes reviewed and tokenized: `/`, `/slate`, `/gradient`, `/hero` (Hero variants), `/portfolio`, `/portfolio/[slug]` (tasks.md §6–8), `/sobre` (§11), `/contato` (§12), `/privacidade`, `/termos` (§13), `/blog`, `/blog/[slug]` (§14). Home's brand-value rewrite (§9) and the footer fix (§10) landed here too.

The leaf grew well beyond its original token-foundation scope: what began as a WhatsApp-color retrofit plus Hero consolidation turned into a full design and content pass across every discovery route, driven by user visual review. Tokenization was audited in two passes (Pass 1 Home, Pass 2 the remaining routes) — both clean, zero color/token gaps; full record in `openspec/specs/design-tokens/tokenization-report.md`.

Route rename during this change: `/azul` → `/gradient`, `/classico` → `/hero` (named by style, not number, to avoid colliding with v1/v2/v3 release naming). The Impact table above records the file names as they were at proposal time.
