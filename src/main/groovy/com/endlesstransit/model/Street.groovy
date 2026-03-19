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
class Street extends Container {
    @PackageScope List<Building> buildings = new LazyLocusList<Building>(this)
    String name

    List<Building> getBuildings() {
        return buildings
    }

    @Override
    String getIndexLabel() {
        return "WAY"
    }

    @Override
    String getStatusSummary() {
        return isAbyssal() ? "SYNC: [PRESSURE_HIGH]" : "SYNC: [STABLE]"
    }

    Street(String name, LocusSeed locus = new LocusSeed(0)) {
        this.name = name
        this.locus = locus
    }

    @Override
    void populateChildren() {
        ProceduralFactory.instance.populateStreet(this)
    }

    @Override
    void enter(Player player) {
        markVisited()
        // LazyLocusList handles population on access
    }

    @Override
    List<String> getExtraContent(Player player, int width) {
        List<String> lines = []
        int colWidth = (width - 3).intdiv(2)

        lines << effectiveFmt.dim("Buildings on this street:")
        lines << effectiveFmt.dim("-" * width)
        List<Building> bldgs = getBuildings()
        for (int i = 0; i < bldgs.size(); i += 2) {
            Building bL = bldgs[i]
            Building bR = (i + 1 < bldgs.size()) ? bldgs[i+1] : (Building)null

            int numL = i + 1
            int numR = i + 2

            String bNameL = bL.getName()
            String nameL = bNameL.length() > 25 ? bNameL.substring(0, 22) + "..." : bNameL
            if (bL.isLandmark) nameL = effectiveFmt.colorize(effectiveFmt.bold(nameL), "CYAN")
            String visL = bL.isVisited() ? effectiveFmt.colorize(" [V]", "GREEN") : ""
            String labelL = "${numL}. ${nameL}${visL}"
            String leftPart = effectiveFmt.padRight(labelL, colWidth)

            String labelR = ""
            if (bR != null) {
                String bNameR = bR.getName()
                String nameR = bNameR.length() > 25 ? bNameR.substring(0, 22) + "..." : bNameR
                if (bR.isLandmark) nameR = effectiveFmt.colorize(effectiveFmt.bold(nameR), "CYAN")
                String visR = bR.isVisited() ? effectiveFmt.colorize(" [V]", "GREEN") : ""
                labelR = "${numR}. ${nameR}${visR}"
            }

            lines << (leftPart + " | " + effectiveFmt.padRight(labelR, colWidth))
        }
        lines << effectiveFmt.dim("-" * width)
        return lines
    }

    @Override
    void addLocation(Location location) {
        super.addLocation(location)
        if (location instanceof Building) {
            this.buildings.add((Building)location)
        }
    }

    @Override
    String getDescription() {
        VibeCapsule v = getVibe()
        String vInfo = v != null ? " | ${effectiveFmt.dim("[TECH_ERA:")} ${effectiveFmt.colorize(v.timeline.toUpperCase(), "YELLOW")}${effectiveFmt.dim("]")} ${effectiveFmt.dim("[RESONANCE:")} ${effectiveFmt.colorize(v.primaryCulture.toUpperCase(), v.atmosphericColor)}${effectiveFmt.dim("]")}" : ""
        return "Street: $name$vInfo"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        Map<String, Closure> options = getBaseOptions(game)
        
        List<Building> bldgs = getBuildings()
        Logger.info("Generating options for Street: $name. Building count: ${bldgs.size()}")
        bldgs.eachWithIndex { Building building, int i ->
            final Building targetBuilding = building
            String id = String.format("%02d", i + 1)
            String label = "${id}. Enter Building: ${building.name}"
            if (building.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(targetBuilding) }
            Logger.info("  >> Added menu key: '$label'")
        }
        return options
    }

    @Override
    String getMapSymbol() {
        if (isAbyssal()) return "☠"
        return "═"
    }
}
