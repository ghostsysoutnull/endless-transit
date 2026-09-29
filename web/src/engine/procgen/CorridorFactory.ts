import { APARTMENT_KIND } from '#engine/model/Apartment.ts';
import { Corridor, CORRIDOR_KIND } from '#engine/model/Corridor.ts';
import type { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { CorridorDeal } from './CorridorDeal.ts';
import type { Offspring } from './Offspring.ts';

/** A corridor: one sentence dealt from the corridor descriptions, with its shape; as many apartments as its building says doors per floor. */
export class CorridorFactory implements LocationFactory<Corridor, Floor> {
  readonly #words: CorridorDeal;
  readonly #apartments: Children;

  constructor(offspring: Offspring, words: CorridorDeal) {
    this.#words = words;
    this.#apartments = offspring.of(undefined, () => APARTMENT_KIND);
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
