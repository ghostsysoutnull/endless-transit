/** What the map asks of the pictures' font (`CanvasFont`): the CSS font at a size, and a size raised to the floor. */
export interface GlyphFont {
  of(weight: 'regular' | 'bold', px?: number): string;
  atLeast(px: number): number;
}
