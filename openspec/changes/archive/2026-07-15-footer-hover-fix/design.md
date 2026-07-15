## Context

`components/AppFooter.vue` renders on `bg-primary-500` (`#203045`). Its "Links Rápidos" and "Legal" links use `hover:text-primary`, which resolves to the DaisyUI `primary` theme alias — also `#203045`. Hovering a footer link turns its text the same color as the background it sits on.

## Goals / Non-Goals

**Goals:** restore visible contrast on hover for footer links.

**Non-Goals:** no other footer changes, no token restructuring.

## Decisions

- Use `hover:text-primary-100` (`#b3d1e0`, light end of the same brand scale) — matches the contrast pattern `AppHeader.vue` already uses for its own nav links (`hover:text-primary-100`), so the header and footer behave consistently on hover.

## Risks / Trade-offs

None — single-property color change, no layout or structural impact.
