/**
 * Owns one fact: how a piece of text is shaped for the screen (U02, plain words) — a word written with its first
 * letter a capital (`Void`, not `VOID`), a label written plain (`HYDROPONIC BAY` → `Hydroponic bay`). Value object:
 * the engine's words and the presenters' labels are shaped here alike.
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

  /** The text written plain: lower case, its first letter a capital — `HYDROPONIC BAY` → `Hydroponic bay`. */
  plain(): string {
    return new Phrase(this.#text.toLowerCase()).capitalised();
  }

  equals(other: Phrase): boolean {
    return this.#text === other.#text;
  }
}
