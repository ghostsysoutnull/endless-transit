# BEHAVIORAL SPEC: LocusSeed (ProcGen)

## 🌌 Responsibility
The `LocusSeed` is the "genetic code" of a location. It encapsulates the simulation's deterministic entropy, preventing "primitive obsession" with raw long seeds and ensuring stable, non-linear branching.

---

## ⚙️ Public API Behavior

### 📍 Deterministic Branching
- **`branch(String key)`**: Derives a new seed from a semantic label (e.g., "WALLS"). This ensures that different aspects of the same location (e.g., atmosphere vs. furniture) have unique but stable seeds.
- **`branch(int index)`**: Derives a new seed for a child node. This is the primary mechanism for hierarchical expansion (e.g., parent -> child 0, parent -> child 1).
- **`next()`**: Advances the internal seed state. Useful for generating multiple unique seeds within a single loop without manual index management.

### 📍 Semantic Utility Methods
- **`pickFrom(List)`**: Picks a random element from a list using the seed.
- **`checkProbability(double threshold)`**: Returns `true` if a random `0.0 to 1.0` roll is below the threshold.
- **`nextInt(int min, int max)`**: Returns a random integer within a range.
- **`nextBoolean()`**: Returns a random boolean.

### 📍 Infrastructure
- **`nextRandom()`**: Returns a standard `java.util.Random` instance initialized with the current seed value. This is used for sequential attributes within a single generation step.

---

## 🔄 Logic Invariants
- **Immutability**: `LocusSeed` is an `@Immutable` value object. Every branching operation returns a **new** instance, ensuring the original seed remains untouched.
- **Stable Hashing**: Hashing is performed via the `StandardMixer` (LCG-based), which guarantees that two identical `LocusSeed` objects will branch identically for the same input.

---

## 🔗 Dependencies
- **`StandardMixer`**: The mathematical engine that performs the actual bit-scrambling.

---
*Neural Map Stabilized.*
