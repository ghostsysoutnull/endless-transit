import type { Seed } from '#engine/rng/Seed.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';

/** The frame a tear is drawn over: its size and inks, the frame's seed, how strongly it tears, the clock's moment. */
export interface TearFrame {
  readonly size: PictureSize;
  readonly palette: Palette;
  readonly noise: Seed;
  readonly decay: number;
  readonly time: number;
}
