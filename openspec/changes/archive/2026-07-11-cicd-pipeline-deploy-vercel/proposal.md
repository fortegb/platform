## Why

D-027 already fixed Vercel topology (one project, `main`→Production, `staging`/
`feat/*`/`fix/*`→Preview). What's still undecided: whether the deploy trigger
needs custom CI beyond Vercel's native git integration, whether merges are
gated on a passing deploy, how to roll back a bad production deploy, and
whether deploy failures need custom notifications. Issue #167 (leaf of #146)
closes these as a Definição-only decision — no provisioning yet (gated by G2).

## What Changes

- Deploy trigger: Vercel's native git integration **is** the pipeline; no
  custom GitHub Actions now. Custom build hooks may be added later if a
  concrete need arises — not precluded.
- `origin/staging` bootstrap: decided now (long-lived, branched from `main`,
  per `environments.md`'s existing contract) but **created later**, during
  Execução bootstrap (#42/#46) — not as part of this Definição leaf.
- Branch protection: require a passing Vercel deploy before merge into `main`
  only. `staging` stays open (its role is integration/validation, per D-045).
- Rollback: Vercel's built-in dashboard rollback is the plan; no custom
  procedure.
- Deploy notifications: none custom; Vercel's default failure emails suffice.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: adds deploy-pipeline requirements (trigger mechanism,
  branch protection scope, rollback plan, staging-bootstrap timing) as a
  direct continuation of its existing branch-mapping and Vercel-topology
  content (D-026/D-027).

## Impact

- Docs only — `docs/planning/decisions.md` (new D-entry) + a new template file
  pointed at from `environments.md`.
- No code, no CI config, no branch protection toggle, no `origin/staging`
  creation in this leaf — all deferred to Execução per the decisions above.
