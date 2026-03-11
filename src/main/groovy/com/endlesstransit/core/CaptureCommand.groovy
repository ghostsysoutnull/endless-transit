package com.endlesstransit.core

import com.endlesstransit.ui.CaptureService
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.PlainFormatter
import com.endlesstransit.ui.AnsiFormatter
import groovy.transform.CompileStatic

/**
 * CaptureCommand: Encapsulates the logic for taking a screenshot of the current bridge view.
 */
@CompileStatic
class CaptureCommand implements GameCommand {
    private boolean useAnsi

    CaptureCommand(boolean useAnsi = false) {
        this.useAnsi = useAnsi
    }

    @Override String getLabel() { "Capture" }
    @Override String getDescription() { "Capture a visual snapshot of the current neural link." }

    @Override
    boolean execute(Game game, String choice = null) {
        Terminal.println ""
        Terminal.print Terminal.dim("[VINCULUM] ")
        Terminal.print "Initiating screen capture..."
        
        CaptureService.capture(game.state.bridgeView, game.state.inputHandler.getHistory(), useAnsi ? new AnsiFormatter() : new PlainFormatter())
        
        Terminal.println Terminal.colorize(" [OK]", Terminal.GREEN)
        Terminal.println Terminal.dim("  >> Snapshot routed to /screenshots/")
        Terminal.println ""
        return true
    }
}
