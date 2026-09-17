package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * LaunchArgs: reads the launcher's options from the command line (HK-015).
 * Pure functions only — nothing is kept between calls.
 */
@CompileStatic
class LaunchArgs {

    static final String SEED_FLAG = "--seed"

    /**
     * The master seed after `--seed`, or null when the flag is absent.
     * A flag with no value, or a value that is not a whole number, is an IllegalArgumentException.
     */
    static Long seedFrom(String[] args) {
        if (args == null) return null
        int at = (args as List<String>).indexOf(SEED_FLAG)
        if (at < 0) return null
        if (at + 1 >= args.length) {
            throw new IllegalArgumentException("${SEED_FLAG} needs a value, e.g. ${SEED_FLAG} 4660")
        }
        try {
            return Long.parseLong(args[at + 1])
        } catch (NumberFormatException ignored) {
            throw new IllegalArgumentException("${SEED_FLAG} needs a whole number, got '${args[at + 1]}'")
        }
    }
}
