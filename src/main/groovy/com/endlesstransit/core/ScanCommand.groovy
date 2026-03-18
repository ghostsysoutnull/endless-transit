package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.procgen.Gematria
import groovy.transform.CompileStatic

/**
 * ScanCommand: Executes a high-density technical scan of the local area.
 * Refactored for Dual-Layer Scan: [DATA_SUMMARY] + [SENSORY_TELEMETRY].
 */
@CompileStatic
class ScanCommand implements GameCommand, LatticeCommand {

    @Override
    String getLabel() {
        return "Scan"
    }

    @Override
    String getDescription() {
        return "Execute a deep technical scan of local frequencies and signatures."
    }

    @Override
    boolean shouldCloseMenu() { false }

    @Override
    boolean execute(Game game, String choice = null) {
        Location loc = game.getCurrentLocation()
        Terminal.println ""
        Terminal.println Terminal.colorize(">>> LOCAL_LATTICE_SCAN_INITIATED [LOCUS: ${loc.getLIP()}]", Terminal.L_CYAN)
        
        if (loc instanceof Corridor) {
            renderCorridorScan((Corridor) loc, game.player)
        } else if (loc instanceof Floor) {
            Floor floor = (Floor) loc
            if (floor.isCorridorActive) {
                renderCorridorScan(floor.getCorridor(), game.player)
            } else {
                renderBuildingScan((Building) floor.parent, game.player)
            }
        } else if (loc instanceof Apartment) {
            renderApartmentScan((Apartment) loc, game.player)
        } else if (loc instanceof Room && loc.parent instanceof Apartment) {
            renderApartmentScan((Apartment) loc.parent, game.player)
        } else {
            Terminal.println Terminal.dim("    No scan-compatible structure detected in this strata.")
        }
        
        Terminal.println Terminal.colorize(">>> SCAN_COMPLETE. LOCAL_PHASE_SYNCHRONIZED.", Terminal.L_CYAN)
        Terminal.println ""
        
        game.getInputHandler().waitForEnter()
        
        return true 
    }

    private void renderCorridorScan(Corridor corridor, Player player) {
        int wId = 2
        int wTrace = 10
        int wInscr = 14
        int wMat = 20
        int wState = 10
        int wRoom = 24
        int totalInternal = 85
        
        String top = "┌" + ("─" * totalInternal) + "┐"
        String mid = "├" + ("─" * wId) + "┼" + ("─" * wTrace) + "┼" + ("─" * wInscr) + "┼" + ("─" * wMat) + "┼" + ("─" * wState) + "┼" + ("─" * wRoom) + "┤"
        String bot = "└" + ("─" * totalInternal) + "┘"
        String sep = Terminal.dim("│")
        
        Terminal.println Terminal.bold("    [DATA_SUMMARY]:")
        Terminal.println("    " + Terminal.dim(top))
        
        // Header Row
        Terminal.print("    " + Terminal.dim("│"))
        Terminal.print("${ModelOutput.fmt.padRight("ID", wId)}${sep}${ModelOutput.fmt.padRight("TRACE", wTrace)}${sep}${ModelOutput.fmt.padRight("INSCRIPTION", wInscr)}${sep}${ModelOutput.fmt.padRight("MATERIAL", wMat)}${sep}${ModelOutput.fmt.padRight("STATE", wState)}${sep}${ModelOutput.fmt.padRight("ROOM_TYPE", wRoom)}")
        Terminal.println(Terminal.dim("│"))
        
        Terminal.println("    " + Terminal.dim(mid))

        List<Apartment> apts = corridor.getApartments()
        List<Door> drs = corridor.getDoors()

        apts.eachWithIndex { Apartment apt, int i ->
            Door door = drs[i]
            String id = String.format("%02d", i + 1)
            String traceName = door.trace?.name ?: "None"
            String inscr = door.inscription?.getFormattedText() ?: ""
            String mat = door.appearance.material
            String state = door.appearance.physicalState
            
            String roomType = "?? UNKNOWN ??"
            List<Room> rms = apt.getRooms()
            if (!rms.isEmpty()) roomType = rms[0].roomType

            Terminal.print("    " + Terminal.dim("│"))
            Terminal.print(ModelOutput.fmt.padRight(id, wId))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(traceName, wTrace))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(inscr, wInscr))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(mat, wMat))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(state, wState))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(Terminal.ansiSafeTruncate(roomType, wRoom), wRoom))
            Terminal.println(Terminal.dim("│"))
        }
        Terminal.println("    " + Terminal.dim(bot))
        
        // Phase 2: Narrative
        Terminal.println ""
        Terminal.println Terminal.bold("    [SENSORY_TELEMETRY]:")
        apts.eachWithIndex { Apartment apt, int i ->
            Door door = drs[i]
            String id = String.format("%02d", i + 1)
            String narrative = door.getFullNarrative()
            
            Terminal.print "    " + Terminal.colorize("${id}. ", Terminal.CYAN)
            List<String> wrapped = Terminal.wrapText(narrative, 80)
            wrapped.eachWithIndex { String line, int lineIdx ->
                if (lineIdx == 0) {
                    Terminal.println line
                } else {
                    Terminal.println "        " + line
                }
            }
            Terminal.println ""
        }
    }

    private void renderBuildingScan(Building building, Player player) {
        if (building == null) return
        Terminal.println Terminal.dim("    Initiating vertical strata pulse...")
        Terminal.println "    " + Terminal.dim("BUILDING: ${building.name} [LIP: ${building.getLIP()}]")
        Terminal.println "    " + Terminal.dim("TOTAL_STRATA: ${building.maxFloors} units detected.")
        
        int cur = -1
        if (player.currentLocation instanceof Floor) cur = ((Floor)player.currentLocation).number

        Terminal.println "    " + Terminal.dim("NEURAL_PROXIMITY_REPORT:")
        for (int i = building.maxFloors - 1; i >= 0; i--) {
            if (Math.abs(i - cur) <= 2) {
                String marker = (i == cur) ? ">>" : "  "
                String zone = building.getFloorZone(i)
                Terminal.println "    ${Terminal.colorize(marker, Terminal.YELLOW)} ${String.format("%02d", i)}. [${zone}]"
            }
        }
    }

    private void renderApartmentScan(Apartment apartment, Player player) {
        int wId = 2
        int wFreq = 8
        int wWave = 6
        int wStat = 10
        int wType = 20
        int wIdent = 24
        int totalInternal = 75
        
        String top = "┌" + ("─" * totalInternal) + "┐"
        String mid = "├" + ("─" * wId) + "┼" + ("─" * wFreq) + "┼" + ("─" * wWave) + "┼" + ("─" * wStat) + "┼" + ("─" * wType) + "┼" + ("─" * wIdent) + "┤"
        String bot = "└" + ("─" * totalInternal) + "┘"
        String sep = Terminal.dim("│")

        Terminal.println Terminal.bold("    [STRATA_OVERVIEW]:")
        Terminal.println("    " + Terminal.dim(top))
        
        // Header
        Terminal.print("    " + Terminal.dim("│"))
        Terminal.print("${ModelOutput.fmt.padRight("ID", wId)}${sep}${ModelOutput.fmt.padRight("FREQ", wFreq)}${sep}${ModelOutput.fmt.padRight("WAVE", wWave)}${sep}${ModelOutput.fmt.padRight("STATUS", wStat)}${sep}${ModelOutput.fmt.padRight("TYPE", wType)}${sep}${ModelOutput.fmt.padRight("IDENTIFIER", wIdent)}")
        Terminal.println(Terminal.dim("│"))
        
        Terminal.println("    " + Terminal.dim(mid))

        List<Room> rms = apartment.getRooms()
        rms.eachWithIndex { Room room, int i ->
            String id = String.format("%02d", i + 1)
            String type = room.roomType
            String name = room.roomName
            String status = room.isVisited() ? Terminal.colorize("[VISITED]", Terminal.GREEN) : Terminal.dim("[UNSTABLE]")
            
            int freq = Gematria.calculateFrequency(name, room.getDepth()).value
            String signature = String.format("%04dHz", freq)
            String wave = (freq % 11 == 0) ? Terminal.colorize("≈≈≈", Terminal.GREEN) : Terminal.colorize("~~~", Terminal.CYAN)
            if (room.isAnomaly) wave = Terminal.colorize("###", Terminal.RED)

            Terminal.print("    " + Terminal.dim("│"))
            Terminal.print(ModelOutput.fmt.padRight(id, wId))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(signature, wFreq))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(wave, wWave))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(status, wStat))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(Terminal.ansiSafeTruncate(type, wType), wType))
            Terminal.print(sep)
            Terminal.print(ModelOutput.fmt.padRight(Terminal.ansiSafeTruncate(name, wIdent), wIdent))
            Terminal.println(Terminal.dim("│"))
        }
        Terminal.println("    " + Terminal.dim(bot))
    }
}
