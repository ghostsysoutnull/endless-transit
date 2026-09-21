# Retro: Phase 0.5 — Test Coverage Gaps
**Date:** 2026-03-17 | **Suite at close:** 85 pass / 5 skip / 0 fail (90 discovered)

---

## What Went Well

**Systematic progression.** The 8 sub-phases were cleanly sequential — each test targeted exactly one refactoring phase's dependency. The gate structure (`0.5a → Phase 1`, `0.5g → Phase 10`, etc.) was never compromised. Suite count grew predictably (61 → 62 → 74 → 75 → 76 → 79 → 82 → 87 → 90) with zero regressions at any step.

**Spec-first `@Disabled` pattern (0.5g).** Writing `EventBusTest` as a disabled contract before Phase 10 implements the bus defines the expected API surface in executable form. Phase 10 must satisfy it — the intent is clearer than a comment and more binding than a doc spec.

**Discovery + hardcode pattern for snapshot pinning (0.5h).** Write a throw-away discovery test, run it once to capture actual generated values, hardcode those into the real test, delete the helper. The resulting `ProcgenSnapshotTest` is authoritative in a way `DeterministicUniverseTest` is not — it catches shifts that affect both runs equally.

**Chronicle command fixup.** Updating the harvest step to follow `tasks/todo.md` as a pointer rather than hardcoding `tasks/active/` makes the chronicle self-maintaining as the active task rotates.

---

## Challenges

**Context resumption from summary.** The session picked up from a compressed summary of prior work. Re-anchoring to the exact mid-task state (which stubs were written but uncommitted) required reading files directly. The CODEX Session Initialization Protocol (Orient → Verify → Internalize) held, but there's always overhead at a context boundary.

**The EventBus stub exception.** Phase 0.5 was scoped as test files only — no production code. Writing `DomainEvent.groovy` and `EventBus.groovy` was a small but real violation. The justification (test can't compile without the classes it tests) is valid, but the stubs are now a binding API contract. If Phase 10 changes the signature, the stubs need updating before re-enabling the tests — this won't be obvious unless explicitly flagged in the Phase 10 plan.

**`/chronicle` skill invocation is broken.** The `Skill` tool with `skill: "chronicle"` fails every time — it's not registered as a user-invocable skill. The workflow has to be executed manually from `.claude/commands/chronicle.md`. This is recurring friction that each session rediscovers.

---

## Surprises

**"44 tests" meant test files, not methods.** The OOA plan, `RECOVERY_PROMPT.md`, and `tasks/todo.md` all said "44 tests" — this was 44 test classes with 61 actual test methods. The discrepancy propagated into multiple documents. Fix: always cite as `N methods across M classes`.

**RADAR/ELEVATOR in the OOA plan were source identifiers, not output strings.** Phase 0 called for pinning "RADAR, ELEVATOR, NEURAL_LINK as visual markers." These are Groovy method names and comment strings in source, not strings that appear in rendered HUD output. Would have caused a confusing test failure if taken literally. The plan was amended with a clarification note.

**`@` include for `VERTICAL_TRAVERSAL_REFACTOR.md` was silently loading completed history every session.** Every session was auto-loading ~200 lines of irrelevant completed-task context. Went unnoticed until deliberate review of CLAUDE.md files. A one-line fix with ongoing benefit.

**Building name collision in snapshot seed.** Seed `0x1234` generates `ObeliskWell` for both buildings[1] and buildings[2]. The test faithfully pins the defect — but Phase 2b (lexicon externalization) must update these expected values if it fixes the collision.

---

## Concerns for Upcoming Phases

**Phase 2b must update `ProcgenSnapshotTest`.** If lexicon externalization changes name generation in any way, the snapshot will fail. Phase 2b's plan must explicitly call this out.

**Phase 5 is the riskiest phase.** The `ModelOutput.fmt` DI refactor touches every rendering class in `model/`. The 0.5d `LocationRenderingTest` is the safety net — but the wiring change itself is complex. `./vinc.sh --compile` after every single file change is mandatory, not optional.

**Phase 10 API lock-in.** The `EventBus` stubs define one API direction (`Class<? extends DomainEvent>` as key). If Phase 10 decides on typed event subclasses instead, the stubs and disabled tests all need updating before the tests can be re-enabled. Flag this at the start of Phase 10.

---

## Lessons (promoted to tasks/lessons/)

None from this phase warranted promotion — Phase 0.5 was test-only and the patterns encountered are documented above. The "always cite test counts as N methods across M classes" rule is worth adding to `tasks/lessons/infrastructure.md` if it keeps causing confusion.
