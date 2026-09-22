/**
 * A move a place offers besides entering a child or leaving — up or down a floor, into the corridor, on to
 * the next room. Data only: `Location.move(id)` makes it. The engine gives it its key.
 */
export interface Move {
  readonly id: string;
  readonly label: string;
}
