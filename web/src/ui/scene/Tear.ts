import type { Seed } from '#engine/rng/Seed.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { BandCopy } from './BandCopy.ts';

/** The frame a tear is drawn over: its size and inks, the frame's seed, how strongly it tears, the clock's moment. */
export interface TearFrame {
  readonly size: PictureSize;
  readonly palette: Palette;
  readonly noise: Seed;
  readonly decay: number;
  readonly time: number;
}

/** What a scene asks of `TearPass`: the coherence tear drawn over its finished frame, at a moment of the clock. */
export interface Tear {
  draw(context: CanvasRenderingContext2D, canvas: BandCopy, frame: TearFrame): void;
}
