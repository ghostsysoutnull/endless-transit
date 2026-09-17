package com.endlesstransit.core

import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/** HK-015 item 4: the help line offers `q: Terminate`, so `q` must reach the quit command. */
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
}
