# Retrospective: HK-016 step 1 (+ HK-017)
**Date:** 2026-09-16 | **Chronicle:** `0x36653e2` | **Plan:** `tasks/completed/HK_016_STEP1_PLAN.md` | **Merges:** `926e731` (HK-017), `36653e2` (step 1)
**Suite:** 215 → 220 / 220 / 0 / 0 | **Lint:** 208 files / 0 | **Goldens:** 36, 12 + 2 regenerated (reviewed)

## What went well
- **Simulating the change before authorization.** The proposed resource files were placed in a scratchpad overlay ahead of
  `src/main/resources`, and a copy of `NameGenerator` with the index loop was compiled ahead of `build/vinc`; the harness then
  compared all 36 frames and walked the pinned seed. The plan could therefore say "c3 moves one literal and frames 16/30, c2 and
  c4–c8 move nothing" — and every commit did exactly that. Two of the four findings (the glitch key, the pane wrap) came out of the
  simulation, not out of reading.
- **Seven questions with a marked preference, one answer.** The user's "all ★, execute" fixed seven decisions in one round trip
  (order, words, abyssal lexicon, warning channel, glitch key, docs timing, branch shape). No decision was re-opened mid-execution.
- **Content commits each gated alone.** `edit && test && lint && commit` in one chain per commit; a red gate stops the chain
  before `git add`. None went red.
- **The grill's "assume the plan is wrong" stance paid twice.** The draft said "content only, no code" (false: hard-coded lexicon
  list) and "golden diff = that phrase only" (false: the sentence wraps, and the wrap exposed HK-017).

## What was corrected mid-flight
- **The pin contradicted itself for monolith.** "Walls from its own file and not monolith's" can never hold for monolith. Caught
  by the first full-suite run, fixed before commit, no production change — but a pin that passes only after its own bug is fixed
  should be run RED *and* GREEN before it is trusted (it was: red against the old tree in 4 of 5 methods).
- **The F2 rate.** The plan first said "1 glitched room in 40"; the arithmetic is 5 % × ½ × ½ = 1 in 80, and the probe measured
  2–5 rooms per seed. Fixed in the amendment; the lesson is to measure a rate, not derive it.

## Concerns for upcoming phases
- **Step 2 moves objects.** Every item in step 2 (shuffled deck, furniture ≠ objects, timeline drift, phrasings, category names,
  description variants) changes object strings on every pinned world: `ProcgenDeepSnapshotTest:187`, the ticker goldens 20/21, the
  FURNITURE line in 16/30, and the seed-12345 apartment frame. The simulation technique is mandatory there, and the plan should
  budget for regenerating most room/apartment goldens once, at the end, after a per-commit review of the simulated diff.
- **The right pane carries the same off-by-one as HK-017 did** (`RIGHT_PANE_WIDTH` 38 vs 37 kept). Unreachable today; the day a
  right-pane row reaches 38 columns, align `ansiSafeTruncate`'s inner widths with the physical columns rather than shrinking the pane.
- **`[THEME_WARN]` prints into the frame stream.** Correct today (it never fires). If a future step adds a key on purpose without a
  file, the warning will land inside a golden — which is the intended tripwire, but the author should expect it.

## Workflow friction → `docs/analysis/WORKFLOW_BACKLOG.md`
- None new. The overlay simulation is worth codifying as a lesson (done, `tasks/lessons/procgen.md`) rather than a tool.
