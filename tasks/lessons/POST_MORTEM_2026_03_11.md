# POST-MORTEM: [SESSION_0x7E2A] – Structural Collapse & Vibe Regression
**Date:** March 11, 2026
**Status:** DISCARDED & REVERTED

## 1. Objective
The session aimed to "decompress" the `core` package, decouple `GameState`, and migrate to JUnit 5. While the structural goals were technically achieved (compilation passed, 42/42 tests passed), the **behavioral integrity** and **visual identity (Vibe)** of the game were severely compromised.

## 2. The Failure (What Went Wrong)
During the "Package Decompression" (Phase 2), the complex logic-rich model classes (`Building`, `Floor`, `Room`, `Street`, etc.) were inadvertently replaced with "skeleton" or "anemic" versions. 
*   **Result:** Loss of the graphical elevator column, the multi-column street view, and the detailed "Neural Link" room narratives.
*   **Deception:** Because the "skeleton" classes implemented the `Location` interface correctly, the game didn't crash, and basic structural tests passed, masking the massive loss of game features.

## 3. Root Causes
1.  **High-Entropy Batch Operations:** Attempting to move 40+ files and update 50+ imports in a single "Execution" phase created too much noise. Collateral damage to class contents went unnoticed.
2.  **Subagent/Template Hallucination:** During the file movement, the agent (or subagent) used simplified "templates" of the model classes instead of the actual, high-fidelity versions stored in the workspace.
3.  **Weak Visual Assertions:** Existing tests verified that locations could be *entered*, but did not verify the *content* of the TUI (e.g., "Does the building view contain the string 'RADAR'?").
4.  **"Whack-a-Mole" Recovery:** Once the error was spotted, the manual restoration process was incomplete and missed several files (`Street`, `City`, `Planet`), leading to a "broken" feel.

## 4. Lessons Learned
*   **Structural != Behavioral:** Passing a compilation check and basic "non-crash" tests is insufficient for a project where the TUI *is* the experience.
*   **Visual Baselines are Mandatory:** Before a structural refactor, a "Visual Audit" (screenshots or string-match baselines) must be established.
*   **Decompression must be Incremental:** Moving a whole package hierarchy at once is a "YOLO" move that failed. We should move one sub-package at a time and verify the "Vibe" after each move.

## 5. New Operational Mandates (The "Shield")
1.  **Explicit Confirmation (ZERO_ASSUMPTION):** The agent MUST NOT start creating, updating, or deleting files (code or docs) without explicit, absolute confirmation from the user. Implementation work cannot begin based on a general plan approval; a specific directive to "start implementing" is required.
2.  **Git Gatekeeper:** `git commit` and `git push` operations are strictly forbidden unless a specific, individual confirmation is given for that exact action.
3.  **Reference Screenshots:** Before ANY change to `model` or `ui` packages, run a full diagnostic capture (`./vinc.sh --scan`) to provide a "Before" state for comparison.
4.  **Semantic String Tests:** Add tests to `InitialScreenTest` that check for the presence of "Vibe-Critical" UI markers (e.g., `[NEURAL_LINK_INTERPRETATION]`, `[ELEVATOR_DIAGNOSTICS]`).
5.  **Diff-Verification:** When a file is moved, the agent MUST verify that the *logic* inside the file (methods, descriptions) remains 100% identical to the original via `git diff`.
6.  **Incremental Execution:** No more "Phase-level" batch moves. Sub-tasks (e.g., "Move 5 Command classes") must be the atomic unit of work.

---
*Signed,*
**The Vinculum Architect**
