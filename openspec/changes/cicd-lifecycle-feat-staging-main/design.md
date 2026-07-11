## Context

D-026 mapped branches and specified an opt-in `.rbo/lifecycle.yml` so global close would merge to `staging` when present. Skill code was deferred to #166. Grilling revised the *verbs*:

- Landing on staging must not archive OpenSpec or close the GitHub issue (UAT may fail).
- Closing must mean “sure” — archive + production branch + Done.
- Heavy use of `rbo-close-change` on other repos requires **opt-in only** and fail-closed behavior on ForteGB.

Baseline skill on disk (re-verify before edit): `ai-skills` `rbo-close-change` v0.2 @ `c592594` (includes Platform docs `pages:sync` after Done).

## Goals / Non-Goals

**Goals:**

- Canon (D-045) + `.rbo/lifecycle.yml` + template/spec aligned to stage → UAT → close.
- Skills: new stage skill; close keeps today’s meaning for repos without config; with config, merge **from** `integrationBranch` **to** default branch after archive.
- Fail if `origin/staging` missing on stage; fail on close if lifecycle present but change not on staging.

**Non-Goals:**

- Auto-create `staging`; board Status `Staging`; changing `rbo-product-release`; implementing #167–#169.

## Decisions

1. **Two skills, not three** — `rbo-stage-change` (new) + light edit to `rbo-close-change`. Rejected: overload close to mean “land”; rejected: third `rbo-promote-change` (makes close unused on ForteGB).
2. **`integrationBranch` meaning (BREAKING vs D-026 text)** — not “close merges *to* this branch”. It is the long-lived integration ref: stage merges `feat/*`→it; close archives then merges it→default branch (`main`). Absent file → close unchanged (`feat/*`→`main`).
3. **Archive timing** — only at close (promote to `main`), never at stage.
4. **`pages:sync`** — only on close after board Done (already in close skill); stage does not sync Platform docs.
5. **Board** — after stage, Status remains **In Progress** (defer optional `Staging` Status).
6. **Repo split** — platform change owns contract + yml + docs; skill file edits land in `ai-skills` as companion apply (same #166 DoD).

## Risks / Trade-offs

- [D-026 wording drift] → D-045 explicitly supersedes close semantics; keep branch map of D-026.
- [Stale feat after fix cycles] → close must merge `staging`→`main`, never a stale `feat/*`, when config present.
- [Silent bypass] → with config, close MUST NOT fall back to `feat/*`→`main`.
- [Skill edit collision] → re-read latest `rbo-close-change` immediately before patching; only add lifecycle branch, preserve pages:sync / CHANGELOG requirements.

## Migration Plan

1. Merge platform contract + `.rbo/lifecycle.yml`.
2. Ship `ai-skills` stage skill + close guard; machines pick up via existing skill symlinks.
3. Until remote `staging` exists, `rbo-stage-change` fails loudly (#167).
4. Until skills ship, STATUS keeps the lacuna note.

## Open Questions

- None for this cut (board Status `Staging` deferred by choice).
