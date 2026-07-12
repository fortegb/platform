## Why

#183 is the fourth leaf of Epic #179 (Arquitetura de domínio). `D-018` flagged "RBAC covering all roles" as a foundational "lock now" item early on, but it was never formalized — only a loose role table existed in `architecture.md` §2, with documented overlap (Ricardo as both Admin and Digital; founders as both Admin and Sócio/investidor) that was never reconciled into an actual permission model. Deciding the role/permission mechanism now — before Passo 5 (#176) designs role-gated screens and before `#50` (Execução) implements RLS — prevents both from guessing at an undecided foundation.

## What Changes

Document (definition only — no RLS policies, no Supabase schema, no permission-matrix UI):

1. Single `role` enum per user (`cliente | corretor | staff | admin`) — no multi-role assignment, since Corretor/Cliente are mutually exclusive relationships to the business.
2. "Digital" and "Sócio/investidor" are organizational facts (`company-structure.md`), not RBAC roles — they gate no distinct system capability.
3. Admin is hierarchically superior to Staff **at permission-check evaluation time**, not via a second stored role — resolves the documented founder overlap without multi-assignment.
4. Two-layer enforcement: app-level middleware/routing (UX convenience) + Supabase RLS (the real security boundary), matching the existing private-bucket pattern (`D-016`/`D-030`).
5. `Visitante` is not a stored enum value — it's the default/absence case for an unauthenticated session; anonymous-traffic analytics is a separate concern (`#124`).
6. `D-055` + `templates/rbac-modelo-papeis.md`.

## Capabilities

### New Capabilities
- `rbac-role-model`: the platform's role enum, its evaluation hierarchy, and the two-layer (app + RLS) enforcement model that all role-gated access relies on.

### Modified Capabilities
<!-- none -->

## Impact

- Docs only. RLS policy implementation, exact JWT/claims mechanism, role-assignment UI, detailed permission matrix → #50 (Execução). Role-gated screens/flows → Passo 5 (#176).
