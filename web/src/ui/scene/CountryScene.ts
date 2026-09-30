import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { Point } from './Point.ts';
import type { AreaSpots } from './AreaSpots.ts';

/**
 * A country (U04; the mock's `country`, `:713-724`): its coast seen from above over a rippling sea, hatched
 * lowlands, rivers; its cities stand over a grid inside the coast.
 */
export class CountryScene implements AreaScene {
  readonly #ink: AreaInk;
  readonly #spread: AreaSpots;

  constructor(ink: AreaInk, spread: AreaSpots) {
    this.#ink = ink;
    this.#spread = spread;
  }

  spots(count: number, size: PictureSize, address: string): readonly Point[] {
    const { centre, rx, ry } = this.#land(size);
    return this.#spread.grid(
      count,
      { x: centre.x - rx * 0.82, y: centre.y - ry * 0.7, width: rx * 1.64, height: ry * 1.4 },
      address,
    );
  }

  backdrop(moment: AreaMoment): void {
    const { painter, size, palette, seconds, address } = moment;
    const ink = this.#ink;
    const { centre, rx, ry } = this.#land(size);
    painter.strokeStyle = palette('cy');
    painter.globalAlpha = 0.08;
    painter.lineWidth = 1;
    for (let y = 0; y < size.height; y += 14) {
      const wave = Math.sin(seconds + y) * 1.5;
      painter.beginPath();
      painter.moveTo(0, y + wave);
      painter.lineTo(size.width, y + wave);
      painter.stroke();
    }
    const bumps = [0, 1, 2, 3].map((k) => ({
      phase: ink.fraction(`${address}-cb`, k) * 6,
      waves: 1 + Math.floor(ink.fraction(`${address}-cw`, k) * 5),
      depth: ink.fraction(`${address}-cd`, k) * 0.12,
    }));
    const coast: Point[] = [];
    for (let step = 0; step <= 72; step++) {
      const angle = (step / 72) * Math.PI * 2;
      let reach = 1;
      for (const bump of bumps) reach *= 1 + bump.depth * Math.sin(angle * bump.waves + bump.phase);
      coast.push({ x: centre.x + Math.cos(angle) * rx * reach, y: centre.y + Math.sin(angle) * ry * reach });
    }
    painter.fillStyle = palette('panel2');
    painter.globalAlpha = 1;
    ink.line(painter, coast);
    painter.closePath();
    painter.fill();
    painter.strokeStyle = palette('bc');
    painter.globalAlpha = 0.55;
    painter.lineWidth = 1.4;
    painter.stroke();
    painter.save();
    ink.line(painter, coast);
    painter.closePath();
    painter.clip();
    painter.strokeStyle = palette('bc');
    painter.globalAlpha = 0.14;
    painter.lineWidth = 1;
    for (let x = -size.height; x < size.width; x += 9) {
      painter.beginPath();
      painter.moveTo(x, centre.y + ry * 0.4);
      painter.lineTo(x + size.height, centre.y + ry * 0.4 + size.height);
      painter.stroke();
    }
    painter.strokeStyle = palette('bl');
    painter.globalAlpha = 0.4;
    for (let river = 0; river < 3; river++) {
      const x = (k: number): number =>
        centre.x + (ink.fraction(`${address}-rv`, river * 3 + k) - 0.5) * rx * 2;
      ink.line(
        painter,
        ink.curve(
          { x: x(0), y: centre.y - ry * 1.1 },
          { x: x(1), y: centre.y - ry * 0.2 },
          { x: x(1), y: centre.y + ry * 0.2 },
          { x: x(2), y: centre.y + ry * 1.1 },
          24,
        ),
      );
      painter.stroke();
    }
    painter.restore();
    painter.globalAlpha = 1;
  }

  #land(size: PictureSize): { readonly centre: Point; readonly rx: number; readonly ry: number } {
    return {
      centre: { x: size.width / 2, y: size.height / 2 },
      rx: size.width * 0.42,
      ry: size.height * 0.4,
    };
  }
}
