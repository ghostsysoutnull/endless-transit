import { describe, expect, test } from 'vitest';
import { StylePalette } from '#ui/canvas/StylePalette.ts';
import { CountingStyle } from '#tests/support/CountingStyle.ts';

describe('the stylesheet’s colours as a canvas reads them', () => {
  test('a token is read from the stylesheet once, trimmed, until the palette is told the frame changed', () => {
    const style = new CountingStyle();
    const palette = new StylePalette(style);
    expect([palette.ink('cy'), palette.ink('cy'), palette.ink('yl')]).toEqual(['CY', 'CY', 'YL']);
    expect(style.asked).toBe(2);
    palette.frameChanged();
    expect(palette.ink('cy')).toBe('CY');
    expect(style.asked).toBe(3);
  });
});
