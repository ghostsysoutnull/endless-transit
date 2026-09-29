import type { BuildingFigure } from './BuildingFigure.ts';
import type { Portrait } from './Portrait.ts';
import type { PortraitReader } from './PortraitReader.ts';

/** A street drawn with its buildings (U01b). */
export class StreetPortrait implements Portrait {
  readonly #buildings: readonly BuildingFigure[];

  constructor(buildings: readonly BuildingFigure[]) {
    this.#buildings = [...buildings];
  }

  drawnBy<R>(reader: PortraitReader<R>): R {
    return reader.street(this.#buildings);
  }
}
