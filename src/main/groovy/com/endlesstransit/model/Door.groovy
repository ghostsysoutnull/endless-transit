package com.endlesstransit.model
import com.endlesstransit.core.Game
import com.endlesstransit.core.Player
import com.endlesstransit.core.InventoryItem
import com.endlesstransit.core.Logger
import com.endlesstransit.core.JournalManager

import java.util.Random

class Door {
    String color
    boolean hasWindows
    String decor
    String scaryWord
    Boolean visited = false
    long seed

    Door(long seed = 0) {
        this.seed = seed
        Random random = seed != 0 ? new Random(seed) : new Random()
        String[] colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown"]
        String[] decors = ["wooden", "metallic", "ornate", "plain", "rustic", "vintage", "modern", "minimalist"]
        String[] scaryWords = ["Beware", "Danger", "Haunt", "Fear", "Nightmare"]

        color = colors[random.nextInt(colors.length)]
        hasWindows = random.nextBoolean()
        decor = decors[random.nextInt(decors.length)]
        
        if (random.nextInt(4) == 0) { // 25% chance of a scary word
            scaryWord = scaryWords[random.nextInt(scaryWords.length)]
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
