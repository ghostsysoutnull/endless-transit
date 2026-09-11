package com.endlesstransit.ui

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * DirectiveMenuComponent: the EXECUTE_DIRECTIVE block under the compass — options not
 * already shown in the panes, single-key nav commands collapsed into one line — and the
 * global-controls line ([i] Buffer | [sync] Save | ...).
 *
 * Extracted verbatim from BridgeView.renderMenu() (minus its compass call, which is
 * CompassComponent's) and renderGlobalControls() in OOA Phase 7e-ii. Builds lines; never
 * prints. Reads only the option keys; the width argument is unused.
 */
@CompileStatic
class DirectiveMenuComponent implements ViewComponent {

    /** Directive block followed by the global-controls line — the order the frame uses. */
    @Override
    List<String> render(RenderContext ctx, int width) {
        List<String> lines = renderDirectives(ctx)
        lines.addAll(renderGlobalControls())
        return lines
    }

    List<String> renderDirectives(RenderContext ctx) {
        Map<String, Closure> options = ctx.options
        List<String> lines = []
        lines << ("${Terminal.dim("EXECUTE_DIRECTIVE:")}").toString()
        
        List<String> navOptions = []
        options.each { String label, Closure action ->
            String key = label.contains(".") ? label.split("\\.")[0].trim() : label
            
            // Skip items already shown in tables or summarized in Scan (Split Pane Composition)
            if (label.contains("Enter Building:")) return
            if (label.contains("Access:")) return
            if (label.contains("Go to ")) return
            if (label.contains("Travel to ")) return
            if (label.contains("Visit ")) return
            if (label.contains("Land on ")) return
            if (label.contains("Transition to ")) return
            if (label.contains("Detect faint signal:")) return
            if (label.contains("Pulse to ")) return
            if (label.contains("Synchronize with ")) return
            
            // If it's a single-char nav command, collect it for the bottom line
            if (key.length() == 1 && "udfblts".contains(key)) {
                navOptions << "[${Terminal.colorize(key, Terminal.YELLOW)}] ${label.split("\\. ")[1]}".toString()
                return
            }
            
            lines << (label).toString()
        }

        if (!navOptions.isEmpty()) {
            lines << (navOptions.join(Terminal.dim(" | "))).toString()
        }
        return lines
    }

    List<String> renderGlobalControls() {
        List<String> lines = []
        String buffer = "[${Terminal.colorize("i", Terminal.YELLOW)}] Buffer"
        String sync = "[${Terminal.colorize("sync", Terminal.CYAN)}] Save"
        String scan = "[${Terminal.colorize("s", Terminal.L_CYAN)}] Scan"
        String map = "[${Terminal.colorize("m", Terminal.WHITE)}] Map"
        String tree = "[${Terminal.colorize("ll", Terminal.WHITE)}] Tree"
        String snap = "[${Terminal.colorize("p", Terminal.GREEN)}] Snap"
        String quit = "[${Terminal.colorize("quit", Terminal.RED)}] Quit"
        
        lines << ("${buffer} | ${sync} | ${scan} | ${map} | ${tree} | ${snap} | ${quit}").toString()
        return lines
    }
}
