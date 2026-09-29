/**
 * How the room you stand in is drawn (U03): the keys of the lists its walls and its lighting were dealt from (a
 * culture's, an era's — after a glitch or a fallback, the list the words actually came from), whether it is cold, how
 * many pieces of furniture stand in it, and whether its apartment is an anomaly. Value object.
 */
export class RoomLook {
  readonly #walls: string;
  readonly #light: string;
  readonly #cold: boolean;
  readonly #furniture: number;
  readonly #anomaly: boolean;

  constructor(facts: { walls: string; light: string; cold: boolean; furniture: number; anomaly: boolean }) {
    this.#walls = facts.walls;
    this.#light = facts.light;
    this.#cold = facts.cold;
    this.#furniture = facts.furniture;
    this.#anomaly = facts.anomaly;
  }

  /** The key of the walls' list: a culture's (`shogun`). */
  walls(): string {
    return this.#walls;
  }

  /** The key of the lighting's list: an era's (`ancient`). */
  light(): string {
    return this.#light;
  }

  cold(): boolean {
    return this.#cold;
  }

  furniture(): number {
    return this.#furniture;
  }

  anomaly(): boolean {
    return this.#anomaly;
  }

  equals(other: RoomLook): boolean {
    return (
      this.#walls === other.#walls &&
      this.#light === other.#light &&
      this.#cold === other.#cold &&
      this.#furniture === other.#furniture &&
      this.#anomaly === other.#anomaly
    );
  }
}
