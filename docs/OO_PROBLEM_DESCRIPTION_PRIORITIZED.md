# Endless Transit OO Problem Description (Prioritized)

## Purpose

This document describes the OO design and architecture problems identified in the Endless Transit codebase. It is intentionally focused on problem statements only (no implementation strategy, no task status, no effort/risk estimation).

---

## Priority 1 — Critical Structural Problems

### 1) GameState is overloaded (state + service container + composition root)

`GameState` currently mixes multiple responsibilities that should be separate in object-oriented design:

- **Domain/runtime data** (e.g., universe, location, player, seed)
- **Service references** (e.g., view, input, action mapping, navigation, buffering)
- **Service construction/wiring** (direct instantiation of collaborators)

Why this is a problem:

- Creates high coupling between unrelated parts of the system
- Makes ownership and lifecycle boundaries unclear
- Reduces substitutability/testability (hard to inject alternatives)
- Encourages procedural access patterns through a shared mutable object

OO impact:

- Violates Single Responsibility Principle
- Weakens explicit dependency modeling
- Increases accidental complexity in refactors

---

### 2) Core package has god-layer pressure

The `core` package is carrying orchestration, navigation, input mapping, rendering coordination, persistence/replay, and command flow concerns in a concentrated area.

Why this is a problem:

- Domain boundaries become porous over time
- New features tend to land in `core` by default
- Conceptual cohesion declines as responsibilities accumulate
- Architectural erosion becomes likely as project size grows

OO impact:

- Increases “hub” dependencies and bidirectional coupling risk
- Reduces package-level encapsulation
- Makes class responsibilities harder to keep stable

---

## Priority 2 — High-Impact Design Coherence Problems

### 3) Navigation/turn pipeline responsibilities are not sharply separated

Related classes (`TurnProcessor`, `ActionMapper`, `NavigationEngine`, `NavigationOrchestrator`, `RenderingCoordinator`) appear to be close in responsibility scope and potentially overlapping.

Why this is a problem:

- Control flow ownership is ambiguous
- Similar abstractions (“processor”, “engine”, “orchestrator”) can drift into synonym roles
- Behavior changes can require touching multiple classes for one logical concern
- Testing boundaries become fuzzy

OO impact:

- Weak command/processing pipeline abstraction
- Lower cohesion per class
- Harder extension points for new actions/mechanics

---

### 4) Testing architecture is fragmented across paradigms

The test ecosystem shows multiple active styles at once (legacy JUnit 4 style, Groovy test case style, JUnit 5-oriented generated tests, custom suite orchestration).

Why this is a problem:

- Inconsistent test conventions and lifecycle semantics
- Higher onboarding and maintenance friction
- Tooling/reporting/discovery inconsistencies
- Greater chance of silent test exclusion or incompatible assumptions

OO impact:

- Refactoring safety net is less reliable than it appears
- Contract/invariant verification is uneven across components
- Design feedback loop (tests as design constraints) is weakened

---

## Priority 3 — Medium Structural and Boundary Problems

### 5) ReplayService concentrates too many reasons to change

`ReplayService` appears to combine metadata parsing, replay interpretation, naming, template generation, and filesystem writes.

Why this is a problem:

- Format changes, test template changes, and file layout changes all collide in one class
- Harder to isolate and test behavior independently
- Increased chance of regressions from unrelated modifications

OO impact:

- Violates Single Responsibility Principle
- Low internal cohesion
- Reduced composability and reusability

---

### 6) Snapshot/replay metadata boundary is stringly typed and brittle

Replay promotion relies on parsing metadata from textual screenshot content using formatting-sensitive extraction.

Why this is a problem:

- Small format drift can break parsing silently
- Domain meaning is encoded indirectly in string layout
- Validation and schema evolution are difficult

OO impact:

- Weak domain modeling of replay metadata
- Insufficiently explicit contracts at subsystem boundaries
- Harder to evolve backward-compatible formats

---

### 7) Tests are not fully hermetic (workspace side effects)

Some test behavior writes artifacts into repository locations and may leave generated files for inspection.

Why this is a problem:

- Test runs can mutate working tree state
- Reproducibility suffers across local/CI environments
- Order-dependence and environmental coupling become more likely

OO impact:

- Weakens confidence for incremental OO refactoring
- Increases hidden external coupling in test design

---

## Priority 4 — Medium/Low Evolution and Maintainability Problems

### 8) Model richness may exceed behavioral encapsulation

The world model hierarchy is structurally rich and deep, but behavior ownership may be disproportionately service-centric rather than modeled close to domain objects.

Why this is a problem:

- Risk of “rich nouns, thin verbs” architecture
- Domain operations spread across coordinators/services
- Harder to discover where business rules truly live

OO impact:

- Anemic-domain tendency
- Lower discoverability of domain behavior
- Reduced object-level encapsulation

---

### 9) World start selection is hardcoded and not strategy-based

Initial world entry logic follows a rigid first-child traversal path.

Why this is a problem:

- Behavior is fixed and difficult to vary without modifying existing flow
- Limits expressiveness for generation scenarios and testing dimensions
- Introduces policy decisions directly in generation workflow

OO impact:

- Missed use of polymorphic strategy for start selection
- Lower openness for extension

---

### 10) Readability debt from minified single-line source files

Several critical source files appear minified/flattened in ways that preserve execution but reduce maintainability.

Why this is a problem:

- Code review and blame quality degrade significantly
- Merge conflict resolution becomes harder
- Architectural intent is obscured by formatting density

OO impact:

- Slows design-level reasoning and safe change velocity
- Increases cognitive overhead for maintaining class boundaries

---

## Cross-Cutting Symptoms

Across the issues above, recurring system-level symptoms are:

- **Responsibility concentration:** too many responsibilities in a small set of central classes/packages
- **Boundary ambiguity:** unclear ownership between adjacent orchestration components
- **Contract weakness:** implicit/format-driven boundaries instead of explicit domain contracts
- **Refactor friction:** test and structure inconsistency reducing safe evolutionary change

---

## Consolidated Priority Order

1. `GameState` overload and coupling hotspot
2. `core` god-layer pressure
3. Pipeline responsibility ambiguity (turn/input/navigation/render)
4. Test architecture fragmentation
5. `ReplayService` multi-responsibility concentration
6. Stringly-typed replay metadata boundary
7. Non-hermetic test side effects
8. Domain behavior dispersion (anemic-domain tendency)
9. Hardcoded world start policy
10. Source readability debt (minified files)

---

## Final Problem Statement

The project has a strong conceptual architecture and meaningful test intent, but OO efficiency is constrained by concentrated responsibilities, ambiguous execution boundaries, and uneven test/design contracts. The central challenge is not missing structure; it is preserving modularity and object responsibility integrity as the system evolves.