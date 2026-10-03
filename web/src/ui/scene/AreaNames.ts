import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { NameLine } from './NameLine.ts';
import type { Point } from './Point.ts';

/** A name's line stands this far under its mark's middle; a crowded name drops one line lower. */
const DROP = 11;
const LINE = 13;
/** A mark's half-size: a name keeps clear of its neighbours' marks. */
const MARK = 12;
/** The room between two names, and between a name and the picture's edge and foot. */
const GAP = 6;
const EDGE = 2;
const FOOT = 14;
const CUT = '…';

/** A mark with its name, as wide as the picture's font writes it. */
interface Named {
  readonly index: number;
  readonly at: Point;
  readonly name: string;
  readonly width: number;
}

/** A name as it was placed: its line and how wide it came out. */
interface Placed {
  readonly line: NameLine;
  readonly width: number;
}

/**
 * Owns one fact: how the names under an area's marks share the room (U04). Every mark is written by its name, never
 * by its number. Left to right, a name takes the line under its mark when it fits there beside its neighbours' marks
 * and names, else whichever of that line and the one below it leaves it more room; a name that still does not fit is
 * cut short with an ellipsis. A name not placed yet is left its share of the gap, so the first to come does not take
 * it all. Pure: the same marks, names, size and measure always give the same lines.
 */
export class AreaNames {
  lines(
    spots: readonly Point[],
    names: readonly string[],
    size: PictureSize,
    measure: (text: string) => number,
  ): readonly NameLine[] {
    const marks = spots.map((at, index) => {
      const name = names[index] ?? '';
      return { index, at, name, width: measure(name) };
    });
    const queue = [...marks].sort((one, other) => one.at.x - other.at.x || one.index - other.index);
    const placed = new Map<number, Placed>();
    for (const mark of queue) {
      const top = this.#top(mark, queue, placed, size);
      const text = this.#cut(mark.name, top.room, measure);
      const width = measure(text);
      const half = width / 2;
      placed.set(mark.index, {
        line: {
          text,
          x: Math.min(Math.max(mark.at.x, half + EDGE), size.width - half - EDGE),
          y: top.y,
        },
        width,
      });
    }
    return marks.flatMap((mark) => {
      const done = placed.get(mark.index);
      return done === undefined ? [] : [done.line];
    });
  }

  /** The line a name takes and the room it has there: under its mark when it fits, else the roomier of that line and the next. */
  #top(
    mark: Named,
    marks: readonly Named[],
    placed: ReadonlyMap<number, Placed>,
    size: PictureSize,
  ): { readonly y: number; readonly room: number } {
    const first = this.#first(mark, size);
    const under = { y: first, room: this.#room(mark, first, marks, placed, size) };
    const lower = first + LINE;
    if (mark.width <= under.room || lower + LINE > size.height - EDGE) return under;
    const below = { y: lower, room: this.#room(mark, lower, marks, placed, size) };
    return below.room > under.room ? below : under;
  }

  /** The line right under a mark, kept above the picture's foot. */
  #first(mark: Named, size: PictureSize): number {
    return Math.min(mark.at.y + DROP, size.height - FOOT);
  }

  /** How wide a name may be on a line: clear of every other mark the line runs past, of the names placed on it, and of the share of those still to come. */
  #room(
    mark: Named,
    top: number,
    marks: readonly Named[],
    placed: ReadonlyMap<number, Placed>,
    size: PictureSize,
  ): number {
    let room = size.width - EDGE * 2;
    for (const other of marks) {
      if (other.index === mark.index) continue;
      const apart = Math.abs(other.at.x - mark.at.x);
      if (top < other.at.y + MARK && other.at.y - MARK < top + LINE)
        room = Math.min(room, 2 * (apart - MARK) - GAP);
      const done = placed.get(other.index);
      if (done !== undefined) {
        if (Math.abs(done.line.y - top) < LINE)
          room = Math.min(room, 2 * (Math.abs(done.line.x - mark.at.x) - GAP) - done.width);
      } else if (Math.abs(this.#first(other, size) - top) < LINE) {
        room = Math.min(room, 2 * (apart - GAP) - Math.min(other.width, apart - GAP));
      }
    }
    return room;
  }

  /** The name whole when it fits the room, else its longest start that does with the ellipsis after it — never less than one letter. */
  #cut(name: string, room: number, measure: (text: string) => number): string {
    if (measure(name) <= room) return name;
    for (let length = name.length - 1; length > 1; length--) {
      const short = `${name.slice(0, length).trimEnd()}${CUT}`;
      if (measure(short) <= room) return short;
    }
    return `${name.slice(0, 1)}${CUT}`;
  }
}
