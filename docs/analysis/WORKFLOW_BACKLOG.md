# Workflow Backlog
**Purpose:** Capture workflow friction, tooling gaps, and agentic improvement opportunities
as they surface — primarily from retros and mid-session observations. Reviewed every 3 phases.
When enough items accumulate (or a High priority item appears), a dedicated workflow
improvement session is planned before the next phase begins.

**Sources:** Phase retros → "Concerns for Upcoming Phases" section → logged here.
**Cadence:** Review at Phase 1, 4, 7, 10 (every 3 phases). Trigger early for High priority.
**Process:** Open item → plan session → execute → mark CLOSED with resolution.

---

## 🔴 OPEN

> **Phase 1 cadence review completed — 2026-03-18.** Backlog clean. No workflow session
> required before Phase 2. Next scheduled review: Phase 4.

> **Phase 4 cadence review completed — 2026-03-18.** One latent infrastructure issue surfaced
> post-phase (not from retro): `--scan`, `--replay`, and game launch classpaths in `vinc.sh`
> diverged from `--test` — `src/main/resources` was missing, causing silent load failures at
> runtime while tests passed. Fixed immediately; lesson promoted to `tasks/lessons/infrastructure.md`.
> Backlog otherwise clean. No workflow session required before Phase 5. Next scheduled review: Phase 7.

> **Phase 5 note — 2026-03-18.** The pre-Commit-G grep for `ModelOutput.fmt` only caught
> direct static field accesses. Tests depending on the ambient formatter *implicitly* (via
> `getEffectiveFmt()` fallback on directly-constructed model objects) were invisible to the grep.
> Future Service Locator removals should include: (1) grep for direct usage, AND (2) audit every
> test file that constructs a model object outside the factory and exercises any rendering path.
> Lesson promoted to `tasks/lessons/model.md`. No workflow session warranted — backlog clean.
> Next scheduled review: Phase 7.

> **Phase 7 cadence review completed — 2026-09-11.** WF-002 evaluated and closed (see CLOSED).
> One new item surfaced by the Phase 7 pre-grill, WF-003, opened and closed in the same session via
> Phase 7-0. No workflow session required before Phase 7. Next scheduled review: Phase 10.

> **Phase 10 cadence review completed — 2026-09-11.** Backlog clean: zero OPEN items, no High trigger.
> Retro concerns since Phase 7 all accounted for (WF-004/WF-005 closed inside Phase 8; HK-007 closed;
> Phase 9 "dispatcher has no production caller" = HK-005; the static-singleton concern logged as HK-008).
> **WF-002 re-evaluation (six grill checks, ~12 runs):** check 1 fired in 6b, 6c, 7a, 7c, 7d, 7e-ii, 8 (5 rows),
> 9 (9 rows + one unsupportable claim); check 2 once (Phase 9 double-populate test); check 3 once (6b);
> check 5 twice, and it missed the Phase 8 `instanceof` until WF-004 patched it; checks 4 and 6 never non-PASS.
> Decision: keep all six — Phase 10 is the first High-risk phase and 10f (import removal) only compiles once
> every caller has migrated, which is exactly what checks 4 and 6 guard. One gap closed the same session:
> check 5's pattern-integrity grep listed State/Strategy/Factory/Visitor; Phase 10 introduces an Observer
> hierarchy, so listener `instanceof` on event subtypes was added to the row. No workflow session required.
> Recommended order: HK-005 + HK-006 housekeeping session (HK-005 touches `Building`, which Phase 10 also
> edits), then Phase 10. Next scheduled review: Phase 13, or the next phase after Phase 10 if the plan ends there.

### WF-006 — `MethodSize` measures lines; a line break can satisfy it
**Priority:** Low | **Found:** 2026-09-16 (HK-018 → HK-013 slice 1; user question: "is this good computer science?")
The 50-line rule found real multi-job methods (all nine baseline entries), but raw length is a proxy: it was dodged once with a line join
(HK-018, undone in HK-013 slice 1), it treats 64 → 65 like 40 → 140, and a re-wrap could trip it with no real change. **Evaluate at the next
cadence review, against the jar with a scratchpad prototype (O2 lesson):** `CyclomaticComplexity` and/or `AbcMetric` beside or instead of
`MethodSize`; whether `MethodSize` can ignore blank/comment lines; how each behaves with the message-keyed baseline (does the message embed the
score, i.e. does the ratchet still fire on change?); what the current tree scores. Decision options: keep as is / add complexity beside length /
replace. Until then: `MethodSize` stays a merge gate, with the "extract or re-baseline with a reason" rule in `tasks/lessons/infrastructure.md`.

---

## 🟢 CLOSED

### WF-009 — No gate asks whether new code has the right OO shape
**Priority:** Medium | **Found:** 2026-09-20 (user question after HK-020: "how can we prevent that new code will not implement sound OO principles?")
HK-015 shipped a static function and a two-owner fact through every green gate; only the user's post-merge review caught them.
**Resolution (user decision: principles, not the two smells):** CODEX § 4 "OO Principles" — eight rows with the wave that taught each, six with a
check and its evidence; Shape Claim Protocol (a Shape table per plan); `/grill` check 5 asks the six; lint `NoNewStaticLogic` (non-private static
with a body; 16-file allow-list with reasons, shrink-only). Paper test: three old plans fail as written. Not taken: a post-implementation review pass.
Record: `tasks/completed/WF_009_PLAN.md`. **Closed:** 2026-09-20 | chronicle `0x3547535`

### WF-008 — `/close-wave` applies ten rows to every wave and makes the handover grow
**Priority:** Medium | **Found:** 2026-09-17 (user review of WF-007: "too token hungry … a much larger scope than it should")
Measured: WF-007's close-out wrote as many words as its work (~2,200 each), the same facts seven times; the recovery prompt is 2,960 words, 1,100 of them
per-wave history; `CLAUDE.md` includes the finished OOA plan (7,493 words) in every session.
**Resolution:** the command picks its tier from the diff (Trivial / Light / Full), judgment may only add rows with a named reason, one record per wave with word budgets;
recovery prompt cut to current state (755 words) and capped by `--docs` D4; the finished OOA plan is read on demand, its Gates table moved to CODEX § 4.
Record: `tasks/completed/WF_008_PLAN.md`. **Closed:** 2026-09-17 | chronicle `0x4f767c3`

### WF-007 — The close-out doc audit is not mechanical; the user has to ask "are all docs updated?" every session
**Priority:** High | **Found:** 2026-09-16 (HK-019 close; user correction: "every time I need to ask you if all docs are updated and they never are")
The HK-019 close-out updated the files its plan listed and missed the `Floor` blueprint, the recovery prompt's header / latest-journal pointer /
closed list, a lesson's tense, the retro and the lesson. The same happened at the HK-013 hand-off (three docs commits to repair). A nine-point list
now lives in `tasks/lessons/infrastructure.md`, but a lesson is prose the agent must remember. **Proposal for the workflow session:** make it a
gate — (a) add the list to `.claude/commands/chronicle.md` as a mandatory step whose output is the filled table, and/or (b) a `./vinc.sh --docs`
check that fails when the recovery prompt's suite count / latest journal id disagree with `./vinc.sh --test` and `journals/CHRONICLE_INDEX.md`'s top
row, and when a production class changed since the last chronicle has an older blueprint.
**Resolution:** both, split by what each can prove (user proposal: a close-wave skill). `.claude/commands/close-wave.md` — ten rows in order, each backed by
tool output from the session, ending in a table and READY TO CLOSE / OPEN ROWS; CODEX § 1.5: "closed"/"merged" appear in chat only as its output.
`./vinc.sh --docs` (`.agents/docs-check.sh`, read-only) — D1 suite count, D2 latest chronicle (new `Latest chronicle` line in the recovery prompt), D3 blueprint
stamps by `git hash-object` (15 stamped `Baselined (not audited)`; a touched class breaks its stamp). Each check shown red on a scratch copy. The command closed
its own wave; its row 1 was amended by that run. Record: `tasks/completed/WF_007_PLAN.md`; retro `docs/retro/RETRO_WF_007.md`.
**Closed:** 2026-09-17 | chronicle `0x8885fa2`

### WF-005 — Game loop crash handler terminates the test JVM
**Priority:** High
**Source:** Phase 8a, 2026-09-11 (mid-session observation; confirmed at the close-out audit)
**Problem:** `Game.groovy` wraps the main loop in `catch (Throwable t)` → `Logger.reportCriticalFailure` →
`System.exit(1)`. Four tests drive that loop (`HeadlessRunner`, `HeadlessSimulationTest`, `VisualBaselinePinningTest`,
`RegressionHarnessTest`). When production code throws inside one of them, the crash handler kills the whole test
JVM: `TestRunner` never reaches its summary, `--agent` prints **nothing** (exit 1, empty stdout and stderr), `-q`
shows the failures reported so far and then stops without the summary block. The gate does not lie — it goes
silent, which an unattended agent can misread. Reproduced in the scratchpad by shadowing `Floor` with the 8a
`instanceof` variant: exit=1, zero bytes of output.
**Proposed (test infrastructure only, no production change):** `TestRunner` installs a shutdown hook before
`launcher.execute`; if the summary has not been reached when the hook fires it prints
`STATUS=ABORTED REASON=jvm_exit_during_suite` (+ the last started test from the progress listener). Optional
follow-up: `Game`'s handler rethrows when a `vinculum.test` system property is set, so the failing test is
attributed instead of the run dying.
**Resolution:** `TestRunner` registers a shutdown hook before `launcher.execute`; if the summary was not reached it
prints `STATUS=ABORTED REASON=jvm_exit_during_suite LAST_STARTED=<test> STARTED=<n>` (agent mode) or a
`[VINC:ABORTED]` line (other modes). Verified against the shadowed-`Floor` reproduction and the normal suite. No
production change; the optional `Game` rethrow-under-property follow-up was not taken (user decision 2a).
**Closed:** 2026-09-11 | Phase 8 close-out

### WF-004 — `/grill` has no design-integrity check
**Priority:** Medium
**Source:** Phase 8b, 2026-09-11 (user review mid-execution, not from a retro)
**Problem:** The Phase 8 plan put `floor.currentState instanceof CorridorState` in `ScanCommand`. All six
`/grill` checks passed — they verify coverage, edges, lifecycle, coherence, deviations and reversion, none of
them asks whether the design honours the pattern being introduced. The user caught it after 8b was committed
("are you using instanceof? Is that good OO design?"); fixing it cost two extra commits (8b-ii).
**Proposed:** Not a seventh check (the command caps at six by design). Fold into check 2 (behavioral edges)
or check 5 (deviations) a one-line "pattern integrity" question for any plan that introduces a
State/Strategy/Visitor hierarchy: grep the planned client code for `instanceof <NewType>` or `.class ==`;
any hit is an AMEND. Lesson already promoted to `tasks/lessons/model.md`.
**Resolution:** Folded into check 5 of `.claude/commands/grill.md` (no seventh check): any `instanceof`/`.class`/`getClass()`
on a newly introduced State/Strategy/Factory/Visitor type in planned client code or tests is a FAIL. Applied the same
session, before Phase 9 introduces a factory hierarchy.
**Closed:** 2026-09-11 | Phase 8 close-out

### WF-002 — Plan review lacks an adversarial pass on coverage and lifecycle claims
**Priority:** Medium
**Source:** Phase 6b plan draft, 2026-09-11 (mid-session observation, not from a retro)
**Problem:** The 6b draft asserted that an existing test pinned memento input-history restoration.
It did not. The claim was made from the file name, not from reading the assertions, and the plan's
"Risk assessment" section was built on it. User review caught it before any code changed. The
existing Refactor Guard rules (blast-radius grep, 5-file cap, compile-per-file) all held; the gap
was one level deeper — nothing required a coverage *claim* to be evidenced.
**Immediate fix (applied 2026-09-11):** Coverage Claim Protocol added to `.claude/CODEX.md` §4;
lesson recorded in `tasks/lessons/infrastructure.md`.
**Proposed follow-up:** A `/grill` command in `.claude/commands/` that runs an adversarial checklist
against a draft plan before it is presented: (1) coverage claims with quoted assertions,
(2) behavioral edges each with a named guard, (3) lifecycle for ownership moves — who constructs,
holds, replaces, (4) per-commit coherence, (5) deviations from the plan document, (6) reversion unit.
**Decision (revised 2026-09-11):** Guideline applied. `/grill` built the same day as
`.claude/commands/grill.md` (commit e56811b) so it could be exercised on a real plan immediately.
**First run — Phase 6b plan:** verdict AMEND. Confirmed the UNGUARDED restore path (already amended
with 6b-0) and found one mis-claim: `CorridorPersistenceTest` was listed as a focus test but goes
through `SyncManager`, which never touches the handler. Dropped from the focus list. Blast-radius
cross-check found no file missing from the plan.
**Resolution (Phase 7 cadence review):** Three runs — 6b, 6c, Phase 7a — all AMEND, each finding
a real gap: 6b UNGUARDED restore-history (→ `MementoInputHistoryTest`) plus a mis-listed focus test;
6c UNGUARDED engine behaviors (→ `NavigationEngineWiringTest`); 7a most `BridgeView` output UNGUARDED
(→ `BridgeViewGoldenFrameTest`) plus the WF-003 gate finding. Per-check tally: check 1 fired 3×,
check 2 1×, check 3 1×, check 5 2×; checks 4 and 6 never produced a non-PASS. Decision: keep all six —
4 and 6 are the cheapest checks, and Phase 7 (seven sub-phases in one 579-line file) is the first phase
where a mis-ordered commit or an unbounded revert is plausible. Re-evaluate at Phase 10.
**Closed:** 2026-09-11 | Phase 7 cadence review

### WF-003 — UI-phase visual gate was a model-only probe
**Priority:** Medium
**Source:** Phase 7 pre-grill, 2026-09-11 (mid-session observation)
**Problem:** The OOA plan required `./vinc.sh --scan` to be "pixel-identical" for Phase 7. `--scan`
runs `SeedScanner` (procgen), never constructs `BridgeView`, and prints four lines — it verifies the
world model, not the HUD. The only UI baseline (`screenshots/baseline_refactor_survival.txt`) is
gitignored, write-once, a `toString()` blob containing a timestamp, and asserted for two marker strings
only. Phases 5 and 6 reported "scan identical" as their visual gate; for `ui` changes that check was
vacuous. A scratchpad harness (170 frames, 17 depths, seed 12345, run twice) also showed 16 frames are
non-deterministic — the telemetry spectrogram is seeded from the wall clock (`BridgeView.groovy:354`) —
so "pixel-identical" needs a mask.
**Resolution:** `HudFrameHarness` + `BridgeViewGoldenFrameTest` (Phase 7-0) pin 18 golden frames
covering every `BridgeView` public method, spectrogram bars masked. Phase 7 gate redefined in the OOA
plan: golden frames + full suite; `--scan` retained as the model gate only.
**Closed:** 2026-09-11 | Phase 7-0

### WF-001 — Build cache never purged between compiles
**Priority:** High
**Source:** `docs/retro/RETRO_TEST_RUNNER.md` — "Concerns for Upcoming Phases"
**Problem:** `vinculum_compile()` used `mkdir -p build/vinc` without clearing stale `.class`
files first. Deleted or renamed source files left compiled classes in the cache, which were
discovered and run by the test runner — producing phantom tests, inflated counts, and
unexpected output. Surfaced when `DiscoverSnapshotValues.groovy` was deleted but its class
continued appearing in the suite.
**Risk for OOA:** Phase 3–9 create and potentially rename/delete multiple classes. Without
this fix, discovered test counts would drift and stale classes could run silently.
**Resolution:** Changed `mkdir -p build/vinc` to `rm -rf build/vinc && mkdir -p build/vinc`
in `vinculum_compile()`. Every compile now starts from a clean slate.
**Closed:** 2026-03-17 | commit: see workflow session after TEST_RUNNER_IMPROVEMENTS
