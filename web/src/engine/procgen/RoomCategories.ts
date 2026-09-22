import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { DoorInscription } from '#engine/model/DoorInscription.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import { RoomCategory } from '#engine/model/RoomCategory.ts';
import type { Trait } from '#engine/model/Trait.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const LISTS = 'names/rooms';

/**
 * Owns one fact: which kinds of room a country's trait allows, and which of them a room is — the list
 * `names/rooms/<Trait>` (four names, each with the door words it guarantees or none), one drawn on the
 * room's own seed (NameGenerator.groovy:131-141). The same draw, made on the first room's seed, is how a
 * door learns what it leads to (CorridorFactory.groovy:163-164). Built once per trait.
 */
export class RoomCategories {
  readonly #library: ContentLibrary;
  readonly #byTrait = new Map<string, readonly RoomCategory[]>();

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  allowedBy(trait: Trait): readonly RoomCategory[] {
    let categories = this.#byTrait.get(trait.key());
    if (categories === undefined) {
      categories = Object.freeze(
        this.#library
          .pairs(`${LISTS}/${trait.key()}`)
          .map(([name, guarantee]) => new RoomCategory(name, this.#inscription(guarantee))),
      );
      this.#byTrait.set(trait.key(), categories);
    }
    return categories;
  }

  categoryOf(roomSeed: Seed, trait: Trait): RoomCategory {
    return roomSeed.branch('category').pick(this.allowedBy(trait));
  }

  /** `stamped DATA_VAULT` → the inscription; an empty guarantee is none; an unknown style is an error. */
  #inscription(guarantee: string): DoorInscription | undefined {
    if (guarantee === '') return undefined;
    const cut = guarantee.indexOf(' ');
    const style = INSCRIPTION_STYLES.find((each) => each.key() === guarantee.slice(0, cut));
    if (cut < 0 || style === undefined) {
      throw new Error(`${LISTS}: '${guarantee}' is not '<style> <WORD>' with a known style`);
    }
    return new DoorInscription(guarantee.slice(cut + 1), style);
  }
}
