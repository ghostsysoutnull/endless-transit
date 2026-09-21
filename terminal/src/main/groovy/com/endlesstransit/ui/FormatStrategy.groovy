package com.endlesstransit.ui

import groovy.transform.CompileStatic

/**
 * Strategy for formatting a ScreenBuffer into a final string representation.
 */
@CompileStatic
interface FormatStrategy {
    String format(ScreenBuffer buffer)
    String getExtension()
}
