import { Glitch } from '#engine/model/Glitch.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { Coherence } from './Coherence.ts';

const CORRUPT = 'corrupt';
/** Each character's chance of turning to static once the description corrupts (NarrativePaneComponent.groovy:25). */
const CHANCE = 0.1;

/**
 * Owns one fact: how low coherence shows in the place's description (Guide:155) — under the corruption
 * edge the coherence names, each line is read through static at this chance, seeded on the frame so the
 * same screen at the same step reads the same.
 */
export class Corruption {
  readonly #static = new Glitch();

  read(lines: readonly string[], coherence: Coherence, frame: Seed): readonly string[] {
    if (!coherence.corrupting()) return lines;
    const seed = frame.branch(CORRUPT);
    return lines.map((line, i) => this.#static.mangle(line, CHANCE, seed.branch(i)));
  }
}
