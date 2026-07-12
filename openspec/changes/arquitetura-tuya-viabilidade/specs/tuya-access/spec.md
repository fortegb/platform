# Tuya smart-lock access provisioning

## ADDED Requirements

### Requirement: Access provisioning hidden behind an adapter seam
The system SHALL provision and revoke house access credentials for guided visits through an adapter interface (`provisionAccess`, `markUsed`, `revoke`) that hides the underlying access mechanism from the rest of the visit journey. Identity verification, booking, CRM sync, and WhatsApp delivery code SHALL depend only on this interface, never on a specific mechanism implementation.

#### Scenario: Swapping the mechanism does not touch the journey
- **WHEN** the active access-provisioning implementation changes from `local-pool` to `tuya-live`
- **THEN** identity verification, booking, CRM sync, and WhatsApp delivery code are unchanged

### Requirement: local-pool is the default v2 mechanism
The `local-pool` implementation SHALL be the default access-provisioning mechanism for guided visits, assigning a pre-provisioned per-house code without a real-time call to the Tuya Cloud API in the critical path. The `tuya-live` implementation (real-time Tuya Cloud API password creation) SHALL NOT become the default until an empirical spike confirms the Cloud API supports temporary/time-windowed passwords for the deployed device and visit volume justifies the added automation.

#### Scenario: Visit access is provisioned from the local pool
- **WHEN** a visit's access credential is provisioned under the default configuration
- **THEN** the system assigns an available code from that house's local pool and marks it assigned
- **AND** it does not make a synchronous Tuya Cloud API call to create that code

### Requirement: Fallback chain on provisioning failure
WHEN access provisioning fails or cannot be confirmed by the time it is needed, the system SHALL fall back to a static per-house emergency code relayed to the visitor by staff, and SHALL reschedule the visit if staff cannot be reached in time. The system SHALL NOT rely on staff physically traveling to the house as a designed fallback tier. Failure SHALL be detected synchronously at issuance time (API error, timeout, or device reported offline); the system SHALL NOT depend on the visitor reporting the failure. The instant/QR visit flow SHALL use a shorter failure-detection timeout than the scheduled visit flow.

#### Scenario: Live provisioning fails during a scheduled visit
- **WHEN** the active mechanism fails to confirm a credential before a scheduled visit
- **THEN** staff is notified immediately via WhatsApp
- **AND** staff relays the house's current emergency code, or the visit is rescheduled if staff cannot be reached in time

#### Scenario: Live provisioning fails during an instant/QR visit
- **WHEN** the active mechanism fails to confirm a credential while a visitor is on-site via the QR flow
- **THEN** the failure is detected and staff is alerted faster than in the scheduled-visit case, reflecting the visitor waiting at the door

### Requirement: Emergency code lifecycle and audit
Each house's emergency code SHALL be scoped to that house only, never shared across the portfolio. The code SHALL rotate on a monthly schedule and SHALL also rotate immediately after any real fallback use. Every fallback trigger SHALL be logged with the house, timestamp, and staff member who relayed the code, in a Supabase table with restricted access.

#### Scenario: Emergency code used and rotated
- **WHEN** staff relays a house's emergency code as a fallback
- **THEN** the usage is logged with house, timestamp, and staff member
- **AND** that house's emergency code is rotated before it is used again

### Requirement: Safe-target isolation for sale-house locks
A Tuya lock installed on a house currently offered for sale SHALL NOT be used as the default safe-target device for staging or Preview environments. Automated safe-target testing of the access-provisioning flow SHALL require a dedicated test lock, separate from any lock installed on a house for sale.

#### Scenario: Staging never targets the sale-house lock
- **WHEN** the staging or Preview environment resolves its default integration posture for Tuya (per the integration-tier model)
- **THEN** it does not target a lock installed on a house currently for sale
