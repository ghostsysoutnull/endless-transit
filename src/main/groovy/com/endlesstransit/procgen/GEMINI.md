# ProcGen Domain: Entropy & Synthesis

## ⚛️ The Seed of Reality
- **Primary Source**: `LocusSeed.groovy`
- **Philosophy**: Mathematical determinism. Given a seed, the universe is pre-calculated.

## 🧬 Entropy Rules
1. **Vertical Branching**: Use `locus.branch(index)` to derive seeds for child locations.
2. **Horizontal Variability**: Use a local `Random` (via `locus.nextRandom()`) for sequential attributes within a single location.
3. **Immutability**: `LocusSeed` is an immutable value object. Never modify its internal state.

## 🏛️ Verification Checklist
- [ ] **Seed Stability**: Does the same seed produce the same world?
- [ ] **Entropy Isolation**: Do changes in one branch affect other branches?
- [ ] **Name Uniqueness**: Are building/room names sufficiently varied?

## 🏺 Localized Lessons
@../../../../../../tasks/lessons/procgen.md
