package com.endlesstransit.procgen

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-007: each child of a filament rolls its own 30% NullSector chance.
 *
 * Before the 2026-03-10 seed migration the loop advanced a stateful Random per child
 * (r.nextInt(10) < 3). The migration replaced it with f.locus.nextInt(100), which is pure,
 * so every child of a filament got the same roll and filaments were all-void or all-matter.
 * Two properties distinguish the intended behavior from the regression: the overall rate
 * (both give ~30%) and mixing within a filament (only per-child rolls produce it).
 */
class FilamentNullRollTest {

    @BeforeEach
    void setUp() {
        Terminal.initialize(true, true)
    }

    @Test
    void nullSectorRoll_isPerChild_andNearThirtyPercent() {
        int nulls = 0, total = 0, mixedFilaments = 0, filaments = 0
        for (long seed = 1L; seed <= 60L; seed++) {
            Universe u = ProceduralFactory.instance.createUniverse(new LocusSeed(seed))
            for (CosmicFilament f : u.getFilaments()) {
                List<Location> kids = f.getChildren()
                int n = kids.count { it instanceof NullSector } as int
                nulls += n
                total += kids.size()
                filaments++
                if (n > 0 && n < kids.size()) mixedFilaments++
            }
        }
        double rate = nulls / (double) total
        assertTrue(total > 500, "sample too small: $total children")
        assertTrue(rate >= 0.22 && rate <= 0.38, "NullSector rate should be ~30%, was ${Math.round(rate * 100)}% ($nulls/$total)")
        assertTrue(mixedFilaments > filaments * 0.3,
            "per-child rolls must produce filaments mixing null and matter sectors; mixed=$mixedFilaments of $filaments")
    }
}
