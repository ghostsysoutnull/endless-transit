import type { Seed } from '#engine/rng/Seed.ts';
import type { Sketch } from './Sketch.ts';

/** A world as the title's picture shows it: its universe's sketch, the place the way down goes into, and its noise. */
export interface TitleWorld {
  /** What tells one world from another: a new key resolves anew. */
  readonly key: string;
  readonly sketch: Sketch;
  readonly into: string;
  readonly noise: Seed;
}
