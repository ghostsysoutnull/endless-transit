package com.endlesstransit

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.io.*

class JournalManager {
    private static final String JOURNAL_FILE = "journal.txt"
    private static BufferedWriter writer

    private static void ensureOpen() {
        if (writer == null) {
            writer = new BufferedWriter(new FileWriter(JOURNAL_FILE, true))
        }
    }

    static void startSession() {
        ensureOpen()
        def now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        writer.write("\n======================================================================\n")
        writer.write("SESSION_START: $now\n")
        writer.write("======================================================================\n")
        writer.flush()
    }

    static void logDiscovery(String path) {
        ensureOpen()
        writer.write("[DISCOVERY] $path\n")
        writer.flush()
    }

    static void logCapture(InventoryItem item) {
        ensureOpen()
        writer.write("[CAPTURE]   ${item.name} (${String.format("%04d", item.frequency)}Hz)\n")
        writer.flush()
    }
    
    static void logSynthesis(InventoryItem item) {
        ensureOpen()
        writer.write("[SYNTHESIS] ${item.name} (${String.format("%04d", item.frequency)}Hz)\n")
        writer.flush()
    }

    static void saveSession(Player player) {
        ensureOpen()
        writer.write("\n--- SESSION_SUMMARY ---\n")
        writer.write("Distance Traversed: ${player.stepCount} units\n")
        writer.write("Final Buffer Size: ${player.inventory.size()}\n")
        writer.write("======================================================================\n")
        writer.write("SESSION_END\n\n")
        writer.flush()
        writer.close()
        writer = null
        
        println Terminal.colorize(">>> Neural link severed. Journal data synchronized to $JOURNAL_FILE", Terminal.GREEN)
    }
}
