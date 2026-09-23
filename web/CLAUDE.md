# Endless Transit — the web game

Strict-TypeScript single-page game, **phone first**, live at `https://ghostsysoutnull.github.io/endless-transit/play/`.
The port (I01–I10) is complete; its Decisions still bind: `../tasks/PORT_QUEUE.md` (it wins over the spec,
`../docs/analysis/WEB_PORT_STUDY.md`). One note per iteration: `../tasks/port/`. **Player docs:**
`../docs/web/players_guide.md` and `cheat_sheet.md` cite every number as `src/…:line` — a rule or number that
changes re-reads its citation (`sed -n`) and the "How the web game differs" list.
OO law (eight principles, Shape table, coverage claims): `../.claude/CODEX.md`.
Lessons: @../tasks/lessons/web.md

## Layers — who may import whom

`src/engine/` pure, synchronous, deterministic; imports **only** `./…` and `#engine/…` — no DOM, no packages, no clock,
no `Math.random`. It receives what it needs through interfaces it owns (`ContentSource`, `SaveStore`, `EntropySource`,
`WarningSink` — a `[THEME_WARN]` for a list an index promised and the content lacks; never a silent fallback).
`src/content/` the `.txt` lists + the ONE `import.meta.glob` (`BundledContent`). **Order = the `index.txt` order.**
Which cultures exist: `themes/cultures/index.txt` only — directories keyed by culture carry no index of their own;
`names/rooms` is keyed by trait (`themes/traits.txt`) the same way.
`src/platform/` browser adapters. `src/ui/` screens, input, styles — depends on the engine, never the reverse;
`src/ui/canvas/` is the only hand-written canvas code (study D7): a `Picture` is a pure function of plain data, a
`CanvasView` draws it into a host element with the stylesheet's tokens (`Inks` lists the ones it may paint text
with) and stays still under `prefers-reduced-motion`.
`src/main.ts` the composition root: the only place adapters are built.

The loop: tap/click/key → `InputRouter` → option id → `GameEngine.step(id)` → plain-data snapshot → the
`ScreenStage` whose presenter `accepts` it → `Presenter.toViewModel` → `View<VM>.render` (lit-html). Options are data
`{ id, key, label, place, role, sealed, landmark, ordinal, readings, opposite, current, visited }` with `role` travel /
move / return / system / debug / take / pick / drop; a new action is a registry entry in `GameEngine` that names its
`Turn` (`STEP` drains and counts, `GLOBAL` drains only, `FREE` neither — every prompt in the world drains **before** the
command, Guide:133), a new screen one more stage in `main.ts`; a pending prompt (`Prompt`: the reboot at zero
coherence, the recap, the buffer screen) is a state whose options are the only ones on offer, never a blocking read —
an answer is a `Reply` that settles it or keeps it open, and costs nothing. A key is the ordinal when the place goes
by its own number, else from the pool. SCAN, MAP and TRACE are global commands whose panel (`ScanSummary`, `MapSummary`, `TraceSummary`) rides on the
snapshot until the next step (a map is the place's `mapNodes()` on a grid — a room has none, a floor maps its doors —
with the marks of a low Coherence and the void's static drawn on the frame; `place.lattice` is the pane's map
outdoors); HELP opens the manual (`HelpPrompt`, its words in `HelpPresenter`); the echo hunt (`echo`, `capture-echo`) and the breach (`breach`) are steps offered as moves when
the place says so; after every step that counts the room rolls the free lottery (`Location.lottery(steps)`). The traveller (`rules/Player`: `Coherence` value, steps, the visited path by
address, the `Buffer`, the resonance tally) rides with the `Journey`; what the HUD draws that is noise is seeded from
`FrameEntropy` (the place + the step count), never the clock. **Debug mode** (Decision 8): `?debug` on the page's address, read only in `main.ts`; the debug tools
(`role: 'debug'`, the INTEGRITY ladder, PRIME, KEYSTONE) are offered nowhere else, and tests turn it on with `debug: true`. On the
page they are the last strip, folded behind one DEBUG button (`data-testid="debug-toggle"`, `aria-expanded`), every button
`tabindex="-1"` — never on the first screen, never in the tab order; the e2e harness opens the fold as a tester would.

**Phone first screen (I09):** the world screen's moves sit under the place's title; under 900 px the HUD folds behind
its readout button (the last two crumbs, the steps, the buffer and the position stay), the dock keeps the way out beside
MORE — a disclosure the next step folds again — and a panel the player asked for (scan, map, trace) comes after the list;
a desktop shows every dock button and the whole HUD. `e2e/fold.spec.ts` asserts an action on the first screen of every
screen kind, at the device size and at 360 × 640.

The world: `model/Location` owns the **lazy-loading law** — children sit behind a private array and exist only after
`children()`, generated once through the injected `ChildSource`. A kind of place is a class that answers for itself
(name, words, vibe, `sealed()`, and the journey's questions: `listing()`/`admits()`, `arrival()`/`arrive()`,
`exit()`/`leave()`, `moves()`/`move(id)` (one `MoveTable`: what is offered is what can be made), `remember()`/`recall()`,
`current()`, `goesByNumber()`, `startOfJourney()`, `drainFactor()`) plus a `LocationFactory<T, Parent>` entry in
`procgen/LocationRegistry`; nobody asks "which kind are you?" (`instanceof`, a `switch` on `kind().key()`). A mode a
place can be in is a state object it asks (`Floor` → `FloorState`), never a flag the caller reads. Child `i` is born from
`parentSeed.branch(i)` and nothing else. **The ritual** lives on the `Building` (sampled floors, merges, the breach): a
capture tells the trail `sample()`, a merge `infuse()`, and the building answers `primed()`, `forge(held)` (its
`Keystone`, bound by address) and the breach (the Peak, in either mode); a building's children are its floors then ten
`Layer`s, sealed until the breach, each with an `Artery` (the bedrock's vibe: abyssal culture, atomic era, the
country's trait), `Crypt`s and `Shard`s — four more registry entries, the apartment and room factories registered
again with a shape; `Location.abyssal()` is the parent's answer, a Layer's is true and it doubles the drain. A
`NullReach` owns its `Echo` (the signal, the capture once ever) and remembers it. A scan is `Location.scan(seen)`: the
state decides what a floor scans; a kind answers `scanned(seen)`/`sensed()` for its row.
Where the traveller stands: `rules/Journey`; a save (v6) is seed + path + what
every **visited** place remembers (`remember()`/`recall()` — the one home of every per-place fact: a room's taken keys
and dropped fragments) + the traveller (coherence, steps, visited, the buffer as fragment data, the tally), and restore
takes only a save the journey could have written (`saved()` after `restore()` is the save; the states are recalled
before any place is looked for, so a breach unseals the Layers a save stands on; a visited path is walked parents
first and holds the trail, and may name a sealed place — the reboot keeps the path; every fragment is read back
**through the world** by the `FragmentReader`, which refuses data the fragment would not write back).
A presenter never cuts a name out of a label — the option carries it. **Objects live in apartments** (Guide:167): an
apartment deals its relics (`Relic`, identity by key) from the `ObjectDeck` of its culture and era and knows which
room each lies in; a room asks. Furniture is a culture item in a condition, never a hybrid. **Items:** a `Fragment`
is what the buffer holds — a `RelicFragment` (a relic with its provenance, the room that gives it its `Frequency` from
the `Gematria` of its name; 0 Hz never resonates), a `Hybrid` of two, a `Keystone` (a building's, 0 Hz), a
`HiddenFrequency` (a room and the step that won it) or a `SpectralEcho` (a reach's); a kind of fragment is one class
and one row in the reader's table. A capture is one transaction of the `Journey` (the room hands over only what the `Buffer` takes,
sixteen at most); a dropped fragment lies in the room as it was; only a _fresh_ capture counts toward the tally.

## The walls (each proven RED on a scratch file when added)

1. **Compiler** — `tsconfig.engine.json`: no DOM lib, composite file list (TS6307 / TS2584).
2. **Lint** — `eslint.config.js`: engine import ban; in the engine no `Math.random`, no `Date` in any form, no
   `performance`, no `globalThis` / `window` / `self`; everywhere no `innerHTML`, no `unsafeHTML`, no barrels, no `..`
   segment in an import (use `#engine/ #ui/ #platform/ #content/ #tests/`).

A new invariant ships with its rule in the same iteration.

## Code rules

- File = class name, one class per file (`Seed.ts`); interfaces and types likewise. Imports carry `.ts`.
- `erasableSyntaxOnly`: no `enum`, no constructor parameter properties. `#private` fields.
- No static state. A `static` names its reason in a comment (factory for a text form, entry point).
- Randomness: `seed.branch(key)` then one helper (`pick`, `range`, `probability`). Never a stream. Text keys never
  start with `#` (Seed's own); `branch(1)` ≠ `branch('1')`.
- Words live in the presenter; a `*View.ts` has no literal text or aria-label. Focus after a render: `Shell` owns it —
  an option names the option that undoes it, a screen marks its resting place (`data-rest`), and a panel that just
  opened marks itself `data-spot`: the shell scrolls it into view (instant under `prefers-reduced-motion`, clear of the
  dock by `scroll-padding`) and gives it the focus. Only a shown button takes the focus.

## Tests first

Test, RED, then code. `tests/` mirrors `src/`; doubles in `tests/support/`. Pins are literals: a diff is a finding.
Playwright owns browser behaviour and runs **twice**: `desktop` and `phone` (portrait, touch). Look at the
screenshots in `test-results/` yourself before calling UI work done.

**Play-session fixtures** (`tests/fixtures/*.json`, `{ "seed": "XXXX-XXXX-XXXX-XXXX", "history": [...optionIds] }`
from the title on, discovered by directory listing in `tests/engine/rules/Sessions.test.ts`): each is replayed in debug
mode with a reload after every tap — the reloaded game shows the same screen and its next tap writes the same save. A
new kind of turn gets a fixture that takes it.

**Goldens** (`tests/goldens/*.txt`, written by `tests/content/Goldens.test.ts`): the full text of a fixed walk,
street to room, for three seeds. Nothing else writes them: `npx vitest run tests/content/Goldens.test.ts -u` is the
one writer, run only after an intended content or wording change; read `git diff tests/goldens` before committing —
a changed line is a finding, never a chore. Every list has a size floor (`tests/content/ContentFloors.test.ts`): a
list may only grow.

## Touch first (Decisions 1–5)

Every action is a real `<button>` ≥ 44×44 CSS px. Nothing depends on hover or a key — keys are a desktop extra.
Portrait at 360 px never scrolls sideways. `prefers-reduced-motion` is respected. Look: the visual mock
(`../docs/analysis/mocks/ships-of-the-lattice-visual.html`). Saves: `localStorage` only. No journal.

## Commands (from `web/`)

| Do                                                                   | Command                                   |
| :------------------------------------------------------------------- | :---------------------------------------- |
| Gate: typecheck + lint + format + unit tests                         | `npm run check` → one `STATUS=` line      |
| Browser tests, both profiles, production build                       | `npm run e2e`                             |
| The full playthrough alone (title → void → reload), both profiles    | `npx playwright test --grep @playthrough` |
| Play while developing                                                | `npm run dev`                             |
| Site → `dist/` (base `/endless-transit/play/`; `ET_BASE` overrides)  | `npm run build`                           |
| Publish: check → build → `../docs/play/` + `build.txt` (then commit) | `npm run publish:site`                    |
| Format                                                               | `npm run format`                          |
