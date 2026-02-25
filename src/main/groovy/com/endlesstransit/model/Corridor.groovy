package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

import java.util.Random

class Corridor extends Container {
    List<Door> doors = []
    List<Apartment> apartments = []
    String culture
    int numApartments

    List<Apartment> getApartments() {
        ensureChildrenPopulated()
        return apartments
    }

    @Override
    String getTypeName() {
        return (parent instanceof Floor && ((Floor)parent).number < 0) ? "Artery" : "Corridor"
    }

    @Override
    String getDescription() {
        ensureChildrenPopulated()
        if (getTypeName() == "Artery") {
            return "A vaulted transit artery with ${doors.size()} access crypts. Cultural resonance: [CORRUPTED]."
        }
        return "A long corridor with ${doors.size()} doors. Cultural resonance: ${culture}."
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Logger.info("Getting options for Corridor. Parent: ${parent?.getClass()?.simpleName}")
        def options = getBaseOptions(game)
        
        // Floor navigation
        if (parent instanceof Floor) {
            Floor currentFloor = (Floor) parent
            if (currentFloor.parent instanceof Building) {
                Building bldg = (Building) currentFloor.parent
                
                if (currentFloor.number < bldg.maxFloors - 1) {
                    options["u. Go Up"] = {
                        def nextFloor = bldg.getFloor(currentFloor.number + 1)
                        if (nextFloor != null) {
                            game.enterLocation(nextFloor.corridor)
                        } else {
                            Logger.error("Failed to retrieve next floor ${currentFloor.number + 1}")
                        }
                    }
                }
                
                if (currentFloor.number > 0) {
                    options["d. Go Down"] = {
                        def prevFloor = bldg.getFloor(currentFloor.number - 1)
                        if (prevFloor != null) {
                            game.enterLocation(prevFloor.corridor)
                        } else {
                            Logger.error("Failed to retrieve previous floor ${currentFloor.number - 1}")
                        }
                    }
                }
            }
        }
        
        for (int i = 0; i < apartments.size(); i++) {
            def apt = apartments[i]
            if (!apt.rooms.isEmpty()) {
                String label = "${i + 1}. Enter: ${apt.doorDescription}"
                if (apt.rooms.any { it.isVisited() }) {
                    label += " [Visited]"
                }
                options[label] = { 
                    game.enterLocation(apt.rooms[0]) 
                }
            }
        }
        return options
    }

    Corridor(int numApartments, String culture) {
        this.culture = culture
        this.numApartments = numApartments
    }

    @Override
    VibeCapsule getVibe() {
        if (localVibe != null) return localVibe
        def v = parent?.getVibe()
        if (parent instanceof Floor && ((Floor)parent).number < 0) {
            // Abyssal Override
            return new VibeCapsule("atomic", "abyssal", "abyssal")
        }
        return v
    }

    @Override
    void populateChildren() {
        this.@doors.clear()
        this.@apartments.clear()

        for (int i = 0; i < numApartments; i++) {
            def door = new Door()
            this.@doors.add(door)
            def apartment = new Apartment(door.getDescription(), culture)
            this.@apartments.add(apartment)
            addLocation(apartment)
        }
    }
}
