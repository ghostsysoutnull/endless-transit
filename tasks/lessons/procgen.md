# Entropy & ProcGen Domain Lessons

## Patterns
- **Vertical vs. Horizontal Entropy**: Use `locus.branch(index)` for child location seeds (vertical, hierarchy-stable) and `locus.nextRandom()` for sequential attributes within a single location (horizontal, within-node variance). Mixing these causes seed drift.
- **Hierarchical Seed Scrambling**: Initialize a single `Random` (scrambler) from the parent seed and call `nextLong()` for each child's seed. Avoids the repetition pattern from linear seeding (`seed + index`).
- **Service Determinism**: All component engines (`NameGenerator`, `ThemeService`) must accept an explicit `LocusSeed`. Never use `new Random()` or `ThreadLocalRandom` inside utility methods — this introduces seed drift during parallel tests.
- **SeedScanner + WorldProbe Pattern**: Use the Specification Pattern (`WorldProbe.shouldEnter(Location)`) to prune subtrees during seed scans. Drastically reduces scan time versus full-universe traversal.
- **Scenario Discovery**: `SeedScanner` + `SeedVault` for horizontal exploration; `WorldGenesis.resolveLIP` for vertical restoration from a saved LIP string.

## Mistakes/Corrections
- **Static Seed Pollution**: Static `Random` instances in utility classes cause tests to pass in isolation but fail in batch due to state leakage. Always instantiate a new `Random` with the provided seed per call.
- **Repetition Drift**: Siblings that look identical are caused by using `seed + index` instead of a scrambled `nextLong()` per child. Fix: use `HierarchicalSeedScrambling` pattern above.
- **Factory Ordering Sensitivity**: The order in which `ProceduralFactory` methods are called affects the seed state. Any refactor that changes call order (e.g., extracting per-type factories) must be verified with `DeterministicUniverseTest` after every step.
