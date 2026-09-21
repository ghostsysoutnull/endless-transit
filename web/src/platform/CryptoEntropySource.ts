import type { EntropySource } from '#engine/rng/EntropySource.ts';
import { Seed } from '#engine/rng/Seed.ts';

/** New root seeds from the browser's cryptographic generator — the only randomness that enters the game. */
export class CryptoEntropySource implements EntropySource {
  readonly #crypto: Crypto;

  constructor(crypto: Crypto) {
    this.#crypto = crypto;
  }

  draw(): Seed {
    const [hi = 0, lo = 0] = this.#crypto.getRandomValues(new Uint32Array(2));
    return new Seed(hi, lo);
  }
}
