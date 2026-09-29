import type { GameOption } from '#engine/rules/GameOption.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { Drawing } from './Drawing.ts';

/** What the world screen's presenter asks of `SceneDrawing`: what the place's picture draws. */
export interface Drawings {
  of(place: PlaceSummary, travel: readonly GameOption[], decay: number): Drawing;
}
