package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.procgen.Gematria
import groovy.transform.CompileStatic

/**
 * ScanCommand: Executes a high-density technical scan of the local area.
 * Prints output directly to the terminal scrollback (outside the HUD).
 * Refactored to support the new Door sensory substrate and Elevator-Corridor pivot.
 */
@CompileStatic
class ScanCommand implements LatticeCommand {

    @Override
    String getLabel() {
        return "Scan"
    }

    @Override
    String getDescription() {
        return "Execute a deep technical scan of local frequencies and signatures."
    }

    @Override
    boolean execute(Game game) {
        Location loc = game.currentLocation
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
        return false 
    }

    private void renderCorridorScan(Corridor corridor, Player player) {
        int wId = 3
        int wTrace = 10
        int wInscr = 14
        int wMat = 20
        int wState = 10
        
        Terminal.println("    " + Terminal.dim("┌" + ("─" * 84) + "┐"))
        Terminal.println("    " + Terminal.dim("│ ") + Terminal.bold("${ModelOutput.fmt.padRight("ID", wId)}${ModelOutput.fmt.padRight("TRACE", wTrace)}${ModelOutput.fmt.padRight("INSCRIPTION", wInscr)}${ModelOutput.fmt.padRight("MATERIAL", wMat)}${ModelOutput.fmt.padRight("STATE", wState)} >> ROOM_TYPE".toString()) + Terminal.dim(" │"))
        Terminal.println("    " + Terminal.dim("├" + ("─" * wId) + "┼" + ("─" * wTrace) + "┼" + ("─" * wInscr) + "┼" + ("─" * wMat) + "┼" + ("─" * wState) + "┼" + ("─" * 26) + "┤"))

        List<Apartment> apts = corridor.getApartments()
        List<Door> drs = corridor.getDoors()

        apts.eachWithIndex { Apartment apt, int i ->
            Door door = drs[i]
            String id = String.format("%02d", i + 1)
            
            String traceName = door.trace != null ? door.trace.name : "None"
            String inscr = door.inscription != null ? door.inscription.getFormattedText() : ""
            String mat = door.appearance != null ? door.appearance.material : "Standard Barrier"
            String state = door.appearance != null ? door.appearance.physicalState : "Stable"
            
            String roomType = "?? UNKNOWN ??"
            List<Room> rms = apt.getRooms()
            if (!rms.isEmpty()) {
                roomType = rms[0].roomType
            }

            Terminal.print("    " + Terminal.dim("│ "))
            Terminal.print(ModelOutput.fmt.padRight(id, wId))
            Terminal.print(ModelOutput.fmt.padRight(traceName, wTrace))
            Terminal.print(ModelOutput.fmt.padRight(inscr, wInscr))
            Terminal.print(ModelOutput.fmt.padRight(mat, wMat))
            Terminal.print(ModelOutput.fmt.padRight(state, wState))
            Terminal.print(" >> " + Terminal.ansiSafeTruncate(roomType, 22))
            Terminal.println(Terminal.dim(" │"))
        }
        
        Terminal.println("    " + Terminal.dim("└" + ("─" * 84) + "┘"))
    }

    private void renderBuildingScan(Building building, Player player) {
        if (building == null) return
        Terminal.println Terminal.dim("    Initiating vertical strata pulse...")
        Terminal.println "    " + Terminal.dim("BUILDING: ${building.name} [LIP: ${building.getLIP()}]")
        Terminal.println "    " + Terminal.dim("TOTAL_STRATA: ${building.maxFloors} units detected.")
        
        // Find current floor index
        int cur = -1
        if (player.currentLocation instanceof Floor) cur = ((Floor)player.currentLocation).number

        Terminal.println "    " + Terminal.dim("NEURAL_PROXIMITY_REPORT:")
        for (int i = building.maxFloors - 1; i >= 0; i--) {
            if (Math.abs(i - cur) <= 2) { // Show 2 floors above and below
                String marker = (i == cur) ? ">>" : "  "
                String zone = building.getFloorZone(i)
                Terminal.println "    ${Terminal.colorize(marker, Terminal.YELLOW)} ${String.format("%02d", i)}. [${zone}]"
            }
        }
    }

    private void renderApartmentScan(Apartment apartment, Player player) {
        int wId = 4
        int wFreq = 8
        int wWave = 6
        int wStat = 10
        int wType = 20

        Terminal.println("    " + Terminal.dim("┌" + ("─" * 74) + "┐"))
        Terminal.println("    " + Terminal.dim("│ ") + Terminal.bold("${ModelOutput.fmt.padRight("ID", wId)}${ModelOutput.fmt.padRight("FREQ", wFreq)}${ModelOutput.fmt.padRight("WAVE", wWave)}${ModelOutput.fmt.padRight("STATUS", wStat)}${ModelOutput.fmt.padRight("TYPE", wType)} >> IDENTIFIER".toString()) + Terminal.dim(" │"))
        Terminal.println("    " + Terminal.dim("├" + ("─" * 4) + "┼" + ("─" * 8) + "┼" + ("─" * 6) + "┼" + ("─" * 10) + "┼" + ("─" * 20) + "┼" + ("─" * 23) + "┤"))

        List<Room> rms = apartment.getRooms()
        rms.eachWithIndex { Room room, int i ->
            String id = String.format("%02d", i + 1)
            String type = room.roomType
            String name = room.roomName
            String status = room.isVisited() ? Terminal.colorize("[VISITED]", Terminal.GREEN) : Terminal.dim("[UNSTABLE]")
            
            int freq = Gematria.calculateFrequency(name, room.getDepth())
            String signature = String.format("%04dHz", freq)
            String wave = (freq % 11 == 0) ? Terminal.colorize("≈≈≈", Terminal.GREEN) : Terminal.colorize("~~~", Terminal.CYAN)
            if (room.isAnomaly) wave = Terminal.colorize("###", Terminal.RED)

            Terminal.print("    " + Terminal.dim("│ "))
            Terminal.print(ModelOutput.fmt.padRight(id, wId))
            Terminal.print(ModelOutput.fmt.padRight(signature, wFreq))
            Terminal.print(ModelOutput.fmt.padRight(wave, wWave))
            Terminal.print(ModelOutput.fmt.padRight(status, wStat))
            Terminal.print(ModelOutput.fmt.padRight(type, wType))
            Terminal.print(" >> " + Terminal.ansiSafeTruncate(name, 20))
            Terminal.println(Terminal.dim(" │"))
        }
        
        Terminal.println("    " + Terminal.dim("└" + ("─" * 74) + "┘"))
    }
}
