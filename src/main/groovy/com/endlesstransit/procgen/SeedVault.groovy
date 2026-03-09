package com.endlesstransit.procgen

import groovy.transform.CompileStatic

/**
 * SeedVault: A registry for named seeds that represent specific test scenarios.
 */
@CompileStatic
class SeedVault {
    private static final Map<String, Long> vault = new LinkedHashMap<>()

    static void register(String name, long seed) {
        vault[name] = seed
    }

    static long get(String name) {
        if (!vault.containsKey(name)) {
            throw new IllegalArgumentException("SEED_NOT_FOUND: $name")
        }
        return vault[name]
    }

    static Map<String, Long> all() {
        return Collections.unmodifiableMap(vault)
    }

    static {
        // Known stable scenarios discovered during development
        register("DEFAULT_MASTER_SEED", 0L)
        register("STRESS_TEST_CITY", 12345L)
        register("ABYSSAL_SUBSTRATE_FOUND", 777L)
    }
}
