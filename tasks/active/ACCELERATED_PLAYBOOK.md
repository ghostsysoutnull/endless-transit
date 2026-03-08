# Vinculum Diagnostic Suite: Accelerated Implementation Playbook

## ⚡ Execution Mode: ACCELERATED (Phase 1)
**Goal:** Complete Phase 1 (Output Abstraction) in **one session** using high-velocity "Execution Strikes."

---

## 🥊 STRIKE 1: The Infrastructure (The "Skeleton")
- **Action:** Create the `RenderSink` interface and implementations in a single turn.
- **Files to Create:**
    - `src/main/groovy/com/endlesstransit/ui/RenderSink.groovy` (Interface)
    - `src/main/groovy/com/endlesstransit/ui/ConsoleSink.groovy` (Stdout)
    - `src/main/groovy/com/endlesstransit/ui/MemorySink.groovy` (Buffer/Screenshot)
    - `src/main/groovy/com/endlesstransit/ui/TeeSink.groovy` (Decorator)
- **Tooling:** Use `write_file` for all 4 files in parallel.

## 🥊 STRIKE 2: The Core Refactor (The "Brain Surgery")
- **Action:** Refactor `Terminal.groovy` to inject a `List<RenderSink>` and initialize the `VirtualBuffer`.
- **Target File:** `src/main/groovy/com/endlesstransit/ui/Terminal.groovy`
- **Method:** Use a single, surgical `replace` to swap internal mechanics of the `Terminal.post()` or `println` wrappers.

## 🥊 STRIKE 3: The Bulk Conversion (The "Muscle")
- **Action:** Perform a global migration of all `println` calls to the new sink architecture.
- **Method:** 
    1. Use `grep_search` to find all `println` in `src/`.
    2. Delegate the batch refactor of 10+ files to a **`generalist` sub-agent**.
- **Efficiency:** Complete the entire migration in one background turn.

---

## 🏛️ Verification Pass (Immediate Validation)
- Run `./run.sh --test`.
- Perform a manual "Vibe Check" (Run the game and check for alignment glitches).
- Fix any regressions in a single "Act" turn.
