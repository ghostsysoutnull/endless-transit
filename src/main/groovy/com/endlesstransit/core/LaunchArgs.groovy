package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * LaunchArgs: the launcher's command line, read once (HK-015). An immutable value —
 * build it from `args`, ask it what the player asked for.
 */
@CompileStatic
class LaunchArgs {

    private static final String SEED_FLAG = "--seed"

    /** The master seed after `--seed`, or null when the flag is absent. */
    final Long seed

    /** A `--seed` with no value, or with a value that is not a whole number, is an IllegalArgumentException. */
    LaunchArgs(String[] args) {
        this.seed = readSeed(args == null ? new ArrayList<String>() : args.toList())
    }

    boolean hasSeed() { seed != null }

    private Long readSeed(List<String> args) {
        int at = args.indexOf(SEED_FLAG)
        if (at < 0) return null
        if (at + 1 >= args.size()) {
            throw new IllegalArgumentException("${SEED_FLAG} needs a value, e.g. ${SEED_FLAG} 4660")
        }
        try {
            return Long.parseLong(args[at + 1])
        } catch (NumberFormatException ignored) {
            throw new IllegalArgumentException("${SEED_FLAG} needs a whole number, got '${args[at + 1]}'")
        }
    }
}
