/** What a canvas asks of `PixelBudget`: how many device pixels per CSS pixel to draw at, for its size on this device. */
export interface RatioLimit {
  ratio(deviceRatio: number, width: number, height: number): number;
}
