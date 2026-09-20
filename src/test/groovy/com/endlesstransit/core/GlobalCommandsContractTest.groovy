package com.endlesstransit.core

import org.junit.jupiter.api.Test
import static org.junit.jupiter.api.Assertions.*

/**
 * HK-020: one owner for the global command keys, their aliases and their case rule.
 * Unit rows use a hand-built GlobalCommands; game rows read the table TurnProcessor builds (the rules the
 * guide states at players_guide.md:102-103); dispatch rows go through `Game.processInput`, which never
 * calls `normalize`.
 */
class GlobalCommandsContractTest {

    private static final long SEED = 12345L
    private static final List<String> ANY_CASE = ["i", "sync", "map", "lattice", "help", "glitch", "quit", "m", "q"]
    private static final List<String> EXACT = ["s", "ll", "p", "P", "quitnow"]

    private static Game newGame() {
        new Game(SEED, new MockInputSource([]))
    }

    private static GameCommand stub() {
        new HelpCommand()
    }

    // --- unit: the object -------------------------------------------------------------------------

    @Test
    void anyCaseKeyResolvesInAnyCase() {
        GlobalCommands commands = new GlobalCommands()
        GameCommand cmd = stub()
        commands.register("map", cmd)
        assertSame(cmd, commands.resolve("map"))
        assertSame(cmd, commands.resolve("MAP"))
        assertSame(cmd, commands.resolve("Map"))
    }

    @Test
    void exactKeyResolvesOnlyAsTyped() {
        GlobalCommands commands = new GlobalCommands()
        GameCommand lower = stub()
        GameCommand upper = stub()
        commands.register("p", lower, false)
        commands.register("P", upper, false)
        assertSame(lower, commands.resolve("p"))
        assertSame(upper, commands.resolve("P"))
        assertNotSame(commands.resolve("p"), commands.resolve("P"))
    }

    @Test
    void aliasSharesInstanceAndCaseRule() {
        GlobalCommands commands = new GlobalCommands()
        GameCommand cmd = stub()
        commands.register("quit", cmd)
        commands.alias("q", "quit")
        assertSame(cmd, commands.resolve("q"))
        assertSame(cmd, commands.resolve("Q"), "an alias of an any-case key is any-case")
    }

    @Test
    void aliasOfUnknownKeyFailsLoud() {
        GlobalCommands commands = new GlobalCommands()
        assertThrows(IllegalArgumentException) { commands.alias("x", "nothing") }
    }

    @Test
    void unknownAndNullInputAreNotGlobal() {
        GlobalCommands commands = new GlobalCommands()
        commands.register("map", stub())
        assertNull(commands.resolve("01"))
        assertNull(commands.resolve("l"))
        assertNull(commands.resolve(null))
    }

    // --- the game's table (moved from InputHandlerNormalizeTest, HK-020 c0 → c1) -----------------

    @Test
    void anyCaseWordsResolveInAnyCase() {
        GlobalCommands commands = newGame().turnProcessor.globalCommands
        ANY_CASE.each { String word ->
            assertNotNull(commands.resolve(word), "$word is a global command")
            assertSame(commands.resolve(word), commands.resolve(word.toUpperCase()), "$word is accepted in any case")
        }
    }

    @Test
    void exactKeysDoNotResolveInAnotherCase() {
        GlobalCommands commands = newGame().turnProcessor.globalCommands
        EXACT.each { String key ->
            assertNotNull(commands.resolve(key), "$key is a global command")
        }
        ["S", "LL", "QUITNOW"].each { String wrongCase ->
            assertNull(commands.resolve(wrongCase), "$wrongCase must be typed exactly")
        }
        assertNotSame(commands.resolve("p"), commands.resolve("P"), "p and P are two commands")
    }

    @Test
    void aliasesReachTheirCommand() {
        GlobalCommands commands = newGame().turnProcessor.globalCommands
        assertSame(commands.resolve("map"), commands.resolve("m"))
        assertSame(commands.resolve("quit"), commands.resolve("q"))
        assertSame(commands.resolve("quit"), commands.resolve("Q"), "HK-015 item 4: q is quit in any case")
        assertSame(commands.resolve("help"), commands.resolve("?"))
        assertSame(commands.resolve("lattice"), commands.resolve("ll"))
    }

    // --- dispatch path -----------------------------------------------------------------------------

    /** Control: the canonical word already reached HelpCommand on the dispatch path before HK-020. */
    @Test
    void helpWordReachesHelpCommandThroughDispatch() {
        Game game = newGame()
        assertFalse(game.state.instantRender)
        game.processInput("help")
        assertTrue(game.state.instantRender, "help sets instantRender via helpMenu")
    }

    /** The gap: `?` is an alias of help, so the dispatch path must honour it too (RED before c1). */
    @Test
    void helpAliasReachesHelpCommandThroughDispatch() {
        Game game = newGame()
        assertFalse(game.state.instantRender)
        game.processInput("?")
        assertTrue(game.state.instantRender, "? is help on every dispatch path, not only the live loop")
    }
}
