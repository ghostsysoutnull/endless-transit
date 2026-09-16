package com.endlesstransit.core

import com.endlesstransit.model.Location
import com.endlesstransit.model.VibeCapsule
import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

import java.time.Duration
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

/**
 * JournalManager: the session scribe. One instance per Game (HK-011): it listens to the
 * domain events it records (attach), keeps the session log and the recent-events ticker
 * feed, and writes the journal files on saveSession. Bodies unchanged from the static
 * version; only ownership moved.
 */
@CompileStatic
class JournalManager {
    String journalFile = "journal.txt"
    String lastEntryFile = "journal-last-entry.txt"
    private static final String TEMP_MANIFEST = ".journal_session_tmp"
    private StringBuilder sessionLog = new StringBuilder()
    private List<String> lastEntries = []
    private int sessionCaptures = 0
    private int sessionSyntheses = 0
    private int sessionDiscoveries = 0
    private int startStepCount = 0
    private LocalDateTime startTime

    void startSession(Player player) {
        startStepCount = player.stepCount
        sessionCaptures = 0
        sessionSyntheses = 0
        sessionDiscoveries = 0
        startTime = LocalDateTime.now()
        sessionLog = new StringBuilder()
        lastEntries = []

        // Clear/Create temp manifest
        new File(TEMP_MANIFEST).text = ""

        String nowStr = startTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        sessionLog.append("\n======================================================================\n")
        sessionLog.append("SESSION_START: $nowStr\n")
        sessionLog.append("======================================================================\n")
    }

    /**
     * Listens to the domain events the journal records (Phase 10; discovery restored in
     * HK-010). One typed subscription per event; the journal never inspects an event's class.
     */
    void attach(EventBus bus) {
        bus.subscribe(ItemCaptured) { ItemCaptured e -> logCapture(e.item) }
        bus.subscribe(SynthesisPerformed) { SynthesisPerformed e -> logSynthesis(e.item) }
        bus.subscribe(LocationDiscovered) { LocationDiscovered e -> logDiscovery(e.path, e.location) }
    }

    private void writeToManifest(String entry) {
        new File(TEMP_MANIFEST).append(entry + "\n")
    }

    void logDiscovery(String path, Location location = null) {
        sessionDiscoveries++

        String vibeInfo = ""
        if (location != null) {
            VibeCapsule v = location.getVibe()
            if (v != null) {
                vibeInfo = " [Era: ${v.timeline}, Resonance: ${v.primaryCulture}]"
            }
        }

        String entry = "[DISCOVERY] $path$vibeInfo"
        sessionLog.append(entry + "\n")
        // Ticker feed (HK-011c): the HUD pane is 37 chars wide, so the ticker shows the
        // location's name; the journal file above keeps the full path.
        lastEntries << "[DISCOVERY] ${location != null ? location.getName() : path}".toString()
        writeToManifest("  >> [LOC] $path$vibeInfo")
    }

    void logCapture(InventoryItem item) {
        sessionCaptures++
        String entry = "[CAPTURE]   ${item.name} (${String.format("%04d", item.frequency.value)}Hz)"
        sessionLog.append(entry + "\n")
        lastEntries << entry
        writeToManifest("  >> [OBJ] ${item.name} (${item.frequency.value}Hz)")
    }

    void logSynthesis(InventoryItem item) {
        sessionSyntheses++
        String entry = "[SYNTHESIS] ${item.name} (${String.format("%04d", item.frequency.value)}Hz)"
        sessionLog.append(entry + "\n")
        lastEntries << entry
        writeToManifest("  >> [SYN] ${item.name} (${item.frequency.value}Hz)")
    }

    List<String> getRecentEvents(int count) {
        if (lastEntries.isEmpty()) return []
        return lastEntries.takeRight(count)
    }

    void saveSession(Player player, String endReason = "TERMINATE_LINK") {
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

        String endNowStr = endTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

        sessionLog.append(summary.toString())
        sessionLog.append("\n======================================================================\n")
        sessionLog.append("SESSION_END: $endNowStr\n")
        sessionLog.append("======================================================================\n\n")

        String fullOutput = sessionLog.toString()

        // Write to main journal (append)
        new File(journalFile).append(fullOutput)

        // Write to last-entry file (overwriting)
        new File(lastEntryFile).text = "LAST_SESSION_SNAPSHOT\n" + fullOutput

        Terminal.println Terminal.colorize(">>> Neural link severed. Session summary synchronized to $journalFile", Terminal.GREEN)
    }

    /**
     * Clears session state without touching any file. Test mirror of startSession(): a Game
     * constructor journals the start-locus discoveries that the real startSession() wipes.
     */
    void reset() {
        sessionCaptures = 0
        sessionSyntheses = 0
        sessionDiscoveries = 0
        startStepCount = 0
        sessionLog = new StringBuilder()
        lastEntries = []
    }
}
