import type { Painter } from '#ui/canvas/Painter.ts';
import type { Point } from './Point.ts';

/** A soft light round a point: what the corridor's lamps, its cold doors, its haze and you on the slider are lit by. */
export interface Glow {
  /** A glow of this colour, this strong at its heart, fading out by `radius`; the painter's shadow is left off. */
  at(painter: Painter, point: Point, radius: number, colour: string, alpha: number): void;
}
