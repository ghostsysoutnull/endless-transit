package com.endlesstransit.core

import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * Phase 0.5g safety net: validates EventBus contract before Phase 10 implements it.
 * All tests are @Disabled until Phase 10 — this file defines the API contract.
 * See: docs/analysis/OOA_REFACTOR_PLAN.md Phase 10
 */
@Disabled("EventBus not yet implemented — Phase 10")
class EventBusTest {

    @Test
    void eventBus_subscribe_and_publish_singleListener() {
        EventBus bus = new EventBus()
        List<DomainEvent> received = []

        bus.subscribe(DomainEvent, { DomainEvent e -> received << e })

        DomainEvent event = new DomainEvent(lip: "0.1.2.3", itemName: "test-item")
        bus.publish(event)

        assertEquals(1, received.size(), "Listener must receive exactly one event")
        assertSame(event, received[0], "Received event must be the published instance")
    }

    @Test
    void eventBus_publish_deliversToMultipleListeners() {
        EventBus bus = new EventBus()
        List<DomainEvent> received1 = []
        List<DomainEvent> received2 = []

        bus.subscribe(DomainEvent, { DomainEvent e -> received1 << e })
        bus.subscribe(DomainEvent, { DomainEvent e -> received2 << e })

        bus.publish(new DomainEvent(lip: "0.1.2", itemName: "multi-test"))

        assertEquals(1, received1.size(), "First listener must receive the event")
        assertEquals(1, received2.size(), "Second listener must receive the event")
    }

    @Test
    void eventBus_eventPayload_lipAndItemNamePreserved() {
        EventBus bus = new EventBus()
        DomainEvent received = null

        bus.subscribe(DomainEvent, { DomainEvent e -> received = e })

        String expectedLip = "0.3.7.1.2"
        String expectedItem = "SYNTH_PACK"
        bus.publish(new DomainEvent(lip: expectedLip, itemName: expectedItem))

        assertNotNull(received, "Listener must receive the event")
        assertEquals(expectedLip, received.lip, "Event LIP must be preserved through publish")
        assertEquals(expectedItem, received.itemName, "Event itemName must be preserved through publish")
    }

    @Test
    void eventBus_unsubscribe_listenerNoLongerReceivesEvents() {
        EventBus bus = new EventBus()
        List<DomainEvent> received = []
        Closure listener = { DomainEvent e -> received << e }

        bus.subscribe(DomainEvent, listener)
        bus.publish(new DomainEvent(lip: "0.1", itemName: "before-unsub"))
        assertEquals(1, received.size(), "Listener must receive event before unsubscribe")

        bus.unsubscribe(DomainEvent, listener)
        bus.publish(new DomainEvent(lip: "0.2", itemName: "after-unsub"))

        assertEquals(1, received.size(), "Listener must NOT receive event after unsubscribe")
    }

    @Test
    void eventBus_unsubscribedListener_doesNotAffectOtherListeners() {
        EventBus bus = new EventBus()
        List<DomainEvent> received1 = []
        List<DomainEvent> received2 = []
        Closure listener1 = { DomainEvent e -> received1 << e }
        Closure listener2 = { DomainEvent e -> received2 << e }

        bus.subscribe(DomainEvent, listener1)
        bus.subscribe(DomainEvent, listener2)
        bus.unsubscribe(DomainEvent, listener1)

        bus.publish(new DomainEvent(lip: "0.5", itemName: "selective"))

        assertEquals(0, received1.size(), "Unsubscribed listener must not receive event")
        assertEquals(1, received2.size(), "Remaining listener must still receive event")
    }
}
