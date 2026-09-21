package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * Interface for sourcing player input (Real, Mock, or Fuzzed).
 */
@CompileStatic
interface InputSource {
    String readLine()
    void waitForEnter()
    boolean isInteractive()
}
