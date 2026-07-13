## MODIFIED Requirements

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
