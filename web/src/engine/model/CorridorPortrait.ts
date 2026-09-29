import type { CorridorFigure } from './CorridorFigure.ts';
import type { Portrait } from './Portrait.ts';
import type { PortraitReader } from './PortraitReader.ts';

/** A floor drawn as its corridor, walked (U02). */
export class CorridorPortrait implements Portrait {
  readonly #corridor: CorridorFigure;

  constructor(corridor: CorridorFigure) {
    this.#corridor = corridor;
  }

  drawnBy<R>(reader: PortraitReader<R>): R {
    return reader.corridor(this.#corridor);
  }
}
