package com.endlesstransit.core

import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/** HK-015 item 3: `--seed <n>` reaches the game. The launchers already pass their arguments to Main. */
class LaunchArgsTest {

    @Test
    void seedFlag_yieldsTheSeed() {
        assertEquals(4660L, new LaunchArgs(["--seed", "4660"] as String[]).seed)
        assertEquals(-7L, new LaunchArgs(["--compile", "--seed", "-7"] as String[]).seed, "Other options may come first")
    }

    @Test
    void noFlag_yieldsNull() {
        assertNull(new LaunchArgs([] as String[]).seed)
        assertNull(new LaunchArgs(["--compile"] as String[]).seed)
        assertNull(new LaunchArgs(null).seed)
    }

    @Test
    void flagWithoutAWholeNumber_isRefused() {
        assertThrows(IllegalArgumentException) { new LaunchArgs(["--seed"] as String[]) }
        assertThrows(IllegalArgumentException) { new LaunchArgs(["--seed", "x"] as String[]) }
        assertThrows(IllegalArgumentException) { new LaunchArgs(["--seed", "1.5"] as String[]) }
    }
}
