package com.endlesstransit.model

/**
 * Composite interface representing the full capabilities of a Location.
 * Inherits from focused traits to adhere to the Interface Segregation Principle.
 */
interface Location extends Locatable, Navigable, Renderable, Stateful {
    // No additional methods; Location is now a pure composite interface.
}
