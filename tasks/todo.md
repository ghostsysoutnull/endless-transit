# 🚀 Active Plan (Structural Pivot)
**Objective:** Decompress the `core` layer and resolve the `GameState` bottleneck to achieve a truly decoupled, testable, and scalable architecture.

---

## 📅 Roadmap (Pending Refactors)

### Phase 1: Critical Architecture Cleanup (PENDING)
- [ ] **Game.groovy Decomposition**: Decomposed into 5 specialized services (`GameState`, `TurnProcessor`, etc.).
- [ ] **Location Interface Segregation**: Split into `Locatable`, `Navigable`, `Renderable`, and `Stateful`.
- [ ] **Polymorphic Dispatch**: Removed `instanceof` checks; implemented `getMapSymbol()` in concrete classes.
- [ ] **Service Injection**: `ThemeService` and `ProceduralFactory` converted to instances.
- [ ] **Model/UI Decoupling**: Implemented `OutputFormatter` and `TerminalAdapter`.

### Phase 4: Verification & Advanced Auditing (PENDING)
- [ ] **SeedScanner**: High-performance headless world discovery with branch pruning.
- [ ] **Memento Pattern**: Robust state capture and LIP-based restoration in `GameMemento`.

---

## 🏛️ Phase 2 Recommendations
1.  **Start with 2.1 (LocusSeed)**: Foundational change for seed management.
2.  **Follow with 2.2 (Command Pattern)**: Cleans up the "Brain" of the game.
3.  **Implement 2.3 (Virtual Proxy)**: Removes "empty world" bugs caused by lazy-loading.
