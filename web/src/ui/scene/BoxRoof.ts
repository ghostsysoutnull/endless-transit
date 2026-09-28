import type { Painter } from '#ui/canvas/Painter.ts';
import type { RoofAt } from './RoofAt.ts';
import type { RoofDrawer } from './RoofDrawer.ts';

/** A box on top: from `from` to `to` of the span, `lift` times the rise high. */
export class BoxRoof implements RoofDrawer {
  readonly #from: number;
  readonly #to: number;
  readonly #lift: number;

  constructor(proportions: { from: number; to: number; lift: number }) {
    this.#from = proportions.from;
    this.#to = proportions.to;
    this.#lift = proportions.lift;
  }

  trace(painter: Painter, at: RoofAt): void {
    const left = at.origin + at.span * this.#from;
    const right = at.origin + at.span * this.#to;
    const top = at.base - at.rise * this.#lift;
    painter.moveTo(left, at.base);
    painter.lineTo(left, top);
    painter.lineTo(right, top);
    painter.lineTo(right, at.base);
  }
}
