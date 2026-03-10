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
- [x] **1.1 Object Distribution De-duplication**
  - **Issue:** `LocusSeed` helper methods (like `pickFrom`) create a new `Random` instance per call.
  - **Fix:** Refactor `ThemeService.generateHybridObject` and `generateAtmosphere` to use an advanced single `Random` instance.
- [x] **1.2 Objective Frequency Collision**
  - **Issue:** `OBJ:` fields in HUD collide on the same frequency due to reset seeds.
  - **Fix:** Use `player.stepCount` to branch the action locus in `Room.processAction`.
- [x] **1.3 Furniture Variance**
  - **Issue:** Sibling objects in rooms are identical because they aren't uniquely branched or advanced.
  - **Fix:** Use a single advancing `Random` in `ProceduralFactory`.

### 2. UI Alignment & Layout
- [x] **2.1 Right-Border Correction (Box-in-a-Box Overflow)**
  - **Issue:** `Room.getExtraContent` hardcoded a width of 100.
  - **Fix:** Refactored `Renderable.getExtraContent` to accept a `width` parameter. Updated all 14+ implementations to be layout-aware.
- [x] **2.2 ANSI-Blind Padding**
  - **Issue:** `String.format` counted ANSI codes as width.
  - **Fix:** Implemented `OutputFormatter.padRight()` using `TUIValidator.getVisualWidth()` and updated models to use it.
- [x] **2.3 Text Wrapping & Overflow**
  - **Issue:** `OBJECTS_DETECTED` block overflowed.
  - **Fix:** (Partially addressed by width-aware refactor; further refinement pending if BridgeView needs custom wrapping).

### 3. Polish & Aesthetics
- [x] **3.1 Narrative Consistency**
  - **Fix:** Updated `ThemeService.generateAtmosphere` to use the room's functional `trait` (e.g., Agricultural) to select structure themes.
- [x] **3.2 Pulse Traversal Meta-data**
  - **Verify:** Confirmed `PULSE_TRAVERSAL` tracks `stepCount` while `LIP` and Sparkline track depth. Verified as intended.

---

## Session History & Notes
- **2026-03-10:** Initial analysis of `actual_screenshot.txt`. Identified major repetition in object lists and alignment drift.
- **2026-03-10:** Technical RCA complete.
- **2026-03-10:** Batch refactor of `getExtraContent` completed. Entropy de-duplication applied to `ProceduralFactory` and `ThemeService`.
- **2026-03-10:** Fixed compilation errors in model classes caused by `BigDecimal` division in `@CompileStatic` contexts.
- **2026-03-10:** Verified fixes with live game run. Repetition in furniture/objects is resolved. HUD alignment is improved using `padRight` and layout-aware widths.

