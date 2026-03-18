package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * DomainEvent: Base class for all domain events published via EventBus.
 * Stub — Phase 10 will fill in the full implementation.
 * See: docs/analysis/OOA_REFACTOR_PLAN.md Phase 10
 */
@CompileStatic
class DomainEvent {
    String lip
    String itemName
}
