# Messaging channel policy

## ADDED Requirements

### Requirement: Channel selection by direction
The system SHALL send any message involving an external party (visitor, customer, or corretor) via WhatsApp. The system SHALL NOT require an external party to use Telegram to receive or send any platform communication. The system MAY use Telegram only for notifications that are purely internal — staff or system alerts with no external party as sender or recipient.

#### Scenario: Corretor notification uses WhatsApp
- **WHEN** the platform sends a notification to a corretor (an external party)
- **THEN** it is sent via WhatsApp, not Telegram

#### Scenario: Internal ops alert may use Telegram
- **WHEN** the platform sends a system alert intended only for ForteGB staff, with no visitor, customer, or corretor involved
- **THEN** it MAY be sent via Telegram

### Requirement: Consent basis differs by message category
Transactional or operational messages (e.g. visit confirmation, access credential delivery, staff escalation, reminders) SHALL be sent without requiring a separate opt-in, on the basis of the recipient's mandatory contact field and the specific action they took to trigger the message. Marketing or promotional messages SHALL require explicit, separately recorded opt-in consent, defaulting to opted out.

#### Scenario: Visit confirmation sent without extra consent
- **WHEN** a visitor books a guided visit and provides their mandatory WhatsApp number
- **THEN** the system may send them transactional messages about that visit without a separate consent checkbox

#### Scenario: Marketing message requires explicit opt-in
- **WHEN** the platform would send a promotional message unrelated to a specific request the recipient made
- **THEN** it does so only if that recipient has explicitly opted in, and never by default

### Requirement: Messaging sends are queued, not synchronous
The system SHALL dispatch outbound WhatsApp and Telegram messages through the platform's asynchronous job queue (QStash) rather than calling the messaging provider synchronously within the request handler that triggers the message.

#### Scenario: Booking request does not block on message delivery
- **WHEN** a visit booking request triggers a confirmation message
- **THEN** the message send is queued for asynchronous delivery
- **AND** the booking request's response does not wait on the messaging provider's API call
