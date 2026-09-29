import { SliderTrack } from '#ui/scene/SliderTrack.ts';
import { TravelCamera } from '#ui/scene/TravelCamera.ts';

/** A tower of ten floors for a test: the car at 3, a stop a floor, the gauge from the top (9) down, unless the test says otherwise. */
export function travelCamera(
  facts: Partial<ConstructorParameters<typeof TravelCamera>[0]> = {},
): TravelCamera {
  return new TravelCamera({
    rest: 3,
    min: 0,
    max: 9,
    drag: 0.02,
    axis: 'y',
    coast: 0.22,
    snap: true,
    settle: { base: 380, per: 40 },
    pace: { base: 320, per: 230, most: 2400 },
    zoom: false,
    stops: Array.from({ length: 10 }, (_, n) => ({ id: `enter:${String(9 - n)}`, at: n })),
    track: new SliderTrack({ x: 270, y: 30, width: 58, height: 200, axis: 'y', from: 9, to: 0 }),
    ...facts,
  });
}
