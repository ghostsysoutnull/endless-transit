/** What the tear asks of the canvas it draws on (`PixelCanvas`): a band of the finished frame copied sideways over itself. */
export interface BandCopy {
  shift(
    context: CanvasRenderingContext2D,
    band: { readonly y: number; readonly height: number; readonly by: number },
    width: number,
  ): void;
}
