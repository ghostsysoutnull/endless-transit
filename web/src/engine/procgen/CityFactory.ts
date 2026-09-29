import { City, CITY_KIND } from '#engine/model/City.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { STREET_KIND } from '#engine/model/Street.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import type { Offspring } from './Offspring.ts';

const REBEL_CHANCE = 0.1;

/** A city: named `head+tail` in one word; 3 to 15 streets. One in ten is a rebel district. */
export class CityFactory implements LocationFactory {
  readonly #names: Names;
  readonly #streets: Children;

  constructor(offspring: Offspring, names: NameLists) {
    this.#names = names.at('names/city');
    this.#streets = offspring.of({ min: 3, max: 15 }, () => STREET_KIND);
  }

  kind(): LocationKind {
    return CITY_KIND;
  }

  create(origin: Origin): City {
    const rebel = origin.seed.branch('rebel').probability(REBEL_CHANCE);
    return new City(origin, {
      name: this.#names.words(origin.seed).join(''),
      rebelVibe: rebel ? origin.parent?.vibe()?.rebel() : undefined,
    });
  }

  populate(parent: Location): readonly Location[] {
    return this.#streets.of(parent);
  }
}
