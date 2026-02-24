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

    @Override
    void processAction(Player player) {
        Random random = new Random()
        if (random.nextInt(10) < 3) { // 30% chance
            int randomNum = random.nextInt(9000000) + 1000000 
            // Wrap the random number in an InventoryItem for compatibility
            player.inventory.add(new InventoryItem("Hidden Frequency", randomNum))
            println Terminal.colorize(">>> SPECTRAL_DEVIATION: Extracted Frequency ${randomNum} <<<", Terminal.YELLOW)
        }
    }

    @Override
    String getPath() {
        int myIndex = (parent instanceof Apartment) ? ((Apartment)parent).rooms.indexOf(this) + 1 : 0
        if (parent != null) {
            return "${parent.getPath()} > Room ${myIndex}"
        }
        return "Room ${myIndex}"
    }

    @Override
    int getDepth() {
        return (parent != null) ? parent.getDepth() + 1 : 0
    }

    @Override
    String getCoordinates() {
        Random r = new Random(this.hashCode())
        return String.format("%.3f / %.3f", r.nextDouble() * 100, r.nextDouble() * 100)
    }

    @Override
    String getName() {
        int myIndex = getIndexInParent()
        return "Room ${myIndex}"
    }

    void setParent(Location parent) {
        this.parent = parent
    }

    // Room specific location logic
    @Override
    void enter(Player player) {
        markVisited()
        println Terminal.bold("ROOM_SCAN_RESULT:")
        println getDescription()
    }

    @Override
    Map<String, Closure> getOptions(Game game) {
        def options = [:]
        
        if (!objects.isEmpty()) {
            options["t. Take object"] = {
                println "\nSelect an object to scan:"
                objects.eachWithIndex { obj, i ->
                    println "${i + 1}. $obj"
                }
                println "c. Cancel"
                
                print "\nSelection >> "
                String input = game.scanner.nextLine().trim()
                
                if (input.equalsIgnoreCase("c")) {
                    println "Operation cancelled."
                } else {
                    try {
                        int idx = input.toInteger() - 1
                        if (idx >= 0 && idx < objects.size()) {
                            String name = objects[idx]
                            int freq = Gematria.calculateFrequency(name, getDepth())
                            game.player.inventory.add(new InventoryItem(name, freq))
                            println "Scanned ${name}. Frequency signature: ${freq}"
                            objects.remove(idx)
                        } else {
                            println "Invalid selection."
                        }
                    } catch (Exception e) {
                        println "Invalid input."
                    }
                }
            }
        }

        if (parent instanceof Apartment) {
            Apartment apt = (Apartment) parent
            int myIndex = apt.rooms.indexOf(this)
            
            if (myIndex > 0) {
                options["b. Go back"] = { game.enterLocation(apt.rooms[myIndex - 1]) }
            } else {
                // Room 0: Go back exits to Apartment container or its parent
                options["l. Exit Apartment"] = { game.enterLocation(apt.parent) }
            }
            
            if (myIndex < apt.rooms.size() - 1) {
                options["f. Go forward"] = { game.enterLocation(apt.rooms[myIndex + 1]) }
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
        description.append("${Terminal.dim("COLOR:")} ${color}\n")
        description.append("${Terminal.dim("FURNITURE:")} ${furniture.join(', ')}\n")
        description.append("${Terminal.dim("LIGHTING:")} ${lighting}\n")
        
        if (!objects.isEmpty()) {
            description.append("${Terminal.colorize("OBJECTS_DETECTED:", Terminal.CYAN)} ${objects.join(', ')}\n")
        }
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
