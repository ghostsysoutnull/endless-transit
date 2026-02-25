package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.Duration
import java.io.*
import java.nio.file.Files

class JournalManager {
    static String JOURNAL_FILE = "journal.txt"
    static String LAST_ENTRY_FILE = "journal-last-entry.txt"
    private static final String TEMP_MANIFEST = ".journal_session_tmp"
    private static StringBuilder sessionLog = new StringBuilder()
    private static List<String> lastEntries = []
    private static int sessionCaptures = 0
    private static int sessionSyntheses = 0
    private static int sessionDiscoveries = 0
    private static int startStepCount = 0
    private static LocalDateTime startTime

    static void startSession(Player player) {
        startStepCount = player.stepCount
        sessionCaptures = 0
        sessionSyntheses = 0
        sessionDiscoveries = 0
        startTime = LocalDateTime.now()
        sessionLog = new StringBuilder()
        lastEntries = []
        
        // Clear/Create temp manifest
        new File(TEMP_MANIFEST).text = ""
        
        def nowStr = startTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        sessionLog.append("\n======================================================================\n")
        sessionLog.append("SESSION_START: $nowStr\n")
        sessionLog.append("======================================================================\n")
    }

    private static void writeToManifest(String entry) {
        new File(TEMP_MANIFEST).append(entry + "\n")
    }

    static void logDiscovery(String path, Location location = null) {
        sessionDiscoveries++
        
        String vibeInfo = ""
        if (location != null) {
            def v = location.getVibe()
            if (v != null) {
                vibeInfo = " [Era: ${v.timeline}, Resonance: ${v.primaryCulture}]"
            }
        }
        
        String entry = "[DISCOVERY] $path$vibeInfo"
        sessionLog.append(entry + "\n")
        lastEntries << entry
        writeToManifest("  >> [LOC] $path$vibeInfo")
    }

    static void logCapture(InventoryItem item) {
        sessionCaptures++
        String entry = "[CAPTURE]   ${item.name} (${String.format("%04d", item.frequency)}Hz)"
        sessionLog.append(entry + "\n")
        lastEntries << entry
        writeToManifest("  >> [OBJ] ${item.name} (${item.frequency}Hz)")
    }
    
    static void logSynthesis(InventoryItem item) {
        sessionSyntheses++
        String entry = "[SYNTHESIS] ${item.name} (${String.format("%04d", item.frequency)}Hz)"
        sessionLog.append(entry + "\n")
        lastEntries << entry
        writeToManifest("  >> [SYN] ${item.name} (${item.frequency}Hz)")
    }

    static List<String> getRecentEvents(int count) {
        if (lastEntries.isEmpty()) return []
        return lastEntries.takeRight(count)
    }

    static void saveSession(Player player, String endReason = "TERMINATE_LINK") {
        LocalDateTime endTime = LocalDateTime.now()
        Duration duration = Duration.between(startTime ?: endTime, endTime)
        long seconds = duration.getSeconds()
        long h = (long)(seconds / 3600)
        long m = (long)((seconds % 3600) / 60)
        long s = (long)(seconds % 60)
        String durationStr = String.format("%d:%02d:%02d", h, m, s)
        
        int totalSteps = player.stepCount - startStepCount
        
        StringBuilder summary = new StringBuilder()
        summary.append("\n--- SESSION_EXECUTIVE_SUMMARY ---\n")
        summary.append("Termination Status:  $endReason\n")
        summary.append("Session Duration:    $durationStr\n")
        summary.append("Temporal Displacement: $totalSteps units\n")
        summary.append("Network Expansion:     $sessionDiscoveries macro-locations mapped\n")
        summary.append("Data Acquisition:      $sessionCaptures fragments captured\n")
        summary.append("Signal Processing:     $sessionSyntheses waveforms synthesized\n")
        
        summary.append("\nSESSION_MANIFEST:\n")
        File temp = new File(TEMP_MANIFEST)
        if (temp.exists()) {
            summary.append(temp.text)
            temp.delete()
        }
        
        def endNowStr = endTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        
        sessionLog.append(summary.toString())
        sessionLog.append("\n======================================================================\n")
        sessionLog.append("SESSION_END: $endNowStr\n")
        sessionLog.append("======================================================================\n\n")
        
        String fullOutput = sessionLog.toString()
        
        // Write to main journal (append)
        new File(JOURNAL_FILE).append(fullOutput)
        
        // Write to last-entry file (overwriting)
        new File(LAST_ENTRY_FILE).text = "LAST_SESSION_SNAPSHOT\n" + fullOutput
        
        println Terminal.colorize(">>> Neural link severed. Session summary synchronized to $JOURNAL_FILE", Terminal.GREEN)
    }

    /**
     * Resets the manager for testing.
     */
    static void reset() {
        sessionCaptures = 0
        sessionSyntheses = 0
        sessionDiscoveries = 0
        startStepCount = 0
        sessionLog = new StringBuilder()
        lastEntries = []
    }
}
