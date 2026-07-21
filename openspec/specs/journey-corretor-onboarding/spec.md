# journey-corretor-onboarding Specification

## Purpose
TBD - created by archiving change jornada-onboarding-corretor. Update Purpose after archive.
## Requirements
### Requirement: Account registration collects profile and creates a pending corretor
The system SHALL, when a person registers as a corretor, collect terms
acceptance and a profile (CRECI optional, WhatsApp number mandatory, CPF
mandatory), assign `role = corretor` per the RBAC model, and set
`corretor.status` to `pending_approval`.

#### Scenario: New corretor completes registration
- **WHEN** a person completes signup, accepts terms, and submits their
  profile with a WhatsApp number and CPF
- **THEN** their account is created with `role = corretor` and
  `corretor.status = pending_approval`

#### Scenario: CRECI is optional
- **WHEN** a corretor submits their profile without a CRECI number
- **THEN** registration still succeeds

#### Scenario: CPF is mandatory
- **WHEN** a corretor submits their profile without a CPF
- **THEN** registration does not succeed

### Requirement: Portal access is gated on approval status, not role alone
The system SHALL restrict full portal functionality to corretor accounts
with `status = approved`, and SHALL show a pending or rejected corretor a
status page instead of the dashboard, without fully blocking their ability
to log in and see their own status.

#### Scenario: Pending corretor logs in
- **WHEN** a corretor with `status = pending_approval` logs in
- **THEN** they see a page indicating their application is under review,
  not the dashboard

#### Scenario: Approved corretor reaches the dashboard
- **WHEN** a corretor with `status = approved` logs in
- **THEN** they reach the normal corretor dashboard

### Requirement: Staff reviews pending applications and house claims on one page
The system SHALL present staff-level users with a single management page
listing both pending corretor account applications and pending
`corretor_casa` house-claim requests.

#### Scenario: Both queue types appear together
- **WHEN** a staff-level user opens the corretor management page
- **THEN** pending account applications and pending house claims are both
  visible on that page

### Requirement: No push notification is sent for pending onboarding items
The system SHALL NOT send a push notification (Telegram or otherwise) when
a new corretor application or house-claim request becomes pending; staff
discovers pending items by visiting the management page.

#### Scenario: New application creates no notification
- **WHEN** a corretor completes registration
- **THEN** no Telegram or WhatsApp message is sent to staff

### Requirement: Rejection notifies the corretor via WhatsApp
The system SHALL, when staff rejects a pending account application or
house-claim request, queue a WhatsApp message to the corretor explaining
the outcome.

#### Scenario: Rejected corretor is notified
- **WHEN** staff rejects a corretor's account application
- **THEN** a WhatsApp message explaining the rejection is queued

### Requirement: Claiming a house shows the contract draft immediately
The system SHALL, when an approved corretor claims a house, create a
`corretor_casa` record with `status = pending` and display the unsigned
contract draft (minuta), rendered from the existing contract template with
house-specific terms, on both the corretor's claim page and staff's
corresponding review item.

#### Scenario: Minuta visible before signing
- **WHEN** a corretor claims a house
- **THEN** the unsigned contract draft is immediately visible on their
  claim page
- **AND** the same draft is visible on staff's review item for that claim

### Requirement: Contract signing is not tracked by the platform
The system SHALL NOT provide an in-app e-signature mechanism or track the
signing process itself; signing SHALL occur outside the platform.

#### Scenario: No signature workflow exists in-app
- **WHEN** a corretor and staff coordinate signing a house contract
- **THEN** the platform provides no signature capture, status tracking, or
  reminder mechanism for that coordination

### Requirement: Staff uploads the signed contract, which is the approval act
The system SHALL allow only staff-level users to upload the signed
contract PDF for a pending `corretor_casa`, storing it in the existing
private document bucket, and SHALL transition that `corretor_casa` to
`status = approved` as part of the same upload action — not a separate
confirmation step.

#### Scenario: Upload approves the house claim
- **WHEN** staff uploads a signed contract PDF for a pending
  `corretor_casa`
- **THEN** the file is stored in the private document bucket
- **AND** `corretor_casa.status` becomes `approved` in the same action

#### Scenario: Corretor cannot upload the contract themselves
- **WHEN** a corretor attempts to upload a signed contract for their own
  pending house claim
- **THEN** the system does not permit it

#### Scenario: Rejection requires no upload
- **WHEN** staff rejects a pending house-claim request
- **THEN** no file upload is required or produced

### Requirement: Signed contract is visible to both parties after approval
The system SHALL, once a `corretor_casa` is approved, make the uploaded
signed contract viewable by both the attributed corretor and staff-level
users.

#### Scenario: Corretor can view their signed contract
- **WHEN** a corretor's house claim has been approved
- **THEN** they can view the signed contract on their claim page

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

