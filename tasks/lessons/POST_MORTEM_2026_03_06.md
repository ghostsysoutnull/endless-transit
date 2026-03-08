# Post-Mortem & Process Optimization: March 6, 2026

## Overview
Today's development was characterized by a transition from **UI/Aesthetic Refinement** to **Deep Core Logic Stabilization**. While the visual "Cyber-Terminal" vibe reached a high state of polish, several underlying architectural flaws (Lazy Loading, Recursion, and Input Matching) were exposed as we pushed deeper into the procedural hierarchy.

## Issues Found & Resolved

### 1. The "Ghost Apartment" Bug (Lazy Loading)
- **Problem**: Users could enter a Corridor, see valid Apartment options, but upon entering an Apartment, they found an empty room list with no way to move forward.
- **Root Cause**: The procedural generation (`populateChildren`) was only triggered by the `children` list. However, specialized lists (like `rooms` in `Apartment` or `apartments` in `Corridor`) were being accessed directly via property access (e.g., `this.rooms`), which bypassed the `ensureChildrenPopulated()` guard.
- **Fix**: Implemented explicit getters (e.g., `getRooms()`) that mandate a population check and updated the `model.md` lessons to enforce this pattern.

### 2. HUD Ambiguity (The "ALIGN" Confusion)
- **Problem**: The `ALIGN: X / Y` label was interpreted by users as the number of rooms inside an apartment, leading to confusion when that number didn't match the available choices.
- **Fix**: Renamed `ALIGN` to `LOCUS_INDEX` and implemented context-sensitive labels (`STRATA`, `Z-AXIS`, `INDEX`). Updated `Apartment.getName()` to return the specific `doorDescription` for better spatial awareness.

### 3. Numeric Input Matching (Zero-Agnosticism)
- **Problem**: Users typing `1` would fail to match menu options labeled `01.`, causing "Invalid choice" errors.
- **Fix**: Developed a "Forensic" menu matcher in `Game.groovy` that normalizes both input and labels to their integer values before comparison, allowing `1`, `01`, and `001` to all resolve correctly.

### 4. Recursion & Math Crashes
- **Problem**: Infinite loops in `Building.getFloor` and `BigDecimal` division errors in `Random` constructors.
- **Fix**: Implemented re-entrancy guards in `ensureChildrenPopulated()` and strictly cast coordinates to `long`/`double` before seeding `Random` instances.

---

## The Struggles (Technical Debt & AI Context)
1.  **Groovy Property Magic**: Groovy's automatic getter/setter generation often hid the fact that we were bypassing our own `ensureChildrenPopulated()` logic. The "Indy" property dispatch made it easy to accidentally create re-entrancy loops.
2.  **ANSI Character Width**: Calculating the visual width of strings containing 2-cell icons (like ⬚) and ANSI escape codes proved nearly impossible for standard `String.length()`, leading to broken UI borders. We eventually solved this by using the **Cursor Horizontal Absolute (CHA)** escape sequence (`\u001b[nG`) to force border alignment regardless of character count.
3.  **Context Noise**: As the codebase grew, subagents occasionally "forgot" that certain lists were lazy-loaded, leading them to write code that accessed fields directly instead of through the safe getters.

---

## Process Improvements & Ideas

### 1. Mandatory Safe-Accessors (Architectural)
*   **Rule**: No child list should ever be `public` or accessed via `this.list`. 
*   **Improvement**: Use `@PackageScope` or `private` for lists and force all internal and external access through `getXXX()`. This makes lazy-loading bulletproof.

### 2. Forensic Debug Mode (Instrumentation)
*   **Improvement**: We implemented a "Forensic Logging" mode today that tracks why a menu choice fails to match. We should keep this as a standard feature that can be toggled via a `--debug` flag to avoid "black box" input failures.

### 3. Verification-First Planning (Workflow)
*   **Improvement**: Before fixing a bug, we now mandate the creation of a `repro.groovy` or a specific `ReproTest`. This saved us today by proving that the `StructuralConsistencyTest` was failing even when the game *appeared* to work.

### 4. Automated Vibe-Checks (Testing)
*   **Idea**: Create a `VibeTest` that renders the UI to a string and checks for ANSI corruption (broken borders or truncated escape codes). This would prevent the "Ghost Colors" bug from reaching the master branch.

## Conclusion
The "Cyber-Terminal" is now structurally sound. The transition from visual polish to architectural stability was difficult but necessary to support the "Endless" promise of the simulation. Moving forward, we must respect the **Lazy Loading** mandate as the most critical law of the codebase.
