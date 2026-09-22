import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment, APARTMENT_KIND } from '#engine/model/Apartment.ts';
import type { Corridor } from '#engine/model/Corridor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { ROOM_KIND } from '#engine/model/Room.ts';
import { Doors } from './Doors.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { Progeny } from './Progeny.ts';
import type { RoomCategories } from './RoomCategories.ts';

/** One apartment in a hundred is a temporal anomaly (ApartmentFactory.groovy:27-31). */
const ANOMALY = 0.01;
/** 1 to 10 rooms (Guide:169; ApartmentFactory.groovy:38). */
const ROOMS = { min: 1, max: 10 };

/**
 * An apartment: its door — inscribed for what its first room will be — and its culture and era, the
 * planet's or the drifted second ones by the country's stability, unless it is an anomaly; 1 to 10 rooms.
 */
export class ApartmentFactory implements LocationFactory<Apartment, Corridor> {
  readonly #doors: Doors;
  readonly #categories: RoomCategories;
  readonly #rooms: Progeny;

  constructor(world: FactoryLookup, library: ContentLibrary, categories: RoomCategories) {
    this.#doors = new Doors(library);
    this.#categories = categories;
    this.#rooms = new Progeny(world, ROOMS, () => world.factoryFor(ROOM_KIND));
  }

  kind(): LocationKind {
    return APARTMENT_KIND;
  }

  create(origin: Origin<Corridor>): Apartment {
    const vibe = origin.parent.vibe();
    const trait = vibe?.mutation();
    if (vibe === undefined || trait === undefined) {
      throw new Error('an apartment takes its culture, era and trait from the country above: it needs one');
    }
    const anomaly = origin.seed.branch('anomaly').probability(ANOMALY);
    return new Apartment(origin, {
      door: this.#doors.of(
        origin.seed.branch('door'),
        this.#categories.categoryOf(origin.seed.branch(0), trait),
      ),
      culture: anomaly ? vibe.culture() : vibe.pickCulture(origin.seed.branch('culture')),
      era: anomaly ? vibe.era() : vibe.pickEra(origin.seed.branch('era')),
      anomaly,
    });
  }

  populate(parent: Apartment): readonly Location[] {
    return this.#rooms.of(parent);
  }
}
