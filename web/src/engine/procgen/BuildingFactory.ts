import { Building, BUILDING_KIND } from '#engine/model/Building.ts';
import { FLOOR_KIND } from '#engine/model/Floor.ts';
import { LAYER_KIND } from '#engine/model/Layer.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { BuildingNames } from './BuildingNames.ts';
import type { Children } from './Children.ts';
import type { Offspring } from './Offspring.ts';
import type { Sizes } from './Sizes.ts';

/** A building: a size, then a name that depends on it; as many floors as the size said, floor `n` from `branch(n)`, then its Layers past them. */
export class BuildingFactory implements LocationFactory<Building> {
  readonly #namer: BuildingNames;
  readonly #sizes: Sizes;
  readonly #floors: Children;
  readonly #layers: Children;

  constructor(offspring: Offspring, parts: { namer: BuildingNames; sizes: Sizes }) {
    this.#namer = parts.namer;
    this.#sizes = parts.sizes;
    this.#floors = offspring.of(undefined, () => FLOOR_KIND);
    this.#layers = offspring.of(undefined, () => LAYER_KIND);
  }

  kind(): LocationKind {
    return BUILDING_KIND;
  }

  create(origin: Origin): Building {
    const street = origin.parent;
    const vibe = street?.vibe();
    if (street === undefined || vibe === undefined) {
      throw new Error(
        'a building is named in the culture and era of its street: it needs a street under a planet',
      );
    }
    const floors = this.#sizes.floorsOf(origin.seed);
    const named = this.#namer.nameOf(origin.seed, {
      street: street.seed(),
      index: origin.index,
      culture: vibe.culture(),
      era: vibe.era(),
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
    return [
      ...this.#floors.exactly(parent, parent.floors()),
      ...this.#layers.exactly(parent, parent.layers(), parent.floors()),
    ];
  }
}
