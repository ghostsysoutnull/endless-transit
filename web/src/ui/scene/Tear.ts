import type { BandCopy } from './BandCopy.ts';
import type { TearFrame } from './TearFrame.ts';

/** What a scene asks of `TearPass`: the coherence tear drawn over its finished frame, at a moment of the clock. */
export interface Tear {
  draw(context: CanvasRenderingContext2D, canvas: BandCopy, frame: TearFrame): void;
}
