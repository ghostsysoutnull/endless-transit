/** An era and a culture, by their keys in the game's lists. */
export interface VibePair {
  readonly era: string;
  readonly culture: string;
}

/**
 * A level's vibe as the pole reads it (U05, Decision 14): nothing above the planet; at the planet its main and second
 * pairs and their stability; from the country down the trait too, whether the level swapped the pairs (a rebel
 * district) and which of its values it drew from the second pair (a drifted apartment and its rooms).
 */
export type VibeFigure =
  | { readonly held: 'none' }
  | {
      readonly held: 'planet';
      readonly main: VibePair;
      readonly second: VibePair;
      readonly stability: number;
    }
  | {
      readonly held: 'country';
      readonly main: VibePair;
      readonly second: VibePair;
      readonly stability: number;
      readonly trait: string;
      readonly rebel: boolean;
      readonly drift: { readonly era: boolean; readonly culture: boolean };
    };
