import type { Painter } from '#ui/canvas/Painter.ts';
import type { Glow } from './Glow.ts';
import type { Point } from './Point.ts';

/** Where the disc that casts a glow is drawn: this far to the left, out of sight; only its shadow lands. */
const ASIDE = 10000;

/**
 * Owns one fact: how a glow is drawn without a gradient (U02, the corridor) — the soft shadow of a disc drawn out of
 * sight, thrown back onto the point, so only the blur shows: strongest at its heart, gone by `radius`, as the mock's
 * radial gradients fade (a gradient to transparent would need the ink as `rgba`, which the palette does not give).
 * The shadow's blur and throw are in the canvas's own pixels, so both are scaled by the transform.
 */
export class ShadowGlow implements Glow {
  at(painter: Painter, point: Point, radius: number, colour: string, alpha: number): void {
    if (radius <= 0 || alpha <= 0) return;
    const scale = painter.getTransform().a;
    painter.globalAlpha = Math.min(1, alpha);
    painter.fillStyle = colour;
    painter.shadowColor = colour;
    painter.shadowBlur = radius * 0.6 * scale;
    painter.shadowOffsetX = ASIDE * scale;
    painter.beginPath();
    painter.arc(point.x - ASIDE, point.y, radius * 0.6, 0, Math.PI * 2);
    painter.fill();
    painter.shadowBlur = 0;
    painter.shadowOffsetX = 0;
  }
}
