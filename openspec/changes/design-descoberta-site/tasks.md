## 1. Token layer

- [x] 1.1 `tailwind.config.js` — add `whatsapp` (`#3E8E5E`) and `whatsapp-hover` (`#34784F`) to `theme.extend.colors`.
- [x] 1.2 `assets/css/main.css` — remove the dead `.btn-secondary` class (zero usages repo-wide).
- [x] 1.3 `assets/css/main.css` — remove the redundant custom `.btn-primary` class (duplicates DaisyUI's auto-generated `.btn-primary`; verify `.btn.btn-primary` renders identically on `sobre.vue`/`contato.vue`/`login.vue` after removal).
- [x] 1.4 Write `docs/planning/design-tokens.md` — the token inventory from `design.md`, as the reference the design leaves (#197–#207) consult. Cross-link from `STATUS.md` "Links" table and `design-system-fluxo.md`.

## 2. Retrofit — WhatsApp token adoption

- [x] 2.1 `components/WhatsAppButton.vue` — replace `bg-[#3E8E5E]` / `hover:bg-[#34784F]` with `bg-whatsapp` / `hover:bg-whatsapp-hover`. Verify computed background color unchanged.
- [x] 2.2 `components/HomeContent.vue` — same replacement on the CTA-contato WhatsApp link. Verify unchanged.

## 3. Hero consolidation

- [x] 3.1 Create `components/Hero.vue` accepting a `variant` prop (`split` | `slate` | `azul`) mapping to the corresponding gradient class (`to-primary-700`, `to-hero-slate`, `to-primary-400`), reusing the shared template (grid, copy, WhatsApp CTA using `bg-whatsapp`, portfolio CTA) from the three existing components.
- [x] 3.2 `pages/index.vue` — render `<Hero variant="split" />` instead of `<HeroSplit />`.
- [x] 3.3 `pages/slate.vue` — render `<Hero variant="slate" />` instead of `<HeroSlate />`.
- [x] 3.4 `pages/azul.vue` — render `<Hero variant="azul" />` instead of `<HeroAzul />`.
- [x] 3.5 Delete `components/HeroSplit.vue`, `components/HeroSlate.vue`, `components/HeroAzul.vue`. Leave `components/HeroClassic.vue` and `pages/classico.vue` untouched.

## 4. Already-tokenized files (catalog only, no changes)

- [x] 4.1 Confirm `layouts/default.vue`, `AppHeader.vue`, `HouseCard.vue`, `CookieConsent.vue` need no edits — record their token usages in `docs/planning/design-tokens.md`'s inventory (already covered by `primary-*`, DaisyUI aliases).
- [x] 4.2 Confirm `AppFooter.vue` needs no edit in this leaf (its hover bug is tracked separately in #212) — record its token usages in the inventory as-is.

## 5. Verification

- [x] 5.1 Visually compare `/`, `/slate`, `/azul` before/after Hero consolidation — confirm identical gradient, copy, and CTAs per variant. **User confirmed OK.**
- [x] 5.2 Confirm `/classico` (HeroClassic) is unaffected. **User confirmed OK.**
- [x] 5.3 Confirm WhatsApp CTA background/hover color is visually unchanged on Home, and on `sobre.vue`/`contato.vue`/`login.vue` after the `.btn-primary` removal (DaisyUI-generated class takes over). **User confirmed OK.**
- [x] 5.4 Grep the repo for any remaining references to `HeroSplit`, `HeroSlate`, `HeroAzul`, `.btn-secondary`, or `bg-[#3E8E5E]` / `bg-[#34784F]` to confirm no dangling references. Found and fixed one gap outside the originally audited scope: `HeroClassic.vue` also had the hardcoded WhatsApp hex — retrofitted to `bg-whatsapp`/`hover:bg-whatsapp-hover`. Matches referenced only in stale `docs/planning/site/app/_nuxt/*.js` prerendered mocks (self-heals on next `pages:sync`) and an unrelated `.btn-secondary` in `docs/assets/portal.css` (Platform docs portal styling, not app source).
- [x] 5.5 Run `npm run build` — clean, no errors. Confirmed `.bg-whatsapp`, `.to-hero-slate`, `.to-primary-700`, `.to-primary-400` were all generated correctly by Tailwind's JIT (in Nuxt's SSR style-injection chunk, not a static `.css` file).
