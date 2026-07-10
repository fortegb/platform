## 1. Decision & docs

- [x] 1.1 Add **D-032** to `docs/planning/decisions.md` + root `DECISIONS.md`
- [x] 1.2 Create `docs/planning/templates/supabase-local.md` (runbook checklist; OrbStack preferred; init deferred to #171/#43)
- [x] 1.3 Point `templates/environments.md` at the local runbook; fix D-031 “init → #153” wording to #171/#43
- [x] 1.4 Update `ambientes.html` (pt-BR) with short local Supabase / Docker note + link to template
- [x] 1.5 Update `STATUS.md`, `CHANGELOG.md`, `progress-focus.md`, `agents.md` / `architecture.md` as needed
- [x] 1.6 Sync main `openspec/specs/environment-tiers/spec.md`; validate change

## 2. Issue link

- [x] 2.1 Update #153 body: OpenSpec path, branch, grill/propose checkboxes

## 3. Verify

- [x] 3.1 No `supabase/` directory created; docs-only diff
- [x] 3.2 `openspec validate dados-runbook-supabase-local`

> **Do NOT archive or close #153 yet** — wait for human validation, then `rbo-close-change`.
