## ADDED Requirements

### Requirement: Account registration collects profile and creates a pending corretor
The system SHALL, when a person registers as a corretor, collect terms
acceptance and a profile (CRECI optional, WhatsApp number mandatory),
assign `role = corretor` per the RBAC model, and set `corretor.status` to
`pending_approval`.

#### Scenario: New corretor completes registration
- **WHEN** a person completes signup, accepts terms, and submits their
  profile with a WhatsApp number
- **THEN** their account is created with `role = corretor` and
  `corretor.status = pending_approval`

#### Scenario: CRECI is optional
- **WHEN** a corretor submits their profile without a CRECI number
- **THEN** registration still succeeds

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
