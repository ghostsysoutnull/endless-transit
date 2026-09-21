# Endless Transit — the web game

Strict-TypeScript single-page game, **phone first**. Work queue and binding Decisions: `../tasks/PORT_QUEUE.md`
(it wins over the spec, `../docs/analysis/WEB_PORT_STUDY.md`). One note per iteration: `../tasks/port/`.
OO law (eight principles, Shape table, coverage claims): `../.claude/CODEX.md`.
Lessons: @../tasks/lessons/web.md

## Layers — who may import whom

`src/engine/` pure, synchronous, deterministic; imports **only** `./…` and `#engine/…` — no DOM, no packages, no clock,
no `Math.random`. It receives what it needs through interfaces it owns (`ContentSource`, `SaveStore`, `EntropySource`).
`src/content/` the `.txt` lists + the ONE `import.meta.glob` (`BundledContent`). **Order = the `index.txt` order.**
`src/platform/` browser adapters. `src/ui/` screens, input, styles — depends on the engine, never the reverse.
`src/main.ts` the composition root: the only place adapters are built.

The loop: tap/click/key → `InputRouter` → option id → `GameEngine.step(id)` → plain-data snapshot →
`Presenter.toViewModel` → `View<VM>.render` (lit-html). Options are data `{ id, key, label }`; a new action is a
registry entry; a pending prompt is a state, never a blocking read.

## The walls (each proven RED on a scratch file when added)

1. **Compiler** — `tsconfig.engine.json`: no DOM lib, composite file list (TS6307 / TS2584).
2. **Lint** — `eslint.config.js`: engine import ban, no `Math.random` / `Date.now` / `new Date` in the engine; everywhere
   no `innerHTML`, no `unsafeHTML`, no barrels, no `../` imports (use `#engine/ #ui/ #platform/ #content/ #tests/`).

A new invariant ships with its rule in the same iteration.

## Code rules

- File = class name, one class per file (`Seed.ts`); interfaces and types likewise. Imports carry `.ts`.
- `erasableSyntaxOnly`: no `enum`, no constructor parameter properties. `#private` fields.
- No static state. A `static` names its reason in a comment (factory for a text form, entry point).
- Randomness: `seed.branch(key)` then one helper (`pick`, `range`, `probability`). Never a stream.

## Tests first

Test, RED, then code. `tests/` mirrors `src/`; doubles in `tests/support/`. Pins are literals: a diff is a finding.
Playwright owns browser behaviour and runs **twice**: `desktop` and `phone` (portrait, touch). Look at the
screenshots in `test-results/` yourself before calling UI work done.

## Touch first (Decisions 1–5)

Every action is a real `<button>` ≥ 44×44 CSS px. Nothing depends on hover or a key — keys are a desktop extra.
Portrait at 360 px never scrolls sideways. `prefers-reduced-motion` is respected. Look: the visual mock
(`../docs/analysis/mocks/ships-of-the-lattice-visual.html`). Saves: `localStorage` only. No journal.

## Commands (from `web/`)

| Do                                                                  | Command                              |
| :------------------------------------------------------------------ | :----------------------------------- |
| Gate: typecheck + lint + format + unit tests                        | `npm run check` → one `STATUS=` line |
| Browser tests, both profiles, production build                      | `npm run e2e`                        |
| Play while developing                                               | `npm run dev`                        |
| Site → `dist/` (base `/endless-transit/play/`; `ET_BASE` overrides) | `npm run build`                      |
| Format                                                              | `npm run format`                     |
