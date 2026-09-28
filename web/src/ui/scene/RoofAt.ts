/**
 * Where a picture traces a building's roof, in CSS pixels: the base it stands on and how high it may rise; the
 * origin and span its proportions are fractions of (the street: the building's left and width; the tower: its
 * middle and width); its middle; and the left and right of a flat top.
 */
export interface RoofAt {
  readonly base: number;
  readonly rise: number;
  readonly origin: number;
  readonly span: number;
  readonly middle: number;
  readonly left: number;
  readonly right: number;
}
