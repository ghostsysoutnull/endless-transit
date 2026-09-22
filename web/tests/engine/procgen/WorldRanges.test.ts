import { describe, expect, test } from 'vitest';
import type { Location } from '#engine/model/Location.ts';
import { descend, must, realRegistry, sampleSeed } from '#tests/support/world.ts';

/**
 * Every range the big world lives by, checked over many seeds. Sources: the Player's Guide
 * (`docs/terminal/guide/players_guide.md`, "Where to go", "Reading the screen") where it states a number,
 * the Groovy factories (`terminal/…/procgen/*Factory.groovy`) for the rest.
 */
const CHILDREN: Readonly<Record<string, readonly [number, number]>> = {
  universe: [3, 7], // UniverseFactory.groovy:30
  filament: [4, 8], // FilamentFactory.groovy:30
  sector: [3, 7], // SectorFactory.groovy:30
  'null-reach': [1, 2], // Guide :297 "only one or two solar systems"; NullSectorFactory.groovy:31
  'solar-system': [2, 10], // SolarSystemFactory.groovy:30
  planet: [2, 8], // PlanetFactory.groovy:65
  country: [2, 10], // CountryFactory.groovy:41
  city: [3, 15], // CityFactory.groovy:45
  street: [4, 20], // StreetFactory.groovy:30 — 2 to 10 pairs
};

const registry = realRegistry();
const SEEDS = 400;

/** One chain per seed, the branch taken at each level varying with the seed number. */
function chains(): Location[][] {
  return Array.from({ length: SEEDS }, (_, n) =>
    descend(registry.universe(sampleSeed(n)), (_children, depth) => n * 7 + depth * 3 + (n >> depth)),
  );
}

function share(items: readonly Location[], matches: (item: Location) => boolean): number {
  return items.filter(matches).length / items.length;
}

describe('how many children each level has', () => {
  const seen = new Map<string, Set<number>>();
  for (const chain of chains()) {
    for (const location of chain) {
      const counts = seen.get(location.kind().key()) ?? new Set<number>();
      counts.add(location.children().length);
      seen.set(location.kind().key(), counts);
    }
  }

  test.each(Object.entries(CHILDREN))(
    '%s: always inside its range, and both ends are reached',
    (kind, [min, max]) => {
      const counts = [...(seen.get(kind) ?? [])];
      expect(counts.length).toBeGreaterThan(0);
      expect(Math.min(...counts)).toBe(min);
      expect(Math.max(...counts)).toBe(max);
    },
  );

  test('a street has buildings in pairs — an even number, always', () => {
    expect([...(seen.get('street') ?? [])].every((count) => count % 2 === 0)).toBe(true);
  });

  test('every chain runs universe → filament → sector or null reach → solar system → planet → country → city → street', () => {
    for (const chain of chains()) {
      const kinds = chain.map((location) => location.kind().key());
      expect(kinds[2] === 'sector' || kinds[2] === 'null-reach', kinds.join('>')).toBe(true);
      kinds[2] = 'sector';
      expect(kinds).toEqual([
        'universe',
        'filament',
        'sector',
        'solar-system',
        'planet',
        'country',
        'city',
        'street',
      ]);
    }
  });
});

describe('what the Guide promises about the big world', () => {
  const universes = Array.from({ length: SEEDS }, (_, n) => registry.universe(sampleSeed(n)));
  const nodes = universes.flatMap((universe) =>
    universe.children().flatMap((filament) => filament.children()),
  );
  const firstOpen = (location: Location): Location[] => descend(location, () => 0);

  test('about 30% of filament nodes are Null Reaches (Guide, "Null Reaches")', () => {
    expect(nodes.length).toBeGreaterThan(5_000);
    const nullShare = share(nodes, (node) => node.kind().key() === 'null-reach');
    expect(nullShare).toBeGreaterThan(0.27);
    expect(nullShare).toBeLessThan(0.33);
  });

  test('a Null Reach has no coordinates: its hash reads 0x0000 / UNKNOWN (NullSector.groovy:33); every other place has a pair', () => {
    for (const node of nodes.slice(0, 500)) {
      expect(node.hash(), node.name()).toEqual(
        node.kind().key() === 'null-reach'
          ? '0x0000 / UNKNOWN'
          : expect.stringMatching(/^\d{1,2}\.\d{3} \/ \d{1,2}\.\d{3}$/),
      );
    }
  });

  test('one city in ten is a rebel district, and it swaps the planet’s cultures and eras (Guide, "Rebel districts")', () => {
    const planets = universes
      .map((universe) => firstOpen(universe)[4])
      .filter((planet) => planet !== undefined);
    const cities = planets.flatMap((planet) => planet.children().flatMap((country) => country.children()));
    expect(cities.length).toBeGreaterThan(5_000);
    const rebels = cities.filter((city) => city.facts().some((fact) => fact.key === 'alert'));
    expect(rebels.length / cities.length).toBeGreaterThan(0.08);
    expect(rebels.length / cities.length).toBeLessThan(0.12);
    for (const city of cities) {
      const above = city.parent()?.vibe();
      const swapped = rebels.includes(city);
      expect(city.vibe()?.culture()).toBe(swapped ? above?.secondCulture() : above?.culture());
      expect(city.vibe()?.era()).toBe(swapped ? above?.secondEra() : above?.era());
      expect(city.vibe()?.frame()).toBe(above?.frame());
    }
  });

  test('planets: nine surface cultures and eight eras, all reached; the second culture and era always differ from the first', () => {
    const planets = universes.flatMap((universe) => firstOpen(universe)[3]?.children() ?? []);
    expect(planets.length).toBeGreaterThan(1_500);
    const cultures = new Set(planets.map((planet) => planet.vibe()?.culture().key()));
    const eras = new Set(planets.map((planet) => planet.vibe()?.era().key()));
    expect([...cultures].sort()).toEqual([
      'baroque',
      'gilded',
      'monolith',
      'neon',
      'organic',
      'rust',
      'shogun',
      'void',
      'zenith',
    ]);
    expect(eras.size).toBe(8);
    for (const planet of planets) {
      const vibe = planet.vibe();
      expect(vibe?.secondCulture().equals(vibe.culture())).toBe(false);
      expect(vibe?.secondEra().equals(vibe.era())).toBe(false);
      expect(vibe?.stability()).toBe(0.85);
      expect(vibe?.mutation()).toBeUndefined();
    }
    expect(firstOpen(must(universes[0]))[3]?.vibe()).toBeUndefined();
  });

  test('countries: six traits, all reached; stability lands between 75% and 90% (Guide, "ATMOS_SHIFT and Sector Mutation")', () => {
    const countries = universes.flatMap((universe) => firstOpen(universe)[4]?.children() ?? []);
    expect(countries.length).toBeGreaterThan(1_500);
    const traits = new Set(countries.map((country) => country.vibe()?.mutation()?.key()));
    expect([...traits].sort()).toEqual([
      'Agricultural',
      'Ceremonial',
      'Commercial',
      'Industrial',
      'Military',
      'Research',
    ]);
    const stabilities = countries.map((country) => country.vibe()?.stability() ?? -1);
    // Both ends are reached, exactly: 0.85 − 0.100 at the bottom; at the top every shift from +0.050 up is held at 0.9.
    expect(Math.min(...stabilities)).toBe(0.75);
    expect(Math.max(...stabilities)).toBe(0.9);
    expect(stabilities.filter((stability) => stability === 0.9).length / stabilities.length).toBeGreaterThan(
      0.2,
    );
    expect(new Set(stabilities).size).toBeGreaterThan(50);
  });
});
