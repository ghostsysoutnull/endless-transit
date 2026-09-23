import type { Painter } from './Painter.ts';
import type { Palette } from './Palette.ts';

/** The size of a canvas in CSS pixels. */
export interface PictureSize {
  readonly width: number;
  readonly height: number;
}

/**
 * A drawing as a pure function: view-model in, calls on the painter out. The same view-model at the same
 * size and phase always makes the same calls, so a frame is reproducible. `phase` runs 0 → 1 for the one
 * thing that may move (a pulse); a picture painted once with a fixed phase is the still.
 */
export interface Picture<VM> {
  /** How tall the picture wants to be for this width, in CSS pixels. */
  height(vm: VM, width: number): number;
  paint(painter: Painter, vm: VM, size: PictureSize, palette: Palette, phase: number): void;
}
