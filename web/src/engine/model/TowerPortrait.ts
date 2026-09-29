import type { Portrait } from './Portrait.ts';
import type { PortraitReader } from './PortraitReader.ts';
import type { TowerFigure } from './TowerFigure.ts';

/** A building drawn as its tower (U02): inside it, and at a floor's elevator. */
export class TowerPortrait implements Portrait {
  readonly #tower: TowerFigure;

  constructor(tower: TowerFigure) {
    this.#tower = tower;
  }

  drawnBy<R>(reader: PortraitReader<R>): R {
    return reader.tower(this.#tower);
  }
}
