package com.endlesstransit.core
import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.*
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

class JournalTest {
    @Test
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
        Thread.sleep(50)
        
        p.stepCount = 42
        p.inventory.add(new InventoryItem("Test Fragment", 1234))
        JournalManager.logCapture(p.inventory[0])
        JournalManager.logDiscovery("Universe > Alpha > Building 1")
        
        File f = new File(testFile)
        File fLast = new File(lastEntryFile)
        JournalManager.saveSession(p)
        
        assertTrue(f.exists(), "Journal file should exist")
        assertTrue(fLast.exists(), "Last entry file should exist")
        
        String content = f.text
        assertTrue(content.contains("Temporal Displacement: 32"), "Journal should contain step delta")
        assertTrue(content.contains("[OBJ] Test Fragment"), "Journal should contain captured item in manifest")
        assertTrue(content.contains("[LOC] Universe > Alpha > Building 1"), "Journal should contain discovery in manifest")
        assertTrue(content.contains("--- SESSION_EXECUTIVE_SUMMARY ---"), "Journal should have summary header")
        assertTrue(content.contains("Session Duration:"), "Journal should have duration")
        assertTrue(content.contains("SESSION_END:"), "Journal should have end timestamp")
        
        String lastContent = fLast.text
        assertTrue(lastContent.contains("LAST_SESSION_SNAPSHOT"), "Last entry should contain snapshot header")
        assertTrue(lastContent.contains("[DISCOVERY] Universe > Alpha > Building 1"), "Last entry should contain chronological discovery")
        assertTrue(lastContent.contains("[CAPTURE]   Test Fragment"), "Last entry should contain chronological capture")
        assertTrue(lastContent.contains("--- SESSION_EXECUTIVE_SUMMARY ---"), "Last entry should contain summary")
        assertTrue(lastContent.contains("[OBJ] Test Fragment"), "Last entry should contain captured item in manifest")
        
        // Cleanup
        f.delete()
        fLast.delete()
        Terminal.println "SUCCESS: Journal entry verified."
    }
}
