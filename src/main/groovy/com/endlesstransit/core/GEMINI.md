# Core Domain: The Engine

## ⚙️ Game Loop & State
- **Primary Loop**: `Game.groovy` manages the turn cycle.
- **Input Delegation**: Entrusted to `InputHandler`, `ActionMapper`, and `NavigationEngine`.

## 🏗️ Technical Invariants
1. **Turn Integrity**: Every turn MUST update the `ActionMapper` with current options.
2. **Deterministic Inputs**: The engine is moving toward an `InputSource` abstraction.
3. **No Terminal Direct-Access**: All output must go through `Terminal` / `RenderSink`.

## 🏛️ Verification Checklist
- [ ] **Startup Test**: Does a new game initialize without NPEs?
- [ ] **Turn Consistency**: Are mapping and navigation state-correct?
- [ ] **Survival Mechanics**: Does coherence drain correctly?

## 🏺 Localized Lessons
@../../../../../../tasks/lessons/core.md
