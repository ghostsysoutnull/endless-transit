package com.endlesstransit.core

import com.endlesstransit.ui.CaptureService
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.PlainFormatter
import groovy.transform.CompileStatic

/**
 * QuitNowCommand: Hidden command that exits reality immediately.
 * No confirmation, no saving, but generates a final visual snapshot.
 */
@CompileStatic
class QuitNowCommand implements GameCommand {
    @Override String getLabel() { "Emergency Disconnect" }
    @Override String getDescription() { "Terminate neural link immediately. Data loss imminent." }

    @Override
    boolean execute(Game game, String choice = null) {
        Terminal.println ""
        Terminal.print Terminal.colorize("[VINCULUM:EMERGENCY_DISCONNECT]", Terminal.RED)
        Terminal.println Terminal.dim(" | FINALIZING_SNAPSHOT...")
        
        // Capture a final plain-text screenshot
        CaptureService.capture(game.state.bridgeView, game.state.inputHandler.getHistory(), new PlainFormatter())
        
        Terminal.println Terminal.colorize("[VINCULUM:SYSTEM_HALT]", Terminal.RED)
        return false // Terminate loop
    }
}
