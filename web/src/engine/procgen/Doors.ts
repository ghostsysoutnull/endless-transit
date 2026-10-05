import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Door } from '#engine/model/Door.ts';
import { DoorInscription } from '#engine/model/DoorInscription.ts';
import { DoorLook } from '#engine/model/DoorLook.ts';
import { type DoorStateLook, doorStateLook } from '#engine/model/DoorStateLook.ts';
import { type MaterialFamily, materialFamily } from '#engine/model/MaterialFamily.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import type { RoomCategory } from '#engine/model/RoomCategory.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { Dealer } from './Dealer.ts';
import type { DoorDeal } from './DoorDeal.ts';
import type { DoorSlot } from './DoorSlot.ts';

const LISTS = 'themes/doors';
/** The branch of an apartment's seed its door's words are rolled on. */
const DOOR = 'door';
/** The branches of a corridor's seed its doors' materials and states are dealt on. */
const MATERIALS = 'door-materials';
const STATES = 'door-states';
/** About one door in five has words on it (Guide:222; Door.groovy:31, CorridorFactory.groovy:51). */
const INSCRIBED = 0.2;

/** One line of a door list, read and typed once: the name, the sentence it is told in, the key a picture draws it by. */
interface Line<K> {
  readonly name: string;
  readonly told: string;
  readonly key: K;
}

/**
 * Owns one fact: how a door comes to be — a material from the list of the culture in force
 * (`themes/doors/materials/<culture>`) and a state from the list of the era in force
 * (`themes/doors/states/<era>`), each dealt among the corridor's doors on the corridor's seed, so no two
 * doors of a corridor share a material or a state while the list lasts; and, on the `door` branch of its
 * apartment's seed, one roll in five for words: the ones the room behind guarantees, else a word of the
 * inscription list in one of the four styles. Its look alone can be read without the apartment (`look`, the
 * peek, U02). A list is read whole and typed the first time a door asks for it: a line with an unknown key
 * refuses its list.
 */
export class Doors implements DoorDeal {
  readonly #library: ContentLibrary;
  readonly #deal: Dealer;
  readonly #materials = new Map<string, readonly Line<MaterialFamily>[]>();
  readonly #states = new Map<string, readonly Line<DoorStateLook>[]>();

  constructor(library: ContentLibrary, deal: Dealer) {
    this.#library = library;
    this.#deal = deal;
  }

  /** The door that stands in this slot. */
  of(slot: DoorSlot, behind: RoomCategory): Door {
    const seed = slot.corridor.child(slot.index).branch(DOOR);
    return new Door({
      look: this.look(slot),
      inscription: seed.branch('inscribed').probability(INSCRIBED) ? this.#words(seed, behind) : undefined,
      trace: behind.trace(),
      told: { material: this.#material(slot).told, state: this.#state(slot).told },
    });
  }

  /** How the door in this slot looks — the same deal as `of`, nothing else made. */
  look(slot: DoorSlot): DoorLook {
    const material = this.#material(slot);
    const state = this.#state(slot);
    return new DoorLook({
      material: material.name,
      state: state.name,
      family: material.key,
      stateLook: state.key,
    });
  }

  #material(slot: DoorSlot): Line<MaterialFamily> {
    const culture = slot.vibe.culture().key();
    let lines = this.#materials.get(culture);
    if (lines === undefined) {
      lines = this.#library
        .triples(`${LISTS}/materials/${culture}`)
        .map(([name, told, key]) => ({ name, told, key: materialFamily(key) }));
      this.#materials.set(culture, lines);
    }
    return this.#deal.nth(slot.corridor.branch(MATERIALS), lines, slot.index);
  }

  #state(slot: DoorSlot): Line<DoorStateLook> {
    const era = slot.vibe.era().key();
    let lines = this.#states.get(era);
    if (lines === undefined) {
      lines = this.#library
        .triples(`${LISTS}/states/${era}`)
        .map(([name, told, key]) => ({ name, told, key: doorStateLook(key) }));
      this.#states.set(era, lines);
    }
    return this.#deal.nth(slot.corridor.branch(STATES), lines, slot.index);
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
