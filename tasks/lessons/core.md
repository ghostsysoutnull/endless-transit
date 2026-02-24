# Core Domain Lessons

## Patterns
- **Import Management**: Use explicit imports for domain boundaries. When many model classes are needed, `import com.endlesstransit.model.*` is acceptable to reduce boilerplate.

## Mistakes/Corrections
- **Redundant Imports**: After large-scale package moves, always perform a search-and-replace to remove outdated `import com.endlesstransit.<Class>` declarations that cause "already declared" errors.
- **Circular Dependencies**: Keep `core` as the orchestrator; it should depend on `model`, `ui`, and `procgen`, but they should ideally not depend back on `Game` or `core` logic if possible.
