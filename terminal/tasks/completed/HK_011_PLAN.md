# Housekeeping Plan: HK-011 — `JournalManager` becomes an instance owned by `Game`
**Created:** 2026-09-16 | **Grill:** AMEND (three citation line ranges; deviations section added) → applied → CLEARED | **Branch:** `housekeeping/hk-011-journal-instance` (from `master` @ 6b22bf0)
**Backlog:** `tasks/backlog/HOUSEKEEPING.md` (HK-011) | **Baseline:** 207 / 207 / 0 / 0 (re-verify before touching any file)
**Record:** `tasks/completed/HK_011_PLAN.md` | **Commits:** 84e5997 (plan), 5c0c0f2 (a), ea5cdcf (b), 90cbede (c) — C executed by directive.

> **Commits A and B are refactors:** zero behavior change, 36 goldens byte-identical, `--scan` seed 0 → 9.
> **Commit C is an intended visual change** (ticker shows the discovered location's *name*, not its path) and is the one
> place goldens move — six frames, one ticker line each. **Strike C at approval if the path is preferred.**

---

## Context

Phase 10 made the journal an event listener (`attach(EventBus)`), but everything else in `JournalManager` is static: session
counters, the log buffer, `lastEntries`, the file names, `startSession`/`saveSession`, `getRecentEvents` (read by the HUD ticker
at `HUDHeaderComponent.groovy:75`) and `reset()`. Consequences: tests and the golden harness reset global state by hand; a
`ViewComponent` reaches into `core` static state instead of receiving frame inputs through `RenderContext`; two journals cannot
coexist in one JVM. HK-010 (today) added the third listener and a third test that resets the static. Time to own it.

## What changes (ELI5)

Today the scribe is a global voice anyone can shout at. After this, the `Game` hires one scribe, introduces it to the event
bus, hands it to the screen so the ticker can read the last few lines, and asks it to open and close the session. The screen
component that draws the ticker no longer knows a scribe exists: it is handed "the recent lines" as part of its frame inputs.

## Evidence read this session

- `JournalManager.groovy` (all static): fields 16-25; `startSession` 27-45; `attach` 48-53 (three typed subscriptions);
  `logDiscovery` 60-75; `logCapture`/`logSynthesis`; `getRecentEvents` 92-95 (`lastEntries.takeRight(count)`); `saveSession`
  97-136 (writes `JOURNAL_FILE`, `LAST_ENTRY_FILE`, prints one green line); `reset()` 141-148. `TEMP_MANIFEST` constant. Not `@CompileStatic`.
- Production callers: `Game.groovy:35` `JournalManager.attach(state.events)`, `:78` `startSession(state.player)`;
  `QuitCommand.groovy:22` `saveSession(state.player)`; `HUDHeaderComponent.groovy:75` `getRecentEvents(3).reverse()`.
  `Main.groovy:8` imports it and never uses it.
- `RenderContext.groovy`: four final fields, one 4-arg constructor; built at eight `BridgeView` sites and three harness sites
  (`HudFrameHarness.groovy:158,159,172`). Only the header (`BridgeView.groovy:70`) needs recent events.
- `BridgeView` is built once in `RenderingCoordinator.groovy:18` (`new BridgeView()`) and twice in tests with no arguments
  (`BridgeViewStructureTest:93`, `CaptureVerificationTest:26`) — neither asserts on the ticker (structure test checks markers and
  box shape; capture test checks LIP/screenshot files).
- Test callers of the statics: `JournalTest` (file names, `reset`, `startSession`, `logCapture`, `logDiscovery`, `saveSession`),
  `JournalEventContractTest` (`reset` in `setUp`, `getRecentEvents(1)` ×4), `DiscoveryEventContractTest` (`reset` ×3, `getRecentEvents`
  ×4, file names + `startSession`/`saveSession`), `HudFrameHarness` (`reset` at 46, `logDiscovery`/`logCapture`/`logSynthesis` at
  109-112, `ctxOf` at 172). `StartupTest`, `FloorCrashTest`, `AbyssalRitualTest` import only.
- `Game` already owns a service this way: `final QuantumBufferController inventoryController = new QuantumBufferController()` (`Game.groovy:25`).
  `Player(EventBus events = new EventBus())` is the project's inert-default pattern (Phase 10 E1).
- Ticker pane is 37 chars (`Terminal.splitBoxedLine`, `Terminal.groovy:313`); `Locatable.getName()` exists; golden 13 line 5 shows
  `LATTICE_IDENT: Building >> The Void-Watcher`, so the name form for that frame is `LOC: The Void-Watcher`.

## Design

### Commit A — the ticker reads frame inputs (ui only; 3 production files)
- `RenderContext`: fifth final field `List<String> recentEvents`; constructor gains a defaulted last parameter
  `List<String> recentEvents = []` (stored unmodifiable). All existing 4-arg sites keep compiling.
- `HUDHeaderComponent.groovy:75`: `List<String> recentEvents = ctx.recentEvents.reverse()`; drop the `JournalManager` dependency.
  Add `static final int TICKER_DEPTH = 3` (the number of recent lines the header wants; it shows two, the abyssal voice may
  prepend one).
- `BridgeView.renderBridgeHUD`: `new RenderContext(currentLocation, player, null, null, JournalManager.getRecentEvents(HUDHeaderComponent.TICKER_DEPTH))`
  — still the static read, moved from the component to the compositor. Nothing else changes.
- Tests: `HudFrameHarness.ctxOf` passes the same list. Goldens byte-identical (same data, same order).

### Commit B — the journal is an instance owned by `Game` (5 production files — at the CODEX cap of 5, above the recovery prompt's 4; declared)
- `JournalManager` → instance class, `@CompileStatic` (typed locals: `VibeCapsule v = location.getVibe()`), bodies otherwise verbatim:
  - fields become instance fields; `journalFile = "journal.txt"`, `lastEntryFile = "journal-last-entry.txt"` are plain properties
    (tests set them exactly as they set the statics today); `TEMP_MANIFEST` stays a private static final constant (declared edge E3).
  - `attach`, `startSession`, `log*`, `getRecentEvents`, `saveSession`, `reset` become instance methods. `reset()` is kept: it is
    the test mirror of `startSession` without file I/O (HK-010 lesson).
- `Game`: `final JournalManager journal = new JournalManager()` (Groovy property → `game.journal`); constructor `journal.attach(state.events)`
  before `RitualTracker` (order pinned by Phase 10 E3); `start()` → `journal.startSession(state.player)`; `RenderingCoordinator`
  receives the journal.
- `RenderingCoordinator(GameState, InputHandler, JournalManager)` → `new BridgeView(journal)`.
- `BridgeView(JournalManager journal = new JournalManager())`: private final field; `renderBridgeHUD` reads `journal.getRecentEvents(...)`.
  The two no-arg test constructions get an inert, never-attached journal (edge E1).
- `QuitCommand.groovy:22` → `game.journal.saveSession(state.player)`.
- Tests (free): `JournalTest` → `new JournalManager()` with `journalFile`/`lastEntryFile` set; `JournalEventContractTest` → drop the
  static `reset()` in `setUp` (a new `Game` is a new journal), `game.journal.getRecentEvents(1)`; `DiscoveryEventContractTest` →
  `game.journal.reset()` / `game.journal.getRecentEvents` / `game.journal.journalFile = …` (the `finally` restore lines go away — the
  instance dies with the test); `HudFrameHarness` → `game.journal.reset()` after construction, `game.journal.logDiscovery/…` at 109-112.
  The three unused imports (`StartupTest`, `FloorCrashTest`, `AbyssalRitualTest`) and `Main.groovy:8` still resolve — left untouched.
- Goldens byte-identical: the harness feeds the same journal the `BridgeView` reads (`game.journal`).

### Commit C — ticker line shows the location name (optional, recommended; 1 production file; **visual change**)
- `JournalManager.logDiscovery`: the **file** lines (`sessionLog`, manifest `[LOC] <path><vibe>`) are unchanged; only the ticker entry
  becomes `lastEntries << "[DISCOVERY] ${location != null ? location.getName() : path}"`. With no location (JournalTest, harness frame
  20) the path is kept, so golden 20 and `JournalTest` L51 are unchanged.
- `DiscoveryEventContractTest` D2: the `getRecentEvents(1)[0]` pin becomes `"[DISCOVERY] ${building.getName()}"`; D4 (`[LOC] <path>` in the
  file) unchanged — the file still carries the full path.
- Goldens 13-18 regenerated: line 7 becomes `LOC: The Void-Watcher` (fits the 37-char pane). Any other file in the golden diff → STOP.

## Coverage claims (Coverage Claim Protocol — assertions quoted)

| Behavior | Guard | Assertion (read this session) |
| :--- | :--- | :--- |
| Ticker content and order (two newest first, `LOC:`/`OBJ:`/`SYN:` mapping) | goldens 20/21 (L8-9: `OBJ:   Fragment B (0211Hz)` above `LOC: Golden Locus > Alpha Chamber`), goldens 13-18 (L7 `LOC: Universe > …`) | byte-compared by `BridgeViewGoldenFrameTest` + `ViewComponentGoldenTest` |
| Ticker empty when nothing journaled | goldens 01-12, 32-33 (L7-8 empty dim rows) | same |
| Journal file format: `[LOC]`, `[DISCOVERY]`, `[OBJ]`, `[CAPTURE]`, summary, `Temporal Displacement` | `JournalTest` | L42-47 `content.contains(...)`, L50-54 `lastContent.contains(...)` |
| Capture/synthesis reach the journal through the bus, in attach order | `JournalEventContractTest` | P1 L60-62, P2 L77-79, P3 L99-101, P4 L118-120 (`getRecentEvents(1)` → `startsWith("[CAPTURE] …")`/`[SYNTHESIS]`) |
| Discovery reaches the journal; exact line; `[LOC]` + `Network Expansion` in the file | `DiscoveryEventContractTest` | D2 L73-74 exact string; D3 L83-90 counts; D4 L108-110 file contains |
| `saveSession` after `startSession` on the *same* instance | `JournalTest` L24/36, `DiscoveryEventContractTest` L103/105 | both call start then save on one journal |
| Session lifecycle in production (`start()` → `startSession`; quit → `saveSession`) | — | **UNGUARDED** today and after: `Game.start()` runs the loop and `QuitCommand` reads stdin. Declared; no pin added (the edit is a one-token receiver change at each site, verified by compile + manual read). |

## Behavioral edges (declared)
- **E1** — `new BridgeView()` with no journal (two tests) renders an **empty** ticker instead of whatever static state leaked from an
  earlier test. Neither test asserts ticker content. Production always passes `game.journal`.
- **E2** — journal state no longer leaks between tests: every `new Game()` is a fresh journal. The `JournalManager.reset()` calls in
  `JournalEventContractTest.setUp` become unnecessary; the "reset after construction" mirror (HK-010 E1) becomes `game.journal.reset()`.
- **E3** — `.journal_session_tmp` stays one shared path: two journals in one JVM with overlapping sessions would interleave the
  manifest. Tests run sequentially; production has one journal. Not changed.
- **E4** (commit C only) — the HUD ticker shows `LOC: <name>` for discoveries with a location; the journal file keeps the full path.

## Deviations from the backlog entry (grill check 5, declared)
- Backlog: "`startSession`/`saveSession` via the facade". Plan: `game.journal.startSession(...)` / `game.journal.saveSession(...)`
  through the `journal` property — one accessor instead of two wrapper methods on `Game`; same ownership.
- Commit C (ticker shows the name) is not in the backlog entry; it answers the HK-010 truncation question and is optional.
- `RenderingCoordinator` gains a constructor parameter (only construction site is `Game.groovy:41`; no test builds one).

## Lifecycle (grill check 3)
- Constructs `JournalManager`: `Game` (once, `final`), `BridgeView` default arg (inert), `JournalTest` (own instance). Nobody assigns
  `game.journal` after construction (`final`). Holders: `Game`, the three bus closures (capture `this`), `BridgeView` (private final).
  Player replacement on restore (`PersistenceService`, `SyncManager`) does not touch the journal. **No stale-ref site.**
- Constructs `BridgeView`: `RenderingCoordinator` (production, with journal), two tests (inert default). `Game.getBridgeView()` returns
  `renderer.bridgeView`; never replaced.

## Commits (production files / tests)
| # | Production | Tests / goldens | Coherence |
| :--- | :--- | :--- | :--- |
| **A** | `ui/RenderContext`, `ui/HUDHeaderComponent`, `ui/BridgeView` | `HudFrameHarness.ctxOf` | defaulted ctor param keeps all 4-arg sites; compositor still reads the static → same bytes |
| **B** | `core/JournalManager`, `core/Game`, `core/RenderingCoordinator`, `ui/BridgeView`, `core/QuitCommand` (5) | `JournalTest`, `JournalEventContractTest`, `DiscoveryEventContractTest`, `HudFrameHarness` | every static caller migrates in the same commit; no static remains → compile proves completeness |
| **C** (optional) | `core/JournalManager` (1) | `DiscoveryEventContractTest` D2; goldens 13-18 | own commit, own golden review |
| **D** (docs) | backlog CLOSED, `core/CLAUDE.md` (journal is `Game.journal`; `RenderContext.recentEvents`), `ui/CLAUDE.md` Phase 7 bullet (components never read `core` statics; `RenderContext` carries the ticker lines), `docs/blueprints/logic/classes/model/Room.md:40` (stale, says the journal logs captures for Room — one-line fix), plan → completed, todo/recovery | — | docs only |

Execution: full suite + `git status --short` after every commit; goldens diff empty after A and B; after C exactly six files, line 7 each.
`grep -rn "static.*JournalManager\|JournalManager\.[a-z]" src/main` → 0 after B (no static calls left). Merge `--no-ff`, push,
`/chronicle`, short retro (ownership move + visual change warrant one), lessons if any.

## Reversion unit
Each commit reverts alone in reverse order (C → B → A). Branch is the outer unit.

## Gates
`./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=207 SUCCEEDED=207 FAILED=0 SKIPPED=0` after A, B, C, D;
`./vinc.sh --scan` seed 0 → 9; golden diff empty after A/B and exactly `13_…18_…` after C; `git status --short` clean after every run.

## Next step
`/grill`, then request the Directive (state whether commit C is in or out).
