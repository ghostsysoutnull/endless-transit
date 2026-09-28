import type { Painter } from '#ui/canvas/Painter.ts';
import type { RoofAt } from './RoofAt.ts';

/** How one kind of roof is traced into a picture's open path (U02). Each picture keeps its own table by `RoofKind`. */
export interface RoofDrawer {
  trace(painter: Painter, at: RoofAt): void;
}
