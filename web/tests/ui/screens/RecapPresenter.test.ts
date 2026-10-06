import { describe, expect, test } from 'vitest';
import { NoPortrait } from '#engine/model/NoPortrait.ts';
import { Seed } from '#engine/rng/Seed.ts';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { BuildMasthead } from '#ui/BuildMasthead.ts';
import { Frame } from '#ui/Frame.ts';
import { PassageLevels } from '#ui/screens/PassageLevels.ts';
import { RecapPresenter } from '#ui/screens/RecapPresenter.ts';
import { SceneDrawing } from '#ui/screens/SceneDrawing.ts';
import { playerSummary } from '#tests/support/playerSummary.ts';
import { placeOf, promptOf } from '#tests/support/snapshotParts.ts';
import { traceStep } from '#tests/support/traceStep.ts';

const presenter = new RecapPresenter(
  new BuildMasthead('a1b2c3d'),
  new Frame(),
  new PassageLevels(new SceneDrawing()),
);

function option(id: string, key: string, label: string): GameOption {
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
    address: '',
    numbered: false,
  };
}

const RECAP: GameSnapshot = {
  world: { seed: '7F3A-91C2-0B4D-E6A8', name: 'The Endless Universe' },
  place: {
    kind: 'Building',
    icon: '⌂',
    name: 'Ornate Sanctum',
    address: '0.0.0.0.0.0.0.0.0',
    position: { counted: false },
    trail: [],
    status: '',
    description: [],
    facts: [],
    frame: 'yellow',
    abyssal: false,
    childrenHeading: '',
    contents: null,
    telemetry: null,
    lattice: null,
    portrait: new NoPortrait(),
    noise: new Seed(0, 0),
  },
  player: playerSummary({ coherence: 61, band: 'degraded', steps: 33, decay: 0.1 }),
  buffer: { size: 2, resonant: 1, fragments: [] },
  prompt: {
    id: 'recap',
    outcome: 'expedition',
    figures: { locus: '0.0.0.0.0.0.0.0.0', steps: '33', places: '24', buffer: '2', resonant: '1' },
  },
  options: [option('resume', 'b', 'Resume'), option('end-session', 'q', 'End session')],
  message: '',
  scan: null,
  map: null,
  trace: null,
  descent: null,
};

describe('RecapPresenter — the endings of a session (Guide:422-430; the mock docs/analysis/mocks/endings.html)', () => {
  test('it is the screen of the recap prompt and of nothing else', () => {
    expect(presenter.accepts(RECAP)).toBe(true);
    expect(presenter.accepts({ ...RECAP, prompt: null })).toBe(false);
    expect(presenter.accepts({ ...RECAP, prompt: { id: 'reboot', outcome: 'rebooting', figures: {} } })).toBe(
      false,
    );
  });

  test('the ending reached: its key picks the emblem, its heading and closing line are its own; where you stand and the figures show on every ending', () => {
    const vm = presenter.toViewModel(RECAP);
    expect(vm.scene).toBe('recap');
    expect(vm.frame).toBe('yellow');
    expect(vm.outcome).toBe('expedition');
    expect(vm.heading).toBe('Expedition complete');
    expect(vm.place).toEqual({ label: 'You stand in', name: 'Ornate Sanctum', kind: 'Building' });
    expect(vm.figures).toEqual([
      { label: 'Steps', value: '33' },
      { label: 'Places', value: '24' },
      { label: 'Relics', value: '2' },
      { label: 'Resonant', value: '1' },
    ]);
    expect(vm.lines).toEqual([]);
    expect(vm.closing).toMatch(/^A long way down\./);
    expect(vm.options).toEqual([
      { id: 'resume', key: 'B', label: 'Resume', opposite: '', lead: false },
      { id: 'end-session', key: 'Q', label: 'End session', opposite: '', lead: true },
    ]);
    expect(vm.ends).toBe('end-session');
    expect(vm.build).toBe('build a1b2c3d');
  });

  test('every ending of the ladder has its words', () => {
    const headings = Object.fromEntries(
      [
        'void',
        'echo',
        'hybrid',
        'reborn',
        'frayed',
        'empty',
        'pacing',
        'tuned',
        'expedition',
        'sky',
        'settled',
        'severed',
      ].map((outcome) => [
        outcome,
        presenter.toViewModel({ ...RECAP, prompt: { ...promptOf(RECAP), outcome } }).heading,
      ]),
    );
    expect(headings).toEqual({
      void: 'The void takes the session',
      echo: 'The signal answered',
      hybrid: 'Something new carried out',
      reborn: 'Reborn',
      frayed: 'Frayed',
      empty: 'Empty-handed',
      pacing: 'Pacing',
      tuned: 'In tune',
      expedition: 'Expedition complete',
      sky: 'Never left the sky',
      settled: 'Settled',
      severed: 'End of session',
    });
  });

  test('below the bedrock: the void’s three typewritten lines, ending "Sleep among the static, Operator." in the abyssal frame (Guide:424-425)', () => {
    const vm = presenter.toViewModel({
      ...RECAP,
      place: { ...placeOf(RECAP), abyssal: true },
      prompt: { ...promptOf(RECAP), outcome: 'void' },
    });
    expect(vm.heading).toBe('The void takes the session');
    expect(vm.lines).toEqual([
      'Your echoes are sinking into the strata.',
      'The web is folding back upon itself.',
      'The v-v-void... it remembers... [OK]',
    ]);
    expect(vm.closing).toBe('Sleep among the static, Operator.');
    expect(vm.frame).toBe('abyssal');
    expect(vm.status).toBe('The void takes the session');
  });

  test('the trace the recap opened with becomes the levels of the way back up, torn as coherence has fallen; none when the engine handed none', () => {
    expect(presenter.toViewModel(RECAP).levels).toEqual([]);
    const vm = presenter.toViewModel({
      ...RECAP,
      trace: {
        steps: [
          traceStep({ depth: 0, address: '0' }),
          traceStep({
            depth: 1,
            icon: '⌂',
            kind: 'Building',
            name: 'Ornate Sanctum',
            address: '0.0',
            glyph: 'building',
            current: true,
          }),
        ],
      },
    });
    expect(vm.levels.map((level) => [level.kind, level.name, level.into])).toEqual([
      ['Universe', 'The Endless Universe', '0.0'],
      ['Building', 'Ornate Sanctum', ''],
    ]);
    expect(vm.levels.map((level) => level.drawing.frame().decay)).toEqual([0.1, 0.1]);
  });

  test('the status a reader hears: the engine says nothing when the recap opens, so the live region gets the heading of the ending', () => {
    expect(presenter.toViewModel(RECAP).status).toBe('Expedition complete');
    expect(presenter.toViewModel(RECAP).note).toBe('');
    expect(presenter.toViewModel({ ...RECAP, message: 'Entered Ornate Sanctum.' }).status).toBe(
      'Entered Ornate Sanctum.',
    );
  });

  test('an ending the presenter has no words for is a failed render, not a blank screen', () => {
    expect(() =>
      presenter.toViewModel({ ...RECAP, prompt: { id: 'recap', outcome: 'rapture', figures: {} } }),
    ).toThrow(/rapture/);
  });
});
