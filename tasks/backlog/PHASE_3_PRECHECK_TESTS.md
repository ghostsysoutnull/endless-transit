# Task: Phase 3 Pre-Check Tests — RoomCategory + SpectralFrequency Safety Net
**Status:** COMPLETE — 2026-03-18
**Created:** 2026-03-18
**Depends on:** Phase 0.5b complete (AnomalousTraceTest exists)
**Risk:** None — test-only, no production code changes
**Blocks:** Phase 3a (RoomCategory enum), Phase 3b (SpectralFrequency value object)

---

## Problem

The existing test suite does not cover the logic that Phase 3 will refactor:

### 3a — RoomCategory gap
`AnomalousTraceTest` tests the *current* `matches(String roomType)` interface — exactly what
gets replaced. After the refactor, `matches(RoomCategory)` is the new interface. That new
signature has zero pre-existing test coverage.

Additionally, `ProceduralFactory.populateCorridor()` does:
```groovy
door.trace = AnomalousTrace.values().find { it.matches(roomType) }
```
The refactor inverts this: the room carries a `RoomCategory`, and the factory asks the category
for its trace. No test covers this bidirectional mapping (RoomCategory → AnomalousTrace) or
the factory integration path. If the mapping is incomplete for any of the 26+ room types,
doors silently get null or wrong traces.

### 3b — SpectralFrequency gap
The core logic of the value object being extracted is entirely untested:

| Logic | Current location | Current form |
| :--- | :--- | :--- |
| Is resonant? | `Player.groovy:116` | `newFreq % 11 == 0` |
| Is master number? | `Gematria.groovy:22` | `sum == 11 \|\| sum == 22 \|\| sum == 33` |
| Hybrid frequency | `Player.groovy:97` | `item1.frequency + item2.frequency` |
| Resonance amplifier | `Gematria.groovy:29` | `freq * 1.1` when `isResonant` |

If `SpectralFrequency.isResonant()` or `isMasterNumber()` encapsulate the wrong semantics,
no test catches it until something downstream fails silently.

---

## Design Decision (required before 3b tests)

**`isMasterNumber()` scope:** The current `Gematria.groovy` definition is:
```groovy
sum == 11 || sum == 22 || sum == 33
```
This is the narrow numerological definition (11, 22, 33 only). Confirmed: 44, 55, etc. are
NOT master numbers in the current implementation. Tests will pin this narrow definition.

---

## Tests to Write

### Group A — RoomCategoryTest (pre-3a)

| # | Test | What it pins | Status |
| :--- | :--- | :--- | :--- |
| A1 | Bidirectional mapping: each `RoomCategory` → correct `AnomalousTrace` | Reverse lookup used by factory after refactor | deferred to Phase 3a |
| A2 | `ProceduralFactory` corridor population: all doors have non-null, valid traces | Factory integration end-to-end | [x] |
| A2+ | Multi-culture coverage: invariant holds for all 6 cultures | Edge cases in culture-specific room types | [x] |
| A2+ | Keyword coverage: all 16 room type strings match expected traces | Canonical mapping the enum must preserve | [x] |

**File:** `src/test/groovy/com/endlesstransit/RoomCategoryTest.groovy`
(Stub class only — tests will initially fail because `RoomCategory` doesn't exist yet. Tests
are written against the intended post-refactor API to define the contract before coding.)

> **Note:** A3 (enum completeness audit) is handled at implementation time by reading all
> room type strings from `NameGenerator` before defining the enum. Not a separate test.

---

### Group B — SpectralFrequencyTest (pre-3b)

| # | Test | What it pins | Status |
| :--- | :--- | :--- | :--- |
| B1 | `isResonant()` — true for multiples of 11 (11, 22, 44, 121) | Core resonance contract | [x] |
| B2 | `isResonant()` — false for non-multiples (10, 12, 23, 1234) | Boundary correctness | [x] |
| B3 | `isMasterNumber()` — true for {11, 22, 33} only | Narrow numerological definition | [x] |
| B4 | `isMasterNumber()` — false for 44, 55, 10, 34 | Confirms narrow definition | [x] |
| B5 | Merge: hybrid frequency = item1.freq + item2.freq | `Player.mergeItems()` correctness | [x] |
| B6 | Keystone: frequency = 0, treated as resonant (0 % 11 == 0) | Keystone invariant | [x] |
| B7 | `InventoryItem.frequency` stores values without truncation | Field stability | [x] |

**File:** `src/test/groovy/com/endlesstransit/SpectralFrequencyTest.groovy`
(Tests written against the intended `SpectralFrequency` API before it exists. All will fail
until Phase 3b implementation is complete — that is the correct state.)

---

## Implementation Notes

- `RoomCategoryTest` tests A1 and A2 **will fail** until Phase 3a introduces `RoomCategory`.
  This is intentional — the tests define the contract.
- `SpectralFrequencyTest` tests B1–B7 **will fail** until Phase 3b introduces `SpectralFrequency`.
  This is intentional.
- Both test files should be committed before any Phase 3 production code is written.
- The OOA plan's Phase 3 gates (`GematriaTest`, `InventoryObjectTest`, `MergeLabelTest`,
  `SurvivalPinningTest`, `DeterministicUniverseTest`) remain unchanged — these new tests
  add to that gate, they don't replace it.

---

## Verification

After writing tests (pre-phase):
- `./vinc.sh --test --agent 2>/dev/null` — new tests should be **discovered but failing**
- `git status` clean (no artifact pollution)

After Phase 3a implementation:
- Group A tests pass
- All existing tests still pass

After Phase 3b implementation:
- Group B tests pass
- All existing tests still pass
- `DeterministicUniverseTest` still passes

---

## Progress Log

| Date | Action |
| :--- | :--- |
| 2026-03-18 | Document created; audit completed; design decision made (narrow isMasterNumber) |
| 2026-03-18 | All tests written and passing; commit aa88e66; suite 106/101/5/0 |

