# Retro: Phase 10 — Domain Event System
**Date:** 2026-09-16 | **Suite at close:** 203 discovered / 203 pass / 0 skipped / 0 failed | **Duration:** ~3.1s
**Chronicle:** journals/LOG_20260916_095628_0xd02ac2e.md
**Branch:** `refactor/phase-10-domain-events` — 11 commits, merged to `master` @ `d02ac2e`

---

## What Went Well
- **Reading the call sites before planning rewrote the plan.** The recovery prompt insisted on reading `JournalManager` and every `JournalManager.` call in `src/main` and `src/test` first. That read found `Building` never calls the journal, `logDiscovery` has no production caller, and the journal advances the ritual — three premises the phase document had wrong, corrected before a line changed.
- **Four pins, one file, driven through the actor that production uses.** `JournalEventContractTest` asserts only what the journal shows and what the building remembers, so it was indifferent to the direct-call → event migration and green at every commit. The grill's E1 finding (orphan players get an inert bus) was folded into the test's design rather than patched around.
- **The mid-sequence coherence trick held.** In 10c-ii the journal listener passes no location while `Room`/`NullSector` still call the journal directly with one, so ritual progress was counted exactly once at every intermediate commit. Naming the side effect up front is what made the ordering argument possible.
- **Bus on the state, not the actor.** The lifecycle check (grill 3) found `Player` is replaced twice on restore. Putting `EventBus` on `GameState` and handing it through `Player`'s constructor cost four one-line edits and removed a whole class of "listeners lost after reload" bugs before they could exist.
- **The cap was honoured without ceremony.** 10e's thirteen import deletions ran as four chained edit → suite → commit batches in a single command; each stop was gated.

## Challenges
- **Two script asserts fired on assumptions.** `Room` imports `core.*`, not `JournalManager` explicitly; the batch assert tripped before the write (rerun, no revert). The suite-count arithmetic in the plan (204/199) was wrong because the five disabled bus tests were already *discovered*; the real move was skips 5 → 0.
- **`AskUserQuestion` was unavailable**, so the one materially open question — restore discovery journaling or not — was decided by the Prime Directive (zero behavior change) and flagged in the plan for the user to overrule. That is the right default but it deserved a real ask.

## Surprises
- **Discovery journaling has been dead since 2026-03-05.** `7930dc3` moved macro-path tracking into `Player.markFootprint` and dropped the `logDiscovery` call. `[LOC]` lines, the `Network Expansion` count and the `LOC:` ticker rows exist only in `JournalTest` and the golden harness. Six months, no one noticed — because the tests fed the scribe by hand.
- **A game rule was living in the journal.** `logCapture` marked floors sampled and `logSynthesis` bumped infusion. `AbyssalRitualTest` and `SpectralFrequencyContractTest` set `infusionCount = 7` directly and never asserted the increment, so the rule had no guard until 10-0.
- **The 0.5g stub's `DomainEvent` shape survived unchanged.** `lip` + `itemName` on the base, derived by the two typed subclasses — the six-month-old contract test needed nothing but its `@Disabled` removed.

## Concerns for Upcoming Phases
- **All ten planned phases are complete.** What follows is a user decision: HK-010 (restore discovery journaling — a behavior change with its own pin and chronicle line), O2 CodeNarc (would have caught the 13 dead imports mechanically), O1 HeadlessRunner DSL, or the two static singletons HK-008 (`ProceduralFactory.instance`) and HK-011 (`JournalManager`).
- **HK-011 has a UI edge.** De-static-ing the journal moves `getRecentEvents` into `RenderContext`; the ticker goldens 20/21 must stay byte-identical and `HudFrameHarness` currently feeds the static API directly.
- **`Game.setPlayer` is a test-only seam with no guard.** Two tests use it to inject an orphan player. If a future test injects one and then expects journal or ritual effects, E1 is the explanation.
- **Next cadence review** falls at whatever phase follows (the CODEX names 1/4/7/10). The workflow backlog was clean at the start of this phase; nothing new was logged.

## Lessons
- **A bus outlives the aggregate that publishes on it.** Promoted to `tasks/lessons/core.md`.
- **When a service becomes a listener, audit its side effects first.** Promoted to `tasks/lessons/core.md`.
- **An import is not a call, and a caller-less method is a regression to log, not a feature to wire.** Promoted to `tasks/lessons/infrastructure.md`.
