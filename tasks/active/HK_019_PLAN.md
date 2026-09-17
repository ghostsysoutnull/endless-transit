# Housekeeping Plan: HK-019 — A floor forgets the corridor when the player walks out of it
**Created:** 2026-09-16 | **Grill:** AMEND (2 items: E7, E8 + walk-out pin) → applied → CLEARED | **Branch (proposed):** `housekeeping/hk-019-corridor-reset` (from `master` @ c8ae695)
**Backlog:** HK-019 (new; the "Left open" line of HK-018, `tasks/backlog/HOUSEKEEPING.md:60`) | **Baseline (run during the grill):** 250 / 250 / 0 / 0, LINT PASS 211 files, scan seed 0 → 9
**Status:** PLAN ONLY — nothing is authorized by this file. **User decisions (2026-09-16):** D1 = a, D2 = out of scope (→ HK-015), D3 = no migration.

> **Behavior change, needs a user decision.** Leaving a floor with `l` from corridor mode puts that floor back in elevator
> mode. The next visit starts at the elevator (`u`, `d`, `c` visible). Nothing else moves: same menus, same labels, same
> order, so the prediction is **0 goldens moved** and `--scan` seed 0 → 9. If any golden moves: STOP.

---

## What happens today (ELI5)

A floor has two menus: elevator (`l u d c`) and corridor (`b l 01 02 …`). The floor remembers which one it is in, forever.
In the corridor, `l` walks straight out to the building. So: press `c` once, leave with `l`, and that floor greets you with
the corridor menu on every later visit — no `u`, no `d` — until you press `b`. HK-018 stopped this from hiding `j`; it still
hides `u`/`d`.

**The fix in one sentence:** corridor mode means "I am standing in the corridor"; when you walk out of the floor you are not,
so the floor goes back to elevator mode at that moment.

Why on *leave* and not on *enter*: restore also goes through `enterLocation`, so a reset on enter would reload a corridor
save in the elevator — the exact bug Phase 1a removed (`CorridorPersistenceTest:89-91`).

## Evidence read this session

- **Probe (scratchpad script, seed 12345, temp save file, repo untouched), Floor 1 of the first building:**
  - elevator: `[l. Leave Floor, u. Go Up, d. Go Down, c. Enter Corridor]`
  - after `c`: at Floor, state `CORRIDOR`, `[b. Back to Elevator, l. Leave Corridor, 01…10]`
  - after `01`: at Room (auto-entry), floor state `CORRIDOR`
  - after the room's `l. Exit Apartment`: at **Corridor** (the location itself — menu has no `b`), floor state `CORRIDOR`
  - after `l` again: at **Floor**, state `CORRIDOR` (menu now has `b`)
  - after `l` a third time: at **Building**; floor state still `CORRIDOR`
  - re-enter Floor 1 from the building menu: corridor menu, no `u`/`d` ← the trap
- `CorridorState.groovy:22-38`: menu = `b` + `addBreachOption` + `putAll(corridor.getOptions(game))`. The `l` entry is the
  Corridor's own base option.
- `Container.groovy:278-284` (`getBaseOptions`): `"l. Leave ${simpleName}"` → `{ game.exitLocation() }`.
- `NavigationOrchestrator.groovy:57-63` (`exitLocation`): enters `currentLocation.parent`. In corridor mode the current
  location is the **Floor**, so `l` lands on the Building. No hook runs on the location being left.
- `Floor.groovy:45-53`: `enterCorridor()` / `returnToElevator()` are the only transitions (invariant 6).
- `Floor.groovy:27-38`: mode is saved as `"state"` and restored by id.
- `Room.groovy:250`: `l. Exit Apartment` → `enterLocation(apt.parent)` (the Corridor).
- `ActionMapper.groovy:23-27`: keys resolve by the text before the first `.`; swapping a closure under the same label is invisible to it.
- Every way off a floor while it is in corridor mode: `l` (→ Building); a numbered door (→ deeper, mode must stay);
  quit/sync (mode must stay — it is where the player stands); `BreachBedrockCommand.groovy:20` (debug lattice command,
  teleports to Layer -1 from anywhere). `u`/`d`/`Descend` exist only in elevator mode.
- `HudFrameHarness`: reaches the corridor frames by descending `children[0]`; it never calls a leave option. Goldens 14/15/32
  contain the labels only.

## Coverage (Coverage Claim Protocol — assertion lines read this session)

| Behavior | Guard |
| :--- | :--- |
| Corridor-mode menu keys = `b` + Corridor's own keys, in order | `FloorStateContractTest:56-58`, run at `:83`, `:114`, `:137` — keys only, so a swapped closure keeps it green |
| Corridor mode survives sync + restore while standing in it | `CorridorPersistenceTest:89-91` (`assertSame(CorridorState.INSTANCE, …)`) — must stay green unchanged |
| Mode round-trips through mutation state | `FloorStateContractTest:126-140` — must stay green unchanged |
| Corridor-mode `l` lands on the Building | **UNGUARDED** |
| Elevator-mode `l. Leave Floor` lands on the Building, mode untouched | **UNGUARDED** |
| Room `l` → Corridor, then `l` → Floor still in corridor mode | **UNGUARDED** (`ActionMapperDepthTest:105-106` asserts only "no longer a Room") |
| A floor left from the corridor stays in corridor mode on re-entry (today's behavior, being changed) | **UNGUARDED** — nothing to un-pin |

## Design (recommended: D1 = a)

The rule lives on the model; the state asks the floor (invariant 6, no `instanceof`).

- **`Floor.leave(Game game)`** (new): `returnToElevator(); game.exitLocation()`. Javadoc names HK-019.
- **`Container.leaveLabel()`** (new, zero behavior): returns `"l. Leave ${getClass().simpleName}"`; `getBaseOptions` uses it.
  Exists so `CorridorState` does not copy a label string.
- **`CorridorState.getOptions`**: after `putAll`, if the menu holds `floor.getCorridor().leaveLabel()`, replace that entry's
  closure with `{ floor.leave(game) }`. Same key, same position (a `LinkedHashMap` keeps the slot) → same menu, same goldens.
- When the player stands on the **Corridor** location (after leaving an apartment) the menu comes from `Corridor.getOptions`,
  not from the state, so that `l` still returns to the Floor in corridor mode — coming back from an apartment keeps the corridor.
- `ElevatorState` untouched: its `l` already leaves a floor that is in elevator mode.

Production files: `Floor.groovy`, `Container.groovy`, `CorridorState.groovy` (3).
Test blast radius: new `CorridorLeaveContractTest` only; zero edits to existing tests (grep of `src/test` for
`Leave Corridor|enterCorridor|returnToElevator|exitLocation` read this session).

## User decisions (taken 2026-09-16: D1a, D2 out of scope, D3 no migration)

- **D1 — where the reset hooks.** (a) *recommended:* only the corridor-mode `l`, as above — 3 small files, the one real path.
  (b) a general rule in navigation ("a floor returns to elevator whenever the player ends up outside it") — also covers the
  debug `BREACH` teleport, but puts a model rule in `core` or needs a new leave-hook on every `Location`. Bigger, and only a debug command benefits.
- **D2 — the double `l` after an apartment** (Room → Corridor location → Floor-in-corridor → Building: two near-identical
  screens, one with `b`, one without). Found by the probe. *Recommended:* out of scope, log under HK-015 as a player-facing quirk.
- **D3 — old saves.** Floors already stuck in corridor mode in an existing save stay stuck until left once with `l` (or `b`).
  *Recommended:* no migration — it heals on first use.

## Commits (≤ 5 production files each; full suite + `--lint` after every commit)

| # | Content | Production files | Expected gates |
| :-- | :--- | :--- | :--- |
| c0 | this plan committed; HK-019 opened in the backlog; baseline suite/lint/scan recorded | 0 | 250/250, LINT PASS, scan 0 → 9 |
| c1 | **Step 0 pins, green on master:** new `CorridorLeaveContractTest` — P1 corridor-mode `l` lands on the Building; P2 elevator-mode `l` lands on the Building and the floor stays `ELEVATOR`; P3 Room `l` → Corridor, `l` → Floor with `assertSame(CorridorState.INSTANCE, …)` | 0 | 253/253 |
| c2 | **The change:** `Floor.leave`, `Container.leaveLabel`, `CorridorState`. Pins, shown RED on c1 first: P4 after corridor-mode `l` the floor is `assertSame(ElevatorState.INSTANCE, …)`, `getMutationState().state == "ELEVATOR"`, and re-entering from the building menu shows `c. Enter Corridor`; P4b (grill) the full walk-out Room `l` → Corridor `l` → Floor `l` → Building leaves the floor in `ELEVATOR`; P5 the same on the bedrock floor (-1). Guide `players_guide.md:113` edited in this commit ("…and the floor is back at the elevator next time") | 3 | 256/256, 36 goldens unchanged, LINT PASS, scan 0 → 9 |
| c3 | Close-out: backlog HK-019 → CLOSED, HK-018 "Left open" line points here, D2 → HK-015, `todo.md`, plan → `tasks/completed/` | 0 | — |

P4/P5 need no new API (menu keys, `currentState`, `getMutationState`), so their red is an assertion failure, not a compile
failure (lesson, HK-016 step 2). All pins drive the menu through the option closures, like `FloorStateContractTest`.

## Declared edges

- **E1** `b` is unchanged; a player who likes the corridor-first flow loses it (one extra `c` per visit). This is the behavior change.
- **E2** (D1a) The debug `BREACH` lattice command still leaves a stale corridor floor behind. Debug only; `b` recovers.
- **E3** (D3) Existing saves heal on first `l`; no save-format change, no migration code.
- **E4** `Container.leaveLabel()` is a plain method, not a `get…` property, so it adds nothing to Groovy property access or to any serialization.
- **E5** The reset runs *before* `exitLocation`; if the floor had no parent `exitLocation` prints "End of reality" and the floor
  is in elevator mode anyway. A floor always has a Building parent in a generated world.
- **E6** Domain docs: `model/CLAUDE.md` invariant 6 gains one clause in c2 ("leaving the floor from the corridor returns it to the elevator — `Floor.leave`"); `GEMINI.md` mirrored.
- **E7** (grill) The reset rides on the corridor menu's `l`, not on `Game.exitLocation()`. A direct `game.exitLocation()` from a floor in corridor
  mode does not reset it. Production has one caller (`Container.groovy:281`, the menu closure); the one test caller
  (`DiscoveryEventContractTest:82`) exits a Building.
- **E8** (grill) Enter-repeat: `NavigationEngine.updateRepetitionContext` re-maps a repeated "leave" to the new menu's leave key, so `l`, Enter, Enter
  from a room walks Room → Corridor → Floor → Building through the same closures — the last step resets the floor. Intended; pinned by P4b.
- **E9** (grill) The `containsKey(leaveLabel)` guard in `CorridorState` would make the fix a silent no-op if the label ever diverged; P4 goes red in that case.
  `BreachOptionContractTest:67` pins the literal `"l. Leave Floor"`, which guards the `leaveLabel()` extraction in `Container`.
- Guide `:349` ("whether each floor was in elevator or corridor mode" is saved) stays true — no edit.

## After the merge

`/chronicle` (behavior change). No retro (housekeeping). No new lesson expected unless the grill or execution produces one.
