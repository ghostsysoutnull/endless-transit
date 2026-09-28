import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Door } from '#engine/model/Door.ts';
import { DoorInscription } from '#engine/model/DoorInscription.ts';
import { DoorLook } from '#engine/model/DoorLook.ts';
import { type DoorStateLook, doorStateLook } from '#engine/model/DoorStateLook.ts';
import { type MaterialFamily, materialFamily } from '#engine/model/MaterialFamily.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import type { RoomCategory } from '#engine/model/RoomCategory.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { DoorDeal } from './DoorDeal.ts';

const LISTS = 'themes/doors';
/** The branch of an apartment's seed its door is dealt on. */
const DOOR = 'door';
/** About one door in five has words on it (Guide:222; Door.groovy:31, CorridorFactory.groovy:51). */
const INSCRIBED = 0.2;

/** One line of a door list, read and typed once: the name, the sentence it is told in, the key a picture draws it by. */
interface Line<K> {
  readonly name: string;
  readonly told: string;
  readonly key: K;
}

/**
 * Owns one fact: how a door comes to be — on the `door` branch of its apartment's seed, a material and a
 * state from the door lists (each with the key a picture draws it by), each on its own branch, and one roll in
 * five for words: the ones the room behind guarantees, else a word of the inscription list in one of the four
 * styles (CorridorFactory.groovy:47-53, 64-89). Its look alone can be read without the apartment (`look`, the
 * peek, U02). Both lists are read whole and typed when it is made: a line with an unknown key refuses its list.
 */
export class Doors implements DoorDeal {
  readonly #library: ContentLibrary;
  readonly #materials: readonly Line<MaterialFamily>[];
  readonly #states: readonly Line<DoorStateLook>[];

  constructor(library: ContentLibrary) {
    this.#library = library;
    this.#materials = library
      .triples(`${LISTS}/materials`)
      .map(([name, told, key]) => ({ name, told, key: materialFamily(key) }));
    this.#states = library
      .triples(`${LISTS}/states`)
      .map(([name, told, key]) => ({ name, told, key: doorStateLook(key) }));
  }

  /** The door of the apartment born from this seed. */
  of(apartmentSeed: Seed, behind: RoomCategory): Door {
    const seed = apartmentSeed.branch(DOOR);
    return new Door({
      look: this.look(apartmentSeed),
      inscription: seed.branch('inscribed').probability(INSCRIBED) ? this.#words(seed, behind) : undefined,
      trace: behind.trace(),
      told: { material: this.#material(seed).told, state: this.#state(seed).told },
    });
  }

  /** How the door of the apartment born from this seed looks — the same deal as `of`, nothing else made. */
  look(apartmentSeed: Seed): DoorLook {
    const seed = apartmentSeed.branch(DOOR);
    const material = this.#material(seed);
    const state = this.#state(seed);
    return new DoorLook({
      material: material.name,
      state: state.name,
      family: material.key,
      stateLook: state.key,
    });
  }

  #material(seed: Seed): Line<MaterialFamily> {
    return seed.branch('material').pick(this.#materials);
  }

  #state(seed: Seed): Line<DoorStateLook> {
    return seed.branch('state').pick(this.#states);
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
