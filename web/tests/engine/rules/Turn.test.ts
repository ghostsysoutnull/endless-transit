import { describe, expect, test } from 'vitest';
import { FREE, GLOBAL, STEP } from '#engine/rules/Turn.ts';

describe('Turn — what a command costs the traveller (Guide:133-135, 334-335)', () => {
  test('a step drains and counts; a global command drains but does not count; a free one does neither', () => {
    expect([STEP.drains(), STEP.counts()]).toEqual([true, true]);
    expect([GLOBAL.drains(), GLOBAL.counts()]).toEqual([true, false]);
    expect([FREE.drains(), FREE.counts()]).toEqual([false, false]);
  });
});
