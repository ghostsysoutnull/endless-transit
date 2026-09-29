import type { CameraTrack } from './CameraTrack.ts';
import type { SliderFace } from './SliderFace.ts';

/** A slider's box on the picture, in CSS pixels, the axis it runs along, and the view at its start (top or left) and its end. Value object. */
export class SliderTrack implements CameraTrack {
  readonly #box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number };
  readonly #axis: 'x' | 'y';
  readonly #from: number;
  readonly #to: number;

  constructor(facts: {
    x: number;
    y: number;
    width: number;
    height: number;
    axis: 'x' | 'y';
    from: number;
    to: number;
  }) {
    this.#box = { x: facts.x, y: facts.y, width: facts.width, height: facts.height };
    this.#axis = facts.axis;
    this.#from = facts.from;
    this.#to = facts.to;
  }

  lay(face: SliderFace): void {
    face.placeAt(this.#box, this.#axis);
  }

  along(
    point: { readonly x: number; readonly y: number },
    box: { readonly left: number; readonly top: number; readonly width: number; readonly height: number },
  ): number {
    const fraction =
      this.#axis === 'y'
        ? (point.y - box.top) / Math.max(1, box.height)
        : (point.x - box.left) / Math.max(1, box.width);
    return this.#from + (this.#to - this.#from) * Math.min(1, Math.max(0, fraction));
  }

  equals(other: CameraTrack): boolean {
    return (
      other instanceof SliderTrack &&
      this.#box.x === other.#box.x &&
      this.#box.y === other.#box.y &&
      this.#box.width === other.#box.width &&
      this.#box.height === other.#box.height &&
      this.#axis === other.#axis &&
      this.#from === other.#from &&
      this.#to === other.#to
    );
  }
}
