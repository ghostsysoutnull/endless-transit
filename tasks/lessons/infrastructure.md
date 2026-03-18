# Infrastructure Lessons

## Patterns
- **Directory Structure**: Aligning with standard JVM layouts (`src/main/groovy`, `src/test/groovy`) simplifies classpath management and tool integration.
- **Backup Strategy**: Using a simple shell script with timestamped tarballs (`date +"%Y%m%d_%H%M%S"`) provides a consistent and sortable backup history.
- **Verified AI-TDD**: Before fixing any bug, create a reproduction test (e.g., `NewGameTest.groovy`) that stress-tests the failure condition across multiple random seeds.
- **Compilation Gatekeeper**: Use `groovyc` in the `run.sh` script to enforce static type checking before any tests run.
- **Clinical Interface (vinc.sh)**: For agent-driven operations or automated CI, use `./vinc.sh` instead of `./run.sh`. This provides zero-latency execution, silent success, and mandatory substrate verification without the thematic intro overhead.
- **Context-Efficient Testing**: Use `./vinc.sh --test --agent 2>/dev/null` for quick gate checks (1 line: `STATUS=PASS|FAIL ...`). Use `./vinc.sh --test -q` when debugging failures (20 lines with stack frame location). `--agent` is the default for agentic verification; `-q` is for human-readable diagnosis.
- **Build Cache Staleness**: Always run `rm -rf build/vinc` after deleting or renaming any `.groovy` source file. `vinculum_compile()` never purges stale artifacts — deleted classes continue to be discovered and run until the cache is manually cleared. Symptom: test discovered count is higher than expected, or unknown tests appear in output.

- **Test Artifact Convention**: All files written by tests fall into two categories: (1) **transient scaffolding** — always deleted in `@AfterEach` or inline cleanup, never committed; (2) **pinned baselines** — written once with write-once semantics (`if (!file.exists())`), gitignored, refreshed by deleting and re-running. Tests must never write to `src/` or overwrite committed files. Violations pollute `git status` and erode confidence in the working tree.
- **Polling over sleeping**: When a test waits for an async side-effect (file write, event, state change), use a polling loop (`while deadline not reached: check condition, sleep 50ms`) rather than a fixed sleep. The common-case path exits in 1–2 iterations; the timeout ceiling still catches regressions.
- **Verify the working tree after every test run**: Run `git status --short` immediately after `./vinc.sh --test`. A clean tree confirms no test is leaking artifacts. If anything appears dirty, investigate before the next commit — artifact pollution compounds silently across sessions.
- **Code generation in tests signals a missing abstraction**: When every generated file shares the same structure with only data varying, the answer is a `@TestFactory` + data files (JSON, txt), not a template engine. Generated `.groovy` source files require compilation, pollute the source tree, and risk overwriting committed code.

## Mistakes/Corrections
- **Package Relocation**: When moving the entry point (`Main.groovy`), ensure it is within the package structure (`com.endlesstransit`) to avoid classpath collisions or import ambiguity.
- **Verification Protocol**: Always use the `--test` parameter when executing `./vinc.sh` for verification. Avoid manual execution for logic or UI validation that can be automated via the test suite.
