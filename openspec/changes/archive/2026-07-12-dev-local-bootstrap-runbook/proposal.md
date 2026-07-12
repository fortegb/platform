## Why

D-032/D-049 both pointed the actual bootstrap runbook at #171 without
writing it. This leaf ties already-decided pieces (toolchain, Supabase
local, env vars) into one ordered "clone → working local dev" checklist.

## What Changes

- New `docs/planning/templates/dev-local-bootstrap.md`: ordered runbook —
  clone → toolchain (D-049/#170) → Supabase local (D-032) → env vars
  (D-044) → `npm run dev` working.
- **Local only.** Staging/prod bootstrap is explicitly out of scope — that
  work is already owned by #42/#43/#46 (Execução), not this Definição leaf.
  Folding it in here would blur the Definição/Execução split G2 exists to
  enforce, and duplicate work already assigned elsewhere.
- Docs only — no `supabase init`, no scaffold execution, matching D-032's
  own "docs only" precedent for the local Supabase runbook specifically.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: adds the bootstrap-runbook requirement, extending
  its existing local-dev content (D-030–D-032, D-049).

## Impact

- Docs only — `docs/planning/decisions.md` (new D-entry) + new template +
  pointer in `environments.md`.
- No actual installation, scaffolding, or provisioning in this leaf.
