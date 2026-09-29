/** What a room is made of and lit by: the four words its neural-link interpretation is built from (Room.groovy:274-276). */
export interface Atmosphere {
  readonly structure: string;
  readonly colour: string;
  readonly walls: string;
  readonly lighting: string;
  /** The keys of the lists the walls and the lighting were dealt from (U03: what the room is drawn by). */
  readonly keys: { readonly walls: string; readonly light: string };
}
