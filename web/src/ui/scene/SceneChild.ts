/** What every picture knows of a listed place it draws (U01b): its option id (the pick), its number and name, its marks and its address. */
export interface SceneChild {
  readonly id: string;
  readonly ordinal: string;
  readonly name: string;
  readonly landmark: boolean;
  readonly visited: boolean;
  readonly sealed: boolean;
  readonly address: string;
}
