# Infrastructure Lessons

## Patterns
- **Directory Structure**: Aligning with standard JVM layouts (`src/main/groovy`, `src/test/groovy`) simplifies classpath management and tool integration.
- **Backup Strategy**: Using a simple shell script with timestamped tarballs (`date +"%Y%m%d_%H%M%S"`) provides a consistent and sortable backup history.
- **Verified AI-TDD**: Before fixing any bug, create a reproduction test (e.g., `NewGameTest.groovy`) that stress-tests the failure condition across multiple random seeds.
- **Compilation Gatekeeper**: Use `groovyc` in the `run.sh` script to enforce static type checking before any tests run. This prevents "hallucinated" properties or missing imports from reaching the game loop.

## Mistakes/Corrections
- **Package Relocation**: When moving the entry point (`Main.groovy`), ensure it is within the package structure (`com.endlesstransit`) to avoid classpath collisions or import ambiguity.
- **Verification Protocol**: Always use the `--test` parameter when executing `./run.sh` for verification. Avoid manual execution for logic or UI validation that can be automated via the test suite.
