package com.endlesstransit.core

import com.endlesstransit.model.*
import com.endlesstransit.ui.Terminal
import com.endlesstransit.procgen.Gematria
import groovy.transform.CompileStatic

/**
 * ScanCommand: Executes a high-density technical scan of the local area.
 * Prints output directly to the terminal scrollback (outside the HUD).
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
        } else if (loc instanceof Apartment) {
            renderApartmentScan((Apartment) loc, game.player)
        } else if (loc instanceof Room && loc.parent instanceof Apartment) {
            renderApartmentScan((Apartment) loc.parent, game.player)
        } else {
            Terminal.println Terminal.dim("    No scan-compatible structure detected in this strata.")
        }
        
        Terminal.println Terminal.colorize(">>> SCAN_COMPLETE. LOCAL_PHASE_SYNCHRONIZED.", Terminal.L_CYAN)
        Terminal.println ""
        return false // Do not close menu automatically if we want to see the result (though in our loop it doesn't matter much)
    }

    private void renderCorridorScan(Corridor corridor, Player player) {
        int wId = 4
        int wFreq = 8
        int wWave = 6
        int wStat = 8
        int wIdent = 22
        
        Terminal.println("    " + Terminal.dim("┌" + ("─" * 74) + "┐"))
        Terminal.println("    " + Terminal.dim("│ ") + Terminal.bold("${ModelOutput.fmt.padRight("ID", wId)}${ModelOutput.fmt.padRight("FREQ", wFreq)}${ModelOutput.fmt.padRight("WAVE", wWave)}${ModelOutput.fmt.padRight("STATUS", wStat)}${ModelOutput.fmt.padRight("IDENTIFIER", wIdent)} >> ROOM_NAME".toString()) + Terminal.dim(" │"))
        Terminal.println("    " + Terminal.dim("├" + ("─" * 4) + "┼" + ("─" * 8) + "┼" + ("─" * 6) + "┼" + ("─" * 8) + "┼" + ("─" * 22) + "┼" + ("─" * 23) + "┤"))

        List<Apartment> apts = corridor.getApartments()
        List<Door> drs = corridor.getDoors()

        apts.eachWithIndex { Apartment apt, int i ->
            Door door = drs[i]
            String id = String.format("%02d", i + 1)
            
            String roomName = "?? UNKNOWN ??"
            String status = Terminal.dim("[ENC]")
            String signature = "????Hz"
            String wave = "---"
            
            List<Room> rms = apt.getRooms()
            if (!rms.isEmpty()) {
                Room firstRoom = rms[0]
                roomName = firstRoom.roomName
                status = firstRoom.isAnomaly ? Terminal.colorize("[DEG]", Terminal.RED) : Terminal.colorize("[STB]", Terminal.GREEN)
                int freq = Gematria.calculateFrequency(roomName, firstRoom.getDepth())
                signature = String.format("%04dHz", freq)
                
                if (firstRoom.isAnomaly) wave = Terminal.colorize("###", Terminal.RED)
                else if (freq % 11 == 0) wave = Terminal.colorize("≈≈≈", Terminal.GREEN)
                else wave = Terminal.colorize("~~~", Terminal.CYAN)
            }

            String ident = Terminal.ansiSafeTruncate(door.getDescription(), wIdent - 1)
            
            Terminal.print("    " + Terminal.dim("│ "))
            Terminal.print(ModelOutput.fmt.padRight(id, wId))
            Terminal.print(ModelOutput.fmt.padRight(signature, wFreq))
            Terminal.print(ModelOutput.fmt.padRight(wave, wWave))
            Terminal.print(ModelOutput.fmt.padRight(status, wStat))
            Terminal.print(ModelOutput.fmt.padRight(ident, wIdent))
            Terminal.print(" >> " + Terminal.ansiSafeTruncate(roomName, 20))
            Terminal.println(Terminal.dim(" │"))
        }
        
        Terminal.println("    " + Terminal.dim("└" + ("─" * 74) + "┘"))
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
