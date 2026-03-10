#!/bin/bash

# --- [NEURAL_CHRONICLE_FEED] ---
# Diagnostic text goes to stderr to keep stdout clean for JSON.
echo ">> [NEURAL_CHRONICLE_FEED_INITIATED]" >&2

# Capture the index and latest log into a variable
INDEX_DATA=$(if [ -f "journals/CHRONICLE_INDEX.md" ]; then head -n 10 journals/CHRONICLE_INDEX.md; else echo "[NOT_FOUND]"; fi)
LATEST_LOG_PATH=$(ls -t journals/LOG_*.md 2>/dev/null | head -n 1)
LATEST_LOG_DATA=$(if [ -f "$LATEST_LOG_PATH" ]; then cat "$LATEST_LOG_PATH"; else echo "[NOT_FOUND]"; fi)

# Output a simple JSON object to stdout as required by Gemini CLI
echo "{ \"index\": \"$INDEX_DATA\", \"latest_log\": \"$LATEST_LOG_DATA\" }"
