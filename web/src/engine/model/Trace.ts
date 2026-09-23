/**
 * The five traces a door can carry, by the key the room lists name them by (`names/rooms/<Trait>`: `name|guarantee|trace`):
 * what the scan's TRACE column says and the sentence the door tells (AnomalousTrace.groovy:10-14). The old
 * sixth, "Tearing", no room ever gave; it is not here.
 */
const TRACES: Readonly<Record<string, { readonly name: string; readonly sentence: string }>> = {
  ozone: { name: 'Ozone', sentence: 'A sharp smell of ozone escapes the frame, ionizing the nearby air.' },
  frost: {
    name: 'Frost',
    sentence: 'Thin frost is forming on the magnetic hinges. Total absence of thermal signature detected.',
  },
  clicking: {
    name: 'Clicking',
    sentence:
      'A persistent, rhythmic clicking sound—like high-speed mechanical relays—originates from the lock housing.',
  },
  humming: {
    name: 'Humming',
    sentence: 'A heavy, low-frequency thrum (60Hz) vibrates through the surrounding strata.',
  },
  stillness: {
    name: 'Stillness',
    sentence: 'The air nearby is unnaturally still. Not even the standard system-hum is audible.',
  },
};

/**
 * A sensory clue a door gives about the first room behind it (Guide:203-217): the scan shows it, the
 * door list never does. Value object; identity is its key. A kind of room names its trace, so the trace
 * never lies (Guide:204).
 */
export class Trace {
  readonly #key: string;
  readonly #name: string;
  readonly #sentence: string;

  private constructor(key: string, name: string, sentence: string) {
    this.#key = key;
    this.#name = name;
    this.#sentence = sentence;
  }

  /** Static because it is the factory for the text form the room lists use; an unknown key is no trace. */
  static of(key: string): Trace | undefined {
    const words = TRACES[key];
    return words === undefined ? undefined : new Trace(key, words.name, words.sentence);
  }

  key(): string {
    return this.#key;
  }

  /** What the scan's TRACE column says. */
  name(): string {
    return this.#name;
  }

  /** What the door tells in the scan's sensory telemetry. */
  sentence(): string {
    return this.#sentence;
  }

  equals(other: Trace): boolean {
    return this.#key === other.#key;
  }
}
