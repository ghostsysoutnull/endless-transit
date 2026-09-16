# Plan: O2 — `./vinc.sh --lint`: CodeNarc static analysis as a Vinculum mode
**Created:** 2026-09-16 | **Grill:** AMEND (check 1 — c10 evidence was compile-only; check 5 — naming rules from the O2 goal line undeclared) → applied → CLEARED | **Branch:** `refactor/o2-lint` (from `master` @ d1a1c78)
**Source:** `docs/analysis/OOA_REFACTOR_PLAN.md` § Optional Phase O2 | **Baseline (verified this session):** 213 / 213 / 0 / 0 (3688 ms); tree clean
**Status:** COMPLETE (2026-09-16) | **Commits:** 44b56b1 (c1), 1613f8e (c2), 8e0ae21 / 12faf07 / 9a9227d (c3–c5), 6292bdc / 9650d45 (c6–c7), d39931f (c8), 2f1423c + ae0c973 (c9, c9b), 5941966 (c10), 16a7abe (c11), c12 = the docs commit carrying this line | **Gates at close:** suite 213/213/0/0, 36 goldens unchanged, `--scan` seed 0 → 9, `LINT=PASS FILES=206 P1=0 P2=0 P3=0`

> **Execution notes.** (1) c2 baselined **100** entries, not ≈98: the prototype had exempted `ConsoleSink` by file name, the shipped
> ruleset does not (c11 annotates it instead). (2) The import script deleted the same line twice when one import was flagged by both
> `UnusedImport` and `UnnecessaryGroovyImport` (`Apartment.groovy`'s `java.util.Random`); the assertion fired before any write, the
> script was deduped, c4 re-ran clean. (3) Two `UnnecessaryGroovyImport` hits in the test tree (`TracePersistenceTest`,
> `CaptureVerificationTest`) were missing from the c9 list, which had been built from `UnusedImport` per-file counts only — landed
> as **c9b**, test-only. (4) c10 shipped as the single annotation, no STOP. (5) Negative check at c2 recorded in the commit message:
> a scratch `LintProbe.groovy` with `println` + `static X instance =` → `LINT=FAIL` exit 1 naming `Println` and `NoStaticInstance`;
> removed → `LINT=PASS` exit 0. (6) Every fix commit's baseline diff was removals only (checked by the commit script, which aborts
> on any `+<Violation`). Final baseline: the nine `MethodSize` rows → HK-013.

> **Zero behavior change.** Same seed → same world; 36 goldens byte-identical; `--scan` seed 0 → 9 nodes. Every production edit
> in this plan is an import deletion, an unused local deletion, an annotation, or lint infrastructure. The one edit with any
> reach — `@CompileStatic` on `Player` — is its own commit with a STOP rule.

---

## Premise correction (why this is not the O2 in the OOA plan)

The OOA plan's O2 says "add the `codenarc` plugin to `build.gradle`" and "verify `./vinc.sh --compile` still passes with
CodeNarc enabled". Both premises are wrong for this runner: `vinc.sh` never invokes Gradle (five `groovy -cp …` invocations,
no `gradlew` in the tree), so a Gradle plugin would never run on the path the agent and the gates use. Retro
`RETRO_SESSION_20260916.md:25` already flagged this. O2 is therefore re-planned as a **`vinc.sh` mode on the runner's own
classpath convention** (`lib/`), and `--compile` stays a pure type-check.

## What changes (ELI5)

Today the only automatic checks are "does it compile" and "do the tests pass". This adds a third: "does the code obey the
house rules" — no stray `println`, no unused imports, no class without `@CompileStatic`, no method that has quietly grown past
50 lines, and the project's own hard-won invariants (no static singletons, no `instanceof` on a state/factory/event, the model
never touches the journal or the UI). One command, six seconds, one line of output. Existing debt that is real refactoring work
(nine long methods) is recorded in a baseline file so the gate is green from its first commit and only *new* debt fails it.

## Evidence read this session

**Tooling.** CodeNarc **4.0.0** (Maven Central, 2026-07-18) is built against **Groovy 5.0.3**; the machine runs Groovy 5.0.4 on
JVM 25. Runtime deps: `GMetrics 3.0.0`, `slf4j-api 1.7.x` (+ `slf4j-nop` to silence the no-binding warning). Groovy modules
come from the `groovy` launcher, as in every other mode. Jars: CodeNarc 2.53 MB, GMetrics 0.46 MB, slf4j 0.05 MB — 3.0 MB total.
A prototype in the scratchpad ran the whole `src/` tree (206 files) in **5.8 s** wall.

**Rule names differ from the OOA plan.** `NoSystemExit` does not exist; the rule is `SystemExit` (`rulesets/security.xml`).
Verified locations: `SystemErrPrint`/`SystemOutPrint`/`Println` (logging), `UnusedImport`/`UnnecessaryGroovyImport`/
`DuplicateImport` (imports), `MethodSize`/`ClassSize` (size, needs GMetrics), `CompileStatic` (convention),
`UnusedVariable`/`UnusedPrivateField`/`UnusedPrivateMethod` (unused), `IllegalRegex`/`IllegalClassReference`/
`IllegalPackageReference` (generic).

**CLI behaviors verified empirically (scratchpad probes):**
- `-maxPriority{1,2,3}Violations=0` → exit code 1 on any violation; 0 when clean.
- `@SuppressWarnings('SystemExit')` on a method suppresses exactly that rule (sibling violation in the same class still reported).
- `doNotApplyToFileNames = 'Main.groovy'` works; `doNotApplyToFilesMatching` must match the **whole** path (`'.*/test/.*'`, not `'test/.*'`).
- Baseline: `-report=baseline:<file>` writes entries keyed by **file + rule + message, no line numbers**; a second run with
  `-excludeBaseline=file:<file>` reports 0 violations and exits 0. Because `MethodSize`'s message embeds the length ("is 75 lines"),
  a baselined method that changes length resurfaces — the baseline is a ratchet, not a permanent exemption.
- The six project-invariant rules below report **0** on the real tree and each fires on a deliberate bad file (7 hits across 6 rules).

**Violation baseline on `master` @ d1a1c78** (candidate ruleset, exemptions below applied):

| Rule | `src/main` | `src/test` | Disposition |
| :--- | ---: | ---: | :--- |
| `UnusedImport` | 53 (22 files) | 16 (9 files) | fix — 7 sampled hits all have 0 non-import references; the compile proves the rest |
| `UnnecessaryGroovyImport` | 10 | 4 | fix (explicit `java.util.Random` / `java.io.File` / `java.util.Scanner` imports) |
| `MethodSize` (> 50) | 9 | exempt | **baseline** — refactoring work, not lint work; listed below |
| `UnusedVariable` | 1 (`TelemetryComponent:92`) | 3 | fix (see edges) |
| `CompileStatic` | 1 (`Player.groovy:9`) | exempt | fix, own commit (scratch copy with the annotation: `groovyc` main + test exit 0, **full suite 213/213/0/0, `--scan` seed 0 → 9**) |
| `SystemExit` | 1 (`Game.groovy:113`) | 0 after exemption | `@SuppressWarnings` + comment (WF-005 documented exit) |
| `SystemOutPrint` | 2 (`ConsoleSink`) | 0 after exemption | `@SuppressWarnings` on the class (the one physical sink) |
| `ClassSize` (> 500), `DuplicateImport`, `UnusedPrivate*`, 6 invariants | 0 | 0 | — |

The nine `MethodSize` hits: `ScanCommand.renderCorridorScan` (75) / `renderApartmentScan` (52), `SyncManager.restore` (64),
`Room.getOptions` (103), `Building.getExtraContent` (84), `SessionRecap.show` (56), `LatticeMapComponent.render` (52),
`LatticeTraceComponent.renderTrace` (63), `HUDHeaderComponent.render` (90).

**Exemptions and why:** `Main.groovy` is a script (no class to annotate; its `System.exit` is the boot-failure path) →
`CompileStatic` and `SystemExit` do not apply by file name. `TestRunner.groovy` *is* the runner (prints the summary, exits with
the status; WF-005) and `GoldenFrameGenerator.groovy` is the golden writer (`System.err` progress) → print/exit rules do not
apply by file name. The test tree is dynamic by design (64 of 67 classes have no `@CompileStatic`; test methods are narrative) →
`CompileStatic`, `MethodSize`, `ClassSize` do not apply under `src/test`.

**Invariant greps this session (`*.groovy` only):** `static … instance =` in `src/main` → 0; `instanceof …(State|Factory)` in
`src/` → 0; `JournalManager` in `model/` → 0; `import com.endlesstransit.ui` in `model/` → 0 (`OutputFormatter` lives in
`model/`); `instanceof <event>` → 0; `new Random()` in `ui/*Component.groovy` → 0 (three non-component sites exist:
`Terminal.groovy:169`, `GlitchedTerminalAdapter.groovy:15`, `SessionRecap.groovy:62` — outside the HK-001 invariant, untouched).

## Coverage audit (Coverage Claim Protocol)

| Behavior at risk | Guard (assertion lines read this session) | Verdict |
| :--- | :--- | :--- |
| Universe-map frame unchanged after deleting the unused `Random r` (`TelemetryComponent:92`; `LocusSeed.nextRandom()` is pure — `LocusSeed` is `@Immutable`, Phase 9 note) | golden frames via `BridgeViewGoldenFrameTest` / `ViewComponentGoldenTest` (36 frames, byte-compared) — the universe/filament map frames are among them | PASS |
| `Player` behavior identical under `@CompileStatic` | `GameMementoTest:58-60` (seed, LIP, coherence restored), `TracePersistenceTest:91-105` (seed, LIP, name, vibe, inventory item, breach, `infusionCount`, visited), `JournalEventContractTest` / `DiscoveryEventContractTest` (4 pins each), 36 goldens, `--scan`. **Already exercised:** a scratch copy of the tree with the annotation passed the full suite (213/213/0/0) and `--scan` (seed 0 → 9) this session. Every method `Player` calls is single-arity (`Logger.info(String)`, `Terminal.println(String)`, `colorize(String,String)`, `bold(String)`, `synthesize(…)`, `publish(DomainEvent)`, `List.remove(int)` with an `int` argument), so static overload resolution cannot pick a different target than dynamic dispatch did | PASS |
| Import deletions change nothing | `./vinc.sh --compile` (a deleted *used* import is a compile error under `@CompileStatic`; dynamic classes: full suite) | PASS |
| Removing `new Game()` from `NavArrayTest:18` | `NavArrayTest` itself (4 label assertions) — if the construction was load-bearing the test fails | PASS |
| (new) `--lint` exits non-zero on a new violation and zero when clean | new behavior; **negative check at c2**: a scratch bad file (recorded in execution notes), not committed | pinned by hand at c2 |
| (new) The six invariant rules fire | verified in the scratchpad this session (table above); re-run at c2 | pinned by hand at c2 |

No production behavior is UNGUARDED by this plan; no step-0 test is needed. The lint mode itself has no automated self-test
(declared deviation 6).

## Design

**Mode.** `./vinc.sh --lint [--agent] [--baseline]`
- Classpath: `lib/lint/*` (four jars, committed like `lib/junit-jupiter-params-5.13.4.jar`; `lib/*` in the other modes matches
  only top-level jars, so the lint jars never reach the game or test classpath).
- Invocation: `groovy -cp lib/lint/* -e 'org.codenarc.CodeNarc.main(args)' -- -basedir=src -includes='**/*.groovy'
  -rulesetfiles=file:config/lint/vinc-ruleset.groovy -excludeBaseline=file:config/lint/baseline.xml -report=text:stdout
  -maxPriority1Violations=0 -maxPriority2Violations=0 -maxPriority3Violations=0`.
- Output: default mode prints CodeNarc's text report (only files with violations are listed). `--agent` prints one line,
  `LINT=PASS|FAIL FILES=<n> P1=<n> P2=<n> P3=<n> DURATION=<ms>`, parsed from the `Summary:` line; exit code follows CodeNarc.
- `--baseline`: the **only writer** of `config/lint/baseline.xml` (`-report=baseline:…`, no `-excludeBaseline`). Same discipline as
  `--goldens`: regenerate only when debt is intentionally accepted or paid down, review `git diff` on the file, commit it with
  the change. A diff that *adds* entries is a regression being laundered.
- No compile step: CodeNarc parses sources; none of the chosen rules needs compiled classes.

**Ruleset** `config/lint/vinc-ruleset.groovy` (Groovy DSL, not XML — per-rule config and comments in one file):

```groovy
ruleset {
    description 'Vinculum lint — house rules + project invariants (O2)'
    // leakage
    SystemExit     { doNotApplyToFileNames = 'Main.groovy,TestRunner.groovy' }
    SystemErrPrint { doNotApplyToFileNames = 'GoldenFrameGenerator.groovy,TestRunner.groovy' }
    SystemOutPrint { doNotApplyToFileNames = 'TestRunner.groovy' }
    Println        { doNotApplyToFileNames = 'TestRunner.groovy' }
    // imports
    UnusedImport
    UnnecessaryGroovyImport
    DuplicateImport
    // size (GMetrics)
    MethodSize { maxLines = 50;  doNotApplyToFilesMatching = '.*/test/.*' }
    ClassSize  { maxLines = 500; doNotApplyToFilesMatching = '.*/test/.*' }
    // convention
    CompileStatic { doNotApplyToFilesMatching = '.*/test/.*'; doNotApplyToFileNames = 'Main.groovy' }
    // dead code
    UnusedPrivateField
    UnusedPrivateMethod
    UnusedVariable
    // Vinculum invariants (each verified to fire on a bad probe and stay silent on master)
    IllegalRegex { name = 'NoStaticInstance';             regex = /static\s+(final\s+)?\w+\s+instance\s*=/; applyToFilesMatching = '.*/main/.*' }   // HK-008
    IllegalRegex { name = 'NoInstanceofOnStateOrFactory'; regex = /instanceof\s+\w*(State|Factory)\b/ }                                          // Phase 8/9, WF-004
    IllegalRegex { name = 'NoInstanceofOnDomainEvent';    regex = /instanceof\s+(ItemCaptured|SynthesisPerformed|LocationDiscovered|DomainEvent)\b/ } // Phase 10
    IllegalRegex { name = 'NoRandomInViewComponent';      regex = /new\s+Random\s*\(\s*\)/; applyToFileNames = '*Component.groovy' }             // HK-001
    IllegalClassReference   { name = 'ModelNeverTouchesJournal'; classNames = 'com.endlesstransit.core.JournalManager'; applyToFilesMatching = '.*/main/.*/model/.*' } // model inv. 7
    IllegalPackageReference { name = 'ModelNeverImportsUi';      packageNames = 'com.endlesstransit.ui';                applyToFilesMatching = '.*/main/.*/model/.*' } // model decoupling
}
```
(`ConsoleSink` and `Game` are handled by `@SuppressWarnings` in source — c11 — not by file-name exemption: the exemption
should be visible where the exit/print is.)

## Steps

### Step 0 — branch + baseline
- `git checkout -b refactor/o2-lint` from `master` @ d1a1c78.
- `./vinc.sh --test --agent 2>/dev/null` → `213/213/0/0`; `./vinc.sh --scan` → seed 0 → 9 nodes. Record.

### c1 — plan document (docs only)
- This file, status IN PROGRESS, grill verdict filled in.

### c2 — lint infrastructure, green from the first run (infra only; no production source)
- `lib/lint/{CodeNarc-4.0.0,GMetrics-3.0.0,slf4j-api-1.7.36,slf4j-nop-1.7.36}.jar` — downloaded from Maven Central, SHA-256
  recorded in the commit message.
- `config/lint/vinc-ruleset.groovy` as above.
- `vinc.sh`: `--lint` case (`--agent`, `--baseline`), `--help` lines.
- `config/lint/baseline.xml` generated by `./vinc.sh --lint --baseline` — expected ≈ 98 entries (the table above minus
  exemptions), every one of which c3–c11 pay down except the nine `MethodSize` rows.
- **Negative check (execution note, not committed):** drop a scratch file with a `println` and a `static X instance =` into
  `src/main/groovy/…`, run `--lint`, confirm `LINT=FAIL` and exit 1 naming both rules; delete it; confirm `LINT=PASS` exit 0.
- Full suite + scan (classpath of the other modes untouched — `git diff vinc.sh` shows only the new case); commit.

### c3–c5 — unused / unnecessary imports, `model/` (14 files → 5 + 5 + 4)
- c3: `Planet`, `GalacticSector`, `Country`, `CosmicFilament`, `City`.
- c4: `Apartment`, `Universe`, `SolarSystem`, `NullSector`, `Corridor`.
- c5: `Building`, `Container`, `Street`, `Room`.
- Each: delete only the lines CodeNarc named; `./vinc.sh --compile`; `./vinc.sh --lint --baseline` (diff must be removals only);
  full suite; commit.

### c6–c7 — imports, `core/` + `procgen/` + `Main` (5 + 5)
- c6: `SyncManager`, `PersistenceService`, `NavigationEngine`, `InputHandler`, `Game`.
- c7: `RealTerminalSource`, `ReplayService`, `SeedScanner`, `ThemeService`, `Main.groovy`.
- Same loop as c3.

### c8 — imports + unused local, `ui/` (4)
- `ScreenBuffer`, `CaptureService`, `GlitchedTerminalAdapter` (imports); `TelemetryComponent:92` delete `Random r = masterLocus.nextRandom()`.
- Gate of record for the last one: 36 goldens byte-identical (universe-map frames included).

### c9 — test tree (test only, free under the cap)
- 9 files' unused imports; `GameMementoTest:26` `startCoherence`, `TestRunner:179` `total`, `NavArrayTest:18` `game` deleted.
- Full suite; `git status --short` clean after the run (HK-012 discipline — `NavArrayTest` no longer constructs a `Game`,
  which can only *reduce* side effects).

### c10 — `Player` is `@CompileStatic` (1 production file)
- Add the annotation (a scratch copy with it already passes the full suite and the scan — coverage table); drop the now-redundant `import com.endlesstransit.ui.Terminal`
  duplicate of the `ui.*` wildcard only if CodeNarc flags it (it did not on master).
- **STOP rule:** if the full suite, the goldens or `--scan` move, or any edit beyond the annotation is needed, revert this commit,
  keep `CompileStatic` baselined for `Player`, and log **HK-013** ("`Player` under `@CompileStatic`") — the deviation goes into
  the retro. Static-compiling a core aggregate is not import hygiene.

### c11 — declared exits and sinks (2 production files)
- `Game.groovy`: `@SuppressWarnings('SystemExit')` on the loop method with a one-line comment citing WF-005.
- `ConsoleSink.groovy`: `@SuppressWarnings('SystemOutPrint')` on the class — "the one physical sink; everything else goes through `RenderSink`".
- `./vinc.sh --lint --baseline` → the file now holds exactly the nine `MethodSize` rows. Full suite; commit.

### c12 — docs, lessons, close-out (docs only)
- `CLAUDE.md` tooling table: `Lint (Static)` → `./vinc.sh --lint --agent 2>/dev/null` — mandatory before merge, recommended after
  every commit; `./vinc.sh --lint --baseline` — only to accept/pay down debt, review the diff.
- `.claude/CODEX.md` § 1.5 (merge gates) and § 4 Verification Protocol: `--lint` joins `--test` / `--scan`.
- `docs/analysis/OOA_REFACTOR_PLAN.md`: O2 section rewritten (no Gradle; `vinc.sh` mode; rule names; baseline), Progress table
  `[x]`, Verification Gates table gains a `Lint` row, Refactor Guard gains "`--lint` green before merge".
- `tasks/backlog/HOUSEKEEPING.md`: **HK-013** — nine methods over 50 lines held in `config/lint/baseline.xml` (list above);
  plus HK-014 if c10 stopped.
- `tasks/lessons/infrastructure.md`: (a) a lint gate ships green on its first commit — baseline the debt, ratchet it down;
  (b) the baseline file has one writer and is reviewed like a golden; (c) rule names must be verified against the jar, not a plan.
- `tasks/todo.md`, `tasks/RECOVERY_PROMPT.md`. Then `/chronicle`, `docs/retro/RETRO_O2.md`, merge `--no-ff`, push — each on explicit go-ahead.

## Files
**Infrastructure (c2):** `vinc.sh`, `config/lint/vinc-ruleset.groovy` (new), `config/lint/baseline.xml` (new, generated), `lib/lint/*.jar` (4, new).
**Production (c3–c11), 29 files, every commit ≤ 5:** the 27 import/unused-local files listed in c3–c8, `Player.groovy` (c10), `Game.groovy` + `ConsoleSink.groovy` (c11). `Game.groovy` appears in c6 (import) and c11 (annotation) — two commits, two concerns.
**Test blast radius (c9):** `FloorCrashTest`, `StartupTest`, `AbyssalRitualTest`, `JournalTest`, `InitialScreenTest`, `BridgeViewStructureTest`, `ReplayServiceTest`, `GematriaTest`, `QuitNowTest` (imports); `GameMementoTest`, `TestRunner`, `NavArrayTest` (unused locals). No test *assertion* changes anywhere.
**Untouched by design:** `run.sh`, `build.gradle`, `--compile`, every other `vinc.sh` mode's classpath, the nine long methods, the three non-component `new Random()` sites, the 64 dynamic test classes.

## Declared deviations / decisions
1. **No Gradle.** The OOA plan's `build.gradle` + `config/codenarc/codenarc.xml` become a `vinc.sh` mode + `config/lint/vinc-ruleset.groovy` (DSL, not XML). `--compile` is untouched; the plan's "compile passes with CodeNarc enabled" gate becomes "`--lint` passes".
2. **Jars are committed** under `lib/lint/` (3.0 MB) rather than downloaded on demand: same convention as the JUnit params jar, works offline, one classpath story. If the user prefers a fetch-on-first-run into `build/lint/` (gitignored, pinned SHA-256), c2 changes and nothing else does.
3. **The gate is green at every commit** because c2 baselines all existing debt; c3–c11 shrink the baseline. The alternative (a red gate until the fixes land) would break "each commit reverts alone".
4. **`MethodSize` debt is baselined, not fixed or hidden.** Raising `maxLines` to 110 would make the rule meaningless; refactoring nine methods is not O2. The baseline entry carries the method's current length, so the first edit to any of them resurfaces the violation — that is the intended ratchet, and HK-013 records the list.
5. **Test tree exemptions** (`CompileStatic`, `MethodSize`, `ClassSize`) and **tool exemptions** (`TestRunner`, `GoldenFrameGenerator`, `Main`) live in the ruleset by path/file name; the two production exemptions (`Game` exit, `ConsoleSink` prints) live in source as `@SuppressWarnings` so the reason sits next to the code.
6. **No automated self-test for the lint mode.** The negative check at c2 is manual and recorded in the execution notes; a `LintSelfTest` that runs CodeNarc from JUnit would need the lint jars on the test classpath, which deviation 2 deliberately avoids. Revisit if a rule is ever found silently broken.
7. **`--lint` is not made a per-commit floor**, only a pre-merge gate (CODEX 1.5); per-commit is recommended. The suite stays the per-commit floor.
8. **Naming rules are not enabled.** The O2 goal line says "naming violations"; the task list names none, and the codebase's naming is
   already uniform enough that no naming rule was in the OOA plan's minimum set. Enabling `rulesets/naming.xml` later is a one-line
   ruleset change plus a baseline regeneration — it is not part of O2.
9. **Invariants are CodeNarc generic rules, not bash greps** — one report, one exit code, one place to read. Regex rules are textual (a comment containing `instanceof CorridorState` would trip `NoInstanceofOnStateOrFactory`); acceptable because the greps the team already runs by hand have the same property, and a false positive is fixed by rewording the comment.

## Gates (after every commit)
`./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS … FAILED=0` (36 goldens inside); `./vinc.sh --lint --agent 2>/dev/null` →
`LINT=PASS … P1=0 P2=0 P3=0` (from c2 on); `./vinc.sh --scan` → seed 0 → 9 nodes at step 0, c8, c10 and the final commit;
`git status --short` clean after every run; `git diff config/lint/baseline.xml` shows removals only (c3–c11).

## Reversion unit
Each commit is independently green on all gates and reverts alone. c2 (infra) can be reverted without touching any fix; each
fix commit reverts alone and only re-adds its own baseline rows. c10 has an explicit STOP rule. Docs (c1, c12) never share a
commit with code or infrastructure. Merge to `master` only when every gate passes on the final commit.
