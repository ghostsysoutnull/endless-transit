import type { WallPattern } from './WallPattern.ts';

/** A plain wall: seamless, nothing traced — the void's, and any culture no pattern is listed for. */
export class PlainWall implements WallPattern {
  trace(): void {
    // Nothing: the wall's tint is all there is.
  }
}
