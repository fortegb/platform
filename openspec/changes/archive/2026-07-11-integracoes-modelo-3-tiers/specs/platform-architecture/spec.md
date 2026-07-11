## ADDED Requirements

### Requirement: Integration tier postures

Third-party integrations SHALL operate under one of three postures: `mock` (in-process stub; no real vendor call), `safe-target` (real API aimed at a test/sandbox account or device), or `prod-live` (real API aimed at production resources). Postures are not environments; environments select a default posture.

#### Scenario: Local never opens a real lock by default

- **WHEN** the application runs with `APP_ENV=local` and no override
- **THEN** integrations use the `mock` posture
- **AND** no real smart-lock or paid customer messaging call is made

### Requirement: Default posture by environment

The default posture SHALL be: `local` → `mock`; `staging` and all Vercel Previews → `safe-target`; `prod` → `prod-live`. Non-production environments SHALL NOT default to `prod-live`. Production SHALL NOT default to `mock` or `safe-target`.

#### Scenario: Staging uses safe targets

- **WHEN** the application runs as staging or a Vercel Preview
- **THEN** the default integration posture is `safe-target`

### Requirement: Posture overrides and selection

Overrides SHALL be allowed only when `APP_ENV` is `local` or `staging`, and only among `{mock, safe-target}` — never `prod-live`. When `APP_ENV` is `prod`, the posture SHALL always be `prod-live` with no override. Posture SHALL NOT be inferred from credential presence. The effective posture per integration SHALL be `override[integration] ?? default(APP_ENV)`. The application SHALL select adapters via this effective posture; exact environment variable names are deferred to the config inventory leaf.

#### Scenario: Local opts into sandbox HubSpot

- **WHEN** local development sets an explicit per-integration override to `safe-target`
- **THEN** that integration may call a sandbox/test API
- **AND** it still MUST NOT use `prod-live`
