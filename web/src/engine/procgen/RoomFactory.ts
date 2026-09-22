import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Apartment } from '#engine/model/Apartment.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Room, ROOM_KIND } from '#engine/model/Room.ts';
import { Deal } from './Deal.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { RoomCategories } from './RoomCategories.ts';

const ATMOSPHERE = 'themes/atmosphere';
const ADJECTIVES = 'names/buildings/adj';
const OXYGEN = { min: 12, max: 21 };
const TEMPERATURE = { min: 5, max: 25 };
const SIGNALS = ['[SHIELDED]', '[CLEAR]'] as const;

/**
 * A room: named `<adjective> <category>` — the category one of the trait's four, the adjective dealt by
 * the apartment so no two of its rooms share one (NameGenerator.groovy:127-148; ApartmentFactory.groovy:47-59);
 * its structure from the trait, its walls from the apartment's culture, its lighting from the apartment's
 * era (ThemeService.groovy:99-121); the atmo traits (RoomFactory.groovy:122-124). A room holds nothing.
 */
export class RoomFactory implements LocationFactory<Room, Apartment> {
  readonly #library: ContentLibrary;
  readonly #categories: RoomCategories;
  readonly #deal = new Deal();

  constructor(library: ContentLibrary, categories: RoomCategories) {
    this.#library = library;
    this.#categories = categories;
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
    const pick = (list: string, key: string): string =>
      origin.seed.branch(key).pick(this.#library.list(list));
    return new Room(origin, {
      name: `${adjective} ${category.name()}`,
      category,
      atmosphere: {
        structure: pick(`${ATMOSPHERE}/structures/${trait.key()}`, 'structure'),
        colour: pick('themes/colours', 'colour'),
        walls: pick(`${ATMOSPHERE}/walls/${apartment.culture().key()}`, 'walls'),
        lighting: pick(`${ATMOSPHERE}/lighting/${apartment.era().key()}`, 'lighting'),
      },
      traits: {
        oxygen: origin.seed.branch('oxygen').range(OXYGEN.min, OXYGEN.max),
        temperature: origin.seed.branch('temperature').range(TEMPERATURE.min, TEMPERATURE.max),
        signal: origin.seed.branch('signal').pick(SIGNALS),
      },
    });
  }

  populate(): readonly Location[] {
    return [];
  }
}
