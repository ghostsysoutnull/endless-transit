package com.endlesstransit.core
import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import com.endlesstransit.procgen.*
import com.endlesstransit.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

import java.util.Scanner

class Game {
    Location currentLocation
    Player player
    String lastChoice
    Scanner scanner
    Map<String, String> currentActionMap = [:]
    Map<String, String> previousActionMap = [:] 
    boolean instantRender = false
    long masterSeed

    Game(long seed = System.currentTimeMillis()) {
        this.masterSeed = seed
        player = new Player()
        scanner = new Scanner(System.in)
        initializeWorld()
    }

    void initializeWorld() {
        def universe = new Universe(masterSeed)
        
        // Start deep: Universe > Filament > Sector > System > Planet > Country > City > Street
        def filaments = universe.getFilaments()
        def filament = filaments[0]
        def node = filament.children[0]
        
        // Find a SolarSystem within the node (GalacticSector or NullSector)
        def systems = node.children
        def system = systems[0]
        
        def planet = system.getPlanets()[0]
        def country = planet.getCountries()[0]
        def city = country.getCities()[0]
        currentLocation = city.getStreets()[0]
    }

    void renderInventoryOverlay() {
        println ""
        String title = Terminal.colorize(" [QUANTUM_TRACE_BUFFER_SYNC...] ", Terminal.L_CYAN)
        println title
        
        if (player.inventory.isEmpty()) {
            println Terminal.dim("  (No spectral traces detected in local buffer) ")
        } else {
            // Show all items now that we can scroll
            player.inventory.each { item ->
                String freqStr = String.format("%04d", item.frequency)
                
                int signalStrength = (item.frequency % 100) / 10 + 1
                String signalBar = "█" * signalStrength + "░" * (10 - signalStrength)
                String phase = (item.frequency % 2 == 0) ? "STABLE" : "SHIFTING"
                String signalColor = (phase == "STABLE") ? Terminal.CYAN : Terminal.MAGENTA
                
                print "  ${Terminal.dim(freqStr)}Hz "
                print Terminal.colorize(signalBar, signalColor)
                print " ${Terminal.dim("[" + phase + "]")}"
                println " >> ${Terminal.bold(item.name)}"
            }
        }
        println Terminal.dim(" ----------------------------------------------------------------------")
        println Terminal.dim(" SYNC_STATUS: " + Terminal.colorize("NOMINAL", Terminal.GREEN))
        println ""
        System.out.flush()
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
                def vibe = currentLocation.getVibe()
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

                renderBridgeHUD()
                
                // Typewriter effect for location description
                String desc = currentLocation.getDescription()
                if (player.coherence < 40) desc = Terminal.glitchText(desc, 0.1)
                
                if (instantRender) {
                    println desc
                    instantRender = false // Reset
                } else {
                    Terminal.typewrite(desc, 5)
                }
                
                currentLocation.enter(player)
                currentLocation.processAction(player)
                
                def options = currentLocation.getOptions(this)
                
                // --- Repetition Logic for "Leave" actions ---
                if (lastChoice != null) {
                    String prevLabel = currentActionMap[lastChoice]?.toLowerCase()
                    if (prevLabel != null && (prevLabel.contains("leave") || prevLabel.contains("exit") || prevLabel.contains("go back"))) {
                        // Find the new "leave" key in this location
                        def newLeaveKey = options.find { k, v -> 
                            String l = k.toLowerCase()
                            l.contains("leave") || l.contains("exit") || l.contains("go back")
                        }?.key
                        
                        if (newLeaveKey) {
                            String key = newLeaveKey.contains(".") ? newLeaveKey.split("\\.")[0].trim() : newLeaveKey
                            lastChoice = key
                            Logger.info("Auto-mapped repetition key to new leave action: $key")
                        }
                    }
                }

                previousActionMap = currentActionMap
                currentActionMap = [:]
                
                // Map options to menu choices
                def menu = [:]
                
                options.each { label, action ->
                    String key = label.contains(".") ? label.split("\\.")[0].trim() : label
                    menu[key] = action
                    currentActionMap[key] = label
                }
                
                // Add global options
                currentActionMap["i"] = "List inventory"
                currentActionMap["quit"] = "Quit"

                // Display Menu and Compass
                renderCompass(options)
                println("${Terminal.dim("EXECUTE_DIRECTIVE:")}")
                
                // 1. Render Local Actions (Filtering out specialized lists)
                List<String> navOptions = []
                menu.each { menuKey, action ->
                    String label = currentActionMap[menuKey]
                    
                    // Skip items already shown in tables
                    if (currentLocation instanceof Street && label.contains("Enter Building:")) return
                    if (currentLocation instanceof Corridor && label.contains("Access:")) return
                    
                    // If it's a single-char nav command, collect it for the bottom line
                    if (menuKey.length() == 1 && "udfblt".contains(menuKey)) {
                        navOptions << "[${Terminal.colorize(menuKey, Terminal.YELLOW)}] ${label.split("\\. ")[1]}"
                        return
                    }
                    
                    println(label)
                }

                // 2. Render Single-Line Navigation
                if (!navOptions.isEmpty()) {
                    println navOptions.join(Terminal.dim(" | "))
                }

                // 3. Render Single-Line Global Controls
                String buffer = "[${Terminal.colorize("i", Terminal.YELLOW)}] Buffer"
                String sync = "[${Terminal.colorize("sync", Terminal.CYAN)}] Save"
                String map = "[${Terminal.colorize("m", Terminal.WHITE)}] Map"
                String tree = "[${Terminal.colorize("lattice", Terminal.WHITE)}] Tree"
                String quit = "[${Terminal.colorize("quit", Terminal.RED)}] Quit"
                
                println "${buffer} | ${sync} | ${map} | ${tree} | ${quit}"

                String choice
            while (true) {
                String rawInput = getRawUserInput()
                
                // Boundary-based auto-reversal logic
                if (rawInput == "" && lastChoice != null) {
                    def reversalPairs = [
                        "f": "b",
                        "b": "f",
                        "u": "d",
                        "d": "u"
                    ]
                    
                    String lastKey = lastChoice
                    String oppositeKey = reversalPairs[lastKey]
                    
                    if (oppositeKey) {
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
                    lastChoice = "map"
                    renderLatticeMap()
                    choice = null
                    break
                }

                if (choice == "lattice") {
                    lastChoice = "lattice"
                    renderLatticeTrace()
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

            Logger.info("Executing choice: $choice")
            // Find matching menu entry (with leading zero fallback)
            def matchingKey = menu.keySet().find { key ->
                if (key.equalsIgnoreCase(choice)) return true
                // Fallback: If user typed '1', match '01'
                if (choice.length() == 1 && Character.isDigit(choice[0] as char)) {
                    if (key == "0" + choice) return true
                }
                return false
            }

            if (matchingKey) {
                player.stepCount++
                if (currentLocation.isAbyssal()) {
                    player.adjustCoherence(-5)
                }
                lastChoice = matchingKey
                menu[matchingKey].call()
            } else if (choice != "-2") {
                println("Invalid choice. Please try again.")
            }
        }
    } catch (Throwable t) {
        Logger.error("CRITICAL_FAILURE: Game loop crashed.", t)
        println(Terminal.colorize("\n!!! CRITICAL SYSTEM FAILURE DETECTED !!!", Terminal.RED))
        println(Terminal.dim("Error has been logged to transit.log"))
        System.exit(1)
    }
}

    void showExitSequence() {
        Terminal.clearScreen()
        boolean isAbyssal = currentLocation.isAbyssal()
        int footprintsCount = player.footprints.size()

        if (isAbyssal) {
            // Routine B: Abyssal Echo
            printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", 0.1)
            println "\n" + Terminal.colorize(" [VOID_RESONANCE_TERMINATION] ", Terminal.RED)
            String[] lines = [
                "Your echoes are sinking into the strata.",
                "The web is folding back upon itself.",
                "The v-v-void... it remembers... [OK]",
                "Sleep among the static, Operator."
            ]
            lines.each { line ->
                String text = Terminal.glitchText(line, 0.05)
                Terminal.typewrite(text, 40)
                Thread.sleep(500)
            }
        } else if (footprintsCount >= 20) {
            // Routine A: Locus Recap
            printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", 0.0)
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
            printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", 0.0)
            println "\n" + Terminal.colorize(" [LINK_TERMINATION_PROTOCOL] ", Terminal.WHITE)
            String[] processes = [
                "UNMOUNTING_LATTICE_TRACE",
                "DEALLOCATING_TRACE_BUFFER",
                "RELEASING_NEURAL_CARRIER",
                "STABILIZING_SUBSTRATE_WAVEFORM"
            ]
            processes.each { proc ->
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
        def snapshot = SyncManager.restore()
        if (snapshot == null) return

        println Terminal.colorize("\n>>> RESTORE_INITIATED: Reconstituting trace...", Terminal.L_CYAN)
        
        this.masterSeed = (long) snapshot.masterSeed
        def universe = new Universe(masterSeed)
        
        // Restore Player state
        player = new Player()
        player.coherence = (int) snapshot.player.coherence
        player.stepCount = (int) snapshot.player.stepCount
        player.footprints.addAll((List<String>) snapshot.player.footprints)
        player.visitedPaths.addAll((List<String>) snapshot.player.visitedPaths)
        
        snapshot.player.inventory.each { item ->
            player.inventory.add(new InventoryItem(
                (String) item.name, 
                (int) item.frequency, 
                (int) item.sessionMergeCount, 
                (boolean) item.isKeystone
            ))
        }

        // Apply World Mutations and Restore Footprints
        snapshot.mutations.each { lip, state ->
            Location loc = universe.resolveLIP(lip)
            if (loc != null) {
                loc.applyMutationState((Map<String, Object>) state)
            }
        }

        // Apply "Visited" status to all footprints
        player.footprints.each { lip ->
            Location loc = universe.resolveLIP(lip)
            if (loc != null) {
                loc.markVisited()
            }
        }

        // Resolve current location
        String currentLIP = (String) snapshot.player.currentLIP
        this.currentLocation = universe.resolveLIP(currentLIP)
        if (this.currentLocation == null) {
            Logger.error("RESTORE_ERROR: Could not resolve current location LIP: $currentLIP")
            initializeWorld()
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
                player.inventory.each { it.sessionMergeCount = 0 }
                break
            }
            
            def parts = input.split(" ")
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

    void renderBridgeHUD() {
        int width = 100
        int splitPoint = 65
        def vibe = currentLocation.getVibe()
        boolean abyssal = currentLocation.isAbyssal()
        String accent = abyssal ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.WHITE)
        
        Terminal.drawBoxTop(width, accent)
        
        // 1. Sparkline & Traversal
        String sparkline = getLatticeSparkline()
        String cohLabel = abyssal ? "INTEGRITY" : "COHERENCE"
        String globalStats = "PULSE_TRAVERSAL: ${player.stepCount} | $cohLabel: ${player.coherence}%"
        String topRow = "$sparkline | $globalStats"
        Terminal.drawBoxedLine(topRow, width, accent)
        
        // 2. Navigation Path (Full width now)
        String path = currentLocation.getPath()
        String prefix = abyssal ? "VOID_TRACE: " : "LOCUS_TRACE: "
        int maxPathWidth = width - 6 // More breathing room
        if (Terminal.getVisualWidth(path) + prefix.length() > maxPathWidth) {
            path = "..." + path.substring(path.length() - (maxPathWidth - prefix.length() - 3))
        }
        Terminal.drawBoxedLine("$prefix$path", width, accent)
        
        Terminal.drawBoxSeparator(width, accent, "light")
        
        // 3. Local Diagnostic (Left) & System Status (Right)
        String identLabel = abyssal ? "VOID_IDENT" : "LATTICE_IDENT"
        String ident = "$identLabel: ${currentLocation.getTypeName()} >> ${currentLocation.getName()}"
        String sysDiag = abyssal ? "SYSTEM_STATUS: [ABYSS_SYNC]" : "SYSTEM_DIAGNOSTIC: [NOMINAL]"
        Terminal.drawSplitBoxedLine(ident, sysDiag, splitPoint, width, accent)
        
        String hashLabel = abyssal ? "VOID_HASH" : "LOCUS_HASH"
        String depthLabel = abyssal ? "ABYSSAL_DEPTH" : "HOP_DENSITY"
        String coords = "$hashLabel: ${currentLocation.getCoordinates()} | $depthLabel: ${currentLocation.getDepth()}"
        String cohBar = cohLabel + ": " + renderCoherenceBar()
        Terminal.drawSplitBoxedLine(coords, cohBar, splitPoint, width, accent)
        
        // Structural Alignment & Radar
        int idx = currentLocation.getIndexInParent()
        int total = currentLocation.getTotalInParent()
        String leftBottom = ""
        if (total > 0) {
            String alignLabel = "ALIGN"
            if (currentLocation instanceof Floor) alignLabel = abyssal ? "STRATA" : "Z-AXIS"
            if (currentLocation instanceof Room) alignLabel = abyssal ? "SHARD" : "INDEX"
            
            int radarLimit = 20
            String radar = Terminal.renderRadar(idx, Math.min(total, radarLimit), accent)
            if (total > radarLimit) radar += Terminal.dim(" ...")
            leftBottom = "$alignLabel: $idx / $total | $radar"
        }
        
        // Last 3 events ticker on the right
        def recentEvents = JournalManager.getRecentEvents(3).reverse()
        String tickerTitle = abyssal ? "EVENT_TICKER: [PRESSURE_HIGH]" : "EVENT_TICKER: [SYNC_STABLE]"
        if (player.coherence < 30) tickerTitle = abyssal ? "EVENT_TICKER: [CRITICAL]" : "EVENT_TICKER: [DEGRADED]"
        
        Terminal.drawSplitBoxedLine(leftBottom, tickerTitle, splitPoint, width, accent)
        
        // Show up to 2 recent events in the following lines of the split pane
        List<String> tickerLines = []
        recentEvents.each { tickerLines << it }
        
        // Abyssal Voices
        if (abyssal && new Random().nextInt(10) < 3) {
            String[] voices = ["It is cold down here.", "We see you.", "Return to the surface.", "Bedrock approaching.", "You do not belong here."]
            tickerLines.add(0, "[VOID] " + voices[new Random().nextInt(voices.length)])
        }

        for (int i = 0; i < 2; i++) {
            String event = i < tickerLines.size() ? tickerLines[i] : ""
            // Clean up event string for HUD
            event = event.replace("[DISCOVERY] ", "LOC: ").replace("[CAPTURE] ", "OBJ: ").replace("[SYNTHESIS] ", "SYN: ")
            Terminal.drawSplitBoxedLine("", Terminal.dim(event), splitPoint, width, accent)
        }

        Terminal.drawBoxSeparator(width, accent, "light")
        
        // 4. Trace Buffer Preview
        String bufferInfo = "TRACE_BUFFER: ${player.inventory.size()}/16 FRAGMENTS"
        if (!player.inventory.isEmpty()) {
            def last3 = player.inventory.takeRight(3).reverse()
            def freqs = last3.collect { it.frequency }
            bufferInfo += " | RECENT: ${freqs.join(', ')}Hz"
        }
        
        if (player.coherence < 20) bufferInfo = Terminal.glitchText(bufferInfo, 0.1)
        Terminal.drawBoxedLine(bufferInfo, width, accent)
        
        Terminal.drawBoxBottom(width, accent)
        
        // Status Scan Bar
        println " " + Terminal.colorize("»» SCANNING_LOCAL_TOPOLOGY...", accent)
        println ""
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
                if (bldg) {
                    for (int i = 0; i < bldg.maxFloors; i++) bldg.notifySampled(i)
                    bldg.infusionCount = 7
                    println Terminal.colorize(">>> Building ${bldg.name} PRIMED.", Terminal.GREEN)
                } else {
                    println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
                }
            } else if (choice == "2") {
                if (bldg) {
                    player.inventory << new InventoryItem("${bldg.name} Keystone", 0, 0, true)
                    println Terminal.colorize(">>> KEYSTONE generated in Trace Buffer.", Terminal.GREEN)
                } else {
                    println Terminal.colorize(">>> ERROR: No building ancestor found.", Terminal.RED)
                }
            } else if (choice == "3") {
                if (bldg) {
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

    /**
     * Renders a 2D spatial representation of the current lattice container.
     */
    void renderLatticeMap() {
        if (!(currentLocation instanceof Container)) {
            println Terminal.colorize("\n>>> SCAN_ERROR: Current location does not support spatial projection.", Terminal.RED)
            return
        }
        
        // Coherence Cost
        player.adjustCoherence(-1.0)

        Container container = (Container) currentLocation
        int mapWidth = 30
        int mapHeight = 15
        
        Terminal.MapBuffer buffer = new Terminal.MapBuffer(mapWidth, mapHeight)
        
        // Project children
        Map<List<Integer>, Location> latticeMap = container.getLocalLatticeMap(mapWidth, mapHeight)
        
        latticeMap.each { pos, loc ->
            String symbol = loc.getMapSymbol()
            String color = loc.getMapColor()
            
            // Highlight visited locations
            if (!loc.isVisited()) {
                color = Terminal.dim(color)
            }
            
            buffer.plot(pos[0], pos[1], symbol, color)
        }
        
        // Distortion based on coherence
        if (player.coherence < 30) {
            Random r = new Random()
            int glitchCount = (int)((30 - player.coherence) / 2)
            for (int i = 0; i < glitchCount; i++) {
                buffer.plot(r.nextInt(mapWidth), r.nextInt(mapHeight), Terminal.glitchText("X", 1.0), Terminal.MAGENTA)
            }
        }
        
        // Render
        println "\n" + Terminal.colorize(" [NEURAL_LATTICE_PROJECTION] ", Terminal.L_CYAN)
        println ""
        
        def vibe = currentLocation.getVibe()
        String accent = currentLocation.isAbyssal() ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.WHITE)
        
        Terminal.drawBoxTop(mapWidth + 2, accent)
        buffer.render().each { line ->
            println Terminal.colorize(Terminal.BOX_V, accent) + line + Terminal.colorize(Terminal.BOX_V, accent)
        }
        Terminal.drawBoxBottom(mapWidth + 2, accent)
        
        println "\n" + Terminal.dim("SCAN_ORIGIN: ") + Terminal.bold(currentLocation.getName())
        println Terminal.dim("LEGEND: ") + Terminal.dim("Visited: Bright | Unvisited: Dim | ") + Terminal.colorize("▲ You", Terminal.CYAN)
        println ""
        
        print Terminal.dim("Press ENTER to return to link...")
        scanner.nextLine()
        instantRender = true
    }

    /**
     * Renders a vertical tree visualization of the current world hierarchy.
     */
    void renderLatticeTrace() {
        printLatticeTrace("[NEURAL_LATTICE_TRACE_INITIATED]", 0.0)
        println ""
        print Terminal.dim("Press ENTER to return to link...")
        scanner.nextLine()
        instantRender = true
    }

    /**
     * Internal logic for printing the lattice trace. 
     * Supports optional title override and glitch effects for the exit sequence.
     */
    void printLatticeTrace(String title, double glitchIntensity = 0.0) {
        def icons = [
            "Universe": Terminal.ICON_UNI,
            "CosmicFilament": Terminal.ICON_FIL,
            "GalacticSector": Terminal.ICON_SEC,
            "NullSector": Terminal.ICON_SEC,
            "SolarSystem": Terminal.ICON_SYS,
            "Planet": Terminal.ICON_PLT,
            "Country": Terminal.ICON_CTR,
            "City": Terminal.ICON_CTY,
            "Street": Terminal.ICON_STR,
            "Building": Terminal.ICON_BLD,
            "Floor": Terminal.ICON_FLR,
            "Corridor": Terminal.ICON_COR,
            "Apartment": Terminal.ICON_APT,
            "Room": Terminal.ICON_ROM
        ]

        List<Location> hierarchy = []
        Location p = currentLocation
        while (p != null) {
            hierarchy << p
            p = p.parent
        }
        hierarchy = hierarchy.reverse()

        String header = Terminal.colorize(" $title ", title.contains("DIAGNOSTIC") ? Terminal.YELLOW : Terminal.L_CYAN)
        println "\n" + header
        println ""

        hierarchy.eachWithIndex { loc, i ->
            String rawType = loc.getClass().simpleName.replace("Cosmic", "").replace("Galactic", "").toUpperCase()
            String type = rawType
            String icon = icons[loc.getClass().simpleName] ?: "?"
            String name = loc.getName()
            
            boolean locAbyssal = loc.isAbyssal()

            // Terminology Overrides
            if (locAbyssal) {
                if (loc instanceof Floor) type = "LAYER"
                else if (loc instanceof Corridor) type = "ARTERY"
                else if (loc instanceof Apartment) type = "CRYPT"
                else if (loc instanceof Room) type = "SHARD"
            }

            // Metadata extraction
            String meta = ""
            if (loc instanceof Planet) {
                def v = loc.getVibe()
                if (v) meta = Terminal.dim(" [${locAbyssal ? 'BEDROCK' : 'SURFACE'} | ERA: ${v.timeline.toUpperCase()}]")
            } else if (!locAbyssal) {
                if (loc instanceof Country) {
                    meta = Terminal.dim(" [TRAIT: ${loc.functionalTrait.toUpperCase()}]")
                } else if (loc instanceof City && loc.isRebelDistrict) {
                    meta = Terminal.colorize(" [UNAUTHORIZED_ZONE]", Terminal.RED)
                } else if (loc instanceof Building) {
                    meta = Terminal.dim(" [FLOORS: ${loc.maxFloors}]")
                }
            } else {
                // Abyssal Metadata
                if (loc instanceof Building) {
                    meta = Terminal.colorize(" [BREACHED]", Terminal.RED)
                }
            }

            // Indentation and prefix
            String indent = ""
            String branch = ""
            if (i > 4) {
                indent = "             " + ("    " * (i - 5))
                branch = "└─ "
            }

            String depthStr = String.format("[%02d] ", i)
            String output = "${Terminal.dim(depthStr)} $indent$branch$icon $type : $name$meta"
            
            if (glitchIntensity > 0) {
                output = Terminal.glitchText(output, glitchIntensity)
            }

            if (loc == currentLocation) {
                String accent = locAbyssal ? Terminal.GREY : Terminal.L_CYAN
                println Terminal.bold(" >> " + Terminal.colorize(Terminal.stripAnsi(output), accent))
            } else {
                println "    " + output
            }
        }
    }

    /**
     * Generates a symbolic sparkline of the current depth.
     */
    String getLatticeSparkline() {
        def icons = [
            "Universe": Terminal.ICON_UNI,
            "CosmicFilament": "${Terminal.ICON_FIL}${Terminal.ICON_FIL}${Terminal.ICON_FIL}${Terminal.ICON_FIL}${Terminal.ICON_FIL}",
            "GalacticSector": Terminal.ICON_CTR,
            "NullSector": Terminal.ICON_CTR,
            "SolarSystem": Terminal.ICON_SYS,
            "Planet": Terminal.ICON_PLT,
            "Country": Terminal.ICON_CTR,
            "City": Terminal.ICON_CTY,
            "Street": Terminal.ICON_STR,
            "Building": Terminal.ICON_BLD,
            "Floor": Terminal.ICON_FLR,
            "Corridor": Terminal.ICON_COR,
            "Apartment": Terminal.ICON_APT,
            "Room": Terminal.ICON_ROM
        ]
        
        def vibe = currentLocation.getVibe()
        boolean abyssal = currentLocation.isAbyssal()
        String accent = abyssal ? Terminal.GREY : (vibe?.atmosphericColor ?: Terminal.L_CYAN)

        List<String> line = []
        Location p = currentLocation
        while (p != null) {
            String icon = icons[p.getClass().simpleName] ?: "?"
            if (p == currentLocation) {
                String label = icon
                if (p instanceof Floor && ((Floor)p).number < 0) {
                    label = "${icon}-${Math.abs(((Floor)p).number)}"
                }
                line << Terminal.colorize("[$label]", accent)
            } else {
                line << Terminal.dim(icon)
            }
            p = p.parent
        }
        
        // Limit icons to prevent overflow, using visual width
        int maxLatticeWidth = 50
        if (Terminal.getVisualWidth(line.reverse().join(" ")) > maxLatticeWidth) {
            while (line.size() > 2 && Terminal.getVisualWidth(line.reverse().join(" ") + " ...") > maxLatticeWidth) {
                line.removeAt(line.size() - 1)
            }
            return "LATTICE: " + line.reverse().join(" ") + Terminal.dim(" ...")
        }
        
        return "LATTICE: " + line.reverse().join(" ")
    }

    String renderCoherenceBar() {
        int length = 10
        int filled = (player.coherence * length / 100).toInteger()
        String bar = "█" * filled + "░" * (length - filled)
        String color = Terminal.GREEN
        if (player.coherence < 30) color = Terminal.RED
        else if (player.coherence < 70) color = Terminal.YELLOW
        
        return Terminal.colorize(bar, color)
    }

    /**
     * Extracts a clean, short label for a navigational direction from the current options.
     */
    String getCompassLabel(String keyPrefix, Map options) {
        def entry = options.find { k, v -> k.toLowerCase().startsWith(keyPrefix.toLowerCase()) }
        if (!entry) return ""
        
        String label = entry.key
        // Expected formats: "u. Go Up", "1. Enter: Floor 16", "l. Leave Building"
        if (label.contains(": ")) {
            label = label.substring(label.indexOf(": ") + 2)
        } else if (label.contains(". ")) {
            label = label.substring(label.indexOf(". ") + 2)
        }
        
        // Truncate if too long
        if (label.length() > 15) label = label.substring(0, 12) + "..."
        return label
    }

    void renderCompass(Map options) {
        def vibe = currentLocation.getVibe()
        String accent = vibe?.atmosphericColor ?: Terminal.WHITE
        
        // Extract destinations
        String lblU = getCompassLabel("u.", options)
        String lblD = getCompassLabel("d.", options)
        String lblF = getCompassLabel("f.", options)
        String lblB = getCompassLabel("b.", options)
        String lblL = getCompassLabel("l.", options)

        // Determine icons
        String u = lblU ? Terminal.bold("U") : "·"
        String d = lblD ? Terminal.bold("D") : "·"
        String f = lblF ? Terminal.bold("F") : "·"
        String b = lblB ? Terminal.bold("B") : "·"
        String l = lblL ? Terminal.bold("L") : "·"

        int centerCol = 25
        
        // Line 1: Up
        print " " * (centerCol - 2)
        println Terminal.colorize("[$u] ${Terminal.dim(lblU)}", accent)
        
        // Line 2: Vertical connector
        print " " * (centerCol - 1)
        println Terminal.colorize("║", accent)
        
        // Line 3: Left - Center - Right
        String leftLabel = lblL ?: lblB
        String leftIcon = lblL ? l : b
        String leftPart = leftLabel ? "[$leftIcon] ${Terminal.dim(leftLabel)} " : ""
        int leftWidth = Terminal.getVisualWidth(leftPart)
        int targetLeftPadding = (centerCol - 5) - leftWidth
        String leftPadding = " " * Math.max(0, targetLeftPadding)
        
        print Terminal.colorize(leftPadding + leftPart, accent)
        print Terminal.colorize("═══[╬]═══ ", accent)
        println Terminal.colorize("[$f] ${Terminal.dim(lblF)}", accent)
        
        // Line 4: Vertical connector
        print " " * (centerCol - 1)
        println Terminal.colorize("║", accent)
        
        // Line 5: Down
        print " " * (centerCol - 2)
        print Terminal.colorize("[$d] ${Terminal.dim(lblD)}", accent)
        println ""
    }

    void enterLocation(Location location) {
        Logger.info("Changing location from ${currentLocation?.getPath()} to ${location?.getPath()}")
        this.currentLocation = location
        
        if (location != null) {
            player.markFootprint(location)
            
            // For stability: also mark high-level ancestors if entering a room directly
            Location p = location.parent
            while (p != null) {
                if (p instanceof Building || p instanceof City || p instanceof Planet) {
                    player.markFootprint(p)
                }
                p = p.parent
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
        String fullLabel = previousActionMap[lastChoice] ?: lastChoice ?: ""
        String actionName = fullLabel
        if (fullLabel.contains(". ")) {
            actionName = fullLabel.substring(fullLabel.indexOf(". ") + 2)
        }
        String hudLastAction = lastChoice != null ? " [Last: $actionName]" : ""
        
        print Terminal.dim("---=====================================>>")
        print Terminal.colorize(hudLastAction, Terminal.CYAN)
        print " Enter choice: "
        
        String input
        if (System.console()) {
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
