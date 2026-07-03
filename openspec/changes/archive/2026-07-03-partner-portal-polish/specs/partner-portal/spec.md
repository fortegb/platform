## ADDED Requirements

### Requirement: Modules detail page

The partner portal SHALL provide a generated HTML page at `docs/planning/modules.html` that renders the content of `modules.md` with heading anchors for deep linking.

#### Scenario: Navigate from index

- **WHEN** a sócio opens the portal index
- **THEN** a card under "Visão do produto" links to `planning/modules.html`

#### Scenario: Deep link from mapa-fases

- **WHEN** a sócio clicks a module title on the phase map
- **THEN** the browser navigates to `modules.html#<module-slug>`

### Requirement: Mapa-fases progress label

The phase map page SHALL use the label "Relatório de Progresso" for issue progress reporting and SHALL NOT display the removed "Dois formatos de progresso" section.

#### Scenario: Updated label visible

- **WHEN** a sócio views `planning/mapa-fases.html`
- **THEN** the progress section uses "Relatório de Progresso" wording

### Requirement: Jornadas navigation and card affordance

The jornadas page SHALL link pillar cards to the modules page, role cards to in-page journey anchors, and SHALL apply hover lift only to linked or explicitly interactive cards.

#### Scenario: Non-link card has no hover lift

- **WHEN** a sócio hovers a `div.card` that is not a link and not `.card-interactive`
- **THEN** the card does not translate upward or show link-like hover styling

#### Scenario: Linked card shows hover lift

- **WHEN** a sócio hovers an `a.card` or `.card-interactive` element
- **THEN** the card shows the portal hover lift effect

### Requirement: GitHub Pages publish reliability

The repository SHALL publish the partner portal via GitHub Pages legacy source (`main` branch, `/docs` folder). Automated GHA Pages deploy SHALL NOT run on every push until the deploy action is fixed.

#### Scenario: Live site reflects main

- **WHEN** changes are pushed to `main` under `docs/`
- **THEN** GitHub Pages legacy build serves the updated portal content
