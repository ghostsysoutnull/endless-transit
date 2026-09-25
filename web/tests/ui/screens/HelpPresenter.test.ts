import { describe, expect, test } from 'vitest';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { Masthead } from '#ui/Masthead.ts';
import { HelpPresenter } from '#ui/screens/HelpPresenter.ts';

const presenter = new HelpPresenter(new Masthead('a1b2c3d'));

const HELP: GameSnapshot = {
  world: { seed: '7F3A-91C2-0B4D-E6A8', name: 'The Endless Universe' },
  place: {
    kind: 'Street',
    icon: '═',
    name: 'Bright Boulevard',
    address: '0.0.0.0.0.0.0.0',
    position: { label: 'WAY', index: 1, total: 8 },
    trail: [],
    status: 'SYNC: [STABLE]',
    description: [],
    facts: [],
    frame: 'yellow',
    abyssal: false,
    childrenHeading: 'Buildings on this street:',
    contents: null,
    telemetry: null,
    lattice: null,
  },
  player: { coherence: 85, band: 'stable', steps: 14 },
  buffer: { size: 0, capacity: 16, resonant: 0, fragments: [] },
  prompt: { id: 'help', outcome: '', figures: {} },
  options: [
    {
      id: 'close',
      key: 'b',
      label: 'Back to the world',
      place: '',
      role: 'return',
      sealed: false,
      landmark: false,
      ordinal: '',
      readings: [],
      opposite: '',
      current: false,
      visited: false,
    },
  ],
  message: '',
  scan: null,
  map: null,
  trace: null,
};

describe('HelpPresenter — the help screen (Guide:96; I09)', () => {
  test('it claims the help prompt and nothing else', () => {
    expect(presenter.accepts(HELP)).toBe(true);
    expect(presenter.accepts({ ...HELP, prompt: { id: 'buffer', outcome: '', figures: {} } })).toBe(false);
    expect(presenter.accepts({ ...HELP, prompt: null })).toBe(false);
    expect(() => presenter.toViewModel({ ...HELP, prompt: null })).toThrow(/help/);
  });

  test('the manual: a heading, a lead, one entry per button in two groups, the survival rules, the keys line, the way back as the dock; the frame is the place’s', () => {
    const vm = presenter.toViewModel(HELP);
    expect(vm.scene).toBe('help');
    expect(vm.frame).toBe('yellow');
    expect(vm.heading).toBe('[OPERATOR_MANUAL]');
    expect(vm.lead).toMatch(/Every tap is a prompt; every prompt costs Coherence/);
    expect(vm.sections.map((section) => section.heading)).toEqual(['MOVING', 'THE DOCK']);
    expect(vm.sections[0]?.entries.map((entry) => entry.term)).toEqual([
      'A listed place',
      '▲ LEAVE',
      'GO UP · GO DOWN',
      'ENTER CORRIDOR · BACK TO ELEVATOR',
      'GO FORWARD · GO BACK',
      'An object',
    ]);
    // Every dock button of the world screen has its line, in the dock's order, MORE last.
    expect(vm.sections[1]?.entries.map((entry) => entry.term)).toEqual([
      'SCAN',
      'MAP',
      'BUFFER',
      'TRACE',
      'HELP',
      'TITLE SCREEN',
      'END SESSION',
      'MORE',
    ]);
    expect(vm.sections[1]?.entries[2]?.what).toMatch(/15 Coherence/);
    expect(vm.survival.heading).toBe('HOW NOT TO DIE');
    // The Guide's numbers (Guide:133-156): 1 per prompt, 2 entropic, 2 below the bedrock, 4 both; +15 a merge; 40 and 30; 100 at the reboot; 11.
    expect(vm.survival.lines).toHaveLength(5);
    expect(vm.survival.lines[0]).toMatch(/costs 1 Coherence.*costs 2.*costs 2.*both at once 4/);
    expect(vm.survival.lines[1]).toMatch(/15, capped at 100/);
    expect(vm.survival.lines[2]).toMatch(/Under 40.*Under 30/);
    expect(vm.survival.lines[3]).toMatch(/At 0.*starting street with 100/);
    expect(vm.survival.lines[4]).toMatch(/multiple of 11.*A Keystone never does/);
    expect(vm.keys).toBe('On a keyboard, the letter on a button is its key. A phone needs none.');
    expect(vm.dock).toEqual([{ id: 'close', key: 'B', label: '▲ BACK TO THE WORLD', opposite: '' }]);
    expect(vm.options).toEqual(vm.dock);
    expect(vm.note).toBe('');
    expect(vm.status).toBe('[OPERATOR_MANUAL]');
    expect(vm.build).toBe('build a1b2c3d');
    expect(vm.regions).toEqual({ help: 'Help', actions: 'Back' });
    expect(JSON.parse(JSON.stringify(vm))).toEqual(vm);
  });

  test('the engine’s message, when it has one, is the note and the status', () => {
    const vm = presenter.toViewModel({ ...HELP, message: 'x' });
    expect(vm.note).toBe('x');
    expect(vm.status).toBe('x');
  });
});
