import type { CameraTrack } from '#ui/scene/CameraTrack.ts';
import type { SliderBox } from '#ui/scene/SliderBox.ts';

/** A track as the slider sees it once laid: shown over a box, running along an axis — or hidden. */
export type Laid =
  | { readonly shown: false }
  | {
      readonly shown: true;
      readonly box: SliderBox;
      readonly axis: 'x' | 'y';
    };

/** Where the track lays the slider, on a face that notes it. */
export function laid(track: CameraTrack): Laid {
  let read: Laid = { shown: false };
  track.lay({
    placeAt(box, axis) {
      read = { shown: true, box, axis };
    },
    hide() {
      read = { shown: false };
    },
  });
  return read;
}

/** A shown track's box and axis, and the views a finger reads at its two ends; a failed test when it is hidden. */
export function shownTrack(track: CameraTrack): SliderBox & {
  readonly axis: 'x' | 'y';
  readonly from: number | undefined;
  readonly to: number | undefined;
} {
  const read = laid(track);
  if (!read.shown) throw new Error('expected a shown track');
  const { x, y, width, height } = read.box;
  const page = { left: x, top: y, width, height };
  return {
    ...read.box,
    axis: read.axis,
    from: track.along({ x, y }, page),
    to: track.along({ x: x + width, y: y + height }, page),
  };
}
