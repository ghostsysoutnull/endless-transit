package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.*
import groovy.transform.CompileStatic

/**
 * RenderingCoordinator: Orchestrates the UI rendering lifecycle and menus.
 */
@CompileStatic
class RenderingCoordinator {
    private GameState state
    private InputHandler inputHandler
    final BridgeView bridgeView

    RenderingCoordinator(GameState state, InputHandler inputHandler) {
        this.state = state
        this.inputHandler = inputHandler
        this.bridgeView = new BridgeView()
    }

    void renderCurrentState(Map<String, Closure> options) {
        bridgeView.render(state.currentLocation, state.player, options, state.masterLocus)
    }

    void renderLatticeMap() {
        bridgeView.renderLatticeMap(state.currentLocation, state.player)
        inputHandler.waitForEnter()
        state.instantRender = true
    }

    void renderLatticeTrace() {
        bridgeView.renderLatticeTrace(state.currentLocation)
        inputHandler.waitForEnter()
        state.instantRender = true
    }

    void helpMenu() {
        Terminal.println "\n" + Terminal.colorize(" [SYSTEM_HELP_PROTOCOL] ", Terminal.L_CYAN)
        Terminal.println "\nmap/m: Spatial | ll/lattice: Tree | sync: Save | i: Buffer | glitch: Debug | q: Terminate"
        inputHandler.waitForEnter()
        state.instantRender = true
    }

    void glitchMenu(Game game) {
        List<LatticeCommand> cmds = [
            new PrimeBuildingCommand(), 
            new SpawnKeystoneCommand(), 
            new BreachBedrockCommand(), 
            new SetIntegrityCommand()
        ]
        while (true) {
            Terminal.println "\n" + Terminal.colorize(" [LATTICE_GLITCH_INTERFACE] ", Terminal.MAGENTA)
            cmds.eachWithIndex { cmd, i -> 
                Terminal.println "${i + 1}. ${cmd.getLabel().padRight(10)}: ${cmd.getDescription()}" 
            }
            Terminal.print "GLITCH (c to cancel) >> "
            String c = inputHandler.readLine().toLowerCase()
            if (c == "c") break
            try {
                int idx = c.toInteger() - 1
                if (idx >= 0 && idx < cmds.size()) {
                    cmds[idx].execute(game, null)
                    if (cmds[idx].shouldCloseMenu()) break
                }
            } catch (Exception e) { 
                Terminal.println "Invalid." 
            }
        }
        state.instantRender = true
    }
}
