import { describe, expect, test } from 'vitest';
import { NoPortrait } from '#engine/model/NoPortrait.ts';
import { Seed } from '#engine/rng/Seed.ts';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { BuildMasthead } from '#ui/BuildMasthead.ts';
import { Frame } from '#ui/Frame.ts';
import { BufferPresenter } from '#ui/screens/BufferPresenter.ts';
import { playerSummary } from '#tests/support/playerSummary.ts';

const presenter = new BufferPresenter(new BuildMasthead('a1b2c3d'), new Frame());

function option(facts: Partial<GameOption> & { id: string; label: string }): GameOption {
  return {
    key: '',
    place: '',
    role: 'system',
    sealed: false,
    landmark: false,
    ordinal: '',
    readings: [],
    opposite: '',
    current: false,
    visited: false,
    address: '',
    numbered: false,
    ...facts,
  };
}

/** The buffer screen open in a room: two fragments, one selected, both droppable. */
const OPEN: GameSnapshot = {
  world: { seed: '7F3A-91C2-0B4D-E6A8', name: 'The Endless Universe' },
  place: {
    kind: 'Room',
    icon: '□',
    name: 'Grand Power Plant',
    address: '0.0.0.0.0.0.0.0.0.0.0.0.0',
    position: { counted: true, label: 'CELL', index: 1, total: 2 },
    trail: [],
    status: 'ATMOS: 14% | TEMP: 7°C',
    description: [],
    facts: [],
    frame: 'yellow',
    abyssal: false,
    childrenHeading: '',
    contents: { objects: [], furniture: [] },
    telemetry: { spectrogram: [1, 1, 1, 1, 1], peaks: [], glitched: false, voice: null },
    lattice: null,
    portrait: new NoPortrait(),
    noise: new Seed(0, 0),
  },
  player: playerSummary({ coherence: 54, band: 'degraded', steps: 6, decay: 0.2 }),
  buffer: {
    size: 2,
    resonant: 3,
    fragments: [
      {
        key: 'with|reliquary box|plasma coil',
        name: 'plasma coil with reliquary box',
        hertz: 3194,
        resonant: true,
      },
      { key: 'hybrid(a+b)', name: 'brass-plasma Hybrid', hertz: 6771, resonant: false },
    ],
  },
  prompt: { id: 'buffer', outcome: '', figures: { selected: '0' } },
  options: [
    option({ id: 'pick:0', key: '1', label: 'Unselect', role: 'pick', ordinal: '1' }),
    option({ id: 'drop:0', label: 'Drop here', role: 'drop', ordinal: '1' }),
    option({ id: 'pick:1', key: '2', label: 'Merge', role: 'pick', ordinal: '2' }),
    option({ id: 'drop:1', label: 'Drop here', role: 'drop', ordinal: '2' }),
    option({ id: 'close', key: 'b', label: 'Back to reality', role: 'return' }),
  ],
  message: '',
  scan: null,
  map: null,
  trace: null,
};

describe('BufferPresenter — the buffer screen (InventoryOverlayComponent.groovy:20-52; Guide:124-126)', () => {
  test('accepts the buffer prompt and nothing else', () => {
    expect(presenter.accepts(OPEN)).toBe(true);
    expect(presenter.accepts({ ...OPEN, prompt: null })).toBe(false);
    expect(presenter.accepts({ ...OPEN, prompt: { id: 'recap', outcome: 'severed', figures: {} } })).toBe(
      false,
    );
  });

  test('the heading, the count, the tally, one row per fragment with the old line’s number, hertz, signal bar and phase, the resonant badge, and the row’s actions', () => {
    const vm = presenter.toViewModel(OPEN);
    expect(vm.scene).toBe('buffer');
    expect(vm.frame).toBe('yellow');
    expect(vm.heading).toBe('BUFFER');
    expect(vm.count).toEqual({ label: 'Fragments', value: '2' });
    expect(vm.tally).toEqual({ label: 'Resonant', value: '3' });
    expect(vm.empty).toBe('');
    expect(vm.rows).toEqual([
      {
        key: 'with|reliquary box|plasma coil',
        ordinal: '1',
        hertz: '3194 Hz',
        signal: { lit: 10, cells: 10 }, // 94 → ten cells
        phase: 'STABLE',
        phaseKey: 'stable',
        name: 'plasma coil with reliquary box',
        resonant: true,
        resonantLabel: 'Resonant',
        selected: true,
        selectedLabel: 'Selected',
        pick: { id: 'pick:0', key: '1', label: 'Unselect: plasma coil with reliquary box', opposite: '' },
        drop: { id: 'drop:0', key: '', label: 'Drop here: plasma coil with reliquary box', opposite: '' },
      },
      {
        key: 'hybrid(a+b)',
        ordinal: '2',
        hertz: '6771 Hz',
        signal: { lit: 8, cells: 10 }, // 71 → eight cells
        phase: 'SHIFTING',
        phaseKey: 'shifting',
        name: 'brass-plasma Hybrid',
        resonant: false,
        resonantLabel: '',
        selected: false,
        selectedLabel: '',
        pick: { id: 'pick:1', key: '2', label: 'Merge: brass-plasma Hybrid', opposite: '' },
        drop: { id: 'drop:1', key: '', label: 'Drop here: brass-plasma Hybrid', opposite: '' },
      },
    ]);
    expect(vm.hint).toBe('Tap one fragment, then another: they merge into a hybrid and give 15 Coherence back.');
    expect(vm.dock).toEqual([{ id: 'close', key: 'B', label: 'BACK', opposite: '' }]);
    expect(vm.options.map((each) => each.id)).toEqual(['pick:0', 'drop:0', 'pick:1', 'drop:1', 'close']);
    expect(vm.status).toBe(vm.heading);
    expect(vm.regions).toEqual({ buffer: 'Quantum trace buffer', actions: 'Back' });
  });

  test('an empty buffer says so in the old words; the engine’s message is the status and the note when it says something', () => {
    const vm = presenter.toViewModel({
      ...OPEN,
      buffer: { size: 0, resonant: 0, fragments: [] },
      options: [option({ id: 'close', key: 'b', label: 'Back to reality', role: 'return' })],
      message: 'Dropped brass-plasma Hybrid here.',
    });
    expect(vm.rows).toEqual([]);
    expect(vm.empty).toBe('Nothing carried yet.');
    expect(vm.count.value).toBe('0');
    expect(vm.note).toBe('Dropped brass-plasma Hybrid here.');
    expect(vm.status).toBe('Dropped brass-plasma Hybrid here.');
  });

  test('the signal bar and the phase follow the old arithmetic: hertz mod 100 over ten plus one cells, even is STABLE', () => {
    const at = (hertz: number): { lit: number; phase: string } => {
      const vm = presenter.toViewModel({
        ...OPEN,
        buffer: {
          size: 1,
          resonant: 0,
          fragments: [{ key: 'k', name: 'x', hertz, resonant: false }],
        },
        options: [option({ id: 'pick:0', key: '1', label: 'Select', role: 'pick', ordinal: '1' })],
        prompt: { id: 'buffer', outcome: '', figures: { selected: '' } },
      });
      const row = vm.rows[0];
      if (row === undefined) throw new Error('a row');
      return { lit: row.signal.lit, phase: row.phase };
    };
    expect(at(0)).toEqual({ lit: 1, phase: 'STABLE' });
    expect(at(9)).toEqual({ lit: 1, phase: 'SHIFTING' });
    expect(at(10)).toEqual({ lit: 2, phase: 'STABLE' });
    expect(at(199)).toEqual({ lit: 10, phase: 'SHIFTING' });
  });

  test('the frame is the place’s; the scene is the prompt’s key, so opening the buffer is a new scene and closing it goes back', () => {
    expect(presenter.toViewModel({ ...OPEN, place: null }).frame).toBe('default');
  });
});
