import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { Point } from './Point.ts';
import type { AreaSpots } from './AreaSpots.ts';

/**
 * A city (U04; the mock's `city`, `:725-733`): blocks on a grid, windows lit here and there, traffic running
 * the lanes; its streets are lit lanes over the grid.
 */
export class CityScene implements AreaScene {
  readonly #ink: AreaInk;
  readonly #spread: AreaSpots;

  constructor(ink: AreaInk, spread: AreaSpots) {
    this.#ink = ink;
    this.#spread = spread;
  }

  spots(count: number, size: PictureSize, address: string): readonly Point[] {
    return this.#spread.grid(count, this.#spread.inner(size), address);
  }

  backdrop(moment: AreaMoment): void {
    const { painter, size, palette, seconds, address } = moment;
    const ink = this.#ink;
    const cell = Math.max(26, Math.min(size.width, size.height) / 11);
    const columns = Math.ceil(size.width / cell) + 1;
    const rows = Math.ceil(size.height / cell) + 1;
    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        const index = column * rows + row;
        const pad = 3 + ink.fraction(`${address}-pad`, index) * 3;
        painter.fillStyle = palette('cy');
        painter.globalAlpha = 0.05 + ink.fraction(`${address}-blk`, index) * 0.06;
        painter.fillRect(column * cell + pad, row * cell + pad, cell - pad * 2, cell - pad * 2);
        if (ink.fraction(`${address}-win`, index) < 0.35) {
          painter.fillStyle = palette(ink.fraction(`${address}-wk`, index) < 0.5 ? 'yl' : 'bc');
          painter.globalAlpha = 0.25 + 0.2 * Math.sin(seconds * 2 + column * row);
          painter.fillRect(column * cell + cell / 2, row * cell + cell / 2, 2, 2);
        }
      }
    }
    for (let car = 0; car < 26; car++) {
      const across = car % 2 === 0;
      const pace = 20 + ((car * 7) % 30);
      const lane = Math.floor(ink.fraction(`${address}-lane`, car) * (across ? rows : columns)) * cell;
      const run = (seconds * pace + car * 80) % (across ? size.width : size.height);
      painter.fillStyle = palette(car % 3 === 0 ? 'rd' : 'wh');
      painter.globalAlpha = 0.6;
      if (across) painter.fillRect(run, lane - 1, 3, 2);
      else painter.fillRect(lane - 1, run, 2, 3);
    }
    painter.globalAlpha = 1;
  }
}
