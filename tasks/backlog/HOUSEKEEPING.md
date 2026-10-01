# Housekeeping Backlog
**Purpose:** Small, bounded code-quality items that were out of scope for the phase that found them.
Each is a candidate for a standalone housekeeping commit between phases (see "clear the improvement
backlog between phases" in `tasks/lessons/infrastructure.md`). Not workflow items — those go to
`docs/analysis/WORKFLOW_BACKLOG.md`.

**Process:** Open item → pick up between phases → plan, `/grill`, execute → mark CLOSED with commit.

---

## 🔴 OPEN

### HK-025 — keyboard shortcuts in a phones-only game
**Found:** 2026-09-28, the desktop code review (the wide layout and hover styles went in `0de9b4b`). **Needs the
user's decision:** remove the keys, or keep them.
**What they are:** the engine deals each option a letter (`GameOption.key`, no two alike on a screen); five views draw
it as a `<kbd>` (`HudView`, `BufferView`, `RecapView`, `RebootView`, `HelpView`), which the stylesheet's
`(pointer: coarse)` block hides on a touch screen; `InputRouter` and `SceneView`'s slider listen for keys; about ten
test files pin the letters.
**Skipped on the one profile, so guarding nothing:** 16 `test.skip(hasTouch, …)` tests in `web/e2e/` (`focus` 6,
`buildings` 2, `a11y`, `help`, `items`, `map`, `ritual`, `survival`, `title`, `world` 1 each) — keys, Tab and Enter;
they go with the keys, or are covered another way. One of them, `focus.spec.ts`'s Enter round trip, also asserts the dock
unfolded (`more` hidden), which is false since the wide layout went.

### HK-026 — every browser spec plants its own save
**Found:** 2026-09-28, the design check of `e2e/tower.spec.ts` (U02 fixes, step 0b). `e2e/support/harness.ts` now
owns the save slot and `plant()`, and `tower.spec.ts` uses them. The 18 other specs keep their own copy of the slot
key, and most keep a `plant()` helper (a11y, announce, buildings, fold, focus, help, items, map, playthrough,
resilience, richness, ritual, scene, survival, world; some with `path`/`states` variants). **Fix:** each imports
`plant` and builds its save with `saveText`; one commit, the specs green before and after.

### HK-027 — a door's brief asks for its state by display name
**Found:** 2026-09-28, the design check of U02's door keys. `Door.brief()` (`web/src/engine/model/Door.ts`) leaves the
state out when it equals `'Stable'`, the name shown to the player, while every other rule about a door's state now
goes by the list's key column. Stable's key is `plain`, like eight other states, so no key tells it apart. **Fix:** a
key that says the state is worth naming (a fourth column, or Stable's own look key), and `brief()` asks the look.
**Extended** 2026-09-30 (U05): the comparison moved into `Door.stable()`, which `brief()` and the pole's door tag
(`Apartment.poleSigns()`) both ask — one place to fix.

### HK-028 — `Shell` builds its `InputRouter`, and `InputRouter` its `SceneEvents`
**Found:** 2026-09-28, the plan for U02's `built-collaborators` (`tasks/ui/U02-fixes.md`). Both build a collaborator
instead of taking it (OO 4). **Fix:** `main.ts` builds both and hands them in; `Shell` takes the router, the router
takes `SceneEvents`.

### HK-029 — a lit door's name runs into the next door's number
**Found:** 2026-09-29, the live check of build `a2e1ad0` (U02, the corridor, phone at 360 × 640). A lit door's full
name is written beside its number (`5 · Industrial Barrier`) and runs into the next door's number (`6`), which cuts it
off. The corridor's drawing did not change in that build, so it likely dates from the corridor itself. **Fix:** the
name keeps clear of the doors' numbers (shortened, moved, or drawn over them), and the user judges it on the phone.

### HK-030 — a door with no word written on it carries an empty string
**Found:** 2026-09-29, the design check of `276d2fb` (U02, `kinds-not-optionals`). `DoorFigure.words` and the
corridor view model's `door.words` are `''` when nothing is written, and `PlacedDoor` asks `word() !== ''` (OO 6;
TS: a union of valid shapes). **Fix:** a value that is a written word or none and answers whether it shows and what it
says, like `ChildMark`; built where the engine reads the door's inscription.

### HK-031 — horizontal or vertical is branched on in three places
**Found:** 2026-09-29, the design check of `d3f3f2c` (U02, `kinds-not-optionals`). `SliderTrack.along`,
`SceneSlider.placeAt` (the `aria-orientation`) and `TravelCamera.along` each compare an axis to `'x'`/`'y'` (OO 3).
**Fix:** an axis value object with two members that reads a point along itself and names its orientation; the three
ask it.

### HK-032 — a kind picks how it counts its places by the shape of its facts
**Found:** 2026-09-29, the design check of `afa2afc` (U02, `kinds-not-optionals`, step 5, which chose a union of
facts so only the floor's kind changed). `LocationKind`'s constructor builds `Indexed` or `Unindexed` by testing
`'indexLabel' in facts` (OO 3, 4, 5). **Fix:** the facts carry the counter (`count: new Indexed('ORBIT')` or
`new Unindexed()`), passed by each of the about 20 kinds; the constructor stores it.

### HK-033 — the room's picture repeats the scene's height floor and ceiling
**Found:** 2026-09-29, the design check of `b2db464` (U03a). `app.css`'s `.world[data-drawn]:has(.objects) > .scene`
repeats the drawn scene's `clamp(…)` height rule with its own floor, reserve and ceiling (since U03c: 180 px, 400 px,
38 %; the drawn scene's 200 px, 363 px, 44 %).
**Fix:** one `height` rule reading custom properties for the three; the room's rule sets only its own values.
### HK-034 — the U03b design check's logged findings (tidying, one line each)
**Found:** 2026-09-29, the one design check of U03b (`2f96607..5c736c0`); none is a bug or a fact in two places.
- `DrawnInside.ts` furniture and snow cast their hash fractions to tuples (`as [number, …]`): ask one fraction per part.
- An empty string stands for "none" in a room's `status()`, the Degraded fact's value and the door appearance's label:
  a fact with no label or no value as its own union member when `Fact` is next touched.
- `PlanScene.#go` reads "no stop" as "a relic, so it flies": let the picture say which ids fly.
- `HelpPresenter.ts:59` quotes the leave button's words, which `Apartment.wayOut()` owns.
- `e2e/plan.spec.ts` sees the flight mark within its 650 ms in real time: pause the page's animations first.
- `HudPresenter.test.ts` (:89, :215) still feeds the old `RESONANCE [STABLE]` fact the engine no longer makes.
- `Door.description()` now only returns `brief()`: `Apartment.name()` can ask `brief()` and `description()` go.
- `PixelCanvas.onPage` and `SceneCanvas.onPage` spell out the point type instead of `Point`.
### HK-035 — the U03c design check's logged findings (tidying, one line each)
**Found:** 2026-09-30, the one design check of U03c (`master..382e9a6`); its two fixes are in, none of these is a bug
or a fact in two places.
- `LetGo` hands the gestures the concrete `PlanCamera`: a small interface the gestures own (`settle`, `pace`, `landing`).
- The dock's way out is marked by position (`fold.out ≤ fold.after ≤ dock.length`, unchecked): a row of `{ option, role }`.
- `Pinch.test.ts` repeats `PlanCamera.test.ts`'s two settle cases: keep one showing `release` ends where `settle` says.
- `HudPresenter.test.ts` and `SceneDrawing.test.ts` build a `PlanPortrait` and `RoomLook` inline: one builder in
  `tests/support`.

### HK-036 — the U03d design check's logged findings (tidying, one line each)
**Found:** 2026-09-30, the one design check of U03d (`357969b..08e9c94`); its two fixes are in (one stop rule for both
views, fingers wait for a flip's glide), with the resize refit it pointed at; none of these is a bug or a fact in two
places.
- `PlanScene.#down` asks `mode.moves()`: the mode could answer the gesture a finger starts (none standing in a room).
- The starting mode is written twice (`#mode`'s `new InRoom()` and `render`'s reset): one place says it.
- ✓ `PlanScene` builds the MAP key's button with `createElement`, beside an injected canvas: mounted through the
  parts since U03e (`KeySlot`).
- `ViewMode` takes the concrete `PlanCamera`: extends HK-035's first line (a small interface the users own).
- `InRoom.stop` returns nothing for a relic, which `#go` reads as "it flies": extends HK-034's line on `#go`.
- `GameEngine.test.ts` ("past the old sixteen") and `items.spec.ts` repeat `Buffer.test.ts`'s check that a take lands
  past sixteen: the engine test keeps "takes open" on a planted buffer, the browser test only the long buffer on a phone.
- `HudPresenter.test.ts` pins the peek's exact words inside a whole-object `toEqual`: assert it carries the count.

### HK-037 — the U04 design check's logged findings (tidying, one line each)
**Found:** 2026-09-30, the one design check of U04 (`527ee99..b7a52de`); its three fixes are in (the floor owns its
walked corridor, the engine owns TRACE's id, one `#tags` for the chips) and the unused `TraceBands.resized` went; none
of these is a bug or a fact in two places.
- `HudView` also owns the column (open state, open bands, the dive, the rail's finger, the swipe): a `TraceColumnView`.
- `HudView` takes the concrete `TraceBands` and `Dive`: small interfaces the view owns.
- "Went down into nothing" is `into: ''`, written by the presenter and read by `BandStage`; `railTrace` is `… | null`:
  a union of the two shapes each.
- `CorridorPicture` branches on `vm.abyssal` and reassigns its palette: a look entry, as the plan's abyssal wall.
- A null reach's signal is a bare 0–100 number, clamped again in `ReachScene`: a value type.
- `ScenePictures`: `plan()`'s doc comment sits above `area()`.
- `HudView` writes the ` · ` before `hereText`: the presenter's words.
- No test below the browser for `SceneDrawing.band`, `BandStage`'s view at `into` and its spot, or the dive's landing;
  the tower test ties `breached` to having Layers, so the bedrock line's new condition is not told from the old one.
- `trace.spec.ts` finds `.rail .crumb` and `.col-head` by class: by role or a stable id.
- `Void.test.ts` and `Descent.test.ts` both pin the signal chip's values: one layer.

### HK-038 — the U05 design check's logged findings (tidying, one line each)
**Found:** 2026-09-30, the one design check of U05 (`0e5ef9b..a192c11`); its three fixes are in (a door's state word
from `Door.stateWord()`, one `DepthNumber` for the column and the pole, every Era and Culture chip from `Era.fact()` /
`Culture.fact()`) and two test lines that caught nothing went; none of these is a bug or a fact in two places.
- `TracePole` takes the concrete `PolePicture`, `HudView` the concrete `TracePole`: small interfaces (with HK-037's).
- `HudView` branches on its view (`#view === 'pole'`) in its logic and its template: one object a view (with
  HK-037's `TraceColumnView`).
- `PolePresenter`'s `BERTHS` is a table keyed by glyph: the kind could own whether it has a berth, as it owns its glyph.
- `PolePresenter` asks `figure.held === 'country'` three times: the figure's member could answer its own values.
- `PoleMarks` compares display words for where a value is written and the current's start, `''` meaning none: stable
  keys and a union (with HK-030, HK-034).
- `PolePicture` holds geometry (the berth's 22 × 14, the words' and tags' offsets): the layout's to answer.
- `VibeFigure.stability` has no reader but its tests: shown on the pole, or dropped.
- `Lattice.test.ts` lists every kind's glyph: a step carries its kind's glyph, the twins below the bedrock by name.
- `trace.spec.ts` finds `.seg`, `.pole-level` by class; reduced motion's pole is not tested as still.

### HK-039 — the pole rework's design check: logged findings (tidying, one line each)
**Found:** 2026-09-30, the one design check of the pole rework (`ui/u05-pole-centred`); its four fixes are in (the
font's floor asked of `PictureFont.atLeast`, one `POLE_LANES`, a rebel's ink from `TAG_INKS`, one `poleLevel` test
builder); none of these is a bug or a fact in two places.
- `PolePicture` branches on `mark.look` eight times: one `Record<MarkLook, …>` row a look (ink, dash, motion, faintness).
- `TracePole`'s `moment` closure both moves the focus and answers the moment: the focus slide as its own small class.
- `PoleLayout.inForce` passes its marks' answer through: hand `PolePicture` the marks, or their answer.
- The backdrop row's shape is written inline in `PoleLayout.backdrop` and again in `PolePicture.#ghost`: one interface.
- `PolePicture` compares two marks field by field: a `sameMark` beside `PoleMark`.
- `PoleLayout.test.ts` checks again which level writes which word and the current's words: keep only the geometry.
- `PolePicture.test.ts` expects upper case and `—`; `PoleMarks.test.ts` reads `inForce` by key order: read by lane.
- No test covers `TracePole`'s focus slide or its repaint on scroll under reduced motion.

## 🟢 CLOSED

### HK-040 — the U03e design check's logged findings (tidying, one line each)
**Found:** 2026-10-01, the one design check of U03e (`e328482..ui/u03e-room-card`); its five fixes are in; none of these
is a bug the player meets today or a fact in two places.
- `RoomCardView.#turn` has no `try/finally` round the turn: one that rejected would leave the card busy and the turn's
  inline styles behind. No turn rejects today.
- The MAP key tapped while a turn plays flips the plan, but its turn to the front is dropped: remember the face asked.
- `RoomCardView.#swiped` reads the MAP key's `aria-pressed` out of the page to know the plan shows, and climbs to
  `.world`: the stage could answer it through `CardParts`.
- `RoomCardView` takes the concrete `CardTurns`: a two-method interface the view owns.
- `RoomCardView.#swiped` clears `#down` and answers: clear it in the handler.
- `SIGHT_LOOKS` builds the doorway looks inside a module constant, and `LitDoorway` is built at a second site
  (`ScenePictures`): they hold no state.
- `MovesLayout.ways.moves` is filled and read by nobody: the presenter reads only `shown`.
- `HudPresenter` computes the buffer's count string twice in `toViewModel`.
- `FlipTurn.ts`'s comment says every turn lasts `TURN`; `TornTurn` runs a tenth longer, and the constant sits in a
  sibling's file.
- `e2e/support/harness.ts` works out a hidden button's name by cloning it, with an inline cast.
- `e2e/card.spec.ts` waits a fixed 900 ms to show a swipe did not turn, waits out the 5 s fade, and finds elements by
  class (`.card`, `.desc`, `.keys .badge`, `.card .line`) where the regions' names would do.
- `CardTurns.test.ts`'s "the still turn is its own" only reads back what the test handed in: delete.
- Not done from the plan: a browser test that a step landing during a turn keeps its own face (the fix is in, unpinned),
  and `GrainTile` — the static turn is drawn by the stylesheet, the torn bands are a fixed pattern.

### HK-022 — `NameGenerator` was eleven static generators
**CLOSED 2026-09-20** — merge `9549527`, chronicle `0x9549527`, plan + record `tasks/completed/HK_022_PLAN.md`. One `NameGenerator` per `ProceduralFactory` (`nameGenerator`, final); the eleven factories ask `registry.nameGenerator`; no static methods; off the `NoNewStaticLogic` allow-list (16 → 15). No name moved. `NameGeneratorContractTest` 7 pins + wiring pin C3.
**Found:** 2026-09-20, WF-009 allow-list review — the one entry on `NoNewStaticLogic`'s list that is a real smell, not tooling or formatting.

### HK-020 — Global command aliases live in two places
**CLOSED 2026-09-20** — branch `housekeeping/hk-020-global-commands`, commits `46fee07` (plan), `216545c` (step-0 pins), `3119693` (the change).
Plan + record: `tasks/completed/HK_020_PLAN.md`. `GlobalCommands` (keys + aliases + per-key case rule) built by `TurnProcessor`, asked by `dispatch`;
`normalize` keeps only EOF/empty. No player-visible change; `Game.processInput` now honours aliases (pin RED first). `GlobalCommandsContractTest` 10 pins.
**Left open (declared):** `RenderingCoordinator.helpMenu:40` still spells the aliases by hand — display text, not a resolver; a generated help line is the natural next step.
**Found:** 2026-09-17, user OO review of HK-015. `InputHandler.normalize:57-60` holds a hardcoded list of global words and two aliases
(`m` → `map`, `q` → `quit`, the second added by HK-015); `TurnProcessor.initializeGlobalCommands` holds the command table and a third alias
(`ll` → `lattice`). Two owners for one fact: a new global command must be added in both or it is case-sensitive by accident.
**Fix design (needs its own plan + grill — small ownership move):** the command table owns keys *and* aliases (a `GlobalCommands` object built by
`TurnProcessor`), and `normalize` asks it instead of carrying a list. Pin first: which keys are deliberately case-sensitive today
(`s`, `ll`, `p`/`P`, `quitnow` — guide `:102-103`), `InputHandlerNormalizeTest` for the rest. No player-visible change intended.


### HK-024 — Undecided: should the debug glitch `KEYSTONE` also prime the building?
**CLOSED 2026-09-24** — decided by the web game: `prime` and `spawn keystone` are two separate debug buttons under `?debug` (`tasks/port/I07.md`); the Groovy question is moot, Groovy is frozen.
**Found:** 2026-09-16 in the HK-019 session (diagnosed, nothing changed); logged 2026-09-21 — until then it lived only in the recovery prompt. Today the glitch gives a correctly bound Keystone but no `j`, because `Building.isPrimed` needs every floor sampled + 7 infusions. **A user decision, not a bug:** prime the building too (the glitch becomes a full shortcut to the descent), or leave it (the glitch tests binding only) and say so in the debug help.

### HK-021 — Residue of HK-015: five low-value player-facing oddities
**CLOSED 2026-09-24** — fixed in the web game, never in Groovy (frozen): `Door.visited` set, no second corridor screen, a dropped relic keeps its frequency; proof table with assertion lines `tasks/port/I09.md`. The dead-code bullets are moot.
**Found:** 2026-09-16 with HK-015 (its "also noted" list); split off 2026-09-17 when HK-015's five numbered items closed. None has a plan.
`Door.visited` is never set (`Door.groovy:57` prefix is dead); `CaptureCommand.groovy:32` says `/screenshots/`
(real dir is relative); a Keystone dropped in a room is stored as its name only and comes back as a plain item (`Room.groovy:168`, `InventoryItem` rebuilt without `isKeystone`/`boundLip`), so the guide's "You can stash a Keystone in a room" is false (HK-018, E5);
after leaving an apartment the player stands on the Corridor *location* (menu without `b`), and `l` leads to the Floor's corridor-mode screen (same doors, with `b`) — two near-identical screens, `l` twice to reach the building (HK-019, D2);
`Door.groovy:23-26` rolls its own inscription with the same seed `CorridorFactory:51` rolls, so the constructor's pool is dead code (HK-016 step 3, F1).
**Extended 2026-09-20 (GitHub Pages audit):** the drop bug is not Keystone-only — `Room.groovy:208` stores the bare name and `:222-223` recomputes the frequency by Gematria on re-capture,
so a dropped Hybrid or "Hidden Frequency" also comes back at its name-derived Hz. The guide, the manual and the codex now *warn* about this instead of recommending the stash (`tasks/completed/GH_PAGES_AUDIT_PLAN.md`); a fix here must turn those warnings back.

### HK-023 — Game-side oddities found by the GitHub Pages audit
**CLOSED 2026-09-24** — fixed in the web game, never in Groovy (frozen): breach flag saved, resonant count saved, one walker, 0 Hz not resonant, `[TEMPORAL_MARKER]` shown, tally counts once, "resonant" label, map legend drawn; proof table `tasks/port/I09.md`.
**Found:** 2026-09-20, fact-check of the published player pages against the source (session scope was the pages only; nothing here was fixed then). Slice 1 — the restore bullet — is done; no other bullet has a plan.
- ~~A save made below the Bedrock does not restore~~ — **FIXED 2026-09-20** (slice 1), merge `55f9460`, chronicle `0x55f9460`, record `tasks/completed/HK_023_RESTORE_PLAN.md`: a breached building regrows its Layers when a LIP asks (`Building.childAt`), Layers are created in order, an unresolvable save is refused whole. `AbyssalRestoreContractTest`, 6 pins.
- **Two LIP walkers** (found by slice 1): `Universe.resolveLIP` and the static `WorldGenesis.resolveLIP` walk the same tree with different leniency (null / empty / `"Universe"` / no leading `0`). The bounds rule now has one owner (`Container.childAt`); the walk still has two. The static one serves only the memento path (`PersistenceService.restore`).
- **A memento carries no mutations** (found by slice 1): `Game.restore(memento)` regrows the world and walks the LIP, but `GameMemento` holds no breach flag, so a memento taken on a Layer lands at the start locus, silently (`PersistenceService.groovy:47-50`). Test-only callers today.
- `run.sh:118` (`--test`) runs `src/test/groovy/com/endlesstransit/AllTests.groovy`, which does not exist (the runner is `TestRunner.groovy`, via `vinc.sh`); `run.sh --help` advertises `--headless`, which no code reads. One document still sends the reader to the dead command: `tasks/backlog/AI_STRATEGY_IMPLEMENTATION_PLAN.md:24` — fix it with the script. (The second, the Gemini `tasks/skills/skill-chronicle/` package, was deleted after the context diet `0xb629529`.)
- Root `README.md:26` says "Groovy 4.x+"; `build.gradle:13` pins `groovy-all:5.0.0`.
- The map legend (`TelemetryComponent.groovy:82`) shows `■` and `░`, but nodes are plotted with each child's own `getMapSymbol()` (`:74-78`) and empty cells are blank — the legend describes glyphs never drawn.
- `LatticeMapComponent.groovy:47` calls `glitchText("X", 1.0, r)`; probability 1.0 always replaces the `X` (`Terminal.groovy:175-179`), so the marker never appears as `X`.
- `resonantTracesCount` is absent from the `SyncManager.sync` snapshot (`:21-41`): the RESONANT_TRACES tally resets on restore.
- A Keystone's 0 Hz satisfies `% 11 == 0` (`Player.groovy:106`): forging one prints RESONANCE DETECTED and adds 1 to the tally.
- `[TEMPORAL_MARKER]` exists only in `Apartment.getDescription` (`Apartment.groovy:44`); apartments auto-enter room 1 (`NavigationOrchestrator.groovy:32-42`), so that screen is never rendered.
- Map colours print as words: `Container.groovy:43` and `Room.groovy:150` return the literal strings `"RED"` / `"WHITE"`, and `MapBuffer.render` (`Terminal.groovy:462-476`) appends the colour string raw — the probe saw `RED☠` on the map, uncoloured. Every other path passes an ANSI constant.
- **The model calls the UI:** `Building.groovy:49, 51, 150` call `com.endlesstransit.ui.Terminal.clock.sleep(1000)` by fully qualified name (in `breach()` and `enter()`). The model invariant ("MUST NOT import from `com.endlesstransit.ui`") is broken in spirit, and the lint rule `ModelNeverImportsUi` (`vinc-ruleset.groovy:52`) does not see it — no import line. Found by the GitHub Pages verification pass.
- Re-capturing a dropped relic bumps `resonantTracesCount` again (`Room.groovy:227`) — drop and re-take in a matching cell farms the tally.
- `SessionRecap.groovy:46` labels the tally "stabilized", but it also counts every capture in a cell of the local primary Culture (`Room.groovy:173, 227`) — the label and the rule disagree.
- The guide's `NameGenerator.groovy` line citations have drifted (found by HK-022, which moved no line): `players_guide.md:220` cites `:104-114` for the trait → room-type table (now `:131-138`); `:302` cites `:82-98, 126-137` for the landmark list and odds (now `:84-100`, `:150-162`). HTML comments, invisible to the player.
- `GlobalCommandsContractTest.groovy:9` cites `players_guide.md:102-103` by line number. The GitHub Pages wave kept lines 1–103 of the guide stable on purpose, so the pointer still holds — but any edit above it breaks it silently; cite the heading ("Case matters…") instead.

### HK-013 — Nine production methods exceed 50 lines (held in the lint baseline) — **8 remain**
**CLOSED 2026-09-24 as moot** — Groovy is frozen (study §2.4); the eight entries stay in `terminal/config/lint/baseline.xml`, which only `terminal/vinc.sh --lint --baseline` writes.
**Slice 1 done (2026-09-16, branch `housekeeping/hk-013-restore`, plan `tasks/completed/HK_013_RESTORE_PLAN.md`):** `SyncManager.restore` split into `restorePlayer` / `applyMutations` / `remarkFootprints`
(by script, zero drift; `RestoreContractTest` 5 pins first — counters, footprint sets, merge count and both failure paths had no assertion). Baseline 9 → 8, removal only.
Rule for the rest: when the ratchet fires, extract or re-baseline with a stated reason — never reformat to the recorded length (lesson in `infrastructure.md`).
**Found:** O2 (`./vinc.sh --lint`), 2026-09-16. `MethodSize` (max 50) flags: `ScanCommand.renderCorridorScan` (75) /
`renderApartmentScan` (52), `SyncManager.restore` (64), `Room.getOptions` (103), `Building.getExtraContent` (84),
`SessionRecap.show` (56), `LatticeMapComponent.render` (52), `LatticeTraceComponent.renderTrace` (63), `HUDHeaderComponent.render` (90).
They are the only entries in `config/lint/baseline.xml`; each entry carries the method's current length, so the first edit to any
of them resurfaces the violation — pay it down then, or in a bounded housekeeping commit (extract by script, reverse-substitution
check, goldens as the gate for the four `ui` methods). Regenerate the baseline with `./vinc.sh --lint --baseline` and commit the
shrunken file with the change.

### HK-015 — Five player-facing bugs surfaced by the Player's Guide
**CLOSED 2026-09-17** — branch `housekeeping/hk-015-player-bugs`, merge `a47cdb6`. Record: chronicle `0xa47cdb6`; plan `tasks/completed/HK_015_PLAN.md`.
Passive room roll once per step and saved; `m 1 1` pays nothing; `--seed <n>` works (`LaunchArgs` value object); `q` = `quit`; echo scan is `e` and seeded; lint `NoUnseededRandomInWorld`. Residue → **HK-021**; alias ownership → **HK-020**.

### HK-019 — Corridor mode was sticky: a floor left with `l` from the corridor never showed `u`/`d` again until `b`
**CLOSED 2026-09-16** — branch `housekeeping/hk-019-corridor-reset`, commits `25fbd6c` (plan), `75567f2` (step-0 pins), `3d99343` (the change).
Plan + record: `tasks/completed/HK_019_PLAN.md`.
**Found:** the "Left open" line of HK-018. A floor remembered corridor mode across re-entry and the corridor's `l` exits to the building without
passing the elevator, so the next visit opened on the corridor menu (probe, seed 12345).
**Fix (behavior change, user decisions D1a/D2/D3):** corridor mode means "standing in the corridor" — `Floor.leave(game)` returns the floor to the
elevator and exits; `CorridorState` re-routes the Corridor's own leave key to it (`Container.leaveLabel()`, same key, same slot). Coming back from an
apartment and saving inside the corridor both keep corridor mode. `CorridorLeaveContractTest` 6 pins (3 green on master first; 3 shown RED on an
assertion before the change). 36 goldens unchanged. Grill AMEND → CLEARED.
**Left open (declared):** the debug `BREACH` teleport still leaves a corridor-mode floor behind (E2); old saves heal on the first `l` (E3);
the double `l` after an apartment → HK-015.

### HK-018 — A Keystone was bound to its building by *name*, and `j` was hidden in corridor mode
**CLOSED 2026-09-16** — branch `housekeeping/hk-018-breach-rule`, commits `8b1d492` (plan), `d02416d` (step-0 pins), `935a9e1` (visibility), `28dc724` (binding).
Plan + record: `tasks/completed/HK_018_PLAN.md`.
**Corrected diagnosis:** two independent traps. (1) The name trap as logged below. (2) **The corridor trap:** `j` lived only in `ElevatorState`;
a floor stays in corridor mode across re-entry and restore (Phase 1a), and `l` in the corridor leaves to the building, so a player who never
presses `b` never sees the elevator again. The 21:58 rename workaround *had* worked — a probe restoring copies of both saves showed `j` after
`returnToElevator()` with the renamed Keystone and not with the original. The reported "floor count mismatch" was a different, new game (22:02, no restore).
**Fix (behavior change, user decisions 1a/2a, no backward compatibility):** the rule lives on the model — `Building.keystoneIn` (`isKeystone && boundLip == getLIP()`)
and `Floor.addBreachOption`, asked by both floor states; `InventoryItem.boundLip` set at forging, saved/restored. A Keystone forged before the fix opens nothing and
does not block forging. `BreachOptionContractTest` 9 pins (5 green on master first; 1 + 3 shown RED on an assertion before their change). 36 goldens unchanged.
**Left open (noted, not fixed):** corridor mode is still sticky and `l` still skips the elevator — it no longer hides anything ritual-critical, but `u`/`d` remain elevator-only. → **fixed by HK-019.**
<details><summary>Original entry</summary>

### HK-018 — A Keystone is bound to its building by *name*, so a content update strands it
**Found:** 2026-09-16, user report while playing after the HK-016 step-3 merge: "my current game has a keystone but I cannot see the option to
breach the floor when I am on the peak floor". Diagnosed from the player's own save (read-only): seed `1789169224071`, position
`0.2.0.0.1.0.0.1.1`, building primed (5/5 floors sampled, 40 infusions), top floor, inventory holds `PodReach Keystone` (forged 20:54).
Resolving that LIP with the pre-step-3 resources names the building **PodReach**; with today's lists it is **HollowReach** (the organic
noun lexicon grew 8 → 12 in `a19dd62`, re-indexing the compound-name pick). `ElevatorState.groovy:31` finds the keystone with
`it.isKeystone && it.name.contains(bldg.name)`, and `SynthesisService.groovy:16-21` names it `"${bldg.name} Keystone"` — the building's
name is the only link, and a name is a generated string, not an identity. The guide (`players_guide.md:272-274`) promised the name would
always match because the world is rebuilt from the same seed; that was true until content could change between sessions.
**Fix design:** bind the keystone to the building's **LIP** — `InventoryItem` gains an optional `boundLip` (set by `SynthesisService` from
`bldg.getLIP()`, saved/restored by `SyncManager`, defaulting to null for old saves); `ElevatorState` matches `boundLip == bldg.getLIP()`
**or**, when `boundLip` is null (a keystone from before the fix), the old name check. Keep the display name as it is. Pins: a keystone
forged in a building still breaches it after the building is renamed (rename via a lexicon overlay or by setting `bldg.name`); an old-style
keystone with no LIP still breaches by name. Guide `:272-274` rewritten in the same commit. Also consider (separate item): `SpawnKeystoneCommand`
(debug) and `RitualTracker`/`Building.notifySampled` already key on the building object, not its name — only the breach check and the
keystone's own name are name-bound.
**Workaround for the reported game (the player's file, never edited by a tool or test):** in `session.trace` change the item name
`PodReach Keystone` to `HollowReach Keystone` and restore; `j` appears on floor 4. Or forge a new keystone: the building is still primed, so
the next merge inside it yields `HollowReach Keystone`.
**Attempt (2026-09-16 21:58, did not work — the name is not the whole story):** with the player's consent the save was backed up
(`session.trace.bak-hk018`, untracked) and the one string renamed to `HollowReach Keystone`; the file parsed and the game restored it
(`transit.log`: RESTORE_INITIATED 21:58:37, then `Entering Floor 4` ×3). Still no `j`, and the player reports **the number of floors now
mismatches** in that building. Facts at that moment: save holds `currentLIP 0.2.0.0.1.0.0.1.1`, building mutation `infusionCount 40,
sampledFloors [1,2,3,4,0], isBreached false`, floor-4 mutation `state: CORRIDOR`; a scanner-built world for the seed resolves that LIP to
`HollowReach`, `maxFloors 5`, organic, not a landmark — with today's lists *and* with the pre-step-3 lists (`git archive 3a1f95c`). So either
the game's restored building differs from the scanner's (floor count, name, or the mutation not applied — check `SyncManager.restore:91-97`
and `Building.applyMutationState`, and print `bldg.name`, `bldg.maxFloors`, `bldg.sampledFloors`, `bldg.isPrimed()` from a restore of this
exact file), or the floor the player stands on is not `maxFloors - 1` as the game now counts it (`ElevatorState.groovy:28-30` offers `j` only on
the top floor). **Next session, step 0:** reproduce with a test that restores a copy of this save into a headless game and asserts the
top-floor options — before touching the design fix. The player's original save is the `.bak-hk018` file; the edited one is in place.

</details>

### HK-016 — Procedural variety: objects, furniture and atmosphere repeat; three room lines collapse to one string
**Found:** 2026-09-16, user report while playing ("lack of variation in the objects on the rooms"), confirmed and widened by
`docs/analysis/VARIETY_AUDIT.md` (six seeds, 1,354 rooms; 200-seed distribution probe). **Content phase, not a refactor** — every
step changes generated worlds (procgen snapshots + goldens move), so it runs on its own branch with its own pins; user decision on
scope before starting.
- **Objects/furniture** (`ThemeService.generateHybridObject`, `ApartmentFactory.groovy:44,55`, `RoomFactory.groovy:57-60`): one
  generator for both, 8 × 8 items × 2 phrasings, timeline fixed per planet and two cultures per planet → ≤ 256 strings per planet;
  measured 143–198 distinct of 283–719 in six floors, 25–40 % of apartments repeat an object, some rooms list one twice.
- **Atmosphere** (`ThemeService.groovy:85-93`, silent fallback): no structures file for Industrial/Commercial → `a spatial cell` in
  every room of ⅓ of countries (1,105/1,354 sampled); no lighting for digital/future/atomic/entropic → `a dim, flickering glow`
  on 52 % of planets; no walls for gilded/rust/shogun/void/zenith → monolith walls.
- **Room names** (`NameGenerator.groovy:100-120`): lexicon for 6 of 10 cultures (shogun/gilded/zenith get monolith names); 64 real
  names per culture, uniqueness comes from the hex serial and does not count. **Doors**: 56 briefs, 2–3 identical per corridor.
  Corridor/floor/apartment/building descriptions are single templates.
- **Plan (audit §4), in this order:** (1) fill the missing resource files + log when a fallback fires; (2) shuffled-deck dealing,
  furniture ≠ objects, timeline drift like culture drift, more phrasings, category-based room names, description variants;
  (3) grow lists (8 → ~16 items, 5 → ~10 atmosphere, lexicons ~12×12, doors ~12/12). Step-0 pins listed in the audit.
  Gates: `DeterministicUniverseTest`, `--scan` seed 0 → 9, reviewed golden/snapshot regeneration, guide/manual edited in the same commit.
- **Step 1 CLOSED (2026-09-16, branch `content/hk-016-step1`, `a467a5e`…`4464ddf`, plan `tasks/completed/HK_016_STEP1_PLAN.md`):** 4 lighting, 3 structures
  (incl. the glitch key `Singularity`), 5 walls, 4 lexicons (8+8) filled; `names/buildings/index.txt` enumerates the lexicon (the list was
  hard-coded); `[THEME_WARN]` on any fallback; glitch key `"Abyssal"` → `"abyssal"` (it matched no file — 1 glitched room in 80 said
  `a spatial cell` regardless); `ThemeResourceCoverageTest` (RED on the old tree). Probe: lighting/structure fallbacks 0 on all six seeds;
  walls distinct 12/17/19/13/18/11 (was 10/17/10/11/14/11), structure distinct 8/13/12/9/14/8 (was 6/9/1/1/1/1). One literal + goldens 16/30
  moved, as planned. Found and fixed first: **HK-017** (pane wrap width). **Steps 2 and 3 OPEN.**
- **Step 2 CLOSED (2026-09-16, branch `content/hk-016-step2`, `3357030`…`be5afbb`, plan `tasks/completed/HK_016_STEP2_PLAN.md`):** objects dealt from a
  shuffled deck of four two-word forms + singles (272 per culture/era pair) — no repeat inside an apartment on any of six seeds (was 25–40 % of
  apartments); furniture is `<condition> <culture item>` from `themes/conditions.txt`, disjoint from objects; a second era per planet picked per
  apartment with the culture's stability roll (25/168 on the sample), swapped in rebel districts with the cultures; cells named
  `<culture adjective> <category>` with adjectives dealt per apartment, hex gone; corridor and floor sentences from `themes/descriptions/*.txt`.
  `ProcgenVarietyContractTest` (7 pins, each shown red against the previous commit). Probe: objects distinct 143–198 → 203–369 per seed; the
  per-planet ceiling moved from 256 to ≈ 1,100 (4 decks × 272) — the primary pair's single deck of 272 still caps a 700-object sample, which is
  exactly what **step 3 (grow lists) is for**. 12 goldens moved across the branch, every diff simulated before regeneration.
- **Step 3 CLOSED (2026-09-16, branch `content/hk-016-step3`, `fcdca97`…`26cc658`, plan `tasks/completed/HK_016_STEP3_PLAN.md`) — HK-016 CLOSED:**
  every list grown (relics 16 per culture/era, atmosphere 10 per file, conditions 16, lexicons 12+12, doors 12/12/12); doors' lists and narratives
  moved to `themes/doors/*.txt` (zero-diff refactor, then growth); a condition never doubles a relic's first word; size pins per family in
  `ThemeResourceCoverageTest`. Probe: objects distinct 143–198 → 261–545 per seed, furniture 138–192 → 177–285, door briefs 106 → 160 of 252,
  every culture shows 11–12 of its 12 adjectives, 0 repeats per apartment. 18 commits, each re-pinned from a run with a script that refuses any
  literal drift outside the commit's family; the chain stopped once (a second pin of the 0x1234 building name at `ProcgenDeepSnapshotTest:117`
  the map had missed) and resumed after the key was added.

### HK-017 — Narrative pane wrapped to 88 columns; the split box holds 86 (every pane-wide row ended in `...`)
**Found:** 2026-09-16, HK-016 step-1 plan grill (simulation of the new Industrial structure line wrapped the room sentence and the
first line ended `The walls are g...`). `FrameGeometry.LEFT_PANE_WIDTH` was `SPLIT_POINT - 2` (88) while `Terminal.splitBoxedLine`
keeps `splitPoint - 4` (86) on the left — measured: 86 fits, 87–88 truncated. Pre-existing on every frame: the dashed separator,
the two-column building/filament lists and the room's `RESONANCE: [STA...` were all laid out at 88 and cut.
**Resolution (`54f3f19`, branch `housekeeping/hk-017-pane-wrap`):** `LEFT_PANE_WIDTH = SPLIT_POINT - 4`; pin `FrameGeometryContractTest`
(pane-wide line survives the box; a wrap landing on the limit is never truncated; both red on the old constant); 12 goldens regenerated,
44 changed lines, every one the artifact disappearing. **Noted, not fixed:** `RIGHT_PANE_WIDTH` (38) is also one wider than the box keeps
(37) and `boxedLine`/`splitBoxedLine` truncate one column short of the physical capacity everywhere — the telemetry pane never wraps and
sizes at `width - 4`, so it is unreachable today; if a right-pane row ever reaches 38 columns, align `ansiSafeTruncate`'s inner widths
with the physical columns (left `splitPoint - 3`, right `width - splitPoint - 2`) rather than shrinking the pane again.

### HK-014 — Manual and codex stated numbers the code contradicts, and omitted half the world's catalogue
**Found:** 2026-09-16, chronicle `0x9c4e17d`. Ten claims in `docs/terminal/manual/` and `docs/terminal/codex/` disagreed with the source
(16-slot cap, +30% stabilized merge, 0.5x/2.0x era table, consonant values 10–50, item "shatter", ritual = 70% floors + 7 resonant
fragments, `target [ID]`, 5% per move below bedrock, "drains per step", `⬚` for sector). User review added the gaps: the codex named
6 of 10 cultures, 5 of 8 eras (two of them nonexistent), none of the 6 country traits, no `ATMOS_SHIFT`/`Sector Mutation`, and the
atlas invented floor zones.
**Resolution:** 11 pages corrected in the in-fiction voice, facts only: drain per pulse (1/2/4), +15 flat, ordinal Gematria with a
recomputed worked example (Rust Piston = 1512/1663 Hz, not stabilized), the real ritual recipe (every floor + 7 syntheses inside,
keystone on the 8th, 0 Hz, consumed by `j`), unbounded buffer with the two drop semantics, hybrid naming, Null Reach echo (capital `S`),
landmarks 1-in-25 / 1-in-12 with no special loot, endless layers with pressure saturating at −10. Atlas gains sections for the ten
cultures (six Great, four Minor with borrowed Monolith geometry), eight eras, six traits (with `ATMOS_SHIFT` = `Sector Mutation` =
trait), and the fifteen height-based floor zones. Codex gains four Minor Culture entries and a `[DIAGNOSTIC_READOUTS]` glossary;
map/waveform glossaries trimmed to the symbols that exist (`¤`, `[■]`, `-------`, `○`-as-visited removed). Guide gains an
`ATMOS_SHIFT` + floor-zone paragraph. Not touched: `installation_guide.md`, `system_initialization.md`, `system_specifications.md`,
`lip_addressing.md` (no contradictions found).
**Closed:** 2026-09-16 | docs only | link crawl green after Pages build

### HK-008 — `ProceduralFactory.instance` was a static singleton
**Found:** Phase 9 retro "Concerns", 2026-09-11 (OOA report §3.4 / §4 — singleton access noted in the original analysis).
Phase 9 did not touch injection; fourteen per-type factories now hang off `ProceduralFactory.groovy:21`
(`static ProceduralFactory instance = new ProceduralFactory()`), and `Game.groovy:33` injects `fmt` into the singleton
after construction. Tests cannot swap the factory without mutating static state.
**Resolution (three production commits, facade-first):** **c3** — `ProceduralFactory(OutputFormatter)` stamps itself on every container its delegators hand out (`Container.factory`); `Container.populateChildren()` and `Building` ask it; a hand-built container with no factory fails loud naming its class; 12 tests wire their hand-built objects as they already wire `fmt`. **c4** — `Game.factory` (final) is built with the game's `fmt` and injected into `NavigationOrchestrator` and `PersistenceService`; `WorldGenesis.createInitialWorld` and `SyncManager.restore` take it as a parameter. **c5** — the static is deleted, `fmt` is final, `SeedScanner` owns a factory with a real adapter (`LandmarkDiscoveryTest` no longer depends on test order). `FactoryWiringContractTest` (A: step-0 fmt identity, passes on `master`; B: factory identity + fail-loud; C: ownership, two games never share one). `GameState` and the 14 per-type factories untouched. Plan: `tasks/completed/HK_008_PLAN.md`.
**Closed:** 2026-09-16 | commits 2d6978e (plan), ad80a18 (pin), d3cd6f2 (c3), d3d7d66 (c4), 2d3cac3 (c5) | suite 213/213/0/0, 36 goldens unchanged, scan seed 0 → 9

### HK-012 — The test suite overwrote and deleted the player's save file
**Found:** 2026-09-16, from a user report ("restored my last session and got another world"). `transit.log` showed three
test-run sync/restore pairs at seeds 55555/77777 between the user's sessions. `TracePersistenceTest` (since `02b0748`, March 5)
and `CorridorPersistenceTest` (Phase 0.5a) wrote the real `session.trace`; `HeadlessRunner` (since `25ad897`, March 12) deleted
it before every headless run. Gitignored, so `git status` never showed it.
**Resolution:** `Game.saveFile` (default `SyncManager.SAVE_FILE`) is the one path for prompt, sync and restore; `SyncManager.restore`
and `PersistenceService.restoreSession` take it as a parameter. Both persistence tests round-trip through a temp file and assert the
real file's existence, size and mtime are unchanged; the runner points its game at a nonexistent temp path. Verified: the real save
was byte-for-byte and mtime-identical across a full suite run. Lesson in `tasks/lessons/infrastructure.md`. Plan: `tasks/completed/HK_012_PLAN.md`.
**Closed:** 2026-09-16 | commits a854684 (plan), dc1d0a3 (fix)

### HK-011 — `JournalManager` was all-static
**Found:** Phase 10 plan, 2026-09-16. Session state, file I/O, `getRecentEvents` (read by the HUD ticker) and `reset()` were static.
**Resolution (three commits):** **a** — `RenderContext.recentEvents` (defaulted fifth field); `HUDHeaderComponent` reads it, the
compositor supplies it (`HUDHeaderComponent.TICKER_DEPTH = 3`). **b** — `JournalManager` is an instance (`@CompileStatic`; `journalFile`/
`lastEntryFile` properties; instance `reset()` kept as the test mirror of `startSession`); `Game.journal` (final) attaches it before
`RitualTracker`, starts the session, hands it to `RenderingCoordinator` → `BridgeView(journal)`; `QuitCommand` saves through
`game.journal`; `BridgeView()` without a journal gets an inert one. No static journal call remains. **c** (visual, user decision) —
the ticker feed carries the location's *name* (`LOC: The Void-Watcher`); the journal file keeps the full path + vibe suffix;
goldens 13–18 regenerated (line 7 only). Declared: `.journal_session_tmp` stays one shared path. Plan + grill: `tasks/completed/HK_011_PLAN.md`.
**Closed:** 2026-09-16 | commits 84e5997 (plan), 5c0c0f2 (a), ea5cdcf (b), 90cbede (c)

### HK-009 — `populateApartment` was the last per-type populate delegator on the facade
**Found:** HK-005 close-out, 2026-09-16. Two tests called it directly (`ObjectDistributionTest:22`, `ProcgenVariabilityTest:29`).
**Resolution:** delegator deleted; both tests read `apt.rooms` and let `Container.populateChildren()` → `populate(Container)`
fill the apartment. **Finding (verified by script before the change):** the explicit call populated every apartment *twice* —
inside `ApartmentFactory.populate` the first lazy read of `a.rooms` fired a nested populate, so room counts were all even
(544 rooms across 50 apartments vs 272 lazy-only). Test-only; neither test asserted absolute counts. Variance assertions hold
on the single-population shape. `grep populateApartment src/` → 0. Plan + grill record: `tasks/completed/HK_009_PLAN.md`.
**Closed:** 2026-09-16 | commits 05ec641 (plan), 6a7c813

### HK-010 — Discovery journaling has been dead in production since 2026-03-05
**Found:** Phase 10 pre-plan read, 2026-09-16. `JournalManager.logDiscovery` lost its only caller in `7930dc3` when path
tracking moved into `Player.markFootprint`; `[DISCOVERY]`/`[LOC]` lines, `Network Expansion` and `LOC:` ticker lines had
no producer for six months. **User decision 2026-09-16: restore it** (behavior change, own branch).
**Resolution:** `Player.markFootprint` publishes `LocationDiscovered` once per path new to `visitedPaths` (macro only);
`JournalManager.attach` subscribes it to `logDiscovery`. Named `LocationDiscovered`, not `LocationEntered`: it fires once
per new path, and the ancestor loop discovers a City/Planet the player never entered. `DiscoveryEventContractTest` (4 pins,
RED on the old code). `HudFrameHarness` resets the journal *after* `new Game` (mirrors `startSession`); goldens 13–18
regenerated — first ticker line only. Declared: the 37-char ticker pane truncates every `LOC:` line to
`LOC: Universe > ... > [VOID] > Lam...` (March contract; a name-based ticker line is a separate HUD decision).
Plan + grill record: `tasks/completed/HK_010_PLAN.md`.
**Closed:** 2026-09-16 | commits 6590c97 (plan), 06ed2d4

### HK-005 — `Container.populateChildren()` overrides still named their `populateX` method
**Resolution:** `Container.populateChildren()` defaults to `ProceduralFactory.instance.populate(this)`; the 13 one-line
overrides and 12 `ProceduralFactory` imports are gone (`Building` keeps its import for `createFloor`/`countSubLocations`).
Three batches (5/5/4 model files), then the 12 orphaned facade delegators deleted (198 → 154 lines); `populateApartment`
retained for two test callers → HK-009. Declared edge: an unregistered `Container` subclass now fails loud on first lazy
access — pinned by `ProceduralFactoryRegistryTest.lazyAccess_unregisteredType_failsLoudOnFirstAccess`. 36 goldens unchanged;
scan seed 0 → 9 nodes. Plan + grill record: `tasks/completed/HK_005_006_PLAN.md`.
**Closed:** 2026-09-16 | commits 0332f9a, 9b5e7e3, 66a154f, 01d7f48

### HK-006 — Test hygiene in the procgen tree
**Resolution:** `ProcgenSnapshotTest` locals renamed for the level they hold (Planet → Country → City → Street) and the two
messages swapped; literals unchanged. `InitialScreenTest` unused import removed.
**Closed:** 2026-09-16 | commit 82c7253

### HK-007 — `populateFilament` rolled the NullSector chance once per filament, not per child
**Found:** Phase 9-0 capture, 2026-09-11 (seed 0x1234: 7/7 null). **History:** before the 2026-03-10 seed migration
(`e34acb4`) the loop advanced a stateful `Random` per iteration (`r.nextInt(10) < 3`); the migration replaced it with a
pure draw on the parent seed, silently making the roll per filament. A regression, not a design.
**Resolution:** `childLocus.branch("NULL_ROLL").checkProbability(0.3)`; `FilamentNullRollTest` guards the ~30 % rate and
within-filament mixing (0 of 283 mixed before, fails on the old code). Intentional world change: 14 goldens regenerated
and reviewed (seed 12345's sector is now a void — sector type/name, one null-lexicon building name, map glyphs, glitch
noise); `ProcgenDeepSnapshotTest` filament pin updated; everything below the sector at seed 0x1234 unchanged.
**Closed:** 2026-09-11 | commit f6f8fc8

### HK-001 — BridgeView draws randomness outside the seed chain
**Resolution:** `FrameEntropy.forFrame(ctx)` (location LIP × 31 + player step count) seeds the spectrogram,
abyssal static, void voices, map glitch plots and the description/trace glitches; `Terminal.glitchText`
gained a seeded overload. Goldens are compared raw (mask removed) and gained 7 frames incl. five at
bedrock. `./vinc.sh --goldens` twice → identical.
**Closed:** 2026-09-11 | commits f3a3d9e (HK-001a), 4cd13c0 (HK-001b)

### HK-002 — `GameState.inventoryController` is a service in a data container
**Resolution:** `QuantumBufferController` is built once in `Game` (`game.inventoryController`); `GameState`
holds data only. **Closed:** 2026-09-11 | commit fb8f092

### HK-003 — `Game.processInput()` duplicates `NavigationCommand.execute()`
**Resolution:** `TurnProcessor.dispatch(game, choice)` is the single "global command, else navigation" path;
`handleInput` and `Game.processInput` both call it. **Closed:** 2026-09-11 | commit dc5b1aa

### HK-004 — inventory overlay had no production caller
**Resolution:** one renderer. `InventoryOverlayComponent` gained item numbers and synthesis labels (the
format `Player.listInventory()` printed); `QuantumBufferController` shows it above the drop/merge
commands; `Player.listInventory()` deleted; `QuantumBufferScreenTest` pins the screen.
**Closed:** 2026-09-11 | commit d2bb2f6

<details><summary>Original entries</summary>

### HK-005 — `Container.populateChildren()` overrides still name their `populateX` method
**Found:** Phase 9o, 2026-09-11. The registry facade dispatches `populate(Container)` on the exact class, but the
13 model overrides (`Universe.groovy:80` … `Apartment.groovy:112`) still call `ProceduralFactory.instance.populateX(this)`
and each imports `ProceduralFactory`. A `Container.populateChildren()` default of `ProceduralFactory.instance.populate(this)`
removes 13 one-line overrides and 13 imports, and makes adding a location type a registry entry instead of an override.
**Shape:** 14 model files → three batches of ≤ 5 under the Refactor Guard; `ProceduralFactoryRegistryTest` +
`RoomAncestorTest:37` (every container non-empty) are the guards. Once migrated, the 13 `populateX` delegators on the
facade become dead and can go with their callers.

### HK-006 — Test hygiene in the procgen tree
**Found:** Phase 9 coverage audit, 2026-09-11. `ProcgenSnapshotTest.groovy:62-73` binds the Country to a local named
`city` and the City to `country` (messages say "City name" for `"Free Dust Kingdom"`, which is the Country). Literals are
correct; rename the locals and messages. `InitialScreenTest.groovy:5` imports `ProceduralFactory` and never uses it.

### HK-001 — BridgeView draws randomness outside the seed chain
**Found:** Phase 7 pre-grill, 2026-09-11
**Sites** (line numbers as of commit `1d3d570`; they move as components are extracted — search by method):
- `BridgeView.groovy:183` — abyssal void voices, `new Random()`
- `BridgeView.groovy:250` — `applyAbyssalStatic`, `new Random()`
- `BridgeView.groovy:354` — `generateSystemTelemetry` spectrogram, `new Random(System.currentTimeMillis() / 1000)`
- `BridgeView.groovy:556` — `renderLatticeMap` glitch at coherence < 30, `new Random()`
**Effect:** Same seed + same inputs ≠ same frame. `BridgeViewGoldenFrameTest` must mask the
spectrogram and cannot pin abyssal or low-coherence frames at all.
**Fix candidate:** seed from the game clock tick or `masterLocus.nextRandom()` (procgen law:
"Deterministic Component Engines"), then unmask the spectrogram and add abyssal goldens.
**Constraint:** Do NOT fix inside Phase 7 — zero behavior change. Pick up after Phase 7 merges.

### HK-002 — `GameState.inventoryController` is a service in a data container
**Found:** Phase 6 retro (`docs/retro/RETRO_PHASE_6.md`, "Concerns"). Candidate move:
`QuantumBufferController` → `TurnProcessor` or `Game`. No caller confusion today.

### HK-003 — `Game.processInput()` duplicates `NavigationCommand.execute()`
**Found:** Phase 6 retro. Both resolve a choice, bump `stepCount`, record it, call the closure.
Test-only path. Candidate: delegate one to the other.

### HK-004 — `BridgeView.renderInventoryOverlay` (now `InventoryOverlayComponent`) has no production caller
**Found:** Phase 7f pre-grill, 2026-09-11. The `i` command opens `QuantumBufferController.open()`, which
prints its own `[QUANTUM_TRACE_BUFFER_INTERACE]` screen; the `[QUANTUM_TRACE_BUFFER_SYNC...]` overlay is
reached only by the golden harness (frames 07, 19). Product decision: wire the overlay into the buffer
command (it is the richer render — signal bars and phase) or retire it and its two goldens. Not a
Phase 7 change (zero behavior change).

</details>

