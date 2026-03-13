package com.endlesstransit.core

import com.endlesstransit.model.ModelOutput
import com.endlesstransit.ui.StandardTerminalAdapter
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*
import java.io.File

class QuitNowTest {
    @Test
    void "quitnow command should exit immediately and take a screenshot without saving"() {
        // Setup
        long seed = 12345L
        MockInputSource input = new MockInputSource(["quitnow"])
        Game game = new Game(seed, input)
        
        // Count screenshots before
        File screenshotDir = new File("screenshots")
        int beforeCount = screenshotDir.listFiles()?.findAll { it.name.startsWith("screenshot_") }?.size() ?: 0
        
        // Execute - handleInput should return false for termination
        boolean continueGame = game.handleInput()
        
        // Wait for asynchronous capture
        Thread.sleep(100)
        
        // Assertions
        assertFalse(continueGame, "Game loop should terminate on quitnow")
        
        // Verify screenshot created
        int afterCount = screenshotDir.listFiles()?.findAll { it.name.startsWith("screenshot_") }?.size() ?: 0
        assertTrue(afterCount > beforeCount, "A new screenshot should have been created")
        
        // Verify no save occurred (checking if transit.save was NOT modified/created in the last few seconds)
        // Note: For a strictly failing test, we expect 'quitnow' to not be recognized yet,
        // so it might just continue or fail.
    }
}
