# The UI Queue
**What this is:** the web game's picture-first rework, cut into playable iterations. **"hi" starts the next iteration's
plan** — the user approves it before any code; the rules are in `.claude/CODEX.md`, "The Standing Order", item 2. **Spec: the mock** `docs/analysis/mocks/transit-reframed.html` (v5.3; the
same page is published privately at `https://claude.ai/artifact/AadEUrRcBytwcf3NpWhAuZ`, version 8) and the wireframe
`docs/analysis/mocks/pole-wireframe.html`; how the mock maps onto the web game: `docs/analysis/UI_REFRAME_STUDY.md`.
**Where the study and this file disagree, this file wins.** Each iteration leaves one short note, `tasks/ui/<id>.md`
(plan, Shape table, choices made, gate lines, what the tester can try); the note and the merge commit are the record.

**Estimate (2026-09-24):** 8 iterations. An iteration that proves too big is split here.

## Decisions (user, 2026-09-24) — nothing here is asked again
1. **Picture first; the terminal's jargon goes.** Every place is drawn on a canvas and tapped in the picture; its list
   stays under it as the accessible twin, and what is pointed at in one lights in the other. Labels like
   `PULSE_TRAVERSAL`, `LOCUS_HASH`, `[STABLE]`, `[SYSTEM_TELEMETRY]` become plain chips or go; the room's prose stays.
2. **The mock is the look and the feel; the game is the rules.** Where they disagree on a rule, a number or a name, the
   game wins (as port Decision 9). Mock-only data stays mock-only: its sample names, apartments beyond 10 rooms, the
   preview ship, the forced drift on the demo walk.
3. **Phone first** — port Decisions 1–5 and 8 still bind (thumb-sized real buttons, portrait 360 px, nothing needs
   hover or a key, browser saves only, debug tools behind `?debug`). Every iteration ends in a live build.
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
9. **An apartment is a plan** you drag and pinch: rooms numbered from the entrance, rooms not yet reached in fog until
   a neighbour is visited or a scan resolves the plan, a minimap when it does not fit, a tapped room glided to and
   zoomed into, the way out pulling back. The layout holds up to 48 rooms although the game deals 1 to 10 today.
10. **A room** is drawn with its relics as things to tap; a captured relic flies into the buffer.
11. **Trace opens the column** over everything, at your level: one band a level with its live drawing, its scale
    (10²⁶ m … 5 m) and its facts; a thread through the spot where you went down, pulsing toward you and fraying at low
    coherence; only the band in focus animates; a tapped band opens larger in place. Read-only: memory, not a shortcut.
    Closes by ✕, Esc, a tap outside (desktop) or a swipe down on its header (phone).
12. **The dive stays**, behind a Dive button in the trace header: the zoom from the universe to you, landing back in
    the column.
13. **The pole** (option B): a Pole | Column switch in the trace header that remembers the last choice, and on a desktop
    the rail expands into the pole pinned beside the game (it stays pinned). The pole: a spine with a pulse, a plate and
    a live glyph a level, levels well apart (≈ 76 px, it scrolls and keeps you in view), era · culture · trait as
    ribbons that break where a level changes them, state tags (curved, frozen, drift, rebel), the scale as a ruler.
14. **The vibe follows the game's rules exactly** (`web/src/engine/model/Vibe.ts` and the factories): the planet sets a
    main and a second culture and era; the country adds its trait and shifts the stability; one city in ten is a rebel
    district that swaps them; street to corridor only inherit; an apartment draws the main pair with the stability's
    chance, else the second (the drift); a room is its apartment's. The pole shows the second pair as a faint drift
    current, a drifted apartment hooking into it, a rebel city breaking both ribbons. Names come from the game's lists.
    **The engine hands the UI these facts as data; the UI never re-derives a rule.**
15. **Ships are not part of this run** (CONCEPT-001 decides them); the pole keeps their lane and their look — a hull
    diamond, a tow frame, a glowing tether, as the old mock drew them.
16. **Tests change on purpose.** A browser test or golden that pins an old label is changed in the iteration that
    retires the label, and the note names it. The first-screen rule stays: a move is visible without scrolling at
    360 × 640 on every screen.
17. **How to ask**: the user block at the top of `CLAUDE.md` is the one home (one question per message, lettered
    options, the pick first, plain words; a pick is built, not re-asked).

## Reported by the tester
*(the user's findings — each becomes a fix piece run before the next iteration)*
- none

## Iterations

| ✓ | id | Iteration | The tester can |
| :-- | :-- | :-- | :-- |
| [ ] | U01 | **The stage**: the world screen rebuilt picture first — one scene host (a canvas, its hit areas, the zoom in and out between places, the motion clock, the pixel budget, the coherence effects, reduced motion), the new layout (the place drawn, a card with plain chips and the prose, the list as the picture's twin, the dock), the jargon out of the HUD, the depth rail kept; **the street drawn and tappable**. Places not yet redrawn keep today's view until their iteration | see the street drawn, tap a building and feel the zoom, watch the world tear as coherence falls (debug) |
| [ ] | U02 | **The tower**: riding the shaft — the window of floors, the gauge slider, floors by tens, roof and bedrock, the car's motion | ride a hundred-floor tower by drag, gauge, list and keys |
| [ ] | U03 | **The corridor**: walking it — every door in the perspective, the shape from the floor's words, the slider, walking to a picked door | walk a twenty-door gallery and a straight corridor, open a far door |
| [ ] | U04 | **The apartment and the room**: the plan (its layout a pure function of the apartment, the fog and the scan, drag, pinch, minimap, glide in, pull back) and the room (drawn, relics tapped, the flight to the buffer) | explore a plan room by room, capture a relic |
| [ ] | U05 | **Above and below**: the universe down to the city drawn as places (their trace drawings, their children as tappable marks), and the ritual's places — the null reach, the breach, the layers below the bedrock — in the same language | walk from the universe to a street in pictures; breach and descend |
| [ ] | U06 | **The trace column and the dive** | open Trace, scroll the column, open a band, dive and land back |
| [ ] | U07 | **The pole and the vibe as data**: the engine hands over the second pair, the stability, the rebel city, the drift; the Pole / Column switch; the pole pinned on a desktop; the ships lane kept empty in its look | read a world's vibe in a glance; find a rebel city or a drifted apartment |
| [ ] | U08 | **Wrap-up**: the screens the mock did not draw (title, help, buffer, map, recap) brought into the new look or retired with a reason; accessibility and reduced-motion pass; a phone performance check; player docs and the architecture document true; the full playthrough on both profiles | play the finished game from the site |
