# Domain Invariants: Entropy & Synthesis

**ARCHITECTURAL CONSTRAINTS**
- **Strict Determinism:** Every generator MUST be stateless. No static `Random` or `ThreadLocalRandom`.
- **Branch Integrity:** Child seeds MUST be derived using `locus.branch(index)`.
- **Service-Based Generation:** Use `ProceduralFactory.instance` and `ThemeService.instance`.
- **Semantic Variance:** Component engines MUST accept an explicit seed.

## ⚛️ The Seed of Reality
- **Primary Source**: `LocusSeed.groovy`.
- **Philosophy**: Mathematical determinism.

## 🧬 Entropy Rules
1. **Vertical Branching**: `locus.branch(index)` for child locations.
2. **Horizontal Variability**: `locus.nextRandom()` for sequential attributes.
3. **Immutability**: `LocusSeed` is an immutable value object.
4. **Service Determinism**: Never use static `Random` in utilities.

## 🏛️ Verification Checklist
- [ ] **Seed Stability**: Same seed produces same world.
- [ ] **Entropy Isolation**: Changes in one branch don't affect others.
- [ ] **Name Uniqueness**: Names are sufficiently varied.

## 🏺 Localized Lessons
- **Entropy Domain Lessons**: @tasks/lessons/procgen.md
