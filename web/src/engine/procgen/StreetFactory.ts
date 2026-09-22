import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { BUILDING_KIND } from '#engine/model/Building.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Street, STREET_KIND } from '#engine/model/Street.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { NameParts } from './NameParts.ts';
import { Progeny } from './Progeny.ts';

/** A street: named `adjective noun`; 2 to 10 pairs of buildings — 4 to 20, always an even number. */
export class StreetFactory implements LocationFactory {
  readonly #names: NameParts;
  readonly #buildings: Progeny;

  constructor(world: FactoryLookup, library: ContentLibrary) {
    this.#names = new NameParts(library, 'names/street');
    this.#buildings = new Progeny(world, { min: 2, max: 10, unit: 2 }, () => world.factoryFor(BUILDING_KIND));
  }

  kind(): LocationKind {
    return STREET_KIND;
  }

  create(origin: Origin): Street {
    return new Street(origin, { name: this.#names.words(origin.seed).join(' ') });
  }

  populate(parent: Location): readonly Location[] {
    return this.#buildings.of(parent);
  }
}
