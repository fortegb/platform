## 1. Remove the Action

- [x] 1.1 Delete `.github/workflows/portal-build-info.yml`.
- [x] 1.2 Update `AGENTS.md` "Platform docs" section: three-layer → two-layer
      (git hook + `npm install` prepare; no GitHub Action backup).

## 2. Close-out prep

- [ ] 2.1 Human validation.
- [ ] 2.2 Archive with `--skip-specs` (no capability changes) → merge
      `feat/*` → `main` directly (`origin/staging` still doesn't exist) with
      `Closes #178`.
