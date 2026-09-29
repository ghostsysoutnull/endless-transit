import { describe, expect, test } from 'vitest';
import type { ChildMark } from '#ui/scene/ChildMark.ts';
import { MarkedChild } from '#ui/scene/MarkedChild.ts';
import { NoChild } from '#ui/scene/NoChild.ts';

/** Marks as the screen holds them: through what a mark answers. */
function marked(id: string): ChildMark {
  return new MarkedChild(id);
}

function none(): ChildMark {
  return new NoChild();
}

describe('a child marked by the screen, or none (U02)', () => {
  test('a mark marks its own child only; none marks nothing and gives way to another mark', () => {
    const lit = marked('enter:2');
    expect([lit.marks('enter:2'), lit.marks('enter:3'), none().marks('enter:2')]).toEqual([
      true,
      false,
      false,
    ]);
    expect(lit.or(marked('enter:0')).marks('enter:2')).toBe(true);
    expect(none().or(lit).marks('enter:2')).toBe(true);
  });

  test('equal by the child it marks; none equals none', () => {
    expect(marked('enter:2').equals(marked('enter:2'))).toBe(true);
    expect(marked('enter:2').equals(marked('enter:3'))).toBe(false);
    expect(marked('enter:2').equals(none())).toBe(false);
    expect(none().equals(marked('enter:2'))).toBe(false);
    expect(none().equals(none())).toBe(true);
  });

  test('never a mark without a child', () => {
    expect(() => new MarkedChild('')).toThrow(RangeError);
  });
});
