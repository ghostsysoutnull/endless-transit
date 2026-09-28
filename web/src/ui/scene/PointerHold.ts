/** What a drag of the picture asks of the canvas (`PixelCanvas`): to keep this finger even when it leaves the picture. */
export interface PointerHold {
  capture(pointer: number): void;
}
