/**
 * Owns one fact: how a piece of text is shaped for the screen (U02, plain words) — a word written with its first
 * letter a capital (`Void`, not `VOID`; `Hydroponic bay`). Value object: the engine's words and the presenters'
 * labels are shaped here alike.
 */
export class Phrase {
  readonly #text: string;

  constructor(text: string) {
    this.#text = text;
  }

  /** The text with its first letter a capital, the rest as it is: `baroque` → `Baroque`; `[STABLE]` stays. */
  capitalised(): string {
    return this.#text.charAt(0).toUpperCase() + this.#text.slice(1);
  }
}
