import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { PLANET_KIND } from '#engine/model/Planet.ts';
import { SOLAR_SYSTEM_KIND, SolarSystem } from '#engine/model/SolarSystem.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { NameParts } from './NameParts.ts';
import { Progeny } from './Progeny.ts';

/** A solar system: named `prefix suffix`; 2 to 10 planets. */
export class SolarSystemFactory implements LocationFactory {
  readonly #names: NameParts;
  readonly #planets: Progeny;

  constructor(world: FactoryLookup, library: ContentLibrary) {
    this.#names = new NameParts(library, 'names/solar-system');
    this.#planets = new Progeny(world, { min: 2, max: 10 }, () => world.factoryFor(PLANET_KIND));
  }

  kind(): LocationKind {
    return SOLAR_SYSTEM_KIND;
  }

  create(origin: Origin): SolarSystem {
    return new SolarSystem(origin, { name: this.#names.words(origin.seed).join(' ') });
  }

  populate(parent: Location): readonly Location[] {
    return this.#planets.of(parent);
  }
}
