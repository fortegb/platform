## Context

Grilling #158 locked postures, defaults, overrides, resolver, and DoD split vs #159–#172.

## Goals / Non-Goals

**Goals:** D-037 + integrations-tiers template + Ambientes pointers.

**Non-Goals:** Vendor account setup; env var inventory; adapter implementations; webhook URLs.

## Decisions

1. Tiers = postures.
2. Defaults from APP_ENV; Previews = staging class.
3. Overrides constrained; prod always prod-live.
4. Per-integration effective tier via override ?? default.

## Risks

- **[Risk] Accidental prod-live from local with real keys** → Mitigation: resolver forbids prod-live outside prod regardless of credentials.
