import { RecordingPainter } from './RecordingPainter.ts';

/** A painter that also notes the shadow each word is written under. */
export class ShadowNotingPainter extends RecordingPainter {
  readonly shadows: number[] = [];

  override fillText(text: string, x: number, y: number): void {
    this.shadows.push(this.shadowBlur);
    super.fillText(text, x, y);
  }
}
