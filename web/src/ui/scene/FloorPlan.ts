import type { PlanBox } from './PlanBox.ts';
import type { PlanDoor } from './PlanDoor.ts';

/**
 * An apartment's plan (U03): its footprint, its rooms in walking order, a doorway between each room and the next and
 * the entrance into the first from below. What `PlanLayout` lays out; the picture and its camera draw and frame it.
 * Immutable.
 */
export class FloorPlan {
  readonly #width: number;
  readonly #height: number;
  readonly #rooms: readonly PlanBox[];
  readonly #doors: readonly PlanDoor[];
  readonly #entry: PlanDoor;

  constructor(facts: {
    width: number;
    height: number;
    rooms: readonly PlanBox[];
    doors: readonly PlanDoor[];
    entry: PlanDoor;
  }) {
    if (facts.doors.length !== facts.rooms.length - 1)
      throw new RangeError('a door between each room and the next');
    this.#width = facts.width;
    this.#height = facts.height;
    this.#rooms = Object.freeze([...facts.rooms]);
    this.#doors = Object.freeze([...facts.doors]);
    this.#entry = facts.entry;
  }

  width(): number {
    return this.#width;
  }

  height(): number {
    return this.#height;
  }

  rooms(): readonly PlanBox[] {
    return this.#rooms;
  }

  /** Door `i` joins room `i` and room `i + 1`. */
  doors(): readonly PlanDoor[] {
    return this.#doors;
  }

  /** Into the first room, through the bottom of the footprint. */
  entry(): PlanDoor {
    return this.#entry;
  }
}
