## Why

The admin-only screens (draft §5.2: role assignment, platform flags, API
keys) predate D-055/D-056/D-043. Re-validating them surfaces a direct
contradiction with a closed decision: the existing draft and
`screen-map.md` still use `/admin/*` routes, but D-056 explicitly rejected
a separate admin tree — admin-only actions live under `/staff/*` with
stricter per-route gating. Checking the "API keys" screen against D-043
(secrets access policy) surfaces a second conflict: that decision
restricts secrets write access to "ForteGB tech" specifically, not the
`admin` RBAC role generically — a sócio-admin who isn't tech (e.g.
Adilson) isn't supposed to have secrets access under D-043, even though
the draft implies any admin could configure API keys.

## What Changes

- **Routes move from `/admin/*` to `/staff/*`.** No separate admin tree —
  admin-only actions are gated more strictly within the same `/staff/*`
  namespace #189/#192/#193 already established, per D-056.
- **"API keys" becomes a read-only status/reference view, not a secrets
  editor.** Shows which integrations are configured/connected; actual key
  values are never stored in or edited through the platform's own
  database or UI. Editing happens in Vercel's env var configuration,
  restricted to "ForteGB tech" per D-043 — not exposed to the general
  `admin` RBAC role. Same "don't build what the vendor already handles"
  pattern already applied to Tuya emergency codes (#194) and CMS content
  (Sanity Studio).
- **"Ocultar casa" (hide house) resolves to Sanity Studio's existing
  publish/unpublish workflow — no ForteGB admin screen needed.** Houses
  are Sanity-managed content (D-015's content/operational split); Sanity
  already has native draft/unpublish visibility control. Building a
  redundant hide-flag in the platform's own admin UI would repeat the
  same over-building mistake the API-keys and Tuya corrections avoid.
- **"Modo manutenção" (maintenance mode) is a real-time, Supabase-stored
  flag, not a Vercel env var** — deliberately not following the vendor-
  native pattern above, because this flag isn't a secret (no D-043-style
  security reason to restrict it) and its whole purpose is fast emergency
  response. A Vercel env var would require a redeploy and could only be
  flipped by "ForteGB tech" (D-043's Vercel-write restriction), defeating
  the purpose for an admin sócio needing to act immediately.
- **Role assignment (invite + change role) is a real in-app admin
  feature**, consuming D-055's role enum directly — no conflict, nothing
  to correct, just needs building. Invite-based (admin invites by email
  with a pre-assigned role; recipient completes their own signup), not
  open self-registration like corretor's flow (#189) — staff/admin are
  known individuals, not public signups.
- **Explicitly out of scope:** "Relatórios agregados" and "Exceções de
  comissão / void de registro" from the original draft — neither is in
  this issue's stated scope (role assignment, platform flags, API keys
  only); both remain unowned gaps, not built here.

## Capabilities

### New Capabilities
- `journey-platform-admin-config`: defines the three admin-only surfaces
  — role assignment/invite, platform flags (maintenance mode as a live
  DB flag, hide-house deferred to Sanity), and the API-keys reference
  view — under `/staff/*`, consuming `rbac-role-model` without modifying
  it (assignment mechanism was never part of that capability's scope,
  only the enum/hierarchy/enforcement it already owns).

### Modified Capabilities
(none — this leaf applies D-055/D-056/D-043's existing tests and
policies to three concrete screens; none of their requirements change)

## Impact

- Frontend: `/staff/usuarios` (invite + role assignment),
  `/staff/config` (platform flags including maintenance mode),
  `/staff/integracoes` (read-only API status) — replacing the drafted
  `/admin/*` routes.
- Backend: invite record (email, assigned role, pending/accepted),
  maintenance-mode flag read on every public-site request, admin-only
  RBAC gating per route.
- Depends on D-055 (role model), D-056 (namespace + admin-only gating),
  D-043 (secrets ownership) already existing — implementation is
  Execução (#119, #72).
