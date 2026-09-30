import { describe, expect, test } from 'vitest';
import { NoPortrait } from '#engine/model/NoPortrait.ts';
import type { TraceStep } from '#engine/rules/TraceStep.ts';
import { PolePresenter } from '#ui/screens/PolePresenter.ts';

const MAIN = { era: 'atomic', culture: 'rust' };
const SECOND = { era: 'ancient', culture: 'monolith' };

/** A traced level with nothing of its own: tests say only what they are about. */
function step(overrides: Partial<TraceStep> = {}): TraceStep {
  return {
    depth: 0,
    icon: '∞',
    kind: 'Universe',
    name: 'The Endless Universe',
    current: false,
    abyssal: false,
    address: '0',
    portrait: new NoPortrait(),
    children: [],
    facts: [],
    words: '',
    scale: '10²⁶ m',
    glyph: 'universe',
    vibe: { held: 'none' },
    signs: [],
    ...overrides,
  };
}

const country = (rebel: boolean, drift: { era: boolean; culture: boolean }) =>
  ({
    held: 'country',
    main: MAIN,
    second: SECOND,
    stability: 0.9,
    trait: 'Commercial',
    rebel,
    drift,
  }) as const;

describe('PolePresenter — the pole’s words, read from the vibe the engine handed over (U05)', () => {
  const pole = (steps: readonly TraceStep[]) => new PolePresenter().of({ steps });

  test('above the planet no value is set; the planet sets era and culture and its current, not yet a trait', () => {
    const [universe, planet] = pole([
      step(),
      step({
        depth: 4,
        kind: 'Planet',
        name: 'Auraim',
        glyph: 'planet',
        scale: '10⁷ m',
        vibe: { held: 'planet', main: MAIN, second: SECOND, stability: 0.85 },
      }),
    ]).levels;
    expect(universe?.values).toEqual({ era: '', culture: '', trait: '' });
    expect(universe?.current).toBe('');
    expect(planet?.values).toEqual({ era: 'Atomic', culture: 'Rust', trait: '' });
    expect(planet?.current).toBe('Ancient · Monolith');
    expect(planet?.berth).toBe(true);
    expect(universe?.berth).toBe(false);
  });

  test('a rebel district is tagged rebel; a drifted apartment is tagged drift, then its own states', () => {
    const [city, apartment] = pole([
      step({ glyph: 'city', vibe: country(true, { era: false, culture: false }) }),
      step({
        glyph: 'apartment',
        vibe: country(false, { era: false, culture: true }),
        signs: [{ look: 'door', word: 'cold' }],
      }),
    ]).levels;
    expect(city?.rebel).toBe(true);
    expect(city?.tags.map((tag) => tag.look)).toEqual(['rebel']);
    expect(city?.values.trait).toBe('Commercial');
    expect(apartment?.drift).toEqual({ era: false, culture: true });
    expect(apartment?.tags).toEqual([
      { word: 'drift', look: 'drift' },
      { word: 'cold', look: 'door' },
    ]);
  });

  test('each row’s button says the level, its vibe, its tags and where you are', () => {
    const [here] = pole([
      step({
        depth: 11,
        kind: 'Apartment',
        name: 'Cold door',
        current: true,
        glyph: 'apartment',
        vibe: country(false, { era: false, culture: true }),
      }),
    ]).levels;
    expect(here?.label).toBe(
      'Level 11, Apartment: Cold door, era Atomic, culture Rust, trait Commercial, drift, you are here',
    );
  });
});
