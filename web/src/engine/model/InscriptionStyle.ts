/**
 * How a word is applied to a door — stamped `[WORD]`, scrawled `_word_`, etched `⟨WORD⟩`, burned
 * `!! WORD !!` (DoorInscription.groovy:62-76). Identity is the key; the four styles that exist are the
 * list below, a new one is one more entry.
 */
export class InscriptionStyle {
  readonly #key: string;
  readonly #before: string;
  readonly #after: string;
  readonly #lowered: boolean;

  constructor(facts: { key: string; before: string; after: string; lowered?: boolean }) {
    this.#key = facts.key;
    this.#before = facts.before;
    this.#after = facts.after;
    this.#lowered = facts.lowered ?? false;
  }

  key(): string {
    return this.#key;
  }

  format(word: string): string {
    return `${this.#before}${this.#lowered ? word.toLowerCase() : word}${this.#after}`;
  }

  equals(other: InscriptionStyle): boolean {
    return this.#key === other.#key;
  }
}

export const INSCRIPTION_STYLES: readonly InscriptionStyle[] = [
  new InscriptionStyle({ key: 'stamped', before: '[', after: ']' }),
  new InscriptionStyle({ key: 'scrawled', before: '_', after: '_', lowered: true }),
  new InscriptionStyle({ key: 'etched', before: '⟨', after: '⟩' }),
  new InscriptionStyle({ key: 'burned', before: '!! ', after: ' !!' }),
];
