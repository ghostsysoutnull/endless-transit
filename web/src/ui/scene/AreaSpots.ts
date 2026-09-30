import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { Fractions } from './Fractions.ts';
import type { Point } from './Point.ts';

/** How far from the picture's edge a child stands, so its tap box and its name stay inside. */
const MARGIN = 30;

/**
 * Owns one fact: the ways the area drawings spread their children (U04) — round a ring, over a grid of cells, in a
 * zigzag along a line — each at least a tap apart for the counts the game deals, a little jittered by the hash.
 */
export class AreaSpots {
  readonly #noise: Fractions;

  constructor(noise: Fractions) {
    this.#noise = noise;
  }

  /** Round an ellipse about `centre`, starting at `start` radians. */
  ring(count: number, centre: Point, rx: number, ry: number, start = -Math.PI / 2): readonly Point[] {
    return Array.from({ length: count }, (_, index) => {
      const angle = start + (index / count) * Math.PI * 2;
      return { x: centre.x + Math.cos(angle) * rx, y: centre.y + Math.sin(angle) * ry };
    });
  }

  /** Over a grid filling `box`, row by row, each nudged within its cell by the hash of `key`. */
  grid(
    count: number,
    box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number },
    key: string,
  ): readonly Point[] {
    const columns = Math.max(
      1,
      Math.min(count, Math.ceil(Math.sqrt(count * (box.width / Math.max(1, box.height))))),
    );
    const rows = Math.ceil(count / columns);
    const cellWidth = box.width / columns;
    const cellHeight = box.height / rows;
    return Array.from({ length: count }, (_, index) => {
      const row = Math.floor(index / columns);
      const inRow = row === rows - 1 ? count - row * columns : columns;
      const column = index % columns;
      const offset = (columns - inRow) * cellWidth * 0.5;
      const nudgeX = (this.#noise.fraction(`${key}-gx`, index) - 0.5) * Math.max(0, cellWidth - 48) * 0.6;
      const nudgeY = (this.#noise.fraction(`${key}-gy`, index) - 0.5) * Math.max(0, cellHeight - 48) * 0.6;
      return {
        x: box.x + offset + cellWidth * (column + 0.5) + nudgeX,
        y: box.y + cellHeight * (row + 0.5) + nudgeY,
      };
    });
  }

  /** Along a line from `from` to `to`, every other one lifted by `swing` — a zigzag, so neighbours stay a tap apart. */
  zigzag(count: number, from: Point, to: Point, swing: number): readonly Point[] {
    return Array.from({ length: count }, (_, index) => {
      const t = count === 1 ? 0.5 : index / (count - 1);
      const side = count === 1 ? 0 : index % 2 === 0 ? -1 : 1;
      return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t + side * swing };
    });
  }

  /** The box the children stand in: the picture less its margin. */
  inner(size: PictureSize): {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  } {
    return { x: MARGIN, y: MARGIN * 0.7, width: size.width - MARGIN * 2, height: size.height - MARGIN * 1.9 };
  }
}
