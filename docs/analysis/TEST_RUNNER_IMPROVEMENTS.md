# Test Runner Improvements Plan
**Created:** 2026-03-17
**Status:** NOT STARTED
**Blocking:** OOA Phase 1 — do not begin Phase 1 until all items here are complete.

> **Goal:** Make `./vinc.sh --test` genuinely agent-friendly. Quiet mode currently floods
> context when piped. Failures don't include location. Skipped tests are invisible.
> These are fixed here before the refactoring effort begins in earnest.

---

## Progress Overview

| Item | Name | Status | Priority |
| :--- | :--- | :--- | :--- |
| T1 | TTY detection — suppress progress in piped mode | `[ ] NOT STARTED` | High |
| T2 | SKIPPED count in summary | `[ ] NOT STARTED` | High |
| T3 | Slow test threshold raised to 1000ms | `[ ] NOT STARTED` | Low |
| T4 | Stack frame on failure | `[ ] NOT STARTED` | High |
| T5 | `--agent` machine-readable output mode | `[ ] NOT STARTED` | Medium |

---

## Commit 1 — T1 + T2 + T3 (all in `TestRunner.groovy`)

### T1 — TTY Detection: Suppress Progress Lines When Piped

**Problem:** `-q` quiet mode uses `\r` (carriage return) to overwrite a single line
in an interactive terminal. When output is piped (as it always is when an agent
captures results with `2>&1`), `\r` doesn't overwrite — every `[VINC:RUNNING]`
becomes a separate 80-character line. At 90 tests per run × 10 runs per session,
this is ~72,000 characters of noise consumed from the context budget per session.

**Fix:** Detect whether stdout is a TTY using `System.console() == null`.
If piped (non-TTY), skip all `[VINC:RUNNING]` progress output entirely,
regardless of whether `-q` was passed. Progress output is meaningless to
a non-interactive reader.

**Files:** `TestRunner.groovy`

**Tasks:**
- [ ] Add `boolean isPiped = System.console() == null` at runner startup
- [ ] In `executionStarted`: wrap the quiet-mode `\r` print in `if (!isPiped)`
- [ ] In `executionFinished` (slow test path): keep slow/failure output regardless of `isPiped` — those are actionable
- [ ] Verify: `./vinc.sh --test -q 2>&1 | wc -l` should drop from ~110 lines to ~15 (summary + slow + final status only)

---

### T2 — SKIPPED Count in Summary

**Problem:** Summary shows DISCOVERED (90), SUCCEEDED (85), FAILED (0) with no
SKIPPED row. The gap of 5 is ambiguous — an agent must infer it, or worse, flag
it as a potential miscount. Became immediately relevant after adding 5 `@Disabled`
EventBus tests.

**Fix:** Add `TESTS SKIPPED` row to the summary block using
`summary.getTestsAbortedCount() + summary.getTestsSkippedCount()`.

**Files:** `TestRunner.groovy`

**Tasks:**
- [ ] Compute `skipped = summary.getTestsFoundCount() - summary.getTestsSucceededCount() - summary.getTestsFailedCount()`
- [ ] Add `TESTS SKIPPED         : ${skipped}` line to summary block (between FAILED and DURATION)
- [ ] Verify output shows correct count after run with disabled EventBus tests

---

### T3 — Raise Slow Test Threshold to 1000ms

**Problem:** `CaptureVerificationTest` (~3s) and `testSaveSession` (~1.2s) are flagged
as slow every single run. They're not regressions — they're known-slow tests that
produce identical noise every time. The signal degrades as the suite grows.

**Fix:** Raise threshold from 500ms to 1000ms. `testSaveSession` (~1.2s) will still
appear, which is correct — it's worth watching. `CaptureVerificationTest` at 3s
remains clearly flagged.

**Files:** `TestRunner.groovy`

**Tasks:**
- [ ] Change `if (duration > 500)` to `if (duration > 1000)`
- [ ] Verify: only genuinely slow tests appear (expect `CaptureVerificationTest` to remain; `testSaveSession` borderline)

**Commit 1 Gate:** `./vinc.sh --test -q 2>&1 | wc -l` ≤ 20 lines on a clean run.
Summary shows SKIPPED. No regressions.

---

## Commit 2 — T4: Stack Frame on Failure

### T4 — Stack Frame on Failure

**Problem:** When a test fails, the runner emits:
```
[VINC:FAILURE] testName
  >> expected <true> but was <false>
```
The message tells the agent *what* failed but not *where*. Without a file and
line number, the agent must grep for the assertion message across all test
files to locate the failure — an extra round-trip that consumes context.

**Fix:** In `executionFinished`, when status is FAILED, filter
`throwable.get().stackTrace` to find the first frame matching
`com.endlesstransit` (skip JUnit internals). Print that frame as:
```
[VINC:FAILURE] testName
  >> expected <true> but was <false>
  at CorridorPersistenceTest.groovy:42
```

**Files:** `TestRunner.groovy`

**Tasks:**
- [ ] In the FAILED branch of `executionFinished`: extract `throwable.get().stackTrace`
- [ ] Filter to first frame where `className.startsWith("com.endlesstransit")` and `fileName != null`
- [ ] Print as `    at ${frame.fileName}:${frame.lineNumber}`
- [ ] Handle edge case: no matching frame found (e.g., test fails inside Groovy runtime) — skip gracefully
- [ ] Write a deliberately failing test (e.g., `assertTrue(false)` in a temp test), run suite, verify location line appears, delete temp test

**Commit 2 Gate:** A failing test produces `at FileName.groovy:N` in output.
Suite still passes on clean run.

---

## Commit 3 — T5: `--agent` Machine-Readable Output Mode

### T5 — Machine-Readable Output Mode (`--agent` flag)

**Problem:** The summary is formatted for human reading (padded labels, separator
lines, ANSI colour). An agent parsing it must do fragile string matching. A
structured single-line output would be far more reliable and token-efficient.

**Fix:** Add `--agent` flag to `TestRunner.groovy` (and a pass-through in `vinc.sh`).
When active:
- Suppress all `[VINC:RUNNING]`, `[VINC:SLOW]`, header/footer separators, and ANSI colour
- On completion, emit one status line:

```
STATUS=PASS DISCOVERED=90 SUCCEEDED=85 FAILED=0 SKIPPED=5 DURATION=6948ms
```

On failure, append one line per failure:
```
STATUS=FAIL DISCOVERED=90 SUCCEEDED=84 FAILED=1 SKIPPED=5 DURATION=7100ms
FAILURE: corridorStateSurvivesSaveRestore [CorridorPersistenceTest.groovy:42] >> expected true but was false
```

Exit code remains 0 (pass) or 1 (fail) — agents can check either the exit
code or parse `STATUS=`.

**Files:** `TestRunner.groovy`, `vinc.sh`

**Tasks:**
- [ ] Add `boolean agentMode = args.contains("--agent")` in `TestRunner.groovy`
- [ ] In `agentMode`: suppress all progress and decorative output; emit only the structured status line at the end
- [ ] Failure lines in `agentMode` use format: `FAILURE: testName [file:line] >> message`
- [ ] In `vinc.sh` `--test` case: forward `--agent` arg through to `TestRunner` (already done via `"${@:2}"` — verify it passes correctly)
- [ ] Update `vinc.sh --help` to document `--agent` flag
- [ ] Test: `./vinc.sh --test --agent` on clean suite → single STATUS=PASS line
- [ ] Test: `./vinc.sh --test --agent` with a failing test → STATUS=FAIL + FAILURE lines

**Commit 3 Gate:** `./vinc.sh --test --agent 2>&1` outputs exactly 1 line on a clean run.
Failure output is parseable without regex.

---

## Verification Protocol

After all 3 commits:

1. `./vinc.sh --test -q 2>&1 | wc -l` — must be ≤ 20 on clean run
2. `./vinc.sh --test --agent 2>&1` — must be exactly 1 line on clean run
3. `./vinc.sh --test -q 2>&1 | grep SKIPPED` — must show correct count
4. Run with a deliberate failure, confirm `at File.groovy:N` appears in `-q` output and `FAILURE:` line in `--agent` output
5. Full suite green: `./vinc.sh --test` — no regressions

---

## Impact on Agent Workflow

After this plan:

```bash
# Quick green/red check (agent use)
./vinc.sh --test --agent 2>&1

# Verbose run with failure location (debugging)
./vinc.sh --test -q 2>&1

# Targeted single class (already works)
./vinc.sh --test CorridorPersistenceTest -q 2>&1
```

The agent reads one line instead of ~110. Failures are self-locating.
Context budget is preserved for actual reasoning.

---

*No source code changes outside `TestRunner.groovy` and `vinc.sh` are authorized by this document.*
*After completion: write retro in `docs/retro/RETRO_TEST_RUNNER.md`, then proceed to OOA Phase 1.*
