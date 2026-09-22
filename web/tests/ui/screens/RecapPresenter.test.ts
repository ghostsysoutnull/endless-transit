import { describe, expect, test } from 'vitest';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { Masthead } from '#ui/Masthead.ts';
import { RecapPresenter } from '#ui/screens/RecapPresenter.ts';

const presenter = new RecapPresenter(new Masthead('a1b2c3d'));

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
  };
}

const RECAP: GameSnapshot = {
  world: { seed: '7F3A-91C2-0B4D-E6A8', name: 'The Endless Universe' },
  place: {
    kind: 'Building',
    icon: '⌂',
    name: 'Ornate Sanctum',
    address: '0.0.0.0.0.0.0.0.0',
    hash: '1.000 / 2.000',
    depth: 8,
    position: null,
    trail: [],
    status: '',
    description: [],
    facts: [],
    frame: 'yellow',
    childrenHeading: '',
    contents: null,
    telemetry: null,
  },
  player: { coherence: 61, band: 'degraded', steps: 33 },
  prompt: {
    id: 'recap',
    outcome: 'expedition',
    figures: { locus: '0.0.0.0.0.0.0.0.0', steps: '33', places: '24' },
  },
  options: [option('resume', 'b', 'Resume'), option('end-session', 'q', 'End session')],
  message: '',
};

describe('RecapPresenter — the endings of a session (Guide:422-430, SessionRecap.groovy:14-69)', () => {
  test('it is the screen of the recap prompt and of nothing else', () => {
    expect(presenter.accepts(RECAP)).toBe(true);
    expect(presenter.accepts({ ...RECAP, prompt: null })).toBe(false);
    expect(presenter.accepts({ ...RECAP, prompt: { id: 'reboot', outcome: 'rebooting', figures: {} } })).toBe(
      false,
    );
  });

  test('twenty places or more: the full recap with its figures, ending "Expedition successful."', () => {
    const vm = presenter.toViewModel(RECAP);
    expect(vm.scene).toBe('recap');
    expect(vm.frame).toBe('yellow');
    expect(vm.heading).toBe('[SESSION_RECAP_INITIALIZED]');
    expect(vm.figures).toEqual([
      { label: 'FINAL_LOCUS', value: '0.0.0.0.0.0.0.0.0' },
      { label: 'PULSE_TRAVERSAL', value: '33 steps' },
      { label: 'CELLS_MAPPED', value: '24 footprints' },
    ]);
    expect(vm.steps).toEqual([]);
    expect(vm.closing).toBe('Expedition successful. Trace synchronized to substrate.');
    expect(vm.options).toEqual([
      { id: 'resume', key: 'B', label: 'RESUME', opposite: '' },
      { id: 'end-session', key: 'Q', label: 'END SESSION', opposite: '' },
    ]);
    expect(vm.regions).toEqual({ recap: 'Session recap', actions: 'Actions' });
    expect(vm.build).toBe('build a1b2c3d');
    expect(JSON.parse(JSON.stringify(vm))).toEqual(vm);
  });

  test('fewer than twenty: four shutdown steps, each done, ending "Neural link severed."', () => {
    const vm = presenter.toViewModel({
      ...RECAP,
      prompt: { id: 'recap', outcome: 'severed', figures: { locus: '0.0', steps: '2', places: '9' } },
    });
    expect(vm.heading).toBe('[LINK_TERMINATION_PROTOCOL]');
    expect(vm.figures).toEqual([]);
    expect(vm.steps).toEqual([
      { label: '[STATUS]', process: 'UNMOUNTING_LATTICE_TRACE...', done: '[DONE]' },
      { label: '[STATUS]', process: 'DEALLOCATING_TRACE_BUFFER...', done: '[DONE]' },
      { label: '[STATUS]', process: 'RELEASING_NEURAL_CARRIER...', done: '[DONE]' },
      { label: '[STATUS]', process: 'STABILIZING_SUBSTRATE_WAVEFORM...', done: '[DONE]' },
    ]);
    expect(vm.closing).toBe('Neural link severed. Waveform stabilized.');
  });

  test('the status a reader hears: the engine says nothing when the recap opens, so the live region gets the heading of the ending', () => {
    expect(presenter.toViewModel(RECAP).status).toBe('[SESSION_RECAP_INITIALIZED]');
    expect(presenter.toViewModel(RECAP).note).toBe('');
    expect(
      presenter.toViewModel({
        ...RECAP,
        prompt: { id: 'recap', outcome: 'severed', figures: { locus: '0.0', steps: '2', places: '9' } },
      }).status,
    ).toBe('[LINK_TERMINATION_PROTOCOL]');
    expect(presenter.toViewModel({ ...RECAP, message: 'Entered Ornate Sanctum.' }).status).toBe(
      'Entered Ornate Sanctum.',
    );
  });

  test('an ending the presenter has no words for is a failed render, not a blank screen', () => {
    expect(() =>
      presenter.toViewModel({ ...RECAP, prompt: { id: 'recap', outcome: 'void', figures: {} } }),
    ).toThrow(/void/);
  });
});
