package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * Regenerates the Phase 7-0 golden frames under src/test/groovy/com/endlesstransit/ui/golden.
 *
 * NOT a test. It has no @Test methods, so JUnit discovery ignores it, and it is the only
 * code allowed to write into the golden directory. Run it through `./vinc.sh --goldens`
 * ONLY after an intended visual change, then review `git diff` on the goldens and commit
 * them together with the change that caused them. Stale golden files are removed so a
 * renamed or dropped frame cannot linger.
 *
 * It calls the same HudFrameHarness.captureAll() that BridgeViewGoldenFrameTest compares
 * against, so generator and test cannot drift.
 */
@CompileStatic
class GoldenFrameGenerator {

    static void main(String[] args) {
        Terminal.initialize(true, true, true)   // clinical: no console echo while capturing
        Map<String, List<String>> frames = HudFrameHarness.captureAll().via

        File dir = HudFrameHarness.GOLDEN_DIR
        dir.mkdirs()
        File[] stale = dir.listFiles({ File f -> f.name.endsWith(".txt") } as FileFilter)
        stale?.each { File f -> f.delete() }

        int totalLines = 0
        frames.each { String name, List<String> lines ->
            HudFrameHarness.writeGolden(HudFrameHarness.goldenFile(name), lines)
            totalLines += lines.size()
            System.err.println("golden: ${name} (${lines.size()} lines)")
        }
        System.err.println("DONE frames=${frames.size()} lines=${totalLines} dir=${dir.path}")
    }
}
