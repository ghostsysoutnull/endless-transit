import type { Seed } from '#engine/rng/Seed.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';

/** What a scene asks of `TearPass`: the coherence tear drawn over its finished frame, at a moment of the clock. */
export interface Tear {
  draw(
    context: CanvasRenderingContext2D,
    canvas: PixelCanvas,
    frame: { size: PictureSize; palette: Palette; noise: Seed; decay: number; time: number },
  ): void;
}
