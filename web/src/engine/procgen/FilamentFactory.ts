import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { CosmicFilament, FILAMENT_KIND } from '#engine/model/CosmicFilament.ts';
import { SECTOR_KIND } from '#engine/model/GalacticSector.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import { NULL_REACH_KIND } from '#engine/model/NullReach.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { NameParts } from './NameParts.ts';
import { Progeny } from './Progeny.ts';

const NULL_REACH_CHANCE = 0.3;

/**
 * A cosmic filament: named `Greek-number-type`, with a conduit id; 4 to 8 nodes, each of which rolls —
 * on its own seed — a 30% chance of being a Null Reach instead of a galactic sector.
 */
export class FilamentFactory implements LocationFactory {
  readonly #names: NameParts;
  readonly #nodes: Progeny;

  constructor(world: FactoryLookup, library: ContentLibrary) {
    this.#names = new NameParts(library, 'names/filament');
    this.#nodes = new Progeny(world, { min: 4, max: 8 }, (nodeSeed) =>
      world.factoryFor(
        nodeSeed.branch('null-roll').probability(NULL_REACH_CHANCE) ? NULL_REACH_KIND : SECTOR_KIND,
      ),
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
