# Retro: Phase 5 Cleanup — Post-migration Residue
**Date:** 2026-03-18 | **Suite at close:** 118 discovered / 113 pass / 5 skipped / 0 failed | **Duration:** ~2.6s
**Chronicle:** journals/LOG_20260318_190000_0xb3c7a12.md

---

## What Went Well

- **Zero surprises.** The rename was entirely mechanical. `sed`, compile, repeat. No ambiguity, no logic to reason about, no test failures. This is what a well-bounded cleanup session looks like.
- **`@CompileStatic` made missed sites impossible.** Any call site that wasn't renamed would have produced a compile error — `getEffectiveFmt()` no longer exists. The compile gate after every file made this fail-fast rather than fail-late.
- **Net-negative commit.** 127 deletions, 123 insertions — the codebase shrank. Every cleanup session should leave the substrate smaller than it found it.
- **Docs corrected in the same session.** `CLAUDE.md` and `GEMINI.md` no longer instruct agents to use a deleted class. The invariants now match the implementation.

---

## Challenges

- None. The plan was precise, the tooling was reliable, the scope was bounded.

---

## Surprises

- None. This is the intended outcome of a well-planned cleanup phase.

---

## Concerns for Upcoming Phases

- **Phase 6 (GameState Decomposition) is the next meaningful risk.** `GameState` fields are accessed throughout `Game`, `TurnProcessor`, `RenderingCoordinator`, `NavigationOrchestrator`, and several test files. Moving `bridgeView`, `mapper`, `inputHandler`, and `navEngine` to their owning services will have a wider test blast radius than any phase so far. A dedicated pre-6 blast radius grep across `src/test/` is warranted before writing the plan.
- **The `tasks/active/` directory is now empty.** This is a healthy state — no stale plans in flight. Phase 6 planning starts from a clean slate.

---

## Lessons

- **Cleanup phases should follow major migrations without gap.** The `getEffectiveFmt()` getter accumulated 113 call sites during Phase 5's incremental commits. Had the cleanup been deferred to Phase 7 or later, the gap would have grown and the name's misleading quality would have been normalized. One session immediately after the migration closed it before it could calcify.
- **Migration scaffolding names should signal their temporary nature.** `getEffectiveFmt()` was a reasonable name during migration but gave no indication it was temporary. A suffix like `_migrating` or a comment `// TODO: remove after Phase 5 Commit G` would have made the cleanup target visible to any reader without requiring a retro to surface it.
