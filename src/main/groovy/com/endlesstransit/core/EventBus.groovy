package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * EventBus: Subscribe/publish bus for domain events.
 * Stub — Phase 10 will fill in the full implementation.
 * See: docs/analysis/OOA_REFACTOR_PLAN.md Phase 10
 */
@CompileStatic
class EventBus {
    private Map<Class<? extends DomainEvent>, List<Closure>> listeners = [:]

    void subscribe(Class<? extends DomainEvent> eventType, Closure listener) {
        throw new UnsupportedOperationException("EventBus not yet implemented — Phase 10")
    }

    void publish(DomainEvent event) {
        throw new UnsupportedOperationException("EventBus not yet implemented — Phase 10")
    }

    void unsubscribe(Class<? extends DomainEvent> eventType, Closure listener) {
        throw new UnsupportedOperationException("EventBus not yet implemented — Phase 10")
    }
}
