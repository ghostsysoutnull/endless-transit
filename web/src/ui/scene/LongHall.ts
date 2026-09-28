import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { HallShape } from './HallShape.ts';
import type { Point } from './Point.ts';

/**
 * A long corridor (designed for U02; the mock has none): straight, with no end in sight — it runs on into the haze.
 * On the slider, dots fading out. Also a corridor made without a shape.
 */
export class LongHall implements HallShape {
  bend(): number {
    return 0;
  }

  /** As deep as the fog lets anything show, whatever lies ahead. */
  reach(_ahead: number, sight: number): number {
    return sight;
  }

  end(): void {
    // No end wall: the hall runs on past the fog.
  }

  mark(painter: Painter, palette: Palette, point: Point): void {
    painter.fillStyle = palette('cy');
    for (let dot = 0; dot < 3; dot++) {
      painter.globalAlpha = 0.9 - dot * 0.3;
      painter.fillRect(point.x - 10 + dot * 8, point.y - 1.5, 3, 3);
    }
  }
}
