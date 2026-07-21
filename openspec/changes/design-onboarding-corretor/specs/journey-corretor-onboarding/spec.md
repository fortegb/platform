## ADDED Requirements

### Requirement: Capability purpose is stated
The `journey-corretor-onboarding` capability SHALL declare a written Purpose describing the journey it covers, and SHALL NOT leave it as the `TBD` placeholder emitted by the archive step.

Purpose as written: *the corretor onboarding journey — from the public partner-program page and self-registration, through profile into pending-approval, the email-and-WhatsApp status notification, the approval-gated portal, and per-house claim with its off-platform (Gov.br) signed contract. Owns the corretor-facing screens (`/corretor`, `/corretor/onboarding/*`, `/corretor/casas/[id]/contrato`); the staff review surface is its own journey.*

#### Scenario: Purpose is read for a fit check
- **WHEN** a change proposes to append a requirement to `journey-corretor-onboarding`
- **THEN** its `Purpose` line names the journey it covers, not `TBD - created by archiving change ...`

### Requirement: Public self-registration lives at the partner-program page, not the login screen
The system SHALL host public corretor self-registration at the partner-program page (`/corretor`) which routes to `/corretor/onboarding`, and the login screen SHALL only authenticate existing accounts — an unknown e-mail on login SHALL point the person to the partner program rather than creating an account inline.

Signing up as a corretor is a self-service act (D-062: public registration + staff approval); the login screen is a role-agnostic authentication gateway.

#### Scenario: New corretor registers from the partner page
- **WHEN** a person decides to become a corretor from `/corretor`
- **THEN** they proceed to `/corretor/onboarding` to create their account and profile
- **AND** the login screen was not the place they created the account

#### Scenario: Unknown e-mail on login
- **WHEN** a person enters an e-mail with no account on the login screen
- **THEN** they are shown a "conta não encontrada" state that points to the partner program
- **AND** no account is created inline on the login screen

### Requirement: The partner-program page keeps commercial mechanics private
The public partner-program page (`/corretor`) SHALL present the opportunity, the product quality, and the transparency of the working model at a high level, and SHALL NOT expose the commission-protection or lead-registration mechanics — those SHALL appear only after registration.

The page is reachable from the public header by any visitor, including buyers; exposing "first to register a client wins the commission" mechanics there would frame the buyer as a claimed asset and clash with the buyer-facing brand.

#### Scenario: A buyer opens the partner page
- **WHEN** any public visitor opens `/corretor`
- **THEN** they see the partnership invitation, product quality, and a reference to a transparent working model
- **AND** they do not see commission-race or lead-registration mechanics

### Requirement: Self-registration collects credentials and mandatory profile fields on screen
The onboarding screen SHALL collect account credentials (e-mail and password) together with the profile — name, WhatsApp (mandatory), CPF (mandatory), CRECI (optional), and terms acceptance — and SHALL block submission with a visible validation state when e-mail, password, name, WhatsApp, CPF, or terms are missing or invalid, while allowing submission with CRECI blank.

#### Scenario: Missing CPF blocks submission
- **WHEN** a corretor submits the onboarding form without a CPF
- **THEN** the form shows a validation state and does not proceed

#### Scenario: CRECI blank is allowed
- **WHEN** a corretor submits with e-mail, password, name, WhatsApp, CPF, and terms but no CRECI
- **THEN** the form proceeds

#### Scenario: Successful submission enters pending
- **WHEN** a corretor submits a complete, valid form
- **THEN** their account is created with `corretor.status = pending_approval`
- **AND** they are taken to the status screen showing their application is under review

### Requirement: The status screen renders a variant per approval status
The corretor status screen SHALL render a variant derived from the corretor's stored `status` — pending (under review), rejected (terminal), or approved — and SHALL be what a non-approved corretor sees instead of the dashboard when they log in.

#### Scenario: Pending corretor sees the review state
- **WHEN** a corretor with `status = pending_approval` logs in
- **THEN** the status screen tells them their application is under review
- **AND** the dashboard is not shown

#### Scenario: Rejected corretor sees a terminal state with WhatsApp contact
- **WHEN** a corretor with `status = rejected` logs in
- **THEN** the status screen states the application was not approved and offers a WhatsApp link to contact the ForteGB team
- **AND** no edit-and-resubmit action is offered

#### Scenario: Approved corretor passes through to the dashboard
- **WHEN** a corretor with `status = approved` logs in
- **THEN** they reach the normal corretor dashboard rather than the status screen

### Requirement: Account-status results are notified by both e-mail and WhatsApp
The system SHALL, when staff approves or rejects a corretor's account application, queue a notification to the corretor on both channels — e-mail and WhatsApp — using the same uniform policy for approval and rejection.

This extends D-062 (which named only rejection, WhatsApp-only) and introduces e-mail as a transactional account channel (outside the WhatsApp/Telegram scope of `messaging-channel-policy`); see `decisions.md`. Delivery is Execução (#86).

#### Scenario: Approval notifies on both channels
- **WHEN** staff approves a corretor's application
- **THEN** an approval notification is queued to the corretor by e-mail and by WhatsApp

#### Scenario: Rejection notifies on both channels
- **WHEN** staff rejects a corretor's application
- **THEN** a rejection notification is queued to the corretor by e-mail and by WhatsApp

### Requirement: The contract page renders a variant per house-claim status
The per-house contract page SHALL render a variant derived from the `corretor_casa` claim status — pending (unsigned minuta), approved (signed contract), or inaccessible (claim not found or not this corretor's) — and SHALL never render a signed contract for a claim that is not approved.

#### Scenario: Pending claim guides the off-platform Gov.br signing flow
- **WHEN** a corretor opens the contract page for a `corretor_casa` with `status = pending`
- **THEN** the unsigned minuta is shown, rendered from the contract template with house-specific terms
- **AND** the page guides the off-platform flow: download the minuta, sign via Gov.br, send the signed PDF to ForteGB by WhatsApp
- **AND** it states that ForteGB signs and that staff uploading the signed PDF is what approves the claim

#### Scenario: Approved claim shows the signed contract
- **WHEN** a corretor opens the contract page for a `corretor_casa` with `status = approved`
- **THEN** the signed contract is viewable

#### Scenario: Inaccessible claim is refused
- **WHEN** a corretor opens a contract page for a claim that does not exist or is not theirs
- **THEN** the page shows a generic not-available state and does not reveal another corretor's claim
