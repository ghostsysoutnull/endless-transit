# The title-fall fast loop — the two ends of the fall, the depth rail, the list rows, twelve endings

A fast loop (the block's rule 15) on the branch `ui/title-fall`, 2026-10-05, opened on U06's title and widened round by
round at the user's word: the End screen, the pace of the passages, their captions, the list rows' prefixes, the depth
rail, the endings. Each look the user kept is a save point on the branch; the mock of the endings is
`docs/analysis/mocks/endings.html` (published at `https://endless-transit-endings.surge.sh/`).

## What the user sees

- **The title is the top of the fall.** The game's name stacked large, one line of premise, static on the dark and one
  yellow button. A new world's universe resolves out of the static, drawn live with its filaments named; the seed stands
  large at the foot (every universe is called "The Endless Universe", so the seed is the world's name on screen).
  Re-roll tears the picture back to static and another universe resolves. Entering dives level by level down to where
  the traveller lands — a second a level, a tap lands at once — then the game is there.
- **The End screen is the bottom.** The ending's heading, its moving emblem, "You stand in" with the place's name and
  kind, the four figures (steps, places, relics, resonant) on every ending, the closing line, End session leading and
  Resume under it. End session rises level by level out to the universe and into the dark, and lands on the title with
  Continue waiting. The shutdown lines and the address figure are gone.
- **The passages' caption.** The dive and the rise play under a band of their own, so no word covers the picture: a
  rail of the levels' marks lit as far as the way has gone, and each level's kind and name — the name above shrinking
  into a small line, the next rising from below, the one before fading out; backwards on the way out.
- **A list row is the place's name alone.** The twelve fixed prefixes ("Enter Building:", "Ride to", "Open",
  "Synchronize with" …) are gone on every level; the headings above the lists stay.
- **The depth rail is drawn.** The levels' marks are the pole's own glyphs on a thin line with a pulse running to you;
  yours is larger, white, alive and ringed with a ripple. Going down, a mark drops onto the line and the ring slides;
  going up, the mark left lifts off; another place at the same depth drops in anew. The line frays and reddens as
  coherence falls. A tap still opens Trace at the level nearest the finger.
- **Twelve endings**, the first reached wins: the void, the signal answered, something new carried out, reborn, frayed,
  empty-handed, pacing, in tune, expedition complete, never left the sky, settled, end of session. Each has its words
  and its emblem, as the mock showed.

## Underneath

- The rules side hands the title the way down (`GameSnapshot.descent`: the trace to `Journey.landing` and a noise seed)
  and the End screen the way up (the END command opens the recap with the trace in `trace`); the trace's making is one
  method, `#traceOf`. The endings are judged on a `Run` of plain facts; the count of reboots is a new fact of the
  traveller, kept in the save, whose version is now 7 (an older save does not load: a new world is drawn).
- `Dive` runs both ways (`play`, `rewind`), takes its pace and its tear from its maker, and tells which level shows.
- The picture of the place on the End screen (`LiveBand`, one round) gave way to the ending's emblem.

## Shape

| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `DescentSummary` | value object | `engine/rules` | the way down entering takes: the trace and the title's noise seed | none |
| `Journey.landing` | method on an existing kind | `Journey` | where entering lands: the place kept, or the start of a journey | none |
| `NEW_WORLD_ID`, `ENTER_WORLD_ID`, `END_SESSION` | constants | `GameOption`, `RecapPrompt` | each option id's one owner, so a screen finds it by id | none |
| `Run` (widened) | value object | `engine/rules` | what an ending is judged on | none |
| `Endings`' ladder | registry | `Endings` | which ending a run has reached: the first of twelve | none |
| `Player.reboots` | method on an existing kind | `Player` | how many times the link failed and the traveller came back; saved | none |
| `Buffer.holds` | method on an existing kind | `Buffer` | whether a fragment of a kind is held | none |
| `Coherence.critical` | method on an existing kind | `Coherence` | whether the value is in the lowest band | none |
| `TitleScene` | entity | `ui/scene` | which world the title's picture shows, and since when it resolves | none |
| `TitleWorld` | value object | `ui/scene` | a world as the title's picture shows it | none |
| `Passage` | entity | `ui/screens` | which levels play over a screen, and which one shows; the caption's markup | none |
| `PassageLevel`, `PassageLevels`, `PassageScreen` | value object, service, interface | `ui/screens` | a level of a passage; how a trace becomes passage levels; what a passage asks of its screen | none |
| `Dive.rewind`, `hold`, `tear` | method and parts on an existing kind | `Dive` | the reel backwards; its pace; what tears each level | none |
| `NoTear` | service | `ui/scene` | no tear at all | none |
| `EmblemStage` | entity | `ui/scene` | which emblem shows, and where | none |
| `EndingEmblem`, `EmblemMoment`, `EmblemInk`, twelve `*Emblem` | interface, value object, service, twelve services | `ui/scene/endings` | an ending's drawing; what it is painted with; the strokes they share; each ending's own drawing | none |
| `ScenePictures.emblems`, `.glyphs` | factory methods | `ScenePictures` | the emblems by ending key; the levels' glyphs for whatever draws a level by its mark | none |
| `DepthRail` | entity | `ui/scene` | which rail shows, which showed before, since when; which level is nearest a finger | none |
| `RailVM` | value object | `ui/scene` | the rail as its picture draws it | none |
| `PlaceSummary.trail[].glyph` | field | the engine's summary | the mark a level is drawn with | none |

## The approval

- The fast gate: typecheck, lint, format and the unit tests green but the three goldens, red until the end by plan.
- The tests that moved on purpose: the list rows without prefixes (the engine, the registry and the floor tests), the
  rail's `glyph` on the trail, `descent` in every snapshot literal, the save at v7, the recap at twenty places with
  nothing taken is "empty". New: `Endings.test.ts` (each fact alone, the edges, the order), the buffer's `holds`, the
  coherence's `critical`, the way down at the title, the trace the recap opens with, the endings by where and how, the
  reboot count through a reload, the title's and the End screen's presenters anew.
- The design check: see "As built" below.
- The browser suite and the goldens: at the end, below.

## As built

- **The design check** (once, on `master..ui/title-fall`) found three breaks, all fixed: the ladder judged "the sky"
  and "settled" by depth constants that stood in for the place and put a room one level too high (an apartment
  settled) — now a place with no vibe in force is under the sky and only a room settles (`Location.settled`); the
  lowest coherence band was re-derived beside `band()` — now asked of it; the tap a passage plays before was one rule
  written in both views — now `Passage.through`, each view one call. The ladder's test, which had enshrined the wrong
  edge through a stub, reads real places.
- **The approved snapshots** rewritten by their one writer and read: fifty-nine rows move, every one a prefixed row
  to its bare name, nothing else.
- **The browser tests**: a landing at once through the passage (`land`, a tap on the overlay), the End screen's new
  words and figures, the save helper at v7; the title's reduced-motion test gone with the sign it watched.
- **The browser suite**, twice: the first full run failed four — two of this loop's own (the passage now holds the focus
  while it plays; a leftover line in the End screen's test) and two room tests of the plan (`plan.spec.ts:86`, `:141`)
  on a Playwright clock error, "Cannot fast-forward to the past", that names the test's clock, not the game; the
  second full run, on the fixed build, 156 passed, 14 skipped (the keyboard-only tests). The two plan tests are a
  flake to fix or delete, never retried — in the handover's open threads.
- **Kept for later**: CONCEPT-006 (three more endings on facts the game does not keep) and CONCEPT-007 (the rail read
  with a finger), `tasks/backlog/CONCEPTS.md`.
