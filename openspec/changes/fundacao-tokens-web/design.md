Implementation governed by rbo-ui-tokenize skill.
See `.claude/skills/rbo-ui-tokenize/SKILL.md` for token philosophy,
decision protocol, verification protocol, and living report format.

## Context

Project is Nuxt 3 + Tailwind + DaisyUI (no dark mode, no CSS-custom-property token layer — colors live directly in `tailwind.config.js` under `theme.extend.colors` and the `fortegb` DaisyUI theme block). This differs from the CSS-var + `.dark{}` architecture `rbo-ui-tokenize` assumes by default; adapted below (see Decisions).

Scope is the Home page's full dependency tree: `pages/index.vue` → `layouts/default.vue` (`AppHeader`, `AppFooter`, `WhatsAppButton`, `CookieConsent`) → `HeroSplit`/`HomeContent` → `HouseCard`.

### Token system health check (Phase 0)

| Finding | Status |
|---|---|
| `primary` 50–900 scale, `hero-slate`, DaisyUI theme aliases (`primary`, `secondary`, `accent`, `neutral`, `base-100/200/300`, `base-content`, `info`/`success`/`warning`/`error`) | Healthy — already tokenized, in use consistently |
| `Montserrat` font, base font-size scale (81.25%) | Healthy — already a documented global decision |
| WhatsApp green `#3E8E5E`/`#34784F` | ⚠ Hardcoded identically in 5 files (`HeroSplit`, `HeroSlate`, `HeroAzul`, `HomeContent`, `WhatsAppButton`), not wired into `tailwind.config.js`, despite being a documented brand rule (`AGENTS.md` §9) |
| `.btn-secondary` (custom class, `main.css`) | ⚠ Dead — zero usages repo-wide |
| `.btn-primary` (custom class, `main.css`) | ⚠ Duplicate — same selector name as DaisyUI's auto-generated `.btn-primary`, used on ~15 other pages (`sobre.vue`, `contato.vue`, `login.vue`, etc.); values coincide today but the definitions are redundant |
| `AppFooter.vue` `hover:text-primary` on `bg-primary-500` | ⚠ Bug, not a token issue (DaisyUI `primary` alias == `primary-500` value → invisible hover) — spun off as [#212](https://github.com/fortegb/platform/issues/212), not fixed here |

### Token inventory

| Token | Value | Defined in | Utility | Role | Known usages |
|---|---|---|---|---|---|
| `primary-50`…`primary-900` | `#e6f0f5` … `#060901` | `tailwind.config.js` | `bg-primary-*`, `text-primary-*`, `border-primary-*` | Brand navy scale | Header, Footer, buttons, Hero gradients, HouseCard price/links |
| `hero-slate` | `#4a5a72` | `tailwind.config.js` | `to-hero-slate` | Hero gradient end (slate variant) | `HeroSlate` only |
| DaisyUI `primary` | `#203045` | `tailwind.config.js` (`daisyui.themes.fortegb`) | `.btn-primary`, `text-primary`, etc. (DaisyUI-generated) | Semantic primary alias (same value as `primary-500`) | `CookieConsent`, ~15 other pages via `.btn.btn-primary` |
| DaisyUI `secondary` | `#1a74a1` (`primary-400`) | same | `bg-secondary` | Secondary action | `HouseCard` "Agendar Visita" |
| DaisyUI `accent`, `neutral`, `base-100/200/300`, `base-content`, `info`/`success`/`warning`/`error` | per theme block | same | various | Surfaces, status badges | `HouseCard` status badges, `CookieConsent`, `HomeContent` sections |
| `whatsapp` *(new)* | `#3E8E5E` | `tailwind.config.js` *(to add)* | `bg-whatsapp` | WhatsApp CTA background | `Hero*`, `HomeContent`, `WhatsAppButton` |
| `whatsapp-hover` *(new)* | `#34784F` | `tailwind.config.js` *(to add)* | `hover:bg-whatsapp-hover` | WhatsApp CTA hover | same |
| Montserrat | — | `tailwind.config.js` (`fontFamily.sans`) + `main.css` `@import` | `font-sans` (default) | Global typeface | all pages |
| Base font-size scale | `81.25%` | `main.css` `html` rule | — (global) | Compact UI scale | all pages |

No dark-mode tokens — the project has no dark mode requirement (confirmed absent from `decisions.md`); the CSS-var + `.dark{}` layer the skill describes by default is not needed here.

## Goals / Non-Goals

**Goals:**
- Give the 11 Passo 6 design leaves (#197–#207) one documented, accurate token inventory instead of re-deriving values from scattered component code.
- Close the three health-check gaps found (WhatsApp token, dead `.btn-secondary`, redundant `.btn-primary`) before more pages copy the duplication.
- Eliminate the 3-way Hero duplication.

**Non-Goals:**
- No new colors, fonts, or spacing values beyond the one new WhatsApp token — everything else documents what already ships.
- No dark mode, no CSS-custom-property migration — not required by this project today.
- No decision on which hero variant ships to production (stays deferred per D-021/Q-010).
- No fix for the `AppFooter` hover bug (#212) or for the two coexisting button systems (DaisyUI native `.btn` vs. hand-rolled utility recipes for WhatsApp/outline buttons) — both are real findings but out of scope for a pure tokenization pass; the button-system inconsistency is left as a documented finding for a later design leaf or #70, not solved here.
- No visual regression intended anywhere in scope — every change preserves current rendered output exactly.

## Decisions

- **Token documentation lives in `docs/planning/design-tokens.md` as prose, not a new build artifact.** The values already exist and are enforced by Tailwind/DaisyUI config; a separate token file (e.g. JSON) would be a second source of truth to keep in sync.
- **No CSS custom properties / dark-mode layer introduced.** The skill's default architecture (`--sz-*` vars in `:root`/`.dark{}`) targets apps with dark-mode requirements. This project has none — introducing that layer now would be speculative. Tokens stay as direct `tailwind.config.js` colors, matching current implementation.
- **New `whatsapp`/`whatsapp-hover` colors added directly to `tailwind.config.js`** (same layer as `primary`), not as a CSS var — consistent with how every other color in this project is wired.
- **`.btn-secondary` removed** (user-confirmed) — dead code, zero usages.
- **`.btn-primary` custom override removed** (user-confirmed) — redundant with DaisyUI's auto-generated class of the same name; removal is zero-visual-change since the underlying values already match.
- **Hero consolidation uses a `variant` prop (`split` | `slate` | `azul`), not three separate slots or a config object.** The only difference between the three is the gradient's end color; a prop-driven class map is the smallest change that removes the duplication.
- **`HeroClassic` stays excluded from consolidation.** Its template differs in more than color (single-column, background-image overlay, different heading sizes).
- **`AppFooter` hover bug and the dual button-system finding are not fixed here** — filed/deferred respectively, per the design-system-fluxo.md gap playbook: don't scope-creep the current leaf.

## Risks / Trade-offs

- [Visual drift during Hero consolidation] → Diff the rendered output of `/`, `/slate`, `/azul` before/after (manual check) to confirm the consolidated `Hero` renders identically per variant.
- [Removing `.btn-primary` custom override changes behavior if DaisyUI's generated value ever drifts from `primary-500`] → Low risk today (values are identical by construction, both derived from the same `primary` theme color); documented in the token inventory so a future DaisyUI theme edit doesn't silently reintroduce the mismatch.
- [Token doc goes stale if `tailwind.config.js` changes later without updating the doc] → Accepted for this leaf; process note for whoever edits `tailwind.config.js` next.
