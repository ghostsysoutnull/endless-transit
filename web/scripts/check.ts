/**
 * `npm run check` — typecheck + lint + format check + unit tests, ending in exactly one machine line:
 *
 *   STATUS=PASS TYPECHECK=ok LINT=ok FORMAT=ok TESTS=ok(17/17)
 *   STATUS=FAIL TYPECHECK=ok LINT=FAIL FORMAT=ok TESTS=FAIL(16/17)
 *
 * Every step runs even when an earlier one failed; a failed step's output is printed above the line.
 * Node runs this file directly (type stripping) — keep it free of enums and parameter properties.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface StepResult {
  readonly label: string;
  readonly ok: boolean;
  readonly detail: string;
  readonly output: string;
}

const WEB_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const BIN = join(WEB_ROOT, 'node_modules', '.bin');
const TEST_REPORT = join(WEB_ROOT, '.vitest', 'check-results.json');

function run(label: string, tool: string, args: readonly string[]): StepResult {
  const done = spawnSync(join(BIN, tool), args, { cwd: WEB_ROOT, encoding: 'utf8' });
  const ok = done.status === 0;
  return { label, ok, detail: ok ? 'ok' : 'FAIL', output: `${done.stdout}${done.stderr}` };
}

function testCounts(): string {
  if (!existsSync(TEST_REPORT)) return '';
  const report = JSON.parse(readFileSync(TEST_REPORT, 'utf8')) as {
    numPassedTests?: number;
    numTotalTests?: number;
  };
  return `(${String(report.numPassedTests ?? 0)}/${String(report.numTotalTests ?? 0)})`;
}

function runTests(): StepResult {
  rmSync(TEST_REPORT, { force: true });
  const step = run('TESTS', 'vitest', [
    'run',
    '--reporter=default',
    '--reporter=json',
    `--outputFile.json=${TEST_REPORT}`,
  ]);
  const counts = testCounts();
  // No report or zero tests means the runner never got to the suite — that is not a pass.
  const ok = step.ok && counts !== '' && !counts.endsWith('/0)');
  return { ...step, ok, detail: `${ok ? 'ok' : 'FAIL'}${counts}` };
}

const steps: readonly StepResult[] = [
  run('TYPECHECK', 'tsc', ['-b']),
  run('LINT', 'eslint', ['.', '--max-warnings=0']),
  run('FORMAT', 'prettier', ['--check', '.']),
  runTests(),
];

for (const step of steps) {
  if (!step.ok) console.log(`\n--- ${step.label} ---\n${step.output.trim()}`);
}
const passed = steps.every((step) => step.ok);
console.log(
  `STATUS=${passed ? 'PASS' : 'FAIL'} ${steps.map((step) => `${step.label}=${step.detail}`).join(' ')}`,
);
process.exitCode = passed ? 0 : 1;
