package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
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
        String lastEntryFile = "journal-last-entry_test.txt"
        JournalManager.reset()
        JournalManager.JOURNAL_FILE = testFile
        JournalManager.LAST_ENTRY_FILE = lastEntryFile
        
        Player p = new Player()
        p.stepCount = 10
        JournalManager.startSession(p)
        
        // Wait a bit to have some duration
        Thread.sleep(1100)
        
        p.stepCount = 42
        p.inventory.add(new InventoryItem("Test Fragment", 1234))
        JournalManager.logCapture(p.inventory[0])
        JournalManager.logDiscovery("Universe > Alpha > Building 1")
        
        File f = new File(testFile)
        File fLast = new File(lastEntryFile)
        JournalManager.saveSession(p)
        
        assertTrue("Journal file should exist", f.exists())
        assertTrue("Last entry file should exist", fLast.exists())
        
        String content = f.text
        assertTrue("Journal should contain step delta", content.contains("Temporal Displacement: 32"))
        assertTrue("Journal should contain captured item in manifest", content.contains("[OBJ] Test Fragment"))
        assertTrue("Journal should contain discovery in manifest", content.contains("[LOC] Universe > Alpha > Building 1"))
        assertTrue("Journal should have summary header", content.contains("--- SESSION_EXECUTIVE_SUMMARY ---"))
        assertTrue("Journal should have duration", content.contains("Session Duration:"))
        assertTrue("Journal should have end timestamp", content.contains("SESSION_END:"))
        
        String lastContent = fLast.text
        assertTrue("Last entry should contain snapshot header", lastContent.contains("LAST_SESSION_SNAPSHOT"))
        assertTrue("Last entry should contain chronological discovery", lastContent.contains("[DISCOVERY] Universe > Alpha > Building 1"))
        assertTrue("Last entry should contain chronological capture", lastContent.contains("[CAPTURE]   Test Fragment"))
        assertTrue("Last entry should contain summary", lastContent.contains("--- SESSION_EXECUTIVE_SUMMARY ---"))
        assertTrue("Last entry should contain captured item in manifest", lastContent.contains("[OBJ] Test Fragment"))
        
        // Cleanup
        f.delete()
        fLast.delete()
        Terminal.println "SUCCESS: Journal entry verified."
    }
}
