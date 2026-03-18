# Infrastructure Lessons

## Patterns
- **Directory Structure**: Aligning with standard JVM layouts (`src/main/groovy`, `src/test/groovy`) simplifies classpath management and tool integration.
- **Backup Strategy**: Using a simple shell script with timestamped tarballs (`date +"%Y%m%d_%H%M%S"`) provides a consistent and sortable backup history.
- **Verified AI-TDD**: Before fixing any bug, create a reproduction test (e.g., `NewGameTest.groovy`) that stress-tests the failure condition across multiple random seeds.
- **Compilation Gatekeeper**: Use `groovyc` in the `run.sh` script to enforce static type checking before any tests run.
- **Clinical Interface (vinc.sh)**: For agent-driven operations or automated CI, use `./vinc.sh` instead of `./run.sh`. This provides zero-latency execution, silent success, and mandatory substrate verification without the thematic intro overhead.
- **Context-Efficient Testing**: Use `./vinc.sh --test --agent 2>/dev/null` for quick gate checks (1 line: `STATUS=PASS|FAIL ...`). Use `./vinc.sh --test -q` when debugging failures (20 lines with stack frame location). `--agent` is the default for agentic verification; `-q` is for human-readable diagnosis.
- **Build Cache Staleness**: Always run `rm -rf build/vinc` after deleting or renaming any `.groovy` source file. `vinculum_compile()` never purges stale artifacts — deleted classes continue to be discovered and run until the cache is manually cleared. Symptom: test discovered count is higher than expected, or unknown tests appear in output.

## Mistakes/Corrections
- **Package Relocation**: When moving the entry point (`Main.groovy`), ensure it is within the package structure (`com.endlesstransit`) to avoid classpath collisions or import ambiguity.
- **Verification Protocol**: Always use the `--test` parameter when executing `./vinc.sh` for verification. Avoid manual execution for logic or UI validation that can be automated via the test suite.
