import { GalacticSector, SECTOR_KIND } from '#engine/model/GalacticSector.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { SOLAR_SYSTEM_KIND } from '#engine/model/SolarSystem.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import type { Offspring } from './Offspring.ts';

/** A galactic sector: named `descriptor noun number`; 3 to 7 solar systems. */
export class SectorFactory implements LocationFactory {
  readonly #names: Names;
  readonly #systems: Children;

  constructor(offspring: Offspring, names: NameLists) {
    this.#names = names.at('names/sector');
    this.#systems = offspring.of({ min: 3, max: 7 }, () => SOLAR_SYSTEM_KIND);
  }

  kind(): LocationKind {
    return SECTOR_KIND;
  }

  create(origin: Origin): GalacticSector {
    const number = this.#names.naming(origin.seed).branch('number').range(0, 98);
    return new GalacticSector(origin, {
      name: `${this.#names.words(origin.seed).join(' ')} ${String(number)}`,
    });
  }

  populate(parent: Location): readonly Location[] {
    return this.#systems.of(parent);
  }
}
