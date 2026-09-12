# RECOVERY HANDOVER: [OOA_STRUCTURAL_REFACTORING]
**Last updated:** 2026-09-11 (Phase 9 merged `--no-ff` @ `f032326` and pushed)

## 🎯 Current Status
- **Test Suite:** 197 discovered / 192 pass / 5 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`)
- **Branch:** `master`, pushed to `origin/master` (Phase 9 merged `--no-ff` @ `f032326`; suite + scan re-run green on `master`).
  Working tree clean.
- **Active Work:** Phase 9 close-out done (chronicle `0xa5b92b9`, `docs/retro/RETRO_PHASE_9.md`, lessons promoted).
  Housekeeping backlog has three OPEN items (HK-005, HK-006, HK-007 — see `tasks/backlog/HOUSEKEEPING.md`).
  Workflow backlog clean; **Phase 10 is a cadence review point** (every 3 phases).
- **Next Phase:** Phase 10 — Domain Event System, after (1) merging Phase 9, (2) the backlog cadence review.

## ✅ State of the substrate in one paragraph
`ProceduralFactory` is a 198-line registry facade: every pre-split `create*` / `populate*` / `countSubLocations`
signature survives as a one-line delegator to one of fourteen `<Type>Factory` classes (`LocationFactory<T>`:
`getType()`, `populate(T)`, plus a typed `create(...)`); `factoryFor(Class)` and `populate(Container)` dispatch on the
exact model class. Factories reach `fmt`, `themeService` and sibling factories through a `registry` back-reference at
call time. No model class, core service or test changed. `LocusSeed` is pure — factory call order cannot shift entropy;
only `nextRandom()` sequences are order-sensitive, and both uses stayed inside their own method. `ProcgenDeepSnapshotTest`
(seed 0x1234) pins nine behaviors that had no assertion before. `Floor` state, `BridgeView` composition, `FrameEntropy`
and the 36-frame golden gate are as described in the Phase 8 handover.

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git log --oneline -5` (top: `f032326` merge). Read `tasks/todo.md`,
   the Phase 9 + Phase 10 sections of `docs/analysis/OOA_REFACTOR_PLAN.md`, and `docs/retro/RETRO_PHASE_9.md`
   "Concerns for Upcoming Phases".
3. **Audit:** `./vinc.sh --test --agent 2>/dev/null` — expect `STATUS=PASS DISCOVERED=197 SUCCEEDED=192 FAILED=0 SKIPPED=5`.
4. **Cadence review (Phase 10 trigger):** open `docs/analysis/WORKFLOW_BACKLOG.md` (clean) and `tasks/backlog/HOUSEKEEPING.md`
   (HK-005 registry dispatch from `Container.populateChildren`, 14 model files; HK-006 test hygiene; HK-007 filament
   NullSector roll — **user decision, changes every world**). Recommend HK-005 + HK-006 as one bounded housekeeping session
   before Phase 10; put HK-007 to the user as a question, do not act on it.
5. **Phase 10:** branch `refactor/phase-10-domain-events`. Re-read `EventBusTest` (`@Disabled`, stubs from 0.5g) and
   `JournalManager` call sites in `Player`, `Room`, `Building` before planning; `/grill` before asking for authorization;
   ELI5 in chat, detail in the plan file. Max 4 production files per commit (Phase 10 cap).
6. **Phase end:** merge `--no-ff`, `/chronicle`, `docs/retro/RETRO_PHASE_10.md`, promote lessons, refresh this file.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| Active refactor plan | `docs/analysis/OOA_REFACTOR_PLAN.md` |
| Latest chronicles | `journals/CHRONICLE_INDEX.md` (0xa5b92b9 Phase 9, 0xa70f86e Phase 8, 0xd021a66 housekeeping) |
| Retros | `docs/retro/RETRO_PHASE_9.md`, `docs/retro/RETRO_PHASE_8.md` |
| Per-type factories | `src/main/groovy/com/endlesstransit/procgen/{LocationFactory,*Factory}.groovy` |
| Procgen pins | `src/test/groovy/com/endlesstransit/procgen/{ProcgenDeepSnapshotTest,ProcgenSnapshotTest,ProceduralFactoryRegistryTest}.groovy` |
| Golden frames + harness | `src/test/groovy/com/endlesstransit/ui/{golden/,HudFrameHarness,BridgeViewGoldenFrameTest,ViewComponentGoldenTest,GoldenFrameGenerator}.groovy` |
| Housekeeping backlog | `tasks/backlog/HOUSEKEEPING.md` (HK-005, HK-006, HK-007 open) |
| Workflow backlog | `docs/analysis/WORKFLOW_BACKLOG.md` (clean; review due: Phase 10) |
| Plan interrogation | `.claude/commands/grill.md` |
| Lessons | `tasks/lessons/{ui,infrastructure,core,model,procgen}.md` |
| Safety mandates | `tasks/lessons/POST_MORTEM_2026_03_11.md`, `tasks/lessons/POST_MORTEM_2026_03_06.md` |

## ⚠️ Lessons carried into Phase 10
- Read the entropy primitive before an entropy-sensitive refactor: `LocusSeed` is pure; `nextRandom()` is the only stateful draw.
- A pure roll inside a loop is one roll (HK-007 is the live example).
- Under `@CompileStatic`, register typed instances one call at a time; typed list literals of concrete fields fail STC.
- A State/Strategy/Factory hierarchy is defeated by one `instanceof` in a client; `/grill` check 5 greps for it.
- Write pinning tests against the public surface; capture literals from `master` before any production change; never regenerate them silently.
- Move bodies by script with a reverse-substitution check; chain `move && test && commit` so a failed check cannot reach a commit.
