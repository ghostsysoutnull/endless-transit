# The picture-first UI rework: how the mock maps onto the web game

**For:** the sessions that run `tasks/UI_QUEUE.md` (its Decisions win over this file). **Look:** the mock
`docs/analysis/mocks/transit-reframed.html` (one self-contained page; its code is a sketch, not a module to copy) and
`docs/analysis/mocks/pole-wireframe.html`. **Facts** below were read from `web/` at `e7a08b2` (2026-09-24); a citation
is `path:line` under `web/`. Re-read a line before building on it.

## 1. What exists

- **The loop** (`src/ui/Shell.ts:16-165`): input → `engine.step` → the first `ScreenStage` whose presenter `accepts`
  the snapshot (`:58`) → `Presenter.toViewModel` → `View.render` (lit-html). The shell owns the one live region
  (`:83-90`), the focus rule (`data-option`, `data-rest`, `opposite`, `:118-142`), the spotlight on `[data-spot]`
  (`:150-155`) and the scroll to the top on a new scene (`:162`). Stages are built in `src/main.ts:43-51`.
- **The world screen** is `HudPresenter` (`toViewModel` `:87-221`: options split by `role` into rows, moves, dock,
  take, debug) and `HudView` (`#template` `:99-294`: bar, HUD with crumbs / meter / stats, the place card with tags
  and moves, the scan / map / trace panels, the side list, the dock with its MORE fold, the debug strip). CSS:
  `src/styles/app.css`, 1,608 lines (desktop grid `:1393-1412`, frames `:278-342`, reduced motion `:1599`).
- **The canvas pattern** (`src/ui/canvas/`): a `Picture` is `height(vm, width)` plus a pure
  `paint(painter, vm, size, palette, phase)` (`Picture.ts:15-19`); `CanvasView` mounts an `aria-hidden` canvas, sizes it
  to its host at up to 2× density, reads colour tokens from CSS, and runs **one `requestAnimationFrame` loop a canvas**
  with a phase of 1.8 s (`CanvasView.ts:21-121`, loop `:67-74`); reduced motion stops the loop and paints one still
  frame (`:43-51`). `CanvasSlots` binds named pictures to hosts (`pane`, `map`, `trace` in `HudView.ts:45-49`).
  Existing pictures: `MapPicture`, `TracePicture` (a thread and plates, `TracePicture.ts:24-97`).
- **What a snapshot carries** (`src/engine/rules/GameSnapshot.ts:12-31`): the place as a `PlaceSummary`
  (`PlaceSummary.ts:6-38`: kind, icon, name, address, depth, position, trail, status, description, `facts`, frame,
  abyssal, contents, telemetry, lattice), the player, the buffer, the prompt, the options (`GameOption.ts:11-38`: id,
  key, label, place, role, sealed, landmark, ordinal, `readings`, opposite, current, visited), and the one-step panels
  scan / map / trace (cleared every step, `GameEngine.ts:332-334`). A `Fact` is `{key, label, value}`, strings only
  (`model/Fact.ts:2-7`).

## 2. The mock, piece by piece, onto the layers

| Mock piece | Becomes | Notes |
| :-- | :-- | :-- |
| Scene drawings (street, tower, corridor, plan, room; universe…city in the trace) | `Picture`s in `src/ui/canvas/`, fed a VM from `HudPresenter` (or a new scene presenter) | the law holds: a picture is a pure function of plain data; **camera, car and pan positions are inputs to it**, owned by a UI-side motion object, never by the picture |
| Motion clock, tweens, momentum, the in/out zoom | a UI service (one clock for the page, not one loop a canvas); the scene host asks it each frame | `CanvasView`'s own loop and 1.8 s phase become the fallback for the small pictures, or are folded into the clock — the note decides |
| Hit areas in the picture | the picture returns its hit regions with the frame; a tap resolves to an **option id** and goes through the same path as a button (`InputRouter`) | the list stays the accessible twin: every tappable thing is also a real `button[data-option]` |
| Depth rail, trace column, dive, pole | views over the snapshot's trail; the column's bands and the pole reuse the scene pictures in a small size | the trace panel today lives one step (`GameEngine.ts:239-257`); the column opens over the screen and needs the trail every step — the note decides whether it rides on `PlaceSummary.trail` or keeps the command |
| Coherence effects | a post-pass of the scene host, seeded from `FrameEntropy` (web/CLAUDE.md: noise from the place and the step, never the clock) | the tear and grain patterns are seeded; only their animation reads the clock |
| Apartment plan layout | a pure function in the UI of the apartment's room count and its address | presentation, not a game rule: the engine does not know walls; fog comes from the visited marks the snapshot already carries |

## 3. What the engine must hand over (Decision 14: data, not re-derived rules)

Read today (all as strings inside `facts` / `readings` / trace `meta`):
- era and culture: planet (`Planet.ts:41-46`), street (`Street.ts:29-35`), building (`Building.ts:244-252`),
  corridor (`Corridor.ts:70-72`), elevator floor (`ElevatorState.ts:62-75`); trait: country (`Country.ts:44-46`), the
  elevator's ATMOS_SHIFT (`ElevatorState.ts:73`); a rebel city only as an alert fact and a VOLATILE status
  (`City.ts:41-54`); a room's era as TEMPORAL_MARKER (`Room.ts:304-315`).

**Missing, and needed** (U05 for the vibe, earlier where a scene needs a count):
- the **second culture and era** (`Vibe.ts:46,50` are read only inside the engine) and the **stability** as a number;
- **rebel** as a boolean, not an alert string;
- the **apartment's own culture, era and anomaly** (`Apartment.ts:80-85`; an apartment is never stood in —
  `arrival()` goes to its first room, `Apartment.ts:114` — so its facts never reach the screen), and whether it
  **drifted** (drew the second pair);
- **counts as numbers**: a building's floors and doors a floor (`Building.ts:80`), an apartment's rooms
  (`Apartment.ts:94`); today they are only row counts or `position.total`;
- a **door's state as data** (it is folded into the door's name by `Door.brief()`, `Door.ts:51`).
Shape: one typed field on `PlaceSummary` (and on travel options for the children a scene draws) — e.g. a `vibe`
summary `{ era, culture, secondEra, secondCulture, stability, trait, rebel, drift }` — each with its row in the note's
Shape table. Facts stay for the words; the pictures read the typed fields.

## 4. Laws the mock breaks, which the game keeps

- **Text in a picture is ≥ 12 px** (`tests/ui/canvas/Pictures.test.ts`); the mock draws 8–11 px labels. Keep 12 px:
  fewer labels, shorter ones, or labels outside the canvas.
- **No `opacity:` below 1 in CSS, every text colour ≥ 4.5:1** (`tests/ui/styles/Contrast.test.ts`); the mock dims
  bands with opacity. Dim with colour tokens instead.
- **Views carry no words** (`tests/ui/screens/ViewsCarryNoWords.test.ts:11-15`): every label a picture draws comes
  from its VM, written by a presenter.
- **Every `[role=img]` is named** and reduced motion paints a still canvas (`e2e/a11y.spec.ts`): the scene canvas
  gets a summary label from its presenter.
- **The first screen** (`e2e/fold.spec.ts`): on every screen kind, at the device size and at 360 × 640, the first
  `button[data-option]` outside the dock and the debug strip is fully in view above a sticky dock; every button is
  ≥ 44 × 44; no sideways scroll. **A picture on top pushes the list down** — U01b must choose: a picture short enough on
  a phone, the place's first move in the card above the picture, or the move in the dock. The rule does not bend.
- **Noise is seeded, never the clock** (web/CLAUDE.md): the mock seeds its effects from the frame counter; the game
  seeds them from `FrameEntropy`.

## 5. Tests the rework will change (Decision 16: on purpose, named in the note)

- **Goldens** (`tests/goldens/*.txt`, 3 seeds, 483 lines) pin every word of `HudVM` through `HudPresenter`
  (`tests/content/Goldens.test.ts:12-63`); each iteration that changes a word regenerates them with
  `npx vitest run tests/content/Goldens.test.ts -u` and reads the diff line by line.
- **`tests/ui/screens/HudPresenter.test.ts`** (890 lines, 8 blocks) pins the HUD's VM; it moves with the presenter.
- **e2e selectors most used**: `place-kind` (89), `place-name` (67), `status` (29), `world-seed` (28),
  `coherence` (23), `button[data-option^="enter:"]` (22), `button.tile` (17), `.cv` (13), `map` (13), `.vh li` (12),
  `telemetry` (11); the harness opens the `more` and `debug-toggle` folds (`e2e/support/harness.ts:21-43`). Keep the
  test ids where the thing survives; retire them with the thing.
- Specs by theme: `a11y`, `announce`, `focus`, `fold` (the rules above), `buildings`, `world`, `items`, `survival`,
  `map` (trace heading, `.vh li` lines, canvas painted), `richness`, `ritual`, `resilience`, `title`, `help`,
  `playthrough`. The phone profile, one worker.

## 6. How the mock was checked (reuse it)

- Real drags and taps with Playwright in both profiles (desktop 1360×940, phone 390×844 touch); screenshots looked at.
- Smoothness measured, not guessed: with the phone profile and the devtools protocol's
  `Emulation.setCPUThrottlingRate` at 4, log `requestAnimationFrame` gaps during a zoom, a long ride, a scrub and a
  pan; separately time the page's own work a frame. The mock's own work was 1–3 ms a frame; the 4× throttled
  headless compositor, not the page, set the floor.
- Lessons from its bugs: a name that shadows a function kills the frame loop (schedule the next frame first); every
  per-canvas hidden buffer costs memory (only the scene needs transition buffers); CSS filters and backdrop blur are
  expensive under a scrolling canvas; the headless renderer at 2× density can crash on large screenshots (1× is enough
  for a desktop look).

## 7. Order of work

The queue's iterations (re-cut 2026-09-25; the queue wins): U01a the frame → U01b the street, drawn → U02 inside the
building (tower and corridor) → U03 the apartment and the room → U04 above, below and the trace → U05 the pole and the
vibe → U06 wrap-up. U01b carries the risk (the scene host, the clock, the hit-to-option path, the first-screen choice); later iterations
add pictures and interactions to a host that already works.
