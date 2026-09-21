# Endless Transit — the web game

Strict-TypeScript single-page game, **phone first**. Work queue and binding Decisions: `../tasks/PORT_QUEUE.md`
(it wins over the spec, `../docs/analysis/WEB_PORT_STUDY.md`). One note per iteration: `../tasks/port/`.
OO law (eight principles, Shape table, coverage claims): `../.claude/CODEX.md`.
Lessons: @../tasks/lessons/web.md

## Layers — who may import whom

`src/engine/` pure, synchronous, deterministic; imports **only** `./…` and `#engine/…` — no DOM, no packages, no clock,
no `Math.random`. It receives what it needs through interfaces it owns (`ContentSource`, `SaveStore`, `EntropySource`).
`src/content/` the `.txt` lists + the ONE `import.meta.glob` (`BundledContent`). **Order = the `index.txt` order.**
Which cultures exist: `themes/cultures/index.txt` only — directories keyed by culture carry no index of their own.
`src/platform/` browser adapters. `src/ui/` screens, input, styles — depends on the engine, never the reverse.
`src/main.ts` the composition root: the only place adapters are built.

The loop: tap/click/key → `InputRouter` → option id → `GameEngine.step(id)` → plain-data snapshot → the
`ScreenStage` whose presenter `accepts` it → `Presenter.toViewModel` → `View<VM>.render` (lit-html). Options are data
`{ id, key, label, place, role, sealed, landmark }`; a new action is a registry entry in `GameEngine`, a new screen one
more stage in `main.ts`; a pending prompt is a state, never a blocking read.

The world: `model/Location` owns the **lazy-loading law** — children sit behind a private array and exist only after
`children()`, generated once through the injected `ChildSource`. A kind of place is a class that answers for itself
(name, words, vibe, `sealed()`) plus a `LocationFactory` entry in `procgen/LocationRegistry`; nobody asks "which kind are
you?" (`instanceof`, a `switch` on `kind().key()`). Child `i` is born from `parentSeed.branch(i)` and nothing else. Where
the traveller stands: `rules/Journey`. A presenter never cuts a name out of a label — the option carries it.

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
- Words live in the presenter; a `*View.ts` has no literal text or aria-label. Focus after a render: `Shell` owns it.

## Tests first

Test, RED, then code. `tests/` mirrors `src/`; doubles in `tests/support/`. Pins are literals: a diff is a finding.
Playwright owns browser behaviour and runs **twice**: `desktop` and `phone` (portrait, touch). Look at the
screenshots in `test-results/` yourself before calling UI work done.

## Touch first (Decisions 1–5)

Every action is a real `<button>` ≥ 44×44 CSS px. Nothing depends on hover or a key — keys are a desktop extra.
Portrait at 360 px never scrolls sideways. `prefers-reduced-motion` is respected. Look: the visual mock
(`../docs/analysis/mocks/ships-of-the-lattice-visual.html`). Saves: `localStorage` only. No journal.

## Commands (from `web/`)

| Do                                                                   | Command                              |
| :------------------------------------------------------------------- | :----------------------------------- |
| Gate: typecheck + lint + format + unit tests                         | `npm run check` → one `STATUS=` line |
| Browser tests, both profiles, production build                       | `npm run e2e`                        |
| Play while developing                                                | `npm run dev`                        |
| Site → `dist/` (base `/endless-transit/play/`; `ET_BASE` overrides)  | `npm run build`                      |
| Publish: check → build → `../docs/play/` + `build.txt` (then commit) | `npm run publish:site`               |
| Format                                                               | `npm run format`                     |
