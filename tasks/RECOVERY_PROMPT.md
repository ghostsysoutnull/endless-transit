# RECOVERY HANDOVER: [OOA_STRUCTURAL_REFACTORING]
**Last updated:** 2026-09-16 (HK-019 chronicle `0x0033981`, merge `0033981` — **HK-019 CLOSED**; HK-013 slice 1 chronicle `0xe66fca4`, merge `e66fca4`; HK-018 chronicle `0x7ca28f8`, merge `7ca28f8` — **HK-018 CLOSED**; HK-016 step 3 chronicle `0x0408475`, merge `0408475` — **HK-016 CLOSED**; step 2 chronicle `0x0c49e5d`, merge `0c49e5d`; step 1 chronicle `0x36653e2`, merge `36653e2`; HK-017 merge `926e731`; before that the variety audit chronicle `0x5e1c9a4`, merge `53c3727`; HK-014 `d55e4e6`; Player's Guide `0x9c4e17d`; O2 `0x7b3e2c9`)

## 🎯 Current Status
- **Test Suite:** 256 discovered / 256 pass / 0 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`)
- **Lint:** `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=212 P1=0 P2=0 P3=0` (baseline: 8 entries)
- **Branch:** `master`, pushed at the end of the HK-019 session on the user's word (code merge `0033981`, chronicle, handover audit; the push republishes the Player's Guide page — its corridor row changed). If `git status -sb` shows ahead/behind, something happened after this file was written — ask. Working tree clean except the player's untracked `session.trace.bak-hk018`. Verify with `git status -sb`.
- **Active Work:** none — but **WF-007 (High) is open and, per CODEX, blocks the next phase until assessed** (see Next). **All ten OOA phases and O2 are complete**, merged and pushed. **O2 (`./vinc.sh --lint`)**: CodeNarc 4.0.0 on `lib/lint/`, Groovy-DSL ruleset
  `config/lint/vinc-ruleset.groovy` (house rules + six Vinculum invariant rules), baseline-ratchet `config/lint/baseline.xml` (now
  then exactly the nine long methods → **HK-013**; 8 remain since slice 1), 83 dead imports + 4 unused locals gone, `Player` is
  `@CompileStatic`, `Game.start` / `ConsoleSink` carry `@SuppressWarnings` in source. Plan + execution notes: `tasks/completed/O2_LINT_PLAN.md`.
  Optional O1 (HeadlessRunner DSL) remains `NOT STARTED`. **HK-010 is CLOSED** (discovery journaling restored as `LocationDiscovered`, a behavior change by
  user decision; goldens 13–18 regenerated). **HK-009 CLOSED** (delegator deleted; the explicit call had double-populated apartments in two tests). **HK-011 CLOSED** (`JournalManager` is `Game.journal`; ticker lines travel in `RenderContext.recentEvents`; the ticker now shows the
  discovered location's *name* — visual change by user decision, goldens 13–18). **HK-012 CLOSED** (user report: the suite had overwritten/deleted the player's `session.trace` since March; `Game.saveFile` +
  temp files in tests + guard assertions on the real file). **HK-008 CLOSED** (the last Service Locator: `Game.factory` is the one `ProceduralFactory`, injected into
  the services; every `Container` carries the registry that made it and `populateChildren()` asks it; `SeedScanner` and tests build their own; `FactoryWiringContractTest`).
- **Docs session (2026-09-16, chronicle `0x9c4e17d`):** the README's site link pointed at a domain that never existed (404) — fixed. A **plain-language
  Player's Guide** is live at `docs/terminal/guide/players_guide.md` (`[GUIDE]` in the site nav; every number read from source and cited
  inline as `<!-- File.groovy:NN -->`; collapsed spoilers/exploits; "Known quirks"). Writing it found **ten manual/codex claims the code
  contradicts → HK-014** and **five player-facing bugs → HK-015** (both OPEN in `tasks/backlog/HOUSEKEEPING.md`, with file:line each).
  No source code changed. **HK-014 is CLOSED** (same day, merge `d55e4e6`): 11 manual/codex pages corrected in the in-fiction voice —
  ten wrong numbers fixed, the world catalogue completed (10 cultures incl. four Minor, 8 eras, 6 traits, `ATMOS_SHIFT` = `Sector
  Mutation` = trait, 15 floor zones), glossaries trimmed to symbols that exist. Live crawl all 200.
- **HK-016 step 3 (2026-09-16, chronicle `0x0408475`, merge `0408475`) — HK-016 CLOSED:** every list grown to the audit's sizes (relics 16 per
  culture/era, atmosphere 10 per file, conditions 16, lexicons 12+12, doors 12/12/12; abyssal lists left as the largest); door materials/states (with
  narratives) and default inscription words are `themes/doors/*.txt` (`ThemeService.doorMaterials/doorStates/doorWords`; `Door(locus, materialPool,
  statePool)`, built-in defaults for hand-built doors; `DoorAppearance.materialNarrative/stateNarrative`); `generateFurniture` never doubles a relic's
  first word; nine size-floor pins in `ThemeResourceCoverageTest`. Probe: objects distinct 143–198 → 261–545, furniture → 177–285, door briefs 106 → 160/252,
  0 repeats. 18 commits, each re-pinned from a run by an allow-list script that refused once (a second building-name pin, `ProcgenDeepSnapshotTest:117`).
  Record: `tasks/completed/HK_016_STEP3_PLAN.md`; retro `docs/retro/RETRO_HK_016_STEP3.md`.
- **HK-016 step 2 (2026-09-16, chronicle `0x0c49e5d`, merge `0c49e5d`):** structural variety, all six items: `ThemeService.objectDeck` (items × items ×
  4 forms + singles = 272 per culture/era), `ApartmentFactory` shuffles and deals it (no object repeats in an apartment — pinned on six seeds);
  `generateFurniture` = `<condition> <culture item>` from `themes/conditions.txt`; `VibeCapsule.secondaryTimeline` + `pickTimeline` (drawn per planet,
  picked per apartment, swapped in rebel districts with the cultures); `generateRoomName` = `<dealt adjective> <category>`, hex gone (`createRoom`
  gained a defaulted `adjective`); corridor/floor sentences from `themes/descriptions/*.txt`, stored on the model by the factory (`descriptionVariant`).
  `ProcgenVarietyContractTest` 7 pins. 12 goldens moved (the golden city Clockcity is a **rebel district**, so Q4a flipped its era analog → digital).
  Objects distinct 143–198 → 203–369 per seed; the ceiling is now the deck (272 per pair), which is what step 3 grows. Record:
  `tasks/completed/HK_016_STEP2_PLAN.md`; retro `docs/retro/RETRO_HK_016_STEP2.md`.
- **HK-016 step 1 + HK-017 (2026-09-16, chronicle `0x36653e2`):** the silent resource files are filled — lighting for atomic/digital/entropic/future,
  structures for Industrial/Commercial (+ the glitch key `Singularity`), walls for gilded/rust/shogun/void/zenith, 8+8 lexicons for
  gilded/shogun/zenith/abyssal; `NameGenerator` enumerates the lexicon from `names/buildings/index.txt`; `ThemeService.poolOrWarn` /
  `NameGenerator.lexiconFor` print `[THEME_WARN]` on any fallback; the glitch key `"Abyssal"` → `"abyssal"` (it matched no file);
  `ThemeResourceCoverageTest` pins every index key → file and every generator → its own file (RED on the old tree). Probe: lighting and
  structure fallbacks 0 on all six seeds. One snapshot literal + goldens 16/30 moved, exactly as the plan's **classpath-overlay simulation**
  predicted (technique now in `tasks/lessons/procgen.md`). **HK-017** (found by that simulation, fixed first): the narrative pane wrapped
  to 88 columns while the split box holds 86 — one constant, `FrameGeometryContractTest`, 12 goldens lost their `...`. Plan + record:
  `tasks/completed/HK_016_STEP1_PLAN.md`; retro `docs/retro/RETRO_HK_016_STEP1.md`. Guide/atlas/codex corrected in the same commit.
- **Variety audit (2026-09-16, chronicle `0x5e1c9a4`):** user report "lack of variation in the objects on the rooms" — measured on six seeds
  (1,354 rooms) and confirmed: objects and furniture share one generator on a planet-wide timeline and two cultures (≤ 256 strings per
  planet); structure, lighting and walls collapse to a *single* string for ⅓ of countries, half of planets and five of ten cultures because
  resource files are missing and `ThemeService` falls back silently; room names owe their uniqueness to a hex serial. Full findings,
  root causes, the ordered three-step plan and both probe scripts: `docs/analysis/VARIETY_AUDIT.md`. Logged as **HK-016** — a
  **content phase** (every step moves `ProcgenSnapshotTest`/`ProcgenDeepSnapshotTest` literals and goldens; own branch; step-0 pins listed
  in the audit §4). No source change.
- **HK-018 (2026-09-16, chronicle `0x7ca28f8`, merge `7ca28f8`) — CLOSED:** user report "Keystone held, no `j` on the Peak" had two causes — the Keystone matched
  its building by *name* (a lexicon growth renamed it), and `j` lived only in the elevator menu while corridor mode was sticky and `l` skips the elevator (the stickiness itself fixed later by HK-019; found by restoring
  *copies* of the player's save in a scratch game and printing the Peak menu in both modes; the player pressed `b` and `j` appeared). Fix, behavior change by user decision:
  `Building.keystoneIn` (`isKeystone && boundLip == getLIP()`) + `Floor.addBreachOption`, asked by both floor states; `InventoryItem.boundLip` set at forging, saved/restored;
  **no name fallback** — pre-fix Keystones open nothing (the player starts a new game). `BreachOptionContractTest` 9 pins. 36 goldens unchanged. Record: `tasks/completed/HK_018_PLAN.md`.
  The player's `session.trace` and `session.trace.bak-hk018` are theirs — never edit, never commit.
- **HK-019 (2026-09-16, chronicle `0x0033981`, merge `0033981`) — CLOSED, the last session:** user question about HK-018's "left open" line. A floor remembered corridor mode
  forever and the corridor's `l` exits straight to the building, so a floor left that way reopened on the corridor menu (no `u`/`d`) until `b`. Fix, behavior change by user
  decision (D1a/D2/D3): corridor mode means "standing in the corridor" — `Floor.leave(game)` = `returnToElevator()` + `exitLocation()`; `CorridorState` re-routes the Corridor's own
  leave key to it (same key, same slot; key from `Container.leaveLabel()`). Reset on *leave*, never on enter (restore goes through `enterLocation` — Phase 1a). Coming back from an
  apartment and sync/restore inside the corridor keep corridor mode. `CorridorLeaveContractTest` 6 pins (3 green first, 3 RED first). 36 goldens unchanged. Grill AMEND → CLEARED.
  Declared, left open: a direct `game.exitLocation()` and the debug `BREACH` teleport do not reset; old saves heal on the first `l`; the double `l` after an apartment → HK-015.
  Record `tasks/completed/HK_019_PLAN.md`; retro `docs/retro/RETRO_HK_019.md`; blueprint `docs/blueprints/logic/classes/model/Floor.md`.
  **Same session, no change made:** the user spawned a Keystone from the glitch menu and saw no `j` — a scratch restore of a *copy* of the save showed the Keystone bound correctly
  on the top floor but the building **not primed** (0/9 floors sampled, 0 infusions; `Building.isPrimed` needs every floor + 7). The debug `KEYSTONE` command does not prime. Offered
  as a follow-up ("`KEYSTONE` also primes the building"); the user has not decided. **User correction at close:** the handover docs were stale when the session was called closed →
  lesson in `tasks/lessons/infrastructure.md` (nine-point close-out list) and **WF-007 (High)**.
- **HK-013 slice 1 (2026-09-16, chronicle `0xe66fca4`):** `SyncManager.restore` split into `restorePlayer`/`applyMutations`/`remarkFootprints` (by script; `RestoreContractTest` 5 pins first); lint baseline 9 → 8.
  Rule: when the ratchet fires on a baselined method, extract or re-baseline with a stated reason — never reformat to the recorded length. **WF-006 (Low)**: evaluate a complexity metric beside `MethodSize` at the next cadence review.
- **Next:** **first, WF-007 (High, `docs/analysis/WORKFLOW_BACKLOG.md`)** — make the close-out doc audit a gate (the list in `.claude/commands/chronicle.md` and/or a `./vinc.sh --docs` check); it blocks the next phase until the user has assessed it. Then user decision — no active phase. **HK-015** (player-facing bugs, now also the double `l` after an apartment; items 1–2 — the repeating room roll and the unconditional +15 — are
  gameplay changes and need an explicit Directive; every fix edits `docs/terminal/guide/players_guide.md` in the same commit), **HK-013** (8 long
  methods left in the lint baseline), **O1** (HeadlessRunner DSL), or a new audit. None has a plan yet. To grow any procgen list now: append lines to its
  file, run the suite (size and no-duplicate floors are pinned), simulate the goldens, re-pin from the run.

## ✅ State of the substrate in one paragraph
`GameState.events` is the one `EventBus` (final, never replaced; exact-class dispatch in subscription order). `Player` is
the sole publisher: `capture(item, where)` is the only door into the buffer from the world and publishes `ItemCaptured`;
`mergeItems` publishes `SynthesisPerformed`. `Game` attaches two typed listeners once — `JournalManager.attach` (writes the
journal lines; one instance per `Game` since HK-011) then `RitualTracker.attach` (`Building.notifySampled` / `infusionCount++`,
moved verbatim out of the journal). A `Player` built outside `GameState` gets an inert bus (declared edge E1); the two
production sites that replace the player on restore hand in the state bus. No model class imports `JournalManager`
(invariant 7 in `model/CLAUDE.md`). `Container.populateChildren()` dispatches through the registry that created the container
(`Container.factory`, HK-008; `Game.factory` is the one instance, there is no static);
`Floor` mode is a `FloorState`; the breach rule (`Floor.addBreachOption`, Keystone bound by LIP — HK-018) is asked by both states, and the corridor's `l` leaves through `Floor.leave`, which returns the floor to the elevator (HK-019). `BridgeView` composition, `FrameEntropy` and the 36-frame golden gate are as in the Phase 7–9 handovers.

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git status -sb` (check ahead/behind origin); `git log --oneline -5`
   (top: docs-only merges from the HK-019 close-out — `Merge docs/hk-019-doc-audit` or later; the last *code* merge is `0033981`, HK-019; `master` was pushed at session close). Read `tasks/todo.md`, the latest journal in `journals/` (`0x0033981` HK-019, this session; `0xe66fca4` HK-013 slice 1 and `0x7ca28f8` HK-018 before it),
   `tasks/backlog/HOUSEKEEPING.md` OPEN items (HK-015, HK-013), `docs/analysis/WORKFLOW_BACKLOG.md` OPEN items (**WF-007 High**, WF-006 Low), and `tasks/completed/HK_016_STEP3_PLAN.md` execution notes if a content change is
   planned (the simulate → expected-set → allow-list re-pin chain).
3. **Audit:** `./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=256 SUCCEEDED=256 FAILED=0 SKIPPED=0`;
   `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=212 P1=0 P2=0 P3=0`; `./vinc.sh --scan` → seed 0, 9 nodes.
4. **Ask before choosing:** there is no active phase. Say first that **WF-007 (High) blocks the next phase until assessed**. Then present the options — WF-007, HK-015 (items 1–2 need a gameplay Directive), O1, HK-013, optional "glitch `KEYSTONE` also primes" — and wait for a
   Directive. The user likes decisions as numbered questions with lettered options and a marked preference, answered in one word.
5. **Every task:** plan file → `/grill` → authorization → branch → ≤5 production files per commit → full suite + `--lint` after every
   commit → merge `--no-ff` → `/chronicle` → retro → lessons → refresh this file → **run the nine-point close-out list (`tasks/lessons/infrastructure.md`, "Close the session") and show it filled in, before saying "closed"**.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| Active refactor plan | `docs/analysis/OOA_REFACTOR_PLAN.md` (O2 section rewritten; Phase 10 section has the execution record) |
| Lint mode | `vinc.sh` (`--lint`), `config/lint/vinc-ruleset.groovy`, `config/lint/baseline.xml` (one writer: `--lint --baseline`), `lib/lint/*.jar`; plan `tasks/completed/O2_LINT_PLAN.md` |
| Variety audit | `docs/analysis/VARIETY_AUDIT.md` (HK-016: findings table, root causes, ordered plan, §4 step 1 DONE block with the after-table, probe scripts) |
| HK-016 step 3 record | `tasks/completed/HK_016_STEP3_PLAN.md` (decisions, grill, per-family predicted vs actual movement, execution notes); retro `docs/retro/RETRO_HK_016_STEP3.md`; resource lists `src/main/resources/themes/{cultures,timelines,atmosphere/*,descriptions,doors}/`, `conditions.txt`, `names/buildings/` — every one with a size floor in `ThemeResourceCoverageTest` |
| HK-016 step 2 record | `tasks/completed/HK_016_STEP2_PLAN.md` (decisions, grill, per-commit simulated vs actual movement, execution notes); retro `docs/retro/RETRO_HK_016_STEP2.md`; pins `src/test/groovy/com/endlesstransit/procgen/ProcgenVarietyContractTest.groovy` |
| HK-016 step 1 record | `tasks/completed/HK_016_STEP1_PLAN.md` (grill, overlay simulation, per-commit gate movement, content appendix); retro `docs/retro/RETRO_HK_016_STEP1.md` |
| Resource coverage pins | `src/test/groovy/com/endlesstransit/procgen/ThemeResourceCoverageTest.groovy`; `src/test/groovy/com/endlesstransit/ui/FrameGeometryContractTest.groovy` (HK-017) |
| Latest chronicles | `journals/CHRONICLE_INDEX.md` (0x0033981 HK-019 corridor leave, 0xe66fca4 HK-013 slice 1, 0x7ca28f8 HK-018 breach rule, 0x0408475 HK-016 step 3, 0x0c49e5d HK-016 step 2, 0x36653e2 HK-016 step 1 + HK-017, 0x5e1c9a4 variety audit, 0x3d7a5e2 HK-014 manual corrections + atlas, 0x9c4e17d Player's Guide, 0x7b3e2c9 O2) |
| Player's Guide (source-verified reference) | `docs/terminal/guide/players_guide.md`; live at `https://ghostsysoutnull.github.io/endless-transit/terminal/guide/players_guide.html`; site is GitHub legacy Pages from `master:/docs` (no local build; branches are never published) |
| Floor mode + breach pins | `src/test/groovy/com/endlesstransit/model/{FloorStateContractTest,BreachOptionContractTest,CorridorLeaveContractTest}.groovy`; blueprint `docs/blueprints/logic/classes/model/Floor.md`; records `tasks/completed/HK_018_PLAN.md`, `tasks/completed/HK_019_PLAN.md` |
| Retros | `docs/retro/RETRO_HK_019.md`, `docs/retro/RETRO_HK_018.md`, `docs/retro/RETRO_O2.md`, `docs/retro/RETRO_HK_008.md`, `docs/retro/RETRO_SESSION_20260916.md` |
| Event system | `src/main/groovy/com/endlesstransit/core/{EventBus,DomainEvent,ItemCaptured,SynthesisPerformed,RitualTracker,JournalManager}.groovy`, `Player.capture`, `GameState.events` |
| Event pins | `src/test/groovy/com/endlesstransit/core/{JournalEventContractTest,EventBusTest}.groovy` |
| Factory wiring pins | `src/test/groovy/com/endlesstransit/procgen/FactoryWiringContractTest.groovy` (HK-008) |
| Per-type factories | `src/main/groovy/com/endlesstransit/procgen/{LocationFactory,*Factory}.groovy` |
| Golden frames + harness | `src/test/groovy/com/endlesstransit/ui/{golden/,HudFrameHarness,BridgeViewGoldenFrameTest,ViewComponentGoldenTest,GoldenFrameGenerator}.groovy` |
| Housekeeping backlog | `tasks/backlog/HOUSEKEEPING.md` (OPEN: HK-015 player-facing bugs, HK-013 long methods, 8 remain; HK-019, HK-018, HK-016 (three steps), HK-017, HK-014 closed) |
| Workflow backlog | `docs/analysis/WORKFLOW_BACKLOG.md` (OPEN: **WF-007 High — close-out doc audit is not mechanical**; WF-006 Low — complexity metric beside `MethodSize`) |
| Plan interrogation | `.claude/commands/grill.md` |
| Lessons | `tasks/lessons/{ui,infrastructure,core,model,procgen}.md` |
| Safety mandates | `tasks/lessons/POST_MORTEM_2026_03_11.md`, `tasks/lessons/POST_MORTEM_2026_03_06.md` |

## ⚠️ Lessons carried forward
- A new gate ships green on its first commit: baseline the debt, ratchet it down; the baseline has one writer and its diff may only remove (O2).
- Verify rule names and CLI behavior against the jar with a scratchpad prototype — the plan said `NoSystemExit` and Gradle; neither existed on this runner (O2).
- An import is not a call; a caller-less public method is a regression to `git log -S`, not a feature to wire (Phase 10).
- When a service becomes a listener, audit its side effects first — a model mutation inside it is a game rule (Phase 10).
- A bus outlives the aggregate that publishes on it: channel on the never-replaced object, injected by constructor (Phase 10).
- A disabled test guards nothing; quote assertions from enabled tests only (Coverage Claim Protocol).
- A State/Strategy/Factory/Observer hierarchy is defeated by one `instanceof` in a client; for events the client is the listener.
- Move bodies by script; assert on the construct, not the token; chain `edit && test && commit`.
- Population is reached through `getIndexInParent()` too: a hand-built *parent* needs `factory` and `fmt` like any other hand-built container (HK-008).
- Variety is bounded by the slowest-varying input in the vibe chain, not by list length; a serial suffix that keeps names apart is not variety; a silent fallback to one string is a data gap that only a count can see (variety audit, HK-016).
- Rehearse a content change in a classpath overlay before authorization; the rehearsal states each commit's gate movement and finds what reading misses (HK-016 step 1: the glitch key, the pane width).
- A glitch/fallback key is a resource key: same case, in the index, enumerated by the coverage pin (HK-016 step 1).
- The wrap width and the box capacity are one number; a `...` vanishing from lines you never touched is a bug surfacing (HK-017).
- Run a new pin RED and GREEN before trusting it (the coverage pin contradicted itself for monolith on first run).
- Predict golden movement from the golden world's facts (the golden city is a rebel district); a deck's distinct count is a ceiling — state targets as ceilings and no-repeat rates (HK-016 step 2).
- Gate golden regeneration mechanically on the simulated frame set; a red demo that fails to compile is inconclusive (HK-016 step 2).
- Re-pin literals by allow-list script that refuses any other drift; grep the test tree for the *literal* before writing a coverage row (HK-016 step 3).
- A progress-gated option must not also hang on a UI mode the player can get stuck out of; a generated name is not an identity — bind by LIP; to diagnose a missing option, restore a *copy* of the save and print the menu in every mode (HK-018).
- Externalise a list before growing it, behind a zero-diff gate; every generator list is a file with a pinned size floor (HK-016 step 3).
