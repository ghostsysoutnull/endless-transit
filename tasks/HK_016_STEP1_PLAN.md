# Content Plan: HK-016 step 1 — fill the silent resource files, and make a fallback speak
**Created:** 2026-09-16 | **Grill:** AMEND (check 2 ×2: undeclared wrap shift in the golden diff → F4; F2 rate mis-stated) → applied → CLEARED; F4 resolved first as **HK-017** (`54f3f19`, merged) by user decision (all ★) | **Branch:** `content/hk-016-step1` (from `master` after the HK-017 merge)
**Backlog:** `tasks/backlog/HOUSEKEEPING.md` (HK-016, step 1 of 3) | **Audit:** `docs/analysis/VARIETY_AUDIT.md` §2.3–2.5, §2.7, §3.2, §4 step 1
**Baseline (verified this session on `master`):** 213 / 213 / 0 / 0 (3845 ms); `LINT=PASS FILES=206 P1=0 P2=0 P3=0`; tree clean, in sync with origin
**Status:** DRAFT — no source change authorized by this document

> **This is a content phase, not a refactor.** Generated worlds change on purpose: rooms on 52 % of planets stop
> saying `a dim, flickering glow`, rooms in ⅓ of countries stop saying `a spatial cell`, five cultures get their own
> walls and four get their own names. One snapshot literal and two golden frames move, and the plan says which ones
> and why *before* they move. Determinism is untouched: no new draw is added anywhere; each existing draw simply has
> a real pool to pick from.

---

## Scope

Step 1 of the audit's three-step plan, and only step 1:

1. **Lighting** files for the four eras that have none: `atomic`, `digital`, `entropic`, `future`.
2. **Structures** files for the two traits that have none: `Industrial`, `Commercial` — plus `Singularity`, the
   glitch-branch key that also has no file (finding F2 below).
3. **Walls** files for the five cultures that have none: `gilded`, `rust`, `shogun`, `void`, `zenith`.
4. **Building/room lexicons** for the four cultures that have none: `gilded`, `shogun`, `zenith`, `abyssal`.
5. A **warning line** when any fallback link in `ThemeService.generateAtmosphere` or `NameGenerator`'s lexicon lookup
   fires, so the gap can never reopen unseen; and the one-token fix that keeps the warning silent in production (F2).
6. A **pin** that every key in every index has its file and that the generators actually use it (RED on `master`).
7. The Player's Guide, atlas and codex sentences that describe the gaps, corrected in the same branch.

Not in scope (steps 2 and 3): shuffled-deck dealing, furniture ≠ objects, timeline drift, phrasings, category-based
room names, description variants, list growth. Objects and furniture do not change at all in this step: the
`cultures/*.txt` and `timelines/*.txt` files are not touched.

## What changes (ELI5)

Today the game has a drawer for "what the light looks like" in each era, a drawer for "what the room is shaped like"
for each kind of country, and a drawer for "what the walls are made of" for each culture. Half of the drawers are
empty. When the game opens an empty drawer it quietly uses one fixed sentence instead, so whole planets read the
same. This step puts five sentences in every empty drawer, gives the four cultures that were borrowing monolith's
building names a name list of their own, and makes the game say so out loud if it ever finds an empty drawer again.

## Evidence read this session

**The fallback chain** — `ThemeService.groovy:85` walls: `atmosphere["walls"][wallTheme] ?: atmosphere["walls"]["monolith"] ?: ["bare surfaces"]`;
`:89` lighting: `[lightTheme] ?: ["monolith"] ?: ["a dim, flickering glow"]` (the `monolith` link is a culture name, never a
timeline — it is dead, so a missing lighting file always reaches the literal); `:93` structures: `[structTheme] ?: ["monolith"] ?: ["Standard"] ?: ["a spatial cell"]`
(neither `monolith` nor `Standard` exists in `structures/index.txt` — a missing trait file always reaches the literal).
No log line on any link. `:62` one `Random r = locus.nextRandom()` draws walls, lighting, structure **in that order**, one
`r.nextInt(pool.size())` each — so filling a file changes only that line's pick, never an earlier line's.

**The glitch branch** — `:78-82`: on `isAnomaly` or a 5 % roll, `structTheme = r.nextBoolean() ? "Abyssal" : "Singularity"`. Keys are
case-sensitive `TreeMap`s (`:9-13`); the only abyssal file is `structures/abyssal.txt` (lowercase, used by the `culture == "abyssal"`
branch at `:64-71`) and there is no `Singularity.txt`. Both glitch keys therefore fall to `a spatial cell` today. The Player's Guide
already documents this (`players_guide.md:450-451`: *"thanks to a capitalisation mismatch, always produces the words 'a spatial cell'"*).

**Lexicons** — `NameGenerator.groovy:63-74`: `static final Map buildingLexicon` built from a **hard-coded list** of six cultures
(`["rust", "neon", "baroque", "monolith", "void", "organic"]`); there is no `names/buildings/index.txt` (Phase 2a added index files to
`themes/*` only). `:102` and `:149`: `buildingLexicon[culture] ?: buildingLexicon["monolith"]`, silent. Callers: `RoomFactory.groovy:38`
(room name), `BuildingFactory.groovy:55` (building name), `CorridorFactory.groovy:44` (category only — name discarded).

**Keys that exist** — `cultures/index.txt`: 10 (abyssal, baroque, gilded, monolith, neon, organic, rust, shogun, void, zenith);
`timelines/index.txt`: 8 (analog, ancient, atomic, digital, entropic, future, industrial, singularity); traits: the literal list at
`CountryFactory.groovy:26` (Ceremonial, Military, Industrial, Agricultural, Research, Commercial). Files present: lighting 5 (abyssal,
analog, ancient, industrial, singularity), structures 5 (abyssal, Agricultural, Ceremonial, Military, Research), walls 5 (abyssal,
baroque, monolith, neon, organic), lexicons 6 × 2. Every existing atmosphere file is **5 lines** (abyssal: 8); every lexicon 8 + 8.

**Voice of the existing files** — lighting lines complete *"The space is illuminated by …"* (`Room.groovy:275`), e.g. `the warm cathode glow
of a CRT monitor`; structure lines complete *"You are in …"* (`:274`), e.g. `a cramped, blast-shielded alcove`; walls lines complete *"The
walls are <colour> …"* (`:274`), e.g. `seamless dark alloy`. Lexicon words are Title Case, one per line.

**Warning precedent** — `CorridorFactory.groovy:34`: `Terminal.println "[TOPOLOGY_WARN] populateCorridor: …"` — a procgen class already
imports `com.endlesstransit.ui.Terminal` and passes lint (the `ModelNeverImportsUi` rule applies to `model` only, `vinc-ruleset.groovy:49`;
`Println`/`SystemOutPrint` flag `System.out`, not `Terminal.println`). `Logger` lives in `core`; procgen must not depend back on core
(`tasks/lessons/core.md`, Circular Dependencies).

**Pinned worlds that can move** —
- `ProcgenDeepSnapshotTest.groovy:171-187` (seed `0x1234`: analog, monolith/shogun, **Industrial**): `:171` `"Grey Unit [0x55]"`,
  `:178` `"seamless dark alloy"` (monolith walls), `:179` `"the warm cathode glow of a CRT monitor"` (analog lighting),
  **`:180` `"a spatial cell"`** (Industrial → fallback), `:187` furniture `["floppy disk with hexagonal pillar"]`.
- `ProcgenSnapshotTest.groovy:45-88` (seed `0x1234`): names only, monolith culture → lexicon untouched by this step.
- Golden walk (`HudFrameHarness.groovy:25`, seed `12345`: analog, organic/abyssal, **Industrial**): the one room on the walk is organic
  (`16_room_render.txt:15` walls `calcified shell-fragments` = `walls/organic.txt`), lighting analog (`:16`); **`:15` says `a spatial cell`**;
  `30_room_coherence25_renderAdaptive.txt:2` shows the same sentence glitched (`a spatial c**l`). No other frame prints a `You are in` line
  (grep this session). Frames 32/34 (bedrock, abyssal branch at `ThemeService:64`) are unaffected by any file this step adds.
- `AtmosphereSynthesisTest.groovy:27-28,62`: neon walls, industrial lighting, Research structures — files untouched.
- `ThemeServiceLoadTest.groovy:33-36,45-48,60-70,82-85`: every loaded key has a non-empty list — new files are covered by these loops
  the moment they are indexed.

**Gates** — `./vinc.sh --scan` (`vinc.sh:49-51`) runs `SeedScanner` with `BuildingFloorCountProbe` — floor counts only, never a string
from this step. `DeterministicUniverseTest` compares two runs. `./vinc.sh --goldens` (`vinc.sh:57-60`) is the only golden writer.

## Findings that correct the backlog entry

- **F1 — "content only, no code" is false for the lexicons.** `NameGenerator.groovy:67` is a hard-coded culture list, so a new
  lexicon file is invisible until that line changes. Fix in the Phase 2a shape: `names/buildings/index.txt` + load from it (c6).
- **F2 — the glitch branch has two more missing files.** `"Abyssal"` (capital) and `"Singularity"` at `ThemeService.groovy:81`. Adding an
  `Abyssal.txt` beside `abyssal.txt` would collide on a case-insensitive filesystem, so the capital key is the bug: `"Abyssal"` → `"abyssal"`
  (one token, c9) and a new `structures/Singularity.txt` (c3). Without F2 the new warning would fire in production on 5 % × ½ × ½ = 1 room
  in 80 — **measured** (simulation run C below: every file in place, key untouched): `a spatial cell` still on 2, 2, 4, 4, 5, 3 rooms of the
  six probe seeds. This is the quirk the guide documents at `:450-451`; that paragraph is removed in the same branch.
- **F4 — the narrative pane wraps wider than the split box can hold (pre-existing UI bug, exposed by any long sentence).**
  `NarrativePaneComponent.groovy:28` wraps at `width` = `FrameGeometry.LEFT_PANE_WIDTH` = `SPLIT_POINT - 2` = 88 (`FrameGeometry.groovy:22`),
  but `Terminal.splitBoxedLine` (`Terminal.groovy:310-312`) truncates the left text at `splitPoint - 4` = 86 with `...`. Measured this session:
  a left line of visual width 86 fits, 87 and 88 are cut to `...`. Every wrapped description line that lands on 87–88 columns loses its last
  word to `...` — today this can already happen in any Military/Research/Ceremonial room (their structure lines are 40–57 chars; the full
  sentence is 121–137 chars and wraps). The simulated c3 golden hits it: frame 16 line 15 ends `The walls are g...` and the colour word's
  remainder wraps to the next line. **Not in scope** (ui domain, one constant, its own golden move): logged as **HK-017**. Decision needed:
  (a) fix HK-017 first on its own branch (`housekeeping/hk-017-pane-wrap`, ~1 line, goldens as gate) so the c3 golden lands clean —
  **recommended**; or (b) run step 1 now and pin the `g...` artifact in goldens 16/30 until HK-017 closes.
- **F3 — the lighting `monolith` link is dead** (`ThemeService.groovy:89`). Left as is (surgical); the warning fires on the first miss
  regardless of which literal the chain ends in.

## Coverage audit (Coverage Claim Protocol)

| Behavior | Must | Guard (assertion read this session) | Verdict |
| :--- | :--- | :--- | :--- |
| Walls/lighting/structure picks for cultures/eras/traits that **already have files** are byte-identical | not change | `ProcgenDeepSnapshotTest:178-179` (monolith walls, analog lighting at 0x1234); `AtmosphereSynthesisTest:27-28,62`; golden `16_room_render.txt:15-16` (organic walls, analog lighting at 12345) | PASS |
| Objects and furniture strings | not change | `ProcgenDeepSnapshotTest:187`; goldens `16:17` (FURNITURE line), 20/21 (ticker with object names) | PASS |
| Building names for cultures with a lexicon | not change | `ProcgenSnapshotTest:84-88` (monolith street at 0x1234); `ProcgenVariabilityTest:71` (monolith, 20 buildings) | PASS |
| Room name for a culture with a lexicon | not change | `ProcgenDeepSnapshotTest:171` (`Grey Unit [0x55]`, monolith) | PASS |
| World shape (counts, LIPs, null rolls) | not change | `ProcgenDeepSnapshotTest:62-66,89,104,109,118-119,131-132,159-163`; `--scan` seed 0 → 9 | PASS |
| Structure line for an Industrial room at 0x1234 | **change** (fallback → `structures/Industrial.txt` line) | `ProcgenDeepSnapshotTest:180` moves; re-pinned in c3 to `gantry-braced architecture that vibrates with every pulse` (simulated, runs A and B); `:171,:178,:179,:187` unchanged in the same runs | MOVES (declared) |
| Golden room sentence at 12345 (Industrial) | **change** (`a spatial cell` → `a maintenance pit ringed by chain hoists and drip trays`) | frames 16 and 30 regenerated in c3. Simulated diff: the longer sentence **wraps**, so the left pane shifts down one line — 10 lines differ in each frame, the trailing blank absorbs the shift, no content lost; the other 34 frames are byte-identical. With F4 unfixed the first wrapped line ends `g...` | MOVES (declared) |
| Every index key has a non-empty file; each generator uses its **own** file, never monolith's, for every culture/era/trait; the three literal fallbacks never appear | new | **UNGUARDED today** → `ThemeResourceCoverageTest` (c9); RED on `master` (walls/lexicon for gilded etc. are monolith's; `a spatial cell` for Industrial) — RED output recorded in the execution note before commit | PIN |
| A fallback prints `[THEME_WARN] …` | new | Not pinned by a test (the print goes to `Terminal`; capturing it would couple a procgen test to the sink). The pin above is the tripwire: if a file goes missing the pin fails before anyone reads a log. Declared. | DECLARED |

## Commits (≤ 5 production files each; a resource file counts as a production file)

Each content commit is independent, compiles alone and leaves the full suite green **without** the pin; the pin lands
in c9, the capstone, once every drawer is full. Expected gate movement per commit is stated and must match the run
(`./vinc.sh --test --agent`, `./vinc.sh --lint --agent`, `git status --short` after every commit; `--scan` seed 0
before c2 and after c9).

| # | Commit | Files (prod count) | Expected gate movement |
| :-- | :--- | :--- | :--- |
| c1 | `docs(HK-016): step-1 plan` | this file, `tasks/todo.md` pointer | none |
| c2 | `content(HK-016): lighting for atomic, digital, entropic, future` | `themes/atmosphere/lighting/{atomic,digital,entropic,future}.txt` + `index.txt` (5) | none — both pinned worlds are analog; the lighting glitch (`LIGHT_GLITCH`) can pick a new key on a 5 %×50 % roll: verified empirically, expected 0 frames |
| c3 | `content(HK-016): structures for Industrial, Commercial, Singularity` | `themes/atmosphere/structures/{Industrial,Commercial,Singularity}.txt` + `index.txt` (4); `ProcgenDeepSnapshotTest:180` re-pin (test); goldens 16 + 30 via `./vinc.sh --goldens` (reviewed: the `You are in …` phrase and the one-line wrap shift, nothing else) | 1 literal, 2 frames (simulated: exactly these) |
| c4 | `content(HK-016): walls for gilded, rust, shogun` | `themes/atmosphere/walls/{gilded,rust,shogun}.txt` + `index.txt` (4) | none expected (pinned rooms are monolith / organic); `WALL_GLITCH` roll verified empirically |
| c5 | `content(HK-016): walls for void, zenith` | `themes/atmosphere/walls/{void,zenith}.txt` + `index.txt` (3) | none expected |
| c6 | `refactor(HK-016): building lexicon enumerated by index.txt` | `names/buildings/index.txt` (the six existing cultures), `NameGenerator.groovy:65-74` reads the index (2) | none — same six keys, same files, same order-independent map |
| c7 | `content(HK-016): lexicons for gilded, shogun` | `names/buildings/{gilded,shogun}_{adj,noun}.txt` + `index.txt` (5) | none — no pinned building/room is gilded or shogun (0x1234 secondary culture is shogun: apartments on the 15 % secondary roll get shogun names, but the pinned apartment is monolith, `ProcgenDeepSnapshotTest:154`); **simulated (run B): zero movement beyond c3's** |
| c8 | `content(HK-016): lexicons for zenith, abyssal` | `names/buildings/{zenith,abyssal}_{adj,noun}.txt` + `index.txt` (5) | none — the golden walk's apartment is organic (frame 16 walls); the bedrock building is the landmark *The Void-Watcher* and frames 32/34 print no room name; **simulated (run B): zero movement beyond c3's** |
| c9 | `feat(HK-016): fallbacks warn; glitch key fixed; resource coverage pinned; docs` | `ThemeService.groovy` (`[THEME_WARN]` on each first miss at `:85,:89,:93` via `Terminal.println`, `"Abyssal"` → `"abyssal"` at `:81`), `NameGenerator.groovy` (`[THEME_WARN]` when `buildingLexicon[culture]` is null at `:102,:149`) (2); `ThemeResourceCoverageTest.groovy` (new test); `players_guide.md`, `the_lattice_atlas.md`, `cultural_origins.md`; `HOUSEKEEPING.md`, `todo.md`, `VARIETY_AUDIT.md` §4 status | glitched anomaly rooms whose roll picked "Abyssal" change structure line (abyssal pool instead of `a spatial cell`); pinned rooms are not on that path (`:156` `isAnomaly` false; 5 % roll verified empirically — if a pinned room *is* on it, the c3 re-pin already carries the new literal and c9 moves nothing) |

**Merge:** `--no-ff` into `master` when `--test`, `--lint`, `--scan` are green and the golden diff has been reviewed; then `/chronicle`, retro `docs/retro/RETRO_HK_016_STEP1.md`, lessons.

### The pin — `ThemeResourceCoverageTest` (procgen, c9)
Reads the loaded `ThemeService` and `NameGenerator.buildingLexicon`; every list it iterates comes from an index, so a key
added later without its file fails here first.
1. `everyCultureHasWallsAndLexicon` — for each key of `service.cultures`: `atmosphere.walls[key]` non-empty; `buildingLexicon[key].adj` and `.noun` non-empty.
2. `everyTimelineHasLighting` — for each key of `service.timelines`: `atmosphere.lighting[key]` non-empty.
3. `everyTraitHasStructures` — for `["Ceremonial","Military","Industrial","Agricultural","Research","Commercial"]` (mirrors `CountryFactory.groovy:26`, cited) and the glitch keys `["abyssal","Singularity"]`: `atmosphere.structures[key]` non-empty.
4. `generateAtmosphereUsesEachOwnFile` — for every culture × timeline × trait, 8 fixed seeds each, `isAnomaly=false`: `structure ≠ "a spatial cell"`, `lighting ≠ "a dim, flickering glow"`, `walls ≠ "bare surfaces"`; and per culture, across its draws, at least one walls line is in `walls[culture]` **and not** in `walls["monolith"]` (proves the culture's own file is read; tolerates the 5 % glitch).
5. `generateRoomNameUsesOwnLexicon` — per culture, 40 fixed seeds: at least one adjective drawn is in `lexicon[culture].adj` and not in `monolith.adj` (`Silent` is shared by monolith and void, hence the set difference).
RED on `master` at 1, 3 (Industrial, Commercial, Singularity), 4 (gilded/rust/shogun/void/zenith walls; every Industrial/Commercial structure), 5 (gilded/shogun/zenith/abyssal).
Also in c9 (test, free): `ProcgenSnapshotTest:104` iterates six cultures by literal — extend to the ten keys of `NameGenerator.buildingLexicon` so the category contract covers the new lexicons.

## Simulation evidence (this session, repo untouched)
The proposed files were placed in a scratchpad overlay ahead of `src/main/resources` on the classpath, and for c6–c8 a copy of
`NameGenerator` with the index-based loop was compiled into the scratchpad ahead of `build/vinc`. Three runs:
- **Run A (c2–c5)** and **Run B (c2–c8)**: `HudFrameHarness.captureAll()` against the 36 committed goldens → **moved = 2** (16, 30), diff as
  declared above; seed 0x1234 walk → every `ProcgenSnapshotTest` name unchanged, room `:171,:178,:179,:187` unchanged, `:180` →
  `gantry-braced architecture that vibrates with every pulse`. Run B = run A frame for frame.
- **Run B lexicon sanity**: `buildingLexicon.keySet()` = the ten culture keys; samples — *Opulent Gallery [0x2]*, *Lacquered Dojo [0x21]*,
  *Marble Basilica [0x21]*, *Recursive Cyst [0x21]*; buildings *Mahogany Manor*, *Vermilion Teahouse*, *Alabaster Pantheon*, *Writhing Sigil*, *ExceptionGate*.
- **Run C (audit Appendix A probe, c2–c8, F2 not yet fixed)** — before → after:

| seed | walls distinct | lighting distinct (glow fallback) | structure distinct (cell fallback) | room-name adjectives seen |
| :-- | :-- | :-- | :-- | :--- |
| 0 (shogun/organic, Research) | 10 → 12 | 6 (2) → 7 (**0**) | 6 (5) → 7 (2*) | shogun + organic words (was monolith + organic) |
| 12345 (organic/abyssal, Industrial) | 17 → 17 | 15 (2) → 16 (**0**) | 9 (249) → 14 (2*) | organic + abyssal words |
| 0x1234 (monolith/shogun, Industrial) | 10 → 19 | 10 (6) → 14 (**0**) | **1 (299)** → 9 (4*) | monolith + shogun words |
| 500 (organic/neon, Commercial) | 11 → 13 | 7 (2) → 8 (**0**) | **1 (170)** → 8 (4*) | organic + neon (unchanged) |
| 9999 (rust/baroque, Industrial) | 14 → 18 | 8 (4) → 11 (**0**) | **1 (262)** → 10 (5*) | rust + baroque (unchanged) |
| 42 (baroque/gilded, Industrial) | 11 → 11 | 7 (1) → 7 (**0**) | **1 (120)** → 7 (3*) | baroque + gilded words |

\* the residual `a spatial cell` rooms are the F2 glitch key; c9 removes them (the phase gate requires 0). Objects, furniture, doors, counts:
identical to the audit's table, as intended for step 1.

### Documentation edits (c9), each sentence currently true and about to be false
- `docs/terminal/guide/players_guide.md:291-297` "Not all cultures are equal" — rewrite: every culture has walls and names, every era its light, every trait its structures (keep the `<!-- ThemeService.groovy -->` cite, line numbers updated).
- `players_guide.md:450-451` — the glitch-capitalisation quirk: remove (fixed).
- `players_guide.md:491-493` FAQ "Why does every room in this country say 'a spatial cell'?" — remove.
- `docs/terminal/manual/the_lattice_atlas.md:57` "Four Eras carry their own light…" → all eight; `:61-64` four "Unlit" entries get a light clause written from the new files (same shape as `:59-60`); `:71` "Four Traits describe their own structures…" → all six; `:75`, `:78` "Structure unrendered" → a clause from the new files; `:151` "Six Cultures own a lexicon; the four Minor Cultures borrow Monolith's" → all ten.
- `docs/terminal/codex/cultural_origins.md:44` "The Minor Cultures left their possessions but not their walls…" → rewrite in-fiction (they have walls and names now; the relics still betray them).
- `tasks/backlog/HOUSEKEEPING.md`: HK-016 step 1 ticked; **HK-017** logged (F4: pane wrap width 88 vs split-box capacity 86, `FrameGeometry.groovy:22` / `Terminal.groovy:311`) unless fixed first.

## Gates and reversion
- **Per commit:** `./vinc.sh --test --agent 2>/dev/null` = `STATUS=PASS … FAILED=0`; `./vinc.sh --lint --agent 2>/dev/null` = `LINT=PASS`; `git status --short` clean; golden count 36, byte-identical except the two frames c3 declares.
- **Phase:** `./vinc.sh --scan` seed 0 → 9 nodes before c2 and after c9; `DeterministicUniverseTest` green (in the suite); the variety probe (audit Appendix A) re-run after c9 and its table appended to the audit — `lighting (glow)` and `structure (cell)` fallback counts must be **0** on all six seeds, `walls` distinct ≥ 5 on every seed.
- **Reversion unit:** one commit. Content commits c2–c8 are mutually independent and revert alone. c9 depends on all of them (its pin is red without any one of them): revert c9 first, then any content commit. No commit mixes a production change with an unrelated doc change; c9's docs are the sentences its own change falsifies (HK-014 rule).
- **Stop rule:** any gate movement not listed in the table above → STOP, do not regenerate, re-plan.

## Declared deviations
1. **Docs are edited once, in c9, not in each content commit.** Between c2 and c9 the guide says "Industrial rooms say a spatial cell" on a branch that is never published (the site builds from `master:/docs`); the merge is atomic. Splitting the guide edit across seven commits would spread one paragraph over seven diffs.
2. **The pin lands last (RED → GREEN), not first.** The Coverage Claim Protocol's step-0 pin protects behavior that must *not* change; this step's behaviors that must not change are already pinned (table above). The new pin describes the *target* state and would be red on every intermediate commit, breaking per-commit coherence (precedent: HK-010 `DiscoveryEventContractTest`, HK-007 `FilamentNullRollTest`).
3. **`Singularity.txt` and the `"abyssal"` key fix** are not in the audit's step-1 list; they are the same defect (missing file + silent fallback) found while reading the glitch branch, and without them the new warning is not silent in production.
4. **The lighting `monolith` link (`:89`) is left in place** although it is dead; removing it is cleanup outside the step (Surgical Precision).
5. **Resource text files are counted as production files** against the 5-file cap (the cap exists for blast radius; a 5-line text file that a generator reads *is* production data).

---

## Appendix — proposed content (every new line; review the words, not just the counts)

Voice rules followed: lowercase noun phrases; lighting completes *"illuminated by …"*, structure completes *"You are in …"*
(article included), walls complete *"The walls are <colour> …"* (no article); five lines each, matching the existing files;
each era/culture/trait's line vocabulary drawn from its own `cultures/*.txt` / `timelines/*.txt` relics and its atlas entry.

### `themes/atmosphere/lighting/atomic.txt` — The Chrome Optimism
```
the green phosphor sweep of a radar scope
ring-shaped fluorescent tubes humming behind chrome grilles
the sickly glow of radium-painted dials
a bare bulb swinging inside a lead-lined cage
harsh flashbulb pops from a camera no one is holding
```
### `themes/atmosphere/lighting/digital.txt` — The Translucent Decade
```
the blue-white wash of a flat-panel monitor left on
status LEDs blinking green and amber along an ethernet hub
a screensaver's slow colours crawling across the ceiling
the translucent glow of a tower case lit from within
pale light leaking around a frosted glass disc
```
### `themes/atmosphere/lighting/entropic.txt` — The Unravelling
```
light that fades the moment you look at it
a residual glow bleeding from surfaces that no longer exist
the after-image of a lamp that has already gone out
dissolving motes of static drifting like ash
a dull heat-shimmer where the ceiling used to be
```
### `themes/atmosphere/lighting/future.txt` — The Projected Tomorrow
```
a soft holographic haze with no visible source
laser-etched lines glowing along the seams of the floor
smart glass panels dimming and brightening on their own
the violet corona of an idle plasma coil
a drone's searchlight sweeping past the doorway
```
### `themes/atmosphere/structures/Industrial.txt` — The Unformatted Works (Power Plant, Processing Core, Maintenance Bay, Fuel Depot)
```
a soot-blackened machine hall with catwalks overhead
pipe-choked geometry built around a single humming turbine
a maintenance pit ringed by chain hoists and drip trays
a cavernous fuel bay of riveted tanks and warning stencils
gantry-braced architecture that vibrates with every pulse
```
### `themes/atmosphere/structures/Commercial.txt` — The Credit Lattice (Trading Floor, Logic Market, Credit Hub, Supply Node)
```
a tiered trading floor beneath a dead ticker board
shuttered market stalls arranged in a strict grid
a vaulted credit hall of teller cages and pneumatic tubes
shelving-lined supply geometry with a barcode on every edge
an open atrium of kiosks lit for customers who never came
```
### `themes/atmosphere/structures/Singularity.txt` — the glitch branch
```
geometry that folds back into itself at the corners
a non-Euclidean chamber whose far wall is also its floor
a probability-field cell that resolves only while observed
space stretched thin around a dormant quantum core
a time-dilated alcove where echoes arrive before their source
```
### `themes/atmosphere/walls/gilded.txt` — The Velvet Ledger
```
velvet-flocked wallpaper above mahogany wainscoting
brass-framed panels of etched crystal
silk tapestries hung over gilt plaster
clock-mechanism friezes in tarnished brass
mirrored panels in ornate gold-leaf frames
```
### `themes/atmosphere/walls/rust.txt`
```
corrugated sheets bolted over crumbling brick
flaking industrial paint over pitted iron
welded scrap plates streaked with orange oxide
oil-stained concrete cracked down to the rebar
chain-link mesh stretched over rusted girders
```
### `themes/atmosphere/walls/shogun.txt`
```
shoji screens of paper stretched over cedar
lacquered panels painted with cranes and mist
plaster stained by the smoke of a thousand lanterns
woven bamboo lattice over dark timber
vermilion pillars framing calligraphy scrolls
```
### `themes/atmosphere/walls/void.txt`
```
seamless white surfaces with no visible joins
perfectly matte panels that swallow every shadow
glass so clear it reads as open air
white light strips set flush into featureless plaster
silent, unmarked panels that hum when touched
```
### `themes/atmosphere/walls/zenith.txt`
```
fluted marble columns set into alabaster
sun-bleached limestone carved with laurel friezes
ivory-veined marble polished to a mirror
weathered travertine blocks joined without mortar
painted plaster of sandaled figures in procession
```
### `names/buildings/index.txt`
```
abyssal
baroque
gilded
monolith
neon
organic
rust
shogun
void
zenith
```
(c6 commits the six existing keys; c7 adds gilded, shogun; c8 adds zenith, abyssal.)

### Lexicons (8 adjectives, 8 nouns; nouns must also read well fused with *Gate, Fall, Reach, Spire, Well, Root* — `NameGenerator.groovy:167`)
| file | lines |
| :--- | :--- |
| `gilded_adj.txt` | Gilded, Velvet, Brass, Crystal, Ornate, Mahogany, Opulent, Clockwork |
| `gilded_noun.txt` | Salon, Gallery, Atrium, Parlour, Conservatory, Manor, Ballroom, Ledger |
| `shogun_adj.txt` | Lacquered, Silent, Folded, Cedar, Ashen, Vermilion, Paper, Moonlit |
| `shogun_noun.txt` | Pavilion, Shrine, Garden, Dojo, Keep, Teahouse, Lantern, Bridge |
| `zenith_adj.txt` | Marble, Ivory, Laurel, Olympian, Sunlit, Alabaster, Columned, Serene |
| `zenith_noun.txt` | Forum, Temple, Colonnade, Basilica, Agora, Pantheon, Rotunda, Acropolis |
| `abyssal_adj.txt` | Recursive, Unhandled, Orphaned, Severed, Inverted, Writhing, Eyeless, Null |
| `abyssal_noun.txt` | Vertex, Thread, Partition, Cyst, Membrane, Sigil, Altar, Exception |

Sample outputs these produce: *Velvet Conservatory*, *ManorWell*, *Lacquered Teahouse [0x3A]*, *ShrineGate*, *Sunlit Colonnade*,
*PantheonReach*, *Recursive Cyst [0xD0]*, *ExceptionRoot*.

### `ThemeService` warning (c9) — shape, not final text
```groovy
private List<String> poolOrWarn(String category, String key, List<String> fallback) {
    List<String> pool = atmosphere[category][key]
    if (pool == null) Terminal.println "[THEME_WARN] no ${category} file for '${key}' — falling back"
    return pool ?: fallback
}
```
`:85`, `:89`, `:93` become one call each with their current fallback chains as `fallback`; the warning fires on the first
miss only. `NameGenerator:102,149` get the equivalent one-line guard. `@CompileStatic` preserved; `Terminal` imported as in
`CorridorFactory`.
