# Model Domain: Structural Hierarchy

**AI ARCHITECT CONTEXT: DOMAIN MODEL**
- **No Anemic Models:** Classes MUST encapsulate both data and behavior. Avoid "bags of getters/setters."
- **Behavior-Driven State Mutation:** State changes must happen through domain-meaningful methods (e.g., `location.destabilize(amount)` instead of `location.setCoherence(...)`).
- **Polymorphism Over Conditionals:** Refactor scale-based checks (Universe vs. Room) into polymorphic Strategy or State patterns.
- **Strict Interface Segregation:** The `Location` interface is currently a "God Interface." Any refactor MUST decompose it into smaller, focused interfaces (e.g., `Navigable`, `Renderable`, `Stateful`) to prevent "Leaky Abstractions" where a `Door` must implement navigation logic.
- **Zero Dependencies:** The `model` is the center. It must NEVER import from `ui` or `core`. Use interfaces for `procgen` interaction.

## 📐 World Architecture
- **Structure**: Recursive Composite Pattern (Universe -> Room).
- **Population**: Lazy Initialization. Children are ONLY generated when accessed.

## 🏗️ Technical Invariants
1. **LIP Integrity**: The **Locus Identity Path** (LIP) must be unique and stable. `WorldGenesis.resolveLIP` is the mandatory bridge for state restoration.
2. **Re-entrancy Guard**: Use `childrenPopulated` to prevent recursion loops.
3. **Parent Referencing**: Every `Location` MUST have its `parent` set correctly upon population.
4. **Mutation Persistence**: Use `mutationState` map keyed by LIP for all player-driven modifications.

## 🏛️ Verification Checklist
- [ ] **Structural Crawl**: Do deep hierarchy requests work?
- [ ] **Recursive Safety**: Are there infinite loops during population?
- [ ] **Property Consistency**: Do name, path, and vibes remain stable across calls?

## 🧬 Localized Lessons
@../../../../../../tasks/lessons/model.md
