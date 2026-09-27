#!/bin/bash
# The project's docs gate (split from terminal/.agents/docs-check.sh, 2026-09-25 — the Groovy checks stay there).
# Read-only — this script never writes a file.
#   CHRONICLE  top LOG_ID of journals/CHRONICLE_INDEX.md == newest journals/LOG_* file
#   HANDOVER   tasks/RECOVERY_PROMPT.md <= 300 words — it holds current state only; history lives in the records (WF-008);
#              its fields are exactly Branch, Next, Open threads, as the Solo loop's "Ending a session" sets
#   BLOCK      the "Working with the user" block exists at the top of CLAUDE.md (its caps dropped by the user, 2026-09-26)
# Env: DOCS_ROOT  repository root to read from (default: the parent of .claude/) — for negative checks on a scratch copy.
# Usage: ./.claude/docs-check.sh [--agent]

ROOT="${DOCS_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
AGENT=0; [ "$1" = "--agent" ] && AGENT=1
FAILS=()
fail() { FAILS+=("$1"); }

# --- CHRONICLE -------------------------------------------------------------------------------------------------------
IDX_ID=$(sed -n 's/^| \*\*\(0x[0-9A-Fa-f]*\)\*\* |.*/\1/p' "$ROOT/journals/CHRONICLE_INDEX.md" | head -1)
LOG_ID=$(ls "$ROOT"/journals/LOG_*.md 2>/dev/null | sort | tail -1 | sed -n 's/.*_\(0x[0-9A-Fa-f]*\)\.md$/\1/p')
CHRONICLE=ok
[ -n "$IDX_ID" ] || { CHRONICLE=FAIL; fail "CHRONICLE journals/CHRONICLE_INDEX.md has no '| **0x…** |' row"; }
[ "$LOG_ID" = "$IDX_ID" ] || { CHRONICLE=FAIL; fail "CHRONICLE newest journals/LOG_* file is '${LOG_ID:-<missing>}', index top row is '$IDX_ID'"; }

# --- HANDOVER --------------------------------------------------------------------------------------------------------
RP_WORDS=$(wc -w < "$ROOT/tasks/RECOVERY_PROMPT.md" | tr -d ' ')
HANDOVER=ok
[ "${RP_WORDS:-0}" -le 300 ] || { HANDOVER=FAIL; fail "HANDOVER tasks/RECOVERY_PROMPT.md is $RP_WORDS words (cap 300) — it holds current state only; do not raise the cap"; }
RP_FIELDS=$(sed -n 's/^- \*\*\([^*]*\):\*\*.*/\1/p' "$ROOT/tasks/RECOVERY_PROMPT.md" | paste -sd '|')
[ "$RP_FIELDS" = "Branch|Next|Open threads" ] || { HANDOVER=FAIL; fail "HANDOVER tasks/RECOVERY_PROMPT.md fields are '$RP_FIELDS', want 'Branch|Next|Open threads' — the Solo loop's \"Ending a session\""; }
RP_LOOSE=$(grep -vn '^# Handover$\|^$\|^- \*\*\|^  ' "$ROOT/tasks/RECOVERY_PROMPT.md" | head -1)
[ -z "$RP_LOOSE" ] || { HANDOVER=FAIL; fail "HANDOVER tasks/RECOVERY_PROMPT.md has a line outside its three fields: '$RP_LOOSE'"; }

# --- BLOCK -----------------------------------------------------------------------------------------------------------
BLOCK_TEXT=$(awk '/^## 🤝 Working with the user/{f=1} f&&/^$/{exit} f' "$ROOT/CLAUDE.md")
BLOCK=ok
[ -n "$BLOCK_TEXT" ] || { BLOCK=FAIL; fail "BLOCK CLAUDE.md has no '## 🤝 Working with the user' block"; }

# --- report ----------------------------------------------------------------------------------------------------------
if [ ${#FAILS[@]} -eq 0 ]; then STATUS=PASS; EXIT=0; else STATUS=FAIL; EXIT=1; fi
LINE="DOCS=$STATUS CHRONICLE=$CHRONICLE(${IDX_ID:-?}) HANDOVER=$HANDOVER(${RP_WORDS:-?}) BLOCK=$BLOCK"
if [ $AGENT -eq 1 ]; then
    for F in "${FAILS[@]}"; do echo "$F" >&2; done
else
    for F in "${FAILS[@]}"; do echo "    $F"; done
fi
echo "$LINE"
exit $EXIT
