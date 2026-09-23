import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Building } from '#engine/model/Building.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const library = new ContentLibrary(new BundledContent());
const ZONES = 'names/floors/zones';
const BASEMENT = library.list(`${ZONES}/basement`);
const LIVING = library.list(`${ZONES}/living`);
const EXECUTIVE = library.list(`${ZONES}/executive`);

/** The first building of the first street under `n`, with its floors. */
function buildingOf(n: number): { building: Building; floors: Floor[] } {
  const street = must(toStreet(registry.universe(sampleSeed(n)), () => n).at(-1));
  const building = must(street.children()[n % street.children().length]);
  if (!(building instanceof Building)) throw new Error('a street holds buildings');
  const floors = building
    .children()
    .slice(0, building.floors())
    .map((floor) => {
      if (!(floor instanceof Floor)) throw new Error('a building holds floors');
      return floor;
    });
  return { building, floors };
}

const sample = Array.from({ length: 400 }, (_, n) => buildingOf(n));

/** What zone list a floor of this height draws from (Guide:356-360; Building.groovy:78-91). */
function tierOf(number: number, floors: number): readonly string[] {
  if (number === 0) return ['TRANSIT_LOBBY'];
  if (number === floors - 1) return ['PEAK_OBSERVATORY'];
  if (number < 5) return BASEMENT;
  if (number > floors - 5) return EXECUTIVE;
  return LIVING;
}

describe('floors of a building', () => {
  test('a building holds exactly as many floors as it says, floor n at child n, each floor one corridor', () => {
    for (const { building, floors } of sample) {
      expect(floors).toHaveLength(building.floors());
      expect(floors.map((floor) => floor.number())).toEqual(floors.map((_floor, number) => number));
      expect(floors.map((floor) => floor.index())).toEqual(floors.map((_floor, number) => number));
    }
    const corridor: Location = must(sample[0]?.floors[0]).corridor();
    expect(corridor.kind().key()).toBe('corridor');
    expect(must(sample[0]?.floors[0]).children()).toHaveLength(1);
  });

  test('zones by height: lobby at 0, peak at the top, basement names 1–4, executive names up to three under the top, living names between', () => {
    const seen = { basement: new Set<string>(), living: new Set<string>(), executive: new Set<string>() };
    for (const { building, floors } of sample) {
      for (const floor of floors) {
        const tier = tierOf(floor.number(), building.floors());
        expect(tier, `${building.name()} floor ${String(floor.number())}`).toContain(floor.zone());
        if (tier === BASEMENT) seen.basement.add(floor.zone());
        if (tier === LIVING) seen.living.add(floor.zone());
        if (tier === EXECUTIVE) seen.executive.add(floor.zone());
      }
    }
    expect([...seen.basement].sort()).toEqual([...BASEMENT].sort());
    expect([...seen.living].sort()).toEqual([...LIVING].sort());
    expect([...seen.executive].sort()).toEqual([...EXECUTIVE].sort());
    expect(BASEMENT).toHaveLength(4);
    expect(LIVING).toHaveLength(4);
    expect(EXECUTIVE).toHaveLength(4);
  });

  test('nine floors: lobby, four basement, three executive, peak — the first height with all three executive floors (Guide:358); ten floors have one living floor', () => {
    const nine = sample.find(({ building }) => building.floors() === 9);
    expect(nine).toBeDefined();
    const tiers = (floors: readonly Floor[]) =>
      floors.map((floor) => floor.zone()).map((zone) => (LIVING.includes(zone) ? 'living' : 'other'));
    expect(tiers(nine?.floors ?? [])).toEqual([
      'other',
      'other',
      'other',
      'other',
      'other',
      'other',
      'other',
      'other',
      'other',
    ]);
    // Floor 4 of nine is basement (under 5); floor 5 is executive (over 9 − 5): no floor is between.
    expect(nine?.floors.map((floor) => floor.callSign())).toEqual([
      'Lobby',
      'Floor 1',
      'Floor 2',
      'Floor 3',
      'Floor 4',
      'Floor 5',
      'Floor 6',
      'Floor 7',
      'Peak',
    ]);
    const ten = must(sample.find(({ building }) => building.floors() === 10));
    expect(tiers(ten.floors)).toEqual([
      'other',
      'other',
      'other',
      'other',
      'other',
      'living',
      'other',
      'other',
      'other',
      'other',
    ]);
  });

  test('resonance on the building’s list is 1000–2999 Hz and both ends are reached (Building.groovy:215-216)', () => {
    const readings = sample.flatMap(({ floors }) => floors.map((floor) => floor.resonance()));
    expect(readings.length).toBeGreaterThan(5_000);
    expect(Math.min(...readings)).toBe(1000);
    expect(Math.max(...readings)).toBe(2999);
    expect(
      must(sample[3]?.floors[2])
        .readings()
        .map((fact) => fact.label),
    ).toEqual(['FUNCTION', 'ST', 'RES']);
  });

  test('the elevator diagnostic suite of a real floor: era, culture, stability as a percentage, the country’s trait', () => {
    const { building, floors } = must(sample[7]);
    const vibe = must(building.vibe());
    expect(must(floors[1]).facts()).toEqual([
      { key: 'era', label: 'TECH_ERA', value: vibe.era().key() },
      { key: 'culture', label: 'RESONANCE', value: vibe.culture().key() },
      { key: 'reading', label: 'STABILITY', value: `${(vibe.stability() * 100).toFixed(2)}%` },
      { key: 'trait', label: 'ATMOS_SHIFT', value: must(vibe.mutation()).key() },
    ]);
    expect(must(floors[1]).description()[0]).toMatch(/^Floor 1\. .*[a-z.]$/);
    expect(must(floors[1]).description()[0]).toContain(vibe.culture().key().toUpperCase());
    expect(must(floors[1]).corridor().status()).toBe(
      `TRAFFIC: [STABLE] | THEME: [${vibe.culture().key().toUpperCase()}]`,
    );
  });
});
