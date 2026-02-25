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

    Game() {
        player = new Player()
        scanner = new Scanner(System.in)
        initializeWorld()
    }

    void initializeWorld() {
        def universe = new Universe()
        
        // Start deep: Universe > Filament > Sector > System > Planet > Country > City > Street
        def filament = universe.filaments[0]
        def node = filament.children[0]
        
        // Find a SolarSystem within the node (GalacticSector or NullSector)
        def system = node.children[0]
        
        def planet = system.planets[0]
        def country = planet.countries[0]
        def city = country.cities[0]
        currentLocation = city.streets[0]
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
                println ""
                renderCompass(options)
                println("${Terminal.dim("EXECUTE_DIRECTIVE:")}")
                menu.each { menuKey, action ->
                    String label = currentActionMap[menuKey]
                    if (currentLocation instanceof Street && label.contains("Enter Building:")) {
                        return
                    }
                    println(label)
                }
                println("${Terminal.colorize("i", Terminal.YELLOW)}. Open Trace Buffer")
                println("${Terminal.colorize("quit", Terminal.RED)}. Terminate Link")

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
                    JournalManager.saveSession(player)
                    println(Terminal.colorize("Goodbye!", Terminal.L_CYAN))
                    break
                }
                continue
            }

            Logger.info("Executing choice: $choice")
            // Find matching menu entry
            def matchingKey = menu.keySet().find { key ->
                return key.equalsIgnoreCase(choice)
            }

            if (matchingKey) {
                player.stepCount++
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
                    player.mergeItems(idx1, idx2)
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
        String accent = vibe?.atmosphericColor ?: Terminal.WHITE
        
        Terminal.drawBoxTop(width, accent)
        
        // 1. Sparkline & Traversal
        String sparkline = getLatticeSparkline()
        String globalStats = "PULSE_TRAVERSAL: ${player.stepCount} | COHERENCE: ${player.coherence}%"
        String topRow = "$sparkline | $globalStats"
        Terminal.drawBoxedLine(topRow, width, accent)
        
        // 2. Navigation Path (Full width now)
        String path = currentLocation.getPath()
        String prefix = "LOCUS_TRACE: "
        int maxPathWidth = width - 6 // More breathing room
        if (Terminal.getVisualWidth(path) + prefix.length() > maxPathWidth) {
            path = "..." + path.substring(path.length() - (maxPathWidth - prefix.length() - 3))
        }
        Terminal.drawBoxedLine("$prefix$path", width, accent)
        
        Terminal.drawBoxSeparator(width, accent, "light")
        
        // 3. Local Diagnostic (Left) & System Status (Right)
        String ident = "LATTICE_IDENT: ${currentLocation.getClass().simpleName} >> ${currentLocation.getName()}"
        String sysDiag = "SYSTEM_DIAGNOSTIC: [NOMINAL]"
        Terminal.drawSplitBoxedLine(ident, sysDiag, splitPoint, width, accent)
        
        String coords = "LOCUS_HASH: ${currentLocation.getCoordinates()} | HOP_DENSITY: ${currentLocation.getDepth()}"
        String cohBar = "COHERENCE: " + renderCoherenceBar()
        Terminal.drawSplitBoxedLine(coords, cohBar, splitPoint, width, accent)
        
        // Structural Alignment & Radar
        int idx = currentLocation.getIndexInParent()
        int total = currentLocation.getTotalInParent()
        String leftBottom = ""
        if (total > 0) {
            String alignLabel = "ALIGN"
            if (currentLocation instanceof Floor) alignLabel = "Z-AXIS"
            if (currentLocation instanceof Room) alignLabel = "INDEX"
            
            int radarLimit = 20
            String radar = Terminal.renderRadar(idx, Math.min(total, radarLimit), accent)
            if (total > radarLimit) radar += Terminal.dim(" ...")
            leftBottom = "$alignLabel: $idx / $total | $radar"
        }
        
        // Last 3 events ticker on the right
        def recentEvents = JournalManager.getRecentEvents(3).reverse()
        String tickerTitle = "EVENT_TICKER: [SYNC_STABLE]"
        if (player.coherence < 30) tickerTitle = "EVENT_TICKER: [DEGRADED]"
        
        Terminal.drawSplitBoxedLine(leftBottom, tickerTitle, splitPoint, width, accent)
        
        // Show up to 2 recent events in the following lines of the split pane
        for (int i = 0; i < 2; i++) {
            String event = i < recentEvents.size() ? recentEvents[i] : ""
            // Clean up event string for HUD (remove brackets if they take too much space)
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
        String accent = vibe?.atmosphericColor ?: Terminal.L_CYAN

        List<String> line = []
        Location p = currentLocation
        while (p != null) {
            String icon = icons[p.getClass().simpleName] ?: "?"
            if (p == currentLocation) {
                line << Terminal.colorize("[$icon]", accent)
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
        String leftPart = lblL ? "[$l] ${Terminal.dim(lblL)} " : ""
        int leftWidth = Terminal.getVisualWidth(leftPart)
        int targetLeftPadding = (centerCol - 5) - leftWidth
        String leftPadding = " " * Math.max(0, targetLeftPadding)
        
        print Terminal.colorize(leftPadding + leftPart, accent)
        print Terminal.colorize("═══[╬]═══ ", accent)
        println Terminal.colorize("[$f] ${Terminal.dim(lblF)}", accent)
        
        // Line 4: Vertical connector
        print " " * (centerCol - 1)
        println Terminal.colorize("║", accent)
        
        // Line 5: Down & Back
        print " " * (centerCol - 2)
        print Terminal.colorize("[$d] ${Terminal.dim(lblD)}", accent)
        if (lblB) {
            print Terminal.dim("  ($b: $lblB)")
        }
        println ""
    }

    void enterLocation(Location location) {
        Logger.info("Changing location from ${currentLocation?.getPath()} to ${location?.getPath()}")
        this.currentLocation = location
        
        // Record path if it's macro-scale (up until Building)
        if (location != null) {
            boolean isMacro = !(location instanceof Floor || location instanceof Corridor || 
                                location instanceof Apartment || location instanceof Room)
            String path = location.getPath()
            if (isMacro) {
                if (!player.visitedPaths.contains(path)) {
                    player.visitedPaths.add(path)
                    JournalManager.logDiscovery(path, location)
                }
            } else {
                // If we enter a building's internal structure, ensure the Building itself is recorded
                // This handles cases where we might jump directly or for consistency
                Location p = location.parent
                while (p != null) {
                    if (p instanceof Building) {
                        String bPath = p.getPath()
                        if (!player.visitedPaths.contains(bPath)) {
                            player.visitedPaths.add(bPath)
                            JournalManager.logDiscovery(bPath, p)
                        }
                        break
                    }
                    p = p.parent
                }
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
        
        if (input.equalsIgnoreCase("quit")) {
            return "quit"
        }

        return input
    }
}
