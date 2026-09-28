# U02 — the design fixes (tracker)

**What this is:** every break of the OO principles and the TypeScript and OO rules in `CLAUDE.md`, and of the queue's
Decision 14 ("the UI never re-derives a rule"), in the code the UI rework wrote: U01a, U01b and U02 so far
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

**Open decision:** `floor-numbers` changes what the tower draws. It could write a Layer as the game names it (`-0x1`,
from `Layer -0x1`), or keep `-1`. Nothing else here changes the screen. Pick: _not yet made_.

## The UI works out rules the game should hand it (Decision 14)

- [ ] **door-keys — door looks by their display name.** `DoorLooks.INKS` is keyed by `Frozen`/`Cold`/`Static`, the
  words shown to the player. Fix: `themes/doors/states.txt` and `materials.txt` get a key column (a state's look
  `frost`/`cold`/`static`/`plain`; a material's family `glass`/`metal`/`stone`/`timber`/`bone`), `DoorLook` carries
  the keys as a closed set made where the content loads, an unknown key refused there (today it draws plain), and the
  UI maps only that set. (OO 1, 6; TS: parse at the edge.)
  Done: —
- [ ] **levels — the tower works out levels itself.** `TowerPicture` reads "below the bedrock" from a negative number
  (`level < 0`, `#frame`'s `min = -below`) and positions floors by `Number(child.ordinal)`. Fix: the engine hands each
  level its number and whether it is a Layer.
  Done: —
- [ ] **came-out-of — which place you came out of, from address text.** `HudView` finds it with
  ``last.startsWith(`${child.address}.`)``, which re-derives the address rule the engine owns. Fix: the engine says
  which child the traveller came out of. (OO 6.)
  Done: —
- [ ] **tear-decay — the tear strength is computed by the presenter.** `HudPresenter` builds
  `new Coherence(player.coherence)` to call `decay()`. Fix: the snapshot's player carries the decay.
  Done: —
- [ ] **floor-numbers — floor numbers read back from their display text.** `HudPresenter.#pad` (`Number(ordinal)`
  four times) and `TowerPicture:69, 207, 486`. The tower also writes a Layer as `-1` where the game names it
  `Layer -0x1` (Decision 2). Fix: read the level number from `levels`; the Layer label per the open decision above.
  **The tester sees this one** if the label changes.
  Done: —
- [ ] **noise-value — the frame's seed goes over as text and is parsed back.** `PlaceSummary.noise` is
  `frame.toString()`; `CoherenceFx` rebuilds it with the engine's `Seed.parse` and quietly falls back to
  `new Seed(0, 0)` when that fails. Fix: the snapshot carries a noise value, not a string to parse. (OO 6; TS: parse
  at the edge.)
  Done: —

## Choosing what to draw by comparing text (OO 3, 5)

- [ ] **shape-drawers — corridor shapes and roofs picked by if/else on text.** `TowerPicture.#corridor`
  (`shape === 'curved'/'service'/'static'`) and the roof chains in `StreetPicture` and `TowerPicture`
  (`kind === 'peak'/'mast'/'box'`, two copies). Fix: one drawer per shape and per roof, found by key, shared by the
  pictures that draw them; the shape keys a closed set made where the content loads, an unknown one refused there
  (today it draws as a long corridor). (TS: parse at the edge.)
  Done: —
- [ ] **still-camera — the street's missing camera is `null`, checked about ten times.** `SceneView` branches on
  `camera === null`, `camera.zoom === false`, `camera.drag === 0`. Fix: a still camera that answers for itself.
  Done: —

## Behaviour kept away from its data (OO 2)

- [ ] **child-seed — a seed helper that uses no state.** `Progeny.childSeed` uses nothing of its `Progeny`, and
  `Passages` builds a `Progeny` only to call it. Fix: the child-seed rule in one honest place.
  Done: —
- [ ] **camera-rules — the camera's rules live in the scene host.** `SceneCamera` is plain data; `SceneView` computes
  the trip pace (`#pace`), the settle time (`#up`), the clamp, the nearest stop and the slider track's value, and
  `TowerPicture` holds the car's motion tuning (`PACE`/`SETTLE`/`COAST`). Fix: a camera object owns them (with
  `still-camera`, this takes two jobs out of `SceneView`).
  Done: —
- [ ] **loose-functions — loose functions holding logic.** `stylePalette` (`src/ui/canvas/StylePalette.ts`: a cache
  in a closure, rebuilt every frame by `SceneView.#paint`), the easings `easeOut`/`easeInOut` (`src/ui/scene/Tween.ts`,
  held by `Tween` as a function in its `#easing` field), and the older `frameOf` (`src/ui/Frame.ts`) of the same
  pattern. Fix: objects. `systemOption` stays: it is a factory, a named reason. (TS: behavior is methods.)
  Done: —

## One fact, several owners (OO 1)

- [ ] **text-shaping — capitalising in three places.** `HudPresenter.#capitalised`, `Floor.readings` (the zone),
  `FloorFactory.create` (the culture in the sentence). Fix: one owner.
  Done: —
- [ ] **reduced-motion — "is motion reduced?" asked of the browser in three places.** `SceneView:287`, and the older
  `CanvasView:70` and `Shell:152`. Fix: one reduced-motion adapter built in `main.ts` and handed in, behind a small
  interface owned by the code that asks. (OO 4 too.)
  Done: —
- [ ] **scene-events — the picture events read in two places.** The `{ id }` of `pick`/`light` is parsed in
  `InputRouter.#pick` and `HudView.#litOf`; `SceneEvents` owns only the names. Fix: `SceneEvents` makes and reads
  them, the event's `unknown` detail checked there once. (TS: parse at the edge.)
  Done: —
- [ ] **canvas-font — the canvas font and the 12 px text floor restated.** `MONO` in `StreetPicture`,
  `TowerPicture`, and the older `MapPicture`, `TracePicture`; `TEXT = 12` in both scenes. Fix: one owner for all four
  pictures.
  Done: —
- [ ] **heading-colon — the list heading's colon stripped twice.** `HudPresenter` strips `:` for the heading and for
  the slider's name. Fix: with `text-shaping`'s one owner of text shaping.
  Done: —
- [ ] **pad-marks — the pad keys' marks read off the display.** A key's `current`/`visited` come from whether its
  row got a mark (`row.mark !== null`, `row.seen !== null`). Fix: from the option's own `current`/`visited`.
  Done: —
- [ ] **door-look-type — the door look's shape restated.** `SceneVM` declares its own `Look` beside the engine's
  `DoorLook`, accepted where a `DoorLook` is expected only because it has the same shape. Fix: one type, carrying
  `door-keys`' keys, a small class with `#private` fields; `Passage` likewise (today any `{ shape, looks }` literal
  passes, as `NO_PASSAGE` and `Passages.of` build them). (TS: shape is not identity.)
  Done: —
- [ ] **picture-keys — picture names typed twice.** `main.ts` registers `street` and `building` as literals; the
  engine's kinds own those keys (`STREET_KIND`, `BUILDING_KIND`). Fix: key the registry by the kinds' keys (the
  corridor would add a third copy).
  Done: —

## Rules added since the audit (OO 7, 9, 11; TypeScript and OO)

- [ ] **layer-portrait — a Layer inherits the floor's picture data.** `Layer` overrides `drawing()` to its own key
  but inherits `Floor.portrait()`, so at the elevator it hands the tower's figure to the Layer's picture — harmless
  only while no Layer picture is registered (U04). `Floor`'s `passage?` and `Corridor`'s `shape?` are optional only
  because `Layer` and `Artery` inherit those constructors without them. Fix: the Layer answers `portrait()` for
  itself; `passage` and `shape` required, `Layer` and `Artery` passing their empty value. (OO 9.)
  Done: —
- [ ] **command-or-query — two `SceneView` methods both change state and answer.** `enter(id): boolean` starts a
  ride and says whether it took the pick (`HudView` reads the answer); `#zoomAt`, a question, writes
  `#tripAnchor ??=`. Fix: `leads(id)` answers, `enter(id)` acts; the anchor set when the ride starts, `#zoomAt` pure.
  (OO 11.)
  Done: —
- [ ] **mounted-state — fields set together kept side by side.** `SceneView`'s `#host`, `#canvas`, `#slider`,
  `#observer`, `#listeners` (each `| undefined`) and `#trip` beside `#tripAnchor`; `dispose` clears the trip and
  leaves its anchor. The older `CanvasView` (`#canvas`, `#observer`) shares it. Fix: one `#mounted` record or
  `undefined`, one trip-with-its-anchor or `undefined`. (TS: a union of valid shapes.)
  Done: —
- [ ] **kinds-not-optionals — missing parts as optional fields, nulls and empty strings.** `Figure` is a bag of
  optional parts for four kinds (`tower?`, `shape?`, `looks?`, `door?`), paid for in `HudPresenter` (`?? 0`, `?? ''`,
  `?? []`) and `Building` (`?? { floors: 0, doors: 0 }`); `SceneVM` flattens the same kinds onto every child; empty
  strings as flags (a floor's `indexLabel ''`, `Corridor`'s `shape ?? ''`, `SceneVM`'s `shape` and `slider`); `null`
  inside types (`SceneVM`'s `door` and `tower`, `SceneCamera`'s `track`, `HudVM`'s `position` and `pad`,
  `GameOption`'s and `PlaceSummary`'s `figure`; the older `HudVM` `map`/`trace`/`sealedNote` share it). Fix: one
  member per kind, and an empty member that answers for itself where a part is missing (with `still-camera`).
  (TS: a union of valid shapes.)
  Done: —
- [ ] **frame-key — "is this the same frame" by object identity.** `SceneView.render` returns early on
  `vm === this.#vm`, true only because `HudView` passes the same object again on its own toggles. Fix: compare a
  stable key the view-model carries. (TS: objects are equal by reference; OO 6.)
  Done: —
- [ ] **invariants — objects left or built invalid.** `SceneView` writes `gesture.moved = true` on a plain record
  whose rule ("moved means the pointer is captured") it keeps itself; `PixelBudget` accepts a limit of zero or less,
  and its `ratio()` is then NaN. Fix: a gesture class whose `move(along)` owns `moved`; `PixelBudget` refuses a limit
  that is not positive. (OO 7.)
  Done: —
- [ ] **host-query — an unchecked narrowing.** `HudView.#host` returns `querySelector(...)` as `HTMLElement | null`,
  the element type taken on trust from the return type (an older line, widened by the rework). Fix: an
  `instanceof HTMLElement` check inside `#host`. (TS: a cast is a promise.)
  Done: —

## After the corridor

- [ ] **built-collaborators — classes build their helpers, or take them as concrete classes.** Built inside:
  `SceneView` (`CoherenceFx`, `PixelBudget`), `CanvasView` (`PixelBudget`), `StreetPicture` and `TowerPicture`
  (`SceneHash`, `Roof`, `DoorLooks`), `Roof` (`SceneHash`), `Passages` (`Sentences`, `Doors`), `HudView`
  (`SceneView`, and the older `CanvasView` with its `MapPicture`). Taken as concrete classes: `MotionClock`,
  `SceneRegistry`, `Progeny` in `Passages` (the older presenters' `Masthead` likewise). Fix: built in `main.ts` and
  handed in through small interfaces owned by the code that uses them (a clock, the pictures, a child seed); `HudView`
  gets a scene-view factory. (OO 4.)
  Done: —
- [ ] **one-job — `SceneView` and `HudPresenter` each carry several jobs.** After `camera-rules`, `still-camera`,
  `reduced-motion` and `scene-events`, `SceneView` still holds the canvas sizing and mounting, the pointer gestures,
  the slider control, the trip and zoom, and the tear's painting; `HudPresenter` also maps figures into the `SceneVM`
  (`#drawing`) and holds the pad's grouping rule (`#pad`). Fix: each its own object, handed in. (OO 8.)
  Done: —

## Logged, not fixed (no check box)

- `HudView` has several jobs too (OO 8): the templates of the HUD, card, list, dock and debug strip; the scene view's
  lifetime; the lit child kept in step between list and picture; the pad's group state; the map and trace slots; the
  dock and debug folds. Mostly older code: its split is a wave of its own.
