import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import { NULL_REACH_KIND, NullReach } from '#engine/model/NullReach.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { SOLAR_SYSTEM_KIND } from '#engine/model/SolarSystem.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { Offspring } from './Offspring.ts';

/** A Null Reach: named `Null Reach <hex>`; thinner than a sector — one or two solar systems. */
export class NullReachFactory implements LocationFactory {
  readonly #systems: Children;

  constructor(offspring: Offspring) {
    this.#systems = offspring.of({ min: 1, max: 2 }, () => SOLAR_SYSTEM_KIND);
  }

  kind(): LocationKind {
    return NULL_REACH_KIND;
  }

  create(origin: Origin): NullReach {
    const serial = origin.seed.branch('name').range(0, 0xffe);
    return new NullReach(origin, { name: `Null Reach ${serial.toString(16).toUpperCase()}` });
  }

  populate(parent: Location): readonly Location[] {
    return this.#systems.of(parent);
  }
}
