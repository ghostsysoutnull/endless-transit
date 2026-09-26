import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { APARTMENT_KIND } from '#engine/model/Apartment.ts';
import type { Building } from '#engine/model/Building.ts';
import { CORRIDOR_KIND } from '#engine/model/Corridor.ts';
import { Floor, FLOOR_KIND } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import { FloorZones } from './FloorZones.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { Passages } from './Passages.ts';
import { Progeny } from './Progeny.ts';
import { Sentences } from './Sentences.ts';

/** A floor: its zone by height, one sentence dealt from the floor descriptions, a peek at its corridor-to-be; one child, the corridor. */
export class FloorFactory implements LocationFactory<Floor, Building> {
  readonly #zones: FloorZones;
  readonly #sentences: Sentences;
  readonly #corridor: Progeny;
  readonly #passages: Passages;

  constructor(world: FactoryLookup, library: ContentLibrary) {
    this.#zones = new FloorZones(library);
    this.#sentences = new Sentences(library, 'floor');
    this.#corridor = new Progeny(world, undefined, () => world.factoryFor(CORRIDOR_KIND));
    this.#passages = new Passages(
      library,
      this.#corridor,
      new Progeny(world, undefined, () => world.factoryFor(APARTMENT_KIND)),
    );
  }

  kind(): LocationKind {
    return FLOOR_KIND;
  }

  create(origin: Origin<Building>): Floor {
    const building = origin.parent;
    const culture = building.vibe()?.culture().key().toUpperCase() ?? 'UNKNOWN';
    return new Floor(origin, {
      number: origin.index,
      zone: this.#zones.zoneOf(origin.seed, origin.index, building.floors()),
      sentence: this.#sentences.dealt(origin.seed).replace('{culture}', culture),
      passage: this.#passages.of(origin.seed, building.doorsPerFloor()),
    });
  }

  populate(parent: Floor): readonly Location[] {
    return this.#corridor.exactly(parent, 1);
  }
}
