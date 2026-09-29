import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { Drawing } from './Drawing.ts';
import type { DrawnOptions } from './DrawnOptions.ts';

/** What the world screen's presenter asks of `SceneDrawing`: what the place's picture draws. */
export interface Drawings {
  of(place: PlaceSummary, options: DrawnOptions, decay: number): Drawing;
}
