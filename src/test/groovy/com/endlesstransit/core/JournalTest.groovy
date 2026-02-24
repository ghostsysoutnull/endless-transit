package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

import groovy.test.GroovyTestCase

class JournalTest extends GroovyTestCase {
    void testSaveSession() {
        // Use a test-specific file
        String testFile = "journal_test.txt"
        JournalManager.reset()
        JournalManager.JOURNAL_FILE = testFile
        
        Player p = new Player()
        p.stepCount = 10
        JournalManager.startSession(p)
        
        p.stepCount = 42
        p.inventory.add(new InventoryItem("Test Fragment", 1234))
        JournalManager.logCapture(p.inventory[0])
        JournalManager.logDiscovery("Universe > Alpha > Building 1")
        
        File f = new File(testFile)
        JournalManager.saveSession(p)
        
        assertTrue("Journal file should exist", f.exists())
        
        String content = f.text
        assertTrue("Journal should contain step delta", content.contains("Temporal Displacement: 32"))
        assertTrue("Journal should contain captured item in manifest", content.contains("[OBJ] Test Fragment"))
        assertTrue("Journal should contain discovery in manifest", content.contains("[LOC] Universe > Alpha > Building 1"))
        assertTrue("Journal should have summary header", content.contains("--- SESSION_EXECUTIVE_SUMMARY ---"))
        
        // Cleanup
        f.delete()
        println "SUCCESS: Journal entry verified."
    }
}
