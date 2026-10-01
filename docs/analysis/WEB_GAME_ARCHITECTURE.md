# The Web Game — How It Is Built
**Written:** 2026-09-24, from the code at the end of the port (ten iterations, `tasks/PORT_QUEUE.md`). **Audience:** a
developer or a fresh session that needs the picture without reading the ten iteration notes (`tasks/port/I01..I10.md`
— the record of every class, choice and Guide-versus-code decision). The law the code lives by is `web/CLAUDE.md`;
this page explains the shape that law produced. Player-facing rules and numbers: `docs/web/players_guide.md`.
**Updated:** 2026-09-26 — the class tour moved here from `web/CLAUDE.md`; the desktop profile is gone (phones only).
**Updated:** 2026-09-29 — U02: the building and the corridor drawn, their parts, and the portraits the engine hands over.

> **In one paragraph.** `web/` is one npm package: a strict-TypeScript single-page game on Vite, with a pure and
> deterministic engine that knows nothing of the browser, a thin browser layer that hands it storage and entropy, and
> a screen layer that turns the engine's readonly snapshot into HTML with `lit-html` and into two hand-drawn canvases.
> One seed builds one world lazily; every tap goes through one method, `GameEngine.step(optionId)`; the save is seed +
> path + what visited places remember + the traveller. The Groovy game in `terminal/` is frozen and was the source of
> the rules, never of the code.

---

## 1. The stack, as installed

| Tool | Version | Role |
| :-- | :-- | :-- |
| TypeScript | `~6.0.3` | strict, `erasableSyntaxOnly` (no enums, no constructor-parameter properties), project references: `tsconfig.engine.json` has **no DOM lib** |
| Vite | `^8.3.0` | dev server, production build to `dist/`, base `/endless-transit/play/` (`ET_BASE` overrides) |
| Vitest | `^5.0.1` | unit tests in Node, config inside `vite.config.ts` |
| Playwright | `^1.63.0` | browser tests against the production build, one project: `phone` (Pixel 7, portrait, touch), one worker |
| ESLint `^10` + typescript-eslint `^8.70` | flat config | the lint walls (§3) and file naming; Prettier `^3.9` formats |
| lit-html | `3.3.3` | the one render helper; the only runtime dependency besides two font packages |
| Node | ≥ 24.12 | runs `.ts` scripts directly (`scripts/check.ts`, `scripts/publish.ts`) |

Commands, from `web/`: `npm run check` (typecheck + lint + format + unit tests → one `STATUS=` line), `npm run e2e`,
`npm run dev`, `npm run build`, `npm run publish:site` (check → build → `../docs/play/` + `build.txt`; commit it, a
push publishes — GitHub Pages serves `master:/docs`). Size at the end of the port: 153 kB JS (50 kB gzip), 19 kB CSS.

## 2. The layers

```
src/
├─ engine/        pure · synchronous · deterministic · no DOM, no packages, no clock, no Math.random
│  ├─ rng/          Seed (own 64-bit kernel: branch(key) then one draw — pick, range, probability)
│  ├─ content/      ContentSource + ContentLibrary (parsers of the .txt lists), WarningSink
│  ├─ model/        the places (Universe … Room, the four abyssal kinds), value objects, relics, moves, scans
│  ├─ procgen/      LocationRegistry (kind → factory; builds each factory's parts once), the factories, decks, names, themes
│  ├─ rules/        GameEngine, Journey, Player, Coherence/Drain, commands, prompts, summaries
│  └─ persistence/  SavedGame (the format, v6) + SaveStore interface
├─ content/       the forked .txt lists + index.txt files, and the ONE import.meta.glob (BundledContent)
├─ platform/      LocalStorageSaveStore, CryptoEntropySource, ConsoleWarningSink
├─ ui/            Shell, ScreenStage, Presenter/View seam, InputRouter, screens/ (presenter + VM + view per screen), canvas/
└─ main.ts        the composition root: the only place adapters are built and injected
```

Tests: unit tests in `tests/` (mirroring `src/`), browser tests in `e2e/`, run in the phone profile.

**Who may import whom.** The engine imports only itself (`./…` and `#engine/…`). `content/`, `platform/` and `ui/`
import the engine; nothing imports `ui/` but `main.ts`. Package-level specifiers (`#engine/*`, `#ui/*`, …) come
from `package.json` `imports`; no `../` segments, no barrels, imports carry `.ts`.

## 3. The walls — what keeps the engine pure

1. **Compiler:** `tsconfig.engine.json` lists only `src/engine` and has no DOM lib, so `document`, `window` or an
   import of `../ui/…` fail to type-check (TS2584 / TS6307).
2. **Lint:** in `src/engine/**` no import outside the engine, no `Math.random`, no `Date` in any form, no
   `performance`, `globalThis`, `window`, `self`; everywhere no `innerHTML`/`unsafeHTML`, no barrels, no `..` in an
   import; a class lives in the file of its name (`Seed.ts`).
3. **Interfaces the engine owns** for what it needs from outside: `ContentSource` (the lists), `SaveStore` (a string
   slot), `EntropySource` (bits for a new seed), `WarningSink` (a `[THEME_WARN]` when an index promises a list the
   content lacks — never a silent fallback). Tests pass memory doubles (`tests/support/`) and a *throwing* warning sink.

Every wall was shown red on a scratch file when it was added (`tasks/port/I01.md`, part C).

## 4. The engine

**Seeds.** `Seed` holds 64 bits as two halves and is shown `XXXX-XXXX-XXXX-XXXX`. Every derived value is
`seed.branch(key)` followed by exactly one helper (`pick`, `range`, `probability`); there is no stream. A number key
and a text key never collide, helper keys carry a reserved `#` prefix. Same seed → same world, pinned by tests and by
three golden text dumps (`tests/goldens/`, one writer: `vitest -u`, reviewed before commit).

**The world is a lazy tree.** `Location` is the abstract place; a place is generated from its parent's seed and its
branch key, and its `children()` populate once behind a private array (the lazy-loading law, restated for TS).
Walking one branch never generates siblings. Kinds are registry entries: `LocationRegistry` maps `LocationKind` →
`LocationFactory`; a new kind of place is one more entry, and the four abyssal kinds (Layer, Artery, Crypt, Shard)
are the same factories registered again under other kinds. Nothing in `src/engine` checks a kind with `instanceof`
or a switch; the place is asked (`listing()`, `moves()`, `arrival()`, `scan()`, `capture()`, `breachOffered()`, …).
A kind answers for itself: its name, words and vibe, `sealed()`, and the journey's questions — `listing()`/`admits()`,
`arrival()`/`arrive()`, `exit()`/`leave()`, `moves()`/`move(id)`, `remember()`/`recall()`, `current()`,
`goesByNumber()`, `startOfJourney()`, `drainFactor()`.

**Domain values are objects with stable keys**: `Address` (the path of indices, the save's and the visited set's
key), `Culture`, `Era`, `Trait`, `LocationKind`, `Frequency` (whole hertz; resonant = a multiple of 11 that is not 0),
`Gematria`, `Relic` (form + parts), `RelicFragment` (a relic with its provenance — the room that dealt it, at the
hertz that room gives it), `Hybrid`, `Keystone` (0 Hz, bound by the building's address), `SpectralEcho`,
`HiddenFrequency`. A dropped fragment keeps its identity because it *is* its identity.

**Moves are a table.** A floor holds a `FloorState` (`ElevatorState` / `CorridorState`) and asks it for its moves;
each state and each room owns one `MoveTable` of `MoveRule`s (`move`, `to`, `act?`) from which `moves()` is derived,
so whatever is offered can be made and a move knows its `opposite` (up ↔ down, forward ↔ back). Breach and descend
are moves the state offers when the building says the ritual allows them.

**What a place remembers.** `remember()`/`recall(memento)` give each place one string of its own state: a floor's
mode, a building's elevator floor, its ritual (sampled floors, merges, breach), a room's taken keys and dropped
fragments, a reach's echo hunt. Only visited places carry one; the save collects them by address.

**The ritual and the abyss.** The ritual lives on the `Building`: a capture tells the trail `sample()`, a merge
`infuse()`, and the building answers `primed()`, `forge(held)` (its `Keystone`, bound by address) and the breach (the
Peak, in either mode). A building's children are its floors, then ten `Layer`s sealed until the breach, each with an
`Artery` (the bedrock's vibe: abyssal culture, atomic era, the country's trait), `Crypt`s and `Shard`s.
`Location.abyssal()` is the parent's answer; a Layer's is true, and it doubles the drain. A `NullReach` owns its `Echo`
(the signal; the capture, once ever) and remembers it. The echo hunt (`echo`, `capture-echo`) and the breach
(`breach`) are moves offered when the place says so.

**Scans and panels.** A scan is `Location.scan(seen)`: the state decides what a floor scans; a kind answers
`scanned(seen)`/`sensed()` for its row. SCAN, MAP and TRACE are global commands whose panels (`ScanSummary`,
`MapSummary`, `TraceSummary`) ride on the snapshot until the next step. A map is the place's `mapNodes()` on a grid —
a room has none, a floor maps its doors — with the marks of a low Coherence and the void's static drawn on the frame;
outdoors, `place.lattice` is the pane's map. HELP opens the manual (`HelpPrompt`, its words in `HelpPresenter`).

**Items and captures.** Objects live in apartments: an apartment deals its relics from the `ObjectDeck` of its culture
and era and knows which room each lies in; a room asks. A capture is one transaction of the `Journey`: the room hands
over only what the `Buffer` takes. A dropped fragment lies in the room as it was; 0 Hz never resonates.

**The turn.** `GameEngine.step(optionId)` is the only way in. It resolves the id against the options on offer (a
stale id changes nothing), drains Coherence *before* the command (`Drain`: 1, ×2 under an entropic street era — the
street's, never the apartment's drift — ×2 below the bedrock, ×4 on a Layer's own screens), runs the command's
`Turn` (`STEP` drains and counts a step, `GLOBAL` drains only, `FREE` neither), rolls the room's lottery after a
counted step, saves, and returns a `GameSnapshot`: readonly data, plain data and the engine's value objects — `world`, `place`, `player`, `buffer`,
`prompt`, `options` (`GameOption`: `{ id, key, label, role, opposite, sealed, visited, … }`, `role` one of travel /
move / return / system / debug / take / pick / drop), `message`, and the
panels `scan` / `map` / `trace` that ride until the next step. Commands are registry entries (`GameCommand` with a
key and a `Turn`). A key is the ordinal when the place goes by its own number, else it comes from a pool that
excludes the letters commands claim.

**Prompts are states, never reads.** At zero Coherence the engine holds a `RebootPrompt`; END SESSION opens a
`RecapPrompt`; BUFFER a `BufferPrompt` (select, merge, drop, back); HELP a `HelpPrompt`. A `Prompt` offers the only
options on offer and answers with a `Reply` that settles it or keeps it open; answers cost nothing.

**The traveller.** `Journey` owns the place the traveller stands in and the `Player`: `Coherence` (bands at 70/30,
corruption below 40), steps (only moves count), the visited path (every ancestor of every place entered — the source
of `[V]` marks), the `Buffer` (no limit, U03d; a merge of two makes their hybrid and restores 15), the resonance
tally (a fresh resonant capture counts once). Death rebuilds the world from the same seed on the starting street with
100 Coherence; steps, visited places and the buffer are kept, every per-place memory is gone.

**The save (`SavedGame`, v6).** Plain JSON: `version`, `seed`, `path`, `states` (memento by address of every visited
place), `coherence`, `steps`, `visited`, `buffer` (fragment data with provenance), `resonant`. The world is never
stored. `restore` is strict: a save the journey could not have written — a state off the path, a path a floor's
mode does not admit, a fragment no room dealt, a Keystone for no building — is refused whole and the title screen
opens; `saved(restore(s)) === s` for every valid save; another version is no save (nobody to migrate for). Play-session
fixtures `{ seed, history }` under `tests/fixtures/` replay with a reload after every tap. On restore the states are
recalled before any place is looked for, so a breach unseals the Layers a save stands on; the visited path is walked
parents first and holds the trail, and may name a sealed place (the reboot keeps the path); every fragment is read
back **through the world** by the `FragmentReader`, which refuses data the fragment would not write back.

**Content.** The `.txt` lists were copied from `terminal/src/main/resources` (byte-identical, `cmp`-checked) and are
owned by the web game from then on. Every directory has one `index.txt`; **order is the index's order**, never a
glob's; which cultures exist is `themes/cultures/index.txt` alone. Objects come from a shuffled deck per
culture × era (no card twice in an apartment), furniture is condition + culture item, atmosphere text glitches by
the room's anomaly. Every list has a size floor pinned by `tests/content/ContentFloors.test.ts`.

## 5. The screens

**The seam.** `Shell` holds the engine and a list of `ScreenStage`s (presenter + view). After every step it asks the
stages which presenter `accepts` the snapshot, calls `Presenter.toViewModel(snapshot)` — the presenter **owns every
word**, casing and aria label; a `*View.ts` carries no literal (`tests/ui/ViewsCarryNoWords.test.ts`) — and the
`View<VM>` renders it with `lit-html` into a container that survives renders (focus, scroll and transitions keep
working). Screens: Title, Hud (the world), Buffer, Help, Reboot, Recap.

**Shell's four rules for every screen:** where the focus goes after a render (the option that held it; if it vanished,
never its `opposite` move — the panel instead; only a shown button in the tab order takes it, so the rail, U04, never
does); a newly opened panel (scan, map) is scrolled into view and given the focus; one live region, mounted once, whose text changes (the status; a screen's headline when the engine
has no message); the previous scene's focused option gets the focus back on the way back.

**Input.** `InputRouter` maps a tap, a click or a key to an option id and calls `engine.step`. Every action
is a real `<button>` at least 44 × 44 CSS px; nothing depends on hover or a key.

**Phone first.** The HUD is one small box (the name, steps, buffer, the Coherence meter), with the depth rail of level
glyphs under it (U01a: the terminal's readouts, the address, its hash and the seed are gone from the world screen);
the moves sit under the place's title, the dock is LEAVE + MORE (MORE is a disclosure holding scan, map,
buffer, trace, help, title, end session) that the next step folds again, and a panel the player asked for (scan,
map) comes after the list; every screen shows a move without scrolling at 360 × 640. A drawn place (U01b: the
street) shows the name, then the picture, then the list, then the rest of the card, the picture sized so the first
row stays above the dock at 360 × 640; its HUD is one thin row. A room is a card (U03e): the drawing says where a
place's moves sit (`Drawing.arrange`, a `MovesPlace` — `MovesOnCard` for the plan, `MovesInStrip` for the rest — into
a `MovesLayout`), and where they sit on a card the presenter builds `HudVM.card` (a `RoomCardVM`: the corner's words,
the arrival's paragraph, the keys — Buffer, Trace, and the way back, which is the way out or the engine's move back by
its id, `BACK_MOVE_ID` — the other moves and the game's other options) and leaves the dock empty. `HudView` hands its
parts (`CardParts`) to a `RoomCard`, `RoomCardView`, which lays them out on two faces and owns which one shows: the
picture with the place's heading, first words and status over it, fading; the back with the panels a step brought, the
words, the lists, the ways and the game's options. The face turned away is hidden from everyone. The folded corner and
a sideways swipe (not over the plan) turn it and pick nothing; a new room shows the front, a step that brought a panel
the back. A turn is a `CardTurn` (`src/ui/card/`: `FlipTurn`, `DoorTurn`, `PeelTurn`, `BlindsTurn`, the broken
`StaticTurn` and `TornTurn`, `InstantTurn` under reduced motion), played with the browser's own animations; `CardTurns`
picks one from the frame's seed, the decay and the turn's count since the step, never the one just played. The keys
under the card stay on both faces; the picture's MAP key is mounted in their slot (`KeySlot`, `StripSlot`), and the
ids something outside the template looks up live in `CardSlots`.
`prefers-reduced-motion` stops the bar, the canvas pulse, the scene's motion and the spotlight; `viewport-fit=cover` pads the dock for a home bar.

**Canvas.** `src/ui/canvas/` and `src/ui/scene/` are the only hand-drawn code: a `Picture` (`MapPicture`) is a pure function
of a plain view-model into `Painter` calls, so a stub painter tests it in Node; `CanvasView` draws it into a host
with the stylesheet's tokens (`Inks`: the ones it may paint text with) at device pixel ratio and stays still under reduced motion. The map's marks
(dim/bright, the `X` glitch marks below 30, `☠` below the bedrock) and the spectrogram bars are seeded from
`FrameEntropy` (place + step count), never the clock. Each canvas has a text alternative from the same data.
Every canvas moves on the page's one `MotionClock` (behind a `FrameSource` the composition root builds from
`requestAnimationFrame`; it runs only while something listens) and keeps the `PixelBudget` (≤ 2 device pixels per CSS
pixel, ≤ 1.3 million pixels).

**Scenes (U01b).** `src/ui/scene/` draws a place: the engine hands over the place's portrait (`Location.portrait()`:
an area above the street, the street, the tower, the corridor, the plan, or none), which tells its reader which it is and carries each drawn child's part by
its address (`onStreet()`, `onTower()`, `onCorridor()`), and the frame's seed; the presenter's `SceneDrawing` reads the
portrait into a `Drawing` — one member per picture, holding that picture's own view model (`StreetVM`, `TowerVM`,
`CorridorVM`, each a `SceneVM` frame with the tear's strength from `Coherence.decay()`), its listed children matched to
their parts by `ListedParts`, or `Undrawn`. `HudView` asks the drawing for its `Sketch` from the `SceneRegistry` built
in `main.ts` (a `PictureBook`: each picture built with its parts by `ScenePictures`, a pure `layout` into hit areas and
a pure `paint`), which binds the view model to its picture; an undrawn place's sketch draws nothing and the screen
stays as it was. `HudView` shows the sketch through the `SceneStage` built in `main.ts` (U03): the sketch tells the
stage which kind of host it needs (`stageOn` → `SceneStages`), and the stage keeps its host while the host element and
the picture stay, else makes one through `SceneHosts`. `SceneView` hosts a `LineSketch` (a view that is one number): a tap zooms into the child and only then sends a bubbling `pick`
(`SceneEvents` makes it and reads its id back) the `InputRouter` turns into the option; a new frame of the game or a
dispose drops a zoom in flight; the child pointed at is told to `HudView`, which lights the list's twin through
`data-lit`; `CoherenceFx` plans the tear from the seed; under reduced motion a still, no
zoom.

**Above and below the street (U04).** The eight levels from the universe to the city answer an `AreaPortrait`
(`AreaFigure`: the level's `AreaLook`, each listed child's part by address with its `MarkLook` — `onArea()` — and a null
reach's signal); `SceneDrawing` reads it into `DrawnArea` (`AreaVM`), drawn by `AreaPicture` on the line host with a
`StillCamera`: the level's `AreaScene` (one class a level) says where its children stand and paints its backdrop, each
child's `AreaMark` (one class a child kind) paints its mark — both tables keyed by the look, built in `ScenePictures`
with the shared `AreaInk` and `AreaSpots`. A Layer draws as its mode says, the tower or its Artery; the Artery's
corridor is tinted by `VoidTint`; `TowerFigure.breached` tells the tower the bedrock is open.

**The trace column (U04).** TRACE's step carries each level's band (`TraceSummary`: its `bandPortrait` — its own
picture, a floor its building's tower, a corridor its corridor, an apartment its plan at the room below — its listed
places, chips, first words and its kind's `scale`). `HudPresenter` makes the `TraceColumnVM`, each band's drawing from
`SceneDrawing.band` (the same pictures, the children keyed by address); `HudView` shows the column over the screen and
hands its hosts to `TraceBands` (a canvas a band, painted through the sketch's own stage call by a `BandStage`, only the
band in the middle of the view moving, and the thread through each band's spot) and `Dive` (the levels full screen,
zooming into each spot, landing on your band); both built in `main.ts`. The rail is one button (`railTrace`) running
TRACE, out of the tab order; the view keeps the level nearest the finger to open the column there.

**The pole and the vibe (U05).** A level hands its vibe over as data: `Location.vibeFigure()` answers a `VibeFigure`
(nothing above the planet; the planet's main and second pairs and stability; from the country down the trait, whether
the level rebelled — `City` — and which values it drew from the second pair — `Apartment`, its rooms asking it), made by
`Vibe.figure()`, which owns the drift rule and the stability's words (`stabilityText()`). `Location.poleSigns()` names
a level's states (a curved corridor, a door not stable, an anomaly), and `LocationKind.glyph()` its node's drawing;
the trace step carries all three. `PolePresenter` (injected into `HudPresenter` as `PoleWords`) makes the `PoleVM`;
`PoleMarks` decides where a level writes a value (a word the level above did not hold, a rebel district's swap, a
drift's start) and the vibe in force at each level; `PoleLayout` places the rows (the pole down the middle, a big node
a level, its kind above and its name and tags under), the values beside the node that sets them with the drift
current's pair under them, the ships' empty berths, the level in focus through the scroll window and the backdrop's
three rows; `PolePicture` paints them — behind the pole, pinned, the vibe in force at the level in focus, huge and
faint — each node's glyph from a `Record<GlyphLook, PoleGlyph>` built in `ScenePictures`. `TracePole` shows it in the
trace, a button over each level's row, following the level in focus as it scrolls, and `HudView` switches
Pole | Column, the pick kept by a `TraceViewMemory` (`LocalStorageTraceViewMemory`).

**The building and the corridor (U02).** A picture's view moves: it answers a `SceneCamera` for its view model at a
size — `TravelCamera` (the tower's car, the corridor's walk: range, pace, coast, the stops, and a `CameraTrack`) or
`StillCamera` (the street) — and `SceneView` owns where the view stands and asks the camera every rule. The track is a
`SliderTrack` (its `SliderBox`, axis and the views at its ends) or `NoTrack`; it lays the real `role=slider`
(`SceneSlider`, a `SliderFace`) over itself or hides it, and reads a finger on it. A finger is a `Drag`:
`PictureDrag` on the picture (past a slop, one to one) or `SliderDrag` on the track, each let go with its `Fling`. A going-in is a
`SceneTrip` (ride to the child's stop, zoom when the picture zooms, then the pick); motion is `Tween`s on the clock;
`Zoom` is the canvas transform at one moment and `TearPass` draws the tear over the frame. The lit child and the one
you stand by are a `ChildMark` (`MarkedChild` or `NoChild`). `SceneView`'s parts come whole in `SceneViewParts`, its
canvas a `SceneCanvas` made by `SceneCanvasMaker` (U03: a `PixelCanvas` from `CanvasMaker` — a canvas in its host
within the `PixelBudget`, inked where it sits — listened to through `CanvasInput`, painted under the zoom and torn).
`TowerPicture` draws a row per level (a floor's corridor as a line in its shape, a tick per door; the Layers faint in
the void's red below the bedrock), the roof `Roof` picks, the car and the gauge; `CorridorPicture` walks a `HallView`
(a pair of doors every 2.2 units) with one part per key from `CorridorParts` — a `HallShape` per corridor shape, a
panel per material family, a mark per state look (`DoorLooks` the inks) — each door a `PlacedDoor`, and the
`CorridorSlider` along its foot. A building's floors are listed as a pad of numbers (`FloorPad`), one group up to
twenty, else by tens (`FloorsByTen`, the Layers together first, `LayersTogether`), the car's group shown first.

**The apartment's plan (U03).** A room's portrait is its apartment's plan (`PlanPortrait` → `PlanFigure`: every room
in walking order with its `RoomSight` — visited, known, fog, which `Apartment.plan` owns — and its relic marks, the
room stood in, its `RoomLook`); a scan surveys the apartment, which remembers it. `PlanLayout` lays the rooms out in
serpentine rows (`FloorPlan`: `PlanBox`es in plan units, a `PlanDoor` — `SideDoor` or `LevelDoor` — between each room
and the next, the entrance under the first). The plan's view is a `Framing` (a centre in `PlanPoint`s, a scale and a
vertical stretch), not one number, so it has its own host: `PlanScene` shows a `PlanSketch` (`Planned`: `PlanPicture` +
`PlanVM`) on the shared `SceneCanvas`, in a `ViewMode` (U03d): `InRoom` — the room you stand in stretched to fill the
picture (`PlanCamera.inside`), still, every new room starting there — or `OverPlan`, which the MAP key
flips to and back (its words in the `PlanVM`; the host owns the key and mounts it where its `KeySlot` says, U03e). Over the plan, the `PlanCamera` keeps the framing in range, rests on a
room filling the picture (U03c), coasts, settles a pinch on the room or the whole plan and shows the `Minimap`, whose
tap pulls back to the whole plan (an option's hit wins over it); the mode hands the picture its corner map;
a `PlanGesture` is a `PlanDrag` or a `Pinch`, and says how it lets go (`release`, told a `LetGo`: a drag coasts, a
pinch settles); a `PlanGlide` moves the view and a `PlanTrip` moves it then picks. The
picture places each room (`PlacedRoom`) and paints it by its sight (`SIGHT_LOOKS`: a `SeenLook` or the `FogLook`, in
`Tint`s), with what its box holds (`RoomInsides` → a `RoomInside`: the room stood in, when large enough, a
`DrawnInside` — its back wall a `RoomWall` (a `WallPattern` in its culture's ink, by the look's walls key), a
`RoomLight` by the look's light key, furniture and snow, its relics on the floor; any other room a `PlainInside`; a
key with no entry is plain). The doorways of the room stood in (U03e) are each a `DoorwayFrame` — the gap on the
picture, the way in, the light's ink and the room's number — painted by the sight of the room it leads to
(`SightLook.paintDoorway` → a `DoorwayLook`: `LitDoorway` once that room is visited, in its own light's ink, which the
engine hands over as `PlanRoom.light`; `FoggedDoorway` before); the way out is a `LitDoorway` in its own ink; the room
stood in carries no name. A relic taken flies to the card's Buffer key (`RelicFlight`, behind the plan's `Flight`
port, built in `main.ts`). `SceneDrawing` joins the doorways' moves to their rooms by address, the leave and the
takes; `HudView` sends every drawn button through the picture and lights its twin with one delegated listener each.

**Debug mode.** `?debug` on the address, read only in `main.ts`, puts the debug commands on offer (INTEGRITY ladder,
PRIME, KEYSTONE) as a folded strip out of the tab order; tests turn it on with `debug: true`.

## 6. Tests — the three layers

1. **Vitest, engine in Node** (milliseconds): rules with exact edges (`toBe` on observed min/max over many seeds),
   determinism and laziness, strict restore, fixtures replayed, goldens, content floors, contrast of every text token
   against every surface (≥ 4.5:1, parsed from the stylesheet), views carrying no words.
2. **Vitest, UI without a browser:** presenters → view-models, canvas pictures against a recording painter.
3. **Playwright, production build, the `phone` profile:** every flow (title, world walk, buildings, items, survival,
   ritual, map, fold, focus, announce, a11y, resilience against corrupt saves and a throwing storage, help), and
   `@playthrough` — the whole game from the title to the void recap and a reload that continues
   (`npx playwright test --grep @playthrough`). Screenshots land in `test-results/` and are looked at before UI work
   is called done.

## 7. Against the terminal game — the developer's view

| | Terminal (`terminal/`, Groovy, frozen) | Web (`web/`) |
| :-- | :-- | :-- |
| Rules and numbers | the source | the same, from the Player's Guide; where Guide and code disagreed the Guide won (each case in the iteration notes) |
| Seeds | `java.util.Random`, `LocusSeed.branch` | own kernel, same design (branch then draw); **no seed or save compatibility** |
| Menus | `Map<String, Closure>`, labels parsed downstream | options as data, ids resolved by the engine |
| Input | blocking reads inside commands | `step(id)`; a pending prompt is a state |
| Lazy loading | a `List` subclass intercepting access | explicit `children()` behind a private array |
| Model ↔ UI | model imports `ui.Terminal`, sleeps, prints warnings | engine has no output device; sinks injected |
| Static state | `Terminal.sink`, `ScreenshotRegistry`, static generators | none; everything injected from `main.ts` |
| Save | seed + LIP path + mutations by LIP, `session.trace` on disk, `sync` command | seed + path + mementos by address + traveller, one `localStorage` slot written after every tap, strict restore |
| Content order | sorted `TreeMap` for cultures, file order for doors | the index file's order, asserted |
| Known defects (12, study §2.4) | present | fixed, each pinned by a named test (`tasks/port/I09.md`) |
| Not carried | `p`/`P` screenshots, `journal.txt`, `sync`/export, buffer destroy, auto-take, `[CLEARED]` floor progress, the endless Layer list (ten Layers instead), universe/filament pane variants | — |
| Visual gate | 36 golden ANSI frames | 3 golden text dumps + Playwright screenshots on the phone profile + a human look |

The full player-facing list of the 27 differences is the last section of `docs/web/players_guide.md`.

## 8. Where things are

| Need | Look at |
| :-- | :-- |
| The law (layers, walls, rules of the code) | `web/CLAUDE.md` |
| Why the stack and the layout (decided before the port) | `docs/analysis/WEB_PORT_STUDY.md` — where it and the queue disagree, the queue won |
| The decisions the port ran on and the ten iterations | `tasks/PORT_QUEUE.md` |
| Every class, choice and Guide-versus-code item, per iteration | `tasks/port/I01.md` … `I10.md` (Shape tables) |
| Player rules and numbers, cited from `web/src` | `docs/web/players_guide.md`, `docs/web/cheat_sheet.md` |
| Lessons paid for during the port | `tasks/lessons/web.md` |
