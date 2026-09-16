# RECOVERY HANDOVER: [OOA_STRUCTURAL_REFACTORING]
**Last updated:** 2026-09-16 (Phase 10 merged @ `d02ac2e`; chronicle `0xd02ac2e`; retro `docs/retro/RETRO_PHASE_10.md`)

## 🎯 Current Status
- **Test Suite:** 203 discovered / 203 pass / 0 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`)
- **Branch:** `master`. Working tree clean after the docs commit. **Push status: see `git status -sb`** — the Phase 10 merge
  and docs may still be local if the user had not authorized a push at handover time.
- **Active Work:** none. **All ten planned OOA phases are complete.** Optional O1 (HeadlessRunner DSL) and O2 (CodeNarc)
  remain `NOT STARTED`. Housekeeping backlog has four OPEN items: HK-008 (static `ProceduralFactory.instance`), HK-009
  (`populateApartment` delegator), HK-010 (discovery journaling dead in production since 2026-03-05 — a **behavior change**
  to restore, needs a user decision), HK-011 (static `JournalManager`).
- **Next:** user decision among HK-010, O2, O1, HK-008/011. The next cadence review (CODEX: every 3 phases) falls at
  whatever phase follows.

## ✅ State of the substrate in one paragraph
`GameState.events` is the one `EventBus` (final, never replaced; exact-class dispatch in subscription order). `Player` is
the sole publisher: `capture(item, where)` is the only door into the buffer from the world and publishes `ItemCaptured`;
`mergeItems` publishes `SynthesisPerformed`. `Game` attaches two typed listeners once — `JournalManager.attach` (writes the
journal lines; still static internally, HK-011) then `RitualTracker.attach` (`Building.notifySampled` / `infusionCount++`,
moved verbatim out of the journal). A `Player` built outside `GameState` gets an inert bus (declared edge E1); the two
production sites that replace the player on restore hand in the state bus. No model class imports `JournalManager`
(invariant 7 in `model/CLAUDE.md`). `Container.populateChildren()` dispatches through the factory registry (HK-005);
`Floor` state, `BridgeView` composition, `FrameEntropy` and the 36-frame golden gate are as in the Phase 7–9 handovers.

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git status -sb` (check ahead/behind origin); `git log --oneline -5`
   (top: chronicle/retro docs commit above `d02ac2e` Phase 10 merge). Read `tasks/todo.md`, `docs/retro/RETRO_PHASE_10.md`
   "Concerns for Upcoming Phases", and `tasks/backlog/HOUSEKEEPING.md` OPEN items.
3. **Audit:** `./vinc.sh --test --agent 2>/dev/null` — expect `STATUS=PASS DISCOVERED=203 SUCCEEDED=203 FAILED=0 SKIPPED=0`.
4. **Ask before choosing:** there is no active phase. Present the four options (HK-010 behavior-change decision, O2 CodeNarc,
   O1 DSL, HK-008/011 singletons) and wait for a Directive. If HK-010: it is a behavior change — pin the journal `[LOC]` line
   first, own branch, own chronicle line, goldens must stay byte-identical (the harness feeds the journal directly).
   If HK-011: `getRecentEvents` moves into `RenderContext`; ticker goldens 20/21 are the gate.
5. **Every task:** plan file → `/grill` → authorization → branch → ≤4 production files per commit → full suite after every
   commit → merge `--no-ff` → `/chronicle` → retro → lessons → refresh this file.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| Active refactor plan | `docs/analysis/OOA_REFACTOR_PLAN.md` (Phase 10 section has the execution record) |
| Latest chronicles | `journals/CHRONICLE_INDEX.md` (0xd02ac2e Phase 10, 0xd5d26bc HK-005/006, 0xf6f8fc8 HK-007) |
| Retros | `docs/retro/RETRO_PHASE_10.md`, `docs/retro/RETRO_HOUSEKEEPING_HK_005_006.md` |
| Event system | `src/main/groovy/com/endlesstransit/core/{EventBus,DomainEvent,ItemCaptured,SynthesisPerformed,RitualTracker,JournalManager}.groovy`, `Player.capture`, `GameState.events` |
| Event pins | `src/test/groovy/com/endlesstransit/core/{JournalEventContractTest,EventBusTest}.groovy` |
| Per-type factories | `src/main/groovy/com/endlesstransit/procgen/{LocationFactory,*Factory}.groovy` |
| Golden frames + harness | `src/test/groovy/com/endlesstransit/ui/{golden/,HudFrameHarness,BridgeViewGoldenFrameTest,ViewComponentGoldenTest,GoldenFrameGenerator}.groovy` |
| Housekeeping backlog | `tasks/backlog/HOUSEKEEPING.md` (HK-008, HK-009, HK-010, HK-011 open) |
| Workflow backlog | `docs/analysis/WORKFLOW_BACKLOG.md` (clean) |
| Plan interrogation | `.claude/commands/grill.md` |
| Lessons | `tasks/lessons/{ui,infrastructure,core,model,procgen}.md` |
| Safety mandates | `tasks/lessons/POST_MORTEM_2026_03_11.md`, `tasks/lessons/POST_MORTEM_2026_03_06.md` |

## ⚠️ Lessons carried forward
- An import is not a call; a caller-less public method is a regression to `git log -S`, not a feature to wire (Phase 10).
- When a service becomes a listener, audit its side effects first — a model mutation inside it is a game rule (Phase 10).
- A bus outlives the aggregate that publishes on it: channel on the never-replaced object, injected by constructor (Phase 10).
- A disabled test guards nothing; quote assertions from enabled tests only (Coverage Claim Protocol).
- A State/Strategy/Factory/Observer hierarchy is defeated by one `instanceof` in a client; for events the client is the listener.
- Move bodies by script; assert on the construct, not the token; chain `edit && test && commit`.
