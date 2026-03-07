# Core Domain Lessons

## Patterns
- **Import Management**: Use explicit imports for domain boundaries. When many model classes are needed, `import com.endlesstransit.model.*` is acceptable to reduce boilerplate.
- **Static Verification**: Use `@CompileStatic` on core logic classes to catch missing imports and property mismatches at compile-time, which are often missed by AI agents in dynamic Groovy.

## Mistakes/Corrections
- **Redundant Imports**: After large-scale package moves, always perform a search-and-replace to remove outdated `import com.endlesstransit.<Class>` declarations that cause "already declared" errors.
- **Circular Dependencies**: Keep `core` as the orchestrator; it should depend on `model`, `ui`, and `procgen`, but they should ideally not depend back on `Game` or `core` logic if possible.
- **Numeric Method Signatures**: When a method (like `adjustCoherence`) needs to handle both integers and floating-point values (e.g., from `drainRate`), use `Number` as the parameter type instead of `double` or `int` to avoid `MissingMethodException` in Groovy's dynamic dispatch. Use `.toDouble()` or `as double` within the method for safe math.
- **Null-Safe User Input**: Never assume `lastChoice` or `previousActionMap` contain data during the first pass of the game loop. Use explicit null checks and type casting in `getRawUserInput` to prevent startup NPEs.
- **Diagnostic Context**: Always include the `masterSeed` in critical failure reports. A procedural bug is impossible to fix without the exact seed that generated the failing state.
