import type { PoleLevelVM } from '#ui/screens/PoleVM.ts';

/** A pole level for a test: the universe with nothing set, unless the test names what it cares about. */
export function poleLevel(overrides: Partial<PoleLevelVM> = {}): PoleLevelVM {
  return {
    key: '0',
    glyph: 'universe',
    abyssal: false,
    here: false,
    kind: 'Universe',
    name: 'The Endless Universe',
    label: 'Level 00',
    values: { era: '', culture: '', trait: '' },
    current: { era: '', culture: '' },
    rebel: false,
    drift: { era: false, culture: false },
    berth: false,
    tags: [],
    ...overrides,
  };
}

/** A pole level under the country: its three values and its current set. */
export function heldPoleLevel(overrides: Partial<PoleLevelVM> = {}): PoleLevelVM {
  return poleLevel({
    values: { era: 'Atomic', culture: 'Rust', trait: 'Commercial' },
    current: { era: 'Ancient', culture: 'Monolith' },
    ...overrides,
  });
}
