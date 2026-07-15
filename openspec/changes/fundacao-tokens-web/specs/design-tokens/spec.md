## ADDED Requirements

### Requirement: Documented token foundation
The system SHALL provide a single documented source of truth for brand colors, typography, spacing, and button styles, derived from the existing Home implementation (`tailwind.config.js`, `assets/css/main.css`) rather than inventing new values.

#### Scenario: Design leaf references tokens
- **WHEN** a Passo 6 design leaf (#197–#207) needs a color, font, spacing, or button style
- **THEN** it references the documented token foundation instead of re-deriving or hardcoding arbitrary values

### Requirement: Single component per structurally-identical hero layout
Hero layouts that share the same structure (grid, buttons, copy) and differ only in background gradient SHALL be implemented as one component accepting a `variant` prop, not as separate duplicated components.

#### Scenario: Gradient-only hero variant
- **WHEN** a page needs the split-grid hero with a specific gradient (`split`, `slate`, or `azul`)
- **THEN** it renders the consolidated `Hero` component with `variant` set accordingly, instead of a dedicated per-gradient component

#### Scenario: Structurally different hero stays separate
- **WHEN** a hero layout is structurally different (e.g. full-bleed, centered) rather than a gradient variant of the split layout
- **THEN** it remains its own component (`HeroClassic`) and is not folded into the `variant` prop
