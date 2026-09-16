package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.*
import com.endlesstransit.ui.Terminal


class Player {
    List<InventoryItem> inventory
    Location currentLocation
    /** Domain event channel; GameState hands in its bus, a standalone Player gets an inert one (Phase 10). */
    final EventBus events
    int stepCount = 0
    SynthesisService synthesisService = new SynthesisService()
    Set<String> visitedLIPs = new LinkedHashSet<>()
    // visitedPaths is intentionally absent from GameMemento.
    // It is populated by SyncManager during session persistence but is never read by
    // any game logic or UI renderer — only visitedLIPs drives rendering
    // (Building.groovy, Corridor.groovy, SessionRecap.groovy).
    // Omitting it from the memento is correct; it carries no load-bearing state.
    Set<String> visitedPaths = new LinkedHashSet<>()
    int resonantTracesCount = 0
    int coherence = 100
    int maxCoherence = 100

    Player(EventBus events = new EventBus()) {
        this.events = events
        inventory = new ArrayList<InventoryItem>()
        stepCount = 0
        coherence = 100
    }

    void markFootprint(Location location) {
        String lip = location.getLIP()
        visitedLIPs.add(lip)
        
        // Also track high-level paths for the journal/HUD
        boolean isMacro = !(location instanceof Floor || location instanceof Corridor || 
                            location instanceof Apartment || location instanceof Room)
        if (isMacro) {
            visitedPaths.add(location.getPath())
        }
    }

    void adjustCoherence(Number delta) {
        coherence = Math.min(maxCoherence, Math.max(0, (coherence + delta.toDouble()) as int))
    }

    /**
     * The one way an item enters the buffer from the world: adds it and publishes
     * ItemCaptured so the journal and the ritual tracker can react (Phase 10).
     */
    void capture(InventoryItem item, Location where) {
        inventory.add(item)
        events.publish(new ItemCaptured(item, where))
    }

    void dropItem(int index) {
        if (index >= 0 && index < inventory.size()) {
            def removed = inventory.remove(index)
            Logger.info("Player dropped item: ${removed.name}")
            Terminal.println Terminal.colorize(">>> Item ${removed.name} purged from local buffer.", Terminal.RED)
        }
    }

    void mergeItems(int idx1, int idx2, Location location = null) {
        if (idx1 == idx2) return
        if (idx1 < 0 || idx1 >= inventory.size() || idx2 < 0 || idx2 >= inventory.size()) return

        // Take items out
        def item1 = inventory[Math.max(idx1, idx2)]
        inventory.remove(Math.max(idx1, idx2))
        def item2 = inventory[Math.min(idx1, idx2)]
        inventory.remove(Math.min(idx1, idx2))

        InventoryItem hybrid = synthesisService.synthesize(item1, item2, location, inventory)
        inventory.add(hybrid)
        events.publish(new SynthesisPerformed(hybrid, location))

        if (hybrid.isKeystone) {
            Logger.info("KEYSTONE_CREATED: ${hybrid.name}")
            Terminal.println Terminal.colorize("\n>>> CRITICAL_WAVEFORM_COLLAPSE: KEYSTONE_STABILIZED <<<", Terminal.YELLOW)
            Terminal.println "The fragments merge into a silent, heavy anchor: ${Terminal.bold(hybrid.name)}"
        } else {
            Logger.info("Synthesized Hybrid: ${hybrid.name} (${hybrid.frequency.value} Hz)")
            Terminal.println Terminal.colorize("\n>>> SPECTRAL_SYNTHESIS_COMPLETE <<<", Terminal.L_CYAN)
            Terminal.println "New Fragment: ${Terminal.bold(hybrid.name)} (${hybrid.frequency.value}Hz)"
        }

        if (hybrid.frequency.isResonant()) {
            resonantTracesCount++
            Terminal.println Terminal.colorize("!!! RESONANCE DETECTED: Waveform stabilized !!!", Terminal.GREEN)
        }
    }
}
