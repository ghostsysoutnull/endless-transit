# Vinculum Vibe Refinement Report (2026-03-10)

## Overview
This document summarizes the technical debt and visual regressions identified during the diagnostic pass of the **Endless Transit** TUI and the corresponding architectural fixes applied to restore "Cyber-Brutalism" alignment and entropy diversity.

---

## 1. Entropy Collision (The "Repetition Bug")
### Issue
Sibling objects (furniture, room items) were generating as identical strings across multiple slots.
### RCA (Root Cause Analysis)
Convenience methods in `LocusSeed` (e.g., `pickFrom`, `nextInt`) were internally instantiating `new Random(value)` for every call. Since the `LocusSeed` value remained static during a loop (e.g., `locus.branch("FURN_" + i)` where `i` was the only variable), the resulting `Random` instances were reset to the same state, yielding identical results for the first `nextInt()` call in each iteration.
### Fix
- Refactored `ThemeService` and `ProceduralFactory` to initialize a **single** `Random` instance per generation block.
- Logic now advances that single instance through the pool, ensuring horizontal diversity without losing vertical determinism.

## 2. HUD Frequency Collision
### Issue
The `OBJ:` field in the `BridgeView` HUD displayed identical frequencies for captured items.
### RCA
`Room.processAction` branched the `LocusSeed` with a static string `"ACTION"`. Multiple captures in the same room resulted in the same "random" frequency because the seed never advanced between player turns.
### Fix
- Injected `player.stepCount` into the branching logic: `locus.branch("ACTION").branch(player.stepCount)`.
- This ensures that every distinct time-step in the universe produces a unique frequency, even within the same physical location.

## 3. ANSI-Blind Padding & Layout Drift
### Issue
Boxed segments in the diagnostic panels were jagged or truncated with `...` despite having seemingly enough space.
### RCA
1. **Padding:** Standard Java/Groovy `String.format("%-45s")` treats ANSI escape sequences as visual characters. A string with 20 chars of text + 15 chars of ANSI codes is treated as 35 chars wide, leading to incorrect padding calculations.
2. **Width Mismatch:** `Room.getExtraContent` hardcoded a width of `100`, while the `BridgeView` adaptive layout allocated only `88` characters to the left pane. This triggered the `Terminal.ansiSafeTruncate` safety guard.
### Fix
- **Output Virtualization:** Refactored `Renderable.getExtraContent` to accept a `width` parameter, making all model rendering layout-aware.
- **Visual-Width Awareness:** Implemented `OutputFormatter.padRight()` which utilizes `TUIValidator` to calculate width *after* stripping ANSI.
- **Precision Alignment:** Replaced `String.format` with `padRight` for all internal table headers and rows.

## 4. Static Type-Checking Division Errors
### Issue
Compilation failed after refactoring for `@CompileStatic`.
### RCA
In Groovy 4, the `/` operator returns a `BigDecimal` (or `Double`) depending on context. Assigning `(width - 3) / 2` to an `int` field failed type-checking.
### Fix
- Migrated all layout calculations to use `.intdiv(2)` to enforce integer math at the bytecode level, ensuring performance and compatibility with strict typing.

## 5. Narrative Inconsistency
### Issue
Room descriptions (e.g., Hydroponic Bay) felt disconnected from their structural descriptions.
### RCA
`ThemeService.generateAtmosphere` was only aware of the global `mutation` state, not the functional `trait` of the room's parent (Country).
### Fix
- Updated the atmosphere synthesis engine to prioritize the functional `trait` (e.g., Agricultural, Research) when selecting structure themes, ensuring that a "Hydroponic Bay" actually renders with agricultural assets.

---
**Status:** ALL ISSUES RESOLVED & VERIFIED via Screenshot Capture.
