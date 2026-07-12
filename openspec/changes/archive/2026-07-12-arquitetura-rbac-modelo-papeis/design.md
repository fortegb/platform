## Context

Epic #179 (Arquitetura de domínio) leaf #183, fourth grilled after #181 (Tuya), #180 (visits/identity), #182 (messaging). `D-018` named RBAC as a foundational "lock now" item but never formalized it beyond a loose role table in `architecture.md` §2, which already shows unreconciled overlap (Ricardo as Admin+Digital, founders as Admin+Sócio).

## Goals / Non-Goals

**Goals:** `D-055` + `templates/rbac-modelo-papeis.md`; a role model and enforcement-layer policy that `#50` (Execução) and Passo 5 (#176) can both build on without reopening architecture.

**Non-Goals:** Writing actual Supabase RLS policies; choosing the exact JWT-claims-vs-DB-lookup mechanism; designing the role-assignment UI; enumerating every permission per screen (Passo 5's job).

## Decisions

1. Single `role` enum per user, no multi-role assignment.
2. "Digital"/"Sócio" are organizational facts, not RBAC roles.
3. Admin ⊇ Staff at evaluation time, not via stacked role storage.
4. Two-layer enforcement: app middleware (UX) + Supabase RLS (real boundary).
5. `Visitante` unstored — default/absence case, not tracked by RBAC.

**Alternative considered and rejected:** a many-to-many `user_roles` table allowing multiple simultaneous role assignments (to directly model Ricardo holding both "Admin" and "Digital"). Rejected because "Digital" and "Sócio/investidor" turned out not to gate any actual system capability once examined — they're organizational facts, not permission boundaries — so the apparent need for multi-role turned out to be a modeling artifact, not a real requirement. The one genuine overlap that remained (Admin acting with Staff-level capability) is fully resolved by hierarchy at evaluation time, which is simpler than multi-assignment.

## Risks

- **[Risk] App-level middleware is treated as sufficient security on its own**, skipping RLS for a "quick" feature. → Mitigation: this decision explicitly names RLS as the real boundary and middleware as UX-only — `#50` inherits that framing rather than deciding it ad hoc per feature.
- **[Risk] A future role need doesn't fit the flat four-role enum** (e.g. a genuinely new external party type). → Mitigation: the enum is an accepted, deliberate constraint for the current domain, not a permanent ceiling — revisit if a real new role emerges, same as any other architecture decision.
- **[Risk] Treating "Digital"/"Sócio" as non-RBAC facts turns out to be wrong later** (e.g. a founder-only screen is needed that Admin shouldn't see). → Mitigation: nothing in this decision blocks adding a distinct role later if a real capability boundary emerges; it just avoids inventing one prematurely from titles that currently gate nothing.
