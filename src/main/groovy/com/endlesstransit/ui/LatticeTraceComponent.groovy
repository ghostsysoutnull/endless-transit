package com.endlesstransit.ui

import com.endlesstransit.model.*
import groovy.transform.CompileStatic

/**
 * LatticeTraceComponent: the ancestor chain from Universe down to the current location —
 * one line per level with icon, type, name and meta, indented from depth 5, the current
 * node marked with >>. Used by the `ll` command and by SessionRecap at exit (with the
 * DIAGNOSTIC title and, on abyssal exit, a glitch intensity).
 *
 * Extracted verbatim from BridgeView.printLatticeTrace() / renderLatticeTrace() in OOA
 * Phase 7d-i. Builds lines; never prints. Two elements start with "\n" exactly as the
 * original printed them (the sinks split on newline) — to be normalised at 7g.
 */
@CompileStatic
class LatticeTraceComponent implements ViewComponent {

    static final String DEFAULT_TITLE = "[NEURAL_LATTICE_TRACE_INITIATED]"

    /** The `ll` screen: default title, no glitch, trailing blank line. */
    @Override
    List<String> render(RenderContext ctx, int width) {
        List<String> lines = renderTrace(ctx, DEFAULT_TITLE, 0.0)
        lines << ""
        return lines
    }

    /** The trace with an explicit title and glitch intensity (SessionRecap's exit diagnostic). */
    List<String> renderTrace(RenderContext ctx, String title, double glitchIntensity) {
        Location currentLocation = ctx.location
        List<String> lines = []
        Map<String, String> icons = [
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
        lines << ("\n" + header).toString()
        lines << ("").toString()

        hierarchy.eachWithIndex { Location loc, int i ->
            String icon = icons[loc.getClass().simpleName] ?: "?"
            String name = loc.getName()
            String type = loc.getTypeLabel()
            String meta = loc.getLatticeMeta()

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
                String accent = loc.isAbyssal() ? Terminal.GREY : Terminal.L_CYAN
                lines << (Terminal.bold(" >> " + Terminal.colorize(Terminal.stripAnsi(output), accent))).toString()
            } else {
                lines << ("    " + output).toString()
            }
        }
        return lines
    }
}
