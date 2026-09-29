import { readdirSync, readFileSync } from 'node:fs';
import { expect, test } from 'vitest';
import { BuildMasthead } from '#ui/BuildMasthead.ts';

const SCREENS = new URL('../../src/ui/screens/', import.meta.url);

test('the masthead owns the game’s name and the build stamp — every screen shows the same two', () => {
  const masthead = new BuildMasthead('a1b2c3d');
  expect(masthead.name()).toBe('ENDLESS TRANSIT');
  expect(masthead.buildLine()).toBe('build a1b2c3d');
});

test('no presenter spells the name or the build line itself', () => {
  for (const file of readdirSync(SCREENS).filter((name) => name.endsWith('Presenter.ts'))) {
    const source = readFileSync(new URL(file, SCREENS), 'utf8');
    expect(source, file).not.toContain('ENDLESS TRANSIT');
    expect(source, file).not.toContain('`build ');
  }
});
