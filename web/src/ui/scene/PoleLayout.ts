import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { PoleLane, PoleLevelVM } from '#ui/screens/PoleVM.ts';
import { type MarkLook, POLE_LANES, type PoleMark, PoleMarks } from './PoleMarks.ts';
import type { Point } from './Point.ts';

/** How far apart the levels stand: a node with its kind above, its name and tags under, clear of the next. */
const GAP = 200;
/** Room above the first level and below the last, for their words. */
const TOP = 84;
const FOOT = 120;
/** A node: the pole's main feature, big enough for its glyph to live in. */
const RADIUS = 46;
/** Its kind's middle above the node's edge; its name's and its tags' under it. */
const WORDS = { kind: 18, name: 26, tags: 50 } as const;
/** From a node's edge to the labels beside it; from the picture's edge to any words. */
const SIDE = 14;
const EDGE = 8;
/** A label right of its node — a value over its head — one under another; the current's, its pair over its head. */
const LABEL = { height: 36, step: 40, current: 52 } as const;
/** The labels' lowest edge stays this far above the name's middle. */
const CLEAR = 18;
/** The ships' empty berth: left of the node. */
const BERTH_FROM = 34;
/** The backdrop's words, in from the picture's edge. */
const INSET = 14;

/** One level's row: where it stands, its node, the middles of its kind, name and tags (each centred on the pole) and how wide they may run, and its button's box. */
export interface PoleRow {
  readonly y: number;
  readonly plate: Point;
  readonly radius: number;
  readonly words: {
    readonly kind: Point;
    readonly name: Point;
    readonly tags: Point;
    readonly width: number;
  };
  readonly box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number };
}

/** A value written right of the node whose level sets it, its word over its head: its box, its row, its lane, its word and how it came. */
export interface PoleLabel {
  readonly row: number;
  readonly lane: PoleLane;
  readonly word: string;
  readonly look: MarkLook;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/** The part of the pole the screen shows: from how far down, and how tall. */
export interface PoleWindow {
  readonly top: number;
  readonly height: number;
}

/**
 * Where the pole's parts stand at a width (the pole reworked after U05): the pole down the middle, a big node a level,
 * its kind above it, its name and tags under it, the values it sets written right of it with the drift current's
 * words under them, the ships' empty berths, the level in focus as the pole scrolls, and the backdrop's three rows pinned in the
 * window. Value object: the one place the pole's geometry is decided; where a value is written is its marks' to say.
 */
export class PoleLayout {
  readonly #levels: readonly PoleLevelVM[];
  readonly #marks: PoleMarks;
  readonly #width: number;
  readonly #height: number;
  readonly #first: number;

  private constructor(levels: readonly PoleLevelVM[], width: number, height: number) {
    this.#levels = levels;
    this.#marks = PoleMarks.of(levels);
    this.#width = width;
    const tall = TOP + FOOT + GAP * Math.max(0, levels.length - 1);
    this.#height = Math.max(height, tall);
    this.#first = TOP + (this.#height - tall) / 2;
  }

  /** The factory: the pole for these levels in a picture at least this size. */
  static of(levels: readonly PoleLevelVM[], size: PictureSize): PoleLayout {
    return new PoleLayout(levels, size.width, size.height);
  }

  /** The picture's size: as tall as the screen, or taller when the levels need it (it scrolls). */
  size(): PictureSize {
    return { width: this.#width, height: this.#height };
  }

  rows(): readonly PoleRow[] {
    const x = this.#spineX();
    return this.#levels.map((_level, index) => {
      const y = this.#y(index);
      return {
        y,
        plate: { x, y },
        radius: RADIUS,
        words: {
          kind: { x, y: y - RADIUS - WORDS.kind },
          name: { x, y: y + RADIUS + WORDS.name },
          tags: { x, y: y + RADIUS + WORDS.tags },
          width: this.#width - EDGE * 2,
        },
        box: { x: 0, y: y - GAP / 2, width: this.#width, height: GAP },
      };
    });
  }

  /** The spine from the first level down to you. */
  spine(): { readonly x: number; readonly top: number; readonly bottom: number } {
    return { x: this.#spineX(), top: this.#y(0), bottom: this.#y(this.#levels.length - 1) };
  }

  /** Each value written right of the node that sets it, one under another, centred on its row. */
  labels(): readonly PoleLabel[] {
    const x = this.#labelX();
    return this.#levels.flatMap((_level, row) => {
      const marks = this.#marks.at(row);
      const top = this.#stackTop(row);
      return marks.map((mark, index) => ({
        row,
        lane: mark.lane,
        word: mark.word,
        look: mark.look,
        x,
        y: top + index * LABEL.step,
        width: this.#width - EDGE - x,
        height: LABEL.height,
      }));
    });
  }

  /** The drift current's pair, a label under the values of the level where it first shows or changes. */
  currents(): readonly {
    readonly row: number;
    readonly words: readonly string[];
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  }[] {
    const x = this.#labelX();
    return this.#levels.flatMap((_level, row) => {
      const words = this.#marks.current(row);
      if (words.length === 0) return [];
      return [
        {
          row,
          words,
          x,
          y: this.#stackTop(row) + this.#marks.at(row).length * LABEL.step,
          width: this.#width - EDGE - x,
          height: LABEL.current,
        },
      ];
    });
  }

  /** The ships' empty berths, left of their levels' nodes. */
  berths(): readonly Point[] {
    return this.#levels.flatMap((level, index) =>
      level.berth ? [{ x: this.#spineX() - RADIUS - BERTH_FROM, y: this.#y(index) }] : [],
    );
  }

  /**
   * The level in focus through this window: the first at the top of the scroll, the last at the bottom, and between
   * them the level nearest a point that slides down the window as it scrolls.
   */
  focus(window: PoleWindow): number {
    const travel = this.#height - window.height;
    const share = travel > 0 ? Math.min(1, Math.max(0, window.top / travel)) : 0.5;
    const y = window.top + window.height * share;
    let nearest = 0;
    this.#levels.forEach((_level, index) => {
      if (Math.abs(this.#y(index) - y) < Math.abs(this.#y(nearest) - y)) nearest = index;
    });
    return nearest;
  }

  /** The vibe in force at a level: what the backdrop writes when it is in focus. */
  inForce(index: number): Readonly<Record<PoleLane, PoleMark>> {
    return this.#marks.inForce(index);
  }

  /** The backdrop's rows, pinned in the window: era, culture and trait, a third of it each, their head above their word. */
  backdrop(window: PoleWindow): readonly {
    readonly lane: PoleLane;
    readonly head: Point;
    readonly word: Point;
    readonly width: number;
  }[] {
    return POLE_LANES.map((lane, index) => {
      const middle = window.top + (window.height * (index * 2 + 1)) / 6;
      return {
        lane,
        head: { x: INSET, y: middle - 30 },
        word: { x: INSET, y: middle + 14 },
        width: this.#width - INSET * 2,
      };
    });
  }

  #spineX(): number {
    return this.#width / 2;
  }

  #labelX(): number {
    return this.#spineX() + RADIUS + SIDE;
  }

  /** Where a row's labels start: centred on it, raised when there are so many they would reach its name. */
  #stackTop(row: number): number {
    const values = this.#marks.at(row).length * LABEL.step;
    const tall =
      this.#marks.current(row).length > 0 ? values + LABEL.current : values - (LABEL.step - LABEL.height);
    const y = this.#y(row);
    return Math.min(y - tall / 2, y + RADIUS + WORDS.name - CLEAR - tall);
  }

  #y(index: number): number {
    return this.#first + GAP * index;
  }
}
