package com.endlesstransit.core

import groovy.transform.CompileStatic

/**
 * GlobalCommands: the one owner of the global command keys, their aliases and their case rule (HK-020).
 * A key registered any-case is matched after lower-casing the input; an exact key is matched as typed
 * (`p` and `P` are two different commands). An alias shares its target's instance and case rule.
 */
@CompileStatic
class GlobalCommands {
    private final Map<String, GameCommand> exact = [:]
    private final Map<String, GameCommand> anyCase = [:]

    void register(String key, GameCommand command, boolean anyCase = true) {
        (anyCase ? this.anyCase : this.exact)[anyCase ? key.toLowerCase() : key] = command
    }

    /** `alias` resolves to the same instance as `key`, under the same case rule. */
    void alias(String alias, String key) {
        if (exact.containsKey(key)) {
            exact[alias] = exact[key]
        } else if (anyCase.containsKey(key.toLowerCase())) {
            anyCase[alias.toLowerCase()] = anyCase[key.toLowerCase()]
        } else {
            throw new IllegalArgumentException("No global command '$key' to alias '$alias' to")
        }
    }

    /** @return the command the input names, or null when it is not a global command. */
    GameCommand resolve(String input) {
        if (input == null) return null
        exact[input] ?: anyCase[input.toLowerCase()]
    }
}
