import type { InscriptionStyle } from './InscriptionStyle.ts';

/** Words on a door: a word and the style it was applied in. Value object, immutable. */
export class DoorInscription {
  readonly #word: string;
  readonly #style: InscriptionStyle;

  constructor(word: string, style: InscriptionStyle) {
    this.#word = word;
    this.#style = style;
  }

  word(): string {
    return this.#word;
  }

  style(): InscriptionStyle {
    return this.#style;
  }

  /** As it reads on the door list: `[DATA_VAULT]`, `!! DANGER !!`. */
  formatted(): string {
    return this.#style.format(this.#word);
  }
}
