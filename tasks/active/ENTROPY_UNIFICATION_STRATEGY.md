# ACTIVE TASK: Entropy Unification & Mixer Pattern

## Objective
Refactor the `LocusSeed` branching logic to use a unified, high-entropy `EntropyMixer` strategy. This eliminates the "32-bit bottleneck" in string-based branching and ensures consistent, non-linear divergence across all procedural generators.

## Context & Blueprints
- **Design Philosophy:** "Mathematical Chaos via Immutable Laws."
- **Core Concept:** The `EntropyMixer` encapsulates the LCG/XOR-scramble logic, decoupling the *identity* of a seed from its *mathematical divergence*.

---

## Phase 1: The Scrambling Substrate
- [x] **1.1 Define `EntropyMixer` Interface**
    - Create `src/main/groovy/com/endlesstransit/procgen/EntropyMixer.groovy`.
    - Contract: `long mix(long base, long input)`.
- [x] **1.2 Implement `StandardMixer`**
    - Create `src/main/groovy/com/endlesstransit/procgen/StandardMixer.groovy`.
    - Migrate the LCG constants: `MULT = 2862933555777941757L`, `INC = 3037000493L`.
- [x] **1.3 Unit Test: Entropy Divergence**
    - Verify that sibling seeds have a high Hamming distance (>30% bit-flip).

## Phase 2: LocusSeed Refactor
- [x] **2.1 Integrate Mixer into `LocusSeed`**
    - Update `LocusSeed.groovy` to delegate all `branch` calls to a `StandardMixer` instance.
- [x] **2.2 Unify Branching Methods**
    - `branch(int)` -> `mixer.mix(value, (long)index)`.
    - `branch(String)` -> `mixer.mix(value, (long)key.hashCode())`.
- [x] **2.3 Implement `branch(long)`**
    - Enable direct 64-bit seed mixing for advanced procedural synthesis.

## Phase 3: Domain Verification
- [x] **3.1 Verification: Building/Corridor Variety**
    - Run `./vinc.sh --test` to ensure no regression in door/room variance.
- [x] **3.2 Verification: Theme Divergence**
    - Use `SeedScanner` to verify that `branch("WALLS")` and `branch("FLOORS")` are statistically distinct.

## Phase 4: Finalization
- [x] **4.1 Update Documentation**
    - Refine `src/main/groovy/com/endlesstransit/procgen/GEMINI.md` with the Mixer architecture.
- [x] **4.2 Chronicle Entry**
    - Log the stabilization of the universal mathematical laws via `skill-chronicle`.

---

## Session History & Notes
- **2026-03-10:** Brainstormed the `EntropyMixer` pattern to solve the "32-bit bottleneck" in string hashes and unify structural/semantic branching.
