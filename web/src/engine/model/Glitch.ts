import type { Seed } from '#engine/rng/Seed.ts';

/** The static a glitched character becomes (Terminal.groovy:175). */
const STATIC = Array.from('█▓▒░/\\%!$#*');

/**
 * Owns one fact: how text is glitched — each character but a space replaced by static with the given
 * chance (Terminal.groovy:173-183). Seeded on whatever the caller hands in, so a glitched line reads the
 * same every time the same place is drawn; the Groovy game rolled the clock and the line flickered.
 */
export class Glitch {
  mangle(text: string, chance: number, seed: Seed): string {
    return Array.from(text, (char, i) => {
      if (char === ' ' || char === '\n' || !seed.branch(i).probability(chance)) return char;
      return seed.branch(i).pick(STATIC);
    }).join('');
  }
}
