import type { Painter } from '#ui/canvas/Painter.ts';
import type { RoofAt } from './RoofAt.ts';
import type { RoofDrawer } from './RoofDrawer.ts';

/** A landmark's peak: two slopes from `from` to `to` of the span, meeting over the middle, `lift` times the rise high, never above `ceiling`. */
export class PeakRoof implements RoofDrawer {
  readonly #from: number;
  readonly #to: number;
  readonly #lift: number;
  readonly #ceiling: number;

  constructor(proportions: { from: number; to: number; lift: number; ceiling: number }) {
    this.#from = proportions.from;
    this.#to = proportions.to;
    this.#lift = proportions.lift;
    this.#ceiling = proportions.ceiling;
  }

  trace(painter: Painter, at: RoofAt): void {
    painter.moveTo(at.origin + at.span * this.#from, at.base);
    painter.lineTo(at.middle, Math.max(this.#ceiling, at.base - at.rise * this.#lift));
    painter.lineTo(at.origin + at.span * this.#to, at.base);
  }
}
