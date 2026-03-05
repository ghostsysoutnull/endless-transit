package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.Gematria
import com.endlesstransit.procgen.NameGenerator
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

class NullSector extends Container {
    String name
    int signalStrength = 0
    int echoFrequency = 0
    boolean echoFound = false

    NullSector(String name, long seed = 0) {
        this.name = name
        this.seed = seed
        Random r = seed != 0 ? new Random(seed) : new Random()
        this.echoFrequency = r.nextInt(9000) + 1000
    }

    @Override
    String getCoordinates() { return "0x0000 / UNKNOWN" }

    @Override
    String getPath() { return "Universe > ... > [VOID]" }

    @Override
    void populateChildren() {
        Random random = seed != 0 ? new Random(seed) : new Random()
        // Very sparse: only 1 or 2 systems adrift in the void
        int numSystems = random.nextInt(2) + 1
        for (int i = 0; i < numSystems; i++) {
            addLocation(new SolarSystem("Lost ${NameGenerator.generateSolarSystemName()}", seed != 0 ? seed + i + 1 : 0))
        }
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
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        def options = getBaseOptions(game)
        
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
                    def item = new InventoryItem("Spectral Echo", echoFrequency)
                    game.player.inventory.add(item)
                    JournalManager.logCapture(item)
                    echoFound = true
                    signalStrength = 0
                    println Terminal.colorize("\n>>> VOID_RESONANCE: Echo captured and stabilized.", Terminal.MAGENTA)
                    game.instantRender = true
                }
            }
        }

        children.eachWithIndex { system, i ->
            options["${i + 1}. Detect faint signal: ${system.name}"] = { game.enterLocation(system) }
        }
        return options
    }
}
