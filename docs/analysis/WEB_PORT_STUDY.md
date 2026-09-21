# The Web Port — Study and Decision Record
**Created:** 2026-09-21 · **Backlog:** CONCEPT-002 (`tasks/backlog/CONCEPTS.md`) · **Predecessor:** `WEB_PORT_CONCEPT.md`
(the seven questions this study answers).
**Status:** STUDY — decisions recorded. **The plan is `tasks/PORT_QUEUE.md`; where it disagrees with this study (work order by playable iterations, publishing first, touch-first, no save export/import, no journal, no per-stage `/grill`), the queue wins.** It authorizes no source change and no folder move; each stage
in §9 becomes work only through its own plan file, `/grill` and a Directive.
**How decisions are asked in this effort:** one question per message, lettered options, a marked pick (user
instruction, 2026-09-21, this effort only).
**Evidence:** two read-only audits of this repository and three web-research passes, all run 2026-09-21. Versions come
from `npm view` against the live registry that day; doc claims carry their URL. Items the research could not confirm
are listed in §10 — nothing here is from memory.

> **In one paragraph.** The Groovy terminal game is frozen and moves to `terminal/`; the new game is a strict-TypeScript
> single-page app in `web/` and is where all new development happens. It is a *rewrite guided by the source*, not a
> translation: same rules and numbers as the Player's Guide, known bugs fixed rather than copied, its own seeded
> generator (old seeds and saves mean nothing in it), the visual mock's look and key grammar. Ships (CONCEPT-001) will
> exist only in the new game; the mock stays the lab where they are polished.

---

## 1. Decisions (user, 2026-09-21)

| # | Question | Decision |
| :-- | :-- | :-- |
| D0 | Must the same seed give the same world as Groovy? | **No.** "The new implementation is king." No bit-exact `java.util.Random`, no conformance fixtures, no Groovy dumper — zero Groovy code changes in the whole effort. Determinism holds *inside* the new game and is pinned by its own tests. |
| D1 | Repository layout | Root holds two siblings, **`terminal/`** (Groovy) and **`web/`** (new game). Root `CLAUDE.md` is minimal; the main law lives in **`web/CLAUDE.md`**. |
| D2 | New repo or same repo | **Same repository, reorganized** with `git mv` — history, GitHub repo, site address and chronicles continue. |
| D3 | `web/` — one package or workspaces | **One package** (tree in §4). The engine boundary is enforced by the compiler and one lint rule (§5). |
| D4 | Shared records | **Project records stay at the root** (`docs/` player site, `journals/`, `tasks/`, `.claude/`); **Groovy-only records move into `terminal/`** (class blueprints, retros, OOA plan and report, finished HK/phase plans, Groovy lessons and domain `CLAUDE.md` files). |
| D5 | Which rules are the spec | **The Groovy game's rules and numbers** (Player's Guide), bugs fixed not copied; the mock supplies look and key grammar; where they disagree on a rule, Groovy wins unless the user says otherwise at that moment. **Amendment:** the mock keeps living as the lab for ship concepts, which are *not* in Groovy and never will be. |
| D6 | Engine style | **Object-oriented under the eight CODEX principles**, freshly layered (not mirrored): engine never imports UI, menus are data not closures, nothing blocks on input. Shape table and OO law carry over, translated to TypeScript. |
| D7 | HTML panels | **Vanilla structure + `lit-html` as the one render helper**, behind a `View` seam (§6). Canvas stays hand-written. |
| D8 | File naming | **File = class name, one class per file** (`Building.ts`); the few non-class files lowercase (`main.ts`, configs). Enforced by lint. |
| D9 | Publishing | **One GitHub Actions workflow builds Jekyll + the game into one Pages artifact** (game at a path such as `/endless-transit/play/`). Done at the publish stage; the site is untouched until then. |

**Implied by D5's amendment (stated to the user, not asked):**
* **Groovy is frozen.** No features. Code-internal housekeeping (HK-013 long methods, WF-006 lint metric) is moot; the
  game-side oddities (HK-021, HK-023, HK-024) become the port's fix/decision list.
* **Content forks.** The `.txt` lists are copied into `web/src/content/` and owned by the new game from then on (adding a
  line to a shared list would change the Groovy world and its pins). Groovy keeps its frozen copy.

**Defaults proposed, not yet asked** (raise as single questions when their stage arrives): saves in `localStorage` with
export/import to a file, old `session.trace` not loaded; tests in a parallel `web/tests/` tree (part of the tree the
user accepted in D3); TypeScript 6.0.x + ESLint rather than TypeScript 7 + oxlint (§3); Prettier as formatter; ships
sequenced after the port reaches rule parity.

---

## 2. What the Groovy audit found (facts that shape the rewrite)

Size: ~9,300 production lines / 140 files (core 48, model 33, procgen 28, ui 31), ~6,800 test lines / 77 test classes /
296 tests, 78 plain-text resource files, **zero runtime third-party libraries**. 134 of 141 files are `@CompileStatic`
(the other 7 are six interfaces and the `Main` script); no metaprogramming, traits or dynamic dispatch — types map
almost one-to-one to TypeScript.

### 2.1 Good designs to keep
* **Every seed is a pure function of (parent seed, branch key).** `LocusSeed.branch(key)` → `StandardMixer.mix`;
  `LocusSeed.next()` (the only stream-style derivation) has zero callers. Generation is position-independent and lazy —
  this is what makes an endless world cheap, and the new generator keeps the design (not the numbers).
* **Semantic helpers branch first, then draw once** (`"PICK"`, `"RANGE"`, `"PROBABILITY"` …), so each is a pure
  function of its locus.
* **`ViewComponent.render(ctx, width) → lines`** is a clean, side-effect-free render seam; `RenderContext` is
  read-only. The idea (views are pure functions of a context) carries to §6.
* **Save = seed + LIP path + mutations by LIP**, plain JSON. The shape carries; the files do not (D0).
* **Normal quit returns `false` from the loop**; `System.exit` is crash-only.
* **Index files** (`index.txt`) enumerate every resource directory — ideal for a browser (no directory listing) and the
  ordering authority for content (§4, content).
* **All HUD noise is seeded from the frame's own inputs** (`FrameEntropy`: LIP hash + step count) — the reason frames
  are reproducible. Keep for canvas effects that must be testable.

### 2.2 Designs the rewrite must NOT copy
| Problem in Groovy | Evidence | In the new engine |
| :-- | :-- | :-- |
| Blocking reads scattered through commands | `Game:89`, `InputHandler:42`, `RenderingCoordinator:58` (inside a `while(true)`), `QuitCommand:19,21`, `QuantumBufferController:24`, `SetIntegrityCommand:18`, plus `waitForEnter` sites | `step(state, input)`; a pending prompt is a *state* ("awaiting confirmation"), never a read |
| Menus are `Map<String, Closure>`; labels are parsed downstream by the renderer and the input matcher | `Location.getOptions(Game)`; `CompassComponent`/`DirectiveMenuComponent` inspect keys like `"u. Go Up"` | options are data: `{ id, key, label, kind }`; the engine resolves an id to an action |
| Every package imports every other (`model`→`core` 45×, `procgen`→`ui` 6×) | import census | strict layering, compiler-enforced (§5) |
| Generation cannot run without a terminal (warnings via `Terminal.println`) | `ThemeService:134,204`, `NameGenerator:109`, `CorridorFactory:35`, `Gematria:24` | injected logger/event sink; engine has no output device |
| The model calls the UI and sleeps | `Building:49,51,150` → `ui.Terminal.clock.sleep(1000)` (HK-023) | timing belongs to the UI; the engine is synchronous and instant |
| Static mutable globals | `Terminal.sink/virtualBuffer/clock`, `ScreenshotRegistry`, `InputHandler.defaultSource` | no static state (principle 4) |
| Lazy loading by intercepting `List` access (`LazyLocusList`), with an add-vs-access asymmetry | `model/LazyLocusList.groovy:30-64` | explicit `children()` accessor that populates once; private backing array (the 2026-03-06 lazy-loading law, restated for TS) |
| Content depends on two hidden map orders (sorted `TreeMap` for cultures/eras, file order for doors) | `ThemeService:8-14`, `LocusSeed:100`, `Door:37` | one rule: **order = the index file's order**, asserted by a test |
| Turn-derived text reads live player state inside generation | `Room:71`, `NullSector:92` (`branch(player.stepCount)`) | keep the behaviour, but pass the step count in as an argument — no engine object reaches for the player |
| `Gematria.calculate` prints as a side effect | `Gematria:24` | pure |

### 2.3 Rules and numbers — where the spec lives
The Player's Guide (`docs/terminal/guide/players_guide.md`, every number cited from source) is the language-neutral
spec, with the manual and codex beside it. The Groovy classes where the rules actually live, and therefore the files to
read most carefully: `Room.getOptions` (103 lines), `Building.getExtraContent` (84), `ScanCommand` (corridor/apartment
scans), `TurnProcessor`, `SyncManager`, `Gematria`, `SpectralFrequency`, `Building.keystoneIn` / `Floor.addBreachOption`,
the 14 per-type factories under `procgen/`.

### 2.4 The port's pre-existing defect list (fix, don't copy — D5)
From `tasks/backlog/HOUSEKEEPING.md`. **Game-side, to decide or fix in the new game:** HK-024 (should the debug
`KEYSTONE` glitch prime the building?); HK-021 (a dropped relic is stored by name and returns at a recomputed Hz — the
guide warns about it; two near-identical corridor screens after leaving an apartment; `Door.visited` never set);
HK-023 (two LIP walkers with different leniency; a memento carries no breach flag; `resonantTracesCount` missing from
the save; a Keystone's 0 Hz satisfying `% 11 == 0`; the unreachable `[TEMPORAL_MARKER]`; tally farmable by
drop-and-retake; the mislabelled "stabilized" tally; map legend glyphs never drawn). **Moot with the freeze:**
HK-013, the dead-code bullets of HK-021, `glitchText("X",1.0)`, `"RED"` printed as a word, `run.sh:118`, the README's
Groovy version, WF-006.

---

## 3. The stack (verified 2026-09-21)

| Tool | Version | Why / what changed recently |
| :-- | :-- | :-- |
| **TypeScript** | **`~6.0.3` — not 7** | `npm i typescript` now installs 7.0.2, the Go-native compiler, which ships **no JS API**; typescript-eslint's peer range is `<6.1.0` and it crashes on 7 ([issue #12518](https://github.com/typescript-eslint/typescript-eslint/issues/12518)). `create-vite` itself pins `~6.0.2`. A 6.0 config with no deprecation warnings is forward-compatible with 7. TS 6 changed defaults: `strict` on, **`types: []`** (list `vite/client`, `node` explicitly). [6.0 notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html) |
| **Vite** | `^8.3.0` | Rolldown bundler + Oxc transform (esbuild/Rollup gone). `import.meta.glob(..., { as: 'raw' })` is deprecated → `{ query: '?raw', import: 'default', eager: true }`. [guide](https://vite.dev/guide/) |
| **Vitest** | `^5.0.1` (5.0.0 shipped 2026-09-03; `4.1.11` is the conservative line) | `test.projects` replaces the workspace file; a separate `vitest.config.ts` *replaces* `vite.config.ts` (use one file); `toMatchFileSnapshot` = golden text files; built-in `agent`/`minimal` reporter; JSON reporter now writes to `.vitest/`; v8 coverage is the recommended default. [docs](https://vitest.dev/guide/) |
| **Playwright** | `@playwright/test ^1.63.0`, chromium only (`npx playwright install --with-deps --only-shell chromium`) | e2e + `toHaveScreenshot` (threshold 0.2, baselines per browser *and OS* — generate and compare in one environment). Vitest browser mode is stable but "does not replace" an e2e runner ([why](https://vitest.dev/guide/browser/why)). |
| **ESLint** | `^10.11.0` + `@eslint/js` + **`typescript-eslint ^8.70.1`** (`strictTypeChecked` + `stylisticTypeChecked`, `projectService: true`) | flat config only (`eslint.config.js`, `defineConfig` from `eslint/config`); `.eslintrc` is gone. `eslint-plugin-import` does **not** support ESLint 10. |
| **Formatter** | Prettier `^3.9.8`, run as its own script | typescript-eslint: keep formatting out of ESLint. |
| **lit-html** | `3.3.3` | 3.2 KB gzip, one types-only dependency, no plugin, no JSX, type-checks clean under our flags (probe). |
| **Node / npm** | 24.14 / 11.9 (installed) | Node ≥ 24.12 runs `.ts` files directly (type stripping) — no `ts-node`/`tsx` for scripts — *if* the code has no enums, no constructor parameter properties, `.ts` import extensions and `import type`. |

**Alternatives looked at and not taken:** Biome (typed rules partial and still in `nursery/`; cannot run ESLint
plugins); oxlint (the one linter that works with TS 7, but typed mode is self-described "incomplete", JS plugins
"alpha" — the credible *future* path); `eslint-plugin-boundaries` v7 / `dependency-cruiser` (not needed for a 3-rule
layer graph; dependency-cruiser also caps TypeScript at `<7`).

### 3.1 tsconfig
Start from the current `create-vite` `template-vanilla-ts` (`moduleResolution: bundler`, `allowImportingTsExtensions`,
`verbatimModuleSyntax`, `moduleDetection: force`, `noEmit`, `erasableSyntaxOnly`, `noUnusedLocals/Parameters`,
`noFallthroughCasesInSwitch`), then add explicitly: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
`noImplicitOverride`, `noImplicitReturns`, `isolatedModules`. Split per runtime, as every Vite framework template does:
`tsconfig.base.json` (shared) → `tsconfig.engine.json` (**no DOM lib**) · `tsconfig.app.json` (DOM, references engine) ·
`tsconfig.node.json` (configs, scripts, tests, e2e) · `tsconfig.json` (solution file: `files: []` + `references`).

**Consequence of `erasableSyntaxOnly` for an OO codebase:** no `enum`, no `constructor(private x: T)` shorthand, no
runtime `namespace`. Kinds become `as const` objects or registries (principle 5 already wants that); fields are declared
and assigned explicitly.

---

## 4. The `web/` tree (D3, D7, D8)

```
web/
├─ CLAUDE.md                     the main law (D1)
├─ package.json                  "type":"module"; "imports": { "#engine/*": "./src/engine/*", … }
├─ index.html                    Vite: the entry, at the package root
├─ tsconfig.json  tsconfig.base.json  tsconfig.engine.json  tsconfig.app.json  tsconfig.node.json
├─ vite.config.ts                also carries the Vitest `test` block (one file — a vitest.config would replace it)
├─ playwright.config.ts          testDir e2e; webServer = `vite preview` (tests the real `base` path)
├─ eslint.config.js              per-folder blocks: engine import ban, no innerHTML, no barrels, file naming
├─ public/                       only files never referenced from source (favicon)
├─ src/
│  ├─ main.ts                    composition root: builds adapters, injects them, starts the UI
│  ├─ engine/                    pure · synchronous · no DOM · imports nothing outside engine
│  │  ├─ rng/                    seed + generator (own algorithm, D0)
│  │  ├─ procgen/                universe → … → room factories, registry per kind
│  │  ├─ model/                  locations, player, inventory, value objects
│  │  ├─ rules/                  turns, coherence, commands, options-as-data
│  │  ├─ persistence/            save format, versioning, `SaveStore` interface
│  │  └─ content/                `ContentSource` interface + parsers of the .txt format (no file access)
│  ├─ content/                   the .txt lists + index.txt files, and the ONE `import.meta.glob ?raw` loader
│  ├─ platform/                  browser adapters: localStorage save store, file export/import
│  └─ ui/                        canvas/ hud/ screens/ input/ styles/ — depends on engine, never the reverse
├─ tests/                        mirrors src: engine/{rng,procgen,model,rules,persistence}/ ui/ + fixtures/ goldens/ support/
├─ e2e/                          Playwright `*.spec.ts` + committed `*-snapshots/`
└─ scripts/
   generated, ignored: node_modules/ dist/ coverage/ .vitest/ .vite/ *.tsbuildinfo .eslintcache
                       test-results/ playwright-report/ blob-report/
```

**Why each non-obvious line:**
* **Single package** — the two large maintained TypeScript browser games on Vite + Vitest (OpenFrontIO, pokerogue) are
  single packages; OpenFrontIO's `src/core` ("deterministic … pure TypeScript with no external dependencies") vs
  `src/client` is this project's rule exactly. Workspaces appeared only in repos that *publish* packages. Nx's own
  advice: "Don't split what always changes together." Reversible: `src/engine` with `#engine/*` specifiers lifts into a
  package by moving one folder.
* **Layer at the top, domain inside the engine** — every sizeable precedent does this (OpenFrontIO, Pokémon Showdown
  `sim/`, boardgame.io, VS Code's `common`/`browser` split enforced by lint).
* **Tests in a parallel tree** — Vitest prescribes nothing; both big TS games use a mirrored `tests/` with shared
  helpers and test data, and it keeps `tsconfig.engine.json` free of test globals. Naming: Vitest `*.test.ts`,
  Playwright `*.spec.ts` (their default globs overlap — Vitest must `include` only `tests/**/*.test.ts`).
* **No `index.ts` barrels** — Vite's performance guide says to avoid them; lint rule. Imports carry the `.ts`
  extension (Vite guide + Node requirement).
* **`#engine/…` via package.json `imports`** — verified by probe to resolve in Vite build, Vitest, `tsc` and plain
  `node` with zero plugins. tsconfig `paths` is discouraged by TypeScript's own docs and unsupported by Node.
* **Content** — `src/content/` + one eager `?raw` glob (bundled, synchronous, works under Vitest — probe-verified).
  The glob lives *outside* the engine (plain Node cannot run `import.meta.glob`); the engine receives a
  `ContentSource`. **Glob key order is an undocumented implementation detail** (a bare `.sort()`, uppercase first) —
  the `index.txt` files stay the ordering authority and a test asserts glob keys == index entries.
* **Saves** — small JSON fits `localStorage` (5 MiB, synchronous); browser storage is evictable (Safari: 7 days
  without interaction), so export/import to a file (Blob + `<a download>`, `<input type=file>`) is the durable copy.
  The engine owns the format and the `SaveStore` interface; tests use an in-memory store.

## 5. The engine boundary — two independent walls
1. **Compiler.** `tsconfig.engine.json` includes only `src/engine`, with `lib: ["ES2023"]` (no `DOM`). Probe result
   with current versions: an engine file importing `../ui/…` fails `tsc -b` with **TS6307**; any `document`/`window`
   use in the engine fails with **TS2584**. (Caveat: without the DOM lib even `console` is unknown — fine, the engine
   logs through an injected sink.)
2. **Lint.** ESLint core `no-restricted-imports` with `patterns`, in a block scoped `files: ["src/engine/**"]` — zero
   extra dependencies. The same mechanism carries the other Vinculum invariants as they are established (OpenFrontIO
   precedent: a `src/core/**` block banning non-deterministic `Math.*`): no `Math.random`/`Date.now` in the engine, no
   `innerHTML` anywhere, file naming, no barrels. *When a phase establishes an invariant, add the rule in the same
   phase and prove it fires on a scratch bad file* (existing lesson, unchanged).

## 6. The UI layer (D7)
**Why not the mock's `innerHTML` repaint:** it destroys nodes every turn — the focused button loses keyboard focus to
`<body>`, the text column's scroll resets, CSS transitions restart (the coherence bar cannot animate between values), a
replaced live region may not announce ([MDN live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)),
and it is the classic XSS vector ([MDN innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML))
— imported saves are untrusted input. Repainting everything per turn is *fine* (one render per keypress) when nodes
survive; `lit-html` is exactly that: `render(template(vm), container)`, only changed parts touched, text auto-escaped,
keyed lists via `repeat`.

**The seam that keeps the choice reversible (exists from day one):**
* `toViewModel(engine) → HudVM` — framework-free, plain readonly data, options as `{ id, key, label }`;
* `interface View<VM> { mount(el: HTMLElement): void; render(vm: VM): void; dispose(): void }`;
* one input router: key/click/touch → option id → `engine.step`.
One trap in every library: the ARIA live region is mounted once, unconditionally; only its text changes.

**The platform now covers the old reasons for a framework** (Baseline *widely available*): `<dialog>` + `showModal()`
(modal focus + inertness), `inert`, `:focus-visible`, `prefers-reduced-motion`, container queries, `:has()`. Newly
available: Popover API, same-document View Transitions. **Not yet (no Safari):** `<dialog closedby>`, `moveBefore()`,
Sanitizer API.

**What real projects do:** panel-heavy games use React/Vue (bitburner, Antimatter Dimensions); small-UI and board-like
games are vanilla (lichess's chessground: zero dependencies); the two serious engine+HUD projects chose the lightest
render layers (OpenFrontIO: Lit; lichess: snabbdom) and both *push* updates from the game loop into a non-reactive view.

**Ruled out for this toolchain:** Lit *components* (Vite 8's Oxc cannot lower decorators — Babel pass or decorator-free
form; custom elements add little for a single-instance HUD); Svelte 5 (second file type, `svelte-check`, 117 releases
in 12 months); Solid (2.0 at rc.9, import-path breaks); uhtml (fails strict types in the probe, single maintainer);
Alpine/htmx (logic in attribute strings the compiler cannot see); Preact (sound, but a component+hooks model beside an
OO engine for five screens). **What would flip it:** long reorderable stateful lists or real forms → Preact; lit
unmaintained for a year → snabbdom or Preact (cheap, because of the seam).

**Canvas testing:** no Playwright canvas guide exists. Screenshots of the canvas locator with a seeded generator and a
frozen clock (`page.clock`), plus `page.evaluate` on state the app deliberately exposes. "A UI change is unverified
until it has been seen" stands — `docs/analysis/mocks/look.js` already does it for HTML.

---

## 7. Testing — what carries over

| Share of today's 296 tests | What they state | Fate |
| :-- | :-- | :-- |
| ~63% (≈185) — behaviour, game-side contract pins, snapshot pins, resource coverage | facts about the **game** ("drain is 99/98/96", "a merge pays +15", "every culture has a walls file") | re-expressed as the new suite. **Rules and numbers carry; Groovy's literal generated values do not** (D0) — the new game captures its own snapshot pins once reviewed, same discipline: *a diff is a finding*. |
| ~21% (≈62) — 36 golden frames + UI-string pins | facts about a 130-column ANSI terminal (cursor-positioning escapes embedded) | stay with Groovy. The new visual gate: `toMatchFileSnapshot` for view-models / text, Playwright screenshots for the picture. |
| ~13% — wiring, factory identity, EventBus, infra/smoke | facts about Groovy code | stay with Groovy. |
| ~5% — persistence | semantics carry, format does not | new save tests against `SaveStore`. |

**Three layers in `web/`:** (1) Vitest, engine in Node — no browser, milliseconds; (2) Vitest + happy-dom/jsdom for
`view.render(vm)` where useful; (3) Playwright for focus, dialogs, keyboard flows and screenshots — neither DOM
simulator implements focus rules or `<dialog>` top-layer faithfully, so those tests belong in a real browser.
**Carried discipline:** the Coverage Claim Protocol (quote assertion lines or the behaviour is UNGUARDED); a new pin is
shown RED and GREEN; goldens have exactly one writer; tests never touch a file the player owns. **A play-session
fixture format worth keeping:** `{ seed, history: [...] }` with directory-glob discovery (today's
`regression/snapshots/*.json`) — adding a fixture adds a test with no code change.
**One-line agent output:** `npm run check` = typecheck + lint + tests, ending in one `STATUS=…` line (Vitest `agent`
reporter, or a ~15-line custom reporter from `vitest/node`) — same contract the gates use today.

## 8. Process — retire, keep, slim

**Retire or leave behind with `terminal/`:** `.agents/vibe-check-ui.sh` (its grep never fires) and
`.agents/vibe-check-model.sh` (**already dead**: wrong classpath and broken by HK-008, yet advertised in `CLAUDE.md`);
blueprint stamps for new code (TypeScript types + tests are the blueprint — D3 of `--docs` stays a Groovy-only check);
HK-013 / WF-006; the `@CompileStatic` rule; the 5-file refactor cap as worded (for new code: one module + its tests per
commit); `refactor/phase-N` branch naming.

**Keep unchanged:** the Vinculum Protocol (Inquiry vs Directive); Coverage Claim Protocol; Shape Claim Protocol + the
eight OO principles; `/grill` (checks 1, 2, 4, 6 verbatim; 3 and 5 get TypeScript greps); `/close-wave` tiers (select
gates **by path**: `web/**` → npm gates, `terminal/**` → `vinc.sh` gates; WF-010's tier mis-fire gets fixed in the same
edit); `/chronicle`; `--docs` D2 (chronicle pointer) and D4 (1,000-word handover cap); lessons as rule + pointer.

**Context diet (the floor today is ≈9,600 words before any work):** `CODEX.md` 1,700 · `infrastructure.md` **3,795**
(mostly Groovy-tooling lessons) · two post-mortems 1,152 · root `CLAUDE.md` 375 · recovery prompt 834 · `todo.md`
1,729. Plan: root `CLAUDE.md` minimal (D1); split `infrastructure.md` into *process lessons* (always) and
*Groovy-tooling lessons* (loaded from `terminal/CLAUDE.md` only); the post-mortems' rules are already in the CODEX —
keep the rules, load the stories on demand; `web/CLAUDE.md` + `tasks/lessons/web.md` start at zero and follow the
rule-plus-pointer form; `todo.md`'s finished Groovy history moves with Groovy. WF-012 (lessons diet) becomes part of
this stage instead of a separate item.

## 9. Stages (each needs its own plan, `/grill` and Directive)

| # | Stage | Done when | Notes |
| :-- | :-- | :-- | :-- |
| 0 | **Reorganize.** `git mv` `src/ lib/ config/ build.gradle run.sh vinc.sh .agents/ screenshots/` and the Groovy-only records (D4) into `terminal/`; tag the freeze; fix paths | every Groovy gate green from `terminal/`; `git diff -M` shows 100% renames | They reference each other by relative path and `vinc.sh` `cd`s to its own directory, so almost nothing inside breaks; blueprint stamps hash *content* and survive. Needs fixing: `docs-check.sh` (reads root `tasks/`, `journals/`, `docs/`), root `CLAUDE.md`, `/close-wave` tier paths, `.gitignore`. **Needs the user's explicit waiver of the 5-file cap** (pure rename, one commit, gates before and after). **The player's untracked `session.trace`, `journal.txt`, logs sit at the root and the game reads its working directory — they are the user's to move; no agent touches them.** |
| 1 | **Law and context diet** (§8) | a fresh session loads the slim root + `web/CLAUDE.md`; `--docs` green | CODEX gates table rewritten per implementation |
| 2 | **Scaffold `web/`** — toolchain (§3), tsconfigs, lint walls (§5), seed kernel, content loader, fork the content | `npm run check` prints one `STATUS=PASS` line; the boundary rules proven RED on a scratch bad file | first `package.json` in the repo; `.gitignore` additions |
| 3 | **Generator** — universe → room | own snapshot pins + the Guide's numbers as property tests (floors 3–100, doors 2–20, rooms 1–10, objects 5–19 …) | index-order rule asserted |
| 4 | **Rules** — turns, coherence, buffer/gematria, Keystone ritual and descent, saves | rule tests ported from the game-fact share; §2.4 defects each decided | pending-prompt states instead of reads |
| 5 | **UI** — the mock's views on the real engine, behind the `View` seam | Playwright flows + the page has been *seen* | mock remains the ships lab (D5) |
| 6 | **Publish** (D9) | game live under the site; gates run before deploy | one-time switch of the Pages source to "GitHub Actions"; the repo has no `.github/workflows` today |
| — | **Ships** (CONCEPT-001) | after rule parity; its §7 verdict column first | new game only |

## 10. Not verified (carry these as open facts, not as knowledge)
TS 7.1 (new API) beta date · Vite 8's renamed config keys (`rolldownOptions`/`oxc`) · `composite` + `noEmit` interplay
for the referenced engine tsconfig under TS 6 (the probe used `emitDeclarationOnly` with `outDir` under
`node_modules/.tmp`) · whether typed lint needs `allowDefaultProject` for stray config files · vitest 4.1.11's exact
peer range · whether the copy step after `actions/jekyll-build-pages` needs `sudo` · Jekyll's ignore-underscore rule
(standing knowledge, not re-fetched) · `<dialog>`/custom-element fidelity in happy-dom/jsdom · `eslint-plugin-lit` on
ESLint 10 (not needed under D7) · the Vitest custom-reporter sketch (assembled from documented hooks, not run).

## 11. Sources
Registry: `npm view <pkg> version` run 2026-09-21. Docs: [TypeScript 7 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) ·
[TS project references](https://www.typescriptlang.org/docs/handbook/project-references.html) ·
[TS modules reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html) ·
[Node TypeScript support](https://nodejs.org/api/typescript.html) ·
[create-vite vanilla-ts template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vanilla-ts) ·
[Vite glob import](https://vite.dev/guide/features#glob-import) · [Vite performance (barrels, extensions)](https://vite.dev/guide/performance) ·
[Vite static deploy — GitHub Pages](https://vite.dev/guide/static-deploy#github-pages) ·
[Vitest projects](https://vitest.dev/guide/projects) · [Vitest snapshots](https://vitest.dev/guide/snapshot) ·
[Vitest reporters](https://vitest.dev/guide/reporters) · [Playwright snapshots](https://playwright.dev/docs/test-snapshots) ·
[Playwright webServer](https://playwright.dev/docs/test-webserver) · [ESLint 10 migration](https://eslint.org/docs/latest/use/migrate-to-10.0.0) ·
[typescript-eslint typed linting](https://typescript-eslint.io/getting-started/typed-linting) ·
[typescript-eslint supported versions](https://typescript-eslint.io/users/dependency-versions) ·
[`no-restricted-imports`](https://eslint.org/docs/latest/rules/no-restricted-imports) ·
[lit-html standalone](https://lit.dev/docs/libraries/standalone-templates/) ·
[GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) ·
[MDN storage quotas and eviction](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) ·
[Nx — project size](https://nx.dev/docs/kb/project-size) · [vanilla-todo case study](https://github.com/morris/vanilla-todo).
Repos read: [OpenFrontIO](https://github.com/openfrontio/OpenFrontIO) · [pokerogue](https://github.com/pagefaultgames/pokerogue) ·
[Pokémon Showdown architecture](https://github.com/smogon/pokemon-showdown/blob/master/ARCHITECTURE.md) ·
[chessground](https://github.com/lichess-org/chessground) · [VS Code source organization](https://github.com/microsoft/vscode/wiki/Source-Code-Organization).

---

## 12. How the work is run — sessions, agents, tests (research, 2026-09-21)
**Question (user):** one long session, several agents, or ultracode — and what about automated tests?
**Evidence:** this study (§2, §7, §9), the Claude Code workflow reference read in-session, and one documentation pass
over the official Claude Code docs (URLs below; read by a subagent, not opened in the main session). It is a
recommendation, not law — nothing here changes the CODEX until stage 1 says so.

| Topic | Recommendation | Why |
| :-- | :-- | :-- |
| **Session shape** | **Many short sessions — one per wave** (plan → `/grill` → Directive → commits → `/close-wave` → end). Never one long session. | A full context is summarized and details are lost; the handover file already carries state between sessions. The fixed load is ≈9,600 words before any work (§8), which is why stage 1 (context diet) comes early. |
| **Who writes code** | **One writer: the main session.** No parallel agents writing engine code. | The layers depend on each other (rng → procgen → model → rules → ui) and the design needs one voice (Shape table, OO law). The docs say the same: parallel agents pay on independent work, cost more than they return on coupled work. Parallel writers from templates is the 2026-03-11 post-mortem. |
| **What agents are for** | **Reading and checking**: sweep the Groovy rule classes (§2.3), review a finished diff with fresh eyes, absorb noisy output (test logs). | Each agent has its own context; only its conclusion comes back, so the main session stays clean. CODEX § 2 already requires verifying what a subagent proposes against the original files. |
| **Ultracode** | **Off as a standing mode.** Ask for a workflow *by name* for three jobs only. | With ultracode on, every substantive task becomes a multi-agent run and token cost is not a constraint; the docs put agent teams at about 7× the tokens of a single session. |

**The three jobs worth a multi-agent workflow (each is independent work, which is where fan-out pays):**
1. **Rule extraction, before stages 3–4.** Readers over `Room.getOptions`, `Building.getExtraContent`, `ScanCommand`,
   `TurnProcessor`, `SyncManager`, `Gematria`, `SpectralFrequency`, the breach rule and the 14 factories → one rule
   sheet, every row with `file:line`; then skeptic agents check each row against the Player's Guide. A disagreement
   between code and Guide is a finding for the user (D5), not something an agent resolves.
2. **Porting the ≈185 game-fact tests (§7)** — only once the engine API they call exists; one test file per agent.
3. **Adversarial review of each stage's diff before merge** — finders, then verifiers told to refute.

**Automated tests — the order matters more than the tools (§7 has the tools):**
1. **The gate before the game.** Stage 2 ships `npm run check` (typecheck + lint + tests, one `STATUS=` line) before any
   game code exists; every later commit runs it.
2. **Tests come from the Player's Guide numbers, not from the Groovy code** — otherwise the known defects (§2.4) are
   copied. Each test is written before the code it checks and shown RED, then GREEN (existing lesson).
3. **Generator (stage 3):** property tests for the Guide's ranges, a same-seed-same-world test, snapshot pins captured
   only after the user has reviewed them — from then on a diff is a finding.
4. **Rules (stage 4):** play-session fixtures `{ seed, history }` discovered by glob — a new file is a new test.
5. **UI (stage 5):** Playwright flows and screenshots; a UI change is unverified until it has been seen.
6. **Optional, decide at stage 2:** a Claude Code hook that runs the typecheck after every edit; a GitHub Actions job
   that runs `check` on every push (the repository has no workflow today — D9 adds the first at stage 6).

**Discarded from the documentation pass:** its cost estimate ("$0.50–$2 per phase") — not credible, not used.
**Sources (Claude Code docs):** [workflows](https://code.claude.com/docs/en/workflows.md) ·
[subagents](https://code.claude.com/docs/en/sub-agents.md) · [worktrees](https://code.claude.com/docs/en/worktrees.md) ·
[agent teams — token cost](https://code.claude.com/docs/en/agent-teams.md) · [costs — context management](https://code.claude.com/docs/en/costs.md) ·
[large codebases](https://code.claude.com/docs/en/large-codebases.md) · [best practices](https://code.claude.com/docs/en/best-practices.md).
