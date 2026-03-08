package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.procgen.WorldGenesis
import com.endlesstransit.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager
import com.endlesstransit.ui.SessionRecap
import groovy.transform.CompileStatic
import java.io.File

/**
 * Game: The high-level orchestrator of the Endless Transit engine.
 * Coordinates input, action mapping, navigation, and world state.
 */
@CompileStatic
class Game {
    Universe universe
    Location currentLocation
    Player player
    boolean instantRender = false
    LocusSeed masterLocus
    
    // Domain Components
    BridgeView bridgeView = new BridgeView()
    InputHandler inputHandler = new InputHandler()
    ActionMapper mapper = new ActionMapper()
    NavigationEngine navEngine = new NavigationEngine()
    QuantumBufferController inventoryController = new QuantumBufferController()

    Game(long seed = System.currentTimeMillis()) {
        this.masterLocus = new LocusSeed(seed)
        player = new Player()
        initializeWorld()
    }

    void initializeWorld() {
        WorldGenesis.GenesisResult result = WorldGenesis.createInitialWorld(masterLocus)
        this.universe = result.universe
        enterLocation(result.startLocation)
    }

    void start() {
        println(Terminal.colorize("Welcome to Endless Transit!", Terminal.L_CYAN))
        Logger.info("Game started.")
        JournalManager.startSession(player)
        
        if (new File(SyncManager.SAVE_FILE).exists()) {
            println Terminal.dim("  [DETECTED_NEURAL_TRACE_SUBSTRATE]")
            print Terminal.colorize("  Restore previous session? [y/N]: ", Terminal.YELLOW)
            if (inputHandler.readLine().toLowerCase() == "y") restoreSession()
        }
        
        try {
            while (true) {
                // 1. Process Turn Context (Coherence & Events)
                if (!processTurn()) break

                // 2. Map Actions
                Map<String, Closure> options = currentLocation.getOptions(this)
                mapper.update(options)
                navEngine.updateRepetitionContext(mapper, options)

                // 3. Render
                bridgeView.render(currentLocation, player, options, masterLocus.value)
                
                // 4. Input & Dispatch
                if (!handleInput()) break
            }
        } catch (Throwable t) {
            Logger.reportCriticalFailure(currentLocation, player, navEngine.lastChoice, masterLocus.value, t)
            println(Terminal.colorize("\n!!! CRITICAL SYSTEM FAILURE DETECTED !!!", Terminal.RED))
            System.exit(1)
        }
    }

    private boolean processTurn() {
        VibeCapsule vibe = currentLocation.getVibe()
        double drain = (currentLocation.isAbyssal() ? 2.0 : 1.0) * (vibe?.timeline == "entropic" ? 2.0 : 1.0)
        player.adjustCoherence(-drain) 
        
        if (player.coherence <= 0) {
            reboot()
            return true
        }

        currentLocation.enter(player)
        currentLocation.processAction(player)
        return true
    }

    private boolean handleInput() {
        String choice = ""
        while (true) {
            String raw = inputHandler.getRawInput(mapper.getActionName(navEngine.lastChoice))
            choice = navEngine.checkBoundaryReversal(raw, mapper) ?: inputHandler.normalize(raw, navEngine.lastChoice)

            switch (choice) {
                case "i": inventoryController.open(this); return true
                case "sync": SyncManager.sync(this); println Terminal.colorize("\n>>> SYNC_STABILIZED.", Terminal.GREEN); return true
                case "map": bridgeView.renderLatticeMap(currentLocation, player); inputHandler.waitForEnter(); return true
                case "lattice": bridgeView.renderLatticeTrace(currentLocation); inputHandler.waitForEnter(); return true
                case "help": helpMenu(); return true
                case "glitch": glitchMenu(); return true
                case "quit": return confirmQuit()
                case "-2": continue
                default: break
            }
            break
        }

        Closure action = mapper.resolve(choice, inputHandler)
        if (action) {
            player.stepCount++
            navEngine.recordChoice(choice)
            action.call()
        } else {
            println "Invalid choice."
        }
        return true
    }

    private boolean confirmQuit() {
        print Terminal.colorize("Are you sure you want to quit? [y/N]: ", Terminal.YELLOW)
        if (inputHandler.readLine().toLowerCase() == "y") {
            print Terminal.colorize("Synchronize neural trace before termination? [Y/n]: ", Terminal.CYAN)
            if (inputHandler.readLine().toLowerCase() != "n") SyncManager.sync(this)
            JournalManager.saveSession(player)
            SessionRecap.show(currentLocation, player, bridgeView)
            return false
        }
        return true
    }

    private void reboot() {
        Terminal.clearScreen()
        println Terminal.colorize("!!! CRITICAL_COHERENCE_FAILURE !!! REBOOTING...", Terminal.RED)
        Thread.sleep(2000)
        player.coherence = 100
        initializeWorld()
    }

    void restoreSession() {
        GameSession snapshot = SyncManager.restore()
        if (!snapshot) return
        this.masterLocus = snapshot.locus
        this.player = snapshot.player
        this.currentLocation = snapshot.currentLocation
        this.universe = (Universe) this.currentLocation.findAncestor(Universe.class) ?: ProceduralFactory.createUniverse(masterLocus)
        instantRender = true
    }

    void helpMenu() {
        println "\n" + Terminal.colorize(" [SYSTEM_HELP_PROTOCOL] ", Terminal.L_CYAN)
        println "\nmap/m: Spatial | lattice: Tree | sync: Save | i: Buffer | glitch: Debug | q: Terminate"
        inputHandler.waitForEnter()
        instantRender = true
    }

    void glitchMenu() {
        List<LatticeCommand> cmds = [new PrimeBuildingCommand(), new SpawnKeystoneCommand(), new BreachBedrockCommand(), new SetIntegrityCommand()]
        while (true) {
            println "\n" + Terminal.colorize(" [LATTICE_GLITCH_INTERFACE] ", Terminal.MAGENTA)
            cmds.eachWithIndex { cmd, i -> println "${i + 1}. ${cmd.getLabel().padRight(10)}: ${cmd.getDescription()}" }
            print "GLITCH (c to cancel) >> "
            String c = inputHandler.readLine().toLowerCase()
            if (c == "c") break
            try {
                int idx = c.toInteger() - 1
                if (idx >= 0 && idx < cmds.size() && cmds[idx].execute(this)) break
            } catch (Exception e) { println "Invalid." }
        }
        instantRender = true
    }

    void enterLocation(Location loc) {
        if (!loc) return
        this.currentLocation = loc
        this.player.currentLocation = loc
        player.markFootprint(loc)
        Location p = loc.parent
        while (p) { if (p instanceof Building || p instanceof City || p instanceof Planet) player.markFootprint(p); p = p.parent }
    }
    
    void exitLocation() {
        if (currentLocation.parent) enterLocation(currentLocation.parent)
        else println "End of reality reached."
    }
}
