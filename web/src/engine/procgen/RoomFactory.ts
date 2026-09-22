import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { WarningSink } from '#engine/content/WarningSink.ts';
import type { Apartment } from '#engine/model/Apartment.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Room, ROOM_KIND } from '#engine/model/Room.ts';
import { Atmospheres } from './Atmospheres.ts';
import { Deal } from './Deal.ts';
import { Furnishings } from './Furnishings.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { RoomCategories } from './RoomCategories.ts';

const ADJECTIVES = 'names/buildings/adj';
const OXYGEN = { min: 12, max: 21 };
const TEMPERATURE = { min: 5, max: 25 };
const SIGNALS = ['[SHIELDED]', '[CLEAR]'] as const;
/** One to three pieces of furniture (Guide:171; RoomFactory.groovy:57). */
const FURNITURE = { min: 1, max: 3 };

/**
 * A room: named `<adjective> <category>` — the category one of the trait's four, the adjective dealt by
 * the apartment so no two of its rooms share one (NameGenerator.groovy:127-148; ApartmentFactory.groovy:47-59);
 * its atmosphere from its apartment's culture and era and its country's trait (`Atmospheres`); the atmo
 * traits (RoomFactory.groovy:51-54); one to three pieces of furniture (`Furnishings`). Its objects are the
 * apartment's business.
 */
export class RoomFactory implements LocationFactory<Room, Apartment> {
  readonly #library: ContentLibrary;
  readonly #categories: RoomCategories;
  readonly #atmospheres: Atmospheres;
  readonly #furnishings: Furnishings;
  readonly #deal = new Deal();

  constructor(library: ContentLibrary, categories: RoomCategories, warnings: WarningSink) {
    this.#library = library;
    this.#categories = categories;
    this.#atmospheres = new Atmospheres(library, warnings);
    this.#furnishings = new Furnishings(library);
  }

  kind(): LocationKind {
    return ROOM_KIND;
  }

  create(origin: Origin<Apartment>): Room {
    const apartment = origin.parent;
    const trait = apartment.vibe()?.mutation();
    if (trait === undefined)
      throw new Error('a room takes its category from the country above: it needs one');
    const category = this.#categories.categoryOf(origin.seed, trait);
    const adjective = this.#deal.nth(
      apartment.seed().branch('adjectives'),
      this.#library.list(`${ADJECTIVES}/${apartment.culture().key()}`),
      origin.index,
    );
    return new Room(origin, {
      name: `${adjective} ${category.name()}`,
      category,
      atmosphere: this.#atmospheres.of(origin.seed, {
        culture: apartment.culture(),
        era: apartment.era(),
        trait,
        anomaly: apartment.anomaly(),
      }),
      traits: {
        oxygen: origin.seed.branch('oxygen').range(OXYGEN.min, OXYGEN.max),
        temperature: origin.seed.branch('temperature').range(TEMPERATURE.min, TEMPERATURE.max),
        signal: origin.seed.branch('signal').pick(SIGNALS),
      },
      furniture: this.#furnishings.of(
        origin.seed.branch('furniture'),
        apartment.culture(),
        origin.seed.branch('furniture').range(FURNITURE.min, FURNITURE.max),
      ),
    });
  }

  populate(): readonly Location[] {
    return [];
  }
}
