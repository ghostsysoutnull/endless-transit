import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import { NULL_REACH_KIND, NullReach } from '#engine/model/NullReach.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { SOLAR_SYSTEM_KIND } from '#engine/model/SolarSystem.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import type { Offspring } from './Offspring.ts';

/**
 * A Null Reach: named `Null Reach <word>`, the word dealt among its filament's nodes; thinner than a sector —
 * one or two solar systems.
 */
export class NullReachFactory implements LocationFactory {
  readonly #names: Names;
  readonly #systems: Children;

  constructor(offspring: Offspring, names: NameLists) {
    this.#names = names.at('names/null-reach');
    this.#systems = offspring.of({ min: 1, max: 2 }, () => SOLAR_SYSTEM_KIND);
  }

  kind(): LocationKind {
    return NULL_REACH_KIND;
  }

  create(origin: Origin): NullReach {
    return new NullReach(origin, { name: `Null Reach ${this.#names.words(origin, undefined).join(' ')}` });
  }

  populate(parent: Location): readonly Location[] {
    return this.#systems.of(parent);
  }
}
