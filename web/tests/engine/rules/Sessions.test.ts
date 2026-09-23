import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { FixedEntropySource } from '#tests/support/FixedEntropySource.ts';
import { MemorySaveStore } from '#tests/support/MemorySaveStore.ts';
import { must, realRegistry } from '#tests/support/world.ts';

const FIXTURES = new URL('../../fixtures/', import.meta.url);

/** A play session as a fixture: the seed the world is drawn from and every option id tapped, from the title on. */
interface Session {
  readonly seed: string;
  readonly history: readonly string[];
}

function sessions(): readonly [string, Session][] {
  return readdirSync(FIXTURES)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => [file, JSON.parse(readFileSync(new URL(file, FIXTURES), 'utf8')) as Session]);
}

/** The game as the page builds it, in debug mode (tests use the INTEGRITY tool), on a store of its own. */
function engineOn(seed: Seed, saves: MemorySaveStore): GameEngine {
  return new GameEngine({
    world: realRegistry(),
    entropy: new FixedEntropySource([seed]),
    saves,
    debug: true,
  });
}

/** Everything but the status message and the panels (scan, map, trace): they belong to the last step, not to the state a save holds. */
function shown(snapshot: GameSnapshot): Omit<GameSnapshot, 'message' | 'scan' | 'map' | 'trace'> {
  return { ...snapshot, message: undefined, scan: undefined, map: undefined, trace: undefined } as Omit<
    GameSnapshot,
    'message' | 'scan' | 'map' | 'trace'
  >;
}

/**
 * The save is the whole state. After every tap: a second engine on the same store shows the same screen
 * (everything but the status message), and that engine's next tap writes the very save the uninterrupted
 * game writes — `saved(restore(s))` is `s`, carried one step on. Returns the last snapshot.
 */
function replay(seed: Seed, history: readonly string[]): GameSnapshot {
  const saves = new MemorySaveStore();
  const engine = engineOn(seed, saves);
  let snapshot = engine.snapshot();
  let twin: MemorySaveStore | undefined;
  for (const [at, id] of history.entries()) {
    const where = `tap ${String(at)} (${id})`;
    if (twin !== undefined) engineOn(seed, twin).step(id);
    snapshot = engine.step(id);
    const text = saves.load();
    if (twin !== undefined) expect(twin.load(), where).toBe(text);
    twin = undefined;
    // The title screen is not restored as such: a reload lands where the traveller stood (I02), so a
    // snapshot at the title has no twin screen; the world's save is compared again on the next tap inside.
    // The recap and the buffer screen are prompts the save does not hold either (a reload lands in the
    // world); the reboot is.
    if (text === undefined || snapshot.place === null || snapshot.prompt?.id === 'recap') continue;
    if (snapshot.prompt?.id === 'buffer') continue;
    const restored = engineOn(seed, new MemorySaveStore(text)).snapshot();
    expect(shown(restored), where).toEqual(shown(snapshot));
    twin = new MemorySaveStore(text);
  }
  return snapshot;
}

/** A small deterministic generator for the random sessions — the test's own, not the engine's. */
function lcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

describe('Sessions — a save is the whole state, on every tap of a play session', () => {
  const fixtures = sessions();

  test('the fixtures under tests/fixtures/ are found', () => {
    expect(fixtures.map(([file]) => file)).toContain('walk-and-title.json');
    expect(fixtures.map(([file]) => file)).toContain('death-and-reboot.json');
    expect(fixtures.map(([file]) => file)).toContain('elevator-marathon.json');
    expect(fixtures.map(([file]) => file)).toContain('recap-and-end.json');
    expect(fixtures.map(([file]) => file)).toContain('capture-merge-drop.json');
    expect(fixtures.map(([file]) => file)).toContain('keystone-and-descent.json');
    expect(fixtures.length).toBeGreaterThanOrEqual(6);
  });

  test.each(fixtures)('%s replays with a reload after every tap', (_, session) => {
    const seed = must(Seed.parse(session.seed), 'a seed');
    const last = replay(seed, session.history);
    expect(last.world?.seed).toBe(session.seed);
  });

  test('death-and-reboot.json dies twice and continues: the reboot keeps the steps and the visited places', () => {
    const [, session] = must(fixtures.find(([file]) => file === 'death-and-reboot.json'));
    const seed = must(Seed.parse(session.seed));
    const last = replay(seed, session.history);
    expect(last.place?.kind).toBe('Building');
    // Bright Road is entropic: two per tap. Reborn at 100: enter:2 (98), leave (96 after the tool), … enter:3 at the end.
    expect(last.player?.coherence).toBe(96);
    expect(last.player?.steps).toBe(9);
    expect(last.prompt).toBeNull();
  });

  test('elevator-marathon.json rides an entropic building to death without any debug tool: two per tap, 48 taps from 96, and the tap that takes the last point never runs', () => {
    const [, session] = must(fixtures.find(([file]) => file === 'elevator-marathon.json'));
    const seed = must(Seed.parse(session.seed));
    const saves = new MemorySaveStore();
    const engine = engineOn(seed, saves);
    let snapshot = engine.snapshot();
    for (const id of session.history.slice(0, 4)) snapshot = engine.step(id);
    expect(snapshot.player).toEqual({ coherence: 96, band: 'stable', steps: 2 });
    expect(snapshot.place?.name).toMatch(/^Floor \d+$/);
    for (const id of session.history.slice(4, 51)) snapshot = engine.step(id);
    expect(snapshot.player).toEqual({ coherence: 2, band: 'critical', steps: 49 });
    expect(snapshot.prompt).toBeNull();
    snapshot = engine.step(must(session.history[51]));
    expect(snapshot.player).toEqual({ coherence: 0, band: 'critical', steps: 49 });
    expect(snapshot.prompt?.id).toBe('reboot');
    const last = replay(seed, session.history);
    expect(last.place?.kind).toBe('Street');
    expect(last.player).toEqual({ coherence: 90, band: 'stable', steps: 54 });
  });

  test('capture-merge-drop.json takes, merges, drops, takes back and dies with a full buffer: the buffer, the tally and the rooms survive every reload and the reboot', () => {
    const [, session] = must(fixtures.find(([file]) => file === 'capture-merge-drop.json'));
    const seed = must(Seed.parse(session.seed));
    const last = replay(seed, session.history);
    expect(last.place?.kind).toBe('Street');
    // Reborn at 100: four taps down, a capture, the buffer, a merge back to 100, three leaves.
    expect(last.player?.coherence).toBe(97);
    // The lottery (I07) lands Hidden Frequencies along the walk (Void.test pins the rolls); the taps are the same.
    expect(last.buffer?.fragments.map((fragment) => [fragment.name, fragment.hertz])).toEqual([
      ['stone gargoyle infused with orbital beacon', 3788],
      ['Hidden Frequency', 2906631],
      ['reliquary box fused to copper pipe', 3300],
      ['Hidden Frequency', 1181618],
      ['marble cherub fused to foundry ladle', 2904],
      ['Hidden-brass Hybrid', 3718017],
      ['plasma coil with reliquary box', 3194],
      ['Hidden Frequency', 6964442],
      ['Hidden-prayer Hybrid', 1419235],
    ]);
    expect(last.prompt).toBeNull();
  });

  test('keystone-and-descent.json primes, forges, rides to the Peak, breaches, descends, takes a shard’s relic, scans on every level, dies below the bedrock and is reborn on the street with the buffer', () => {
    const [, session] = must(fixtures.find(([file]) => file === 'keystone-and-descent.json'));
    const seed = must(Seed.parse(session.seed));
    const last = replay(seed, session.history);
    expect(last.place?.name).toBe('Floor 0');
    expect(last.buffer?.fragments.map((fragment) => fragment.name)).toEqual([
      'Hidden Frequency',
      'Hidden Frequency',
      'null reference infused with radar dish',
    ]);
    // Reborn at 100: enter the building, enter the lobby — the building sealed again.
    expect(last.player?.coherence).toBe(98);
    expect(last.options.filter((option) => option.role === 'move').map((option) => option.id)).toEqual([
      'move:up',
      'move:corridor',
    ]);
  });

  test('random play: sixty taps on each of six worlds, any option on offer, a reload after every one', () => {
    for (let n = 0; n < 6; n++) {
      const draw = lcg(0x5eed + n * 7919);
      const seed = new Seed(Math.floor(draw() * 0xffffffff), Math.floor(draw() * 0xffffffff));
      const rehearsal = engineOn(seed, new MemorySaveStore());
      const history: string[] = [];
      let snapshot = rehearsal.snapshot();
      for (let tap = 0; tap < 60; tap++) {
        const options = snapshot.options.filter((option) => !option.sealed);
        const chosen = must(options[Math.floor(draw() * options.length)], 'an option');
        history.push(chosen.id);
        snapshot = rehearsal.step(chosen.id);
      }
      const last = replay(seed, history);
      expect(shown(last), seed.toString()).toEqual(shown(snapshot));
    }
  });
});
