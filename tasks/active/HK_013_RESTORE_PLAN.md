# Housekeeping Plan: HK-013 slice 1 — `SyncManager.restore` under 50 lines, and no more formatting dodges
**Created:** 2026-09-16 | **Grill:** CLEARED (inline, evidence below) | **Branch (proposed):** `housekeeping/hk-013-restore` (from `master` @ 1889c29)
**Backlog:** HK-013 (`tasks/backlog/HOUSEKEEPING.md`) | **Baseline:** 245 / 245 / 0 / 0, LINT PASS 210, lint baseline 9 entries
**User decision (2026-09-16):** keep the 50-line rule as a tripwire; forbid formatting dodges; fix `restore` properly; log the "complexity rule instead of / beside length" question for the next cadence review.

> **Zero behavior change.** Same saves restore to the same game. 36 goldens byte-identical, `--scan` seed 0 → 9.
> Lint baseline 9 → 8 entries (removal only).

## Why (ELI5)
In HK-018 the lint ratchet fired: one new line made `restore` 65 lines against a recorded 64. I joined two arguments on one line to slip
under it. Legal, but it answers the ruler, not the question the ruler asks ("this method does four jobs — split it?"). This slice answers the question.

## Evidence read this session
- `SyncManager.restore` (`SyncManager.groovy:57-120`): four numbered jobs in its own comments — 1 reconstitute player (`:72-88`), 2 apply world
  mutations (`:91-99`), 3 re-mark footprints (`:102-107`), 4 resolve current location (`:110-114`) — inside one try/catch that logs and returns null.
- One caller: `PersistenceService.groovy:54`. Signature stays `restore(ProceduralFactory, EventBus, String)`. Tests reach it only through
  `Game.restoreSession()` (`FactoryWiringContractTest:82`, `BreachOptionContractTest:205`, `CorridorPersistenceTest:79`, `TracePersistenceTest:87`).
- `config/lint/baseline.xml:14-17`: `Method "restore" is 64 lines`. Rule: `vinc-ruleset.groovy:21` `MethodSize { maxLines = 50 }`.
- No existing symbol named `restorePlayer`, `applyMutations` or `remarkFootprints` in `src/` (grep: 0).

## Coverage (assertion lines read this session)
| Job | Guard |
| :--- | :--- |
| seed, current LIP, name, vibe | `TracePersistenceTest:90-93` |
| inventory name + frequency | `TracePersistenceTest:96`; `isKeystone` + `boundLip` `BreachOptionContractTest:207-208` |
| building mutation applied | `TracePersistenceTest:100-101`; floor mutation `CorridorPersistenceTest:89-91` (`assertSame(CorridorState.INSTANCE, restoredFloor.currentState)`) |
| current location re-marked visited | `TracePersistenceTest:104` |
| `coherence`, `stepCount` restored | **UNGUARDED** |
| `visitedLIPs` / `visitedPaths` restored as sets; a *non-current* footprint is re-marked visited | **UNGUARDED** |
| `sessionMergeCount` restored | **UNGUARDED** |
| missing file → no change; corrupt file → no exception, game unchanged | **UNGUARDED** |

## Design (1 production file)
Three private static helpers in `SyncManager`, bodies moved **by script** (exact text, reverse-substitution check asserted before writing):
`restorePlayer(Map playerState, EventBus events) : Player` · `applyMutations(Map mutations, Universe universe)` · `remarkFootprints(Player player, Universe universe)`.
`restore` keeps the file check, the parse, the log line, job 4 and the try/catch (exceptions from helpers still land in the same catch → same log, same null).
The HK-018 one-line join of the last two `InventoryItem` arguments is undone (one argument per line, as the rest of the call).

## Commits
| # | Content | Prod. files | Gates |
| :-- | :--- | :--- | :--- |
| c0 | this plan | 0 | — |
| c1 | Step 0: `RestoreContractTest` — R1 coherence + stepCount, R2 visitedLIPs/visitedPaths equal and a non-current footprint `isVisited()`, R3 `sessionMergeCount`, R4 missing file leaves the game unchanged, R5 corrupt file: no exception, game unchanged. Scratch files, HK-012 guard on the real save. Green on master. | 0 | 245 → 250 |
| c2 | Extraction by script + `./vinc.sh --lint --baseline`; review: baseline diff is **one removal, zero additions** | 1 | 250, LINT PASS, baseline 8, goldens 0, scan 9 |
| c3 | Lesson (`infrastructure.md`): when the ratchet fires on a baselined method, the answers are *extract now* or *re-baseline with a stated reason* — never reformat to the recorded length. HK-013 entry: 8 remain, slice recorded. `WORKFLOW_BACKLOG.md`: WF-006 (Low) — evaluate `CyclomaticComplexity`/`AbcMetric` and `MethodSize.ignoreBlankLines`-style options against the jar, beside or instead of raw length; decide at the next cadence review. HK-018 record gets a pointer here. Plan → `tasks/completed/`. | 0 | — |

## Grill (six checks, evidence above)
1 Coverage — four UNGUARDED rows → c1 pins them first. 2 Edges — none intended; the one semantic risk is exception flow (helpers are called inside the existing try, so
`RESTORE_FAILED` + null is preserved; R5 pins it). 3 Lifecycle — not an ownership move; `Player` is still built once per restore with the state bus. 4 Coherence — c1 tests only;
c2 one file, compiles alone, baseline regenerated in the same commit so lint is green at every commit. 5 Deviations — HK-013 asked for "extract by script, reverse-substitution
check": followed; no pattern hierarchy introduced. 6 Reversion — each commit reverts alone; c2 carries its own baseline change. **CLEARED.**

## Declared
- Only `restore` is paid down here; the other eight long methods stay in HK-013.
- R5 writes an error to the log through `Logger.error` — that is the production behavior being pinned, not test noise to suppress.
