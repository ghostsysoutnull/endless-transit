# Object-Oriented Analysis Report: Endless Transit
**Author:** Claude Sonnet 4.6 (Vinculum Architect session)
**Date:** 2026-03-17
**Scope:** Full source analysis — `core`, `model`, `ui`, `procgen` packages + test suite
**Status:** Analysis only. No source code changes proposed here.

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Domain Model Assessment](#2-domain-model-assessment)
3. [SOLID Principles Audit](#3-solid-principles-audit)
4. [Design Pattern Inventory & Critique](#4-design-pattern-inventory--critique)
5. [Coupling & Cohesion Analysis](#5-coupling--cohesion-analysis)
6. [State Management Analysis](#6-state-management-analysis)
7. [Mutability & Thread Safety](#7-mutability--thread-safety)
8. [Procedural Generation Architecture](#8-procedural-generation-architecture)
9. [UI Architecture Analysis](#9-ui-architecture-analysis)
10. [Test Architecture Analysis](#10-test-architecture-analysis)
11. [Prioritized Improvement Opportunities](#11-prioritized-improvement-opportunities)

---

## 1. Executive Summary

Endless Transit is a well-architected, domain-rich project. The codebase demonstrates genuine OO discipline: the world hierarchy uses a textbook Composite pattern, lazy loading is correctly gated via a Virtual Proxy (`LazyLocusList`), procedural generation is deterministically seeded and stateless, and the UI is fully virtualized through sink abstractions that enable headless testing. The test suite is comprehensive and clearly test-driven.

**What the project does well:**
- Deterministic seed propagation via `LocusSeed` + `EntropyMixer` is architecturally sound and enforced
- `LazyLocusList` correctly solves the infinite-scale problem without memory exhaustion
- Interface segregation on `Location` (decomposed into `Locatable`, `Navigable`, `Renderable`, `Stateful`) is clean
- `RenderSink` abstraction enables clean headless testing
- `@CompileStatic` is broadly applied, catching Groovy's dynamic dispatch pitfalls at compile time
- The POST_MORTEM documentation and lesson system demonstrate mature engineering process

**Where structural tension exists:**
- Several classes have accumulated too many responsibilities (`GameState`, `BridgeView`, `ProceduralFactory`)
- Static mutable global state is scattered across `Terminal`, `JournalManager`, and `Logger`
- The Service Locator in `ModelOutput.fmt` is a known anti-pattern
- Two navigation classes (`NavigationOrchestrator` vs `NavigationEngine`) have overlapping and unclear separation
- The `Player` class carries both data and complex behavioral logic that would belong in services
- Event cross-cutting (journaling, ritual triggers, coherence) is coupled via direct method calls rather than domain events

None of these are critical defects — the game clearly runs and the tests pass. They are structural debts that will compound as the codebase grows.

---

## 2. Domain Model Assessment

### 2.1 World Hierarchy (Strengths)

The recursive Composite pattern (`Container` → subclasses down to `Room`) is correctly implemented. The 12-level hierarchy (Universe → Shard/Room) maps naturally to the game domain and the implementation respects the pattern's contracts.

The `LazyLocusList` as a Virtual Proxy is the right solution for infinite scale. The re-entrancy guard (`childrenPopulated = true` *before* `populateChildren()`) is documented in lessons and correctly applied, preventing the infinite recursion bug described in `POST_MORTEM_2026_03_11.md`.

The `Location` interface hierarchy is solid:
```
Location
├── Locatable  (identity: LIP, path, depth, parent)
├── Navigable  (interaction: enter, getOptions, processAction)
├── Renderable (display: description, vibe, mapSymbol, extraContent)
└── Stateful   (persistence: mutationState)
```

This is Interface Segregation done correctly. No implementor is forced to carry concerns it doesn't need.

### 2.2 Leaf Node Duplication

`Room` implements `Location` directly (bypassing `Container`) but re-implements several methods that already exist in `Container`: parent tracking, `findAncestor()`, `visited` flag, `locus` field, and LIP construction. This is a DRY violation. There is an implied but unenforced distinction between `Container` nodes (navigable parents) and leaf nodes. A `LeafLocation` abstract base would eliminate the duplication and make the architectural intent explicit.

### 2.3 Door as a Non-Location

`Door` is deliberately not a `Location` — it is a value object describing a portal. This is a correct domain decision. Doors describe openings; `Apartment` is what you actually enter. However, `AnomalousTrace.matches(String roomType)` uses string-based room type matching (substring scan over a keyword set), which is fragile. If room type naming changes, trace associations silently break. An explicit `RoomCategory` enum would be safer.

### 2.4 VibeCapsule Design

`VibeCapsule` is immutable and uses `mutate()` to return new instances — correct functional design. However it carries `atmosphericColor` as a raw `String` (e.g., `"L_CYAN"`, `"RED"`) rather than a typed constant or enum. Since `Terminal` defines color constants, the `atmosphericColor` field is a stringly-typed coupling point between the model and the UI layer. The model should express color as a semantic concept (e.g., `VibeColor` enum) and let the UI resolve the actual ANSI code.

### 2.5 Player Class Responsibility

`Player` currently owns:
- Inventory list and item management
- Coherence health stat and clamped adjustment
- Visited LIP tracking (both fine-grained `visitedLIPs` and high-level `visitedPaths`)
- Step counter
- Item synthesis logic (`mergeItems`) — including keystone creation and coherence restoration
- Resonant frequency detection (divisible by 11 check)

The first four are pure data (appropriate for `Player`). The last two — synthesis mechanics and resonance detection — are behavioral policies. They would belong in a `SynthesisService` or similar domain service, leaving `Player` as a clean aggregate root that holds state rather than encoding rules. The ritual/resonance logic in particular is complex enough to warrant its own encapsulation and its own tests.

---

## 3. SOLID Principles Audit

### 3.1 Single Responsibility Principle

| Class | Assessment |
|---|---|
| `Game` | **Good** — thin facade, delegates correctly |
| `GameState` | **Borderline** — central data bag is appropriate, but it also owns `bridgeView` (a UI concern) and `inventoryController` (a behavioral service). These feel like they belong elsewhere. |
| `BridgeView` | **Violation** — renders HUD, maps, lattice, menus, sparklines, compass, screenshots, and radar. This is one class doing at least six distinct rendering jobs. |
| `ProceduralFactory` | **Violation** — handles creation (constructor-style) AND population (multi-step generation) for all 13+ location types. Two distinct responsibilities in one class. |
| `TurnProcessor` | **Good** — coherence drain, action dispatch, reboot. These are cohesive to the turn cycle. |
| `SyncManager` | **Borderline** — mutation collection AND JSON serialization. Could be split into a `MutationCollector` and a `JsonPersistenceAdapter`. |
| `JournalManager` | **Violation** — tracks session statistics, logs events, manages file I/O, provides HUD ticker data, and triggers ritual progress. Too many concerns. |
| `Terminal` | **Borderline** — ANSI constants, cursor control, text styling, drawing primitives, and the `MapBuffer` inner class are cohesive as a terminal abstraction. The swappable `clock` and `sink` statics make it also a configuration registry, which is a secondary concern. |
| `NameGenerator` | **Good** — focused on name synthesis per location type. |
| `ThemeService` | **Good** — theme asset management. The resource loading from filesystem paths is a concern (see §8). |

### 3.2 Open/Closed Principle

**Strong**: Adding a new location type requires extending `Container` and implementing `populateChildren()` without modifying existing types. The Command pattern means new commands are additive. `EntropyMixer` and `ClockStrategy` are pluggable without modifying consumers.

**Weak**: `BridgeView.generateRightPaneContent()` routes by location depth using conditional logic. Adding a new location type at an existing depth would require modifying `BridgeView`. A `Location.getRightPaneRenderer()` method that each type provides would eliminate this coupling.

Similarly, `ScanCommand.execute()` switches on location type (corridor, building, apartment). This will need modification for each new enterable location type.

### 3.3 Liskov Substitution Principle

**Good**: All `Container` subclasses fulfill the `Container` contract. `LazyLocusList` correctly implements `List<E>` — the `add()` special behavior (no lazy trigger) is a documented precondition, not a substitution violation.

**Concern**: `NullSector` extends `Container` and behaves differently from `GalacticSector` (fewer children). This is LSP-safe since the base contract (`getOptions`, `populateChildren`) is still honored. But `NullSector` could be modeled as a `GalacticSector` with a different population strategy (Strategy pattern) rather than a subclass, which would reduce the type hierarchy.

### 3.4 Interface Segregation Principle

**Strong overall** (as noted in §2.1). The `Location` decomposition is the best architectural decision in the codebase.

**Minor concern**: `LatticeCommand` is an interface for "glitch menu" commands that adds `String getLabel()` to `GameCommand`. The distinction between regular commands and "lattice commands" could be modeled via a tagging interface or a `CommandCategory` enum rather than a parallel interface hierarchy.

### 3.5 Dependency Inversion Principle

**Good**: `GameCommand`, `InputSource`, `RenderSink`, `OutputFormatter`, `EntropyMixer`, `ClockStrategy`, `ScreenshotProvider` are all abstractions that the core code depends on, not concrete implementations.

**Violation**: `ModelOutput.fmt` is a static field holding a concrete `StandardTerminalAdapter` instance by default. This is a Service Locator — the model reaches into a global registry to get a concrete formatter. It bypasses dependency inversion entirely. The corrective pattern (constructor injection of `OutputFormatter` into the handful of model classes that need it) is more verbose but eliminates the hidden coupling.

**Violation**: `ProceduralFactory` and `ThemeService` are accessed as singletons (`ProceduralFactory.instance`, `ThemeService.instance`). Singletons are effectively global state. Injection would make the dependencies explicit and testable.

---

## 4. Design Pattern Inventory & Critique

### 4.1 Composite Pattern — `Container` Hierarchy
**Verdict: Correctly implemented.**
The `Location` interface + `Container` abstract class + leaf `Room` structure is a textbook Composite. The main gap is the lack of a `LeafLocation` base (see §2.2).

### 4.2 Virtual Proxy — `LazyLocusList`
**Verdict: Correctly implemented, subtle contract.**
The `add()` bypass (skips the lazy gate) is necessary for population to work without infinite recursion. This is a well-reasoned contract. The risk is that code outside `populateChildren()` could accidentally call `add()` and bypass the gate, silently adding un-seeded children. The `@PackageScope` annotations on the backing list fields in `Building`, `Floor`, and `Corridor` are a good attempt to constrain this, but it is not enforceable at compile time.

### 4.3 Command Pattern — `GameCommand`
**Verdict: Correctly implemented, slight naming tension.**
`GameCommand.execute()` returns `boolean` (continue/quit). This is an unusual but defensible variant. The `Closure`-based options in `getOptions()` serve a similar command role but are not `GameCommand` instances. The two mechanisms coexist — global commands are `GameCommand`, per-location actions are `Closure`. Unifying them would simplify `TurnProcessor`.

### 4.4 Memento Pattern — `GameMemento`
**Verdict: Correctly implemented.**
`GameMemento` stores only primitive/serializable data (LIP string, not a live `Location` reference). World reconstitution via seed re-simulation is the right approach given the deterministic architecture. The `@Immutable` annotation on `GameMemento` is correct.

### 4.5 Facade Pattern — `Game`
**Verdict: Well executed.**
`Game` is a thin delegator. The POST_MORTEM and Codex correctly enforce "decomposed facade" — the lesson from the structural collapse was that a fat `Game` class is dangerous.

### 4.6 Factory Pattern — `ProceduralFactory`
**Verdict: Functionally correct, structurally overloaded.**
`ProceduralFactory` is a monolithic factory handling creation and population for 13+ types. An Abstract Factory or Builder pattern per location type would distribute this responsibility and improve the OCP (§3.2). More critically, `ProceduralFactory.instance` as a static singleton makes it impossible to swap the factory in tests without hacking static state.

### 4.7 Adapter Pattern — `OutputFormatter` / `TerminalAdapter`
**Verdict: Correctly implemented.**
The adapter cleanly bridges the model's formatting needs and the terminal's ANSI capabilities. `PlainFormatter` as an alternate adapter for test/no-color scenarios is good design.

### 4.8 Decorator Pattern — `TeeSink`
**Verdict: Correctly implemented.**
`TeeSink` wraps two `RenderSink` instances and delegates to both, enabling simultaneous console output and memory capture. Clean and minimal.

### 4.9 Strategy Pattern — `EntropyMixer`, `ClockStrategy`
**Verdict: Correctly implemented.**
Both strategy abstractions are minimal and focused. `InstantClock` as a no-op test double for `ClockStrategy` is a good test design.

### 4.10 Service Locator Anti-Pattern — `ModelOutput.fmt`
**Verdict: Known anti-pattern, justified pragmatically.**
The `ModelOutput.fmt` static field was introduced to avoid the model importing from the UI package. The intent is correct; the mechanism is a compromise. The risk is that `ModelOutput.fmt` can be `null` if the application wires up incorrectly, causing `NullPointerException` at render time with no clear diagnostic. Dependency injection (passing `OutputFormatter` into the `Renderable` methods that need it) would eliminate both the anti-pattern and the NPE risk, but requires changing method signatures across the model.

### 4.11 Missing: State Pattern — `Floor.isCorridorActive`
`Floor` has two distinct behavioral states: **Elevator** (vertical navigation, floor diagnostics) and **Corridor** (horizontal navigation, door listing). Currently this is modeled as a boolean flag `isCorridorActive` with branching in `getOptions()`. A formal State pattern would make each mode an explicit object (`ElevatorState`, `CorridorState`) implementing a `FloorState` interface with `getOptions()` and `getExtraContent()`. This would eliminate the conditional branching and make transitions explicit. Given that the spatial pivot model is architecturally central, this is worth considering.

### 4.12 Missing: Observer/Event Pattern — Cross-cutting Domain Events
`JournalManager`, ritual tracking, and coherence-related side effects are triggered via direct method calls from `Player`, `Room`, `Building`, and `TurnProcessor`. This creates hidden coupling between the game mechanics and the logging/persistence subsystem. A lightweight domain event system (`EventBus` or `DomainEvent` + listeners) would decouple these concerns, make side effects explicit, and simplify testing of individual mechanics.

---

## 5. Coupling & Cohesion Analysis

### 5.1 Package Dependencies

The intended dependency direction is:
```
core → model, ui, procgen
ui → model
procgen → model
model → (nothing outside model)
```

The `ModelOutput.fmt` service locator is the one place where this direction is nominally maintained but semantically violated — the model references a formatter that is in practice set by the UI layer.

`JournalManager` (in `core`) is called directly from `Building` (in `model`) for infusion tracking. This violates the layering — `model` reaches up into `core`. An event system would resolve this.

### 5.2 GameState as a Central Hub

`GameState` is referenced by nearly every service in `core`. This is expected for a state container, but `GameState` also holds:
- `BridgeView bridgeView` — a heavy UI component
- `InventoryController inventoryController` — a behavioral service
- `NavigationEngine navEngine` — a navigation rule engine
- `ActionMapper mapper` — a UI input map
- `InputHandler inputHandler` — an I/O abstraction

These could be held by their respective services (`RenderingCoordinator` could own `BridgeView`, `TurnProcessor` could own `ActionMapper` and `InputHandler`) rather than all aggregated in `GameState`. `GameState` would then be a leaner data container: `universe`, `currentLocation`, `player`, `masterLocus`, `instantRender`, `suppressRendering`.

### 5.3 NavigationOrchestrator vs NavigationEngine

The separation between these two is not immediately obvious:
- `NavigationOrchestrator` — world initialization, location entry/exit transitions, parent ancestry walk, floor pivot resets
- `NavigationEngine` — repetition detection, boundary reversal, choice recording

`NavigationEngine` is essentially a stateful input policy (it remembers `lastChoice`). It could live inside `ActionMapper` or `TurnProcessor` rather than as a separate service on `GameState`. `NavigationOrchestrator` handles genuine domain orchestration and is well-placed.

---

## 6. State Management Analysis

### 6.1 Mutation Tracking

The `mutationState` / `applyMutationState()` pattern on `Stateful` is well-designed. Mutations are captured as plain maps, serializable to JSON, and keyed by LIP. The coverage is correct: `Building`, `Floor`, `Corridor`, and `Room` implement mutation tracking for their player-visible changes.

One gap: `Player.visitedLIPs` is included in `GameMemento` (correct), but `Player.visitedPaths` (high-level path tracking) is not explicitly persisted. If `visitedPaths` drives any UI logic, this could cause a discrepancy after restore.

### 6.2 Floor.isCorridorActive Persistence

`Floor.getMutationState()` persists `isCorridorActive`. However, `Floor.enter()` resets `isCorridorActive = false` unconditionally on every entry. This means that if a player saves mid-corridor, the restored state will enter the elevator view regardless of where they saved. The mutation state would need to be applied *before* the entry reset for this to work correctly. This is a subtle ordering bug.

### 6.3 ActionMapper and Closure Lifecycle

`ActionMapper` stores `Map<String, Closure>` from `getOptions()`. These closures capture live `Location` and `Game` references. They cannot be serialized, which is why `GameMemento` stores a LIP string rather than the live location. The closures are rebuilt each turn via `update()`.

This means the action map is discarded and rebuilt on every single turn, even when the player hasn't moved. This is deterministic and cheap (Groovy closure allocation is fast), but architecturally it means `ActionMapper` is a cache, not a source of truth. The comment in `NavigationEngine.updateRepetitionContext()` notes that repetition detection can modify this map — making it both a cache and a mutable input policy, which are separate concerns.

---

## 7. Mutability & Thread Safety

This is a single-threaded CLI game, so thread safety is not a current concern. However, several design choices would become problematic if concurrency were ever introduced (e.g., a server mode or async save):

### 7.1 Static Mutable Fields
The following classes use static mutable state:

| Class | Static Mutable Fields | Risk |
|---|---|---|
| `Terminal` | `sink`, `virtualBuffer`, `clinicalMode`, `clock` | Tests that swap these must be careful about ordering |
| `JournalManager` | `sessionLog`, `lastEntries`, all session counters | Would corrupt under concurrent access |
| `Logger` | File handles and rotation state | Would corrupt under concurrent writes |
| `ModelOutput` | `fmt` (OutputFormatter) | Swapped at startup; fine if only written once |
| `InputHandler` | `defaultSource` | Fine if only written during init |

The `Terminal` statics are the most impactful since tests swap `sink` to capture output. If two tests run concurrently (e.g., parallel Gradle workers), they would interfere. The current test suite appears to run sequentially, so this is latent rather than active.

### 7.2 LazyLocusList Concurrent Access
`LazyLocusList.ensureAccessed()` is not synchronized. Concurrent access to the same `Container` would race on the `childrenPopulated` flag and potentially populate children twice. Again, currently not an issue.

---

## 8. Procedural Generation Architecture

### 8.1 Entropy Model (Strengths)

The entropy architecture is one of the strongest parts of the codebase:
- `LocusSeed` is `@Immutable` — no state mutation possible
- `StandardMixer` uses a prime-multiplier XOR avalanche, giving good distribution
- Vertical branching (`branch(index)`) vs horizontal variability (`nextRandom()`) is a principled distinction
- All generators accept an explicit seed — no hidden `ThreadLocalRandom` in the generation path

The `EntropyMixer` Strategy interface allows the mixing algorithm to be swapped without touching `LocusSeed`. This is good forward thinking.

### 8.2 ProceduralFactory Overload

`ProceduralFactory` has 13 `create*` methods and 13 `populate*` methods. Creation (field initialization) and population (child generation) are different operations at different lifecycle points, but they live in one class. As new location types are added, this class grows linearly. Consider:
- A `LocationFactory` interface per type, with `create()` and `populate()` — factories registered in a registry
- Or at minimum, extracting the population logic into the respective `Container.populateChildren()` implementations (some already call factory methods, but the factory also calls back into populate)

### 8.3 ThemeService Resource Loading

`ThemeService.loadThemes()` reads from the filesystem path `src/main/resources/themes/`. This works during development but is fragile in a packaged JAR — the path would need to be `this.getClass().getResourceAsStream(...)`. This is a runtime dependency on the source directory layout that will break if the application is packaged.

### 8.4 NameGenerator Lexicon

The building name lexicon (`buildingLexicon`) is a hard-coded `Map<String, List<String>>` inside `NameGenerator`. This is a maintenance concern — adding a new culture requires editing the generator class. Externalizing the lexicon to resource files (like `ThemeService` does for atmosphere) would make name expansion data-driven and consistent with the rest of the generation system.

### 8.5 Gematria as a Value Concept

`Gematria.calculateFrequency()` is a static utility method. Frequency is a domain concept (items have frequencies, resonance checks frequency divisibility, rituals depend on frequency). Wrapping frequency as a value object (`SpectralFrequency`) with methods like `isResonant()`, `isMasterNumber()`, and arithmetic would make the domain language more explicit and testable independently of the string calculation.

---

## 9. UI Architecture Analysis

### 9.1 BridgeView Responsibilities

`BridgeView` is the most overloaded class in the codebase. Its responsibilities:
1. Main HUD box rendering (traversal, path, ticker, buffer preview)
2. Adaptive bridge dual-pane layout
3. Menu and compass rendering
4. Inventory overlay
5. Lattice trace (hierarchy tree)
6. Lattice map (2D spatial projection)
7. Screenshot capture interface (`ScreenshotProvider`)
8. Sparkline generation
9. Radar rendering
10. Abyssal static effect

Each of these could be a `ViewComponent` or `Panel` with a `render(int width) → List<String>` interface. `BridgeView` would then be a compositor that assembles panels into the final frame. This would:
- Allow individual panels to be tested in isolation
- Make layout changes surgical (adding a new panel doesn't require editing `BridgeView`)
- Enable the right-pane content to be resolved via polymorphism on `Location` rather than `BridgeView` conditionals

### 9.2 Right-Pane Depth Routing

`BridgeView.generateRightPaneContent()` routes to different map/telemetry generators based on location depth. This is an OCP violation — adding a new location at an existing depth level requires modifying `BridgeView`. The `Renderable` interface already has `getExtraContent()` for location-specific HUD content. Extending this with a `getRightPaneContent(int width, Player) → List<String>` method would push the routing decision into the location types themselves.

### 9.3 ANSI Width Handling

The lessons document correctly identifies that `String.length()` fails for emojis. `Terminal.getVisualWidth()` and `TUIValidator.getVisualWidth()` solve this. The scale icons in `Terminal` (e.g., `ICON_CTY = "🏙"`) are 2-cell wide unicode characters. The consistent use of `getVisualWidth()` for all alignment operations is disciplined and correct.

The recommendation (already in the lessons) to use `CHA` (Cursor Horizontal Absolute escape `\u001b[nG`) for right-border placement is the most robust solution since it bypasses width calculation entirely.

### 9.4 Render Sink Architecture (Strength)

The `RenderSink` hierarchy (`ConsoleSink`, `NullSink`, `MemorySink`, `TeeSink`) is well-designed. The `TeeSink` decorator enables simultaneous console and memory output without conditional logic in the rendering code. The `VisualAssertionEngine` operating on `ScreenBuffer` (rather than string matching) is the right architecture for TUI testing.

---

## 10. Test Architecture Analysis

### 10.1 Coverage Assessment

The test suite is comprehensive. Notable strengths:
- `DeterministicUniverseTest` — verifies seed stability (same seed → same world)
- `VisualBaselinePinningTest` — verifies TUI markers are present after changes
- `HeadlessSimulationTest` — full game loop in headless mode
- `CoherenceDrainTest`, `AutoEntryTest`, `AbyssalRitualTest` — behavioral mechanics
- `ReproCrashTest` — regression for specific bug reports

### 10.2 Static State in Tests

Tests that swap `Terminal.sink`, `Terminal.clock`, or `ModelOutput.fmt` depend on static mutable state. If Gradle runs tests in parallel, these swaps race. The current test runner (`TestRunner.groovy`) appears to control execution order, which mitigates this. A proper solution would use dependency injection so tests create their own isolated instances rather than sharing global state.

### 10.3 HeadlessRunner as a Test DSL

`HeadlessRunner` is a valuable test harness — it runs the game with `MockInputSource` and captures output via `MemorySink`. This pattern could be extended into a fluent DSL:
```
HeadlessRunner.newGame(seed)
    .type("1", "1", "f", "f")
    .assertContains("NEURAL_LINK")
    .assertCoherence(greaterThan(50))
    .run()
```
This would make tests more readable and more maintainable as the game's input model evolves.

---

## 11. Prioritized Improvement Opportunities

Ranked by impact and estimated risk, from most to least impactful.

### Priority 1 — High Impact, Low Risk

**1.1 Extract LeafLocation abstract base**
Eliminate the duplication between `Room` and `Container` for parent tracking, `findAncestor()`, `visited`, `locus`, and LIP construction. A shared `AbstractLocation` or `LeafLocation` base class would make the leaf/branch distinction explicit and remove ~40 lines of duplicated code.

**1.2 Replace `ModelOutput.fmt` with constructor injection**
Pass `OutputFormatter` as a constructor parameter to the handful of model classes that call `ModelOutput.fmt`. Eliminates the Service Locator anti-pattern and the null-reference risk. The change is surgical — only classes that call `ModelOutput.fmt.colorize(...)` are affected.

**1.3 Externalize NameGenerator lexicon to resource files**
Move building/room name lexicons from hard-coded maps in `NameGenerator` into text files under `src/main/resources/`, consistent with `ThemeService`. Makes name expansion data-driven.

**1.4 Fix ThemeService resource loading**
Change `ThemeService.loadThemes()` from filesystem path loading to classpath resource loading (`getClass().getResourceAsStream()`). Ensures the game works when packaged as a JAR.

---

### Priority 2 — High Impact, Moderate Risk

**2.1 Decompose BridgeView into ViewComponents**
Extract each rendering concern (HUD header, dual-pane layout, compass, inventory overlay, lattice trace, lattice map, telemetry) into focused `ViewComponent` objects with a `List<String> render(int width)` interface. `BridgeView` becomes a compositor. Requires care to preserve visual output — the visual baseline tests would catch regressions.

**2.2 Apply State pattern to Floor**
Replace `Floor.isCorridorActive` boolean with explicit `ElevatorState` and `CorridorState` objects implementing a `FloorState` interface. Eliminates conditional branching in `getOptions()` and `getExtraContent()`, and makes the transition explicit. Risk: the mutation state persistence for `isCorridorActive` would need to migrate to the new state representation.

**2.3 Trim GameState**
Move `bridgeView` to `RenderingCoordinator`, `actionMapper` and `inputHandler` to `TurnProcessor`, `navEngine` to `NavigationOrchestrator`. `GameState` becomes a leaner data container. Risk: requires updating all consumers that currently access these via `state.*`.

**2.4 Extract synthesis and resonance logic from Player**
Move `mergeItems()` and resonance detection into a `SynthesisService`. `Player.mergeItems()` becomes a delegation call. The ritual/resonance logic is testable independently. Risk: low, but requires updating callers.

---

### Priority 3 — Medium Impact, Higher Risk

**3.1 Introduce a domain event system**
Replace direct `JournalManager.logDiscovery()`, `JournalManager.logCapture()`, and ritual trigger calls with domain events (`LocationEntered`, `ItemCaptured`, `SynthesisPerformed`, `RitualCompleted`). `JournalManager` becomes a listener. This decouples the model from the logging subsystem. Risk: pervasive change, requires an event bus infrastructure.

**3.2 Split ProceduralFactory into per-type factories**
Define a `LocationFactory<T extends Location>` interface with `create()` and `populate()` methods. One implementation per location type. `ProceduralFactory` becomes a registry/facade. Risk: large refactor, must be done incrementally (one type at a time, per the Refactor Guard).

**3.3 Wrap frequency as a SpectralFrequency value object**
Replace the `int frequency` field on `InventoryItem` with a `SpectralFrequency` value object encapsulating resonance checks, master number detection, and frequency arithmetic. Risk: touches `Player`, `InventoryItem`, `Gematria`, and any UI rendering frequency values.

**3.4 Formalize RoomCategory enum**
Replace string-based room type matching in `AnomalousTrace.matches()` with a `RoomCategory` enum. Each `AnomalousTrace` value maps to a `Set<RoomCategory>`. Risk: requires updating `NameGenerator` room type strings and `ProceduralFactory` room creation.

---

### Priority 4 — Lower Impact, Informational

**4.1 Fix Floor save/restore ordering**
`Floor.enter()` resets `isCorridorActive = false` before mutation state is applied. If `isCorridorActive` is persisted, it will be overwritten by the entry reset. The mutation state application should precede or bypass the entry reset. This is a subtle correctness issue rather than a UX-visible bug in most play scenarios.

**4.2 Clarify NavigationEngine placement**
`NavigationEngine` is a stateful input policy (remembers `lastChoice`). Consider whether it belongs on `GameState` or should be owned by `TurnProcessor`/`ActionMapper` where it is most used. Low structural impact.

**4.3 Add persistent Player.visitedPaths to GameMemento**
`visitedPaths` (high-level path tracking, distinct from `visitedLIPs`) is not included in `GameMemento`. If any UI element depends on it, restoration will produce a discrepancy. Confirm whether this is intentional.

**4.4 Consider HeadlessRunner fluent DSL**
Wrap `HeadlessRunner` in a fluent test builder for cleaner, more maintainable headless tests. Low risk, improves test readability over time.

---

*End of Analysis. No source code changes have been made or are authorized by this document.*
*To proceed with any item, consult the Vinculum Protocol in `.claude/CODEX.md`.*
