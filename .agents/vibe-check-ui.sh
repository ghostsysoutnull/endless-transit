#!/bin/bash
# vibe-check-ui.sh: Verify TUI integrity

echo ">>> INITIATING UI_VIBE_CHECK..."

# Check if Terminal.groovy contains the required ANSI color constants
required_constants=("L_CYAN" "GREEN" "YELLOW" "RED" "DIM")

for const in "${required_constants[@]}"; do
    if grep -q "$const" src/main/groovy/com/endlesstransit/ui/Terminal.groovy; then
        echo "[CHECK] Constant $const: FOUND"
    else
        echo "[CHECK] Constant $const: MISSING"
        echo "[VIBE_STATUS: DEGRADED]"
        exit 1
    fi
done

# Check if we are using raw escape codes in logic (should use Terminal class)
logic_files=$(find src/main/groovy -name "*.groovy" | grep -v "Terminal.groovy")
if grep -r "\u001b" $logic_files; then
    echo "[CHECK] Raw ANSI detected in logic files. [VIBE_STATUS: POLLUTED]"
    exit 1
else
    echo "[CHECK] ANSI Encapsulation: VERIFIED"
fi

echo "[VIBE_STATUS: NOMINAL]"
echo ">>> UI_VIBE_CHECK COMPLETE."
