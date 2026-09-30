import type { AreaFigure } from './AreaFigure.ts';
import type { Portrait } from './Portrait.ts';
import type { PortraitReader } from './PortraitReader.ts';

/** A level above the street drawn as an area of its children (U04). */
export class AreaPortrait implements Portrait {
  readonly #area: AreaFigure;

  constructor(area: AreaFigure) {
    this.#area = { ...area, parts: [...area.parts] };
  }

  drawnBy<R>(reader: PortraitReader<R>): R {
    return reader.area(this.#area);
  }
}
