## ADDED Requirements

### Requirement: Skipped verification is shown, not silent
The scheduling screen SHALL tell a returning client that identity verification was skipped and why, when the 12-month reuse window applies.

#### Scenario: Returning client within the reuse window
- **WHEN** the WhatsApp number entered matches a `Cliente` whose `identity_verified_at` is within 12 months
- **THEN** the screen advances straight to scheduling confirmation and states that the previous identity verification is still valid, rather than jumping a step with no explanation

### Requirement: Pending staff review renders as an acknowledgement
The scheduling screen SHALL render a pending-review state as a successful receipt of the booking, and SHALL NOT present it as a failure or return the visitor to the form.

#### Scenario: Automatic match fails or is low-confidence
- **WHEN** `client-match` fails or returns low confidence for a scheduled visit
- **THEN** the screen confirms the booking was received and states that confirmation will arrive by WhatsApp before the visit date, with no access password shown and no error styling

### Requirement: Failed access provisioning is visible to the visitor
The confirmation screen SHALL distinguish a booking whose access was provisioned from one whose provisioning failed, and SHALL NOT display an access password that was not written to the lock.

#### Scenario: Provisioning call fails
- **WHEN** `provisionAccess(visit)` fails and the D-052 fallback fires
- **THEN** the screen shows the visit as booked with access pending, states that staff were alerted and will send access details by WhatsApp, and shows no password

#### Scenario: Provisioning succeeds
- **WHEN** the visit reaches `access_provisioned`
- **THEN** the screen shows the access password alongside the date, time, and address

### Requirement: Multi-step scheduling shows progress and allows return
The scheduling flow SHALL indicate which step the visitor is on and SHALL allow returning to the previous step before submission.

#### Scenario: Visitor mistypes a phone number
- **WHEN** a visitor has advanced to the identity-verification step and needs to correct a field from the form step
- **THEN** the flow offers a path back to the form with entered values preserved

### Requirement: The booking result is addressable
The scheduled-visit result SHALL live at its own token-keyed route so it survives a page refresh and can be linked from the WhatsApp confirmation message.

#### Scenario: Visitor opens the link from WhatsApp
- **WHEN** a visitor follows the confirmation link sent after booking
- **THEN** the result screen loads showing that visit's current state, without the visitor re-entering any details

#### Scenario: Visitor refreshes the result screen
- **WHEN** a visitor reloads the result route
- **THEN** the screen renders the same state, rather than losing it to component-local step state

### Requirement: Result variant derives from stored visit status
The result screen SHALL select its variant from the visit's stored status, and the outcome SHALL NOT be addressable independently of that status.

#### Scenario: Outcome encoded in the URL
- **WHEN** a route shape would let a visitor open a "confirmed" result for a visit whose stored status is pending review
- **THEN** that shape is rejected in favour of one token-keyed route whose variant is derived server-side

### Requirement: Journeys do not share screens
A screen SHALL belong to exactly one journey, and a second journey needing a similar surface SHALL get its own screen.

#### Scenario: Two token-keyed visit screens
- **WHEN** the scheduled-visit journey needs a booking-result screen and the post-visit journey needs a manage-booking screen
- **THEN** each journey owns its own route (`/visita/[token]` and `/visita/gerenciar/[token]` respectively) rather than negotiating a shared one
