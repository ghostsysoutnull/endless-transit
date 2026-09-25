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
/** Grand Power Plant: the first room behind the lobby's first door of Ornate Sanctum. */
const FIRST_ROOM = '0.0.0.0.0.0.0.0.0.0.0.0.0';

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

/** A v6 save text on the first seed, as the game writes one unless a field is bent on purpose. */
function saveText(
  path: string,
  states: Record<string, string> = {},
  visited: readonly string[] = trailOf(path),
  traveller: { coherence?: number; steps?: number; buffer?: readonly unknown[]; resonant?: number } = {},
): string {
  return JSON.stringify({
    version: 6,
    seed: '7F3A-91C2-0B4D-E6A8',
    path,
    states,
    coherence: 100,
    steps: 0,
    visited,
    buffer: [],
    resonant: 0,
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
      'scan',
      'map',
      'buffer',
      'trace',
      'help',
      'to-title',
      'recap',
    ]);
    const snapshot = walkedDown(engine, 0);
    expect(snapshot.place).toEqual({
      kind: 'Universe',
      icon: '∞',
      name: 'The Endless Universe',
      address: '0',
      position: null,
      trail: [{ icon: '∞', kind: 'Universe', name: 'The Endless Universe' }],
      status: 'UNIMATRIX_STABLE',
      description: ['A neural web of infinite complexity.'],
      facts: [],
      frame: null,
      abyssal: false,
      childrenHeading: 'Primary filaments radiating from root:',
      contents: null,
      telemetry: null,
      lattice: {
        width: 30,
        height: 15,
        origin: { name: 'The Endless Universe', glyph: '∞' },
        frame: null,
        abyssal: false,
        nodes: [
          { x: 5, y: 1, glyph: '»', name: 'Zeta-915-Link', visited: true, noise: false },
          { x: 18, y: 10, glyph: '»', name: 'Delta-901-Strand', visited: false, noise: false },
          { x: 16, y: 12, glyph: '»', name: 'Iota-678-Thread', visited: false, noise: false },
          { x: 10, y: 13, glyph: '»', name: 'Mu-655-Sync', visited: false, noise: false },
          { x: 21, y: 10, glyph: '»', name: 'Gamma-486-Link', visited: false, noise: false },
          { x: 4, y: 0, glyph: '»', name: 'Kappa-957-Pulse', visited: false, noise: false },
        ],
        marks: [],
      },
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
    expect(snapshot.options.slice(-7)).toEqual([
      system('scan', 's', 'Scan'),
      system('map', 'm', 'Map'),
      system('buffer', 'i', 'Buffer'),
      system('trace', '', 'Trace'),
      system('help', 'h', 'Help'),
      system('to-title', 't', 'Title screen'),
      system('recap', 'q', 'End session'),
    ]);
  });

  test('tapping a child goes down one level; the trail, the position and the way back follow', () => {
    const engine = engineOn(new MemorySaveStore());
    const snapshot = walkedDown(engine, 1);
    const place = must(snapshot.place ?? undefined, 'a place');
    expect(place.kind).toBe('Cosmic filament');
    expect(place.name).toBe('Zeta-915-Link');
    expect(place.address).toBe('0.0');
    expect(place.trail).toHaveLength(2);
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
      system('scan', 's', 'Scan'),
      system('map', 'm', 'Map'),
      system('buffer', 'i', 'Buffer'),
      system('trace', '', 'Trace'),
      system('help', 'h', 'Help'),
      system('to-title', 't', 'Title screen'),
      system('recap', 'q', 'End session'),
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
    expect(room.place?.trail).toHaveLength(13);
    expect(room.place?.position).toEqual({ label: 'CELL', index: 1, total: 2 });
    expect(room.place?.trail.map((step) => step.icon).join('')).toBe('∞»○☼⊕⬚🏙═⌂▤▅🚪□');
    expect(room.place?.trail[11]?.name).toBe('_void_sink_ Brutalist Slab [PITTED]');
    expect(room.place?.description).toHaveLength(2);
    expect(room.place?.facts.map((fact) => fact.label)).toEqual([
      'TEMPORAL_MARKER',
      'TYPE',
      'OXY',
      'TEMP',
      'SIGNAL',
      'RESONANCE',
    ]);
    // The free lottery rolled on the move that landed here (Guide:187): step 4 of this walk wins (Void.test pins the roll).
    expect(room.message).toBe(
      'Entered Grand Power Plant. SPECTRAL_DEVIATION: Extracted Frequency 1243085 Hz.',
    );
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
    expect(room.place?.telemetry).toEqual({ spectrogram: [5, 5, 5, 9, 9], voice: null });
    expect(engine.snapshot().place?.telemetry).toEqual(room.place?.telemetry);
    expect(room.options.filter((option) => option.role !== 'take')).toEqual([
      move('forward', 'f', 'Go forward', 'back'),
      { ...system('leave', 'l', 'Exit Apartment'), role: 'return' },
      system('scan', 's', 'Scan'),
      system('map', 'm', 'Map'),
      system('buffer', 'i', 'Buffer'),
      system('trace', '', 'Trace'),
      system('help', 'h', 'Help'),
      system('to-title', 't', 'Title screen'),
      system('recap', 'q', 'End session'),
    ]);
    const second = engine.step('move:forward');
    expect(second.place?.position?.index).toBe(2);
    expect(second.options.filter((option) => option.role !== 'take').map((option) => option.id)).toEqual([
      'move:back',
      'scan',
      'map',
      'buffer',
      'trace',
      'help',
      'to-title',
      'recap',
    ]);
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

  test('the letters children get are the alphabet minus every key a command claims (e i l n q r s t, the breach’s j, the map’s m, the help’s h, and the moves’ u d c b f)', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    for (let level = 0; level < 7; level++) engine.step('leave');
    // Steamspire (seed 7F3A-…): fifteen streets — nine digits, then the first six free letters (i is the buffer's, m the map's, h the help's).
    for (const index of [0, 0, 0, 0, 2, 0]) engine.step(`enter:${String(index)}`);
    const city = engine.snapshot();
    expect(city.place?.name).toBe('Steamspire');
    expect(
      city.options
        .filter((option) => option.role === 'travel')
        .map((option) => option.key)
        .join(''),
    ).toBe('123456789agkopw');
  });

  test('HELP (Guide:96) is a global command after TRACE, keyed h: it costs one and no step, opens the help prompt whose one answer — the way back — is free and lands where the traveller stood (I09)', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    const street = walkedDown(engine, 7);
    expect(street.options.map((option) => option.id).slice(-7)).toEqual([
      'scan',
      'map',
      'buffer',
      'trace',
      'help',
      'to-title',
      'recap',
    ]);
    expect(street.options.find((option) => option.id === 'help')).toEqual(system('help', 'h', 'Help'));
    const open = engine.step('help');
    expect(open.prompt).toEqual({ id: 'help', outcome: '', figures: {} });
    expect(open.player).toEqual({ coherence: 85, band: 'stable', steps: 14 });
    expect(open.place?.name).toBe('Bright Boulevard');
    expect(open.options).toEqual([{ ...system('close', 'b', 'Back to the world'), role: 'return' }]);
    expect(open.message).toBe('');
    // Nothing else is heard while it is open; the way back costs nothing.
    expect(engine.step('scan').prompt?.id).toBe('help');
    const back = engine.step('close');
    expect(back.prompt).toBeNull();
    expect(back.player).toEqual({ coherence: 85, band: 'stable', steps: 14 });
    expect(back.place?.name).toBe('Bright Boulevard');
    expect(back.scan).toBeNull();
    // A reload lands in the world: the prompt is not saved.
    engine.step('help');
    const reloaded = engineOn(saves).snapshot();
    expect(reloaded.prompt).toBeNull();
    expect(reloaded.place?.name).toBe('Bright Boulevard');
  });

  test('the visited mark’s letter is claimed like a command’s: no child is keyed v, so a row never reads [V] … [V]', () => {
    const engine = new GameEngine({
      world: realRegistry(),
      entropy: new FixedEntropySource([new Seed(0, 0)]),
      saves: new MemorySaveStore(),
    });
    engine.step('new-world');
    // Broad Alley (seed 0000-…): twenty buildings — the twentieth once read `20 [V] Enter Building: CellFall`.
    const street = engine.step('enter-world');
    expect(street.place?.name).toBe('Broad Alley');
    expect(
      street.options
        .filter((option) => option.role === 'travel')
        .map((option) => option.key)
        .join(''),
    ).toBe('123456789agkopwxyz');
  });

  test('a door once entered is marked visited on the corridor list, the others not, and a reload keeps the mark (Decision 7: the old Door.visited was never set, HK-021)', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    inTheFirstRoom(engine);
    const corridor = engine.step('leave');
    expect(corridor.place?.kind).toBe('Floor');
    const doors = corridor.options.filter((option) => option.role === 'travel');
    expect(doors).toHaveLength(9);
    expect(doors.map((door) => door.visited)).toEqual([
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    const reloaded = engineOn(saves).snapshot();
    expect(reloaded.options.filter((option) => option.role === 'travel').map((door) => door.visited)).toEqual(
      [true, false, false, false, false, false, false, false, false],
    );
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
    // The lottery's prize sampled the lobby for the ritual: the building remembers it, then the floor its mode.
    expect(saves.load()).toContain(
      '"states":{"0.0.0.0.0.0.0.0.0":"{\\"sampled\\":[0]}","0.0.0.0.0.0.0.0.0.0":"corridor"}',
    );
    const again = engineOn(saves);
    expect(again.snapshot().place).toEqual(played.place);
    expect(again.snapshot().options).toEqual(played.options);
    const floor = again.step('leave');
    expect(floor.options).toEqual(engine.step('leave').options);
    expect(floor.options.filter((option) => option.role === 'travel')).toHaveLength(9);
    // …and the floor left from the corridor is at the elevator again after a reload, as it is without one.
    again.step('leave');
    engine.step('leave');
    // Off the trail, the building still remembers the sampled lobby (every visited place remembers, I05).
    expect(saves.load()).toContain('"states":{"0.0.0.0.0.0.0.0.0":"{\\"sampled\\":[0]}"}');
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
      '{"version":5,"seed":',
      '{"version":2,"seed":"7F3A-91C2-0B4D-E6A8","path":"0.0"}',
      '{"version":3,"seed":"7F3A-91C2-0B4D-E6A8","path":"0.0.0.0.0.0.0.0","states":{}}',
      '{"version":4,"seed":"7F3A-91C2-0B4D-E6A8","path":"0.0.0.0.0.0.0.0","states":{},"coherence":100,"steps":0,"visited":["0","0.0","0.0.0","0.0.0.0","0.0.0.0.0","0.0.0.0.0.0","0.0.0.0.0.0.0","0.0.0.0.0.0.0.0"]}',
      saveText('0.99'),
      saveText('0.0.0.0.0.0.0.0.999'),
      saveText('0.0.0.0.0.0.0.0.0.0.0'),
      saveText('0.0.0.0.0.0.0.0.0.0', { '0.0.0.0.0.0.0.0.0.0': 'lift' }),
      saveText('0.0.0.0.0.0.0.0.0.0.0.0.0'),
      saveText('0.0.0.0.0.0.0.0', { '0.0.0.0.0.0.0.0.0.3': 'corridor' }),
      saveText('0.0.0.0.0.0.0.0', {}, ['0']),
      saveText('0.0.0.0.0.0.0.0', {}, undefined, { coherence: 101 }),
      saveText('0.0.0.0.0.0.0.0', {}, undefined, { steps: -1 }),
      saveText('0.0.0.0.0.0.0.0', {}, undefined, {
        buffer: [{ kind: 'relic', from: '0.0.0.0.0.0.0.0.0.0.0.0.0', key: 'culture|nothing' }],
      }),
      saveText('0.0.0.0.0.0.0.0', {}, undefined, { resonant: -1 }),
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
      'debug:prime',
      'debug:keystone',
    ]);
  });

  test('the telemetry is drawn on the place and the step count: the same place reads differently after a move, the same again on a reload', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves, true);
    const room = inTheFirstRoom(engine);
    expect(room.place?.telemetry).toEqual({ spectrogram: [5, 5, 5, 9, 9], voice: null });
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

describe('GameEngine — the recap: the endings of `quit`, by places visited (Guide:422-430, SessionRecap.groovy:14-69)', () => {
  test('END SESSION is a global command on every world screen, keyed q: it costs one and counts no step, and opens the recap as a pending prompt with the figures', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    const street = engine.step('enter-world');
    expect(street.options.find((option) => option.id === 'recap')).toEqual(
      system('recap', 'q', 'End session'),
    );
    engine.step('enter:0');
    const recap = engine.step('recap');
    expect(recap.player).toEqual({ coherence: 98, band: 'stable', steps: 1 });
    expect(recap.place?.kind).toBe('Building');
    expect(recap.prompt).toEqual({
      id: 'recap',
      outcome: 'severed',
      figures: { locus: '0.0.0.0.0.0.0.0.0', steps: '1', places: '9', buffer: '0', resonant: '0' },
    });
    expect(recap.options).toEqual([
      system('resume', 'b', 'Resume'),
      system('end-session', 'q', 'End session'),
    ]);
    // Nothing else is heard while it is open; resuming costs nothing and changes nothing.
    expect(engine.step('enter:15').prompt?.id).toBe('recap');
    const resumed = engine.step('resume');
    expect(resumed.prompt).toBeNull();
    expect(resumed.place).toEqual(recap.place);
    expect(resumed.player).toEqual(recap.player);
    expect(resumed.message).toBe('');
  });

  test('ending the session goes to the title, the place kept: Continue returns to it', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    engine.step('new-world');
    engine.step('enter-world');
    const building = engine.step('enter:0');
    engine.step('recap');
    const title = engine.step('end-session');
    expect(title.place).toBeNull();
    expect(title.prompt).toBeNull();
    expect(ids(title)).toEqual(['enter-world', 'reroll']);
    expect(title.options[0]?.label).toBe('Continue');
    const back = engine.step('enter-world');
    expect(back.place).toEqual(building.place);
    expect(back.player).toEqual({ coherence: 98, band: 'stable', steps: 1 });
    // The recap is not a saved state: a reload after opening it lands in the world.
    engine.step('recap');
    expect(engineOn(saves).snapshot().prompt).toBeNull();
  });

  test('the ending at the exact edge: nineteen places visited is "severed", twenty is "expedition" (Guide:426-430)', () => {
    const engine = engineOn(new MemorySaveStore());
    engine.step('new-world');
    engine.step('enter-world');
    // The street's trail is eight places; each building entered is one more.
    engine.step('enter:0');
    engine.step('leave');
    engine.step('enter:1');
    engine.step('leave');
    engine.step('enter:2');
    engine.step('leave');
    engine.step('enter:3');
    engine.step('leave');
    // 12. Up to the city, and into its other seven streets (eight in all): each street is one more.
    engine.step('leave');
    const streets = engine.snapshot().options.filter((option) => option.role === 'travel');
    expect(streets).toHaveLength(8);
    for (const index of [1, 2, 3, 4, 5, 6, 7]) {
      engine.step(`enter:${String(index)}`);
      engine.step('leave');
    }
    const nineteen = engine.step('recap');
    expect(nineteen.prompt?.figures.places).toBe('19');
    expect(nineteen.prompt?.outcome).toBe('severed');
    engine.step('resume');
    // 20. Up once more: the country was on the trail; its second city is new.
    engine.step('leave');
    engine.step('enter:1');
    const twenty = engine.step('recap');
    expect(twenty.prompt?.figures.places).toBe('20');
    expect(twenty.prompt?.outcome).toBe('expedition');
    expect(twenty.prompt?.figures.steps).toBe(String(twenty.player?.steps ?? -1));
    expect(twenty.prompt?.figures.locus).toBe(twenty.place?.address);
  });

  test('when the tap that opens the recap takes the last point, the link fails instead', () => {
    const engine = engineOn(new MemorySaveStore(), true);
    inTheFirstRoom(engine);
    engine.step('debug:integrity:1');
    expect(engine.step('recap').prompt?.id).toBe('reboot');
  });
});

describe('GameEngine — items: capture, the buffer, synthesis and drop (Guide:118-126, 141-142, 236-248)', () => {
  const take = (index: number, key: string, name: string, sealed = false): GameOption => ({
    ...system(`capture:${String(index)}`, key, `Take ${name}`),
    place: name,
    role: 'take',
    sealed,
    ordinal: String(index + 1),
  });

  test('a room offers one take per object, keyed 1–9 in order; a capture is a step (costs one, counts one), the object leaves the room, the fragment enters the buffer with its frequency, and the status says what was found', () => {
    const engine = engineOn(new MemorySaveStore());
    const room = inTheFirstRoom(engine);
    // The walk's landing won the lottery (Guide:187): one Hidden Frequency, no tally, before any take.
    const prize = {
      key: `hidden(${FIRST_ROOM}@4)`,
      name: 'Hidden Frequency',
      hertz: 1243085,
      resonant: false,
    };
    expect(room.buffer).toEqual({ size: 1, capacity: 16, resonant: 0, fragments: [prize] });
    expect(room.options.filter((option) => option.role === 'take')).toEqual([
      take(0, '1', 'plasma coil with reliquary box'),
      take(1, '2', 'brass censer fused to laser cutter'),
      take(2, '3', 'stone gargoyle infused with orbital beacon'),
      take(3, '4', 'prayer bench infused with plasma coil'),
    ]);
    const taken = engine.step('capture:1');
    expect(taken.message).toBe(
      'Captured brass censer fused to laser cutter. Frequency: 3577 Hz. Harmonic resonance: +10%.',
    );
    expect(taken.player).toEqual({ coherence: 95, band: 'stable', steps: 5 });
    expect(taken.buffer).toEqual({
      size: 2,
      capacity: 16,
      resonant: 1,
      fragments: [
        prize,
        {
          key: 'fused|brass censer|laser cutter',
          name: 'brass censer fused to laser cutter',
          hertz: 3577,
          resonant: true,
        },
      ],
    });
    expect(taken.place?.contents?.objects.map((relic) => relic.name)).toEqual([
      'plasma coil with reliquary box',
      'stone gargoyle infused with orbital beacon',
      'prayer bench infused with plasma coil',
    ]);
    expect(taken.options.filter((option) => option.role === 'take').map((option) => option.key)).toEqual([
      '1',
      '2',
      '3',
    ]);
    // A stale index changes nothing and costs nothing.
    expect(engine.step('capture:3').player?.coherence).toBe(95);
    // Outside a room nothing is offered.
    expect(engine.step('leave').options.filter((option) => option.role === 'take')).toEqual([]);
  });

  test('BUFFER is a global command on every world screen, keyed i: it costs one and counts no step, and opens the buffer as a pending prompt whose answers cost nothing', () => {
    const engine = engineOn(new MemorySaveStore());
    const room = inTheFirstRoom(engine);
    expect(room.options.find((option) => option.id === 'buffer')).toEqual(system('buffer', 'i', 'Buffer'));
    engine.step('capture:0');
    engine.step('capture:0'); // step 6 wins the lottery too: four fragments now
    const opened = engine.step('buffer');
    expect(opened.player).toEqual({ coherence: 93, band: 'stable', steps: 6 });
    expect(opened.prompt).toEqual({ id: 'buffer', outcome: '', figures: { selected: '' } });
    expect(opened.place?.kind).toBe('Room');
    expect(opened.options).toEqual([
      { ...system('pick:0', '1', 'Select'), role: 'pick', ordinal: '1' },
      { ...system('drop:0', '', 'Drop here'), role: 'drop', ordinal: '1' },
      { ...system('pick:1', '2', 'Select'), role: 'pick', ordinal: '2' },
      { ...system('drop:1', '', 'Drop here'), role: 'drop', ordinal: '2' },
      { ...system('pick:2', '3', 'Select'), role: 'pick', ordinal: '3' },
      { ...system('drop:2', '', 'Drop here'), role: 'drop', ordinal: '3' },
      { ...system('pick:3', '4', 'Select'), role: 'pick', ordinal: '4' },
      { ...system('drop:3', '', 'Drop here'), role: 'drop', ordinal: '4' },
      { ...system('close', 'b', 'Back to reality'), role: 'return' },
    ]);
    // Nothing else is heard while it is open.
    expect(engine.step('leave').prompt?.id).toBe('buffer');
    expect(engine.step('capture:0').prompt?.id).toBe('buffer');
    const closed = engine.step('close');
    expect(closed.prompt).toBeNull();
    expect(closed.player).toEqual({ coherence: 93, band: 'stable', steps: 6 });
    expect(closed.message).toBe('');
  });

  test('synthesis: select one, merge with another — the hybrid last in the buffer at the sum, 15 coherence back, the selection cleared; unselect by picking again; a resonant hybrid says so and counts', () => {
    const engine = engineOn(new MemorySaveStore(), true);
    inTheFirstRoom(engine);
    // The walk landed a Hidden Frequency at step 4 and the second take wins another at step 6 (Void.test):
    // the buffer is [hidden, 3194, 3577, hidden]; the relics are picked by their positions.
    engine.step('capture:0'); // 3194
    engine.step('capture:0'); // 3577
    engine.step('debug:integrity:40');
    engine.step('buffer');
    const picked = engine.step('pick:2');
    expect(picked.prompt?.figures).toEqual({ selected: '2' });
    expect(picked.options.filter((option) => option.role === 'pick').map((option) => option.label)).toEqual([
      'Merge',
      'Merge',
      'Unselect',
      'Merge',
    ]);
    expect(engine.step('pick:2').prompt?.figures).toEqual({ selected: '' });
    engine.step('pick:2');
    const merged = engine.step('pick:1');
    expect(merged.message).toBe('Synthesis complete: brass-plasma Hybrid (6771 Hz). Coherence +15.');
    expect(merged.player?.coherence).toBe(54); // 40, one for opening the buffer, fifteen back
    expect(merged.prompt?.figures).toEqual({ selected: '' });
    expect(merged.buffer?.fragments.slice(2)).toEqual([
      {
        key: 'hybrid(fused|brass censer|laser cutter+with|reliquary box|plasma coil)',
        name: 'brass-plasma Hybrid',
        hertz: 6771,
        resonant: false,
      },
    ]);
    expect(merged.options.map((option) => option.id)).toEqual([
      'pick:0',
      'drop:0',
      'pick:1',
      'drop:1',
      'pick:2',
      'drop:2',
      'close',
    ]);
    // Behind the second door: 3300 + 2904 = 6204 = 11 × 564 — resonant.
    engine.step('close');
    engine.step('leave');
    const other = engine.step('enter:1');
    expect(other.options.filter((option) => option.role === 'take')[3]?.place).toBe(
      'reliquary box fused to copper pipe',
    );
    expect(other.options.filter((option) => option.role === 'take')[6]?.place).toBe(
      'marble cherub fused to foundry ladle',
    );
    engine.step('capture:3');
    engine.step('capture:5');
    expect(engine.snapshot().buffer?.fragments.map((fragment) => fragment.hertz)).toEqual([
      1243085, 1415632, 6771, 3300, 2904,
    ]);
    engine.step('buffer');
    engine.step('pick:3');
    const resonant = engine.step('pick:4');
    expect(resonant.message).toBe(
      'Synthesis complete: reliquary-marble Hybrid (6204 Hz). Coherence +15. Resonance detected.',
    );
    expect(resonant.player?.coherence).toBe(64); // 54, leave, enter, two captures, the buffer: 49, fifteen back
    expect(
      resonant.buffer?.fragments.map((fragment) => [fragment.name, fragment.hertz, fragment.resonant]),
    ).toEqual([
      ['Hidden Frequency', 1243085, false],
      ['Hidden Frequency', 1415632, false],
      ['brass-plasma Hybrid', 6771, false],
      ['reliquary-marble Hybrid', 6204, true],
    ]);
    engine.step('close');
    expect(engine.step('recap').prompt?.figures).toEqual({
      locus: '0.0.0.0.0.0.0.0.0.0.0.1.0',
      steps: '10',
      places: '15',
      buffer: '4',
      resonant: '5', // four fresh resonant captures and one resonant merge; the prizes never count
    });
  });

  test('drop lays a fragment down in the room with its frequency: it shows as an object, comes back the same when taken again, and never counts twice (Decision 7, HK-021, HK-023)', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves);
    inTheFirstRoom(engine);
    engine.step('capture:0');
    engine.step('capture:0');
    engine.step('buffer'); // [hidden, 3194, 3577, hidden]: the relics are at 1 and 2
    engine.step('pick:1');
    engine.step('pick:2');
    engine.step('close');
    expect(engine.step('recap').prompt?.figures.resonant).toBe('2');
    engine.step('resume');
    engine.step('move:forward');
    engine.step('buffer');
    const dropped = engine.step('drop:2');
    expect(dropped.message).toBe('Dropped plasma-brass Hybrid here.');
    expect(dropped.buffer?.size).toBe(2);
    expect(dropped.options.map((option) => option.id)).toEqual([
      'pick:0',
      'drop:0',
      'pick:1',
      'drop:1',
      'close',
    ]);
    const room = engine.step('close');
    expect(room.place?.contents?.objects.at(-1)).toEqual({
      key: 'hybrid(with|reliquary box|plasma coil+fused|brass censer|laser cutter)',
      name: 'plasma-brass Hybrid',
    });
    expect(room.options.filter((option) => option.role === 'take').at(-1)).toEqual(
      take(4, '5', 'plasma-brass Hybrid'),
    );
    // A reload finds it lying there.
    expect(engineOn(saves).snapshot().place?.contents?.objects.at(-1)?.name).toBe('plasma-brass Hybrid');
    const back = engine.step('capture:4');
    expect(back.message).toBe('Captured plasma-brass Hybrid. Frequency: 6771 Hz.');
    expect(back.buffer?.fragments.at(-1)?.hertz).toBe(6771);
    expect(engine.step('recap').prompt?.figures.resonant).toBe('2');
    // Outside a room the buffer offers no drop.
    engine.step('resume');
    engine.step('move:back');
    engine.step('leave');
    expect(engine.step('buffer').options.map((option) => option.id)).toEqual([
      'pick:0',
      'pick:1',
      'pick:2',
      'close',
    ]);
  });

  test('a full buffer: the takes are listed sealed and a tap on one changes nothing; a merge makes room', () => {
    const engine = engineOn(new MemorySaveStore());
    inTheFirstRoom(engine);
    let snapshot = engine.snapshot();
    let door = 0;
    for (let taps = 0; (snapshot.buffer?.size ?? 0) < 16; taps++) {
      expect(taps, 'taps to fill the buffer').toBeLessThan(200);
      if (snapshot.place?.kind === 'Floor') {
        door += 1;
        snapshot = engine.step(`enter:${String(door)}`);
      } else if (snapshot.options.some((option) => option.role === 'take')) {
        snapshot = engine.step('capture:0');
      } else {
        snapshot = engine.step(
          snapshot.options.some((option) => option.id === 'leave') ? 'leave' : 'move:back',
        );
      }
    }
    expect(snapshot.buffer?.size).toBe(16);
    if (!snapshot.options.some((option) => option.role === 'take')) snapshot = engine.step('move:forward');
    const takes = snapshot.options.filter((option) => option.role === 'take');
    expect(takes.length).toBeGreaterThan(0);
    expect(takes.every((option) => option.sealed)).toBe(true);
    const coherence = snapshot.player?.coherence;
    expect(engine.step(must(takes[0]).id).player?.coherence).toBe(coherence);
    expect(engine.snapshot().buffer?.size).toBe(16);
    engine.step('buffer');
    engine.step('pick:0');
    engine.step('pick:1');
    const after = engine.step('close');
    expect(after.buffer?.size).toBe(15);
    expect(after.options.filter((option) => option.role === 'take').every((option) => !option.sealed)).toBe(
      true,
    );
  });

  test('the buffer and the tally survive a reboot (Guide:145) and a reload; the buffer prompt itself is not saved — a reload lands in the world', () => {
    const saves = new MemorySaveStore();
    const engine = engineOn(saves, true);
    inTheFirstRoom(engine);
    engine.step('capture:0');
    engine.step('buffer');
    expect(engineOn(saves, true).snapshot().prompt).toBeNull();
    expect(engineOn(saves, true).snapshot().buffer?.size).toBe(2); // the walk's Hidden Frequency and the relic
    engine.step('close');
    engine.step('debug:integrity:1');
    engine.step('move:forward');
    const reborn = engine.step('reboot');
    expect(reborn.buffer?.fragments.map((fragment) => fragment.name)).toEqual([
      'Hidden Frequency',
      'plasma coil with reliquary box',
    ]);
    expect(engine.step('recap').prompt?.figures.resonant).toBe('1');
    // The world's own state is undone: the relic lies in the room again.
    engine.step('resume');
    engine.step('enter:0');
    engine.step('enter:15');
    engine.step('move:corridor');
    expect(engine.step('enter:0').place?.contents?.objects).toHaveLength(4);
  });
});
