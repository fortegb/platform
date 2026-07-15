## 1. Token layer

- [ ] 1.1 `tailwind.config.js` — add `whatsapp` (`#3E8E5E`) and `whatsapp-hover` (`#34784F`) to `theme.extend.colors`.
- [ ] 1.2 `assets/css/main.css` — remove the dead `.btn-secondary` class (zero usages repo-wide).
- [ ] 1.3 `assets/css/main.css` — remove the redundant custom `.btn-primary` class (duplicates DaisyUI's auto-generated `.btn-primary`; verify `.btn.btn-primary` renders identically on `sobre.vue`/`contato.vue`/`login.vue` after removal).
- [ ] 1.4 Write `docs/planning/design-tokens.md` — the token inventory from `design.md`, as the reference the design leaves (#197–#207) consult. Cross-link from `STATUS.md` "Links" table and `design-system-fluxo.md`.

## 2. Retrofit — WhatsApp token adoption

- [ ] 2.1 `components/WhatsAppButton.vue` — replace `bg-[#3E8E5E]` / `hover:bg-[#34784F]` with `bg-whatsapp` / `hover:bg-whatsapp-hover`. Verify computed background color unchanged.
- [ ] 2.2 `components/HomeContent.vue` — same replacement on the CTA-contato WhatsApp link. Verify unchanged.

## 3. Hero consolidation

- [ ] 3.1 Create `components/Hero.vue` accepting a `variant` prop (`split` | `slate` | `azul`) mapping to the corresponding gradient class (`to-primary-700`, `to-hero-slate`, `to-primary-400`), reusing the shared template (grid, copy, WhatsApp CTA using `bg-whatsapp`, portfolio CTA) from the three existing components.
- [ ] 3.2 `pages/index.vue` — render `<Hero variant="split" />` instead of `<HeroSplit />`.
- [ ] 3.3 `pages/slate.vue` — render `<Hero variant="slate" />` instead of `<HeroSlate />`.
- [ ] 3.4 `pages/azul.vue` — render `<Hero variant="azul" />` instead of `<HeroAzul />`.
- [ ] 3.5 Delete `components/HeroSplit.vue`, `components/HeroSlate.vue`, `components/HeroAzul.vue`. Leave `components/HeroClassic.vue` and `pages/classico.vue` untouched.

## 4. Already-tokenized files (catalog only, no changes)

- [ ] 4.1 Confirm `layouts/default.vue`, `AppHeader.vue`, `HouseCard.vue`, `CookieConsent.vue` need no edits — record their token usages in `docs/planning/design-tokens.md`'s inventory (already covered by `primary-*`, DaisyUI aliases).
- [ ] 4.2 Confirm `AppFooter.vue` needs no edit in this leaf (its hover bug is tracked separately in #212) — record its token usages in the inventory as-is.

## 5. Verification

- [ ] 5.1 Run the dev server; visually compare `/`, `/slate`, `/azul` before/after Hero consolidation — confirm identical gradient, copy, and CTAs per variant.
- [ ] 5.2 Confirm `/classico` (HeroClassic) is unaffected.
- [ ] 5.3 Confirm WhatsApp CTA background/hover color is visually unchanged on Home, and on `sobre.vue`/`contato.vue`/`login.vue` after the `.btn-primary` removal (DaisyUI-generated class takes over).
- [ ] 5.4 Grep the repo for any remaining references to `HeroSplit`, `HeroSlate`, `HeroAzul`, `.btn-secondary`, or `bg-[#3E8E5E]` / `bg-[#34784F]` to confirm no dangling references.
- [ ] 5.5 Run `npm run build` (or project's equivalent) to confirm no build errors from the CSS/config changes.
