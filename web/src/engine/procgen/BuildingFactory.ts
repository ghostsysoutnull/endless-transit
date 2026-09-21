import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Building, BUILDING_KIND } from '#engine/model/Building.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { BuildingNamer } from './BuildingNamer.ts';
import type { LocationFactory } from './LocationFactory.ts';

/**
 * Building sizes, by a roll of 0 … 99: small 41% (3–10 floors), medium 30% (10–25), large 20% (30–50),
 * massive 9% (50–100). The first row whose `above` the roll exceeds wins.
 */
const SIZES = [
  { above: 90, floors: { min: 50, max: 100 } },
  { above: 70, floors: { min: 30, max: 50 } },
  { above: 40, floors: { min: 10, max: 25 } },
  { above: -1, floors: { min: 3, max: 10 } },
] as const;
const SMALLEST = SIZES[3];

/**
 * A building: a size, then a name that depends on it. For now that is all — a building is sealed and
 * this factory populates nothing; its floors arrive in iteration I03.
 */
export class BuildingFactory implements LocationFactory {
  readonly #namer: BuildingNamer;

  constructor(library: ContentLibrary) {
    this.#namer = new BuildingNamer(library);
  }

  kind(): LocationKind {
    return BUILDING_KIND;
  }

  create(origin: Origin): Building {
    const street = origin.parent;
    const culture = street?.vibe()?.culture();
    if (street === undefined || culture === undefined) {
      throw new Error('a building is named in the culture of its street: it needs a street under a planet');
    }
    const roll = origin.seed.branch('size').range(0, 99);
    const size = SIZES.find((each) => roll > each.above) ?? SMALLEST;
    const floors = origin.seed.branch('floors').range(size.floors.min, size.floors.max);
    const named = this.#namer.nameOf(origin.seed, {
      culture,
      floors,
      depth: street.depth(),
      landmarkFactor: street.landmarkFactor(),
    });
    return new Building(origin, { name: named.name, landmark: named.landmark, floors });
  }

  populate(): readonly Location[] {
    return [];
  }
}
