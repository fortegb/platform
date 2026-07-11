## 1. Docs

- [x] 1.1 Add D-047 to `docs/planning/decisions.md` (+ mirror in
      `DECISIONS.md`): manual apply, trigger points, commit-message
      traceability, no automated pending-migration check.
- [x] 1.2 Update pointer in `environments.md` (near D-031/D-032 migration
      section) referencing D-047.
- [x] 1.3 Update `STATUS.md` (`PRÓXIMO` → next leaf) and `CHANGELOG.md`.

## 2. Close-out prep

- [ ] 2.1 Human validation of docs.
- [ ] 2.2 Archive → merge `feat/*` → `main` directly (`origin/staging` still
      doesn't exist — same D-046 gap) with `Closes #168`.

## 3. Companion (separate cycle, not this leaf)

- [ ] 3.1 Note in `ai-skills`: fold migration trigger + commit-message
      convention into `rbo-stage-change` and `rbo-close-change` — flagged
      for a future session, not created as an issue without consent.
