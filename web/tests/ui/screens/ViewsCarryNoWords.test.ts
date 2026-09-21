import { readdirSync, readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const SCREENS = new URL('../../../src/ui/screens/', import.meta.url);
const views = readdirSync(SCREENS).filter((file) => file.endsWith('View.ts'));

/**
 * Words and casing have one owner, the presenter. A view draws what its view-model carries: no literal
 * text between tags and no literal aria-label. (Symbols such as the sigil are decoration, not words.)
 */
test.each(views)('%s has no words of its own', (file) => {
  const source = readFileSync(new URL(file, SCREENS), 'utf8');
  expect(source.match(/aria-label="[^"]*"/g)).toBeNull();
  expect(source.match(/>[^<>${}`]*[A-Za-z]{2,}[^<>${}`]*</g)).toBeNull();
});

test('the scan looks at the real views', () => {
  expect(views).toContain('TitleView.ts');
  expect(views).toContain('HudView.ts');
});
