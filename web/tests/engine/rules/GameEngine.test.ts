import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { UniverseNamer } from '#engine/procgen/UniverseNamer.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import { FixedEntropySource } from '#tests/support/FixedEntropySource.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';
import { MemorySaveStore } from '#tests/support/MemorySaveStore.ts';

const FIRST = new Seed(0x11111111, 0x22222222);
const SECOND = new Seed(0x33333333, 0x44444444);

const namer = new UniverseNamer(
  new ContentLibrary(
    new MemoryContentSource({
      'themes/cultures/index.txt': 'void\n',
      'names/buildings/adj/void.txt': 'Hollow\nSilent\nDrifting\n',
      'names/buildings/noun/void.txt': 'Horizon\nReach\nAperture\n',
    }),
  ),
);

function engineOn(saves: MemorySaveStore): GameEngine {
  return new GameEngine({ namer, entropy: new FixedEntropySource([FIRST, SECOND]), saves });
}

describe('GameEngine — the title screen', () => {
  test('a fresh game has no world and offers exactly one option: new world', () => {
    const snapshot = engineOn(new MemorySaveStore()).snapshot();
    expect(snapshot.world).toBeNull();
    expect(snapshot.options).toEqual([{ id: 'new-world', key: 'n', label: 'New world' }]);
  });

  test('new world draws a seed, names the universe from it, and then offers re-roll', () => {
    const snapshot = engineOn(new MemorySaveStore()).step('new-world');
    expect(snapshot.world).toEqual({ seed: '1111-1111-2222-2222', name: namer.nameOf(FIRST) });
    expect(snapshot.options).toEqual([{ id: 'reroll', key: 'r', label: 'Re-roll' }]);
    expect(snapshot.message).toContain('1111-1111-2222-2222');
  });

  test('re-roll draws the next seed', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    expect(engine.step('reroll').world).toEqual({ seed: '3333-3333-4444-4444', name: namer.nameOf(SECOND) });
  });

  test('an option that is not on offer changes nothing (a stale tap, an unknown id)', () => {
    const engine = engineOn(new MemorySaveStore());
    expect(engine.step('reroll').world).toBeNull();
    expect(engine.step('open-pod-bay-doors').world).toBeNull();
    const world = engine.step('new-world').world;
    expect(engine.step('new-world').world).toEqual(world);
  });

  test('step returns plain data: it survives JSON unchanged, and snapshot() repeats it', () => {
    const engine = engineOn(new MemorySaveStore());
    const snapshot = engine.step('new-world');
    expect(JSON.parse(JSON.stringify(snapshot))).toEqual(snapshot);
    expect(engine.snapshot()).toEqual(snapshot);
  });
});

describe('GameEngine — the last seed is remembered', () => {
  test('every drawn world is saved, and a new engine on the same store restores it', () => {
    const saves = new MemorySaveStore();
    const played = engineOn(saves).step('new-world');
    const restored = engineOn(saves).snapshot();
    expect(restored.world).toEqual(played.world);
    expect(restored.options).toEqual([{ id: 'reroll', key: 'r', label: 'Re-roll' }]);
    expect(restored.message).toMatch(/restored/i);
  });

  test('the save follows the re-roll', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    engine.step('new-world');
    engine.step('reroll');
    expect(engineOn(saves).snapshot().world?.seed).toBe('3333-3333-4444-4444');
  });

  test('a corrupt save is a fresh game, not a crash', () => {
    expect(engineOn(new MemorySaveStore('{"version":1,"seed":')).snapshot().world).toBeNull();
  });
});
