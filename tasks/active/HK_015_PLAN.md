# Housekeeping Plan: HK-015 — Five player-facing bugs the Player's Guide had to confess
**Created:** 2026-09-17 | **Grill:** AMEND (A1–A8) → applied → CLEARED | **Branch (proposed):** `housekeeping/hk-015-player-bugs` (from `master` @ e0d1816)
**Backlog:** HK-015 (`tasks/backlog/HOUSEKEEPING.md:13-35`) | **Baseline (re-run during the grill):** 256 / 256 / 0 / 0, LINT PASS 212 files (baseline 8), scan seed 0 → 9, DOCS PASS
**Status:** EXECUTED 2026-09-17 (Directive: "yes, execute the plan") — `fa40881` c0, `04783dc` c1 (260/260; P1a/c/d RED at `PassiveRollContractTest:81,122,149`), `a94e151` c2 (263; P2a/b RED 40 → 55), `d522add` c3 (266; launch from a scratch dir: `--seed 4660` → Busy Terrace = `ProcgenSnapshotTest:77`), `1b723ff` c4 (268; P4 RED `q`), `278bfd2` c5 (271; P5a RED, P5b RED on an assertion with the key renamed and the roll unseeded; lint rule shown firing on a scratch file). LINT PASS after every commit, 36 goldens unchanged, scan 0 → 9. **Deviations:** (1) P1b was written API-free (a second winning step captures again) so every P1 pin could run on master; (2) P5c added (gain stays 10–39); (3) guide also lost its "built and never wired up" echo bullet and gained `q` in the command table; (4) **c5b, user OO review:** `LaunchArgs` became an immutable value object (`new LaunchArgs(args).seed`) instead of a static function; the two-owner alias smell `q` leans on → **HK-020**. **User decisions (2026-09-17):** D1 = a, *saved* (once per step, one int in the save); D2 = a (alias `q`); D3 = a (seed the echo roll in the same commit); D4 = a (all five items).

> **Behavior changes, decided by the user.** Items 1 and 2 remove two exploits the guide documents as spoilers. Items 3–5 make
> three things the game already advertises work. No menu the golden harness draws changes → prediction **0 goldens moved**,
> `--scan` seed 0 → 9. If any golden moves: STOP.

---

## What is wrong today (ELI5)

1. **Stand still, get rich.** The room's 30% gift is rolled from your step count. Steps only count when you move, so a winning
   roll wins again on every prompt you spend standing there.
2. **`m 1 1` heals you.** Merging an item with itself is refused — silently — and the +15 coherence is paid anyway.
3. **`--seed` is a lie.** The launcher passes it along; the game never looks.
4. **`q` is a lie.** The help line offers it; nothing answers.
5. **The Null Reach's `s` is stolen.** The global scan takes lowercase `s` first, so the echo scan only answers to `S`.
   Its roll is also the only unseeded `new Random()` in the engine.

## Evidence read this session (2026-09-17, `master` @ e0d1816)

- `model/Room.groovy:69-77` — `processAction`: `locus.branch("ACTION").branch(player.stepCount).nextRandom()`, `nextInt(10) < 3` → `player.capture(...)`.
- `core/NavigationCommand.groovy:33-38` — `stepCount++` only when `mapper.resolve(choice, handler)` returns an action. Global commands never reach it (`TurnProcessor.dispatch`, `:80-89`).
- `core/TurnProcessor.groovy:46-59` — `processTurn` calls `currentLocation.processAction(player)` every loop turn, whatever the last input was.
- `core/Player.groovy:15,28-33` — `int stepCount = 0`, reset in the constructor. `Player` is rebuilt on every restore (lesson, Phase 10).
- `core/SyncManager.groovy:27` saves `"stepCount"`, `:97` restores it with a hard cast `(int) playerState["stepCount"]`.
- `core/QuantumBufferController.groovy:40-45` — `player.mergeItems(idx1, idx2, currentLocation)` then unconditional `player.adjustCoherence(15)`.
- `core/Player.groovy:69-71` — `void mergeItems`; two silent guard `return`s (same index; out of range).
- `Main.groovy:10` — `new Game()`; `args` never read. `run.sh:132` and `vinc.sh:127` both pass `"$@"` to `Main.groovy`. `core/Game.groovy:31` — `Game(long seedValue = currentTimeMillis, InputSource = null)` exists.
- `core/RenderingCoordinator.groovy:40` — help line `… | q: Terminate`. `core/InputHandler.groovy:51-63` — `normalize` lowercases and passes `i, sync, map, m, lattice, glitch, help, quit`; `m` → `map`. No `q`. `core/QuitCommand.groovy:17-18` — `quit` asks `[y/N]` first, so a stray `q` is harmless.
- `grep -rnE '"[qQeE]\. ' src/main/groovy` → **no hits**: no location option uses key `q` or `e` today. `Container.getBaseOptions` contributes `l.` only.
- `model/NullSector.groovy:89-91` — `options["s. Scan for spectral echoes"]`, `signalStrength += new Random().nextInt(30) + 10`.

## Coverage (Coverage Claim Protocol — assertions read this session)

| Behavior | Guard today | Verdict |
| :--- | :--- | :--- |
| A hidden-frequency capture journals once and samples the floor | `JournalEventContractTest:85-103` — loops `stepCount = step; room.processAction(player)` until inventory grows; `assertEquals("Hidden Frequency", hidden.name)` `:97`, `assertTrue(bldg.sampledFloors.contains(0))` `:98`, `assertEquals(1, recent.size())` `:100` | GUARDED. **Compatible with the fix only if `lastRollStep` starts at −1** (the loop starts at step 0 and changes the step each pass). |
| At most one passive capture per step | none. `CorrectnessRegressionTest:62-77` re-implements the seed formula and asserts step 1 ≠ step 2 — it never calls `processAction` | **UNGUARDED** → step-0 pin P1 |
| `stepCount` survives restore | `RestoreContractTest:56,68` — `assertEquals(17, fresh.player.stepCount)` | GUARDED |
| A save without a new player key still restores | `RestoreContractTest:147` — hand-written JSON with `coherence`, `stepCount` only | GUARDED for the *old-save default* path once the new key is read null-safely |
| A rejected merge grants no coherence; a real merge grants +15 | none — every `mergeItems` test (`SpectralFrequencyContractTest`, `MergeLabelTest`, `BreachOptionContractTest`, `AbyssalRitualTest`, `JournalEventContractTest:73`) calls `Player` directly; none drives `QuantumBufferController` | **UNGUARDED** → P2 |
| `--seed` reaches `Game` | none | **UNGUARDED** → P3 |
| `q` quits | none; `"quit"` scripts exist (`HeadlessSimulationTest:31`, `ReplayServiceTest:15`) and prove the `quit` path only | **UNGUARDED** → P4 |
| Echo scan key / determinism | `JournalEventContractTest:106-122` covers the **capture** option (`c.`) only | **UNGUARDED** → P5 |

## Design

### Item 1 — one passive roll per step (D1 = a, saved)
`stepCount` is global and monotonic, so **one int on the player** is enough; no room stores anything, nothing enters `mutationState`.
- `Player`: `int lastRollStep = -1`; `boolean claimPassiveRoll()` → `false` if `lastRollStep == stepCount`, else sets it and returns `true`. (Behavior on the owner of the data; `Player` is `@CompileStatic`.)
- `Room.processAction`: first line `if (!player.claimPassiveRoll()) return`. Seed formula untouched → same items on the same steps as today; only the repeats disappear.
- `SyncManager`: save `"lastRollStep"` beside `"stepCount"`; restore **null-safe** (`playerState["lastRollStep"] != null ? (int) … : -1`) — an old save costs at most one re-roll. The restore helper was extracted by HK-013 slice 1; if `MethodSize` fires anyway, extract — never reformat (lesson).
- Closes the sync → restore → re-roll loophole, which a transient flag would leave open.

### Item 2 — pay only for a real merge (D2 of the first round = a)
- `Player.mergeItems` returns `boolean`: `false` from both guards, `true` at the end. Existing callers ignore the result — source compatible.
- `QuantumBufferController`: `if (player.mergeItems(…)) player.adjustCoherence(15) else Terminal.println "Invalid buffer command."`.

### Item 3 — `--seed <long>`
- New `core/LaunchArgs.groovy` (`@CompileStatic`, static-free value: `static Long seedFrom(String[] args)` is a pure function — no state, not a singleton): returns the long after `--seed`, `null` when absent, throws `IllegalArgumentException` on a missing or non-numeric value.
- `Main.groovy`: `Long seed = LaunchArgs.seedFrom(args)`; `seed != null ? new Game(seed) : new Game()`. A bad value prints a red terminal line through `Terminal` and exits 1 before the game is built.
- Out of scope: `--headless` / `--replay` seed handling (they carry their own seed).

### Item 4 — `q` (D2 = a)
- `InputHandler.normalize`: add `"q"` to the list, map `q` → `quit` next to `m` → `map`. Help line unchanged (it becomes true).

### Item 5 — echo scan key + seeded roll (D3 = a)
- `NullSector`: key `"e. Scan for spectral echoes"`; roll from `locus.branch("ECHO").branch(game.player.stepCount).nextRandom()`. The option is a navigation choice, so `stepCount++` runs *before* the closure (`NavigationCommand:35-37`) → every scan gets a fresh, reproducible roll. Global table untouched.
- Lint: check whether `config/lint/vinc-ruleset.groovy` can forbid `new Random()` in `model/` (today the rule covers `ViewComponent`s). If a one-line rule is green on the tree after this commit, add it here and prove it fires on a scratch file; if it surfaces other sites, log them to the backlog and do **not** widen this wave.

## Pins (each shown RED on an assertion before its change, GREEN after)

| Pin | Test (new unless noted) | Asserts |
| :--- | :--- | :--- |
| P1a | `model/PassiveRollContractTest` | find a winning step on seed 0 (as `JournalEventContractTest:88-92` does), then call `processAction` 10× at that step → inventory grew by **exactly 1** |
| P1b | same | next step rolls again (`claimPassiveRoll()` true after `stepCount++`) |
| P1c | same | sync to a temp `Game.saveFile` on the winning step, restore, `processAction` → **no** new item; real `session.trace` size + mtime unchanged (HK-012 rule) |
| P1d | same | a save with no `lastRollStep` key restores with −1 (no exception) |
| P2a | `core/BufferMergeRewardContractTest` — drives `QuantumBufferController` with a `MockInputSource` | `m 1 1` → coherence unchanged, inventory unchanged |
| P2b | same | `m 1 99` → unchanged |
| P2c | same | `m 1 2` → +15 (capped at max), inventory −1 |
| P3 | `core/LaunchArgsTest` | `["--seed","4660"]` → 4660; `[]` → null; `["--seed"]` and `["--seed","x"]` throw |
| P4 | `core/InputHandlerTest` (extend if it exists, else new) | `normalize("q", …) == "quit"`, `normalize("Q", …) == "quit"` |
| P5a | `model/NullSectorEchoContractTest` | options contain `e. Scan for spectral echoes`, contain no key starting `s.` |
| P5b | same | two sectors, same seed, same step → same `signalStrength` after one scan |

P2 RED caveat: P2a/P2b are red on master on an **assertion** (coherence moves). P3 cannot be red on an assertion (new API) — recorded as *inconclusive by construction* (lesson HK-016 step 2); its proof is the manual launch in the gates below.

## Commits (≤ 5 production files each; full suite + `--lint` after every one; `git status --short` clean after each run)

| # | Content | Production files | Guide edit (same commit) |
| :--- | :--- | :--- | :--- |
| c0 | this plan → `tasks/active/`, backlog note | — | — |
| c1 | P1a–d + item 1 | `Player`, `Room`, `SyncManager` (3) | `:183-186` lottery = once per move; `:418-424` farm section removed; `:253` wording check |
| c2 | P2a–c + item 2 | `Player`, `QuantumBufferController` (2) | `:426-431` "Free Coherence" + the "never die" paragraph removed |
| c3 | P3 + item 3 | `LaunchArgs` (new), `Main` (2) | `:363-366` rewritten: `./run.sh --seed <n>` works; `:392` quirk removed |
| c4 | P4 + item 4 | `InputHandler` (1) | `:391` quirk removed |
| c5 | P5a–b + item 5 (+ lint rule if green) | `NullSector` (+ `vinc-ruleset.groovy`) | `:115`, `:188-191`, `:394-395`, `:454` — `S` → `e` |
| c6 | `/close-wave` (tier chosen by the command) | — | — |

Blueprints: `docs/blueprints/logic/classes/` for every class touched (`Player`, `Room`, `SyncManager`, `NullSector`, `InputHandler` — whichever exist) are re-stamped by `/close-wave` row 3, not by hand.
In-fiction manual/codex (`docs/terminal/`): grep for `capital`, `--seed`, `q: Terminate`, `m 1 1` before c6; fix what the wave made false.

## Gates

`./vinc.sh --test --agent` (expected 256 + new pins, 0 failed) · 36 goldens byte-identical · `./vinc.sh --scan` seed 0 → 9 · `./vinc.sh --lint --agent` PASS, baseline diff removals-only or empty · `DeterministicUniverseTest` green (c5 touches a model roll) · manual: `./vinc.sh --seed 4660` opens the pinned seed-4660 street · `./vinc.sh --docs` at close-out.

## Grill amendments (2026-09-17 — baseline re-run: 256/256/0/0, LINT PASS 212; verdict AMEND → applied below)

- **A1 (check 2, declared edge — the lottery itself survives).** `Room.groovy:162,248-254`: `t`, `b`, `f` are mapped options, so each
  advances the step and earns a *fresh* 30% roll for 1 coherence. Item 1 removes the **identical repeat while standing still**; it does
  not remove the lottery, which is the design. The guide must say exactly that (c1): "once per move", not "fixed — no more free items".
  Rebalancing the lottery is a separate gameplay decision, not in this wave.
- **A2 (check 3, second restore path).** `PersistenceService.restore(GameMemento)` `:35-38` builds a fresh `Player` and carries neither
  `stepCount` nor anything else step-related (`createMemento` `:25-33`). After a memento restore the player is at step 0 / `lastRollStep`
  −1 — consistent, one roll at step 0, same as a new game. Declared, not changed (the memento is the replay path, not the player's save).
- **A3 (check 3, reboot).** `TurnProcessor.reboot` → `initializeWorld` (`NavigationOrchestrator:23-27`) reuses the `Player` and does not
  touch `stepCount`; nothing to reset. Open question 2 answered: no change.
- **A4 (check 5 / c5, lint rule resolved).** `grep -rn "new Random()" src/main`: `NullSector:91` is the only hit under `model/` and
  `procgen/`; the others are `ui/` (`SessionRecap:62`, `Terminal:169`, `GlitchedTerminalAdapter:14`) and out of scope. c5 adds
  `IllegalRegex NoUnseededRandomInWorld`, `applyToFilesMatching = '.*/(model|procgen)/.*'` (whole-path regex, lesson O2), proven to fire on a
  scratch file before commit. `NoStaticInstance` (`vinc-ruleset.groovy:34`) matches `static … instance =` only — `LaunchArgs.seedFrom` is clear.
- **A5 (blast radius, docs).** In-fiction pages that the wave makes false, edited in **c5**: `docs/terminal/codex/lattice_hunting.md:15`
  and `docs/terminal/manual/the_lattice_atlas.md:95` (capital `S` → `e`). No hit for `--seed`, `q: Terminate`, `m 1 1` outside the guide.
- **A6 (blueprints).** Only `model/Room.md` exists among the touched classes (`docs/blueprints/logic/classes/`); `Player`, `SyncManager`,
  `NullSector`, `InputHandler` have none. `/close-wave` row 3 re-stamps `Room.md`.
- **A7 (P2 harness).** `QuantumBufferScreenTest:21` shows the route: `new Game(seed, new MockInputSource([...]))`. It asserts screen text
  and `sessionMergeCount` only (`:31-39`) — no coherence assertion, so P2 stays UNGUARDED → pinned. P4 lives in a new `core/InputHandlerNormalizeTest` (no `InputHandlerTest` exists).
- **A8 (test inputs).** No test or snapshot types `q`; the three `"s"` inputs (`FloorStateContractTest:149,156`, `VisitedProgressTest:86`) are the global scan on a floor — untouched.

## Open questions for the grill (answered above: 1 → A1, 2 → A3, 4 → A8, 6 → A7; 3: nothing publishes, no listener involved; 5: leave at 1.2)

1. **Which inputs advance `stepCount` inside a room?** Empty Enter repeats `lastChoice` (`InputHandler.normalize:53`); if that choice resolves, the step advances and a fresh roll is legitimate. Confirm by probe that *no* zero-cost, step-advancing, repeatable choice exists in a room — otherwise the farm survives at 30% per Enter and item 1 needs a second look.
2. **`reboot()` and `initializeWorld()`** (`TurnProcessor:91-97`): is the `Player` replaced or reused on a coherence death? If reused with `stepCount` reset to 0, `lastRollStep` must reset with it.
3. **Observer check (grill check 5):** `claimPassiveRoll` publishes nothing; confirm no listener needs to know.
4. **Does any test or regression snapshot script type `q`, or a Null Reach `s`/`S`, as input?** (`grep` the snapshot JSONs' `history` arrays.)
5. **Save `"version": "1.2"`** (`SyncManager:22`): bump to 1.3 for the new key, or leave (null-safe read makes it optional)? Preference: leave.
6. Does `P2` need `currentLocation` to be a real floor, or does `null` do (as in `MergeLabelTest:26`)?
