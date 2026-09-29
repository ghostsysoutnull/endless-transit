/** What a picture or its part asks of the scene's hash (`SceneHash`): a fraction in [0, 1) for a text and an index. */
export interface Fractions {
  fraction(text: string, index: number): number;
}
