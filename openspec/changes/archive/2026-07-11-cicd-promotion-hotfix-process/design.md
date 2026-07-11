## Context

D-045 already split stage/close; D-046/D-047 already covered deploy
pipeline and migrations. This leaf closes the two remaining gaps D-025/D-026
explicitly deferred: promotion granularity and the hotfix procedure.

## Goals / Non-Goals

**Goals:**
- Make promotion granularity (one-at-a-time) an explicit decision.
- Define the full hotfix procedure: branch, merge, mandatory staging sync,
  recording expectations.

**Non-Goals:**
- Building batch-promotion tooling — considered and rejected (see
  Decisions).
- A formal release/semver ceremony — that's `rbo-product-release`'s job
  (separate, later, at actual go-live), not this leaf.
- Skill implementation — already shipped in `ai-skills` v0.7.0
  (`uniform-hotfix-exception`, ai-skills#10). This leaf is the platform-side
  decision record.

## Decisions

- **One-change-at-a-time promotion**, not batched. `rbo-close-change`'s
  merge already promotes everything on `staging` when closing any one
  staged change — rather than building tooling to promote selectively,
  the team's practice is simply not to close one staged change while
  another unrelated one is still mid-validation on the same branch.
- **Hotfix reuses the non-CI/CD code path** (`ai-skills` decision, already
  shipped) via the `hotfix/<name>` branch prefix — no new merge mechanism
  on the platform side.
- **Mandatory `main`→`staging` sync post-hotfix.** Git merges are additive,
  so a later `staging`→`main` promotion wouldn't literally delete the
  hotfix — but if the same file is also mid-change on `staging`, skipping
  the sync risks a real conflict or silent divergence. Cheap to do
  immediately, expensive to discover missing later.
- **No per-use decision log.** `decisions.md` records the procedure once;
  logging every individual hotfix as its own entry would be ceremony
  disproportionate to an exception mechanism — same reasoning already
  applied to migration notifications/rollback in D-046/D-047.

## Risks / Trade-offs

- **[Risk]** One-at-a-time promotion could become a real constraint if the
  team scales beyond solo/family. → **Mitigation**: not a closed door —
  revisit if concurrent staged changes become a recurring real need.
