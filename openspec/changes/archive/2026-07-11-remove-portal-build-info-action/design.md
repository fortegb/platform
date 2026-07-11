## Context

Pure CI/tooling housekeeping — removing a redundant, independently-firing
backup workflow. No architectural or product decision involved.

## Goals / Non-Goals

**Goals:**
- Eliminate the two-writer race between the Action and normal session pushes.

**Non-Goals:**
- Changing the local git hook or `npm install` prepare step — both stay
  exactly as they are.
- Building a replacement backup mechanism — the narrow drift risk (an
  un-bootstrapped clone pushing without the hook) is accepted, not solved.

## Decisions

Delete the Action outright rather than trying to make it coexist safely
with rapid session pushes (e.g. rebase-before-push logic) — the gap it
covers is narrow and the local hook already covers the common case
completely.

## Risks / Trade-offs

- **[Risk]** A push from a clone where `npm install` never ran could leave
  `build-info.json` stale until the next docs commit from a bootstrapped
  clone. → **Mitigation**: accepted — narrow, self-correcting on the next
  normal docs push from any properly set up clone.
