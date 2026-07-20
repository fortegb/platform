## MODIFIED Requirements

### Requirement: Capability purpose is stated
The `design-tokens` capability SHALL declare a written Purpose describing the shared design reference it provides, and SHALL NOT leave it as the `TBD` placeholder emitted by the archive step.

Purpose as written: *the canonical web design reference for the ForteGB product — brand colors, typography, spacing, button hierarchy, and the per-screen design conventions the Passo 6 leaves (#197–#207) apply — derived from the existing implementation rather than a separate brand guide.*

#### Scenario: Capability promoted by an archive
- **WHEN** a change archives and promotes or extends the `design-tokens` capability
- **THEN** its `Purpose` line names what the capability covers, not `TBD - created by archiving change ...`

## ADDED Requirements

### Requirement: Route-scoped screens show their subject
A screen scoped to a specific entity by its route parameter SHALL display that entity's identifying context, and SHALL link back to that entity's detail page.

#### Scenario: Scheduling a visit to a specific house
- **WHEN** a visitor opens `/visita/agendar/[houseId]`
- **THEN** the screen shows which house the visit is for (name and address at minimum) and links back to `/portfolio/[slug]` for that house

#### Scenario: Route parameter present but unused
- **WHEN** a screen receives an entity id via its route but renders no reference to that entity
- **THEN** that is a design gap to close, not an acceptable simplification

### Requirement: Every decided journey outcome has a screen state
A screen implementing a journey SHALL provide a distinct visual state for each outcome that journey's accepted decision record defines, and SHALL NOT collapse a non-error outcome into an error state.

#### Scenario: Asynchronous escalation is not an error
- **WHEN** a journey decision specifies that a failed automatic check escalates asynchronously without blocking the visitor
- **THEN** the screen renders an acknowledgement state, visually distinct from its error state

#### Scenario: Outcome with no screen
- **WHEN** an accepted decision record defines an outcome the screen has no state for
- **THEN** the design leaf for that journey adds the state, even though the logic driving it lands in a later Execução issue

### Requirement: Every screen is designed during Passo 6
A screen belonging to a journey SHALL receive its design pass during that journey's Passo 6 leaf, and SHALL NOT be deferred to Execução to be built without one.

#### Scenario: Screen that only appears in a later outcome
- **WHEN** a journey defines a screen the current implementation has no code for yet
- **THEN** it is designed in the Passo 6 leaf anyway, so no screen in that journey is built after the design system closes
