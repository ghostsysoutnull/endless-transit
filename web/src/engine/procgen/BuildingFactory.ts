import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Building, BUILDING_KIND } from '#engine/model/Building.ts';
import { FLOOR_KIND } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { BuildingNamer } from './BuildingNamer.ts';
import { BuildingSizes } from './BuildingSizes.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { Progeny } from './Progeny.ts';

/** A building: a size, then a name that depends on it; as many floors as the size said, floor `n` from `branch(n)`. */
export class BuildingFactory implements LocationFactory<Building> {
  readonly #namer: BuildingNamer;
  readonly #sizes = new BuildingSizes();
  readonly #floors: Progeny;

  constructor(world: FactoryLookup, library: ContentLibrary) {
    this.#namer = new BuildingNamer(library);
    this.#floors = new Progeny(world, undefined, () => world.factoryFor(FLOOR_KIND));
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
    return new Building(origin, {
      name: named.name,
      landmark: named.landmark,
      floors,
      doorsPerFloor: this.#sizes.doorsPerFloorOf(origin.seed),
    });
  }

  populate(parent: Building): readonly Location[] {
    return this.#floors.exactly(parent, parent.floors());
  }
}
