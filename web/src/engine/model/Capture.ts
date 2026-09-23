import type { Fragment } from './Fragment.ts';

/**
 * What a room hands over when something is taken from it: the fragment, and whether this is its first
 * capture — a relic the room dealt, never yet in anyone's buffer — or a fragment somebody dropped here,
 * coming back as it was. Only a fresh capture counts toward the resonance tally (Decision 7: the old
 * game counted a drop-and-retake again, Room.groovy:227).
 */
export interface Capture {
  readonly fragment: Fragment;
  readonly fresh: boolean;
}
