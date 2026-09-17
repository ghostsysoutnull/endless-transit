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
    "--goldens")
        # Regenerate BridgeView golden frames (Phase 7-0). Same classpath as --test (needs src/test/groovy).
        vinculum_compile
        groovy -cp build/vinc:src/main/groovy:src/test/groovy:src/main/resources:lib/* src/test/groovy/com/endlesstransit/ui/GoldenFrameGenerator.groovy
        ;;
    "--lint")
        # O2: CodeNarc static analysis over src/ (main + test). No compile step — CodeNarc parses sources.
        #   --baseline  regenerate config/lint/baseline.xml (the ONLY writer; review the diff, commit it with the change)
        #   --agent     single LINT=PASS|FAIL line on stdout; violations go to stderr
        LINT_ARGS=(-basedir=src "-includes=**/*.groovy" -rulesetfiles=file:config/lint/vinc-ruleset.groovy)
        if echo "${@:2}" | grep -qw -- '--baseline'; then
            groovy -cp "lib/lint/*" -e 'org.codenarc.CodeNarc.main(args)' -- "${LINT_ARGS[@]}" -report=baseline:config/lint/baseline.xml > /dev/null
            LINT_EXIT=$?
            echo -e "${CYAN}[VINC:LINT_BASELINE_WRITTEN]${RESET} config/lint/baseline.xml ($(grep -c '<Violation' config/lint/baseline.xml) entries) — review the diff before committing"
            exit $LINT_EXIT
        fi
        LINT_START=$(date +%s%3N)
        LINT_OUT=$(groovy -cp "lib/lint/*" -e 'org.codenarc.CodeNarc.main(args)' -- "${LINT_ARGS[@]}" \
            -excludeBaseline=file:config/lint/baseline.xml -report=text:stdout \
            -maxPriority1Violations=0 -maxPriority2Violations=0 -maxPriority3Violations=0 2>&1)
        LINT_EXIT=$?
        LINT_MS=$(( $(date +%s%3N) - LINT_START ))
        LINT_SUMMARY=$(echo "$LINT_OUT" | grep -m1 '^Summary:')
        LINT_FILES=$(echo "$LINT_SUMMARY" | sed -n 's/.*TotalFiles=\([0-9]*\).*/\1/p')
        LINT_P1=$(echo "$LINT_SUMMARY" | sed -n 's/.*P1=\([0-9]*\).*/\1/p')
        LINT_P2=$(echo "$LINT_SUMMARY" | sed -n 's/.*P2=\([0-9]*\).*/\1/p')
        LINT_P3=$(echo "$LINT_SUMMARY" | sed -n 's/.*P3=\([0-9]*\).*/\1/p')
        if [ $LINT_EXIT -eq 0 ] && [ -n "$LINT_SUMMARY" ]; then LINT_STATUS=PASS; else LINT_STATUS=FAIL; LINT_EXIT=1; fi
        LINT_DETAIL=$(echo "$LINT_OUT" | grep -E '^(File:|    Violation:|Summary:|ERROR|Exception)' )
        if echo "${@:2}" | grep -qw -- '--agent'; then
            [ "$LINT_STATUS" = "FAIL" ] && echo "$LINT_DETAIL" >&2
            echo "LINT=$LINT_STATUS FILES=${LINT_FILES:-0} P1=${LINT_P1:-?} P2=${LINT_P2:-?} P3=${LINT_P3:-?} DURATION=${LINT_MS}ms"
        else
            echo -e "${CYAN}[VINC:LINTING_SUBSTRATE...]${RESET}"
            [ "$LINT_STATUS" = "FAIL" ] && echo "$LINT_DETAIL"
            if [ "$LINT_STATUS" = "PASS" ]; then
                echo -e "${GREEN}[LINT_CLEAN]${RESET} $LINT_SUMMARY (${LINT_MS}ms)"
            else
                echo -e "${RED}[LINT_VIOLATIONS]${RESET} ${LINT_SUMMARY:-CodeNarc did not run} (${LINT_MS}ms)"
            fi
        fi
        exit $LINT_EXIT
        ;;
    "--docs")
        # WF-007: mechanical half of /close-wave — suite count, latest chronicle, blueprint stamps. Read-only.
        #   --agent     single DOCS=PASS|FAIL line on stdout; stale facts go to stderr
        .agents/docs-check.sh "${@:2}"
        exit $?
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
        echo -e "  --goldens     Regenerate BridgeView golden frames (only after an INTENDED visual change)."
        echo -e "  --lint        CodeNarc static analysis over src/ (house rules + Vinculum invariants; config/lint/)."
        echo -e "    --agent     Single LINT=PASS/FAIL line."
        echo -e "    --baseline  Regenerate config/lint/baseline.xml (only to accept or pay down known debt; review the diff)."
        echo -e "  --docs        Close-out doc audit: suite count, latest chronicle, blueprint stamps (/close-wave gate)."
        echo -e "    --agent     Single DOCS=PASS/FAIL line."
        echo -e "  [DEFAULT]    Launch game instantly (with auto-compile)."
        ;;
    *)
        vinculum_compile
        # Pass all arguments to Main
        groovy -cp build/vinc:src/main/groovy:src/main/resources:lib/* src/main/groovy/com/endlesstransit/Main.groovy "$@"
        ;;
esac
