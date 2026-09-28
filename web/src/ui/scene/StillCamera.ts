import type { CameraStop } from './CameraStop.ts';
import type { CameraTrack } from './CameraTrack.ts';
import type { SceneCamera } from './SceneCamera.ts';

/** A camera that stands still (the street, U01b): its view never leaves 0, nothing drags, no slider; going in zooms. */
export class StillCamera implements SceneCamera {
  rest(): number {
    return 0;
  }

  clamp(): number {
    return 0;
  }

  pace(): number {
    return 0;
  }

  settle(): number {
    return 0;
  }

  landing(): number {
    return 0;
  }

  drags(): boolean {
    return false;
  }

  dragRate(): number {
    return 0;
  }

  along(): number {
    return 0;
  }

  zooms(): boolean {
    return true;
  }

  stopOf(): number | undefined {
    return undefined;
  }

  stopCount(): number {
    return 0;
  }

  nearest(): { readonly id: string; readonly index: number } | undefined {
    return undefined;
  }

  stepFrom(): CameraStop | undefined {
    return undefined;
  }

  track(): CameraTrack | null {
    return null;
  }

  alongTrack(): number {
    return 0;
  }

  /** Every still camera moves by the same rules: not at all. */
  equals(other: SceneCamera): boolean {
    return other instanceof StillCamera;
  }
}
