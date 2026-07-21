# Tokenization report — Home + dependency tree

> Living report per `rbo-ui-tokenize` (`.claude/skills/rbo-ui-tokenize/SKILL.md`). Handoff document for `rbo-ui-design-system` when Passo 6 reaches its final leaf (#70). Produced for the `design-descoberta-site` OpenSpec change (issue [#197](https://github.com/fortegb/platform/issues/197), branch `feat/design-descoberta-site`). Human-facing summary/pointer also lives at [`docs/planning/design-tokens.md`](../../../docs/planning/design-tokens.md).

## Scope

**Mode:** Retrofit (Scenario A) — `rbo-ui-standards` was not active during original UI creation; hardcoded values existed alongside an already-partial Tailwind/DaisyUI token layer.

### Pass 1 — Home + dependency tree

**Pages:**
- `pages/index.vue` (Home, `/`)
- `pages/slate.vue` (`/slate`)
- `pages/gradient.vue` (`/gradient`)

> Route rename: `/azul` → `/gradient` and `/classico` → `/hero` (variant routes named by style, not by number, to avoid colliding with the v1/v2/v3 release naming). File and route names below reflect the current names; the migration log entries record what was audited at the time.

**Components (dependency tree, layout-level included automatically):**
- `layouts/default.vue`
- `components/AppHeader.vue`
- `components/AppFooter.vue`
- `components/WhatsAppButton.vue`
- `components/CookieConsent.vue`
- `components/Hero.vue` (new, consolidates `HeroSplit.vue`/`HeroSlate.vue`/`HeroAzul.vue`, now deleted)
- `components/HeroClassic.vue` (separate — pulled in during verification, see Migration log)
- `components/HomeContent.vue`
- `components/HouseCard.vue`

**Token source files:** `tailwind.config.js`, `assets/css/main.css`

**Out of scope for Pass 1:** `pages/hero.vue` uses `HeroClassic.vue`'s structurally different layout — not part of Hero consolidation, but its WhatsApp CTA color was in scope (see below). The rest of #197's routes were audited separately in Pass 2 below.

### Pass 2 — remaining #197 routes (portfolio, blog, sobre, contato, legal)

**Pages:**
- `pages/portfolio/index.vue`
- `pages/portfolio/[slug].vue`
- `pages/sobre.vue`
- `pages/contato.vue`
- `pages/privacidade.vue`
- `pages/termos.vue`
- `pages/blog/index.vue`
- `pages/blog/[slug].vue`

**Components (dependency tree):**
- `components/HouseGallery.vue`
- `components/HouseFloorplans.vue`
- `components/ImageLightbox.vue`
- `components/ContactForm.vue`

**Audit method:** exhaustive grep/ripgrep sweep per file for hex colors (`#[0-9a-f]{3,8}`), arbitrary-value color utilities (`bg-[`/`text-[`/`border-[`/`from-[`/`via-[`/`to-[`/`ring-[`/`shadow-[`/`fill-[`/`stroke-[`), raw default-Tailwind-palette color classes (`bg-red-500`, `text-gray-700`, etc. — anything bypassing the project's `primary-*`/`whatsapp`/DaisyUI semantic aliases), inline `style` attributes, and `ring-`/`outline-`/`decoration-`/`accent-` color utilities. No color, inline-style, or off-token violation found in any of the 12 files (see Remaining hardcoded values below).

**Arbitrary-value findings (non-color, out of this skill's core scope):** a handful of one-off arbitrary size/dimension utilities (`h-[440px]` gallery/video panel, `max-w-[90vw] max-h-[85vh]` lightbox, `lg:h-[32rem]` floorplan viewer, `max-w-[200px]` portfolio detail CTA buttons). These are Phase 5–7 territory (radius/shadow/typography/spacing), which this skill skips by default for Tailwind projects using Tailwind's built-in scale — flagged here for completeness, not treated as token gaps. None are colors, none repeat across unrelated components in a way that suggests a missing shared token, and changing them would be a layout/spacing decision, not a tokenization one (out of scope per the skill's "do not change spacing" rule unless replacing an identical hardcoded value with an equivalent token — none of these values repeat identically across more than the 1–2 sibling elements already documented).

## Token system health

| Finding | Severity | Resolution |
|---|---|---|
| `primary` 50–900 scale, `hero-slate`, DaisyUI theme aliases (`primary`, `secondary`, `accent`, `neutral`, `base-100/200/300`, `base-content`, `info`/`success`/`warning`/`error`) | Healthy | No change — already tokenized, consistent usage |
| `Montserrat` font, base font-size scale (`81.25%`) | Healthy | No change — documented global decision |
| WhatsApp green `#3E8E5E`/`#34784F` used identically in 6 files, never wired into `tailwind.config.js`, despite being a documented brand rule (`AGENTS.md` §9) | Issue | **Fixed** — new `whatsapp`/`whatsapp-hover` tokens |
| `.btn-secondary` (custom class, `main.css`) — defined, zero usages repo-wide | Issue (dead token) | **Fixed** — removed |
| `.btn-primary` (custom class, `main.css`) — same selector name as DaisyUI's auto-generated `.btn-primary` (used on ~15 other pages); values coincided but definitions were redundant | Issue (coupling/collision risk) | **Fixed** — removed, DaisyUI's native generation relied on |
| `AppFooter.vue` `hover:text-primary` on `bg-primary-500` — DaisyUI `primary` alias and `primary-500` are the same hex, hover text becomes invisible | Bug (not a token gap) | **Not fixed here** — filed and closed separately as [#212](https://github.com/fortegb/platform/issues/212) |

Fixes confirmed with the user before applying (WhatsApp token creation, `.btn-secondary` removal, `.btn-primary` removal, and the footer bug's separate-issue treatment were all explicitly confirmed, per the decision protocol — consolidation/removal never auto-applied).

## Token inventory

| Token | Value | Defined in | Utility | Role | Known usages |
|---|---|---|---|---|---|
| `primary-50`…`primary-900` | `#e6f0f5` … `#060901` | `tailwind.config.js` | `bg-primary-*`, `text-primary-*`, `border-primary-*` | Brand navy scale | Header, Footer, buttons, Hero gradients, HouseCard price/links |
| `hero-slate` | `#4a5a72` | `tailwind.config.js` | `to-hero-slate` | Hero gradient end (slate variant) | `Hero.vue` (`variant="slate"`) only |
| `whatsapp` **(new)** | `#3E8E5E` | `tailwind.config.js` | `bg-whatsapp` | WhatsApp CTA background | `Hero.vue`, `HeroClassic.vue`, `HomeContent.vue`, `WhatsAppButton.vue` |
| `whatsapp-hover` **(new)** | `#34784F` | `tailwind.config.js` | `hover:bg-whatsapp-hover` | WhatsApp CTA hover | same |
| DaisyUI `primary` | `#203045` (= `primary-500`) | `tailwind.config.js` (`daisyui.themes.fortegb`) | `.btn-primary`, `text-primary` (generated) | Semantic primary alias | `CookieConsent.vue`, ~15 other pages via `.btn.btn-primary` |
| DaisyUI `secondary` | `#1a74a1` (= `primary-400`) | same | `bg-secondary` | Secondary action | `HouseCard.vue` "Agendar Visita" |
| DaisyUI `accent`, `neutral`, `base-100/200/300`, `base-content`, `info`/`success`/`warning`/`error` | per theme block | same | various | Surfaces, status badges | `HouseCard.vue` status badges, `CookieConsent.vue`, `HomeContent.vue` sections |
| Montserrat | — | `tailwind.config.js` (`fontFamily.sans`) + `main.css` `@import` | `font-sans` (default) | Global typeface | all pages |
| Base font-size scale | `81.25%` | `main.css` `html` rule | — (global) | Compact UI scale | all pages |

No `--sz-*`-style CSS custom properties in this project — colors live directly in `tailwind.config.js` (see Dark mode log for why).

## New tokens added

| Token | Value | Role | Rationale |
|---|---|---|---|
| `whatsapp` | `#3E8E5E` | WhatsApp CTA background | Single clear semantic role (WhatsApp action color), already a documented brand rule (`AGENTS.md` §9), repeated identically in 6 files with zero variation — textbook auto-proceed case per decision protocol, confirmed with user anyway given its foundational status. |
| `whatsapp-hover` | `#34784F` | WhatsApp CTA hover | Paired hover value for the same CTA, same rationale. |

No existing token was reused/approximated for these — the value had no semantic overlap with `primary-*` or any DaisyUI alias.

## Decision log

| Finding | Options presented | User choice | Reason |
|---|---|---|---|
| WhatsApp green hardcoded in 5 (later found: 6) places | Create semantic token vs. leave hardcoded as fixed brand color | **Create token** | Already a documented, repeated system convention — worth a single source of truth over 6 copies. |
| `.btn-secondary` dead code | Remove vs. keep as reserved | **Remove** | Zero usages anywhere in the repo; no stated future need. |
| `.btn-primary` redundant with DaisyUI's generated class | Remove (rely on DaisyUI) vs. keep + document collision | **Remove** | Values already coincided (both derived from the same `primary` theme color); removal is zero-visual-change and removes future drift risk if the DaisyUI theme color ever changes independently. |
| `AppFooter.vue` hover-invisible-text bug (found during audit, not requested) | Fix inline in this leaf vs. spin off separate issue | **Spin off** | Visual bug fix, not tokenization — matches the `design-system-fluxo.md` gap playbook (don't scope-creep the current leaf). Filed and closed as #212 in this same session. |

No same-value/different-role ambiguity was found in this pass — no role-ambiguity decisions were needed.

## Migration log per file

| File | Tokens applied | Values replaced | Notes |
|---|---|---|---|
| `tailwind.config.js` | — | — | Added `whatsapp`/`whatsapp-hover` to `theme.extend.colors` |
| `assets/css/main.css` | — | — | Removed `.btn-secondary` (dead) and `.btn-primary` (redundant) custom classes |
| `components/WhatsAppButton.vue` | `bg-whatsapp`, `hover:bg-whatsapp-hover` | `bg-[#3E8E5E]` → `bg-whatsapp`; `hover:bg-[#34784F]` → `hover:bg-whatsapp-hover` | Zero visual change (identical resolved color) |
| `components/HomeContent.vue` | `bg-whatsapp`, `hover:bg-whatsapp-hover` | same substitution, CTA-contato WhatsApp link | Zero visual change |
| `components/HeroClassic.vue` | `bg-whatsapp`, `hover:bg-whatsapp-hover` | same substitution | **Found during Phase-9 verification (dangling-reference grep), not in the original audited scope** — `HeroClassic.vue` isn't part of Home's render tree (it's `pages/classico.vue`'s hero), so the initial dependency-tree scope missed it. Caught and fixed before commit. (`pages/classico.vue` at audit time; since renamed to `pages/hero.vue`.) |
| `components/Hero.vue` (new) | `bg-whatsapp`, `hover:bg-whatsapp-hover`, `to-primary-700`/`to-hero-slate`/`to-primary-400` via `variant` prop | Replaces `HeroSplit.vue`/`HeroSlate.vue`/`HeroAzul.vue` (deleted) — structural consolidation, not a token change per se, but the merged component already uses the new WhatsApp token | Structural change explicitly in scope per the proposal (Hero consolidation), not a tokenization side-effect |
| `pages/index.vue`, `pages/slate.vue`, `pages/gradient.vue` | — | `<HeroSplit/Slate/Azul />` → `<Hero variant="..." />` | Wiring only |
| `layouts/default.vue`, `AppHeader.vue`, `HouseCard.vue`, `CookieConsent.vue` | — (already tokenized) | none | Catalogued only, confirmed already using `primary-*`/DaisyUI aliases correctly |
| `AppFooter.vue` | — (already tokenized elsewhere) | none in this pass | Hover bug tracked separately (#212, closed) |

**Commit cadence:** batched by logical unit (token layer, WhatsApp retrofit, Hero consolidation) rather than strictly one commit per file — acceptable here since every change in a batch was the same zero-visual-risk substitution pattern, verified together via build + user visual check rather than per-file isolation. Flagged here for transparency against the skill's stated "one commit per verified file" default.

## Dark mode log

Not applicable. This project has no dark mode requirement (confirmed absent from `docs/planning/decisions.md`) and no `--sz-*`/CSS-custom-property + `.dark{}` layer — colors are wired directly into `tailwind.config.js`. Introducing that layer now would be speculative; noted as a deliberate architectural decision in `design.md`, not an oversight.

## Inconsistencies documented (not normalized)

- `hero-slate` is named by appearance (color-adjacent to its variant name) rather than by semantic role, unlike `whatsapp`/`primary-*`. Left as-is — renaming risks breaking references across the leaves that will consume this inventory next, and it's scoped narrowly enough (one usage) that the naming risk is low. Documented here rather than silently renamed.
- DaisyUI `primary` (semantic alias) and `primary-500` (numeric scale) resolve to the identical hex value but are technically two different token systems layered on top of each other (Tailwind config colors vs. DaisyUI theme). Both are in active, correct use elsewhere; only `AppFooter.vue` had actually confused the two in a way that broke visually (#212, fixed separately). Documented, not consolidated — DaisyUI-generated and manually-configured colors serve different purposes (component-class generation vs. utility classes) even when their values coincide.

## Validation results

- `npm run build` — clean, no errors.
- Confirmed via build output that the new/dynamic Tailwind classes (`.bg-whatsapp`, `.bg-whatsapp-hover`, `.to-hero-slate`, `.to-primary-700`, `.to-primary-400`) were correctly generated by the JIT scanner, despite being referenced through a computed class-map in `Hero.vue` rather than static template strings.
- No lint script configured in `package.json` beyond build — no separate lint pass run.
- User performed the visual check (all Hero variants, `/classico`, and the `.btn-primary` pages `sobre`/`contato`/`login`) and confirmed no visual regressions.

## Remaining hardcoded values

**Pass 1 (Home):** none found in scope after the `HeroClassic.vue` gap was closed. Grep for `HeroSplit`/`HeroSlate`/`HeroAzul`/`.btn-secondary`/`bg-[#3E8E5E]`/`bg-[#34784F]` across app source (`pages/`, `components/`, `layouts/`) returned zero matches. Remaining hits were in `docs/planning/site/app/_nuxt/*.js` (stale prerendered Platform-docs mock build, self-heals on next `pages:sync`) and `docs/assets/portal.css` (unrelated Platform docs portal stylesheet, not app source) — both out of scope by design.

**Pass 2 (portfolio, blog, sobre, contato, legal):** none found. All color usage across the 12 files already routes through `primary-*`, `whatsapp`/`whatsapp-hover`, or DaisyUI semantic aliases (`secondary`, `base-100/200/300`, `base-content`, `badge-success/error/warning/info/neutral`) — same pattern already catalogued for `HouseCard.vue` in Pass 1. `ContactForm.vue`'s five input/select/textarea fields all use `focus:ring-primary-500` consistently. No raw Tailwind default-palette colors, no inline color styles, no un-tokenized hex.

## Token gaps flagged

None across both passes. Every hardcoded value found in scope had a clear single semantic role and was resolved (either tokenized or, for the footer bug, correctly identified as not a token issue). Pass 2 found zero color/token gaps at all — nothing to resolve.

## Readiness assessment

**#197 is now fully audited for tokenization across all its routes** (`/`, `/slate`, `/gradient`, `/hero`, `/portfolio`, `/portfolio/[slug]`, `/sobre`, `/contato`, `/privacidade`, `/termos`, `/blog`, `/blog/[slug]`) — Pass 1 (Home) + Pass 2 (everything else) both clean, zero remaining color/token gaps. Ready for the next design leaves (#198–#207) to reference this inventory. Still not ready for `rbo-ui-design-system` (#70) — that skill runs once, at the very end of Passo 6, after all 11 design leaves and all 4 tokenize sweeps (#208–#211) close; this report will keep growing as those leaves land.

---

## Pass 3 — Agendar visita (#198), 2026-07-20

**Scope:** the scheduled-visit journey's three routes and the components they render —
`pages/visita/agendar/[houseId]/index.vue`, `pages/visita/agendar/[houseId]/verificacao.vue`,
`pages/visita/[token].vue`, `components/HouseVisitHeader.vue`, `components/VisitStepIndicator.vue`,
`components/HouseCard.vue`, `components/IdentityVerification.vue`,
`composables/useHouseStatus.ts`, `composables/useVisitBooking.ts`.

**Method note — the trap fired, and was caught.** The first run passed the paths as an
unquoted shell variable. `[houseId]` and `[token]` are glob character classes, so the shell
expanded them to nothing and grep reported *"No such file or directory"* for the whole list.
Because the run was deliberately made **without** `2>/dev/null` (the Pass 2 lesson), the
warning was visible and the audit was rerun with `set -f` and a quoted array, with an explicit
per-file existence check printed first. Suppressing stderr here would have produced three
empty result sets and a confident "clean" verdict on nine files that were never opened. The
same bracket-path hazard applies to every remaining leaf: journey routes are dynamic segments.

**Results:** zero hex color literals, zero arbitrary color utilities, zero raw Tailwind
default-palette colors. The only `#` matches were issue references in code comments
(`#198`, `#213`, `#214`), and the only arbitrary-value utility anywhere in the new files is
`tracking-[0.3em]` on the access code.

**`tracking-[0.3em]` — kept deliberately.** It is letter-spacing, not color, and it is
expressed in `em`, so it scales with the global 81.25% root rather than fighting it — unlike
the fixed-pixel `max-w-[200px]` that Pass 2 normalized to `w-44` for exactly that reason.
Tailwind's tracking scale tops out below what a four-digit code read at arm's length outdoors
needs. Not promoted to a token: it has one call site and one purpose.

**Token gaps flagged:** none. Every color on the three new screens routes through `primary-*`,
`secondary`, `whatsapp`/`whatsapp-hover`, DaisyUI semantic aliases (`base-100/200/300`,
`base-content`), or DaisyUI status colors (`success`, `warning`, `error`) — the same vocabulary
Pass 1 and Pass 2 catalogued. No new token was needed.

**New status token:** `na-planta` joins `disponivel`/`em-construcao`/`reservado`/`vendido`.
It is a domain status rather than a design token, but it carries a badge color
(`badge-info`) and a label, both now centralized in `composables/useHouseStatus.ts` instead of
being duplicated per component — the same de-duplication `whatsapp` got in Pass 1.

**Validation:** `npm run build` clean.

## Pass 4 — Visita QR (#199), 2026-07-20

**Scope:** the instant/QR journey's three routes and their new composable —
`pages/visita/qr/[code]/index.vue`, `pages/visita/qr/[code]/verificacao.vue`,
`pages/visita/qr/[code]/resultado.vue`, `composables/useQrVisit.ts`. The reused components
(`HouseVisitHeader`, `VisitStepIndicator`, `IdentityVerification`) were audited in Pass 3 and
are unchanged here.

**Method note:** ran with the Pass 3 guard already in place — `set -f`, quoted path array,
per-file existence check, **no** `2>/dev/null`. The bracket segments (`[code]`) are the same
glob-class hazard; the guard held and every file was actually opened.

**Results:** zero hex color literals, zero arbitrary color utilities, zero raw Tailwind
default-palette colors. The only `#` matches were issue references in comments (`#198`,
`#214`). Arbitrary-value utilities present are all letter-spacing in `em`, not color:
`tracking-[0.3em]` on the access code (same as Pass 3) and `tracking-[0.4em]` on the OTP
input — both `em`-based so they scale with the 81.25% root, both single-purpose, neither
promoted to a token.

**Token gaps flagged:** none. Every color routes through the Pass 1–3 vocabulary —
`primary-*`, `secondary`, `whatsapp`/`whatsapp-hover`, DaisyUI semantic aliases
(`base-100/200/300`, `base-content`), and status colors (`success`, `warning`, `error`). No
new token was needed; `useQrVisit.ts` re-exports the masks and CPF check from `useVisitBooking`
rather than duplicating them.

**Validation:** `npm run build` clean.

## Pass 5 — Gerenciar visita (#200), 2026-07-20

**Scope:** the one new greenfield route of the manage-visit journey —
`pages/visita/gerenciar/[token].vue`. Reused components (`HouseVisitHeader`, `WhatsAppIcon`)
were audited in Pass 3 and are unchanged.

**Method note:** ran with the Pass 3/4 guard — `set -f`, quoted bracket path, per-file
existence check, **no** `2>/dev/null`. The `[token]` segment is the same glob-class hazard;
the guard held and the file was actually opened (361 lines confirmed).

**Results:** zero hex color literals, zero arbitrary color utilities, zero raw Tailwind
default-palette colors. The only `#` matches were issue references in comments (`#198`, `#140`,
`#141`, `#81`, `#214`). The single arbitrary-value utility is `tracking-[0.25em]` on the active
access-code display — `em`-based (scales with the 81.25% root), single-purpose, not promoted to
a token, exactly as the code display in Pass 3/4.

**Token gaps flagged:** none. Every color routes through the established vocabulary —
`primary-*`, `secondary`, `whatsapp`/`whatsapp-hover`, DaisyUI semantic aliases
(`base-100/200/300`, `base-content`), and status colors (`success`, `error`). The destructive
Cancel action reuses the existing `error` token (outlined for the trigger, filled for the
confirm) — no new "danger" token invented.

**Validation:** `npm run build` clean.

> Pass 5 closes the tokenization coverage of the four visitor/client design leaves (#197–#200).
> The **persona-section sweep** for Visitante/cliente is [#208](https://github.com/fortegb/platform/issues/208),
> which runs after this leaf and re-checks the section as a whole for cross-screen drift.

## Pass 6 — Onboarding do corretor (#201), 2026-07-21

**Scope:** the first Corretor-section leaf — the login align pass plus three greenfield pages:
`pages/login.vue` (edited), `pages/corretor/onboarding/index.vue`,
`pages/corretor/onboarding/status.vue`, `pages/corretor/casas/[id]/contrato.vue`.

**Method note:** `set -f` with a **zsh array** of quoted paths (the earlier `for f in $files`
form silently ran once with the whole list as one word — zsh does not word-split unquoted
parameter expansions, unlike bash; the bracket-glob guard was right but the splitting was the
trap this time). Per-file existence check, **no** `2>/dev/null`. All four files opened.

**Results:** the three new pages — zero hex, zero arbitrary color utilities, zero raw Tailwind
palette colors. Every color routes through the established vocabulary: `primary-500`, `secondary`,
`whatsapp`/`whatsapp-hover`, `base-100/200/300`, `base-content`, and status colors (`success`,
`warning`, `error`) with opacity modifiers (`/5`, `/10`, `/40`). Destructive/terminal states reuse
`error`; pending reuses `warning`; approved reuses `success` — no new tokens invented. `input
input-bordered` and `checkbox checkbox-sm` are DaisyUI structural utilities (not color), kept as in
the #198 booking form.

**Documented exception (not a gap):** `pages/login.vue` carries five hex literals — the official
brand colors of the Google (`#4285F4`/`#34A853`/`#FBBC05`/`#EA4335`) and Facebook (`#1877F2`)
sign-in mark SVGs. These are third-party brand marks that must render in the providers' exact
colors; they are **not** tokenizable and pre-date this leaf. Same category as any vendor logo —
recorded here so the audit is not misread as dirty.

**Validation:** `npm run build` clean.

> Pass 6 opens the Corretor section. The section sweep is
> [#209](https://github.com/fortegb/platform/issues/209), after #201–#203 close.
