package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

/**
 * QuantumBufferController: Manages the inventory interaction logic.
 */
@CompileStatic
class QuantumBufferController {
    
    void open(Game game) {
        InputHandler inputHandler = game.inputHandler
        Player player = game.player
        Location currentLocation = game.currentLocation

        while (true) {
            println "\n" + Terminal.colorize(" [QUANTUM_TRACE_BUFFER_INTERACE] ", Terminal.L_CYAN)
            player.listInventory()
            println Terminal.dim("-------------------------------------------")
            println "${Terminal.colorize("d [num]", Terminal.YELLOW)}: Drop item  |  ${Terminal.colorize("m [n1] [n2]", Terminal.YELLOW)}: Merge items"
            println "${Terminal.colorize("b", Terminal.YELLOW)}: Back to reality"
            
            print "\nBUFFER_CMD >> "
            String input = inputHandler.readLine().toLowerCase()
            
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
}
