import { describe, expect, test } from 'vitest';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { Masthead } from '#ui/Masthead.ts';
import { RebootPresenter } from '#ui/screens/RebootPresenter.ts';

const presenter = new RebootPresenter(new Masthead('a1b2c3d'));

const DEAD: GameSnapshot = {
  world: { seed: '7F3A-91C2-0B4D-E6A8', name: 'The Endless Universe' },
  place: null,
  player: { coherence: 0, band: 'critical', steps: 12 },
  buffer: { size: 0, capacity: 16, resonant: 0, fragments: [] },
  prompt: { id: 'reboot', outcome: 'rebooting', figures: {} },
  options: [
    {
      id: 'reboot',
      key: '',
      label: 'Rebuild',
      place: '',
      role: 'system',
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

describe('RebootPresenter — what zero coherence puts on screen (Guide:144-147)', () => {
  test('it is the screen of the reboot prompt and of nothing else', () => {
    expect(presenter.accepts(DEAD)).toBe(true);
    expect(presenter.accepts({ ...DEAD, prompt: null })).toBe(false);
    expect(presenter.accepts({ ...DEAD, prompt: { id: 'recap', outcome: 'severed', figures: {} } })).toBe(
      false,
    );
  });

  test('every word is the presenter’s: the old game’s line, what the reboot keeps and undoes, one button', () => {
    const vm = presenter.toViewModel(DEAD);
    expect(vm.scene).toBe('reboot');
    expect(vm.frame).toBe('dead');
    expect(vm.title).toBe('ENDLESS TRANSIT');
    expect(vm.stageLine).toBe('NEURAL LINK LOST');
    expect(vm.eyebrow).toBe('COHERENCE 0%');
    expect(vm.headline).toBe('!!! CRITICAL_COHERENCE_FAILURE !!!');
    expect(vm.line).toBe('REBOOTING...');
    expect(vm.explanation).toContain('same seed');
    expect(vm.explanation).toContain('starting street');
    expect(vm.options).toEqual([{ id: 'reboot', key: '', label: 'REBUILD', opposite: '' }]);
    expect(vm.build).toBe('build a1b2c3d');
    expect(vm.regions).toEqual({ stage: 'Uplink', notice: 'Link failure', actions: 'Actions' });
    expect(JSON.parse(JSON.stringify(vm))).toEqual(vm);
  });

  test('the status a reader hears: the engine says nothing at death, so the live region gets the headline; a message when there is one', () => {
    expect(presenter.toViewModel(DEAD).status).toBe('!!! CRITICAL_COHERENCE_FAILURE !!!');
    expect(presenter.toViewModel(DEAD).note).toBe('');
    expect(
      presenter.toViewModel({ ...DEAD, message: 'Restored world 7F3A-91C2-0B4D-E6A8 at Room 1.' }).status,
    ).toBe('Restored world 7F3A-91C2-0B4D-E6A8 at Room 1.');
  });
});
