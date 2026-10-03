import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { NameLine } from './NameLine.ts';
import type { Point } from './Point.ts';

/** A name's first line stands this far under its mark's middle; it runs to at most this many lines, one under the other. */
const DROP = 11;
const LINE = 13;
const ROWS = 3;
/** A mark's half-size: a name keeps clear of its neighbours' marks. */
const MARK = 12;
/** The room between two names, and between a name and the picture's edge and foot. */
const GAP = 6;
const EDGE = 2;
const FOOT = 14;
const CUT = '…';
/** Where a name may break: at its spaces, and after a hyphen, which stays. */
const BREAKS = /\s+|(?<=-)/;

/** A mark with its name, as wide as the picture's font writes it. */
interface Named {
  readonly index: number;
  readonly at: Point;
  readonly name: string;
  readonly width: number;
}

/** One line of a name as it was laid: its words, its top, and the room it had there. */
interface Laid {
  readonly text: string;
  readonly top: number;
  readonly room: number;
}

/** A name as the lines could hold it: the lines filled, the words left over, and the roomiest line looked at. */
interface Filled {
  readonly lines: readonly Laid[];
  readonly left: readonly string[];
  readonly roomiest: Laid;
}

/** One line of a name as it was placed: where it stands and how wide it came out. */
interface Placed {
  readonly line: NameLine;
  readonly width: number;
}

/**
 * Owns one fact: how the names under an area's marks share the room (U04). Every mark is written by its name, never
 * by its number. Left to right, a name fills the line under its mark with as many of its words as fit beside its
 * neighbours' marks and names, breaks onto the next line, and the next — three at most, all inside the picture; a
 * name whose first word finds no room on a line starts on the one below. Only what still does not fit is cut short
 * with an ellipsis. A name not placed yet is left its share of the gap, so the first to come does not take it all.
 * Pure: the same marks, names, size and measure always give the same lines.
 */
export class AreaNames {
  /** Each mark's name as the lines the picture writes, in the marks' order. */
  lines(
    named: readonly { readonly at: Point; readonly name: string }[],
    size: PictureSize,
    measure: (text: string) => number,
  ): readonly (readonly NameLine[])[] {
    const marks = named.map((each, index) => ({ index, ...each, width: measure(each.name) }));
    const queue = [...marks].sort((one, other) => one.at.x - other.at.x || one.index - other.index);
    const placed = new Map<number, readonly Placed[]>();
    for (const mark of queue) {
      const laid = this.#closed(mark, this.#lay(mark, queue, placed, size, measure), measure).map((line) => ({
        ...line,
        width: measure(line.text),
      }));
      // The lines of one name share a middle, kept inside the picture.
      const half = Math.max(0, ...laid.map((line) => line.width)) / 2;
      const x = Math.min(Math.max(mark.at.x, half + EDGE), size.width - half - EDGE);
      placed.set(
        mark.index,
        laid.map((line) => ({ line: { text: line.text, x, y: line.top }, width: line.width })),
      );
    }
    return marks.map((mark) => (placed.get(mark.index) ?? []).map((each) => each.line));
  }

  /**
   * A name laid line by line: each line takes the words that fit its room; a name not begun skips a line with no room
   * for its first word. It answers the lines filled, the words left over when the lines ran out, and the roomiest
   * line it looked at.
   */
  #lay(
    mark: Named,
    marks: readonly Named[],
    placed: ReadonlyMap<number, readonly Placed[]>,
    size: PictureSize,
    measure: (text: string) => number,
  ): Filled {
    const first = this.#first(mark, size);
    const words = mark.name.split(BREAKS).filter((word) => word !== '');
    const lines: Laid[] = [];
    let roomiest: Laid = { text: '', top: first, room: 0 };
    let next = 0;
    for (let row = 0; row < ROWS && next < words.length; row++) {
      const top = first + row * LINE;
      if (row > 0 && top + LINE > size.height - EDGE) break;
      const room = this.#room(mark, top, marks, placed, size);
      if (row === 0 || room > roomiest.room) roomiest = { text: '', top, room };
      let text = '';
      let taken = next;
      for (const word of words.slice(next)) {
        const longer = this.#joined(text, word);
        if (measure(longer) > room) break;
        text = longer;
        taken += 1;
      }
      if (taken > next) {
        lines.push({ text, top, room });
        next = taken;
      } else if (lines.length > 0) break;
    }
    return { lines, left: words.slice(next), roomiest };
  }

  /**
   * The lines as they are written: whole when no word is left over; else what is left is cut on the last line — and a
   * name no line could begin is cut on the roomiest.
   */
  #closed(mark: Named, filled: Filled, measure: (text: string) => number): readonly Laid[] {
    const last = filled.lines.at(-1);
    if (last === undefined)
      return [{ ...filled.roomiest, text: this.#cut(mark.name, filled.roomiest.room, measure) }];
    if (filled.left.length === 0) return filled.lines;
    const rest = filled.left.reduce((text, word) => this.#joined(text, word), last.text);
    return [...filled.lines.slice(0, -1), { ...last, text: this.#cut(rest, last.room, measure) }];
  }

  /** A word added to a line: after a space, or straight after a hyphen. */
  #joined(text: string, word: string): string {
    if (text === '') return word;
    return text.endsWith('-') ? `${text}${word}` : `${text} ${word}`;
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
    placed: ReadonlyMap<number, readonly Placed[]>,
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
        for (const each of done) {
          if (Math.abs(each.line.y - top) < LINE)
            room = Math.min(room, 2 * (Math.abs(each.line.x - mark.at.x) - GAP) - each.width);
        }
      } else if (Math.abs(this.#first(other, size) - top) < LINE) {
        room = Math.min(room, 2 * (apart - GAP) - Math.min(other.width, apart - GAP));
      }
    }
    return room;
  }

  /** The text whole when it fits the room, else its longest start that does with the ellipsis after it — never less than one letter. */
  #cut(text: string, room: number, measure: (text: string) => number): string {
    if (measure(text) <= room) return text;
    for (let length = text.length - 1; length > 1; length--) {
      const short = `${text.slice(0, length).trimEnd()}${CUT}`;
      if (measure(short) <= room) return short;
    }
    return `${text.slice(0, 1)}${CUT}`;
  }
}
