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

function engineOn(saves: MemorySaveStore, debug = false): GameEngine {
  return new GameEngine({
    world: realRegistry(),
    entropy: new FixedEntropySource([FIRST, SECOND]),
    saves,
    debug,
  });
}

function system(id: string, key: string, label: string): GameOption {
  return {
    id,
    key,
    label,
    place: '',
    role: 'system',
    sealed: false,
    landmark: false,
    ordinal: '',
    readings: [],
    opposite: '',
    current: false,
    visited: false,
  };
}

/** A move option names the option that undoes it, so a screen can keep the focus off it. */
function move(id: string, key: string, label: string, opposite: string): GameOption {
  return { ...system(`move:${id}`, key, label), role: 'move', opposite: `move:${opposite}` };
}

function ids(snapshot: GameSnapshot): string[] {
  return snapshot.options.map((option) => option.id);
}

/** Every address from the universe down to `path`. */
function trailOf(path: string): string[] {
  const steps = path.split('.');
  return steps.map((_, depth) => steps.slice(0, depth + 1).join('.'));
}

/** A v4 save text on the first seed, as the game writes one unless a field is bent on purpose. */
function saveText(
  path: string,
  states: Record<string, string> = {},
  visited: readonly string[] = trailOf(path),
  traveller: { coherence?: number; steps?: number } = {},
): string {
  return JSON.stringify({
    version: 4,
    seed: '7F3A-91C2-0B4D-E6A8',
    path,
    states,
    coherence: 100,
    steps: 0,
    visited,
    ...traveller,
  });
}

/** A world entered (on its street), climbed to the universe, and walked down the first child `levels` times. */
function walkedDown(engine: GameEngine, levels: number): GameSnapshot {
  engine.step('new-world');
  let snapshot = engine.step('enter-world');
  for (let level = 0; level < 7; level++) snapshot = engine.step('leave');
  for (let level = 0; level < levels; level++) snapshot = engine.step('enter:0');
  return snapshot;
}

/** Ornate Sanctum (16 floors, 9 doors) on Bright Boulevard: into the lobby, the corridor, and the first door. */
function inTheFirstRoom(engine: GameEngine): GameSnapshot {
  engine.step('new-world');
  engine.step('enter-world');
  engine.step('enter:0');
  engine.step('enter:15');
  engine.step('move:corridor');
  return engine.step('enter:0');
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
  test('entering a new world stands on a street (Guide:41); the universe is seven leaves above', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    const street = engine.step('enter-world');
    expect(street.place?.kind).toBe('Street');
    expect(street.place?.name).toBe('Bright Boulevard');
    expect(street.place?.address).toBe('0.0.0.0.0.0.0.0');
    expect(street.message).toBe('Entered Bright Boulevard.');
    expect(street.options.map((option) => option.id)).toEqual([
      'enter:0',
      'enter:1',
      'enter:2',
      'enter:3',
      'leave',
      'to-title',
    ]);
    const snapshot = walkedDown(engine, 0);
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
      contents: null,
      telemetry: null,
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
      ordinal: '1',
      readings: [],
      opposite: '',
      current: false,
      // The first filament is on the way to the street a new world starts on, so it has been visited (Guide:430).
      visited: true,
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
      ordinal: '',
      readings: [],
      opposite: '',
      current: false,
      visited: false,
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

  test('the buildings of a street are open: tapping one enters it; its floors are listed top first, numbered by floor, with their readings', () => {
    const engine = engineOn(new MemorySaveStore());
    const street = walkedDown(engine, 7);
    const buildings = street.options.filter((option) => option.role === 'travel');
    expect(buildings).toHaveLength(4);
    expect(buildings.every((option) => !option.sealed && option.key !== '')).toBe(true);
    expect(buildings[0]?.label).toBe('Enter Building: Ornate Sanctum');
    expect(buildings[0]?.place).toBe('Ornate Sanctum');
    const building = engine.step('enter:0');
    expect(building.place?.kind).toBe('Building');
    expect(building.message).toBe('Entered Ornate Sanctum.');
    expect(building.place?.facts).toEqual([{ key: 'culture', label: 'THEME', value: 'baroque' }]);
    const floors = building.options.filter((option) => option.role === 'travel');
    expect(floors).toHaveLength(16);
    expect(floors[0]).toEqual({
      id: 'enter:0',
      key: '',
      label: 'Access: Peak',
      place: 'Floor 15',
      role: 'travel',
      sealed: false,
      landmark: false,
      ordinal: '15',
      readings: [
        { key: 'zone', label: 'FUNCTION', value: 'PEAK_OBSERVATORY' },
        { key: 'reading', label: 'ST', value: '100%' },
        { key: 'reading', label: 'RES', value: '1582Hz' },
      ],
      opposite: '',
      current: false,
      visited: false,
    });
    expect(floors.map((option) => option.ordinal)).toEqual(
      Array.from({ length: 16 }, (_, n) => String(15 - n)),
    );
    // A floor's key is its number (Guide:111) — so only floors 0–9 have one; a key never differs from the ordinal.
    expect(floors.map((option) => option.key).join(',')).toBe(',,,,,,9,8,7,6,5,4,3,2,1,0');
    expect(floors.at(-1)?.label).toBe('Access: Lobby');
    expect(floors.at(-1)?.readings[0]?.value).toBe('TRANSIT_LOBBY');
    expect(building.options.filter((option) => option.role === 'move')).toEqual([]);
    // The elevator column's [>X<]: the lobby to begin with, then the floor last arrived at (Building.groovy:189).
    expect(floors.map((option) => option.current).indexOf(true)).toBe(15);
    engine.step('enter:15');
    engine.step('move:up');
    engine.step('move:up');
    const back = engine.step('leave').options.filter((option) => option.role === 'travel');
    expect(back.map((option) => option.current).indexOf(true)).toBe(13);
    expect(back.filter((option) => option.current)).toHaveLength(1);
    expect(engine.step('enter:6').place?.name).toBe('Floor 9');
  });

  test('the elevator: up, down and the corridor are moves with the Guide’s keys; the top and the ground drop one; nothing is listed', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    engine.step('enter:0');
    const lobby = engine.step('enter:15');
    expect(lobby.place?.kind).toBe('Floor');
    expect(lobby.place?.name).toBe('Floor 0');
    expect(lobby.place?.position).toEqual({ label: 'Z-AXIS', index: 1, total: 16 });
    expect(lobby.place?.facts.map((fact) => fact.label)).toEqual([
      'TECH_ERA',
      'RESONANCE',
      'STABILITY',
      'ATMOS_SHIFT',
    ]);
    expect(lobby.options).toEqual([
      move('up', 'u', 'Go Up', 'down'),
      move('corridor', 'c', 'Enter Corridor', 'elevator'),
      { ...system('leave', 'l', 'Leave Floor'), role: 'return' },
      system('to-title', 't', 'Title screen'),
    ]);
    expect(engine.step('move:down').message).toBe(lobby.message);
    const second = engine.step('move:up');
    expect(second.place?.name).toBe('Floor 1');
    expect(second.message).toBe('Entered Floor 1.');
    expect(second.options.filter((option) => option.role === 'move').map((option) => option.id)).toEqual([
      'move:up',
      'move:down',
      'move:corridor',
    ]);
    for (let floor = 1; floor < 15; floor++) engine.step('move:up');
    const peak = engine.snapshot();
    expect(peak.place?.name).toBe('Floor 15');
    expect(peak.options.filter((option) => option.role === 'move').map((option) => option.id)).toEqual([
      'move:down',
      'move:corridor',
    ]);
  });

  test('the corridor: the doors are listed with their inscriptions, back to the elevator is the one move, leave still goes to the building', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    engine.step('enter:0');
    engine.step('enter:15');
    const corridor = engine.step('move:corridor');
    expect(corridor.place?.kind).toBe('Floor');
    expect(corridor.message).toBe('Enter Corridor.');
    expect(corridor.place?.childrenHeading).toBe('Local access list:');
    expect(corridor.place?.status).toBe('TRAFFIC: [STABLE] | THEME: [BAROQUE]');
    const doors = corridor.options.filter((option) => option.role === 'travel');
    expect(doors).toHaveLength(9);
    expect(doors[0]).toEqual({
      id: 'enter:0',
      key: '1',
      label: 'Access: _void_sink_ Brutalist Slab [PITTED]',
      place: '_void_sink_ Brutalist Slab [PITTED]',
      role: 'travel',
      sealed: false,
      landmark: false,
      ordinal: '1',
      readings: [
        {
          key: 'narrative',
          label: 'APPEARANCE',
          value:
            "A massive brutalist slab of pitted concrete. The surface is heavily scarred by micro-impacts and substrate decay. The word 'void_sink' is scrawled across the surface in jagged, desperate lines.",
        },
      ],
      opposite: '',
      current: false,
      visited: false,
    });
    expect(corridor.options.filter((option) => option.role === 'move')).toEqual([
      move('elevator', 'b', 'Back to Elevator', 'corridor'),
    ]);
    expect(corridor.options.find((option) => option.id === 'leave')?.label).toBe('Leave Floor');
    const elevator = engine.step('move:elevator');
    expect(elevator.message).toBe('Back to Elevator.');
    expect(elevator.options.filter((option) => option.role === 'travel')).toEqual([]);
  });

  test('a door drops the traveller into the first room; forward and back walk the rooms; only the first room has the way out, to the corridor', () => {
    const engine = engineOn(new MemorySaveStore());
    const room = inTheFirstRoom(engine);
    expect(room.place?.kind).toBe('Room');
    expect(room.place?.name).toBe('Grand Power Plant');
    expect(room.place?.address).toBe('0.0.0.0.0.0.0.0.0.0.0.0.0');
    expect(room.place?.depth).toBe(12);
    expect(room.place?.position).toEqual({ label: 'CELL', index: 1, total: 2 });
    expect(room.place?.trail.map((step) => step.icon).join('')).toBe('∞»○☼⊕⬚🏙═⌂▤▅🚪□');
    expect(room.place?.trail[11]?.name).toBe('_void_sink_ Brutalist Slab [PITTED]');
    expect(room.place?.description).toHaveLength(2);
    expect(room.place?.facts.map((fact) => fact.label)).toEqual([
      'TYPE',
      'OXY',
      'TEMP',
      'SIGNAL',
      'RESONANCE',
    ]);
    expect(room.message).toBe('Entered Grand Power Plant.');
    // What the room holds rides on the snapshot as plain data: relics by key and name, furniture, and the
    // telemetry every place inside a building shows (five bars of 1–9, drawn on the place's own seed).
    expect(room.place?.contents).toEqual({
      objects: [
        { key: 'with|reliquary box|plasma coil', name: 'plasma coil with reliquary box' },
        { key: 'fused|brass censer|laser cutter', name: 'brass censer fused to laser cutter' },
        { key: 'infused|stone gargoyle|orbital beacon', name: 'stone gargoyle infused with orbital beacon' },
        { key: 'infused|prayer bench|plasma coil', name: 'prayer bench infused with plasma coil' },
      ],
      furniture: ['half-dismantled stained glass shard', 'scorched funeral mask'],
    });
    expect(room.place?.telemetry).toEqual({ spectrogram: [5, 5, 5, 9, 9] });
    expect(engine.snapshot().place?.telemetry).toEqual(room.place?.telemetry);
    expect(room.options).toEqual([
      move('forward', 'f', 'Go forward', 'back'),
      { ...system('leave', 'l', 'Exit Apartment'), role: 'return' },
      system('to-title', 't', 'Title screen'),
    ]);
    const second = engine.step('move:forward');
    expect(second.place?.position?.index).toBe(2);
    expect(second.options.map((option) => option.id)).toEqual(['move:back', 'to-title']);
    expect(engine.step('leave').place?.position?.index).toBe(2);
    engine.step('move:back');
    const floor = engine.step('leave');
    expect(floor.place?.kind).toBe('Floor');
    expect(floor.place?.name).toBe('Floor 0');
    expect(floor.message).toBe('Returned to Floor 0.');
    expect(floor.options.filter((option) => option.role === 'travel')).toHaveLength(9);
    const building = engine.step('leave');
    expect(building.place?.kind).toBe('Building');
    expect(engine.step('enter:15').options.filter((option) => option.role === 'travel')).toEqual([]);
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
      // Walk the widest branch on offer, then come back up when the street is reached (a building's floors go by number).
      engine.step(snapshot.place?.kind === 'Street' ? 'leave' : `enter:${String(open.length - 1)}`);
    }
  });

  test('the letters children get are the alphabet minus every key a command claims (e l n r t, and the moves’ u d c b f)', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    for (let level = 0; level < 7; level++) engine.step('leave');
    // Steamspire (seed 7F3A-…): fifteen streets — nine digits, then the first six free letters.
    for (const index of [0, 0, 0, 0, 2, 0]) engine.step(`enter:${String(index)}`);
    const city = engine.snapshot();
    expect(city.place?.name).toBe('Steamspire');
    expect(
      city.options
        .filter((option) => option.role === 'travel')
        .map((option) => option.key)
        .join(''),
    ).toBe('123456789aghijk');
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

  test('a room is saved with its floor’s corridor mode: after a reload the way out still opens on the door list', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    const played = inTheFirstRoom(engine);
    expect(saves.load()).toContain('"states":{"0.0.0.0.0.0.0.0.0.0":"corridor"}');
    const again = engineOn(saves);
    expect(again.snapshot().place).toEqual(played.place);
    expect(again.snapshot().options).toEqual(played.options);
    const floor = again.step('leave');
    expect(floor.options).toEqual(engine.step('leave').options);
    expect(floor.options.filter((option) => option.role === 'travel')).toHaveLength(9);
    // …and the floor left from the corridor is at the elevator again after a reload, as it is without one.
    again.step('leave');
    engine.step('leave');
    expect(saves.load()).toContain('"states":{}');
    expect(engineOn(saves).step('enter:15').options).toEqual(engine.step('enter:15').options);
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
    expect(engine.step('enter-world').place?.address).toBe('0.0.0.0.0.0.0.0');
  });

  test('a corrupt save, or a path that leads nowhere, is a fresh game — not a crash, not half a world', () => {
    for (const text of [
      '{"version":4,"seed":',
      '{"version":2,"seed":"7F3A-91C2-0B4D-E6A8","path":"0.0"}',
      '{"version":3,"seed":"7F3A-91C2-0B4D-E6A8","path":"0.0.0.0.0.0.0.0","states":{}}',
      saveText('0.99'),
      saveText('0.0.0.0.0.0.0.0.999'),
      saveText('0.0.0.0.0.0.0.0.0.0.0'),
      saveText('0.0.0.0.0.0.0.0.0.0', { '0.0.0.0.0.0.0.0.0.0': 'lift' }),
      saveText('0.0.0.0.0.0.0.0.0.0.0.0.0'),
      saveText('0.0.0.0.0.0.0.0', { '0.0.0.0.0.0.0.0.0.3': 'corridor' }),
      saveText('0.0.0.0.0.0.0.0', {}, ['0']),
      saveText('0.0.0.0.0.0.0.0', {}, undefined, { coherence: 101 }),
      saveText('0.0.0.0.0.0.0.0', {}, undefined, { steps: -1 }),
    ]) {
      const snapshot = engineOn(new MemorySaveStore(text)).snapshot();
      expect(snapshot.world, text).toBeNull();
      expect(snapshot.place, text).toBeNull();
      expect(snapshot.message, text).toBe('');
      expect(ids(snapshot), text).toEqual(['new-world']);
    }
  });
});

describe('GameEngine — the turn: every prompt in the world costs coherence before the command runs (Guide:133-147)', () => {
  test("a new world stands on its street with 100 coherence and no steps; the title's own commands cost nothing", () => {
    const engine = engineOn(new MemorySaveStore());
    expect(engine.step('new-world').player).toBeNull();
    const street = engine.step('enter-world');
    expect(street.player).toEqual({ coherence: 100, band: 'stable', steps: 0 });
  });

  test('a move costs one and counts one; the drain runs before the command, so the place moved into is the one shown at the new value', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    const building = engine.step('enter:0');
    expect(building.place?.kind).toBe('Building');
    expect(building.player).toEqual({ coherence: 99, band: 'stable', steps: 1 });
    const lobby = engine.step('enter:15');
    expect(lobby.player).toEqual({ coherence: 98, band: 'stable', steps: 2 });
    const corridor = engine.step('move:corridor');
    expect(corridor.player).toEqual({ coherence: 97, band: 'stable', steps: 3 });
    const floor = engine.step('leave');
    expect(floor.place?.kind).toBe('Building');
    expect(floor.player).toEqual({ coherence: 96, band: 'stable', steps: 4 });
  });

  test('the title screen is a global command: it costs one and counts no step; continuing is free; a stale tap costs nothing', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    engine.step('enter:0');
    const title = engine.step('to-title');
    expect(title.player).toBeNull();
    const back = engine.step('enter-world');
    expect(back.player).toEqual({ coherence: 98, band: 'stable', steps: 1 });
    expect(engine.step('open-pod-bay-doors').player).toEqual({ coherence: 98, band: 'stable', steps: 1 });
    expect(engine.step('move:up').player).toEqual({ coherence: 98, band: 'stable', steps: 1 });
  });

  test("the drain follows the street's era: two per prompt where it is entropic (Guide:137, 304-305), on every screen below it", () => {
    // Seed 0000-0005-0000-0023: the street a new world starts on, Bright Road, is entropic.
    const engine = new GameEngine({
      world: realRegistry(),
      entropy: new FixedEntropySource([new Seed(5, 0x23)]),
      saves: new MemorySaveStore(),
    });
    engine.step('new-world');
    const street = engine.step('enter-world');
    expect(street.place?.facts.find((fact) => fact.key === 'era')?.value).toBe('entropic');
    expect(engine.step('enter:0').player?.coherence).toBe(98);
    const floors = engine.snapshot().options.filter((option) => option.role === 'travel');
    expect(engine.step(must(floors.at(-1)).id).player?.coherence).toBe(96);
    expect(engine.step('move:corridor').player?.coherence).toBe(94);
    expect(engine.step('enter:0').place?.kind).toBe('Room');
    expect(engine.snapshot().player?.coherence).toBe(92);
    // …and one per prompt on a street whose era is not.
    engine.step('leave');
    engine.step('leave');
    engine.step('leave');
    engine.step('leave');
    expect(engine.snapshot().place?.kind).toBe('City');
    expect(engine.snapshot().player?.coherence).toBe(84);
  });

  test('the bands ride on the snapshot at the exact edges, and the description corrupts under 40 — seeded on the place and the step, so the same screen reads the same', () => {
    const engine = engineOn(new MemorySaveStore(), true);
    const room = inTheFirstRoom(engine);
    const clean = room.place?.description ?? [];
    expect(engine.step('debug:integrity:70').player?.band).toBe('stable');
    expect(engine.step('debug:integrity:69').player?.band).toBe('degraded');
    expect(engine.step('debug:integrity:30').player?.band).toBe('degraded');
    expect(engine.step('debug:integrity:29').player?.band).toBe('critical');
    expect(engine.step('debug:integrity:40').place?.description).toEqual(clean);
    const corrupt = engine.step('debug:integrity:39').place?.description ?? [];
    expect(corrupt).toHaveLength(clean.length);
    expect(corrupt).not.toEqual(clean);
    expect(corrupt.map((line) => line.length)).toEqual(clean.map((line) => line.length));
    expect(engine.snapshot().place?.description).toEqual(corrupt);
    // The debug tool costs nothing and counts nothing (Decision 8: a tool, not a prompt).
    expect(engine.snapshot().player?.steps).toBe(room.player?.steps);
  });

  test('the debug INTEGRITY exists only in debug mode', () => {
    const plain = engineOn(new MemorySaveStore());
    inTheFirstRoom(plain);
    expect(plain.snapshot().options.filter((option) => option.role === 'debug')).toEqual([]);
    expect(plain.step('debug:integrity:1').player?.coherence).toBe(96);
    const debug = engineOn(new MemorySaveStore(), true);
    inTheFirstRoom(debug);
    expect(
      debug
        .snapshot()
        .options.filter((option) => option.role === 'debug')
        .map((o) => o.id),
    ).toEqual([
      'debug:integrity:100',
      'debug:integrity:70',
      'debug:integrity:69',
      'debug:integrity:40',
      'debug:integrity:39',
      'debug:integrity:30',
      'debug:integrity:29',
      'debug:integrity:1',
    ]);
  });

  test('the telemetry is drawn on the place and the step count: the same place reads differently after a move, the same again on a reload', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves, true);
    const room = inTheFirstRoom(engine);
    expect(room.place?.telemetry).toEqual({ spectrogram: [5, 5, 5, 9, 9] });
    engine.step('move:forward');
    const back = engine.step('move:back');
    expect(back.place?.address).toBe(room.place?.address);
    expect(back.place?.telemetry).not.toEqual(room.place?.telemetry);
    expect(engineOn(saves, true).snapshot().place?.telemetry).toEqual(back.place?.telemetry);
    // A debug tool changes nothing of the frame.
    expect(engine.step('debug:integrity:100').place?.telemetry).toEqual(back.place?.telemetry);
  });

  test("zero coherence: the tap that drains the last point does not run; the world reboots — the same seed, the starting street, 100 coherence; steps and visited places kept, the world's own state undone (Guide:144-147)", () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves, true);
    const room = inTheFirstRoom(engine);
    engine.step('debug:integrity:1');
    const dead = engine.step('move:forward');
    expect(dead.place?.address).toBe(room.place?.address);
    expect(dead.player).toEqual({ coherence: 0, band: 'critical', steps: 4 });
    expect(dead.prompt).toEqual({ id: 'reboot', outcome: 'rebooting', figures: {} });
    expect(dead.options).toEqual([system('reboot', '', 'Rebuild')]);
    expect(dead.message).toBe('');
    // Nothing else is heard while the link is down.
    expect(engine.step('move:forward').prompt?.id).toBe('reboot');
    expect(engine.step('leave').prompt?.id).toBe('reboot');
    // A reload finds the link still down.
    expect(engineOn(saves, true).snapshot().prompt?.id).toBe('reboot');
    const reborn = engine.step('reboot');
    expect(reborn.prompt).toBeNull();
    expect(reborn.place?.kind).toBe('Street');
    expect(reborn.place?.address).toBe('0.0.0.0.0.0.0.0');
    expect(reborn.world?.seed).toBe('7F3A-91C2-0B4D-E6A8');
    expect(reborn.player).toEqual({ coherence: 100, band: 'stable', steps: 4 });
    expect(reborn.message).toBe('Substrate rebuilt. Coherence 100.');
    // Visited places are kept: the building and its lobby are marked; the world's own state is undone: the lobby is at its elevator again.
    const buildings = reborn.options.filter((option) => option.role === 'travel');
    expect(buildings.map((option) => option.visited)).toEqual([true, false, false, false]);
    expect(saves.load()).toContain('"states":{}');
    const building = engine.step('enter:0');
    expect(
      building.options
        .filter((option) => option.role === 'travel')
        .map((o) => o.visited)
        .indexOf(true),
    ).toBe(15);
    expect(engine.step('enter:15').options.filter((option) => option.role === 'travel')).toEqual([]);
  });

  test('visited marks: a place is marked once entered, and every ancestor on the way (Guide:430); the marks survive a reload', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    engine.step('new-world');
    engine.step('enter-world');
    expect(
      engine
        .snapshot()
        .options.filter((o) => o.role === 'travel')
        .map((o) => o.visited),
    ).toEqual([false, false, false, false]);
    engine.step('enter:0');
    engine.step('enter:15');
    engine.step('move:corridor');
    engine.step('enter:2');
    engine.step('leave');
    const corridor = engine.snapshot();
    expect(corridor.options.filter((o) => o.role === 'travel').map((o) => o.visited)).toEqual(
      corridor.options.filter((o) => o.role === 'travel').map((_, i) => i === 2),
    );
    engine.step('leave');
    expect(
      engine
        .snapshot()
        .options.filter((o) => o.role === 'travel')
        .map((o) => o.visited)
        .filter(Boolean),
    ).toHaveLength(1);
    engine.step('leave');
    const street = engine.snapshot();
    expect(street.options.filter((o) => o.role === 'travel').map((o) => o.visited)).toEqual([
      true,
      false,
      false,
      false,
    ]);
    expect(engineOn(saves).snapshot().options).toEqual(street.options);
    for (let level = 0; level < 7; level++) engine.step('leave');
    const filaments = engine
      .snapshot()
      .options.filter((o) => o.role === 'travel')
      .map((o) => o.visited);
    expect(filaments.length).toBeGreaterThanOrEqual(3);
    expect(filaments).toEqual(filaments.map((_, i) => i === 0));
  });
});
