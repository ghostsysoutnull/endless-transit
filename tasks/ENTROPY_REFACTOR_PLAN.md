# Refactor Plan: LocusSeed Abstraction (Managed Entropy)

This plan tracks the transition from primitive `long` seeds to a dedicated `LocusSeed` object to improve deterministic branching and semantic procedural generation.

## Phase 1: The LocusSeed Class
- [ ] Create `com.endlesstransit.procgen.LocusSeed`.
- [ ] Implement `@CompileStatic` and immutability.
- [ ] Implement `branch(String key)` and `branch(int index)` for deterministic derivation.
- [ ] Implement semantic helpers:
    - [ ] `checkProbability(double threshold)`
    - [ ] `pickFrom(List<T> list)`
    - [ ] `nextInt(int bound)`
    - [ ] `nextLong()`

## Phase 2: Domain Migration (Model & Interface)
- [ ] **Location Interface**: Update `getSeed()` to `getLocus()` and `setSeed()` to `setLocus()`.
- [ ] **Container Base**: Update `long seed` to `LocusSeed locus`.
- [ ] **Model Classes**: Batch update all location types (Planet, Building, Room, etc.) to use `LocusSeed` in constructors and field definitions.
- [ ] **Player Class**: Update `masterSeed` usage if applicable.

## Phase 3: ProceduralFactory Overhaul
- [ ] **Decouple Random**: Remove all manual `new Random(seed)` calls.
- [ ] **Locus Branching**: Use `locus.branch()` for child generation instead of manual seed offsets.
- [ ] **Semantic Generation**: Replace `nextInt()` logic with `locus.checkProbability()` and `locus.pickFrom()` for better readability.

## Phase 4: Persistence & Infrastructure
- [ ] **SyncManager**: Ensure `LocusSeed` handles JSON serialization (or just stores the underlying `long` but reconstitutes the object).
- [ ] **Main/Game**: Update the entry point where the initial `masterSeed` is generated.

## Phase 5: Verification
- [ ] **Unit Tests**: Update `ProceduralFactoryTest`, `DeepLatticeCrawlTest`, and `SyncManagerTest`.
- [ ] **Determinism Audit**: Verify that the same initial seed produces the exact same world structure across runs.

---
**Progress Tracking**:
- **Phase 1**: [IN_PROGRESS]
- **Phase 2**: [ ]
- **Phase 3**: [ ]
- **Phase 4**: [ ]
- **Phase 5**: [ ]
