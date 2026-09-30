import type { AreaMoment } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** How a child looks inside its parent's area (U04), lit or sealed; one class a child kind, looked up by its `MarkLook`. */
export interface AreaMark {
  paint(
    moment: AreaMoment,
    at: Point,
    marked: { readonly lit: boolean; readonly sealed: boolean; readonly address: string },
  ): void;
}
