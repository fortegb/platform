## ADDED Requirements

### Requirement: Promotion happens one staged change at a time
Closing a staged change SHALL be treated as promoting everything currently
on `staging` to `main`, not just that one change. A staged change SHALL NOT
be closed while another unrelated change is also staged and still
mid-validation on the same branch.

#### Scenario: Single staged change ready to promote
- **WHEN** exactly one change is staged on `staging` and validated
- **THEN** closing it promotes that change's content to `main` with no
  unrelated in-flight work mixed in

#### Scenario: Two changes staged simultaneously
- **WHEN** a second change is staged on `staging` while a first is still
  mid-validation
- **THEN** the first change is not closed until the second is also ready,
  since closing either promotes both

### Requirement: Hotfix branches from main and bypasses staging
A hotfix SHALL branch as `hotfix/<name>` from `main` and SHALL be closed via
the sanctioned exception that merges directly to `main`, bypassing the
normal staging requirement. It SHALL still go through normal issue and
OpenSpec change tracking — only the staging step is skipped.

#### Scenario: Urgent production fix
- **WHEN** a fix must reach production without waiting for staging
  validation
- **THEN** it is branched as `hotfix/<name>` from `main`
- **AND** it is tracked by a normal issue and OpenSpec change, same as any
  other work

### Requirement: Staging sync is mandatory after a hotfix
`main` SHALL be merged into `staging` immediately after a hotfix lands on
`main`, as a mandatory step of the hotfix procedure, not an optional or
memory-dependent follow-up.

#### Scenario: Hotfix lands on main
- **WHEN** a hotfix merge to `main` completes
- **THEN** `main` is merged into `staging` before any other work continues
- **AND** this happens regardless of whether `staging` currently has other
  changes in flight

### Requirement: Normal tracking satisfies hotfix recording
The normal issue and OpenSpec change trail SHALL be sufficient to satisfy
the recording expectation for a hotfix. A separate decision-log entry SHALL
NOT be required per individual hotfix use — `decisions.md` records the
procedure once, not each invocation of it.

#### Scenario: Hotfix closed and tracked
- **WHEN** a hotfix's issue is closed via its OpenSpec change
- **THEN** that issue/change trail is the complete record of that hotfix
- **AND** no additional `decisions.md` entry is created for that specific
  instance
