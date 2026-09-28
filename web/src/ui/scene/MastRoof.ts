import type { Painter } from '#ui/canvas/Painter.ts';
import type { RoofAt } from './RoofAt.ts';
import type { RoofDrawer } from './RoofDrawer.ts';

/** A mast: one upright at `at` of the span, `lift` times the rise high. */
export class MastRoof implements RoofDrawer {
  readonly #at: number;
  readonly #lift: number;

  constructor(proportions: { at: number; lift: number }) {
    this.#at = proportions.at;
    this.#lift = proportions.lift;
  }

  trace(painter: Painter, at: RoofAt): void {
    const x = at.origin + at.span * this.#at;
    painter.moveTo(x, at.base);
    painter.lineTo(x, at.base - at.rise * this.#lift);
  }
}
