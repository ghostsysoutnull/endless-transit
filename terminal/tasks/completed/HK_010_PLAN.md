# Housekeeping Plan: HK-010 — Restore discovery journaling as a domain event
**Created:** 2026-09-16 | **Grill:** AMEND (two citation line numbers) → applied → CLEARED | **Branch:** `housekeeping/hk-010-discovery-events` (from `master` @ 327d758)
**Backlog:** `tasks/backlog/HOUSEKEEPING.md` (HK-010) | **Baseline:** 203 / 203 / 0 / 0 (re-verify with `./vinc.sh --test --agent 2>/dev/null` before touching any file)
**Record:** `tasks/completed/HK_010_PLAN.md` | **Commits:** 6590c97 (plan), 06ed2d4 (code + test + goldens)

> **This is a behavior change, not a refactor.** The player gets back a feature that has been silently dead since 2026-03-05:
> `[DISCOVERY]`/`[LOC]` journal lines, the `Network Expansion: N macro-locations mapped` summary count, and `LOC:` lines in the
> HUD event ticker. Same seed → same world is untouched (no procgen/model change). **Six golden frames change on purpose**
> (ticker line only); the other 30 must stay byte-identical.

---

## Context

`JournalManager.logDiscovery(path, location)` (`JournalManager.groovy:58-73`) has had no production caller since commit
`7930dc3` (2026-03-05), when `Game.setCurrentLocation` stopped calling it and delegated path tracking to the new
`Player.markFootprint` (`git show 7930dc3`, Game.groovy hunk @793: the `logDiscovery` calls were deleted, `markFootprint`
kept only the `visitedPaths.add`). Phase 10 found this and logged it as HK-010 instead of fixing it, because restoring it is a
behavior change. The user decided on 2026-09-16 that the feature is wanted.

Phase 10 built the channel this needs: `Player` is the sole publisher on `GameState.events`, `JournalManager.attach(bus)`
subscribes one typed listener per event. HK-010 adds a third event on the same pattern.

## What changes (ELI5)

When the player sets foot on a macro location for the first time (anything above Floor: Street, Building, City, Planet…),
the `Player` already writes its path into `visitedPaths`. Now it also shouts "I discovered this place" on the event bus.
The journal, which already listens for captures and syntheses, listens for that shout too and writes the same
`[DISCOVERY] <path> [Era: …, Resonance: …]` line it wrote in March. Nothing in the model, procgen or UI code changes.

## Evidence read this session

- `Player.markFootprint` (`Player.groovy:34-43`): `visitedLIPs.add(lip)`; `isMacro` = not Floor/Corridor/Apartment/Room;
  if macro → `visitedPaths.add(location.getPath())`. Return value of `Set.add` is currently discarded. `Player.events` is a
  `final EventBus` (line 13, constructor line 27); `capture` (line 52) and `mergeItems` (line 71) publish on it.
- `JournalManager.attach` (`JournalManager.groovy:48-51`): two `bus.subscribe(EventClass) { e -> logX(e.item) }` lines.
  `logDiscovery(String path, Location location = null)` (58-73): `sessionDiscoveries++`, vibe suffix from
  `location.getVibe()` (`timeline`, `primaryCulture`), `[DISCOVERY]` to `sessionLog` + `lastEntries`, `[LOC]` to the
  manifest. `saveSession` (96-135) prints `Network Expansion:     $sessionDiscoveries macro-locations mapped` (112).
  `startSession` (27-45) resets `lastEntries`, `sessionLog` and the counters. Class is dynamic Groovy (no `@CompileStatic`).
- Callers of `markFootprint`: `NavigationOrchestrator.groovy:35` (apartment auto-entry), `:43` (the entered location),
  `:48` (ancestor loop: Building, City, Planet, Apartment, Corridor, Floor). `initializeWorld()` (20-24) enters the start
  location from inside the `Game` constructor (`Game.groovy:43`); `JournalManager.startSession` runs later in `start()`
  (`Game.groovy:78`) and wipes whatever the constructor journaled. **March had the same order** (`7930dc3` Game.groovy:25
  `initializeWorld()` in the constructor, :78 `startSession` in `start()`), so the starting locus was never journaled then either.
- Restore paths: `PersistenceService.restore(memento)` (34-49) builds `new Player(state.events)` (empty `visitedPaths`) then
  `initializeWorld()` + `enterLocation(target)`. `restoreSession()` (51-59) takes the player from `SyncManager.restore`,
  which refills `visitedPaths` from the trace (`SyncManager.groovy:76`), and sets `state.currentLocation` directly — no
  `enterLocation`, no `markFootprint`. `Game.restore(memento)` callers: tests only (`GameMementoTest:55`,
  `MementoInputHistoryTest:45`). `restoreSession` callers: `Game.groovy:83` (production) + two tests.
- HUD ticker: `HUDHeaderComponent.groovy:75-91` reads `JournalManager.getRecentEvents(3).reverse()`, shows two lines, maps
  `[DISCOVERY] ` → `LOC: `. Right pane is `ansiSafeTruncate`d to `130 − 90 − 3 = 37` chars (`Terminal.groovy:310-319`).
- Golden harness (`HudFrameHarness.groovy:41-43`): `JournalManager.reset()` **then** `new Game(seed)`; the walk at 83-92
  calls `game.enterLocation(walker)` for Building → Floor → Corridor → Apartment(→Room); frames 20/21 feed
  `logDiscovery`/`logCapture`/`logSynthesis` directly (106-109); bedrock (146-150) enters `Floor -1` under the same Building.
- Interfaces: `Locatable.getPath()`/`getLIP()`, `Renderable.getVibe()` — all on `Location`, so the event class compiles
  under `@CompileStatic`. `ItemCaptured.groovy` is the template (fields `item`, `location`; sets `lip`, `itemName`).
- Tests that read journal state: `JournalTest` (direct calls, file assertions), `JournalEventContractTest` (four
  `getRecentEvents(1)` reads after `new Game()`), `HudFrameHarness`. No test subscribes to `game.state.events` or asserts on
  `Network Expansion`. `StartupTest`, `FloorCrashTest`, `AbyssalRitualTest` only import `JournalManager`.
- `.gitignore` already covers `journal_test.txt`, `journal-last-entry_test.txt`, `.journal_session_tmp`.

## Design

**New event** `core/LocationDiscovered.groovy` (`@CompileStatic`, extends `DomainEvent`, modelled on `ItemCaptured`):
`final Location location`, `final String path`; constructor sets `lip = location.getLIP()`, `path = location.getPath()`.
`itemName` stays null.

> **Declared deviation from the backlog text:** the backlog and the Phase 10 plan call this `LocationEntered`. It is named
> `LocationDiscovered` because it fires **once per new macro path**, not on every entry, and the ancestor loop in
> `NavigationOrchestrator:48` "discovers" a City or Planet the player never entered. The listener is `logDiscovery`.

**Publisher** — `Player.markFootprint` (only change in `Player`):
```groovy
if (isMacro && visitedPaths.add(location.getPath())) {
    events.publish(new LocationDiscovered(location))
}
```
`Player` remains the sole publisher (core invariant).

**Listener** — one line in `JournalManager.attach`:
```groovy
bus.subscribe(LocationDiscovered) { LocationDiscovered e -> logDiscovery(e.path, e.location) }
```
`logDiscovery` body untouched (its `[DISCOVERY]`/`[LOC]` format is already pinned by `JournalTest:44,52`).

**Golden harness** — move the existing `JournalManager.reset()` (`HudFrameHarness.groovy:41`) to just **after**
`new Game(seed)` with the comment: *mirrors `Game.start()` → `startSession`, which clears the constructor's start-locus
discoveries before the player sees a frame*. Without this move frames 01/02 would pin `LOC:` lines the player never sees.

**Goldens** — regenerate with `./vinc.sh --goldens`, then `git diff --stat` on the golden dir **must** list exactly
`13_building_render`, `14_floor_render`, `15_corridor_render`, `16_room_render`, `17_apartment_render`,
`18_room_items_renderBridgeHUD`, and in each the only changed line is the first ticker line (the previously empty
`║ … ║ <dim></dim>` row after `EVENT_TICKER: [SYNC_STABLE]`), now `LOC: Universe > …` truncated at 37 chars.
Reasoning: the walk's only macro entry is the Building (frame 13); Floor/Corridor/Apartment/Room are non-macro; frames
20-23 show the two newest entries (`OBJ`/`LOC: Golden…`, then `SYN`/`OBJ`), which sit above the Building line; bedrock
(32-36) enters a Floor whose Building is already visited. Any other file in the diff → STOP and re-plan.

## Coverage claims (Coverage Claim Protocol — assertions quoted)

| Behavior | Guard | Assertion (read this session) |
| :--- | :--- | :--- |
| `logDiscovery` writes `[LOC] <path>` to the manifest and `[DISCOVERY] <path>` to the log | `JournalTest` | L44 `content.contains("[LOC] Universe > Alpha > Building 1")`; L51 `lastContent.contains("[DISCOVERY] Universe > Alpha > Building 1")` |
| `attach` wires capture and synthesis (pattern the third line copies) | `JournalEventContractTest` | P1 L60-62 `getRecentEvents(1)` → `startsWith("[CAPTURE]   Contract Crystal (")`; P2 L77-79 `[SYNTHESIS]` |
| Ticker maps `[DISCOVERY] ` → `LOC: ` and shows two newest first | golden `20_room_ticker_loc_obj_renderBridgeHUD.txt` L8-9 (`OBJ:   Fragment B (0211Hz)` above `LOC: Golden Locus > Alpha Chamber`) | byte-compared by `BridgeViewGoldenFrameTest` + `ViewComponentGoldenTest` |
| Bus dispatches by exact class in subscription order | `EventBusTest` (enabled since 10a) | existing suite |
| **Entering a new macro location publishes a discovery and journals it** | — | **UNGUARDED** → `DiscoveryEventContractTest` (step 0, below) |
| **Re-entry / non-macro entry publishes nothing** | — | **UNGUARDED** → same test |
| **`Network Expansion` counts real discoveries** | — | **UNGUARDED** → same test |

### Step 0 — `DiscoveryEventContractTest` (new, `src/test/groovy/com/endlesstransit/core/`)
Written **before** the production edit and run once to show it RED (the AI-TDD reproduction of the dead feature; the RED
output is recorded in the execution note). It lands in the same commit as the production change, since a commit with a red
suite is not allowed. `Terminal.initialize(true, true)` + `JournalManager.reset()` in `@BeforeEach`, as the Phase 10 test does.

- **D1 publisher contract (unit, no journal):** `Player p = new Player(bus)` with a `List<LocationDiscovered> seen` subscriber;
  world objects from `new Game(12345L)` (start Street, its `children[0]` Building, that building's `getFloor(0)`).
  `p.markFootprint(street)` → `seen.size() == 1`, `seen[0].location.is(street)`, `seen[0].path == street.getPath()`,
  `seen[0].lip == street.getLIP()`; `p.markFootprint(street)` again → still 1; `p.markFootprint(floor)` → still 1 and
  `p.visitedLIPs.contains(floor.getLIP())` (footprint still recorded, just not published).
- **D2 journal line end-to-end:** `Game game = new Game(12345L)`; `JournalManager.reset()` (the `startSession` mirror);
  `game.enterLocation(building)`; `getRecentEvents(1)[0] == "[DISCOVERY] ${building.getPath()} [Era: ${v.timeline}, Resonance: ${v.primaryCulture}]"`
  with `v = building.getVibe()` (exact string, not `startsWith`).
- **D3 idempotence through navigation:** after D2, `game.exitLocation(); game.enterLocation(building)` and
  `game.enterLocation(building.getFloor(0))` → number of `[DISCOVERY]` entries in `getRecentEvents(10)` is still 1.
- **D4 session file:** `JOURNAL_FILE`/`LAST_ENTRY_FILE` pointed at the `_test` names `JournalTest` uses;
  `startSession(game.player)`; `enterLocation(building)`; `saveSession(game.player)`; file contains
  `"  >> [LOC] ${building.getPath()}"` and `"Network Expansion:     1 macro-locations mapped"`; both files deleted in `finally`;
  `git status --short` clean afterwards.

## Behavioral edges (declared)

- **E1 — starting locus not journaled.** The constructor discovers Street + City + Planet (ancestor loop) before
  `start()` calls `startSession`, which wipes `lastEntries`/`sessionLog`/counters. Identical to March (`7930dc3`). The harness
  reset move mirrors this. Guard: goldens 01/02 unchanged.
- **E2 — memento restore re-discovers.** `PersistenceService.restore(memento)` starts from an empty `visitedPaths`, so the
  start chain and the target chain publish again. Test-only path (`GameMementoTest`, `MementoInputHistoryTest`; neither
  asserts journal state). Production restore is `restoreSession`, which refills `visitedPaths` and never calls
  `enterLocation` → no re-discovery; `sessionDiscoveries` counts only paths new to **this** session. No edit.
- **E3 — ticker truncation (UX, not changed here).** The ticker pane is 37 chars, so every `LOC:` line renders as
  `LOC: Universe > <filament> > Null…`. That is the March contract restored verbatim; showing the location *name* instead
  would be a HUD-only change with its own golden review and is **not** in this plan (logged as a follow-up if wanted).
- **E4 — `JournalEventContractTest` unaffected.** Its `new Game()` now adds three discovery lines before each capture;
  `getRecentEvents(1)` is `takeRight(1)` (`JournalManager.groovy:93`) → still the capture line. Assertions L60-62, 77-79,
  99-101, 118-120 hold. No edit.
- **E5 — a `Player` built outside `GameState`** (six test sites, Phase 10 edge E1) publishes on an inert bus: no journal
  line, as for captures. No edit.

## Commits (≤ 4 production files each; full suite + goldens after every commit)

| # | Files (production) | Tests / goldens | Coherence argument |
| :--- | :--- | :--- | :--- |
| **1** | `core/LocationDiscovered.groovy` (new), `core/Player.groovy` (publish in `markFootprint`), `core/JournalManager.groovy` (one `subscribe` line + javadoc) | `DiscoveryEventContractTest` (new, RED → GREEN), `HudFrameHarness` (reset moved after `new Game`), goldens 13-18 regenerated and diff-reviewed | Event class, publisher and listener are one coherent unit; the harness move and the six goldens are required for the suite to be green on this commit |
| **2** (docs) | `tasks/backlog/HOUSEKEEPING.md` (HK-010 → CLOSED with sha), `src/main/groovy/com/endlesstransit/core/CLAUDE.md:16` (three events; `markFootprint` → `LocationDiscovered`), `docs/analysis/OOA_REFACTOR_PLAN.md` (one line under Phase 10: HK-010 closed), `tasks/HK_010_PLAN.md` → `tasks/completed/` | — | docs only |

Execution order inside commit 1: (a) copy this plan to `tasks/HK_010_PLAN.md`; (b) write `LocationDiscovered` + the test,
run `./vinc.sh --test DiscoveryEventContractTest -q` → expect D1-D4 RED; (c) `Player` + `JournalManager` edits, run the test
→ GREEN; (d) full suite → exactly six golden failures (13-18); (e) move the harness reset, `./vinc.sh --goldens`, `git diff`
the golden dir and confirm the six-file / one-line-each shape above; (f) full suite GREEN, `git status --short` clean, commit.

## Test blast radius
- `DiscoveryEventContractTest` — new (4 methods).
- `HudFrameHarness` — one line moved (reset after construction) + comment.
- Goldens `13`–`18` — regenerated (intended visual change, ticker line 1).
- `JournalEventContractTest`, `JournalTest`, `GameMementoTest`, `MementoInputHistoryTest`, `TracePersistenceTest`,
  `CorridorPersistenceTest`, `EventBusTest` — reasoned above. **No edit.**

## Reversion unit
Commit 1 is self-contained: `git revert` restores the dead feature, the old harness order and the six goldens together.
Commit 2 is docs only. Branch is the outer unit; merge `--no-ff`.

## Close-out (after commit 2)
Merge `--no-ff` to `master`, push. `/chronicle` (own line: `[HK_010_DISCOVERY_EVENTS]`, behavior change stated), retro
`docs/retro/RETRO_HK_010.md`, refresh `tasks/RECOVERY_PROMPT.md` + `tasks/todo.md` (HK-008, HK-009, HK-011 remain open).
Lesson candidate for `tasks/lessons/core.md`: *a golden harness that builds a `Game` inherits every constructor side effect;
mirror the production lifecycle (`startSession`) rather than pinning what the player never sees.*

## Gates
- `./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=207 SUCCEEDED=207 FAILED=0 SKIPPED=0` after commit 1 and 2.
- `git diff master --stat -- src/test/groovy/com/endlesstransit/ui/golden/` → exactly six files, reviewed line by line.
- `./vinc.sh --scan` seed 0 → 9 nodes (model untouched; run for the record).
- `grep -rn "instanceof LocationDiscovered\|instanceof DomainEvent" src/` → 0.
- `git status --short` clean after every test run.

## Next step
`/grill` this plan (six checks), amend if needed, then request the Directive to execute.
