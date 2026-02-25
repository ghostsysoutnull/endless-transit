package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

class Player {
    List<InventoryItem> inventory
    int stepCount = 0
    Set<String> visitedPaths = new LinkedHashSet<>()
    int coherence = 100
    int maxCoherence = 100

    Player() {
        inventory = new ArrayList<InventoryItem>()
        stepCount = 0
        coherence = 100
    }

    void adjustCoherence(Number delta) {
        coherence = Math.min(maxCoherence, Math.max(0, (coherence + delta.toDouble()) as int))
    }

    void listInventory() {
        if (inventory.isEmpty()) {
            println(Terminal.dim("  (Local buffer empty)"))
        } else {
            inventory.eachWithIndex { item, i ->
                String freqStr = String.format("%04d", item.frequency)
                
                // Restore "Graphics"
                int signalStrength = (item.frequency % 100) / 10 + 1
                String signalBar = "█" * signalStrength + "░" * (10 - signalStrength)
                String phase = (item.frequency % 2 == 0) ? "STABLE" : "SHIFTING"
                String signalColor = (phase == "STABLE") ? Terminal.CYAN : Terminal.MAGENTA
                
                print("${Terminal.colorize((i + 1).toString(), Terminal.YELLOW)}. ")
                print("${Terminal.dim(freqStr)}Hz ")
                print(Terminal.colorize(signalBar, signalColor))
                print("${Terminal.dim("[" + phase + "]")}")
                String mergeLabel = ""
                if (item.sessionMergeCount > 0) {
                    String label = item.sessionMergeCount > 1 ? "SYNTHESIS_x${item.sessionMergeCount}" : "NEW_SYNTHESIS"
                    mergeLabel = " " + Terminal.colorize("[" + label + "]", Terminal.GREEN)
                }
                println(" >> ${Terminal.bold(item.name)}$mergeLabel")
            }
        }
    }

    void dropItem(int index) {
        if (index >= 0 && index < inventory.size()) {
            def removed = inventory.remove(index)
            Logger.info("Player dropped item: ${removed.name}")
            println Terminal.colorize(">>> Item ${removed.name} purged from local buffer.", Terminal.RED)
        }
    }

    void mergeItems(int idx1, int idx2) {
        if (idx1 == idx2) return
        if (idx1 < 0 || idx1 >= inventory.size() || idx2 < 0 || idx2 >= inventory.size()) return

        // Take items out
        def item1 = inventory[Math.max(idx1, idx2)]
        inventory.remove(Math.max(idx1, idx2))
        def item2 = inventory[Math.min(idx1, idx2)]
        inventory.remove(Math.min(idx1, idx2))

        // Synthesize
        int newFreq = item1.frequency + item2.frequency
        String newName = "${item1.name.split(' ')[0]}-${item2.name.split(' ')[0]} Hybrid"
        int c1 = item1.sessionMergeCount ?: 0
        int c2 = item2.sessionMergeCount ?: 0
        int newMergeCount = c1 + c2 + 1
        
        def hybrid = new InventoryItem(newName, newFreq, newMergeCount)
        inventory.add(hybrid)
        JournalManager.logSynthesis(hybrid)

        Logger.info("Synthesized Hybrid: $newName ($newFreq Hz)")
        println Terminal.colorize("\n>>> SPECTRAL_SYNTHESIS_COMPLETE <<<", Terminal.L_CYAN)
        println "New Fragment: ${Terminal.bold(newName)} (${newFreq}Hz)"
        
        if (newFreq % 11 == 0) {
            println Terminal.colorize("!!! RESONANCE DETECTED: Waveform stabilized !!!", Terminal.GREEN)
        }
    }
}
