## Context

D-031/D-032 already fixed the migration mechanism and local runbook. This
leaf only closes the remaining question: automated or manual trigger, and
if manual, when/how it's not silently forgotten.

## Goals / Non-Goals

**Goals:**
- Decide automated vs. manual migration apply.
- Define trigger points and a lightweight traceability convention.

**Non-Goals:**
- Building any CI automation, secrets store, or approval-gate machinery.
- An automated pending-migration detector — considered and explicitly
  rejected as unneeded complexity relative to the risk (see Decisions).

## Decisions

- **Manual, not automated.** Automating this requires a new CI workflow, a
  new secrets surface separate from Vercel's env scopes (D-042/D-043), and
  an approval gate to preserve D-031's staging→smoke→prod order — real,
  ongoing cost with no identified need yet at this team's scale. Revisit
  only if forgetting migrations becomes a recurring real problem.
- **Trigger points tied to the existing stage/close skills**, not a new
  mechanism — `rbo-stage-change` for staging, `rbo-close-change` for prod.
- **Commit-message traceability**, not tooling — costs nothing, gives a
  searchable git-log trail.
- **No automated pending-migration check** — considered during grilling and
  rejected: a missed migration breaks the app loudly and immediately (code
  expecting a column that doesn't exist), which is adequate, self-correcting
  feedback. Building a diff-based detector would be solving a problem that
  already has a working, free safety net — the same reasoning already
  applied to rollback (Vercel dashboard) and notifications (default emails)
  in D-046.

## Risks / Trade-offs

- **[Risk]** Manual apply can still be forgotten in the moment even with
  the trigger points documented. → **Mitigation**: accepted — the failure
  mode is loud and immediate (app breaks), not silent data drift.
