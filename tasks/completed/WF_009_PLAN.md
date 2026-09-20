# Workflow Plan: WF-009 — The shape of new code is a gate, not a review
**Created:** 2026-09-20 | **Grill:** AMEND (2 items: rule exempts `private` statics, count 76 → 75; backlog count at close-out) → applied → CLEARED | **Branch (proposed):** `workflow/wf-009-shape-gate` (from `master` @ d24d262)
**Backlog:** WF-009 (`docs/analysis/WORKFLOW_BACKLOG.md`, OPEN, Medium) | **Baseline:** 282 / 282 / 0 / 0, LINT PASS 220, DOCS PASS (HK-020 close-out)
**Status:** EXECUTED 2026-09-20 (Directive: "yes") — `219fe4f` plan, `18321cb` c1 law (paper test 3/3 FAIL), `3547535` c2 lint (probes i–iv below; LINT PASS 220, 282/282), close-out on the same branch. **Deviations:** regex gained `(?m)` (first probe silent); the baseline-masking premise was wrong (one-for-one), allow-list kept for its reasons; HK-022 logged for `NameGenerator`. **User decisions (2026-09-20):** options 1 + 2 (plan declares shape, grill interrogates it, one lint rule); option 3 (post-implementation review pass) not taken. **D2 (user question "should the law not be more generic?"):** yes — the law states the *principles* (eight, one line each, pointer to the wave that taught it), the grill asks only the questions that have a verifiable form; incidents are where principles were noticed, not the law itself.

> **No source change.** Law (`.claude/CODEX.md`, `.claude/commands/grill.md`) and tooling (`config/lint/vinc-ruleset.groovy`) only.
> The lint rule ships green: an allow-list carries today's debt, so `--lint` stays `PASS` on `master` and every commit reverts alone.

---

## What happens today (ELI5)

The gates check that new code *works* (suite), *is not too long* (lint), *does not defeat a State or Observer with
`instanceof`* (lint + grill), and *is documented* (docs). None of them asks whether the new thing is the right *kind* of
thing. So a fix can be written as a static function with a bag of arguments, or can copy a fact that already lives
somewhere else, and pass every gate. HK-015 did both (`LaunchArgs.seedFrom(args)`; the `q` alias added to `normalize`'s
private list next to `TurnProcessor`'s table). The user caught them after the merge. The question is asked today by the
most expensive reviewer, at the most expensive moment.

**The fix in one sentence:** the CODEX states the eight OO principles this codebase already lives by (today they are
scattered across four `CLAUDE.md`s and the lessons, never in one place), the plan's Shape table is the evidence for the six
that can be checked, the grill checks them before any code exists, and lint catches the one shape a regex can see — a new
static method with a body. A generic "follow SOLID" line would gate nothing: a claim without evidence is answered from
memory (WF-002), so every principle either has a question with evidence or is stated as guidance only.

## Evidence read this session

- `.claude/commands/grill.md:28` "RUN THE SIX CHECKS"; `:38` check 5 = deviations + `instanceof`/`.class`/`getClass()`
  on a new hierarchy; `:65` "Keep the checks at six". No check reads the *kind* of a new type.
- `.claude/CODEX.md:86` Coverage Claim Protocol — the model for a claim the grill can verify: a claim form, an evidence
  requirement, a named failure state (UNGUARDED).
- `config/lint/vinc-ruleset.groovy:32-49`: six invariant rules, each "verified to fire on a bad probe and stay silent on
  master"; `IllegalRegex` with `applyToFilesMatching` / `applyToFileNames`; one description per rule.
- `config/lint/baseline.xml`: 15 lines, 8 `MethodSize` entries, keyed by file + rule + **message**. An `IllegalRegex`
  violation carries the rule's fixed description as its message, so a baselined file would carry one entry per hit with
  identical text — whether a *new* hit in that file is masked depends on how CodeNarc's baseline matches (one-for-one or
  by key). **Unverified → the plan does not baseline the new rule; it allow-lists files instead** (`doNotApplyToFileNames`),
  and step 2 probes the baseline behavior anyway so the retro can record it.
- Non-private static methods in `src/main` today (the rule's scope): **75 in 15 files** — `ui/Terminal` 41, `procgen/NameGenerator` 11,
  `ui/ScreenshotRegistry` 3, `procgen/SeedVault` 3, `core/Logger` 3, `ui/VisualAssertionEngine` 2, `ui/CaptureService` 2,
  `procgen/WorldGenesis` 2, `core/SyncManager` 2, `core/ReplayService` 2, `ui/TUIValidator` 1, `ui/SessionRecap` 1,
  `ui/FrameEntropy` 1, `procgen/SeedScanner` 1, `procgen/Gematria` 1 (grep `^\s*(public\s+)?static\s+(?!final\b)[\w<>\[\], ?]+\s+\w+\s*\(`,
  `static void main` excluded). `Main.groovy` has only `main`. **Grill finding:** with `private` included the same grep hits 90 in 18 files
  (`SyncManager` ×4 helpers, `ProceduralFactory.register`, `ThemeService.buildObjectDeck`, `BridgeView.emit`, …) — a private static helper
  lives inside its owner, so the rule exempts it; the Shape table still lists a *new* one.
- `tasks/completed/HK_015_PLAN.md` — the record the new check is paper-tested against (step 1): its plan text proposed
  `LaunchArgs.seedFrom(args)` and "`q` → `quit` in `normalize`".
- `tasks/lessons/core.md` "A new helper is a value object before it is a static function" and
  `tasks/lessons/infrastructure.md` "Vinculum invariants are lint rules, not tribal greps" — the two lessons this wave codifies.

## Coverage (Coverage Claim Protocol)

| Behavior | Guard |
| :--- | :--- |
| Each invariant lint rule fires on a bad probe, silent on master | ruleset comment `:32` (procedure, not a test) — repeated for the new rule in step 2, output quoted in the record |
| `--lint` green on master with the new rule | `./vinc.sh --lint --agent` → `LINT=PASS`, run in step 2 |
| The grill's new questions would have failed the plans that let the smells through | **paper test**, step 1: check 5 against `HK_015_PLAN.md` (principles 2 and 1) and `HK_018_PLAN.md`'s original name-bound Keystone (principle 6); record the three FAIL lines |

## The change

### Step 1 — law: `.claude/CODEX.md` + `.claude/commands/grill.md` (2 files, one commit)
- **CODEX § 4, after the Coverage Claim Protocol — "OO Principles (the Shape Gate)"**, ≤ 12 lines, each principle one line
  with its pointer; the first six carry a **check** (asked by `/grill` check 5), the last two are guidance:

  | # | Principle | Pointer | Check (evidence) |
  | :-- | :-- | :-- | :-- |
  | 1 | **One owner per fact** — a rule, a list, a table lives in exactly one place | HK-020 | grep the fact's literal across `src/main`; a second owner is a FAIL unless removed in the same wave |
  | 2 | **Behavior lives with its data** — no static logic, no anemic type | HK-015 lesson, model "No Anemic Models" | every `static` with a body carries its reason (entry point, pure formatting, seed derivation); a static holding a rule or state is a FAIL |
  | 3 | **Ask the object** — polymorphism over type checks | Phase 8/9/10, WF-004 | the existing `instanceof` / `.class ==` / `getClass()` grep on new hierarchies and their listeners |
  | 4 | **Dependencies are injected, never located** | HK-008 | no static instance, no `new <Service>` outside its owner; the Shape table's `owner` column names who builds and who holds |
  | 5 | **A new kind is a registry entry, not a new branch** | Phase 9, HK-005 | where a registry or a state exists for the thing, the plan adds an entry — a new `if`/`switch` on kind is a FAIL |
  | 6 | **Domain values are objects with identity by stable key** — not primitives, not display strings | Phase 3, HK-018 | a new `int`/`String` field carrying a domain concept names why it is not a value object; a lookup by name is a FAIL |
  | 7 | State changes through domain-meaningful methods; immutable where nothing needs to change | model "Behavior-Driven Mutation" | guidance — no gate |
  | 8 | One class, one job; one method, one job | HK-013 (`MethodSize` is the proxy) | guidance — lint's length ratchet is the only proxy |

  **Shape Claim Protocol** (three lines under the table): every plan that adds a class, a method on a new class, or a
  static carries a **Shape table** — one row per new thing: `what | kind | owner | the one fact it owns | statics + why`
  (`kind` ∈ value object / entity / service / listener / command / factory). The table is the evidence for checks 1, 2, 4
  and 6; a missing row is a grill FAIL. A change that extends something the backlog or a lesson already names as a smell
  says so and logs the item (HK-015's `q` alias is the example).
- **`grill.md` check 5** becomes "Deviations + pattern integrity + **shape**": each difference from the plan document with
  its reason (unchanged), then the six checks of the CODEX table, each with its evidence quoted (grep output, the Shape
  table row, the registry entry). Verdict names stay PASS / UNDECLARED. Six checks, unchanged count; the Architect's note
  gains one sentence: *shape is checked here because it is cheapest here — a wrong answer costs a plan line, not a commit.*
  The check refers to the CODEX table rather than restating it (one owner — principle 1 applied to the law itself).
- **Paper test, recorded in this plan's execution notes:** apply the new check 5 to `HK_015_PLAN.md` as written —
  expected: principle 2 FAIL on `LaunchArgs.seedFrom(args)` (static holding a parse rule), principle 1 FAIL on `q` in
  `normalize` (second owner: `TurnProcessor.initializeGlobalCommands`); and to `HK_018_PLAN.md`'s *original* diagnosis,
  principle 6 FAIL on the name-bound Keystone. If any passes, the wording is wrong — fix before committing.
- **Diet check:** the CODEX grows by ≈ 12 lines (table + protocol). The four domain `CLAUDE.md`s keep their invariants
  (they are the *where*; the CODEX table is the *why*) — no line is duplicated; each domain line that states a principle
  gains a `(§ 4 principle n)` pointer only if it costs no new sentence.

### Step 2 — tooling: `config/lint/vinc-ruleset.groovy` (1 file, one commit)
- Rule **`NoNewStaticLogic`** (`IllegalRegex`): regex `^\s*(public\s+|protected\s+)?static\s+(?!final\b)[\w<>\[\], ?]+\s+\w+\s*\(`
  (no `private` alternative — Groovy's default modifier is public, `protected` stays in scope),
  `applyToFilesMatching = '.*/main/.*'`, `doNotApplyToFileNames` = the 15 files above + `Main.groovy`, description
  "WF-009: a static method holds a rule nobody owns — build a value object or a service; entry points, pure formatting and
  seed derivations are the allow-list in this rule". Comment above the rule lists the allow-list *with the reason per file*
  (Terminal: box formatting; NameGenerator: seed-pure generators — **candidate HK item**, the one real smell on the list;
  Logger: process-wide sink; SyncManager/WorldGenesis/ReplayService/SeedVault/SeedScanner: procgen entry points that take
  the factory as a parameter since HK-008; ScreenshotRegistry/CaptureService/VisualAssertionEngine/TUIValidator/SessionRecap:
  diagnostic tooling; FrameEntropy: the one blessed `Random` derivation; Gematria: pure function on a string).
- **Ratchet:** the allow-list only shrinks; removing a file from it is the commit that de-staticises the file. Never
  baseline this rule (see evidence on message-keyed entries).
- **Probes, output quoted in the record:** (i) scratch file under `src/main/.../core/` with one `static int parse(String)` →
  rule fires; (ii) the same scratch file with `static final int LIMIT = 3` and `@CompileStatic` → silent; (iii) `master`
  → `LINT=PASS`; (iv) baseline behavior: copy the scratch file to a baselined name, `--lint --baseline` on a *scratch copy
  of the config* (never the real baseline), add a second static, run — record whether the second hit is masked. Scratch
  files deleted before the commit; `git status --short` clean.
- `tasks/lessons/infrastructure.md`: no new lesson (the "invariants are lint rules" one already exists); the ruleset comment
  is the pointer.

### Step 3 — close-out
`/close-wave`: **Light** floor (no `src/`) + **Chronicle** add-on (law and tooling changed). Backlog WF-009 → CLOSED, plan
→ `tasks/completed/`, recovery prompt (lint files count unchanged; rule count 6 → 7 if the prompt states it — check).

## Execution record

**c1 (law) — paper test of the new check 5, run against the old plans as written:**
- `HK_015_PLAN.md:63` — *"`static Long seedFrom(String[] args)` is a pure function — no state, not a singleton"*. Principle 2: a
  non-private static whose body encodes what `--seed` means is a static holding a rule; "pure function" is not a listed reason →
  **FAIL** (the old lint, `:125`, cleared it; the user's review, c5b, was the only catch).
- `HK_015_PLAN.md:32` — the fix adds `q` to `normalize`'s list of `i, sync, map, m, lattice, glitch, help, quit`. Principle 1: grep the
  literal `"quit"` across `src/main` → `TurnProcessor.initializeGlobalCommands` holds the same keys → second owner not removed in the
  wave → **FAIL** (became HK-020).
- `HK_018_PLAN.md:35,37` — *`it.name.contains(bldg.name)`*, Keystone named `"${bldg.name} Keystone"`. Principle 6: a domain identity
  carried by a display string, lookup by name → **FAIL** (the plan's own c3 fixed it by LIP; the check would have asked at step 0).
- Diet: `.claude/CODEX.md` +19 lines (table 11 + protocol 5 + heading 3); `grill.md` +2 lines, check count still six.

**c2 (tooling) — probes, output quoted:**
- First run of the bad probe: **silent.** `IllegalRegex` matches the whole file, so a bare `^` only matched line 1 — the regex gained
  `(?m)`. (The plan's regex was verified by `grep -P`, which is line-based; the rule engine is not. Retro item.)
- (i) scratch `ScratchProbe` with `static int parse(`, `protected static int parseToo(`, `private static int helper(`, `static final int LIMIT`:
  `Rule=NoNewStaticLogic P=3 Line=6 … Src=[static int parse(]` and `Line=7 … Src=[protected static int parseToo(]` — the private helper
  and the constant are silent.
- (ii) the same file without the public statics: the only violation is the house rule `UnusedPrivateMethod` — the new rule is silent.
- (iii) `master` tree: `LINT=PASS FILES=220 P1=0 P2=0 P3=0`; `config/lint/baseline.xml` untouched; `-maxPriority3Violations=0` so the
  P3 rule is a gate like the other invariants.
- (iv) baseline behavior, scratch config only: one static baselined, a second added → `NoNewStaticLogic … Line=8` still reported.
  **Baseline entries match one-for-one; the masking worry in the evidence section was unfounded.** The allow-list stays the mechanism
  because it carries a reason per file; the ruleset comment says so.
- Suite after c2: 282 / 282 (no `src/` change; run once as the plan's gate).

## Gates
`./vinc.sh --lint --agent` after step 2 → `LINT=PASS`, `config/lint/baseline.xml` untouched (`git diff` empty); suite
unchanged (no `src/` change, run once at close-out); `--docs` at close-out. Per-commit reversion: step 1 and step 2 revert alone.

## Edges (declared)
- **E1** A regex sees text, not semantics: `static` methods in *test* sources are out of scope (`applyToFilesMatching` main
  only), and a static hidden behind a line-wrapped modifier list would slip — accepted; the grill's check 5 is the semantic half.
- **E2** Groovy `def` statics (`static def foo(`) match (`def` is a word). Closures assigned to static fields
  (`static Closure f = {`) do not — they have no `(` after the name; rare here, accepted.
- **E3** The allow-list names files, not methods: a *new* static in `Terminal` passes lint. The Shape table (step 1) is
  the guard there; `Terminal` is the file where a new static is most likely legitimate.
- **E4** Dogfood: the first plan grilled under the new check 5 is the next wave (HK-021 or HK-013); its grill report
  quotes the Shape table. If the table costs more than a few lines for a one-class change, WF-009's retro says so.
- **E7** `private static` helpers are exempt from the lint rule — they live inside their owner and are not a rule anyone
  else can reach; principle 2 is about the exposed shape. A *new* private static still appears in the Shape table (grill).
- **E8** Close-out corrects the backlog entry's "76 static methods" to "75 non-private".
- **E6** Principles 7 and 8 are stated without a gate on purpose: their only verifiable forms today (length, a mutation
  through a setter) are proxies. A gate on a proxy is what WF-006 is about; they wait for that review.
- **E5** `NameGenerator`'s 12 statics are a real smell the allow-list *records*, not blesses — logged as a candidate HK item
  in the close-out (one `NameGenerator` per `ProceduralFactory`, reached through `registry`, the same move as HK-008).
