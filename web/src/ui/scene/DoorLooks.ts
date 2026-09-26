/** The door states the mock draws in their own ink (its `frozen`/`cold` blue, `static` magenta); the rest in the frame's cyan. */
const INKS: Readonly<Record<string, string>> = { Frozen: 'bl', Cold: 'bl', Static: 'mg' };
const PLAIN = 'cy';

/**
 * Owns one fact: how a door's look is drawn (U02) — the ink its state is drawn in, by the state's name on its
 * list (the list's key column: identity by stable key; a state the table does not know is drawn plain). Shared by
 * the tower's door ticks and the corridor's doors.
 */
export class DoorLooks {
  ink(state: string): string {
    return INKS[state] ?? PLAIN;
  }
}
