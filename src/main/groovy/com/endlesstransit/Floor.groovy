package com.endlesstransit

class Floor {
    int number
    Corridor corridor

    Floor(int number) {
        this.number = number
        corridor = new Corridor()
    }
}
