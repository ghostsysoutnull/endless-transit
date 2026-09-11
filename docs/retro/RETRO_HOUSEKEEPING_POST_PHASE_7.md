# Retro: Housekeeping — post-Phase-7 (HK-001..004)
**Date:** 2026-09-11 | **Suite at close:** 179 discovered / 174 pass / 5 skipped / 0 failed | **Duration:** ~2.9s
**Chronicle:** journals/LOG_20260911_173603_0xd021a66.md
**Branch:** `housekeeping/post-phase-7` — 6 commits, merged to `master` @ `d021a66`

---

## What Went Well
- **Reading before designing changed two of four items.** HK-004 was planned as "wire the overlay in"; `Player.listInventory()` turned out to already draw the bars, so the fix became "one renderer" and a deletion. HK-003 found `handleInput` already had the dispatch — extraction, not rewrite.
- **The golden harness absorbed a behavior change cleanly.** HK-001 is the first intended visual change since the goldens exist: regenerate, review the diff (five spectrogram frames), commit the goldens with the change. The mask came out and nothing flaked — two regenerations identical, two suite runs green.
- **Bedrock is finally pinned.** Five frames at Floor −1 cover VOID labels, voices, static and the glitched exit diagnostic — unreachable before seeding.

## Challenges
- **Three failed edit attempts on the harness.** Two from my own sanity asserts (a comment containing the literal text I was checking for; a doc sentence mentioning `mask()` checked before it was replaced) and one from an anchor broken by an orphaned javadoc left in 7g-iii. Cost: three extra runs, no bad state — every attempt was under `&&` guards and nothing was committed until the gates passed.
- **Direct-capture contexts must mirror the delegator's.** With seeding, a `RenderContext` that carries the player yields a different glitch than one that does not; the trace delegator passes no player, so its standalone capture had to build the same null-player context.

## Surprises
- **Six random sites, not four.** `Terminal.glitchText()` itself held a `new Random()`, reached from two components; HK-001 had catalogued only the visible `new Random` lines.
- **HK-001's seed cannot always use the step count.** Delegators for the compass and trace pass no player, so those seeds fall back to the LIP alone — still deterministic, declared.

## Concerns for Upcoming Phases
- **Phase 8 touches `Floor`; goldens 14 (floor render), 28 and 31 (building maps), 32–36 (bedrock) will notice any rendering drift.** Expect zero golden changes from a pure state-pattern refactor; any diff is a finding.
- **Model-side `fmt.glitchText` (Room, Building) still uses the unseeded 2-arg form.** Out of scope here; it only affects text printed during `enter`, not frames. Log if it ever matters.
- **`ViewComponent` javadoc could now say "deterministic given the context"** — a one-line follow-up at the next UI touch.

## Lessons
- **Assert after the last edit, and never on text you also inserted.** Two of three failed attempts were self-inflicted checks. Put sanity asserts at the end, and grep for markers that the edit itself does not add.
  *Promoted to `tasks/lessons/infrastructure.md`.*
- **When a standalone capture must equal a delegated one, build the identical context.** Seeded output makes every constructor argument load-bearing.
  *Recorded here; harness comment carries it.*
