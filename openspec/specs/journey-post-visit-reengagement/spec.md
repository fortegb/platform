# journey-post-visit-reengagement Specification

## Purpose
The post-visit and re-engagement journey — from the pre-visit reminder, through the visitor's no-authentication self-service management of their own visit (cancel and reschedule), to timing-classified post-visit follow-up. Owns the journey's message-trigger rules, the manage-visit screen surface at `/visita/gerenciar/[token]`, and the follow-up consent policy end to end.
## Requirements
### Requirement: Pre-visit reminder is sent transactionally
The system SHALL send a reminder message approximately 24 hours before a
scheduled visit's date/time, classified as transactional under
`messaging-channel-policy`, requiring no separate consent beyond the
visitor's mandatory WhatsApp field.

#### Scenario: Reminder sent ahead of a scheduled visit
- **WHEN** a scheduled visit's date/time is approximately 24 hours away
- **THEN** a reminder message is queued to the visitor
- **AND** no marketing opt-in is required to send it

### Requirement: Visit management link is delivered on existing messages
The system SHALL include a unique, high-entropy, unguessable management
link in the booking-confirmation message and repeat it in the pre-visit
reminder, without introducing a separate message solely for link delivery.

#### Scenario: Link appears on the confirmation message
- **WHEN** a visit booking is confirmed
- **THEN** the confirmation WhatsApp message includes a management link
  unique to that visit

#### Scenario: Link is repeated on the reminder
- **WHEN** the pre-visit reminder is sent
- **THEN** it includes the same management link

### Requirement: Management link opens a no-authentication self-service page
The system SHALL, when the management link is opened, display the
associated visit's details and Cancel/Reschedule actions without requiring
the visitor to log in or authenticate.

#### Scenario: Visitor opens the management link
- **WHEN** a visitor opens their visit's management link
- **THEN** they see their visit's house, date/time, and status
- **AND** they are not prompted to log in

#### Scenario: Link stops working once the visit reaches a terminal state
- **WHEN** a visit has already reached `completed`, `cancelled`, or
  `declined`, or its scheduled time has passed
- **THEN** the management link no longer offers Cancel/Reschedule actions

### Requirement: Cancelling revokes any already-provisioned access
The system SHALL, when a visitor cancels via the management page, set
`visit.status` to `cancelled` — a status distinct from `declined` — and,
if the visit had already reached `access_provisioned`, call the
`tuya-access` adapter's `revoke(credential)`.

#### Scenario: Cancel before access is provisioned
- **WHEN** a visitor cancels a visit that has not yet reached
  `access_provisioned`
- **THEN** `visit.status` is set to `cancelled`
- **AND** no `revoke` call is made, since no credential was issued

#### Scenario: Cancel after access is provisioned
- **WHEN** a visitor cancels a visit whose `visit.status` is
  `access_provisioned`
- **THEN** `visit.status` is set to `cancelled`
- **AND** `revoke(credential)` is called for that visit's credential

### Requirement: Rescheduling cancels and rebooks, not edits in place
The system SHALL, when a visitor reschedules via the management page,
apply the same cancellation behavior as the Cancel action to the existing
visit, then route the visitor into the standard scheduled-visit booking
flow pre-filled with their known details, rather than mutating the
existing visit's date/time directly.

#### Scenario: Reschedule creates a new visit
- **WHEN** a visitor reschedules
- **THEN** the original visit is cancelled per the cancellation
  requirement above
- **AND** a new visit is created through the same booking flow used for a
  first-time booking, with the visitor's name and phone pre-filled

### Requirement: Staff is alerted on cancellation or reschedule
The system SHALL queue a Telegram notification to staff when a visitor
cancels or reschedules a visit, since this is a purely internal
notification with no external party as recipient.

#### Scenario: Staff notified of a cancellation
- **WHEN** a visitor cancels a visit
- **THEN** a Telegram message is queued to staff noting the cancellation

### Requirement: Post-visit follow-up is classified by timing
The system SHALL treat post-visit follow-up messages sent the same day or
within 24 hours of the visit as transactional, requiring no additional
consent, and SHALL treat follow-up messages sent 3 or more days after the
visit, or with promotional/nurture content, as marketing, requiring
explicit opt-in consent that defaults to off.

#### Scenario: Same-day check-in requires no opt-in
- **WHEN** a follow-up message is sent the same day or within 24 hours of
  a completed visit
- **THEN** it is sent without requiring marketing opt-in

#### Scenario: Later nurture message requires opt-in
- **WHEN** a follow-up message is sent 3 or more days after the visit, or
  contains promotional content (e.g. similar listings)
- **THEN** it is only sent if the recipient has explicitly opted in to
  marketing messages

### Requirement: Capability purpose is stated
The `journey-post-visit-reengagement` capability SHALL declare a written Purpose describing the journey it covers, and SHALL NOT leave it as the `TBD` placeholder emitted by the archive step.

Purpose as written: *the post-visit and re-engagement journey — from the pre-visit reminder, through the visitor's no-authentication self-service management of their own visit (cancel and reschedule), to timing-classified post-visit follow-up. Owns the journey's message-trigger rules, the manage-visit screen surface at `/visita/gerenciar/[token]`, and the follow-up consent policy end to end.*

#### Scenario: Purpose is read for a fit check
- **WHEN** a change proposes to append a requirement to `journey-post-visit-reengagement`
- **THEN** its `Purpose` line names the journey it covers, not `TBD - created by archiving change ...`

### Requirement: The manage-visit screen renders a variant per stored visit status
The manage-visit screen SHALL derive which variant it renders from the visit's stored status, never from the URL, and SHALL provide a designed state for every branch of the journey: manageable (before access provisioned, access provisioned, and verification pending review), cancelled, completed, declined, scheduled-time-passed, and invalid-token.

An outcome encoded in the URL can contradict the visit's actual state; the status is the single source.

#### Scenario: Manageable visit before access provisioning
- **WHEN** a visitor opens the management link for a non-terminal visit that has not reached `access_provisioned`
- **THEN** the screen shows the visit details and offers Cancel and Reschedule
- **AND** a cancel would not call `revoke`, since no credential exists yet

#### Scenario: Manageable visit with a live access code
- **WHEN** a visitor opens the management link for a visit whose status is `access_provisioned`
- **THEN** the screen shows the visit details and offers Cancel and Reschedule
- **AND** the Cancel path is the state-aware confirmation that warns the code will be deactivated

#### Scenario: Read-only terminal visit
- **WHEN** a visitor opens the management link for a visit that is `cancelled`, `completed`, or `declined`, or whose scheduled time has passed
- **THEN** the screen shows the visit read-only and offers no Cancel or Reschedule action
- **AND** a `declined` visit is presented distinctly from a `cancelled` one, preserving the security signal (D-061)

#### Scenario: Invalid or unknown token
- **WHEN** the management link's token resolves to no visit
- **THEN** the screen shows the same generic "link inválido" surface used elsewhere, with a WhatsApp contact
- **AND** it does not reveal whether the token was ever valid

### Requirement: Cancel is confirmed with a state-aware warning
The manage-visit screen SHALL require an explicit confirmation before cancelling, and the confirmation SHALL state that the access code will be deactivated immediately when — and only when — the visit has already reached `access_provisioned`.

A one-click cancel on a no-authentication page is too easily triggered for an action that revokes a live door credential.

#### Scenario: Confirming cancel on a provisioned visit
- **WHEN** a visitor initiates Cancel on a visit whose status is `access_provisioned`
- **THEN** the confirmation states the access code will be deactivated immediately
- **AND** the visit is only set to `cancelled` after the visitor confirms

#### Scenario: Confirming cancel before provisioning
- **WHEN** a visitor initiates Cancel on a visit that has not reached `access_provisioned`
- **THEN** the confirmation is a plain are-you-sure without a code-deactivation warning
- **AND** the visit is only set to `cancelled` after the visitor confirms

### Requirement: Reschedule cancels the original visit only on confirmation of the new slot
The manage-visit screen SHALL, when a visitor reschedules, keep the original visit active while routing the visitor into the standard booking flow pre-filled with their known details, and SHALL cancel the original visit only once the new booking is confirmed — not at the moment Reschedule is initiated.

This amends D-061's literal cancel-then-rebook ordering to preserve its intent (reschedule via the normal flow, reuse verification) without letting an abandoned booking silently leave the visitor with no visit. See `decisions.md` (D-061 amendment).

#### Scenario: Visitor abandons the new booking
- **WHEN** a visitor initiates Reschedule and then leaves the booking flow without confirming a new slot
- **THEN** the original visit remains active and unchanged

#### Scenario: Visitor confirms a new slot
- **WHEN** a visitor completes a new booking after initiating Reschedule
- **THEN** the original visit is cancelled per the cancellation behavior, including `revoke(credential)` if it had been provisioned
- **AND** the new visit exists as a normal booking

### Requirement: The booking flow announces a reschedule when entered from Reschedule
The booking flow SHALL, when entered via the manage-visit Reschedule action, present itself as a reschedule — labelling the screen accordingly and restating that the original visit stays active until the new slot is confirmed — rather than appearing as an indistinguishable first-time booking.

Without this, a visitor who taps Reschedule lands on a screen titled like a new booking, with no signal that it relates to their existing visit.

#### Scenario: Arriving from Reschedule
- **WHEN** a visitor reaches the booking flow via the manage-visit Reschedule action
- **THEN** the screen identifies the action as rescheduling their existing visit
- **AND** it states the current visit is cancelled only once the new slot is confirmed

#### Scenario: Arriving as a first-time booking
- **WHEN** a visitor reaches the booking flow directly (not via Reschedule)
- **THEN** no reschedule context is shown and the screen reads as a normal new booking

### Requirement: The manage-visit screen shows a universal condominium notice
The manage-visit screen SHALL display an inline condominium/portaria notice on every actionable variant, informing the visitor to identify themselves at the gatehouse on arrival, without hiding it behind a modal or expander.

Every ForteGB house is currently inside a condomínio, so the notice is unconditional; a future non-condomínio house is a separate development.

#### Scenario: Actionable visit shows the notice
- **WHEN** the manage-visit screen renders an actionable (manageable) variant
- **THEN** an inline notice beside the address tells the visitor to identify themselves at the portaria on arrival
- **AND** the notice is visible without any click

