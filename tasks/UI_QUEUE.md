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
   stays under it as the accessible twin, and what is pointed at in one lights in the other. Labels like
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
   whole height; the roof and the sealed bedrock show when reached; floor buttons group by tens above 20 floors.
8. **A corridor is walked**, first person, every door standing in the perspective: its shape comes from its floor's
   words (the curved gallery bends away, the service corridor runs to a blank wall); a slider along the bottom scrubs
   freely left and right; a door picked from the list is walked to, then opened.
9. **An apartment is a plan** you drag and pinch: rooms numbered from the entrance, rooms not yet reached in fog until a
   neighbour is visited or a scan resolves the plan, a minimap when it does not fit, a tapped room glided to and zoomed
   into, the way out pulling back. The layout holds up to 48 rooms although the game deals 1 to 10 today.
10. **A room** is drawn with its relics as things to tap; a captured relic flies into the buffer.
11. **Trace opens the column** over everything, at your level: one band a level with its live drawing, its scale (10²⁶ m
    … 5 m) and its facts; a thread through the spot where you went down, pulsing toward you and fraying at low
    coherence; only the band in focus animates; a tapped band opens larger in place. Read-only: memory, not a shortcut.
    Closes by ✕, Esc or a swipe down on its header.
12. **The dive stays**, behind a Dive button in the trace header: the zoom from the universe to you, landing back in the
    column.
13. **The pole** (option B): a Pole | Column switch in the trace header that remembers the last choice. The pole: a
    spine with a pulse, a plate and a live glyph a level, levels well apart (≈ 76 px, it scrolls and keeps you in view),
    era · culture · trait as ribbons that break where a level changes them, state tags (curved, frozen, drift, rebel),
    the scale as a ruler.
14. **The vibe follows the game's rules exactly** (`web/src/engine/model/Vibe.ts` and the factories): the planet sets a
    main and a second culture and era; the country adds its trait and shifts the stability; one city in ten is a rebel
    district that swaps them; street to corridor only inherit; an apartment draws the main pair with the stability's
    chance, else the second (the drift); a room is its apartment's. The pole shows the second pair as a faint drift
    current, a drifted apartment hooking into it, a rebel city breaking both ribbons. Names come from the game's lists.
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
| [ ] | U03 | **The apartment and the room**: the plan (its layout a pure function of the apartment, the fog and the scan, drag, pinch, minimap, glide in, pull back) and the room (drawn, relics tapped, the flight to the buffer) — street to relic is then all pictures | explore a plan room by room under the fog, then tap a relic into the buffer | a pure layout function (up to 48 rooms), pan and pinch gestures, the apartment's room count as data | plan ≈ 141k; ≈ 290–490k (inferred) |
| [ ] | U04 | **Above, below and the trace**: the universe down to the city drawn as places (their children as tappable marks), the null reach, the breach and the layers below the bedrock; the trace column over everything, its bands the same drawings, a band opened larger, the dive landing back in the column | walk from the universe to a street in pictures; breach and descend; open Trace, scroll the column, dive and land back | one drawing a level, shared by the place and its band; the trail rides on every step | plan ≈ 138k; ≈ 320–550k, likely two slices (inferred) |
| [ ] | U05 | **The pole and the vibe**: the engine hands over the second pair, the stability, the rebel city, the drift; the Pole / Column switch; the ships lane kept empty in its look | read a world's vibe in a glance; find a rebel city or a drifted apartment | a vibe summary on the place, read by the pole, never re-derived | plan ≈ 104k; ≈ 200–340k (inferred) |
| [ ] | U06 | **Wrap-up**: title, help, buffer, map and recap in the new look or retired with a reason; accessibility, reduced motion and a phone performance check; the player docs and the architecture document true; the full playthrough on both profiles | play the finished game from the site | words and styles; its reading is broad (all of `src/ui` and the specs), so its plan splits it if it runs long | plan ≈ 222k; ≈ 310–420k+, best split (inferred) |
