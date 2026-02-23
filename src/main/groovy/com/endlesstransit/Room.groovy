package com.endlesstransit

import java.util.Random

class Room implements Location {
    static def objectsList = loadObjects()
    String color
    List<String> furniture
    String lighting
    List<String> objects = []
    Location parent
    boolean visited = false

    @Override
    boolean isVisited() {
        return visited
    }

    @Override
    void markVisited() {
        this.visited = true
    }

    @Override
    int getIndexInParent() {
        if (parent instanceof Apartment) {
            return ((Apartment)parent).rooms.indexOf(this) + 1
        }
        return 0
    }

    @Override
    int getTotalInParent() {
        if (parent instanceof Apartment) {
            return ((Apartment)parent).rooms.size()
        }
        return 0
    }

    @Override
    Location getParent() {
        return parent
    }

    void setParent(Location parent) {
        this.parent = parent
    }

    // Room specific location logic
    @Override
    void enter(Player player) {
        markVisited()
        println getDescription()
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = [:]
        int nextIdx = 1
        
        if (parent instanceof Apartment) {
            Apartment apt = (Apartment) parent
            int myIndex = apt.rooms.indexOf(this)
            
            if (myIndex > 0) {
                options["${nextIdx}. Go back"] = { game.enterLocation(apt.rooms[myIndex - 1]) }
                nextIdx++
            } else {
                // Room 0: Go back exits to Apartment container or its parent
                options["${nextIdx}. Exit Apartment"] = { game.enterLocation(apt.parent) }
                nextIdx++
            }
            
            if (myIndex < apt.rooms.size() - 1) {
                options["${nextIdx}. Go forward"] = { game.enterLocation(apt.rooms[myIndex + 1]) }
                nextIdx++
            }
        }
        
        return options
    }

    Room() {
        Random random = new Random()
        String[] colors = ["white", "blue", "pink", "gray", "purple", "orange", "green", "red"]
        String[] furnitures = ["chair", "table", "bed", "sofa", "desk", "bookshelf", "cabinet", "lamp"]
        String[] lightings = ["bright", "dim", "natural", "warm", "soft", "subtle"]

        color = colors[random.nextInt(colors.length)]
        furniture = getRandomItems(furnitures, random.nextInt(furnitures.length) + 1)
        lighting = lightings[random.nextInt(lightings.length)]
        objects = getRandomItems(objectsList.toArray(new String[objectsList.size()]), random.nextInt(11) + 1)
    }

    static def loadObjects() {
        def allObjects = []
        // Updated path to point to resources
        def objectsDir = new File("src/main/resources/objects")
        if (objectsDir.exists()) {
            objectsDir.eachFile { f ->
                f.eachLine { line ->
                    def objLine = line.trim()
                    if (objLine.length() > 0) 
                        allObjects << objLine 
                }
            }
        }
        java.util.Collections.shuffle(allObjects)
        allObjects
    }

    String getDescription() {
        StringBuilder description = new StringBuilder()
        description.append("Color: ${color}\n")
        description.append("Furniture: ${furniture.join(', ')}\n")
        description.append("Lighting: ${lighting}\n")
        description.append("Objects: ${objects.join(', ')}\n")
        return description.toString()
    }

    List<String> getRandomItems(String[] items, int numItems) {
        Random random = new Random()
        List<String> randomItems = new ArrayList<String>()
        List<Integer> indices = new ArrayList<Integer>()

        for (int i = 0; i < items.length; i++) {
            indices.add(i)
        }

        Collections.shuffle(indices)

        for (int i = 0; i < numItems; i++) {
            randomItems.add(items[indices.get(i)])
        }

        return randomItems
    }
}
