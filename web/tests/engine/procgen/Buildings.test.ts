import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Building } from '#engine/model/Building.ts';
import type { Location } from '#engine/model/Location.ts';
import { realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const library = new ContentLibrary(new BundledContent());
const LANDMARKS = library.list('names/buildings/landmarks');

/** Every building of every street of the first city under `node`. */
function buildingsUnder(node: Location): Building[] {
  const city = toStreet(node, () => 0).find((location) => location.kind().key() === 'city');
  const buildings = city?.children().flatMap((street) => street.children()) ?? [];
  return buildings.filter((building) => building instanceof Building);
}

const universes = Array.from({ length: 300 }, (_, n) => registry.universe(sampleSeed(n)));
const nodes = universes.flatMap((universe) => universe.children().flatMap((filament) => filament.children()));
const underSectors = nodes
  .filter((node) => node.kind().key() === 'sector')
  .slice(0, 250)
  .flatMap(buildingsUnder);
const underNullReaches = nodes
  .filter((node) => node.kind().key() === 'null-reach')
  .slice(0, 250)
  .flatMap(buildingsUnder);

describe('buildings on a street', () => {
  test('every building is open, has a name and between 3 and 100 floors', () => {
    expect(underSectors.length).toBeGreaterThan(10_000);
    for (const building of underSectors) {
      expect(building.sealed()).toBe(false);
      expect(building.name()).toMatch(/\S/);
      expect(building.floors()).toBeGreaterThanOrEqual(3);
      expect(building.floors()).toBeLessThanOrEqual(100);
    }
  });

  test('size odds: small 41% (3–10 floors), medium 30% (10–25), large 20% (30–50), massive 9% (50–100) (Guide, "Building size odds")', () => {
    const floors = underSectors.map((building) => building.floors());
    // 10 and 50 sit in two bands; the gaps 26–29 are in none — so count what is unambiguous and bound the rest.
    expect(floors.some((count) => count > 25 && count < 30)).toBe(false);
    const share = (from: number, to: number) =>
      floors.filter((n) => n >= from && n <= to).length / floors.length;
    expect(share(3, 9)).toBeGreaterThan(0.41 * (7 / 8) - 0.02);
    expect(share(3, 10)).toBeLessThan(0.41 + 0.3 / 16 + 0.02);
    expect(share(11, 25)).toBeGreaterThan(0.3 * (15 / 16) - 0.02);
    expect(share(11, 25)).toBeLessThan(0.3 + 0.02);
    expect(share(30, 49)).toBeGreaterThan(0.2 * (20 / 21) - 0.02);
    expect(share(30, 49)).toBeLessThan(0.2 + 0.02);
    expect(share(51, 100)).toBeGreaterThan(0.09 * (50 / 51) - 0.015);
    expect(share(51, 100)).toBeLessThan(0.09 + 0.015);
  });

  test('landmarks: 4% of buildings, 8% under a Null Reach, always one of the 15 names (Guide, "Null Reaches", "Landmarks")', () => {
    const rate = (buildings: readonly Building[]) =>
      buildings.filter((building) => building.landmark()).length / buildings.length;
    expect(underNullReaches.length).toBeGreaterThan(10_000);
    expect(rate(underSectors)).toBeGreaterThan(0.033);
    expect(rate(underSectors)).toBeLessThan(0.047);
    expect(rate(underNullReaches)).toBeGreaterThan(0.07);
    expect(rate(underNullReaches)).toBeLessThan(0.09);
    expect(LANDMARKS).toHaveLength(15);
    const used = new Set<string>();
    for (const building of [...underSectors, ...underNullReaches].filter((each) => each.landmark())) {
      expect(LANDMARKS).toContain(building.name());
      used.add(building.name());
    }
    expect(used.size).toBe(15);
  });

  test('plain names follow the four patterns, in the words of the street’s culture', () => {
    const plain = underSectors.filter((building) => !building.landmark());
    const patterns = [
      /^Unit 0x[0-9A-F]{1,3} \S+$/,
      /^The .+ of (Static|Frequencies|Resonance|Stability|Time|Light|The Web)$/,
    ];
    const uncommon = plain.filter((building) => patterns.some((pattern) => pattern.test(building.name())));
    expect(uncommon.length / underSectors.length).toBeGreaterThan(0.13);
    expect(uncommon.length / underSectors.length).toBeLessThan(0.17);
    for (const building of plain.slice(0, 2_000)) {
      const culture = building.vibe()?.culture().key() ?? '?';
      const nouns = library.list(`names/buildings/noun/${culture}`);
      if (building.name().startsWith('Unit 0x')) continue;
      expect(
        nouns.some((noun) => building.name().includes(noun)),
        `${building.name()} (${culture})`,
      ).toBe(true);
    }
  });

  test('a "Unit 0x…" name ends in a word of the building’s size: under 10 floors small, under 20 medium, else large', () => {
    const units = underSectors.filter((building) => building.name().startsWith('Unit 0x'));
    expect(units.length).toBeGreaterThan(300);
    for (const building of units) {
      const size = building.floors() < 10 ? 'small' : building.floors() < 20 ? 'medium' : 'large';
      expect(library.list(`names/buildings/sizes/${size}`), building.name()).toContain(
        building.name().split(' ')[2],
      );
    }
  });
});
