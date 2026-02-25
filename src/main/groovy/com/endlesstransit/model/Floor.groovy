package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager
import com.endlesstransit.ui.Terminal
import com.endlesstransit.ui.ThemeManager

class Floor extends Container {
    int number
    Corridor corridor
    String culture

    Corridor getCorridor() {
        ensureChildrenPopulated()
        return corridor
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
        return "Floor ${number}. The air hums with the resonance of ${Terminal.colorize(culture.toUpperCase(), Terminal.CYAN)} geometry."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Logger.info("Getting options for Floor $number")
        def options = getBaseOptions(game)
        
        if (parent instanceof Building) {
            Building bldg = (Building) parent
            if (number < bldg.maxFloors - 1) {
                options["u. Go Up"] = { game.enterLocation(bldg.getFloor(number + 1)) }
            } else if (!bldg.isBreached && bldg.isPrimed()) {
                // At the Peak and primed
                def keystone = game.player.inventory.find { it.isKeystone && it.name.contains(bldg.name) }
                if (keystone) {
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
        
        options["c. Enter Corridor"] = { game.enterLocation(corridor) }
        return options
    }

    @Override
    int getIndexInParent() {
        if (parent instanceof Building) {
            return number + 1
        }
        return super.getIndexInParent()
    }

    @Override
    int getTotalInParent() {
        if (parent instanceof Building) {
            return ((Building)parent).maxFloors
        }
        return super.getTotalInParent()
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

    Floor(int number, int apartmentsPerFloor) {
        this.number = number
        this.culture = number < 0 ? "abyssal" : ThemeManager.getRandomCulture()
        this.apartmentsPerFloor = apartmentsPerFloor
    }
    
    int apartmentsPerFloor

    @Override
    void populateChildren() {
        corridor = new Corridor(apartmentsPerFloor, this.culture)
        addLocation(corridor)
    }
}
