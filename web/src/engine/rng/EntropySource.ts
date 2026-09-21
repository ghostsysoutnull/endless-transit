import type { Seed } from './Seed.ts';

/**
 * Where a brand-new root seed comes from. The engine never reaches for a clock or `Math.random`;
 * the browser adapter lives in `src/platform/`, the test double in `tests/support/`.
 */
export interface EntropySource {
  draw(): Seed;
}
