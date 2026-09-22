import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import { UNIVERSE_KIND } from '#engine/model/Universe.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { ApartmentFactory } from './ApartmentFactory.ts';
import { BuildingFactory } from './BuildingFactory.ts';
import { CityFactory } from './CityFactory.ts';
import { CorridorFactory } from './CorridorFactory.ts';
import { CountryFactory } from './CountryFactory.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import { FilamentFactory } from './FilamentFactory.ts';
import { FloorFactory } from './FloorFactory.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { NullReachFactory } from './NullReachFactory.ts';
import { PlanetFactory } from './PlanetFactory.ts';
import { RoomCategories } from './RoomCategories.ts';
import { RoomFactory } from './RoomFactory.ts';
import { SectorFactory } from './SectorFactory.ts';
import { SolarSystemFactory } from './SolarSystemFactory.ts';
import { StreetFactory } from './StreetFactory.ts';
import type { ThemeCatalog } from './ThemeCatalog.ts';
import { UniverseFactory } from './UniverseFactory.ts';

/**
 * The generator: one factory per kind of location, keyed by the kind's stable key. Owns one fact — which
 * kinds exist. A new kind of place is one more entry in the list below, never a branch somewhere else;
 * population dispatches on the parent's kind, and a kind nobody registered fails loud.
 */
export class LocationRegistry implements FactoryLookup {
  readonly #factories: ReadonlyMap<string, LocationFactory>;

  constructor(library: ContentLibrary, themes: ThemeCatalog) {
    const categories = new RoomCategories(library);
    const entries: readonly LocationFactory[] = [
      new UniverseFactory(this),
      new FilamentFactory(this, library),
      new SectorFactory(this, library),
      new NullReachFactory(this),
      new SolarSystemFactory(this, library),
      new PlanetFactory(this, library, themes),
      new CountryFactory(this, library, themes),
      new CityFactory(this, library),
      new StreetFactory(this, library),
      new BuildingFactory(this, library),
      new FloorFactory(this, library),
      new CorridorFactory(this, library),
      new ApartmentFactory(this, library, categories),
      new RoomFactory(library, categories),
    ];
    this.#factories = new Map(entries.map((factory) => [factory.kind().key(), factory]));
  }

  /** The root of the world a seed describes. Nothing below it exists until it is asked for. */
  universe(seed: Seed): Location {
    return this.factoryFor(UNIVERSE_KIND).create({ parent: undefined, seed, index: 0, children: this });
  }

  kinds(): readonly LocationKind[] {
    return [...this.#factories.values()].map((factory) => factory.kind());
  }

  factoryFor(kind: LocationKind): LocationFactory {
    const factory = this.#factories.get(kind.key());
    if (factory === undefined) throw new Error(`no factory is registered for the kind '${kind.key()}'`);
    return factory;
  }

  childrenOf(parent: Location): readonly Location[] {
    return this.factoryFor(parent.kind()).populate(parent);
  }
}
