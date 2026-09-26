import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Door } from '#engine/model/Door.ts';
import { DoorInscription } from '#engine/model/DoorInscription.ts';
import type { DoorLook } from '#engine/model/DoorLook.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import type { RoomCategory } from '#engine/model/RoomCategory.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const LISTS = 'themes/doors';
/** The branch of an apartment's seed its door is dealt on. */
const DOOR = 'door';
/** About one door in five has words on it (Guide:222; Door.groovy:31, CorridorFactory.groovy:51). */
const INSCRIBED = 0.2;

/**
 * Owns one fact: how a door comes to be — on the `door` branch of its apartment's seed, a material and a
 * state from the door lists, each on its own branch, and one roll in five for words: the ones the room behind
 * guarantees, else a word of the inscription list in one of the four styles (CorridorFactory.groovy:47-53,
 * 64-89). Its look alone can be read without the apartment (`look`, the peek, U02).
 */
export class Doors {
  readonly #library: ContentLibrary;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  /** The door of the apartment born from this seed. */
  of(apartmentSeed: Seed, behind: RoomCategory): Door {
    const seed = apartmentSeed.branch(DOOR);
    const [material, materialTold] = this.#material(seed);
    const [state, stateTold] = this.#state(seed);
    return new Door({
      material,
      state,
      inscription: seed.branch('inscribed').probability(INSCRIBED) ? this.#words(seed, behind) : undefined,
      trace: behind.trace(),
      told: { material: materialTold, state: stateTold },
    });
  }

  /** How the door of the apartment born from this seed looks — the same deal as `of`, nothing else made. */
  look(apartmentSeed: Seed): DoorLook {
    const seed = apartmentSeed.branch(DOOR);
    return { material: this.#material(seed)[0], state: this.#state(seed)[0] };
  }

  #material(seed: Seed): readonly [string, string] {
    return seed.branch('material').pick(this.#library.pairs(`${LISTS}/materials`));
  }

  #state(seed: Seed): readonly [string, string] {
    return seed.branch('state').pick(this.#library.pairs(`${LISTS}/states`));
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
