import type { CameraTrack } from './CameraTrack.ts';
import type { SliderFace } from './SliderFace.ts';

/** No slider on the picture (the street, a floor's elevator, a hall without doors): the slider hides. Value object. */
export class NoTrack implements CameraTrack {
  lay(face: SliderFace): void {
    face.hide();
  }

  along(): undefined {
    return undefined;
  }

  /** Every missing track is the same. */
  equals(other: CameraTrack): boolean {
    return other instanceof NoTrack;
  }
}
