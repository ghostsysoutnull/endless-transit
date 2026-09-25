import { describe, expect, test } from 'vitest';
import type { GameOption } from '#engine/rules/GameOption.ts';
import { Masthead } from '#ui/Masthead.ts';
import { TitlePresenter } from '#ui/screens/TitlePresenter.ts';

const presenter = new TitlePresenter(new Masthead('a1b2c3d'));

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

describe('TitlePresenter.toViewModel', () => {
  test('no world yet: the screen invites, and carries the option as data', () => {
    const vm = presenter.toViewModel({
      world: null,
      place: null,
      player: null,
      buffer: null,
      prompt: null,
      options: [option('new-world', 'n', 'New world')],
      message: '',
      scan: null,
      map: null,
      trace: null,
    });
    expect(vm.world).toBeNull();
    expect(vm.options).toEqual([{ id: 'new-world', key: 'N', label: 'NEW WORLD', opposite: '' }]);
    expect(vm.prompt).toMatch(/no world/i);
    expect(vm.stageLine).toBe('AWAITING SEED');
    expect(vm.status).toBe('');
  });

  test('a world: name, seed and the engine message pass through; labels are upper-cased for the terminal look', () => {
    const vm = presenter.toViewModel({
      world: { seed: '1111-1111-2222-2222', name: 'Hollow Reach' },
      place: null,
      player: null,
      buffer: null,
      prompt: null,
      options: [option('reroll', 'r', 'Re-roll')],
      message: 'World 1111-1111-2222-2222 drawn.',
      scan: null,
      map: null,
      trace: null,
    });
    expect(vm.world).toEqual({
      nameLabel: 'UNIVERSE',
      name: 'HOLLOW REACH',
      seedLabel: 'SEED',
      seed: '1111-1111-2222-2222',
    });
    expect(vm.stageLine).toBe('WORLD LOCKED');
    expect(vm.options).toEqual([{ id: 'reroll', key: 'R', label: 'RE-ROLL', opposite: '' }]);
    expect(vm.status).toBe('World 1111-1111-2222-2222 drawn.');
  });

  test('every word on the screen is carried by the view-model, region names for screen readers included', () => {
    const vm = presenter.toViewModel({
      world: null,
      place: null,
      player: null,
      buffer: null,
      prompt: null,
      options: [],
      message: '',
      scan: null,
      map: null,
      trace: null,
    });
    expect(vm.title).toBe('ENDLESS TRANSIT');
    expect(vm.regions).toEqual({ stage: 'Uplink', world: 'World', actions: 'Actions' });
  });

  test('the build stamp names the build the page was made from — handed in, the engine never sees it', () => {
    expect(
      presenter.toViewModel({
        world: null,
        place: null,
        player: null,
        buffer: null,
        prompt: null,
        options: [],
        message: '',
        scan: null,
        map: null,
        trace: null,
      }).build,
    ).toBe('build a1b2c3d');
    expect(
      new TitlePresenter(new Masthead('dev')).toViewModel({
        world: null,
        place: null,
        player: null,
        buffer: null,
        prompt: null,
        options: [],
        message: '',
        scan: null,
        map: null,
        trace: null,
      }).build,
    ).toBe('build dev');
  });

  test('the title is the screen of a snapshot without a place — and only of that one', () => {
    const atTitle = {
      world: null,
      place: null,
      player: null,
      buffer: null,
      prompt: null,
      options: [],
      message: '',
      scan: null,
      map: null,
      trace: null,
    };
    expect(presenter.accepts(atTitle)).toBe(true);
    expect(presenter.toViewModel(atTitle).scene).toBe('title');
    const place = {
      kind: 'Universe',
      icon: '∞',
      name: 'The Endless Universe',
      address: '0',
      position: null,
      trail: [],
      status: '',
      description: [],
      facts: [],
      frame: null,
      childrenHeading: '',
      contents: null,
      telemetry: null,
      lattice: null,
      abyssal: false,
    };
    expect(
      presenter.accepts({ ...atTitle, place, player: { coherence: 100, band: 'stable', steps: 0 } }),
    ).toBe(false);
  });

  test('the view-model is plain data', () => {
    const vm = presenter.toViewModel({
      world: null,
      place: null,
      player: null,
      buffer: null,
      prompt: null,
      options: [],
      message: '',
      scan: null,
      map: null,
      trace: null,
    });
    expect(JSON.parse(JSON.stringify(vm))).toEqual(vm);
  });
});
