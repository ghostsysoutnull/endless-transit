import type { EmblemMoment } from './EmblemMoment.ts';

/** An ending's small moving drawing on the End screen (the mock `docs/analysis/mocks/endings.html`); one class an ending. */
export interface EndingEmblem {
  paint(moment: EmblemMoment): void;
}
