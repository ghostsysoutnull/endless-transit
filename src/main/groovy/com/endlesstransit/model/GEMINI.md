# Model Domain: Structural Hierarchy

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
