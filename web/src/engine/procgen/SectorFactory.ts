import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { GalacticSector, SECTOR_KIND } from '#engine/model/GalacticSector.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { SOLAR_SYSTEM_KIND } from '#engine/model/SolarSystem.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { NameParts } from './NameParts.ts';
import { Progeny } from './Progeny.ts';

/** A galactic sector: named `descriptor noun number`; 3 to 7 solar systems. */
export class SectorFactory implements LocationFactory {
  readonly #names: NameParts;
  readonly #systems: Progeny;

  constructor(world: FactoryLookup, library: ContentLibrary) {
    this.#names = new NameParts(library, 'names/sector');
    this.#systems = new Progeny(world, { min: 3, max: 7 }, () => world.factoryFor(SOLAR_SYSTEM_KIND));
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
