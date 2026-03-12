# Infrastructure Lessons

## Patterns
- **Directory Structure**: Aligning with standard JVM layouts (`src/main/groovy`, `src/test/groovy`) simplifies classpath management and tool integration.
- **Backup Strategy**: Using a simple shell script with timestamped tarballs (`date +"%Y%m%d_%H%M%S"`) provides a consistent and sortable backup history.
- **Verified AI-TDD**: Before fixing any bug, create a reproduction test (e.g., `NewGameTest.groovy`) that stress-tests the failure condition across multiple random seeds.
- **Compilation Gatekeeper**: Use `groovyc` in the `run.sh` script to enforce static type checking before any tests run.
- **Clinical Interface (vinc.sh)**: For agent-driven operations or automated CI, use `./vinc.sh` instead of `./run.sh`. This provides zero-latency execution, silent success, and mandatory substrate verification without the thematic intro overhead.
- **Context-Efficient Testing**: Always prefer `./vinc.sh --test -q` (Quiet Mode) during development. This suppresses passing test noise while providing a real-time heartbeat, preventing the context window from being saturated with thousands of redundant tokens.

## Mistakes/Corrections
- **Package Relocation**: When moving the entry point (`Main.groovy`), ensure it is within the package structure (`com.endlesstransit`) to avoid classpath collisions or import ambiguity.
- **Verification Protocol**: Always use the `--test` parameter when executing `./vinc.sh` for verification. Avoid manual execution for logic or UI validation that can be automated via the test suite.
