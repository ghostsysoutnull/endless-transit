# Task: Regression Harness Refactor — @TestFactory + Snapshot Data Files
**Status:** BACKLOG
**Created:** 2026-03-18
**Depends on:** None (self-contained, no OOA phase dependency)
**Risk:** Low — test infrastructure only, no production code changes

---

## Problem

`ReplayService.promoteToTest()` generates `.groovy` source files into
`src/test/groovy/com/endlesstransit/regression/`. This is the wrong abstraction:
every generated test is **identical structure, different data** — only seed and
input history vary. Generating compilable code for what is fundamentally a
parametrized data problem creates several issues:

- Generated Groovy files must be compiled before they can run
- `ReplayServiceTest` was silently overwriting a committed test file on every run
  (fixed as a workaround, but the root cause remains)
- Adding a regression case requires a code generation step + commit of `.groovy` boilerplate
- Reviewing a regression case means reading Groovy instead of data

---

## Solution

Replace code generation with a `@TestFactory` harness + JSON snapshot data files.

### Target structure

```
src/test/groovy/com/endlesstransit/regression/
    RegressionHarnessTest.groovy     ← static, committed once, never regenerated
    snapshots/
        AutomatedRegressionTest.json
        VibeRegressionTest.json
        (any future promoted snapshots)
```

### Snapshot format

```json
{
  "name": "AutomatedRegressionTest",
  "seed": 12345,
  "history": ["f", "01", "quit", "y", "y"]
}
```

### Harness sketch

```groovy
@TestFactory
Stream<DynamicTest> regressionSuite() {
    new File("src/test/groovy/com/endlesstransit/regression/snapshots")
        .listFiles { f -> f.name.endsWith(".json") }
        .stream()
        .map { file ->
            DynamicTest.dynamicTest(file.name) {
                def data = ReplayService.parseSnapshot(file)
                ScreenBuffer result = HeadlessRunner.run(data.locus, data.history)
                assertNotNull(result)
                VisualAssertionEngine.verify(result) { isBoxedCorrectly() }
            }
        }
}
```

---

## Migration plan

### Step 1 — Write `RegressionHarnessTest.groovy`
- Implement `@TestFactory` harness reading from `snapshots/`
- Add `ReplayService.parseSnapshot(File)` that reads the JSON format
- Verify suite passes (new harness adds no tests yet — snapshots dir is empty)

### Step 2 — Migrate existing generated regression tests
- Convert `AutomatedRegressionTest.groovy` → `snapshots/AutomatedRegressionTest.json`
- Convert `VibeRegressionTest.groovy` → `snapshots/VibeRegressionTest.json`
  (read the seed and history out of each `.groovy` file)
- Verify harness discovers and runs both — suite count should be unchanged
- Delete the two `.groovy` files

### Step 3 — Update `ReplayService.promoteToTest()`
- Change output format from `.groovy` template to `.json` snapshot
- Update `ReplayServiceTest` to verify JSON output
- Verify suite still passes

### Step 4 — Cleanup
- Delete `src/test/groovy/com/endlesstransit/regression/` `.groovy` boilerplate
  (only `RegressionHarnessTest.groovy` and `snapshots/` remain)
- Update `tasks/lessons/infrastructure.md` if any new patterns emerge

---

## Files in scope

| File | Action |
| :--- | :--- |
| `regression/RegressionHarnessTest.groovy` | Create |
| `regression/snapshots/*.json` | Create (migrated from existing .groovy) |
| `regression/AutomatedRegressionTest.groovy` | Delete |
| `regression/VibeRegressionTest.groovy` | Delete |
| `core/ReplayService.groovy` | Update `promoteToTest()` output format |
| `ReplayServiceTest.groovy` | Update assertions for JSON output |

**Not in scope:** `VisitedProgressTest.groovy` — hand-written test with custom
assertions, not a generated regression case. Stays as-is.

---

## Verification gates
- `./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS`, same SUCCEEDED count
- `git status` clean after test run
- `ReplayService.promoteToTest()` writes a `.json` file, not a `.groovy` file

---

## Context

This refactor was identified during a test artifact hygiene session (2026-03-18).
The `ReplayServiceTest` workaround (temp name + cleanup) resolved the immediate
pollution problem but left the underlying design intact. This task completes the fix properly.

Chronicle reference: `journals/LOG_20260317_230000_0xa3f91c2.md`
