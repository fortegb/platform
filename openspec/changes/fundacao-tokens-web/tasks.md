## 1. Token documentation

- [ ] 1.1 Write `docs/planning/design-tokens.md` documenting the token foundation already implicit in `tailwind.config.js` and `assets/css/main.css`: brand colors (`primary` 50–900, `hero-slate`), typography (`Montserrat`, base font-size scale), spacing conventions, and button styles (`.btn-primary`, `.btn-secondary`, WhatsApp green `#3E8E5E`/`#34784F`) — reference the existing conventions already recorded in `AGENTS.md` §9 rather than restating them.
- [ ] 1.2 Add a pointer to `docs/planning/design-tokens.md` in the "Links" table of `STATUS.md` and cross-link it from `design-system-fluxo.md` as the reference the design leaves (#197–#207) consult.

## 2. Hero consolidation

- [ ] 2.1 Create `components/Hero.vue` accepting a `variant` prop (`split` | `slate` | `azul`) that maps to the corresponding gradient class (`to-primary-700`, `to-hero-slate`, `to-primary-400`), reusing the shared template (grid, copy, WhatsApp CTA, portfolio CTA) from the three existing components.
- [ ] 2.2 Update `pages/index.vue` to render `<Hero variant="split" />` instead of `<HeroSplit />`.
- [ ] 2.3 Update `pages/slate.vue` to render `<Hero variant="slate" />` instead of `<HeroSlate />`.
- [ ] 2.4 Update `pages/azul.vue` to render `<Hero variant="azul" />` instead of `<HeroAzul />`.
- [ ] 2.5 Delete `components/HeroSplit.vue`, `components/HeroSlate.vue`, `components/HeroAzul.vue`. Leave `components/HeroClassic.vue` and `pages/classico.vue` untouched.

## 3. Verification

- [ ] 3.1 Run the dev server and visually compare `/`, `/slate`, `/azul` before/after — confirm each renders the same gradient, copy, and CTAs as before consolidation.
- [ ] 3.2 Confirm `/classico` (HeroClassic) is unaffected.
- [ ] 3.3 Grep the repo for any remaining references to `HeroSplit`, `HeroSlate`, or `HeroAzul` to confirm no dangling imports.
