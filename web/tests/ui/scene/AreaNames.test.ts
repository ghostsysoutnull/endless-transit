import { describe, expect, test } from 'vitest';
import { AreaNames } from '#ui/scene/AreaNames.ts';
import type { NameLine } from '#ui/scene/NameLine.ts';

const SIZE = { width: 328, height: 260 };
/** Seven pixels a character, as the tests' painter measures. */
const measure = (text: string): number => text.length * 7;
const names = new AreaNames();

/** Marks with their names, paired in order. */
function named(
  spots: readonly { x: number; y: number }[],
  called: readonly string[],
): { at: { x: number; y: number }; name: string }[] {
  return spots.map((at, index) => ({ at, name: called[index] ?? '' }));
}

/** The words a name was written with, its lines put back together. */
function written(lines: readonly NameLine[]): string {
  return lines
    .map((line) => line.text)
    .join(' ')
    .replaceAll('- ', '-');
}

describe('the names under an area’s marks: every mark by its name, sharing the room', () => {
  test('a name with room beside its neighbours is one line, centred under its mark', () => {
    const [left, right] = names.lines(
      [
        { at: { x: 80, y: 100 }, name: 'Vel' },
        { at: { x: 240, y: 100 }, name: 'Tessel' },
      ],
      SIZE,
      measure,
    );
    expect(left).toEqual([{ text: 'Vel', x: 80, y: 111 }]);
    expect(right).toEqual([{ text: 'Tessel', x: 240, y: 111 }]);
  });

  test('a name too wide for the gap breaks at its spaces and after its hyphens onto the lines below, whole and never a number', () => {
    const spots = [
      { x: 60, y: 60 },
      { x: 140, y: 60 },
      { x: 220, y: 60 },
    ];
    const all = names.lines(
      named(spots, ['New Calder Heights', 'Karth-under-Glass', 'Saint Oriel']),
      SIZE,
      measure,
    );
    expect(all.map(written)).toEqual(['New Calder Heights', 'Karth-under-Glass', 'Saint Oriel']);
    // The last has the room to its right: it stays on one line.
    expect(all.map((lines) => lines.length)).toEqual([2, 2, 1]);
    for (const lines of all) {
      const tops = lines.map((line) => line.y);
      expect(tops).toEqual([...tops].sort((one, other) => one - other));
      expect(new Set(lines.map((line) => line.x)).size).toBe(1);
    }
  });

  test('a word with no room on the line under its mark drops to the next line, whole', () => {
    const [, middle] = names.lines(
      named(
        [
          { x: 100, y: 60 },
          { x: 140, y: 60 },
          { x: 180, y: 60 },
        ],
        ['A', 'Brackwaterhaven', 'B'],
      ),
      SIZE,
      measure,
    );
    expect(middle).toEqual([{ text: 'Brackwaterhaven', x: 140, y: 84 }]);
  });

  test('only what still does not fit is cut short, with an ellipsis: one long word hemmed in by marks beside and below', () => {
    const [, middle] = names.lines(
      named(
        [
          { x: 100, y: 60 },
          { x: 140, y: 60 },
          { x: 180, y: 60 },
          { x: 110, y: 92 },
          { x: 170, y: 92 },
        ],
        ['A', 'Brackwaterhaven', 'B', 'C', 'D'],
      ),
      SIZE,
      measure,
    );
    const text = middle?.map((line) => line.text).join('') ?? '';
    expect(text.endsWith('…')).toBe(true);
    expect('Brackwaterhaven'.startsWith(text.slice(0, -1))).toBe(true);
    expect(text.length).toBeGreaterThan(1);
  });

  test('on a crowded picture no two marks’ names run into each other, and every line stays inside the picture', () => {
    const crowd = [
      'Ashen Reach',
      'Port Meridian',
      'Vel',
      'Karth-under-Glass',
      'Low Harbor',
      'Nine',
      'Saint Oriel of the Marsh',
      'Brackwater',
      'Tessel',
      'New Calder Heights',
    ];
    const spots = crowd.map((_, index) => ({
      x: 45 + (index % 4) * 79 + (index % 3) * 5,
      y: 40 + Math.floor(index / 4) * 78 + (index % 2) * 9,
    }));
    const all = names.lines(named(spots, crowd), SIZE, measure);
    const boxes = all.flatMap((lines, mark) =>
      lines.map((line) => ({
        mark,
        left: line.x - measure(line.text) / 2,
        right: line.x + measure(line.text) / 2,
        top: line.y,
      })),
    );
    for (const box of boxes) {
      expect(box.left).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(SIZE.width);
      expect(box.top + 13).toBeLessThanOrEqual(SIZE.height);
    }
    const clashes = boxes.flatMap((one, index) =>
      boxes
        .slice(index + 1)
        .filter(
          (other) =>
            other.mark !== one.mark &&
            Math.abs(other.top - one.top) < 13 &&
            one.left < other.right &&
            other.left < one.right,
        ),
    );
    expect(clashes).toEqual([]);
  });
});
