## ADDED Requirements

### Requirement: Hostname map per environment

The environment contract SHALL define hostnames as follows (definition; provisioning is separate):

| Logical / delivery | Hostnames |
|--------------------|-----------|
| `local` | `localhost` (dev server; no custom DNS) |
| `staging` (branch `staging`) | `staging.fortegb.com` (custom domain on Preview; password per D-027) |
| Preview (`feat/*`, `fix/*`) | Ephemeral `*.vercel.app` only — no per-PR custom domain |
| `prod` (branch `main`) | `fortegb.com` and `www.fortegb.com` on the same Production deployment |

Platform docs SHALL remain on GitHub Pages and MUST NOT be required to share these app hostnames.

#### Scenario: Sócio opens staging bookmark

- **WHEN** a partner opens `https://staging.fortegb.com`
- **THEN** that hostname is the documented stable staging URL for the long-lived `staging` branch
- **AND** feature branch Previews are documented as separate `*.vercel.app` URLs

#### Scenario: Customer opens production

- **WHEN** a customer uses `fortegb.com` or `www.fortegb.com`
- **THEN** both names are documented as Production app hosts for the same deployment

### Requirement: Brazilian TLD redirects to canonical .com

The domains `fortegb.com.br` and `www.fortegb.com.br` SHALL be documented as **HTTP redirects (301)** to `https://fortegb.com`, implemented at registrar or CDN redirect — **not** as additional Vercel app hosts. There SHALL be no `staging.fortegb.com.br` in the contract.

#### Scenario: Visitor hits .com.br

- **WHEN** someone navigates to `fortegb.com.br` or `www.fortegb.com.br`
- **THEN** the documented intent is a permanent redirect to the canonical `.com` production host
- **AND** the Nuxt app is not required to be attached to the `.com.br` names
