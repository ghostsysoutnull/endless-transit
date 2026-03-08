package com.endlesstransit.core

import com.endlesstransit.ui.Terminal
import groovy.transform.CompileStatic

@CompileStatic
class SetIntegrityCommand implements LatticeCommand {
    String getLabel() { "INTEGRITY" }
    String getDescription() { "Set neural link coherence level." }

    boolean execute(Game game) {
        print "Set Integrity (0-100): "
        try {
            int val = game.inputHandler.readLine().toInteger()
            game.player.coherence = Math.max(0, Math.min(100, val))
            println Terminal.colorize(">>> Integrity set to ${game.player.coherence}%.", Terminal.YELLOW)
        } catch (Exception e) {
            println "Invalid value."
        }
        return false
    }
}
