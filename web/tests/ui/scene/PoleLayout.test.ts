import { describe, expect, test } from 'vitest';
import { PoleLayout } from '#ui/scene/PoleLayout.ts';
import type { PoleLevelVM } from '#ui/screens/PoleVM.ts';

/** The phone's pole: the trace's body at 360 × 640. */
const PHONE = { width: 360, height: 560 };

/** A level with nothing set: tests say only what they are about. */
function level(overrides: Partial<PoleLevelVM> = {}): PoleLevelVM {
  return {
    key: '0',
    glyph: 'universe',
    abyssal: false,
    here: false,
    kind: 'Universe',
    scale: '10²⁶ m',
    name: 'The Endless Universe',
    label: 'Level 00',
    values: { era: '', culture: '', trait: '' },
    current: { era: '', culture: '' },
    rebel: false,
    drift: { era: false, culture: false },
    berth: false,
    tags: [],
    ...overrides,
  };
}

/** A level under the planet: its values and its current set. */
function held(overrides: Partial<PoleLevelVM> = {}): PoleLevelVM {
  return level({
    values: { era: 'Atomic', culture: 'Rust', trait: 'Commercial' },
    current: { era: 'drift · ancient', culture: 'drift · monolith' },
    ...overrides,
  });
}

/** The universe down to a room: four levels above the planet, the planet, then nine under it. */
function path(under: readonly PoleLevelVM[] = []): readonly PoleLevelVM[] {
  return [
    level(),
    level(),
    level(),
    level(),
    held({ values: { era: 'Atomic', culture: 'Rust', trait: '' } }),
    ...under,
  ];
}

describe('PoleLayout — where the pole’s parts stand (U05, Decision 13)', () => {
  test('levels stand well apart, each row a button a thumb tall across the picture; nothing leaves a 360 px phone', () => {
    const layout = PoleLayout.of(
      path([held(), held(), held(), held(), held(), held(), held(), held()]),
      PHONE,
    );
    const rows = layout.rows();
    rows.slice(1).forEach((row, index) => {
      expect(row.y - (rows[index]?.y ?? 0)).toBeGreaterThanOrEqual(76);
    });
    for (const row of rows) {
      expect(row.box.height).toBeGreaterThanOrEqual(44);
      expect(row.box.width).toBe(360);
      expect(row.words.width).toBeGreaterThan(100);
    }
    for (const lane of layout.lanes()) expect(lane.x + lane.width).toBeLessThanOrEqual(360);
    // Thirteen levels do not fit the phone's pole: it grows and scrolls.
    expect(layout.size().height).toBeGreaterThan(PHONE.height);
    expect(layout.size().height).toBeGreaterThanOrEqual((rows.at(-1)?.y ?? 0) + 26);
  });

  test('a value held from the planet down is one run; the trait’s run starts at the country that sets it', () => {
    const runs = PoleLayout.of(path([held(), held(), held()]), PHONE).runs();
    const rows = PoleLayout.of(path([held(), held(), held()]), PHONE).rows();
    const culture = runs.filter((run) => run.lane === 'culture');
    expect(culture.map((run) => run.word)).toEqual(['Rust']);
    expect(culture[0]?.notch).toBe(rows[4]?.y);
    const trait = runs.filter((run) => run.lane === 'trait');
    expect(trait.map((run) => run.notch)).toEqual([rows[5]?.y]);
  });

  test('a rebel district breaks the era and culture ribbons in red, even where a value stays; the trait runs on', () => {
    const rebel = held({ rebel: true, values: { era: 'Atomic', culture: 'Monolith', trait: 'Commercial' } });
    const layout = PoleLayout.of(path([held(), rebel, held({ values: rebel.values })]), PHONE);
    const city = layout.rows()[6]?.y;
    const at = (lane: string) => layout.runs().filter((run) => run.lane === lane);
    expect(at('era').map((run) => [run.notch, run.rebel])).toEqual([
      [layout.rows()[4]?.y, false],
      [city, true],
    ]);
    expect(at('culture').map((run) => run.word)).toEqual(['Rust', 'Monolith']);
    expect(at('trait')).toHaveLength(1);
  });

  test('a hook comes in only on the ribbon that drifted, where the drift starts; the room under it does not hook again', () => {
    const drifted = { era: false, culture: true };
    const layout = PoleLayout.of(
      path([held(), held(), held({ drift: drifted }), held({ drift: drifted })]),
      PHONE,
    );
    expect(layout.hooks().map((hook) => [hook.lane, hook.to.y])).toEqual([['culture', layout.rows()[7]?.y]]);
  });

  test('the current runs from the planet down; its words show where the second pair first shows and where it changes', () => {
    const swapped = { era: 'drift · atomic', culture: 'drift · rust' };
    const layout = PoleLayout.of(
      path([held(), held({ current: swapped }), held({ current: swapped })]),
      PHONE,
    );
    expect(layout.currents().map((current) => current.top)).toEqual([
      layout.rows()[4]?.y,
      layout.rows()[4]?.y,
    ]);
    expect(layout.currentWords().map((words) => words.word)).toEqual([
      'drift · ancient',
      'drift · atomic',
      'drift · monolith',
      'drift · rust',
    ]);
  });

  test('the ships’ lane keeps an empty berth only where a level has one, inside the picture', () => {
    const layout = PoleLayout.of(path([held({ berth: true })]), PHONE);
    expect(layout.berths()).toHaveLength(1);
    expect(layout.berths()[0]?.x).toBeGreaterThan(0);
  });
});
