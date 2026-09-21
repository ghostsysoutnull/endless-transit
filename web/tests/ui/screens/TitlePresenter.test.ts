import { describe, expect, test } from 'vitest';
import { TitlePresenter } from '#ui/screens/TitlePresenter.ts';

const presenter = new TitlePresenter('a1b2c3d');

describe('TitlePresenter.toViewModel', () => {
  test('no world yet: the screen invites, and carries the option as data', () => {
    const vm = presenter.toViewModel({
      world: null,
      options: [{ id: 'new-world', key: 'n', label: 'New world' }],
      message: '',
    });
    expect(vm.world).toBeNull();
    expect(vm.options).toEqual([{ id: 'new-world', key: 'N', label: 'NEW WORLD' }]);
    expect(vm.prompt).toMatch(/no world/i);
    expect(vm.stageLine).toBe('AWAITING SEED');
    expect(vm.status).toBe('');
  });

  test('a world: name, seed and the engine message pass through; labels are upper-cased for the terminal look', () => {
    const vm = presenter.toViewModel({
      world: { seed: '1111-1111-2222-2222', name: 'Hollow Reach' },
      options: [{ id: 'reroll', key: 'r', label: 'Re-roll' }],
      message: 'World 1111-1111-2222-2222 drawn.',
    });
    expect(vm.world).toEqual({
      nameLabel: 'UNIVERSE',
      name: 'HOLLOW REACH',
      seedLabel: 'SEED',
      seed: '1111-1111-2222-2222',
    });
    expect(vm.stageLine).toBe('WORLD LOCKED');
    expect(vm.options).toEqual([{ id: 'reroll', key: 'R', label: 'RE-ROLL' }]);
    expect(vm.status).toBe('World 1111-1111-2222-2222 drawn.');
  });

  test('every word on the screen is carried by the view-model, region names for screen readers included', () => {
    const vm = presenter.toViewModel({ world: null, options: [], message: '' });
    expect(vm.title).toBe('ENDLESS TRANSIT');
    expect(vm.regions).toEqual({ stage: 'Uplink', world: 'World', actions: 'Actions' });
  });

  test('the build stamp names the build the page was made from — handed in, the engine never sees it', () => {
    expect(presenter.toViewModel({ world: null, options: [], message: '' }).build).toBe('build a1b2c3d');
    expect(new TitlePresenter('dev').toViewModel({ world: null, options: [], message: '' }).build).toBe(
      'build dev',
    );
  });

  test('the view-model is plain data', () => {
    const vm = presenter.toViewModel({ world: null, options: [], message: '' });
    expect(JSON.parse(JSON.stringify(vm))).toEqual(vm);
  });
});
