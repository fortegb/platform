## Context

A1 (D-025) defined `local` / `staging` / `prod`. Grilling A2 (2026-07-10, #148) locked how git lines map to those environments, and how close/promote relate — without making the global close skill ForteGB-specific.

Sibling leaves own: Vercel topology (#149), domains (#150), skill implementation (#166), promote runbook (#169).

## Goals / Non-Goals

**Goals:**
- Branch ↔ environment map in canon + sócios docs.
- Clear close vs promote separation.
- Opt-in lifecycle config **contract** for #166 (default = today’s merge-to-main).

**Non-Goals:**
- Changing `rbo-close-change` code in this change.
- Creating `staging` on the remote, Vercel wiring, or domain DNS.
- Full hotfix/promote checklists.

## Decisions (grilled)

### Branch map

| Git line | Logical environment | Notes |
|----------|---------------------|-------|
| *(no remote — laptop)* | `local` | `npm run dev`; isolated |
| `feat/*`, `fix/*` | `staging` (via Preview) | Staging-class backends; temporary URL |
| `staging` (long-lived) | `staging` | Shared pre-prod / sócio UAT |
| `main` | `prod` | Production |

### Paths
- **Normal:** `feat/*` or `fix/*` → merge into `staging` → (separate) promote `staging` → `main`.
- **Promote:** not automatic in Vercel; typically merge/PR `staging` → `main` (detail → #169).
- **Hotfix:** exceptional path to `main`; procedure → #169.

### Lifecycle config contract (for #166 — not implemented here)

- **Default (no config):** close skill merges to repo default branch (`main`) — current behavior; other products unchanged.
- **Opt-in:** if a small repo config is present (exact path/filename to pick at apply; e.g. `.rbo/lifecycle.yml`), and sets `integrationBranch: staging`, then close merges to that branch instead.
- Skill **must not** parse long markdown maps; only explicit config.
- ForteGB will add the config file when #166 ships (or as a tiny follow-up in #166). This change only **specifies** the contract in the D-entry + template.

### Temporary gap
Until #166: docs say close → staging; skill still → main. STATUS must state that gap explicitly.

### Artifact layout at apply
1. D-026 (or next free) in `decisions.md` + root `DECISIONS.md`.
2. Extend `templates/environments.md` with Branches + lifecycle config contract.
3. Update `ambientes.html` (sócios language).
4. `architecture.md` §7 pointer; `STATUS.md` next = #149 (or #166 note); `CHANGELOG.md`.
5. Delta spec requirements under `environment-tiers`.

## Risks / Trade-offs

- **[Risk] Docs/skill mismatch until #166** → Mitigation: STATUS callout; #166 DoD includes config + skill read.
- **[Risk] Hardcoding staging in global skill** → Rejected; opt-in config only.
- **[Trade-off] Specify without implementing** → Accept; keeps A2 a definition leaf.

## Open Questions

None blocking. Deferred: skill implementation (#166), Vercel (#149), domains (#150), promote runbook (#169).
