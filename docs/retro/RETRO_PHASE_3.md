# Retro: Phase 3 — Value Objects (RoomCategory + SpectralFrequency)
**Date:** 2026-03-18 | **Suite at close:** 107 discovered / 102 pass / 5 skipped / 0 failed | **Duration:** ~2700ms
**Chronicle:** journals/LOG_20260318_135505_0xa2f5c83.md

---

## What Went Well

- **Incremental commit structure held.** Three commits with independent verification gates kept
  each change reviewable and rollback-safe. Commit 1 (3a) and Commit 2 (3b-i) were each green
  before proceeding — the 3b-ii breakage was caught in isolation, not buried in a combined diff.

- **Blast radius analysis was accurate.** The plan's list of every `.frequency` read site
  (Player, SyncManager, BridgeView, JournalManager) was complete. No unexpected sites surfaced
  during implementation. The serialization/restore path through SyncManager was correctly
  identified: serialize uses `.value`, restore passes raw int to the constructor.

- **RoomCategory mapping was verified before writing code.** Cross-checking every enum value
  against `AnomalousTrace.matches()` prior to writing the enum confirmed zero divergence between
  the old keyword-matching fallback and the new hardcoded traces. No behaviour change.

- **Test suite as a forcing function.** The pre-check safety nets (RoomCategoryTest,
  SpectralFrequencyContractTest) that failed after 3b-ii immediately identified every assertion
  that was silently coupling to `int` semantics. The list was complete, systematic, and fast
  to fix — exactly what a safety net should do.

---

## Challenges

- **5-file commit limit exceeded for 3b-ii.** The plan listed exactly 5 production files for
  Commit 3 and said "at limit." The field type change to `SpectralFrequency` required updating
  9 files total: 5 production + 4 test files (SpectralFrequencyContractTest, InventoryObjectTest,
  AbyssalRitualTest, TracePersistenceTest). The plan's "full suite passes" requirement and the
  5-file limit were in direct conflict. Resolution: treat test-only assertion updates as exempt
  from the production-file limit — they are mechanical adaptations of the API surface, not new
  logic.

- **Pre-check test assertions used `assertEquals(int, SpectralFrequency)`.** JUnit's
  `assertEquals(Object, Object)` calls `expected.equals(actual)` — `Integer.equals(SpectralFrequency)`
  is always false regardless of any SpectralFrequency.equals() override. Making the tests pass
  required appending `.value` to all `hybrid.frequency` and `item.frequency` comparisons. The
  plan said "must continue passing" but didn't account for JUnit's equality semantics.

---

## Surprises

- **Four test files contained unplanned `.frequency` comparisons.** Beyond `SpectralFrequencyContractTest`
  (the designated update target), three additional test files had direct int comparisons against
  `item.frequency`: `InventoryObjectTest`, `AbyssalRitualTest`, and `TracePersistenceTest`. These
  were pre-existing tests not listed in the plan — they surfaced only when the suite was run.
  The test runner's failure output identified all three precisely; no searching required.

- **`InventoryItem` without `@CompileStatic` caused no issues.** SyncManager and BridgeView
  (both `@CompileStatic`) successfully access `item.frequency.value` at compile time because
  the field type `SpectralFrequency` is declared in `InventoryItem`, even though `InventoryItem`
  itself is not `@CompileStatic`. Groovy's static type inference propagates from the declared
  field type into the calling `@CompileStatic` context.

---

## Concerns for Upcoming Phases

- **Phase 4b (SynthesisService) touches Player.mergeItems()** which was just modified in 3b.
  The resonance check is now `new SpectralFrequency(newFreq).isResonant()` — SynthesisService
  extraction should keep this delegation intact, not regress to `newFreq % 11 == 0`.

- **Deferred items create future blast radius.** `Gematria.calculateFrequency()` still returns
  `int`. When this is eventually changed to return `SpectralFrequency`, `Room.groovy` and
  `ScanCommand.groovy` will need updates. This should be tracked and done as a single bounded
  commit when the time comes.

- **Phase 9 (ProceduralFactory Split) will touch NameGenerator** which now returns
  `Map<String, Object>` from `generateRoomName()`. Any factory that wraps `createRoom()` must
  handle the `RoomCategory` in the returned map, not fall back to `["type"]` key access.

---

## Lessons

- **A pre-check test pinning a primitive contract becomes a migration guide when the type changes.**
  The broken assertions in `SpectralFrequencyContractTest` after 3b-ii were not failures — they
  were a precise, compiler-assisted diff of every place that depended on the primitive. Each
  failing assertion was a required update. Treat test failures after a type migration as a
  checklist, not a problem.
  → *Promote to `tasks/lessons/core.md`*

- **`assertEquals(int, SpectralFrequency)` silently fails even with equals() override.**
  JUnit calls `expected.equals(actual)` — `Integer.equals(SpectralFrequency)` is always false.
  When wrapping a primitive in a value object, update all `assertEquals(literal, item.field)`
  test assertions to `assertEquals(literal, item.field.value)`. Do not attempt to "fix" this
  with a custom `equals()` on the value object — it cannot intercept the Integer side.
  → *Promote to `tasks/lessons/core.md`*

- **The 5-file limit should count production files, not test-update files.**
  Test assertions updated solely to adapt to a field type change carry no behavioral risk and
  no architectural footprint. Counting them against the commit limit creates false pressure to
  defer them, which leaves the suite broken. The rule is: max 5 *production* files per atomic
  commit; test-only assertion updates for the same change are free.
  → *Promote to `tasks/lessons/infrastructure.md`*
