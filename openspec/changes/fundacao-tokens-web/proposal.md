## Why

Passo 6 (Design system) needs a single, documented token foundation — colors, typography, spacing, button styles — before any of the 11 journey-level design leaves (#197–#207) start applying it to screens. That foundation already exists implicitly in `tailwind.config.js` and `assets/css/main.css`, proven out by the Home page, but it has never been extracted into a canonical reference, and three of the four Hero variants duplicate the same markup with only a gradient changed. Formalizing this now — deriving from what's already shipped rather than waiting on a formal brand guide (#39/#40/#41) — unblocks every downstream design leaf and removes the Hero duplication before it's copied further.

## What Changes

- Document the existing token set (brand colors, typography, spacing scale, button variants) already implicit in `tailwind.config.js` / `assets/css/main.css` as the canonical foundation the design leaves (#197–#211) reference — no new colors or values invented, this captures what's already live.
- Consolidate `HeroSplit`, `HeroSlate`, `HeroAzul` (structurally identical — same grid, same buttons, only the background gradient differs) into a single `Hero` component with a `variant` prop (`split` | `slate` | `azul`). Update `pages/index.vue`, `pages/slate.vue`, `pages/azul.vue` to pass the corresponding variant.
- `HeroClassic` stays a separate component — its layout (full-bleed, centered) is genuinely different, not a gradient variant. The choice of which hero ships to production stays deferred (D-021/Q-010); this is code cleanup, not that decision.

## Capabilities

### New Capabilities
- `design-tokens`: canonical web design token foundation (brand colors, typography, spacing, button styles) derived from the existing Home implementation, serving as the shared reference for all Passo 6 design leaves.

### Modified Capabilities
(none — no existing capability governs UI/design tokens)

## Impact

- `tailwind.config.js`, `assets/css/main.css` — documented as the token source of truth, no value changes.
- `components/HeroSplit.vue`, `components/HeroSlate.vue`, `components/HeroAzul.vue` — replaced by a single `components/Hero.vue` with a `variant` prop.
- `pages/index.vue`, `pages/slate.vue`, `pages/azul.vue` — updated to use the consolidated component.
- `components/HeroClassic.vue`, `pages/classico.vue` — untouched.
- No backend, API, or data model impact.
