package com.endlesstransit.model
import com.endlesstransit.procgen.LocusSeed

import groovy.transform.CompileStatic

@CompileStatic
class Door {
    String color
    boolean hasWindows
    String decor
    String scaryWord
    Boolean visited = false
    LocusSeed locus

    Door(LocusSeed locus = new LocusSeed(0)) {
        this.locus = locus
        Random r = locus.nextRandom()
        List<String> colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown"]
        List<String> decors = ["wooden", "metallic", "ornate", "plain", "rustic", "vintage", "modern", "minimalist"]
        List<String> scaryWords = ["Beware", "Danger", "Haunt", "Fear", "Nightmare"]

        color = colors[r.nextInt(colors.size())]
        hasWindows = r.nextBoolean()
        decor = decors[r.nextInt(decors.size())]
        
        if (r.nextInt(4) == 0) { // 25% chance of a scary word
            scaryWord = scaryWords[r.nextInt(scaryWords.size())]
        }
    }

    String getDescription() {
        StringBuilder description = new StringBuilder()
        description.append((visited?'(VISITED) ':'') + "$color, $decor"+ (hasWindows?', has a window':''))
        if (scaryWord != null) {
            description.append(", written: ${scaryWord}")
        } else 
            description.append("")
        return description.toString()
    }

    String getTerminalColor() {
        switch (color) {
            case "red": return "RED"
            case "blue": return "BLUE"
            case "green": return "GREEN"
            case "yellow": return "YELLOW"
            case "purple": return "MAGENTA"
            case "orange": return "YELLOW"
            case "pink": return "L_MAGENTA"
            case "brown": return "WHITE"
            default: return "WHITE"
        }
    }
}
