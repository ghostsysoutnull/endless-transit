# Retro: Phase 8 — Floor State Pattern
**Date:** 2026-09-11 | **Suite at close:** 184 discovered / 179 pass / 5 skipped / 0 failed | **Duration:** ~2.8s
**Chronicle:** journals/LOG_20260911_182049_0xa70f86e.md
**Branch:** `refactor/phase-8-floor-state` — 6 commits, merged to `master` @ `a70f86e`

---

## What Went Well

- **The pinning test was written to outlive the refactor.** `FloorStateContractTest` drives every transition through the option closures (`c. Enter Corridor`, `b. Back to Elevator`) instead of the flag, so it needed zero edits across 8a, 8b and 8b-ii and was a live gate the whole way. Five behaviors that had no assertion now have one, including the bedrock floor and scan routing.
- **Scripted move, again zero drift.** Three method bodies lifted by exact text, thirteen listed substitutions, reverse check asserted before any file was written. The generated classes needed no hand edits.
- **The 4-file cap shaped the commits, not the design.** A one-commit read delegator (facade-first, `core.md`) let 8a stay at four production files with every caller compiling; 8b deleted it. Both halves of 8b-ii split the same way.
- **The user's decision on legacy traces removed a whole step.** Asked once, answered once ("I do not care with previously saved game sessions"), and the migration reader never existed.
- **Every gate ran after every commit**, goldens included; no golden moved at any point.

---

## Challenges

- **The plan blessed an `instanceof` on the concrete state.** `ScanCommand` checking `currentState instanceof CorridorState` passed `/grill` and was committed in 8b. The user caught it. The fix (8b-ii) was the right one — `FloorState.getScanTarget(Floor)` — and it also exposed that the deserialization ternary was the same smell in a different coat. Two commits, ~40 minutes. Logged as WF-004.
- **Groovy STC narrowed a field from an `instanceof` in another method.** The temporary delegator's `currentState instanceof CorridorState` made `getOptions()` emit a checkcast and throw in elevator mode. Seven tests failed with a ClassCastException at a line that contains no cast. Identity compare fixed it; the probe confirmed property reads from other classes do not leak. Lesson in `model.md`.
- **The suite went silent, not red.** The first sign of the STC problem was an empty line where `STATUS=` should have been. The close-out audit reproduced it: `Game`'s loop catch-all calls `System.exit(1)`, so the ClassCastException inside a loop-driven test killed the test JVM before the summary. Not a runner reporting bug — a production crash handler running inside the runner. Logged as WF-005 (High).

---

## Surprises

- **OOA item numbering drifted.** The plan cites "OOA 2.2" for this phase; report §2.2 is leaf-node duplication (Phase 4a). The State pattern is report §4.11 and roadmap item 2.2. Both are now cited in the plan section.
- **Frame 15 is not "a Floor in corridor mode".** The harness walks `children[0]` of the Floor, which is the Corridor location itself. Floor-in-corridor-mode rendering had no golden; the contract test's delegation-equality pin is the guard.
- **`Corridor.getOptions()` contributes `l. Leave Corridor` to the Floor's corridor menu**, which exits the Floor, not the corridor. Pre-existing, preserved verbatim, now pinned by key order. Worth a product look someday.

---

## Concerns for Upcoming Phases

- **WF-005 (High) blocks Phase 9:** the test runner must survive a `System.exit` from production code (shutdown hook → `STATUS=ABORTED`). One short runner-only session before any Phase 9 code.
- **WF-004:** `/grill` needs a pattern-integrity question when a plan introduces a State/Strategy hierarchy. Not a seventh check — fold into check 2 or 5. Assess at the Phase 10 cadence review.
- **Phase 9 (ProceduralFactory split) is fourteen commits by design.** Determinism is the gate (`DeterministicUniverseTest` + `ProcgenSnapshotTest`); goldens will move only if generation order changes, which would be a finding.
- **`@CompileStatic` and `instanceof` on fields:** Phase 9 factories will hold typed fields; the lesson applies. Delegate, do not inspect.
- **Old `session.trace` files now restore in elevator mode.** Declared, accepted by the user, worth one line in any player-facing changelog.
