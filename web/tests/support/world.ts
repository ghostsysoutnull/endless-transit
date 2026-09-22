import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Location } from '#engine/model/Location.ts';
import { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import { ThemeCatalog } from '#engine/procgen/ThemeCatalog.ts';
import type { WarningSink } from '#engine/content/WarningSink.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryWarningSink } from './MemoryWarningSink.ts';

/** The real generator on the real content — what the game itself builds in `main.ts`. */
export function realRegistry(warnings: WarningSink = new MemoryWarningSink()): LocationRegistry {
  const library = new ContentLibrary(new BundledContent());
  return new LocationRegistry(library, new ThemeCatalog(library), warnings);
}

/** Seed number `n` of a test sample: spread over both halves so neighbours share nothing. */
export function sampleSeed(n: number): Seed {
  return new Seed(Math.imul(n + 1, 0x9e3779b1), Math.imul(n + 7, 0x85ebca6b));
}

/**
 * The chain of places a traveller stands in, from `start` down to where `until` says stop or `choose` finds
 * nothing open on the list: [start, child, grandchild …]. Each step is what a journey does — the chosen
 * place's `arrival()`, so a door leads into the first room and a corridor onto its floor.
 */
export function descend(
  start: Location,
  choose: (listed: readonly Location[], depth: number) => number,
  until: (here: Location) => boolean = () => false,
): Location[] {
  const chain = [start];
  for (let here = start; !until(here);) {
    const open = here.listing().filter((child) => !child.sealed());
    const next = open[choose(open, chain.length - 1) % Math.max(open.length, 1)]?.arrival();
    if (next === undefined) return chain;
    chain.push(next);
    here = next;
  }
  return chain;
}

/** The big world only: the chain from `start` down to a street. */
export function toStreet(
  start: Location,
  choose: (listed: readonly Location[], depth: number) => number,
): Location[] {
  return descend(start, choose, (here) => here.kind().key() === 'street');
}

/** The value, or a failed test when it is missing — so a test never needs a cast to get past `undefined`. */
export function must<T>(value: T | undefined, what = 'a value'): T {
  if (value === undefined) throw new Error(`expected ${what}, got undefined`);
  return value;
}
