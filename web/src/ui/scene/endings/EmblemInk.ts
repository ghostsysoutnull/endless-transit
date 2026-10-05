import type { Painter } from '#ui/canvas/Painter.ts';
import type { Point } from '#ui/scene/Point.ts';

export const TAU = Math.PI * 2;

/** What the emblems draw with: a line through points, a ring, a dot, a wave — each at an ink and an alpha, leaving alpha at 1. */
export class EmblemInk {
  line(painter: Painter, points: readonly Point[], ink: string, width = 1.5, alpha = 1): void {
    painter.globalAlpha = alpha;
    painter.strokeStyle = ink;
    painter.lineWidth = width;
    painter.beginPath();
    points.forEach((point, index) => {
      if (index === 0) painter.moveTo(point.x, point.y);
      else painter.lineTo(point.x, point.y);
    });
    painter.stroke();
    painter.globalAlpha = 1;
  }

  ring(painter: Painter, at: Point, radius: number, ink: string, width = 1.5, alpha = 1): void {
    painter.globalAlpha = alpha;
    painter.strokeStyle = ink;
    painter.lineWidth = width;
    painter.beginPath();
    painter.arc(at.x, at.y, Math.max(0, radius), 0, TAU);
    painter.stroke();
    painter.globalAlpha = 1;
  }

  dot(painter: Painter, at: Point, radius: number, ink: string, alpha = 1): void {
    painter.globalAlpha = alpha;
    painter.fillStyle = ink;
    painter.beginPath();
    painter.arc(at.x, at.y, Math.max(0, radius), 0, TAU);
    painter.fill();
    painter.globalAlpha = 1;
  }

  /** A sine wave from `from` to `to` across, about `y`. */
  wave(
    painter: Painter,
    span: { readonly from: number; readonly to: number; readonly y: number },
    shape: { readonly amplitude: number; readonly frequency: number; readonly phase: number },
    ink: string,
    width = 1.5,
    alpha = 1,
  ): void {
    const points: Point[] = [];
    for (let x = span.from; x <= span.to; x += 3) {
      points.push({
        x,
        y: span.y + Math.sin((x - span.from) * shape.frequency + shape.phase) * shape.amplitude,
      });
    }
    this.line(painter, points, ink, width, alpha);
  }
}
