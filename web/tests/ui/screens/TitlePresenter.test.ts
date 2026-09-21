import { describe, expect, test } from 'vitest';
import { TitlePresenter } from '#ui/screens/TitlePresenter.ts';

const presenter = new TitlePresenter();

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
    expect(vm.status).toBe('');
  });

  test('a world: name, seed and the engine message pass through; labels are upper-cased for the terminal look', () => {
    const vm = presenter.toViewModel({
      world: { seed: '1111-1111-2222-2222', name: 'Hollow Reach' },
      options: [{ id: 'reroll', key: 'r', label: 'Re-roll' }],
      message: 'World 1111-1111-2222-2222 drawn.',
    });
    expect(vm.world).toEqual({ seed: '1111-1111-2222-2222', name: 'HOLLOW REACH' });
    expect(vm.options).toEqual([{ id: 'reroll', key: 'R', label: 'RE-ROLL' }]);
    expect(vm.status).toBe('World 1111-1111-2222-2222 drawn.');
  });

  test('the view-model is plain data', () => {
    const vm = presenter.toViewModel({ world: null, options: [], message: '' });
    expect(JSON.parse(JSON.stringify(vm))).toEqual(vm);
  });
});
