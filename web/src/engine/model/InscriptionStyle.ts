/**
 * How a word is applied to a door — stamped `[WORD]`, scrawled `_word_`, etched `⟨WORD⟩`, burned
 * `!! WORD !!` (DoorInscription.groovy:10-24). Identity is the key; the four styles that exist are the
 * list below, a new one is one more entry.
 */
export class InscriptionStyle {
  readonly #key: string;
  readonly #before: string;
  readonly #after: string;
  readonly #lowered: boolean;
  readonly #applied: string;

  constructor(facts: { key: string; before: string; after: string; lowered?: boolean; applied: string }) {
    this.#key = facts.key;
    this.#before = facts.before;
    this.#after = facts.after;
    this.#lowered = facts.lowered ?? false;
    this.#applied = facts.applied;
  }

  key(): string {
    return this.#key;
  }

  format(word: string): string {
    return `${this.#before}${this.#lowered ? word.toLowerCase() : word}${this.#after}`;
  }

  /** How the word came to be on the door (DoorInscription.groovy:29-37). */
  narrative(word: string): string {
    return `The word '${this.#lowered ? word.toLowerCase() : word}' is ${this.#applied}.`;
  }

  equals(other: InscriptionStyle): boolean {
    return this.#key === other.#key;
  }
}

export const INSCRIPTION_STYLES: readonly InscriptionStyle[] = [
  new InscriptionStyle({
    key: 'stamped',
    before: '[',
    after: ']',
    applied: 'stamped into the metal in block letters',
  }),
  new InscriptionStyle({
    key: 'scrawled',
    before: '_',
    after: '_',
    lowered: true,
    applied: 'scrawled across the surface in jagged, desperate lines',
  }),
  new InscriptionStyle({
    key: 'etched',
    before: '⟨',
    after: '⟩',
    applied: 'finely etched into the frame, appearing almost as a structural glyph',
  }),
  new InscriptionStyle({
    key: 'burned',
    before: '!! ',
    after: ' !!',
    applied: 'burned into the material with a high-intensity plasma torch',
  }),
];
