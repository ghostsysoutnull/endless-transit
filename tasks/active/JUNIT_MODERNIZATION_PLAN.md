# ACTIVE TASK: JUnit 5 Modernization & Test Infrastructure Refactor

## Objective
Migrate the entire test suite from JUnit 4 to JUnit 5 (Jupiter), standardize test discovery, and convert legacy "Script Tests" into formal JUnit classes.

## 🛡️ Surgical Constraints (Mandatory)
1. **Incrementalism**: Address ONLY 3 tests at a time (One "Surgical Unit").
2. **Logic Matching**: For every migrated test, we must prove the *output strings* and *assertion logic* match the original (verify via `git diff` and execution logs).
3. **Test-Only Scope**: **FORBIDDEN** to modify any file in `src/main/groovy/`. All modernization must happen within `src/test/groovy/` or `build.gradle` (dependency only).
4. **Co-existence**: The old `AllTests.groovy` must remain active and functional until the very last test is migrated and verified.

## Progress Tracker
- [x] Phase 1: Prerequisite & Template
- [x] Phase 2: JUnit 4 -> 5 Migration (Core Tests)
- [x] Phase 3: Script -> JUnit 5 Migration (Script Tests)
- [x] Phase 4: Orphaned & Manual Integration

## Migration Matrix
| Test Category | Total Count | Migrated | Status |
| :--- | :--- | :--- | :--- |
| Core (JUnit 4) | 10 | 10 | COMPLETE |
| Scripts (Plain) | 13 | 13 | COMPLETE |
| Orphaned | 7 | 7 | COMPLETE |
| **Total** | **30** | **30** | **COMPLETE** |

## Detailed Implementation Plan

### Phase 1: Prerequisite & Template
- [x] **1.1 Dependency Update**: Add JUnit 5 to `build.gradle` (The ONLY non-test change allowed).
- [x] **1.2 Template Migration**: Migrate `core/NewGameTest.groovy` as a "Surgical Unit of One" to prove the infrastructure works without touching `src/main/groovy`.

### Phase 2: Active Suite Migration (Surgical Units)
- [x] **Unit 2.1**: `model/DeepLatticeCrawlTest`, `model/FloorCrashTest`, `core/JournalTest`.
- [x] **Unit 2.2**: `core/StartupTest`, `core/GameMementoTest`, `procgen/ProcgenVariabilityTest`.
- [x] **Unit 2.3**: `procgen/SeedScannerTest`, `ReplayServiceTest`, `ui/DisplayAdapterTest`.

### Phase 3: Script Test Formalization (Surgical Units)
- [x] **Unit 3.1**: `ui/CyberTerminalTest`, `procgen/GematriaTest`, `core/InventoryObjectTest`.
- [x] **Unit 3.2**: `core/MergeLabelTest`, `model/MnemonicReversalTest`, `core/SingleObjectTakeTest`.
- [x] **Unit 3.3**: `core/TracePersistenceTest`, `model/DeterministicUniverseTest`, `model/StreetTest`.
- [x] **Unit 3.4**: `model/StructuralConsistencyTest`, `procgen/SystemNameTest`, `ui/InitialScreenTest`, `regression/VisitedProgressTest`.

### Phase 4: Orphaned & Manual Integration
- [x] **Unit 4.1**: `ui/NavArrayTest`, `ui/CaptureVerificationTest`, `regression/VibeRegressionTest`.
- [x] **Unit 4.2**: `model/AbyssalRitualTest`, `core/ReproCrashTest`, `core/HeadlessSimulationTest`.
- [x] **Unit 4.3**: Cleanup `AllTests.groovy` and update `vinc.sh --test`.

## Verification & Testing
- **Logic Match**: Compare execution logs of the old script vs. the new JUnit 5 class.
- **Vibe-Check**: Run `./vinc.sh --scan` to ensure no side-effects on the model/procgen logic.
- **Zero-Touch Audit**: Verify `git status src/main/groovy` is empty after every unit.

---
*Signed,*
**The Vinculum Architect**
