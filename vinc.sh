#!/bin/bash
# Vinculum Clinical Interface (VINC)
# High-velocity entry point for agents and automated verification.
# Zero-latency, mandatory compilation, and clean output streams.

# Standard Colors for status
CYAN='\033[0;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
RESET='\033[0m'

# Function: Clean Compilation Check
function vinculum_compile() {
    echo -ne "${CYAN}[VINC:VERIFYING_SUBSTRATE...]${RESET} "
    rm -rf build/vinc && mkdir -p build/vinc  # purge stale .class files before recompile
    # Compile both main and test sources to ensure global integrity
    if ! groovyc -cp src/main/groovy:src/test/groovy:src/main/resources:lib/* -d build/vinc \
        src/main/groovy/com/endlesstransit/**/*.groovy \
        src/main/groovy/com/endlesstransit/*.groovy \
        src/test/groovy/com/endlesstransit/**/*.groovy \
        src/test/groovy/com/endlesstransit/*.groovy 2> build/vinc_errors; then
        echo -e "${RED}[INTEGRITY_FAILURE]${RESET}"
        cat build/vinc_errors
        rm -rf build/vinc build/vinc_errors
        exit 1
    fi
    echo -e "${GREEN}[INTEGRITY_STABLE]${RESET}"
}

# Ensure the script is always running from the project root
cd "$(dirname "$0")"

# Routing Logic
case "$1" in
    "--test")
        # In --agent mode redirect compile/header to stderr so stdout carries only STATUS line
        if echo "${@:2}" | grep -qw -- '--agent'; then
            vinculum_compile >&2
            groovy -cp build/vinc:src/main/groovy:src/test/groovy:src/main/resources:lib/* src/test/groovy/com/endlesstransit/TestRunner.groovy "${@:2}"
        else
            vinculum_compile
            echo -e "${CYAN}[VINC:EXECUTING_LOGIC_SUITE]${RESET}"
            groovy -cp build/vinc:src/main/groovy:src/test/groovy:src/main/resources:lib/* src/test/groovy/com/endlesstransit/TestRunner.groovy "${@:2}"
        fi
        ;;
    "--compile")
        vinculum_compile
        ;;
    "--scan")
        vinculum_compile
        groovy -cp build/vinc:src/main/groovy:src/main/resources:lib/* src/main/groovy/com/endlesstransit/procgen/SeedScanner.groovy "${@:2}"
        ;;
    "--replay")
        vinculum_compile
        groovy -cp build/vinc:src/main/groovy:src/main/resources:lib/* src/main/groovy/com/endlesstransit/core/ReplayService.groovy "${@:2}"
        ;;
    "--help")
        echo -e "${GREEN}Vinculum Clinical Interface (VINC)${RESET}"
        echo -e "Usage: ./vinc.sh [MODE] [ARGS]\n"
        echo -e "Modes:"
        echo -e "  --test        Run the full JUnit/Logic test suite (with auto-compile)."
        echo -e "    -q          Quiet mode: suppress per-test progress (auto when piped)."
        echo -e "    --agent     Machine-readable output: single STATUS=PASS/FAIL line."
        echo -e "  --compile     Perform a strict static type-check only."
        echo -e "  --scan        Run the SeedScanner explorer."
        echo -e "  --replay      Execute a deterministic replay."
        echo -e "  [DEFAULT]     Launch game instantly (with auto-compile)."
        ;;
    *)
        vinculum_compile
        # Pass all arguments to Main
        groovy -cp build/vinc:src/main/groovy:src/main/resources:lib/* src/main/groovy/com/endlesstransit/Main.groovy "$@"
        ;;
esac
