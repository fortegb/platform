## ADDED Requirements

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

### Requirement: The manage-visit screen shows a universal condominium notice
The manage-visit screen SHALL display an inline condominium/portaria notice on every actionable variant, informing the visitor to identify themselves at the gatehouse on arrival, without hiding it behind a modal or expander.

Every ForteGB house is currently inside a condomínio, so the notice is unconditional; a future non-condomínio house is a separate development.

#### Scenario: Actionable visit shows the notice
- **WHEN** the manage-visit screen renders an actionable (manageable) variant
- **THEN** an inline notice beside the address tells the visitor to identify themselves at the portaria on arrival
- **AND** the notice is visible without any click
