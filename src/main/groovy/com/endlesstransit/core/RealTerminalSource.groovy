package com.endlesstransit.core

import groovy.transform.CompileStatic
import java.util.Scanner

/**
 * Standard input source reading from the actual console.
 */
@CompileStatic
class RealTerminalSource implements InputSource {
    private final Scanner scanner = new Scanner(System.in)

    @Override
    String readLine() {
        return scanner.hasNextLine() ? scanner.nextLine() : ""
    }

    @Override
    void waitForEnter() {
        if (scanner.hasNextLine()) scanner.nextLine()
    }
}
