# Domain Invariants: Entropy & Synthesis

**ARCHITECTURAL CONSTRAINTS**
- **Strict Determinism:** Every generator MUST be stateless. No static `Random` or `ThreadLocalRandom`.
- **Branch Integrity:** Child seeds MUST be derived using `locus.branch(index)`.
- **Service-Based Generation (HK-008):** there is no static factory. `Game` builds one `ProceduralFactory(fmt)` (`game.factory`, final) and injects it into `NavigationOrchestrator` and `PersistenceService`; `WorldGenesis.createInitialWorld` and `SyncManager.restore` take it as a parameter; `SeedScanner` and tests build their own (`new ProceduralFactory(new StandardTerminalAdapter())`). Every `Container` the facade hands out carries `factory` (the registry that made it) and `Container.populateChildren()` asks it; a hand-built container with no `factory` fails loud on first lazy access. The single `ThemeService` is the facade's `themeService` field (there is no `ThemeService.instance`).
- **Semantic Variance:** Component engines MUST accept an explicit seed.
- **One Factory per Location Type (Phase 9):** creation and population of each type live in its `<Type>Factory implements LocationFactory<T>` (`getType()`, `populate(T)`, typed `create(...)`). `ProceduralFactory` is a registry facade: it keeps every `create*` signature as a delegator, and `Container.populateChildren()` calls `populate(Container)`, which dispatches on the exact class (HK-005) — a new location type is a registry entry, not a `populateChildren` override. Factories reach `fmt`, `themeService` and sibling factories only through their `registry` back-reference, at call time. Never `instanceof` a factory; ask the registry (`factoryFor`).

## ⚛️ The Seed of Reality
- **Primary Source**: `LocusSeed.groovy`.
- **Philosophy**: Mathematical determinism.

## 🧬 Entropy Rules
1. **Vertical Branching**: `locus.branch(index)` for child locations.
2. **Horizontal Variability**: `locus.nextRandom()` for sequential attributes.
3. **Immutability**: `LocusSeed` is an immutable value object.
4. **Service Determinism**: Never use static `Random` in utilities. A bare `new Random()` anywhere under `model/` or `procgen/` fails lint (`NoUnseededRandomInWorld`, HK-015).

## 🏛️ Verification Checklist
- [ ] **Seed Stability**: Same seed produces same world.
- [ ] **Entropy Isolation**: Changes in one branch don't affect others.
- [ ] **Name Uniqueness**: Names are sufficiently varied.

## 🏺 Localized Lessons
- **Entropy Domain Lessons**: @../../../../../../tasks/lessons/procgen.md
