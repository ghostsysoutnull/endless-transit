import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { FixedEntropySource } from '#tests/support/FixedEntropySource.ts';
import { MemorySaveStore } from '#tests/support/MemorySaveStore.ts';
import { must, realRegistry } from '#tests/support/world.ts';

const FIRST = new Seed(0x7f3a91c2, 0x0b4de6a8);
const SECOND = new Seed(0x33333333, 0x44444444);

function engineOn(saves: MemorySaveStore): GameEngine {
  return new GameEngine({ world: realRegistry(), entropy: new FixedEntropySource([FIRST, SECOND]), saves });
}

function system(id: string, key: string, label: string): GameOption {
  return { id, key, label, place: '', role: 'system', sealed: false, landmark: false };
}

function ids(snapshot: GameSnapshot): string[] {
  return snapshot.options.map((option) => option.id);
}

/** A world entered and walked down the first child `levels` times. */
function walkedDown(engine: GameEngine, levels: number): GameSnapshot {
  engine.step('new-world');
  let snapshot = engine.step('enter-world');
  for (let level = 0; level < levels; level++) snapshot = engine.step('enter:0');
  return snapshot;
}

describe('GameEngine — the title screen', () => {
  test('a fresh game has no world, no place, and offers exactly one option: new world', () => {
    const snapshot = engineOn(new MemorySaveStore()).snapshot();
    expect(snapshot.world).toBeNull();
    expect(snapshot.place).toBeNull();
    expect(snapshot.options).toEqual([system('new-world', 'n', 'New world')]);
  });

  test('new world draws a seed; the universe has one name in every world; enter and re-roll are offered', () => {
    const snapshot = engineOn(new MemorySaveStore()).step('new-world');
    expect(snapshot.world).toEqual({ seed: '7F3A-91C2-0B4D-E6A8', name: 'The Endless Universe' });
    expect(snapshot.place).toBeNull();
    expect(snapshot.options).toEqual([
      system('enter-world', 'e', 'Enter world'),
      system('reroll', 'r', 'Re-roll'),
    ]);
    expect(snapshot.message).toContain('7F3A-91C2-0B4D-E6A8');
  });

  test('re-roll draws the next seed', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    expect(engine.step('reroll').world?.seed).toBe('3333-3333-4444-4444');
  });

  test('an option that is not on offer changes nothing (a stale tap, an unknown id)', () => {
    const engine = engineOn(new MemorySaveStore());
    for (const id of ['reroll', 'enter-world', 'enter:0', 'leave', 'to-title', 'open-pod-bay-doors', '']) {
      expect(engine.step(id).world, id).toBeNull();
    }
    const world = engine.step('new-world').world;
    expect(engine.step('new-world').world).toEqual(world);
    expect(engine.step('leave').place).toBeNull();
  });
});

describe('GameEngine — walking the big world', () => {
  test('entering the world stands in the universe: what it is, where it is, what it shows, where it leads', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    const snapshot = engine.step('enter-world');
    expect(snapshot.place).toEqual({
      kind: 'Universe',
      icon: '∞',
      name: 'The Endless Universe',
      address: '0',
      hash: '23.825 / 43.173',
      depth: 0,
      position: null,
      trail: [{ icon: '∞', kind: 'Universe', name: 'The Endless Universe' }],
      status: 'UNIMATRIX_STABLE',
      description: ['A neural web of infinite complexity.'],
      facts: [],
      frame: null,
      childrenHeading: 'Primary filaments radiating from root:',
    });
    const travel = snapshot.options.filter((option) => option.role === 'travel');
    expect(travel.length).toBeGreaterThanOrEqual(3);
    expect(travel[0]).toEqual({
      id: 'enter:0',
      key: '1',
      label: 'Synchronize with Zeta-915-Link',
      place: 'Zeta-915-Link',
      role: 'travel',
      sealed: false,
      landmark: false,
    });
    expect(ids(snapshot)).not.toContain('leave');
    expect(snapshot.options.at(-1)).toEqual(system('to-title', 't', 'Title screen'));
  });

  test('tapping a child goes down one level; the trail, the position and the way back follow', () => {
    const engine = engineOn(new MemorySaveStore());
    const snapshot = walkedDown(engine, 1);
    const place = must(snapshot.place ?? undefined, 'a place');
    expect(place.kind).toBe('Cosmic filament');
    expect(place.name).toBe('Zeta-915-Link');
    expect(place.address).toBe('0.0');
    expect(place.depth).toBe(1);
    expect(place.position?.label).toBe('CONDUIT');
    expect(place.position?.index).toBe(1);
    expect(place.trail.map((step) => step.name)).toEqual(['The Endless Universe', 'Zeta-915-Link']);
    expect(snapshot.options.find((option) => option.id === 'leave')).toEqual({
      id: 'leave',
      key: 'l',
      label: 'Leave Cosmic filament',
      place: '',
      role: 'return',
      sealed: false,
      landmark: false,
    });
    expect(snapshot.message).toBe('Entered Zeta-915-Link.');
  });

  test('eight levels: universe to street and back up to the universe', () => {
    const engine = engineOn(new MemorySaveStore());
    const kinds = [must(walkedDown(engine, 0).place ?? undefined).kind];
    for (let level = 0; level < 7; level++) kinds.push(must(engine.step('enter:0').place ?? undefined).kind);
    expect(kinds).toEqual([
      'Universe',
      'Cosmic filament',
      'Galactic sector',
      'Solar system',
      'Planet',
      'Country',
      'City',
      'Street',
    ]);
    const street = engine.snapshot();
    expect(street.place?.name).toBe('Bright Boulevard');
    expect(street.place?.frame).toBe('yellow');
    expect(street.place?.facts).toEqual([
      { key: 'era', label: 'TECH_ERA', value: 'future' },
      { key: 'culture', label: 'RESONANCE', value: 'baroque' },
    ]);
    for (let level = 0; level < 7; level++) engine.step('leave');
    expect(engine.snapshot().place?.kind).toBe('Universe');
    expect(engine.snapshot().message).toBe('Returned to The Endless Universe.');
    expect(ids(engine.snapshot())).not.toContain('leave');
  });

  test('the buildings of a street are open: tapping one enters it', () => {
    const engine = engineOn(new MemorySaveStore());
    const street = walkedDown(engine, 7);
    const buildings = street.options.filter((option) => option.role === 'travel');
    expect(buildings).toHaveLength(4);
    expect(buildings.every((option) => !option.sealed && option.key !== '')).toBe(true);
    expect(buildings[0]?.label).toBe('Enter Building: Ornate Sanctum');
    expect(buildings[0]?.place).toBe('Ornate Sanctum');
    const after = engine.step('enter:0');
    expect(after.place?.kind).toBe('Building');
    expect(after.message).toBe('Entered Ornate Sanctum.');
  });

  test('keys: the first nine children get 1–9, the next get letters that no other option uses', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    for (let level = 0; level < 40; level++) {
      const snapshot = engine.snapshot();
      const keys = snapshot.options.map((option) => option.key).filter((key) => key !== '');
      expect(new Set(keys).size, snapshot.place?.address).toBe(keys.length);
      const open = snapshot.options.filter((option) => option.role === 'travel' && !option.sealed);
      expect(open.slice(0, 9).map((option) => option.key)).toEqual(
        ['1', '2', '3', '4', '5', '6', '7', '8', '9'].slice(0, open.length),
      );
      // Walk the widest branch on offer, then come back up when the street is reached.
      engine.step(open.length === 0 ? 'leave' : `enter:${String(open.length - 1)}`);
    }
  });

  test('the letters children get are the alphabet minus every key a command claims (e l n r t)', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    // Steamspire (seed 7F3A-…): fifteen streets — nine digits, then the first six free letters.
    for (const index of [0, 0, 0, 0, 2, 0]) engine.step(`enter:${String(index)}`);
    const city = engine.snapshot();
    expect(city.place?.name).toBe('Steamspire');
    expect(
      city.options
        .filter((option) => option.role === 'travel')
        .map((option) => option.key)
        .join(''),
    ).toBe('123456789abcdfg');
  });

  test('step returns plain data: it survives JSON unchanged, and snapshot() repeats it', () => {
    const engine = engineOn(new MemorySaveStore());
    const snapshot = walkedDown(engine, 5);
    expect(JSON.parse(JSON.stringify(snapshot))).toEqual(snapshot);
    expect(engine.snapshot()).toEqual(snapshot);
  });
});

describe('GameEngine — the place is remembered', () => {
  test('every move is saved: a new engine on the same store stands in the same place', () => {
    const saves = new MemorySaveStore();
    const played = walkedDown(engineOn(saves), 4);
    const restored = engineOn(saves).snapshot();
    expect(restored.place).toEqual(played.place);
    expect(restored.options).toEqual(played.options);
    expect(restored.message).toMatch(/restored/i);
  });

  test('a world drawn but not entered is restored to the title, as before', () => {
    const saves = new MemorySaveStore();
    const played = engineOn(saves).step('new-world');
    const restored = engineOn(saves).snapshot();
    expect(restored.world).toEqual(played.world);
    expect(restored.place).toBeNull();
    expect(ids(restored)).toEqual(['enter-world', 'reroll']);
    expect(restored.message).toMatch(/restored/i);
  });

  test('the title screen from inside the world: the place waits, "Continue" goes back to it, a re-roll forgets it', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    const inside = walkedDown(engine, 3);
    const title = engine.step('to-title');
    expect(title.place).toBeNull();
    expect(title.world?.seed).toBe('7F3A-91C2-0B4D-E6A8');
    expect(title.options).toEqual([system('enter-world', 'e', 'Continue'), system('reroll', 'r', 'Re-roll')]);
    expect(engineOn(saves).snapshot().place).toEqual(inside.place);
    expect(engine.step('enter-world').place).toEqual(inside.place);

    engine.step('to-title');
    engine.step('reroll');
    expect(engine.step('enter-world').place?.address).toBe('0');
  });

  test('a corrupt save, or a path that leads nowhere, is a fresh game — not a crash, not half a world', () => {
    for (const text of [
      '{"version":2,"seed":',
      '{"version":1,"seed":"7F3A-91C2-0B4D-E6A8"}',
      '{"version":2,"seed":"7F3A-91C2-0B4D-E6A8","path":"0.99"}',
      '{"version":2,"seed":"7F3A-91C2-0B4D-E6A8","path":"0.0.0.0.0.0.0.0.999"}',
    ]) {
      const snapshot = engineOn(new MemorySaveStore(text)).snapshot();
      expect(snapshot.world, text).toBeNull();
      expect(snapshot.place, text).toBeNull();
      expect(snapshot.message, text).toBe('');
      expect(ids(snapshot), text).toEqual(['new-world']);
    }
  });
});
