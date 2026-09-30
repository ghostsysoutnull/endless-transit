# Endless Transit — the web game

Strict-TypeScript single-page game for phones, live at `https://ghostsysoutnull.github.io/endless-transit/play/`.
This file is the law and the map; how the code is built, class by class, is
`../docs/analysis/WEB_GAME_ARCHITECTURE.md` (keep it true when a layer, a wall, a kind or the save format changes).
OO, TypeScript and testing principles: `../CLAUDE.md`; the Shape table and coverage claims: `../.claude/CODEX.md`.
**Player docs:** `../docs/web/players_guide.md` and `cheat_sheet.md` cite every number as `src/…:line`, read from the
file before it is written, never remembered; a rule or number that changes re-reads its citation and the "How the web
game differs" list.
Lessons: @../tasks/lessons/web.md

## Layers — who may import whom

`src/engine/` pure, synchronous, deterministic; imports **only** `./…` and `#engine/…` — no DOM, no packages, no clock,
no `Math.random`. It receives what it needs through interfaces it owns (`ContentSource`, `SaveStore`, `EntropySource`,
`WarningSink` — a list an index promised and the content lacks is a `[THEME_WARN]`, never a silent fallback).
`src/content/` the `.txt` lists + the ONE `import.meta.glob` (`BundledContent`). **Order = the `index.txt` order.**
Which cultures exist: `themes/cultures/index.txt` only — directories keyed by culture, or by trait
(`names/rooms`, keyed by `themes/traits.txt`), carry no index of their own.
`src/platform/` browser adapters. `src/ui/` screens, input, styles — depends on the engine, never the reverse;
`src/ui/canvas/` and `src/ui/scene/` hold the only hand-written canvas code.
`src/main.ts` the composition root: the only place adapters are built.

## Where a new thing goes

- **A kind of place:** a class that answers for itself plus a `LocationFactory` entry in `procgen/LocationRegistry`. A
  mode a place can be in is a state object it asks (`Floor` → `FloorState`), never a flag the caller reads.
- **An action:** a `GameEngine` registry entry naming its `Turn` (`STEP` drains and counts, `GLOBAL` drains only,
  `FREE` neither); the drain comes before the command.
- **A move:** a row in its owner's `MoveTable` — what is offered is what can be made.
- **A question to the player:** a `Prompt` state whose options are the only ones on offer, settled by a `Reply`; never
  a blocking read.
- **A screen:** a presenter + view stage in `main.ts`. **A drawn place:** a portrait member (a `PortraitReader`
  method) in the engine; its view model, a `Drawing` member and a `PictureBook` method (`SceneRegistry` holds its
  picture: a `ScenePicture` whose view is one number, or a `PlanDrawing` that pans and zooms, each shown by its host
  kind on `SceneStage`) on the screen — the compiler names every reader to answer. A place with `NoPortrait` keeps the
  screen as it was.
- **A kind of fragment:** one class and one row in the `FragmentReader`'s table.
- **A fact about a place:** that place's `remember()`/`recall()` — its one home, and what the save carries.

## Engine laws

- **Lazy loading:** a place's children exist only after `children()`, generated once through the injected
  `ChildSource`; child `i` is born from `parentSeed.branch(i)` and nothing else.
- **The UI never re-derives a rule:** the engine hands facts over as data; a presenter never cuts a name out of a
  label — the option carries it.
- **Noise is seeded:** what a screen draws as noise comes from `FrameEntropy` (the place + the step count), never the
  clock.
- **Strict restore:** a save is taken only if the journey could have written it — `saved()` after `restore()` gives
  back the same save; anything else is refused whole.
- **Debug mode:** `?debug` on the page's address, read only in `main.ts`; the debug tools are offered nowhere else,
  folded behind one DEBUG button (`data-testid="debug-toggle"`, `aria-expanded`), every button `tabindex="-1"` —
  never on the first screen, never in the tab order. Tests turn it on with `debug: true`; the browser harness opens the
  fold as a tester would.

## The walls

Each wall is shown RED on a scratch file when it is added; a new invariant ships with its wall in the same change.

1. **Compiler** — `tsconfig.engine.json`: no DOM lib, composite file list (TS6307 / TS2584).
2. **Lint** — `eslint.config.js`: engine import ban; in the engine no `Math.random`, no `Date` in any form, no
   `performance`, no `globalThis` / `window` / `self`; everywhere no `innerHTML`, no `unsafeHTML`, no barrels, no `..`
   segment in an import (use `#engine/ #ui/ #platform/ #content/ #tests/`).
3. **Design** — a move is visible without scrolling at 360 × 640 on every screen (`e2e/fold.spec.ts`); picture text
   ≥ 12 px (`tests/ui/canvas/Pictures.test.ts`); text contrast and no faded text (`tests/ui/styles/Contrast.test.ts`);
   a view carries no literal text or aria-label — words live in the presenter
   (`tests/ui/screens/ViewsCarryNoWords.test.ts`); every button and image is named, and reduced motion is respected
   (`e2e/a11y.spec.ts`); every tappable thing is a real `button[data-option]` and a tap in a picture resolves to an
   option id, or is a view control that only moves the view and picks nothing (the plan's corner map pulls back to the
   whole plan; the MAP key over a room's picture flips it to the plan and back) (no test names this wall yet).

## Code rules

- File = class name, one class per file (`Seed.ts`); interfaces and types likewise. Imports carry `.ts`.
- `erasableSyntaxOnly`: no `enum`, no constructor parameter properties. `#private` fields.
- Randomness: `seed.branch(key)` then one helper (`pick`, `range`, `probability`). Never a stream. Text keys never
  start with `#` (Seed's own); `branch(1)` ≠ `branch('1')`.
- Focus after a render: `Shell` owns it — an option names the option that undoes it, a screen marks its resting place
  (`data-rest`), and a panel that just opened marks itself `data-spot`: the shell scrolls it into view (instant under
  `prefers-reduced-motion`, clear of the dock by `scroll-padding`) and gives it the focus. Only a shown button takes
  the focus.

## Tests first

Test, RED, then code. `tests/` mirrors `src/`; doubles in `tests/support/`. Expected values are literals; a diff is a
finding. What to assert: the testing principles in `../CLAUDE.md`. Playwright owns browser behaviour and runs in one
profile, `phone` (portrait, touch). When the browser tests run, look at the screenshots in `test-results/` yourself
before calling UI work done.

**Play-session fixtures** (`tests/fixtures/*.json`, `{ "seed": "XXXX-XXXX-XXXX-XXXX", "history": [...optionIds] }`
from the title on, discovered by directory listing in `tests/engine/rules/Sessions.test.ts`): each is replayed in debug
mode with a reload after every tap — the reloaded game shows the same screen and its next tap writes the same save. A
new kind of turn gets a fixture that takes it.

**Goldens** (`tests/goldens/*.txt`, written by `tests/content/Goldens.test.ts`): the full text of a fixed walk,
street to room, for three seeds. Nothing else writes them: `npx vitest run tests/content/Goldens.test.ts -u` is the
one writer, run only after an intended content or wording change; read `git diff tests/goldens` before committing —
a changed line is a finding, never a chore. They are this game's approved snapshot (testing principle 6): the one
place the screen's words are checked. Every list has a size floor (`tests/content/ContentFloors.test.ts`): a list may
only grow.

## Touch first

Every button is ≥ 44×44 CSS px. Nothing depends on hover or a key. Portrait at 360 px never scrolls sideways. Saves:
`localStorage` only, with no compatibility: the game has no users yet, so old saves, journals and seeds need no
migration.

## Commands (from `web/`)

| Do                                                                   | Command                                   |
| :------------------------------------------------------------------- | :---------------------------------------- |
| Gate: typecheck + lint + format + unit tests                         | `npm run check` → one `STATUS=` line      |
| Browser tests, the phone profile, production build                   | `npm run e2e`                             |
| The full playthrough alone (title → void → reload), the phone        | `npx playwright test --grep @playthrough` |
| Play while developing                                                | `npm run dev`                             |
| Site → `dist/` (base `/endless-transit/play/`; `ET_BASE` overrides)  | `npm run build`                           |
| Publish: check → build → `../docs/play/` + `build.txt` (then commit) | `npm run publish:site`                    |
| Format                                                               | `npm run format`                          |
