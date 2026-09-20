// Vinculum lint ruleset (O2) — run by `./vinc.sh --lint` (CodeNarc 4.0.0, lib/lint/).
// House rules first, then the project's own invariants. Existing debt lives in baseline.xml
// (one writer: `./vinc.sh --lint --baseline`); anything not in the baseline fails the gate.
ruleset {
    description 'Vinculum lint — house rules + project invariants (O2)'

    // --- leakage: output goes through RenderSink, exits are the runner's business ---
    // Main.groovy is a script (boot-failure exit); TestRunner is the runner (WF-005 exit + summary);
    // GoldenFrameGenerator writes progress to stderr. Game / ConsoleSink carry @SuppressWarnings in source.
    SystemExit     { doNotApplyToFileNames = 'Main.groovy,TestRunner.groovy' }
    SystemErrPrint { doNotApplyToFileNames = 'GoldenFrameGenerator.groovy,TestRunner.groovy' }
    SystemOutPrint { doNotApplyToFileNames = 'TestRunner.groovy' }
    Println        { doNotApplyToFileNames = 'TestRunner.groovy' }

    // --- imports ---
    UnusedImport
    UnnecessaryGroovyImport
    DuplicateImport

    // --- size (GMetrics); tests are narrative and exempt ---
    MethodSize { maxLines = 50;  doNotApplyToFilesMatching = '.*/test/.*' }
    ClassSize  { maxLines = 500; doNotApplyToFilesMatching = '.*/test/.*' }

    // --- convention: every production class is @CompileStatic (CODEX); the test tree is dynamic by design ---
    CompileStatic { doNotApplyToFilesMatching = '.*/test/.*'; doNotApplyToFileNames = 'Main.groovy' }

    // --- dead code ---
    UnusedPrivateField
    UnusedPrivateMethod
    UnusedVariable

    // --- Vinculum invariants (each verified to fire on a bad probe and stay silent on master, 2026-09-16) ---
    // HK-008: no Service Locator singletons in production code.
    IllegalRegex { name = 'NoStaticInstance'; regex = /static\s+(final\s+)?\w+\s+instance\s*=/; applyToFilesMatching = '.*/main/.*'
                   description = 'HK-008: no static singleton — inject the instance' }
    // Phase 8 / 9 (WF-004): ask the object polymorphically; never check its concrete state or factory class.
    IllegalRegex { name = 'NoInstanceofOnStateOrFactory'; regex = /instanceof\s+\w*(State|Factory)\b/
                   description = 'State/Factory pattern defeated by instanceof — ask the object' }
    // Phase 10: a listener is a typed subscription per event class.
    IllegalRegex { name = 'NoInstanceofOnDomainEvent'; regex = /instanceof\s+(ItemCaptured|SynthesisPerformed|LocationDiscovered|DomainEvent)\b/
                   description = 'Observer defeated by instanceof — subscribe per event class' }
    // HK-001: every source of HUD noise draws from FrameEntropy.
    IllegalRegex { name = 'NoRandomInViewComponent'; regex = /new\s+Random\s*\(\s*\)/; applyToFileNames = '*Component.groovy'
                   description = 'HK-001: HUD noise must come from FrameEntropy.forFrame(ctx)' }
    // HK-015: every roll in the world comes from a LocusSeed (procgen: Strict Determinism).
    IllegalRegex { name = 'NoUnseededRandomInWorld'; regex = /new\s+Random\s*\(\s*\)/; applyToFilesMatching = '.*/main/.*/(model|procgen)/.*'
                   description = 'HK-015: world rolls are seeded — locus.branch(...).nextRandom(), never new Random()' }
    // model invariant 7: the model never touches the journal.
    IllegalClassReference { name = 'ModelNeverTouchesJournal'; classNames = 'com.endlesstransit.core.JournalManager'
                            applyToFilesMatching = '.*/main/.*/model/.*'; description = 'model invariant 7: publish an event instead' }
    // model: strict UI decoupling — use the injected OutputFormatter fmt.
    IllegalPackageReference { name = 'ModelNeverImportsUi'; packageNames = 'com.endlesstransit.ui'
                              applyToFilesMatching = '.*/main/.*/model/.*'; description = 'model must not import com.endlesstransit.ui' }
    // WF-009 (CODEX § 4, principle 2): a non-private static method with a body is a rule nobody owns. Private static helpers
    // are exempt (they live inside their owner). The allow-list below is today's debt (75 statics, 2026-09-20), each with its
    // reason; it only shrinks — remove a file in the commit that de-staticises it. Not baselined on purpose: the baseline
    // records no reason (probe 2026-09-20: baseline entries match one-for-one, so a second hit in a listed file would still fire).
    //   Main (entry point) · Terminal (box/ANSI formatting) · Logger (process-wide sink) · FrameEntropy (the one blessed Random derivation)
    //   Gematria (pure function on a string)
    //   SyncManager, WorldGenesis, ReplayService, SeedVault, SeedScanner (entry points taking the factory as a parameter, HK-008)
    //   ScreenshotRegistry, CaptureService, VisualAssertionEngine, TUIValidator, SessionRecap (diagnostic tooling)
    IllegalRegex { name = 'NoNewStaticLogic'; regex = /(?m)^\s*(public\s+|protected\s+)?static\s+(?!final\b)[\w<>\[\], ?]+\s+\w+\s*\(/
                   applyToFilesMatching = '.*/main/.*'
                   doNotApplyToFileNames = 'Main.groovy,Terminal.groovy,Logger.groovy,FrameEntropy.groovy,Gematria.groovy,' +
                                           'SyncManager.groovy,WorldGenesis.groovy,ReplayService.groovy,SeedVault.groovy,SeedScanner.groovy,' +
                                           'ScreenshotRegistry.groovy,CaptureService.groovy,VisualAssertionEngine.groovy,TUIValidator.groovy,SessionRecap.groovy'
                   description = 'WF-009: a static method holds a rule nobody owns — build a value object or a service (allow-list in vinc-ruleset.groovy)' }
}
