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

- [x] 4.1 Confirm `layouts/default.vue`, `AppHeader.vue`, `CookieConsent.vue` need no edits — record their token usages in `docs/planning/design-tokens.md`'s inventory (already covered by `primary-*`, DaisyUI aliases). `HouseCard.vue` was originally in this "no changes needed" group too, but got substantial UX/design edits during the `/portfolio` review pass — see section 6.
- [x] 4.2 Confirm `AppFooter.vue` needs no edit in this leaf (its hover bug is tracked separately in #212) — record its token usages in the inventory as-is.

## 5. Verification

- [x] 5.1 Visually compare `/`, `/slate`, `/azul` before/after Hero consolidation — confirm identical gradient, copy, and CTAs per variant. **User confirmed OK.**
- [x] 5.2 Confirm `/classico` (HeroClassic) is unaffected. **User confirmed OK.**
- [x] 5.3 Confirm WhatsApp CTA background/hover color is visually unchanged on Home, and on `sobre.vue`/`contato.vue`/`login.vue` after the `.btn-primary` removal (DaisyUI-generated class takes over). **User confirmed OK.**
- [x] 5.4 Grep the repo for any remaining references to `HeroSplit`, `HeroSlate`, `HeroAzul`, `.btn-secondary`, or `bg-[#3E8E5E]` / `bg-[#34784F]` to confirm no dangling references. Found and fixed one gap outside the originally audited scope: `HeroClassic.vue` also had the hardcoded WhatsApp hex — retrofitted to `bg-whatsapp`/`hover:bg-whatsapp-hover`. Matches referenced only in stale `docs/planning/site/app/_nuxt/*.js` prerendered mocks (self-heals on next `pages:sync`) and an unrelated `.btn-secondary` in `docs/assets/portal.css` (Platform docs portal styling, not app source).
- [x] 5.5 Run `npm run build` — clean, no errors. Confirmed `.bg-whatsapp`, `.to-hero-slate`, `.to-primary-700`, `.to-primary-400` were all generated correctly by Tailwind's JIT (in Nuxt's SSR style-injection chunk, not a static `.css` file).

## 6. Portfolio page design pass (`/portfolio`, `/portfolio/[slug]`)

User-driven visual review (not a token pass — real UX/design findings). All user-verified live in browser.

- [x] 6.1 Hide filter/search UI on `/portfolio` (`showFilters = false`) — only 6 houses today, not enough to justify it. Logic/state kept intact for re-enabling later.
- [x] 6.2 `HouseCard.vue`: fix weak `hover:bg-opacity-90` on "Agendar Visita" → `hover:bg-primary-500` (visible contrast, matches "Ver Detalhes"' hover strength).
- [x] 6.3 `HouseCard.vue`: reorder card actions — "Agendar Visita" (solid CTA) left, "Ver Detalhes" (outline) right/bottom-right and always present, since only Ver Detalhes is guaranteed available on every house.
- [x] 6.4 `HouseCard.vue` + `[slug].vue`: hide "Agendar Visita" entirely (not a disabled ghost) when `house.status === 'vendido'`.
- [x] 6.5 `HouseCard.vue` + `[slug].vue`: hide price when `house.status === 'vendido'`.
- [x] 6.6 `HouseCard.vue`: wrap the house photo in a link to the detail page (same destination as "Ver Detalhes").
- [x] 6.7 Fix 404'd Unsplash photo on "Residência Alto do Campo Belo" in `data/mock.ts`.
- [x] 6.8 Add `composables/useHouseSort.ts` (disponível > em-construção > rest, stable order within each group); applied to `/portfolio`'s `filteredHouses`.
- [x] 6.9 Add explicit `featured: boolean` to `data/mock.ts` houses; `HomeContent.vue`'s featured section now filters by it instead of deriving from status — an editorial choice, not an algorithm.
- [x] 6.10 `data/mock.ts`: statuses updated to match real current inventory (3 `vendido`, 2 `em-construcao`, 1 `disponivel`).
- [x] 6.11 Note `featured` as a gap in the Sanity content model template (`docs/planning/templates/cms-content-model.md`, D-036) — mock-data toggle today, becomes a Sanity Studio field at CMS build time.
