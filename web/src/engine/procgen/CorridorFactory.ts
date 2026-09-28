import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { APARTMENT_KIND } from '#engine/model/Apartment.ts';
import { Corridor, CORRIDOR_KIND } from '#engine/model/Corridor.ts';
import type { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { Progeny } from './Progeny.ts';
import { CorridorWords } from './CorridorWords.ts';

/** A corridor: one sentence dealt from the corridor descriptions, with its shape; as many apartments as its building says doors per floor. */
export class CorridorFactory implements LocationFactory<Corridor, Floor> {
  readonly #words: CorridorWords;
  readonly #apartments: Progeny;

  constructor(world: FactoryLookup, library: ContentLibrary) {
    this.#words = new CorridorWords(library);
    this.#apartments = new Progeny(world, undefined, () => world.factoryFor(APARTMENT_KIND));
  }

  kind(): LocationKind {
    return CORRIDOR_KIND;
  }

  create(origin: Origin<Floor>): Corridor {
    const [sentence, shape] = this.#words.dealt(origin.seed);
    return new Corridor(origin, { sentence, shape });
  }

  populate(parent: Corridor): readonly Location[] {
    return this.#apartments.exactly(parent, parent.floor().building().doorsPerFloor());
  }
}
