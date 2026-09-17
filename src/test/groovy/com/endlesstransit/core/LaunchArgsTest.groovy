package com.endlesstransit.core

import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/** HK-015 item 3: `--seed <n>` reaches the game. The launchers already pass their arguments to Main. */
class LaunchArgsTest {

    @Test
    void seedFlag_yieldsTheSeed() {
        assertEquals(4660L, LaunchArgs.seedFrom(["--seed", "4660"] as String[]))
        assertEquals(-7L, LaunchArgs.seedFrom(["--compile", "--seed", "-7"] as String[]), "Other options may come first")
    }

    @Test
    void noFlag_yieldsNull() {
        assertNull(LaunchArgs.seedFrom([] as String[]))
        assertNull(LaunchArgs.seedFrom(["--compile"] as String[]))
        assertNull(LaunchArgs.seedFrom(null))
    }

    @Test
    void flagWithoutAWholeNumber_isRefused() {
        assertThrows(IllegalArgumentException) { LaunchArgs.seedFrom(["--seed"] as String[]) }
        assertThrows(IllegalArgumentException) { LaunchArgs.seedFrom(["--seed", "x"] as String[]) }
        assertThrows(IllegalArgumentException) { LaunchArgs.seedFrom(["--seed", "1.5"] as String[]) }
    }
}
