package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.io.*
import java.nio.file.Files

class JournalManager {
    static String JOURNAL_FILE = "journal.txt"
    private static final String TEMP_MANIFEST = ".journal_session_tmp"
    private static BufferedWriter writer
    private static int sessionCaptures = 0
    private static int sessionSyntheses = 0
    private static int sessionDiscoveries = 0
    private static int startStepCount = 0

    private static void ensureOpen() {
        if (writer == null) {
            writer = new BufferedWriter(new FileWriter(JOURNAL_FILE, true))
        }
    }

    static void startSession(Player player) {
        ensureOpen()
        startStepCount = player.stepCount
        sessionCaptures = 0
        sessionSyntheses = 0
        sessionDiscoveries = 0
        
        // Clear/Create temp manifest
        new File(TEMP_MANIFEST).text = ""
        
        def now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        writer.write("\n======================================================================\n")
        writer.write("SESSION_START: $now\n")
        writer.write("======================================================================\n")
        writer.flush()
    }

    private static void writeToManifest(String entry) {
        new File(TEMP_MANIFEST).append(entry + "\n")
    }

    static void logDiscovery(String path, Location location = null) {
        ensureOpen()
        sessionDiscoveries++
        
        String vibeInfo = ""
        if (location != null) {
            def v = location.getVibe()
            if (v != null) {
                vibeInfo = " [Era: ${v.timeline}, Resonance: ${v.primaryCulture}]"
            }
        }
        
        writer.write("[DISCOVERY] $path$vibeInfo\n")
        writer.flush()
        writeToManifest("  >> [LOC] $path$vibeInfo")
    }

    static void logCapture(InventoryItem item) {
        ensureOpen()
        sessionCaptures++
        writer.write("[CAPTURE]   ${item.name} (${String.format("%04d", item.frequency)}Hz)\n")
        writer.flush()
        writeToManifest("  >> [OBJ] ${item.name} (${item.frequency}Hz)")
    }
    
    static void logSynthesis(InventoryItem item) {
        ensureOpen()
        sessionSyntheses++
        writer.write("[SYNTHESIS] ${item.name} (${String.format("%04d", item.frequency)}Hz)\n")
        writer.flush()
        writeToManifest("  >> [SYN] ${item.name} (${item.frequency}Hz)")
    }

    static void saveSession(Player player, String endReason = "TERMINATE_LINK") {
        ensureOpen()
        int totalSteps = player.stepCount - startStepCount
        
        writer.write("\n--- SESSION_EXECUTIVE_SUMMARY ---\n")
        writer.write("Termination Status:  $endReason\n")
        writer.write("Temporal Displacement: $totalSteps units\n")
        writer.write("Network Expansion:     $sessionDiscoveries macro-locations mapped\n")
        writer.write("Data Acquisition:      $sessionCaptures fragments captured\n")
        writer.write("Signal Processing:     $sessionSyntheses waveforms synthesized\n")
        
        writer.write("\nSESSION_MANIFEST:\n")
        File temp = new File(TEMP_MANIFEST)
        if (temp.exists()) {
            // Stream the manifest into the main journal to keep memory usage low
            temp.eachLine { line ->
                writer.write(line + "\n")
            }
            temp.delete()
        }
        
        writer.write("\n======================================================================\n")
        writer.write("SESSION_END\n\n")
        writer.flush()
        writer.close()
        writer = null
        
        println Terminal.colorize(">>> Neural link severed. Session summary synchronized to $JOURNAL_FILE", Terminal.GREEN)
    }

    /**
     * Resets the manager for testing.
     */
    static void reset() {
        if (writer != null) {
            writer.close()
            writer = null
        }
        sessionCaptures = 0
        sessionSyntheses = 0
        sessionDiscoveries = 0
        startStepCount = 0
    }
}
