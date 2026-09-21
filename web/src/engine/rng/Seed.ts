const TEXT_FORM = /^([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})$/i;
const TWO_POW_53 = 2 ** 53;

/**
 * A point in the generator's tree: 64 bits, held as two unsigned 32-bit halves.
 *
 * The one fact this class owns: **every seed is a pure function of (parent seed, branch key)**, and every
 * draw branches first (`RANGE`, `PICK`, `PROBABILITY`) and then reads the branch once. There is no stream
 * and no state — asking the same seed the same question always gives the same answer, in any order, so the
 * world can be generated lazily from any position.
 *
 * The algorithm is this game's own (queue decision 15 / study D0): two multiply-xor lanes over the key's
 * UTF-16 units, started from the parent's halves, then cross-mixed by an avalanche finalizer.
 */
export class Seed {
  readonly #hi: number;
  readonly #lo: number;

  constructor(hi: number, lo: number) {
    this.#hi = hi >>> 0;
    this.#lo = lo >>> 0;
  }

  /** Static because it is the factory for the text form `toString` writes (saves, a seed typed by hand). */
  static parse(text: string): Seed | undefined {
    const groups = TEXT_FORM.exec(text.trim());
    if (groups === null) return undefined;
    const hex = groups.slice(1).join('');
    return new Seed(Number.parseInt(hex.slice(0, 8), 16), Number.parseInt(hex.slice(8), 16));
  }

  branch(key: string | number): Seed {
    const text = String(key);
    let a = (this.#hi ^ 0x9e3779b9) >>> 0;
    let b = (this.#lo ^ 0x7f4a7c15) >>> 0;
    // Each lane also sees the other half, so (1, 0) and (0, 1) part ways before the first key unit.
    a = Math.imul(a ^ (b >>> 15), 0x85ebca6b);
    b = Math.imul(b ^ (a >>> 13), 0xc2b2ae35);
    for (let i = 0; i < text.length; i++) {
      const unit = text.charCodeAt(i);
      a = Math.imul(a ^ unit, 0x9e3779b1);
      b = Math.imul(b ^ unit, 0x5f356495);
      a = (a << 13) | (a >>> 19);
      b = (b << 17) | (b >>> 15);
    }
    a ^= text.length;
    a = Math.imul(a ^ (a >>> 16), 0x85ebca6b) ^ Math.imul(b ^ (b >>> 13), 0xc2b2ae35);
    b = Math.imul(b ^ (b >>> 16), 0x85ebca6b) ^ Math.imul(a ^ (a >>> 13), 0xc2b2ae35);
    a = Math.imul(a ^ (a >>> 16), 0x27d4eb2f) ^ (b >>> 15);
    return new Seed(a, b);
  }

  /** A whole number in [min, max], both ends included. */
  range(min: number, max: number): number {
    if (!Number.isInteger(min) || !Number.isInteger(max) || max < min) {
      throw new RangeError(`range needs whole numbers with min <= max, got ${String(min)}..${String(max)}`);
    }
    return min + Math.floor(this.branch('RANGE').#fraction() * (max - min + 1));
  }

  pick<T>(items: readonly T[]): T {
    const item = items[Math.floor(this.branch('PICK').#fraction() * items.length)];
    if (item === undefined) throw new RangeError('pick needs a list with at least one item');
    return item;
  }

  probability(chance: number): boolean {
    if (!(chance >= 0 && chance <= 1)) {
      throw new RangeError(`probability needs a chance in [0, 1], got ${String(chance)}`);
    }
    return this.branch('PROBABILITY').#fraction() < chance;
  }

  equals(other: Seed): boolean {
    return this.#hi === other.#hi && this.#lo === other.#lo;
  }

  toString(): string {
    const hex = (
      this.#hi.toString(16).padStart(8, '0') + this.#lo.toString(16).padStart(8, '0')
    ).toUpperCase();
    return `${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}-${hex.slice(12)}`;
  }

  /** The seed read once as a number in [0, 1): its top 53 bits. Private — a draw always branches first. */
  #fraction(): number {
    return (this.#hi * 0x200000 + (this.#lo >>> 11)) / TWO_POW_53;
  }
}
