# RECOVERY HANDOVER: [OOA_STRUCTURAL_REFACTORING]
**Last updated:** 2026-09-16 (session chronicle `0xf7c7745`, retro `docs/retro/RETRO_SESSION_20260916.md`; HK-012 `fe739f4`; earlier today HK-011 `a307827`, HK-009 `a3f6e4d`, HK-010 `00194f4`)

## 🎯 Current Status
- **Test Suite:** 213 discovered / 213 pass / 0 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`)
- **Branch:** `master`, pushed. Working tree clean. Verify with `git status -sb`.
- **Active Work:** none. **All ten planned OOA phases are complete.** Optional O1 (HeadlessRunner DSL) and O2 (CodeNarc)
  remain `NOT STARTED`. **HK-010 is CLOSED** (discovery journaling restored as `LocationDiscovered`, a behavior change by
  user decision; goldens 13–18 regenerated). **HK-009 CLOSED** (delegator deleted; the explicit call had double-populated apartments in two tests). **HK-011 CLOSED** (`JournalManager` is `Game.journal`; ticker lines travel in `RenderContext.recentEvents`; the ticker now shows the
  discovered location's *name* — visual change by user decision, goldens 13–18). **HK-012 CLOSED** (user report: the suite had overwritten/deleted the player's `session.trace` since March; `Game.saveFile` +
  temp files in tests + guard assertions on the real file). **HK-008 CLOSED** (the last Service Locator: `Game.factory` is the one `ProceduralFactory`, injected into
  the services; every `Container` carries the registry that made it and `populateChildren()` asks it; `SeedScanner` and tests build their own; `FactoryWiringContractTest`).
  **The housekeeping backlog is empty.**
- **Next:** user decision between O2 CodeNarc (recommended; reshape as `./vinc.sh --lint` — `vinc.sh` never invokes Gradle) and O1. The next cadence review
  (CODEX: every 3 phases) falls at whatever phase follows.

## ✅ State of the substrate in one paragraph
`GameState.events` is the one `EventBus` (final, never replaced; exact-class dispatch in subscription order). `Player` is
the sole publisher: `capture(item, where)` is the only door into the buffer from the world and publishes `ItemCaptured`;
`mergeItems` publishes `SynthesisPerformed`. `Game` attaches two typed listeners once — `JournalManager.attach` (writes the
journal lines; one instance per `Game` since HK-011) then `RitualTracker.attach` (`Building.notifySampled` / `infusionCount++`,
moved verbatim out of the journal). A `Player` built outside `GameState` gets an inert bus (declared edge E1); the two
production sites that replace the player on restore hand in the state bus. No model class imports `JournalManager`
(invariant 7 in `model/CLAUDE.md`). `Container.populateChildren()` dispatches through the registry that created the container
(`Container.factory`, HK-008; `Game.factory` is the one instance, there is no static);
`Floor` state, `BridgeView` composition, `FrameEntropy` and the 36-frame golden gate are as in the Phase 7–9 handovers.

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git status -sb` (check ahead/behind origin); `git log --oneline -5`
   (top: chronicle docs commit above the HK-012 merge). Read `tasks/todo.md`, `docs/retro/RETRO_HK_011.md`
   "Concerns for Upcoming Phases", and `tasks/backlog/HOUSEKEEPING.md` OPEN items.
3. **Audit:** `./vinc.sh --test --agent 2>/dev/null` — expect `STATUS=PASS DISCOVERED=213 SUCCEEDED=213 FAILED=0 SKIPPED=0`.
4. **Ask before choosing:** there is no active phase and the housekeeping backlog is empty. Present the options (O2 CodeNarc as a
   `vinc.sh --lint` mode, O1 DSL) and wait for a Directive.
5. **Every task:** plan file → `/grill` → authorization → branch → ≤4 production files per commit → full suite after every
   commit → merge `--no-ff` → `/chronicle` → retro → lessons → refresh this file.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| Active refactor plan | `docs/analysis/OOA_REFACTOR_PLAN.md` (Phase 10 section has the execution record) |
| Latest chronicles | `journals/CHRONICLE_INDEX.md` (0xf7c7745 session wrap, 0xfe739f4 HK-012, 0xa307827 HK-011) |
| Retros | `docs/retro/RETRO_PHASE_10.md`, `docs/retro/RETRO_HOUSEKEEPING_HK_005_006.md` |
| Event system | `src/main/groovy/com/endlesstransit/core/{EventBus,DomainEvent,ItemCaptured,SynthesisPerformed,RitualTracker,JournalManager}.groovy`, `Player.capture`, `GameState.events` |
| Event pins | `src/test/groovy/com/endlesstransit/core/{JournalEventContractTest,EventBusTest}.groovy` |
| Factory wiring pins | `src/test/groovy/com/endlesstransit/procgen/FactoryWiringContractTest.groovy` (HK-008) |
| Per-type factories | `src/main/groovy/com/endlesstransit/procgen/{LocationFactory,*Factory}.groovy` |
| Golden frames + harness | `src/test/groovy/com/endlesstransit/ui/{golden/,HudFrameHarness,BridgeViewGoldenFrameTest,ViewComponentGoldenTest,GoldenFrameGenerator}.groovy` |
| Housekeeping backlog | `tasks/backlog/HOUSEKEEPING.md` (empty) |
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
