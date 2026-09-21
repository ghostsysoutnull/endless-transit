import { expect, test } from 'vitest';

test('the unit-test runner runs strict TypeScript', () => {
  const answer: number = [1, 2, 3].reduce((sum, n) => sum + n, 0);
  expect(answer).toBe(6);
});
