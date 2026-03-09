# Model Domain Lessons

## Patterns
- **Lazy Initialization**: Always populate child locations on-demand (via `ensureChildrenPopulated()`) to support infinite scale without memory exhaustion.
- **Lazy Load Re-entrancy Guard**: Always set the `childrenPopulated` flag to `true` **BEFORE** calling `populateChildren()`. This prevents infinite recursion if internal logic (like object distribution or Groovy property access) triggers the getter again during the population process.
- **Path Stability**: Use breadcrumb-style paths (`Universe > Filament > ...`) for immersive navigation.
- **Procedural Projection**: For spatial mapping in infinite/stateless hierarchies, use child-node hashes to project stable `[X, Y]` coordinates. This avoids the need to store coordinates in the model while maintaining visual stability when returning to the same location.
- **Hierarchical Seed Scrambling**: To ensure variety between sibling nodes, use a single `Random` (scrambler) initialized with the parent's seed to generate unique `nextLong()` seeds for each child. This avoids the "repetition" pattern caused by linear seeding (`seed + index`).
- **Mutation-Persistence Architecture**: Any player-driven or non-deterministic changes (like building breaches or landmark status) should be stored in a `mutationState` map keyed by the location's Locus Index Path (LIP) to ensure perfect reconstitution during a load.
- **Lazy-Load Property Access**: Never access child lists (like `apartments`, `rooms`, `floors`) directly. Always use explicit getters (e.g., `getRooms()`) that invoke `ensureChildrenPopulated()` to prevent empty-state bugs during navigation or testing. In Groovy, even internal property access (e.g., `this.rooms`) triggers the getter, but explicit usage is safer for clarity.
- **Deterministic Component Engines**: All procedural components (e.g., `NameGenerator`, `ThemeManager`) MUST accept an explicit seed. Never use `new Random()` or `ThreadLocalRandom` inside utility methods, as this introduces "seed drift" during parallel tests.
- **LIP-to-Location Resolution**: Implement a recursive `resolveLIP` function that can traverse the `Universe` hierarchy using an index path (e.g., `0.1.5`). This is the bridge between a stored memento and a live world object.
- **Scenario Discovery (SeedScanner)**: Use the Specification Pattern (`WorldProbe`) to define world invariants. When scanning thousands of seeds, implement `shouldEnter(Location)` to prune subtrees that don't match the search criteria, drastically reducing scan time.

## Mistakes/Corrections
- **Recursive Calls**: Ensure `getName()` or `getPath()` do not trigger infinite recursion in complex nested structures. Use direct type checks (`instanceof`) where property access might be circular.
- **Indy Property Dispatch**: In Groovy, accessing a property (e.g., `rooms.add(x)` or `rooms.size()`) within its own class still triggers the getter. If the getter calls `ensureChildrenPopulated()`, it will loop indefinitely unless the guard flag is set upfront.
- **List Reference Stability**: Use `list.clear()` and `list.addAll()` (or direct field access `this.@list`) inside `populateChildren()` rather than re-assigning the property (`list = []`) to ensure external callers who already have a reference to the list see the populated data.
- **Static Seed Pollution**: Static `Random` instances in utility classes (like `NameGenerator`) cause tests to pass in isolation but fail when run in a batch due to state leakage. Always instantiate a new `Random` with the provided seed for every call.
