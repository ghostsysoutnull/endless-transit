# Retro: Phase 2b — NameGenerator Lexicon Externalization
**Date:** 2026-03-18 | **Suite at close:** 89 discovered / 84 pass / 5 skipped / 0 failed | **Duration:** 2216ms
**Chronicle:** journals/LOG_20260318_180000_0xc4d2e8f.md

---

## What Went Well

- **vinc.sh classpath audit before writing code.** Discovering that `src/main/resources`
  is not on the classpath changed the loading strategy entirely. Reading `vinc.sh` first
  saved implementing a solution that wouldn't have worked.
- **Filesystem loading decision was correct.** Consistent with `ThemeService`, no new
  patterns introduced, and both will convert together in 2a. The scope stayed tight.
- **Exact-order transcription + ProcgenSnapshotTest.** Writing the resource files in
  identical order to the hardcoded lists, then letting `ProcgenSnapshotTest` confirm
  determinism, is the right verification sequence. The test exists precisely for this.
- **Pre-phase ritual complete.** Lessons promoted, backlog reviewed, todo updated before
  touching production code. The CODEX protocol was followed in full.
- **VibeRegressionTest rename surfaced latent coupling.** A structural rename (no logic
  change) revealed a hidden test isolation bug that had survived undetected. Fixed as
  part of housekeeping before the phase began.

---

## Challenges

- **Loading mechanism decision.** The classpath loading recommendation in the OOA plan
  assumed `src/main/resources` would be on the classpath. It isn't in `vinc.sh`. Required
  a deliberate decision to defer to filesystem loading and align with ThemeService, rather
  than fixing the classpath in isolation.

---

## Surprises

- **`src/main/resources` not on the test runner classpath.** The plan said "load via
  classpath (same pattern as 2a)" — but `ThemeService` itself uses filesystem loading,
  not classpath loading. The plan description was aspirational, not descriptive of the
  actual current state. Reading `vinc.sh` before implementing was essential.
- **Phase 2a and 2b are more coupled than the plan implied.** 2a (ThemeService classpath
  fix) and 2b (NameGenerator externalization) were described as independent, but the
  loading mechanism for 2b depends on the same infrastructure decision as 2a.

---

## Concerns for Upcoming Phases

- **Phase 2a still deferred.** Both `ThemeService` and `NameGenerator` now use filesystem
  loading with `src/main/resources/...` paths. When 2a lands, both get converted together.
  This is the intended state — but it means the codebase is currently not JAR-safe for
  either service.
- **Other inline lists in NameGenerator** (solar system, planet, city, street, etc.) follow
  the same pattern as the building lexicon but are out of scope for 2b. Logged for
  post-2a analysis.

---

## Lessons

- **Read the runner script before designing a loading strategy.** The classpath for tests
  is defined in `vinc.sh`, not `build.gradle`. They can diverge. Always verify before
  assuming `getResourceAsStream()` will work.
- **Consistency beats correctness-in-isolation.** Using filesystem loading (imperfect for
  JAR) was the right call because it kept both resource-loading services aligned.
  Solving it piecemeal would have created two loading patterns with no clear owner.
