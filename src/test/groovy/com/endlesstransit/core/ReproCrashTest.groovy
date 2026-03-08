package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.ActionMapper
import groovy.test.GroovyTestCase

class ReproCrashTest extends GroovyTestCase {
    void testGetActionNameWithNull() {
        def mapper = new ActionMapper()
        // Simulate initialization as in Game constructor/start
        mapper.currentActionMap = [:]
        mapper.previousActionMap = [:]
        
        println "Testing getActionName(null)..."
        try {
            def name = mapper.getActionName(null)
            assertEquals("", name)
            println "SUCCESS: getActionName(null) returned empty string."
        } catch (Throwable t) {
            println "FAILURE: getActionName(null) threw exception: ${t}"
            t.printStackTrace()
            throw t
        }
    }

    void testGetActionNameWithUnknownKey() {
        def mapper = new ActionMapper()
        mapper.currentActionMap = ["01": "01. Open Door"]
        
        println "Testing getActionName('unknown')..."
        try {
            def name = mapper.getActionName("unknown")
            assertEquals("unknown", name)
            println "SUCCESS: getActionName('unknown') returned 'unknown'."
        } catch (Throwable t) {
            println "FAILURE: getActionName('unknown') threw exception: ${t}"
            t.printStackTrace()
            throw t
        }
    }
}
