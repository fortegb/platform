## Context

`tailwind.config.js` defines the brand palette (`primary` 50–900, `hero-slate`), font (`Montserrat`), and a `fortegb` DaisyUI theme. `assets/css/main.css` sets the global font-size scale (81.25%) and two button component classes (`.btn-primary`, `.btn-secondary`). Three Hero components (`HeroSplit`, `HeroSlate`, `HeroAzul`) are byte-for-byte identical except for one Tailwind gradient class; a fourth (`HeroClassic`) has a genuinely different layout (full-bleed, centered, background image overlay) and is out of scope for consolidation.

## Goals / Non-Goals

**Goals:**
- Give the 11 Passo 6 design leaves (#197–#207) one documented place to look up colors, typography, spacing, and button styles instead of re-deriving them from scattered component code.
- Eliminate the 3-way Hero duplication before any more pages copy it.

**Non-Goals:**
- No new colors, fonts, or spacing values — this only documents and reduces duplication of what already ships on Home.
- No decision on which hero variant ships to production (stays deferred per D-021/Q-010).
- No change to `HeroClassic` — its layout is structurally different, not a gradient variant.
- No visual regression is intended on `/`, `/slate`, `/azul` — the consolidated component must render identically to today's output for each route.

## Decisions

- **Token documentation lives in `docs/planning/` as prose, not a new build artifact.** The values already exist and are enforced by Tailwind/DaisyUI config; a separate token file (e.g. JSON) would be a second source of truth to keep in sync. A markdown reference documenting what's in `tailwind.config.js` / `main.css` — and why — is enough for design leaves to consult.
- **Hero consolidation uses a `variant` prop (`split` | `slate` | `azul`), not three separate slots or a config object.** The only difference between the three is the gradient's end color; a prop-driven class map is the smallest change that removes the duplication without adding indirection.
- **`HeroClassic` is explicitly excluded.** Its template differs in more than color (single-column, background-image overlay, different heading sizes) — folding it into the same component via more props would make the component harder to read for a same-size saving.

## Risks / Trade-offs

- [Visual drift during consolidation] → Diff the rendered output of `/`, `/slate`, `/azul` before/after (screenshot or manual check) to confirm the consolidated `Hero` renders identically per variant.
- [Token doc goes stale if `tailwind.config.js` changes later without updating the doc] → Accepted for this leaf; keeping doc and config in sync is a process note for whoever edits `tailwind.config.js` next, not solved here.
