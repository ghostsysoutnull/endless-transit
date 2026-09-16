# Housekeeping Plan: HK-012 — The test suite must never touch the player's save file
**Created:** 2026-09-16 | **Grill:** AMEND (two citation ranges) → applied → CLEARED | **Branch:** `housekeeping/hk-012-save-file-isolation` (from `master` @ c754117)
**Backlog:** new entry HK-012 (written at close-out, found and closed in the same session) | **Baseline:** 207 / 207 / 0 / 0
**Project copy:** `tasks/HK_012_PLAN.md` (moved to `tasks/completed/` at close-out).

> **Zero behavior change for the player.** The game still saves to and restores from `session.trace` in the working directory.
> What changes is that tests and the headless runner save to, restore from, or skip a *scratch* file instead of the real one.
> 36 goldens byte-identical (the harness never syncs). `--scan` seed 0 → 9.

---

## Context (the bug the user hit)

The user restored a saved session and got a different world, "a few times in recent days". `transit.log` shows why:

- `SyncManager.SAVE_FILE` is the constant `"session.trace"` in the working directory — the player's save.
- `TracePersistenceTest` (since `02b0748`, 2026-03-05) and `CorridorPersistenceTest` (since `b3ca195`, Phase 0.5a) call
  `SyncManager.sync(game)` and leave the file behind: after every `./vinc.sh --test` the player's save **is a test world**
  (seed 55555 → Locus `D903`, seed 77777 → `12FD1`; the log shows this at 14:13:06, 14:13:35 and 14:14:49 today).
- `HeadlessRunner.groovy:23-24` (since `25ad897`, 2026-03-12) **deletes** `session.trace` before every headless run "to
  prevent the restore prompt from hanging". Five test classes use the runner. After those, the player's save is simply gone
  and the game starts new with no prompt.
- The project runs the full suite after every commit, so any save made between two commits was overwritten or deleted.

The user's 14:20 restore was correct only because no suite ran between quit (14:20:21) and restart (14:20:39).

## What changes (ELI5)

The game gets a "where is my save file" setting that defaults to the real file. Tests point their games at a throwaway file
in the temp directory and delete it when done. The headless runner points its game at a file that does not exist, so the
restore prompt never appears — no deleting anything. The player's file is never read, written or removed by a test again.

## Evidence read this session

- `SyncManager.groovy`: `static final String SAVE_FILE = "session.trace"` (L13); `sync(Game)` writes `new File(SAVE_FILE)` (L41);
  `restore(EventBus)` reads `new File(SAVE_FILE)` (L55-59). Callers of `sync`: `QuitCommand.groovy:21`, `SyncCommand.groovy:16`
  (both pass `game`). Caller of `restore`: `PersistenceService.groovy:53` (`restoreSession()`, no `Game` reference — it holds
  `state`, `navOrchestrator`, `inputHandler`). Prompt gate: `Game.groovy:82` `new File(SyncManager.SAVE_FILE).exists()` inside `start()`.
- `PersistenceService.restoreSession()` (L51-59): `SyncManager.restore(state.events)`, then swaps `masterLocus`, `player`,
  `currentLocation`, `universe`. `Game.restoreSession()` (L62) delegates; `Game.start()` L83 calls `persistence.restoreSession()`.
- `TracePersistenceTest` L64-69: `SyncManager.sync(game)`; asserts `new File(SyncManager.SAVE_FILE).exists()`; `new Game(1L)`;
  `freshGame.restoreSession()`. No cleanup. `CorridorPersistenceTest` L55-60: identical shape. Neither deletes the file.
- `HeadlessRunner` L22-27: `File trace = new File("session.trace"); if (trace.exists()) trace.delete()` then `new Game(locus, mockInput)`
  and `game.start()`. Five test classes use the runner.
- `.gitignore:7` ignores `session.trace` (so the damage never showed in `git status`). Existing lesson "Test Artifact Convention"
  (`infrastructure.md:12`) covers files tests *create*; it says nothing about files the *player* owns.
- `Game` already carries per-instance configuration as plain properties (`instantRender`, `suppressRendering` on `GameState`;
  `journalFile`/`lastEntryFile` on `Game.journal` since HK-011) — the same shape fits here.

## Design (3 production files)

- **`Game`**: new property `String saveFile = SyncManager.SAVE_FILE` (the constant stays as the default). `start()` L82 checks
  `new File(saveFile).exists()`; L83 and `restoreSession()` call `persistence.restoreSession(saveFile)`.
- **`SyncManager`**: `sync(Game game)` writes `new File(game.saveFile)` (log line prints the path); `restore(EventBus events, String saveFile)`
  reads `new File(saveFile)`. `SAVE_FILE` remains the default constant. Bodies otherwise untouched.
- **`PersistenceService`**: `restoreSession(String saveFile)` → `SyncManager.restore(state.events, saveFile)`. Body otherwise untouched.
- `QuitCommand` and `SyncCommand` are unchanged: they call `sync(game)`, which now reads the game's path.

### Tests (free)
- **`TracePersistenceTest`, `CorridorPersistenceTest`**: at the top, snapshot the real file
  (`File real = new File(SyncManager.SAVE_FILE); boolean existed = real.exists(); long stamp = existed ? real.lastModified() : -1L;
  long size = existed ? real.length() : -1L`). Create `File scratch = File.createTempFile("endless-transit-", ".trace")`;
  `game.saveFile = scratch.path`; sync; assert `scratch.exists()`; `freshGame.saveFile = scratch.path`; restore; existing assertions
  unchanged; in `finally`: `scratch.delete()`. Last assertion: the real file's existence, `lastModified` and `length` are exactly what
  they were — **this is the pin for the bug the user hit**.
- **`HeadlessRunner`**: delete L22-24. After `new Game(locus, mockInput)`: `game.saveFile = new File(System.getProperty("java.io.tmpdir"),
  "endless-transit-headless-${System.nanoTime()}.trace").path` (nonexistent → no prompt; a script that syncs or quits with "y" writes
  there); `finally` deletes it. Comment: *never the player's file — it was deleted here from 2026-03-12 to 2026-09-16 (HK-012)*.

## Coverage claims (Coverage Claim Protocol)

| Behavior | Guard | Assertion |
| :--- | :--- | :--- |
| Save/restore round trip: seed, LIP, name, vibe, inventory, breach, infusion, visited | `TracePersistenceTest` | L72-86 `assertEquals(testSeed, freshGame.masterLocus.value)`, `assertEquals(targetLIP, …getLIP())`, name, vibe, `inventory.any{…}`, `isBreached`, `infusionCount`, `isVisited()` |
| Corridor state survives the round trip | `CorridorPersistenceTest` | L63-70 LIP equal, `instanceof Floor`, `assertSame(CorridorState.INSTANCE, restoredFloor.currentState)` |
| The round trip goes through the **configured** path (write and read agree) | same two tests after migration | `scratch.exists()` after sync + the round-trip assertions above with both games on `scratch` |
| **The suite leaves the player's save untouched** | — | **UNGUARDED** today → the before/after snapshot assertion added to both persistence tests (step 0 semantics: it is what the user's report reproduces; it cannot run on master because `Game.saveFile` does not exist there, so the log lines above are the recorded reproduction) |
| Headless runs never delete the real file | — | **UNGUARDED** → gate grep `trace.delete\|"session.trace"` in `src/test` → 0 after commit 1; the five headless tests still pass |
| Production prompt + restore path | — | UNGUARDED today and after (`start()` loop, stdin); receiver change only, declared |

## Behavioral edges (declared)
- **E1** — none for the player: default path, prompt, sync and restore are byte-for-byte the same flow on `session.trace`.
- **E2** — `SyncManager.restore` gains a parameter; `PersistenceService.restoreSession` gains a parameter. Callers: `Game` only (grep above).
- **E3** — a headless script that saves (`sync`, or quit + "y") now writes to a temp file that is deleted afterwards, instead of
  overwriting the player's save. No test asserts on that file.
- **E4** — the two persistence tests no longer leave `session.trace` behind; a developer who relied on running them to *create* a save
  for manual play loses that side effect. Nothing in `docs/` or `vinc.sh` documents such a use.

## Commits
| # | Production | Tests | Coherence |
| :--- | :--- | :--- | :--- |
| **1** | `core/SyncManager`, `core/Game`, `core/PersistenceService` (3) | `TracePersistenceTest`, `CorridorPersistenceTest`, `HeadlessRunner` | the two signature changes and their only callers move together; tests compile against the new property |
| **2** (docs) | — | — | backlog: HK-012 written directly as CLOSED (Found / Resolution / commits); `tasks/lessons/infrastructure.md`: new rule under Test Artifact Convention — *a test never reads, writes or deletes a file the player owns; give the game a path property and point tests at a temp file*; todo/recovery; plan → completed; chronicle row |

Execution: full suite + `git status --short` after each commit; `ls -la session.trace` before and after the suite must show the same
size and mtime (manual confirmation of the pin, recorded in the plan record); goldens diff empty; `grep -rn '"session.trace"\|trace.delete' src/test` → 0.
Merge `--no-ff`, push, `/chronicle` row + short log; no separate retro (minor session; the lesson goes to `infrastructure.md`).

## Reversion unit
Commit 1 reverts alone. Commit 2 docs only.

## Gates
`./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=207 SUCCEEDED=207 FAILED=0 SKIPPED=0`; `session.trace` mtime unchanged
across the run; goldens untouched; `./vinc.sh --scan` seed 0 → 9; `git status --short` clean.

## Next step
`/grill`, then request the Directive.
