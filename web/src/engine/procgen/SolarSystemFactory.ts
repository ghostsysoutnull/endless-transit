import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { PLANET_KIND } from '#engine/model/Planet.ts';
import { SOLAR_SYSTEM_KIND, SolarSystem } from '#engine/model/SolarSystem.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import type { Offspring } from './Offspring.ts';

/** A solar system: named `prefix suffix`; 2 to 10 planets. */
export class SolarSystemFactory implements LocationFactory {
  readonly #names: Names;
  readonly #planets: Children;

  constructor(offspring: Offspring, names: NameLists) {
    this.#names = names.at('names/solar-system');
    this.#planets = offspring.of({ min: 2, max: 10 }, () => PLANET_KIND);
  }

  kind(): LocationKind {
    return SOLAR_SYSTEM_KIND;
  }

  create(origin: Origin): SolarSystem {
    return new SolarSystem(origin, { name: this.#names.words(origin, undefined).join(' ') });
  }

  populate(parent: Location): readonly Location[] {
    return this.#planets.of(parent);
  }
}
