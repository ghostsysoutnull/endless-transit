# Endless Transit: Test Infrastructure Catalog (2026-03-11)

This document provides a comprehensive audit of all existing tests in the Vinculum substrate. It serves as the definitive checklist for the JUnit 5 modernization effort to ensure 100% test preservation.

## 📊 Summary Statistics
- **Active Tests (in AllTests.groovy)**: 23
- **Orphaned/Manual Tests (on disk)**: 8
- **Total Test Assets**: 31
- **Current Frameworks**: JUnit 4, GroovyTestCase (JUnit 3/4 bridge), Plain Groovy Scripts, JUnit 5 (Partial).

---

## 🏗️ Active Suite (Executed via `./vinc.sh --test`)

### JUnit 4 / GroovyTestCase (Class-based)

| ID | Path | Domain | Test Cases / Intent |
| :--- | :--- | :--- | :--- |
| **TC_01** | `core/NewGameTest` | Core | `testNewGameInitializationAndFirstRender`: Stress-tests 50 random seeds; verifies universe init, first render (Bridge/HUD), navigation to first building. |
| **TC_02** | `model/DeepLatticeCrawlTest` | Model | `testVerticalIntegrity`: Iteratively crawls 12 levels of hierarchy (Universe -> Room); verifies child population, LIP stability, and navigation options at every level. |
| **TC_03** | `model/FloorCrashTest` | Model | `testEnterAllFloors`: Stress-tests all floors in a building; verifies corridor/apartment entry. `testRecursionSafety`: Checks `getName()`/`getPath()` for stack overflows. |
| **TC_04** | `core/JournalTest` | Core | `testSaveSession`: Verifies `JournalManager` output files; checks for step deltas, item manifests, duration strings, and chronological discovery logs. |
| **TC_05** | `core/StartupTest` | Core | `testGameInitialization`: Verifies `Game` constructor, player init, and the first turn's `ActionMapper` state (lastChoice is null). |
| **TC_06** | `core/GameMementoTest` | Core | `testMementoCaptureAndRestore`: Verifies state serialization (seed, LIP, coherence); proves perfect restoration after multi-step navigation. |
| **TC_07** | `procgen/ProcgenVariabilityTest`| ProcGen | `testApartmentVariability`: Verifies varied room counts, object counts, and unique room names. `testBuildingVariability`: Verifies varied floor counts and unique building names across 20 instances. |
| **TC_08** | `procgen/SeedScannerTest` | ProcGen | `testScanForTallBuilding`: Validates `SeedScanner` with `WorldProbe` for specific building heights. `testNoMatchFound`: Ensures null result for impossible criteria. |
| **TC_09** | `ReplayServiceTest` | Core | `testPromotionWorkflow`: Verifies screenshot-to-JUnit-5 test generation; checks metadata parsing and file system output. |
| **TC_10** | `ui/DisplayAdapterTest` | UI | `testStandardAdapterInvariants`: Verifies visual width calculation and padding. `testGlitchedAdapterLayoutIntegrity`: Ensures glitching doesn't break HUD alignment. `testGlitchedOutputVariation`: Verifies text modification. |

### Script Tests (Plain Groovy Scripts)

| ID | Path | Domain | Requirement / Logic Tested |
| :--- | :--- | :--- | :--- |
| **ST_01** | `ui/CyberTerminalTest` | UI | Verifies `Location.getDepth()` (Universe=0, Planet=4) and `Location.getCoordinates()` stability; checks player step increments. |
| **ST_02** | `procgen/GematriaTest` | ProcGen | Validates frequency calculation: Summing letters, master number resonance (11/22 doubling), and vowel exclusion (weight 0). |
| **ST_03** | `core/InventoryObjectTest` | Core | Verifies `InventoryItem` data storage and the visual format of `player.listInventory()`. |
| **ST_04** | `core/MergeLabelTest` | Core | Verifies `sessionMergeCount` tracking for hybrid items; ensures recursive merging increments correctly and clears after session reset. |
| **ST_05** | `model/MnemonicReversalTest` | Model | Verifies navigation option "flipping": First room has 'f', last room has 'b'. Ground floor has 'u', no 'd'. |
| **ST_06** | `core/SingleObjectTakeTest` | Core | Verifies "Automatic Take" logic when only one object exists in a room; checks room removal and player inventory addition. |
| **ST_07** | `core/TracePersistenceTest` | Core | **End-to-End**: Navigates to room, modifies state (item/breach), syncs, restores new game, and verifies 100% state reconstitution. |
| **ST_08** | `model/DeterministicUniverseTest`| Model | Proves two separate `Universe` instances from same seed have identical names, vibes, and LIP resolution stability. |
| **ST_09** | `model/StreetTest` | Model | Verifies zero-padded numeric IDs (01, 09) and zero-agnostic matching logic ('2' == '02'); validates building LIP sequence stability. |
| **ST_10** | `model/StructuralConsistencyTest`| Model | Verifies `apartmentsPerFloor` consistency across all floors in a generated building; checks multi-column street population. |
| **ST_11** | `procgen/SystemNameTest` | ProcGen | Verifies removal of legacy "System-" and "Lost-System-" prefixes; checks "Lost " prefix for NullSector systems. |
| **ST_12** | `ui/InitialScreenTest` | UI | Visual audit of HUD, Bridge, Compass, and Building Diagnostics layouts (12345L seed); verifies box alignment. |
| **ST_13** | `regression/VisitedProgressTest`| Regr | Verifies "Spatial Pivot" (Elevator/Corridor mode) switching; checks visited progress labels and Scan command `[s]` execution. |

---

## 🕵️ Orphaned & Manual Tests

| ID | Path | Type | Intent / Coverage |
| :--- | :--- | :--- | :--- |
| **OR_01** | `ui/NavArrayTest` | GroovyTestCase | `testCompassLabelExtraction`: Verifies direction key stripping. `testVectorRenderingStability`: Smoke test for compass rendering. |
| **OR_02** | `ui/CaptureVerificationTest`| Script | End-to-end capture verification: Renders frame, triggers `CaptureService`, verifies metadata/LIP in generated screenshot file. |
| **OR_03** | `regression/VibeRegressionTest` | GroovyTestCase | `testObjectDiversity`: Ensures no duplicate items in rooms. `testAnsiAwarePadding`: Correctness of width calc. `testActionFrequencyDiversity`: Seed advancement check. |
| **OR_04** | `regression/AutomatedRegressionTest`| **JUnit 5** | Replays script `["f", "01", "quit"]` against seed `12345` and performs `isBoxedCorrectly()` visual assertion. |
| **OR_05** | `model/AbyssalRitualTest` | GroovyTestCase | `testRitualPriming`: Floor sampling/infusion logic. `testKeystoneGeneration`: Merge logic in primed bldgs. `testTerminologyShift`: "Layer", "Artery", "Crypt", "Shard" naming. |
| **OR_06** | `core/ReproCrashTest` | GroovyTestCase | Regression for ActionMapper: `getActionName(null)` returning `""` and `getActionName(unknown)` returning the key. |
| **OR_07** | `core/HeadlessSimulationTest`| Script | Verifies `HeadlessRunner` depth reach and `VisualAssertionEngine.expect().isBoxedCorrectly()` integration. |
| **UT_01** | `core/HeadlessRunner` | Utility | Provides the substrate for replaying input scripts without a physical terminal; uses `MemorySink` for results. |

---

## 🛡️ Modernization Mandates
1. **Zero Loss**: Every specific sub-test (e.g., `TC_03`'s `testRecursionSafety`) must have a corresponding `@Test` in JUnit 5.
2. **Standard Discovery**: Automate via Gradle `test` task.
3. **Behavioral Integrity**: Use `VisualAssertionEngine` for all layout tests (`ST_12`, `OR_07`, etc.).

---
*Generated by:* **Vinculum Architect**
