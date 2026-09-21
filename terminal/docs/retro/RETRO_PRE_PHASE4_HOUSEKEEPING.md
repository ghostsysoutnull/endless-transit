# Retro: Pre-Phase-4 Housekeeping
**Date:** 2026-03-18 | **Suite at close:** 114 discovered / 109 pass / 5 skipped / 0 failed | **Duration:** ~2500ms
**Chronicle:** journals/LOG_20260318_155400_0xf3a91c7.md

---

## What Went Well

- **Three bounded changes, zero regressions.** Each improvement was independently verifiable. The suite ran green after each commit without needing a recovery cycle.
- **Consistency mandate held.** Converting only ThemeService and leaving NameGenerator behind would have been the easier path. The infrastructure lesson written earlier in the session prevented it — the lesson was invoked and applied correctly.
- **Index file pattern is clean.** The five `index.txt` manifests solve the directory-enumeration problem elegantly without runtime reflection or complex jar-scanning code. Adding a new culture or timeline now requires only adding a file and one index entry.
- **ScanCommand change was straightforward.** The `freq` variable was no longer referenced after the scan block, so renaming to `spectral` carried no downstream risk. The @CompileStatic annotation on ScanCommand would have caught any type error immediately.

---

## Challenges

- **None significant.** These were all low-risk, single-concern changes. The prior session's lessons (classpath limitations, index-based enumeration strategy) had already resolved the hard design question before the session began.

---

## Surprises

- **`InventoryItem` had wildcard imports that weren't needed at all.** After adding `@CompileStatic` and removing the wildcards, the class compiled cleanly — it only references types from its own package (SpectralFrequency) plus primitives. The wildcards were likely copy-pasted at creation time and never trimmed.
- **Phase 2a was actually three files, not one.** The original plan listed `ThemeService.groovy (1 file)`. Applying the consistency lesson expanded scope to NameGenerator + vinc.sh. The 5-file limit was not breached (3 production files + 5 data files), but the scope difference is worth noting for future plan accuracy.

---

## Concerns for Upcoming Phases

- **`NameGenerator.buildingLexicon` is a static final field.** The classpath loading now works, but loading happens at class initialisation — if `src/main/resources` is ever absent from the classpath, the lexicon silently returns empty lists (the `if (!stream) return []` guard). No test currently verifies the lexicon is non-empty. `ProcgenSnapshotTest` covers it indirectly (pinned building names), but a direct lexicon-loaded assertion would be more explicit.
- ~~**Atmosphere structures index uses mixed case.**~~ **Closed — false alarm.** The capitalisation is load-bearing: `ThemeService.generateAtmosphere()` uses the trait string directly as the lookup key (`"Military"`, `"Agricultural"`, etc.), and trait strings are capitalised by domain convention from `NameGenerator`/`RoomCategory`. Lowercasing the files would silently break atmosphere lookup. The "inconsistency" with cultures/timelines is intentional — different key sources, different conventions. `ThemeServiceLoadTest` now asserts `structures.containsKey("Military")` with an inline comment documenting this.
- **Phase 2a ThemeService test coverage is implicit.** The full test suite passes, but no test explicitly asserts that `ThemeService.cultures` or `ThemeService.timelines` is non-empty after construction. Tests that depend on culture/timeline selection (ProcgenSnapshotTest, DeterministicUniverseTest) cover it indirectly. Acceptable for now.

---

## Lessons

- **The improvement backlog between phases is not waste — it is the compound interest of bounded commits.** Phase 3's 5-file limit created three small residue items. Clearing them before Phase 4 took two commits and 30 minutes. Letting them accumulate across three more phases would have made each one harder to isolate and attribute.
- **`getResourceAsStream` requires a companion enumeration strategy for directories.** Unlike filesystem loading, classpath resource loading cannot list directory contents portably (especially in JARs). Index files are the idiomatic solution: a small manifest per directory listing available keys. Add one when any resource directory is first converted to classpath loading.
