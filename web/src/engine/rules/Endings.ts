import type { Ending, Run } from './Ending.ts';

/** A full recap needs this many places visited (Guide:426, SessionRecap.groovy:33). */
const EXPEDITION_PLACES = 20;

/**
 * The endings of a session in the order they are tried (Guide:422-428, SessionRecap.groovy:14-69): the first
 * reached wins: below the bedrock first (Guide:424-425), then the full recap, then the one every run reaches.
 */
const ENDINGS: readonly Ending[] = [
  { id: 'void', reached: (run) => run.here.abyssal() },
  { id: 'expedition', reached: (run) => run.places >= EXPEDITION_PLACES },
  { id: 'severed', reached: () => true },
];

/** Owns one fact: which ending a run has reached. */
export class Endings {
  of(run: Run): string {
    return ENDINGS.find((ending) => ending.reached(run))?.id ?? '';
  }
}
