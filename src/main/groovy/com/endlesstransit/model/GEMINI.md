# Model Domain: Structural Hierarchy

**AI ARCHITECT CONTEXT: DOMAIN MODEL**
- **No Anemic Models:** Classes MUST encapsulate both data and behavior. Avoid "bags of getters/setters."
- **Behavioral Integrity**: A model class is its narrative and visual identity. Never strip narrative methods, detailed descriptions, or unique UI logic during structural refactoring.
- **Behavior-Driven State Mutation:** State changes must happen through domain-meaningful methods (e.g., `location.destabilize(amount)` instead of `location.setCoherence(...)`).
- **Polymorphism Over Conditionals:** Use polymorphic behavior for all display logic. Concrete `Container` subclasses must implement `getMapSymbol()` and `getMapColor()` directly; `instanceof` checks are forbidden in these domains.
- **Interface Segregation:** The `Location` interface is decomposed into focused traits: `Locatable` (identity), `Navigable` (movement), `Renderable` (display), and `Stateful` (mutation). Implement only what is necessary for a specific subtype.
- **Strict UI Decoupling:** The `model` MUST NOT import from `com.endlesstransit.ui`. All output formatting is delegated to `com.endlesstransit.model.OutputFormatter`, which is initialized via `com.endlesstransit.model.ModelOutput.fmt`.

## 📐 World Architecture
- **Structure**: Recursive Composite Pattern (Universe -> Room).
- **Population**: Lazy Initialization. Children are ONLY generated when accessed.

## 🏗️ Technical Invariants
1. **LIP Integrity**: The **Locus Identity Path** (LIP) must be unique and stable. `WorldGenesis.resolveLIP` is the mandatory bridge for state restoration.
2. **Re-entrancy Guard**: Use `childrenPopulated` to prevent recursion loops.
3. **Parent Referencing**: Every `Location` MUST have its `parent` set correctly upon population.
4. **Mutation Persistence**: Use `mutationState` map keyed by LIP for all player-driven modifications.
5. **Output Abstraction**: All `Renderable` objects MUST use `ModelOutput.fmt` for coloring or formatting strings. Physical terminal access is handled via the injected `TerminalAdapter`.

## 🏛️ Verification Checklist
- [ ] **Structural Crawl**: Do deep hierarchy requests work?
- [ ] **Behavioral Integrity**: Compare a random location's `getName()` and `getPath()` against a known baseline.
- [ ] **Recursive Safety**: Are there infinite loops during population?
- [ ] **Property Consistency**: Do name, path, and vibes remain stable across calls?

## 🧬 Localized Lessons
@../../../../../../tasks/lessons/model.md
