package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.procgen.ProceduralFactory
import com.endlesstransit.procgen.LocusSeed
import groovy.transform.CompileStatic
import groovy.transform.PackageScope

@CompileStatic
class Floor extends Container {
    int number
    @PackageScope Corridor corridor
    String culture
    String timeline

    Corridor getCorridor() {
        ensureChildrenPopulated()
        return corridor
    }

    @Override
    String getSparklineLabel() {
        if (number < 0) return "${"▤"}-${Math.abs(number)}"
        return "▤"
    }

    @Override
    String getIndexLabel() {
        return isAbyssal() ? HUDLabels.STRATA : HUDLabels.Z_AXIS
    }

    @Override
    String getTypeLabel() {
        return number < 0 ? "LAYER" : "FLOOR"
    }

    @Override
    String getTypeName() {
        return number < 0 ? "Layer" : "Floor"
    }

    @Override
    String getName() {
        if (number < 0) {
            return "Layer -0x" + Integer.toHexString(Math.abs(number)).toUpperCase()
        }
        return "Floor $number"
    }

    @Override
    String getDescription() {
        if (number < 0) {
            return "${getName()}. The air is thick with oily static and the hum of abyssal substrate."
        }
        return "Floor ${number}. The air hums with the resonance of ${ModelOutput.fmt.colorize(culture.toUpperCase(), "CYAN")} geometry."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Logger.info("Getting options for Floor $number")
        Map<String, Closure> options = getBaseOptions(game)
        
        if (parent instanceof Building) {
            Building bldg = (Building) parent
            if (number < bldg.maxFloors - 1) {
                options["u. Go Up"] = { game.enterLocation(bldg.getFloor(number + 1)) }
            } else if (!bldg.isBreached && bldg.isPrimed()) {
                // At the Peak and primed
                InventoryItem keystone = game.player.inventory.find { it.isKeystone && it.name.contains(bldg.name) }
                if (keystone != null) {
                    options["j. Breach the Bedrock"] = {
                        game.player.inventory.remove(keystone)
                        bldg.breach()
                        game.instantRender = true
                    }
                }
            }
            if (number != 0) {
                options["d. Go Down"] = { game.enterLocation(bldg.getFloor(number - 1)) }
            } else if (bldg.isBreached && number == 0) {
                options["d. Descend into the Substrate"] = {
                    game.enterLocation(bldg.getFloor(-1))
                }
            }
        }
        
        options["c. Enter Corridor"] = { game.enterLocation(getCorridor()) }
        return options
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Corridor) {
            this.corridor = (Corridor) location
        }
    }

    @Override
    void enter(Player player) {
        Logger.info("Entering Floor $number")
        markVisited()
    }

    Floor(int number, int apartmentsPerFloor, String culture = "rust", String timeline = "ancient", LocusSeed locus = new LocusSeed(0L)) {
        this.number = number
        this.locus = locus
        this.culture = number < 0 ? "abyssal" : culture
        this.timeline = timeline
        this.apartmentsPerFloor = apartmentsPerFloor
    }
    
    int apartmentsPerFloor

    @Override
    void populateChildren() {
        ProceduralFactory.instance.populateFloor(this)
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "▤"
    }
}
