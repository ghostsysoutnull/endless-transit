# Housekeeping Plan: HK-020 — Global command aliases have two owners
**Created:** 2026-09-20 | **Grill:** AMEND (2 items: deviation declared, `CoherenceDrainTest:19` listed) → applied → CLEARED | **Branch (proposed):** `housekeeping/hk-020-global-commands` (from `master` @ b80b100)
**Backlog:** HK-020 (`tasks/backlog/HOUSEKEEPING.md:13-19`, user OO review of HK-015) | **Baseline (run during the grill):** 271 / 271 / 0 / 0, LINT PASS 218 files
**Status:** PLAN, grilled. **User decisions (2026-09-20):** D1 = a (one `GlobalCommands` object, `dispatch` asks it), D2 = keep every case quirk exactly as today.
**Deviation from the backlog fix design (declared):** `HOUSEKEEPING.md:18` says *`normalize` asks it*; here `dispatch` asks it. Two reasons:
`InputHandler` is built in `Game:41` before `TurnProcessor` exists, so it cannot hold the object without a setter or a construction reorder;
and resolving on the dispatch side is what closes the `Game.processInput` gap (that path never calls `normalize`).

> **No player-visible change.** Every word, alias and case rule the player can type resolves to the same command as
> today. Prediction: **0 goldens moved**, `--scan` seed 0 → 9 unchanged, lint baseline unchanged. The one behavior that
> moves is test-only: `Game.processInput` (which skips `normalize`) starts honouring `m`, `q`, `?` and any-case words.

---

## What happens today (ELI5)

Two lists say what a global command is. `InputHandler.normalize` has a list of words that may be typed in any case, plus
two aliases (`m` → `map`, `q` → `quit`) and `?` → `help`. `TurnProcessor.initializeGlobalCommands` has the real table and
a third alias (`ll` → `lattice`). Add a command to the table and forget the list: it works, but only in lower case. Add it
to the list and forget the table: it falls through to navigation and prints "Invalid navigation choice." Nobody owns the
fact "these are the global commands and how they may be typed".

**The fix in one sentence:** one object, `GlobalCommands`, owns the keys, the aliases and the case rule per key;
`TurnProcessor` builds it and `dispatch` asks it; `normalize` stops carrying a list and handles only the two things that
are not commands (end of input → `quit`, empty line → repeat).

## Evidence read this session

- `InputHandler.groovy:51-64` (`normalize`): `null` → `"quit"`; `""` → `lastChoice ?: "-2"`; lower-cased input in
  `["i","sync","map","m","lattice","glitch","help","quit","q"]` → `q`→`quit`, `m`→`map`, else the lower-cased word;
  `"?"` → `"help"`; anything else returns the input **unchanged** (so `S`, `LL`, `QUITNOW` stay as typed).
- `TurnProcessor.groovy:30-43` (`initializeGlobalCommands`): 12 entries — `i p P s sync map lattice ll help glitch quit
  quitnow`; `ll` is the same instance as `lattice`. `:78-87` (`dispatch`): `globalCommands[choice]` exact lookup, else
  `navCommand.execute`. `:60-72` (`handleInput`): `checkBoundaryReversal(raw)` first, then `normalize`, then `dispatch`.
- `Game.groovy:75-77` (`processInput`): calls `dispatch` directly — **no `normalize`**. Today `processInput("ll")` works
  and `processInput("m")` / `("q")` / `("?")` / `("MAP")` fall to navigation. Used by tests only (`processInput("s")` ×3).
- Resulting case rule today: **any case** — `i sync map m lattice glitch help quit q ?`; **exact** — `s ll p P quitnow`.
  `p`/`P` are two different commands (`CaptureCommand(false)` / `(true)`), so case is the command there. Matches the
  guide, `docs/terminal/guide/players_guide.md:102-103`, which cites `InputHandler.groovy:57`.
- No global command reads its `choice` argument: every `execute(Game, String choice = null)` body ignores it (grep over
  `core/*Command.groovy`; the only readers are `NavigationCommand.groovy:27,33,36`, which is the fall-through, not a global).
  So what string `dispatch` passes to a resolved global command is unobservable.
- `NavigationEngine.recordChoice` (`:61`) is called only from `NavigationCommand.groovy:36`; a global command never
  touches `lastChoice`. Raw vs canonical spelling cannot leak into the repeat-last-move logic.
- `RenderingCoordinator.groovy:40` (`helpMenu`): the help line names the aliases as text (`map/m`, `ll/lattice`, `q`) and
  sets `state.instantRender = true` (`GameState.groovy:17`, default `false`) — an observable side effect usable as a pin.
- `Game.groovy:41-45`: `InputHandler` is built in `Game` and injected into `TurnProcessor`; `Game.groovy:57` exposes it.
  Second `TurnProcessor` constructor caller: `CoherenceDrainTest:19` (`new TurnProcessor(state, null, null, new
  InputHandler(...))`) — `initializeGlobalCommands` runs there with a null renderer and orchestrator; building
  `GlobalCommands` touches neither, so no edit is expected (grill blast-radius hit).
- `HelpCommand`, `QuitNowCommand:27` (`return false`, no `System.exit`), `GameCommand` interface read.
- Blueprint: `docs/blueprints/logic/classes/core/TurnProcessor.md:15-18` describes "Normalization … using the
  `InputHandler`" then "Global Command Check". `InputHandler` has no blueprint. `--docs` stamps only existing blueprints.
- Golden harness never types a global command (goldens are HUD frames; the help line is not a frame) → 0 goldens predicted.

## Coverage (Coverage Claim Protocol — assertion lines read this session)

| Behavior | Guard |
| :--- | :--- |
| `q`, `Q` → quit | `InputHandlerNormalizeTest:13-14` |
| `m` → map; `QUIT` → quit; `?` → help; `01` passes through | `InputHandlerNormalizeTest:19-22` |
| `i sync map lattice glitch help` accepted in any case | **UNGUARDED** |
| `s ll p P quitnow` are exact (`S`, `LL`, `QUITNOW`, `p`≠`P` are not the same command) | **UNGUARDED** |
| `ll` and `lattice` are the same command | **UNGUARDED** (table is `private`) |
| `null` input → quit; `""` → `lastChoice`, or `-2` when there is none | **UNGUARDED** |
| `processInput` skips aliases and case (today's gap, being closed) | **UNGUARDED** — nothing to un-pin |

## The change

### c0 — step 0: pin today's behavior at today's seams (test only)
`InputHandlerNormalizeTest` gains: any-case for each of the six words; `S`/`LL`/`QUITNOW`/`p`/`P` returned unchanged;
`null` → `quit`; `""` with and without `lastChoice`. All green on `master`. **These are the migration checklist:** the
alias/case rows *move* in c1 (listed below, one for one); the null/empty/pass-through rows stay.

### c1 — `GlobalCommands` owns keys, aliases and case (3 production files)
- **New `core/GlobalCommands.groovy`** (`@CompileStatic`, final fields). Two maps: `exact` (looked up as typed) and
  `anyCase` (looked up lower-cased). API: `register(String key, GameCommand cmd, boolean anyCase = true)`,
  `alias(String alias, String key)` (same instance, same case rule as `key`), `GameCommand resolve(String input)` =
  `exact[input] ?: anyCase[input?.toLowerCase()]`, `null` when not global. No `instanceof`, no statics.
- **`TurnProcessor`**: `initializeGlobalCommands` builds the object — `i sync map lattice help glitch quit` any-case;
  `s p P quitnow` exact; aliases `m`→`map`, `ll`→`lattice`, `q`→`quit`, `?`→`help`. `dispatch` becomes
  `GameCommand cmd = globalCommands.resolve(choice)`. Field exposed `final GlobalCommands globalCommands` (read-only, for
  the pins; same shape as `final InputHandler inputHandler`).
- **`InputHandler.normalize`** shrinks to the two non-command rules: `null` → `"quit"`, `""` → `lastChoice ?: "-2"`,
  else return the input unchanged. The word list, `m`/`q` and `?` lines go.
- **Tests:** new `GlobalCommandsContractTest` — unit rows on a hand-built `GlobalCommands` (register / alias / resolve /
  exact vs any-case / unknown → `null` / `null` input → `null`) and integration rows on `new Game(SEED, new
  MockInputSource([]))`: `resolve("ll").is(resolve("lattice"))`, `resolve("Q").is(resolve("quit"))`,
  `resolve("M").is(resolve("map"))`, `resolve("?").is(resolve("help"))`, `resolve("S") == null`, `resolve("LL") == null`,
  `resolve("QUITNOW") == null`, `!resolve("p").is(resolve("P"))`; and the gap pin `game.processInput("?")` →
  `state.instantRender` true (**RED on `master`** — `?` falls to navigation there — with `processInput("help")` green
  beside it as the control). `InputHandlerNormalizeTest` keeps null/empty/pass-through and gains "`MAP` passes through
  unchanged" (the row that flips: normalize no longer lowers).
- **Migration of c0 rows:** `normalize("Q")=="quit"` → `resolve("Q").is(resolve("quit"))`; `normalize("m")=="map"` →
  `resolve("m").is(resolve("map"))`; `normalize("?")=="help"` → `resolve("?").is(resolve("help"))`; each any-case word →
  `resolve(WORD.toUpperCase()).is(resolve(WORD))`; each exact word → `resolve(WORD.toUpperCase()) == null`. No row is
  deleted without its replacement in the same commit.

### c2 — docs (may fold into `/close-wave`)
- Guide `players_guide.md:102-103`: the case sentence is unchanged; its citation moves from `InputHandler.groovy:57` to
  `GlobalCommands.groovy` (the line that registers the exact keys).
- Blueprint `TurnProcessor.md:15-18`: "Normalization" row loses aliasing; "Global Command Check" row names
  `GlobalCommands.resolve` (keys, aliases, case). Stamped by `/close-wave`. No new blueprint (`InputHandler` has none).
- `core/CLAUDE.md`: one line — global commands, aliases and case live in `GlobalCommands`; a new global command is one
  `register` call. Backlog entry → CLOSED; `tasks/todo.md` row; `RECOVERY_PROMPT.md` suite count.

## Gates
Full suite after c0, c1; `--lint` (new class must be clean, baseline unchanged); `--scan` seed 0 → 9; 36 goldens
byte-identical (nothing renders differently); `git status --short` clean after each run. RED demonstration for the gap pin
before c1 on an assertion that needs no new API (`processInput("?")` + `instantRender`). Tier for `/close-wave`: Light
(3 production files, no behavior change for the player) — bump to Full only if the grill adds a reason.

## Edges (declared)
- **E1** `checkBoundaryReversal` still runs on the raw line before anything else — untouched; only fires on `""`.
- **E2** A future global key that collides with a navigation key (`l`, `b`, `u`, `d`, `c`, `e`, `j`) wins the collision
  exactly as today (`dispatch` checks globals first). Not changed; noted.
- **E3** `RenderingCoordinator.helpMenu:40` still spells the aliases by hand (`map/m`, `ll/lattice`, `q`). It is display
  text, not a resolver, so it is not a second owner — but a `GlobalCommands`-generated help line is the natural next step.
  Left open, logged in the backlog entry's close-out line if the user wants it.
- **E4** Nothing else calls `normalize` (`TurnProcessor.groovy:65` is the only caller).
