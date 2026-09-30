/** What a picture asks of the pictures' font (`CanvasFont`): the CSS font for a weight and size, and a size raised to the 12 px floor. */
export interface PictureFont {
  of(weight: 'regular' | 'bold', px?: number): string;
  atLeast(px: number): number;
}
