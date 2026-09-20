# Housekeeping Plan: HK-022 — `NameGenerator` becomes an injected instance

**Backlog:** HK-022 (`tasks/backlog/HOUSEKEEPING.md:13-17`) | **Branch (proposed):** `housekeeping/hk-022-name-generator` from `master` @ `3f16133`
**Baseline (run 2026-09-20, before the branch):** 282 / 282 / 0 / 0 in 4960 ms, `LINT=PASS FILES=220`, scan seed 0 → 9, `DOCS=PASS`.
**Status:** EXECUTED 2026-09-20 (Directive: plan approval; merge Directive "1a") — `bb35045` plan, `d44a5aa` c0 (289/289), `b58ec1f` c1a, `5d4c1ea` c1b, `9dac3ef` c1c, `d27ad3e` c1d (290/290, `LINT=FAIL P3=11` RED demo then `LINT=PASS FILES=221`, scan 0 → 9, 36 goldens unchanged, c0 pins unedited), `edcc9e6` c2; merge `9549527`. Chronicle `0x9549527`. **Deviations:** 10 public signatures lost `static` (the 11th, `generateContainerName`, was deleted per D1); the `[THEME_WARN]` line itself is not pinned — no capture seam — only the monolith fallback is.
**Grill:** AMEND (3 items: one citation, two undeclared edges, helpers clarified) → applied → CLEARED. **D1 = a** (plan approved with the marked preference).

> **No player-visible change.** Every name is the same pure function of its `LocusSeed`. Prediction: **0 goldens moved**,
> every pinned literal unchanged, scan unchanged, lint baseline unchanged, `NoNewStaticLogic` allow-list 16 → 15 files.

## Context (ELI5)

`NameGenerator` is a bag of eleven static functions plus a lexicon loaded into a `static final Map` when the class loads —
a hidden global. It is the one real smell on the `NoNewStaticLogic` allow-list (`config/lint/vinc-ruleset.groovy:59,64`).

**The fix in one sentence:** each `ProceduralFactory` owns one `NameGenerator` (exactly like it owns `themeService`), the
eleven per-type factories ask `registry.nameGenerator` instead of the class, and the file leaves the allow-list.

## Evidence read this session

- `NameGenerator.groovy` (207 lines): 10 non-private static generators + `adjectivesFor`; `static final Map buildingLexicon`
  (`:64`, loaded at class init from `/names/buildings/index.txt`); `static final List landmarkTitles` (`:84`, used only inside
  the class); 3 private static helpers. No `Random` is kept between calls — nothing else is state.
- **Callers, `src/main` (11 sites, one per file):** `Street/Country/City/Sector/SolarSystem/Planet/FilamentFactory:23`,
  `RoomFactory:38`, `BuildingFactory:55`, `CorridorFactory:45`, `ApartmentFactory:48`. Every one already holds
  `private final ProceduralFactory registry`.
- **Callers, `src/test` (8 sites, 3 files):** `ThemeResourceCoverageTest:43,94,96,101,159`, `ProcgenSnapshotTest:105-106`,
  `ProcgenVarietyContractTest:96`. The last two already hold a `factory`.
- `ProceduralFactory.groovy:24`: `ThemeService themeService = new ThemeService()` — the ownership pattern to copy. Two
  production constructors of the facade: `Game:37`, `SeedScanner:25`.
- `generateContainerName` (`:201`) has **no caller anywhere**; `git log -S` shows only the commit that added it (`376b407`) —
  it was never wired, so nothing was lost.
- **Probe (run this session, nothing written):** under `@CompileStatic`, `registry.a.f(2)` compiles and runs when `f` is
  still `static`, and `new A().m` reads a static property. So callers can move to the instance **before** the statics go —
  every commit below is green on its own.
- Blueprint `docs/blueprints/logic/classes/procgen/NameGenerator.md` is already false (hex room IDs, "tech era", no
  `adjectivesFor`) — "Baselined (not audited)".

## Coverage (Coverage Claim Protocol — assertion lines read this session)

| Behavior | Guard |
| :--- | :--- |
| Filament, planet names (seed 0x1234) | `ProcgenSnapshotTest:45,47` |
| Country, city, street names | `ProcgenSnapshotTest:73,75,77`; `ProcgenDeepSnapshotTest:85,103,108` |
| Building names — both *common* templates | `ProcgenSnapshotTest:84,86,88` |
| Room name + category with a dealt adjective | `ProcgenDeepSnapshotTest:172-173`; `ProcgenVarietyContractTest:100-106` |
| Room category when adjective is null (door traces) | `ProcgenDeepSnapshotTest:134,138,144` — `door.trace` is `roomCategory.trace` (`CorridorFactory:45-48`) |
| Each culture uses its own lexicon; sizes ≥ 12 | `ThemeResourceCoverageTest:43-46,94-105,159-161` |
| `category` key is a `RoomCategory` | `ProcgenSnapshotTest:108-119` |
| Solar-system name, sector name | **UNGUARDED** (`SystemNameTest:34` checks a prefix only) |
| Building name — landmark branch, both *uncommon* templates | **UNGUARDED** |
| Unknown culture → monolith lexicon + `[THEME_WARN]` | **UNGUARDED** |
| Two generators, same seed → same name (no hidden state) | **UNGUARDED** |

## Shape table (CODEX § 4)

| what | kind | owner | the one fact it owns | statics + why |
| :--- | :--- | :--- | :--- | :--- |
| `NameGenerator` (existing class, de-staticised) | service | `ProceduralFactory` (`final` field, built there, nowhere else) | how a `LocusSeed` becomes a name; the building lexicon | `landmarkTitles` stays a `static final` constant list (data, no logic, not matched by the lint rule). No static methods left. |
| `ProceduralFactory.nameGenerator` | field | `ProceduralFactory` | which generator this world uses | none |
| `NameGeneratorContractTest` | test | — | the four UNGUARDED rows | none |

Principles: **1** lexicon has one owner (the instance). **2** statics gone. **3** no type checks added. **4** injected via
`registry`; the only `new NameGenerator()` in `src/main` is in its owner. **5** n/a. **6** the `Map<String,Object>` returns
(`name`/`category`/`isLandmark`) are an existing primitive-ish shape — **not extended, not fixed here** (edge E2).

## The change — 6 commits, ≤ 5 production files each

**c0 — step-0 pins (test only).** New `procgen/NameGeneratorContractTest`, written against an *instance*
(`new NameGenerator().generateX(...)` — legal today per the probe), so the pins cross the change **unedited**:
solar-system + sector name literals for seed 0x1234 (through `factory.createUniverse`); one landmark and one of each
uncommon building template (seeds found by a scratch loop, literals pinned from the run); unknown culture → monolith
adjectives; two instances agree on all generators for one locus. Green on `master`.

**c1a — owner (1 file).** `ProceduralFactory`: `final NameGenerator nameGenerator = new NameGenerator()` beside `themeService`.

**c1b — macro factories (5 files).** `Filament/Sector/SolarSystem/Planet/CountryFactory:23`:
`NameGenerator.generateX(locus)` → `registry.nameGenerator.generateX(locus)`. One token per file.

**c1c — local factories (5 files).** `City/Street/Building/Corridor/ApartmentFactory`: same substitution.

**c1d — the statics go (3 files).** In this order, inside the commit:
1. `vinc-ruleset.groovy`: drop `NameGenerator.groovy` from `doNotApplyToFileNames` and from the comment → run `--lint` →
   **must be RED** (proves the rule sees the file).
2. `RoomFactory:38` → `registry.nameGenerator`.
3. `NameGenerator`: **by script** — remove the `static ` token from the 11 public signatures, the 3 private helpers
   (`lexiconFor` reads the instance lexicon, so they go together) and `buildingLexicon`; lines 1–199 keep their numbering (asserted);
   reverse-substitution check reproduces the original file; asserts before the write. Method bodies untouched.
   `generateContainerName` deleted (D1).
4. Tests: `ProcgenSnapshotTest`, `ProcgenVarietyContractTest` → `factory.nameGenerator`; `ThemeResourceCoverageTest` →
   a `NameGenerator names` field built in `setUp` (it already builds its own `ThemeService` there). New wiring pin in
   `FactoryWiringContractTest`: `a.factory.nameGenerator` is non-null and not the same as `b.factory.nameGenerator`
   (new API → compile-RED on `master`, declared inconclusive as a red demo; it is a wiring pin).
5. `--lint` → **GREEN**, allow-list 15.

**c2 — docs (through `/close-wave`).** Blueprint `NameGenerator.md` rewritten from the source and re-stamped;
`ProceduralFactory.md:39`; one line in `procgen/CLAUDE.md` (names come from `registry.nameGenerator`); backlog → CLOSED;
`todo.md`; `RECOVERY_PROMPT.md` (suite count, lint allow-list 16 → 15).

## Decision for you (one letter)

**D1 — the never-called `generateContainerName`:** **a) delete it (my preference** — dead since the day it was added,
converting it keeps dead code alive) · b) keep it as an instance method.

## Gates

After **every** commit: full suite, `--lint`, `git status --short` clean. After c1d also `--scan` (seed 0 → 9) and the 36
goldens byte-identical (inside `--test`). `rm -rf build/vinc` is not needed (no file deleted or renamed). Suite wall-time
noted before/after — each factory now loads 21 small lexicon files once (same cost shape as `ThemeService`).
**STOP and re-plan** if any pinned literal or golden moves.

## Edges (declared)

- **E1** `lexiconFor` still prints `[THEME_WARN]` through static `Terminal.println` — same as `ThemeService:134`; untouched.
- **E2** Generators still return `Map<String,Object>`; a `GeneratedName` value object is a separate item if wanted.
- **E3** Short lists inside the generator bodies stay literals in code (HK-016 externalised only the lexicons).
- **E4 (grill)** The lexicon loads once per `ProceduralFactory` instead of once per JVM; the suite builds ~100 factories/games
  (grep count). Guard: suite duration against the 4960 ms baseline; a missing lexicon file now fails at factory construction.
- **E5 (grill)** `players_guide.md:220,302` cite `NameGenerator.groovy` line ranges (≤ 137). Token removal never moves a line and
  the deleted method is the last one (`:201-206`), so the citations hold; the script asserts it.

## What your approval covers — and what it does not

**Covers:** create the branch; copy this plan to `tasks/HK_022_PLAN.md`; run `/grill` on it (an AMEND is applied and shown;
a FAIL stops and comes back to you); commits c0 → c2 on the branch touching only the files named above.
**Does not cover:** merge to `master`, push, any file not named here — each is asked separately.
