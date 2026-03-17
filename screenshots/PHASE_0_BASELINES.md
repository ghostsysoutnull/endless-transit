# Phase 0 Baselines — OOA Structural Refactoring
**Captured:** 2026-03-17
**Status:** COMPLETE

## Test Suite Baseline
- **Command:** `./vinc.sh --test`
- **Result:** 61/61 methods passing, 0 failures
- **Duration:** ~6.6s
- **Note:** "44 tests" in earlier docs referred to test *files/classes*, not methods.
  The runner discovers 61 individual test methods. This is the correct baseline count.

## Reference Seeds (SeedScanner probe: BuildingFloorCount >= 5)

| Seed | Node Count | Notes |
| :--- | :--- | :--- |
| `0` | 9 | Default scan seed |
| `500` | 9 | Mid-range reference |
| `9999` | 9 | High-range reference |
| `12345` | — | Visual baseline seed (used in VisualBaselinePinningTest) |

## Visual Baseline
- **File:** `screenshots/baseline_refactor_survival.txt`
- **Seed:** `12345`
- **Location:** Street level (LIP: `0.0.0.0.0.0.0.0`)
- **Captured by:** `VisualBaselinePinningTest.captureAndVerifyBridgeView()`
- **Verified markers:** `PULSE_TRAVERSAL`, `COHERENCE`
- **Note on RADAR/ELEVATOR markers:** These are rendering logic identifiers inside
  `Building.groovy` (radar column) and `Floor.groovy` (elevator state), not literal
  output strings. The HUD markers `PULSE_TRAVERSAL` and `COHERENCE` are the correct
  string assertions for the street-level baseline.

## Comparison Protocol
Before and after any phase touching `model` or `ui`:
1. Run `./vinc.sh --test` — assert 61/61 pass
2. Run `./vinc.sh --scan` — assert seed `0` still returns a match with node count 9
3. Diff `screenshots/baseline_refactor_survival.txt` against a fresh `VisualBaselinePinningTest` run
