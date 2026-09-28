import type { DoorStateLook } from '#engine/model/DoorStateLook.ts';

/** The ink each look of a door's state is drawn in: the mock's frost and cold blue, its static magenta, the frame's cyan. */
const INKS: Readonly<Record<DoorStateLook, string>> = { frost: 'bl', cold: 'bl', static: 'mg', plain: 'cy' };

/**
 * Owns one fact: how a door's look is drawn (U02) — the ink its state is drawn in, by the look's key (its list's
 * key column: identity by stable key; every key has an ink). The tower's door ticks, the corridor's doors and its
 * slider's ticks are drawn by it.
 */
export class DoorLooks {
  ink(look: DoorStateLook): string {
    return INKS[look];
  }
}
