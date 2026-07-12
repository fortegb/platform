# rbac-role-model Specification

## Purpose
Defines the platform's role enum, its evaluation hierarchy, and the two-layer (app + RLS) enforcement model that all role-gated access relies on.

## Requirements
### Requirement: Single role per user
The system SHALL store exactly one role per authenticated user, from the set `cliente`, `corretor`, `staff`, `admin`. The system SHALL NOT allow a user to hold more than one role simultaneously.

#### Scenario: A corretor cannot also hold the cliente role
- **WHEN** a user account already has the `corretor` role
- **THEN** the system does not allow that same account to also be assigned the `cliente` role

### Requirement: Organizational facts are not RBAC roles
"Digital" and "Sócio/investidor" SHALL NOT be represented as values of the system's `role` field, and SHALL NOT be used anywhere in the codebase to gate access to a route, page, or data. Any distinction those labels imply SHALL be recorded as organizational information outside the RBAC model.

#### Scenario: A founder's system access is governed by their stored role
- **WHEN** a founder who is also a company owner ("Sócio/investidor") accesses the platform
- **THEN** their access is determined solely by their stored `role` (e.g. `admin`), not by their ownership status

### Requirement: Admin permission hierarchy at evaluation time
The system SHALL treat `admin` as hierarchically superior to `staff` when evaluating a permission check — any check that would grant access to a `staff` user SHALL also grant access to an `admin` user. This hierarchy SHALL be implemented as a property of permission evaluation, not by storing more than one role on the admin user's account.

#### Scenario: An admin passes a staff-level check
- **WHEN** a permission check requires `staff`-level access
- **AND** the requesting user's stored role is `admin`
- **THEN** the check passes

### Requirement: Two-layer enforcement
The system SHALL enforce role-based access at two layers: application-level routing/middleware, and Supabase row-level security (RLS) policies. Application-level checks alone SHALL NOT be treated as sufficient for protecting sensitive data — RLS SHALL be the authoritative security boundary for data access regardless of which route or code path reached it.

#### Scenario: A route-guard bug does not expose another corretor's data
- **WHEN** an application-level route guard fails to block a `corretor` from a page belonging to another `corretor`
- **THEN** Supabase RLS still prevents that `corretor` from reading the other corretor's rows

### Requirement: Unauthenticated access is not a stored role
The system SHALL NOT create a stored role value for unauthenticated visitors. The absence of an authenticated session SHALL be treated as the default public-access case, distinct from and outside the `role` enum.

#### Scenario: An unauthenticated visitor has no role record
- **WHEN** a person browses the public site without an account or session
- **THEN** no role value is stored or looked up for that visit

