package com.endlesstransit

import java.util.Scanner

class Game {
    List<Floor> floors = []
    Floor currentFloor
    Player player
    Integer lastChoice
    Scanner scanner
    Map<Object, String> currentActionMap = [:]

    Game() {
        currentFloor = new Floor(0)
        floors.add(currentFloor)
        player = new Player()
        scanner = new Scanner(System.in)
    }

    void start() {
        println("Welcome to the game!")
        println("You are on Floor ${currentFloor.number}.")
        println("You are in a corridor with ${currentFloor.corridor.doors.size()} doors.")

        while (true) {
            currentActionMap = [1: "Go up", 2: "Go down", 3: "Enter a door", (-1): "List inventory", 0: "Quit"]
            println("Choose an action:")
            println("1. Go up")
            println("2. Go down")
            println("3. Enter a door")
            println("i. List inventory")
            println("x. Quit")

            def choice = getUserInput()

            if (choice == 0) {
                println("Goodbye!")
                break
            }

            if (choice == -1) {
                player.listInventory()
                continue
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
        currentActionMap = [0: "Quit"]
        println("Choose a door to enter:")
        for (int i = 0; i < currentFloor.corridor.doors.size(); i++) {
            String desc = currentFloor.corridor.doors[i].getDescription()
            println("${i + 1}. $desc")
            currentActionMap[i + 1] = "Enter Door ${i + 1}"
        }
        println("x. Quit")

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
            currentActionMap = [1: "Go back", 2: "Go forward", 3: "Go out", (-1): "List inventory", 0: "Quit"]
            println("Choose an action:")
            println("1. Go back")
            println("2. Go forward")
            println("3. Go out of the apartment")
            println("i. List inventory")
            println("x. Quit")

            String rawInput = getRawUserInput()
            if (rawInput == "") {
                if (lastChoice == 2 && currentRoom == apartment.rooms.last()) {
                    lastChoice = 1
                    println "End reached. Reversing direction to: ${currentActionMap[lastChoice]}"
                } else if (lastChoice == 1 && currentRoom == apartment.rooms.first()) {
                    lastChoice = 2
                    println "Beginning reached. Reversing direction to: ${currentActionMap[lastChoice]}"
                }
            }
            def choice = processInput(rawInput)

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

    String getRawUserInput() {
        String actionName = currentActionMap[lastChoice] ?: lastChoice?.toString() ?: ""
        String hudLastAction = lastChoice != null ? " [Last: $actionName]" : ""
        print("\n---=====================================>>$hudLastAction ")
        print("Enter your choice: ")
        
        String input
        if (System.console()) {
            input = System.console().readLine()
        } else if (scanner.hasNextLine()) {
            input = scanner.nextLine()
        } else {
            return null // EOF
        }
        return input != null ? input.trim() : null
    }

    int processInput(String input) {
        if (input == null) return 0

        if (input.isEmpty()) {
            if (lastChoice != null) {
                println "Repeating: $lastChoice"
                return lastChoice
            }
            return -2
        }

        if (input.equalsIgnoreCase("i")) {
            lastChoice = -1
            return -1
        }
        
        if (input.equalsIgnoreCase("x")) {
            return 0
        }

        try {
            lastChoice = input.toInteger()
            return lastChoice
        } catch (Exception e) {
            return -2 // Invalid input
        }
    }

    int getUserInput() {
        return processInput(getRawUserInput())
    }
}
