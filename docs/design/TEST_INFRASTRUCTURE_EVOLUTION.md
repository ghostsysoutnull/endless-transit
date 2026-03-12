# DESIGN SPEC: Test Infrastructure Evolution (Substrate Hardening)

## 🌌 Objective
Establish a high-fidelity, deterministic safety net to support the upcoming major structural refactoring of the `core` domain. This ensures that as we decouple `GameState` and `TurnProcessor`, we maintain bit-perfect procedural generation and structural integrity.

---

## 🏛️ Component 1: The Golden Master Snapshot Registry
**Scope:** Procedural Generation & Model Stability.

### 📍 Mechanism
1.  **Locus Crawl Service:** A specialized runner that traverses the hierarchy (`Universe` -> `Street` -> `Building` -> `Floor` -> `Room`) across 10 deterministic "Anchor Seeds".
2.  **Snapshot Capture:** For each location, capture:
    - **Visual Output:** The raw ANSI-formatted TUI (BridgeView).
    - **Model State:** A stable string representation of the `Location` properties (Name, Path, Vibes, Gematria).
3.  **Registry Storage:** Save these snapshots to `tests/resources/golden_masters/` keyed by `SEED_LIP.txt`.

### 🛡️ Verification Strategy
- **Identity Regression:** A new test suite that compares the current live generation against the Golden Master. 
- **Tolerance:** Zero-tolerance for diffs in procedural data. Any change to a building name or a room vibe will trigger a failure.

---

## ⚙️ Component 2: State-Machine Fuzzing (Chaos Monkey)
**Scope:** Loop Stability & Navigation Logic.

### 📍 Mechanism
1.  **Headless Chaos Runner:** An extension of `HeadlessRunner` that enters a loop of 100+ turns.
2.  **Randomized Navigation:** In each turn, it queries the `ActionMapper` for valid options and selects one at random (weighted toward movement).
3.  **Stress Invariants:** During the run, the system asserts:
    - **No Null States:** `ActionMapper` must never return an empty map.
    - **Coherence Drain:** Player metrics must update predictably.
    - **Deterministic Recovery:** The game must not enter an infinite "Command Dispatch" loop.

---

## 🏺 Component 3: Memento Parity Audit
**Scope:** Persistence & Save/Load Integrity.

### 📍 Mechanism
1.  **Deep Round-Trip Test:**
    - Initialize a game and play for 5 randomized turns.
    - Capture a `GameMemento` (Save).
    - Initialize a *second* `Game` instance using the same `masterSeed`.
    - Apply the `GameMemento` to the second instance.
2.  **Object-Graph Comparison:**
    - Compare the `Player` state, `NavigationHistory`, and `VisitedPaths` between both instances.
3.  **Success Condition:** The two instances must be behaviorally identical and produce the exact same `ActionMap` for the next turn.

---

## 👁️ Component 4: Visual Layout Invariants (TUI Linter)
**Scope:** Aesthetic Integrity & HUD Alignment.

### 📍 Mechanism
1.  **Structural Assertion Engine:** Uses the `VirtualBuffer` to inspect the "Shape" of the TUI rather than the content.
2.  **Invariants:**
    - **HUD Width:** All boxed elements must be exactly `Terminal.getVisualWidth()` wide.
    - **CHA Alignment:** Verify that the Cursor Horizontal Absolute (`\u001b[nG`) escape sequence is present at the end of every border line.
    - **ANSI Hygiene:** Ensure every line ends with a `\u001b[0m` (Reset) to prevent "Color Bleeding" in external terminals.

---

## 📈 Implementation Roadmap
1.  **Phase A:** Implement the **Golden Master Registry** (Highest Priority for ProcGen stability).
2.  **Phase B:** Implement the **Memento Parity Audit** (Required before `GameState` decomposition).
3.  **Phase C:** Deploy the **Chaos Monkey** & **Visual Linter**.

---
*End of Design Spec. Neural Trace Stabilized.*
