#!/bin/bash
# Endless Transit: Vinculum Neural Synchronization Protocol

# ANSI Color Codes
GREEN='\033[0;32m'
BRIGHT_GREEN='\033[1;32m'
DIM='\033[2m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

if [[ "$1" != "--test" ]]; then
    clear

    # 1. Hardware Initialization
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
    components=(
        "OCULAR_IMPLANT"
        "CORTICAL_NODE"
        "NEURAL_TRANSCEIVER"
        "BIO_MATRIC_REGULATOR"
        "TRANSWARP_CONDUIT_LINK"
    )

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
    for i in {1..30}; do
        echo -ne "░"
        sleep 0.02
    done
    echo -ne "\r"
    echo -ne "${BRIGHT_GREEN}OPENING TRANSWARP APERTURE "
    for i in {1..30}; do
        echo -ne "█"
        sleep 0.01
    done
    echo -e " [ENGAGED]${RESET}"

    sleep 0.5
    echo -e "${DIM}[TRANSIT_PROTOCOL_INITIATED]${RESET}"
    sleep 0.2
fi

# 5.5 Static Verification (Phase 1 AI Strategy)
function compile_check() {
    echo -ne "${CYAN}[VINCULUM_VERIFICATION: COMPILING...]${RESET} "
    # Compile all src files to a temp directory to check for errors without keeping artifacts
    mkdir -p .build_check
    if ! groovyc -cp src/main/groovy -d .build_check src/main/groovy/com/endlesstransit/**/*.groovy src/main/groovy/com/endlesstransit/*.groovy 2> .compile_errors; then
        echo -e "${RED}[FAILED]${RESET}"
        cat .compile_errors
        rm -rf .build_check .compile_errors
        exit 1
    fi
    echo -e "${GREEN}[SUCCESS]${RESET}"
    rm -rf .build_check .compile_errors
}

# 6. Launch
if [[ "$1" == "--test" ]]; then
    compile_check
    groovy -cp src/main/groovy:src/test/groovy src/test/groovy/com/endlesstransit/AllTests.groovy
else
    # Only compile on standard run if requested or first time
    if [[ "$*" == *"--compile"* ]]; then
        compile_check
    fi
    groovy -cp src/main/groovy src/main/groovy/com/endlesstransit/Main.groovy "$@"
fi
