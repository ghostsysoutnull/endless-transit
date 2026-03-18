# Core Domain Lessons

## Patterns
- **Import Management**: Use explicit imports for domain boundaries. When many model classes are needed, `import com.endlesstransit.model.*` is acceptable to reduce boilerplate.
- **Static Verification**: Use `@CompileStatic` on core logic classes to catch missing imports and property mismatches at compile-time, which are often missed by AI agents in dynamic Groovy.
- **Memento-Based State Reconstitution**: Instead of serializing complex object trees, use a `GameMemento` that captures the `masterSeed`, `LIP` (Locus Identity Path), and player metrics (coherence, inventory, history). This allows for perfect restoration of state via re-simulation of the world from the root.
- **Input Abstraction (Flight Recorder)**: Use an `InputSource` interface to decouple the game loop from `System.in`. This enables `MockInputSource` for automated tests and recording player input for deterministic replays.

- **Pre-check tests as migration checklists**: A safety-net test pinning a primitive contract becomes a precise migration guide when the type changes. Every failing assertion after a field-type migration is a required update, not a problem. Treat the failure list as a compiler-assisted diff of every site that coupled to the old type.
- **Value object wrapping a primitive: update `assertEquals` assertions to use `.value`**: JUnit calls `expected.equals(actual)`, so `assertEquals(121, spectralFrequency)` → `Integer.equals(SpectralFrequency)` → always false, even with a custom `equals()` override on the value object. When migrating a field from `int` to a value object, update all `assertEquals(literal, item.field)` assertions to `assertEquals(literal, item.field.value)`.

## Mistakes/Corrections
- **Redundant Imports**: After large-scale package moves, always perform a search-and-replace to remove outdated `import com.endlesstransit.<Class>` declarations that cause "already declared" errors.
- **Circular Dependencies**: Keep `core` as the orchestrator; it should depend on `model`, `ui`, and `procgen`, but they should ideally not depend back on `Game` or `core` logic if possible.
- **Numeric Method Signatures**: When a method (like `adjustCoherence`) needs to handle both integers and floating-point values (e.g., from `drainRate`), use `Number` as the parameter type instead of `double` or `int` to avoid `MissingMethodException` in Groovy's dynamic dispatch. Use `.toDouble()` or `as double` within the method for safe math.
- **Null-Safe User Input**: Never assume `lastChoice` or `previousActionMap` contain data during the first pass of the game loop. Use explicit null checks and type casting in `getRawUserInput` to prevent startup NPEs.
- **Diagnostic Context**: Always include the `masterSeed` in critical failure reports. A procedural bug is impossible to fix without the exact seed that generated the failing state.
- **Flight Recorder History Stability**: When restoring a game from a Memento, ensure the `InputHandler` history is also restored. If the history is cleared during restoration, choice-based logic (like "01" selection) can fail during replay.
