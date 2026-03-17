# Domain Invariants: Structural Hierarchy

> Gemini equivalent: `GEMINI.md` (same directory)

**ARCHITECTURAL CONSTRAINTS**
- **No Anemic Models:** Classes MUST encapsulate both data and behavior.
- **Behavioral Integrity**: Never strip narrative methods or unique UI logic during refactoring.
- **Behavior-Driven Mutation**: State changes happen through domain-meaningful methods (e.g., `destabilize()`).
- **Polymorphism Over Conditionals**: `Container` subclasses must implement `getMapSymbol()`/`getMapColor()` directly.
- **Strict UI Decoupling**: The model MUST NOT import from `com.endlesstransit.ui`. Use `ModelOutput.fmt`.

## 📐 World Architecture
- **Structure**: Recursive Composite Pattern (Universe -> Room).
- **Population**: Lazy Initialization. Children are ONLY generated when accessed.

## 🏗️ Technical Invariants
1. **LIP Integrity**: The **Locus Identity Path** (LIP) must be unique and stable.
2. **Re-entrancy Guard**: Set `childrenPopulated = true` *before* calling `populateChildren()`.
3. **Parent Referencing**: Correctly set `parent` upon population.
4. **Mutation Persistence**: Use `mutationState` map keyed by LIP.
5. **Output Abstraction**: All `Renderable` objects MUST use `ModelOutput.fmt`.

## 🏛️ Verification Checklist
- [ ] **Structural Crawl**: Deep hierarchy requests work.
- [ ] **Recursive Safety**: No infinite loops during population.
- [ ] **Property Consistency**: Name, path, and vibes are stable.

## 🧬 Localized Lessons
- **Model Domain Lessons**: @tasks/lessons/model.md
