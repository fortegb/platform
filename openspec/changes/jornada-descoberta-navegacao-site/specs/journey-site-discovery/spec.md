## ADDED Requirements

### Requirement: Visitor discovery flow requires no authentication
The system SHALL allow navigation through the discovery journey — Home →
Portfólio (lista) → Portfólio (detalhe) → Blog (lista/post) → Contato —
without authentication, and SHALL NOT persist any Visitante-specific
session or per-visitor identity beyond the lead records created by the
capture requirements below.

#### Scenario: Anonymous browsing end to end
- **WHEN** a visitor navigates from the home page through portfólio,
  a house detail page, and the blog without ever logging in
- **THEN** every page loads successfully
- **AND** no session, account, or Visitante entity is created

#### Scenario: Journey ends at a lead-capture action
- **WHEN** a visitor reaches the Contato step or a WhatsApp CTA elsewhere in
  the journey
- **THEN** their only two ways to leave a trace are the WhatsApp CTA and the
  contact form, both governed by the capture requirements below

### Requirement: WhatsApp CTA click captures a lead
The system SHALL, immediately before opening any WhatsApp CTA link on the
discovery journey (home, portfólio detalhe, contato), send a
fire-and-forget lead-capture request that creates or updates a
`Contato`-tier `cliente` record tagged `fonte: cta-whatsapp`, without
blocking or delaying the WhatsApp navigation.

#### Scenario: Visitor clicks WhatsApp CTA on a house detail page
- **WHEN** a visitor clicks "Falar no WhatsApp" on a portfólio detalhe page
- **THEN** a lead-capture request is sent tagged `fonte: cta-whatsapp`
- **AND** the WhatsApp link opens without waiting for that request to
  complete

#### Scenario: Lead-capture request fails silently
- **WHEN** the fire-and-forget lead-capture request fails or times out
- **THEN** the visitor's navigation to WhatsApp is unaffected
- **AND** no error is shown to the visitor

### Requirement: Contact form submission captures a lead
The system SHALL, on contact form submission, create or update a
`Contato`-tier `cliente` record tagged `fonte: form-site` using the
submitted contact details, synced to HubSpot per the existing
`crm-source-of-truth` model.

#### Scenario: Successful form submission creates a lead
- **WHEN** a visitor submits the contact form with name, email, phone, and
  message
- **THEN** a `Contato`-tier `cliente` record is created or updated, tagged
  `fonte: form-site`
- **AND** the record is synced to HubSpot per `crm-source-of-truth`

### Requirement: WhatsApp deep links are not platform-originated sends
The system SHALL treat `wa.me` CTA links on this journey as visitor-
initiated browser navigation, not as platform-originated messages, and
SHALL NOT require them to be routed through the asynchronous messaging
queue that `messaging-channel-policy` mandates for platform-sent messages.

#### Scenario: WhatsApp CTA does not require queuing
- **WHEN** a visitor clicks a WhatsApp CTA on this journey
- **THEN** the platform opens a `wa.me` link directly in the visitor's
  browser
- **AND** this is not treated as a queued platform message under
  `messaging-channel-policy`
