/** A building as its street draws it (U01b): its address, how many floors it stands and how many doors each has. */
export interface BuildingFigure {
  readonly address: string;
  readonly floors: number;
  readonly doors: number;
}
