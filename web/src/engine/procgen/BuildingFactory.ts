import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Building, BUILDING_KIND } from '#engine/model/Building.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { BuildingNamer } from './BuildingNamer.ts';
import { BuildingSizes } from './BuildingSizes.ts';
import type { LocationFactory } from './LocationFactory.ts';

/**
 * A building: a size, then a name that depends on it. For now that is all — a building is sealed and
 * this factory populates nothing; its floors arrive in iteration I03.
 */
export class BuildingFactory implements LocationFactory {
  readonly #namer: BuildingNamer;
  readonly #sizes = new BuildingSizes();

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
    const floors = this.#sizes.floorsOf(origin.seed);
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
