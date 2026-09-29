/** How a kind of level writes its number on the tower, the pad and in a Layer's name (U02). */
export interface LevelLabel {
  of(number: number): string;
}
