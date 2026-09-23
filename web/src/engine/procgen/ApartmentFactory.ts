import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment, APARTMENT_KIND } from '#engine/model/Apartment.ts';
import type { Corridor } from '#engine/model/Corridor.ts';
import type { ApartmentShape } from './ApartmentShape.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { ROOM_KIND } from '#engine/model/Room.ts';
import { Deal } from './Deal.ts';
import { Doors } from './Doors.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { ObjectDeck } from './ObjectDeck.ts';
import { Progeny } from './Progeny.ts';
import type { RoomCategories } from './RoomCategories.ts';

/** One apartment in a hundred is a temporal anomaly (ApartmentFactory.groovy:27-31). */
const ANOMALY = 0.01;
/** 1 to 10 rooms (Guide:169; ApartmentFactory.groovy:38). */
const ROOMS = { min: 1, max: 10 };
/** 5 to 19 relics per apartment (Guide:167; ApartmentFactory.groovy:40). */
const RELICS = { min: 5, max: 19 };
const HOARD = 'relics';
/** The shape above the bedrock: an apartment of rooms. */
const APARTMENT: ApartmentShape = {
  kind: APARTMENT_KIND,
  rooms: ROOM_KIND,
  make: (origin, facts) => new Apartment(origin, facts),
};

/**
 * An apartment: its door — inscribed for what its first room will be — and its culture and era, the
 * planet's or the drifted second ones by the country's stability, unless it is an anomaly; 1 to 10 rooms,
 * decided at creation; 5 to 19 relics dealt from the deck of its culture and era, no card twice
 * (ApartmentFactory.groovy:40-45, HK-016 step 2).
 */
export class ApartmentFactory implements LocationFactory<Apartment, Corridor> {
  readonly #shape: ApartmentShape;
  readonly #doors: Doors;
  readonly #categories: RoomCategories;
  readonly #rooms: Progeny;
  readonly #deck: ObjectDeck;
  readonly #deal = new Deal();

  constructor(
    world: FactoryLookup,
    library: ContentLibrary,
    categories: RoomCategories,
    shape: ApartmentShape = APARTMENT,
  ) {
    this.#shape = shape;
    this.#doors = new Doors(library);
    this.#categories = categories;
    this.#rooms = new Progeny(world, ROOMS, () => world.factoryFor(shape.rooms));
    this.#deck = new ObjectDeck(library);
  }

  kind(): LocationKind {
    return this.#shape.kind;
  }

  create(origin: Origin<Corridor>): Apartment {
    const vibe = origin.parent.vibe();
    const trait = vibe?.mutation();
    if (vibe === undefined || trait === undefined) {
      throw new Error('an apartment takes its culture, era and trait from the country above: it needs one');
    }
    const anomaly = origin.seed.branch('anomaly').probability(ANOMALY);
    const culture = anomaly ? vibe.culture() : vibe.pickCulture(origin.seed.branch('culture'));
    const era = anomaly ? vibe.era() : vibe.pickEra(origin.seed.branch('era'));
    const hoard = origin.seed.branch(HOARD);
    // The first room's own draw (child 0's seed): the door is inscribed and traced for what it leads to.
    const behind = this.#categories.categoryOf(origin.seed.branch(0), trait);
    return this.#shape.make(origin, {
      door: this.#doors.of(origin.seed.branch('door'), behind),
      behind,
      culture,
      era,
      anomaly,
      rooms: this.#rooms.count(origin.seed),
      relics: this.#deal.take(hoard, this.#deck.of(culture, era), hoard.range(RELICS.min, RELICS.max)),
    });
  }

  populate(parent: Apartment): readonly Location[] {
    return this.#rooms.exactly(parent, parent.roomCount());
  }
}
