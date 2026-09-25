#!/bin/bash
# WF-007: the Groovy half of the docs gate. Read-only — this script never writes a file. The project's own checks
# (chronicle, handover size, user block) moved to the root `.claude/docs-check.sh` on 2026-09-25; D2, D4 and D5 retired
# here with them, so a web close-out never runs the Groovy suite.
#   D1  suite count      DISCOVERED (./vinc.sh --test --agent) == terminal/CLAUDE.md "Test Suite" == tasks/todo.md "Suite baseline"
#   D3  blueprint stamps each terminal/docs/blueprints/logic/classes/<pkg>/<Class>.md ends in a stamp carrying the first 10 chars of
#                        `git hash-object` of its class file ("Verified against:" or "Baselined (not audited) against:")
# Env (for negative checks against a scratch copy; the tree is never touched):
#   DOCS_ROOT        repository root to read from (default: the parent of terminal/). Project records (tasks/, journals/)
#                    are read from it; the Groovy records (blueprints, src/) from its terminal/ folder.
#   VINC_DISCOVERED  discovered-test count to trust instead of running the suite
# Usage: terminal/.agents/docs-check.sh [--agent]      (normally via ./terminal/vinc.sh --docs [--agent])

HERE="$(cd "$(dirname "$0")/.." && pwd)"   # terminal/ — this script lives in terminal/.agents/
ROOT="${DOCS_ROOT:-$HERE/..}"
TERM_ROOT="$ROOT/terminal"
AGENT=0; [ "$1" = "--agent" ] && AGENT=1
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; RESET='\033[0m'
FAILS=()
fail() { FAILS+=("$1"); }

# --- D1: suite count -------------------------------------------------------------------------------------------------
if [ -n "$VINC_DISCOVERED" ]; then
    ACTUAL="$VINC_DISCOVERED"
else
    ACTUAL=$("$HERE/vinc.sh" --test --agent 2>/dev/null | sed -n 's/.*STATUS=PASS DISCOVERED=\([0-9]*\).*/\1/p')
fi
RP_COUNT=$(sed -n 's/^- \*\*Test Suite:\*\* \([0-9]*\) discovered.*/\1/p' "$TERM_ROOT/CLAUDE.md" | head -1)
TODO_COUNT=$(sed -n 's/^\*\*Suite baseline:\*\* \([0-9]*\) discovered.*/\1/p' "$ROOT/tasks/todo.md" | head -1)
D1=ok
if [ -z "$ACTUAL" ]; then
    D1=FAIL; fail "D1 suite did not report STATUS=PASS — run ./vinc.sh --test -q"
else
    [ "$RP_COUNT" = "$ACTUAL" ]   || { D1=FAIL; fail "D1 terminal/CLAUDE.md 'Test Suite' says '${RP_COUNT:-<missing>}', suite discovered $ACTUAL"; }
    [ "$TODO_COUNT" = "$ACTUAL" ] || { D1=FAIL; fail "D1 tasks/todo.md 'Suite baseline' says '${TODO_COUNT:-<missing>}', suite discovered $ACTUAL"; }
fi

# --- D3: blueprint stamps --------------------------------------------------------------------------------------------
D3=ok; BP_COUNT=0
for BP in "$TERM_ROOT"/docs/blueprints/logic/classes/*/*.md; do
    [ -f "$BP" ] || continue
    BP_COUNT=$((BP_COUNT + 1))
    PKG=$(basename "$(dirname "$BP")"); CLS=$(basename "$BP" .md)
    SRC="$TERM_ROOT/src/main/groovy/com/endlesstransit/$PKG/$CLS.groovy"
    if [ ! -f "$SRC" ]; then D3=FAIL; fail "D3 ${BP#$ROOT/} describes $PKG/$CLS.groovy, which does not exist"; continue; fi
    WANT=$(git hash-object "$SRC" | cut -c1-10)
    HAVE=$(tail -1 "$BP" | sed -n "s/^\*\(Verified\|Baselined (not audited)\) against: $CLS\.groovy @ \([0-9a-f]\{10\}\)\*$/\2/p")
    [ "$HAVE" = "$WANT" ] || { D3=FAIL; fail "D3 ${BP#$ROOT/} stamp is '${HAVE:-<missing>}', $CLS.groovy is $WANT — read the blueprint against the class, fix it, re-stamp 'Verified against'"; }
done
[ $BP_COUNT -gt 0 ] || { D3=FAIL; fail "D3 no blueprints found under terminal/docs/blueprints/logic/classes"; }

# --- report ----------------------------------------------------------------------------------------------------------
if [ ${#FAILS[@]} -eq 0 ]; then STATUS=PASS; EXIT=0; else STATUS=FAIL; EXIT=1; fi
LINE="DOCS=$STATUS D1=$D1(${ACTUAL:-?}) D3=$D3($BP_COUNT)"
if [ $AGENT -eq 1 ]; then
    for F in "${FAILS[@]}"; do echo "$F" >&2; done
    echo "$LINE"
else
    echo -e "${CYAN}[VINC:AUDITING_DOCS...]${RESET}"
    for F in "${FAILS[@]}"; do echo "    $F"; done
    if [ $STATUS = PASS ]; then echo -e "${GREEN}[DOCS_TRUE]${RESET} $LINE"; else echo -e "${RED}[DOCS_STALE]${RESET} $LINE"; fi
fi
exit $EXIT
