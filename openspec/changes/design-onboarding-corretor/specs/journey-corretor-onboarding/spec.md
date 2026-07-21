## ADDED Requirements

### Requirement: Capability purpose is stated
The `journey-corretor-onboarding` capability SHALL declare a written Purpose describing the journey it covers, and SHALL NOT leave it as the `TBD` placeholder emitted by the archive step.

Purpose as written: *the corretor onboarding journey — from account creation, through profile registration (WhatsApp, CPF, CRECI, terms) into a pending-approval state, the approval-gated portal entry, and per-house claim with its off-platform-signed contract. Owns the corretor-side screens (`/corretor/onboarding/*`, `/corretor/casas/[id]/contrato`) and the account/house approval lifecycle end to end; the staff-side review surface belongs to its own journey.*

#### Scenario: Purpose is read for a fit check
- **WHEN** a change proposes to append a requirement to `journey-corretor-onboarding`
- **THEN** its `Purpose` line names the journey it covers, not `TBD - created by archiving change ...`

### Requirement: Account creation hands off to a separate onboarding page
The login screen SHALL create only the account (email/password or social) and, for a new corretor, route to a separate `/corretor/onboarding` profile page rather than collecting corretor-specific profile fields inside the login card.

The login screen is shared across roles (auth epic); corretor-specific fields do not belong on it.

#### Scenario: New account routes to onboarding
- **WHEN** a person creates a new account intending to act as a corretor
- **THEN** after account creation they are taken to `/corretor/onboarding` to complete their profile
- **AND** the login screen itself did not ask for CPF, CRECI, or WhatsApp

### Requirement: The onboarding profile form enforces mandatory fields on screen
The onboarding profile screen SHALL present fields for name, WhatsApp (mandatory), CPF (mandatory), CRECI (optional), and terms acceptance, and SHALL block submission with a visible validation state when WhatsApp or CPF is missing or terms are not accepted, while allowing submission with CRECI blank.

#### Scenario: Missing CPF blocks submission
- **WHEN** a corretor submits the profile form without a CPF
- **THEN** the form shows a validation state and does not proceed

#### Scenario: CRECI blank is allowed
- **WHEN** a corretor submits the profile form with WhatsApp, CPF, and terms but no CRECI
- **THEN** the form proceeds

#### Scenario: Successful submission enters pending
- **WHEN** a corretor submits a complete, valid profile
- **THEN** they are taken to the status screen showing their application is under review

### Requirement: The status screen renders a variant per approval status
The corretor status screen SHALL render a variant derived from the corretor's stored `status` — pending (under review), rejected (terminal), or approved — and SHALL be what a non-approved corretor sees instead of the dashboard.

#### Scenario: Pending corretor sees the review state
- **WHEN** a corretor with `status = pending_approval` reaches the portal
- **THEN** the status screen tells them their application is under review
- **AND** the dashboard is not shown

#### Scenario: Rejected corretor sees a terminal state with WhatsApp contact
- **WHEN** a corretor with `status = rejected` reaches the portal
- **THEN** the status screen states the application was not approved and offers a WhatsApp link to contact the ForteGB team
- **AND** no edit-and-resubmit action is offered

#### Scenario: Approved corretor passes through to the dashboard
- **WHEN** a corretor with `status = approved` reaches the portal
- **THEN** they reach the normal corretor dashboard rather than the status screen

### Requirement: The contract page renders a variant per house-claim status
The per-house contract page SHALL render a variant derived from the `corretor_casa` claim status — pending (unsigned minuta), approved (signed contract), or inaccessible (claim not found or not this corretor's) — and SHALL never render a signed contract for a claim that is not approved.

#### Scenario: Pending claim shows the minuta and off-platform signing note
- **WHEN** a corretor opens the contract page for a `corretor_casa` with `status = pending`
- **THEN** the unsigned contract draft (minuta) is shown, rendered from the template with house-specific terms
- **AND** the page states that signing happens off-platform and staff uploads the signed contract

#### Scenario: Approved claim shows the signed contract
- **WHEN** a corretor opens the contract page for a `corretor_casa` with `status = approved`
- **THEN** the signed contract is viewable

#### Scenario: Inaccessible claim is refused
- **WHEN** a corretor opens a contract page for a claim that does not exist or is not theirs
- **THEN** the page shows a generic not-available state and does not reveal another corretor's claim
