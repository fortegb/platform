# journey-tuya-access-management Specification

## Purpose
TBD - created by archiving change jornada-gestao-acesso-tuya. Update Purpose after archive.
## Requirements
### Requirement: Tuya emergency-code management uses Supabase Studio, not custom UI
The system SHALL manage Tuya emergency-code rotation and device-status
review through Supabase Studio, and SHALL NOT provide a custom
application UI for this task unless a future re-evaluation of D-056's
three-part test (multi-step workflow with side effects, domain-specific
rendering, non-technical-staff safety) finds that criterion met.

#### Scenario: Staff rotates an emergency code via Supabase Studio
- **WHEN** staff needs to rotate a house's Tuya emergency code
- **THEN** they do so by editing the record directly in Supabase Studio
- **AND** no dedicated application screen exists for this action

#### Scenario: Device status is read from the existing record, not a monitoring screen
- **WHEN** staff wants to check a house's emergency-code status (last
  rotated, currently in use)
- **THEN** they read it from the Supabase Studio record
- **AND** no proactive device-monitoring dashboard is provided —
  failure detection remains the reactive WhatsApp alert already
  specified by the Tuya adapter's fallback mechanism

