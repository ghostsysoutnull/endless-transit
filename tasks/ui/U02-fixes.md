# U02 — the design fixes (tracker)

**What this is:** every break of the OO principles and the TypeScript and OO rules in `CLAUDE.md`, and of the engine
law "the UI never re-derives a rule" (`web/CLAUDE.md`), in the code the UI rework wrote: U01a, U01b and U02 so far
(`git diff cdff32d~1 e577e8f -- web/src`, read at the branch's head). The first list came from U02 session 1 and the
audit of all the rework's code on 2026-09-26, against the eight principles then in force. On 2026-09-28 it was
re-checked against today's rules: every item still holds, some got a sharper fix, and the rules added since (OO 9–11,
the new clauses of 4, 6, 7 and 8, and TypeScript and OO) added the items under their own heading. None of them was in
a backlog or a lesson. This file is the one list; the U02 note points here. Each item goes by its short name.

**When:** everything but the heading "After the corridor" is fixed before the corridor (U02 "Left to do", step 2);
that heading's items follow it. The corridor picture is built to their rule from its first line: it takes its helpers
from `main.ts`, never builds them.

**How to mark:** `[ ]` open · `[~]` in progress · `[x]` done, with the commit that did it on its `Done:` line.
When one fix reaches an older file because it shares the pattern, that file is fixed too (two places sharing a pattern
are fixed together) and is named in the item.

**Decision (the user's pick, 2026-09-28):** the tower and the pad write a Layer as the game names it, `-0x1`
(`Level.label()`, which `Layer.name()` now asks too). Nothing else here changes the screen.

## The UI works out rules the game should hand it (the engine law)

- [x] **door-keys — door looks by their display name.** `DoorLooks.INKS` is keyed by `Frozen`/`Cold`/`Static`, the
  words shown to the player. Fix: `themes/doors/states.txt` and `materials.txt` get a key column (a state's look
  `frost`/`cold`/`static`/`plain`; a material's family `glass`/`metal`/`stone`/`timber`/`bone`), `DoorLook` carries
  the keys as a closed set made where the content loads, an unknown key refused there (today it draws plain), and the
  UI maps only that set. (OO 1, 6; TS: parse at the edge.)
  Done: `148af00`
- [x] **levels — the tower works out levels itself.** `TowerPicture` reads "below the bedrock" from a negative number
  (`level < 0`, `#frame`'s `min = -below`) and positions floors by `Number(child.ordinal)`. Fix: the engine hands each
  level its number and whether it is a Layer.
  Done: `370745b`, its design check's fixes `56696c0`, `9c2903b`, `81646bc`
- [x] **came-out-of — which place you came out of, from address text.** `HudView` finds it with
  ``last.startsWith(`${child.address}.`)``, which re-derives the address rule the engine owns. Fix: the engine says
  which child the traveller came out of. (OO 6.)
  Done: `9a6408c`
- [x] **tear-decay — the tear strength is computed by the presenter.** `HudPresenter` builds
  `new Coherence(player.coherence)` to call `decay()`. Fix: the snapshot's player carries the decay.
  Done: `8155cf8`
- [x] **floor-numbers — floor numbers read back from their display text.** `HudPresenter.#pad` (`Number(ordinal)`
  four times) and `TowerPicture:69, 207, 486`. The tower also writes a Layer as `-1` where the game names it
  `Layer -0x1` (Decision 2). Fix: read the level number from `levels`; the Layer label per the open decision above.
  **The tester sees this one** if the label changes.
  Done: `370745b`, its design check's fixes `56696c0`, `9c2903b`, `81646bc`
- [x] **noise-value — the frame's seed goes over as text and is parsed back.** `PlaceSummary.noise` is
  `frame.toString()`; `CoherenceFx` rebuilds it with the engine's `Seed.parse` and quietly falls back to
  `new Seed(0, 0)` when that fails. Fix: the snapshot carries a noise value, not a string to parse. (OO 6; TS: parse
  at the edge.)
  Done: `052f434`

## Choosing what to draw by comparing text (OO 3, 5)

- [x] **shape-drawers — corridor shapes and roofs picked by if/else on text.** `TowerPicture.#corridor`
  (`shape === 'curved'/'service'/'static'`) and the roof chains in `StreetPicture` and `TowerPicture`
  (`kind === 'peak'/'mast'/'box'`, two copies). Fix: one drawer per shape and per roof, found by key, shared by the
  pictures that draw them; the shape keys a closed set made where the content loads, an unknown one refused there
  (today it draws as a long corridor). (TS: parse at the edge.)
  Done: `59aeef9`
- [x] **still-camera — the street's missing camera is `null`, checked about ten times.** `SceneView` branches on
  `camera === null`, `camera.zoom === false`, `camera.drag === 0`. Fix: a still camera that answers for itself.
  Done: `1a4ff54`

## Behaviour kept away from its data (OO 2)

- [x] **child-seed — a seed helper that uses no state.** `Progeny.childSeed` uses nothing of its `Progeny`, and
  `Passages` builds a `Progeny` only to call it. Fix: the child-seed rule in one honest place.
  Done: `444a8f3`
- [x] **camera-rules — the camera's rules live in the scene host.** `SceneCamera` is plain data; `SceneView` computes
  the trip pace (`#pace`), the settle time (`#up`), the clamp, the nearest stop and the slider track's value. Fix: a
  camera object owns them (with `still-camera`, this takes two jobs out of `SceneView`); the tower's tuning numbers
  (`PACE`/`SETTLE`/`COAST`) stay in `TowerPicture`, whose facts they are.
  Done: `1a4ff54`
- [x] **loose-functions — loose functions holding logic.** `stylePalette` (`src/ui/canvas/StylePalette.ts`: a cache
  in a closure, rebuilt every frame by `SceneView.#paint`), the easings `easeOut`/`easeInOut` (`src/ui/scene/Tween.ts`,
  held by `Tween` as a function in its `#easing` field), and the older `frameOf` (`src/ui/Frame.ts`) of the same
  pattern. Fix: objects. `systemOption` stays: it is a factory, a named reason. (TS: behavior is methods.)
  Done: `182dd50`

## One fact, several owners (OO 1)

- [x] **text-shaping — capitalising in three places.** `HudPresenter.#capitalised`, `Floor.readings` (the zone),
  `FloorFactory.create` (the culture in the sentence). Fix: one owner.
  Done: `6cbce0c`
- [x] **reduced-motion — "is motion reduced?" asked of the browser in three places.** `SceneView:287`, and the older
  `CanvasView:70` and `Shell:152`. Fix: one reduced-motion adapter built in `main.ts` and handed in, behind a small
  interface owned by the code that asks. (OO 4 too.)
  Done: `2911ea1`
- [x] **scene-events — the picture events read in two places.** The `{ id }` of `pick`/`light` is parsed in
  `InputRouter.#pick` and `HudView.#litOf`; `SceneEvents` owns only the names. Fix: `SceneEvents` makes and reads
  them, the event's `unknown` detail checked there once. (TS: parse at the edge.)
  Done: `4af720c`
- [x] **canvas-font — the canvas font and the 12 px text floor restated.** `MONO` in `StreetPicture`,
  `TowerPicture`, and the older `MapPicture`, `TracePicture`; `TEXT = 12` in both scenes. Fix: one owner for all four
  pictures.
  Done: `275e50f`
- [x] **heading-colon — the list heading's colon stripped twice.** `HudPresenter` strips `:` for the heading and for
  the slider's name. Fix: with `text-shaping`'s one owner of text shaping.
  Done: `6cbce0c`
- [x] **pad-marks — the pad keys' marks read off the display.** A key's `current`/`visited` come from whether its
  row got a mark (`row.mark !== null`, `row.seen !== null`). Fix: from the option's own `current`/`visited`.
  Done: `8155cf8`
- [x] **door-look-type — the door look's shape restated.** `SceneVM` declares its own `Look` beside the engine's
  `DoorLook`, accepted where a `DoorLook` is expected only because it has the same shape. Fix: one type, carrying
  `door-keys`' keys, a small class with `#private` fields; `Passage` likewise (today any `{ shape, looks }` literal
  passes, as `NO_PASSAGE` and `Passages.of` build them). (TS: shape is not identity.)
  Done: `d881b45`
- [x] **picture-keys — picture names typed twice.** `main.ts` registers `street` and `building` as literals; the
  engine's kinds own those keys (`STREET_KIND`, `BUILDING_KIND`). Fix: key the registry by the kinds' keys (the
  corridor would add a third copy).
  Done: `6dbb3c1`

## Rules added since the audit (OO 7, 9, 11; TypeScript and OO)

- [x] **layer-portrait — a Layer inherits the floor's picture data.** `Layer` overrides `drawing()` to its own key
  but inherits `Floor.portrait()`, so at the elevator it hands the tower's figure to the Layer's picture — harmless
  only while no Layer picture is registered (U04). `Floor`'s `passage?` and `Corridor`'s `shape?` are optional only
  because `Layer` and `Artery` inherit those constructors without them. Fix: the Layer answers `portrait()` for
  itself; `passage` and `shape` required, `Layer` and `Artery` passing their empty value. (OO 9.)
  Done: `370745b`, its design check's fixes `56696c0`, `9c2903b`, `81646bc`
- [x] **command-or-query — two `SceneView` methods both change state and answer.** `enter(id): boolean` starts a
  ride and says whether it took the pick (`HudView` reads the answer); `#zoomAt`, a question, writes
  `#tripAnchor ??=`. Fix: `leads(id)` answers, `enter(id)` acts; the anchor set when the ride starts, `#zoomAt` pure.
  (OO 11.)
  Done: `218be90`
- [x] **mounted-state — fields set together kept side by side.** `SceneView`'s `#host`, `#canvas`, `#slider`,
  `#observer`, `#listeners` (each `| undefined`) and `#trip` beside `#tripAnchor`; `dispose` clears the trip and
  leaves its anchor. The older `CanvasView` (`#canvas`, `#observer`) shares it. Fix: one `#mounted` record or
  `undefined`, one trip-with-its-anchor or `undefined`. (TS: a union of valid shapes.)
  Done: `218be90`
- [x] **frame-key — "is this the same frame" by object identity.** `SceneView.render` returns early on
  `vm === this.#vm`, true only because `HudView` passes the same object again on its own toggles. Fix: compare a
  stable key the view-model carries. (TS: objects are equal by reference; OO 6.)
  Done: `218be90`
- [x] **invariants — objects left or built invalid.** `SceneView` writes `gesture.moved = true` on a plain record
  whose rule ("moved means the pointer is captured") it keeps itself; `PixelBudget` accepts a limit of zero or less,
  and its `ratio()` is then NaN. Fix: a gesture class whose `move(along)` owns `moved`; `PixelBudget` refuses a limit
  that is not positive. (OO 7.)
  Done: `8632f56`
- [x] **host-query — an unchecked narrowing.** `HudView.#host` returns `querySelector(...)` as `HTMLElement | null`,
  the element type taken on trust from the return type (an older line, widened by the rework). Fix: an
  `instanceof HTMLElement` check inside `#host`. (TS: a cast is a promise.)
  Done: `6dbb3c1`

## After the corridor

- [ ] **kinds-not-optionals — missing parts as optional fields, nulls and empty strings.** `Figure` is a bag of
  optional parts for four kinds (`tower?`, `level?` — added by step 16 — `shape?`, `looks?`, `door?`), paid for in
  `HudPresenter` (`?? 0`, `?? ''`, `?? []`, and the pad's `level?.number ?? 0`) and `Building`
  (`?? { floors: 0, doors: 0 }`); `SceneVM` flattens the same kinds onto every child; empty strings as flags (a
  floor's `indexLabel ''`, `Corridor`'s `shape ?? ''`, `SceneVM`'s `shape` and `slider`); `null`
  inside types (`SceneVM`'s `door` and `tower`, `SceneCamera`'s `track`, `HudVM`'s `position` and `pad`,
  `GameOption`'s and `PlaceSummary`'s `figure`; the older `HudVM` `map`/`trace`/`sealedNote` share it). Fix: one
  member per kind, and an empty member that answers for itself where a part is missing (with `still-camera`).
  (TS: a union of valid shapes.) The corridor adds to it (design check on `c938a04`): `here`, a child id where
  empty means none, beside the older `lit` (`ScenePicture.paint`, `SceneView#here`, `CorridorPicture.paint`), and
  `PlacedDoor.word` and `CorridorPicture#lookOf` paying for a child's `door: … | null`. After the corridor with
  `one-job` (the user's pick, 2026-09-28): its split needs
  `one-job`'s view model mapped per picture, and its `passage?`/`shape?` part touches the Layer screens (U04).
  Done: —
- [x] **built-collaborators — classes build their helpers, or take them as concrete classes.** Built inside:
  `SceneView` (`CoherenceFx`, `PixelBudget`), `CanvasView` (`PixelBudget`), `StreetPicture` and `TowerPicture`
  (`SceneHash`, `Roof`, `DoorLooks`), `Roof` (`SceneHash`), `Passages` (`Sentences`, `Doors`), `HudView`
  (`SceneView`, and the older `CanvasView` with its `MapPicture`). Taken as concrete classes: `MotionClock`,
  `SceneRegistry`, `Progeny` in `Passages` (the older presenters' `Masthead` likewise). Fix: built in `main.ts` and
  handed in through small interfaces owned by the code that uses them (a clock, the pictures, a child seed); `HudView`
  gets a scene-view factory. (OO 4.)
  Done: steps 1–3 and 5–8 of the plan below — `99371c0`, `bdc041b`, `4f9296d`, `9147273`, `f0408c0`, `6fee422`,
  `42146a2`, with their design checks' fixes `b7bee28`, `ccd736b`, `e20376a`, `69076b9`, `f98f748`, `3dbb450` and the
  close-out commit
- [x] **one-job — `SceneView` and `HudPresenter` each carry several jobs.** After `camera-rules`, `still-camera`,
  `reduced-motion` and `scene-events`, `SceneView` still holds the canvas sizing and mounting, the pointer gestures,
  the slider control (it still branches on `Gesture.onSlider()`: a picture gesture and a slider gesture
  go behind one interface with it), the trip and zoom, and the tear's painting (and it reaches through `SceneMount` to command the canvas
  and the slider; `CanvasView` likewise through `CanvasMount`: the mount gives its parts their orders when the
  canvas and the slider become their own objects); `HudPresenter` also maps figures into the `SceneVM`
  (`#drawing`) and holds the pad's grouping rule (`#pad`). Fix: each its own object, handed in. (OO 8.)
  Done: steps 4–7 of the plan below — `7e8ec52`, `9147273`, `f0408c0`, `6fee422` (slider pre-check `b550626`)

## Logged, not fixed (no check box)

- `GameOption` is one flat shape for eight roles: the roles without a place carry a blank `place`, `ordinal` and
  `address` and `figure: null` (TS: a union of valid shapes). Older code; its split is a wave of its own.

- `HudView` has several jobs too (OO 8): the templates of the HUD, card, list, dock and debug strip; the scene view's
  lifetime; the lit child kept in step between list and picture; the pad's group state; the map and trace slots; the
  dock and debug folds. Mostly older code: its split is a wave of its own.

## Plan (the fixes before the corridor, 2026-09-28; amended after the grill)

**Premise.** One commit per fix, or per group of fixes that change the same code. Each passes `npm run check` on its
own, and the design check runs on each commit's diff before the next begins. After every commit that touches
`SceneView`, `HudView` or `InputRouter`, run `npx playwright test e2e/scene.spec.ts e2e/a11y.spec.ts e2e/tower.spec.ts`
(about 25 s). The one red test there is `scene.spec:72`, red by plan. **The first tier puts no object with behaviour
into the snapshot.** It adds plain fields and closed key unions only, so a session that runs out mid-batch hands over
on a clean cut. **The second tier** brings value objects into the snapshot. It waits for step 0. Two build sessions,
split at the tier boundary. Nothing on screen changes.

**Found while planning (bind the steps below):**
- **Deep equality cannot see private fields.** `expect({ n: new Seed(1, 2) }).toEqual({ n: new Seed(3, 4) })` passes,
  and `new Seed(1, 2)` equals `{}` (probes 2026-09-28). `Sessions.test:67, 186` compare whole snapshots with
  `toEqual`, so a value class in the snapshot would blind the reload check. Step 0 comes first.
- **The street and the tower draw roofs with different proportions on purpose.** The mock draws a spire at
  `x + bw·.2 … x + bw·.8` on the street (`transit-reframed.html:749`) and at `mid ± W·.18` in the tower (`:775`). The
  street's flat roof draws nothing; the tower's draws a line, and only the tower's peak is kept below the top. So each
  picture gets its own table of drawers by key; no drawer is shared.
- **`ContentLibrary.pairs` cuts at the first `|`** (`ContentLibrary.ts:36-41`). A third column needs its own reader.
- **`came-out-of` cannot live as engine state.** The engine does not keep the place left, and a field the save does
  not hold would make the reloaded screen differ (`Sessions.test:67`). The trail already runs from the universe down
  to here (`GameEngine.ts:522`).
- **`frame-key`'s repeat render comes from `HudView`'s own toggles.** `#toggleMore`, `#showGroup` and `#toggleDebug`
  reach `#paint` (`HudView.ts:162-180`), which renders the scene again with the same object (`:130`).
- **The tower's drag, gauge slider and pad ride have no test at all,** and `SceneView` has no unit tests (vitest runs
  in `node`). Step 0b adds a browser pre-check before any production change.
- **The engine's headings end in a colon only for the presenter to cut it** (`HudPresenter.ts:159, 240`). The engine
  writes them without it (step 3).
- **`kinds-not-optionals` is tied to `one-job`.** Splitting `Figure` and `SceneVM` by kind needs a view model mapped
  per picture, which is `HudPresenter.#drawing`, `one-job`'s work. Its other parts (`Floor`'s `passage?`, `Corridor`'s
  `shape?`, the Layer's and the Artery's missing shapes) touch the Layer screens (U04). **Moved after the corridor, with
  `one-job`** (the user's pick). `layer-portrait` keeps only its bug fix here. Step 16 adds a floor row's
  number to `Figure`'s bag of optional parts: that extends the logged smell, said here per the Known smells rule.
- **The new services are built inside their users** (the roof and row tables, `CanvasFont`, `StylePalette`,
  `SceneEvents`, `Frame`, the easings). That extends `built-collaborators`, which follows the corridor and takes them
  in with the rest. Said here per the Known smells rule.
- **`GameOption` is one flat shape for eight roles.** It is logged above, not reshaped: `ordinal` stays text.

**Facts this batch makes false, fixed in the step that makes them false:** `GameSnapshot.ts:11` ("JSON-safe, no objects
with behaviour") and `docs/analysis/WEB_GAME_ARCHITECTURE.md:123` (step 14a); `Figure.ts:7`, `Tower.ts:6`,
`DoorLook.ts:1`, `Passage.ts:6` (steps 1, 14a, 16); `SceneVM.ts:8` and `DoorLooks.ts:1-9` (step 1); `Progeny.ts:9-11`
(step 10); `PlaceSummary.ts:6, 17` (step 14).

### Step 0 — deep equality sees value objects
- `tests/support/ValueEquality.ts`: an equality tester (`expect.addEqualityTesters`) that compares two objects of the
  same class having `equals` by `equals`. Registered once under `test.setupFiles` in `vite.config.ts`.
- Test, RED against today's setup: `new Seed(1, 2)` is not equal to `new Seed(3, 4)`, nor to `{}`, under `toEqual`;
  `new Seed(1, 2)` equals `new Seed(1, 2)`. GREEN after.

### Step 0b — the tower's behaviour pinned in the browser (committed before any production change)
`e2e/tower.spec.ts`, green against today's code: on a building, the gauge slider's arrow keys change `aria-valuenow`;
a pad key rides the car and then enters that floor; a drag on the tower lights another floor (`data-lit` on its key).

### First tier
1. **door-keys.** `ContentLibrary.triples(path)`: `name|sentence|key`; a line without two cuts is an error, as in
   `pairs`. `themes/doors/states.txt` and `materials.txt` get the third column (a state's look
   `frost`/`cold`/`static`/`plain`, a material's family `glass`/`metal`/`stone`/`timber`/`bone`/`plain`). The keys are
   closed unions (`DoorStateLook`, `MaterialFamily`), each read by one small function at the content edge that
   refuses an unknown key with the content error. `Doors.of`, `Doors.look`, `Door` and `Apartment.figure`
   (`Apartment.ts:82`) carry the keys. `DoorLook` stays a plain interface, with the keys added, until step 14a.
   `SceneVM`'s `Look` goes (it takes `DoorLook`), and `DoorLooks` becomes an exhaustive `Record<DoorStateLook, ink>`.
   - Tests, RED first: `ContentLibrary.triples`; `Doors.look` gives the keys for fixed seeds; every line of both
     lists has a known key; `DoorLooks` inks by key.
   - Rewritten on purpose: `TowerPicture.test:10, 46-52` (fixture keys, with the assertion at `:182`, `bl` asked,
     kept); `RoomText.test:199-205` (two-column fixtures); `ContentFloors.test:99-114`, `Corridors.test:14-15` (read
     the lists through `triples`); `Passages.test:50-51, 124`, `GameEngine.test:455`,
     `HudPresenter.test:693-695, 733-735` (look literals gain keys).
2. **shape-drawers.**
   - **2a, its own commit:** digest pins of `TowerPicture`'s calls, taken as `StreetPicture.test:112-125` takes the
     street's: a tower per roof kind with its roof in view, and a breached tower with its Layer rows in view. They are
     scaffolding, like the street's digest, and both are removed at U02's close-out.
   - **2b:** `CorridorShape` is a closed union (`long`, `service`, `curved`, `static`, and `none` for a corridor
     without one: the Artery's, a Layer's row), read from the content's key by one function at the edge that refuses
     an unknown one. The tower draws a row's corridor through `Record<CorridorShape, RowShape>`: `LongRow`,
     `ServiceRow`, `CurvedRow` and `StaticRow`, and `NoRow`, which draws the plain line a Layer row gets today
     (`TowerPicture.ts:363-365`). Each picture draws its roof through its own `Record<RoofKind, RoofDrawer>`: the
     street's `PeakRoof`, `MastRoof`, `BoxRoof` and `NoRoof`; the tower's `PeakRoof`, `MastRoof`, `BoxRoof` and
     `ParapetRoof`. `PeakRoof`, `MastRoof` and `BoxRoof` are shared classes, each built with a `RoofProportions`
     value (half width, rise, and the highest point the apex may reach).
   - Both pictures' digests stay equal. Retyped on purpose: `TowerPicture.test:11, 47`, `HudPresenter.test:691`,
     `Passages.test:39`.
3. **text-shaping and heading-colon.** `Phrase`, an engine value object, owns `capitalised()`. `Floor.readings`,
   `FloorFactory.create` and `HudPresenter` use it. The engine's `childrenHeading` answers without the colon (`Doors`,
   `Ride to a floor`), and the presenter stops cutting it. Test RED first: `Phrase`. The goldens do not change (their
   heading line comes through the presenter, `Goldens.test:37`); the diff is read if they do.
4. **canvas-font.** `CanvasFont`, a value object in `src/ui/canvas/`: the family and the 12 px floor; `at(weight, px)`
   refuses a size under the floor. Used by the four pictures. Test RED first: `CanvasFont` refuses 11 px. Guards:
   `Pictures.test`, `StreetPicture.test:141-152`, `TowerPicture.test:151-173`.
5. **picture-keys and host-query.** `main.ts` keys the registry by `STREET_KIND.key()` and `BUILDING_KIND.key()`.
   `HudView.#host` checks `instanceof HTMLElement`. No test: no behaviour changes, and a test would only detect the
   change.
6. **pad-marks and tear-decay.** The pad's `current`/`visited` come from the option (guarded by
   `HudPresenter.test:749-757`). `PlayerSummary` carries `decay` from `Coherence` (a number), and the presenter
   passes it through.
   - Test RED first: the engine's player summary carries the decay for a known coherence. `HudPresenter.test:654-658`
     moves to the engine.
   - Gains the field on purpose: the player literals in `Sessions.test:119, 122, 125, 129`, `GameEngine.test`
     (17, from 589 to 1129), `Lattice.test:230, 249`, `Descent.test:76, 81, 148`, and the player fixtures of the
     Reboot, Buffer, Hud, Recap, Title and Help presenter tests.
7. **reduced-motion.** `ReducedMotion` (`reduced(): boolean`), a small interface in `src/ui/`. Its one adapter,
   `BrowserReducedMotion` in `src/platform/`, is built in `main.ts` and handed to `Shell`, `HudView` (then
   `SceneView`) and `CanvasView`. Guards: `a11y.spec.ts:157-199` (the canvas stays still, the spotlight scrolls
   instantly) and `scene.spec.ts:158-188`.
8. **scene-events.** `SceneEvents`, a class: it makes `pick` and `light` events and reads an event's id once (the
   `unknown` detail checked there). `InputRouter` and `HudView` use it. Test RED first: a made event reads back its
   id; a foreign event or detail reads none. Guards for the wall "a tap in a picture resolves to an option id":
   `scene.spec.ts:118-131, 140-156`, and `94-116` for the light path.
9. **loose-functions.** `StylePalette`, a class built from a small `StyleSource` interface (a token's raw value; the
   canvas view's adapter reads the computed style). It caches until cleared on a new frame, and its `ink` method is
   handed out bound, once, as the `Palette`. `Easing` (`at(progress)`) with `EaseInOut` and `EaseOut`: `Tween` takes
   one, with no default. `Frame` (`of(place)`) replaces `frameOf`.
   - Test RED first: `StylePalette` reads a token once until cleared (a stub `StyleSource`).
   - Changed on purpose: `Tween.test`; `SceneTrip.ts:23, 27`; `SceneView.ts:213, 242`.
10. **child-seed.** `Seed.child(index)` owns "child `i` is born from `branch(i)`". `Progeny.exactly` and `Passages` use
    it, and `Passages` no longer takes a `Progeny`. Test: `Seed.child(i)` equals `branch(i)`. Guard: the peek pin,
    `Passages.test:42-55`.
11. **invariants.** `PixelBudget` refuses a limit that is not positive (test RED first). `Gesture`, a class: the
    command `move(along)` and the query `moved()`. `SceneView` asks `moved()` before and after a move, and captures
    the pointer when it turns true.
12. **camera-rules and still-camera.** `SceneCamera` becomes an interface answered by two classes. `TravelCamera` (the
    tower's, later the corridor's) owns the pace, the settle time, the clamp, the nearest stop, where a release comes
    to rest (coast and snap), and the value under a finger on the track. `StillCamera` (the street) never moves, and
    zooms. `ScenePicture.camera` never answers null. The tower's tuning numbers stay in `TowerPicture`.
    - Tests RED first: both cameras, with expected numbers worked out from today's formulas.
    - Rewritten on purpose: `TowerPicture.test:71-101`, which ask the camera's methods instead.
13. **command-or-query, mounted-state and frame-key.**
    - `SceneView.leads(id)` answers and `enter(id)` acts; `HudView.#through` asks, then tells.
    - `#mounted` holds the host, canvas, slider, observer and listeners, or nothing.
    - A trip carries its anchor from the start: `layout(vm, size, to)` gives it, which is pure. So `#zoomAt` changes
      nothing.
    - `SceneView.render` drops its `vm === this.#vm` check. `HudView`'s toggles repaint without rendering the scene
      again; a new host still gets a fresh view, rendered.
    - Guards: `scene.spec`, `tower.spec`; then the user's phone check of the tower. Where the zoom centres (the
      trip's anchor) is **UNGUARDED**: no assertion reads it; the phone check shows it.

### Second tier (after step 0; its own session)
14a. **door-look-type.** `DoorLook` and `Passage` become classes with `#private` fields and `equals`.
    `GameSnapshot.ts:11` and the architecture doc's snapshot line say "plain data and the engine's value objects".
    Rewritten on purpose: the look and passage literals listed at step 1.
14. **noise-value.** `PlaceSummary.noise` is the frame's `Seed`, and so is `SceneVM.noise`; `CoherenceFx` keeps its
    plans for the seed it was given (`equals`). Changed on purpose: `GameEngine.test:171, 291, 313-317` (by `equals`,
    else vacuous), `HudPresenter.test:623`, `StreetPicture.test:36`, `TowerPicture.test:57`, the presenters' fixtures
    (`noise: '0000-…'`), `CoherenceFx.test`. Found in the build: the two JSON round trips (`GameEngine.test`'s "step
    returns plain data", `HudPresenter.test`'s "the view-model is plain data") pinned the "JSON-safe" rule step 14a
    gave up; their JSON halves went, and `snapshot()` repeating `step` stays pinned.
15. **came-out-of.** Each trail step carries its address. `Retrace`, a small UI class unit-tested in node, finds the
    child whose address equals a step of the previous screen's trail (a floor in the corridor mode lists the
    apartments, a level down). `HudView` keeps the previous trail and asks it. No prefix rule, and no new saved state.
    - Tests RED first: the engine's trail steps carry their addresses; `Retrace` finds the child left, a level down
      too, and none on a new place.
    - The zoom out itself is **UNGUARDED** (nothing observes `arrive()`): checked on the phone.
    - Changed on purpose: `GameEngine.test:165`.
16. **levels, floor-numbers and layer-portrait.** A floor's figure row carries its number and whether it is a Layer
    (`Floor.figure`, `Layer.figure`), and `Building.portrait` lists a row for every level from the lowest open Layer
    to the top. The tower positions and colours by the row's number and flag; the pad sorts and labels by the row's
    number; nothing reads a number back from text. `ordinal` stays text. `Layer.portrait()` answers for the Layer
    itself. The Layer label stays `-1` until the open decision is made.
    - Tests RED first: the building's portrait lists the Layers' rows once breached; a Layer at its elevator hands
      its own portrait.
    - Changed on purpose: `HudPresenter.test`'s pad and drawing fixtures, `TowerPicture.test`'s fixtures, and the
      tower digests from 2a only if a row's number moves a call (read, then re-pinned).
    - Found in the build: the tower's `below` went — the rows hold the open Layers, so it would have been a second
      owner; the level is one optional field on `Figure` that extends the known smell `kinds-not-optionals` (named
      there). After its design check the level is a value object, `Level`: its number, its kind (`floor`/`layer`,
      the tower's looks by kind in a table of `LevelLook`s) and its label, so the open decision on the Layer label
      changes one place; it refuses a floor below 0 or a Layer at or above it; the pad groups the Layers by kind
      (`PadGroup`s), pinned for a breached building. The digests from 2a did not move.

### Shape table
| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `ValueEquality` | test support | the vitest setup (`vite.config.ts`) | objects with `equals` are compared by it | none |
| `ContentLibrary.triples` | method | `ContentLibrary` | how a three-column line is read | none |
| `DoorStateLook`, `MaterialFamily`, `CorridorShape` | closed unions | `Doors`, `Sentences` | which keys exist | one module-level reading function each: a factory at the content edge, holding the one type check (TS 5) |
| `DoorLook` | value object (step 14a) | `Doors.look` | a door's look by its keys and names | none |
| `Passage` | value object (step 14a) | `Passages.of` | a floor's corridor-to-be | none |
| `RowShape` + `LongRow`, `ServiceRow`, `CurvedRow`, `StaticRow`, `NoRow` | service | `TowerPicture` | how a row's corridor runs on the tower | none |
| `RoofDrawer` + `PeakRoof`, `MastRoof`, `BoxRoof`, `NoRoof`, `ParapetRoof` | service | each picture's table | how a roof is traced | none |
| `RoofProportions` | value object | each picture | a roof's size at that picture's proportions | none |
| `Phrase` | value object | engine | how text is capitalised for the screen | none |
| `CanvasFont` | service | `src/ui/canvas/` | the pictures' font and the 12 px floor | none |
| `ReducedMotion` / `BrowserReducedMotion` | interface / adapter | `src/ui/` / `src/platform/`, built in `main.ts` | whether motion is reduced | none |
| `SceneEvents` | service | `src/ui/scene/` | what a scene event is and how its id is read | none |
| `StylePalette` / `StyleSource` | service / interface | the canvas views | a token's colour where the canvas sits | none |
| `Easing`, `EaseInOut`, `EaseOut` | service | `Tween`'s callers | how a motion eases | none |
| `Frame` | service | the presenters | a place's frame colour name | none |
| `Seed.child` | method | `Seed` | a child's seed | none |
| `Gesture` | entity | `SceneView` | one finger's drag and whether it moved | none |
| `TravelCamera`, `StillCamera` | value object | the picture's `camera()` | how a view moves | none |
| `Retrace` | service | `HudView` | which child the traveller came out of | none |
| `PlayerSummary.decay` | field | `GameEngine` | the tear's strength | none |
| trail step `address` | field | `GameEngine` (`#summaryOf`) | where each step stands | none |
| `Level` | value object | `Floor.figure` (its kind from `levelKind()`, a Layer's own) | a level's number, kind and label; never a floor below 0 nor a Layer at or above it | none |
| `LevelLook` | value object | `TowerPicture`'s table by `LevelKind` | how a kind of level is drawn | none |
| `PadGroup` + `FloorsByTen`, `LayersTogether` | service | `HudPresenter`'s table by `LevelKind` | where a level falls on a pad by tens | none |

**Estimate** (final context of the building session, the unit the notes measure: the tokens actually processed run
32–72× it, `U01-cost.md:8-10`). The measured builds: U01a 390k (`U01.md:150`), U01b 320k (`U01b.md:147`). The first
tier touches more files than either but builds no new picture: about 350–450k. The second tier: about 200–300k, in its
own session. The design check: 20 commits × 40–60k of the agent's own context = 0.8–1.2M. In all, about 1.4–2.0M.

## Plan (after the corridor: `built-collaborators` and `one-job`, 2026-09-28) — amended after the grill

**Premise.** Nothing on screen changes. One commit per step below, each green on `npm run check`, its design check
before the next begins. After each commit that touches `SceneView`, `HudView`, `CanvasView` or `InputRouter`:
`npx playwright test e2e/scene.spec.ts e2e/tower.spec.ts e2e/fold.spec.ts e2e/a11y.spec.ts e2e/focus.spec.ts
e2e/map.spec.ts`; the baseline (taken 2026-09-28, session 5, without `map.spec`) is red at `scene.spec:72` and
`focus.spec:43` only, both by plan — a commit passes when that set is unchanged. `kinds-not-optionals` gets its own
plan once these land: its split maps the view model per picture, which `SceneDrawing` (step 4) creates.

**The line drawn (OO 4).** Handed in, through a small interface owned by its user: a service that holds a rule or
reaches the platform — the clock, the pictures, the hash, the roofs, the font, the door inks, the frame, the pad's
groups, the tear, the scene events, the easings, the canvases, and a picture's drawers with behaviour (the roof
drawers, the row shapes), as `CorridorParts` already is. Not handed in: a value made per call from the call's own
facts (`Tween`, `SceneTrip`, `TravelCamera`, `StillCamera`, `Level`, `Retrace`, a drag); a table of plain values
(`LevelLook`, which stays in `TowerPicture`); a view's own state holder (`CanvasSlots`, built by `HudView` from the
makers handed in).

**Found while planning:**
- **The engine's factories all build their parts** (`Passages`, and 17 more in `src/engine/procgen/`: `NameParts`,
  `Progeny`, `Doors`, `Sentences`, `Deal` …), wired by `LocationRegistry`. Converting `Passages` alone leaves two
  patterns (the lesson "two places sharing a pattern"): all 18 go together, step 8 (the user's pick, 2026-09-28).
- **`Passages` no longer takes a `Progeny`** (step 10 of the plan above removed it): that part of the item is done.
- **`Shell` builds its `InputRouter`, and `InputRouter` its `SceneEvents`**: the same pattern, older; handing
  `SceneEvents` in would make `Shell` carry it through. Both logged as HK-028, not fixed here.
- **`Gesture.onSlider()` is asked in two places** (`SceneView.ts:537, 570`): both go with step 7's two drags.
- **The slider's pointer use, name and value text have no test** (`tower.spec:23` finds it by role alone): step 7.0.

**Walls touched and their guards:** reduced motion — `a11y.spec`, `scene.spec:158`; picture text at 12 px or more —
`Pictures.test`, `CanvasFont.test`; a view carries no words — `ViewsCarryNoWords` (it scans `screens/*View.ts`; the
slider's name comes from `vm.slider`); a tap in a picture resolves to an option id — `scene.spec:118, 140`.

### Steps
1. **picture-parts.** `ScenePictures`, a factory (the composition root's scene part, its reason in a comment): builds
   the street, the tower and the corridor with their parts, the hash and the roofs shared. `StreetPicture` and
   `TowerPicture` take their parts (font, hash, roofs, inks, roof drawers, row shapes) as `CorridorPicture` does;
   `Roof` takes its hash. `main.ts` builds the registry from it. Tests build the street and the tower through it;
   `CorridorPicture.test` keeps its own builder (it hands in its own `HallEnd`); `TowerPicture.test:219` builds `Roof`
   with a hash. Guards: the picture tests and the two digest pins, unchanged.
2. **presenter-helpers.** `Frame` handed to the four presenters that build one (Buffer, Recap, Help, Hud), through a
   small interface; `Masthead` becomes a small interface in `src/ui/` (`name`, `buildLine`), the class
   `BuildMasthead`. Changed on purpose: `Goldens.test:12`, `Masthead.test:8`, the six presenter tests' setup;
   deleted: `Masthead.test:11` (the same behaviour as `:10`).
3. **hud-view-wiring.** `Clock` (`now`, `subscribe`) and `Pictures` (`picture(key)`), small interfaces owned by the
   scene and `HudView`; `MotionClock` and `SceneRegistry` answer them. `HudView` takes a `SceneViews` factory and a
   `CanvasViews` factory (a method per slot); `MapPicture` and `TracePicture` take their font. All built in
   `main.ts`. `Pictures.test:77, 99, 121, 140, 171` build them with a font. Guard: the browser set.
4. **hud-presenter-jobs.** `HudPresenter.#drawing` becomes `SceneDrawing` (a place and its travel options → the
   `SceneVM`) and `#pad` becomes `FloorPad` (the travel rows → the pad, with its `PadGroup` table), each handed in
   through a small interface. The drawing tests (`HudPresenter.test:597-738`) and the pad tests (`:740-801`) move
   down to `SceneDrawing.test` and `FloorPad.test` (testing principle 4); deleted on the way: `:785` (the pad's
   wording only) and `:798` (the same branch as `:797`). `HudPresenter.test` keeps one test that the view model carries
   a drawing and a pad; `Goldens.test:12` builds the presenter with both. The goldens do not change.
5. **pixel-canvas.** `PixelCanvas`: a canvas in a host, sized in device pixels within the `PixelBudget`, its
   `StylePalette`, its removal. `CanvasView` and `SceneView` both hold one, made by a `Canvases` factory handed in
   (the palette needs the element). `CanvasMount` goes; `SceneMount` loses the canvas. Guards: `scene.spec:158-206`
   (the still frame and the tear), `map.spec:36-48` (the map and trace canvases fill and paint), `fold.spec`.
6. **scene-tear-and-zoom.** `TearPass` (the `CoherenceFx` plan drawn over the frame, `SceneView.ts:450-487`) and
   `Zoom` (a trip's zoom or the way back out, and the transform it puts on the canvas, `:404-447`). Test RED first:
   `Zoom` — at scale 1 the anchor stays put, fully zoomed it sits in the middle. That closes the UNGUARDED zoom anchor
   of step 13 above.
7. **scene-slider.**
   - **7.0, its own commit before any production change:** `tower.spec` finds the slider by role and name (the
     list's heading) and checks its value text names a floor; a pointer down on its track changes `aria-valuenow`,
     and a drag along it changes it again. Green against today's code.
   - `SceneSlider` owns the `role=slider` element: placed on the camera's track, its value and name, its arrow keys.
     `Drag`, one interface, answered by `PictureDrag` (past the slop, one to one) and `SliderDrag` (the track under
     the finger); `Gesture` splits into them and the `onSlider()` branch goes. `SceneMount` goes. `Gesture.test`
     splits into the two drags, its pointer-id test kept once. Guards: step 7.0, `tower.spec:17, 46`.
8. **engine-parts.** The 18 files in `src/engine/procgen/` that build their helpers take them in their constructor,
   through one small interface per role, owned in `procgen/` and shared by the factories that use it (the names, the
   children, the sentences, the doors, the deal …). `LocationRegistry` — the engine's composition root, built in
   `main.ts` — builds each helper once and hands it in. Guards: the goldens (`Goldens.test`: any change to what the
   world generates shows there) and the engine tests, unchanged; no test builds a factory directly.
   - Found in the build: handing in `Progeny`, `NameParts` and `Sentences` ready-made would move each factory's own
     facts (how many children and of which kind, which name list, which sentences) into the registry. So those three
     come through makers (`Offspring`, `NameLists`, `LineDecks`), and each factory asks with its own facts.

Then the user checks the tower and the corridor on the phone (no corridor scene test exists in `e2e/`): drag,
slider, pad ride, zoom in and out.

### Shape table
| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `ScenePictures` | factory | `main.ts` | which parts each picture is built with | none |
| `Masthead` / `BuildMasthead` | interface / service | `src/ui/`, the presenters | the game's name and build line | none |
| `FrameOf` / `Frame` | interface / service | the four presenters | a place's frame colour name | none |
| `Hash`, `Roofs` / `SceneHash`, `Roof` | interfaces / services | `Roof`, `StreetPicture`, `TowerPicture` | a text's fraction; a building's roof kind | none |
| `SceneDrawing` + interface | service | `HudPresenter` | how a place and its options become the picture's view model | none |
| `FloorPad` + interface | service | `HudPresenter` | how numbered rows group into a pad | none |
| `Clock`, `Pictures` | interfaces | the scene, `HudView` | what their users ask of the clock and the registry | none |
| `SceneViews` / `SceneViewMaker` | interface / factory | `HudView`, `main.ts` | how a scene view is made for a picture | none |
| `CanvasViews` / `CanvasViewMaker` | interface / factory | `HudView`, `main.ts` | how each canvas slot's view is made | none |
| `PixelCanvas` / `Canvases` | entity / factory interface | `CanvasView`, `SceneView` | a canvas's pixel size within the budget, and its inks | none |
| `TearPass` + interface | service | `SceneView` | how the tear is drawn over a frame | none |
| `Zoom` | value object | `SceneView` (per frame) | the canvas transform of a zoom at a moment | none |
| `SceneSlider` | entity | `SceneView` | the slider element's place, value and keys | none |
| `Drag` + `PictureDrag`, `SliderDrag` | interface + entities | `SceneView` | where one finger moves the view | none |
| `Easing`, `SceneEvents` | existing interface / service | `SceneView` | handed in, no new type | none |
| one interface per procgen helper role | interfaces | `src/engine/procgen/` | what a factory asks of a helper | none |

**Estimate** (the unit the notes measure: this conversation's final context, plus the agents): the build about
350–450k; 8–18 design checks at 30–60k, 0.3–0.9M; this plan's grill measured 139k. In all about 0.9–1.5M.
