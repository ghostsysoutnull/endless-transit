# Retro: Phase 5 — Dependency Injection: ModelOutput.fmt
**Date:** 2026-03-18 | **Suite at close:** 118 discovered / 113 pass / 5 skipped / 0 failed | **Duration:** ~2.4s
**Chronicle:** journals/LOG_20260318_180000_0xe5f2c1b.md

---

## What Went Well

- **`getEffectiveFmt()` typed getter pattern solved the `@CompileStatic` problem cleanly.** Inline Elvis `fmt ?: ModelOutput.fmt` widens the result to `Object`, which `@CompileStatic` then rejects when you call `.colorize(...)` on it. Wrapping the fallback in a named method with explicit `OutputFormatter` return type gave the compiler what it needed with zero duplication. The pattern was discovered once and applied to both base classes.
- **The incremental migration was safe throughout.** By keeping `getEffectiveFmt()` falling back to `ModelOutput.fmt` during Commits C–E, the suite remained green at every intermediate state. The fallback carried its weight exactly as designed, then was removed cleanly in Commit G.
- **`ProceduralFactory` as the single threading point worked.** The injection chain — `Main` → `Game` → `ProceduralFactory` → every model object — required touching `ProceduralFactory` once (Commit B). After that, all model class changes were mechanical and isolated.
- **7-commit structure kept blast radius manageable.** No commit exceeded 5 production files. Compile ran after every single file edit. Zero compile failures needed a revert.

---

## Challenges

- **Commit G exposed hidden test coupling that the plan didn't anticipate.** The plan named `HeadlessRunner` and `Terminal.initialize` as risk sites for stale `ModelOutput.fmt` usage. The actual sites were three test files constructing model objects directly (`SurvivalPinningTest`, `NavigationSyncTest`, `SingleObjectTakeTest`) — none flagged in the pre-G grep because they used `ModelOutput.fmt` implicitly via the fallback getter, not directly by name.
- **9 test files required changes.** The plan described this as a production-only commit. In practice, Commit G was split across 3 production files + 9 test files. The test changes were low-risk but added scope.

---

## Surprises

- **`@CompileStatic` rejected the Elvis operator before any model class was even edited.** Adding `OutputFormatter fmt` to `Container` and testing the inline `fmt ?: ModelOutput.fmt` pattern immediately surfaced the type widening issue. This meant the `getEffectiveFmt()` solution had to be in place before Commit A could proceed — earlier than expected, but the discovery was fast.
- **`ScanCommand`'s 14 `ModelOutput.fmt` usages were all in two private render methods.** Threading `OutputFormatter fmt` as a parameter to `renderCorridorScan()` and `renderApartmentScan()` was the cleanest solution — no new field on `ScanCommand`, no access to `Game` state from private context. The method signature change was minimal.
- **`ModelOutput.groovy` left stale test imports that caused compile failures after deletion.** `QuitNowTest` and `DisplayAdapterTest` imported `ModelOutput` without using the static field. The compile gate after deletion immediately flagged both; cleanup was straightforward.
- **`new Room()` in tests was depending on the ambient formatter all along.** `SurvivalPinningTest` had been "working" because the static field was always set by the time the tests ran (some earlier test in the suite had initialized a `Game`). This is the kind of test fragility that produces flaky results in isolation vs in suite. After G, the dependency is explicit: `room.fmt = game.fmt`.

---

## Concerns for Upcoming Phases

- **Phase 6 (GameState Decomposition) will likely have a larger test blast radius.** `GameState` fields are accessed throughout the test suite via `game.state.*` or delegation methods. Any field removal from `GameState` will require updating all such accesses. Pre-6 planning should grep `src/test/` for `state\.mapper`, `state\.inputHandler`, `state\.navEngine`, `state\.bridgeView` as a dedicated step.
- **`effectiveFmt` is a now-vestigial method name.** All model classes call `effectiveFmt` (via Groovy property access on `getEffectiveFmt()`), which simply returns `fmt`. A future cleanup could rename all call sites from `effectiveFmt` to `fmt` directly, but this is cosmetic and carries non-trivial search-and-replace risk in `@CompileStatic` classes. Defer to a dedicated cleanup pass, not inline to Phase 6.

---

## Lessons

- **Tests constructing model objects directly depend implicitly on any ambient global formatter.** After a Service Locator is removed, every test site that bypassed the factory will NPE at the first rendering call. The fix pattern is `obj.fmt = game.fmt` (when a Game is present) or `obj.fmt = new StandardTerminalAdapter()` (when no Game exists). Grep for `new Room()`, `new Building(...)`, etc. in `src/test/` before Commit G and audit each one.
  *Promoted to `tasks/lessons/model.md`.*

- **The fallback getter (`getEffectiveFmt`) should be removed in the same commit that removes the static field.** Leaving `{ fmt ?: ModelOutput.fmt }` in place after deleting `ModelOutput.groovy` would be a compile error. The two changes are atomic: remove the field, remove the fallback on the same day. Do not create intermediate states where one exists without the other.
