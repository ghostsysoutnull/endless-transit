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
    // model invariant 7: the model never touches the journal.
    IllegalClassReference { name = 'ModelNeverTouchesJournal'; classNames = 'com.endlesstransit.core.JournalManager'
                            applyToFilesMatching = '.*/main/.*/model/.*'; description = 'model invariant 7: publish an event instead' }
    // model: strict UI decoupling — use the injected OutputFormatter fmt.
    IllegalPackageReference { name = 'ModelNeverImportsUi'; packageNames = 'com.endlesstransit.ui'
                              applyToFilesMatching = '.*/main/.*/model/.*'; description = 'model must not import com.endlesstransit.ui' }
}
