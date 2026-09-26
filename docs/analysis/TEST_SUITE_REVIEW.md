# Test Suite Review
**Created:** 2026-09-26
**Trigger:** user question — "every change seems to come with a pile of new tests"; hypothesis to test: "we're testing
trivial things, even simple UI wording changes, and this makes no sense."
**Measured at:** `852ca64` on `ui/u02-inside-the-building`
**Status:** RESEARCH — nothing was deleted, changed or logged. No source or test change is authorized by this document.

> **Verdict: partially confirmed.** Change-detector tests on fixed wording are real and drive much of the churn in
> wording-heavy iterations, but most of the suite guards rules, save and restore, the design walls, determinism and
> accessibility. New tests are modest (+61 for +2,512 source lines), runtime is negligible, and the real cost is agent
> tokens.

Scope: the web game (`web/`). The old Groovy game in `terminal/` was not examined.

---

## 1. Method
- **Sample:** 27 test files, stratified.
  - Engine (9): GameEngine, Journey, Floor, Ritual, Substrate, Descent, Sessions, Seed, Passages.
  - Content (3): Goldens, WorldPins, ContentFloors.
  - UI (9): HudPresenter, TitlePresenter, RebootPresenter, RecapPresenter, StreetPicture, TowerPicture,
    ViewsCarryNoWords, Contrast, Pictures.
  - E2E (6): richness, buildings, ritual, fold, a11y, focus.
- **Weighting:** the last 30 commits that touched `web/tests` or `web/e2e` (test history, not overall history, since the
  branch top is docs-only). Included the 4 largest files (GameEngine 1323 lines, HudPresenter 1048, Journey 599,
  Descent 428) and the most edited (GameEngine 30 commits, HudPresenter 28, TitlePresenter 20, the goldens 15,
  RecapPresenter 10).
- **Depth:** classified per describe/it block. Block titles listed and assertion kinds counted by script; only the
  flagged blocks read in full.
- **Wording rule, applied uniformly:** an expected string that varies with state, seed or branch (a number, a dealt
  name, a chosen ending) is behavior; a fixed sentence restated with no variation is a change-detector.
- **Cost:** two scripts over git history. One classified each later edit of a test file as "only string/number values
  changed" or "structure changed". The other checked whether edits to the small presenter tests only added a
  `field: value` line to a hand-built sample snapshot.
- **Dropped approach:** classifying commits as logic or wording by the source files they touched could not tell them
  apart, because feature commits bundle engine, UI and tests together.
- Regex-based counts are approximate; hand-checked numbers are stated as such.

## 2. Measured totals
- **Unit (Vitest):** 531 tests, all passing in two runs, 10.4 s and 9.4 s wall. Re-checked by the main session: 531
  tests in 59 files (the sub-agent reported 58 files).
  - Engine: 373 tests, 13.3 s summed, 97% of unit time.
  - UI: 136 tests, 0.34 s.
  - Content: 22 tests, 0.07 s, including the 3 goldens.
  - Slowest files: Sessions 4.5 s (a third of unit time), RoomText 1.8 s, RoomContents 1.3 s, Passages 1.2 s, Buildings
    1.0 s.
- **E2E (Playwright, phone profile only):** 135 tests in 16 specs. 109 passed, 9 failed, 17 skipped. 154 s wall
  including the production build, 141 s in the tests.
  - Slowest specs: survival 19.2 s, fold 15.8 s, resilience 15.3 s (46 tests), scene 12.7 s, playthrough 12.6 s (one
    test).
- **Snapshots:** no `toMatchSnapshot`, `toMatchInlineSnapshot` or `toHaveScreenshot`. `toMatchFileSnapshot` at
  `web/tests/content/Goldens.test.ts:113` writes the 3 golden walks (398 lines). The 17 `screenshot()` calls in e2e are
  for human review; nothing compares them.
- **Flakiness:** none seen. Both unit runs identical; the e2e run reports 0 flaky, but retries are 0, so a flake shows as
  a failure. `git log --all -i --grep=flak` finds nothing. The only other trace is the comment at
  `web/playwright.config.ts:13` (timeouts under 3 workers in I09/I10). Anything beyond this is UNCERTAIN.
- **The e2e suite is red on this branch, by plan:** e2e is refreshed at the iteration's end (`tasks/ui/U02.md:187-188`,
  `:221-222`). All 9 failures match changes that note lists.
  - 3 wording: `playthrough.spec.ts:144` and `ritual.spec.ts:143` expect 'BEDROCK_BREACHED' (reworded in `2b889c9`);
    `richness.spec.ts:175` expects 'BAROQUE', now lower case.
  - 6 layout or selector moves: `buildings:26`, `:159`, `focus:43`, `scene:72`, `survival:130`, `:181`.
  - The survival failures are not a lost feature: the floor pad still marks "you are here" and "visited" as `.key.you` /
    `.key.seen` (`web/src/ui/screens/HudView.ts:554`). One run only, so whether the failures are deterministic is
    UNCERTAIN.
- **Leaks:** `git status --short` clean after every run; `dist/`, `test-results/`, `playwright-report/` are ignored.
- **Growth over the UI rework** (`cdff32d~1` → `e577e8f`): source +2,512 lines, tests +1,273, test declarations 484 →
  545 (+61). About 1.09 test lines per source line overall.
- **The real cost is tokens, not runtime:** `tasks/ui/U01-cost.md` measured 49 of 85 build steps and 56% of the input
  processed going to tests.

## 3. Findings
### Sample verdicts
- **High value, keep as is (11):** Sessions, Seed, Journey, Passages, ViewsCarryNoWords, Contrast, TowerPicture,
  ContentFloors, fold.spec, a11y.spec, scene.spec.
- **High value, but carrying fixed-sentence checks or over-specified objects (11):** GameEngine, Ritual, Substrate,
  Floor, Descent, StreetPicture, HudPresenter, RecapPresenter, WorldPins, buildings.spec, ritual.spec.
- **Mostly change-detectors (5):** TitlePresenter, RebootPresenter, richness.spec, focus.spec (6 of its 8 tests never run
  on a phone), and the menu and header part of the goldens.

### High-value examples
- `Sessions.test.ts:95`, `:172`: reload after every tap across six recorded sessions plus random play.
- `Seed.test.ts:39`: fixes the random-number algorithm.
- `Passages.test.ts`, "the peek": 40 buildings checked against what they build.
- `ViewsCarryNoWords.test.ts:13-14`: no view holds literal text or a literal aria-label.
- `Contrast.test.ts:88`, `:96`: text contrast; no faded text.
- `fold.spec.ts:141`: the first move is visible without scrolling at 360 × 640. It passed even after the tower change.
- `a11y.spec.ts:46-57`: every button and picture has a non-empty name.
- `scene.spec.ts:140`: a tap in the picture then a tap in the list makes exactly one step.

### Change-detector examples
- `HudPresenter.test.ts:782-799`, `TitlePresenter.test.ts:73`, `RebootPresenter.test.ts:48-63`: fixed labels and
  headlines restated. The rule they stand for is already enforced by `ViewsCarryNoWords.test.ts:13-14` and
  `Masthead.test.ts:14-19`.
- `Ritual.test.ts:73`, `:81`, `:151`: `status()` sentences asserted beside `primed()` and `breached()`, which already
  assert the same facts.
- `Floor.test.ts:162-170`: a fixed elevator sentence.
- `richness.spec.ts:42-47`: a seeded room sentence also asserted in `WorldPins.test.ts` and in the 7F3A golden. The same
  fact at three layers.
- `StreetPicture.test.ts:111-127`: a hash of the draw calls. A change-detector by design, a temporary net taken before a
  refactor; it has not been rewritten since.

### What drives test edits (measured)
- **Goldens:** 1,409 changed lines across 15 commits.
  - About 80% screen text: dock 234, stats 130, headers 54, meter 54, chips 90, status lines 62, row readings 308, row
    labels 96, and more.
  - Key letters shifting because the key-assignment rule changed: 192 (14%). That is behavior.
  - Seeded description sentences: 42 (3%).
- **Small presenter tests** (Title, Reboot, Recap, Buffer, Help): 43 edits, 20 of which only added a new field to a
  hand-built sample snapshot (TitlePresenter alone: 7 of 19). That cost comes from how the test data is built, not from
  wording.
- **Two wording-driven commits:**
  - `cdff32d` (U01a, plain words): 152 source lines and 181 CSS lines led to 96 unit-test lines, 208 e2e lines and 144
    golden lines changed, with no new tests.
  - `2b889c9` (U02 words): 76 source lines led to 109 unit-test lines in 7 files, 351 golden lines, and 3 stale e2e
    checks (now failing).
- **Root cause:** the engine returns display sentences (for example `Building.status()` returns 'The bedrock is
  breached'), so engine tests assert exact sentences: 61 such lines in `web/tests/engine`. This touches Decision 14 and
  OO principle 6. The fix is a source refactor, outside this research.

### Assertions on wording (approximate)
- Across 3,160 assertions, about 580 (18%) compare against a word literal: engine 274, UI 116, content 5, e2e 185.
- **(a) The wording is the subject:** about 177 of the 389 e2e text checks (terminal-style labels 53, other literals 76,
  multi-line 18, lists 4, loose patterns 26), plus the unit blocks listed above.
- **(b) Behavior checked through wording:**
  - 93 checks read the place-kind label ('STREET' and so on) as "where am I". The element has no key attribute
    (`HudView.ts:229`). History shows no label change so far, so the saving from changing this is UNCERTAIN.
  - 62 place-name checks are content-derived: behavior.
  - 57 checks of game numbers.
  - 144 `press(page, /name/)` calls across 30 button names, plus 37 direct role-and-name lookups. No commit has ever
    renamed one, so their upkeep has been zero. They are the only check that a given button carries a given name
    (`a11y.spec` only checks names are non-empty). Keep them.
- This count differs from claim 5 in `tasks/ui/U01-cost.md` (8 lines checking labels a later scene retires). That claim
  counted only jargon due for removal; this one counts all wording.

### Unguarded
- 17 e2e tests are skipped on the only project, phone (`test.skip(hasTouch…)`, about 348 lines).
- Among them, `focus.spec.ts:79-156` are the only tests of the focus rule in `tasks/lessons/web.md` (I03 review, finding
  1: focus never rides back to the undo) and of the Shell focus rule in `web/CLAUDE.md`. No input-router or Shell unit
  test exists, so those rules and the keyboard have been unguarded since Decision 18.
- None of these findings is in the backlog: `tasks/backlog/HOUSEKEEPING.md` holds Groovy-era items only.

## 4. Verdict: partially confirmed
- **Confirmed** for wording-heavy iterations (`cdff32d`, `2b889c9`) and for five named kinds:
  - the menu and header text in the goldens;
  - the engine's display sentences;
  - the "every word" blocks in the small presenter tests;
  - the triple-checked seeded sentences in `richness.spec`;
  - the place-kind label used as an e2e locator.
- **Refuted** for the suite as a whole:
  - most tests guard rules, save and restore, the design walls, determinism and accessibility;
  - new tests are modest (+61 declarations for +2,512 source lines);
  - the biggest churn in the small presenter tests is how their sample data is built, not wording;
  - the safety-net tests taken before refactors were not rewritten;
  - runtime is negligible.
- **Justified wording checks:** button names used as locators; names that come from seeded content; the text announced
  to screen readers (`announce.spec`); accessibility names.

## 5. Proposed testing policy
- **Must test:** engine rules; save and restore; one determinism check (same seed, same world); the design walls (first
  action on screen, contrast, 12 px text, views hold no words, accessible names, reduced motion, taps resolve to
  `button[data-option]`); player flows in e2e, found by option id, test id, or role and name.
- **Should not test:** a fixed sentence restated with no variation; the same fact at more than one layer; tests that
  cannot run under the one project; whole-object equality where the test's title names two fields.
- **Rule for wording changes:** a wording change adds no test and edits no assertion, except the goldens, rewritten once
  with `-u` and the diff read. The goldens then keep every word, menu and headers included, as the one place wording is
  reviewed. If the menu and headers were trimmed from the goldens instead, those words would have no check anywhere; the
  two cannot both be done.
- **Law lines that would change to adopt it:**
  - `web/CLAUDE.md:111`, "Pins are literals": limit to values that vary with state or seed.
  - `web/CLAUDE.md:121`, the goldens section: name them the one place wording is reviewed.
  - `tasks/UI_QUEUE.md:53`, Decision 16: tests that move on purpose shrink to the goldens and role-and-name locators.
  - `.claude/commands/grill.md` check 5: the same shrink.
  - `.claude/CODEX.md:33`, AI-TDD: a wording change is not a bug and gets no test.
  - `tasks/UI_QUEUE.md:56`, Decision 18: decide the fate of the keyboard tests.

## 6. Candidates to delete or consolidate
Ranked by measured churn. Research only; nothing changed.

1. **One shared builder in `tests/support` for the small presenter tests' sample snapshots** (Title, Reboot, Recap,
   Buffer, Help, and HudPresenter's samples).
   - Why: 20 of 43 edits only added a field.
   - Contradicts: no rule (`web/CLAUDE.md` says doubles live in `tests/support`).
   - Saving: about half the edits to those files.
2. **Keep the goldens, stop duplicating them.**
   - Drop the seeded-sentence checks at `richness.spec.ts:42-47`, `:175` and nearby.
   - Fold `WorldPins.test.ts` into the goldens, or keep WorldPins as the engine-level determinism check and drop the
     sentences from the goldens.
   - Contradicts: no rule.
   - Saving: about 18 e2e word checks and 1 of today's 9 failures.
3. **Engine sentence checks beside a state check** (`Ritual.test.ts:73`, `:81`, `:151`; `Substrate.test.ts:93`;
   `Floor.test.ts:166-167`; about 61 lines in all).
   - Why: they drove edits in 7 test files in `2b889c9`.
   - Contradicts: `web/CLAUDE.md:111`.
   - Lasting fix: the engine hands over a key, not a sentence (Decision 14). That is a source change.
4. **"Every word" blocks** (`HudPresenter.test.ts:782-799`, `TitlePresenter.test.ts:73-89`,
   `RebootPresenter.test.ts:48-63`).
   - Replace with "every region name is non-empty".
   - Contradicts: `web/CLAUDE.md:111`.
   - Covered by: `ViewsCarryNoWords.test.ts:13-14`, `Masthead.test.ts:14-19`.
5. **The 17 phone-skipped e2e tests** (about 348 lines; `focus.spec` last edited in `cdff32d`).
   - Delete the keyboard-only ones only together with a decision under Decision 18.
   - First move the focus rule's check to a phone test or a Shell unit test; under the CODEX it is UNGUARDED.
   - Saving: upkeep UNCERTAIN; no runtime cost.
6. **Place-kind label as a locator** (93 lines): check a key attribute instead of the label text. Needs a one-line source
   change at `HudView.ts:229`. Saving UNCERTAIN: the label has never changed.
7. **Whole-object equality in `GameEngine.test.ts`** (for example `:158-225`): partial matching on the named fields.
   Only 1 of 29 edits was field-only, so the saving is small.
8. **`StreetPicture.test.ts:111-127`**: delete once the U02 design fixes (hash, roofs) land. Temporary by design.
