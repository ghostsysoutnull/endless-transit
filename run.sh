#!/bin/bash
# Endless Transit: Vinculum Neural Synchronization Protocol
# CLI Entry Point for the Endless Transit Simulation Engine

# ANSI Color Codes
GREEN='\033[0;32m'
BRIGHT_GREEN='\033[1;32m'
DIM='\033[2m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

# Help Menu
function show_help() {
    echo -e "${BRIGHT_GREEN}Endless Transit: Vinculum CLI${RESET}"
    echo -e "${DIM}Usage: ./run.sh [MODE] [OPTIONS]${RESET}\n"
    echo -e "${CYAN}Modes:${RESET}"
    echo -e "  (default)      Start the standard interactive game loop."
    echo -e "  --test         Execute the full JUnit/Logic verification suite."
    echo -e "  --seed-scan    Run the horizontal seed explorer (SeedScanner)."
    echo -e "  --replay       Execute a deterministic replay from a session log."
    echo -e "  --headless     Run the game without a physical TUI (RenderSink=Memory)."
    echo -e "\n${CYAN}Options:${RESET}"
    echo -e "  --compile      Force a full static verification check before launch."
    echo -e "  --seed <VAL>   Provide a specific Master Seed for the session."
    echo -e "  --help         Display this protocol documentation."
    exit 0
}

# 5.5 Static Verification (AI Strategy)
function compile_check() {
    echo -ne "${CYAN}[VINCULUM_VERIFICATION: COMPILING...]${RESET} "
    mkdir -p .build_check
    if ! groovyc -cp src/main/groovy:src/test/groovy -d .build_check \
        src/main/groovy/com/endlesstransit/**/*.groovy \
        src/main/groovy/com/endlesstransit/*.groovy \
        src/test/groovy/com/endlesstransit/**/*.groovy \
        src/test/groovy/com/endlesstransit/*.groovy 2> .compile_errors; then
        echo -e "${RED}[FAILED]${RESET}"
        cat .compile_errors
        rm -rf .build_check .compile_errors
        exit 1
    fi
    echo -e "${GREEN}[SUCCESS]${RESET}"
    rm -rf .build_check .compile_errors
}

# 1. Hardware Initialization (Skip for non-interactive modes)
INTERACTIVE=true
if [[ "$*" == *"--test"* || "$*" == *"--seed-scan"* || "$*" == *"--replay"* || "$*" == *"--headless"* || "$*" == *"--help"* ]]; then
    INTERACTIVE=false
fi

if [[ "$1" == "--help" ]]; then
    show_help
fi

if [ "$INTERACTIVE" = true ]; then
    clear
    echo -e "${BRIGHT_GREEN}"
    cat << "EOF"
      .___________.
     /           /|
    /___________/ |
    |           | |
    | COLLECTIVE| |
    |   [01]    | |
    |___________|/
EOF
    echo -e "${RESET}"
    echo -e "${GREEN}[VINCULUM_STATUS: CONNECTING...]"
    sleep 0.4

    # 2. Cybernetic Diagnostic
    components=("OCULAR_IMPLANT" "CORTICAL_NODE" "NEURAL_TRANSCEIVER" "BIO_MATRIC_REGULATOR" "TRANSWARP_CONDUIT_LINK")
    for comp in "${components[@]}"; do
        echo -ne "${DIM}[DIAGNOSTIC] ${comp} "
        for i in {1..5}; do echo -ne "."; sleep 0.05; done
        echo -e " [STABLE]${RESET}"
    done
    sleep 0.3

    # 3. Neural Frequency Scan (Rapid Hex Stream)
    echo -e "\n${CYAN}[NEURAL_FREQUENCY_SCAN: START]"
    for i in {1..15}; do
        echo -e "${DIM}0x$(printf '%x' $RANDOM) 0x$(printf '%x' $RANDOM) 0x$(printf '%x' $RANDOM) 0x$(printf '%x' $RANDOM) 0x$(printf '%x' $RANDOM)"
        sleep 0.03
    done
    echo -e "[SCAN_COMPLETE: HARMONIC_RESONANCE_LOCKED]${RESET}\n"
    sleep 0.5

    # 4. Collective Mandate
    echo -e "${BRIGHT_GREEN}WE ARE THE BORG."
    sleep 0.4
    echo -e "YOUR DISTINCTIVENESS WILL BE ASSIMILATED."
    sleep 0.4
    echo -e "STABILITY IS IRRELEVANT."
    sleep 0.4
    echo -e "RESISTANCE IS FUTILE.${RESET}\n"

    # 5. Transwarp Aperture Simulation
    echo -ne "${GREEN}OPENING TRANSWARP APERTURE "
    for i in {1..30}; do echo -ne "░"; sleep 0.02; done
    echo -ne "\r"
    echo -ne "${BRIGHT_GREEN}OPENING TRANSWARP APERTURE "
    for i in {1..30}; do echo -ne "█"; sleep 0.01; done
    echo -e " [ENGAGED]${RESET}"

    sleep 0.5
    echo -e "${DIM}[TRANSIT_PROTOCOL_INITIATED]${RESET}"
    sleep 0.2
fi

# Mode Routing
case "$1" in
    "--test")
        compile_check
        groovy -cp src/main/groovy:src/test/groovy src/test/groovy/com/endlesstransit/AllTests.groovy
        ;;
    "--seed-scan")
        compile_check
        groovy -cp src/main/groovy src/main/groovy/com/endlesstransit/procgen/SeedScanner.groovy "${@:2}"
        ;;
    "--replay")
        compile_check
        groovy -cp src/main/groovy src/main/groovy/com/endlesstransit/core/ReplayService.groovy "${@:2}"
        ;;
    *)
        if [[ "$*" == *"--compile"* ]]; then
            compile_check
        fi
        groovy -cp src/main/groovy src/main/groovy/com/endlesstransit/Main.groovy "$@"
        ;;
esac
