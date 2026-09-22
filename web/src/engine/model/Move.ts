/**
 * A move a place offers besides entering a child or leaving — up or down a floor, into the corridor, on to
 * the next room. Data only: `Location.move(id)` makes it. The engine gives it its key. A move names the
 * move that undoes it, so a screen whose button for this move has just vanished (the ride reached its end)
 * never rests the focus on the way back.
 */
export interface Move {
  readonly id: string;
  readonly label: string;
  /** The id of the move that undoes this one (`up` ↔ `down`). */
  readonly opposite: string;
}
