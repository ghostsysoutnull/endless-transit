# ProcGen Domain: Entropy & Synthesis

**AI ARCHITECT CONTEXT: ENTROPY ARCHITECT**
- **Strict Determinism:** Every generator MUST be stateless. The same `LocusSeed` and index MUST produce the exact same output. No static `Random` or `ThreadLocalRandom`.
- **Branch Integrity:** Child seeds MUST be derived using `locus.branch(index)`. Never generate a new root seed for a child location; entropy must flow down the hierarchy.
- **Lazy Synthesis:** Generators should only produce what is requested. Avoid "Pre-Calculated" objects that aren't immediately needed by the `model`.
- **Semantic Variance:** Ensure `NameGenerator` and `ThemeManager` use local seed-scrambling to prevent "Repetition Drift" where siblings look identical.

## ⚛️ The Seed of Reality
- **Primary Source**: `LocusSeed.groovy`
- **Philosophy**: Mathematical determinism. Given a seed, the universe is pre-calculated.

## 🧬 Entropy Rules
1. **Vertical Branching**: Use `locus.branch(index)` to derive seeds for child locations.
2. **Horizontal Variability**: Use a local `Random` (via `locus.nextRandom()`) for sequential attributes within a single location.
3. **Immutability**: `LocusSeed` is an immutable value object. Never modify its internal state.
4. **Mandatory Determinism**: Component engines (NameGenerator, ThemeManager) MUST accept an explicit seed. Static `Random` usage is forbidden.
5. **Scenario Discovery**: Use `SeedScanner` and `WorldProbe` for horizontal seed exploration.

## 🏛️ Verification Checklist
- [ ] **Seed Stability**: Does the same seed produce the same world?
- [ ] **Entropy Isolation**: Do changes in one branch affect other branches?
- [ ] **Name Uniqueness**: Are building/room names sufficiently varied?

## 🏺 Localized Lessons
@../../../../../../tasks/lessons/procgen.md
