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
    @PackageScope List<Building> buildings = []
    String name

    List<Building> getBuildings() {
        ensureChildrenPopulated()
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
        ensureChildrenPopulated()
    }

    @Override
    List<String> getExtraContent(Player player) {
        ensureChildrenPopulated()
        List<String> lines = []
        
        int colWidth = 40 // Adjusted for 88-char left pane
        String separator = "-" * (colWidth * 2 + 3)
        
        lines << ModelOutput.fmt.dim("Buildings on this street:")
        lines << ModelOutput.fmt.dim(separator)
        List<Building> bldgs = getBuildings()
        for (int i = 0; i < bldgs.size(); i += 2) {
            Building bL = bldgs[i]
            Building bR = (i + 1 < bldgs.size()) ? bldgs[i+1] : (Building)null
            
            int numL = i + 1
            int numR = i + 2
            
            String nameL = bL.name.length() > 25 ? bL.name.substring(0, 22) + "..." : bL.name
            if (bL.isLandmark) nameL = ModelOutput.fmt.colorize(ModelOutput.fmt.bold(nameL), "CYAN")
            String visL = bL.isVisited() ? ModelOutput.fmt.colorize(" [V]", "GREEN") : ""
            String labelL = "${numL}. ${nameL}${visL}"
            String leftPart = labelL + (" " * Math.max(0, colWidth - ModelOutput.fmt.getVisualWidth(labelL)))
            
            String labelR = ""
            if (bR != null) {
                String nameR = bR.name.length() > 25 ? bR.name.substring(0, 22) + "..." : bR.name
                if (bR.isLandmark) nameR = ModelOutput.fmt.colorize(ModelOutput.fmt.bold(nameR), "CYAN")
                String visR = bR.isVisited() ? ModelOutput.fmt.colorize(" [V]", "GREEN") : ""
                labelR = "${numR}. ${nameR}${visR}"
            }
            String rightPart = labelR + (" " * Math.max(0, colWidth - ModelOutput.fmt.getVisualWidth(labelR)))
            
            lines << "${leftPart} | ${rightPart}".toString()
        }
        lines << ModelOutput.fmt.dim(separator)
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
        String vInfo = v != null ? " | ${ModelOutput.fmt.dim("[TECH_ERA:")} ${ModelOutput.fmt.colorize(v.timeline.toUpperCase(), "YELLOW")}${ModelOutput.fmt.dim("]")} ${ModelOutput.fmt.dim("[RESONANCE:")} ${ModelOutput.fmt.colorize(v.primaryCulture.toUpperCase(), v.atmosphericColor)}${ModelOutput.fmt.dim("]")}" : ""
        return "Street: $name$vInfo"
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        ensureChildrenPopulated()
        Map<String, Closure> options = getBaseOptions(game)
        
        List<Building> bldgs = getBuildings()
        Logger.info("Generating options for Street: $name. Building count: ${bldgs.size()}")
        for (int i = 0; i < bldgs.size(); i++) {
            Building building = bldgs[i]
            String id = String.format("%02d", i + 1)
            String label = "${id}. Enter Building: ${building.name}"
            if (building.isVisited()) label += " [Visited]"
            options[label] = { game.enterLocation(building) }
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
