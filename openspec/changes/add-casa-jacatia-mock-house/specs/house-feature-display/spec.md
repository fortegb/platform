## ADDED Requirements

### Requirement: Grouped feature rendering
The portfolio detail page SHALL render a house's `features` under two labeled sections, "Destaques" and "Diferenciais de Engenharia", when one or more entries carry a `grupo` tag (`'destaque'` or `'engenharia'`).

#### Scenario: House has grouped features
- **WHEN** a house's `features` array contains entries shaped as `{ text, grupo }`
- **THEN** the page renders a "Destaques" section listing all entries with `grupo: 'destaque'`, followed by a "Diferenciais de Engenharia" section listing all entries with `grupo: 'engenharia'`

### Requirement: Backward-compatible flat rendering
The portfolio detail page SHALL render `features` as a single flat checklist under one "Características" heading when entries are plain strings, unchanged from current behavior.

#### Scenario: House has plain-string features
- **WHEN** a house's `features` array contains only plain strings (no `grupo` tag)
- **THEN** the page renders one flat list under a single "Características" heading, exactly as it does today

#### Scenario: Existing mock houses are unaffected
- **WHEN** any of the 5 pre-existing mock houses (all using plain-string `features`) is viewed
- **THEN** the rendered output is identical to before this change
