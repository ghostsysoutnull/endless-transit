# 🛡️ TRIPLE_LOCK_MIGRATION_PROTOCOL (TLMP)

**Status:** ACTIVE MANDATE
**Objective:** Ensure 100% logic and "Vibe" preservation during architectural refactoring and service decomposition.

---

## 🌌 PHILOSOPHY
Refactoring the Vinculum is a high-risk operation. Code is not just text; it is **observable behavior**. We do not move a single line until its current state is "pinned" by deterministic tests and visual baselines.

---

## 🔒 LOCK 1: THE BEHAVIORAL PIN (BASELINE)
Before any code is moved or modified, a **Pinning Suite** must be established for the target logic.

1.  **Pinning Tests:** Create unit tests that exercise 100% of the target method's branches (e.g., Abyssal vs. Standard drain, Entropic vs. Ancient multipliers).
2.  **Visual Baselines:** Use `./vinc.sh --scan` to capture "Golden Master" screenshots for specific seeds. These screenshots must remain pixel-perfect after the refactor.
3.  **State Dumps:** Capture a raw `GameMemento` before and after the turn to ensure that internal state mutation is identical.

---

## 🔒 LOCK 2: THE "SHADOW" EXTRACTION (ZERO-RISK MOVE)
Avoid "Cut and Paste" erasures. Use a Shadow Migration to verify logic parity in real-time.

1.  **Shadow Implementation:** Create the new service (e.g., `SurvivalService`) with the exact same logic as the legacy method.
2.  **Dual-Run Assertion (Optional):** During the migration turn, the orchestrator may run BOTH the legacy logic and the new service, asserting that the results (coherence, position, inventory) are identical.
3.  **Legacy Preservation:** Keep the original code commented out within the class or in a "Legacy" method until Lock 3 is verified.

---

## 🔒 LOCK 3: THE LOGIC-DIFF PROOF
When deleting legacy code, the agent must provide a human-verifiable **Logic Map**.

1.  **Mapping Table:** A side-by-side comparison:
    *   *Legacy (TurnProcessor:45):* `player.adjustCoherence(-drain)`
    *   *New (SurvivalService:12):* `player.adjustCoherence(-drain)`
2.  **Verification Gate:** Execute the Full Test Suite and perform a Visual Baseline Check. Any failure (test fail or 1-pixel shift) triggers an **Immediate Revert** to Git HEAD.

---

## 🛡️ THE REVERT-FIRST SHIELD MANDATE
- **No "Fixing Forward":** If a refactor breaks a baseline, do not attempt to fix it in-place. Revert, re-analyze the legacy logic, and re-attempt.
- **Atomic Units:** One service per turn. Do not batch-refactor multiple domains.
- **Vibe Integrity:** If a change is technically correct but "feels" different (e.g., terminal timing, color shifts), it is a failure.

---

## 🏗️ EXECUTION_QUEUE (Ref: docs/vision/NEXT_STEPS.md)
1.  **SurvivalService Migration** (Target: `TurnProcessor.processTurn`)
2.  **CommandRegistry Migration** (Target: `TurnProcessor.initializeGlobalCommands`)
3.  **InputOrchestrator Migration** (Target: `TurnProcessor.handleInput`)
4.  **WorldStateRepository Migration** (Target: `Game.state` / `PersistenceService`)
