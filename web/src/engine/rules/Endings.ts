import type { Ending, Run } from './Ending.ts';

/** A full expedition is this many places visited (Guide:426, SessionRecap.groovy:33). */
const EXPEDITION_PLACES = 20;
/** In tune: this many resonant traces. */
const TUNED_TRACES = 3;
/** Pacing: this many steps for each place visited. */
const PACING = 3;

/**
 * The endings of a session in the order they are tried (Guide:422-428): the first reached wins. Below the bedrock
 * first, then what the run carries out, how it went, the tally, where it ended, and the one every run reaches.
 */
const ENDINGS: readonly Ending[] = [
  { id: 'void', reached: (run) => run.here.abyssal() },
  { id: 'echo', reached: (run) => run.echo },
  { id: 'hybrid', reached: (run) => run.hybrid },
  { id: 'reborn', reached: (run) => run.reboots > 0 },
  { id: 'frayed', reached: (run) => run.critical },
  { id: 'empty', reached: (run) => run.places >= EXPEDITION_PLACES && run.relics === 0 },
  { id: 'pacing', reached: (run) => run.places > 0 && run.steps >= run.places * PACING },
  { id: 'tuned', reached: (run) => run.resonant >= TUNED_TRACES },
  { id: 'expedition', reached: (run) => run.places >= EXPEDITION_PLACES },
  // Above any planet no vibe is in force; a room is the one place that settles.
  { id: 'sky', reached: (run) => run.here.vibe() === undefined },
  { id: 'settled', reached: (run) => run.here.settled() },
  { id: 'severed', reached: () => true },
];

/** Owns one fact: which ending a run has reached. */
export class Endings {
  of(run: Run): string {
    return ENDINGS.find((ending) => ending.reached(run))?.id ?? '';
  }
}
