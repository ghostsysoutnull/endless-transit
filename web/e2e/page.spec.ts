import { expect, test, type Page } from '@playwright/test';
import { saveText } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';

async function plant(page: Page, text: string): Promise<void> {
  await page.addInitScript(
    ([slot, value]) => {
      if (window.sessionStorage.getItem('planted') !== null) return;
      window.sessionStorage.setItem('planted', 'yes');
      window.localStorage.setItem(slot, value);
    },
    [SLOT, text] as const,
  );
}

test('the page: a dark colour scheme, the viewport meta with the safe area, the dock padded for a home bar', async ({
  page,
}) => {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toContain('dark');
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /viewport-fit=cover/);
  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute('content', 'dark');
  // The dock's bottom padding names the safe area; the stylesheet is the one place it can be read from.
  const dockRule = await page.evaluate(() =>
    [...document.styleSheets]
      .flatMap((sheet) => [...sheet.cssRules])
      .filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule && rule.selectorText === '.dock')
      .map((rule) => rule.cssText)
      .join(' '),
  );
  expect(dockRule).toContain('safe-area-inset-bottom');
});
