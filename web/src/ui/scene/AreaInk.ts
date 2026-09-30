import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { Fractions } from './Fractions.ts';
import type { Point } from './Point.ts';

/** The rings a glow is stacked from: soft light with only arcs and alpha. */
const GLOW_RINGS = 6;

/**
 * What the area drawings paint with (U04): a soft glow, a field of stars, a line through points, an ellipse — the
 * mock's helpers (`transit-reframed.html:650-665`) on the pictures' `Painter`. Every variation a hash, never the clock's
 * randomness; only the twinkle moves with the time.
 */
export class AreaInk {
  readonly #noise: Fractions;

  constructor(noise: Fractions) {
    this.#noise = noise;
  }

  /** A fraction in [0, 1) for a key and an index. */
  fraction(key: string, index: number): number {
    return this.#noise.fraction(key, index);
  }

  /** The level's ground: its background token over the whole picture. */
  ground(painter: Painter, size: PictureSize, palette: Palette): void {
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.setLineDash([]);
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, size.width, size.height);
  }

  /** A soft light: rings from wide and faint to small and bright. */
  glow(painter: Painter, at: Point, radius: number, ink: string, alpha: number): void {
    painter.fillStyle = ink;
    for (let ring = 0; ring < GLOW_RINGS; ring++) {
      painter.globalAlpha = alpha / GLOW_RINGS;
      painter.beginPath();
      painter.arc(at.x, at.y, radius * (1 - ring / GLOW_RINGS), 0, Math.PI * 2);
      painter.fill();
    }
    painter.globalAlpha = 1;
  }

  /** Small points that twinkle at their own paces, a few warm. */
  stars(
    painter: Painter,
    size: PictureSize,
    palette: Palette,
    seconds: number,
    key: string,
    count: number,
    alpha = 0.5,
  ): void {
    const text = palette('text');
    const warm = palette('yl');
    for (let star = 0; star < count; star++) {
      const x = this.#noise.fraction(`${key}-x`, star) * size.width;
      const y = this.#noise.fraction(`${key}-y`, star) * size.height;
      const pace = 0.5 + this.#noise.fraction(`${key}-pace`, star) * 1.8;
      const phase = this.#noise.fraction(`${key}-phase`, star) * 6;
      const big = this.#noise.fraction(`${key}-big`, star) < 0.07;
      painter.fillStyle = this.#noise.fraction(`${key}-warm`, star) < 0.14 ? warm : text;
      painter.globalAlpha = alpha * (0.25 + 0.6 * (0.55 + 0.45 * Math.sin(seconds * pace + phase)));
      painter.fillRect(x, y, big ? 1.8 : 1, big ? 1.8 : 1);
    }
    painter.globalAlpha = 1;
  }

  /** A path through the points, not stroked. */
  line(painter: Painter, points: readonly Point[]): void {
    painter.beginPath();
    points.forEach((point, index) => {
      if (index === 0) painter.moveTo(point.x, point.y);
      else painter.lineTo(point.x, point.y);
    });
  }

  /** The points of an ellipse, turned by `turn` radians. */
  ellipse(centre: Point, rx: number, ry: number, turn = 0, steps = 48): readonly Point[] {
    const points: Point[] = [];
    for (let step = 0; step <= steps; step++) {
      const angle = (step / steps) * Math.PI * 2;
      const x = Math.cos(angle) * rx;
      const y = Math.sin(angle) * ry;
      points.push({
        x: centre.x + x * Math.cos(turn) - y * Math.sin(turn),
        y: centre.y + x * Math.sin(turn) + y * Math.cos(turn),
      });
    }
    return points;
  }

  /** A cubic curve's points from `a` to `d`. */
  curve(a: Point, b: Point, c: Point, d: Point, steps = 32): readonly Point[] {
    const points: Point[] = [];
    for (let step = 0; step <= steps; step++) {
      const t = step / steps;
      const s = 1 - t;
      points.push({
        x: s * s * s * a.x + 3 * s * s * t * b.x + 3 * s * t * t * c.x + t * t * t * d.x,
        y: s * s * s * a.y + 3 * s * s * t * b.y + 3 * s * t * t * c.y + t * t * t * d.y,
      });
    }
    return points;
  }
}
