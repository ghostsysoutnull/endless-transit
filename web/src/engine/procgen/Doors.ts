import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Door } from '#engine/model/Door.ts';
import { DoorInscription } from '#engine/model/DoorInscription.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import type { RoomCategory } from '#engine/model/RoomCategory.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const LISTS = 'themes/doors';
/** About one door in five has words on it (Guide:222; Door.groovy:31, CorridorFactory.groovy:51). */
const INSCRIBED = 0.2;

/**
 * Owns one fact: how a door comes to be — a material and a state from the door lists, each on its own
 * branch of the door's seed, and one roll in five for words: the ones the room behind guarantees, else a
 * word of the inscription list in one of the four styles (CorridorFactory.groovy:47-53, 64-89).
 */
export class Doors {
  readonly #library: ContentLibrary;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  of(seed: Seed, behind: RoomCategory): Door {
    const [material, materialTold] = seed.branch('material').pick(this.#library.pairs(`${LISTS}/materials`));
    const [state, stateTold] = seed.branch('state').pick(this.#library.pairs(`${LISTS}/states`));
    return new Door({
      material,
      state,
      inscription: seed.branch('inscribed').probability(INSCRIBED) ? this.#words(seed, behind) : undefined,
      trace: behind.trace(),
      told: { material: materialTold, state: stateTold },
    });
  }

  #words(seed: Seed, behind: RoomCategory): DoorInscription {
    return (
      behind.guarantee() ??
      new DoorInscription(
        seed.branch('word').pick(this.#library.list(`${LISTS}/inscriptions`)),
        seed.branch('style').pick(INSCRIPTION_STYLES),
      )
    );
  }
}
