package com.endlesstransit.core

import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-015 item 4: the help line offers `q: Terminate`, so `q` must reach the quit command.
 * HK-020 step 0: pins today's normalize contract before the alias/case rules move to GlobalCommands.
 */
class InputHandlerNormalizeTest {

    private final InputHandler handler = new InputHandler(new MockInputSource([]))

    @Test
    void q_isQuit() {
        assertEquals("quit", handler.normalize("q", null))
        assertEquals("quit", handler.normalize("Q", null))
    }

    @Test
    void existingAliasesHold() {
        assertEquals("map", handler.normalize("m", null))
        assertEquals("quit", handler.normalize("QUIT", null))
        assertEquals("help", handler.normalize("?", null))
        assertEquals("01", handler.normalize("01", null), "A navigation choice passes through untouched")
    }

    /** HK-020 c0: the six any-case words (guide :102) — each row moves to GlobalCommandsContractTest in c1. */
    @Test
    void anyCaseWordsAreLowered() {
        ["i", "sync", "map", "lattice", "glitch", "help"].each { String word ->
            assertEquals(word, handler.normalize(word.toUpperCase(), null), "$word is accepted in any case")
        }
    }

    /** HK-020 c0: the exact-case keys (guide :103) pass through as typed — `S` is not `s`, `p` is not `P`. */
    @Test
    void exactCaseKeysPassThroughUntouched() {
        ["S", "LL", "QUITNOW", "p", "P", "s", "ll", "quitnow"].each { String key ->
            assertEquals(key, handler.normalize(key, null), "$key is not rewritten")
        }
    }

    /** HK-020 c0: the two non-command rules — these stay in normalize after c1. */
    @Test
    void endOfInputIsQuit() {
        assertEquals("quit", handler.normalize(null, "01"))
    }

    @Test
    void emptyLineRepeatsTheLastChoice() {
        assertEquals("01", handler.normalize("", "01"))
        assertEquals("-2", handler.normalize("", null), "No last choice: the loop asks again")
    }
}
