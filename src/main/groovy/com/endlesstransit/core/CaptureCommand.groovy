package com.endlesstransit.core

import com.endlesstransit.ui.CaptureService
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.BridgeView
import com.endlesstransit.ui.PlainFormatter
import com.endlesstransit.ui.AnsiFormatter
import groovy.transform.CompileStatic

/**
 * Encapsulates the logic for taking a screenshot of the current bridge view.
 */
@CompileStatic
class CaptureCommand {
    static void execute(BridgeView bridgeView, List<String> history, boolean useAnsi = false) {
        Terminal.println ""
        Terminal.print Terminal.dim("[VINCULUM] ")
        Terminal.print "Initiating screen capture..."
        
        CaptureService.capture(bridgeView, history, useAnsi ? new AnsiFormatter() : new PlainFormatter())
        
        Terminal.println Terminal.colorize(" [OK]", Terminal.GREEN)
        Terminal.println Terminal.dim("  >> Snapshot routed to /screenshots/")
        Terminal.println ""
    }
}
