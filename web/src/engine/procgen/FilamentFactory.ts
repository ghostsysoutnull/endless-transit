import { CosmicFilament, FILAMENT_KIND } from '#engine/model/CosmicFilament.ts';
import { SECTOR_KIND } from '#engine/model/GalacticSector.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import { NULL_REACH_KIND } from '#engine/model/NullReach.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import type { Offspring } from './Offspring.ts';

const NULL_REACH_CHANCE = 0.3;

/**
 * A cosmic filament: named `Greek-number-type`, with a conduit id; 4 to 8 nodes, each of which rolls —
 * on its own seed — a 30% chance of being a Null Reach instead of a galactic sector.
 */
export class FilamentFactory implements LocationFactory {
  readonly #names: Names;
  readonly #nodes: Children;

  constructor(offspring: Offspring, names: NameLists) {
    this.#names = names.at('names/filament');
    this.#nodes = offspring.of({ min: 4, max: 8 }, (nodeSeed) =>
      nodeSeed.branch('null-roll').probability(NULL_REACH_CHANCE) ? NULL_REACH_KIND : SECTOR_KIND,
    );
  }

  kind(): LocationKind {
    return FILAMENT_KIND;
  }

  create(origin: Origin): CosmicFilament {
    const [greek, type] = this.#names.words(origin.seed);
    const number = this.#names.naming(origin.seed).branch('number').range(0, 998);
    const conduit = origin.seed.branch('conduit').range(0, 0xfffe);
    return new CosmicFilament(origin, {
      name: `${String(greek)}-${String(number)}-${String(type)}`,
      conduitId: `0x${conduit.toString(16)}`,
    });
  }

  populate(parent: Location): readonly Location[] {
    return this.#nodes.of(parent);
  }
}
