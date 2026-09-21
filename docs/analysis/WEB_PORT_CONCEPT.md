# Endless Transit as a Single-Page App — Concept Notes
**Created:** 2026-09-21
**Trigger:** the user, closing the visual-mock session: "most likely I will start an effort to port the game to a single
page JS page in the future."
**Status:** CONCEPT — **not a plan.** No Shape table, no slices, no commitments; it authorizes no source change.
Backlog pointer: `tasks/backlog/CONCEPTS.md` (CONCEPT-002).
**Evidence:** `docs/analysis/mocks/ships-of-the-lattice-visual.html` (artifact version 13, private copy
`https://claude.ai/artifact/QrcWAccxogJRow9Q7AazHN`). It was built to test ships (CONCEPT-001) and became, by the
user's direction, a test of the whole game as one page. Ship rules: `docs/analysis/SHIPS_RULES.md`.

> **In one paragraph.** The mock shows the game survives the move from type-and-Enter to a picture you click, if three
> things hold: the picture is the biggest thing on the page, the room text stays the payoff, and one key grammar works
> everywhere. It shows nothing about what a real port costs — the world in it is a stand-in, not the game's generator.

---

## 1. What the mock settled (each was a user decision or a user correction)

| # | Settled | How it looks in the mock |
| :-- | :-- | :-- |
| 1 | **Two views cover the whole game.** | The lattice (levels 00–07, zoom in and out of nodes) and a cross-section (elevator or spine, floors or decks, doors). A ship is "a building that left", so one renderer draws both. |
| 2 | **Going through a door changes the picture.** | An apartment (or ship section) opens as a floor plan: rooms side by side, open doorways, the corridor you came from along the bottom. The floor view only ever shows doors. |
| 3 | **One key grammar, everywhere.** | **Arrows pick** among what is at this level · **Enter goes in** · **Esc goes out.** Picking is free; *walking* costs a move (floors, rooms, the hive ring). An arrow with nothing else to do doubles as Enter or Esc, following the picture. Letter hotkeys and clicks stay. |
| 4 | **One click is one prompt.** | Every move pays the drain. Without it the page is a map viewer. |
| 5 | **Size by role.** | Picture largest · room text leads the right column · Coherence is a full-width bar fixed under the picture · controls are one small row that says what each arrow does from here · objects are drawn only when they exist. |
| 6 | **Depth is vertical.** | A depth rail beside the picture: a notch per level, a lit thread to you, a marker that glides, smaller notches once inside, the beacon as dashes flowing toward the ship, the climb cost on hover, click to climb. |
| 7 | **Where you are is written in words.** | A banner on the picture (`LEVEL 03 · SOLAR SYSTEM — Vega Borealis`, or `BUILDING — … › FLOOR 3 › ROOM 2/5 — …`), the type above the name in the caption, and on the way-up link. |
| 8 | **One drawn icon set.** | 24×24 paths, one silhouette per kind, defined once and used as SVG (rail, caption) and as canvas paths (picture, trace). Text glyphs were unreadable. |
| 9 | **The buffer is its own screen.** | Items as waves; looking at one spells its gematria (silent vowels, consonant ordinals, master numbers, depth); a merge is the two waves superimposed, named before you commit. |
| 10 | **`ll` is its own screen.** | A dive from the universe to the player, then the levels as a threaded stack: kind, depth, name, position where it costs moves, the ×12 object weight at room depth, the ships, the beacon. Siblings only during the dive; no visited marks. |
| 11 | **Coherence decays the whole page.** | Colour drains, then noise, tearing, dropped bands; at zero the screen collapses and reboots. A switch turns it off. |
| 12 | **Real counts.** | Buildings 3–100 floors and 2–20 doors per floor by size class, streets 4–20 fronts, 1–10 rooms and 5–19 objects per apartment — read from `BuildingFactory`, `StreetFactory`, `ApartmentFactory`. Long floors and apartments slide sideways. |

## 2. What is fake in the mock

* **The world.** A scripted path (the text mock's) plus a tiny seeded generator with invented name lists and small samples
  of the game's resource files. It is *not* `ProceduralFactory`: a seed in the mock and the same seed in the game give
  different worlds.
* **The rules it skips:** the Keystone ritual and the descent (a sealed hatch says so), saves, the journal, culture/era
  effects on drain and lighting, the second era per planet, rebel districts, null-sector and abyssal variants.
* **The hauler and the hive** are hand-written (see `SHIPS_RULES.md`).
* **Costs differ from the game** in two places, on purpose: the buffer and the lattice trace are free, and taking an
  object costs one move.

## 3. Questions a real port must answer (none is answered here — the answers are in `WEB_PORT_STUDY.md`, 2026-09-21)

1. **The generator.** Port `procgen/` to JS, or run the Groovy model behind an API? "Same seed → same world"
   (`DeterministicUniverseTest`, the seed-0 scan) depends on `java.util.Random` and on `LocusSeed` branching; a JS port
   needs a bit-exact PRNG and the same branch keys, or it is a different universe and old saves mean nothing.
2. **One model or two.** If the terminal game stays, two implementations of every rule is principle 1 broken twice over
   (one owner per fact). Options: the JS app becomes the game; or the model is compiled/served once and both front ends
   read it; or the web version is declared a separate product.
3. **Saves.** `session.trace`, mementos and LIP resolution — browser storage, export/import, or none.
4. **The visual gate.** The terminal has 36 golden frames compared byte for byte. A canvas app needs its own: DOM/state
   snapshots for logic, and screenshot comparison (tolerant) or a draw-call log for the picture.
5. **Content.** `src/main/resources/{themes,names}` must be loadable by the page — bundled JSON generated from the same
   files, so content stays in one place.
6. **Resources and hosting.** GitHub Pages already serves `docs/`; a port could live there. A push republishes the site.
7. **Accessibility and phones.** The mock has keyboard paths, focus states, reduced motion and a phone layout, none of
   them tested with a screen reader or on a device.

## 4. Looking at the mock from this machine

The session that built it worked blind for a day because a first search found no browser. There is one:

```
node docs/analysis/mocks/look.js docs/analysis/mocks/ships-of-the-lattice-visual.html out.png \
  '[{"key":"Enter","wait":900},{"key":"ArrowUp","wait":500,"shot":"floor1.png"}]'
```

`look.js` drives Playwright's Chromium (`~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome`) through a
`playwright-core` module found on disk (`~/.cache/lonestar-verify/node_modules/playwright-core`; override with the
`PW_CORE` and `CHROME` environment variables). It prints page errors and takes real-time screenshots — headless
`--screenshot` with virtual time freezes the animations and lies. Rule: look at the page before calling a change done
(`tasks/lessons/ui.md`).

## 5. How the mock is built (for whoever continues it)

One self-contained HTML file, no build step, no library. Sections in the script, in order: options · seeded helpers ·
kinds and name lists · the scripted path · the generator (`N`, `kids`, `bldLevel`) · hauler and hive data (lifted
verbatim from the text mock) · state (`fresh`, `go`, `bearing`) · **views** (one function per place returns title, text
and `opts`; the picture and the buttons both read `opts`) · actions (`act` is the one place a move is paid for) · canvas
(primitives, transitions, decay, then one draw function per scene) · the icon set · the HUD/caption/rail painter
(`paint`) · the buffer screen · the lattice trace · wiring (`dirs()` is the key grammar). State is one plain object,
saved across republishes by the artifact's hot-reload hook.
