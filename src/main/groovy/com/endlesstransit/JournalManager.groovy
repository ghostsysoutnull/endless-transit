package com.endlesstransit

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class JournalManager {
    private static final String JOURNAL_FILE = "journal.txt"

    static void saveSession(Player player) {
        def now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        
        StringBuilder sb = new StringBuilder()
        sb.append("======================================================================\n")
        sb.append("SESSION_LOG: $now\n")
        sb.append("======================================================================\n\n")
        
        sb.append("STATISTICS:\n")
        sb.append(" - Distance Traversed: ${player.stepCount} units\n")
        sb.append(" - Data Fragments in Buffer: ${player.inventory.size()}\n\n")
        
        sb.append("FINAL_INVENTORY:\n")
        if (player.inventory.isEmpty()) {
            sb.append(" - (No items collected)\n")
        } else {
            player.inventory.each { item ->
                sb.append(" [${String.format("%04d", item.frequency)}Hz] ${item.name}\n")
            }
        }
        sb.append("\n")
        
        sb.append("CHRONOLOGICAL_HISTORY (Macro-Scale):\n")
        if (player.visitedPaths.isEmpty()) {
            sb.append(" - (No records)\n")
        } else {
            player.visitedPaths.each { path ->
                sb.append(" >> $path\n")
            }
        }
        sb.append("\n\n")
        
        try {
            new File(JOURNAL_FILE).append(sb.toString())
            println Terminal.colorize(">>> System telemetry saved to $JOURNAL_FILE", Terminal.GREEN)
        } catch (Exception e) {
            Logger.error("Failed to save journal entry", e)
        }
    }
}
