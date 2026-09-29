import type { PlanFigure } from './PlanFigure.ts';
import type { Portrait } from './Portrait.ts';
import type { PortraitReader } from './PortraitReader.ts';

/** A room drawn as its apartment's plan, zoomed into it (U03). */
export class PlanPortrait implements Portrait {
  readonly #plan: PlanFigure;

  constructor(plan: PlanFigure) {
    this.#plan = plan;
  }

  drawnBy<R>(reader: PortraitReader<R>): R {
    return reader.plan(this.#plan);
  }
}
