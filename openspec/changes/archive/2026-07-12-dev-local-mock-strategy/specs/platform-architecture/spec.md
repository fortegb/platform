## ADDED Requirements

### Requirement: Mock posture defaults to happy path
Every vendor adapter's `mock` posture implementation SHALL return a
successful, realistic-shaped response by default. It SHALL NOT require any
configuration to produce a working happy-path response.

#### Scenario: Default local dev call
- **WHEN** a vendor adapter is called under the `mock` posture with no
  override set
- **THEN** it returns a successful response shaped like the real API's
  success response

### Requirement: Mock failure override is a per-vendor boolean env var
Each vendor adapter's mock implementation SHALL support forcing a failure
response via a dedicated environment variable following the
`MOCK_<VENDOR>_FORCE_ERROR` naming convention. This SHALL be the only
override mechanism — no config file, no code parameter, no per-call option.

#### Scenario: Developer forces a failure
- **WHEN** a developer sets `MOCK_<VENDOR>_FORCE_ERROR=true` in
  `.env.local` for a given vendor
- **THEN** that vendor's adapter returns a failure response instead of the
  default success response

### Requirement: Mock failure override is not parameterized by failure type
The mock failure override SHALL NOT support specifying a particular failure
type (HTTP status code, timeout, malformed response, etc.) — a single
generic failure SHALL be sufficient. Failure-type-specific behavior SHALL
be validated against the safe-target tier instead.

#### Scenario: Developer needs to test a specific error code path
- **WHEN** code needs to handle a specific vendor error type differently
- **THEN** that is validated against the real sandbox API at the
  safe-target tier, not by parameterizing the local mock further

### Requirement: Mocks live inside each vendor's adapter module
Mock implementations SHALL live inside the same adapter module as the real
implementation for that vendor, selected by posture at the existing
adapter boundary. A separate, centralized mocks directory SHALL NOT be
introduced.

#### Scenario: Locating a vendor's mock
- **WHEN** looking for a vendor's mock implementation
- **THEN** it is found inside that vendor's own adapter module, not a
  separate shared location
