## ADDED Requirements

### Requirement: Interactive elements remain legible against their own background
Links and buttons SHALL use a hover/focus color with visible contrast against the surface they render on, and SHALL NOT resolve to the same color as that surface.

#### Scenario: Footer link hover state
- **WHEN** a visitor hovers a link in `AppFooter.vue` (rendered on `bg-primary-500`)
- **THEN** the link's hover color is visibly distinct from `primary-500`, not the same value
