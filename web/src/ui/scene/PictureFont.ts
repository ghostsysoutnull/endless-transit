/** What a picture asks of the pictures' font (`CanvasFont`): the CSS font for a weight, at the 12 px floor. */
export interface PictureFont {
  of(weight: 'regular' | 'bold'): string;
}
