import { describe, expect, test } from 'vitest';
import { PoleLayout } from '#ui/scene/PoleLayout.ts';
import type { PoleLevelVM } from '#ui/screens/PoleVM.ts';
import { heldPoleLevel, poleLevel } from '#tests/support/poleLevel.ts';

/** The phone's pole: the trace's body at 360 × 640. */
const PHONE = { width: 360, height: 560 };

const level = poleLevel;
const held = heldPoleLevel;

/** The universe down to a room: four levels above the planet, the planet, the country, then eight under it. */
function room(): readonly PoleLevelVM[] {
  return [
    level(),
    level(),
    level(),
    level(),
    held({ values: { era: 'Atomic', culture: 'Rust', trait: '' } }),
    ...Array.from({ length: 9 }, () =>
      held({ values: { era: 'Future', culture: 'Baroque', trait: 'Commercial' } }),
    ),
  ];
}

const inside = (box: { x: number; width: number }) => box.x >= 0 && box.x + box.width <= PHONE.width;

describe('PoleLayout — where the pole’s parts stand', () => {
  test('the pole runs down the middle; each node is big and stands clear of the next; each row a button a thumb tall', () => {
    const layout = PoleLayout.of(room(), PHONE);
    const rows = layout.rows();
    for (const row of rows) {
      expect(row.plate.x).toBe(PHONE.width / 2);
      expect(row.radius).toBeGreaterThanOrEqual(36);
      expect(row.box.height).toBeGreaterThanOrEqual(44);
      expect(row.box.width).toBe(PHONE.width);
      expect(row.words.right).toBeLessThan(row.plate.x - row.radius);
      expect(row.words.width).toBeGreaterThan(100);
    }
    rows.slice(1).forEach((row, index) => {
      expect(row.y - (rows[index]?.y ?? 0)).toBeGreaterThan(row.radius * 3);
    });
    // Fourteen levels do not fit the phone's pole: it grows and scrolls.
    expect(layout.size().height).toBeGreaterThan(PHONE.height);
  });

  test('a value is written right of the node that sets it, inside the phone, the labels of one row never overlapping', () => {
    const layout = PoleLayout.of(room(), PHONE);
    const labels = layout.labels();
    const planet = layout.rows()[4];
    const country = layout.rows()[5];
    expect(labels.map((label) => [label.word, label.row])).toEqual([
      ['Atomic', 4],
      ['Rust', 4],
      ['Future', 5],
      ['Baroque', 5],
      ['Commercial', 5],
    ]);
    for (const label of labels) {
      expect(inside(label)).toBe(true);
      expect(label.x).toBeGreaterThan((planet?.plate.x ?? 0) + (planet?.radius ?? 0));
    }
    const ofCountry = labels.filter((label) => label.row === 5);
    ofCountry.slice(1).forEach((label, index) => {
      const above = ofCountry[index];
      expect(label.y).toBeGreaterThanOrEqual((above?.y ?? 0) + (above?.height ?? 0));
    });
    // The country's three labels stay closer to it than to the levels either side.
    for (const label of ofCountry)
      expect(Math.abs(label.y + label.height / 2 - (country?.y ?? 0))).toBeLessThan(
        ((country?.y ?? 0) - (planet?.y ?? 0)) / 2,
      );
  });

  test('the current’s words stand under the labels of the level where it shows, inside the phone', () => {
    const layout = PoleLayout.of(room(), PHONE);
    const [current] = layout.currents();
    const planetLabels = layout.labels().filter((label) => label.row === 4);
    expect(layout.currents().map((words) => words.word)).toEqual(['Ancient · Monolith']);
    expect(current?.at.y).toBeGreaterThan(Math.max(...planetLabels.map((label) => label.y + label.height)));
    expect(current?.at.x).toBeLessThan(PHONE.width);
  });

  test('the ships’ empty berth stands left of its node, inside the picture, only where a level has one', () => {
    const layout = PoleLayout.of([level(), level({ berth: true })], PHONE);
    const [berth] = layout.berths();
    expect(layout.berths()).toHaveLength(1);
    expect(berth?.x).toBeGreaterThan(0);
    expect(berth?.x).toBeLessThan((layout.rows()[1]?.plate.x ?? 0) - (layout.rows()[1]?.radius ?? 0));
  });

  test('the level in focus: the first at the top of the scroll, the last at the bottom, the one in the middle between', () => {
    const layout = PoleLayout.of(room(), PHONE);
    const height = layout.size().height;
    const rows = layout.rows();
    expect(layout.focus({ top: 0, height: PHONE.height })).toBe(0);
    expect(layout.focus({ top: height - PHONE.height, height: PHONE.height })).toBe(rows.length - 1);
    const middle = rows[7]?.y ?? 0;
    expect(layout.focus({ top: middle - PHONE.height / 2, height: PHONE.height })).toBe(7);
  });

  test('the backdrop: a row for era, culture and trait, top down, inside the window the pole is seen through', () => {
    const layout = PoleLayout.of(room(), PHONE);
    const window = { top: 900, height: PHONE.height };
    const rows = layout.backdrop(window);
    expect(rows.map((row) => row.lane)).toEqual(['era', 'culture', 'trait']);
    for (const row of rows) {
      expect(row.head.y).toBeGreaterThanOrEqual(window.top);
      expect(row.word.y).toBeLessThanOrEqual(window.top + window.height);
      expect(row.word.y).toBeGreaterThan(row.head.y);
      expect(row.head.x + row.width).toBeLessThanOrEqual(PHONE.width);
    }
  });
});
