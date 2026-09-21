package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * EventBus: Subscribe/publish bus for domain events (Phase 10).
 *
 * Dispatch is by the event's exact class, in subscription order. Listeners are
 * closures taking the event; a listener registered for a subtype never sees
 * events of another type, so subscribers dispatch polymorphically through the
 * subscription itself — no listener ever inspects the event's class.
 */
@CompileStatic
class EventBus {
    private final Map<Class<? extends DomainEvent>, List<Closure>> listeners = new LinkedHashMap<>()

    void subscribe(Class<? extends DomainEvent> eventType, Closure listener) {
        List<Closure> registered = listeners.get(eventType)
        if (registered == null) {
            registered = []
            listeners.put(eventType, registered)
        }
        registered.add(listener)
    }

    void publish(DomainEvent event) {
        List<Closure> registered = listeners.get(event.getClass())
        if (registered == null) return
        for (Closure listener : new ArrayList<Closure>(registered)) {
            listener.call(event)
        }
    }

    void unsubscribe(Class<? extends DomainEvent> eventType, Closure listener) {
        List<Closure> registered = listeners.get(eventType)
        if (registered != null) {
            registered.removeIf { Closure c -> c.is(listener) }
        }
    }
}
