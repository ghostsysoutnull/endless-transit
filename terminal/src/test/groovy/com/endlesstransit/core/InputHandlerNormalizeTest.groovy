package com.endlesstransit.core

import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-020: normalize owns only the two non-command rules (EOF → quit, empty line → repeat) and passes
 * everything else through as typed. Global words, aliases and case are pinned in GlobalCommandsContractTest.
 * (HK-015 item 4's `q` → quit pin lives there now.)
 */
class InputHandlerNormalizeTest {

    private final InputHandler handler = new InputHandler(new MockInputSource([]))

    @Test
    void endOfInputIsQuit() {
        assertEquals("quit", handler.normalize(null, "01"))
    }

    @Test
    void emptyLineRepeatsTheLastChoice() {
        assertEquals("01", handler.normalize("", "01"))
        assertEquals("-2", handler.normalize("", null), "No last choice: the loop asks again")
    }

    /** Words, keys and navigation choices all pass through untouched — resolution happens in dispatch. */
    @Test
    void everythingElsePassesThroughAsTyped() {
        ["01", "MAP", "q", "?", "S", "LL", "QUITNOW", "p", "P"].each { String input ->
            assertEquals(input, handler.normalize(input, null), "$input is not rewritten")
        }
    }
}
