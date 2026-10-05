import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { must, realRegistry, toStreet } from '#tests/support/world.ts';

/**
 * Seed 0000-0005-0000-0002: the planet Auraim is atomic and rust, its second pair ancient and monolith; Blackcity is a
 * rebel district; door 9 of its first corridor drew its culture from the second pair and kept the era.
 */
function world() {
  const universe = realRegistry().universe(new Seed(5, 2));
  const chain = toStreet(universe, () => 0);
  const street = must(chain.at(-1));
  const apartment = must(street.children()[0]?.children()[0]?.children()[0]?.children()[8]);
  return {
    universe,
    planet: must(chain[4]),
    country: must(chain[5]),
    city: must(chain[6]),
    street,
    apartment,
    room: must(apartment.children()[0]),
  };
}

describe('VibeFigure — a level’s vibe handed over as data (U05, Decision 14)', () => {
  const at = world();

  test('above the planet nothing is held', () => {
    expect(at.universe.vibeFigure()).toEqual({ held: 'none' });
  });

  test('the planet holds its main and second pairs and their stability, and no trait yet', () => {
    expect(at.planet.name()).toBe('Rustir');
    expect(at.planet.vibeFigure()).toEqual({
      held: 'planet',
      main: { era: 'atomic', culture: 'rust' },
      second: { era: 'ancient', culture: 'monolith' },
      stability: 0.85,
    });
  });

  test('the country adds its trait and shifts the stability', () => {
    expect(at.country.vibeFigure()).toEqual({
      held: 'country',
      main: { era: 'atomic', culture: 'rust' },
      second: { era: 'ancient', culture: 'monolith' },
      stability: 0.9,
      trait: 'Commercial',
      rebel: false,
      drift: { era: false, culture: false },
    });
  });

  test('a rebel district swaps the pairs and says it rebelled; a street under it holds the same pairs, not rebel', () => {
    const city = at.city.vibeFigure();
    expect(city.held === 'country' && city.rebel).toBe(true);
    expect(city.held === 'country' && city.main).toEqual({ era: 'ancient', culture: 'monolith' });
    expect(city.held === 'country' && city.second).toEqual({ era: 'atomic', culture: 'rust' });
    const street = at.street.vibeFigure();
    expect(street.held === 'country' && street.rebel).toBe(false);
    expect(street.held === 'country' && street.main).toEqual({ era: 'ancient', culture: 'monolith' });
  });

  test('an apartment that drew its culture from the second pair holds it and drifts in culture only', () => {
    const apartment = at.apartment.vibeFigure();
    expect(apartment.held === 'country' && apartment.main).toEqual({ era: 'ancient', culture: 'rust' });
    expect(apartment.held === 'country' && apartment.drift).toEqual({ era: false, culture: true });
  });

  test('a room holds its apartment’s vibe', () => {
    expect(at.room.vibeFigure()).toEqual(at.apartment.vibeFigure());
  });
});

describe('the vibe on the cards (U05): the chips a level shows of its vibe', () => {
  const at = world();
  const chips = (place: { facts(): readonly { key: string; value: string }[] }) =>
    place.facts().map((fact) => `${fact.key} ${fact.value}`);

  test('the planet names its second pair as its drift', () => {
    expect(chips(at.planet)).toContain('drift ancient · monolith');
  });

  test('the country shows its stability', () => {
    expect(chips(at.country)).toContain('reading 90.00%');
  });

  test('a rebel district shows the pair it swapped in', () => {
    expect(chips(at.city)).toEqual(['alert ', 'era ancient', 'culture monolith']);
  });

  test('an apartment shows its own pair and what of it drifted', () => {
    expect(chips(at.apartment)).toEqual(['era ancient', 'culture rust', 'drift culture']);
  });

  test('an apartment out of time says so', () => {
    const street = must(toStreet(realRegistry().universe(new Seed(5, 16)), () => 0).at(-1));
    const anomaly = must(street.children()[0]?.children()[0]?.children()[0]?.children()[2]);
    expect(anomaly.facts()).toContainEqual({ key: 'alert', label: 'Temporal anomaly', value: '' });
  });
});
