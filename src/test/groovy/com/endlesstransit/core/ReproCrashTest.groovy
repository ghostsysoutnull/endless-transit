package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.ActionMapper
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

class ReproCrashTest {
    @Test
    void testGetActionNameWithNull() {
        def mapper = new ActionMapper()
        // Simulate initialization as in Game constructor/start
        mapper.currentActionMap = [:]
        mapper.previousActionMap = [:]
        
        Terminal.println "Testing getActionName(null)..."
        try {
            def name = mapper.getActionName(null)
            assertEquals("", name)
            Terminal.println "SUCCESS: getActionName(null) returned empty string."
        } catch (Throwable t) {
            Terminal.println "FAILURE: getActionName(null) threw exception: ${t}"
            t.printStackTrace()
            throw t
        }
    }

    @Test
    void testGetActionNameWithUnknownKey() {
        def mapper = new ActionMapper()
        mapper.currentActionMap = ["01": "01. Open Door"]
        
        Terminal.println "Testing getActionName('unknown')..."
        try {
            def name = mapper.getActionName("unknown")
            assertEquals("unknown", name)
            Terminal.println "SUCCESS: getActionName('unknown') returned 'unknown'."
        } catch (Throwable t) {
            Terminal.println "FAILURE: getActionName('unknown') threw exception: ${t}"
            t.printStackTrace()
            throw t
        }
    }
}
