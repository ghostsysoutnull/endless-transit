# RECOVERY HANDOVER: [OOA_STRUCTURAL_REFACTORING]
**Last updated:** 2026-09-11 (Phase 8 merged; WF-004/WF-005 closed; pushed)

## 🎯 Current Status
- **Test Suite:** 184 discovered / 179 pass / 5 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`)
- **Branch:** `master`, pushed to `origin/master` (Phase 8 merged `--no-ff` @ `a70f86e`, close-out docs, WF-004, WF-005). Working tree clean.
- **Active Work:** None. Housekeeping backlog (`tasks/backlog/HOUSEKEEPING.md`) is empty. Workflow backlog clean (WF-004 and WF-005 closed this session; next review: Phase 10).
- **Next Phase:** Phase 9 — ProceduralFactory Split, **in a new session**.

## ✅ State of the substrate in one paragraph
`Floor` no longer carries a mode boolean: `Floor.currentState` is a `FloorState` (`ElevatorState` / `CorridorState`
stateless singletons); the only transitions are `enterCorridor()` / `returnToElevator()`; clients ask the Floor
(`getOptions`, `getExtraContent`, `getScanTarget`) and never `instanceof` a state class. Mutation state persists
`"state": "ELEVATOR" | "CORRIDOR"` (no legacy reader — pre-Phase-8 traces restore in elevator mode, by decision).
`BridgeView` is a 120-line compositor over eight `ViewComponent`s; every HUD noise source is seeded by `FrameEntropy`;
the visual gate is 36 golden frames compared raw, regenerated only via `./vinc.sh --goldens` after an intended visual
change. `./vinc.sh --scan` is a model gate only. `GameState` holds data only; `TurnProcessor.dispatch` is the single
command path.

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git log --oneline -5`. Read `tasks/todo.md` and the Phase 9
   section of `docs/analysis/OOA_REFACTOR_PLAN.md`.
3. **Audit:** `./vinc.sh --test --agent 2>/dev/null` — expect `STATUS=PASS DISCOVERED=184 SUCCEEDED=179 FAILED=0 SKIPPED=5`.
4. **Phase 9:** branch `refactor/phase-9-factory-split`. Plan on the Phase 9 section; `/grill` before asking for
   authorization; present plans ELI5 in chat, detail in the plan file. Phase 9 is one factory per commit (9a–9o);
   read `ProceduralFactory.groovy` in full before proposing the `LocationFactory<T>` contract. Coverage to quote
   (open the files): `DeterministicUniverseTest`, `ProcgenSnapshotTest` (pinned values for seed 0x1234),
   `ProcgenVariabilityTest`, `SystemNameTest`, `LandmarkDiscoveryTest`. Any golden diff is a finding.
   Pattern integrity is now part of `/grill` check 5 (WF-004 closed).
5. **Gates for a procgen phase:** `DeterministicUniverseTest` after every factory; full suite (goldens included) +
   `./vinc.sh --scan` seed 0 → 9 nodes after 9o. Max 3 production files per commit (Phase 9 cap).
6. **Phase end:** merge `--no-ff`, `/chronicle`, `docs/retro/RETRO_PHASE_9.md`, promote lessons, refresh this file.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| Active refactor plan | `docs/analysis/OOA_REFACTOR_PLAN.md` |
| Latest chronicles | `journals/CHRONICLE_INDEX.md` (0xa70f86e Phase 8, 0xd021a66 housekeeping, 0x1111857 Phase 7) |
| Retros | `docs/retro/RETRO_PHASE_8.md`, `docs/retro/RETRO_PHASE_7.md` |
| Golden frames + harness | `src/test/groovy/com/endlesstransit/ui/{golden/,HudFrameHarness,BridgeViewGoldenFrameTest,ViewComponentGoldenTest,GoldenFrameGenerator}.groovy` |
| Floor state contract | `src/test/groovy/com/endlesstransit/model/FloorStateContractTest.groovy` |
| Housekeeping backlog | `tasks/backlog/HOUSEKEEPING.md` (empty) |
| Workflow backlog | `docs/analysis/WORKFLOW_BACKLOG.md` (clean; next review: Phase 10) |
| Plan interrogation | `.claude/commands/grill.md` |
| Lessons | `tasks/lessons/{ui,infrastructure,core,model}.md` |
| Safety mandates | `tasks/lessons/POST_MORTEM_2026_03_11.md`, `tasks/lessons/POST_MORTEM_2026_03_06.md` |

## ⚠️ Lessons carried into Phase 9
- A State/Strategy hierarchy is defeated by one `instanceof` in a client; `/grill` check 5 now greps for it (WF-004).
- Never `instanceof` a field inside its own `@CompileStatic` class — the STC narrows it for later methods. Delegate instead.
- `STATUS=ABORTED` from `--agent` means production code called `System.exit` mid-suite (`Game`'s crash handler); `LAST_STARTED` names the test. Rerun with `-q` for the failures before the exit.
- Write pinning tests against the public surface (option closures, rendered lines), never the field being replaced — they then survive the refactor untouched.
- Move bodies by script with a reverse-substitution check; confirm what a gate exercises before trusting it; read assertions before claiming coverage.
