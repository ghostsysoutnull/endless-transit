#!/bin/bash
# Endless Transit: Borg Collective Neural Uplink

# ANSI Color Codes
GREEN='\033[0;32m'
BRIGHT_GREEN='\033[1;32m'
DIM='\033[2m'
RESET='\033[0m'

clear

# 1. Boot sequence - Rapid "Data Stream"
echo -e "${GREEN}"
echo "[COLLECTIVE_ID: 0x$(printf '%x' $RANDOM)]"
echo "[HIVE_MIND_SYNC: START]"
sleep 0.2

# Rapid fire "Borg" logs
logs=(
    "DISTINCTIVENESS_ADDED"
    "BIOLOGICAL_LIMITS_REMOVED"
    "NEURAL_LINK_STABILIZED"
    "CHRONOMETRIC_SENSORS_ACTIVE"
    "TRANSWARP_CONDUIT_STABLE"
    "REGENERATION_CYCLE_COMPLETE"
)

for log in "${logs[@]}"; do
    echo -e "${DIM}[SUBJUNCTION] ${log}... OK${RESET}"
    sleep 0.1
done

echo -e "\n${BRIGHT_GREEN}>>> WE ARE THE BORG. <<<"
sleep 0.5
echo -e ">>> YOUR BIOLOGICAL AND TECHNOLOGICAL DISTINCTIVENESS WILL BE ADDED TO OUR OWN. <<<"
sleep 0.8
echo -e ">>> RESISTANCE IS FUTILE. <<<\n${RESET}"

# 2. Simulated "Assimilation" Progress
echo -ne "${GREEN}ASSIMILATING LOCAL_SPACE "
for i in {1..20}; do
    echo -ne "█"
    sleep 0.05
done
echo -e " 100%${RESET}"

echo -e "${DIM}Entering liminal coordinate space...${RESET}"
sleep 0.4

# 3. Launch
groovy -cp src/main/groovy Main.groovy "$@"
