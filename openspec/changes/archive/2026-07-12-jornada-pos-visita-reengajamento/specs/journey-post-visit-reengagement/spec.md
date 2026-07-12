## ADDED Requirements

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
