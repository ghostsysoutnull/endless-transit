import type { CorridorShape } from './CorridorShape.ts';
import type { DoorLook } from './DoorLook.ts';

/**
 * A floor's corridor as it will be, read from the seeds when the floor is made (U02, the peek): how it runs
 * (its words' key: `long`, `service`, `curved`, `static`) and how each door looks, in the corridor's order —
 * neither the corridor nor its apartments made. Value object; a Layer has none (shape `none`, no looks).
 */
export class Passage {
  readonly #shape: CorridorShape;
  readonly #looks: readonly DoorLook[];

  constructor(shape: CorridorShape, looks: readonly DoorLook[]) {
    this.#shape = shape;
    this.#looks = [...looks];
  }

  shape(): CorridorShape {
    return this.#shape;
  }

  /** Each door's look, in the corridor's order. */
  looks(): readonly DoorLook[] {
    return this.#looks;
  }

  /** How many doors the corridor will have. */
  doors(): number {
    return this.#looks.length;
  }

  equals(other: Passage): boolean {
    return (
      this.#shape === other.#shape &&
      this.#looks.length === other.#looks.length &&
      this.#looks.every((look, index) => other.#looks[index]?.equals(look) === true)
    );
  }
}
