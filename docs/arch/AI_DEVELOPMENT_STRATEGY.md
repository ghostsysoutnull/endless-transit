# AI-Driven Development Strategy: Endless Transit

## 1. Overview
Developing a procedurally generated, infinite-scale simulation requires a shift from **Generative AI Development** (writing code that looks correct) to **Verified AI Development** (writing code that is empirically proven). In a project where state is calculated rather than stored, "silent failures" are the primary threat.

---

## 2. Language & Type Safety (The Groovy Mandate)
Groovy’s dynamic nature is a double-edged sword for AI agents. It allows for rapid prototyping but masks critical errors (missing imports, type mismatches) until runtime.

### Strategy: Forced Static Compilation
*   **Mandate**: All core domain classes (`model`, `procgen`, `core`) should migrate towards `@CompileStatic` or `@TypeChecked`.
*   **Objective**: Force the `./run.sh --test` cycle to catch `MissingPropertyException` or `MissingMethodException` during the compilation phase, preventing the AI from "hallucinating" available fields or methods.
*   **Encapsulation**: Fields representing child locations (e.g., `rooms`, `apartments`) must be `private` or `@PackageScope`. AI agents must be instructed to **never** access these fields directly, as doing so bypasses the `ensureChildrenPopulated()` lazy-loading guard.

---

## 3. Workflow: Empirical Verification (AI-TDD)
The high commit count (43 in one day) suggests a reactive "patch-and-run" cycle. To improve stability, the workflow must move to a **Reproduction-First** model.

### The Protocol:
1.  **Reproduction**: Before a fix is attempted, the agent **must** create a standalone `repro.groovy` or a targeted JUnit test that fails.
2.  **Forensic Analysis**: Use `Logger.info` and `Logger.error` to dump state *during* the failure. Do not guess the cause based on the stack trace alone.
3.  **Surgical Fix**: Apply the minimum code change required to pass the test.
4.  **Regression Check**: Run the full suite (`./run.sh --test`) to ensure the fix didn't introduce a recursion loop or a lazy-loading bypass elsewhere.

---

## 4. Visual Logic & ANSI Validation
AI agents are "blind" to the terminal; they see strings, not pixels. This leads to broken HUD borders and alignment issues when 2-cell Unicode icons (🏙) or ANSI codes are involved.

### Strategy: Terminology & Grid Math
*   **CHA Alignment**: Rely on the **Cursor Horizontal Absolute** (`\u001b[nG`) escape sequence for all right-side borders. This offloads the "math" of character widths to the terminal emulator itself.
*   **TUI Validator**: Implement a utility that strips ANSI codes and measures the "Visual Width" of strings, specifically handling 2-cell wide characters.
*   **HUD Semantic Stability**: Maintain a strict dictionary of HUD labels (`LOCUS_INDEX`, `STRATA`, `SHARD`) to prevent "Semantic Drift" where the AI renames UI elements, confusing the user’s mental map of the hierarchy.

---

## 5. Context & Memory Management
Gemini-CLI’s performance degrades as the context window fills with repetitive tool outputs.

### Optimization Strategy:
*   **Domain Personas**: When working in the `model` domain, the agent must treat the `model.md` lessons as **Hardcoded Laws**. 
*   **The "Lazy Load" Law**: *If a list is empty, it is not an error; it is an uninitialized state.* The agent must always check if `ensureChildrenPopulated()` has been called before concluding a location is "empty."
*   **Subagent Orchestration**: Delegate high-volume research (searching for every instance of a pattern) to the `codebase_investigator` subagent. This keeps the main agent’s context "clean" and focused on the high-level strategy.

---

## 6. Summary of Process Improvements
| Current Practice | Improved AI-Process |
| :--- | :--- |
| **Reactive Patching** | **Test-Driven Reproduction (TDD)** |
| **Dynamic Property Access** | **Strict Getter Encapsulation** |
| **Manual Border Padding** | **CHA (Absolute) Positioning** |
| **Generic HUD Labels** | **Context-Sensitive Terminology** |
| **Implicit Imports** | **Static Type Checking (`@CompileStatic`)** |

---
**Document Status**: *Finalized March 6, 2026. This strategy is now a project-wide mandate for all AI-assisted development sessions.*
