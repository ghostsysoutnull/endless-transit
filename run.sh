#!/bin/bash
# Run the Endless Transit game with immersive entry messages

messages=(
    "Initializing neural uplink..."
    "Scanning terminal protocols..."
    "Entering the threshold of the infinite..."
    "Synchronizing with the endless transit network..."
    "Decoding liminal frequencies..."
    "Caution: Temporal drift detected."
    "Reality stability: 84% and falling."
    "The corridors are shifting. Please wait."
    "Locating stable geometry..."
    "Welcome back, Traveler. Uplink active."
)

clear
# Pick a random message
selected_msg=${messages[$RANDOM % ${#messages[@]}]}

echo -e "\e[1;32m$selected_msg\e[0m"
sleep 1
echo -n "Connecting"
for i in {1..3}; do
    echo -n "."
    sleep 0.3
done
echo -e "\n"

groovy -cp src/main/groovy Main.groovy "$@"
