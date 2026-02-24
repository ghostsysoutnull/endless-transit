package com.endlesstransit

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class JournalManager {
    private static final String JOURNAL_FILE = "journal.txt"

    static void saveSession(Player player) {
        def now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        
        StringBuilder sb = new StringBuilder()
        sb.append("======================================================================
")
        sb.append("SESSION_LOG: $now
")
        sb.append("======================================================================

")
        
        sb.append("STATISTICS:
")
        sb.append(" - Distance Traversed: ${player.stepCount} units
")
        sb.append(" - Data Fragments in Buffer: ${player.inventory.size()}

")
        
        sb.append("FINAL_INVENTORY:
")
        if (player.inventory.isEmpty()) {
            sb.append(" - (No items collected)
")
        } else {
            player.inventory.each { item ->
                sb.append(" [${String.format("%04d", item.frequency)}Hz] ${item.name}
")
            }
        }
        sb.append("
")
        
        sb.append("CHRONOLOGICAL_HISTORY (Macro-Scale):
")
        if (player.visitedPaths.isEmpty()) {
            sb.append(" - (No records)
")
        } else {
            player.visitedPaths.each { path ->
                sb.append(" >> $path
")
            }
        }
        sb.append("

")
        
        try {
            new File(JOURNAL_FILE).append(sb.toString())
            println Terminal.colorize(">>> System telemetry saved to $JOURNAL_FILE", Terminal.GREEN)
        } catch (Exception e) {
            Logger.error("Failed to save journal entry", e)
        }
    }
}
