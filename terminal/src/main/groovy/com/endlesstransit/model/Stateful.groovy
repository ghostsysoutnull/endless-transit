package com.endlesstransit.model

interface Stateful {
    Map<String, Object> getMutationState()
    void applyMutationState(Map<String, Object> state)
}
