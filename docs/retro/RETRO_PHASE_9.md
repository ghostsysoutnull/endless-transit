# Retro: Phase 9 — ProceduralFactory Split
**Date:** 2026-09-11 | **Suite at close:** 197 discovered / 192 pass / 5 skipped / 0 failed | **Duration:** ~3.4s
**Chronicle:** journals/LOG_20260911_211432_0xa5b92b9.md
**Branch:** `refactor/phase-9-factory-split` — 17 commits (9-0, 9a–9o, docs), pending merge to `master`

---

## What Went Well

- **Reading the entropy source first changed the risk model.** `LocusSeed` is `@Immutable` and every draw is pure; the inherited lesson that "factory call order affects seed state" was wrong for `LocusSeed` and right only for `nextRandom()` sequences. Fourteen body moves went in with no entropy anxiety and no golden moved. The lesson is now corrected in `tasks/lessons/procgen.md`.
- **The coverage audit paid for itself before the first move.** Nine factory behaviors had no assertion anywhere. `ProcgenDeepSnapshotTest` pinned them in one file, one method per factory-to-be, so a bad move would fail in the method named after the factory that moved. It never fired — but it is why the fourteen commits could be chained without reading every generated file line by line.
- **Facade-first at phase scale.** Keeping every pre-split signature as a one-line delegator meant the 13 model classes, 4 core/procgen callers and 8 direct test callers were never touched. Any intermediate commit was coherent because cross-type calls always went through the facade, which delegated to whichever factories existed so far.
- **Scripted move, zero drift, fourteen times.** `move_factory.py` lifted exact text, applied four substitutions, asserted the reverse before writing. Six of the moves ran back-to-back in a single guarded shell chain (`move && test && commit`) — the commit could not happen if either the reverse check or the suite failed.
- **`/grill` caught two of the plan's own errors** before authorization: a "≠ planet vibe" claim about the mutated Country vibe that `toString()` could not support, and a registry test that would have double-populated a Street because it did not mirror `ensureChildrenPopulated`'s flag-first order.

---

## Challenges

- **Groovy STC and typed list literals.** `List<LocationFactory<? extends Container>> all = [universeFactory, …]` fails static type checking with an intersection type (`LocationFactory<…> & GroovyObject`). A static `register(map, factory)` helper called once per field is the clean workaround. Cost: one failed gate, no commit (the `&&` chain held).
- **An anonymous `Container` in a test needs three methods.** `getDescription()`, `getMapSymbol()` and `getOptions(Game)` are abstract on the model; the registry test's `Orphan` needed stubs. Small, but a second failed gate on the same commit.
- **Fourteen near-identical commits are tedious to review by eye.** The mitigation was structural (reverse check + full suite per commit), not attentional. The per-commit "highlights" grep (imports, class line, signatures, `registry.` lines) is what a human review of a scripted move should look at.

---

## Surprises

- **The plan's `create(Container, LocusSeed)` contract fits only 8 of 14 types.** `createUniverse` has no parent; five leaf-side types carry culture/timeline/count arguments. Declared deviation: typed `create(...)` per factory, `populate(T)` as the only uniform method.
- **`ThemeService.instance` does not exist** and never did; `procgen/CLAUDE.md`, `GEMINI.md` and the OOA report all asserted it. Corrected in the domain docs; the report is historical and left as-is.
- **`populateFilament` rolls once per filament.** `f.locus.nextInt(100) < 30` inside the child loop is the same pure value every iteration, so a filament is all `NullSector` or all `GalacticSector` (seed 0x1234: 7/7 null). Preserved verbatim, pinned, logged as HK-007 — changing it alters every world and is a product decision.
- **`ProcgenSnapshotTest` has its `city`/`country` locals swapped.** Literals are right; messages are wrong. HK-006.

---

## Concerns for Upcoming Phases

- **Phase 10 is the backlog cadence review point.** HK-005 (13 `populateChildren` overrides → registry dispatch, 14 model files), HK-006 (test hygiene) and HK-007 (filament roll decision) are open. HK-005 is the natural next housekeeping session; HK-007 needs the user's call before anyone touches it.
- **The dispatcher has no production caller yet.** `populate(Container)` is exercised only by `ProceduralFactoryRegistryTest`. That is by design (blast radius) but it means the registry is a promise until HK-005 lands.
- **`ProceduralFactory.instance` is still a static singleton.** Phase 9 did not touch injection (OOA §3.4); fourteen factories now hang off it. If constructor injection of the factory is ever planned, the back-reference design makes it a single-site change (`Game.groovy:33` + the singleton line).
- **Phase 10 (Domain Events) breaks the `model → core` import in `Building`.** `EventBusTest` is `@Disabled` with stubs; re-read it before planning — the Coverage Claim Protocol applies to disabled tests too.

---

## Lessons

- **Read the entropy primitive before planning an entropy-sensitive refactor.** One file (`LocusSeed.groovy`, 120 lines) turned a "verify determinism after every step" fear into a provable non-issue. Promoted to `tasks/lessons/procgen.md`.
- **A pure roll inside a loop is one roll.** Promoted to `tasks/lessons/procgen.md`.
- **Chain scripted moves with `&&` so a failed check can never reach a commit.** Already in `tasks/lessons/infrastructure.md` ("assert after the last edit"); reaffirmed at 14× scale.
- **Under `@CompileStatic`, register typed instances one call at a time rather than through a typed list literal.** Promoted to `tasks/lessons/core.md`.
