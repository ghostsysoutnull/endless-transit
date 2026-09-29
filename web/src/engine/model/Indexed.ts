import type { IndexLabel } from './IndexLabel.ts';
import type { Position } from './Position.ts';

/** A kind whose places are counted among their siblings under a label (`ORBIT 02/05`). Value object. */
export class Indexed implements IndexLabel {
  readonly #label: string;

  constructor(label: string) {
    this.#label = label;
  }

  position(index: number, total: number): Position {
    return { counted: true, label: this.#label, index, total };
  }
}
