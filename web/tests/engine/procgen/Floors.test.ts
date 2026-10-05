import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Building } from '#engine/model/Building.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const library = new ContentLibrary(new BundledContent());
const WORDS = 'names/floors';

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

/** The trait of the country a building stands in: its floors' zones are in that trait's words. */
function traitOf(building: Building): string {
  return must(building.vibe()?.mutation(), 'a building’s trait').key();
}

/** Which part of the floor words a floor of this height draws from (Guide:356-360; Building.groovy:78-91). */
function partOf(number: number, floors: number): string {
  if (number === 0) return 'lobby';
  if (number === floors - 1) return 'peak';
  if (number < 5) return 'zones/basement';
  if (number > floors - 5) return 'zones/executive';
  return 'zones/living';
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

  test('zones by height, in the words of the country’s trait: a lobby word at 0, a peak word at the top, basement words 1–4, executive words up to three under the top, living words between', () => {
    for (const { building, floors } of sample) {
      for (const floor of floors) {
        const part = partOf(floor.number(), building.floors());
        expect(
          library.list(`${WORDS}/${part}/${traitOf(building)}`),
          `${building.name()} floor ${String(floor.number())}`,
        ).toContain(floor.zone());
      }
    }
  });

  test('no two neighbouring floors of a building stand in the same zone', () => {
    expect(sample.some(({ building }) => building.floors() > 40)).toBe(true);
    for (const { building, floors } of sample) {
      const zones = floors.map((floor) => floor.zone());
      for (let number = 1; number < zones.length; number++) {
        expect(
          zones[number],
          `${building.name()} floors ${String(number - 1)} and ${String(number)}`,
        ).not.toBe(zones[number - 1]);
      }
    }
  });

  test('nine floors: lobby, four basement, three executive, peak — the first height with all three executive floors (Guide:358); ten floors have one living floor', () => {
    const nine = sample.find(({ building }) => building.floors() === 9);
    expect(nine).toBeDefined();
    const tiers = ({ building, floors }: { building: Building; floors: readonly Floor[] }) => {
      const living = library.list(`${WORDS}/zones/living/${traitOf(building)}`);
      return floors.map((floor) => (living.includes(floor.zone()) ? 'living' : 'other'));
    };
    expect(tiers(must(nine))).toEqual([
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
    expect(tiers(ten)).toEqual([
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

  test('a floor’s resonance is 1000–2999 Hz and both ends are reached (Building.groovy:215-216; a Layer’s list shows it, a floor’s only its zone since U02)', () => {
    const readings = sample.flatMap(({ floors }) => floors.map((floor) => floor.resonance()));
    expect(readings.length).toBeGreaterThan(5_000);
    expect(Math.min(...readings)).toBe(1000);
    expect(Math.max(...readings)).toBe(2999);
    expect(
      must(sample[3]?.floors[2])
        .readings()
        .map((fact) => fact.label),
    ).toEqual(['Zone']);
  });

  test('the elevator diagnostic suite of a real floor: era, culture, stability as a percentage, the country’s trait', () => {
    const { building, floors } = must(sample[7]);
    const vibe = must(building.vibe());
    expect(must(floors[1]).facts()).toEqual([
      { key: 'era', label: 'Era', value: vibe.era().key() },
      { key: 'culture', label: 'Culture', value: vibe.culture().key() },
      { key: 'reading', label: 'Stability', value: `${(vibe.stability() * 100).toFixed(2)}%` },
      { key: 'trait', label: 'Trait', value: must(vibe.mutation()).key() },
    ]);
    expect(must(floors[1]).description()[0]).toMatch(/^Floor 1\. .*[a-z.]$/);
    // The culture is a word in the sentence, with a capital (U02): `Void`, not `VOID`.
    const culture = vibe.culture().key();
    expect(must(floors[1]).description()[0]).toContain(culture.charAt(0).toUpperCase() + culture.slice(1));
    expect(must(floors[1]).corridor().status()).toBe('');
  });
});
