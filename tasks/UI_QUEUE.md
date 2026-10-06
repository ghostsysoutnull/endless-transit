# The UI Queue
**What this is:** the web game's picture-first rework, cut into playable iterations.
**Spec: the mock** `docs/analysis/mocks/transit-reframed.html` (v5.3; the
same page is published privately at `https://claude.ai/artifact/AadEUrRcBytwcf3NpWhAuZ`, version 8) and the wireframe
`docs/analysis/mocks/pole-wireframe.html`; how the mock maps onto the web game: `docs/analysis/UI_REFRAME_STUDY.md`.
**Where the study and this file disagree, this file wins.** Each iteration leaves one short note, `tasks/ui/<id>.md`
(plan, Shape table, choices made, gate lines, what the tester can try); the note and the merge commit are the record.
An iteration closes with its note as built and its row ticked.

**Every iteration puts something new on screen**, and each scene retires its own place's words with the pins that name
them; an iteration that proves too big is split into slices that each show the tester something new.

## Decisions (user, 2026-09-24) — nothing here is asked again
1. **Picture first; the terminal's jargon goes.** Every place is drawn on a canvas and tapped in the picture; its list
   stays under it as the accessible twin, and what is pointed at in one lights in the other (a room's is the back of
   its card, hidden while the picture shows — the user's call, U03e). Labels like
   `PULSE_TRAVERSAL`, `LOCUS_HASH`, `[STABLE]`, `[SYSTEM_TELEMETRY]` become plain chips or go; the room's prose stays.
2. **The mock is the look and the feel; the game is the rules.** A plan that departs from the mock's look (a layout, a
   motion, a drawing) says so and asks first — never decided quietly. Where they disagree on a rule, a number or a name,
   the game wins. Mock-only data stays mock-only: its sample names, apartments beyond 10 rooms, the preview ship, the
   forced drift on the demo walk.
3. **Phones only** (the whole of it in Decision 18) — `web/CLAUDE.md`'s "Touch first" and its debug mode bind.
4. **Motion is one clock, measured by elapsed time.** Drags follow the finger one to one and coast when let go; going in
   zooms in, going out zooms out; the elevator accelerates, cruises and brakes. Reduced motion: still pictures, no dive,
   instant moves. Smooth on a phone: the page's own work stays a few milliseconds a frame; canvases keep a pixel budget.
5. **Coherence is felt** — grain, torn lines, a red drift and a flicker in the place name, growing as it falls.
6. **The depth rail** is always on screen; tapping a level opens the trace there.
7. **A building is ridden**: a window of thumb-sized floors follows the car; a gauge beside it is a real slider for the
   whole height; the roof and the sealed bedrock show when reached; the floor buttons are gone since the
   fast loop of 2026-10-03 (`tasks/ui/corridor-keys-fast-loop.md`): the tower is the list.
8. **A corridor is walked**, first person, every door standing in the perspective: its shape comes from its floor's
   words (the curved gallery bends away, the service corridor runs to a blank wall); a slider along the bottom scrubs
   freely left and right; a door picked from the list is walked to, then opened.
9. **An apartment is a plan** you drag and pinch: rooms numbered from the entrance, rooms not yet reached in fog until a
   neighbour is visited or a scan resolves the plan, a minimap when it does not fit, a tapped room glided to and zoomed
   into, the way out pulling back (standing in a room, the plan is behind the MAP key under the room's card, U03e).
   The layout holds up to 48 rooms although the game deals 1 to 10 today.
10. **A room** is drawn with its relics as things to tap; a captured relic flies into the buffer.
11. **Trace opens the column** over everything, at your level: one band a level with its live drawing, its scale (10²⁶ m
    … 5 m) and its facts; a thread through the spot where you went down, pulsing toward you and fraying at low
    coherence; only the band in focus animates; a tapped band opens larger in place. Read-only: memory, not a shortcut.
    Closes by ✕, Esc or a swipe down on its header.
12. **The dive stays**, behind a Dive button in the trace header: the zoom from the universe to you, landing back in the
    column.
13. **The pole** (option B; reworked after U05's phone check, 2026-10-01): a Pole | Column switch in the trace header
    that remembers the last choice. The pole: a spine with a pulse down the middle, a big live node a level (its kind
    above, its name and tags under), levels well apart (it scrolls and keeps you in view), the values a level sets
    written beside its node, the era · culture · trait in force pinned behind as huge faint words that follow the
    scroll, state tags (curved, frozen, drift, rebel); no ribbons, no scale.
14. **The vibe follows the game's rules exactly** (`web/src/engine/model/Vibe.ts` and the factories): the planet sets a
    main and a second culture and era; the country adds its trait and shifts the stability; one city in ten is a rebel
    district that swaps them; street to corridor only inherit; an apartment draws the main pair with the stability's
    chance, else the second (the drift); a room is its apartment's. The pole writes the second pair as the drift
    current where it first shows or changes, a drifted value underlined in dashes, a rebel city's values in red. Names
    come from the game's lists.
15. **Ships are not part of this run** (CONCEPT-001 decides them); the pole keeps their lane and their look — a hull
    diamond, a tow frame, a glowing tether, as the old mock drew them.
16. **Tests change on purpose.** Only the approved snapshots and the lookups by accessible name hold the screen's words;
    they change in the iteration that changes the word, and the note names each one.
18. **Phones only**: the game is built, tested and judged on a phone held upright. No desktop layout work and no desktop
    test profile. The tester judges how it feels, smoothness included, by playing.

## Reported by the tester
*(the user's findings — each becomes a fix piece run before the next iteration)*
- ✓ 2026-09-25: the street drew two rows of buildings; the mock draws one — redrawn as the mock, live as `9fc27e3`
  (`tasks/ui/U01b.md`, "After the merge").

## Iterations

| ✓ | id | Iteration | The tester can | Underneath | Tokens |
| :-- | :-- | :-- | :-- | :-- | :-- |
| [x] | U01a | **The frame** (U01 split, the phone had 72 px to spare): the HUD in plain words (Coherence, Steps, Buffer), the depth rail in place of the crumbs (a line of glyphs on a phone, a named column on a desktop), the card with plain chips and natural-case names; the locus hash, the seed and the readout fold off the world screen. Note `tasks/ui/U01.md` | walk any place on a phone and a desktop: a plain top, the rail lit at your level, chips on the card | little: CSS and the HUD presenter (≈ 170 lines of `src`); 23 test files re-pinned | 390k final context, 36.7M processed (measured) — too much for what it showed |
| [x] | U01b | **The street, drawn**: one scene host (a canvas, its hit areas, the zoom in and out, one motion clock, the pixel budget, reduced motion, the coherence tear) and the street drawn on it; the list under it as its twin, each lighting the other; the street's own words plain (its facts, its SYNC line gone). The first-screen rule is met by one of the study's three ways (a short picture, the first move in the card above it, or the move in the dock), never by another split. Outline in `tasks/ui/U01.md` | see the street drawn, tap a building in the picture and feel the zoom; watch the street tear as coherence falls (debug) | a new scene layer in `src/ui/` (clock, host, registry) that every later scene plugs into; the engine hands over a drawing key, the child to zoom to and the decay as data | plan 209k + build 320k final context; 6.1M + 27.5M processed (measured) |
| [x] | U02 | **Inside the building** (built; `tasks/ui/U02.md`, "As built"): the tower ridden (a window of floors that follows the car, the gauge slider, floors by tens, roof and bedrock, the car accelerating and braking) and the corridor walked (first person, every door in the perspective, its shape from the floor's words, the scrub slider, walking to a picked door) | ride a hundred-floor tower by drag, gauge and list, step out and walk a twenty-door gallery to a far door | drag with momentum and a slider on the clock; the building hands over its floor and door counts and each door's state as data | plan ≈ 133k; six sessions, the build's conversations not measured, grills and design checks about 3.4M (measured, per session in `tasks/ui/U02.md`) |
| [x] | U03 | **The apartment and the room** (built; `tasks/ui/U03.md`, "As built"): the plan (its layout a pure function of the apartment, the fog and the scan, drag, pinch, minimap, glide in, pull back) and the room (drawn, relics tapped, the flight to the buffer) — street to relic is then all pictures | explore a plan room by room under the fog, then tap a relic into the buffer | a pure layout function (up to 48 rooms), pan and pinch gestures, the apartment's room count as data | plan ≈ 141k; two sessions: the grill 195k, design checks about 700k over 16 runs (U03a) and one of 96k (U03b), U03b's conversation about 250k, U03a's not measured |
| [x] | U03c | **The room on one screen** (built; `tasks/ui/U03c.md`, "As built"): the room fills the picture and the plan is a pinch out, the corner map pulls back, the moves in the dock, the room's words under the picture, a thinner top bar on every drawn place | stand in a room and see it, its words, its relics and every move without scrolling; pinch out to the plan and back in | the camera's rest and settle, the gesture's release, the drawing places its moves | plan ≈ 250k with its review; ≈ 350–500k (inferred) |
| [x] | U03d | **The room, large** (built; `tasks/ui/U03d.md`, "As built"): standing in a room it fills the picture, every room the same size; the plan behind a MAP key, off by default; a button down to the room's words and relics; the buffer without a limit (the user's asks, 2026-09-30) | stand in any room and see it large; tap MAP for the plan and back; take a seventeenth relic | a stretched framing, the host's view mode, the buffer's cap gone | built in a fast loop, published per try, then hardened; not measured |
| [x] | U04 | **Above, below and the trace** (built; `tasks/ui/U04.md`, "As built"): the universe down to the city drawn as places (their children as tappable marks), the null reach, the breach and the layers below the bedrock; the trace column over everything, its bands the same drawings, a band opened larger, the dive landing back in the column | walk from the universe to a street in pictures; breach and descend; open Trace, scroll the column, dive and land back | one drawing a level, shared by the place and its band; the trail rides on every step | plan ≈ 138k with its grill; built in one piece in a fast loop, published as a try, then hardened; not measured |
| [x] | U05 | **The pole and the vibe** (built; `tasks/ui/U05.md`, "As built", then "The rework" after the phone check: the pole centred, big nodes, the values beside them, the vibe behind): the engine hands over the second pair, the stability, the rebel city, the drift; the Pole / Column switch; the ships lane kept empty in its look | read a world's vibe in a glance; find a rebel city or a drifted apartment | a vibe summary on the place, read by the pole, never re-derived | built in one session, published as a try, checked on the phone; not measured |
| [x] | U03e | **The room card** (built; the user's ask, 2026-10-01; the mock `docs/analysis/mocks/room-card.html`; `tasks/ui/U03e.md`, "As built"): a room's picture is a card that turns to its words, relics and moves, in six ways, the broken ones more often as coherence falls; doorways without words (lit and numbered once entered, fogged before); the room's name and first words on arrival; a strip of keys in place of the dock (six icon keys and a MORE sheet since the fast loop, `tasks/ui/U03e-fast-loop.md`) | stand in a room, turn the card, walk by its doorways, take a relic, step back and leave by the fourth key | a card view of its own, the turns a registry, a doorway's look by the sight of the room it leads to, a visited room's light on the plan | in its note |
| [ ] | U06 | **Wrap-up**: the map and the scan tables in the new look or retired with a reason (the title: done in the title-fall fast loop of 2026-10-05, `tasks/ui/title-fall-fast-loop.md`, with the End screen, the depth rail drawn, the list prefixes gone and twelve endings; the buffer and the telemetry pane: done in the fast loop of 2026-10-02, `tasks/ui/U03e-fast-loop.md`) (the rest moved to U07, the user's call, 2026-10-01) | open the map; scan a place | words and styles | not measured since the cut; before it: plan ≈ 222k; ≈ 310–420k+ (inferred) |
| [ ] | U06b | **The node pictures** (was U05b; moved after U06, the user's call, 2026-10-01): the fourteen glyphs redrawn richer and livelier for the bigger nodes, each with its own motion; a mock first, judged on the phone | open the pole and watch each level's node | none | not measured |
| [ ] | U07 | **Help and the closing checks** (a later phase, after the wrap-up): help in the new look or retired with a reason (the help's lines on a room — the dock, **GO FORWARD · GO BACK**, **MORE** — are false since U03e's card; the recap: done in the title-fall fast loop, `tasks/ui/title-fall-fast-loop.md`); accessibility, reduced motion and a phone performance check; the player docs and the architecture document true; the full playthrough on both profiles | open the help; play the finished game from the site | words and styles; its reading is broad (all of `src/ui` and the specs), so its plan splits it if it runs long | not measured |
