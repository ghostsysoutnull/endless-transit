import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { SightLook } from './SightLook.ts';

/** The fog's hatching, this far apart and this strong; a fogged room this faint on the minimap. */
const HATCH = { gap: 9, alpha: 0.15 };
const SMALL = 0.08;

/** A room not yet reached: bare floor under a hatching of fog, no words, no marks, faint on the minimap. */
export class FogLook implements SightLook {
  paintFloor(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void {
    painter.fillStyle = palette('ground');
    painter.globalAlpha = 1;
    painter.fillRect(box.x, box.y, box.width, box.height);
    painter.save();
    painter.beginPath();
    painter.rect(box.x, box.y, box.width, box.height);
    painter.clip();
    painter.strokeStyle = palette('cy');
    painter.globalAlpha = HATCH.alpha;
    painter.lineWidth = 1;
    painter.beginPath();
    for (let d = -box.height; d < box.width; d += HATCH.gap) {
      painter.moveTo(box.x + d, box.y + box.height);
      painter.lineTo(box.x + d + box.height, box.y);
    }
    painter.stroke();
    painter.restore();
  }

  label(): void {
    // Nothing is written in fog.
  }

  paintDot(): void {
    // A room in fog was never visited.
  }

  paintSmall(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void {
    painter.fillStyle = palette('cy');
    painter.globalAlpha = SMALL;
    painter.fillRect(box.x, box.y, box.width, box.height);
  }
}
