package com.endlesstransit.ui
import com.endlesstransit.ui.Terminal

import com.endlesstransit.core.Player
import com.endlesstransit.model.Location
import groovy.transform.CompileStatic

/**
 * SessionRecap: Responsible for terminal sequences when ending a session.
 */
@CompileStatic
class SessionRecap {
    
    static void show(Location currentLocation, Player player, BridgeView bridgeView) {
        Terminal.clearScreen()
        boolean isAbyssal = currentLocation.isAbyssal()
        int footprintsCount = player.footprints.size()

        if (isAbyssal) {
            bridgeView.printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", currentLocation, 0.1)
            Terminal.println "\n" + Terminal.colorize(" [VOID_RESONANCE_TERMINATION] ", Terminal.RED)
            String[] lines = [
                "Your echoes are sinking into the strata.",
                "The web is folding back upon itself.",
                "The v-v-void... it remembers... [OK]",
                "Sleep among the static, Operator."
            ]
            lines.each { String line ->
                String text = Terminal.glitchText(line, 0.05)
                Terminal.typewrite(text, 40)
                Thread.sleep(500)
            }
        } else if (footprintsCount >= 20) {
            bridgeView.printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", currentLocation, 0.0)
            Terminal.println "\n" + Terminal.colorize(" [SESSION_RECAP_INITIALIZED] ", Terminal.L_CYAN)
            Terminal.println Terminal.dim("-------------------------------------------")
            Thread.sleep(300)
            Terminal.printf("%-18s : %s\n", "FINAL_LOCUS", currentLocation.getLIP())
            Thread.sleep(200)
            Terminal.printf("%-18s : %d steps\n", "PULSE_TRAVERSAL", player.stepCount)
            Thread.sleep(200)
            Terminal.printf("%-18s : %d footprints\n", "CELLS_MAPPED", footprintsCount)
            Thread.sleep(200)
            Terminal.printf("%-18s : %d spectral fragments\n", "BUFFER_DENSITY", player.inventory.size())
            Thread.sleep(200)
            Terminal.printf("%-18s : %d stabilized\n", "RESONANT_TRACES", player.resonantTracesCount)
            Thread.sleep(300)
            Terminal.println Terminal.dim("-------------------------------------------")
            Terminal.println "Expedition successful. Trace synchronized to substrate."
            Thread.sleep(1000)
        } else {
            bridgeView.printLatticeTrace("[FINAL_NEURAL_TRACE_DIAGNOSTIC]", currentLocation, 0.0)
            Terminal.println "\n" + Terminal.colorize(" [LINK_TERMINATION_PROTOCOL] ", Terminal.WHITE)
            String[] processes = [
                "UNMOUNTING_LATTICE_TRACE",
                "DEALLOCATING_TRACE_BUFFER",
                "RELEASING_NEURAL_CARRIER",
                "STABILIZING_SUBSTRATE_WAVEFORM"
            ]
            processes.each { String proc ->
                Terminal.print Terminal.dim("[STATUS] ") + proc + "..."
                Thread.sleep(new Random().nextInt(400) + 100)
                Terminal.println Terminal.colorize(" [DONE]", Terminal.GREEN)
            }
            Terminal.println "\nNeural link severed. Waveform stabilized."
            Thread.sleep(1000)
        }
        Terminal.println ""
    }
}
