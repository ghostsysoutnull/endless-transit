import type { PoleLane, PoleLevelVM } from '#ui/screens/PoleVM.ts';

/** How a value came to a level: set plainly, swapped in by a rebel district, brought by a drift; or nothing held yet. */
export type MarkLook = 'set' | 'rebel' | 'drift' | 'none';

/** A value as the pole writes it: its lane, its word, how it came. */
export interface PoleMark {
  readonly lane: PoleLane;
  readonly word: string;
  readonly look: MarkLook;
}

/** The pole's values, in the order they are written and stacked. */
export const POLE_LANES: readonly PoleLane[] = ['era', 'culture', 'trait'];

/**
 * Where the pole writes a value: a level writes a lane where it sets the value anew — a word the level above did not
 * hold, a rebel district's swap (era and culture, even one that stays the same), or the start of a drift — and the
 * vibe in force at a level is each lane's last writing at or above it. Where the drift current's words show goes
 * with it: where the second pair first shows or changes. Value object: the one place this rule lives; the layout
 * places the marks, the picture inks them.
 */
export class PoleMarks {
  readonly #levels: readonly PoleLevelVM[];
  readonly #marks: readonly (readonly PoleMark[])[];

  private constructor(levels: readonly PoleLevelVM[]) {
    this.#levels = levels;
    this.#marks = levels.map((level, index) =>
      POLE_LANES.flatMap((lane) => this.#mark(level, levels[index - 1], lane)),
    );
  }

  /** The factory: the marks of these levels, top down. */
  static of(levels: readonly PoleLevelVM[]): PoleMarks {
    return new PoleMarks(levels);
  }

  /** The values this level writes, in lane order. */
  at(index: number): readonly PoleMark[] {
    return this.#marks[index] ?? [];
  }

  /** The vibe in force at this level: each lane's last writing at or above it, `none` where nothing is held yet. */
  inForce(index: number): Readonly<Record<PoleLane, PoleMark>> {
    const held = (lane: PoleLane): PoleMark =>
      this.#marks
        .slice(0, index + 1)
        .flat()
        .findLast((mark) => mark.lane === lane) ?? { lane, word: '', look: 'none' };
    return { era: held('era'), culture: held('culture'), trait: held('trait') };
  }

  /** The drift current's pair, era then culture, where it first shows or changes; nothing elsewhere. */
  current(index: number): readonly string[] {
    const here = this.#levels[index]?.current;
    const above = this.#levels[index - 1]?.current;
    if (here === undefined || here.era === '') return [];
    return here.era === above?.era && here.culture === above.culture ? [] : [here.era, here.culture];
  }

  #mark(level: PoleLevelVM, above: PoleLevelVM | undefined, lane: PoleLane): readonly PoleMark[] {
    const word = level.values[lane];
    if (word === '') return [];
    const rebel = lane !== 'trait' && level.rebel;
    const drift = lane !== 'trait' && level.drift[lane] && above?.drift[lane] !== true;
    if (!rebel && !drift && word === above?.values[lane]) return [];
    return [{ lane, word, look: rebel ? 'rebel' : drift ? 'drift' : 'set' }];
  }
}
