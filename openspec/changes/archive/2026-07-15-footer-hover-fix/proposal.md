## Why

`AppFooter.vue` uses `hover:text-primary` on links inside a `bg-primary-500` footer. The DaisyUI `primary` theme alias and the Tailwind `primary-500` value are identical (`#203045`), so a hovered footer link becomes the same color as its own background — invisible. Found during the `fundacao-tokens-web`/`design-descoberta-site` token audit ([#68](https://github.com/fortegb/platform/issues/68)/[#197](https://github.com/fortegb/platform/issues/197)), filed separately since it's a visual bug fix, not tokenization.

## What Changes

- `components/AppFooter.vue`: replace `hover:text-primary` with a hover color that has real contrast against `bg-primary-500` (`hover:text-primary-100`, matching the hover treatment `AppHeader.vue` already uses for its nav links).

## Capabilities

### New Capabilities
- `ui-visual-accessibility`: interactive UI elements (links, buttons) SHALL remain visually legible against their background across all interaction states (default, hover, focus). No existing capability covers visual/contrast concerns — this is the first.

### Modified Capabilities
(none)

## Impact

- `components/AppFooter.vue` only. No other files affected.
