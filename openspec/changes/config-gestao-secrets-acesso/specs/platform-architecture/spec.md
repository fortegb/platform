## ADDED Requirements

### Requirement: Secrets ownership and access

The architecture SHALL document that ForteGB tech is the accountable owner of production and staging-class secrets. Non-technical partners SHALL NOT be granted access to Vercel environment variable scopes or vendor API keys by default. Local `.env` files SHALL remain on authorized developer machines only and SHALL stay gitignored.

#### Scenario: Partner uses Preview without env access

- **WHEN** a sócio needs to review a staging Preview
- **THEN** they use the password-gated Preview URL
- **AND** they are not given Vercel environment or API-key access

### Requirement: Secrets handling and rotation

Secrets SHALL NOT be committed to git, published in Platform docs HTML, or pasted into GitHub issues, pull requests, OpenSpec artifacts, or partner chat channels. The architecture SHALL document rotation triggers (leak, device loss, vendor compromise) and an outline leak response (revoke/rotate, update Vercel and local env, record privately). A separate paid secrets manager is NOT required for v1.

#### Scenario: Suspected leaked HubSpot key

- **WHEN** a production HubSpot API key is suspected leaked
- **THEN** the key is revoked/rotated at the vendor
- **AND** Vercel Production (and any affected local copy) is updated
- **AND** the incident note is kept out of public Platform docs
