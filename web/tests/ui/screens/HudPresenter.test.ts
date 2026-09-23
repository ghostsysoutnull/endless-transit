import { describe, expect, test } from 'vitest';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { Masthead } from '#ui/Masthead.ts';
import { HudPresenter } from '#ui/screens/HudPresenter.ts';

const presenter = new HudPresenter(new Masthead('a1b2c3d'));

function option(facts: Partial<GameOption> & { id: string; label: string }): GameOption {
  return {
    key: '',
    place: '',
    role: 'travel',
    sealed: false,
    landmark: false,
    ordinal: '',
    readings: [],
    opposite: '',
    current: false,
    visited: false,
    ...facts,
  };
}

const PLANET: GameSnapshot = {
  world: { seed: '7F3A-91C2-0B4D-E6A8', name: 'The Endless Universe' },
  place: {
    kind: 'Planet',
    icon: '⊕',
    name: 'Auraea',
    address: '0.0.0.0.1',
    hash: '43.210 / 07.654',
    depth: 4,
    position: { label: 'ORBIT', index: 2, total: 5 },
    trail: [
      { icon: '∞', kind: 'Universe', name: 'The Endless Universe' },
      { icon: '»', kind: 'Cosmic filament', name: 'Zeta-915-Link' },
      { icon: '○', kind: 'Galactic sector', name: 'Outer Expanse 91' },
      { icon: '☼', kind: 'Solar system', name: 'Zeta Borealis' },
      { icon: '⊕', kind: 'Planet', name: 'Auraea' },
    ],
    status: 'RESONANCE: [BAROQUE]',
    description: ['A world on the surface layer of the lattice, tuned to one culture and one era.'],
    facts: [
      { key: 'culture', label: 'RESONANCE', value: 'baroque' },
      { key: 'era', label: 'TIMELINE', value: 'future' },
    ],
    frame: 'yellow',
    childrenHeading: 'Planetary landmasses scanned:',
    contents: null,
    telemetry: null,
  },
  options: [
    option({
      id: 'enter:0',
      key: '1',
      label: 'Visit Southern Glacier Kingdom',
      place: 'Southern Glacier Kingdom',
      ordinal: '1',
    }),
    option({
      id: 'enter:1',
      key: '2',
      label: 'Visit Free Dust Union',
      place: 'Free Dust Union',
      ordinal: '2',
    }),
    option({ id: 'leave', key: 'l', label: 'Leave Planet', role: 'return' }),
    option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
  ],
  player: { coherence: 87, band: 'stable', steps: 12 },
  buffer: { size: 0, capacity: 16, resonant: 0, fragments: [] },
  prompt: null,
  message: 'Entered Auraea.',
};

const STREET: GameSnapshot = {
  ...PLANET,
  place: {
    ...(PLANET.place ?? ({} as never)),
    kind: 'Street',
    name: 'Bright Boulevard',
    address: '0.0.0.0.1.0.0.0',
    hash: '1.000 / 2.000',
  },
  options: [
    option({
      id: 'enter:0',
      label: 'Enter Building: Ornate Sanctum',
      place: 'Ornate Sanctum',
      sealed: true,
      ordinal: '1',
    }),
    option({
      id: 'enter:1',
      label: 'Enter Building: The Void-Watcher',
      place: 'The Void-Watcher',
      sealed: true,
      landmark: true,
      ordinal: '2',
    }),
    option({ id: 'leave', key: 'l', label: 'Leave Street', role: 'return' }),
    option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
  ],
};

/** The lobby of a building, in the corridor: doors listed, one move back, the way out to the building. */
const FLOOR: GameSnapshot = {
  ...PLANET,
  place: {
    ...(PLANET.place ?? ({} as never)),
    kind: 'Floor',
    icon: '▤',
    name: 'Floor 0',
    address: '0.0.0.0.1.0.0.0.0.0',
    position: { label: 'Z-AXIS', index: 1, total: 16 },
    childrenHeading: 'Local access list:',
  },
  options: [
    option({
      id: 'enter:0',
      key: '1',
      label: 'Access: [DATA_VAULT] Heavy Bulkhead [COLD]',
      place: '[DATA_VAULT] Heavy Bulkhead [COLD]',
      ordinal: '1',
    }),
    option({
      id: 'move:elevator',
      key: 'b',
      label: 'Back to Elevator',
      role: 'move',
      opposite: 'move:corridor',
    }),
    option({ id: 'leave', key: 'l', label: 'Leave Floor', role: 'return' }),
    option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
  ],
  message: 'Enter Corridor.',
};

/** A building: floors listed top first, numbered by floor, with their readings. */
const BUILDING: GameSnapshot = {
  ...PLANET,
  place: { ...(PLANET.place ?? ({} as never)), kind: 'Building', name: 'Ornate Sanctum' },
  options: [
    option({
      id: 'enter:0',
      key: '',
      label: 'Access: Peak',
      place: 'Floor 15',
      ordinal: '15',
      readings: [
        { key: 'zone', label: 'FUNCTION', value: 'PEAK_OBSERVATORY' },
        { key: 'reading', label: 'ST', value: '100%' },
        { key: 'reading', label: 'RES', value: '1582Hz' },
      ],
    }),
    option({
      id: 'enter:15',
      key: '0',
      label: 'Access: Lobby',
      place: 'Floor 0',
      ordinal: '0',
      readings: [],
      current: true,
    }),
    option({ id: 'leave', key: 'l', label: 'Leave Building', role: 'return' }),
  ],
};

/** A room: its objects and furniture, and the telemetry every place inside a building shows. */
const ROOM: GameSnapshot = {
  ...PLANET,
  place: {
    ...(PLANET.place ?? ({} as never)),
    kind: 'Room',
    icon: '□',
    name: 'Grand Power Plant',
    address: '0.0.0.0.1.0.0.0.0.0.0.0.0',
    depth: 12,
    position: { label: 'CELL', index: 1, total: 2 },
    facts: [
      { key: 'reading', label: 'TYPE', value: 'Power Plant' },
      { key: 'stable', label: 'RESONANCE', value: '[STABLE]' },
    ],
    contents: {
      objects: [
        { key: 'with|tatami mat|floppy disk', name: 'floppy disk with tatami mat' },
        { key: 'culture|katana rack', name: 'katana rack' },
      ],
      furniture: ['overturned tatami mat', 'cracked shoji screen'],
    },
    telemetry: { spectrogram: [3, 1, 9, 4, 2] },
    childrenHeading: '',
  },
  buffer: {
    size: 1,
    capacity: 16,
    resonant: 2,
    fragments: [{ key: 'culture|tatami mat', name: 'tatami mat', hertz: 1188, resonant: true }],
  },
  options: [
    option({
      id: 'capture:0',
      key: '1',
      label: 'Take floppy disk with tatami mat',
      place: 'floppy disk with tatami mat',
      role: 'take',
      ordinal: '1',
    }),
    option({
      id: 'capture:1',
      key: '2',
      label: 'Take katana rack',
      place: 'katana rack',
      role: 'take',
      ordinal: '2',
    }),
    option({ id: 'move:forward', key: 'f', label: 'Go forward', role: 'move', opposite: 'move:back' }),
    option({ id: 'leave', key: 'l', label: 'Exit Apartment', role: 'return' }),
    option({ id: 'buffer', key: 'i', label: 'Buffer', role: 'system' }),
    option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
  ],
  message: 'Entered Grand Power Plant.',
};

describe('HudPresenter — which snapshots it takes', () => {
  test('it presents a place; the title screen (no place) is not its business', () => {
    expect(presenter.accepts(PLANET)).toBe(true);
    expect(presenter.accepts({ ...PLANET, place: null })).toBe(false);
    // A pending prompt is another screen's business.
    expect(
      presenter.accepts({ ...PLANET, prompt: { id: 'reboot', outcome: 'rebooting', figures: {} } }),
    ).toBe(false);
    expect(() => presenter.toViewModel({ ...PLANET, place: null })).toThrow(/place/);
  });
});

describe('HudPresenter.toViewModel — the header: what, which, where', () => {
  const vm = presenter.toViewModel(PLANET);

  test('kind and name, in the terminal’s capitals; the planet colours the frame', () => {
    expect(vm.place.eyebrow).toBe('PLANET');
    expect(vm.place.icon).toBe('⊕');
    expect(vm.place.name).toBe('AURAEA');
    expect(vm.frame).toBe('yellow');
  });

  test('the path the player can read: one crumb per level from the universe, the last one is here', () => {
    expect(vm.crumbs.map((crumb) => crumb.name)).toEqual([
      'The Endless Universe',
      'Zeta-915-Link',
      'Outer Expanse 91',
      'Zeta Borealis',
      'Auraea',
    ]);
    expect(vm.crumbs.map((crumb) => crumb.current)).toEqual([false, false, false, false, true]);
    expect(vm.crumbs.map((crumb) => crumb.icon).join('')).toBe('∞»○☼⊕');
    expect(vm.crumbs[3]?.kind).toBe('Solar system');
  });

  test('the stats line: the steps, depth, position among siblings under the kind’s own label, the locus, its hash, the seed', () => {
    expect(vm.stats).toEqual([
      { label: 'PULSE_TRAVERSAL', value: '12' },
      { label: 'TRACE_BUFFER', value: '00/16' },
      { label: 'HOP_DENSITY', value: '04' },
      { label: 'ORBIT', value: '02/05' },
      { label: 'LOCUS', value: '0.0.0.0.1' },
      { label: 'LOCUS_HASH', value: '43.210 / 07.654' },
      { label: 'SEED', value: '7F3A-91C2-0B4D-E6A8' },
    ]);
  });

  test('the universe has no position among siblings — that stat is simply absent', () => {
    const universe = presenter.toViewModel({
      ...PLANET,
      place: { ...(PLANET.place ?? ({} as never)), position: null, depth: 0, address: '0', frame: null },
    });
    expect(universe.stats.map((stat) => stat.label)).toEqual([
      'PULSE_TRAVERSAL',
      'TRACE_BUFFER',
      'HOP_DENSITY',
      'LOCUS',
      'LOCUS_HASH',
      'SEED',
    ]);
    expect(universe.frame).toBe('default');
  });
});

describe('HudPresenter.toViewModel — the narrative panel', () => {
  const vm = presenter.toViewModel(PLANET);

  test('description paragraphs pass through; facts become tags with their value in capitals; the diagnostic rides along', () => {
    expect(vm.place.description).toEqual(PLANET.place?.description);
    expect(vm.place.tags).toEqual([
      { key: 'culture', label: 'RESONANCE', value: 'BAROQUE' },
      { key: 'era', label: 'TIMELINE', value: 'FUTURE' },
    ]);
    expect(vm.place.diagnostic).toBe('RESONANCE: [BAROQUE]');
    expect(vm.status).toBe('Entered Auraea.');
  });
});

describe('HudPresenter.toViewModel — what a room shows (Room.groovy:278-295; the mock’s console column)', () => {
  const vm = presenter.toViewModel(ROOM);

  test('the panel carries FURNITURE and the object count as rows; the objects are tiles in the aside, each by its key, each a take when the engine offers one; the buffer count rides in the stats', () => {
    expect(vm.place.rows).toEqual([
      { label: 'FURNITURE', value: 'overturned tatami mat, cracked shoji screen' },
      { label: 'OBJECTS_DETECTED', value: '2' },
    ]);
    expect(vm.place.tags[1]).toEqual({ key: 'stable', label: 'RESONANCE', value: '[STABLE]' });
    expect(vm.aside.objects).toEqual({
      label: 'In this room',
      heading: 'IN THIS ROOM',
      empty: '',
      note: '',
      tiles: [
        {
          key: 'with|tatami mat|floppy disk',
          name: 'floppy disk with tatami mat',
          ordinal: '1',
          action: { id: 'capture:0', key: '1', label: 'Take floppy disk with tatami mat', opposite: '' },
        },
        {
          key: 'culture|katana rack',
          name: 'katana rack',
          ordinal: '2',
          action: { id: 'capture:1', key: '2', label: 'Take katana rack', opposite: '' },
        },
      ],
    });
    expect(vm.stats[1]).toEqual({ label: 'TRACE_BUFFER', value: '01/16' });
    expect(vm.options.map((each) => each.id)).toEqual([
      'capture:0',
      'capture:1',
      'move:forward',
      'leave',
      'buffer',
      'to-title',
    ]);
    expect(vm.dock.map((each) => each.label)).toEqual(['▲ EXIT APARTMENT', 'BUFFER', 'TITLE SCREEN']);
  });

  test('a full buffer: the takes come sealed, so the tiles have no action and the pane says why; nothing of it is on offer', () => {
    const full = presenter.toViewModel({
      ...ROOM,
      buffer: { size: 16, capacity: 16, resonant: 0, fragments: [] },
      options: ROOM.options.map((option) =>
        option.role === 'take' ? { ...option, key: '', sealed: true } : option,
      ),
    });
    expect(full.aside.objects?.note).toBe('BUFFER FULL — merge or drop a fragment to take more.');
    expect(full.aside.objects?.tiles.map((tile) => tile.action)).toEqual([null, null]);
    expect(full.options.map((each) => each.id)).toEqual(['move:forward', 'leave', 'buffer', 'to-title']);
    expect(full.stats[1]).toEqual({ label: 'TRACE_BUFFER', value: '16/16' });
  });

  test('an empty room says so in words and has no OBJECTS_DETECTED row (Room.groovy:287); a place that holds nothing (a planet) has no objects pane at all', () => {
    const bare = presenter.toViewModel({
      ...ROOM,
      place: {
        ...(ROOM.place ?? ({} as never)),
        contents: { objects: [], furniture: ['overturned tatami mat', 'cracked shoji screen'] },
      },
      options: ROOM.options.filter((option) => option.role !== 'take'),
    });
    expect(bare.aside.objects).toEqual({
      label: 'In this room',
      heading: 'IN THIS ROOM',
      empty: 'No objects detected.',
      note: '',
      tiles: [],
    });
    expect(bare.place.rows).toEqual([
      { label: 'FURNITURE', value: 'overturned tatami mat, cracked shoji screen' },
    ]);
    const planet = presenter.toViewModel(PLANET);
    expect(planet.aside).toEqual({ objects: null, telemetry: null });
    expect(planet.place.rows).toEqual([]);
  });

  test('inside a building the aside carries the system telemetry: sync, a spectrogram of five bars, the decode log with the trace (TelemetryComponent.groovy:127-143)', () => {
    expect(vm.aside.telemetry).toEqual({
      label: 'System telemetry',
      heading: '[SYSTEM_TELEMETRY]',
      sync: 'LATTICE_SYNC: [NOMINAL]',
      spectrogram: { heading: '[QUANTUM_SPECTROGRAM]', bars: ['███', '█', '█████████', '████', '██'] },
      logs: {
        heading: '[DECODE_LOGS]',
        lines: ['> Trace: 0.0.0.0.1.0.0.0.0.0.0.0.0', '> Resonant traces: 2'],
      },
    });
    expect(vm.regions.aside).toBe('Readouts');
  });
});

describe('HudPresenter.toViewModel — options stay data', () => {
  test('children become numbered rows under the place’s own heading; leave and title go to the dock', () => {
    const vm = presenter.toViewModel(PLANET);
    expect(vm.heading).toBe('PLANETARY LANDMASSES SCANNED');
    expect(vm.rows).toEqual([
      {
        id: 'enter:0',
        key: '1',
        ordinal: '01',
        label: 'Visit Southern Glacier Kingdom',
        sealed: false,
        landmark: false,
        readings: [],
        mark: null,
        seen: null,
      },
      {
        id: 'enter:1',
        key: '2',
        ordinal: '02',
        label: 'Visit Free Dust Union',
        sealed: false,
        landmark: false,
        readings: [],
        mark: null,
        seen: null,
      },
    ]);
    expect(vm.moves).toEqual([]);
    expect(vm.dock).toEqual([
      { id: 'leave', key: 'L', label: '▲ LEAVE PLANET', opposite: '' },
      { id: 'to-title', key: 'T', label: 'TITLE SCREEN', opposite: '' },
    ]);
    expect(vm.sealedNote).toBeNull();
  });

  test('the options the input router may act on are the open ones, rows first — a sealed row is never one of them', () => {
    expect(presenter.toViewModel(PLANET).options.map((each) => each.id)).toEqual([
      'enter:0',
      'enter:1',
      'leave',
      'to-title',
    ]);
    const street = presenter.toViewModel(STREET);
    expect(street.options.map((each) => each.id)).toEqual(['leave', 'to-title']);
    expect(street.rows.map((row) => [row.ordinal, row.sealed, row.landmark])).toEqual([
      ['01', true, false],
      ['02', true, true],
    ]);
    expect(street.rows[1]?.label).toBe('The Void-Watcher');
    expect(street.sealedNote).toMatch(/sealed/i);
    expect(street.sealedTag).toBe('SEALED');
  });

  test('a sealed row shows the place’s name, not the way in — there is no way in yet', () => {
    expect(presenter.toViewModel(STREET).rows[0]?.label).toBe('Ornate Sanctum');
  });

  test('the moves a place offers become a strip of buttons between the panel and the list, in the router’s options before the dock', () => {
    const vm = presenter.toViewModel(FLOOR);
    // The opposite rides along as data: the shell keeps the focus off it when this button vanishes.
    expect(vm.moves).toEqual([
      { id: 'move:elevator', key: 'B', label: 'BACK TO ELEVATOR', opposite: 'move:corridor' },
    ]);
    expect(vm.dock).toEqual([
      { id: 'leave', key: 'L', label: '▲ LEAVE FLOOR', opposite: '' },
      { id: 'to-title', key: 'T', label: 'TITLE SCREEN', opposite: '' },
    ]);
    expect(vm.options.map((each) => each.id)).toEqual(['enter:0', 'move:elevator', 'leave', 'to-title']);
    expect(vm.aside.objects).toBeNull();
    expect(vm.heading).toBe('LOCAL ACCESS LIST');
    expect(vm.rows[0]?.label).toBe('Access: [DATA_VAULT] Heavy Bulkhead [COLD]');
    expect(vm.regions.moves).toBe('Moves');
  });

  test('a row goes by the ordinal the option carries — a floor by its number, two digits — and shows its readings', () => {
    const vm = presenter.toViewModel(BUILDING);
    expect(vm.rows.map((row) => row.ordinal)).toEqual(['15', '00']);
    // The key is the option's, untouched: none for the Peak, the floor number for the lobby.
    expect(vm.rows.map((row) => row.key)).toEqual(['', '0']);
    expect(vm.rows[0]?.readings).toEqual([
      { key: 'zone', label: 'FUNCTION', value: 'PEAK_OBSERVATORY' },
      { key: 'reading', label: 'ST', value: '100%' },
      { key: 'reading', label: 'RES', value: '1582Hz' },
    ]);
    expect(vm.rows[1]?.readings).toEqual([]);
    // The elevator column's current-floor mark rides on the row the option says is current, with words for a reader.
    expect(vm.rows[0]?.mark).toBeNull();
    expect(vm.rows[1]?.mark).toEqual({ text: '[>X<]', label: 'Elevator here' });
  });
});

describe('HudPresenter.toViewModel — the rest', () => {
  test('the scene changes with the place, so the shell knows when to start the page from the top', () => {
    expect(presenter.toViewModel(PLANET).scene).not.toBe(presenter.toViewModel(STREET).scene);
    expect(presenter.toViewModel(PLANET).scene).toBe(
      presenter.toViewModel({ ...PLANET, message: 'x' }).scene,
    );
  });

  test('every word on the screen is carried by the view-model', () => {
    const vm = presenter.toViewModel(PLANET);
    expect(vm.title).toBe('ENDLESS TRANSIT');
    expect(vm.build).toBe('build a1b2c3d');
    expect(vm.regions).toEqual({
      hud: 'Position',
      path: 'Path from the universe',
      place: 'Where you are',
      travel: 'Places to enter',
      moves: 'Moves',
      aside: 'Readouts',
      dock: 'Leave and game',
      debug: 'Debug tools',
    });
  });

  test('the coherence meter: the value, its band from the engine, the words a reader hears (Guide:151-156)', () => {
    expect(presenter.toViewModel(PLANET).meter).toEqual({
      label: 'COHERENCE',
      min: 0,
      max: 100,
      value: 87,
      text: '87%',
      band: 'stable',
      bandLabel: 'stable',
      valueText: '87 percent, stable',
    });
    const low = presenter.toViewModel({ ...PLANET, player: { coherence: 12, band: 'critical', steps: 3 } });
    expect(low.meter.value).toBe(12);
    expect(low.meter.band).toBe('critical');
    expect(low.meter.valueText).toBe('12 percent, critical');
    expect(low.stats[0]).toEqual({ label: 'PULSE_TRAVERSAL', value: '3' });
  });

  test('a visited row carries the [V] mark with words for a reader; an unvisited one none (Corridor.groovy:71-72)', () => {
    const vm = presenter.toViewModel({
      ...PLANET,
      options: [
        option({ id: 'enter:0', label: 'Visit A', place: 'A', ordinal: '1', visited: true }),
        option({ id: 'enter:1', label: 'Visit B', place: 'B', ordinal: '2' }),
      ],
    });
    expect(vm.rows.map((row) => row.seen)).toEqual([{ text: '[V]', label: 'Visited' }, null]);
  });

  test('debug tools are a strip of their own, in the router’s options after the dock; none when there are none', () => {
    const vm = presenter.toViewModel({
      ...PLANET,
      options: [
        ...PLANET.options,
        option({ id: 'debug:integrity:39', label: 'Integrity 39', role: 'debug' }),
      ],
    });
    expect(vm.debug).toEqual([{ id: 'debug:integrity:39', key: '', label: 'INTEGRITY 39', opposite: '' }]);
    expect(vm.options.at(-1)?.id).toBe('debug:integrity:39');
    expect(vm.dock.map((option) => option.id)).toEqual(['leave', 'to-title']);
    expect(presenter.toViewModel(PLANET).debug).toEqual([]);
  });

  test('the view-model is plain data', () => {
    const vm = presenter.toViewModel(STREET);
    expect(JSON.parse(JSON.stringify(vm))).toEqual(vm);
  });
});
