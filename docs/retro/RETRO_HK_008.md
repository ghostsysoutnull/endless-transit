# Retro: Housekeeping — HK-008 (ProceduralFactory is an injected instance; the last static singleton)
**Date:** 2026-09-16 | **Suite at close:** 213 discovered / 213 pass / 0 skipped / 0 failed | **Duration:** ~3.2s
**Chronicle:** journals/LOG_20260916_152000_0xf681c46.md
**Branch:** `housekeeping/hk-008-factory-injection` — 6 commits, merged to `master` @ `f681c46`, pushed

---

## What Went Well
- **Facade-first, three times over.** c3 added `Game.getFactory()` pointing at the static and wired every container and every hand-built test object in their *final* form; c4 moved ownership into `Game` and repointed the accessor; c5 deleted the static. No test was touched twice. The Phase 6 pattern scales from a field move to a singleton removal.
- **The step-0 pin found a real gap.** No assertion said a generated location renders through *its own game's* formatter; rendering only proved it was non-null. Part A passed on `master` and turned into the harness for parts B and C.
- **One wiring site.** Every child is born through the facade's delegators (grepped: zero direct per-type callers), so `wire()` in one file stamps the back-reference on all 13 container types. The 14 per-type factories were not opened.
- **The grill earned its keep on check 4.** The first c4 would have compiled and failed one test: the scanner's world would have lost its formatter the moment `Game` stopped writing into the static. Keeping one scaffold line through c4 cost nothing; finding that mid-sequence would have cost a revert.
- **Fail-loud with the class name** turned 18 mysterious failures into a to-do list: every message said which type was built by hand.

## Challenges
- **Population has more doors than `getChildren()`.** The plan enumerated tests that touch child lists and predicted 11 files; the guard fired in 12. `getIndexInParent()` walks the *parent's* children, so a hand-built `new Apartment()` used only as a Room's parent, and a hand-built City/Street used only for vibe, all populated. The suite answered in one run; the grep could not have.
- **Removing a static is one atomic cutover** even when split over three commits: the intermediate states need scaffolding (a null-formatter static, a settable `fmt`, one write in `Game`) that must be declared so nobody mistakes it for the target.

## Surprises
- **A test had been passing by accident.** `LandmarkDiscoveryTest` renders a scanner-built street with ANSI assertions; the scanner never had a formatter of its own. It worked because forty-odd earlier tests had each written their `Game`'s formatter into the static and the last one stuck. A Service Locator does not just hide a dependency; it hides that a dependency is *missing*.
- **The per-game `ThemeService` reload is invisible.** 38 small classpath reads per `new Game`, 47 construction sites in tests: four suite runs landed between 2.97 s and 3.33 s against a 2.99 s baseline.
- **The step-0 test's own sanity literal was wrong** on the first run (13 levels Universe → Room, since Sector and NullSector are alternatives, not 14). Caught before commit; a reminder that a pin's fixture is code too.

## Concerns for Upcoming Phases
- **The housekeeping backlog is empty.** The next work is O2 (CodeNarc as a `vinc.sh --lint` mode — the OOA plan's Gradle premise is wrong for this runner) or O1 (HeadlessRunner DSL). Neither has a plan yet.
- **`.journal_session_tmp` is still one shared path** (HK-011 E3). With two games in one JVM now holding independent factories and formatters, the journal's temp file is the one remaining shared resource; fine until two games run concurrently.
- **`grep -rn "static .* instance" src/main` → 0.** Worth a lint rule under O2 so the next singleton does not get to live for six months.

## Lessons
- **A hand-built parent is a hand-built container.** `getIndexInParent()` populates the parent; wire `factory` and `fmt` on anything a test puts on the `parent` side of a Location. Promoted to `tasks/lessons/model.md`.
- **A Service Locator hides missing dependencies, not just implicit ones.** The proof that a test depends on order is a component that was never given the collaborator it renders with. Promoted to `tasks/lessons/model.md`.
- **When removing a static in stages, name the scaffolding.** The plan lists every temporary line (what keeps compiling, what keeps one test alive) and the commit that deletes it. Recorded here; the grill's check 4 is where it is enforced.
