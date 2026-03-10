# ACTIVE TASK: Vibe Refinement & UI Alignment

## Objective
Address visual discrepancies, repetition bugs, and layout alignment issues identified in the `actual_screenshot.txt` diagnostic capture.

## Context & Blueprints
- **Diagnostic Capture:** `screenshots/actual_screenshot.txt`
- **Location:** `Fluorescent Grid [0xE9]` (LIP: `0.0.0.0.0.0.0.0.1.12.0.0.1`)
- **Visual Mandate:** Cyber-Brutalist (High density, perfect alignment, diverse entropy).

---

## 🎯 Refinement Backlog

### 1. Entropy & Diversity (The "Repetition Bug")
- [ ] **1.1 Object Distribution De-duplication**
  - Fix `Room` or `HydroponicBay` logic that allows 8+ identical `singularity seed` entries.
  - Implement a "Set-based" or "Weighted-Shuffle" distribution to ensure visual variety.
- [ ] **1.2 Objective Frequency Collision**
  - Ensure `OBJ:` fields in the top HUD do not display the exact same frequency/name unless intentionally grouped.
- [ ] **1.3 Furniture Variance**
  - Review `FurnitureGenerator` to ensure sibling objects in the same room branch their seeds correctly.

### 2. UI Alignment & Layout
- [ ] **2.1 Right-Border Correction**
  - Fix the `LOCAL_CELL_DIAGNOSTIC` box alignment. The right border `║` is currently misaligned/truncated.
  - Audit the use of `Terminal.getVisualWidth()` in `BridgeView.renderDiagnostics()`.
- [ ] **2.2 Text Wrapping & Overflow**
  - The `OBJECTS_DETECTED` block in the description area is overflowing or repeating awkwardly.
  - Implement a cleaner "List Formatter" for room objects that handles line breaks without breaking the side-by-side layout.

### 3. Polish & Aesthetics
- [ ] **3.1 Narrative Consistency**
  - Ensure "Hydroponic Bay" type matches the atmosphere ("blue exposed wiring" vs "organic data").
- [ ] **3.2 Pulse Traversal Meta-data**
  - Verify if `PULSE_TRAVERSAL: 8` matches the actual depth of the LIP (12 segments).

---

## Session History & Notes
- **2026-03-10:** Initial analysis of `actual_screenshot.txt`. Identified major repetition in object lists and minor alignment drift in the diagnostic panel.
