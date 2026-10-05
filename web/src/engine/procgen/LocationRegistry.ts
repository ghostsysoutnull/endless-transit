import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { WarningSink } from '#engine/content/WarningSink.ts';
import type { Location } from '#engine/model/Location.ts';
import { Crypt, CRYPT_KIND } from '#engine/model/Crypt.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import { Shard, SHARD_KIND } from '#engine/model/Shard.ts';
import { UNIVERSE_KIND } from '#engine/model/Universe.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { ApartmentFactory } from './ApartmentFactory.ts';
import { Atmospheres } from './Atmospheres.ts';
import { BuildingNamer } from './BuildingNamer.ts';
import { BuildingSizes } from './BuildingSizes.ts';
import { CorridorWords } from './CorridorWords.ts';
import { Deal } from './Deal.ts';
import { Doors } from './Doors.ts';
import { FloorZones } from './FloorZones.ts';
import { Furnishings } from './Furnishings.ts';
import { LibraryNames } from './LibraryNames.ts';
import { NameAxes } from './NameAxes.ts';
import { LibrarySentences } from './LibrarySentences.ts';
import { ObjectDeck } from './ObjectDeck.ts';
import { Passages } from './Passages.ts';
import { ProgenyMaker } from './ProgenyMaker.ts';
import { ArteryFactory } from './ArteryFactory.ts';
import { BuildingFactory } from './BuildingFactory.ts';
import { CityFactory } from './CityFactory.ts';
import { CorridorFactory } from './CorridorFactory.ts';
import { CountryFactory } from './CountryFactory.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import { FilamentFactory } from './FilamentFactory.ts';
import { FloorFactory } from './FloorFactory.ts';
import { LayerFactory } from './LayerFactory.ts';
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

  constructor(library: ContentLibrary, themes: ThemeCatalog, warnings: WarningSink) {
    // The engine's composition root: each factory's parts built once here and handed in; each factory keeps its own
    // facts (how many children, which kind, which list) and asks the makers for them.
    const offspring = new ProgenyMaker(this);
    const deal = new Deal();
    const categories = new RoomCategories(library, deal);
    const names = new LibraryNames(library, deal, new NameAxes(library));
    const decks = new LibrarySentences(library);
    const doors = new Doors(library, deal);
    const words = new CorridorWords(decks);
    const deck = new ObjectDeck(library);
    const apartments = { doors, deck, deal };
    const rooms = {
      atmospheres: new Atmospheres(library, warnings),
      furnishings: new Furnishings(library, deal),
      deal,
    };
    const entries: readonly LocationFactory[] = [
      new UniverseFactory(offspring),
      new FilamentFactory(offspring, names),
      new SectorFactory(offspring, names),
      new NullReachFactory(offspring, names),
      new SolarSystemFactory(offspring, names),
      new PlanetFactory(offspring, names, themes),
      new CountryFactory(offspring, names, themes),
      new CityFactory(offspring, names),
      new StreetFactory(offspring, names),
      new BuildingFactory(offspring, { namer: new BuildingNamer(library, deal), sizes: new BuildingSizes() }),
      new FloorFactory(offspring, {
        zones: new FloorZones(library, deal),
        decks,
        passages: new Passages(words, doors),
      }),
      new CorridorFactory(offspring, words),
      new ApartmentFactory(offspring, apartments, categories),
      new RoomFactory(library, categories, rooms),
      // Below the bedrock (I07): the same factories, registered again as the abyssal kinds.
      new LayerFactory(offspring),
      new ArteryFactory(offspring, themes),
      new ApartmentFactory(offspring, apartments, categories, {
        kind: CRYPT_KIND,
        rooms: SHARD_KIND,
        make: (origin, facts) => new Crypt(origin, facts),
      }),
      new RoomFactory(library, categories, rooms, {
        kind: SHARD_KIND,
        make: (origin, facts) => new Shard(origin, facts),
      }),
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
