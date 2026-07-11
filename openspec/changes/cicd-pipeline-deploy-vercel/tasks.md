## 1. Docs

- [x] 1.1 Add D-046 to `docs/planning/decisions.md` (+ mirror entry in
      `DECISIONS.md`): deploy trigger, branch protection scope, rollback,
      staging-bootstrap timing, no custom notifications.
- [x] 1.2 Create `docs/planning/templates/cicd-deploy-pipeline.md` covering
      the same content as a standalone reference.
- [x] 1.3 Update pointers: `environments.md` (branch protection + rollback +
      staging-bootstrap timing sections), `architecture.md` if it references
      deploy pipeline.
- [x] 1.4 Update `STATUS.md` (`PRÓXIMO` → next leaf) and `CHANGELOG.md`.

## 2. Close-out prep

- [ ] 2.1 Human validation of docs.
- [ ] 2.2 Archive → merge `feat/*` → `main` directly (`origin/staging` does
      not exist yet — matches how #166 itself was closed) with `Closes #167`.
