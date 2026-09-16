# RECOVERY HANDOVER: [OOA_STRUCTURAL_REFACTORING]
**Last updated:** 2026-09-16 (HK-014 manual/codex corrections merge `d55e4e6`; Player's Guide chronicle `0x9c4e17d`, merge `7dddfa2`; before that O2 chronicle `0x7b3e2c9`, retro `docs/retro/RETRO_O2.md`, merge `d5b15e2`)

## 🎯 Current Status
- **Test Suite:** 213 discovered / 213 pass / 0 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`)
- **Lint:** `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=206 P1=0 P2=0 P3=0` (new gate, O2)
- **Branch:** `master`, pushed. Working tree clean. Verify with `git status -sb`.
- **Active Work:** none. **All ten OOA phases and O2 are complete**, merged and pushed. **O2 (`./vinc.sh --lint`)**: CodeNarc 4.0.0 on `lib/lint/`, Groovy-DSL ruleset
  `config/lint/vinc-ruleset.groovy` (house rules + six Vinculum invariant rules), baseline-ratchet `config/lint/baseline.xml` (now
  exactly the nine long methods → **HK-013**, the one OPEN backlog item), 83 dead imports + 4 unused locals gone, `Player` is
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
- **Next:** user decision — **HK-015** (player-facing bugs; items 1 and 2 — the repeating room roll and the unconditional +15 — are
  gameplay changes and need an explicit Directive), or O1 (HeadlessRunner DSL), or HK-013 (nine long methods in the lint baseline).
  None has a plan yet. Any HK-015 fix also edits `docs/terminal/guide/players_guide.md` ("Known quirks" / spoilers) and, where the
  manual states the old behaviour, the matching manual page, in the same commit.

## ✅ State of the substrate in one paragraph
`GameState.events` is the one `EventBus` (final, never replaced; exact-class dispatch in subscription order). `Player` is
the sole publisher: `capture(item, where)` is the only door into the buffer from the world and publishes `ItemCaptured`;
`mergeItems` publishes `SynthesisPerformed`. `Game` attaches two typed listeners once — `JournalManager.attach` (writes the
journal lines; one instance per `Game` since HK-011) then `RitualTracker.attach` (`Building.notifySampled` / `infusionCount++`,
moved verbatim out of the journal). A `Player` built outside `GameState` gets an inert bus (declared edge E1); the two
production sites that replace the player on restore hand in the state bus. No model class imports `JournalManager`
(invariant 7 in `model/CLAUDE.md`). `Container.populateChildren()` dispatches through the registry that created the container
(`Container.factory`, HK-008; `Game.factory` is the one instance, there is no static);
`Floor` state, `BridgeView` composition, `FrameEntropy` and the 36-frame golden gate are as in the Phase 7–9 handovers.

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git status -sb` (check ahead/behind origin); `git log --oneline -5`
   (top: hand-off docs commit above chronicle `bed11ab` and the guide merge `7dddfa2`). Read `tasks/todo.md`,
   `journals/LOG_20260916_174944_0x9c4e17d.md` (the guide session: method, findings, bug list), and `tasks/backlog/HOUSEKEEPING.md`
   OPEN items (HK-015, HK-013).
3. **Audit:** `./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=213 SUCCEEDED=213 FAILED=0 SKIPPED=0`;
   `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=206 P1=0 P2=0 P3=0`.
4. **Ask before choosing:** there is no active phase. Present the options — HK-015 (recommended first; items 1–2 need a gameplay
   Directive), O1 (HeadlessRunner DSL), HK-013 (nine long methods; read `docs/retro/RETRO_O2.md` "Concerns") —
   and wait for a Directive. Any HK-015 fix edits `docs/terminal/guide/players_guide.md` in the same commit so the guide stays true.
5. **Every task:** plan file → `/grill` → authorization → branch → ≤5 production files per commit → full suite + `--lint` after every
   commit → merge `--no-ff` → `/chronicle` → retro → lessons → refresh this file.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| Active refactor plan | `docs/analysis/OOA_REFACTOR_PLAN.md` (O2 section rewritten; Phase 10 section has the execution record) |
| Lint mode | `vinc.sh` (`--lint`), `config/lint/vinc-ruleset.groovy`, `config/lint/baseline.xml` (one writer: `--lint --baseline`), `lib/lint/*.jar`; plan `tasks/completed/O2_LINT_PLAN.md` |
| Latest chronicles | `journals/CHRONICLE_INDEX.md` (0x9c4e17d Player's Guide, 0x7b3e2c9 O2, 0xf681c46 HK-008) |
| Player's Guide (source-verified reference) | `docs/terminal/guide/players_guide.md`; live at `https://ghostsysoutnull.github.io/endless-transit/terminal/guide/players_guide.html`; site is GitHub legacy Pages from `master:/docs` (no local build; branches are never published) |
| Retros | `docs/retro/RETRO_O2.md`, `docs/retro/RETRO_HK_008.md`, `docs/retro/RETRO_SESSION_20260916.md` |
| Event system | `src/main/groovy/com/endlesstransit/core/{EventBus,DomainEvent,ItemCaptured,SynthesisPerformed,RitualTracker,JournalManager}.groovy`, `Player.capture`, `GameState.events` |
| Event pins | `src/test/groovy/com/endlesstransit/core/{JournalEventContractTest,EventBusTest}.groovy` |
| Factory wiring pins | `src/test/groovy/com/endlesstransit/procgen/FactoryWiringContractTest.groovy` (HK-008) |
| Per-type factories | `src/main/groovy/com/endlesstransit/procgen/{LocationFactory,*Factory}.groovy` |
| Golden frames + harness | `src/test/groovy/com/endlesstransit/ui/{golden/,HudFrameHarness,BridgeViewGoldenFrameTest,ViewComponentGoldenTest,GoldenFrameGenerator}.groovy` |
| Housekeeping backlog | `tasks/backlog/HOUSEKEEPING.md` (OPEN: HK-015 player-facing bugs, HK-013 nine long methods; HK-014 closed) |
| Workflow backlog | `docs/analysis/WORKFLOW_BACKLOG.md` (clean) |
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
