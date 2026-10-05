import { BUILDING_KIND } from '#engine/model/Building.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Street, STREET_KIND } from '#engine/model/Street.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import type { Offspring } from './Offspring.ts';

/** A street: named `adjective noun`; 2 to 10 pairs of buildings — 4 to 20, always an even number. */
export class StreetFactory implements LocationFactory {
  readonly #names: Names;
  readonly #buildings: Children;

  constructor(offspring: Offspring, names: NameLists) {
    this.#names = names.at('names/street');
    this.#buildings = offspring.of({ min: 2, max: 11, unit: 2 }, () => BUILDING_KIND);
  }

  kind(): LocationKind {
    return STREET_KIND;
  }

  create(origin: Origin): Street {
    return new Street(origin, { name: this.#names.words(origin, origin.parent?.vibe()).join(' ') });
  }

  populate(parent: Location): readonly Location[] {
    return this.#buildings.of(parent);
  }
}
