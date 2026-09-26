# U02 — the design fixes (tracker)

**What this is:** every break of the eight design principles (`.claude/CODEX.md`, the OO table) and of the queue's
Decision 14 ("the UI never re-derives a rule") in the code the UI rework wrote: U01a, U01b and U02 so far
(`git diff cdff32d~1 e577e8f -- web/src`). Items 1–5 were found in U02 session 1. Items 6–19 come from the audit of
all the rework's code on 2026-09-26. None of them was in a backlog or a lesson. This file is the one list; the U02 note
points here. They are fixed in one go, before the corridor (U02 "Left to do", step 2).

**How to mark:** `[ ]` open · `[~]` in progress · `[x]` done, with the commit that did it on its `Done:` line.
When one fix reaches an older file because it shares the pattern, that file is fixed too (two places sharing a pattern
are fixed together) and is named in the item.

**Open decision:** item 8 changes what the tower draws. It could write a Layer as the game names it (`-0x1`, from
`Layer -0x1`), or keep `-1`. Nothing else here changes the screen. Pick: _not yet made_.

**Progress:** 0 of 19 done.

## The UI works out rules the game should hand it (Decision 14)

- [ ] **1. Door looks by their display name.** `DoorLooks.INKS` is keyed by `Frozen`/`Cold`/`Static`, the words
  shown to the player. Fix: `themes/doors/states.txt` and `materials.txt` get a key column (a state's look
  `frost`/`cold`/`static`/`plain`; a material's family `glass`/`metal`/`stone`/`timber`/`bone`), `DoorLook` carries
  the keys, and the UI maps only that closed set. (Principles 1, 6.)
  Done: —
- [ ] **5. The tower works out levels itself.** `TowerPicture` reads "below the bedrock" from a negative number
  (`level < 0`, `#frame`'s `min = -below`) and positions floors by `Number(child.ordinal)`. Fix: the engine hands each
  level its number and whether it is a Layer.
  Done: —
- [ ] **6. Which place you came out of, from address text.** `HudView` finds it with
  ``last.startsWith(`${child.address}.`)``, which re-derives the address rule the engine owns. Fix: the engine says
  which child the traveller came out of. (Principle 6.)
  Done: —
- [ ] **7. The tear strength is computed by the presenter.** `HudPresenter` builds `new Coherence(player.coherence)`
  to call `decay()`. Fix: the snapshot's player carries the decay.
  Done: —
- [ ] **8. Floor numbers read back from their display text.** `HudPresenter.#pad` (`Number(ordinal)` four times) and
  `TowerPicture:69, 207, 486`. The tower also writes a Layer as `-1` where the game names it `Layer -0x1` (Decision 2).
  Fix: read the level number from item 5; the Layer label per the open decision above. **The tester sees this one**
  if the label changes.
  Done: —
- [ ] **9. The frame's seed goes over as text and is parsed back.** `PlaceSummary.noise` is `frame.toString()`;
  `CoherenceFx` rebuilds it with the engine's `Seed.parse`. Fix: the snapshot carries a noise value, not a string to
  parse. (Principle 6.)
  Done: —

## Choosing what to draw by comparing text (principles 3, 5)

- [ ] **2. Corridor shapes and roofs picked by if/else on text.** `TowerPicture.#corridor`
  (`shape === 'curved'/'service'/'static'`) and the roof chains in `StreetPicture` and `TowerPicture`
  (`kind === 'peak'/'mast'/'box'`, two copies). Fix: one drawer per shape and per roof, found by key, shared by the
  pictures that draw them.
  Done: —
- [ ] **11. The street's missing camera is `null`, checked about ten times.** `SceneView` branches on
  `camera === null`, `camera.zoom === false`, `camera.drag === 0`. Fix: a still camera that answers for itself.
  Done: —

## Behaviour kept away from its data (principle 2)

- [ ] **4. A seed helper that uses no state.** `Progeny.childSeed` uses nothing of its `Progeny`, and `Passages`
  builds a `Progeny` only to call it. Fix: the child-seed rule in one honest place.
  Done: —
- [ ] **10. The camera's rules live in the scene host.** `SceneCamera` is plain data; `SceneView` computes the trip
  pace (`#pace`), the settle time (`#up`), the clamp, the nearest stop and the slider track's value. Fix: a camera
  object owns them (with item 11, this takes two jobs out of `SceneView`).
  Done: —
- [ ] **19. Loose functions holding logic.** `stylePalette` (`src/ui/canvas/StylePalette.ts`: a cache in a closure,
  rebuilt every frame by `SceneView.#paint`), the easings `easeOut`/`easeInOut` (`src/ui/scene/Tween.ts`), and the
  older `frameOf` (`src/ui/Frame.ts`) of the same pattern. Fix: objects. `systemOption` stays: it is a factory, a named
  reason.
  Done: —

## One fact, several owners (principle 1)

- [ ] **3. Capitalising in three places.** `HudPresenter.#capitalised`, `Floor.readings` (the zone),
  `FloorFactory.create` (the culture in the sentence). Fix: one owner.
  Done: —
- [ ] **12. "Is motion reduced?" asked of the browser in three places.** `SceneView:287`, and the older
  `CanvasView:70` and `Shell:152`. Fix: one reduced-motion adapter built in `main.ts` and handed in (principle 4 too).
  Done: —
- [ ] **13. The picture events read in two places.** The `{ id }` of `pick`/`light` is parsed in
  `InputRouter.#pick` and `HudView.#litOf`; `SceneEvents` owns only the names. Fix: `SceneEvents` makes and reads them.
  Done: —
- [ ] **14. The canvas font and the 12 px text floor restated.** `MONO` in `StreetPicture`, `TowerPicture`, and the
  older `MapPicture`, `TracePicture`; `TEXT = 12` in both scenes. Fix: one owner for all four pictures.
  Done: —
- [ ] **15. The list heading's colon stripped twice.** `HudPresenter` strips `:` for the heading and for the slider's
  name. Fix: with item 3's one owner of text shaping.
  Done: —
- [ ] **16. The pad keys' marks read off the display.** A key's `current`/`visited` come from whether its row got a
  mark (`row.mark !== null`, `row.seen !== null`). Fix: from the option's own `current`/`visited`.
  Done: —
- [ ] **17. The door look's shape restated.** `SceneVM` declares its own `Look` beside the engine's `DoorLook`. Fix:
  one type, carrying item 1's keys.
  Done: —
- [ ] **18. Picture names typed twice.** `main.ts` registers `street` and `building` as literals; the engine's kinds
  own those keys (`STREET_KIND`, `BUILDING_KIND`). Fix: key the registry by the kinds' keys (the corridor would add
  a third copy).
  Done: —

## Logged, not fixed (smells: no item, no check box)

- `Figure` is a bag of optional parts for four kinds (`floors: 0` filler), and `SceneVM`'s child flattens it the same
  way (`floors`, `doors`, `landmark`, `sealed` on every child).
- Empty strings as flags: a floor's `indexLabel ''` means no position; `shape` and `slider` are `''` for none.
- `SceneView` is 680 lines with six jobs (items 10 and 11 take two out); `HudView` is 678 lines and now also binds
  the scene (`#scene`, `#lit`, `#last`, `#group`).
