package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import com.endlesstransit.procgen.LocusSeed
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager
import com.endlesstransit.procgen.ProceduralFactory
import groovy.transform.CompileStatic

@CompileStatic
class NullSector extends Container {
    String name
    int signalStrength = 0
    int echoFrequency = 0
    boolean echoFound = false

    @Override
    String getIndexLabel() {
        return "VOID"
    }

    @Override
    String getStatusSummary() {
        return signalStrength > 0 ? "SIGNAL: ${signalStrength}%" : "SIGNAL: [SCAN_REQUIRED]"
    }

    NullSector(String name, LocusSeed locus = new LocusSeed(0)) {
        this.name = name
        this.locus = locus
        Random r = locus.value != 0 ? new Random(locus.value) : new Random()
        this.echoFrequency = r.nextInt(9000) + 1000
    }

    @Override
    String getCoordinates() { return "0x0000 / UNKNOWN" }

    @Override
    String getPath() { return "Universe > ... > [VOID]" }

    @Override
    void populateChildren() {
        ProceduralFactory.populateNullSector(this)
    }

    @Override
    String getDescription() {
        if (echoFound) {
            return "A silent void. The spectral resonance has been harvested."
        }
        String status = "Searching for signals..."
        if (signalStrength > 0) {
            status = "SIGNAL_STRENGTH: ${signalStrength}% | FREQ_DRIFT: ${echoFrequency}Hz"
        }
        return "A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.\n" +
               Terminal.colorize("[VOID_STATUS: $status]", Terminal.MAGENTA)
    }

    @Override
    void processAction(Player player) {
        // No automatic captures anymore, must use 'scan'
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        lines << "Faint gravitational anomalies detected:"
        lines << "-" * 40
        
        List<Location> ch = getChildren()
        for (int i = 0; i < ch.size(); i += 2) {
            Location sL = ch[i]
            Location sR = (i + 1 < ch.size()) ? ch[i+1] : (Location)null
            
            String labelL = String.format("%02d. %s", i + 1, sL.getName())
            if (sL.isVisited()) labelL += " [V]"
            
            String labelR = ""
            if (sR != null) {
                labelR = String.format("%02d. %s", i + 2, sR.getName())
                if (sR.isVisited()) labelR += " [V]"
            }
            
            lines << String.format("%-40s | %-40s", labelL, labelR)
        }
        lines << "-" * 40
        return lines
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Map<String, Closure> options = getBaseOptions(game)
        
        if (!echoFound) {
            options["s. Scan for spectral echoes"] = {
                signalStrength += new Random().nextInt(30) + 10
                if (signalStrength >= 100) {
                    signalStrength = 100
                    println Terminal.colorize("\n>>> HARMONIC_LOCK_ESTABLISHED: Spectral Echo isolated.", Terminal.GREEN)
                } else {
                    println Terminal.colorize("\n>>> SCANNING_VOID: Signal strength increasing...", Terminal.CYAN)
                }
                game.instantRender = true
            }
            
            if (signalStrength >= 100) {
                options["c. Capture Spectral Echo"] = {
                    InventoryItem item = new InventoryItem("Spectral Echo", echoFrequency)
                    game.player.inventory.add(item)
                    JournalManager.logCapture(item)
                    echoFound = true
                    signalStrength = 0
                    println Terminal.colorize("\n>>> VOID_RESONANCE: Echo captured and stabilized.", Terminal.MAGENTA)
                    game.instantRender = true
                }
            }
        }

        List<Location> ch = getChildren()
        for (int i = 0; i < ch.size(); i++) {
            Location system = ch[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Detect faint signal: ${system.getName()}"
            options[label] = { game.enterLocation(system) }
        }
        return options
    }
}
