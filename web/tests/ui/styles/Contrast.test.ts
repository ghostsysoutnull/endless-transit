import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

const STYLESHEET = new URL('../../../src/ui/styles/app.css', import.meta.url);
const source = readFileSync(STYLESHEET, 'utf8');
/** WCAG 2 AA for body text (the smallest type on the page is 10 px, so nothing counts as large). */
const MINIMUM = 4.5;
const HEX = /^#[0-9a-f]{6}$/i;

/** The colour tokens of `:root`, hex only (`--frame: var(--cy)` is an alias, not a colour). */
function tokens(): ReadonlyMap<string, string> {
  const root = /:root\s*{([^}]*)}/.exec(source)?.[1] ?? '';
  return new Map(
    [...root.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map((hit) => [hit[1] ?? '', hit[2] ?? '']),
  );
}

function namedIn(pattern: RegExp): readonly string[] {
  return [...new Set([...source.matchAll(pattern)].map((hit) => hit[1] ?? ''))].sort();
}

/** The nine planet colours `--frame` may take, and the void's below the bedrock: what the stylesheet sets it to. */
const FRAMES = namedIn(/--frame:\s*var\(--([\w-]+)\)/g);
/** Every token the stylesheet paints text with — `color:` — the frame alias followed to each of its colours. */
const TEXT = [
  ...new Set(
    namedIn(/(?<![\w-])color:\s*var\(--([\w-]+)\)/g).flatMap((token) =>
      token === 'frame' ? FRAMES : [token],
    ),
  ),
];
/** What `background:` names: the page and its panels, and the colours a pressed button takes. */
const BACKGROUNDS = namedIn(/background:\s*var\(--([\w-]+)\)/g);
const SURFACES = ['ground', 'panel', 'panel2'];
const PRESSED = BACKGROUNDS.filter((token) => !SURFACES.includes(token)).flatMap((token) =>
  token === 'frame' ? FRAMES : [token],
);
/** Motion is not text: what `@keyframes` fades is out of this test's sight. */
const STILL = source.replace(/@keyframes[^{]*{(?:[^{}]*{[^{}]*})*[^{}]*}/g, '');

function luminance(hex: string): number {
  const channel = (at: number): number => {
    const value = parseInt(hex.slice(at, at + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function contrast(one: string, other: string): number {
  const [light, dark] = [luminance(one), luminance(other)].sort((a, b) => b - a) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

describe('every text colour of the stylesheet reads on every surface it may sit on (WCAG AA, 4.5:1)', () => {
  const palette = tokens();
  // A pressed button inverts: `--ground` text on the button's own colour. That pair is checked the other way round.
  const onSurfaces = TEXT.filter((token) => token !== 'ground');

  const check = (token: string, ground: string): void => {
    const hex = palette.get(token) ?? '';
    const under = palette.get(ground) ?? '';
    expect(hex, `--${token} is not a hex colour of :root`).toMatch(HEX);
    expect(under, `--${ground} is not a hex colour of :root`).toMatch(HEX);
    const ratio = contrast(hex, under);
    expect(ratio, `--${token} ${hex} on --${ground} ${under}: ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(
      MINIMUM,
    );
  };

  test('the scan sees the real palette, the real surfaces and the real text tokens', () => {
    expect(palette.get('ground')).toBe('#080c0d');
    expect(BACKGROUNDS).toEqual(['frame', ...SURFACES, 'yl']);
    expect(FRAMES).toHaveLength(10);
    expect(FRAMES).toContain('ab');
    expect(PRESSED).toHaveLength(11);
    expect(STILL).not.toContain('@keyframes');
    expect(STILL).toContain('.sigil');
    expect(onSurfaces).toContain('dim');
    expect(onSurfaces).toContain('text');
    expect(onSurfaces.length).toBeGreaterThan(10);
  });

  test.each(onSurfaces)('--%s on the page and its panels', (token) => {
    for (const ground of SURFACES) check(token, ground);
  });

  test.each(PRESSED)('a pressed button: --ground on --%s', (token) => {
    check('ground', token);
  });

  test('no text is faded by opacity — a token that passes at full strength fails behind a veil', () => {
    expect(STILL.match(/opacity:\s*0?\.\d+/g)).toBeNull();
  });
});
