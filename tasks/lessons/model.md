# Model Domain Lessons

## Patterns
- **Lazy Initialization**: Always populate child locations on-demand (via `ensureChildrenPopulated()`) to support infinite scale without memory exhaustion.
- **Path Stability**: Use breadcrumb-style paths (`Universe > Filament > ...`) for immersive navigation.

## Mistakes/Corrections
- **Recursive Calls**: Ensure `getName()` or `getPath()` do not trigger infinite recursion in complex nested structures. Use direct type checks (`instanceof`) where property access might be circular.
