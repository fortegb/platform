# journey-corretor-client-registration Specification

## Purpose
TBD - created by archiving change jornada-registro-cliente-comissao. Update Purpose after archive.
## Requirements
### Requirement: Broker registration requires CPF
The system SHALL require a CPF as part of broker-initiated client
registration, and SHALL create or promote the resulting record to the
`Cliente` tier — not the CPF-less `Contato` tier used for other, lower-
commitment capture points.

#### Scenario: Registration without CPF is rejected
- **WHEN** a corretor submits a client registration without a CPF
- **THEN** the registration is not accepted

#### Scenario: Registration with CPF creates a Cliente-tier record
- **WHEN** a corretor submits a client registration with a valid CPF
- **THEN** the resulting `cliente` record is at the `Cliente` tier, not
  `Contato`

### Requirement: Registration is gated on an approved corretor_casa
The system SHALL only permit a corretor to register a client for a given
house when an `approved` `corretor_casa` record exists for that corretor
and that house.

#### Scenario: Unapproved corretor cannot register for a house
- **WHEN** a corretor without an `approved` `corretor_casa` for a given
  house attempts to register a client for it
- **THEN** the registration is rejected

#### Scenario: Approved corretor registers normally
- **WHEN** a corretor with an `approved` `corretor_casa` for a given house
  registers a client for it
- **THEN** the registration proceeds

### Requirement: First registration wins via database-enforced uniqueness
The system SHALL enforce the "first registration wins" commission-
protection rule through a database-level transactional uniqueness
constraint on (cliente, casa), SHALL NOT rely on an application-level
check-then-insert sequence to enforce it, and SHALL translate a
constraint violation into a clear "already registered" response
identifying whether the existing registration belongs to the requesting
corretor or another one.

#### Scenario: Concurrent registrations for the same client and house
- **WHEN** two corretores submit a registration for the same CPF and the
  same house at nearly the same time
- **THEN** exactly one registration is accepted, determined by the
  database constraint, not by an application-level pre-check

#### Scenario: Constraint violation is a clear outcome, not a server error
- **WHEN** a registration attempt violates the uniqueness constraint
- **THEN** the corretor sees a message indicating the client is already
  registered (by them or another corretor), not a generic error

### Requirement: Repeat registration by the same corretor is idempotent
The system SHALL, when the same corretor resubmits a registration for a
client and house they already registered, show the existing
registration's current status rather than returning an error.

#### Scenario: Same corretor resubmits
- **WHEN** a corretor submits a registration matching one they already
  created
- **THEN** they see the existing registration's status, not an error

### Requirement: Registration is stamped with a broker-portal source
The system SHALL stamp broker-initiated registrations with `fonte:
portal-corretor`, consistent with the existing lead-source capture model.

#### Scenario: Fonte is recorded
- **WHEN** a corretor registers a client
- **THEN** the resulting record's `fonte` is `portal-corretor`

