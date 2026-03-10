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
        List<String> colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown"]
        List<String> decors = ["wooden", "metallic", "ornate", "plain", "rustic", "vintage", "modern", "minimalist"]
        List<String> scaryWords = ["Beware", "Danger", "Haunt", "Fear", "Nightmare"]

        color = (String) locus.pickFrom(colors)
        hasWindows = locus.nextBoolean()
        decor = (String) locus.pickFrom(decors)
        
        if (locus.nextInt(4) == 0) { // 25% chance of a scary word
            scaryWord = (String) locus.pickFrom(scaryWords)
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
}
