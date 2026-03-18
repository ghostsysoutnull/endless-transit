# Retro: Test Artifact Hygiene + Regression Harness Refactor
**Date:** 2026-03-18 | **Suite at close:** 89 discovered / 84 pass / 5 skipped / 0 failed | **Duration:** ~2.9s
**Chronicle:** journals/LOG_20260318_120000_0xb7e4f1a.md

---

## What Went Well

- **Root cause tracing.** Every noisy file traced back to a specific test and a specific
  line. No guesswork — each fix was precise and minimal.
- **Incremental execution.** Each fix was its own commit with a passing suite gate before
  the next step. No regression at any point.
- **Write-once pattern.** The visual baseline fix is now strictly better: the file
  captures the first run state and stays stable until explicitly refreshed. Prior
  behavior (unconditional overwrite) gave a false sense of "living documentation"
  while actually providing no stable reference at all.
- **Abstraction layer diagnosis.** Identifying that `ReplayService` was solving a data
  problem with code generation unlocked the `@TestFactory` redesign. The resulting
  harness is ~15 lines; the old template engine was ~40 lines of boilerplate generation.
- **Backlog-first discipline.** The regression harness refactor was documented in
  `tasks/backlog/` before a single line of implementation was written. The doc served
  as the implementation contract and is now the closed-loop record.

---

## Challenges

- **`VibeRegressionTest` is not a generated test.** The backlog doc's migration plan
  listed it as a candidate, but reading the file revealed custom assertions
  (object diversity, ANSI padding, frequency collision) that don't fit the
  seed+history template. Caught before touching it — no harm done.
- **`@TestFactory` count behaviour.** JUnit 5 counts a `@TestFactory` method as 1
  discovered test, with dynamic tests counted in SUCCEEDED. Removing 1 `@Test` and
  adding 1 `@TestFactory` with 1 dynamic entry kept the 89/84 counts identical —
  but this required a two-step verification (harness live alongside old test, then
  old test deleted) to confirm before committing.

---

## Surprises

- **`PHASE_0_BASELINES.md` was being silently deleted on every test run.** The
  `CaptureVerificationTest` `dir.deleteDir()` was nuking it, but since the file
  was restored by git after each session it was never noticed. Only visible because
  we ran `git status` immediately after a test run.
- **`AutomatedRegressionTest.groovy` was being silently overwritten** with an identical
  copy every run (same seed, same history). The diff was always empty, so `git status`
  never complained — the pollution was invisible until the test name was examined carefully.
- **`VibeRegressionTest` naming is misleading.** The name suggests it's a generated
  vibe/visual regression test, but it's a hand-written unit test for three distinct
  correctness properties. Worth renaming at some point.

---

## Concerns for Upcoming Phases

- **`VibeRegressionTest` naming.** Not urgent, but `VibeRegressionTest` is a misleading
  name for a hand-written test with three unrelated assertions. Could cause confusion
  when the regression harness is extended.
- **`snapshots/` gitignore question.** Currently the snapshot `.json` files are committed
  (correct — they're the regression data). This must remain the convention: snapshots
  committed, transient test outputs gitignored. The `.gitignore` currently only excludes
  `screenshot_*.txt`; if someone adds a throwaway snapshot they should delete it, not
  gitignore the whole `snapshots/` dir.

---

## Lessons

- **Read the file before the plan.** `VibeRegressionTest` looked like a candidate for
  migration from the backlog doc, but reading it revealed it was hand-written. The
  lesson from Phase 1 applies here too: the plan is a starting point.
- **`git status` immediately after a test run catches artifact pollution early.**
  This is now standard practice — run the suite, then check status before doing
  anything else.
- **Code generation in tests signals a missing abstraction.** When generated files are
  all the same template, a `@TestFactory` + data file is the right shape. Promote
  this heuristic to lessons.
