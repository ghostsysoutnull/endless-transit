import type { Painter } from '#ui/canvas/Painter.ts';

/** A 2D context that remembers what it was told, in order — no browser needed. */
export class RecordingPainter implements Painter {
  readonly calls: string[] = [];
  readonly asked = new Set<string>();
  fillStyle: string | CanvasGradient | CanvasPattern = '';
  strokeStyle: string | CanvasGradient | CanvasPattern = '';
  lineWidth = 1;
  globalAlpha = 1;
  font = '';
  textAlign: CanvasTextAlign = 'start';
  textBaseline: CanvasTextBaseline = 'alphabetic';
  shadowColor = '';
  shadowBlur = 0;

  #note(name: string, args: readonly unknown[]): void {
    this.calls.push(
      `${name}(${args.map((arg) => (typeof arg === 'number' ? arg.toFixed(1) : String(arg))).join(',')})`,
    );
  }

  fillRect(...args: number[]): void {
    this.#note('fillRect', args);
  }
  strokeRect(...args: number[]): void {
    this.#note('strokeRect', args);
  }
  beginPath(): void {
    this.#note('beginPath', []);
  }
  moveTo(...args: number[]): void {
    this.#note('moveTo', args);
  }
  lineTo(...args: number[]): void {
    this.#note('lineTo', args);
  }
  arc(...args: number[]): void {
    this.#note('arc', args);
  }
  rect(...args: number[]): void {
    this.#note('rect', args);
  }
  clip(): void {
    this.#note('clip', []);
  }
  closePath(): void {
    this.#note('closePath', []);
  }
  stroke(): void {
    this.#note('stroke', [this.strokeStyle, this.globalAlpha]);
  }
  fill(): void {
    this.#note('fill', [this.fillStyle, this.globalAlpha]);
  }
  setLineDash(segments: number[]): void {
    this.#note('setLineDash', [segments.join('/')]);
  }
  fillText(text: string, x: number, y: number): void {
    this.#note('fillText', [text, x, y, this.fillStyle, this.font, this.globalAlpha]);
  }
  measureText(text: string): { width: number } {
    return { width: text.length * 7 };
  }
  save(): void {
    this.#note('save', []);
  }
  restore(): void {
    this.#note('restore', []);
  }
}
