import type { TraceStep } from '#engine/rules/TraceStep.ts';
import { describe, expect, test } from 'vitest';
import { AreaPortrait } from '#engine/model/AreaPortrait.ts';
import { CorridorPortrait } from '#engine/model/CorridorPortrait.ts';
import { NoPortrait } from '#engine/model/NoPortrait.ts';
import { PlanPortrait } from '#engine/model/PlanPortrait.ts';
import { RoomLook } from '#engine/model/RoomLook.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { HudVM } from '#ui/screens/HudVM.ts';
import { hudPresenter } from '#tests/support/hudPresenter.ts';
import { option, PLANET, STREET, towerSnapshot } from '#tests/support/hudSnapshots.ts';
import { playerSummary } from '#tests/support/playerSummary.ts';
import { placeOf } from '#tests/support/snapshotParts.ts';
import { shown } from '#tests/support/shownPanel.ts';

const presenter = hudPresenter('a1b2c3d');

/** The lobby of a building, in the corridor: doors listed, one move back, the way out to the building. */
const FLOOR: GameSnapshot = {
  ...PLANET,
  place: {
    ...placeOf(PLANET),
    kind: 'Floor',
    icon: '▤',
    name: 'Floor 0',
    address: '0.0.0.0.1.0.0.0.0.0',
    position: { counted: true, label: 'Z-AXIS', index: 1, total: 16 },
    childrenHeading: 'Local access list',
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
  scan: null,
  map: null,
  trace: null,
};

/** A building: floors listed top first, numbered by floor, with their readings. */
const BUILDING: GameSnapshot = {
  ...PLANET,
  place: { ...placeOf(PLANET), kind: 'Building', name: 'Ornate Sanctum' },
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
    ...placeOf(PLANET),
    kind: 'Room',
    icon: '□',
    name: 'Grand Power Plant',
    address: '0.0.0.0.1.0.0.0.0.0.0.0.0',
    position: { counted: true, label: 'CELL', index: 1, total: 2 },
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
    telemetry: { spectrogram: [3, 1, 9, 4, 2], peaks: [], glitched: false, voice: null },
    lattice: null,
    childrenHeading: '',
  },
  buffer: {
    size: 1,
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
    option({ id: 'leave', key: 'l', label: 'Leave the apartment', role: 'return' }),
    option({ id: 'buffer', key: 'i', label: 'Buffer', role: 'system' }),
    option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
  ],
  message: 'Entered Grand Power Plant.',
  scan: null,
  map: null,
  trace: null,
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

  test('the kind in capitals, the name as the world spells it (U01a); the planet colours the frame', () => {
    expect(vm.place.eyebrow).toBe('PLANET');
    expect(vm.place.icon).toBe('⊕');
    expect(vm.place.name).toBe('Auraea');
    expect(vm.frame).toBe('yellow');
  });

  test('the depth rail: one level per step from the universe, the last one is here, each with its glyph and its kind for a reader', () => {
    expect(vm.rail.map((level) => level.name)).toEqual([
      'The Endless Universe',
      'Zeta-915-Link',
      'Outer Expanse 91',
      'Zeta Borealis',
      'Auraea',
    ]);
    expect(vm.rail.map((level) => level.current)).toEqual([false, false, false, false, true]);
    expect(vm.rail.map((level) => level.icon).join('')).toBe('∞»○☼⊕');
    expect(vm.rail[3]?.kind).toBe('Solar system');
    // Each level keeps its address: the screen after this one finds by it the place it zooms out of.
    expect(vm.rail.map((level) => level.address)).toEqual(['0', '0.0', '0.0.0', '0.0.0.0', '0.0.0.0.1']);
  });

  test('the readouts in plain words (U01a): the steps and the buffer — the depth is the rail; the locus, its hash, the seed and the readout fold are gone', () => {
    expect(vm.stats).toEqual([
      { key: 'steps', label: 'Steps', value: '12' },
      { key: 'buffer', label: 'Buffer', value: '0' },
    ]);
    expect(vm).not.toHaveProperty('readout');
    expect(vm).not.toHaveProperty('crumbs');
  });

  test('the position among its siblings is a plain chip under the kind’s own word — `Orbit 2 of 5`; the universe has none', () => {
    expect(vm.place.position).toEqual({ shown: true, label: 'Orbit', value: '2 of 5' });
    const universe = presenter.toViewModel({
      ...PLANET,
      place: { ...placeOf(PLANET), position: { counted: false }, address: '0', frame: null },
    });
    expect(universe.place.position).toEqual({ shown: false });
    expect(universe.frame).toBe('default');
  });
});

describe('HudPresenter.toViewModel — the narrative panel', () => {
  const vm = presenter.toViewModel(PLANET);

  test('description paragraphs pass through; facts become chips, their value starting with a capital (U01a); the diagnostic rides along', () => {
    expect(vm.place.description).toEqual(PLANET.place?.description);
    expect(vm.place.tags).toEqual([
      { key: 'culture', label: 'RESONANCE', value: 'Baroque' },
      { key: 'era', label: 'TIMELINE', value: 'Future' },
    ]);
    expect(vm.place.diagnostic).toBe('RESONANCE: [BAROQUE]');
    expect(vm.status).toBe('Entered Auraea.');
  });
});

describe('HudPresenter.toViewModel — what a room shows (Room.groovy:278-295; the mock’s console column)', () => {
  const vm = presenter.toViewModel(ROOM);

  test('the panel carries the furniture and the relic count as rows; the objects are tiles in the aside, each by its key, each a take when the engine offers one; the buffer count rides in the stats', () => {
    expect(vm.place.rows).toEqual([
      { label: 'Furniture', value: 'overturned tatami mat, cracked shoji screen' },
      { label: 'Relics', value: '2' },
    ]);
    expect(vm.place.tags[1]).toEqual({ key: 'stable', label: 'RESONANCE', value: '[STABLE]' });
    expect(vm.aside.objects).toEqual({
      label: 'In this room',
      heading: 'IN THIS ROOM',
      empty: '',
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
    expect(vm.stats[1]).toEqual({ key: 'buffer', label: 'Buffer', value: '1' });
    expect(vm.options.map((each) => each.id)).toEqual([
      'capture:0',
      'capture:1',
      'move:forward',
      'leave',
      'buffer',
      'to-title',
    ]);
    expect(vm.dock.map((each) => each.label)).toEqual(['▲ LEAVE THE APARTMENT', 'BUFFER', 'TITLE SCREEN']);
  });

  test('an empty room says so in words and has no Relics row (Room.groovy:287); a place that holds nothing (a planet) has no objects pane at all', () => {
    const bare = presenter.toViewModel({
      ...ROOM,
      place: {
        ...placeOf(ROOM),
        contents: { objects: [], furniture: ['overturned tatami mat', 'cracked shoji screen'] },
      },
      options: ROOM.options.filter((option) => option.role !== 'take'),
    });
    expect(bare.aside.objects).toEqual({
      label: 'In this room',
      heading: 'IN THIS ROOM',
      empty: 'No objects detected.',
      tiles: [],
    });
    expect(bare.place.rows).toEqual([
      { label: 'Furniture', value: 'overturned tatami mat, cracked shoji screen' },
    ]);
    const planet = presenter.toViewModel(PLANET);
    expect(planet.aside).toEqual({ objects: null, telemetry: null, map: null });
    expect(planet.place.rows).toEqual([]);
  });

  test('inside a building the aside carries the telemetry: the sync with its band, the spectrogram drawn from the frame, the resonant count, the voice (TelemetryComponent.groovy:127-143)', () => {
    expect(vm.aside.telemetry).toEqual({
      label: 'System telemetry',
      heading: 'TELEMETRY',
      sync: { text: 'NOMINAL', band: 'stable' },
      spectrogram: {
        label: 'Quantum spectrogram',
        picture: {
          anchors: [3, 1, 9, 4, 2],
          tallest: 9,
          decades: 7,
          noise: ROOM.place?.noise,
          peaks: [],
          glitched: false,
        },
      },
      lines: ['Resonant traces 2'],
      voice: '',
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
    expect(vm.sealedNote).toEqual({ shown: false });
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
    expect(shown(street.sealedNote).text).toMatch(/sealed/i);
    expect(street.sealedTag).toBe('SEALED');
  });

  test('a sealed row shows the place’s name, not the way in — there is no way in yet', () => {
    expect(presenter.toViewModel(STREET).rows[0]?.label).toBe('Ornate Sanctum');
  });

  test('where no picture draws the place, the moves it offers become a strip of buttons between the panel and the list, in the router’s options before the dock', () => {
    const vm = presenter.toViewModel(FLOOR);
    // The opposite rides along as data: the shell keeps the focus off it when this button vanishes.
    expect(vm.moves).toEqual([
      {
        id: 'move:elevator',
        key: 'B',
        label: 'BACK TO ELEVATOR',
        opposite: 'move:corridor',
        icon: 'elevator',
      },
    ]);
    expect(vm.keys.shown).toBe(false);
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

describe('HudPresenter.toViewModel — the ritual (I07): the scan panel and the void’s labels', () => {
  const room: GameSnapshot = {
    ...PLANET,
    place: {
      ...placeOf(PLANET),
      kind: 'Room',
      name: 'Grand Power Plant',
      contents: { objects: [], furniture: ['overturned pew'] },
      telemetry: { spectrogram: [1, 2, 3, 4, 5], peaks: [], glitched: false, voice: null },
      lattice: null,
    },
    options: [],
  };

  test('a scan on the snapshot becomes a panel: heading, notes, rows of labelled cells, the current row marked with words for a reader, the sensory line under a row; none when there was no scan', () => {
    expect(presenter.toViewModel(room).scan).toBeNull();
    const vm = presenter.toViewModel({
      ...room,
      scan: {
        title: 'NEURAL_PROXIMITY_REPORT',
        notes: ['BUILDING: Ornate Sanctum', 'TOTAL_STRATA: 16 units detected.'],
        rows: [
          {
            cells: [
              { key: 'reading', label: 'ID', value: '01' },
              { key: 'zone', label: 'FUNCTION', value: 'POWER_RELAY' },
            ],
            current: false,
            note: '',
          },
          {
            cells: [
              { key: 'reading', label: 'ID', value: '00' },
              { key: 'zone', label: 'FUNCTION', value: 'TRANSIT_LOBBY' },
            ],
            current: true,
            note: 'A heavy door.',
          },
        ],
      },
    });
    expect(vm.scan).toEqual({
      label: 'Scan',
      heading: 'NEURAL_PROXIMITY_REPORT',
      notes: ['BUILDING: Ornate Sanctum', 'TOTAL_STRATA: 16 units detected.'],
      rows: [
        {
          cells: [
            { key: 'reading', label: 'ID', value: '01' },
            { key: 'zone', label: 'FUNCTION', value: 'POWER_RELAY' },
          ],
          mark: null,
          note: '',
        },
        {
          cells: [
            { key: 'reading', label: 'ID', value: '00' },
            { key: 'zone', label: 'FUNCTION', value: 'TRANSIT_LOBBY' },
          ],
          mark: { text: '>>', label: 'You are here' },
          note: 'A heavy door.',
        },
      ],
    });
    expect(vm.regions.scan).toBe('Scan');
  });

  test('below the bedrock: Integrity for Coherence, the void trace, the void’s sync line and its voice in the decode log, and the abyssal frame whatever the planet’s (Guide:280; HUDHeaderComponent.groovy:34-88); the readouts are the same words', () => {
    const above = presenter.toViewModel(room);
    expect(above.frame).toBe('yellow');
    expect(above.meter.label).toBe('Coherence');
    expect(above.stats.map((stat) => stat.label)).toEqual(['Steps', 'Buffer']);
    expect(above.regions.path).toBe('Path from the universe');
    expect(above.aside.telemetry?.sync).toEqual({ text: 'NOMINAL', band: 'stable' });
    expect(above.aside.telemetry?.voice).toBe('');
    const below = presenter.toViewModel({
      ...room,
      place: {
        ...placeOf(room),
        kind: 'Shard',
        abyssal: true,
        telemetry: { spectrogram: [1, 2, 3, 4, 5], peaks: [], glitched: false, voice: 'We see you.' },
        lattice: null,
      },
    });
    expect(below.frame).toBe('abyssal');
    expect(below.meter.label).toBe('Integrity');
    expect(below.stats.map((stat) => stat.label)).toEqual(['Steps', 'Buffer']);
    expect(below.regions.path).toBe('Void trace from the universe');
    expect(below.aside.telemetry?.sync.text).toBe('PRESSURE HIGH');
    expect(below.aside.telemetry?.voice).toBe('We see you.');
    expect(below.place.eyebrow).toBe('SHARD');
  });
});

describe('HudPresenter.toViewModel — the picture (U01b, U02): made by its own part', () => {
  test('the drawing carries the player’s tear strength; a building’s floors stand in no list beside the tower, and each stays on offer', () => {
    const falling = {
      ...towerSnapshot(16, 5),
      player: playerSummary({ coherence: 35, band: 'degraded', decay: 0.5 }),
    };
    const vm = presenter.toViewModel(falling);
    expect(vm.drawing.frame().decay).toBe(0.5);
    expect(vm.rows).toEqual([]);
    expect(vm.options.filter((each) => each.id.startsWith('enter:'))).toHaveLength(16);
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
      scan: 'Scan',
      map: 'Map',
      trace: 'Trace',
      travel: 'Places to enter',
      moves: 'Moves',
      aside: 'Readouts',
      dock: 'Actions',
      debug: 'Debug tools',
    });
  });

  test('the coherence meter: the value, its band from the engine, the words a reader hears (Guide:151-156)', () => {
    expect(presenter.toViewModel(PLANET).meter).toEqual({
      label: 'Coherence',
      min: 0,
      max: 100,
      value: 87,
      text: '87%',
      band: 'stable',
      bandLabel: 'stable',
      valueText: '87 percent, stable',
    });
    const low = presenter.toViewModel({
      ...PLANET,
      player: playerSummary({ coherence: 12, band: 'critical', steps: 3, decay: 0.8 }),
    });
    expect(low.meter.value).toBe(12);
    expect(low.meter.band).toBe('critical');
    expect(low.meter.valueText).toBe('12 percent, critical');
    expect(low.stats[0]).toEqual({ key: 'steps', label: 'Steps', value: '3' });
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
    expect(vm.debugToggle).toBe('DEBUG');
    expect(vm.options.at(-1)?.id).toBe('debug:integrity:39');
    expect(vm.dock.map((option) => option.id)).toEqual(['leave', 'to-title']);
    expect(presenter.toViewModel(PLANET).debug).toEqual([]);
  });
});

describe('HudPresenter.toViewModel — the map and the trace (I08): drawn panels with words for a reader, the pane map outdoors, the dock’s fold', () => {
  const LATTICE = {
    width: 30,
    height: 15,
    origin: { name: 'Bright Boulevard', glyph: '═' },
    frame: 'yellow',
    abyssal: false,
    nodes: [
      { x: 7, y: 12, glyph: '⌂', name: 'Ornate Sanctum', visited: true, noise: false },
      { x: 15, y: 7, glyph: '⌂', name: 'The Spire of Static', visited: false, noise: false },
      { x: 12, y: 2, glyph: '▒', name: 'ArchiveRoot', visited: false, noise: true },
    ],
    marks: [{ x: 5, y: 11 }],
  } as const;
  const OUTDOORS: GameSnapshot = {
    ...STREET,
    place: { ...placeOf(STREET), lattice: LATTICE },
  };

  test('the pane beside the list carries the map outdoors (Guide:339) — the picture, and every node as words; nothing where the telemetry is', () => {
    const street = presenter.toViewModel(OUTDOORS);
    expect(street.aside.telemetry).toBeNull();
    expect(street.aside.map).toEqual({
      label: 'Lattice map',
      heading: '[NEURAL_MAP: STREET]',
      origin: 'SCAN_ORIGIN: Bright Boulevard',
      picture: {
        width: 30,
        height: 15,
        origin: { glyph: '═', label: 'YOU' },
        nodes: [
          { x: 7, y: 12, glyph: '⌂', tone: 'visited' },
          { x: 15, y: 7, glyph: '⌂', tone: 'unvisited' },
          { x: 12, y: 2, glyph: '▒', tone: 'noise' },
        ],
        marks: [{ x: 5, y: 11 }],
        markGlyph: 'X',
        legend: [
          { glyph: '═', label: 'YOU', tone: 'you' },
          { glyph: '⌂', label: 'VISITED', tone: 'visited' },
          { glyph: '⌂', label: 'UNVISITED', tone: 'unvisited' },
          { glyph: 'X', label: 'GLITCH', tone: 'mark' },
        ],
      },
      nodes: [
        { glyph: '⌂', name: 'Ornate Sanctum', note: 'visited' },
        { glyph: '⌂', name: 'The Spire of Static', note: 'unvisited' },
        { glyph: '▒', name: 'ArchiveRoot', note: 'unvisited, static' },
      ],
      summary: 'Lattice map of Bright Boulevard: 3 nodes, 1 visited, 1 glitch mark.',
    });
    // Indoors the pane is the telemetry; the map waits for the MAP command.
    const room = presenter.toViewModel(ROOM);
    expect(room.aside.map).toBeNull();
    expect(room.aside.telemetry).not.toBeNull();
    // A place with no map (a room) and no telemetry would show neither.
    expect(presenter.toViewModel(PLANET).aside).toEqual({ objects: null, telemetry: null, map: null });
  });

  test('the MAP command’s panel is the same picture under the narrative, headed as the old screen was; none when the last step was no map; no GLITCH entry without marks; ☠ below the bedrock', () => {
    expect(presenter.toViewModel(OUTDOORS).map).toEqual({ shown: false });
    const drawn = presenter.toViewModel({ ...OUTDOORS, map: LATTICE });
    const map = shown(drawn.map);
    expect(map.label).toBe('Lattice map');
    expect(map.heading).toBe('[NEURAL_LATTICE_PROJECTION]');
    expect(map.origin).toBe('SCAN_ORIGIN: Bright Boulevard');
    expect(map.picture).toEqual(presenter.toViewModel(OUTDOORS).aside.map?.picture);
    expect(drawn.regions.map).toBe('Map');
    const calm = shown(presenter.toViewModel({ ...OUTDOORS, map: { ...LATTICE, marks: [] } }).map);
    expect(calm.picture.legend.map((entry) => entry.label)).toEqual(['YOU', 'VISITED', 'UNVISITED']);
    expect(calm.summary).toBe('Lattice map of Bright Boulevard: 3 nodes, 1 visited.');
    const below = shown(
      presenter.toViewModel({
        ...OUTDOORS,
        map: {
          ...LATTICE,
          abyssal: true,
          origin: { name: 'Layer -0x1', glyph: '☠' },
          nodes: [{ x: 1, y: 1, glyph: '☠', name: 'Crypt 1', visited: false, noise: false }],
        },
      }).map,
    );
    expect(below.picture.legend).toEqual([
      { glyph: '☠', label: 'YOU', tone: 'you' },
      { glyph: '☠', label: 'VISITED', tone: 'visited' },
      { glyph: '☠', label: 'UNVISITED', tone: 'unvisited' },
      { glyph: 'X', label: 'GLITCH', tone: 'mark' },
    ]);
    expect(below.heading).toBe('[NEURAL_LATTICE_PROJECTION]');
  });

  test('the TRACE command’s column (U04): a band a level in the trail’s order, its depth and kind, its chips and words, its counts, the place you went down into; you are the last', () => {
    expect(presenter.toViewModel(OUTDOORS).trace).toEqual({ shown: false });
    const step = (depth: number, kind: string, name: string, address: string): TraceStep => ({
      depth,
      icon: '∞',
      kind,
      name,
      current: false,
      abyssal: false,
      address,
      portrait: new NoPortrait(),
      children: [],
      facts: [],
      words: '',
      scale: '10²⁶ m',
      glyph: 'universe',
      vibe: { held: 'none' },
      signs: [],
    });
    const traced = shown(
      presenter.toViewModel({
        ...OUTDOORS,
        trace: {
          steps: [
            { ...step(0, 'Universe', 'The Endless Universe', '0'), words: 'A neural web.' },
            {
              ...step(4, 'Planet', 'Auraea', '0.1'),
              facts: [{ key: 'era', label: 'Era', value: 'future' }],
              children: [
                {
                  address: '0.1.0',
                  name: 'Glacier',
                  ordinal: '1',
                  landmark: false,
                  visited: true,
                  sealed: false,
                },
                {
                  address: '0.1.1',
                  name: 'Dunes',
                  ordinal: '2',
                  landmark: false,
                  visited: false,
                  sealed: false,
                },
              ],
            },
            { ...step(12, 'Shard', 'Inverted Processing Core', '0.1.0'), current: true, abyssal: true },
          ],
        },
      }).trace,
    );
    expect(traced.bands.map((band) => band.eyebrow)).toEqual([
      'Depth 00 · Universe',
      'Depth 04 · Planet',
      'Depth 12 · Shard',
    ]);
    expect(traced.bands.map((band) => band.here)).toEqual([false, false, true]);
    expect(traced.bands.map((band) => band.label)).toEqual([
      'Depth 00, Universe: The Endless Universe',
      'Depth 04, Planet: Auraea',
      'Depth 12, Shard: Inverted Processing Core, you are here',
    ]);
    expect(traced.bands.map((band) => band.into)).toEqual(['0.1', '0.1.0', '']);
    expect(traced.bands[1]?.facts).toEqual([
      '2 inside · 1 visited',
      'You went down into Inverted Processing Core',
    ]);
    expect(traced.bands[2]?.facts).toEqual([]);
    expect(traced.bands[1]?.tags).toEqual([{ key: 'era', label: 'Era', value: 'Future' }]);
    expect(traced.bands[0]?.words).toBe('A neural web.');
    expect(traced.bands.map((band) => band.abyssal)).toEqual([false, false, true]);
  });

  test('the dock folds after the way out (I09): on a phone LEAVE stays in reach and every other option opens behind MORE; the fold is empty of LEAVE at the universe', () => {
    const vm = presenter.toViewModel({
      ...OUTDOORS,
      options: [
        option({ id: 'leave', key: 'l', label: 'Leave Street', role: 'return' }),
        option({ id: 'scan', key: 's', label: 'Scan', role: 'system' }),
        option({ id: 'map', key: 'm', label: 'Map', role: 'system' }),
        option({ id: 'buffer', key: 'i', label: 'Buffer', role: 'system' }),
        option({ id: 'trace', key: '', label: 'Trace', role: 'system' }),
        option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
        option({ id: 'recap', key: 'q', label: 'End session', role: 'system' }),
      ],
    });
    expect(vm.dock.map((option) => option.id)).toEqual([
      'leave',
      'scan',
      'map',
      'buffer',
      'trace',
      'to-title',
      'recap',
    ]);
    expect(vm.fold).toEqual({ after: 1, out: 1, more: 'MORE', less: 'LESS', label: 'More of the dock' });
    // Every dock option is on offer to the router whether folded or not: a key still works.
    expect(vm.options.map((option) => option.id)).toEqual(expect.arrayContaining(['to-title', 'recap']));
    // The universe has no way out: nothing stays out of the fold.
    const top = presenter.toViewModel({
      ...OUTDOORS,
      options: [option({ id: 'scan', key: 's', label: 'Scan', role: 'system' })],
    });
    expect(top.fold.after).toBe(0);
    expect(top.dock.map((each) => each.id)).toEqual(['scan']);
  });
});

/** A room of three drawn as its apartment's plan (U03), standing in the room at `here`, offered these moves and way out. */
function drawnRoom(here: number, offered: readonly GameSnapshot['options'][number][]): GameSnapshot {
  const rooms = ['0.0.0.0.1.0.0.0.0.0.0.0.0', '0.0.0.0.1.0.0.0.0.0.0.0.1', '0.0.0.0.1.0.0.0.0.0.0.0.2'];
  return {
    ...ROOM,
    place: {
      ...placeOf(ROOM),
      address: rooms[here] ?? '',
      portrait: new PlanPortrait({
        rooms: rooms.map((address, index) => ({
          address,
          name: `Room ${String(index)}`,
          sight: 'visited',
          relics: 0,
          light: 'analog',
        })),
        here: rooms[here] ?? '',
        look: new RoomLook({ walls: 'rust', light: 'analog', cold: false, furniture: 1, anomaly: false }),
      }),
    },
    options: [
      ...offered,
      option({ id: 'buffer', key: 'i', label: 'Buffer', role: 'system' }),
      option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
    ],
  };
}

describe('HudPresenter.toViewModel — where a place’s moves sit (U03c)', () => {
  const BACK = option({
    id: 'move:back',
    key: 'b',
    label: 'Go back',
    role: 'move',
    opposite: 'move:forward',
  });
  const FORWARD = option({
    id: 'move:forward',
    key: 'f',
    label: 'Go forward',
    role: 'move',
    opposite: 'move:back',
  });
  const LEAVE = option({ id: 'leave', key: 'l', label: 'Leave the apartment', role: 'return' });

  /** The ids of a shown card's parts. */
  function cardOf(vm: HudVM): { keys: string[]; ways: string[]; game: string[] } {
    if (!vm.card.shown) throw new Error('expected the room’s card');
    return {
      keys: [...vm.card.keys.lead, ...vm.card.keys.trail].map((key) => key.id),
      ways: vm.card.ways.map((way) => way.id),
      game: vm.card.game.map((each) => each.id),
    };
  }

  test('a room drawn as a plan is a card (U03e): the keys are Buffer, the way back — the way out in the first room — and the way forward; the game’s options are the MORE sheet’s keys; no dock, no strip, no option twice', () => {
    const vm = presenter.toViewModel(drawnRoom(0, [FORWARD, LEAVE]));
    expect(cardOf(vm)).toEqual({ keys: ['buffer', 'leave', 'move:forward'], ways: [], game: ['to-title'] });
    expect(vm.moves).toEqual([]);
    expect(vm.dock).toEqual([]);
    expect(vm.options.map((each) => each.id).sort()).toEqual(['buffer', 'leave', 'move:forward', 'to-title']);
  });

  test('past the first room the way back is the move back; Trace, when offered, is a key; in the last room there is no forward key', () => {
    const room = drawnRoom(1, [BACK, FORWARD]);
    const vm = presenter.toViewModel({
      ...room,
      options: [...room.options, option({ id: 'trace', key: '', label: 'Trace', role: 'system' })],
    });
    expect(cardOf(vm)).toEqual({
      keys: ['buffer', 'trace', 'move:back', 'move:forward'],
      ways: [],
      game: ['to-title'],
    });
    expect(cardOf(presenter.toViewModel(drawnRoom(1, [BACK]))).keys).toEqual(['buffer', 'move:back']);
  });

  test('the MORE sheet’s keys carry a short word and an icon by the option’s id; an option it does not know keeps its label', () => {
    const room = drawnRoom(0, [FORWARD, LEAVE]);
    const vm = presenter.toViewModel({
      ...room,
      options: [
        ...room.options,
        option({ id: 'map', key: 'm', label: 'Lattice', role: 'system' }),
        option({ id: 'new-thing', key: '', label: 'New thing', role: 'system' }),
      ],
    });
    if (!vm.card.shown) throw new Error('expected the room’s card');
    expect(vm.card.game.map((key) => [key.id, key.text, key.icon, key.label])).toEqual([
      ['to-title', 'TITLE', 'title', 'Title screen'],
      ['map', 'LATTICE', 'lattice', 'Lattice'],
      ['new-thing', 'NEW THING', 'game', 'New thing'],
    ]);
    expect(vm.card.more).toEqual({ text: 'MORE', label: 'More: the game itself' });
  });

  test('the card’s keys are named by the engine’s words and the Buffer key counts the buffer; the arrival is the room’s first paragraph', () => {
    const vm = presenter.toViewModel(drawnRoom(0, [FORWARD, LEAVE]));
    if (!vm.card.shown) throw new Error('expected the room’s card');
    expect(vm.card.keys.lead.map((key) => [key.label, key.badge])).toEqual([['Buffer', vm.stats[1]?.value]]);
    expect(vm.card.keys.trail.map((key) => [key.label, key.icon])).toEqual([
      ['Leave the apartment', 'out'],
      ['Go forward', 'forward'],
    ]);
    expect(vm.card.arrival).toBe(vm.place.description[0]);
  });
});

describe('HudPresenter.toViewModel — the keys at the foot of a drawn place that is no card', () => {
  const GAME = [
    option({ id: 'buffer', key: 'i', label: 'Buffer', role: 'system' }),
    option({ id: 'trace', key: '', label: 'Trace', role: 'system' }),
    option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
  ];

  /** A shown strip's keys, in order, by option id. */
  function keysOf(vm: HudVM): string[] {
    const strip = shown(vm.keys);
    return [...strip.keys.lead, ...strip.keys.trail].map((key) => key.id);
  }

  test('a drawn corridor has the keys in place of the dock and the strip: Buffer, Trace, its move back to the elevator, the way out; the game’s own behind MORE', () => {
    const vm = presenter.toViewModel({
      ...FLOOR,
      place: {
        ...placeOf(FLOOR),
        portrait: new CorridorPortrait({ shape: 'curved', abyssal: false, doors: [] }),
      },
      options: [...FLOOR.options.filter((each) => each.role !== 'system'), ...GAME],
    });
    expect(keysOf(vm)).toEqual(['buffer', 'trace', 'move:elevator', 'leave']);
    expect(shown(vm.keys).keys.trail.map((key) => [key.text, key.icon])).toEqual([
      ['TRACE', 'trace'],
      ['ELEVATOR', 'elevator'],
      ['LEAVE', 'out'],
    ]);
    expect(shown(vm.keys).game.map((key) => key.id)).toEqual(['to-title']);
    expect(vm.moves).toEqual([]);
    expect(vm.dock).toEqual([]);
    expect(vm.bar).toEqual([]);
    expect(vm.card.shown).toBe(false);
  });

  test('a level above the street has the keys too: the way out last, and a move the strip has no picture for keeps its own words', () => {
    const vm = presenter.toViewModel({
      ...PLANET,
      place: { ...placeOf(PLANET), portrait: new AreaPortrait({ look: 'planet', parts: [], signal: 0 }) },
      options: [
        option({ id: 'move:odd', key: '', label: 'Odd way', role: 'move' }),
        option({ id: 'leave', key: 'l', label: 'Leave Planet', role: 'return' }),
        ...GAME,
      ],
    });
    expect(keysOf(vm)).toEqual(['buffer', 'trace', 'move:odd', 'leave']);
    expect(shown(vm.keys).keys.trail[1]).toMatchObject({ text: 'ODD WAY', icon: 'move' });
    expect(vm.dock).toEqual([]);
  });

  test('the tower keeps the way into the corridor under its picture, with its words and its icon; its rides have no button and stay on offer; the breach arrives as the bar', () => {
    const tower = towerSnapshot(10, 3);
    const vm = presenter.toViewModel({
      ...tower,
      options: [
        ...tower.options,
        option({ id: 'move:up', key: 'u', label: 'Go Up', role: 'move', opposite: 'move:down' }),
        option({ id: 'move:down', key: 'd', label: 'Go Down', role: 'move', opposite: 'move:up' }),
        option({
          id: 'move:corridor',
          key: 'c',
          label: 'Enter Corridor',
          role: 'move',
          opposite: 'move:elevator',
        }),
        option({ id: 'breach', key: 'j', label: 'Breach the Bedrock', role: 'move' }),
      ],
    });
    expect(vm.moves).toEqual([
      { id: 'move:corridor', key: 'C', label: 'ENTER CORRIDOR', opposite: 'move:elevator', icon: 'corridor' },
    ]);
    expect(keysOf(vm)).toEqual(['leave']);
    expect(vm.bar.map((each) => [each.id, each.label])).toEqual([['breach', 'BREACH THE BEDROCK']]);
    expect(vm.dock).toEqual([]);
    expect(vm.options.map((each) => each.id)).toEqual(
      expect.arrayContaining(['move:corridor', 'move:up', 'move:down', 'breach', 'leave']),
    );
  });
});
