## ADDED Requirements

### Requirement: Admin-only screens live under /staff/*, not a separate tree
The system SHALL provide role assignment, platform flags, and API-key
status screens under the `/staff/*` namespace, gated to `admin`-level
access, and SHALL NOT introduce a separate `/admin/*` route tree.

#### Scenario: Admin screens use the shared namespace
- **WHEN** an admin-level user accesses role assignment, platform flags,
  or API-key status
- **THEN** the route is under `/staff/*`
- **AND** no route exists under a separate `/admin/*` prefix

#### Scenario: Staff-level users cannot reach admin-only screens
- **WHEN** a `staff`-role user (not `admin`) attempts to access one of
  these screens
- **THEN** access is denied

### Requirement: Admin invites new staff/admin users by email with a pre-assigned role
The system SHALL allow an admin-level user to invite a new user by email
with a pre-assigned `role` (`staff` or `admin`), and SHALL allow the
invited person to complete their own signup via that invite, arriving
with the assigned role already set — without a separate approval step.

#### Scenario: Invited user signs up with role pre-set
- **WHEN** an admin invites a new user with `role: staff`
- **AND** that person completes signup via the invite
- **THEN** their account has `role = staff` immediately, with no pending-
  approval state

#### Scenario: Admin can change an existing user's role
- **WHEN** an admin changes an existing staff or admin user's role
- **THEN** the new role replaces the old one directly, per the single-
  role-per-user model already established

### Requirement: API key management is read-only reference, not an editor
The system SHALL display the connection/configuration status of
third-party integrations (Tuya, HubSpot, WhatsApp) to admin-level users,
and SHALL NOT store, display, or accept actual API key values anywhere
in the platform's own database or UI.

#### Scenario: Admin views integration status
- **WHEN** an admin-level user opens the integrations screen
- **THEN** they see whether each integration is configured/connected
- **AND** no actual key value is shown or editable

### Requirement: Maintenance mode is a live, instantly-toggleable flag
The system SHALL store the maintenance-mode flag in the application
database (not as a build-time environment variable), read it on every
public-site request, and allow any admin-level user to toggle it
immediately without requiring a deployment.

#### Scenario: Admin enables maintenance mode
- **WHEN** an admin-level user toggles maintenance mode on
- **THEN** the public site begins showing a maintenance page on the next
  request, without any redeploy

#### Scenario: Toggling does not require ForteGB-tech-level access
- **WHEN** an admin-level user who is not "ForteGB tech" toggles
  maintenance mode
- **THEN** the toggle succeeds

### Requirement: Hide-house is handled by the CMS, not a platform admin screen
The system SHALL NOT provide a house-visibility toggle in the platform's
own admin UI; hiding a house from the public site SHALL be accomplished
through the CMS vendor's existing draft/unpublish workflow.

#### Scenario: No hide-house control exists in the platform admin UI
- **WHEN** an admin-level user looks for a way to hide a house listing
  within the platform's own screens
- **THEN** no such control exists — the action is performed in the CMS
