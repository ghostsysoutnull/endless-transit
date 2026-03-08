package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager
import groovy.transform.CompileStatic

import java.util.Scanner

@CompileStatic
class Game {
    Universe universe
    Location currentLocation
    Player player
    String lastChoice
    Scanner scanner
    Map<String, String> currentActionMap = [:]
    Map<String, String> previousActionMap = [:] 
    boolean instantRender = false
    long masterSeed
    BridgeView bridgeView = new BridgeView()

    Game(long seed = System.currentTimeMillis()) {
        this.masterSeed = seed
        player = new Player()
        scanner = new Scanner(System.in)
        initializeWorld()
    }

    void initializeWorld() {
        this.universe = new Universe(masterSeed)
        
        // Start deep: Universe > Filament > Sector > System > Planet > Country > City > Street
        List<CosmicFilament> filaments = universe.getFilaments()
        CosmicFilament filament = filaments[0]
        
        // Find a SolarSystem within the node (GalacticSector or NullSector)
        Container node = (Container) filament.getChildren()[0]
        List<Location> systems = node.getChildren()
        SolarSystem system = (SolarSystem) systems[0]
        
        Planet planet = system.getPlanets()[0]
        Country country = planet.getCountries()[0]
        City city = country.getCities()[0]
        currentLocation = city.getStreets()[0]
        player.currentLocation = currentLocation
    }

    void start() {
        println(Terminal.colorize("Welcome to Endless Transit!", Terminal.L_CYAN))
        Logger.info("Game started.")
        JournalManager.startSession(player)
        
        // Check for existing trace substrate
        File saveFile = new File(SyncManager.SAVE_FILE)
        if (saveFile.exists()) {
            println Terminal.dim("  [DETECTED_NEURAL_TRACE_SUBSTRATE]")
            print Terminal.colorize("  Restore previous session? [y/N]: ", Terminal.YELLOW)
            String confirm = scanner.hasNextLine() ? scanner.nextLine().trim().toLowerCase() : "n"
            if (confirm == "y") {
                restoreSession()
            }
        }
        
        try {
            while (true) {
                Logger.info("Entering main loop. Location: ${currentLocation.getPath()}")
                
                // Adjust coherence based on timeline
                VibeCapsule vibe = currentLocation.getVibe()
                double drainRate = 1.0
                if (vibe != null) {
                    switch (vibe.timeline) {
                        case "ancient": 
                        case "analog": 
                            drainRate = 0.5; break
                        case "future":
                        case "industrial":
                        case "atomic":
                        case "digital":
                            drainRate = 1.0; break
                        case "singularity":
                        case "entropic":
                            drainRate = 2.0; break
                    }
                }
                if (currentLocation.isAbyssal()) {
                    drainRate *= 2.0
                }
                player.adjustCoherence(-drainRate) 
                
                if (player.coherence <= 0) {
                    Terminal.clearScreen()
                    println Terminal.colorize("!!! CRITICAL_COHERENCE_FAILURE !!!", Terminal.RED)
                    println Terminal.colorize(">>> NEURAL LINK SEVERED. REBOOTING FROM UNIMATRIX ROOT...", Terminal.YELLOW)
                    
                    JournalManager.saveSession(player, "CRITICAL_COHERENCE_FAILURE")
                    Thread.sleep(2000)
                    
                    player.coherence = 100
                    initializeWorld()
                    JournalManager.startSession(player)
                    continue
                }

                currentLocation.enter(player)
                currentLocation.processAction(player)
                
                Map<String, Closure> options = currentLocation.getOptions(this)
                
                // Map options to menu choices for input processing
                previousActionMap = currentActionMap
                currentActionMap = [:]
                Map<String, Closure> menu = [:]
                options.each { String label, Closure action ->
                    String key = label.contains(".") ? label.split("\\.")[0].trim() : label
                    menu[key] = action
                    currentActionMap[key] = label
                }
                
                // Add global options labels for getRawUserInput
                currentActionMap["i"] = "List inventory"
                currentActionMap["quit"] = "Quit"

                // Render the Bridge View
                bridgeView.render(currentLocation, player, options, masterSeed)
                
                // --- Repetition Logic for "Leave" actions ---
                if (lastChoice != null) {
                    String prevLabel = currentActionMap[lastChoice]?.toLowerCase()
                    if (prevLabel != null && (prevLabel.contains("leave") || prevLabel.contains("exit") || prevLabel.contains("go back"))) {
                        // Find the new "leave" key in this location
                        def newLeaveEntry = options.find { String k, Closure v -> 
                            String l = k.toLowerCase()
                            l.contains("leave") || l.contains("exit") || l.contains("go back")
                        }
                        
                        if (newLeaveEntry != null) {
                            String newLeaveKey = newLeaveEntry.key
                            String key = newLeaveKey.contains(".") ? newLeaveKey.split("\\.")[0].trim() : newLeaveKey
                            lastChoice = key
                            Logger.info("Auto-mapped repetition key to new leave action: $key")
                        }
                    }
                }

                String choice = ""
            while (true) {
                String rawInput = getRawUserInput()
                
                // Boundary-based auto-reversal logic
                if (rawInput == "" && lastChoice != null) {
                    Map<String, String> reversalPairs = [
                        "f": "b",
                        "b": "f",
                        "u": "d",
                        "d": "u"
                    ]
                    
                    String lastKey = lastChoice
                    String oppositeKey = reversalPairs[lastKey]
                    
                    if (oppositeKey != null) {
                        boolean currentStillAvailable = options.keySet().any { it.startsWith(lastKey + ". ") }
                        
                        if (!currentStillAvailable) {
                            if (options.keySet().any { it.startsWith(oppositeKey + ". ") }) {
                                println "Boundary reached. Reversing direction."
                                lastChoice = oppositeKey
                                choice = oppositeKey
                                break
                            }
                        }
                    }
                }
                
                choice = processInput(rawInput)

                if (choice == "i") {
                    lastChoice = "i"
                    inventoryMenu()
                    // Break inner loop to re-render location immediately
                    choice = null
                    break
                }

                if (choice == "sync") {
                    lastChoice = "sync"
                    SyncManager.sync(this)
                    println Terminal.colorize("\n>>> NEURAL_TRACE_STABILIZED: Session synchronized to substrate.", Terminal.GREEN)
                    choice = null
                    break
                }

                if (choice == "map" || choice == "m") {
                    // map is now persistent, but we can treat 'm' as a 'ping' to refresh
                    lastChoice = "map"
                    player.adjustCoherence(-1.0)
                    bridgeView.renderLatticeMap(currentLocation, player)
                    println Terminal.colorize("\n>>> DEEP_SCAN_PING: Neural lattice mapping refreshed.", Terminal.L_CYAN)
                    choice = null
                    break
                }

                if (choice == "lattice") {
                    lastChoice = "lattice"
                    bridgeView.renderLatticeTrace(currentLocation)
                    choice = null
                    break
                }

                if (choice == "help") {
                    helpMenu()
                    choice = null
                    break
                }

                if (choice == "glitch") {
                    glitchMenu()
                    choice = null
                    break
                }
                
                if (choice == "-2") {
                    // Just loop again for new input
                    continue
                }
                
                break // Break inner loop for any other choice
            }

            if (choice == null) continue // Re-rendered from inventory

            if (choice == "quit") {
                print Terminal.colorize("Are you sure you want to quit? [y/N]: ", Terminal.YELLOW)
                String confirm = scanner.hasNextLine() ? scanner.nextLine().trim().toLowerCase() : "y"
                if (confirm == "y" || !scanner.hasNextLine()) {
                    print Terminal.colorize("Synchronize neural trace before termination? [Y/n]: ", Terminal.CYAN)
                    String saveConfirm = scanner.hasNextLine() ? scanner.nextLine().trim().toLowerCase() : "y"
                    if (saveConfirm == "y" || saveConfirm == "") {
                        SyncManager.sync(this)
                        println Terminal.colorize(">>> NEURAL_TRACE_STABILIZED.", Terminal.GREEN)
                    }
                    JournalManager.saveSession(player)
                    showExitSequence()
                    break
                }
                continue
            }

            Logger.info("Executing choice: '$choice'")
            // Find matching menu entry using zero-agnostic numeric matching
            String matchingKey = (String) menu.keySet().find { Object keyObj ->
                String key = (String) keyObj
                // 1. Exact match (case insensitive)
                if (key.equalsIgnoreCase(choice)) {
                    Logger.info("  >> Match found: Exact Match ('$choice' == '$key')")
                    return true
                }
                
                // 2. Zero-agnostic match (e.g., "1" matches "01")
                String normalizedChoice = choice.replaceFirst("^0+(?!\$)", "")
                String normalizedKey = key.replaceFirst("^0+(?!\$)", "")
                
                if (normalizedChoice == normalizedKey) {
                    Logger.info("  >> Match found: Zero-Agnostic ('$choice' -> '$normalizedChoice' == '$key' -> '$normalizedKey')")
                    return true
                }
                
                return false
            }

            if (matchingKey != null) {
                player.stepCount++
                if (currentLocation.isAbyssal()) {
                    player.adjustCoherence(-5)
                }
                lastChoice = matchingKey
                ((Closure)menu[matchingKey]).call()
            } else if (choice != "-2") {
                Logger.info("  [!] Match failed for choice '$choice'. Available keys: ${menu.keySet()}")
                println("Invalid choice. Please try again.")
            }
        }
    } catch (Throwable t) {
        Logger.reportCriticalFailure(currentLocation, player, lastChoice, masterSeed, t)
        
        println(Terminal.colorize("\n!!! CRITICAL SYSTEM FAILURE DETECTED !!!", Terminal.RED))
        println(Terminal.dim("Error and session seed ($masterSeed) have been logged to transit.log"))
        System.exit(1)
    }
}

    void showExitSequence() {
        Terminal.clearScreen()
        boolean isAbyssal = currentLocation.isAbyssal()
        int footprintsCount = player.footprints.size()

        if (isAbyssal) {
            // Routine B: Abyssal Echo
            bridgeView.printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", currentLocation, 0.1)
            println "\n" + Terminal.colorize(" [VOID_RESONANCE_TERMINATION] ", Terminal.RED)
            String[] lines = [
                "Your echoes are sinking into the strata.",
                "The web is folding back upon itself.",
                "The v-v-void... it remembers... [OK]",
                "Sleep among the static, Operator."
            ]
            lines.each { String line ->
                String text = Terminal.glitchText(line, 0.05)
                Terminal.typewrite(text, 40)
                Thread.sleep(500)
            }
        } else if (footprintsCount >= 20) {
            // Routine A: Locus Recap
            bridgeView.printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", currentLocation, 0.0)
            println "\n" + Terminal.colorize(" [SESSION_RECAP_INITIALIZED] ", Terminal.L_CYAN)
            println Terminal.dim("-------------------------------------------")
            Thread.sleep(300)
            printf("%-18s : %s\n", "FINAL_LOCUS", currentLocation.getLIP())
            Thread.sleep(200)
            printf("%-18s : %d steps\n", "PULSE_TRAVERSAL", player.stepCount)
            Thread.sleep(200)
            printf("%-18s : %d footprints\n", "CELLS_MAPPED", footprintsCount)
            Thread.sleep(200)
            printf("%-18s : %d spectral fragments\n", "BUFFER_DENSITY", player.inventory.size())
            Thread.sleep(200)
            printf("%-18s : %d stabilized\n", "RESONANT_TRACES", player.resonantTracesCount)
            Thread.sleep(300)
            println Terminal.dim("-------------------------------------------")
            println "Expedition successful. Trace synchronized to substrate."
            Thread.sleep(1000)
        } else {
            // Routine C: Technical Unmount
            bridgeView.printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", currentLocation, 0.0)
            println "\n" + Terminal.colorize(" [LINK_TERMINATION_PROTOCOL] ", Terminal.WHITE)
            String[] processes = [
                "UNMOUNTING_LATTICE_TRACE",
                "DEALLOCATING_TRACE_BUFFER",
                "RELEASING_NEURAL_CARRIER",
                "STABILIZING_SUBSTRATE_WAVEFORM"
            ]
            processes.each { String proc ->
                print Terminal.dim("[STATUS] ") + proc + "..."
                Thread.sleep(new Random().nextInt(400) + 100)
                println Terminal.colorize(" [DONE]", Terminal.GREEN)
            }
            println "\nNeural link severed. Waveform stabilized."
            Thread.sleep(1000)
        }
        println ""
    }

    void restoreSession() {
        GameSession snapshot = SyncManager.restore()
        if (snapshot == null) return

        println Terminal.colorize("\n>>> RESTORE_INITIATED: Reconstituting trace...", Terminal.L_CYAN)
        
        this.masterSeed = snapshot.masterSeed
        this.player = snapshot.player
        this.currentLocation = snapshot.currentLocation
        
        if (this.currentLocation == null) {
            Logger.error("RESTORE_ERROR: Could not resolve current location.")
            initializeWorld()
        } else {
            this.universe = (Universe) this.currentLocation.findAncestor(Universe.class) ?: new Universe(masterSeed)
        }

        println Terminal.colorize(">>> RESTORE_COMPLETE: Neural link synchronized with current locus.", Terminal.GREEN)
        instantRender = true
    }

    void inventoryMenu() {
        while (true) {
            println "\n" + Terminal.colorize(" [QUANTUM_TRACE_BUFFER_INTERACE] ", Terminal.L_CYAN)
            player.listInventory()
            println Terminal.dim("-------------------------------------------")
            println "${Terminal.colorize("d [num]", Terminal.YELLOW)}: Drop item  |  ${Terminal.colorize("m [n1] [n2]", Terminal.YELLOW)}: Merge items"
            println "${Terminal.colorize("b", Terminal.YELLOW)}: Back to reality"
            
            print "\nBUFFER_CMD >> "
            String input = scanner.nextLine().trim().toLowerCase()
            
            if (input == "b" || input == "") {
                // Clear session labels before returning to reality
                player.inventory.each { InventoryItem it -> it.sessionMergeCount = 0 }
                break
            }
            
            String[] parts = input.split(" ")
            String cmd = parts[0]
            
            try {
                if (cmd == "d" && parts.size() > 1) {
                    int idx = parts[1].toInteger() - 1
                    player.dropItem(idx)
                } else if (cmd == "m" && parts.size() > 2) {
                    int idx1 = parts[1].toInteger() - 1
                    int idx2 = parts[2].toInteger() - 1
                    player.mergeItems(idx1, idx2, currentLocation)
                    // Synthesis restores coherence
                    player.adjustCoherence(15)
                } else {
                    println "Invalid buffer command."
                }
            } catch (Exception e) {
                println "Invalid input format."
            }
        }
    }

    void helpMenu() {
        println "\n" + Terminal.colorize(" [SYSTEM_HELP_PROTOCOL] ", Terminal.L_CYAN)
        println ""
        println "${Terminal.bold("map")} / ${Terminal.bold("m")}            : View 2D spatial representation of current area."
        println "${Terminal.bold("lattice")}            : View vertical world hierarchy tree."
        println "${Terminal.bold("sync")}               : Synchronize Neural Trace to substrate (Save)."
        println "${Terminal.bold("i")}                  : Open Quantum Trace Buffer (Inventory)."
        println "${Terminal.bold("q")} / ${Terminal.bold("quit")}         : Terminate neural link."
        println "${Terminal.bold("glitch")}               : Open Lattice Debug/Cheat Menu."
        println ""
        println "Navigation is performed via numeric keys (1, 2...) or single characters (u, d, f, b, l)."
        println ""
        print Terminal.dim("Press ENTER to return...")
        scanner.nextLine()
        instantRender = true
    }

    void glitchMenu() {
        while (true) {
            println "\n" + Terminal.colorize(" [LATTICE_GLITCH_INTERFACE] ", Terminal.MAGENTA)
            println "1. PRIME    : Instantly sample all floors and set infusion count."
            println "2. KEYSTONE : Spawn current building's Keystone fragment."
            println "3. BREACH   : Instantly breach bedrock and teleport to Layer -1."
            println "4. INTEGRITY: Set neural link coherence level."
            println "c. CANCEL   : Close glitch interface."
            println ""
            print "GLITCH >> "
            
            String choice = scanner.nextLine().trim().toLowerCase()
            Building bldg = (Building) currentLocation.findAncestor(Building.class)

            if (choice == "c") break

            if (choice == "1") {
                if (bldg != null) {
                    for (int i = 0; i < bldg.maxFloors; i++) bldg.notifySampled(i)
                    bldg.infusionCount = 7
                    println Terminal.colorize(">>> Building ${bldg.name} PRIMED.", Terminal.GREEN)
                } else {
                    println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
                }
            } else if (choice == "2") {
                if (bldg != null) {
                    player.inventory << new InventoryItem("${bldg.name} Keystone", 0, 0, true)
                    println Terminal.colorize(">>> KEYSTONE generated in Trace Buffer.", Terminal.GREEN)
                } else {
                    println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
                }
            } else if (choice == "3") {
                if (bldg != null) {
                    bldg.isBreached = true
                    enterLocation(bldg.getFloor(-1))
                    println Terminal.colorize(">>> BREACHED. Descent initiated.", Terminal.RED)
                    break
                } else {
                    println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
                }
            } else if (choice == "4") {
                print "Set Integrity (0-100): "
                try {
                    int val = scanner.nextLine().toInteger()
                    player.coherence = Math.max(0, Math.min(100, val))
                    println Terminal.colorize(">>> Integrity set to ${player.coherence}%.", Terminal.YELLOW)
                } catch (Exception e) {
                    println "Invalid value."
                }
            }
        }
        instantRender = true
    }

    void enterLocation(Location location) {
        Location cur = this.currentLocation
        if (cur != null && location != null) {
            Logger.info("Changing location from ${cur.getPath()} to ${location.getPath()}".toString())
        } else if (location != null) {
            Logger.info("Entering first location: ${location.getPath()}".toString())
        }
        
        this.currentLocation = location
        this.player.currentLocation = location
        
        if (location != null) {
            player.markFootprint(location)
            
            // For stability: also mark high-level ancestors if entering a room directly
            Location p = location.getParent()
            while (p != null) {
                if (p instanceof Building || p instanceof City || p instanceof Planet) {
                    player.markFootprint(p)
                }
                p = p.getParent()
            }
        }
    }
    
    // Temporary helper to exit current location (go to parent)
    void exitLocation() {
        if (currentLocation.getParent() != null) {
            currentLocation = currentLocation.getParent()
        } else {
            println "You can't go out from here."
        }
    }

    String getRawUserInput() {
        String fullLabel = ""
        if (lastChoice != null) {
            fullLabel = (String) previousActionMap[lastChoice]
            if (fullLabel == null) fullLabel = lastChoice
        }
        
        String actionName = fullLabel
        if (fullLabel != null && fullLabel.contains(". ")) {
            actionName = fullLabel.substring(fullLabel.indexOf(". ") + 2)
        }
        String hudLastAction = (lastChoice != null && actionName != null) ? " [Last: $actionName]" : ""
        
        print Terminal.dim("---=====================================>>")
        print Terminal.colorize(hudLastAction, Terminal.CYAN)
        print " Enter choice: "
        
        String input
        if (System.console() != null) {
            input = System.console().readLine()
        } else if (scanner.hasNextLine()) {
            input = scanner.nextLine()
        } else {
            return null // EOF
        }
        return input != null ? input.trim() : null
    }

    String processInput(String input) {
        if (input == null) return "quit"

        if (input.isEmpty()) {
            if (lastChoice != null) {
                println "Repeating: $lastChoice"
                return lastChoice
            }
            return "-2"
        }

        if (input.equalsIgnoreCase("i")) {
            return "i"
        }

        if (input.equalsIgnoreCase("sync")) {
            return "sync"
        }

        if (input.equalsIgnoreCase("map") || input.equalsIgnoreCase("m")) {
            return "map"
        }

        if (input.equalsIgnoreCase("lattice")) {
            return "lattice"
        }

        if (input.equalsIgnoreCase("glitch")) {
            return "glitch"
        }

        if (input.equalsIgnoreCase("help") || input == "?") {
            return "help"
        }
        
        if (input.equalsIgnoreCase("quit")) {
            return "quit"
        }

        return input
    }
}
