# DESIGN SPEC: Logic Decoding & Behavioral Specification (The Vinculum Codex)

## 🌌 Objective
Systematically extract, document, and verify all game rules, procedural logic, and mathematical formulas within Endless Transit. This "Neural Map" will serve as the absolute reference point during the structural decomposition of the `core` domain, ensuring behavioral parity.

---

## 🏛️ Phase 1: Core Formula & Invariant Extraction
**Goal:** Identify the global "laws of physics" that govern the simulation.

### 📍 Key Domains
1.  **Entropy & Generation (ProcGen):**
    - Document `LocusSeed.branch(index)` derivation logic.
    - Document `NameGenerator` selection weights and theme-mapping.
    - Document `Gematria` calculation (How strings translate to numeric resonance).
2.  **Player Mechanics (Coherence):**
    - Document the exact formula for Coherence drain per turn.
    - Document "Coherence Thresholds" and their impact on HUD rendering.
3.  **Spatial Hierarchy (Model):**
    - Document the invariants of the `Universe` -> `Room` hierarchy.
    - Document "Child Population" rules (e.g., "Buildings must have 1-99 floors").

### 📦 Output
- `docs/logic/CORE_PHYSICS.md`
- `docs/logic/FORMULA_INDEX.md`

---

## ⚙️ Phase 2: Class-Level Behavioral Mapping (Neural Mapping)
**Goal:** Create a per-class specification for all critical logic components.

### 📍 Methodology
- For each class in `src/main/groovy`, document:
    - **Responsibilities:** What does this class "know" and "do"?
    - **Public API Behavior:** Expected inputs/outputs for all critical methods.
    - **State Transitions:** How internal state changes (e.g., `isCorridorActive`).
    - **Dependencies:** Which other classes it relies on for its logic.

### 📦 Output
- `docs/logic/classes/<DOMAIN>/<CLASS_NAME>.md` (e.g., `docs/logic/classes/model/Floor.md`)

---

## 🏺 Phase 3: Cross-Domain Orchestration Logic
**Goal:** Document the interaction patterns between the engine, the model, and the interface.

### 📍 Key Interactions
1.  **Turn Cycle Orchestration:**
    - Step-by-step breakdown of `TurnProcessor.process()`.
    - How `ActionMapper` is populated and prioritized.
2.  **Navigation Flow:**
    - The "Spatial Pivot" logic between Vertical (Elevator) and Horizontal (Corridor) states.
    - Rules for "Auto-Entry" (e.g., entering an Apartment automatically when it's the only option).
3.  **UI Data Mapping:**
    - How `Model` attributes (Vibes, Tech Era) translate to specific ANSI colors and symbols.

### 📦 Output
- `docs/logic/ORCHESTRATION_FLOW.md`

---

## 🛡️ Phase 4: The "Logic-Test" Alignment (Verification)
**Goal:** Ensure the documentation matches the actual code and its tests.

### 📍 Validation Protocol
1.  **Test Mapping:** For every documented rule, identify the corresponding JUnit 5 test case that verifies it.
2.  **Gap Analysis:** Identify "Dark Logic"—code that has rules but no corresponding automated tests.
3.  **Parity Lock:** Once a domain's logic is documented and tested, it is "Locked" for refactoring.

---

## 📈 Incremental Execution Strategy
1.  **Sprint 1 (Foundations):** Complete `CORE_PHYSICS.md` and `FORMULA_INDEX.md`.
2.  **Sprint 2 (Domain Mapping):** Map the `model` and `procgen` classes.
3.  **Sprint 3 (Orchestration):** Map `core` and `ui` coordination logic.
4.  **Sprint 4 (Verification):** Final Audit against the JUnit 5 suite.

---
*End of Logic Decoding Plan. Neural Trace Stabilized.*
