# Retro: Phase 4 — Structural Extraction
**Date:** 2026-03-18 | **Suite at close:** 118 discovered / 113 pass / 5 skipped / 0 failed | **Duration:** ~2.7s
**Chronicle:** journals/LOG_20260318_140000_0xd7e3b2a.md

---

## What Went Well

- **Plan precision paid off.** The plan named every field and method body to extract with exact line numbers. No discovery work was needed during execution — every edit was a targeted deletion or creation.
- **Pre-check closed the real gap.** `getDepth()` and `getPath()` were in the extraction set but not pinned by any test. Adding two assertions to `RoomAncestorTest` before touching production code meant the extraction was verifiable from the start. Both assertions passed immediately after 4a, confirming the logic moved cleanly.
- **`findAncestor` semantics preserved.** The plan's proposed `AbstractLeafLocation.findAncestor` dropped the `type.isInstance(this)` self-check. Reading the original `Room` and `Container` implementations side-by-side made the behavioural divergence visible before writing a single line. The correct implementation was used instead.
- **`SynthesisService` boundary was natural.** The split was obvious once articulated: `Player` owns side effects (inventory mutation, journal, terminal, resonance counter); `SynthesisService` owns the decision of *what* the synthesis produces. The hybrid's fields (`isKeystone`, `frequency`) carry the information back across the boundary cleanly.
- **Zero blast radius on callers.** `QuantumBufferController` still calls `player.mergeItems(idx1, idx2, location)` — signature unchanged. All 14 affected test files passed without modification.

---

## Challenges

- **None of consequence.** This was a textbook pull-extraction: the code was already grouped by concern, the interfaces were stable, and the tests covered the public contracts. Execution was mechanical.

---

## Surprises

- **The plan's `findAncestor` was subtly wrong.** The proposed implementation checked `type.isInstance(parent)` rather than `type.isInstance(this)`. This would have changed the return value of `room.findAncestor(Room)` from `room` to `null`. No existing test would have caught it. The discrepancy was spotted by comparing the plan's code against the source of both `Room` and `Container` before writing.
- **`getLIP` null-parent guard was absent from `Room` but present in `Container`.** Room's original `getLIP` would NPE if `parent` was null. Container had the guard. `AbstractLeafLocation` adopts the safer version — a genuine improvement carried in for free.
- **No log files existed on disk.** Previous chronicles exist only as entries in `CHRONICLE_INDEX.md`. The `journals/` and `docs/retro/` directories were empty. The retro infrastructure was declared in `CODEX.md` but never materialized until now. This retro is the first physical file in `docs/retro/`.

---

## Concerns for Upcoming Phases

- **Phase 5 (ModelOutput.fmt DI) is the highest-risk remaining structural change.** It touches every Renderable class in the model package. The `@CompileStatic` discipline and per-file compile gate (`./vinc.sh --compile` after every file) will be essential. The blast radius includes all Container subclasses plus `AbstractLeafLocation` — more files than any previous phase.
- **`AbstractLeafLocation` is now the right injection point for Phase 5c.** The plan already anticipated this: "Add `OutputFormatter fmt` to `AbstractLeafLocation` constructor; `Room` inherits injection point." That design is confirmed correct — `Room` no longer carries redundant fields and the base class is the single wiring point for leaf locations.
- **`SynthesisService` has no dedicated test.** Its logic is covered indirectly through `SpectralFrequencyContractTest`, `AbyssalRitualTest`, and `MergeLabelTest` (all pass). Phase 10 (Domain Events) may be the right moment to add a unit test for `SynthesisService.synthesize()` directly, if it accumulates more logic.

---

## Lessons

- **Read plan-proposed code against the source before writing it.** The plan's `findAncestor` variant was plausible but semantically different from the existing implementation. Side-by-side comparison caught the divergence in seconds; discovering it post-commit would have required bisecting a confusing test failure. Promote: always diff plan snippets against actual source for methods that have prior implementations.
- **`type.isInstance(this)` vs `type.isInstance(parent)` in ancestor traversal is a load-bearing distinction.** The first allows self-matching (Container uses it); the second skips self entirely. When extracting `findAncestor` to a shared base, always verify which semantics the callers depend on.

*Promote both lessons to `tasks/lessons/model.md`.*
