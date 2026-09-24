# The Web Game — How It Is Built
**Written:** 2026-09-24, from the code at the end of the port (ten iterations, `tasks/PORT_QUEUE.md`). **Audience:** a
developer or a fresh session that needs the picture without reading the ten iteration notes (`tasks/port/I01..I10.md`
— the record of every class, choice and Guide-versus-code decision). The law the code lives by is `web/CLAUDE.md`;
this page explains the shape that law produced. Player-facing rules and numbers: `docs/web/players_guide.md`.

> **In one paragraph.** `web/` is one npm package: a strict-TypeScript single-page game on Vite, with a pure and
> deterministic engine that knows nothing of the browser, a thin browser layer that hands it storage and entropy, and
> a screen layer that turns the engine's plain-data snapshot into HTML with `lit-html` and into two hand-drawn canvases.
> One seed builds one world lazily; every tap goes through one method, `GameEngine.step(optionId)`; the save is seed +
> path + what visited places remember + the traveller. The Groovy game in `terminal/` is frozen and was the source of
> the rules, never of the code.

---

## 1. The stack, as installed

| Tool | Version | Role |
| :-- | :-- | :-- |
| TypeScript | `~6.0.3` | strict, `erasableSyntaxOnly` (no enums, no constructor-parameter properties), project references: `tsconfig.engine.json` has **no DOM lib** |
| Vite | `^8.3.0` | dev server, production build to `dist/`, base `/endless-transit/play/` (`ET_BASE` overrides) |
| Vitest | `^5.0.1` | unit tests in Node, config inside `vite.config.ts` |
| Playwright | `^1.63.0` | browser tests against the production build, two projects: `desktop` and `phone` (Pixel 7, portrait, touch), one worker |
| ESLint `^10` + typescript-eslint `^8.70` | flat config | the lint walls (§3) and file naming; Prettier `^3.9` formats |
| lit-html | `3.3.3` | the one render helper; the only runtime dependency besides two font packages |
| Node | ≥ 24.12 | runs `.ts` scripts directly (`scripts/check.ts`, `scripts/publish.ts`) |

Commands, from `web/`: `npm run check` (typecheck + lint + format + unit tests → one `STATUS=` line), `npm run e2e`,
`npm run dev`, `npm run build`, `npm run publish:site` (check → build → `../docs/play/` + `build.txt`; commit it, a
push publishes — GitHub Pages serves `master:/docs`). Size at the end of the port: 153 kB JS (50 kB gzip), 19 kB CSS.

## 2. The layers

```
src/
├─ engine/        pure · synchronous · deterministic · no DOM, no packages, no clock, no Math.random
│  ├─ rng/          Seed (own 64-bit kernel: branch(key) then one draw — pick, range, probability)
│  ├─ content/      ContentSource + ContentLibrary (parsers of the .txt lists), WarningSink
│  ├─ model/        the places (Universe … Room, the four abyssal kinds), value objects, relics, moves, scans
│  ├─ procgen/      LocationRegistry (kind → factory), the factories, decks, names, themes
│  ├─ rules/        GameEngine, Journey, Player, Coherence/Drain, commands, prompts, summaries
│  └─ persistence/  SavedGame (the format, v6) + SaveStore interface
├─ content/       the forked .txt lists + index.txt files, and the ONE import.meta.glob (BundledContent)
├─ platform/      LocalStorageSaveStore, CryptoEntropySource, ConsoleWarningSink
├─ ui/            Shell, ScreenStage, Presenter/View seam, InputRouter, screens/ (presenter + VM + view per screen), canvas/
└─ main.ts        the composition root: the only place adapters are built and injected
```

Sizes: engine 130 files / 7,500 lines (model 3,600, rules 1,900, procgen 1,500); ui 39 files / 2,800 lines;
platform 57 lines. Tests: 476 unit (`tests/` mirrors `src/`), 233 browser (`e2e/`), run on both profiles.

**Who may import whom.** The engine imports only itself (`./…` and `#engine/…`). `content/`, `platform/` and `ui/`
import the engine; nothing imports `ui/` but `main.ts`. Package-level specifiers (`#engine/*`, `#ui/*`, …) come
from `package.json` `imports`; no `../` segments, no barrels, imports carry `.ts`.

## 3. The walls — what keeps the engine pure

1. **Compiler:** `tsconfig.engine.json` lists only `src/engine` and has no DOM lib, so `document`, `window` or an
   import of `../ui/…` fail to type-check (TS2584 / TS6307).
2. **Lint:** in `src/engine/**` no import outside the engine, no `Math.random`, no `Date` in any form, no
   `performance`, `globalThis`, `window`, `self`; everywhere no `innerHTML`/`unsafeHTML`, no barrels, no `..` in an
   import; a class lives in the file of its name (`Seed.ts`).
3. **Interfaces the engine owns** for what it needs from outside: `ContentSource` (the lists), `SaveStore` (a string
   slot), `EntropySource` (bits for a new seed), `WarningSink` (a `[THEME_WARN]` when an index promises a list the
   content lacks — never a silent fallback). Tests pass memory doubles (`tests/support/`) and a *throwing* warning sink.

Every wall was shown red on a scratch file when it was added (`tasks/port/I01.md`, part C).

## 4. The engine

**Seeds.** `Seed` holds 64 bits as two halves and is shown `XXXX-XXXX-XXXX-XXXX`. Every derived value is
`seed.branch(key)` followed by exactly one helper (`pick`, `range`, `probability`); there is no stream. A number key
and a text key never collide, helper keys carry a reserved `#` prefix. Same seed → same world, pinned by tests and by
three golden text dumps (`tests/goldens/`, one writer: `vitest -u`, reviewed before commit).

**The world is a lazy tree.** `Location` is the abstract place; a place is generated from its parent's seed and its
branch key, and its `children()` populate once behind a private array (the lazy-loading law, restated for TS).
Walking one branch never generates siblings. Kinds are registry entries: `LocationRegistry` maps `LocationKind` →
`LocationFactory`; a new kind of place is one more entry, and the four abyssal kinds (Layer, Artery, Crypt, Shard)
are the same factories registered again under other kinds. Nothing in `src/engine` checks a kind with `instanceof`
or a switch; the place is asked (`listing()`, `moves()`, `arrival()`, `scan()`, `capture()`, `breachOffered()`, …).

**Domain values are objects with stable keys**: `Address` (the path of indices, the save's and the visited set's
key), `Culture`, `Era`, `Trait`, `LocationKind`, `Frequency` (whole hertz; resonant = a multiple of 11 that is not 0),
`Gematria`, `Relic` (form + parts), `RelicFragment` (a relic with its provenance — the room that dealt it, at the
hertz that room gives it), `Hybrid`, `Keystone` (0 Hz, bound by the building's address), `SpectralEcho`,
`HiddenFrequency`. A dropped fragment keeps its identity because it *is* its identity.

**Moves are a table.** A floor holds a `FloorState` (`ElevatorState` / `CorridorState`) and asks it for its moves;
each state and each room owns one `MoveTable` of `MoveRule`s (`move`, `to`, `act?`) from which `moves()` is derived,
so whatever is offered can be made and a move knows its `opposite` (up ↔ down, forward ↔ back). Breach and descend
are moves the state offers when the building says the ritual allows them.

**What a place remembers.** `remember()`/`recall(memento)` give each place one string of its own state: a floor's
mode, a building's elevator floor, its ritual (sampled floors, merges, breach), a room's taken keys and dropped
fragments, a reach's echo hunt. Only visited places carry one; the save collects them by address.

**The turn.** `GameEngine.step(optionId)` is the only way in. It resolves the id against the options on offer (a
stale id changes nothing), drains Coherence *before* the command (`Drain`: 1, ×2 under an entropic street era — the
street's, never the apartment's drift — ×2 below the bedrock, ×4 on a Layer's own screens), runs the command's
`Turn` (`STEP` drains and counts a step, `GLOBAL` drains only, `FREE` neither), rolls the room's lottery after a
counted step, saves, and returns a `GameSnapshot`: plain readonly data — `world`, `place`, `player`, `buffer`,
`prompt`, `options` (`GameOption`: `{ id, key, label, role, opposite, sealed, visited, … }`), `message`, and the
panels `scan` / `map` / `trace` that ride until the next step. Commands are registry entries (`GameCommand` with a
key and a `Turn`); child keys come from a pool that excludes the letters commands claim.

**Prompts are states, never reads.** At zero Coherence the engine holds a `RebootPrompt`; END SESSION opens a
`RecapPrompt`; BUFFER a `BufferPrompt` (select, merge, drop, back); HELP a `HelpPrompt`. A `Prompt` offers the only
options on offer and answers with a `Reply` that settles it or keeps it open; answers cost nothing.

**The traveller.** `Journey` owns the place the traveller stands in and the `Player`: `Coherence` (bands at 70/30,
corruption below 40), steps (only moves count), the visited path (every ancestor of every place entered — the source
of `[V]` marks), the `Buffer` (sixteen fragments; a merge of two makes their hybrid and restores 15), the resonance
tally (a fresh resonant capture counts once). Death rebuilds the world from the same seed on the starting street with
100 Coherence; steps, visited places and the buffer are kept, every per-place memory is gone.

**The save (`SavedGame`, v6).** Plain JSON: `version`, `seed`, `path`, `states` (memento by address of every visited
place), `coherence`, `steps`, `visited`, `buffer` (fragment data with provenance), `resonant`. The world is never
stored. `restore` is strict: a save the journey could not have written — a state off the path, a path a floor's
mode does not admit, a fragment no room dealt, a Keystone for no building — is refused whole and the title screen
opens; `saved(restore(s)) === s` for every valid save; another version is no save (nobody to migrate for). Play-session
fixtures `{ seed, history }` under `tests/fixtures/` replay with a reload after every tap.

**Content.** The `.txt` lists were copied from `terminal/src/main/resources` (byte-identical, `cmp`-checked) and are
owned by the web game from then on. Every directory has one `index.txt`; **order is the index's order**, never a
glob's; which cultures exist is `themes/cultures/index.txt` alone. Objects come from a shuffled deck per
culture × era (no card twice in an apartment), furniture is condition + culture item, atmosphere text glitches by
the room's anomaly. Every list has a size floor pinned by `tests/content/ContentFloors.test.ts`.

## 5. The screens

**The seam.** `Shell` holds the engine and a list of `ScreenStage`s (presenter + view). After every step it asks the
stages which presenter `accepts` the snapshot, calls `Presenter.toViewModel(snapshot)` — the presenter **owns every
word**, casing and aria label; a `*View.ts` carries no literal (`tests/ui/ViewsCarryNoWords.test.ts`) — and the
`View<VM>` renders it with `lit-html` into a container that survives renders (focus, scroll and transitions keep
working). Screens: Title, Hud (the world), Buffer, Help, Reboot, Recap.

**Shell's four rules for every screen:** where the focus goes after a render (the option that held it; if it vanished,
never its `opposite` move — the panel instead); a newly opened panel (scan, map, trace) is scrolled into view and
given the focus; one live region, mounted once, whose text changes (the status; a screen's headline when the engine
has no message); the previous scene's focused option gets the focus back on the way back.

**Input.** `InputRouter` maps tap/click and, on desktop, a key to an option id and calls `engine.step`. Every action
is a real `<button>` at least 44 × 44 CSS px; nothing depends on hover or a key.

**Phone first.** Under 900 px the HUD folds behind a readout button (last two crumbs, steps, buffer and position
stay), the moves sit under the place's title, the dock is LEAVE + MORE (MORE is a disclosure holding scan, map,
buffer, trace, help, title, end session); every screen shows a move without scrolling at 360 × 640. Desktop shows the
dock in one row and a right column (objects, telemetry, the pane map or spectrogram). `prefers-reduced-motion` stops
the bar, the canvas pulse and the spotlight; `viewport-fit=cover` pads the dock for a home bar.

**Canvas.** `src/ui/canvas/` is the only hand-drawn code: a `Picture` (`MapPicture`, `TracePicture`) is a pure function
of a plain view-model into `Painter` calls, so a stub painter tests it in Node; `CanvasView` draws it into a host
with the stylesheet's tokens (`Inks`) at device pixel ratio and stays still under reduced motion. The map's marks
(dim/bright, the `X` glitch marks below 30, `☠` below the bedrock) and the spectrogram bars are seeded from
`FrameEntropy` (place + step count), never the clock. Each canvas has a text alternative from the same data.

**Debug mode.** `?debug` on the address, read only in `main.ts`, puts the debug commands on offer (INTEGRITY ladder,
PRIME, KEYSTONE) as a folded strip out of the tab order; tests turn it on with `debug: true`.

## 6. Tests — the three layers

1. **Vitest, engine in Node** (milliseconds): rules with exact edges (`toBe` on observed min/max over many seeds),
   determinism and laziness, strict restore, fixtures replayed, goldens, content floors, contrast of every text token
   against every surface (≥ 4.5:1, parsed from the stylesheet), views carrying no words.
2. **Vitest, UI without a browser:** presenters → view-models, canvas pictures against a recording painter.
3. **Playwright, production build, `desktop` + `phone`:** every flow (title, world walk, buildings, items, survival,
   ritual, map, fold, focus, announce, a11y, resilience against corrupt saves and a throwing storage, help), and
   `@playthrough` — the whole game from the title to the void recap and a reload that continues
   (`npx playwright test --grep @playthrough`). Screenshots land in `test-results/` and are looked at before UI work
   is called done.

## 7. Against the terminal game — the developer's view

| | Terminal (`terminal/`, Groovy, frozen) | Web (`web/`) |
| :-- | :-- | :-- |
| Rules and numbers | the source | the same, from the Player's Guide; where Guide and code disagreed the Guide won (each case in the iteration notes) |
| Seeds | `java.util.Random`, `LocusSeed.branch` | own kernel, same design (branch then draw); **no seed or save compatibility** |
| Menus | `Map<String, Closure>`, labels parsed downstream | options as data, ids resolved by the engine |
| Input | blocking reads inside commands | `step(id)`; a pending prompt is a state |
| Lazy loading | a `List` subclass intercepting access | explicit `children()` behind a private array |
| Model ↔ UI | model imports `ui.Terminal`, sleeps, prints warnings | engine has no output device; sinks injected |
| Static state | `Terminal.sink`, `ScreenshotRegistry`, static generators | none; everything injected from `main.ts` |
| Save | seed + LIP path + mutations by LIP, `session.trace` on disk, `sync` command | seed + path + mementos by address + traveller, one `localStorage` slot written after every tap, strict restore |
| Content order | sorted `TreeMap` for cultures, file order for doors | the index file's order, asserted |
| Known defects (12, study §2.4) | present | fixed, each pinned by a named test (`tasks/port/I09.md`) |
| Not carried | `p`/`P` screenshots, `journal.txt`, `sync`/export, buffer destroy, auto-take, `[CLEARED]` floor progress, the endless Layer list (ten Layers instead), universe/filament pane variants | — |
| Visual gate | 36 golden ANSI frames | 3 golden text dumps + Playwright screenshots on two profiles + a human look |

The full player-facing list of the 27 differences is the last section of `docs/web/players_guide.md`.

## 8. Where things are

| Need | Look at |
| :-- | :-- |
| The law (layers, walls, rules of the code) | `web/CLAUDE.md` |
| Why the stack and the layout (decided before the port) | `docs/analysis/WEB_PORT_STUDY.md` — where it and the queue disagree, the queue won |
| The decisions the port ran on and the ten iterations | `tasks/PORT_QUEUE.md` |
| Every class, choice and Guide-versus-code item, per iteration | `tasks/port/I01.md` … `I10.md` (Shape tables) |
| Player rules and numbers, cited from `web/src` | `docs/web/players_guide.md`, `docs/web/cheat_sheet.md` |
| Lessons paid for during the port | `tasks/lessons/web.md` |
