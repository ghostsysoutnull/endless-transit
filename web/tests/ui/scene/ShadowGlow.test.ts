import { describe, expect, test } from 'vitest';
import { ShadowGlow } from '#ui/scene/ShadowGlow.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

/** Where the glow's shadow lands on the canvas, and how soft it is, for a canvas at this scale. */
function glowAt(scale: number): { lands: number; blur: number; after: number } {
  const painter = new RecordingPainter(scale);
  let lands = Number.NaN;
  let blur = 0;
  const arc = painter.arc.bind(painter);
  painter.arc = (...args: number[]): void => {
    lands = (args[0] ?? 0) * scale + painter.shadowOffsetX;
    blur = painter.shadowBlur;
    arc(...args);
  };
  new ShadowGlow().at(painter, { x: 40, y: 20 }, 10, '<cy>', 0.5);
  return { lands, blur, after: painter.shadowBlur + painter.shadowOffsetX };
}

describe('a glow drawn as the soft shadow of a disc out of sight', () => {
  test('its light lands on the point and is as soft for its size at any scale of the canvas; the shadow is left off', () => {
    for (const scale of [1, 2.6]) {
      const glow = glowAt(scale);
      expect(glow.lands).toBeCloseTo(40 * scale, 6);
      expect(glow.blur / scale).toBeCloseTo(glowAt(1).blur, 6);
      expect(glow.after).toBe(0);
    }
  });
});
