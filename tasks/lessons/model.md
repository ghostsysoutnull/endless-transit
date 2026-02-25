# Model Domain Lessons

## Patterns
- **Lazy Initialization**: Always populate child locations on-demand (via `ensureChildrenPopulated()`) to support infinite scale without memory exhaustion.
- **Lazy Load Re-entrancy Guard**: Always set the `childrenPopulated` flag to `true` **BEFORE** calling `populateChildren()`. This prevents infinite recursion if internal logic (like object distribution or Groovy property access) triggers the getter again during the population process.
- **Path Stability**: Use breadcrumb-style paths (`Universe > Filament > ...`) for immersive navigation.
- **Procedural Projection**: For spatial mapping in infinite/stateless hierarchies, use child-node hashes to project stable `[X, Y]` coordinates. This avoids the need to store coordinates in the model while maintaining visual stability when returning to the same location.

## Mistakes/Corrections
- **Recursive Calls**: Ensure `getName()` or `getPath()` do not trigger infinite recursion in complex nested structures. Use direct type checks (`instanceof`) where property access might be circular.
- **Indy Property Dispatch**: In Groovy, accessing a property (e.g., `rooms.add(x)` or `rooms.size()`) within its own class still triggers the getter. If the getter calls `ensureChildrenPopulated()`, it will loop indefinitely unless the guard flag is set upfront.
- **List Reference Stability**: Use `list.clear()` and `list.addAll()` (or direct field access `this.@list`) inside `populateChildren()` rather than re-assigning the property (`list = []`) to ensure external callers who already have a reference to the list see the populated data.
