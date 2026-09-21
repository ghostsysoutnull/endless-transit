/**
 * `npm run publish:site` — puts the production build where GitHub Pages serves it: `<repo>/docs/play/`.
 *
 * The site is Pages "legacy" mode: Jekyll builds `master:/docs`; files without front matter are copied as
 * they are, so the game is served at `/endless-transit/play/`. Committing and pushing stay with the caller.
 *
 *   1. refuses unless `npm run check` is green and `web/` has no uncommitted change (the stamp names a commit);
 *   2. builds with ET_BUILD=<stamp> and the production base (ET_BASE is dropped);
 *   3. refuses names Jekyll would drop or mangle (leading `_` `.` `#`, trailing `~`);
 *   4. empties `docs/play/`, copies `dist/**` into it, writes `docs/play/build.txt` = the stamp.
 *
 * The stamp is the short hash of the last commit that touched `web/` — nothing time-based, and the publish
 * commit itself (which only touches `docs/play/`) does not move it: same source, same folder, byte for byte.
 * Node runs this file directly (type stripping) — keep it free of enums and parameter properties.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const REPO_ROOT = dirname(WEB_ROOT);
const BIN = join(WEB_ROOT, 'node_modules', '.bin');
const DIST = join(WEB_ROOT, 'dist');
const TARGET = join(REPO_ROOT, 'docs', 'play');
const JEKYLL_WOULD_DROP = /^[_.#]|~$/;

function refuse(reason: string): never {
  console.error(`PUBLISH=REFUSED ${reason}`);
  process.exit(1);
}

function capture(command: string, args: readonly string[], cwd: string): string {
  const done = spawnSync(command, args, { cwd, encoding: 'utf8' });
  if (done.status !== 0) refuse(`'${command} ${args.join(' ')}' failed: ${done.stderr.trim()}`);
  return done.stdout.trim();
}

function runOrRefuse(what: string, command: string, args: readonly string[], env: NodeJS.ProcessEnv): void {
  const done = spawnSync(command, args, { cwd: WEB_ROOT, env, stdio: 'inherit' });
  if (done.status !== 0) refuse(`${what} is not green — nothing was published.`);
}

/** Every file and directory under `root`, as paths relative to it. */
function walk(root: string, under = ''): string[] {
  return readdirSync(join(root, under), { withFileTypes: true }).flatMap((entry) => {
    const path = join(under, entry.name);
    return entry.isDirectory() ? [path, ...walk(root, path)] : [path];
  });
}

const dirty = capture('git', ['status', '--porcelain', '--', 'web'], REPO_ROOT);
if (dirty !== '') refuse(`web/ has uncommitted changes — the build stamp must name a commit:\n${dirty}`);
const stamp = capture('git', ['log', '-1', '--format=%h', '--', 'web'], REPO_ROOT);
if (stamp === '') refuse('no commit touches web/ — nothing to stamp the build with.');

const env: NodeJS.ProcessEnv = { ...process.env, ET_BUILD: stamp };
delete env.ET_BASE;

runOrRefuse('npm run check', process.execPath, [join(WEB_ROOT, 'scripts', 'check.ts')], env);
runOrRefuse('typecheck', join(BIN, 'tsc'), ['-b'], env);
runOrRefuse('vite build', join(BIN, 'vite'), ['build'], env);

const built = walk(DIST);
if (!built.includes('index.html')) refuse('the build has no index.html.');
const unsafe = built.filter((path) => path.split(/[\\/]/).some((name) => JEKYLL_WOULD_DROP.test(name)));
if (unsafe.length > 0) refuse(`Jekyll would drop or mangle these names: ${unsafe.join(', ')}`);

rmSync(TARGET, { recursive: true, force: true });
mkdirSync(TARGET, { recursive: true });
cpSync(DIST, TARGET, { recursive: true });
writeFileSync(join(TARGET, 'build.txt'), `${stamp}\n`);

const files = walk(TARGET).length;
console.log(`PUBLISH=OK BUILD=${stamp} FILES=${String(files)} TARGET=${relative(REPO_ROOT, TARGET)}/`);
