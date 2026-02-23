package com.endlesstransit

class Game {
    List<Floor> floors = []
    Floor currentFloor
    Player player

    Game() {
        currentFloor = new Floor(0)
        floors.add(currentFloor)
        player = new Player()
    }

    void start() {
        println("Welcome to the game!")
        println("You are on Floor ${currentFloor.number}.")
        println("You are in a corridor with ${currentFloor.corridor.doors.size()} doors.")

        while (true) {
            println("Choose an action:")
            println("1. Go up")
            println("2. Go down")
            println("3. Enter a door")
            println("0. Quit")

            def choice = getUserInput()

            if (choice == 0) {
                println("Goodbye!")
                break
            }

            if (choice == 1) {
                goUp()
            } else if (choice == 2) {
                goDown()
            } else if (choice == 3) {
                enterDoor()
            } else {
                println("Invalid choice. Please try again.")
            }
        }
    }

    void goUp() {
        int nextFloorNumber = currentFloor.number + 1
        Floor nextFloor = floors.find { floor -> floor.number == nextFloorNumber }

        if (nextFloor == null) {
            nextFloor = new Floor(nextFloorNumber)
            floors.add(nextFloor)
        }

        currentFloor = nextFloor
        println("You went up to Floor ${currentFloor.number}.")
        println("You are in a corridor with ${currentFloor.corridor.doors.size()} doors.")
    }

    void goDown() {
        if (currentFloor.number == 0) {
            println("You are already on the ground floor.")
        } else {
            int previousFloorNumber = currentFloor.number - 1
            Floor previousFloor = floors.find { floor -> floor.number == previousFloorNumber }
            currentFloor = previousFloor
            println("You went down to Floor ${currentFloor.number}.")
            println("You are in a corridor with ${currentFloor.corridor.doors.size()} doors.")
        }
    }

    void enterDoor() {
        println("Choose a door to enter:")
        for (int i = 0; i < currentFloor.corridor.doors.size(); i++) {
            println("${i + 1}. ${currentFloor.corridor.doors[i].getDescription()}")
        }
        println("0. Quit")

        def choice = getUserInput()

        if (choice == 0) {
            println("Goodbye!")
            return
        }

        if (choice < 1 || choice > currentFloor.corridor.doors.size()) {
            println("Invalid choice. Please try again.")
            return
        }
        currentFloor.corridor.doors[choice - 1].visited = true
        enterApartment(choice - 1)
    }

    void enterApartment(int doorIndex) {
        println ">---------------------------<"	
        println("> You entered an apartment.")

        Apartment apartment = currentFloor.corridor.apartments[doorIndex]
        Room currentRoom = apartment.rooms[0]

        println "Room ${apartment.rooms.indexOf(currentRoom)+1} of ${apartment.rooms.size()}."	 
        println(currentRoom.getDescription())

        while (true) {
            println("Choose an action:")
            println("1. Go back")
            println("2. Go forward")
            println("3. Go out of the apartment")
            println("-1. List inventory")
            println("0. Quit")

            def choice = getUserInput()

            if (choice == 0) {
                player.listInventory()
                println("Goodbye!")
                break
            }

            if (choice == -1) {
                player.listInventory()
                continue
            }
            println "Room ${apartment.rooms.indexOf(currentRoom)+1} of ${apartment.rooms.size()}."	 

            if (choice == 1) {
                if (currentRoom == apartment.rooms[0]) {
                    println("You are already in the first room.")
                } else {
                    currentRoom = apartment.rooms[apartment.rooms.indexOf(currentRoom) - 1]
                    println("Room description:")
                    println(currentRoom.getDescription())
                    processRoom(currentRoom)
                }
            } else if (choice == 2) {
                if (currentRoom == apartment.rooms[apartment.rooms.size() - 1]) {
                    println("There are no more rooms forward.")
                } else {
                    currentRoom = apartment.rooms[apartment.rooms.indexOf(currentRoom) + 1]
                    println("Room description:")
                    println(currentRoom.getDescription())
                    processRoom(currentRoom)
                }
            } else if (choice == 3) {
                println("You went out of the apartment.")
                break
            } else {
                println("Invalid choice. Please try again.")
            }
        }
    }

    void processRoom(Room room) {
        Random random = new Random()
        if (random.nextInt(10) < 3) { // 30% chance of finding a random 7-digit number
            int randomNum = random.nextInt(9000000) + 1000000 // Random number between 1000000 and 9999999
            player.inventory.add(randomNum)
            println("You found a 7-digit number: ${randomNum}")
        }
    }

    int getUserInput() {
        print("\n---=====================================>> ")
        print("Enter your choice: ")
        String input = System.console().readLine()
        if (input == "inventory") {
            return -1
        } else {
            try {
                return input.toInteger()
            } catch (Exception e) {
                return -2 // Invalid input
            }
        }
    }
}
