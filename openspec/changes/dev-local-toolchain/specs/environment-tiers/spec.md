## ADDED Requirements

### Requirement: Local toolchain inventory
The local dev toolchain SHALL consist of exactly four tools: Node.js,
Docker or OrbStack (per D-032), Supabase CLI (per D-031), and ngrok. No
tool SHALL be added to this baseline list without a documented reason.

#### Scenario: New developer setup
- **WHEN** a developer sets up local dev for the first time
- **THEN** the toolchain list they need is exactly these four tools, no
  more, no fewer

### Requirement: Node version is pinned by both nvmrc and engines
Node's required version SHALL be declared in both a `.nvmrc` file and the
`engines` field of `package.json`. Neither mechanism SHALL be considered a
substitute for the other.

#### Scenario: Developer runs nvm use
- **WHEN** a developer runs `nvm use` in the repo root
- **THEN** `.nvmrc` selects the correct Node version

#### Scenario: Developer skips nvm use
- **WHEN** a developer runs `npm install` without having run `nvm use`
  first, on a mismatched Node version
- **THEN** the `engines` field causes npm to warn about the mismatch

### Requirement: No version pinning for the remaining toolchain
Docker/OrbStack, Supabase CLI, and ngrok SHALL NOT have a pinned minimum
version documented. "Latest stable" SHALL be the standing expectation for
these tools.

#### Scenario: Toolchain doc references these tools
- **WHEN** the toolchain inventory documents Docker/OrbStack, Supabase CLI,
  or ngrok
- **THEN** no specific version number is listed for any of them

### Requirement: ngrok remains optional and tunnel-only
ngrok SHALL be documented as optional, used only for deliberately testing a
real inbound webhook against local dev — never a baseline requirement for
ordinary local development, per D-040's mock-by-default posture.

#### Scenario: Ordinary local dev session
- **WHEN** a developer runs local dev without testing real inbound webhooks
- **THEN** ngrok is not required to be running or installed for that
  session to work
