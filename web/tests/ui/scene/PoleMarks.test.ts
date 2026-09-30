import { describe, expect, test } from 'vitest';
import { PoleMarks } from '#ui/scene/PoleMarks.ts';
import type { PoleLevelVM } from '#ui/screens/PoleVM.ts';

/** A level with nothing set: tests say only what they are about. */
function level(overrides: Partial<PoleLevelVM> = {}): PoleLevelVM {
  return {
    key: '0',
    glyph: 'universe',
    abyssal: false,
    here: false,
    kind: 'Universe',
    name: 'The Endless Universe',
    label: 'Level 00',
    values: { era: '', culture: '', trait: '' },
    current: '',
    rebel: false,
    drift: { era: false, culture: false },
    berth: false,
    tags: [],
    ...overrides,
  };
}

/** A level under the country: its three values and its current set. */
function held(overrides: Partial<PoleLevelVM> = {}): PoleLevelVM {
  return level({
    values: { era: 'Atomic', culture: 'Rust', trait: 'Commercial' },
    current: 'Ancient · Monolith',
    ...overrides,
  });
}

/** The universe, the planet (era and culture, no trait yet), the country, then what is given. */
function path(under: readonly PoleLevelVM[] = []): readonly PoleLevelVM[] {
  return [level(), held({ values: { era: 'Atomic', culture: 'Rust', trait: '' } }), held(), ...under];
}

const words = (marks: PoleMarks, index: number) =>
  marks.at(index).map((mark) => `${mark.lane} ${mark.word} ${mark.look}`);

describe('PoleMarks — where the pole writes a value, and the vibe in force at a level', () => {
  test('the planet writes its era and culture, the country its trait; a level that only holds them writes nothing', () => {
    const marks = PoleMarks.of(path([held(), held()]));
    expect(words(marks, 0)).toEqual([]);
    expect(words(marks, 1)).toEqual(['era Atomic set', 'culture Rust set']);
    expect(words(marks, 2)).toEqual(['trait Commercial set']);
    expect(words(marks, 3)).toEqual([]);
  });

  test('a rebel district writes its era and culture in red, even one that stays the same; the trait goes on', () => {
    const marks = PoleMarks.of(
      path([held({ rebel: true, values: { era: 'Atomic', culture: 'Monolith', trait: 'Commercial' } })]),
    );
    expect(words(marks, 3)).toEqual(['era Atomic rebel', 'culture Monolith rebel']);
  });

  test('a drift writes only the value that drifted, where the drift starts; the room under it writes nothing', () => {
    const drifted = { era: false, culture: true };
    const marks = PoleMarks.of(
      path([
        held({ drift: drifted, values: { era: 'Atomic', culture: 'Monolith', trait: 'Commercial' } }),
        held({ drift: drifted, values: { era: 'Atomic', culture: 'Monolith', trait: 'Commercial' } }),
      ]),
    );
    expect(words(marks, 3)).toEqual(['culture Monolith drift']);
    expect(words(marks, 4)).toEqual([]);
  });

  test('the vibe in force is each value’s last writing at or above the level: nothing above the planet, a drift carried down', () => {
    const drifted = { era: false, culture: true };
    const marks = PoleMarks.of(
      path([
        held({ drift: drifted, values: { era: 'Atomic', culture: 'Monolith', trait: 'Commercial' } }),
        held(),
      ]),
    );
    const force = (index: number) =>
      Object.values(marks.inForce(index)).map((mark) => `${mark.word} ${mark.look}`);
    expect(force(0)).toEqual([' none', ' none', ' none']);
    expect(force(1)).toEqual(['Atomic set', 'Rust set', ' none']);
    expect(force(3)).toEqual(['Atomic set', 'Monolith drift', 'Commercial set']);
    // The level under the drift holds the main pair again: it writes it back.
    expect(force(4)).toEqual(['Atomic set', 'Rust set', 'Commercial set']);
  });

  test('the drift current’s words show where it first shows and where it changes', () => {
    const marks = PoleMarks.of(
      path([held({ current: 'Atomic · Rust' }), held({ current: 'Atomic · Rust' })]),
    );
    expect([0, 1, 2, 3, 4].map((index) => marks.current(index))).toEqual([
      '',
      'Ancient · Monolith',
      '',
      'Atomic · Rust',
      '',
    ]);
  });
});
