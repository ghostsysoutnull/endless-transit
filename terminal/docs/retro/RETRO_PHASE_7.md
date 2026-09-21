# Retro: Phase 7 — BridgeView Decomposition
**Date:** 2026-09-11 | **Suite at close:** 167 discovered / 162 pass / 5 skipped / 0 failed | **Duration:** ~2.8s
**Chronicle:** journals/LOG_20260911_170824_0x1111857.md
**Branch:** `refactor/phase-7-bridgeview-decomposition` — 31 commits, merged to `master` @ `1111857`

---

## What Went Well

- **The gate was fixed before the first line moved.** The cadence review exposed that `--scan` never constructs `BridgeView`. Building the golden-frame test first (7-0) meant every one of the eleven extraction commits had a real pixel gate, and a negative check (one corrupted glyph → exactly one failing frame) proved the gate bites.
- **Script-moved bodies with a reverse check.** Every component body was lifted by a script that applied only the listed substitutions and then asserted the reverse reproduced the original. Zero drift in eight extractions; the diff review was for hygiene, not correctness.
- **`/grill` earned its place.** Four of eight runs came back AMEND, each with a concrete UNGUARDED branch that became a synthetic golden (compass D-active, deep lattice trace, map SCAN_ERROR, eight menu skip-list forms). None of those branches is reachable on the seed-12345 walk; none would have been caught otherwise.
- **Zero test edits except one.** Delegators kept every public signature. `NavArrayTest` changed four lines because it called a private method dynamically.
- **The plan document stayed truthful mid-phase.** Every sub-phase got its status line, hash and declared deviations the moment it landed, and the recovery prompt was refreshed once mid-phase.

---

## Challenges

- **Randomness in the HUD.** Sixteen of 170 harness frames differed between runs — the telemetry spectrogram is seeded from the wall clock. Masking was the only zero-change option; abyssal and low-coherence frames cannot be pinned at all (HK-001).
- **The `ViewComponent` contract vs verbatim moves.** Four printed strings began with `"\n"`. Moving them verbatim violated "one entry per terminal line"; splitting them needed a byte-preserving form (the SCAN_ERROR colour code precedes the newline). Resolved in 7g-ii under the goldens, then enforced by `ViewComponentGoldenTest`.
- **The plan's component list was incomplete.** Menu, global controls and the left pane had no home. Decided early (0f74db5) rather than at 7e as first proposed, so 7g had nothing homeless.

---

## Surprises

- **`renderInventoryOverlay` has no production caller.** The `i` command renders `QuantumBufferController`'s own screen. Extracted anyway (zero-change mandate); logged as HK-004 for a product decision.
- **`[MAP_OFFLINE]` and the empty-extra-content branch are unreachable in play.** Only a Room reports map type `none`, and a Room always sits at telemetry depth; every location returns extra content. Declared, moved verbatim, not pinned.
- **The interface's `width` had to mean "allotted width", not "frame width".** The right pane gets 38, the left 88, the header 130. One javadoc line, declared in 7e.

---

## Concerns for Upcoming Phases

- **HK-001 should be picked up before any further UI work.** Seeding the four random sites from the game clock or locus would let the goldens drop the mask and add abyssal frames.
- **Phase 8 (Floor State Pattern) is a model change.** The golden set covers Floor rendering at one seed; `VisitedProgressTest` asserts `isCorridorActive` directly and must migrate (already in the plan). Run `--goldens` diff expectations: none.
- **Golden regeneration discipline.** `./vinc.sh --goldens` rewrites the whole directory. Run only after an intended visual change and review the diff; a casual regeneration can launder a regression.
- **Delegators are now the only reason the `render*` names exist on `BridgeView`.** If a future phase wants `BridgeView` to expose components directly, the six callers are listed in the 7g plan section.

---

## Lessons

- **A gate that never draws the screen is not a UI gate.** Verify what a gate actually exercises before trusting a phase's "identical" claim; the scan probe verified the world model, not the HUD.
  *Promoted to `tasks/lessons/ui.md`.*

- **Move method bodies by script with a reverse-substitution check.** Lift the exact text, apply only the listed substitutions, assert the reverse reproduces the original. Hand-retyping is where drift comes from.
  *Promoted to `tasks/lessons/infrastructure.md`.*

- **Random output cannot be pinned — mask it, catalogue it, and fix the seed later.** Run the capture harness twice before choosing golden frames; anything that differs is either masked (with a documented regex) or excluded, and the cause goes to the housekeeping backlog.
  *Promoted to `tasks/lessons/ui.md`.*

- **A golden directory needs exactly one writer.** The generator is the sole writer, runs on the test classpath via `vinc.sh`, stores frames pre-masked so regeneration is stable, and the test only reads.
  *Promoted to `tasks/lessons/infrastructure.md`.*

- **Synthetic-input frames pin branches the seed walk never reaches.** Components that read only their inputs (option keys, a location's vibe) can be given hand-built inputs; four such frames closed every UNGUARDED verdict this phase.
  *Promoted to `tasks/lessons/ui.md`.*
