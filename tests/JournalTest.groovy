package com.endlesstransit

import groovy.test.GroovyTestCase

class JournalTest extends GroovyTestCase {
    void testSaveSession() {
        Player p = new Player()
        p.stepCount = 42
        p.inventory.add(new InventoryItem("Test Fragment", 1234))
        p.visitedPaths.add("Universe > Alpha > Building 1")
        
        File f = new File("journal.txt")
        long initialSize = f.exists() ? f.length() : 0
        
        JournalManager.saveSession(p)
        
        assertTrue("Journal file should exist", f.exists())
        assertTrue("Journal file should have grown", f.length() > initialSize)
        
        String content = f.text
        assertTrue("Journal should contain step count", content.contains("Distance Traversed: 42"))
        assertTrue("Journal should contain item name", content.contains("Test Fragment"))
        assertTrue("Journal should contain visited path", content.contains("Universe > Alpha > Building 1"))
        
        println "SUCCESS: Journal entry verified."
    }
}
