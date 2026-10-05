import { describe, expect, test } from 'vitest';
import { NoPortrait } from '#engine/model/NoPortrait.ts';
import { Seed } from '#engine/rng/Seed.ts';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import { BuildMasthead } from '#ui/BuildMasthead.ts';
import { PassageLevels } from '#ui/screens/PassageLevels.ts';
import { SceneDrawing } from '#ui/screens/SceneDrawing.ts';
import { TitlePresenter } from '#ui/screens/TitlePresenter.ts';
import { playerSummary } from '#tests/support/playerSummary.ts';
import { traceStep } from '#tests/support/traceStep.ts';

const presenter = new TitlePresenter(new BuildMasthead('a1b2c3d'), new PassageLevels(new SceneDrawing()));

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

const NO_WORLD: GameSnapshot = {
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
  descent: null,
};

const NOISE = new Seed(3, 4);
const A_WORLD: GameSnapshot = {
  ...NO_WORLD,
  world: { seed: '1111-1111-2222-2222', name: 'The Endless Universe' },
  options: [option('enter-world', 'e', 'Enter world'), option('reroll', 'r', 'Re-roll')],
  message: 'World 1111-1111-2222-2222 drawn.',
  descent: {
    noise: NOISE,
    trace: {
      steps: [
        traceStep({ depth: 0, address: '0' }),
        traceStep({
          depth: 1,
          icon: '»',
          kind: 'Cosmic filament',
          name: 'Zeta-915-Link',
          address: '0.0',
          glyph: 'filament',
        }),
        traceStep({
          depth: 2,
          icon: '═',
          kind: 'Street',
          name: 'Vesper Row',
          address: '0.0.0',
          glyph: 'street',
          current: true,
        }),
      ],
    },
  },
};

describe('TitlePresenter.toViewModel', () => {
  test('no world yet: the screen invites, with the one option to lead', () => {
    const vm = presenter.toViewModel(NO_WORLD);
    expect(vm.world).toBeNull();
    expect(vm.prompt).toMatch(/no world/i);
    expect(vm.options).toEqual([{ id: 'new-world', key: 'N', label: 'New world', opposite: '', lead: true }]);
    expect(vm.enters).toBe('');
    expect(vm.status).toBe('');
  });

  test('a world: its seed and name pass through, the way down becomes a level each with its words, entering leads and plays the passage', () => {
    const vm = presenter.toViewModel(A_WORLD);
    expect(vm.world?.seed).toBe('1111-1111-2222-2222');
    expect(vm.world?.name).toBe('The Endless Universe');
    expect(vm.world?.noise).toBe(NOISE);
    expect(vm.world?.levels.map((level) => [level.kind, level.name, level.icon, level.into])).toEqual([
      ['Universe', 'The Endless Universe', '∞', '0.0'],
      ['Cosmic filament', 'Zeta-915-Link', '»', '0.0.0'],
      ['Street', 'Vesper Row', '═', ''],
    ]);
    expect(vm.options.map((each) => [each.id, each.label, each.lead])).toEqual([
      ['enter-world', 'Enter world', true],
      ['reroll', 'Re-roll', false],
    ]);
    expect(vm.enters).toBe('enter-world');
    expect(vm.status).toBe('World 1111-1111-2222-2222 drawn.');
  });

  test('the game’s name and the build stamp are the masthead’s — handed in, the engine never sees them', () => {
    const vm = presenter.toViewModel(NO_WORLD);
    expect(vm.title).toBe('ENDLESS TRANSIT');
    expect(vm.build).toBe('build a1b2c3d');
  });

  test('the title is the screen of a snapshot without a place — and only of that one', () => {
    expect(presenter.accepts(NO_WORLD)).toBe(true);
    expect(presenter.toViewModel(NO_WORLD).scene).toBe('title');
    const place: PlaceSummary = {
      kind: 'Universe',
      icon: '∞',
      name: 'The Endless Universe',
      address: '0',
      position: { counted: false },
      trail: [],
      status: '',
      description: [],
      facts: [],
      frame: null,
      childrenHeading: '',
      contents: null,
      telemetry: null,
      lattice: null,
      portrait: new NoPortrait(),
      noise: new Seed(0, 0),
      abyssal: false,
    };
    expect(presenter.accepts({ ...NO_WORLD, place, player: playerSummary() })).toBe(false);
  });
});
