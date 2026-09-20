# Docs Plan: GitHub Pages audit — make the published player pages true
**Created:** 2026-09-20 | **Grill:** AMEND (21 items: 4 false "becomes" sentences, 9 overreaches narrowed, 3 missed copies, citations, Liquid rule, 3 undeclared deviations, commit structure) → applied | **Branch (proposed):** `docs/gh-pages-audit` (from `master` @ 08c7f44)
**Scope (user decision):** the published site only — `docs/_config.yml`, `docs/index.md`, `docs/_layouts/`, `docs/assets/`, `docs/terminal/**`. **No file under `src/`.** Game-side findings are logged, not fixed: HK-021 (extended) and HK-023.
**Exception (user decision, this session only):** the 5-file refactor cap is lifted. The user reviews **once, at the end**, so commits are per area (~7, see *Order and commits*), and the protections are the **grill** (done), an **independent verification pass** before the push, and a **deviations list** in this file.
**Status:** AUTHORIZED 2026-09-20 (Directive: "yes, authorized, amend the plan and execute"). Baseline on the branch before the first edit: 282 / 282 / 0 / 0, `DOCS=PASS`. D1–D4 stand as written (no objection raised). **Merge and push are not covered by this Directive.**
**Executed 2026-09-20** on `docs/gh-pages-audit`: `0e0e94a` c0 plan + backlog · `02976d8` c1 `_config.yml` · `5d30cb4` c2 install + guide · `e0b24b3` c3 manual · `7803517` c4 weakest codex · `9ffef70` c5 rest + Atlas · `0085112` c6 verification fixes · `e425dc7` c7 site shell. Gates after c7: `STATUS=PASS 282/282`, `LINT=PASS FILES=220`, scan seed 0 → 9, `DOCS=PASS`, tree clean; no file under `src/` or `config/` in the diff. **Still owed after the merge + push (needs the user's word):** Pages build `built` for the pushed commit; link crawl of the 18 pages + `404.html`; `/retro/RETRO_PHASE_1.html`, `/analysis/WORKFLOW_BACKLOG.html`, `/README.md` now 404; one phone-width look at the header. If the build fails, revert `e425dc7` first (the only new Liquid).

> **No behavior change, no source change.** Prediction: suite count, 36 goldens, `--scan`, lint baseline all unchanged
> (nothing they read is edited). The only thing that moves is what a visitor reads at
> `https://ghostsysoutnull.github.io/endless-transit/`.

---

## What is wrong today (ELI5)

The site is about 85% true, and the false 15% sits on the pages a new player reads first. The install page gives two
commands that fail. The player's guide says you start at the universe (you start on a street), says the game ignores
`--seed` (it reads it, and the same guide says so 100 lines earlier), says door traces are free to read (they only
show inside `s`), and tells you to stash your Keystone in a room (it comes back as a plain item). Three pages not
touched since March describe a game that was refactored ten times since. And the site publishes 40 internal
documents (`retro/`, `analysis/`) that nobody links to.

The pattern behind most errors: **one fact, several copies, one copy fixed.** The RESONANT_TRACES rule is wrong on
three pages; "Minor Cultures default to Monolith" on two (a third paragraph on the same page says the opposite). So
the work is organised **by fact across pages**, not page by page — every copy of a fact is fixed in the same pass.

## Evidence

Every claim below was read from the page this session (line numbers are the page's, at 08c7f44). Code citations are
marked **[V]** = re-read by the planning session, **[A]** = reported by an audit agent with file:line and not yet
re-read. **Rule for execution: an [A] citation is opened before the sentence that depends on it is written.** A
citation that does not hold stops that row, not the wave.

Audit method: four read-only agents fact-checked 17 pages against `src/`; 14 of their claims were spot-checked by the
planning session, 14 held. Site shell checked live: 251 links across 18 pages, all 200; build at 08c7f44 = HEAD.

---

## Decisions taken in this plan (each is a default — overrule any of them)

| # | Question | Default | Why |
| :-- | :-- | :-- | :-- |
| D1 | Merge `link_navigation` + `operational_protocols`? | **No. Keep both, one owner per fact**: `operational_protocols` owns the rules, `link_navigation` owns the keys and points at the rules. | A merge changes a URL, the nav and the index for no reader benefit; the duplication is the problem, not the page count. |
| D2 | `system_specifications`: rewrite or cut? | **Rewrite in place**, same length (~400 words), against the current architecture. | Keeps the URL and the `[04_SYS_SPECS]` nav entry; half the page is wrong, but the page is short. |
| D3 | `lip_addressing`: rewrite or cut? | **Rewrite in place.** | Same reason; the format half is right. |
| D4 | Spoiler warnings? | **Yes**: one in-voice line on `codex/index.md` and on the four endgame pages (ritual, bedrock, synthesis, coherence). | The codex gives away the whole endgame; the guide already hides its spoilers in `<details>`. |
| D5 | Voice | Manual and codex stay in the game's voice (HK-014 precedent: "fixed in the in-fiction voice"); the guide stays plain. | Vibe priority. |
| D6 | Bugs the pages must describe | **Describe the game as it is**, without apology: "a dropped fragment returns at its name's frequency; a Keystone does not survive it". | When HK-021/HK-023 fix a bug, that wave updates the page (its `/close-wave` row 1 finds it). |
| D7 | Guide source citations (`<!-- File.groovy:NN -->`) | **Keep, and correct the ones touched.** Not a full re-citation. | They are why the guide is the most accurate long page; a full re-cite is its own wave. |

Out of scope, noted so they are not lost: root `README.md:26` "Groovy 4.x+" (HK-023); `docs/README.md` (not published, links to
`GEMINI.md`-era paths); `src/main/groovy/com/endlesstransit/ui/CLAUDE.md` says panes "88 / 38" — 86 since HK-017 [V]
(a domain doc, not a page; one line, proposed as an add-on to this wave's close-out if you want it).

---

## Step 1 — Stop publishing the internal documents (1 file, first commit)

`docs/_config.yml:6-8` excludes only `blueprints` and `history`. Live today [V, curl]: `/retro/*.html` + `.md` (32),
`/analysis/*.html` + `.md` (6), `/OO_PROBLEM_DESCRIPTION_PRIORITIZED.html` + `.md` — rendered in GitHub's default
theme with SEO tags, which the 18 real pages lack. Nothing in the repo links to those URLs [V, grep].

**Change:** add `analysis`, `retro`, `OO_PROBLEM_DESCRIPTION_PRIORITIZED.md`, `README.md` to `exclude:`.
The files stay in the repo and on github.com; only the site stops serving them.
**Check after push:** the three sample URLs return 404; the 18 player pages still 200.

---

## Step 2 — Facts with several copies (fixed together, one commit per page touched)

| Fact | True statement (code) | Wrong copies |
| :-- | :-- | :-- |
| **F1 RESONANT_TRACES** | A **capture** adds to the tally when the room's Culture matches the **local** primary Culture — the one shown as RESONANCE on the street header; a rebel city swaps primary and secondary (`CityFactory.groovy:34-37` [V]), so "the planet's primary" is wrong in one city in ten (`Room.groovy:167, 221` [V]; increments at `:173, :227`); a **synthesis** adds when the result is divisible by 11 (`Player.groovy:106-108` [A]). The scan's `≈≈≈` is computed from the room's name and feeds nothing (`ScanCommand.groovy:186-188` [A]). Not saved: resets on restore (`SyncManager.groovy:21-41` [A]). | `operational_protocols.md:23`; `gematria_specifications.md:36-37`; `lattice_hunting.md:25`; `iconography_glossary.md:41` (wording); guide resonance passage (agent: counter "also rises on every culture-matched capture"). **True copies, keep:** `synthesis_theory.md:22`, `link_navigation.md:39` (both state the synthesis half only). The same "planet's primary" wording is narrowed wherever the +10% is described (`operational_protocols.md:21`, `gematria_specifications.md:32`, `iconography_glossary.md:48`). |
| **F2 Minor Cultures** | All ten Cultures have their own walls file and building lexicon (`names/buildings/index.txt`, `themes/atmosphere/walls/` — 10 each [V]). The Monolith fallback never fires in production (`NameGenerator.groovy:106-113` [A]). | `the_lattice_atlas.md:43`; `cultural_origins.md:9` and `:58` (`:44` on the same page is right — it becomes the one statement) |
| **F3 Abyssal as a planet Culture** | Picked uniformly, 1 in 10 like any other (`ThemeService.groovy:66-69` [V]); no `abyssal` colour key, so it renders WHITE (`PlanetFactory.groovy:48-59` [A]). | `the_lattice_atlas.md:48` ("rarely"); `cultural_origins.md:63` ("rarely", "Monolith grey") |
| **F4 Zero Coherence** | `reboot()`: world regenerated from the same seed, Coherence 100, player and buffer kept (`TurnProcessor.groovy:94-100` [V]); world mutations lost, `visitedLIPs` and `stepCount` survive [A]. | `system_initialization.md:22` ("severed… lost to the void"). `operational_protocols.md:16` is right and is the owner; `coherence_optimization.md:32` is right. |
| **F5 Upper strata** | `floorNum > maxFloors - 5` with the Peak at `maxFloors - 1` → **up to three** floors: 3 only when the building has ≥ 9 floors (6 floors → 0, 7 → 1, 8 → 2); the `< 5` rule wins first (`Building.groovy:81-86` [V]; enumerated by the grill). | `the_lattice_atlas.md:86` ("four"); `players_guide.md:342` ("four") |
| **F6 `[CLEARED]`** | Means every sub-location of the floor was visited (`Building.groovy:128-133, 224-225` [A]); **sampling progress is shown nowhere**. | `the_inversion_ritual.md:14`; `players_guide.md:254` |
| **F7 Dropping a fragment** | Stored as a bare name (`Room.groovy:208` [V]); re-capture rebuilds it by Gematria (`:222-223` [V]) — a Keystone loses `isKeystone`/`boundLip`, a Hybrid or Hidden Frequency loses its Hz. | `players_guide.md:428-431` + tip 8 (`:381-382`); `synthesis_theory.md:14`; `link_navigation.md:37` |
| **F8 Pulse Traversal** | `stepCount` is saved and restored (`SyncManager.groovy:27,98` [A]) and advances on any resolved menu option, not only movement (`NavigationCommand.groovy:33-38` [A]). | `link_navigation.md:46`; `iconography_glossary.md:54` |
| **F9 Map glyphs** | **Two maps.** The HUD's right pane shows a map down to the **Street** (depth ≤ 7) and telemetry below it (`TelemetryComponent.groovy:50` [V]); at the Universe and Filament it is a fixed schematic, elsewhere it plots each child's own `getMapSymbol()` (`:74-78`). The `m` command projects the **children** of any container you stand in (`LatticeMapComponent.groovy:36`); in a Room it prints `SCAN_ERROR`. `■`/`░` exist only in the legend string (`TelemetryComponent.groovy:82` [V]); `▲` is plotted only on the filament schematic (`:119` [V]) — elsewhere it is legend-only. ~~every container down to Apartment has a map~~ (grill: FALSE). No colour claim for `☠` (see 3.12). | `iconography_glossary.md:31-35` (incl. `:31` `▲`); `lattice_hunting.md:12,14,16` ("City and up" → "Street and up", "`■` marks", "siblings") |
| **F10 Master Number vs Stabilized** | Two different rules under one name. Master Number = base sum exactly 11/22/33, doubled (`Gematria.groovy:22-26` [A]). Stabilized = frequency divisible by 11. At room depth (12): without a Culture match 11/22/33 → 264/528/792 Hz, always Stabilized; with a match the ×1.1 is truncated → 290/580/871, **never** Stabilized (`Gematria.groovy:22-31`; recomputed by the grill). | `gematria_specifications.md:47` ("always"); `synthesis_theory.md:18` heading; `codex/index.md:19` blurb |

---

## Step 3 — Page by page (what each commit contains beyond Step 2)

### 3.1 `manual/installation_guide.md` — the worst page, first
| Line | Today | Becomes |
| :-- | :-- | :-- |
| 14-15 | Java 8+, Groovy 4.x | Groovy **5.x** (`build.gradle:13` pins 5.0.0 [V]; this tree runs on 5.0.4 / JDK 25 [V]); JDK 11+ (Groovy 5's floor), 17+ recommended |
| 33-34 | `./run.sh` | + "run it from the repository root" [A]; + `./run.sh --seed <n>` (`LaunchArgs.groovy:12-22` [V]) |
| 42 | `./vinc.sh # Instant game launch` | "auto-compile, then launch" — it recompiles on launch (`vinc.sh:13-28,125` [A]) |
| 45-49 | `groovy -cp src/main/groovy …Main.groovy` | the real classpath `src/main/groovy:src/main/resources:lib/*` (`run.sh:132` [V]) — today's command crashes on the first frame [A, executed] |
| 52-56 | `./run.sh --test` → `ALL TESTS COMPLETED SUCCESSFULLY` | `./vinc.sh --test` → `[VINCULUM_TEST_SUITE_SYNCHRONIZED_SUCCESSFULLY]` (`TestRunner.groovy:226` [A]); `run.sh:118` targets a file that does not exist [V] (HK-023) |
| 59 | `session.trace` "to store your visitedLIPs", "will attempt to create" | written on `sync` or at quit only; holds seed, LIP, Coherence, steps, footprints, buffer, mutations (`SyncManager.groovy:21-41` [A]); the final sync is skipped if the second quit prompt is answered `n` (`QuitCommand.groovy:20-21`), and `quitnow` never syncs; + the other files the game writes to the root: `transit.log` (rotated `.1`–`.5`, `Logger.groovy:51-57`), `journal.txt`, `journal-last-entry.txt`, `.journal_session_tmp` (`JournalManager.groovy:22`), `screenshots/`. "JDK 11+" is an external fact about Groovy 5, not repo-backed — the page says "tested on Groovy 5.0.x / JDK 17+" and names 11 as Groovy 5's stated floor. |

### 3.2 `guide/players_guide.md`
| Line | Today | Becomes |
| :-- | :-- | :-- |
| 39-41 | "You start at the top, at the whole universe, and walk downward" | you start **on a street** (`WorldGenesis.groovy:78` [V]); `l` climbs, numbers descend. The guide's own `:143` already says "starting street". |
| 56 | "Type exactly `y`" | `y` or `Y` (`Game.groovy:89` `.toLowerCase()` [V]) |
| 64-72 | first walk from the universe; `VOID_REACH` has "nothing to walk into" | first walk from the street (pick a building → floor → `c` → door); the climb-out is a second, optional paragraph; `MATTER_CLUSTER`/`VOID_REACH` are on the **filament** menu [A]; a Null Reach does list solar systems (the guide's `:283` is right) |
| 113 + Room row | corridor row | add: after leaving an apartment you stand on the Corridor location — doors and `l` only, no `b`; `l` returns to the floor's corridor view (HK-021 [V in backlog]) |
| 185-186 vs tip 4 (`:377`) | tip 4 "Stand in a room for a few prompts" contradicts "one roll per move" | tip 4 rewritten to agree with `:185` |
| 193-196, 220-221, tip 3 (`:376`) | "Every door … carries a trace"; "Reading the trace from the door list is free" | the door list shows inscription + material + `[STATE]` only (`Door.groovy:62-70` [V]); the trace appears inside `s`. Free information = inscriptions. The trace table moves under the `s` paragraph. |
| 254 | lobby marks floors `[CLEARED]` | F6 |
| 299 | `[TEMPORAL_MARKER: X]` header | remove the header claim (never rendered — HK-023); keep the drift rule |
| 342 | "four floors under the top" | F5 |
| 365-370 | edit `session.trace` / "Pair it with the `session.trace` trick" | `--seed` is the way; the editor trick goes |
| 428-431 + tip 8 | "Rooms are lockers … stash a Keystone" | F7, as a warning box |
| 451 | "Every other culture has eight" | sixteen (`themes/cultures/*.txt` = 16 lines each, abyssal 28 [V]) |
| 472-473 | FAQ "the game never reads its arguments" | the FAQ answers with `--seed` (agrees with `:363`) |
| new | — | a short **Install** pointer (versions, repo root) linking to the install page — not a second copy of it |
| citations | drifted (e.g. drain cited `:46-48`, is `:51-53` [A]) | corrected where the sentence is touched (D7) |

Not in this wave (say so, do not start): a cheat sheet, a worked ritual transcript, moving the odds tables to an
appendix. Good ideas; they are new content, not corrections.

### 3.3 `manual/system_initialization.md` — line 22 (F4). Nothing else.

### 3.4 `manual/link_navigation.md`
- `:16-17` `u`/`d` "within a Building or Shaft" → on a Floor, elevator mode only (`ElevatorState.groovy:28-37` [A]); the lobby is numbered floors; "Shaft" is not in the code [A].
- `:19` `b` → also "back to the elevator" from the corridor (`CorridorState.groovy:26` [A]).
- Table gains: numeric selection (`1` = `01`, `InputHandler.groovy:62-80` [A]), `help`/`?`, `q`, `map`, the case rule. `glitch` and `quitnow` stay out of the in-voice manual (the guide documents them).
- `:37` F7 · `:39` F1 (points at `operational_protocols`, D1) · `:46` F8 · `:50` + `--seed`.

### 3.5 `manual/operational_protocols.md` — `:23` (F1). Owner page for F1 and F4; one sentence each on "not saved" and on what a reboot keeps.

### 3.6 `manual/system_specifications.md` — rewrite in place (D2)
| Line | Today | Becomes |
| :-- | :-- | :-- |
| 14 | "Scrambler Random … `nextLong()`" | child seeds are `locus.branch(index)` — a mixer, no `Random` (`LocusSeed.groovy:31-33` [A]; procgen CLAUDE.md agrees) |
| 20 | "saving only the Master Seed and the player's current LIP" | + Coherence, steps, footprints, buffer (with the Keystone's bound LIP), per-LIP mutations [A] |
| 21 | "[4/12] Rooms Cleared" | the real readout `[PROBE: v/t]` (`ElevatorState.groovy:65` [A]) |
| 25 | left pane "88 chars" | 86 (`FrameGeometry.groovy:26` [V]) |
| 31-36 | four domains; themes under UI | themes and lexicons are procgen; procgen = `LocusSeed`, one factory per location type behind a registry; + one paragraph each: domain events (`EventBus`, journal and ritual as listeners), floor as a state, the bridge as a compositor of eight components, the gates (golden frames, lint). Each sentence is checked against the **code** at writing time — the domain `CLAUDE.md` files are a guide, not the evidence (one of them still says "88"). Cited: save contents `SyncManager.groovy:21-41, 95-113`; commands `TurnProcessor.groovy:32-47`, `GlobalCommands.groovy:15-35`. |

### 3.7 `codex/lip_addressing.md` — rewrite in place (D3)
`:14-23` example stops at Country → full 13-segment room address (Corridor segment always 0, Floor segment = floor number [A]). `:28` "low drain rates" → drain never goes below 1; no command jumps to a LIP, so a locus is shared as **seed + path to walk**, with `--seed`. `:32` "negative indices or extended hexadecimal" → decimal only, `< 0` rejected (`Universe.groovy:59-62` [V]); layers below the Bedrock are appended after the Peak at runtime, and such an address **does not resolve on a fresh world** (grill probe; HK-023) — the page says a Layer address cannot be shared or relied on, and `:29` "reconstitute your exact position" is softened to "above the Bedrock"; `-0x..` is a display name. Uncited-but-true, now cited: drain ≥ 1 (`TurnProcessor.groovy:52`), no LIP-jump command (`TurnProcessor.groovy:32-47`, glitch menu `RenderingCoordinator.groovy:46-51`), strict tree (`Container.parent`). `:36` "Loops" → the web is a strict tree.

### 3.8 `codex/iconography_glossary.md`
F8, F9; `:12-26` add COUNTRY `⬚` (sparkline glyph `Container.groovy:266`; map symbol `Country.groovy:99`) and the abyssal tail `▤-N ▅ 🚪 ☠` (Floor branch `Floor.groovy:88-91`, N decimal; Room `Room.groovy:65`); `:26` `☠` is a map symbol and the Room's sparkline glyph — not "any node, whatever its scale"; `:31` `▲` legend-only except on the filament schematic (F9); `:35` the `X` never shows as an X (`glitchText(…, 1.0)`, glitch set `█▓▒░/\%!$#*` at `Terminal.groovy:175`) → "static characters" on the `m` map, not "block static".

### 3.9 `codex/gematria_specifications.md`
F1, F10; `:40-45` "Rust Piston" → a name the deck can produce (taken from a real run at execution, arithmetic redone by hand and checked against `Gematria`); `:47` Master Number paragraph → states the truncation; says that no object name **in the current lexicon** sums to 11/22/33 (reproduced by the grill: 88,364 names, lowest sum 29 "oil can", next 41; no test pins it, hence the qualifier).

### 3.10 `codex/cultural_origins.md`
F2, F3; ~~`:11` → one in twenty~~ **row dropped (grill: FALSE)** — stability is clamped at 0.9 (`VibeCapsule.groovy:29` [V]), so drift is 10–25% and the page's "one in ten … one in four" is already right; `:16,21,26,31,36,41` Great-Culture archetypes → names the lexicons can produce (read from `names/buildings/<culture>.txt` and `themes/cultures/<culture>.txt` at execution; the Minor entries already do this).

### 3.11 `codex/lattice_hunting.md` — F1, F9 (`:12,14,16,25`). Redundancy with the Atlas is left alone this wave.

### 3.12 `manual/the_lattice_atlas.md` (~95% right — four lines + three additions)
F2 `:43` · F3 `:48` · F5 `:86` · `:97` the Echo caveat is false since HK-015 — the roll is seeded by locus + step count (`NullSector.groovy:92` [V]) → "two Observers on the same seed and the same step count get the same scan" · `:141` "three-digit hexadecimal" → one to three digits (`nextInt(0xFFF)` unpadded [A]) · `:175` Bedrock section + `☠` (**no colour claim** — `Container.groovy:43` returns the literal word `"RED"` and the map prints it uncoloured; HK-023) and the doubled drain, which is ×2 in the arteries, crypts and shards (they force a non-Entropic era, `Corridor.groovy:112-122`) and ×4 only on an Entropic Layer screen. Null Reach hex cited: `NullSectorFactory.groovy:23`. Additions (both held): streets hold an even number of buildings (`StreetFactory.groovy:30,37`); the floor's `STABILITY: nn%` is the share of apartments that **follow the primary Culture** (75–90), i.e. 100 minus the drift (`ElevatorState.groovy:73` [V]) — ~~"is the drift odds"~~ (grill: inverted).

### 3.13 `codex/synthesis_theory.md` — F7 `:14`; F10 `:18`; `:33` badge reads `NEW_SYNTHESIS` at 1, `SYNTHESIS_x<n>` above, per item (`InventoryOverlayComponent.groovy:41-43` [A]).
### 3.14 `codex/the_inversion_ritual.md` — F6 `:14`; + tip "pick a small building" — stating that **nothing shows the floor count before you enter**; `[FLOORS: n]` appears in `ll` once inside (`Building.groovy:122`, `LatticeTraceComponent.groovy:67`), and the lobby lists the floors.
### 3.15 `codex/coherence_optimization.md` — thresholds moved out from under `[ABYSSAL_PRESSURE]` (`:29-32`); + yellow bar below 70 (`HUDHeaderComponent.groovy:148`); thresholds cited: 40 at `NarrativePaneComponent.groovy:25`, 30 at `HUDHeaderComponent.groovy:147` and `LatticeMapComponent.groovy:43`. **Missed copies (grill):** `:35` "door traces from the corridor list … free" (same error as the guide — traces show only inside `s`); `:19` "Abyssal + ENTROPIC = 4" → 4 on the Layer screen only, 2 in its arteries and cells.
### 3.16 `codex/index.md` — `:19` and `:30` blurbs (F10; the ritual page has no mathematics); D4 banner.
### 3.17 `codex/the_bedrock_shift.md` — D4 banner only.

---

## Step 4 — Site shell (after the facts; 4 files, one commit each)

| File | Change |
| :-- | :-- |
| `assets/css/terminal.css` | `:221` `animation: flicker 0.1s infinite secondary` is invalid → the flicker never runs (fix: drop `secondary`, and slow it — 0.1s infinite is a strobe; honour `prefers-reduced-motion`); `:243,252` `--primary-color` is never defined; `.glitch` (layout `:15`) has no rule; `.hud-top` does not wrap on a phone and `body` hides the overflow. |
| `_layouts/terminal.html` | `<meta name="description">` + Open Graph title/description (the leaked pages had them, the real ones do not); favicon (inline SVG data URI — no new binary); mark the current page in the nav (`page.url`); footer `v1.1` left alone. |
| `404.html` (new) | terminal layout, in voice, links to `[INDEX]` and `[GUIDE]`. Today a bad URL gets GitHub's generic page. |
| `index.md` | the module list omits the Codex (it is only in the nav) → add it. |

Not proposed: prev/next links generated from front matter, a sitemap plugin, a search box. Each is a feature.

---

## Order and commits (amended: one review at the end → commits per area)

0. Branch `docs/gh-pages-audit`. **c0:** this plan + the backlog/lesson edits (HK-021 line, HK-023, todo line, lesson).
1. **c1** `_config.yml` (Step 1).
2. **c2** install guide + player's guide (3.1, 3.2).
3. **c3** the four other manual pages (3.3–3.6).
4. **c4** the four weakest codex pages (3.7–3.10).
5. **c5** the rest: `lattice_hunting`, Atlas, synthesis, ritual, coherence, codex index, bedrock (3.11–3.17).
6. **Verification pass** (below); fixes, if any, in **c6**.
7. **c7** site shell (Step 4) — last, first reverted.
8. `/close-wave` (expected tier **Light** — nothing under `src/`), which runs `./vinc.sh --docs`.
9. **Merge and push only on the user's word**; then the live checks.

Intermediate commits leave pages disagreeing with each other (the guide fixed, the Atlas not yet). That is never
served: there is one push, at the end.

## Deviations declared (grill check 5)

- **HK-014's closed record** says `installation_guide`, `system_initialization`, `system_specifications` and `lip_addressing` had
  "no contradictions found". This audit found contradictions in all four. The record stays as history; this plan supersedes that line.
- **HK-014's worked example "Rust Piston"** (recomputed there on purpose) is replaced, because the deck cannot generate that name.
  The arithmetic method is unchanged.
- **The "Minor Cultures borrow Monolith geometry" text** was written by HK-014 and made false by HK-016 step 1 later the same day;
  HK-016's close-out did not revisit the player pages. (Pointer for the retro — `/close-wave` row 4 exists for this since WF-007.)
- **`tasks/backlog/github_pages_site_plan.md`** is the site's original plan. No conflict: its open items (recordings, SVG
  diagrams, seed gallery, README overhaul) are outside this scope and stay open. Its Phase 4 "GitHub Pages Config" box is
  unticked although the site has been live since March — left for whoever picks that plan up.
- **`GlobalCommandsContractTest.groovy:9`** cites `players_guide.md:102-103` by line number; the guide's lines move in c2, so
  that comment goes stale. This plan touches nothing under `src/`; logged in HK-023.

## Deviations found during execution

*(row → what the code or a run said → what was written instead)*

- **Guide, stale test pointer (declared deviation above) — avoided.** Every edit above line 103 of the guide was made line-count-neutral (asserted by the edit script), so `GlobalCommandsContractTest.groovy:9` → `players_guide.md:102-103` still points at the case rule. The new Install pointer became one sentence inside the existing *Launching* paragraph instead of a new section. HK-023's bullet reworded accordingly.
- **Guide `:52` "ten-second scripted intro"** → "a short scripted intro": the sleeps sit inside loops, no honest number without timing it.
- **Guide, seed 4660 walkthrough — run, not read** (headless from a scratch directory, player files untouched): the game starts on Busy Terrace at 99%; building `1` = Eternal Shaft, 3 floors; lobby keys are floor numbers; `0` → `c` → `1` opens `Unbroken Fuel Depot` with 15 objects (the page's claim holds, its route did not). "monolith and shogun" → "monolith" (only the primary was observed).
- **Guide, dropped hybrid / Hidden Frequency** → "a thousand or two hertz" ("Hidden Frequency" = 113 × 12 = 1356 by the grill's sums), not "a few hundred".
- **Guide `:14-15` "Where this page disagrees with the manual or the codex, this page is right"** → re-dated and softened: after this wave the three should agree, and the guide was itself wrong in four places.
- **`system_specifications` (D2 said "same length, ~400 words")** → 700 words. The March text knew nothing of lazy population, mutations in the save, the compositor, seeded HUD noise, the floor state machine, the factory registry or domain events; each got one bullet, each checked against the code (14 factories, 8 components, `FrameGeometry` 130/90/86/38, the snapshot's keys, `[PROBE: v/t]`, 36 goldens, `FrameEntropy`). Cut it back if it reads long.
- **`operational_protocols` now owns the reboot rule and the tally rule** (D1); `system_initialization:22` and `link_navigation:39` state the short form and the latter links to the owner.
- **Atlas additions (3.12) not made:** "streets hold an even number of buildings" and "what `STABILITY` means". The second is already owned by `iconography_glossary.md:52` and the guide; a third copy is how this wave's errors were born. The first is trivia. The four corrections and the Bedrock paragraph were made.
- **One more missed copy, found while editing:** `lattice_hunting.md:22` also said door traces are "in the corridor list" — fixed with the others (F-door: guide, `coherence_optimization:35`, `lattice_hunting:22`).
- **`lip_addressing`:** the page now tells the reader to synchronize *before* descending and never to rely on a Layer address — it describes HK-023's restore bug as the game stands (D6). When that bug is fixed, this paragraph is the first thing to revisit.
- **Spoiler line (D4):** one blockquote, `[CLEARANCE_WARNING]`, on the four endgame nodes and a pointer on the codex index.
- **Verification pass (two fresh agents over `git diff master -- docs/terminal`, ~100 sentences):** 3 FALSE, 12 OVERREACH, 2 CONTRADICTION, 0 Liquid — every one re-read against the code and fixed in c6. The ones that mattered: (a) *"arteries cost 2"* — I had written it on four pages; after `c` the player still stands on the Layer, so an artery view under an Entropic world costs **4**; only Crypts and Shards cost 2. (b) install guide *"all three classpath entries are load-bearing"* — `lib/` holds only a JUnit jar; only `src/main/resources` is. (c) specs *"the model knows nothing of the UI"* — `Building.groovy:49,51,150` calls `ui.Terminal.clock` (logged in HK-023; the lint rule misses it). (d) *"a relic returns unchanged"* — only from the same cell; the +10% is recomputed where it is re-taken. (e) LIP page: a hexadecimal segment is not "refused", it cannot be parsed; and a Layer address fails even when the breach is remembered. (f) every capture below the Bedrock is amplified (the Substrate is Abyssal throughout) — added to the owner page and the two copies. (g) codex index *"the rest are safe"* contradicted three pages — reworded. Left as is, knowingly: citation ranges `Building.groovy:72-90` and `vinc.sh:122-127` are a line or two loose.
- **Gematria example (3.9)** will use `oscilloscope`: a name the run produced, 84 × 12 = 1008, ×1.1 → **1108 Hz** as printed by the game.

## Verification

- **Before the first edit:** `./vinc.sh --test --agent` and `--docs --agent` on the branch — the baseline, so that a red gate later is known not to be ours.
- **Per page, by the author:** the grill opened every [A] citation (29 held, 4 false, 8 overreached — all applied above); any sentence that goes beyond a plan row is checked against the code before it is written; on the **content pages (Steps 1–3)** no new Liquid (`{{`, `{%`) except copies of the existing `relative_url` link pattern — a Liquid typo fails the whole site build, and nothing on this machine can parse Liquid [V: no ruby, docker or python-liquid]. **Step 4 does add Liquid**, limited to: `{% if page.url == … %}` for the nav highlight, `{{ page.description | default: site.description }}`, and `relative_url` in `404.html`. Those are the last commits and **the first reverted** if the Pages build fails.
- **Independent pass (sub-agents, read-only, after step 3):** three fresh agents that did not write the text, each given `git diff master -- docs/terminal/<area>` and one instruction — *for every sentence added or changed, open the code that decides it and report only mismatches, with file:line*. Same method as the audit, confined to the diff. Their findings are verified against the file before any fix (CODEX, Agent Verification). Writing is **not** delegated: one voice, and the facts are already established here.
- **Cross-page:** for each of F1–F10, `grep` the old wording across `docs/terminal/` → zero hits (the lesson from HK-019: grep the *fact the change made false*, not the symbol).
- **After the push:** Pages build `status: built` for the merge commit (`gh api …/pages/builds/latest`); re-run the link crawl (18 pages + `404.html`, every `href` 200); the three sample internal URLs now 404; one phone-width look at the header.
- **Gates:** `--test`, `--lint`, `--scan` cannot move (no source, no resource, no golden touched) — run once at the end as proof, not per commit. `git status --short` clean after it.

## Risks

| Risk | Guard |
| :-- | :-- |
| A rewrite introduces a new false claim | the [A]-before-writing rule + the independent pass |
| One copy of a fact is missed again | Step 2 table + the F1–F10 grep |
| Voice drifts on the in-fiction pages | one author; HK-014's pages as the reference |
| Liquid breaks the build | no new Liquid; build status checked right after the push; every commit reverts alone |
| The one review at the end is too large to read | the tables above are the review: each row is marked done or listed under *Deviations found during execution*; the diff is the backup |
| Scope creep into "enhance" | the "not in this wave" lines above are the fence |
